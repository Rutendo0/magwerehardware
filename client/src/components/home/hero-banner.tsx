
import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroBanner: FC = () => {
  return (
    <section className="relative bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your One-Stop Hardware Store
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Quality hardware products, construction materials, and exceptional service at competitive prices.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full hidden lg:block">
        <img 
          src="/attached_assets/WhatsApp Image 2025-05-14 at 10.31.14.jpeg"
          alt="Hardware Store Products"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    </section>
  );
};

export default HeroBanner;
