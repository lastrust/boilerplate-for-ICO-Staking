import { useEffect, useState } from 'react';
import { Contract, BigNumber as BN } from 'ethers';

import { toast } from 'react-toastify';
import { ICO_ADDRESS } from '@/lib/constants/web3_constants';

export const useICOContract = (
  icoContract: Contract | undefined,
  address: string
) => {
  const [tokenPrice, setTokenPrice] = useState<BN>();
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  useEffect(() => {
    getTokenPrice().then();
    getTimestamp().then();
  }, [address]);

  const getTokenPrice = async () => {
    if (!address || !icoContract) {
      setTokenPrice(BN.from(0));
      return;
    }
    try {
      const price = await icoContract.price();
      setTokenPrice(price);
    } catch (error) {
      setTokenPrice(BN.from(0));
      console.log(error, 'Catch error Account is not connected');
    }
  };

  const getTimestamp = async () => {
    if (!address || !icoContract) {
      setStartTime(0);
      setEndTime(0);
      return;
    }
    try {
      const _startTime = await icoContract.startTime();
      const _endTime = await icoContract.endTime();
      setStartTime(_startTime);
      setEndTime(_endTime);
    } catch (error) {
      setStartTime(0);
      setEndTime(0);
      console.log(error, 'Catch error Account is not connected');
    }
  };

  const getEndTime = () => {
    return endTime == 0
      ? ''
      : new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(Number(endTime.toString() + '000'));
  };

  const buy = async (amount: number) => {
    if (amount == 0 || !address || !icoContract) return;
    try {
      const tx = await icoContract.buy({
        value: tokenPrice?.mul(amount * 1000000).div(1000000),
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
    startTime,
    endTime,
    getTokenPrice,
    getEndTime,
    buy,
  };
};
