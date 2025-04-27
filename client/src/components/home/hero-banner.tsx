import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const HeroBanner: FC = () => {
  return (
    <section className="relative">
      <div className="relative">
        {/* Overlay and Pattern */}
        <div className="bg-gradient-to-r from-primary/90 to-primary/70 absolute inset-0 z-10"></div>
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#8A2BE2_0.5px,transparent_0.5px),radial-gradient(#8A2BE2_0.5px,#f3f4f6_0.5px)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading">
              Your Complete Hardware Solution
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Quality tools, building materials, and solar solutions for professionals and DIY enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button 
                  className="bg-secondary text-black hover:bg-secondary/80 font-medium py-3 px-8 rounded-lg"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/special-offers">
                <Button 
                  variant="outline" 
                  className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-lg"
                >
                  Special Offers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
