
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@shared/schema';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ui/product-card';

const ProductCategory: FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products', slug],
    queryFn: async () => {
      const endpoint = slug ? `/api/products/category/${slug}` : '/api/products';
      const response = await fetch(endpoint);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch products');
      }
      const data = await response.json();
      return data;
    },
    enabled: true
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
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
      </div>
    );
  }

  if (error) {
    console.error("Error fetching products:", error);
    return <div className="text-center py-16">Error loading products. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;