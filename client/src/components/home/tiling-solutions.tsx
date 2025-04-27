import { FC } from 'react';
import { Link } from 'wouter';
import { CheckCircle } from 'lucide-react';

const TilingSolutions: FC = () => {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold mb-4">Professional Tiling Solutions</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">Quality products for professional tilers and DIY enthusiasts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile Grout */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <img 
                src="https://images.unsplash.com/photo-1581165825571-4d11aae95f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGlsZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="MAG-GRIP Tile Grout" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-medium mb-3">MAG-GRIP Tile Grout</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-0.5 mr-2" />
                  <span>Quick curing: 2-4 hours</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-0.5 mr-2" />
                  <span>Smooth and consistent application</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-0.5 mr-2" />
                  <span>Reduced dust formulation</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-primary">From $15.99</div>
                <Link href="/category/tiling-materials/grouts">
                  <a className="text-primary hover:text-primary-dark font-medium">View Products</a>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Epoxy Grout */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <img 
                src="https://images.unsplash.com/photo-1637614532878-32a7b14bad5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXBveHklMjBncm91dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="MAG-GRIP Epoxy Grout" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-medium mb-3">MAG-GRIP Epoxy Grout</h3>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-0.5 mr-2" />
                  <span>No messy clean up</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-0.5 mr-2" />
                  <span>Incomparable strength</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-primary flex-shrink-0 h-5 w-5 mt-0.5 mr-2" />
                  <span>Non-permeable, won't absorb dirt</span>
                </li>
              </ul>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-primary">From $22.99</div>
                <Link href="/category/tiling-materials/epoxy-grout">
                  <a className="text-primary hover:text-primary-dark font-medium">View Products</a>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Bulk Offer */}
          <div className="bg-gradient-to-br from-primary to-primary-700 rounded-lg shadow-md overflow-hidden text-white">
            <div className="p-6">
              <h3 className="text-2xl font-medium mb-3">Bulk Discount for Tilers</h3>
              <p className="mb-4">Professional tilers can save big by ordering in bulk. Special pricing available for construction companies and contractors.</p>
              <img 
                src="https://images.unsplash.com/photo-1572363411478-e9ecfd58024a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGlsZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Tiling Project" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium">Save up to 25%</div>
                <Link href="/bulk-orders">
                  <a className="bg-white hover:bg-gray-100 text-primary font-medium py-2 px-4 rounded-lg">
                    Request Quote
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TilingSolutions;
