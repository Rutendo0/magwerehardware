import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MagwereLogo from '@/lib/magwere-logo';
import MobileMenu from './mobile-menu';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-primary text-white py-1 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm hidden md:block">Shop 4, Avonlea Shopping Center, Greencroft Shops</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-secondary mr-2">📞</span>
              <span>0779 656 666</span>
            </div>
            <div className="flex space-x-2">
              <a href="#" className="text-white hover:text-secondary">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-secondary">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto py-4 px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="mb-4 md:mb-0">
              <MagwereLogo />
            </a>
          </Link>
          
          {/* Search */}
          <div className="w-full md:w-1/2 lg:w-2/5 mb-4 md:mb-0">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-4 pr-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                variant="ghost" 
                className="absolute right-2 top-2 h-6 w-6 p-0 text-primary"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>
          
          {/* Cart & Account */}
          <div className="flex items-center space-x-4">
            <Link href="/account">
              <a className="flex items-center text-neutral-800 hover:text-primary">
                <User className="h-5 w-5 mr-1" />
                <span className="hidden md:inline">Account</span>
              </a>
            </Link>
            <Link href="/cart">
              <a className="flex items-center text-neutral-800 hover:text-primary relative">
                <ShoppingCart className="h-5 w-5 mr-1" />
                <span className="hidden md:inline">Cart</span>
                <span className="absolute -top-2 -right-2 bg-secondary text-neutral-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-gray-100">
        <div className="container mx-auto px-4 md:px-0">
          <div className="flex justify-between">
            <div className="hidden md:flex space-x-6 py-3">
              <Link href="/">
                <a className={`font-medium ${location === '/' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  Home
                </a>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center font-medium text-neutral-800 hover:text-primary">
                  Power Tools
                  <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/category/power-tools/drills">
                      <a className="w-full">Drills & Drivers</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/power-tools/saws">
                      <a className="w-full">Saws</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/power-tools/grinders">
                      <a className="w-full">Grinders</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/power-tools/batteries">
                      <a className="w-full">Batteries & Chargers</a>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center font-medium text-neutral-800 hover:text-primary">
                  Solar Solutions
                  <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/category/solar-solutions/panels">
                      <a className="w-full">Solar Panels</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/solar-solutions/batteries">
                      <a className="w-full">Batteries</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/solar-solutions/inverters">
                      <a className="w-full">Inverters</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/solar-solutions/kits">
                      <a className="w-full">Installation Kits</a>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center font-medium text-neutral-800 hover:text-primary">
                  Building & Construction
                  <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/category/building/adhesives">
                      <a className="w-full">Adhesives</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/building/tile-grout">
                      <a className="w-full">Tile Grout</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/building/plaster">
                      <a className="w-full">Plaster</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/category/building/paints">
                      <a className="w-full">Paints & Varnishes</a>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link href="/bulk-orders">
                <a className={`font-medium ${location === '/bulk-orders' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  Bulk Orders
                </a>
              </Link>
              
              <Link href="/contact">
                <a className={`font-medium ${location === '/contact' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  Contact
                </a>
              </Link>
            </div>
            
            <Button 
              variant="ghost"
              className="md:hidden py-3 text-neutral-800" 
              onClick={() => setIsMenuOpen(true)}
            >
              <i className="fas fa-bars text-xl"></i>
            </Button>
            
            <div className="hidden md:block py-3">
              <Link href="/refer">
                <a className="text-primary font-medium">Refer & Earn</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
