import React from 'react';
import { NextSeo } from 'next-seo';
import TeamCard from '@/components/ui/card/teamCard';
import { NextPageWithLayout } from '@/types';
import MinimalLayout from '@/layouts/_minimal';
import { teamData } from '@/data/team';

const TeamPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Bunzz - Marketplace"
        description="Bunzz - Marketplace Sell"
      />
      <section className="px-10 pt-7 pb-5">
        <div className="text-center">
          <h2 className="text-5xl">Team</h2>
        </div>
        <div className="my-5 flex grid grid-cols-1 justify-center	sm:grid-cols-2 md:grid-cols-3">
          {teamData?.map((item) => {
            return (
              <React.Fragment key={`${item.name}_${item.role}`}>
                <TeamCard
                  image={item.image}
                  name={item.name}
                  role={item.role}
                  twitterURL={item.twitterURL}
                  cn="max-w-[342px]"
                />
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
};

TeamPage.getLayout = function getLayout(page) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default TeamPage;
