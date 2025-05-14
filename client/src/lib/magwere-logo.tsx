
import { FC } from 'react';

interface LogoProps {
  className?: string;
  isPrimary?: boolean;
}

const MagwereLogo: FC<LogoProps> = ({ className = "h-8 w-auto", isPrimary = true }) => {
  return (
    <img 
      src="/attached_assets/Logo.png"
      alt="Magware Hardware Store"
      className={className}
      style={{ 
        filter: isPrimary ? 'none' : 'brightness(0) invert(1)'
      }}
    />
  );
};

export default MagwereLogo;
