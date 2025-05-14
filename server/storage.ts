import { 
  products, type Product, type InsertProduct,
  categories, type Category, type InsertCategory,
  cartItems, type CartItem, type InsertCartItem,
  contactMessages, type ContactMessage, type InsertContactMessage,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";

export interface IStorage {
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getOnSaleProducts(limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Cart operations
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Contact message operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Newsletter operations
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private cartItems: Map<number, CartItem>;
  private contactMessages: Map<number, ContactMessage>;
  private subscribers: Map<number, Subscriber>;
  
  private productId: number;
  private categoryId: number;
  private cartItemId: number;
  private messageId: number;
  private subscriberId: number;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.contactMessages = new Map();
    this.subscribers = new Map();
    
    this.productId = 1;
    this.categoryId = 1;
    this.cartItemId = 1;
    this.messageId = 1;
    this.subscriberId = 1;
    
    // Initialize with some categories
    this.initializeData();
  }

  private initializeData() {
    // Add categories
    const categories: InsertCategory[] = [
      {
        name: "Building Materials",
        slug: "building-materials",
        description: "Quality building and construction materials",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.24.jpeg",
        productCount: 45
      },
      {
        name: "Solar Equipment",
        slug: "solar-equipment",
        description: "Complete solar power solutions and equipment",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.16.jpeg",
        productCount: 28
      },
      {
        name: "Hardware Tools",
        slug: "hardware-tools",
        description: "Professional grade hardware tools",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.20.jpeg",
        productCount: 35
      },
      {
        name: "Paint & Finishes",
        slug: "paint-finishes",
        description: "Quality paints and wood finishes",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.22.jpeg",
        productCount: 42
      },
      {
        name: "Tiling Solutions",
        slug: "tiling-solutions",
        description: "Complete tiling and grouting solutions",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.14.jpeg",
        productCount: 30
      },
        description: "Solar panels, inverters and complete solar solutions",
        imageUrl: "/assets/IMG-20250419-WA0016.jpg",
        productCount: 28
      },
      {
        name: "Hardware Tools",
        slug: "hardware-tools",
        description: "Professional hardware and hand tools",
        imageUrl: "/assets/IMG-20250419-WA0013.jpg",
        productCount: 64
      },
      {
        name: "Paint & Finishes",
        slug: "paint-finishes",
        description: "Quality paints, varnishes and wood finishes",
        imageUrl: "/assets/IMG-20250419-WA0010.jpg",
        productCount: 38
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
    
    categories.forEach(category => this.createCategory(category));
    
    // Add products
    const products: InsertProduct[] = [
      {
        name: "Cement Mixture S1",
        description: "High-quality cement mixture for construction",
        price: "15.99",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.24.jpeg",
        category: "building-materials",
        brand: "Magwere",
        featured: true,
        inStock: true
      },
      {
        name: "Premium Ceiling Tiles",
        description: "Decorative ceiling tiles for modern interiors",
        price: "29.99",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.23.jpeg",
        category: "ceiling-solutions",
        brand: "MAG-GRIP",
        featured: true,
        inStock: true
      },
      {
        name: "Industrial Paint Bucket",
        description: "Large capacity paint for commercial use",
        price: "89.99",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.22.jpeg",
        category: "paint-finishes",
        brand: "Magwere",
        featured: true,
        inStock: true
      },
      {
        name: "Construction Sand Mix",
        description: "Fine quality construction sand",
        price: "12.99",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.21.jpeg",
        category: "building-materials",
        brand: "Magwere",
        featured: false,
        inStock: true
      },
      {
        name: "Professional Tile Adhesive",
        description: "Strong bonding tile adhesive for all surfaces",
        price: "25.99",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.20.jpeg",
        category: "tiling-solutions",
        brand: "MAG-GRIP",
        featured: true,
        inStock: true
      },
      {
        name: "Solar Panel 200W",
        description: "High-efficiency solar panel for residential use",
        price: "299.99",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.19.jpeg",
        category: "solar-equipment",
        brand: "Magwere",
        featured: true,
        inStock: true
      },
      {
        name: "Professional Solar Kit",
        description: "Complete solar power system with inverter",
        price: "1299.99",
        imageUrl: "/assets/IMG-20250419-WA0016.jpg",
        category: "solar-equipment",
        brand: "Magwere",
        featured: true,
        inStock: true
      },
      {
        name: "Premium Tile Adhesive",
        description: "High-quality tile adhesive for professional use",
        price: "45.99",
        imageUrl: "/assets/IMG-20250419-WA0011.jpg",
        category: "tiling-solutions",
        brand: "MAG-GRIP",
        featured: true,
        inStock: true
      },
      {
        name: "Construction Hardware Kit",
        description: "Complete set of professional construction tools",
        price: "199.99",
        imageUrl: "/assets/IMG-20250419-WA0013.jpg",
        category: "hardware-tools",
        brand: "WADFOW",
        featured: true,
        inStock: true
      },
      {
        name: "Premium Wall Paint",
        description: "High-quality interior and exterior paint",
        price: "79.99",
        imageUrl: "/assets/IMG-20250419-WA0010.jpg",
        category: "paint-finishes",
        brand: "Magwere",
        featured: true,
        inStock: true
      },
      {
        name: "Building Materials Set",
        description: "Essential building and construction materials",
        price: "299.99",
        imageUrl: "/assets/IMG-20250419-WA0019.jpg",
        category: "building-materials",
        brand: "Magwere",
        featured: true,
        inStock: true
      },
      {
        name: "Professional Paint Roller Set",
        description: "Complete paint roller kit with extensions",
        price: "35.99",
        imageUrl: "/assets/IMG-20250419-WA0010.jpg",
        category: "paint-finishes",
        brand: "ColorMaster",
        featured: true,
        inStock: true
      },
      {
        name: "Premium Cement Mix",
        description: "High-quality cement for construction projects",
        price: "12.99",
        imageUrl: "/assets/IMG-20250419-WA0019.jpg",
        category: "building-materials",
        brand: "BuildPro",
        featured: true,
        inStock: true
      },
      {
        name: "Solar Panel Kit 5kW",
        description: "Complete solar system with inverter and batteries",
        price: "2999.99",
        salePrice: "2799.99",
        imageUrl: "/assets/IMG-20250419-WA0016.jpg",
        category: "solar-equipment",
        brand: "Magwere",
        featured: true,
        inStock: true
      },
      {
        name: "Premium Wall Paint 20L",
        description: "Interior and exterior wall paint",
        price: "89.99",
        imageUrl: "/assets/IMG-20250419-WA0010.jpg",
        category: "paint-finishes",
        brand: "Magwere",
        featured: true,
        inStock: true
      },
      {
        name: "Professional Tool Set",
        description: "Complete set of professional hardware tools",
        price: "199.99",
        imageUrl: "/assets/IMG-20250419-WA0016.jpg",
        category: "hardware-tools",
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
    
    products.forEach(product => this.createProduct(product));
  }

  // Product operations
  async getAllProducts(): Promise<Product[]> {
    if (this.products.size === 0) {
      // Initialize with some default products if empty
      const defaultProducts: InsertProduct[] = [
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
      
      defaultProducts.forEach(product => this.createProduct(product));
    }
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const featuredProducts = Array.from(this.products.values()).filter(
      product => product.featured
    );
    
    return limit ? featuredProducts.slice(0, limit) : featuredProducts;
  }

  async getOnSaleProducts(limit?: number): Promise<Product[]> {
    const onSaleProducts = Array.from(this.products.values()).filter(
      product => product.isOnSale
    );
    
    return limit ? onSaleProducts.slice(0, limit) : onSaleProducts;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const newProduct: Product = { 
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
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      category => category.slug === slug
    );
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const newCategory: Category = { 
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
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    const id = this.cartItemId++;
    const newCartItem: CartItem = { 
      ...cartItem, 
      id, 
      quantity: cartItem.quantity !== undefined ? cartItem.quantity : 1,
      addedAt: new Date() 
    };
    this.cartItems.set(id, newCartItem);
    return newCartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem: CartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const cartItemsToRemove = Array.from(this.cartItems.values())
      .filter(item => item.sessionId === sessionId)
      .map(item => item.id);
    
    cartItemsToRemove.forEach(id => this.cartItems.delete(id));
    return true;
  }

  // Contact message operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageId++;
    const newMessage: ContactMessage = { 
      id,
      name: message.name,
      message: message.message,
      email: message.email,
      phone: message.phone !== undefined ? message.phone : null,
      createdAt: new Date() 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  // Newsletter operations
  async addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.subscribers.values()).find(
      sub => sub.email === subscriber.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.subscriberId++;
    const newSubscriber: Subscriber = { 
      ...subscriber, 
      id, 
      subscribedAt: new Date() 
    };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }
}

export const storage = new MemStorage();
