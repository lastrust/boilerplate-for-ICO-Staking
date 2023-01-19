import { useEffect, useState, createContext, ReactNode } from 'react';
import { ethers, Contract, BigNumber as BN } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import ERC20_ABI from "../../assets/abis/erc20.json";
import ICO_ABI from "../../assets/abis/ico.json";
import {OneToken, ERC20TOKEN_ADDRESS, ICO_ADDRESS} from "@/lib/constants/web3_contants";
import {toast} from "react-toastify";

export const useERC20Contract = (
    provider: Web3Provider | undefined
) => {
    const [erc20Contract, setERC20Contract] = useState<Contract>(
        new Contract(ERC20TOKEN_ADDRESS, ERC20_ABI, provider?.getSigner())
    );
    const [tokenBalance, setTokenBalance] = useState<BN>();

    useEffect(() => {

    });

    const getBalance = async (address: string) => {
        const balance = await erc20Contract.balanceOf(address);
        setTokenBalance(balance);
        return balance;
    }

    const approveToken = async (spenderAddress: string, amount: number) => {
        try {
            const tx = await erc20Contract.approve(spenderAddress, OneToken.mul(amount));
            console.log(tx);
            const result = await tx.wait();
            toast('Token approve successful!');
            return true;
        } catch (error) {
            console.log(error)
            toast.error('Token approve failed.')
            return false;
        }

    }

    return {
        ERC20TOKEN_ADDRESS,
        erc20Contract,
        tokenBalance,
        getBalance,
        approveToken
    }
}
