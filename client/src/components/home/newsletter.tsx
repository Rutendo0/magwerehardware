import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

const Newsletter: FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: '',
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: SubscribeFormData) => {
      return apiRequest('POST', '/api/subscribe', data);
    },
    onSuccess: () => {
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "An error occurred. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data: SubscribeFormData) => {
    setIsSubmitting(true);
    subscribeMutation.mutate(data);
  };

  return (
    <section className="py-10 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Stay Updated with Our Latest Offers
            </h2>
            <p className="text-neutral-600 mb-6">
              Subscribe to our newsletter to receive exclusive deals and promotions
            </p>
            
            <form 
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex-grow">
                <Input 
                  type="email" 
                  placeholder="Your email address"
                  className={`py-3 px-4 border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-primary`}
                  {...register('email')}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 text-left">{errors.email.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
              </Button>
            </form>
            
            <p className="text-xs text-neutral-500 mt-4">
              By subscribing, you agree to receive marketing emails from Magwere Hardware
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
