import { FC, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { 
  Minus, 
  Plus,
  Truck,
  ShieldCheck,
  RefreshCw,
  CheckCircle,
  Star,
  StarHalf, 
  Share2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Product } from '@shared/schema';
import ProductCard from '@/components/ui/product-card';

const ProductDetail: FC = () => {
  const [match, params] = useRoute('/product/:id');
  const productId = params?.id ? parseInt(params.id) : undefined;
  const [quantity, setQuantity] = useState(1);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });
  
  const { data: relatedProducts, isLoading: relatedLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/featured/4'],
    enabled: !!product,
  });
  
  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/cart', {
        productId,
        quantity
      });
    },
    onSuccess: () => {
      setIsAddingToCart(false);
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Added to cart",
        description: `${product?.name} has been added to your cart.`,
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
  
  const handleAddToCart = () => {
    if (!product) return;
    setIsAddingToCart(true);
    addToCartMutation.mutate();
  };
  
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
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
  
  if (!match) return null;
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse h-8 w-1/3 bg-gray-200 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 w-3/4"></div>
            <div className="h-6 bg-gray-200 w-1/2"></div>
            <div className="h-6 bg-gray-200 w-1/4"></div>
            <div className="h-32 bg-gray-200 w-full"></div>
            <div className="h-12 bg-gray-200 w-full"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}>
            {product.category}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{product.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="relative">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-contain rounded-lg"
            />
            {product.isOnSale && (
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-black text-sm font-bold py-1 px-3 rounded">SALE</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {renderStars()}
            </div>
            <span className="text-neutral-500">(24 Reviews)</span>
          </div>
          
          <div className="mb-4">
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-primary mr-3">
                  ${Number(product.salePrice).toFixed(2)}
                </span>
                <span className="text-xl text-neutral-500 line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-primary">
                ${Number(product.price).toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-neutral-700 mb-6">{product.description}</p>
          
          {/* Brand */}
          {product.brand && (
            <div className="mb-6">
              <span className="text-neutral-500">Brand: </span>
              <span className="font-medium">{product.brand}</span>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="text-neutral-700 mr-4">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 h-10 text-center border-none"
              />
              <Button 
                variant="ghost" 
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !product.inStock}
            >
              {isAddingToCart ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="flex items-center justify-center"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
          
          {/* Product Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm">Free delivery available</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm">Quality guaranteed</span>
            </div>
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm">30-day return policy</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs - Description, Specifications, Reviews */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="bg-white p-6 rounded-lg shadow-sm mt-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                Sed euismod, nisl vel tincidunt lacinia, nunc est ultricies nisl, 
                eget ultricies nisl est vel nunc. Sed euismod, nisl vel tincidunt lacinia, 
                nunc est ultricies nisl, eget ultricies nisl est vel nunc.
              </p>
              <ul>
                <li>High-quality materials for durability</li>
                <li>Easy to use and maintain</li>
                <li>Compatible with standard fittings</li>
                <li>Designed for professional and DIY use</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="bg-white p-6 rounded-lg shadow-sm mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Product Specifications</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-neutral-500">Brand</td>
                      <td className="py-2 font-medium">{product.brand || 'MAGWERE'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-neutral-500">Model</td>
                      <td className="py-2 font-medium">MG-{product.id}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-neutral-500">Category</td>
                      <td className="py-2 font-medium">{product.category}</td>
                    </tr>
                    {product.subCategory && (
                      <tr className="border-b">
                        <td className="py-2 text-neutral-500">Sub-Category</td>
                        <td className="py-2 font-medium">{product.subCategory}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-2 text-neutral-500">Availability</td>
                      <td className="py-2 font-medium">
                        {product.inStock ? (
                          <span className="text-green-600">In Stock</span>
                        ) : (
                          <span className="text-red-600">Out of Stock</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Dimensions & Weight</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-neutral-500">Weight</td>
                      <td className="py-2 font-medium">2.5 kg</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-neutral-500">Dimensions</td>
                      <td className="py-2 font-medium">30 x 20 x 15 cm</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-neutral-500">Package Contents</td>
                      <td className="py-2 font-medium">1 x {product.name}, User Manual</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-neutral-500">Warranty</td>
                      <td className="py-2 font-medium">12 Months Manufacturer Warranty</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="bg-white p-6 rounded-lg shadow-sm mt-4">
            <div className="mb-6">
              <h3 className="font-medium text-lg mb-3">Customer Reviews</h3>
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {renderStars()}
                </div>
                <span className="text-lg font-medium">4.5 out of 5</span>
              </div>
              <p className="text-neutral-500">Based on 24 reviews</p>
            </div>
            
            <div className="space-y-6">
              {/* Sample review - in a real app, these would be fetched from an API */}
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {renderStars(5)}
                  </div>
                  <span className="font-medium">Excellent product</span>
                </div>
                <p className="text-sm text-neutral-500 mb-2">By John D. on May 15, 2023</p>
                <p>
                  Great quality product. Works exactly as described and the price was reasonable.
                  Would definitely recommend to others!
                </p>
              </div>
              
              <div className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {renderStars(4)}
                  </div>
                  <span className="font-medium">Good value for money</span>
                </div>
                <p className="text-sm text-neutral-500 mb-2">By Sarah M. on April 20, 2023</p>
                <p>
                  This product has been very useful for my DIY projects. The only small issue is that
                  the instructions could be clearer, but overall I'm satisfied with my purchase.
                </p>
              </div>
              
              <Link href="#" className="text-primary font-medium hover:underline inline-block">
                View all 24 reviews
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6">
              How long is the warranty period?
            </AccordionTrigger>
            <AccordionContent className="px-6">
              All our products come with a standard 12-month manufacturer warranty, which covers any defects in materials
              and workmanship under normal use.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="px-6">
              Do you offer installation services?
            </AccordionTrigger>
            <AccordionContent className="px-6">
              Yes, we offer professional installation services for most of our products, including solar systems.
              Please contact our customer service for more information and pricing.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="px-6">
              What is your return policy?
            </AccordionTrigger>
            <AccordionContent className="px-6">
              We offer a 30-day return policy for most products, provided they are in their original condition and packaging.
              Some exceptions apply for custom orders and certain categories of products.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="px-6">
              Do you ship internationally?
            </AccordionTrigger>
            <AccordionContent className="px-6">
              Currently, we only ship within the local region. For international orders or inquiries,
              please contact our customer service team directly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        
        {relatedLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, index) => (
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts?.filter(p => p.id !== product.id).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
