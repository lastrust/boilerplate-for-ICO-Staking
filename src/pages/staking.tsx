import type {NextPageWithLayout} from '@/types';
import {NextSeo} from 'next-seo';
import {RootLayout} from '@/layouts/_root-layout';
import {Staking} from '@/components/staking/staking';

const StakingPage: NextPageWithLayout = () => {

    // render default create NFT component
    return (
        <>
            <NextSeo
                title="STAKING"
                description="Bunzz - Staking Boilerplate"
            />
            <Staking/>
        </>
    );
};

StakingPage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};

export default StakingPage;
