import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, DollarSign, Percent } from 'lucide-react';
import { Link } from 'wouter';
import ceilingPlasterImage from '@assets/IMG-20250419-WA0019.jpg';

const SpecialOffers: FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Special Offers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take advantage of our limited-time deals on high-quality hardware and construction materials
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="bg-blue-50 rounded-xl overflow-hidden h-full">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="bg-red-600 text-white inline-block px-4 py-1 rounded-full text-sm font-bold mb-4">
                    FLASH SALE
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Weekend Special on Power Tools</h3>
                  <p className="text-gray-700 mb-6">
                    Get up to 30% off on selected power tools. Perfect for DIY enthusiasts and professionals.
                  </p>
                  
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4">
                      <Percent className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">Up to 30% Off</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="font-semibold">Ends in 2 days</span>
                    </div>
                  </div>
                  
                  <Link href="/category/power-tools">
                    <Button>
                      Shop Power Tools <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="bg-gradient-to-tr from-blue-100 to-blue-50 h-full w-full flex items-center justify-center p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                            <path d="M11 18h2a6 6 0 0 0 6-6v-1a4 4 0 0 0-4-4h-3v13"/>
                            <path d="M5 8a4 4 0 0 1 4-4h3v5H9a4 4 0 0 1-4-4v3a6 6 0 0 0 6 6h2"/>
                          </svg>
                        </div>
                        <h4 className="font-bold mb-1">Cordless Drills</h4>
                        <p className="text-sm text-gray-600">From $59.99</p>
                        <span className="text-xs inline-block bg-red-100 text-red-600 px-2 py-1 rounded mt-2 font-semibold">-25%</span>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                            <path d="M14 3a3 3 0 1 1-1.5 5.6"/>
                            <path d="M13 21V8a3 3 0 0 0-3-3H5.7a1.2 1.2 0 0 0-1.2 1.2A3 3 0 0 0 7 9a2 2 0 1 1-3.4 1.8"/>
                            <path d="M17 14h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z"/>
                            <path d="M2 14h.01"/>
                          </svg>
                        </div>
                        <h4 className="font-bold mb-1">Power Saws</h4>
                        <p className="text-sm text-gray-600">From $89.99</p>
                        <span className="text-xs inline-block bg-red-100 text-red-600 px-2 py-1 rounded mt-2 font-semibold">-30%</span>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                            <path d="M5 22h14"/>
                            <path d="M5 2h14"/>
                            <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
                            <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
                          </svg>
                        </div>
                        <h4 className="font-bold mb-1">Sanders</h4>
                        <p className="text-sm text-gray-600">From $49.99</p>
                        <span className="text-xs inline-block bg-red-100 text-red-600 px-2 py-1 rounded mt-2 font-semibold">-20%</span>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                            <path d="m6 9 6-6 6 6"/>
                            <path d="M4 4h16v16"/>
                            <path d="M10 16v-2a2 2 0 1 1 4 0v2"/>
                            <path d="M4 16h16"/>
                            <path d="M4 20h16"/>
                          </svg>
                        </div>
                        <h4 className="font-bold mb-1">Tool Sets</h4>
                        <p className="text-sm text-gray-600">From $129.99</p>
                        <span className="text-xs inline-block bg-red-100 text-red-600 px-2 py-1 rounded mt-2 font-semibold">-15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden h-full">
              <div className="grid grid-cols-1 h-full">
                <div className="relative overflow-hidden" style={{ maxHeight: '300px' }}>
                  <img 
                    src={ceilingPlasterImage} 
                    alt="Rhi-Lite Ceiling Plaster" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-amber-400 text-black text-sm font-bold py-1 px-3 rounded">NEW ARRIVAL</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">Rhi-Lite Ceiling Plaster</h3>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-bold text-lg">18.99</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Premium gypsum-based plaster for smooth, durable surfaces. Valued for its ease of application, quick setting time, and excellent finish.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>High-quality 20kg bag</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>15-year quality guarantee</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Ideal for walls and ceilings</span>
                      </li>
                    </ul>
                  </div>
                  <Link href="/product/ceiling-plaster">
                    <Button className="w-full">
                      View Product Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;