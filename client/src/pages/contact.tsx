import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram 
} from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact: FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });
  
  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help. Reach out to us and we'll get back to you as soon as possible.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@example.com" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="0771 234 567" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us how we can help you..."
                            className="min-h-[150px]"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Location</h4>
                    <p className="text-neutral-600">
                      Shop 4, Avonlea Shopping Center,<br />
                      Greencroft Shops, Next to OK Supermarket
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone Number</h4>
                    <p className="text-neutral-600">
                      0779 656 666<br />
                      0776 612 600
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email Address</h4>
                    <p className="text-neutral-600">
                      info@magware.co.zw<br />
                      sales@magware.co.zw
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
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-4">Connect With Us</h4>
                <div className="flex space-x-2">
                  <a 
                    href="https://www.facebook.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.instagram.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-gray-200 rounded-lg h-96 overflow-hidden">
        {/* This would be replaced with an actual Google Map in production */}
        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Google Map would be displayed here</span>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Bulk Order Inquiries</h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-neutral-600 mb-6">
            Looking to place a large order for your business or project? We offer special pricing 
            and dedicated support for bulk orders. Contact our bulk sales team directly.
          </p>
          <Button size="lg">
            Contact Bulk Sales Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
