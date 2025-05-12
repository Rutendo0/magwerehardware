import { FC, useState } from 'react';
import { Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { CartItem, Product } from '@shared/schema';
import { error } from 'console';

interface CartItemWithProduct extends CartItem {
  product?: Product;
}

interface CartResponse {
  sessionId: string;
  items: CartItemWithProduct[];
}

const Cart: FC = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [processingItemId, setProcessingItemId] = useState<number | null>(null);
  
 // Modify your cart queries to include the session ID
const { data: cart, isLoading, error } = useQuery<CartResponse>({
  queryKey: ['/api/cart'],
  queryFn: async () => {
    const sessionId = localStorage.getItem('cartSessionId') || '';
    const response = await fetch('/api/cart', {
      headers: {
        'Authorization': sessionId
      }
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  }
});
  const updateCartItemMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      return apiRequest('PATCH', `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      setProcessingItemId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update cart",
        variant: "destructive",
      });
      setProcessingItemId(null);
    }
  });
  
  const removeCartItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest('DELETE', `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart."
      });
      setProcessingItemId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove item",
        variant: "destructive",
      });
      setProcessingItemId(null);
    }
  });
  
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('DELETE', '/api/cart');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart."
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to clear cart",
        variant: "destructive",
      });
    }
  });
  
  const handleQuantityChange = (item: CartItemWithProduct, newQuantity: number) => {
    if (newQuantity < 1) return;
    setProcessingItemId(item.id);
    updateCartItemMutation.mutate({ id: item.id, quantity: newQuantity });
  };
  
  const handleRemoveItem = (id: number) => {
    setProcessingItemId(id);
    removeCartItemMutation.mutate(id);
  };
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCartMutation.mutate();
    }
  };
  
  // Calculate totals
  const calculateSubtotal = (items: CartItemWithProduct[]) => {
    return items.reduce((sum, item) => {
      const price = item.product?.salePrice || item.product?.price || 0;
      return sum + (Number(price) * item.quantity);
    }, 0);
  };
  
  const calculateTotal = (subtotal: number) => {
    return subtotal; // In a real app, you might add tax, shipping, etc.
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 mb-4 rounded"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          An error occurred while loading your cart. Please try again later.
        </div>
      </div>
    );
  }
  
  const items = cart?.items || [];
  const isEmpty = items.length === 0;
  
  if (isEmpty) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-20 h-20 mb-4">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-neutral-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const subtotal = calculateSubtotal(items);
  const total = calculateTotal(subtotal);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <img 
                          src={item.product?.imageUrl} 
                          alt={item.product?.name} 
                          className="w-16 h-16 object-contain mr-4 rounded"
                        />
                        <div>
                          <Link href={`/product/${item.productId}`}>
                            <a className="font-medium hover:text-primary">
                              {item.product?.name}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      ${Number(item.product?.salePrice || item.product?.price).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={processingItemId === item.id || item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 1)}
                          className="w-12 h-8 text-center mx-2"
                          disabled={processingItemId === item.id}
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          disabled={processingItemId === item.id}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${(Number(item.product?.salePrice || item.product?.price) * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={processingItemId === item.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline"
              onClick={handleClearCart}
              disabled={clearCartMutation.isPending}
            >
              Clear Cart
            </Button>
            
            <Link href="/products">
              <Button variant="ghost" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full">
              Proceed to Checkout
            </Button>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">We Accept</h3>
              <div className="flex space-x-2">
                <div className="bg-gray-100 rounded p-2 text-xs">Credit Card</div>
                <div className="bg-gray-100 rounded p-2 text-xs">PayPal</div>
                <div className="bg-gray-100 rounded p-2 text-xs">Bank Transfer</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h3 className="font-medium mb-2">Have a coupon?</h3>
            <div className="flex">
              <Input 
                type="text" 
                placeholder="Enter coupon code"
                className="rounded-r-none"
              />
              <Button className="rounded-l-none">
                Apply
              </Button>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <h3 className="text-green-800 font-medium mb-1">Free Shipping</h3>
            <p className="text-green-700 text-sm">
              Enjoy free shipping on all orders over $500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
