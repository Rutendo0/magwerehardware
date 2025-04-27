import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Users, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ThumbsUp,
  CheckCircle 
} from 'lucide-react';

const About: FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 md:py-24">
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#8A2BE2_0.5px,transparent_0.5px),radial-gradient(#8A2BE2_0.5px,#f3f4f6_0.5px)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Magwere Hardware</h1>
            <p className="text-lg md:text-xl mb-8">
              Your trusted partner for quality hardware, building materials, and solar solutions since 2018.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-neutral-700 mb-4">
                Magwere Hardware was founded with a simple mission: to provide quality hardware products and exceptional service to our community. What started as a small shop has grown into a trusted supplier for professionals and DIY enthusiasts alike.
              </p>
              <p className="text-neutral-700 mb-4">
                With years of experience in the industry, we understand the needs of our customers and strive to offer a comprehensive range of products to meet those needs. From power tools to building materials and solar solutions, we are your one-stop shop for all your hardware requirements.
              </p>
              <p className="text-neutral-700">
                Our team consists of knowledgeable professionals who are passionate about what they do and are always ready to assist you with expert advice and guidance for your projects.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Hardware store interior" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              At Magwere Hardware, our values guide everything we do. They define how we interact with our customers, partners, and community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-primary">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-neutral-600">
                We are committed to providing only the highest quality products to our customers, ensuring reliability and durability for every purchase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-primary">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
              <p className="text-neutral-600">
                Our customers are at the heart of everything we do. We strive to exceed expectations with personalized service and expert advice.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4 text-primary">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-neutral-600">
                We conduct our business with honesty, transparency, and ethical practices, building trust with our customers and partners.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Our dedicated team of professionals is committed to providing you with the best service and expert advice for all your hardware needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-primary">Founder & CEO</p>
                <p className="text-neutral-600 mt-2">
                  With over 20 years of experience in the hardware industry, John leads our team with passion and expertise.
                </p>
              </div>
            </div>
            
            {/* Team Member Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold">Jane Smith</h3>
                <p className="text-primary">Sales Manager</p>
                <p className="text-neutral-600 mt-2">
                  Jane ensures our customers receive personalized attention and find the perfect products for their needs.
                </p>
              </div>
            </div>
            
            {/* Team Member Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold">Robert Johnson</h3>
                <p className="text-primary">Solar Solutions Expert</p>
                <p className="text-neutral-600 mt-2">
                  Robert specializes in solar power systems and helps customers transition to sustainable energy solutions.
                </p>
              </div>
            </div>
            
            {/* Team Member Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1542178243-bc20204b769f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold">Sarah Williams</h3>
                <p className="text-primary">Customer Service Manager</p>
                <p className="text-neutral-600 mt-2">
                  Sarah and her team are dedicated to ensuring an exceptional experience for every customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Magwere Hardware</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              We strive to be your preferred hardware supplier by offering exceptional service, quality products, and competitive prices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white mr-4 flex-shrink-0">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p className="text-neutral-600">
                  We carefully select our suppliers to ensure we offer only high-quality products that meet our standards.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white mr-4 flex-shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Convenient Location</h3>
                <p className="text-neutral-600">
                  Centrally located in Avonlea Shopping Center with ample parking for your convenience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white mr-4 flex-shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Expert Advice</h3>
                <p className="text-neutral-600">
                  Our knowledgeable staff is always ready to provide expert guidance for your projects.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white mr-4 flex-shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Extended Hours</h3>
                <p className="text-neutral-600">
                  Open 7 days a week with extended hours to accommodate your busy schedule.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white mr-4 flex-shrink-0">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Wide Product Range</h3>
                <p className="text-neutral-600">
                  From power tools to solar solutions, we offer a comprehensive selection of products.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white mr-4 flex-shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
                <p className="text-neutral-600">
                  We prioritize your satisfaction and stand behind the products we sell.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Store Images Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Store</h2>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Visit our spacious, well-organized store with a wide range of quality hardware products and friendly staff ready to assist you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Store Interior" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Tool Display" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1565372595781-54d73c8913cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Building Materials" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Visit our store today and discover our wide range of quality products at competitive prices. Our team is ready to assist you with all your hardware needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-primary hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
            <Link href="/products">
              <Button className="bg-secondary text-black hover:bg-secondary/80">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
