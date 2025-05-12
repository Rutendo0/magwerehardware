import express, { Request, Response } from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomUUID } from "crypto";
import { 
  insertCartItemSchema, 
  insertContactMessageSchema, 
  insertSubscriberSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();

  // Get all products
  router.get("/products", async (req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  // Get product by ID
  router.get("/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  });

  // Get products by category
  router.get("/products/category/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      if (!products.length) {
        return res.status(404).json({ message: "No products found in this category" });
      }
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products by category" });
    }
  });

  // Get featured products
  router.get("/products/featured/:limit?", async (req: Request, res: Response) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : undefined;
      const products = await storage.getFeaturedProducts(limit);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured products" });
    }
  });

  // Get on sale products
  router.get("/products/sale/:limit?", async (req: Request, res: Response) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : undefined;
      const products = await storage.getOnSaleProducts(limit);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching on sale products" });
    }
  });

  // Get all categories
  router.get("/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });

  

  // Cart operations
// Get session ID from cookie or create new one
router.use((req, res, next) => {
  let sessionId = req.headers.authorization;
  if (!sessionId) {
    sessionId = randomUUID();
    res.setHeader('X-Cart-Session', sessionId);
    res.setHeader('Access-Control-Expose-Headers', 'X-Cart-Session');
  }
  req.headers.authorization = sessionId;
  next();
});
  // Get cart items
  router.get("/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = req.headers.authorization as string;
      const cartItems = await storage.getCartItems(sessionId);
      
      // Include full product details in response
      const cartWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProductById(item.productId);
          return {
            ...item,
            product
          };
        })
      );
      
      res.json({
        sessionId,
        items: cartWithProducts
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart items" });
    }
  });

  // Add to cart
  router.post("/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = req.headers.authorization as string;
      
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        sessionId
      });
      
      // Check if product exists
      const product = await storage.getProductById(validatedData.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      // Check if item already exists in cart
      const cartItems = await storage.getCartItems(sessionId);
      const existingItem = cartItems.find(item => item.productId === validatedData.productId);
      
      if (existingItem) {
        // Update existing item
        const updatedItem = await storage.updateCartItemQuantity(
          existingItem.id, 
          existingItem.quantity + validatedData.quantity!
        );
        return res.json(updatedItem);
      }
      
      // Add new item
      const newCartItem = await storage.addToCart(validatedData);
      res.status(201).json(newCartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error adding item to cart" });
    }
  });

  // Update cart item quantity
  router.patch("/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be a positive number" });
      }
      
      const updatedItem = await storage.updateCartItemQuantity(id, quantity);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart item" });
    }
  });

  // Remove from cart
  router.delete("/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      
      const success = await storage.removeFromCart(id);
      
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart" });
    }
  });

  // Clear cart
  router.delete("/cart", async (req: Request, res: Response) => {
    try {
      const sessionId = req.headers.authorization as string;
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart" });
    }
  });

  // Contact form
  router.post("/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const newMessage = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: newMessage.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error sending message" });
    }
  });

  // Newsletter subscription
  router.post("/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const newSubscriber = await storage.addSubscriber(validatedData);
      res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error subscribing to newsletter" });
    }
  });

  // Register routes
  app.use("/api", router);
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
