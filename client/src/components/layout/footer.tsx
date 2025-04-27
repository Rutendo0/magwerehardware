import { useLocation } from 'wouter';
import MagwereLogo from '@/lib/magwere-logo';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';

const Footer = () => {
  const [_, navigate] = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <MagwereLogo isPrimary={false} className="mb-4" />
            <p className="text-gray-400 mb-4">
              Your complete hardware solution for power tools, construction materials, and solar equipment.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-primary/20">
                <Facebook size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-primary/20">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-primary/20">
                <Twitter size={20} />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleNavigate('/')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Home
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigate('/products')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Products
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigate('/products')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Special Offers
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigate('/about')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  About Us
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigate('/contact')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Contact
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <span 
                  onClick={() => handleNavigate('/category/power-tools')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Power Tools
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigate('/category/solar-solutions')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Solar Solutions
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigate('/category/building')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Building Materials
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigate('/category/plumbing')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Plumbing Supplies
                </span>
              </li>
              <li>
                <span 
                  onClick={() => handleNavigate('/category/paints')}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Paints & Finishes
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
                <span className="text-gray-400">
                  Shop 4, Avonlea Shopping Center, Greencroft Shops, Next to OK Supermarket
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-400">0779 656 666</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span className="text-gray-400">info@magwere.co.zw</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Magwere Hardware. All rights reserved.</p>
            <div className="flex space-x-4 text-sm text-gray-500">
              <span 
                onClick={() => handleNavigate('/about')}
                className="hover:text-gray-400 cursor-pointer"
              >
                Privacy Policy
              </span>
              <span 
                onClick={() => handleNavigate('/about')}
                className="hover:text-gray-400 cursor-pointer"
              >
                Terms of Service
              </span>
              <span 
                onClick={() => handleNavigate('/about')}
                className="hover:text-gray-400 cursor-pointer"
              >
                Refund Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
