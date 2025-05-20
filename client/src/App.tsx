import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from 'react';

import Layout from "@/components/layout/Layout";
import Home from "./pages/home";
import ProductCategory from "./pages/product-category";
import ProductDetail from "./pages/product-detail";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import About from "./pages/about";
import Account from "./pages/account";
import BulkOrders from "./pages/bulk-orders";
import Products from './pages/products';
import NotFound from "@/pages/not-found";
import CategoriesPage from './pages/categories';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={ProductCategory} />
      <Route path="/category/:category/:subcategory" component={ProductCategory} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/products" component={ProductCategory} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/cart" component={Cart} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/account" component={Account} />
      <Route path="/bulk-orders" component={BulkOrders} />
      <Route path="/products" component={Products} />
      <Route path="/refer" component={Account} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize cart in local storage if it doesn't exist
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Router />
        </Layout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;