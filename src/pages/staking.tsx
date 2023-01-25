import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import { Staking } from '@/components/staking/staking';
import MinimalLayout from '@/layouts/_minimal';

const StakingPage: NextPageWithLayout = () => {
  // render default create NFT component
  return (
    <>
      <NextSeo title="STAKING" description="Bunzz - Staking Boilerplate" />
      <Staking />
    </>
  );
};

StakingPage.getLayout = function getLayout(page) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default StakingPage;
