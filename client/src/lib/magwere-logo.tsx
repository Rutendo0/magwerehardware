
import { FC } from 'react';

interface LogoProps {
  className?: string;
  isPrimary?: boolean;
}

const MagwereLogo: FC<LogoProps> = ({ className = "h-8 w-auto", isPrimary = true }) => {
  return (
    <img 
      src={import.meta.env.BASE_URL + "attached_assets/Logo.png"}
      alt="Magware Hardware Store"
      className={className}
      style={{ 
        filter: isPrimary ? 'none' : 'brightness(0) invert(1)',
        objectFit: 'contain'
      }}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        console.error('Failed to load logo:', img.src);
      }}
    />
  );
};

export default MagwereLogo;
