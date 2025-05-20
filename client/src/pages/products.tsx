
import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ui/product-card';
import { Input } from '@/components/ui/input';
import { Product } from '@shared/schema';

const Products: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">All Products</h1>
        <Input
          type="search"
          placeholder="Search products..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
              <p className="text-gray-600">Try adjusting your search terms.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
