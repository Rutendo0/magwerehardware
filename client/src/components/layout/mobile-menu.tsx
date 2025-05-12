import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import MagwereLogo from '@/lib/magwere-logo';
import { Button } from '@/components/ui/button';
import { X, ChevronDown, ChevronRight, Home, Package, Phone, ShoppingCart, User, Zap, Briefcase } from 'lucide-react';
import { Category } from '@shared/schema';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DropdownItem {
  label: string;
  isOpen: boolean;
  icon: JSX.Element;
  categoryLink: string;
  items: { label: string; link: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [_, navigate] = useLocation();

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const [dropdowns, setDropdowns] = useState<DropdownItem[]>([
    {
      label: 'Products',
      isOpen: false,
      icon: <Package className="h-5 w-5" />,
      categoryLink: '/products',
      items: categories?.map(cat => ({ 
        label: cat?.name || '', 
        link: `/category/${cat?.slug}` 
      })) || [],
    },
  ]);

  const toggleDropdown = (index: number) => {
    setDropdowns(prevState => 
      prevState.map((item, i) => 
        i === index ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
      )
    );
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Menu */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div onClick={() => handleNavigate('/')} className="cursor-pointer">
            <MagwereLogo className="h-10 w-auto" />
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          <nav className="space-y-1">
            <button
              className="flex items-center w-full py-3 px-4 rounded-md hover:bg-gray-100"
              onClick={() => handleNavigate('/')}
            >
              <Home className="mr-3 h-5 w-5 text-gray-500" />
              <span className="font-medium">Home</span>
            </button>

            {/* Products dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-gray-100"
                onClick={() => toggleDropdown(0)}
              >
                <div className="flex items-center">
                  <Package className="mr-3 h-5 w-5 text-gray-500" />
                  <span className="font-medium">Products</span>
                </div>
                {dropdowns[0].isOpen ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {dropdowns[0].isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {categories?.map((category) => (
                    <button
                      key={category.id}
                      className="flex items-center w-full py-2 px-4 rounded-md hover:bg-gray-100"
                      onClick={() => handleNavigate(`/category/${category.slug}`)}
                    >
                      <span className="text-gray-700">{category.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="flex items-center w-full py-3 px-4 rounded-md hover:bg-gray-100"
              onClick={() => handleNavigate('/category/solar-solutions')}
            >
              <Zap className="mr-3 h-5 w-5 text-gray-500" />
              <span className="font-medium">Solar Solutions</span>
            </button>

            <button
              className="flex items-center w-full py-3 px-4 rounded-md hover:bg-gray-100"
              onClick={() => handleNavigate('/bulk-orders')}
            >
              <Briefcase className="mr-3 h-5 w-5 text-gray-500" />
              <span className="font-medium">Bulk Orders</span>
            </button>

            <button
              className="flex items-center w-full py-3 px-4 rounded-md hover:bg-gray-100"
              onClick={() => handleNavigate('/contact')}
            >
              <Phone className="mr-3 h-5 w-5 text-gray-500" />
              <span className="font-medium">Contact</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleNavigate('/account')}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Account</span>
            </Button>

            <Button
              className="w-full"
              onClick={() => handleNavigate('/cart')}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;