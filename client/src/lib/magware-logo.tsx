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
      <div className="text-3xl font-bold">
        <span className={primaryColor}>MAG</span>
        <span className={secondaryColor}>WARE</span>
        <span className="border-2 border-secondary px-2 py-1 rounded"></span>
      </div>
      <span className="text-sm ml-2 text-neutral-500">Hardware Store</span>
    </div>
  );
};

export default MagwareLogo;
