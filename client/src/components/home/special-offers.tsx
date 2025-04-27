import { FC } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Product } from '@shared/schema';

const SpecialOffers: FC = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/sale/3'],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-bold mb-4">Special Offers & Deals</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">Limited time promotions on our most popular products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-60 bg-gray-200"></div>
                <div className="p-6 border-t-2 border-gray-200">
                  <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-gray-200 w-1/4"></div>
                    <div className="h-10 bg-gray-200 w-1/3 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading special offers:", error);
    return <div>Error loading special offers. Please try again later.</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold mb-4">Special Offers & Deals</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Limited time promotions on our most popular products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Grass Trimmer Offer */}
          {products && products[0] && (
            <div className="bg-white border-2 border-secondary rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
              <div className="relative">
                <img 
                  src={products[0].imageUrl}
                  alt={products[0].name}
                  className="w-full h-60 object-contain p-4"
                />
                <div className="absolute top-0 right-0 bg-secondary text-black font-bold py-2 px-4 rounded-bl-lg">
                  BUY 2 GET 1 FREE
                </div>
              </div>
              <div className="p-6 border-t-2 border-secondary">
                <h3 className="text-xl font-medium mb-2">{products[0].name}</h3>
                <p className="text-neutral-600 mb-4">{products[0].description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">${Number(products[0].salePrice).toFixed(2)}</div>
                  <Link href={`/product/${products[0].id}`}>
                    <Button className="bg-secondary hover:bg-secondary/80 text-black font-medium">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Varnish Offer */}
          {products && products[1] && (
            <div className="bg-white border-2 border-primary rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
              <div className="relative">
                <img 
                  src={products[1].imageUrl}
                  alt={products[1].name}
                  className="w-full h-60 object-contain p-4"
                />
                <div className="absolute top-0 right-0 bg-primary text-white font-bold py-2 px-4 rounded-bl-lg">
                  WEEKLY PROMO
                </div>
              </div>
              <div className="p-6 border-t-2 border-primary">
                <h3 className="text-xl font-medium mb-2">{products[1].name}</h3>
                <p className="text-neutral-600 mb-4">{products[1].description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ${products[1].salePrice ? Number(products[1].salePrice).toFixed(2) : Number(products[1].price).toFixed(2)}
                  </div>
                  <Link href={`/product/${products[1].id}`}>
                    <Button>
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {/* Lights Offer */}
          <div className="bg-white border-2 border-blue-500 rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560170412-0f438cfc87a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VpbGluZyUyMGxpZ2h0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Ceiling Lights" 
                className="w-full h-60 object-contain p-4"
              />
              <div className="absolute top-0 right-0 bg-blue-500 text-white font-bold py-2 px-4 rounded-bl-lg">
                NEW ARRIVALS
              </div>
            </div>
            <div className="p-6 border-t-2 border-blue-500">
              <h3 className="text-xl font-medium mb-2">Modern Ceiling Lights Collection</h3>
              <p className="text-neutral-600 mb-4">Contemporary designs for any room</p>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">From $45.00</div>
                <Link href="/category/lighting/ceiling">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
