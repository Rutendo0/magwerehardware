import { FC } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import tileGroutImage from '@assets/IMG-20250419-WA0011.jpg';
import epoxyGroutImage from '@assets/IMG-20250419-WA0013.jpg';

const TilingSolutions: FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">Complete Tiling Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Find all your tiling needs from adhesives to grouts and tools. Professional quality for beautiful results.
            </p>
          </div>
          <Link href="/category/tiling">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Tiling Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all">
            <div className="h-64 relative overflow-hidden">
              <img 
                src={tileGroutImage} 
                alt="Mag-Grip Tile Grout" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Tile Grout</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Fast-setting tile grout for interior and exterior joints. Easy application and superior durability.
              </p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quick curing (2-4 hours)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Strong bond for various tiles</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Low dust formulation</span>
                </li>
              </ul>
              <Link href="/category/tiling/grouts">
                <Button className="w-full">
                  Shop Tile Grout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all">
            <div className="h-64 relative overflow-hidden">
              <img 
                src={epoxyGroutImage} 
                alt="Mag-Grip Epoxy Grout" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-6">
                <h3 className="text-white text-2xl font-bold">Epoxy Grout</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Revolutionary epoxy grout that peels right off with a blade. No more messy clean-up!
              </p>
              <ul className="mb-4 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy clean-up process</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Exceptional strength</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-primary mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multiple colors available</span>
                </li>
              </ul>
              <Link href="/category/tiling/epoxy-grout">
                <Button className="w-full">
                  Shop Epoxy Grout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-amber-50 to-amber-100 relative flex flex-col items-center justify-center p-8">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-2">Complete Tiling Kits</h3>
                <p className="text-gray-600">Everything you need for professional results</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 w-full">
                <div className="font-bold text-lg mb-2">Starter Kit Includes:</div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tile Adhesive (5kg)</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Grout (2kg)</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Trowel & Spreader</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Spacers (100pcs)</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-primary">$49.99</span>
                <span className="text-sm line-through text-gray-400">$64.99</span>
              </div>
              <Link href="/category/tiling/kits">
                <Button className="w-full">
                  Shop Tiling Kits <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TilingSolutions;