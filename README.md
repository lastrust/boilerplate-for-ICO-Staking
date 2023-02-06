# Boilerplate for ICO & Staking

This boilerplate is for ICO & Staking application.
Using this boilerplate, you can create ICO & Staking website.

![image](imgs/img.png)

![image](imgs/img_19.png)

# How to create this application?

## Deploy smart contracts

### [Deploy ICO contract](https://app.bunzz.dev/module-templates/f5038e83-08c0-415e-953d-72a1dd07d111)

Please deploy ICO smart contract

![img_2.png](imgs/img_2.png)

![img_3.png](imgs/img_3.png)

![img_4.png](imgs/img_4.png)

If you have already an ERC20 token for ICO, you can skip this.

![img_5.png](imgs/img_5.png)

![img_7.png](imgs/img_7.png)

![img_8.png](imgs/img_8.png)

![img_9.png](imgs/img_9.png)

![img_11.png](imgs/img_11.png)

![img_12.png](imgs/img_12.png)

If you are going to use an ERC20 token already deployed, you can set the token address of ICO contract.

![img_13.png](imgs/img_13.png)

### [Deploy staking contract](https://app.bunzz.dev/module-templates/bc19a86b-2a94-47b6-83b2-0fc33554d6c9/how-to-use)

![img_14.png](imgs/img_14.png)

![img_15.png](imgs/img_15.png)

![img_16.png](imgs/img_16.png)

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
import { BigNumber } from 'ethers';

export const Decimals = BigNumber.from(18);
export const OneToken = BigNumber.from(10).pow(Decimals);

export const ERC20TOKEN_ADDRESS = '';
export const ICO_ADDRESS = '';
export const STAKING_ADDRESS = '';
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