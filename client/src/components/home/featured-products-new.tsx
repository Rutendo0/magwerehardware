import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@shared/schema';

// Image imports for real product images
import ceilingLightsImage from '/attached_assets/IMG-20250419-WA0009.jpg';
import woodVarnishImage from '/attached_assets/IMG-20250419-WA0010.jpg';
import tileGroutImage from '/attached_assets/IMG-20250419-WA0011.jpg';
import epoxyGroutImage from '/attached_assets/IMG-20250419-WA0013.jpg';
import solarEquipmentImage from '/attached_assets/IMG-20250419-WA0016.jpg';
import ceilingPlasterImage from '/attached_assets/IMG-20250419-WA0019.jpg';

// Map of product categories to their respective images
const productImageMap: Record<string, string> = {
  "Ceiling Lights": ceilingLightsImage,
  "Wood Varnish": woodVarnishImage,
  "Tile Grout": tileGroutImage,
  "Epoxy Grout": epoxyGroutImage,
  "Solar Equipment": solarEquipmentImage,
  "Ceiling Plaster": ceilingPlasterImage
};

const FeaturedNew: FC = () => {
  // Fetch featured products
  const { data: featuredProducts, isLoading } = useQuery<Product[]>({
    queryKey: ['/api//featured/6'],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-neutral-600">Explore our high-quality selection of hardware and construction products</p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product tiles using real images */}
            <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden">
                <img 
                  src={ceilingLightsImage} 
                  alt="Ceiling Lights" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Affordable Ceiling Lights</h3>
                <p className="text-neutral-600 mb-3">Modern ceiling light fixtures for your home or office</p>
                <span className="text-lg font-bold text-primary">$29.99 - $99.99</span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-black text-sm font-bold py-1 px-3 rounded">SALE</span>
              </div>
            </div>
            
            <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden">
                <img 
                  src={woodVarnishImage} 
                  alt="Wood Varnish" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Splash Wood Varnish</h3>
                <p className="text-neutral-600 mb-3">Protect your wood surfaces before the rainy season</p>
                <span className="text-lg font-bold text-primary">$19.99</span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-yellow-400 text-black text-sm font-bold py-1 px-3 rounded">WEEKLY PROMOTION</span>
              </div>
            </div>
            
            <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden">
                <img 
                  src={tileGroutImage} 
                  alt="Tile Grout" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Mag-Grip Tile Grout</h3>
                <p className="text-neutral-600 mb-3">Fast set, easy application tile grout for interior and exterior joints</p>
                <span className="text-lg font-bold text-primary">$15.99</span>
              </div>
            </div>
            
            <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden">
                <img 
                  src={epoxyGroutImage} 
                  alt="Epoxy Grout" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Porcelain Epoxy Grout</h3>
                <p className="text-neutral-600 mb-3">No more messy clean up, peels right off with a blade</p>
                <span className="text-lg font-bold text-primary">$24.99</span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-blue-500 text-white text-sm font-bold py-1 px-3 rounded">NEW</span>
              </div>
            </div>
            
            <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden">
                <img 
                  src={solarEquipmentImage} 
                  alt="Solar Equipment" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Solar Equipment Packages</h3>
                <p className="text-neutral-600 mb-3">Complete solar equipment and installation packages</p>
                <span className="text-lg font-bold text-primary">$299.99+</span>
              </div>
            </div>
            
            <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
              <div className="h-64 overflow-hidden">
                <img 
                  src={ceilingPlasterImage} 
                  alt="Ceiling Plaster" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Rhi-Lite Ceiling Plaster</h3>
                <p className="text-neutral-600 mb-3">High-quality gypsum-based plaster for smooth, durable surfaces</p>
                <span className="text-lg font-bold text-primary">$18.99</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedNew;
