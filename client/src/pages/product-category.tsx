import { FC, useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductCard from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Category } from '@shared/schema';
import { ChevronRight, ChevronLeft, Filter, SlidersHorizontal, X, Grid3X3, LayoutGrid } from 'lucide-react';

// Import real images for categories
import solarImage from '@assets/IMG-20250419-WA0016.jpg';
import tileGroutImage from '@assets/IMG-20250419-WA0011.jpg';
import epoxyGroutImage from '@assets/IMG-20250419-WA0013.jpg';
import ceilingPlasterImage from '@assets/IMG-20250419-WA0019.jpg';
import woodVarnishImage from '@assets/IMG-20250419-WA0010.jpg';
import ceilingLightsImage from '@assets/IMG-20250419-WA0009.jpg';

// Mapping from category slugs to images
const categoryImageMap: Record<string, string> = {
  'solar-solutions': solarImage,
  'tile-grout': tileGroutImage,
  'epoxy-grout': epoxyGroutImage,
  'plaster': ceilingPlasterImage,
  'paints': woodVarnishImage,
  'lighting': ceilingLightsImage,
};

const ProductCategory: FC = () => {
  const [match, params] = useRoute('/category/:slug');
  const slug = params?.slug || '';
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug,
  });
  
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/category/${category?.name}`],
    enabled: !!category?.name,
  });
  
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
    return categoryImageMap[categorySlug] || categoryImageMap['solar-solutions']; // Default fallback
  };
  
  if (!match) return null;
  
  if (categoryLoading) {
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
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">The category you're looking for doesn't exist.</p>
        <Link href="/categories">
          <Button>Browse All Categories</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Category Banner */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={getCategoryBannerImage(slug)} 
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-white/90 max-w-xl">{category.description}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{category.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2 md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <X className="h-4 w-4 mr-1" /> : <Filter className="h-4 w-4 mr-1" />}
                {showFilters ? 'Hide Filters' : 'Filters'}
              </Button>
              
              <p className="text-neutral-600">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2 mr-4">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="w-44">
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
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
            <div className="mt-4 p-4 border-t md:hidden">
              <h3 className="font-medium mb-2">Filter Options</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-xs">Under $25</Button>
                    <Button variant="outline" size="sm" className="text-xs">$25-$50</Button>
                    <Button variant="outline" size="sm" className="text-xs">$50-$100</Button>
                    <Button variant="outline" size="sm" className="text-xs">$100+</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Availability</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-xs">In Stock</Button>
                    <Button variant="outline" size="sm" className="text-xs">On Sale</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className={`${viewMode === 'list' ? 'flex flex-col space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
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
              <div key={product.id} className={viewMode === 'list' ? 'bg-white rounded-lg shadow-md overflow-hidden' : ''}>
                {viewMode === 'list' ? (
                  <div className="flex">
                    <div className="w-1/3">
                      <Link href={`/product/${product.id}`}>
                        <a className="block h-full">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="p-6 flex-1">
                      <Link href={`/product/${product.id}`}>
                        <a className="block">
                          <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                        </a>
                      </Link>
                      <div className="flex items-center mb-3">
                        {/* Rating stars */}
                        <div className="flex text-yellow-400">
                          {Array(5).fill(0).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                          <span className="text-sm text-neutral-500 ml-2">(24)</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.salePrice && (
                            <span className="text-neutral-500 line-through text-sm mr-2">${Number(product.price).toFixed(2)}</span>
                          )}
                          <span className="text-xl font-bold text-primary">
                            ${Number(product.salePrice || product.price).toFixed(2)}
                          </span>
                        </div>
                        <Button>Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ProductCard product={product} />
                )}
              </div>
            ))
          ) : (
            // No products found
            <div className="col-span-full text-center py-16">
              <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
              <p className="text-neutral-600 mb-8">There are no products in this category yet.</p>
              <Link href="/">
                <Button>Continue Shopping</Button>
              </Link>
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
  );
};

export default ProductCategory;
