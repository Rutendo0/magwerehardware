
import { FC } from 'react';

interface MagwareLogoProps {
  className?: string;
  isPrimary?: boolean;
}

const MagwareLogo: FC<MagwareLogoProps> = ({ className = "", isPrimary = true }) => {
  const primaryColor = isPrimary ? "text-primary" : "text-white";
  const secondaryColor = isPrimary ? "text-neutral-800" : "text-white";
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-4xl font-bold">
        <span className={primaryColor}>MAG</span>
        <span className={secondaryColor}>WARE</span>
        <span className="border-2 border-secondary px-3 py-1 rounded ml-1"></span>
      </div>
      <span className="text-base ml-3 text-neutral-500">Hardware Store</span>
    </div>
  );
};

export default MagwareLogo;
