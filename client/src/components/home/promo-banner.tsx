import { FC } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  promoText?: string;
  endDate?: string;
}

const PromoBanner: FC<PromoBannerProps> = ({ 
  promoText = "Special deals on all tools",
  endDate = "December 2nd"
}) => {
  const [_, navigate] = useLocation();

  const handleNavigate = () => {
    navigate('/products');
  };

  return (
    <section className="bg-black py-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-3 md:mb-0">
          <div className="bg-secondary text-black font-bold py-1 px-3 rounded-md mr-3">
            <span className="mr-1">⚡</span> SPECIAL OFFER
          </div>
          <p className="text-white">{promoText} until {endDate}</p>
        </div>
        <div 
          onClick={handleNavigate}
          className="text-white hover:text-secondary flex items-center cursor-pointer"
        >
          <span>View All Deals</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
