import { BigNumberish, ethers } from 'ethers';

export const formatUnits = (
  value: BigNumberish,
  decimals: string | BigNumberish = 0,
  maxDecimalDigits?: number
) => {
  return ethers.FixedNumber.from(ethers.utils.formatUnits(value, decimals))
    .round(maxDecimalDigits ?? ethers.BigNumber.from(decimals).toNumber())
    .toString();
};
