import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Category } from '@shared/schema';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CategoriesPage: FC = () => {
  const [_, navigate] = useLocation();
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  if (isLoading) {
    return <div className="text-center py-16">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center py-16">Error loading categories.</div>;
  }

  if (!categories || categories.length === 0) {
    return <div className="text-center py-16">No categories found.</div>;
  }

  // Remove duplicates by slug
  const uniqueCategories = categories.reduce((acc, current) => {
    const x = acc.find(item => item.slug === current.slug);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as Category[]);

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">All Categories</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {uniqueCategories.map((category) => (
            <div 
              key={category.id || category.slug}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              onClick={() => navigate(`/category/${category.slug}`)}
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src={category.imageUrl ?? undefined}
                  alt={category.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/attached_assets/WhatsApp Image 2025-05-14 at 10.49.24.jpeg';
                  }}
                />
              </div>
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <p className="text-neutral-500 mb-4">{category.description || "No description provided."}</p>
              <Button variant="outline" className="w-full">
                View Products
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;