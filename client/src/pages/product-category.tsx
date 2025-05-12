
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import ProductCard from '@/components/ui/product-card';
import type { Product } from '@shared/schema';

const ProductCategory: FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products', 'category', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Category slug is required');
      const response = await fetch(`/api/products/category/${slug}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
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
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-gray-600">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
