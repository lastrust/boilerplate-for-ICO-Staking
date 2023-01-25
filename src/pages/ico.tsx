import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import { ICO } from '@/components/ico/ico';
import MinimalLayout from '@/layouts/_minimal';

const ICOPage: NextPageWithLayout = () => {
  // render default create NFT component
  return (
    <>
      <NextSeo title="ICO" description="Bunzz - ICO Boilerplate" />
      <ICO />
    </>
  );
};

ICOPage.getLayout = function getLayout(page) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default ICOPage;
