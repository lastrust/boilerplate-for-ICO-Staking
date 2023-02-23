import React, { FC } from 'react';
import TwitterIcon from '@/components/icons/twitter';
import Button from '@/components/ui/button';
interface TeamCardProps {
  cn: string;
  image: string;
  name: string;
  role: string;
  twitterURL: string;
}

const TeamCard: FC<TeamCardProps> = ({ cn, image, name, role, twitterURL }) => {
  return (
    <>
      <div
        className={`${cn} mx-auto my-4 cursor-pointer rounded-xl bg-white p-5 shadow-card`}
      >
        <div className="relative w-full">
          <img className="rounded-lg bg-gray-100" src={image} alt={''} />
        </div>
        <div className="flex justify-between pt-2">
          <div className="">
            <p className=" text-2xl font-semibold text-gray-600">{name}</p>
            <p className="mt-2  text-gray-600">{role}</p>
          </div>
          <Button color="gray" shape="circle">
            <TwitterIcon className="h-[17px] w-[17px] text-slate-700" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
