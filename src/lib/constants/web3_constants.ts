import { BigNumber } from 'ethers';

export const Decimals = BigNumber.from(18);
export const OneToken = BigNumber.from(10).pow(Decimals);

export const ERC20TOKEN_ADDRESS = '0x8938F527D64243208B57F0bcc9253979af1DbcEB';
export const ICO_ADDRESS = '0x489cBB3dB6Daa7F3521ab8539e91389E28994474';
export const STAKING_ADDRESS = '0xF5C4fcFd66B854c738466AF0a6c7E9B531DF3694';

export const BLOCKS_PER_YEAR = 2597340;

export const CHAIN_INFO = {
  chainId: '0x5',
  rpcUrls: ['https://endpoints.omniatech.io/v1/eth/goerli/public'],
  chainName: 'Goerli test network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: ['https://goerli.etherscan.io'],
};
