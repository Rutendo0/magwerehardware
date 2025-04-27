import React from 'react';

interface MagwereLogoProps {
  className?: string;
  isPrimary?: boolean;
}

const MagwereLogo: React.FC<MagwereLogoProps> = ({ className = 'h-10 w-auto', isPrimary = true }) => {
  const primaryColor = '#e11d48'; // Tailwind rose-600
  const secondaryColor = '#0f172a'; // Tailwind slate-900
  
  const mainColor = isPrimary ? primaryColor : secondaryColor;
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Simple text logo with styled text */}
      <div className="flex flex-col">
        <span className="font-bold text-lg md:text-xl tracking-tight" style={{ color: mainColor }}>
          MAGWERE
        </span>
        <span className="text-xs md:text-sm font-medium text-gray-700">
          HARDWARE & CONSTRUCTION
        </span>
      </div>
    </div>
  );
};

export default MagwereLogo;