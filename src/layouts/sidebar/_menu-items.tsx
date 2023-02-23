import routes from '@/config/routes';
import { PlusCircle } from '@/components/icons/plus-circle';

export const menuItems = [
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
  {
    name: 'ABOUT',
    icon: <PlusCircle />,
    href: routes.faq,
  },
  {
    name: 'ROADMAP',
    icon: <PlusCircle />,
    href: routes.faq,
  },
  {
    name: 'TEAM',
    icon: <PlusCircle />,
    href: routes.team,
  },
  {
    name: 'FAQ',
    icon: <PlusCircle />,
    href: routes.faq,
  },
];
