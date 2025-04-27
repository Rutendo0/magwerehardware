import { FC, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, StarHalf } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/cart', {
        productId: product.id,
        quantity: 1
      });
    },
    onSuccess: () => {
      setIsAddingToCart(false);
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    },
    onError: (error) => {
      setIsAddingToCart(false);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add item to cart",
        variant: "destructive",
      });
    }
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    addToCartMutation.mutate();
  };

  // Helper function to render star ratings
  const renderStars = (rating: number = 4) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <Link href={`/product/${product.id}`}>
      <a className="product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg block h-full">
        <div className="relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-64 object-contain p-4"
          />
          {product.isOnSale && (
            <div className="absolute top-4 left-4">
              <span className="bg-secondary text-black text-xs font-bold py-1 px-2 rounded">SALE</span>
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <h3 className="font-medium text-lg mb-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {renderStars()}
            </div>
            <span className="text-sm text-neutral-500 ml-2">(24)</span>
          </div>
          <div className="flex items-end justify-between mt-3">
            <div>
              {product.salePrice && (
                <span className="text-neutral-500 line-through text-sm">${Number(product.price).toFixed(2)}</span>
              )}
              <div className="text-xl font-bold text-primary">
                ${Number(product.salePrice || product.price).toFixed(2)}
              </div>
            </div>
            <Button 
              className="flex items-center"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Add</span>
            </Button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
