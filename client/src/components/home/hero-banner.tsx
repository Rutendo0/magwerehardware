
import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroBanner: FC = () => {
  return (
    <section className="relative bg-purple-800 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Building Zimbabwe's Future Together
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            Premium hardware, construction materials, and expert solutions at competitive prices. Your trusted partner in construction and home improvement.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/categories">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-blue-600 hover:bg-blue-50">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default HeroBanner;
