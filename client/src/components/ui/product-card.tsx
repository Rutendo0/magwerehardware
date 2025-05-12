import { FC } from 'react';
import { Link } from 'wouter';
import { ShoppingCart } from 'lucide-react';
import { Button } from './button';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
  };

  const displayPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numericPrice.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.isOnSale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
              Sale
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-auto">
          <div className="text-xl font-bold text-primary mb-3">
            ${displayPrice(product.salePrice || product.price)}
          </div>
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            disabled={!product.inStock}
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