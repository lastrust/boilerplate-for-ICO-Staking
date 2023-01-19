import {useContext, useEffect, useState} from 'react';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import { Transition } from '@/components/ui/transition';
import { RadioGroup } from '@/components/ui/radio-group';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Uploader from '@/components/ui/forms/uploader';
import InputLabel from '@/components/ui/input-label';
import ToggleBar from '@/components/ui/toggle-bar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Ethereum } from '@/components/icons/ethereum';
import { Flow } from '@/components/icons/flow';
import { Warning } from '@/components/icons/warning';
import { Unlocked } from '@/components/icons/unlocked';
import Avatar from '@/components/ui/avatar';
//images
import Image1 from '@/assets/images/bunzz/Group 13231.png';
import {WalletContext} from "@/lib/hooks/use-connect";
import {useERC20Contract} from "@/lib/hooks/use-erc20-contract";
import {useStakingContract} from "@/lib/hooks/use-staking-contract";
import {OneToken, STAKING_ADDRESS} from "@/lib/constants/web3_contants";
import {toast} from "react-toastify";
import {ethers} from "ethers";
import formatUnits from "../../lib/helpers/helper"

const BlockchainOptions = [
    {
        id: 1,
        name: 'Ethereum',
        value: 'ethereum',
        icon: <Ethereum />,
    },
    {
        id: 2,
        name: 'Flow',
        value: 'flow',
        icon: <Flow />,
    },
];

export default function Staking() {
    let [publish, setPublish] = useState(true);
    let [explicit, setExplicit] = useState(false);
    let [unlocked, setUnlocked] = useState(false);
    let [priceType, setPriceType] = useState('fixed');
    let [blockchain, setBlockChain] = useState(BlockchainOptions[0]);

    const [amount, setAmount] = useState(0);

    const { address, disconnectWallet, balance, getProvider } = useContext(WalletContext);

    const provider = getProvider();

    const {
        ERC20TOKEN_ADDRESS,
        erc20Contract,
        tokenBalance,
        getBalance,
        approveToken,
    } = useERC20Contract(provider);

    const {
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
    } = useStakingContract(provider);

    useEffect(() => {
        console.log(address)
        if (address !== '') {
            updateStatus();
        }
        // getUserInfo(address);
    }, [address]);

    const updateStatus = () => {
        getPendingReward(address);
        getUserInfo(address);
        getBalance(address);
    }

    const submitForStaking = async () => {
        if (!amount) {
            toast.error('Invalid Amount')
            return;
        }
        const bigAmount = OneToken.mul(amount);
        await getBalance(address);
        if (tokenBalance !== undefined && tokenBalance < bigAmount) {
            toast.error('Token balance not enough');
            return;
        }
        if (await approveToken(STAKING_ADDRESS, amount)) {
            await stake(amount);
            updateStatus();
        }
    }

    const submitForHarvesting = async () => {
        await harvest();
        updateStatus();
    }

    const submitForUnstaking = async () => {
        console.log(amount)
        if (!amount) {
            toast.error('Invalid Amount')
            return;
        }
        const bigAmount = OneToken.mul(amount);
        await getUserInfo(address);
        if (stakedAmount === undefined || stakedAmount > bigAmount) {
            toast.error('Invalid Amount');
            return;
        }
        await unStake(amount);
        updateStatus();
    }


    return (
        <>
            <NextSeo
                title="Staking"
                description="Bunzz - Staking Boilerplate"
            />
            <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
                <div className="flex-col lg:flex">
                    <div className="flex-col overflow-hidden rounded-lg bg-white shadow-card duration-200 dark:bg-light-dark">
                        <div className="grid grid-cols-1 md:grid-cols-3 py-4">
                            <div className="flex-col md-flex p-4 rounded-lg bg-gray-100 mx-4">
                                <div className="flex justin-between">
                                    <div className="flex">
                                        <Image
                                            src={Image1}
                                            placeholder="blur"
                                            layout="fixed"
                                            objectFit="cover"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-4 text-3xl font-bold">
                                        Connect wallet
                                    </div>
                                </div>

                                <div className="mt-4 p-3 rounded-lg text-white bg-gray-700">
                                    <InputLabel title="Total Balance" />
                                    <div className="text-2xl font-bold">
                                        {tokenBalance ? formatUnits(tokenBalance, 18, 3) : ''} BUNZ
                                    </div>
                                </div>
                                <div className="mt-4 p-3 rounded-lg bg-gray-200">
                                    <InputLabel title="Total Staked Balance" />
                                    <div className="text-2xl font-bold">
                                        {stakedAmount ? formatUnits(stakedAmount, 18, 3) : ''} BUNZ
                                    </div>
                                </div>
                                <div className="mt-4 p-3 rounded-lg bg-gray-200">
                                    <InputLabel title="Classic Reward Balance" />
                                    <div className="text-2xl font-bold">
                                        {pendingReward ? formatUnits(pendingReward, 18, 3) : ''} BUNZ
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow md:col-span-2 mx-4">
                                <div className="flex-col w-full md-flex p-8 rounded-lg bg-gray-100 grid md:grid-cols-3">
                                    <div className="">
                                        <div className="text-3xl font-bold">
                                            Connect Wallet
                                            <br/>
                                            to see APY
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 ml-4">
                                        <div className="text-xl font-bold">
                                            Earn rewards for staking BUNZ
                                        </div>
                                        <div className="">
                                            Along with earning from 10.0 million in $BUNZ reward pools, staking also gives you voting rights on Bunzz DAO proposals.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex-col w-full md-flex p-6 rounded-lg bg-gray-100 mt-4">
                                    <div className="text-lg">
                                        <Button shape="rounded" className="text-lg font-bold bg-gray-700" onClick={submitForStaking}>Stake BUNZ</Button>
                                        <Button shape="rounded" className="text-lg ml-3 font-bold bg-gray-200 text-dark" onClick={submitForUnstaking}>Unstake BUNZ</Button>
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel title="Amount" />
                                        <Input
                                            defaultValue={0}
                                            min={0}
                                            type="number"
                                            placeholder=""
                                            inputClassName="spin-button-hidden"
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className=" flex justify-end w-full md-flex rounded-lg mt-4">
                                    <Button shape="rounded" className="text-lg font-bold bg-gray-700" onClick={submitForHarvesting}>Harvest</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
