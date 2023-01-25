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
import { OneToken } from '@/lib/constants/web3_contants';
import { toast } from 'react-toastify';
import { formatUnits } from '@/lib/helpers/helper';

export const Staking = () => {
  const [amount, setAmount] = useState(0);

  const { address, getProvider } = useContext(WalletContext);

  const provider = getProvider();

  const { tokenBalance, getBalance, approveToken } = useERC20Contract(provider);

  const {
    STAKING_ADDRESS,
    pendingReward,
    stakedAmount,
    getUserInfo,
    getPendingReward,
    stake,
    unStake,
    harvest,
  } = useStakingContract(provider);

  useEffect(() => {
    console.log(address);
    if (address !== '') {
      updateStatus();
    }
  }, [address]);

  const updateStatus = () => {
    getPendingReward(address).then();
    getUserInfo(address).then();
    getBalance(address).then();
  };

  const submitForStaking = async () => {
    if (!amount) {
      toast.error('Invalid Amount');
      return;
    }
    const bigAmount = OneToken.mul(amount);
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
    console.log(amount);
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

  return (
    <>
      <NextSeo title="Staking" description="Bunzz - Staking Boilerplate" />
      <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
        <div className="flex-col lg:flex">
          <div className="flex-col overflow-hidden rounded-lg bg-white shadow-card duration-200 dark:bg-light-dark">
            <div className="grid grid-cols-1 py-4 md:grid-cols-3">
              <div className="md-flex mx-4 flex-col rounded-lg bg-gray-100 p-4">
                <div className="justin-between flex">
                  <div className="flex">
                    <Image
                      src={Image1}
                      placeholder="blur"
                      layout="fixed"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                  <div className="ml-4 text-3xl font-bold">Connect wallet</div>
                </div>

                <div className="mt-4 rounded-lg bg-gray-700 p-3 text-white">
                  <InputLabel title="Total Balance" />
                  <div className="text-2xl font-bold">
                    {tokenBalance ? formatUnits(tokenBalance, 18, 3) : ''} BUNZ
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-gray-200 p-3">
                  <InputLabel title="Total Staked Balance" />
                  <div className="text-2xl font-bold">
                    {stakedAmount ? formatUnits(stakedAmount, 18, 3) : ''} BUNZ
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-gray-200 p-3">
                  <InputLabel title="Classic Reward Balance" />
                  <div className="text-2xl font-bold">
                    {pendingReward ? formatUnits(pendingReward, 18, 3) : ''}{' '}
                    BUNZ
                  </div>
                </div>
              </div>
              <div className="mx-4 flex-grow md:col-span-2">
                <div className="md-flex grid w-full flex-col rounded-lg bg-gray-100 p-8 md:grid-cols-3">
                  <div className="">
                    <div className="text-3xl font-bold">
                      Connect Wallet
                      <br />
                      to see APY
                    </div>
                  </div>
                  <div className="ml-4 md:col-span-2">
                    <div className="text-xl font-bold">
                      Earn rewards for staking BUNZ
                    </div>
                    <div className="">
                      Along with earning from 10.0 million in $BUNZ reward
                      pools, staking also gives you voting rights on Bunzz DAO
                      proposals.
                    </div>
                  </div>
                </div>

                <div className="md-flex mt-4 mt-4 w-full flex-col rounded-lg bg-gray-100 p-6">
                  <div className="text-lg">
                    <Button
                      shape="rounded"
                      className="bg-gray-700 text-lg font-bold"
                      onClick={submitForStaking}
                    >
                      Stake BUNZ
                    </Button>
                    <Button
                      shape="rounded"
                      className="ml-3 bg-gray-200 text-lg font-bold text-dark"
                      onClick={submitForUnstaking}
                    >
                      Unstake BUNZ
                    </Button>
                  </div>
                  <div className="mt-4">
                    <InputLabel title="Amount" />
                    <Input
                      defaultValue={0}
                      min={0}
                      type="number"
                      placeholder=""
                      inputClassName="spin-button-hidden"
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className=" md-flex mt-4 flex w-full justify-end rounded-lg">
                  <Button
                    shape="rounded"
                    className="bg-gray-700 text-lg font-bold"
                    onClick={submitForHarvesting}
                  >
                    Harvest
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
