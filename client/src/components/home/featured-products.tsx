import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@shared/schema';

const FeaturedProducts: FC = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/featured/4'],
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  // Calculate total pages
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

  // Handle navigation
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current items
  const getCurrentItems = () => {
    if (!products) return [];
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return products.slice(start, end);
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-heading font-bold">Featured Products</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mb-4 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 w-1/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading featured products:", error);
    return <div>Error loading featured products. Please try again later.</div>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-heading font-bold">Featured Products</h2>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getCurrentItems().map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
