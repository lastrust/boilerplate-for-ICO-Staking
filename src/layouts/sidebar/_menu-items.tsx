import routes from '@/config/routes';
import { PlusCircle } from '@/components/icons/plus-circle';

export const menuItems = [
  // {
  //   name: 'Home',
  //   icon: <HomeIcon />,
  //   href: routes.home,
  // },
  // {
  //   name: 'Farm',
  //   icon: <FarmIcon />,
  //   href: routes.farms,
  // },
  // {
  //   name: 'Swap',
  //   icon: <ExchangeIcon />,
  //   href: routes.swap,
  // },
  // {
  //   name: 'Liquidity',
  //   icon: <PoolIcon />,
  //   href: routes.liquidity,
  // },
  // {
  //   name: 'Explore NFTs',
  //   icon: <CompassIcon />,
  //   href: routes.search,
  // },
  // {
  //   name: 'Create NFT',
  //   icon: <PlusCircle />,
  //   href: routes.createNft,
  // },
  {
    name: 'ICO',
    icon: <PlusCircle />,
    href: routes.ico,
  },
  {
    name: 'STAKING',
    icon: <PlusCircle />,
    href: routes.staking,
  },
  // {
  //   name: 'NFT Details',
  //   icon: <DiskIcon />,
  //   href: routes.nftDetails,
  // },
  // {
  //   name: 'Profile',
  //   icon: <ProfileIcon />,
  //   href: routes.profile,
  // },
  // {
  //   name: 'Vote',
  //   icon: <VoteIcon />,
  //   href: routes.vote,
  //   dropdownItems: [
  //     {
  //       name: 'Explore',
  //       href: routes.vote,
  //     },
  //     {
  //       name: 'Vote with pools',
  //       href: routes.proposals,
  //     },
  //     {
  //       name: 'Create proposal',
  //       href: routes.createProposal,
  //     },
  //   ],
  // },
];
