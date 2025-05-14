import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone } from 'lucide-react';

const StoreLocation: FC = () => {
  // Store location coordinates (latitude and longitude)
  const storeLocation = {
    lat: -17.824858,
    lng: 31.053028
  };

  // Handle the "Get Directions" button click
  const handleGetDirections = () => {
    // Open Google Maps with directions to the store
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}`,
      '_blank'
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold mb-4">Visit Our Store</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Come and explore our wide range of hardware and building materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-neutral-50 p-8 rounded-lg h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
                <p className="text-lg font-medium">Find us at Avonlea Shopping Center</p>
                <p className="text-neutral-600">Click 'Get Directions' for navigation</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-neutral-50 p-8 rounded-lg h-full">
              <h3 className="text-2xl font-medium mb-6">Store Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-neutral-600">
                      Shop 4, Avonlea Shopping Center,<br />
                      Greencroft Shops, Next to OK Supermarket
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Business Hours</h4>
                    <p className="text-neutral-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 8:00 AM - 5:00 PM<br />
                      Sunday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Contact Information</h4>
                    <p className="text-neutral-600">
                      Phone: 0779 656 666<br />
                      Alternative: 0776 612 600<br />
                      Email: info@magware.co.zw
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  className="bg-primary hover:bg-primary-700"
                  onClick={handleGetDirections}
                >
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocation;