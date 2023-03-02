import React from 'react';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from '@/types';
import { Header } from '@/layouts/_minimal';
import { useMediaQuery } from 'use-media-size';
import RoadmapSM from '@/components/roadmap/sm';
import RoadmapLG from '@/components/roadmap/lg';
import Footer from '@/layouts/footer';

const RoadmapPage: NextPageWithLayout = () => {
  const isSM = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <NextSeo title="Bunzz - Roadmap" description="Bunzz - Roadmap" />
      <section className="px-10 pt-7 pb-5">
        <div className="text-center">
          <h2 className="text-5xl">Roadmap</h2>
        </div>
        <div className="mt-12 flex justify-center">
          {isSM ? <RoadmapSM /> : <RoadmapLG />}
        </div>
      </section>
    </>
  );
};

RoadmapPage.getLayout = function getLayout(page) {
  return (
    <>
      <Header />
      <div className="bg-light-100 dark:bg-dark-100 mt-8 flex min-h-[66vh] flex-col gap-6 px-4 sm:px-6 lg:px-8 3xl:px-10">
        <main className="mx-auto mb-12 flex w-full flex-grow flex-col">
          {page}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default RoadmapPage;
