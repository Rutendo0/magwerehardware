import { FC } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const HeroBanner: FC = () => {
  const [_, navigate] = useLocation();

  return (
    <section className="relative bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your One-Stop Hardware & Building Materials Store
          </h1>
          <p className="text-xl mb-8">
            Quality building materials, solar solutions, and hardware tools at competitive prices
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => navigate('/products')} size="lg">
              Shop Now
            </Button>
            <Button onClick={() => navigate('/contact')} variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;