import { useRouter } from 'next/router';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import lightLogo from '@/assets/images/bunzz/Vector.png';
import routes from '@/config/routes';
import { LAYOUT_OPTIONS } from '@/lib/constants';

export const Logo = () => {
  const router = useRouter();
  const {
    query: { layout },
  } = router;
  return (
    <AnchorLink
      href={{
        pathname: routes.home,
        ...(layout !== LAYOUT_OPTIONS.MODERN &&
          layout !== undefined && {
            query: {
              layout,
            },
          }),
      }}
      className="flex w-28 outline-none sm:w-32 4xl:w-36"
    >
      <span className="relative flex overflow-hidden">
        <Image src={lightLogo} alt="Criptic" priority />
      </span>
    </AnchorLink>
  );
};
