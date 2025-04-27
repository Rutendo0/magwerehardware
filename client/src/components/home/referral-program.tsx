import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { UserPlus, ShoppingBag, Wallet } from 'lucide-react';

const ReferralProgram: FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-primary-800 to-primary">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-heading font-bold mb-4">Refer Clients & Make Money</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Get cash back on any purchase when you refer new customers to Magwere Hardware.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Refer a Friend</h3>
                    <p className="text-neutral-600">Share your referral code with friends and colleagues</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">They Make a Purchase</h3>
                    <p className="text-neutral-600">When they buy any product using your code</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Earn Cashback</h3>
                    <p className="text-neutral-600">Receive up to 10% cashback on their purchase value</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/refer">
                  <Button className="bg-primary hover:bg-primary-700">
                    Get My Referral Code
                  </Button>
                </Link>
                <Link href="/refer/how-it-works">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-neutral-500 mt-4">Terms & conditions apply</p>
            </div>
            
            <div className="bg-neutral-50 flex items-center justify-center p-8">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVmZXJyYWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Refer a Friend" 
                className="rounded-lg shadow-lg max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgram;
