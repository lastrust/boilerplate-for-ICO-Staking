import { useEffect, useState, createContext, ReactNode } from 'react';
import { ethers, Contract, BigNumber as BN } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import ABI from "../../assets/abis/staking.json";
import { toast } from 'react-toastify';

import {OneToken, STAKING_ADDRESS} from "@/lib/constants/web3_contants";

export const useStakingContract = (
    provider: Web3Provider | undefined
) => {
    const [stakingContract, setStakingContract] = useState<Contract>(
        new Contract(STAKING_ADDRESS, ABI, provider?.getSigner())
    );
    const [totalStakedAmount, setTotalStakedAmount] = useState<BN>();
    const [pendingReward, setPendingReward] = useState<BN>()
    const [stakedAmount, setStakedAmount] = useState<BN>()


    const getTotalStakedAmount = async () => {
        const amount = await stakingContract.totalStakedAmount();
        setTotalStakedAmount(amount);
    }

    const getUserInfo = async (address: string) => {
        try {
            const userInfo = await stakingContract.userInfo(address);
            setStakedAmount(userInfo[0]);
        } catch (error) {
            toast.error('Invalid Address')
        }

    }

    const getPendingReward = async (address: string) => {
        const amount = await stakingContract.getPending(address);
        console.log(amount, 'amount');
        console.log(amount.toString(), 'amount');
        setPendingReward(amount);
    }

    const stake = async (amount: number) => {
        try {
            const tx = await stakingContract.stake(OneToken.mul(amount));
            console.log(tx);
            const result = await tx.wait();
            console.log(result);
            toast('Stake successful!')
        } catch (error) {
            console.log(error)
            toast.error('Stake failed.')
        }
    }

    const unStake = async (amount: number) => {
        if (amount == 0) return
        try {
            const tx = await stakingContract.unStake(OneToken.mul(amount));
            console.log(tx);
            const result = await tx.wait();
            console.log(result);
            toast('Unstake successful!')
        } catch (error) {
            console.log(error)
            toast.error('Unstake failed.')
        }
    }

    const harvest = async (reStake: boolean = false) => {
        try {
            const tx = await stakingContract.harvest(reStake);
            console.log(tx);
            const result = await tx.wait();
            console.log(result);
            toast('Harvest successful!')
        } catch (error) {
            console.log(error)
            toast.error('Harvest failed.')
        }
    }

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
        harvest
    }
}
