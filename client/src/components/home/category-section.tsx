import { FC } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from '@/components/ui/category-card';
import { ArrowRight } from 'lucide-react';
import { Category } from '@shared/schema';

const CategorySection: FC = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">Find everything you need for your next project</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                <div className="h-40 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 w-2/3 bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading categories:", error);
    return <div>Error loading categories. Please try again later.</div>;
  }

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold mb-4">Shop By Category</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Find everything you need for your next project in our wide range of product categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories?.slice(0, 4).map((category) => (
            <CategoryCard 
              key={category.id}
              name={category.name}
              productCount={category.productCount}
              imageUrl={category.imageUrl}
              href={`/category/${category.slug}`}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/categories">
            <a className="inline-flex items-center text-primary hover:text-primary-700 font-medium">
              <span>View All Categories</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
