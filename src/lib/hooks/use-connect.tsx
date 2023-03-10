import { useEffect, useState, createContext, ReactNode } from 'react';
import Web3Modal from 'web3modal';
import { Contract, ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import {
  CHAIN_INFO,
  ERC20TOKEN_ADDRESS,
  ICO_ADDRESS,
  STAKING_ADDRESS,
} from '@/lib/constants/web3_constants';
import ERC20_ABI from '@/assets/abis/erc20.json';
import ICO_ABI from '@/assets/abis/ico.json';
import STAKING_ABI from '../../assets/abis/staking.json';

const web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';

export const WalletContext = createContext<any>({});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [ERC20Contract, setERC20Contract] = useState<Contract | undefined>(
    undefined
  );
  const [ICOContract, setICOContract] = useState<Contract | undefined>(
    undefined
  );
  const [StakingContract, setStakingContract] = useState<Contract | undefined>(
    undefined
  );

  const web3Modal =
    typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });

  /* This effect will fetch wallet address if user has already connected his/her wallet */
  useEffect(() => {
    async function checkConnection() {
      try {
        if (window && window.ethereum) {
          // Check if web3modal wallet connection is available on storage
          if (localStorage.getItem(web3modalStorageKey)) {
            await connectToWallet();
          }
        } else {
          console.log('window or window.ethereum is not available');
        }
      } catch (error) {
        console.log(error, 'Catch error Account is not connected');
      }
    }
    checkConnection().then();
  }, []);

  const setWalletAddress = async (provider: Web3Provider) => {
    try {
      const signer = provider.getSigner();
      if (signer) {
        const web3Address = await signer.getAddress();
        setAddress(web3Address);
        getBalance(provider, web3Address);
      }
    } catch (error) {
      console.log(
        'Account not connected; logged from setWalletAddress function'
      );
    }
  };

  const getSigner = () => {
    if (address === undefined) return undefined;
    const provider = getProvider();
    return provider?.getSigner();
  };

  const getProvider = () => {
    if (typeof window == 'undefined') {
      return undefined;
    }
    return new ethers.providers.Web3Provider(window.ethereum);
  };

  const getBalance = async (provider: Web3Provider, walletAddress: string) => {
    const walletBalance = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(walletBalance);
    setBalance(balanceInEth);
  };

  const disconnectWallet = () => {
    setAddress(undefined);
    web3Modal && web3Modal.clearCachedProvider();
  };

  const checkIfExtensionIsAvailable = () => {
    if (
      (window && window.web3 === undefined) ||
      (window && window.ethereum === undefined)
    ) {
      setError(true);
      web3Modal && web3Modal.toggleModal();
    }
  };

  const checkNetwork = async (provider: Web3Provider) => {
    const network = await provider.getNetwork();
    const networkId = network.chainId;
    return '0x' + networkId == CHAIN_INFO.chainId;
  };

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [CHAIN_INFO],
    });
  };

  const connectToWallet = async () => {
    try {
      setLoading(true);
      checkIfExtensionIsAvailable();
      const connection = web3Modal && (await web3Modal.connect());
      const provider = new ethers.providers.Web3Provider(connection);
      if (await checkNetwork(provider)) {
        await subscribeProvider(connection);
        setWalletAddress(provider);
        setContracts(provider);
        setLoading(false);
      } else {
        await switchNetwork();
        await connectToWallet();
      }
    } catch (error) {
      setLoading(false);
      console.log(
        error,
        'got this error on connectToWallet catch block while connecting the wallet'
      );
    }
  };

  const setContracts = (provider: Web3Provider) => {
    setERC20Contract(
      new Contract(ERC20TOKEN_ADDRESS, ERC20_ABI, provider?.getSigner())
    );
    setICOContract(new Contract(ICO_ADDRESS, ICO_ABI, provider?.getSigner()));
    setStakingContract(
      new Contract(STAKING_ADDRESS, STAKING_ABI, provider?.getSigner())
    );
  };

  const subscribeProvider = async (connection: any) => {
    connection.on('close', () => {
      disconnectWallet();
    });
    connection.on('accountsChanged', async (accounts: string[]) => {
      if (accounts?.length) {
        setAddress(accounts[0]);
        const provider = new ethers.providers.Web3Provider(connection);
        getBalance(provider, accounts[0]);
      } else {
        disconnectWallet();
      }
    });
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        loading,
        error,
        ERC20Contract,
        ICOContract,
        StakingContract,
        connectToWallet,
        disconnectWallet,
        getProvider,
        getSigner,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
