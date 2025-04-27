import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, User, Menu, Facebook, Instagram, Phone, ChevronDown } from 'lucide-react';
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

// Custom Link component to prevent nesting <a> elements
const NavLink = ({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) => {
  const [location] = useLocation();
  const isActive = location === href;

  const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = href;
  };

  return (
    <a 
      href={href} 
      className={className || `font-medium ${isActive ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`} 
      onClick={onClickHandler}
    >
      {children}
    </a>
  );
};

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
              <Phone size={16} className="text-secondary mr-2" />
              <span>0779 656 666</span>
            </div>
            <div className="flex space-x-2">
              <a href="#" className="text-white hover:text-secondary">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-white hover:text-secondary">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto py-4 px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <div className="cursor-pointer">
                <MagwereLogo />
              </div>
            </Link>
          </div>
          
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
              <div className="flex items-center text-neutral-800 hover:text-primary cursor-pointer">
                <User className="h-5 w-5 mr-1" />
                <span className="hidden md:inline">Account</span>
              </div>
            </Link>
            <Link href="/cart">
              <div className="flex items-center text-neutral-800 hover:text-primary relative cursor-pointer">
                <ShoppingCart className="h-5 w-5 mr-1" />
                <span className="hidden md:inline">Cart</span>
                <span className="absolute -top-2 -right-2 bg-secondary text-neutral-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
              </div>
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
                <div className={`font-medium cursor-pointer ${location === '/' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  Home
                </div>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center font-medium text-neutral-800 hover:text-primary">
                  Power Tools
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/category/power-tools">
                      <div className="w-full cursor-pointer">All Power Tools</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/power-tools/drills">
                      <div className="w-full cursor-pointer">Drills & Drivers</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/power-tools/saws">
                      <div className="w-full cursor-pointer">Saws</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/power-tools/grinders">
                      <div className="w-full cursor-pointer">Grinders</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/power-tools/batteries">
                      <div className="w-full cursor-pointer">Batteries & Chargers</div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center font-medium text-neutral-800 hover:text-primary">
                  Solar Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/category/solar-solutions">
                      <div className="w-full cursor-pointer">All Solar Products</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/solar-solutions/panels">
                      <div className="w-full cursor-pointer">Solar Panels</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/solar-solutions/batteries">
                      <div className="w-full cursor-pointer">Batteries</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/solar-solutions/inverters">
                      <div className="w-full cursor-pointer">Inverters</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/solar-solutions/kits">
                      <div className="w-full cursor-pointer">Installation Kits</div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center font-medium text-neutral-800 hover:text-primary">
                  Building & Construction
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/category/building">
                      <div className="w-full cursor-pointer">All Building Products</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/building/adhesives">
                      <div className="w-full cursor-pointer">Adhesives</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/building/tile-grout">
                      <div className="w-full cursor-pointer">Tile Grout</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/building/plaster">
                      <div className="w-full cursor-pointer">Plaster</div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/category/paints">
                      <div className="w-full cursor-pointer">Paints & Varnishes</div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link href="/bulk-orders">
                <div className={`font-medium cursor-pointer ${location === '/bulk-orders' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  Bulk Orders
                </div>
              </Link>
              
              <Link href="/contact">
                <div className={`font-medium cursor-pointer ${location === '/contact' ? 'text-primary' : 'text-neutral-800 hover:text-primary'}`}>
                  Contact
                </div>
              </Link>
            </div>
            
            <Button 
              variant="ghost"
              className="md:hidden py-3 text-neutral-800" 
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <div className="hidden md:block py-3">
              <Link href="/refer">
                <div className="text-primary font-medium cursor-pointer">Refer & Earn</div>
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
