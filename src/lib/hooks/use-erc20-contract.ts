import { useState } from 'react';
import { Contract, BigNumber as BN } from 'ethers';
import { OneToken, ERC20TOKEN_ADDRESS } from '@/lib/constants/web3_constants';
import { toast } from 'react-toastify';

export const useERC20Contract = (erc20Contract: Contract | undefined) => {
  const [tokenBalance, setTokenBalance] = useState<BN>();

  const getBalance = async (address: string) => {
    if (!erc20Contract) return;
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
    if (!erc20Contract) return;
    try {
      const tx = await erc20Contract.approve(
        spenderAddress,
        OneToken.mul(amount * 1000000).div(1000000)
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
