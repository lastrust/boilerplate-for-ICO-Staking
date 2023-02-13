# Boilerplate for ICO & Staking

This boilerplate is for ICO & Staking application.
Using this boilerplate, you can create ICO & Staking website.

![image](imgs/img.png)

![image](imgs/img_19.png)

# How to create this application?

## Deploy smart contracts

### [Deploy ICO contract](https://app.bunzz.dev/module-templates/f5038e83-08c0-415e-953d-72a1dd07d111)

Please deploy ICO smart contract

- Click `Create Dapp` box

![img_2.png](imgs/img_2.png)

- Input DApp name

![img_3.png](imgs/img_3.png)

- Select the chain you want to deploy the contracts on.

![img_4.png](imgs/img_4.png)

- Search and select one of ERC20 token modules

If you have already an ERC20 token for ICO, you can skip this.

![img_5.png](imgs/img_5.png)

- Search and select [ICO (Public Sale) module](https://app.bunzz.dev/module-templates/c922eb26-35b6-4c88-a667-a51ceba650f3)

![img_30.png](imgs/img_30.png)

![img_31.png](imgs/img_31.png)

- Input token name and symbol. (If you didn't select ERC20 module, you don't need to add the token name and symbol).
- Input start time and end time in timestamp type. (endTime > startTime >= currentTime)

![img_32.png](imgs/img_32.png)

- Clicking `Deploy` button, you can deploy the smart contracts using metamask wallet.

![img_11.png](imgs/img_11.png)

Now you can see the deployed contract information on DApp dashboard page.

![img_33.png](imgs/img_33.png)

If you are going to use an ERC20 token already deployed, you can set the token address of ICO contract.

![img_34.png](imgs/img_34.png)

### [Deploy staking contract](https://app.bunzz.dev/module-templates/bc19a86b-2a94-47b6-83b2-0fc33554d6c9/how-to-use)

- Click `Create Dapp` box

![img_14.png](imgs/img_14.png)

- Select the chain you want to deploy the smart contracts on.

![img_15.png](imgs/img_15.png)

- Search and select [Staking module](https://app.bunzz.dev/module-templates/bc19a86b-2a94-47b6-83b2-0fc33554d6c9).

![img_16.png](imgs/img_16.png)

- Input params.

```
_stkToken: ERC20 token address for staking.
_rewardPerBlock: Amount of reward token per block.
_feeWallet: Fee wallet address.
__maxFeePercent: Max fee percent. Here is 1000 means 100%.
_harvestFee: Harvest fee percent. Here is 1000 means 100% Harvest fee can't be more than maxFeePercent.
```

![img_17.png](imgs/img_17.png)

Please check [this guide](https://app.bunzz.dev/module-templates/bc19a86b-2a94-47b6-83b2-0fc33554d6c9/arguments) to learn more.

### Deposit tokens for ICO & Staking

- Transfer the token to ICO contract.

- Deposit the token into Staking contract using [depositReward](https://app.bunzz.dev/module-templates/bc19a86b-2a94-47b6-83b2-0fc33554d6c9/functions) function.

![img_18.png](imgs/img_18.png)

## Create ICO Website

### Clone ICO & Staking boilerplate repository.

Clone [this repository](https://github.com/lastrust/boilerplate-for-ICO-Staking)

```
git clone https://github.com/lastrust/boilerplate-for-ICO-Staking
```

### Install app

```
cd boilerplate-for-ICO-Staking

yarn install
```

### Add contract addresses

Please update `src/lib/web3_constants.ts` file with the smart contract addresses you deployed.

```
import {BigNumber} from 'ethers';

export const Decimals = BigNumber.from(18);
export const OneToken = BigNumber.from(10).pow(Decimals);

export const ERC20TOKEN_ADDRESS = '';
export const ICO_ADDRESS = '';
export const STAKING_ADDRESS = '';

export const CHAIN_INFO = {
  chainId: '', // chainId in hex format. It is 0x5 for goerli.
  rpcUrls: [''], // rpc url.
  chainName: '',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorerUrls: [''], // https://goerli.etherscan.io
};
```

### Run application

Development mode

```
yarn dev
```

Production mode

```
yarn build
yarn start
```

![img20.png](imgs/img20.png)

Now you can use this application.

To learn more, please ask in [our discord](https://discord.gg/wCFUV6rNd7)