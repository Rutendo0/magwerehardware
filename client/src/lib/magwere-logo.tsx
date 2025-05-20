
import { FC } from 'react';

interface MagwareLogoProps {
  className?: string;
  isPrimary?: boolean;
}

const MagwareLogo: FC<MagwareLogoProps> = ({ className = "", isPrimary = true }) => {
  const primaryColor = isPrimary ? "text-purple-600" : "text-white";
  const secondaryColor = isPrimary ? "text-neutral-800" : "text-white";
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-3xl font-bold relative">
        <span className={`${primaryColor} tracking-wider`}>MAG</span>
        <span className={`${secondaryColor} tracking-wider`}>WARE</span>
        <div className={`absolute -bottom-1 left-0 w-full h-0.5 ${isPrimary ? 'bg-purple-600' : 'bg-white'}`}></div>
      </div>
      <div className="flex flex-col ml-2 border-l-2 pl-2 border-purple-600">
        <span className="text-sm font-medium text-neutral-600">Hardware</span>
        <span className="text-xs text-neutral-500">& Building Supplies</span>
      </div>
    </div>
  );
};

export default MagwareLogo;
