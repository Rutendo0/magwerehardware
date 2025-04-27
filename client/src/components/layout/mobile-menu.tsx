import { FC, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
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
  items: { label: string; link: string }[];
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [dropdowns, setDropdowns] = useState<DropdownItem[]>([
    {
      label: 'Power Tools',
      isOpen: false,
      items: [
        { label: 'Drills & Drivers', link: '/category/power-tools/drills' },
        { label: 'Saws', link: '/category/power-tools/saws' },
        { label: 'Grinders', link: '/category/power-tools/grinders' },
        { label: 'Batteries & Chargers', link: '/category/power-tools/batteries' },
      ]
    },
    {
      label: 'Solar Solutions',
      isOpen: false,
      items: [
        { label: 'Solar Panels', link: '/category/solar-solutions/panels' },
        { label: 'Batteries', link: '/category/solar-solutions/batteries' },
        { label: 'Inverters', link: '/category/solar-solutions/inverters' },
        { label: 'Installation Kits', link: '/category/solar-solutions/kits' },
      ]
    },
    {
      label: 'Building & Construction',
      isOpen: false,
      items: [
        { label: 'Adhesives', link: '/category/building/adhesives' },
        { label: 'Tile Grout', link: '/category/building/tile-grout' },
        { label: 'Plaster', link: '/category/building/plaster' },
        { label: 'Paints & Varnishes', link: '/category/building/paints' },
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

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-white">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetClose className="absolute right-4 top-4">
            <X className="h-5 w-5" />
          </SheetClose>
        </SheetHeader>
        
        <div className="py-4">
          <nav className="flex flex-col">
            <Link href="/">
              <a className="py-3 px-4 text-neutral-800 hover:bg-gray-100">Home</a>
            </Link>
            
            {dropdowns.map((dropdown, index) => (
              <div key={index} className="border-b border-gray-100">
                <div 
                  className="flex justify-between items-center py-3 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => toggleDropdown(index)}
                >
                  <span>{dropdown.label}</span>
                  {dropdown.isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {dropdown.isOpen && (
                  <div className="bg-gray-50 pl-8">
                    {dropdown.items.map((item, itemIndex) => (
                      <Link key={itemIndex} href={item.link}>
                        <a 
                          className="block py-2 px-4 hover:bg-gray-100"
                          onClick={onClose}
                        >
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Link href="/bulk-orders">
              <a className="py-3 px-4 text-neutral-800 hover:bg-gray-100">Bulk Orders</a>
            </Link>
            
            <Link href="/contact">
              <a className="py-3 px-4 text-neutral-800 hover:bg-gray-100">Contact</a>
            </Link>
            
            <Link href="/refer">
              <a className="py-3 px-4 text-primary font-medium hover:bg-gray-100">Refer & Earn</a>
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
