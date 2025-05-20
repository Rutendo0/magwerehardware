import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, User, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const BulkOrders = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    items: "",
    deliveryAddress: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Bulk Order Request:
        Company: ${formData.company}
        Items: ${formData.items}
        Delivery Address: ${formData.deliveryAddress}
        Notes: ${formData.notes}`
      });
      
      toast({
        title: "Request Submitted",
        description: "Our team will contact you shortly regarding your bulk order.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        items: "",
        deliveryAddress: "",
        notes: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Bulk Orders</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Fill out the form below to request a quote for bulk purchases. Our team will contact you with pricing and availability.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium">
                  Company Name
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="items" className="block text-sm font-medium">
                Items Requested <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <ShoppingCart className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <Textarea
                  id="items"
                  name="items"
                  required
                  value={formData.items}
                  onChange={handleChange}
                  className="pl-10 min-h-[120px]"
                  placeholder="Please list the products you're interested in, including quantities if known"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="deliveryAddress" className="block text-sm font-medium">
                Delivery Address
              </label>
              <Textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className="min-h-[100px]"
                placeholder="Where should we deliver the order?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium">
                Additional Notes
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="min-h-[100px]"
                placeholder="Any special requirements or notes about your order"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Request Quote"}
              </Button>
            </div>

            <p className="text-sm text-neutral-500">
              By submitting this form, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-xl font-bold mb-4">API Integration</h2>
          <div className="mb-8">
            <p className="text-neutral-600 mb-4">
              For large enterprises, we offer API integration with your procurement systems. Contact our team to get your API integration key and documentation.
            </p>
            <div className="bg-white p-4 rounded-md">
              <h3 className="font-medium mb-2">API Endpoints:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm mb-2">
                POST /api/bulk-orders
              </code>
              <code className="block bg-gray-100 p-3 rounded text-sm">
                GET /api/bulk-orders/:orderId
              </code>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">Bulk Order Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Competitive Pricing</h3>
              <p className="text-sm text-neutral-600">
                Special discounted rates for bulk purchases and wholesale orders.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Dedicated Support</h3>
              <p className="text-sm text-neutral-600">
                Personal account manager to handle your order and any special requirements.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Flexible Delivery</h3>
              <p className="text-sm text-neutral-600">
                We can arrange delivery to your site or warehouse at a time that suits you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrders;