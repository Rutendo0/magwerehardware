import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const SolarBanner: FC = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 md:w-1/2">
            <h2 className="text-3xl font-heading font-bold mb-4">Solar Equipment & Installation Packages</h2>
            <p className="mb-6">Complete solar solutions for homes and businesses. Professional installation available.</p>
            <Link href="/category/solar-solutions">
              <Button 
                className="bg-white hover:bg-gray-100 text-primary font-medium"
              >
                Explore Solar Solutions
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 text-center">
            <img 
              src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c29sYXIlMjBwYW5lbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
              alt="Solar Solutions" 
              className="rounded-lg shadow-xl inline-block max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarBanner;
