import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@shared/schema';
import { useQueryClient } from '@tanstack/react-query';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const queryClient = useQueryClient();

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) throw new Error('Failed to add to cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-lg">
              {star <= Math.floor(product.rating ?? 0) ? "★" : "☆"}
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-2">
            ({product.numReviews ?? 0})
          </span>
        </div>
        <div className="mt-auto">
          <div className="text-xl font-bold text-primary mb-3">
            ${Number(product.price).toFixed(2)}
          </div>
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;