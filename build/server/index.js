// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  products;
  categories;
  cartItems;
  contactMessages;
  subscribers;
  productId;
  categoryId;
  cartItemId;
  messageId;
  subscriberId;
  constructor() {
    this.products = /* @__PURE__ */ new Map();
    this.categories = /* @__PURE__ */ new Map();
    this.cartItems = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.subscribers = /* @__PURE__ */ new Map();
    this.productId = 1;
    this.categoryId = 1;
    this.cartItemId = 1;
    this.messageId = 1;
    this.subscriberId = 1;
    this.initializeData();
  }
  initializeData() {
    const categories2 = [
      {
        name: "Power Tools",
        slug: "power-tools",
        description: "Professional power tools for construction and DIY projects",
        imageUrl: "https://images.unsplash.com/photo-1503480207415-fdddcc21d5fc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9vbHMlMjBhbmQlMjBlcXVpcG1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        productCount: 86
      },
      {
        name: "Solar Solutions",
        slug: "solar-solutions",
        description: "Complete solar equipment and installation packages",
        imageUrl: "https://images.unsplash.com/photo-1583355530139-d977df57be3b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29sYXIlMjBwYW5lbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        productCount: 42
      },
      {
        name: "Tiling Materials",
        slug: "tiling-materials",
        description: "Tile grout, adhesives and tools for professional tiling",
        imageUrl: "https://images.unsplash.com/photo-1586864387789-628af9feed72?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGlsZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        productCount: 38
      },
      {
        name: "Paints & Finishes",
        slug: "paints-finishes",
        description: "Quality paints, varnishes and wood finishes",
        imageUrl: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFpbnQlMjBjYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        productCount: 53
      },
      {
        name: "Lighting",
        slug: "lighting",
        description: "Modern lighting solutions for homes and offices",
        imageUrl: "https://images.unsplash.com/photo-1560170412-0f438cfc87a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VpbGluZyUyMGxpZ2h0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        productCount: 26
      },
      {
        name: "Building Materials",
        slug: "building-materials",
        description: "Construction and building supplies",
        imageUrl: "https://images.unsplash.com/photo-1572363411478-e9ecfd58024a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGlsZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        productCount: 67
      }
    ];
    categories2.forEach((category) => this.createCategory(category));
    const products2 = [
      {
        name: "WADFOW 20V Cordless Drill Set",
        description: "Professional cordless drill with 2 batteries and charger",
        price: "180.00",
        salePrice: "150.00",
        imageUrl: "/assets/IMG-20250419-WA0016.jpg",
        category: "power-tools",
        brand: "WADFOW",
        featured: true,
        inStock: true
      },
      {
        name: "Premium Solar Panel Kit",
        description: "Complete solar panel kit with inverter and batteries",
        price: "2500.00",
        salePrice: "2200.00",
        imageUrl: "/assets/IMG-20250419-WA0016.jpg",
        category: "solar-solutions",
        brand: "SolarMax",
        featured: true,
        inStock: true
      },
      {
        name: "Professional Tile Grout",
        description: "High-quality tile grout for professional installations",
        price: "45.00",
        imageUrl: "/assets/IMG-20250419-WA0011.jpg",
        category: "tiling-materials",
        brand: "TilePro",
        featured: true,
        inStock: true
      },
      {
        name: "Premium Wall Paint",
        description: "Superior quality interior wall paint",
        price: "75.00",
        salePrice: "65.00",
        imageUrl: "/assets/IMG-20250419-WA0010.jpg",
        category: "paints-finishes",
        brand: "ColorMaster",
        featured: true,
        inStock: true
      },
      {
        name: "LED Panel Light",
        description: "Energy-efficient LED panel light for commercial use",
        price: "120.00",
        imageUrl: "/assets/IMG-20250419-WA0009.jpg",
        category: "lighting",
        brand: "BrightTech",
        featured: true,
        inStock: true
      },
      {
        name: "Construction Cement",
        description: "High-strength portland cement for construction",
        price: "25.00",
        imageUrl: "/assets/IMG-20250419-WA0019.jpg",
        category: "building-materials",
        brand: "BuildPro",
        featured: true,
        inStock: true
      },
      {
        name: "Complete Solar System Package 2kW",
        description: "Complete solar power system with panels, inverter and batteries",
        price: "1200.00",
        salePrice: null,
        imageUrl: "https://images.unsplash.com/photo-1592140027991-254e9e4b6df8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c29sYXIlMjBwYW5lbCUyMHNldHVwfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Solar Solutions",
        subCategory: "Complete Systems",
        brand: "SolarEdge",
        inStock: true,
        featured: true,
        isOnSale: false
      },
      {
        name: "MAG-GRIP Tile Grout Fast Set 5kg",
        description: "Quick-setting tile grout for interior and exterior use",
        price: "18.50",
        salePrice: null,
        imageUrl: "https://images.unsplash.com/photo-1590534460252-75feed569388?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGlsZSUyMGdyb3V0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Tiling Materials",
        subCategory: "Grouts",
        brand: "MAG-GRIP",
        inStock: true,
        featured: true,
        isOnSale: false
      },
      {
        name: "WADFOW Gasoline Grass Trimmer 62cc",
        description: "Powerful gas trimmer for professional landscaping",
        price: "180.00",
        salePrice: "150.00",
        imageUrl: "https://images.unsplash.com/photo-1620267986526-d18495e276e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3Jhc3MlMjB0cmltbWVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Power Tools",
        subCategory: "Garden Tools",
        brand: "WADFOW",
        inStock: true,
        featured: true,
        isOnSale: true
      },
      {
        name: "Splash Wood Varnish Glossy Finish",
        description: "Weather-resistant wood varnish for interior and exterior use",
        price: "28.50",
        salePrice: null,
        imageUrl: "https://images.unsplash.com/photo-1512236077335-f1cda9239c11?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29vZCUyMHZhcm5pc2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Paints & Finishes",
        subCategory: "Varnishes",
        brand: "Splash",
        inStock: true,
        featured: false,
        isOnSale: true
      },
      {
        name: "Modern Ceiling Lights Collection",
        description: "Contemporary LED ceiling lights for any room",
        price: "45.00",
        salePrice: null,
        imageUrl: "https://images.unsplash.com/photo-1560170412-0f438cfc87a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2VpbGluZyUyMGxpZ2h0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Lighting",
        subCategory: "Ceiling Lights",
        brand: "MAGWARE",
        inStock: true,
        featured: false,
        isOnSale: false
      },
      {
        name: "MAG-GRIP Epoxy Grout",
        description: "High-strength epoxy grout for porcelain and ceramic paving",
        price: "22.99",
        salePrice: null,
        imageUrl: "https://images.unsplash.com/photo-1637614532878-32a7b14bad5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXBveHklMjBncm91dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Tiling Materials",
        subCategory: "Grouts",
        brand: "MAG-GRIP",
        inStock: true,
        featured: false,
        isOnSale: false
      },
      {
        name: "Rhi-Lite Ceiling Plaster 20kg",
        description: "Gypsum-based plaster for ceiling applications",
        price: "19.99",
        salePrice: null,
        imageUrl: "https://images.unsplash.com/photo-1581165825571-4d11aae95f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGlsZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Building Materials",
        subCategory: "Plasters",
        brand: "Rhi-Lite",
        inStock: true,
        featured: false,
        isOnSale: false
      }
    ];
    products2.forEach((product) => this.createProduct(product));
  }
  // Product operations
  async getAllProducts() {
    if (this.products.size === 0) {
      const defaultProducts = [
        {
          name: "WADFOW 20V Cordless Drill Set",
          description: "Professional cordless drill with 2 batteries and charger",
          price: "180.00",
          salePrice: "150.00",
          imageUrl: "/assets/IMG-20250419-WA0009.jpg",
          category: "Power Tools",
          subCategory: "Drills",
          brand: "WADFOW",
          inStock: true,
          featured: true,
          isOnSale: true
        },
        {
          name: "MAG-GRIP Epoxy Grout",
          description: "High-strength epoxy grout for porcelain and ceramic paving",
          price: "22.99",
          salePrice: null,
          imageUrl: "/assets/IMG-20250419-WA0013.jpg",
          category: "Tiling Materials",
          subCategory: "Grouts",
          brand: "MAG-GRIP",
          inStock: true,
          featured: false,
          isOnSale: false
        }
      ];
      defaultProducts.forEach((product) => this.createProduct(product));
    }
    return Array.from(this.products.values());
  }
  async getProductById(id) {
    return this.products.get(id);
  }
  async getProductsByCategory(category) {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }
  async getFeaturedProducts(limit) {
    const featuredProducts = Array.from(this.products.values()).filter(
      (product) => product.featured
    );
    return limit ? featuredProducts.slice(0, limit) : featuredProducts;
  }
  async getOnSaleProducts(limit) {
    const onSaleProducts = Array.from(this.products.values()).filter(
      (product) => product.isOnSale
    );
    return limit ? onSaleProducts.slice(0, limit) : onSaleProducts;
  }
  async createProduct(product) {
    const id = this.productId++;
    const newProduct = {
      ...product,
      id,
      salePrice: product.salePrice ?? null,
      brand: product.brand ?? null,
      subCategory: product.subCategory ?? null,
      inStock: product.inStock ?? null,
      featured: product.featured ?? null,
      isOnSale: product.isOnSale ?? null
    };
    this.products.set(id, newProduct);
    return newProduct;
  }
  // Category operations
  async getAllCategories() {
    return Array.from(this.categories.values());
  }
  async getCategoryBySlug(slug) {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  async createCategory(category) {
    const id = this.categoryId++;
    const newCategory = {
      ...category,
      id,
      description: category.description ?? null,
      imageUrl: category.imageUrl ?? null,
      productCount: category.productCount ?? null
    };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  // Cart operations
  async getCartItems(sessionId) {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }
  async addToCart(cartItem) {
    const id = this.cartItemId++;
    const newCartItem = {
      ...cartItem,
      id,
      quantity: cartItem.quantity !== void 0 ? cartItem.quantity : 1,
      addedAt: /* @__PURE__ */ new Date()
    };
    this.cartItems.set(id, newCartItem);
    return newCartItem;
  }
  async updateCartItemQuantity(id, quantity) {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return void 0;
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }
  async removeFromCart(id) {
    return this.cartItems.delete(id);
  }
  async clearCart(sessionId) {
    const cartItemsToRemove = Array.from(this.cartItems.values()).filter((item) => item.sessionId === sessionId).map((item) => item.id);
    cartItemsToRemove.forEach((id) => this.cartItems.delete(id));
    return true;
  }
  // Contact message operations
  async createContactMessage(message) {
    const id = this.messageId++;
    const newMessage = {
      id,
      name: message.name,
      message: message.message,
      email: message.email,
      phone: message.phone !== void 0 ? message.phone : null,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
  // Newsletter operations
  async addSubscriber(subscriber) {
    const existingSubscriber = Array.from(this.subscribers.values()).find(
      (sub) => sub.email === subscriber.email
    );
    if (existingSubscriber) {
      return existingSubscriber;
    }
    const id = this.subscriberId++;
    const newSubscriber = {
      ...subscriber,
      id,
      subscribedAt: /* @__PURE__ */ new Date()
    };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }
};
var storage = new MemStorage();

// server/routes.ts
import { randomUUID } from "crypto";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  salePrice: numeric("sale_price"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  subCategory: text("sub_category"),
  brand: text("brand"),
  inStock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false),
  isOnSale: boolean("is_on_sale").default(false)
});
var categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  productCount: integer("product_count").default(0)
});
var cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  addedAt: timestamp("added_at").defaultNow()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow()
});
var insertProductSchema = createInsertSchema(products).omit({ id: true });
var insertCategorySchema = createInsertSchema(categories).omit({ id: true });
var insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, addedAt: true });
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
var insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, subscribedAt: true });

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  const router = express.Router();
  router.get("/products", async (req, res) => {
    try {
      const products2 = await storage.getAllProducts();
      if (!products2 || products2.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
      res.json(products2);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  });
  router.get("/products/:id", async (req, res) => {
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
  router.get("/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const normalizedCategory = category.toLowerCase().replace(/\s+/g, "-");
      const products2 = await storage.getProductsByCategory(normalizedCategory);
      if (!products2 || !products2.length) {
        return res.status(404).json({ message: "No products found in this category" });
      }
      res.json(products2);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ message: "Error fetching products by category" });
    }
  });
  router.get("/products/featured/:limit?", async (req, res) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : void 0;
      const products2 = await storage.getFeaturedProducts(limit);
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured products" });
    }
  });
  router.get("/products/sale/:limit?", async (req, res) => {
    try {
      const limit = req.params.limit ? parseInt(req.params.limit) : void 0;
      const products2 = await storage.getOnSaleProducts(limit);
      res.json(products2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching on sale products" });
    }
  });
  router.get("/categories", async (req, res) => {
    try {
      const categories2 = await storage.getAllCategories();
      res.json(categories2);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });
  router.use((req, res, next) => {
    let sessionId = req.headers.authorization;
    if (!sessionId) {
      sessionId = randomUUID();
      res.setHeader("X-Cart-Session", sessionId);
      res.setHeader("Access-Control-Expose-Headers", "X-Cart-Session");
    }
    req.headers.authorization = sessionId;
    next();
  });
  router.get("/cart", async (req, res) => {
    try {
      const sessionId = req.headers.authorization;
      const cartItems2 = await storage.getCartItems(sessionId);
      const cartWithProducts = await Promise.all(
        cartItems2.map(async (item) => {
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
  router.post("/cart", async (req, res) => {
    try {
      const sessionId = req.headers.authorization;
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        sessionId
      });
      const product = await storage.getProductById(validatedData.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const cartItems2 = await storage.getCartItems(sessionId);
      const existingItem = cartItems2.find((item) => item.productId === validatedData.productId);
      if (existingItem) {
        const updatedItem = await storage.updateCartItemQuantity(
          existingItem.id,
          existingItem.quantity + validatedData.quantity
        );
        return res.json(updatedItem);
      }
      const newCartItem = await storage.addToCart(validatedData);
      res.status(201).json(newCartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      res.status(500).json({ message: "Error adding item to cart" });
    }
  });
  router.patch("/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid cart item ID" });
      }
      if (typeof quantity !== "number" || quantity < 1) {
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
  router.delete("/cart/:id", async (req, res) => {
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
  router.delete("/cart", async (req, res) => {
    try {
      const sessionId = req.headers.authorization;
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart" });
    }
  });
  router.post("/contact", async (req, res) => {
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
  router.post("/subscribe", async (req, res) => {
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
  app2.use("/api", router);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "server/client"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname, "client");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import path3 from "path";
var app = express3();
var isProduction = process.env.NODE_ENV === "production";
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (!isProduction) {
    await setupVite(app, server);
  } else {
    const clientDistPath = path3.join(process.cwd(), "client", "dist");
    app.use(express3.static(clientDistPath));
    app.get("*", (req, res) => {
      res.sendFile(path3.join(clientDistPath, "index.html"));
    });
    serveStatic(app);
  }
  const port = process.env.PORT || 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`Server running in ${isProduction ? "production" : "development"} mode`);
    log(`Serving on port ${port}`);
  });
})();
