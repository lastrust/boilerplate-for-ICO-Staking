import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import InputLabel from '@/components/ui/input-label';
import Image1 from '@/assets/images/bunzz/1.png';
import { useICOContract } from '@/lib/hooks/use-ico-contract';
import { useContext } from 'react';
import { WalletContext } from '@/lib/hooks/use-connect';
import { OneToken } from '@/lib/constants/web3_contants';
import { BigNumber, ethers } from 'ethers';
export const ICO = () => {
  const [amount, setAmount] = useState(0);
  const [disableBuy, setDisableBuy] = useState(true);
  const [requiredETH, setRequiredETH] = useState<BigNumber>();

  const { getProvider } = useContext(WalletContext);

  const provider = getProvider();
  const { tokenPrice, getTokenPrice, buy } = useICOContract(provider);

  // const {
  //   ERC20TOKEN_ADDRESS,
  //   erc20Contract,
  //   tokenBalance,
  //   getBalance,
  //   approveToken,
  // } = useERC20Contract(provider);

  const submit = async () => {
    await buy(amount);
  };

  useEffect(() => {
    getTokenPrice().then();
  });

  useEffect(() => {
    amount > 0 ? setDisableBuy(false) : setDisableBuy(true);
    if (amount) {
      setDisableBuy(false);
      setRequiredETH(tokenPrice?.mul(OneToken.mul(amount)));
    } else {
      setDisableBuy(true);
      setRequiredETH(tokenPrice?.mul(0));
    }
  }, [amount]);

  return (
    <>
      <NextSeo title="ICO" description="Bunzz - ICO Boilerplate" />
      <div className="mx-auto w-full sm:pt-0 2xl:px-0">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2">
          <div className="flex-col lg:flex">
            <div className="relative flex flex-grow flex-col items-center overflow-hidden rounded-lg transition-all duration-200 dark:bg-light-dark">
              <div className="pt-5 pr-5">
                <div className="mt-4 text-5xl font-bold">
                  Token ICO now live!
                </div>
                <div className="mt-4 text-xl font-medium">
                  ICO module represent the functionality that a project may need
                  when is looking to create a classic token ICO to raise funds.
                  The sale will be made in the ETH (native token). The user can
                  deposit the ETH and purchase the token.
                </div>
                <div className="relative block w-full sm:w-2/4 md:w-3/4">
                  <Image
                    src={Image1}
                    placeholder="blur"
                    layout="responsive"
                    objectFit="cover"
                    alt="Pulses of Imagination #214"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-col lg:flex">
            <div className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow-card duration-200 hover:shadow-large dark:bg-light-dark">
              <div className="p-5">
                <div className="mt-4 text-4xl font-bold">Buy</div>
                <div className="mt-4 text-xl font-medium">
                  <span>Price per token: </span>
                  <span>
                    {tokenPrice ? ethers.utils.formatUnits(tokenPrice, 18) : ''}{' '}
                    per ETH
                  </span>
                </div>
                <div className="mt-4 text-xl font-medium">
                  <span>Time open till: </span>
                  <span>20th Jan 2023</span>
                </div>

                {/* Token amount */}
                <div className="mt-4 mb-8">
                  <InputLabel title="Amount of token to buy:" />
                  <Input
                    defaultValue={0}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={0}
                    type="number"
                    placeholder="Enter the amount of token to buy"
                    inputClassName="spin-button-hidden"
                  />
                </div>
                {/* Total ETH amount */}
                <div className="mt-4 text-xl font-medium">
                  <span>Total ETH required: </span>
                  <span>
                    {requiredETH
                      ? ethers.utils.formatUnits(requiredETH, 18)
                      : ''}{' '}
                    ETH
                  </span>
                </div>
                <div className="mt-4 text-lg">
                  <Button
                    shape="rounded"
                    disabled={disableBuy}
                    onClick={submit}
                  >
                    Buy
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
