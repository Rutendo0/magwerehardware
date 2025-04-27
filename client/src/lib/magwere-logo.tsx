import { FC } from 'react';

interface MagwereLogoProps {
  className?: string;
  isPrimary?: boolean;
}

const MagwereLogo: FC<MagwereLogoProps> = ({ className = '', isPrimary = true }) => {
  const primaryColor = '#FF6B00';
  const secondaryColor = '#333333';
  
  const mainColor = isPrimary ? primaryColor : 'white';
  const accentColor = isPrimary ? secondaryColor : 'rgba(255,255,255,0.8)';
  
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <rect width="40" height="40" rx="8" fill={mainColor} />
        <path
          d="M8 12H16L20 18L24 12H32L24 24L32 36H24L20 30L16 36H8L16 24L8 12Z"
          fill={accentColor}
        />
      </svg>
      <div>
        <div className="flex items-center">
          <span className="font-bold text-2xl" style={{ color: mainColor }}>
            MAG
          </span>
          <span className="font-bold text-2xl" style={{ color: accentColor }}>
            WERE
          </span>
        </div>
        <span
          className="text-xs uppercase tracking-wider"
          style={{ color: accentColor }}
        >
          Hardware Store
        </span>
      </div>
    </div>
  );
};

export default MagwereLogo;