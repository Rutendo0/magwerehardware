import { FC, useState } from 'react';
import { Link } from 'wouter';
import { ShoppingCart } from 'lucide-react';
import { Button } from './button';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const cartSession = localStorage.getItem('cartSessionId');
      const sessionId = localStorage.getItem('cartSessionId') || crypto.randomUUID();
      localStorage.setItem('cartSessionId', sessionId);
      
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionId
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      await queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      const result = await response.json();
      
      // Update the cart cache
      await queryClient.refetchQueries({ queryKey: ['/api/cart'] });
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart`,
        duration: 3000,
        action: (
          <Link href="/cart">
            <Button variant="outline" size="sm">
              View Cart
            </Button>
          </Link>
        ),
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const displayPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numericPrice.toFixed(2);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl group">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48">
          <img
            src={imageError ? '/attached_assets/Logo.png' : 
                 product.imageUrl.startsWith('http') ? product.imageUrl : 
                 `/attached_assets/${product.imageUrl.replace('/attached_assets/', '')}`}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Failed to load product image:', (e.target as HTMLImageElement).src);
              handleImageError();
            }}
            loading="lazy"
          />
          {product.isOnSale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
              Sale
            </div>
          )}
        </div>
      </Link>
      <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="mt-auto">
          <div className="text-xl font-bold text-primary mb-3">
            ${displayPrice(product.salePrice || product.price)}
          </div>
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            disabled={!product.inStock || isAdding}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;