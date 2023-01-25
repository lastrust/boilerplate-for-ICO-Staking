import { useState } from 'react';
import { Contract, BigNumber as BN } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import ERC20_ABI from '../../assets/abis/erc20.json';
import { OneToken, ERC20TOKEN_ADDRESS } from '@/lib/constants/web3_contants';
import { toast } from 'react-toastify';

export const useERC20Contract = (provider: Web3Provider | undefined) => {
  const [erc20Contract] = useState<Contract>(
    new Contract(ERC20TOKEN_ADDRESS, ERC20_ABI, provider?.getSigner())
  );
  const [tokenBalance, setTokenBalance] = useState<BN>();

  const getBalance = async (address: string) => {
    try {
      const balance = await erc20Contract.balanceOf(address);
      setTokenBalance(balance);
      return balance;
    } catch (error) {
      console.log(error, 'Catch error Account is not connected');
      setTokenBalance(BN.from(0));
      return BN.from(0);
    }
  };

  const approveToken = async (spenderAddress: string, amount: number) => {
    try {
      const tx = await erc20Contract.approve(
        spenderAddress,
        OneToken.mul(amount)
      );
      console.log(tx);
      await tx.wait();
      toast('Token approve successful!');
      return true;
    } catch (error) {
      console.log(error);
      toast.error('Token approve failed.');
      return false;
    }
  };

  return {
    ERC20TOKEN_ADDRESS,
    erc20Contract,
    tokenBalance,
    getBalance,
    approveToken,
  };
};
