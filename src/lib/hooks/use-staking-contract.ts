import { useEffect, useState } from 'react';
import { Contract, BigNumber as BN } from 'ethers';
import { toast } from 'react-toastify';

import {
  BLOCKS_PER_YEAR,
  OneToken,
  STAKING_ADDRESS,
} from '@/lib/constants/web3_constants';

export const useStakingContract = (stakingContract: Contract | undefined) => {
  const [pendingReward, setPendingReward] = useState<BN>(BN.from(0));
  const [stakedAmount, setStakedAmount] = useState<BN>(BN.from(0));
  const [apr, setAPR] = useState<BN>(BN.from(0));

  useEffect(() => {
    initInfo().then();
  });

  const initInfo = async () => {
    if (!stakingContract) return;
    const _totalStakedAmount = await stakingContract.totalStakedAmount();
    const _rewardPerBlock = await stakingContract.rewardPerBlock();
    const totalRewardPerYear = _rewardPerBlock.mul(BLOCKS_PER_YEAR);
    const _apr = totalRewardPerYear.div(_totalStakedAmount).mul(100).toString();
    setAPR(_apr);
  };

  const getUserInfo = async (address: string) => {
    if (!stakingContract) return;
    try {
      const userInfo = await stakingContract.userInfo(address);
      setStakedAmount(userInfo[0]);
    } catch (error) {
      setStakedAmount(BN.from(0));
      console.log(error, 'Catch error Account is not connected');
    }
  };

  const getPendingReward = async (address: string) => {
    if (!stakingContract) return;
    try {
      const amount = await stakingContract.getPending(address);
      setPendingReward(amount);
    } catch (error) {
      setPendingReward(BN.from(0));
      console.log(error, 'Catch error Account is not connected');
    }
  };

  const stake = async (amount: number) => {
    if (!stakingContract) return;
    try {
      const tx = await stakingContract.stake(
        OneToken.mul(amount * 1000000).div(1000000)
      );
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
    if (amount == 0 || !stakingContract) return;
    try {
      const tx = await stakingContract.unStake(
        OneToken.mul(amount * 1000000).div(1000000)
      );
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
    if (!stakingContract) return;
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
    pendingReward,
    stakedAmount,
    apr,
    getUserInfo,
    getPendingReward,
    stake,
    unStake,
    harvest,
  };
};
