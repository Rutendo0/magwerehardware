import { FC, useState } from 'react';
import { Link } from 'wouter';
import { X, ChevronDown, ChevronUp, Home, Package, Zap, Building2, Users, Mail, Gift } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from '@/components/ui/sheet';

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

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [dropdowns, setDropdowns] = useState<DropdownItem[]>([
    {
      label: 'Power Tools',
      isOpen: false,
      icon: <Package className="h-4 w-4 mr-2" />,
      categoryLink: '/category/power-tools',
      items: [
        { label: 'All Power Tools', link: '/category/power-tools' },
        { label: 'Drills & Drivers', link: '/category/power-tools/drills' },
        { label: 'Saws', link: '/category/power-tools/saws' },
        { label: 'Grinders', link: '/category/power-tools/grinders' },
        { label: 'Batteries & Chargers', link: '/category/power-tools/batteries' },
      ]
    },
    {
      label: 'Solar Solutions',
      isOpen: false,
      icon: <Zap className="h-4 w-4 mr-2" />,
      categoryLink: '/category/solar-solutions',
      items: [
        { label: 'All Solar Products', link: '/category/solar-solutions' },
        { label: 'Solar Panels', link: '/category/solar-solutions/panels' },
        { label: 'Batteries', link: '/category/solar-solutions/batteries' },
        { label: 'Inverters', link: '/category/solar-solutions/inverters' },
        { label: 'Installation Kits', link: '/category/solar-solutions/kits' },
      ]
    },
    {
      label: 'Building & Construction',
      isOpen: false,
      icon: <Building2 className="h-4 w-4 mr-2" />,
      categoryLink: '/category/building',
      items: [
        { label: 'All Building Products', link: '/category/building' },
        { label: 'Adhesives', link: '/category/building/adhesives' },
        { label: 'Tile Grout', link: '/category/building/tile-grout' },
        { label: 'Plaster', link: '/category/building/plaster' },
        { label: 'Paints & Varnishes', link: '/category/paints' },
      ]
    }
  ]);

  const toggleDropdown = (index: number) => {
    setDropdowns(
      dropdowns.map((dropdown, i) => 
        i === index 
          ? { ...dropdown, isOpen: !dropdown.isOpen } 
          : dropdown
      )
    );
  };

  // Navigation handler with proper redirection
  const handleNavigation = (path: string) => {
    onClose();
    window.location.href = path;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-white p-0">
        <SheetHeader className="border-b py-4 px-6">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetClose className="absolute right-4 top-4">
            <X className="h-5 w-5" />
          </SheetClose>
        </SheetHeader>
        
        <div className="py-2">
          <nav className="flex flex-col">
            <div 
              className="flex items-center py-3 px-6 text-neutral-800 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <Home className="h-4 w-4 mr-3" />
              <span>Home</span>
            </div>
            
            {dropdowns.map((dropdown, index) => (
              <div key={index} className="border-b border-gray-100">
                <div 
                  className="flex justify-between items-center py-3 px-6 hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleDropdown(index)}
                >
                  <div className="flex items-center">
                    {dropdown.icon}
                    <span>{dropdown.label}</span>
                  </div>
                  {dropdown.isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {dropdown.isOpen && (
                  <div className="bg-gray-50">
                    {dropdown.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="block py-2 px-10 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleNavigation(item.link)}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div 
              className="flex items-center py-3 px-6 text-neutral-800 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigation('/bulk-orders')}
            >
              <Users className="h-4 w-4 mr-3" />
              <span>Bulk Orders</span>
            </div>
            
            <div 
              className="flex items-center py-3 px-6 text-neutral-800 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigation('/contact')}
            >
              <Mail className="h-4 w-4 mr-3" />
              <span>Contact</span>
            </div>
            
            <div 
              className="flex items-center py-3 px-6 text-primary font-medium hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNavigation('/refer')}
            >
              <Gift className="h-4 w-4 mr-3" />
              <span>Refer & Earn</span>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
