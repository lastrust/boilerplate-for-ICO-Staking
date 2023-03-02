import { Logo } from '@/components/ui/logo';
import cn from 'classnames';
import { Hamburger } from '@/components/ui/hamburger';
import WalletConnect from '@/components/nft/wallet-connect';
import { MenuItems } from '@/layouts/sidebar/_layout-menu';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useDrawer } from '@/components/drawer-views/context';
import { useWindowScroll } from '@/lib/hooks/use-window-scroll';
import React, { FC } from 'react';
import Footer from './footer';

type Props = {
  children: React.ReactNode;
};

const HeaderRightArea = () => {
  const { openDrawer, isOpen } = useDrawer();
  return (
    <div className="order-last flex shrink-0 items-center">
      <div className="hidden gap-6 xs:flex 2xl:gap-8">
        <WalletConnect />
      </div>

      <div className="flex items-center lg:hidden">
        <Hamburger
          isOpen={isOpen}
          onClick={() => openDrawer('DRAWER_MENU')}
          color="white"
          className="shadow-main ltr:ml-3.5 rtl:mr-3.5 dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white ltr:sm:ml-5 rtl:sm:mr-5"
        />
      </div>
    </div>
  );
};

export const Header = () => {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const windowScroll = useWindowScroll();
  const { openDrawer, isOpen } = useDrawer();
  return (
    <nav
      className={cn(
        'sticky top-0 z-30 flex w-full items-center justify-between px-4 transition-all duration-300 ltr:right-0 rtl:left-0 sm:px-6 lg:px-8 3xl:px-10',
        isMounted && windowScroll.y > 10
          ? 'h-16 bg-gradient-to-b from-white to-white/80 shadow-card backdrop-blur dark:from-dark dark:to-dark/80 sm:h-20'
          : 'h-16 bg-body dark:bg-dark sm:h-24'
      )}
    >
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            {isMounted &&
              ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) == -1 && (
                <MenuItems />
              )}
            <HeaderRightArea />
          </div>
          <div className="ml-4 hidden lg:block xl:hidden">
            <Hamburger
              isOpen={isOpen}
              onClick={() => openDrawer('DRAWER_MENU')}
              color="white"
              className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export const MinimalLayout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <div className="bg-light-100 dark:bg-dark-100 mt-8 flex min-h-[66vh] flex-col gap-6 px-4 sm:px-6 lg:px-8 3xl:px-10">
      <main className="mx-auto mb-12 flex w-full max-w-[1120px] flex-grow flex-col">
        {children}
      </main>
    </div>
    <Footer />
  </>
);

export default MinimalLayout;
