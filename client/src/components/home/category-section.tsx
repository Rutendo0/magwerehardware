import { FC } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Category } from '@shared/schema';

// Import real product images
import solarImage from '@assets/IMG-20250419-WA0016.jpg';
import tileGroutImage from '@assets/IMG-20250419-WA0011.jpg';
import epoxyGroutImage from '@assets/IMG-20250419-WA0013.jpg';
import ceilingPlasterImage from '@assets/IMG-20250419-WA0019.jpg';
import woodVarnishImage from '@assets/IMG-20250419-WA0010.jpg';

interface EnhancedCategoryProps {
  title: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
}

const CategoryCard: FC<EnhancedCategoryProps> = ({ title, description, image, href, featured }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden transition duration-300 ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
    <img 
    src={image} 
    alt={title} 
    className="h-64 w-full object-cover"
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = '/attached_assets/WhatsApp Image 2025-05-14 at 10.49.24.jpeg';
    }}
  />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  </div>
);

const CategorySection: FC = () => {
  const [_, navigate] = useLocation();
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">Find everything you need for your next project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className={`bg-white rounded-xl shadow-md overflow-hidden transition duration-300 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className={`bg-gray-200 animate-pulse ${i === 0 ? 'h-96' : 'h-64'}`}></div>
                <div className="p-6">
                  <div className="h-6 w-2/3 bg-gray-200 animate-pulse mb-3"></div>
                  <div className="h-4 w-full bg-gray-200 animate-pulse mb-4"></div>
                  <div className="h-10 w-1/3 bg-gray-200 animate-pulse"></div>
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
    return <div className="text-center py-16">Error loading categories. Please try again later.</div>;
  }

  const enhancedCategories: EnhancedCategoryProps[] = [
    {
      title: "Solar Solutions",
      description: "Complete solar equipment and installation packages for homes and businesses",
      image: solarImage,
      href: "/category/solar-solutions",
      featured: false
    },
    {
      title: "Tile Grout",
      description: "Fast-setting adhesives for interior and exterior joints with superior durability",
      image: tileGroutImage,
      href: "/category/building/tile-grout"
    },
    {
      title: "Epoxy Grout",
      description: "Revolutionary epoxy grout that peels right off with a blade, no messy clean-up",
      image: epoxyGroutImage,
      href: "/category/building/adhesives"
    },
    {
      title: "Ceiling Plaster",
      description: "High-quality gypsum-based plaster for smooth, durable ceiling and wall surfaces",
      image: ceilingPlasterImage,
      href: "/category/building/plaster"
    },
    {
      title: "Wood Finishes",
      description: "Protect your wooden surfaces with our premium selection of varnishes and stains",
      image: woodVarnishImage,
      href: "/category/paints"
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Find everything you need for your next project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enhancedCategories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              image={category.image}
              href={category.href}
              featured={category.featured}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="mt-4 group"
            onClick={() => navigate('/categories')}
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;