
import { FC } from 'react';

interface MagwareLogoProps {
  className?: string;
  isPrimary?: boolean;
}

const MagwareLogo: FC<MagwareLogoProps> = ({ className = "", isPrimary = true }) => {
  const primaryColor = isPrimary ? "text-purple-600" : "text-white";
  const storeColor = isPrimary ? "text-yellow-500" : "text-white";
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-3xl font-bold">
        <span className={primaryColor}>MAG</span>
        <span className="text-neutral-800">WARE</span>
      </div>
      <span className={`text-sm ml-2 ${storeColor}`}>Hardware Store</span>
    </div>
  );
};

export default MagwareLogo;
