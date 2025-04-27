import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Link } from 'wouter';

const Account: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app this would call an API
    setIsLoggedIn(true);
    console.log('Login with:', formData.email, formData.password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration - in real app this would call an API
    setIsLoggedIn(true);
    console.log('Register with:', formData);
  };

  if (isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Account</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sidebar Navigation */}
            <div className="space-y-3">
              <Card>
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <Button variant="ghost" className="justify-start h-12 border-b rounded-none">
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 border-b rounded-none">
                      Orders
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 border-b rounded-none">
                      Addresses
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 border-b rounded-none">
                      Account Details
                    </Button>
                    <Button variant="ghost" className="justify-start h-12 rounded-none text-red-500 hover:text-red-600"
                      onClick={() => setIsLoggedIn(false)}>
                      Logout
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard</CardTitle>
                  <CardDescription>
                    Welcome back! Here's an overview of your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Hello <strong>Customer</strong> (not <strong>Customer</strong>? <Button onClick={() => setIsLoggedIn(false)} variant="link" className="h-auto p-0">Log out</Button>)</p>
                    <p>From your account dashboard you can view your <Link href="/account/orders"><Button variant="link" className="h-auto p-0">recent orders</Button></Link>, manage your <Link href="/account/addresses"><Button variant="link" className="h-auto p-0">shipping and billing addresses</Button></Link>, and <Link href="/account/details"><Button variant="link" className="h-auto p-0">edit your password and account details</Button></Link>.</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/products">
                      <Button>Browse Products</Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <Label>Name</Label>
                        <p>Customer</p>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p>customer@example.com</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Edit Details</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">My Account</h1>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="h-auto p-0 text-sm">Forgot password?</Button>
                    </div>
                    <Input 
                      id="password" 
                      name="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Sign In</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create a new account to access exclusive features</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      name="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      name="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      name="confirmPassword" 
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Create Account</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Account;