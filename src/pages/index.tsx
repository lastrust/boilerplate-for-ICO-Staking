import type {NextPageWithLayout} from '@/types';
import {NextSeo} from 'next-seo';
import {RootLayout} from '@/layouts/_root-layout';
import {ICO} from '@/components/ico/ico';

const ICOPage: NextPageWithLayout = () => {
    return (
        <>
            <NextSeo
                title="ICO"
                description="Bunzz - ICO Boilerplate"
            />
            <ICO/>
        </>
    );
};

ICOPage.getLayout = function getLayout(page) {
    return <RootLayout>{page}</RootLayout>;
};

export default ICOPage;
