import { Link } from 'wouter';
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
                <Link href="/">
                  <a className="text-gray-400 hover:text-white">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-400 hover:text-white">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/special-offers">
                  <a className="text-gray-400 hover:text-white">Special Offers</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-white">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/power-tools">
                  <a className="text-gray-400 hover:text-white">Power Tools</a>
                </Link>
              </li>
              <li>
                <Link href="/category/solar-solutions">
                  <a className="text-gray-400 hover:text-white">Solar Solutions</a>
                </Link>
              </li>
              <li>
                <Link href="/category/building-materials">
                  <a className="text-gray-400 hover:text-white">Building Materials</a>
                </Link>
              </li>
              <li>
                <Link href="/category/plumbing">
                  <a className="text-gray-400 hover:text-white">Plumbing Supplies</a>
                </Link>
              </li>
              <li>
                <Link href="/category/paints">
                  <a className="text-gray-400 hover:text-white">Paints & Finishes</a>
                </Link>
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
              <Link href="/privacy">
                <a className="hover:text-gray-400">Privacy Policy</a>
              </Link>
              <Link href="/terms">
                <a className="hover:text-gray-400">Terms of Service</a>
              </Link>
              <Link href="/refund">
                <a className="hover:text-gray-400">Refund Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
