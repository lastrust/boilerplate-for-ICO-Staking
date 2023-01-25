import { useState } from 'react';
import { Contract, BigNumber as BN } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import ABI from '../../assets/abis/staking.json';
import { toast } from 'react-toastify';

import { OneToken, STAKING_ADDRESS } from '@/lib/constants/web3_contants';

export const useStakingContract = (provider: Web3Provider | undefined) => {
  const [stakingContract] = useState<Contract>(
    new Contract(STAKING_ADDRESS, ABI, provider?.getSigner())
  );
  const [totalStakedAmount, setTotalStakedAmount] = useState<BN>();
  const [pendingReward, setPendingReward] = useState<BN>();
  const [stakedAmount, setStakedAmount] = useState<BN>();

  const getTotalStakedAmount = async () => {
    const amount = await stakingContract.totalStakedAmount();
    setTotalStakedAmount(amount);
  };

  const getUserInfo = async (address: string) => {
    try {
      const userInfo = await stakingContract.userInfo(address);
      setStakedAmount(userInfo[0]);
    } catch (error) {
      setStakedAmount(BN.from(0));
      console.log(error, 'Catch error Account is not connected');
    }
  };

  const getPendingReward = async (address: string) => {
    try {
      const amount = await stakingContract.getPending(address);
      setPendingReward(amount);
    } catch (error) {
      setPendingReward(BN.from(0));
      console.log(error, 'Catch error Account is not connected');
    }
  };

  const stake = async (amount: number) => {
    try {
      const tx = await stakingContract.stake(OneToken.mul(amount));
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('Stake successful!');
    } catch (error) {
      console.log(error);
      toast.error('Stake failed.');
    }
  };

  const unStake = async (amount: number) => {
    if (amount == 0) return;
    try {
      const tx = await stakingContract.unStake(OneToken.mul(amount));
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('Unstake successful!');
    } catch (error) {
      console.log(error);
      toast.error('Unstake failed.');
    }
  };

  const harvest = async (reStake = false) => {
    try {
      const tx = await stakingContract.harvest(reStake);
      console.log(tx);
      const result = await tx.wait();
      console.log(result);
      toast('Harvest successful!');
    } catch (error) {
      console.log(error);
      toast.error('Harvest failed.');
    }
  };

  return {
    STAKING_ADDRESS,
    stakingContract,
    totalStakedAmount,
    pendingReward,
    stakedAmount,
    getTotalStakedAmount,
    getUserInfo,
    getPendingReward,
    stake,
    unStake,
    harvest,
  };
};
