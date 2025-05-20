import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import MagwareLogo from '@/lib/magware-logo';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, Phone, Mail, User, Search, Heart, X } from 'lucide-react';
import MobileMenu from './mobile-menu';
import { Category } from '@shared/schema';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [_, navigate] = useLocation();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchOpen(false);
      // Navigate to search results
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const { data: cart } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: async () => {
      const response = await fetch('/api/cart', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch cart');
      return response.json();
    }
  });

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              <span>+263 77 777 7777</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              <span>info@magwere.co.zw</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <button 
              className="flex items-center hover:text-primary"
              onClick={() => navigate('/about')}
            >
              About Us
            </button>
            <button 
              className="flex items-center hover:text-primary"
              onClick={() => navigate('/contact')}
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div 
        className={`bg-white py-3 shadow-sm transition-all duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => navigate('/')} 
                className="block px-4 py-2 rounded-lg transition-transform hover:scale-105"
              >
                <MagwareLogo className="h-16" />
              </button>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                className="font-medium hover:text-primary"
                onClick={() => navigate('/')}
              >
                Home
              </button>

              <div className="group relative">
                <button 
                  className="font-medium hover:text-primary inline-flex items-center"
                  onClick={() => navigate('/products')}
                >
                  Products
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                <div className="absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    {categories?.map((category) => (
                      <button 
                        key={category.id}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => navigate(`/category/${category.slug}`)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                className="font-medium hover:text-primary"
                onClick={() => navigate('/category/solar-solutions')}
              >
                Solar Solutions
              </button>

              <button 
                className="font-medium hover:text-primary"
                onClick={() => navigate('/bulk-orders')}
              >
                Bulk Orders
              </button>

              <button 
                className="font-medium hover:text-primary"
                onClick={() => navigate('/contact')}
              >
                Contact
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 hidden sm:flex"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 hidden sm:flex"
                onClick={() => navigate('/account')}
              >
                <User className="h-5 w-5" />
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-700 hidden sm:flex"
                onClick={() => navigate('/account')}
              >
                <Heart className="h-5 w-5" />
              </Button>

              <Button 
                variant="outline" 
                size="icon"
                className="relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart?.items?.length || 0}
                </span>
              </Button>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div 
        className={`bg-gray-100 py-3 shadow-inner transition-all duration-300 ${
          searchOpen ? 'opacity-100 h-16' : 'opacity-0 h-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit"
              className="rounded-l-none"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;