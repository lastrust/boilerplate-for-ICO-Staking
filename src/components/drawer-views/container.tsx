import { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Dialog } from '@/components/ui/dialog';
import { Transition } from '@/components/ui/transition';
import { DRAWER_VIEW, useDrawer } from '@/components/drawer-views/context';
// dynamic imports

const DrawerMenu = dynamic(() => import('@/layouts/sidebar/_layout-menu'));

const renderDrawerContent = (view: DRAWER_VIEW | string) => {
  switch (view) {
    default:
      return <DrawerMenu />;
  }
};

export const DrawersContainer = () => {
  const router = useRouter();
  const { view, isOpen, closeDrawer } = useDrawer();
  useEffect(() => {
    // close search modal when route change
    router.events.on('routeChangeStart', closeDrawer);
    return () => {
      router.events.off('routeChangeStart', closeDrawer);
    };
  }, []);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-hidden"
        onClose={closeDrawer}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="fixed inset-y-0 left-0 flex w-full max-w-full xs:w-auto">
            {view && renderDrawerContent(view)}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
