import { FC } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  productCount?: number;
  href: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ 
  name, 
  imageUrl, 
  productCount = 0, 
  href 
}) => {
  const [_, navigate] = useLocation();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <div 
      onClick={handleClick}
      className="category-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:-translate-y-1 block cursor-pointer"
    >
      <div className="h-40 bg-gray-100 relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-medium">{name}</h3>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <span className="text-sm text-neutral-500">{productCount} Products</span>
        <ArrowRight className="text-primary h-4 w-4" />
      </div>
    </div>
  );
};

export default CategoryCard;
