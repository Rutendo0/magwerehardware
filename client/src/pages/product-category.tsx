import { FC, useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Category } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Grid3X3, 
  LayoutGrid,
  Star,
  StarHalf,
  ShoppingCart,
  FileSearch
} from 'lucide-react';

// Import real images for categories
import solarImage from '@assets/IMG-20250419-WA0016.jpg';
import tileGroutImage from '@assets/IMG-20250419-WA0011.jpg';
import epoxyGroutImage from '@assets/IMG-20250419-WA0013.jpg';
import buidingmaterials from '@assets/IMG-20250419-WA0019.jpg';
import woodVarnishImage from '@assets/IMG-20250419-WA0010.jpg';
import ceilingLightsImage from '@assets/IMG-20250419-WA0009.jpg';
import powerToolsImage from '@assets/IMG-20250419-WA0019.jpg';

// Mapping from category slugs to images
const categoryImageMap: Record<string, string> = {
  'power-tools': powerToolsImage,
  'solar-solutions': solarImage,
  'tiling-materials': tileGroutImage,
  'building-materials': tileGroutImage,
  'paints-finishes': woodVarnishImage,
  'lighting': ceilingLightsImage,
};

// Helper function to render star ratings
const renderStars = (rating: number = 4) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400 h-4 w-4 mr-1" />);
  }
  
  if (hasHalfStar) {
    stars.push(<StarHalf key="half-star" className="fill-yellow-400 text-yellow-400 h-4 w-4 mr-1" />);
  }
  
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-star-${i}`} className="text-yellow-400 h-4 w-4 mr-1" />);
  }
  
  return stars;
};

// Product List Item Component for List View
const ProductListItem: FC<{ product: Product }> = ({ product }) => {
  const [_, navigate] = useLocation();
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
    e.stopPropagation();
    setIsAddingToCart(true);
    addToCartMutation.mutate();
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div 
        className="relative w-full sm:w-1/3 h-64 sm:h-auto cursor-pointer"
        onClick={handleProductClick}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain p-4"
        />
        {product.isOnSale && (
          <div className="absolute top-4 left-4">
            <span className="bg-secondary text-black text-sm font-medium py-1 px-3 rounded-sm">SALE</span>
          </div>
        )}
        {product.featured && !product.isOnSale && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white text-sm font-medium py-1 px-3 rounded-sm">FEATURED</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-5 flex flex-col">
        <div
          className="cursor-pointer"
          onClick={handleProductClick}
        >
          <h3 className="text-xl font-medium mb-2 hover:text-primary transition-colors">{product.name}</h3>
          
          <div className="flex items-center mb-3">
            <div className="flex">{renderStars()}</div>
            <span className="text-sm text-gray-500 ml-1">(24 reviews)</span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600 line-clamp-3">{product.description}</p>
          </div>
        </div>
        
        <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-3 sm:mb-0">
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary mr-2">${Number(product.salePrice).toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${Number(product.price).toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-primary">${Number(product.price).toFixed(2)}</span>
            )}
            
            <div className="text-sm text-green-600 mt-1">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleProductClick}
              className="flex gap-2 items-center"
            >
              <FileSearch className="h-4 w-4" />
              <span>Details</span>
            </Button>
            
            <Button 
              size="sm"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !product.inStock}
              className="flex gap-2 items-center"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Grid Item Component for Grid View
const ProductGridItem: FC<{ product: Product }> = ({ product }) => {
  const [_, navigate] = useLocation();
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
    e.stopPropagation();
    setIsAddingToCart(true);
    addToCartMutation.mutate();
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div 
        className="relative h-64 cursor-pointer" 
        onClick={handleProductClick}
      >
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain p-4"
        />
        {product.isOnSale && (
          <div className="absolute top-4 left-4">
            <span className="bg-secondary text-black text-sm font-medium py-1 px-3 rounded-sm">SALE</span>
          </div>
        )}
        {product.featured && !product.isOnSale && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white text-sm font-medium py-1 px-3 rounded-sm">FEATURED</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col border-t border-gray-100">
        <div
          className="cursor-pointer mb-2"
          onClick={handleProductClick}
        >
          <h3 className="font-medium text-lg line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex">{renderStars()}</div>
          <span className="text-xs text-gray-500 ml-1">(24)</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-3">
            <div>
              {product.salePrice ? (
                <div>
                  <span className="text-gray-500 text-sm line-through block">${Number(product.price).toFixed(2)}</span>
                  <span className="text-lg font-bold text-primary">${Number(product.salePrice).toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-primary">${Number(product.price).toFixed(2)}</span>
              )}
            </div>
            <div className="text-xs text-green-600">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>
          </div>
          
          <Button 
            className="w-full"
            size="sm"
            onClick={handleAddToCart}
            disabled={isAddingToCart || !product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main Category Component
const ProductCategory: FC = () => {
  const [match, params] = useRoute('/category/:slug');
  const [allProductsMatch] = useRoute('/products');
  const [_, navigate] = useLocation();
  const slug = params?.slug || '';
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug && !allProductsMatch,
  });
  
  // Fetch all products if we're on the /products route
  const { data: allProducts, isLoading: allProductsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: !!allProductsMatch,
  });
  
  const { data: categoryProducts, isLoading: categoryProductsLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/category/${category?.name}`],
    enabled: !!category?.name && !allProductsMatch,
  });
  
  // Use the appropriate products data source
  const products = allProductsMatch ? allProducts : categoryProducts;
  const productsLoading = allProductsMatch ? allProductsLoading : categoryProductsLoading;
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // Sort products based on selected option
  const sortedProducts = products ? [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return Number(a.salePrice || a.price) - Number(b.salePrice || b.price);
      case 'price-high':
        return Number(b.salePrice || b.price) - Number(a.salePrice || a.price);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return a.featured ? -1 : 1;
    }
  }) : [];
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil((sortedProducts?.length || 0) / productsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Reset to page 1 when sort option changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption]);
  
  // Get the banner image for the category
  const getCategoryBannerImage = (categorySlug: string): string => {
    return categoryImageMap[categorySlug] || categoryImageMap['power-tools']; // Default fallback
  };
  
  if (!match) return null;
  
  // Loading state
  if (categoryLoading || (allProductsMatch && allProductsLoading)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse h-8 w-1/3 bg-gray-200 mb-4"></div>
        <div className="h-48 bg-gray-200 animate-pulse rounded-xl mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(9).fill(0).map((_, index) => (
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
      </div>
    );
  }
  
  // If we're on the all products route
  if (allProductsMatch) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Category Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={powerToolsImage} 
            alt="All Products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">All Products</h1>
              <p className="text-white/90 max-w-xl text-base md:text-lg">
                Browse our complete collection of high-quality hardware and construction materials
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink 
                className="cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                All Products
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white p-5 rounded-lg shadow-sm sticky top-6">
                <h3 className="font-bold text-lg mb-4 border-b pb-2">Filters</h3>
                
                <div className="space-y-5">
                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="price-1" className="rounded text-primary mr-2" />
                        <label htmlFor="price-1" className="text-sm">Under $25</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price-2" className="rounded text-primary mr-2" />
                        <label htmlFor="price-2" className="text-sm">$25 - $50</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price-3" className="rounded text-primary mr-2" />
                        <label htmlFor="price-3" className="text-sm">$50 - $100</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price-4" className="rounded text-primary mr-2" />
                        <label htmlFor="price-4" className="text-sm">$100 - $200</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="price-5" className="rounded text-primary mr-2" />
                        <label htmlFor="price-5" className="text-sm">$200+</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Availability</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="stock" className="rounded text-primary mr-2" />
                        <label htmlFor="stock" className="text-sm">In Stock</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="sale" className="rounded text-primary mr-2" />
                        <label htmlFor="sale" className="text-sm">On Sale</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Rating</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="rating-5" className="rounded text-primary mr-2" />
                        <label htmlFor="rating-5" className="text-sm flex items-center">
                          <div className="flex text-yellow-400 mr-1">
                            {Array(5).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          & Up
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="rating-4" className="rounded text-primary mr-2" />
                        <label htmlFor="rating-4" className="text-sm flex items-center">
                          <div className="flex text-yellow-400 mr-1">
                            {Array(4).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          & Up
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="rating-3" className="rounded text-primary mr-2" />
                        <label htmlFor="rating-3" className="text-sm flex items-center">
                          <div className="flex text-yellow-400 mr-1">
                            {Array(3).fill(0).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          & Up
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-6">Apply Filters</Button>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Products Grid */}
              <div className={`${viewMode === 'list' ? 'flex flex-col space-y-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}`}>
                {productsLoading ? (
                  // Loading skeleton
                  Array(9).fill(0).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                      <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                        <div className={`${viewMode === 'list' ? 'w-1/3' : ''} h-48 bg-gray-200`}></div>
                        <div className="p-4 flex-1">
                          <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
                          <div className="h-8 bg-gray-200 w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : currentProducts.length > 0 ? (
                  // Render products in grid or list view
                  currentProducts.map(product => (
                    <div key={product.id}>
                      {viewMode === 'list' ? (
                        <ProductListItem product={product} />
                      ) : (
                        <ProductGridItem product={product} />
                      )}
                    </div>
                  ))
                ) : (
                  // No products found
                  <div className="col-span-full text-center py-16">
                    <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
                    <p className="text-neutral-600 mb-8">There are no products available at the moment.</p>
                    <Button onClick={() => navigate('/')}>
                      Return to Home
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-9 w-9"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className={`${currentPage === page ? "bg-primary text-white" : ""} h-9 w-9`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-9 w-9"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show all products page if we're on /products route
  if (allProductsMatch) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={powerToolsImage} 
            alt="All Products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">All Products</h1>
              <p className="text-white/90 max-w-xl text-base md:text-lg">
                Browse our complete collection of high-quality hardware and construction materials
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content Area */}
            <div className="flex-1">
              <div className={`${viewMode === 'list' ? 'flex flex-col space-y-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}`}>
                {productsLoading ? (
                  Array(9).fill(0).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                      <div className="h-64 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 w-1/3"></div>
                      </div>
                    </div>
                  ))
                ) : currentProducts.length > 0 ? (
                  currentProducts.map(product => (
                    <div key={product.id}>
                      {viewMode === 'list' ? (
                        <ProductListItem product={product} />
                      ) : (
                        <ProductGridItem product={product} />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
                    <p className="text-neutral-600 mb-8">There are no products available at the moment.</p>
                    <Button onClick={() => navigate('/')}>Return to Home</Button>
                  </div>
                )}
                {productsLoading ? (
                  Array(9).fill(0).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                      <div className="h-64 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 w-1/3"></div>
                      </div>
                    </div>
                  ))
                ) : currentProducts.length > 0 ? (
                  currentProducts.map(product => (
                    <div key={product.id}>
                      {viewMode === 'list' ? (
                        <ProductListItem product={product} />
                      ) : (
                        <ProductGridItem product={product} />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
                    <p className="text-neutral-600 mb-8">There are no products available at the moment.</p>
                    <Button onClick={() => navigate('/')}>Return to Home</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Category not found
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">The category you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/categories')}>
          Browse All Categories
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={getCategoryBannerImage(slug)} 
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-white/90 max-w-xl text-base md:text-lg">{category.description}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink 
              className="cursor-pointer"
              onClick={() => navigate('/')}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink 
              className="cursor-pointer"
              onClick={() => navigate('/categories')}
            >
              Categories
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{category.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-5 rounded-lg shadow-sm sticky top-6">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Filters</h3>
              
              <div className="space-y-5">
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="price-1" className="rounded text-primary mr-2" />
                      <label htmlFor="price-1" className="text-sm">Under $25</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-2" className="rounded text-primary mr-2" />
                      <label htmlFor="price-2" className="text-sm">$25 - $50</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-3" className="rounded text-primary mr-2" />
                      <label htmlFor="price-3" className="text-sm">$50 - $100</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-4" className="rounded text-primary mr-2" />
                      <label htmlFor="price-4" className="text-sm">$100 - $200</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-5" className="rounded text-primary mr-2" />
                      <label htmlFor="price-5" className="text-sm">$200+</label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="stock" className="rounded text-primary mr-2" />
                      <label htmlFor="stock" className="text-sm">In Stock</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="sale" className="rounded text-primary mr-2" />
                      <label htmlFor="sale" className="text-sm">On Sale</label>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Rating</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-5" className="rounded text-primary mr-2" />
                      <label htmlFor="rating-5" className="text-sm flex items-center">
                        <div className="flex text-yellow-400 mr-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        & Up
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-4" className="rounded text-primary mr-2" />
                      <label htmlFor="rating-4" className="text-sm flex items-center">
                        <div className="flex text-yellow-400 mr-1">
                          {Array(4).fill(0).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        & Up
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-3" className="rounded text-primary mr-2" />
                      <label htmlFor="rating-3" className="text-sm flex items-center">
                        <div className="flex text-yellow-400 mr-1">
                          {Array(3).fill(0).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                        & Up
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6">Apply Filters</Button>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0 flex items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2 lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    {showFilters ? <X className="h-4 w-4 mr-1" /> : <Filter className="h-4 w-4 mr-1" />}
                    {showFilters ? 'Hide Filters' : 'Filters'}
                  </Button>
                  
                  <p className="text-neutral-600 text-sm">
                    Showing <span className="font-medium">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)}</span> of <span className="font-medium">{sortedProducts.length}</span> products
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <div className="hidden md:flex items-center space-x-2 mr-4">
                    <Button 
                      variant={viewMode === 'grid' ? 'default' : 'outline'} 
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="h-8 w-8"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={viewMode === 'list' ? 'default' : 'outline'} 
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="h-8 w-8"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="w-full md:w-44">
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="text-sm">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Mobile Filters (shown/hidden based on state) */}
              {showFilters && (
                <div className="mt-4 p-4 border-t lg:hidden">
                  <h3 className="font-medium mb-3">Filter Options</h3>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Price Range</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="m-price-1" className="rounded text-primary mr-2" />
                          <label htmlFor="m-price-1" className="text-sm">Under $25</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="m-price-2" className="rounded text-primary mr-2" />
                          <label htmlFor="m-price-2" className="text-sm">$25 - $50</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="m-price-3" className="rounded text-primary mr-2" />
                          <label htmlFor="m-price-3" className="text-sm">$50 - $100</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="m-price-4" className="rounded text-primary mr-2" />
                          <label htmlFor="m-price-4" className="text-sm">$100+</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <h4 className="text-sm font-medium mb-2">Availability</h4>
                      <div className="flex space-x-6">
                        <div className="flex items-center">
                          <input type="checkbox" id="m-stock" className="rounded text-primary mr-2" />
                          <label htmlFor="m-stock" className="text-sm">In Stock</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="m-sale" className="rounded text-primary mr-2" />
                          <label htmlFor="m-sale" className="text-sm">On Sale</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button size="sm">Apply Filters</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Product Grid/List */}
            <div className={`${viewMode === 'list' ? 'flex flex-col space-y-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}`}>
              {productsLoading ? (
                // Loading skeleton
                Array(9).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className={`${viewMode === 'list' ? 'flex' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'w-1/3' : ''} h-48 bg-gray-200`}></div>
                      <div className="p-4 flex-1">
                        <div className="h-6 bg-gray-200 w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : currentProducts.length > 0 ? (
                // Render products in grid or list view
                currentProducts.map(product => (
                  <div key={product.id}>
                    {viewMode === 'list' ? (
                      <ProductListItem product={product} />
                    ) : (
                      <ProductGridItem product={product} />
                    )}
                  </div>
                ))
              ) : (
                // No products found
                <div className="col-span-full text-center py-16">
                  <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
                  <p className="text-neutral-600 mb-8">There are no products in this category yet.</p>
                  <Button onClick={() => navigate('/')}>
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={`${currentPage === page ? "bg-primary text-white" : ""} h-9 w-9`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
