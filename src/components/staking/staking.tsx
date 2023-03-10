import { useContext, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
//images
import Image1 from '@/assets/images/bunzz/Group 13231.png';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useERC20Contract } from '@/lib/hooks/use-erc20-contract';
import { useStakingContract } from '@/lib/hooks/use-staking-contract';
import { OneToken } from '@/lib/constants/web3_constants';
import { toast } from 'react-toastify';
import { formatUnits } from '@/lib/helpers/helper';
import { useModal } from '@/components/modal-views/context';

export const Staking = () => {
  const [amount, setAmount] = useState(0);
  const [isStake, setIsStake] = useState<boolean>(true);
  const { address, ERC20Contract, StakingContract } = useContext(WalletContext);
  const { tokenBalance, getBalance, approveToken } =
    useERC20Contract(ERC20Contract);
  const {
    STAKING_ADDRESS,
    pendingReward,
    stakedAmount,
    apr,
    getUserInfo,
    getPendingReward,
    stake,
    unStake,
    harvest,
  } = useStakingContract(StakingContract);
  const [tokenBalanceStr, setTokenBalanceStr] = useState<string>('');
  const [stakedBalanceStr, setStakedBalanceStr] = useState<string>('');
  const [rewardBalanceStr, setRewardBalanceStr] = useState<string>('');

  const { openModal } = useModal();

  useEffect(() => {
    if (address !== '') {
      updateStatus();
    }
  }, [address]);

  const updateStatus = () => {
    getPendingReward(address).then();
    getUserInfo(address).then();
    getBalance(address).then();
  };

  useEffect(() => {
    setTokenBalanceStr(tokenBalance ? formatUnits(tokenBalance, 18, 3) : '');
    setStakedBalanceStr(stakedAmount ? formatUnits(stakedAmount, 18, 3) : '');
    setRewardBalanceStr(pendingReward ? formatUnits(pendingReward, 18, 3) : '');
  }, [tokenBalance, stakedAmount, pendingReward]);

  useEffect(() => {
    setAmount(0);
  }, [isStake]);

  const submitForStaking = async () => {
    if (!amount) {
      toast.error('Invalid Amount');
      return;
    }
    const bigAmount = OneToken.mul(amount * 1000000).div(1000000);
    await getBalance(address);
    if (tokenBalance !== undefined && tokenBalance < bigAmount) {
      toast.error('Token balance not enough');
      return;
    }
    if (await approveToken(STAKING_ADDRESS, amount)) {
      await stake(amount);
      updateStatus();
    }
  };

  const submitForHarvesting = async () => {
    await harvest();
    updateStatus();
  };

  const submitForUnstaking = async () => {
    if (!amount) {
      toast.error('Invalid Amount');
      return;
    }
    const bigAmount = OneToken.mul(amount);
    await getUserInfo(address);
    if (stakedAmount === undefined || stakedAmount > bigAmount) {
      toast.error('Invalid Amount');
      return;
    }
    await unStake(amount);
    updateStatus();
  };

  const setMaxAmount = () => {
    isStake
      ? setAmount(tokenBalanceStr ? Number(tokenBalanceStr) : 0)
      : setAmount(stakedBalanceStr ? Number(stakedBalanceStr) : 0);
  };

  return (
    <>
      <NextSeo title="Staking" description="Bunzz - Staking Boilerplate" />
      <div className="staking mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
        <div className="flex-col lg:flex">
          <div className="flex-col overflow-hidden rounded-lg bg-white shadow-card duration-200 dark:bg-light-dark">
            <div className="grid grid-cols-1 py-4 md:grid-cols-3">
              <div className="md-flex mx-4 flex-col rounded-lg bg-gray-100 p-4">
                {address ? (
                  <div className="my-5 flex text-[24px]">
                    <span className="mx-auto">
                      {address.slice(0, 6)}
                      {'...'}
                      {address.slice(address.length - 6)}
                    </span>
                  </div>
                ) : (
                  <div className="justin-between my-5 flex text-[24px]">
                    <div className="flex">
                      <Image
                        src={Image1}
                        placeholder="blur"
                        layout="fixed"
                        objectFit="cover"
                        alt=""
                      />
                    </div>
                    <div className="ml-4 font-bold">Connect wallet</div>
                  </div>
                )}

                <div className="my-6 rounded-lg bg-gray-700 p-3 text-white">
                  <InputLabel title="Total Balance" />
                  <div className="text-[16px] font-bold">
                    {tokenBalanceStr} BUNZ
                  </div>
                </div>
                <div className="my-6 rounded-lg bg-gray-200 p-3">
                  <InputLabel title="Total Staked Balance" />
                  <div className="text-[16px] font-bold">
                    {stakedBalanceStr} BUNZ
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-gray-200 p-3">
                  <InputLabel title="Classic Reward Balance" />
                  <div className="text-[16px] font-bold">
                    {rewardBalanceStr} BUNZ
                  </div>
                </div>
              </div>
              <div className="mx-4 flex-grow md:col-span-2">
                <div className="md-flex grid w-full flex-col rounded-lg bg-gray-100 p-8 md:grid-cols-3">
                  <div className="mx-auto flex items-center">
                    {address ? (
                      <div className="text-[24px] font-bold">
                        {apr.toString()} %
                      </div>
                    ) : (
                      <div className="text-[24px] font-bold">
                        Connect Wallet
                        <br />
                        to see APY
                      </div>
                    )}
                  </div>
                  <div className="ml-4 md:col-span-2">
                    <div className="text-[16px] font-bold">
                      Earn rewards for staking BUNZ
                    </div>
                    <div className="text-[14px]">
                      Along with earning from 10.0 million in $BUNZ reward
                      pools, staking also gives you voting rights on Bunzz DAO
                      proposals.
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-gray-100 p-6">
                  <div className="md-flex w-full flex-col rounded-lg">
                    <div className="tab">
                      <Button
                        shape="rounded"
                        className={`mr-[-7px] ${
                          isStake ? 'active' : 'inactive'
                        }`}
                        onClick={() => {
                          setIsStake(true);
                        }}
                      >
                        Stake BUNZ
                      </Button>
                      <Button
                        shape="rounded"
                        className={`ml-[-7px] ${
                          isStake ? 'inactive' : 'active'
                        }`}
                        onClick={() => {
                          setIsStake(false);
                        }}
                      >
                        Unstake/Claim
                      </Button>
                    </div>
                    <div className="mt-4">
                      <InputLabel title="Amount" />
                      <div className="flex">
                        <Input
                          min={0}
                          value={amount}
                          type="float"
                          placeholder=""
                          className="w-full"
                          inputClassName="spin-button-hidden"
                          onChange={(e) => setAmount(Number(e.target.value))}
                        />
                        <div className="ml-[-60px] flex items-center text-[18px] font-bold">
                          <span
                            className="hover:cursor-pointer"
                            onClick={setMaxAmount}
                          >
                            MAX
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md-flex mt-4 flex w-full justify-center rounded-lg">
                    {address ? (
                      isStake ? (
                        <Button
                          shape="rounded"
                          className="bg-gray-700 text-lg font-bold"
                          onClick={submitForStaking}
                        >
                          Stake
                        </Button>
                      ) : (
                        <>
                          <Button
                            shape="rounded"
                            className="unstake mr-2"
                            onClick={submitForUnstaking}
                          >
                            Unstake
                          </Button>
                          <Button
                            shape="rounded"
                            className="ml-2 bg-gray-700 text-lg font-bold"
                            onClick={submitForHarvesting}
                          >
                            Claim rewards
                          </Button>
                        </>
                      )
                    ) : (
                      <Button
                        shape="rounded"
                        className="bg-gray-700 text-lg font-bold"
                        onClick={() => openModal('WALLET_CONNECT_VIEW')}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
