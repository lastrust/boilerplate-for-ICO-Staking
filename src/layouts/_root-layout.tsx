import dynamic from 'next/dynamic';
import { Loader } from '@/components/ui/loader';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
// dynamic imports
const MinimalLayout = dynamic(() => import('@/layouts/_minimal'), {
  loading: () => <FallbackLoader />,
});

const FallbackLoader = () => {
  return (
    <div className="fixed z-50 grid h-full w-full place-content-center">
      <Loader variant="blink" />
    </div>
  );
};

export const RootLayout = ({
  children,
  contentClassName,
}: React.PropsWithChildren<{ contentClassName?: string }>) => {
  return <MinimalLayout>{children}</MinimalLayout>;
};
