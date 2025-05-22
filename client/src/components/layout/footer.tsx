import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import MagwereLogo from '@/lib/magwere-logo';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const [_, navigate] = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:max-w-xl">
              <h3 className="text-white text-2xl font-bold mb-2">Join Our Newsletter</h3>
              <p className="text-white/80">
                Subscribe to our newsletter to receive updates on new products, special offers, and construction tips.
              </p>
            </div>
            <div className="w-full md:max-w-md">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md focus:outline-none text-gray-800 flex-grow"
                  required
                />
                <Button 
                  className="bg-white text-primary hover:bg-gray-100 py-3"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1 */}
            <div>
              <MagwereLogo isPrimary={false} />
              <p className="mt-4 text-gray-400 text-sm">
                Your trusted partner for all hardware and construction material needs since 2010. We offer quality products at competitive prices.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigate('/')}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('/categories')}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Categories
                  </button>
                </li>
                
                <li>
                  <button
                    onClick={() => handleNavigate('/bulk-orders')}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Bulk Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('/about')}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('/contact')}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">123 Main Street, Harare, Zimbabwe</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">+263 77 777 7777</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">info@magwere.co.zw</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-gray-400 text-sm">
                    <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 8:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">We Accept</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white rounded-md p-2 flex items-center justify-center">
                  <span className="text-gray-800 font-medium text-sm">VISA</span>
                </div>
                <div className="bg-white rounded-md p-2 flex items-center justify-center">
                  <span className="text-gray-800 font-medium text-sm">MasterCard</span>
                </div>
                <div className="bg-white rounded-md p-2 flex items-center justify-center">
                  <span className="text-gray-800 font-medium text-sm">EcoCash</span>
                </div>
                <div className="bg-white rounded-md p-2 flex items-center justify-center">
                  <span className="text-gray-800 font-medium text-sm">USD Cash</span>
                </div>
                <div className="bg-white rounded-md p-2 flex items-center justify-center">
                  <span className="text-gray-800 font-medium text-sm">Bank Transfer</span>
                </div>
                <div className="bg-white rounded-md p-2 flex items-center justify-center">
                  <span className="text-gray-800 font-medium text-sm">OneMoney</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Magwere Hardware & Construction. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;