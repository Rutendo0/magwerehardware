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
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ProductCategory: FC = () => {
  const [match, params] = useRoute('/category/:slug');
  const slug = params?.slug || '';
  const [sortOption, setSortOption] = useState('featured');
  
  const { data: category, isLoading: categoryLoading } = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug,
  });
  
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/category/${category?.name}`],
    enabled: !!category?.name,
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
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
  
  if (!match) return null;
  
  if (categoryLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse h-8 w-1/3 bg-gray-200 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
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
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-neutral-600">{category.description}</p>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <p className="text-neutral-600">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
          </p>
        </div>
        
        <div className="w-full md:w-64">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger>
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
      
      {productsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
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
      ) : currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
          <p className="text-neutral-600 mb-8">There are no products in this category yet.</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                className={currentPage === page ? "bg-primary text-white" : ""}
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
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
