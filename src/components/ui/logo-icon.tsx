import Image from '@/components/ui/image';
import lightLogo from '@/assets/images/logo-icon.svg';

const Logo: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <span className="relative flex overflow-hidden">
        <Image src={lightLogo} alt="Criptic" priority />
      </span>
    </div>
  );
};

export default Logo;
