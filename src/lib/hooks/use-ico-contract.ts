import { useState } from 'react';
import { Contract, BigNumber as BN } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import ICO_ABI from '../../assets/abis/ico.json';
import { toast } from 'react-toastify';
import { ICO_ADDRESS } from '@/lib/constants/web3_contants';

export const useICOContract = (provider: Web3Provider | undefined) => {
  const [icoContract] = useState<Contract>(
    new Contract(ICO_ADDRESS, ICO_ABI, provider?.getSigner())
  );

  const [tokenPrice, setTokenPrice] = useState<BN>();

  const getTokenPrice = async () => {
    try {
      const price = await icoContract.exchangeRate();
      setTokenPrice(price);
    } catch (error) {
      setTokenPrice(BN.from(0));
      console.log(error, 'Catch error Account is not connected');
    }
  };

  const buy = async (amount: number) => {
    if (amount == 0) return;
    console.log(tokenPrice?.toString(), 'tokenprice');
    try {
      const tx = await icoContract.buy({
        value: tokenPrice?.mul(amount),
      });
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('Token buy successful!');
    } catch (error) {
      console.log(error);
      toast.error('Token buy failed.');
    }
  };

  return {
    ICO_ADDRESS,
    icoContract,
    tokenPrice,
    getTokenPrice,
    buy,
  };
};
