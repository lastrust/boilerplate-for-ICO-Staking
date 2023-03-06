import DiscordIcon from '@/components/icons/discord';
import OpenseaIcon from '@/components/icons/opensea';
import TofuNftIcon from '@/components/icons/tofu-nft';
import TwitterIcon from '@/components/icons/twitter';
import Button from '@/components/ui/button/button';
import FooterData from './data.json';
import ActiveLink from '@/components/ui/links/active-link';

const Footer = () => {
  const renderSocials = () => (
    <div className="ml-auto flex items-center gap-x-8">
      <Button color="white" shape="circle">
        <OpenseaIcon cn="text-slate-700 w-[30px] h-[30px]" />
      </Button>
      <Button color="white" shape="circle">
        <TofuNftIcon className="h-[17px] w-[17px] text-slate-700" />
      </Button>
      <ActiveLink href="https://twitter.com/BunzzDev" target="_blank">
        <Button color="white" shape="circle">
          <TwitterIcon className="h-[17px] w-[17px] text-slate-700" />
        </Button>
      </ActiveLink>
      <ActiveLink href="https://discord.com/invite/rjfvZzDEaN" target="_blank">
        <Button color="white" shape="circle">
          <DiscordIcon className="h-[17px] w-[17px] text-slate-700" />
        </Button>
      </ActiveLink>
    </div>
  );
  return (
    <>
      <footer className="flex w-full flex-col bg-slate-700 px-4 pt-16 pb-5 text-gray-400 sm:px-6 lg:px-8 3xl:px-10">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-y-10">
          <div className="flex items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-white">
                {FooterData.title}
              </h1>
              <h2 className=" text-lg">{FooterData.subtitle}</h2>
            </div>
            {renderSocials()}
          </div>
          <p className="text-sm">{FooterData.copyright}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
