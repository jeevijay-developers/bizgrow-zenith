import {
  ShoppingBag,
  Croissant,
  Milk,
  Shirt,
  Sparkles,
  Smartphone,
  Apple,
  Zap,
  Pill,
  BookOpen,
  Wrench,
  Store,
  Package,
  Truck,
  Users,
  BarChart3,
  Calculator,
  Receipt,
  Tag,
  Clock,
  Briefcase,
  Salad,
  Palette,
  Gift,
  LucideIcon
} from "lucide-react";

// Category images
import kiranaImg from "@/assets/categories-ai/kirana.png";
import bakeryImg from "@/assets/categories-ai/bakery.png";
import dairyImg from "@/assets/categories-ai/dairy.png";
import clothingImg from "@/assets/categories-ai/clothing.png";
import cosmeticsImg from "@/assets/categories-ai/cosmetics.png";
import electronicsImg from "@/assets/categories-ai/electronics.png";
import fruitsVegetablesImg from "@/assets/categories-ai/fruits-vegetables.png";
import electricalImg from "@/assets/categories-ai/electrical.png";
import pharmacyImg from "@/assets/categories-ai/pharmacy.png";
import stationeryImg from "@/assets/categories-ai/stationery.png";
import hardwareImg from "@/assets/categories-ai/hardware.png";
import otherImg from "@/assets/categories-ai/other.png";

export interface CategoryQuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export interface CategoryTip {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SampleProduct {
  name: string;
  price: number;
  category: string;
  description?: string;
}

export interface PageContent {
  productsTitle: string;
  productsDescription: string;
  customersTitle: string;
  customersDescription: string;
  ordersTitle: string;
  ordersDescription: string;
  emptyProductsTitle: string;
  emptyProductsDescription: string;
  emptyCustomersTitle: string;
  emptyCustomersDescription: string;
  addProductButton: string;
  addCustomerButton: string;
}

export interface CategoryConfig {
  id: string;
  label: string;
  description: string;
  image: string;
  icon: LucideIcon;
  theme: {
    primary: string;
    primaryLight: string;
    accent: string;
    gradient: string;
  };
  terminology: {
    product: string;
    productPlural: string;
    customer: string;
    customerPlural: string;
    order: string;
    orderPlural: string;
  };
  dashboardIcons: {
    revenue: LucideIcon;
    orders: LucideIcon;
    products: LucideIcon;
    customers: LucideIcon;
  };
  quickActions: CategoryQuickAction[];
  tips: CategoryTip[];
  suggestedCategories: string[];
  sampleProducts: SampleProduct[];
  welcomeMessage: string;
  emptyStateMessage: string;
  pageContent: PageContent;
}

const createQuickActions = (categorySpecific: CategoryQuickAction[]): CategoryQuickAction[] => {
  const baseActions: CategoryQuickAction[] = [
    {
      title: "Share Store",
      description: "Get your store link",
      icon: Package,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500 text-white",
      href: "/dashboard/catalogue-link",
    },
  ];
  return [...categorySpecific, ...baseActions];
};

export const categoryConfigs: Record<string, CategoryConfig> = {
  kirana: {
    id: "kirana",
    label: "Kirana Store",
    description: "General & grocery",
    image: kiranaImg,
    icon: ShoppingBag,
    theme: {
      primary: "25 95% 53%",
      primaryLight: "35 95% 60%",
      accent: "45 93% 47%",
      gradient: "from-orange-500 to-amber-500",
    },
    terminology: {
      product: "item",
      productPlural: "items",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Receipt,
      products: ShoppingBag,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Item", description: "Add grocery item", icon: ShoppingBag, color: "bg-orange-500 text-white", href: "/dashboard/products" },
      { title: "AI Scan", description: "Scan shelf stock", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Credit Book", description: "Manage udhar", icon: Receipt, color: "bg-amber-500 text-white", href: "/dashboard/customers" },
      { title: "Daily Sales", description: "Today's billing", icon: Calculator, color: "bg-green-500 text-white", href: "/dashboard/pos-billing" },
    ]),
    tips: [
      { title: "Track Credit Sales", description: "Use customer profiles to manage udhar khata", icon: Receipt },
      { title: "Quick Billing", description: "Use POS for faster checkout", icon: Calculator },
      { title: "Stock Alerts", description: "Get notified when items run low", icon: Package },
    ],
    suggestedCategories: ["Groceries", "Snacks", "Beverages", "Dairy", "Personal Care", "Household"],
    sampleProducts: [
      { name: "Tata Salt (1kg)", price: 28, category: "Groceries", description: "Iodized salt" },
      { name: "Aashirvaad Atta (5kg)", price: 275, category: "Groceries", description: "Whole wheat flour" },
      { name: "Parle-G Biscuits", price: 10, category: "Snacks", description: "Classic glucose biscuits" },
      { name: "Amul Butter (100g)", price: 56, category: "Dairy", description: "Pasteurized butter" },
      { name: "Maggi Noodles (4 pack)", price: 56, category: "Snacks", description: "Instant noodles" },
      { name: "Surf Excel (1kg)", price: 195, category: "Household", description: "Washing powder" },
    ],
    welcomeMessage: "Your kirana store is ready to serve the neighborhood!",
    emptyStateMessage: "Add your first grocery items to start selling",
    pageContent: {
      productsTitle: "Store Inventory",
      productsDescription: "Manage your grocery items and stock levels",
      customersTitle: "Customers & Credit",
      customersDescription: "Manage udhar khata and customer relationships",
      ordersTitle: "Daily Orders",
      ordersDescription: "Track today's sales and order history",
      emptyProductsTitle: "No items in stock yet",
      emptyProductsDescription: "Add grocery items like atta, dal, oil to start your digital kirana",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Customers will appear here when they make purchases or you add them for credit tracking",
      addProductButton: "Add Item",
      addCustomerButton: "Add Customer",
    },
  },

  bakery: {
    id: "bakery",
    label: "Bakery",
    description: "Fresh baked goods",
    image: bakeryImg,
    icon: Croissant,
    theme: {
      primary: "35 95% 55%",
      primaryLight: "40 95% 65%",
      accent: "25 90% 50%",
      gradient: "from-amber-500 to-yellow-500",
    },
    terminology: {
      product: "item",
      productPlural: "items",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Clock,
      products: Croissant,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Item", description: "New bakery item", icon: Croissant, color: "bg-amber-500 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Custom Orders", description: "Cake bookings", icon: Clock, color: "bg-pink-500 text-white", href: "/dashboard/orders" },
      { title: "Daily Specials", description: "Today's fresh items", icon: Tag, color: "bg-orange-500 text-white", href: "/dashboard/products" },
    ]),
    tips: [
      { title: "Fresh Daily", description: "Update availability for fresh bakes", icon: Clock },
      { title: "Custom Cakes", description: "Accept cake orders in advance", icon: Croissant },
      { title: "Special Offers", description: "Promote daily specials", icon: Tag },
    ],
    suggestedCategories: ["Breads", "Cakes", "Pastries", "Cookies", "Snacks", "Beverages"],
    sampleProducts: [
      { name: "White Bread Loaf", price: 45, category: "Breads", description: "Fresh baked daily" },
      { name: "Chocolate Cake (1kg)", price: 650, category: "Cakes", description: "Rich chocolate layers" },
      { name: "Butter Croissant", price: 60, category: "Pastries", description: "Flaky & buttery" },
      { name: "Choco Chip Cookies (6pc)", price: 120, category: "Cookies", description: "Freshly baked" },
      { name: "Veg Puff", price: 25, category: "Snacks", description: "Crispy puff pastry" },
      { name: "Birthday Cake (2kg)", price: 1200, category: "Cakes", description: "Custom design available" },
    ],
    welcomeMessage: "Your bakery is ready to serve fresh delights!",
    emptyStateMessage: "Add your first baked goods to start selling",
    pageContent: {
      productsTitle: "Bakery Menu",
      productsDescription: "Manage your fresh bakes and daily specials",
      customersTitle: "Cake Orders & Customers",
      customersDescription: "Track custom cake orders and regular customers",
      ordersTitle: "Orders & Bookings",
      ordersDescription: "View cake bookings and daily orders",
      emptyProductsTitle: "No bakery items yet",
      emptyProductsDescription: "Add breads, cakes, and pastries to showcase your fresh bakes",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Customers will appear here when they place orders or book cakes",
      addProductButton: "Add Bakery Item",
      addCustomerButton: "Add Customer",
    },
  },

  dairy: {
    id: "dairy",
    label: "Dairy Shop",
    description: "Milk & dairy",
    image: dairyImg,
    icon: Milk,
    theme: {
      primary: "199 89% 48%",
      primaryLight: "195 85% 60%",
      accent: "175 80% 45%",
      gradient: "from-blue-400 to-cyan-400",
    },
    terminology: {
      product: "product",
      productPlural: "products",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Truck,
      products: Milk,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Product", description: "New dairy item", icon: Milk, color: "bg-cyan-500 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Delivery", description: "Manage routes", icon: Truck, color: "bg-blue-500 text-white", href: "/dashboard/delivery" },
      { title: "Subscriptions", description: "Daily customers", icon: Clock, color: "bg-teal-500 text-white", href: "/dashboard/customers" },
    ]),
    tips: [
      { title: "Daily Delivery", description: "Set up recurring deliveries", icon: Truck },
      { title: "Fresh Stock", description: "Update stock daily for freshness", icon: Milk },
      { title: "Expiry Tracking", description: "Monitor product shelf life", icon: Clock },
    ],
    suggestedCategories: ["Milk", "Paneer", "Curd", "Cheese", "Butter", "Ghee", "Ice Cream"],
    sampleProducts: [
      { name: "Full Cream Milk (1L)", price: 62, category: "Milk", description: "Fresh farm milk" },
      { name: "Paneer (200g)", price: 90, category: "Paneer", description: "Fresh cottage cheese" },
      { name: "Dahi (400g)", price: 45, category: "Curd", description: "Thick set curd" },
      { name: "Amul Cheese Slice (10pc)", price: 125, category: "Cheese", description: "Processed cheese" },
      { name: "Pure Ghee (500ml)", price: 350, category: "Ghee", description: "Desi cow ghee" },
      { name: "Butter (500g)", price: 265, category: "Butter", description: "Salted butter" },
    ],
    welcomeMessage: "Your dairy shop is ready for daily deliveries!",
    emptyStateMessage: "Add your first dairy products to start selling",
    pageContent: {
      productsTitle: "Dairy Products",
      productsDescription: "Manage your milk, paneer, and dairy inventory",
      customersTitle: "Subscription Customers",
      customersDescription: "Manage daily delivery subscriptions and routes",
      ordersTitle: "Daily Deliveries",
      ordersDescription: "Track today's deliveries and subscriptions",
      emptyProductsTitle: "No dairy products yet",
      emptyProductsDescription: "Add milk, paneer, curd and other dairy items",
      emptyCustomersTitle: "No subscribers yet",
      emptyCustomersDescription: "Add customers for daily milk delivery subscriptions",
      addProductButton: "Add Dairy Product",
      addCustomerButton: "Add Subscriber",
    },
  },

  clothing: {
    id: "clothing",
    label: "Clothing Store",
    description: "Fashion & apparel",
    image: clothingImg,
    icon: Shirt,
    theme: {
      primary: "330 81% 60%",
      primaryLight: "340 75% 70%",
      accent: "350 89% 60%",
      gradient: "from-pink-500 to-rose-500",
    },
    terminology: {
      product: "item",
      productPlural: "items",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Package,
      products: Shirt,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Item", description: "New clothing item", icon: Shirt, color: "bg-pink-500 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Collections", description: "Manage categories", icon: Tag, color: "bg-rose-500 text-white", href: "/dashboard/products" },
      { title: "Sizes", description: "Stock by size", icon: Package, color: "bg-purple-500 text-white", href: "/dashboard/products" },
    ]),
    tips: [
      { title: "Size Variants", description: "Add size options for each item", icon: Shirt },
      { title: "Seasonal Collections", description: "Create seasonal categories", icon: Tag },
      { title: "Style Guide", description: "Show outfit combinations", icon: Sparkles },
    ],
    suggestedCategories: ["Men's Wear", "Women's Wear", "Kids", "Ethnic", "Western", "Accessories", "Footwear"],
    sampleProducts: [
      { name: "Cotton Formal Shirt", price: 899, category: "Men's Wear", description: "Premium cotton, all sizes" },
      { name: "Kurti Set", price: 1299, category: "Women's Wear", description: "Printed cotton kurti" },
      { name: "Kids T-Shirt", price: 399, category: "Kids", description: "100% cotton, various prints" },
      { name: "Saree (Silk)", price: 2499, category: "Ethnic", description: "Banarasi silk saree" },
      { name: "Denim Jeans", price: 1199, category: "Western", description: "Slim fit, stretchable" },
      { name: "Leather Belt", price: 599, category: "Accessories", description: "Genuine leather" },
    ],
    welcomeMessage: "Your fashion store is ready to showcase your collection!",
    emptyStateMessage: "Add your first clothing items to start selling",
    pageContent: {
      productsTitle: "Fashion Collection",
      productsDescription: "Manage your clothing inventory and sizes",
      customersTitle: "Fashion Customers",
      customersDescription: "Track your regular customers and their preferences",
      ordersTitle: "Fashion Orders",
      ordersDescription: "View orders and manage deliveries",
      emptyProductsTitle: "No fashion items yet",
      emptyProductsDescription: "Add shirts, sarees, kurtis to build your collection",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Customers will appear here when they make purchases",
      addProductButton: "Add Fashion Item",
      addCustomerButton: "Add Customer",
    },
  },

  cosmetic: {
    id: "cosmetic",
    label: "Cosmetics",
    description: "Beauty & skincare",
    image: cosmeticsImg,
    icon: Sparkles,
    theme: {
      primary: "270 67% 58%",
      primaryLight: "280 65% 68%",
      accent: "300 65% 55%",
      gradient: "from-purple-500 to-violet-500",
    },
    terminology: {
      product: "product",
      productPlural: "products",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Package,
      products: Sparkles,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Product", description: "New beauty product", icon: Sparkles, color: "bg-purple-500 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Palette, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Brands", description: "Manage brands", icon: Tag, color: "bg-pink-500 text-white", href: "/dashboard/products" },
      { title: "Offers", description: "Beauty deals", icon: Gift, color: "bg-rose-500 text-white", href: "/dashboard/customize" },
    ]),
    tips: [
      { title: "Brand Categories", description: "Organize by brand for easy browsing", icon: Tag },
      { title: "Skin Types", description: "Add skin type tags to products", icon: Sparkles },
      { title: "Tutorials", description: "Link product usage guides", icon: Palette },
    ],
    suggestedCategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Nail Care", "Men's Grooming"],
    sampleProducts: [
      { name: "Lakme Foundation", price: 450, category: "Makeup", description: "All-day coverage" },
      { name: "Himalaya Face Wash", price: 120, category: "Skincare", description: "Neem purifying" },
      { name: "Maybelline Lipstick", price: 350, category: "Makeup", description: "Matte finish" },
      { name: "L'Oreal Shampoo (400ml)", price: 399, category: "Haircare", description: "For damaged hair" },
      { name: "Nivea Moisturizer", price: 280, category: "Skincare", description: "24hr hydration" },
      { name: "Nail Polish Set", price: 299, category: "Nail Care", description: "6 trending shades" },
    ],
    welcomeMessage: "Your beauty store is ready to glow!",
    emptyStateMessage: "Add your first beauty products to start selling",
    pageContent: {
      productsTitle: "Beauty Products",
      productsDescription: "Manage your skincare, makeup, and beauty inventory",
      customersTitle: "Beauty Customers",
      customersDescription: "Track customer preferences and purchase history",
      ordersTitle: "Beauty Orders",
      ordersDescription: "View orders and manage deliveries",
      emptyProductsTitle: "No beauty products yet",
      emptyProductsDescription: "Add skincare, makeup, and haircare products to start",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Customers will appear here when they make purchases",
      addProductButton: "Add Beauty Product",
      addCustomerButton: "Add Customer",
    },
  },

  mobile: {
    id: "mobile",
    label: "Electronics",
    description: "Gadgets & more",
    image: electronicsImg,
    icon: Smartphone,
    theme: {
      primary: "215 20% 45%",
      primaryLight: "210 25% 55%",
      accent: "200 70% 50%",
      gradient: "from-slate-600 to-gray-700",
    },
    terminology: {
      product: "device",
      productPlural: "devices",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Package,
      products: Smartphone,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Device", description: "New electronics", icon: Smartphone, color: "bg-slate-600 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Accessories", description: "Add-ons & parts", icon: Package, color: "bg-blue-500 text-white", href: "/dashboard/products" },
      { title: "Repairs", description: "Service orders", icon: Wrench, color: "bg-orange-500 text-white", href: "/dashboard/orders" },
    ]),
    tips: [
      { title: "Specifications", description: "Add detailed specs for each device", icon: Smartphone },
      { title: "Warranty Info", description: "Include warranty details", icon: Package },
      { title: "Comparisons", description: "Help customers compare models", icon: BarChart3 },
    ],
    suggestedCategories: ["Smartphones", "Tablets", "Accessories", "Chargers", "Cases", "Earphones", "Repairs"],
    sampleProducts: [
      { name: "USB-C Charger (20W)", price: 499, category: "Chargers", description: "Fast charging" },
      { name: "Phone Case (Premium)", price: 299, category: "Cases", description: "Shockproof" },
      { name: "TWS Earbuds", price: 1499, category: "Earphones", description: "Wireless with ANC" },
      { name: "Screen Protector", price: 199, category: "Accessories", description: "Tempered glass" },
      { name: "Power Bank (10000mAh)", price: 899, category: "Accessories", description: "Fast charging" },
      { name: "Screen Repair Service", price: 2500, category: "Repairs", description: "Original display" },
    ],
    welcomeMessage: "Your electronics store is ready for business!",
    emptyStateMessage: "Add your first devices to start selling",
    pageContent: {
      productsTitle: "Electronics Inventory",
      productsDescription: "Manage your devices, accessories, and repair services",
      customersTitle: "Tech Customers",
      customersDescription: "Track customers and their device history",
      ordersTitle: "Orders & Repairs",
      ordersDescription: "View sales orders and repair requests",
      emptyProductsTitle: "No devices yet",
      emptyProductsDescription: "Add phones, accessories, and repair services",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Customers will appear here when they make purchases or request repairs",
      addProductButton: "Add Device/Accessory",
      addCustomerButton: "Add Customer",
    },
  },

  fruits: {
    id: "fruits",
    label: "Fruits & Vegetables",
    description: "Fresh produce",
    image: fruitsVegetablesImg,
    icon: Apple,
    theme: {
      primary: "142 71% 45%",
      primaryLight: "145 65% 55%",
      accent: "100 70% 50%",
      gradient: "from-green-500 to-emerald-500",
    },
    terminology: {
      product: "item",
      productPlural: "items",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Truck,
      products: Apple,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Item", description: "New produce", icon: Apple, color: "bg-green-500 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Delivery", description: "Manage routes", icon: Truck, color: "bg-emerald-500 text-white", href: "/dashboard/delivery" },
      { title: "Daily Rates", description: "Update prices", icon: Tag, color: "bg-lime-500 text-white", href: "/dashboard/products" },
    ]),
    tips: [
      { title: "Daily Pricing", description: "Update prices based on market rates", icon: Tag },
      { title: "Seasonal Items", description: "Highlight seasonal produce", icon: Apple },
      { title: "Fresh Guarantee", description: "Show freshness quality", icon: Salad },
    ],
    suggestedCategories: ["Fruits", "Vegetables", "Leafy Greens", "Exotic", "Organic", "Seasonal"],
    sampleProducts: [
      { name: "Apple (1kg)", price: 180, category: "Fruits", description: "Fresh Shimla apples" },
      { name: "Banana (1 dozen)", price: 60, category: "Fruits", description: "Ripe yellow bananas" },
      { name: "Tomato (1kg)", price: 40, category: "Vegetables", description: "Fresh red tomatoes" },
      { name: "Onion (1kg)", price: 35, category: "Vegetables", description: "Fresh onions" },
      { name: "Spinach (Palak)", price: 30, category: "Leafy Greens", description: "Fresh bunch" },
      { name: "Mango (Alphonso 1kg)", price: 350, category: "Seasonal", description: "Premium quality" },
    ],
    welcomeMessage: "Your fresh produce store is ready!",
    emptyStateMessage: "Add your first fruits & vegetables to start selling",
    pageContent: {
      productsTitle: "Fresh Produce",
      productsDescription: "Manage your fruits, vegetables, and daily prices",
      customersTitle: "Regular Customers",
      customersDescription: "Track daily customers and subscriptions",
      ordersTitle: "Today's Orders",
      ordersDescription: "View daily orders and delivery schedule",
      emptyProductsTitle: "No produce yet",
      emptyProductsDescription: "Add fruits, vegetables, and leafy greens to start",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Customers will appear here when they make purchases",
      addProductButton: "Add Produce",
      addCustomerButton: "Add Customer",
    },
  },

  electrical: {
    id: "electrical",
    label: "Electrical Supplies",
    description: "Electrical goods",
    image: electricalImg,
    icon: Zap,
    theme: {
      primary: "45 93% 47%",
      primaryLight: "50 90% 55%",
      accent: "35 95% 50%",
      gradient: "from-yellow-500 to-orange-500",
    },
    terminology: {
      product: "item",
      productPlural: "items",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Package,
      products: Zap,
      customers: Briefcase,
    },
    quickActions: createQuickActions([
      { title: "Add Item", description: "New electrical", icon: Zap, color: "bg-yellow-500 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Bulk Orders", description: "Contractor orders", icon: Briefcase, color: "bg-orange-500 text-white", href: "/dashboard/orders" },
      { title: "Catalog", description: "Print catalog", icon: Package, color: "bg-amber-500 text-white", href: "/dashboard/products" },
    ]),
    tips: [
      { title: "Bulk Pricing", description: "Offer contractor discounts", icon: Briefcase },
      { title: "Brands", description: "Organize by brand", icon: Tag },
      { title: "Technical Specs", description: "Add wattage, voltage details", icon: Zap },
    ],
    suggestedCategories: ["Wires & Cables", "Switches", "MCBs", "Lights", "Fans", "Motors", "Tools"],
    sampleProducts: [
      { name: "1.5mm Wire (90m)", price: 2800, category: "Wires & Cables", description: "Copper, ISI marked" },
      { name: "Modular Switch Board", price: 450, category: "Switches", description: "6 module" },
      { name: "LED Bulb (9W)", price: 120, category: "Lights", description: "Cool daylight" },
      { name: "Ceiling Fan", price: 1800, category: "Fans", description: "5 star rated" },
      { name: "MCB (32A)", price: 350, category: "MCBs", description: "Single pole" },
      { name: "Extension Board (4+1)", price: 299, category: "Tools", description: "Surge protected" },
    ],
    welcomeMessage: "Your electrical store is powered up!",
    emptyStateMessage: "Add your first electrical products to start selling",
    pageContent: {
      productsTitle: "Electrical Inventory",
      productsDescription: "Manage wires, switches, and electrical supplies",
      customersTitle: "Contractors & Customers",
      customersDescription: "Track contractors and regular customers",
      ordersTitle: "Orders & Bulk Requests",
      ordersDescription: "View orders and contractor bulk requests",
      emptyProductsTitle: "No electrical items yet",
      emptyProductsDescription: "Add wires, switches, and electrical supplies to start",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Customers and contractors will appear here when they make purchases",
      addProductButton: "Add Electrical Item",
      addCustomerButton: "Add Contractor",
    },
  },

  pharmacy: {
    id: "pharmacy",
    label: "Pharmacy",
    description: "Health & medicine",
    image: pharmacyImg,
    icon: Pill,
    theme: {
      primary: "168 76% 42%",
      primaryLight: "170 70% 52%",
      accent: "185 75% 45%",
      gradient: "from-teal-500 to-cyan-500",
    },
    terminology: {
      product: "medicine",
      productPlural: "medicines",
      customer: "patient",
      customerPlural: "patients",
      order: "prescription",
      orderPlural: "prescriptions",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Receipt,
      products: Pill,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Medicine", description: "New medicine", icon: Pill, color: "bg-teal-500 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Prescriptions", description: "Manage orders", icon: Receipt, color: "bg-cyan-500 text-white", href: "/dashboard/orders" },
      { title: "Expiry Check", description: "Track expiry", icon: Clock, color: "bg-red-500 text-white", href: "/dashboard/products" },
    ]),
    tips: [
      { title: "Expiry Tracking", description: "Monitor medicine expiry dates", icon: Clock },
      { title: "Prescriptions", description: "Store prescription records", icon: Receipt },
      { title: "Generic Options", description: "Show generic alternatives", icon: Pill },
    ],
    suggestedCategories: ["Medicines", "OTC", "Personal Care", "Baby Care", "Health Devices", "Vitamins"],
    sampleProducts: [
      { name: "Paracetamol (10 tab)", price: 18, category: "Medicines", description: "500mg tablets" },
      { name: "Crocin Advance", price: 35, category: "Medicines", description: "Pain relief" },
      { name: "Dettol (500ml)", price: 145, category: "Personal Care", description: "Antiseptic liquid" },
      { name: "Band-Aid (100pc)", price: 99, category: "OTC", description: "Flexible fabric" },
      { name: "Digital Thermometer", price: 250, category: "Health Devices", description: "Accurate reading" },
      { name: "Vitamin C (30 tab)", price: 180, category: "Vitamins", description: "Immunity booster" },
    ],
    welcomeMessage: "Your pharmacy is ready to serve patients!",
    emptyStateMessage: "Add your first medicines to start selling",
    pageContent: {
      productsTitle: "Medicine Inventory",
      productsDescription: "Manage medicines, expiry dates, and stock levels",
      customersTitle: "Patient Records",
      customersDescription: "Track patient purchase history and prescriptions",
      ordersTitle: "Prescriptions & Orders",
      ordersDescription: "View prescription orders and purchase history",
      emptyProductsTitle: "No medicines yet",
      emptyProductsDescription: "Add medicines, OTC products, and health items",
      emptyCustomersTitle: "No patients yet",
      emptyCustomersDescription: "Patients will appear here when they make purchases",
      addProductButton: "Add Medicine",
      addCustomerButton: "Add Patient",
    },
  },

  stationery: {
    id: "stationery",
    label: "Stationery",
    description: "Books & supplies",
    image: stationeryImg,
    icon: BookOpen,
    theme: {
      primary: "234 89% 58%",
      primaryLight: "230 80% 65%",
      accent: "210 90% 55%",
      gradient: "from-indigo-500 to-blue-500",
    },
    terminology: {
      product: "item",
      productPlural: "items",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Package,
      products: BookOpen,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Item", description: "New stationery", icon: BookOpen, color: "bg-indigo-500 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "School Kits", description: "Bundle sets", icon: Package, color: "bg-blue-500 text-white", href: "/dashboard/products" },
      { title: "Bulk Orders", description: "School orders", icon: Briefcase, color: "bg-purple-500 text-white", href: "/dashboard/orders" },
    ]),
    tips: [
      { title: "School Season", description: "Prepare for back-to-school rush", icon: BookOpen },
      { title: "Bundle Kits", description: "Create grade-wise stationery kits", icon: Package },
      { title: "Bulk Discounts", description: "Offer school bulk pricing", icon: Briefcase },
    ],
    suggestedCategories: ["Pens", "Pencils", "Notebooks", "Books", "Art Supplies", "Office Supplies", "Gifts"],
    sampleProducts: [
      { name: "Classmate Notebook (180pg)", price: 45, category: "Notebooks", description: "Single line ruled" },
      { name: "Reynolds Pen (10pc)", price: 80, category: "Pens", description: "Blue ink" },
      { name: "Apsara Pencils (10pc)", price: 35, category: "Pencils", description: "HB grade" },
      { name: "Geometry Box", price: 120, category: "Office Supplies", description: "Complete set" },
      { name: "Crayons (24 colors)", price: 85, category: "Art Supplies", description: "Bright colors" },
      { name: "School Bag", price: 899, category: "Gifts", description: "Waterproof" },
    ],
    welcomeMessage: "Your stationery store is ready to inspire!",
    emptyStateMessage: "Add your first stationery items to start selling",
    pageContent: {
      productsTitle: "Stationery Inventory",
      productsDescription: "Manage books, pens, and school supplies",
      customersTitle: "Schools & Customers",
      customersDescription: "Track schools, institutions, and regular customers",
      ordersTitle: "Orders & Bulk Requests",
      ordersDescription: "View orders and school bulk requests",
      emptyProductsTitle: "No stationery items yet",
      emptyProductsDescription: "Add notebooks, pens, and school supplies",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Schools and customers will appear here when they make purchases",
      addProductButton: "Add Stationery Item",
      addCustomerButton: "Add School/Customer",
    },
  },

  hardware: {
    id: "hardware",
    label: "Hardware",
    description: "Tools & equipment",
    image: hardwareImg,
    icon: Wrench,
    theme: {
      primary: "220 13% 40%",
      primaryLight: "215 15% 50%",
      accent: "220 20% 55%",
      gradient: "from-gray-600 to-slate-600",
    },
    terminology: {
      product: "item",
      productPlural: "items",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Package,
      products: Wrench,
      customers: Briefcase,
    },
    quickActions: createQuickActions([
      { title: "Add Item", description: "New hardware", icon: Wrench, color: "bg-gray-600 text-white", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Bulk Orders", description: "Contractor orders", icon: Briefcase, color: "bg-slate-600 text-white", href: "/dashboard/orders" },
      { title: "Inventory", description: "Stock check", icon: Package, color: "bg-blue-600 text-white", href: "/dashboard/products" },
    ]),
    tips: [
      { title: "Contractor Accounts", description: "Set up regular customer pricing", icon: Briefcase },
      { title: "Tool Brands", description: "Organize by trusted brands", icon: Wrench },
      { title: "Bulk Pricing", description: "Offer quantity discounts", icon: Package },
    ],
    suggestedCategories: ["Hand Tools", "Power Tools", "Fasteners", "Paints", "Plumbing", "Building Materials"],
    sampleProducts: [
      { name: "Hammer (Stanley)", price: 450, category: "Hand Tools", description: "16oz claw hammer" },
      { name: "Drill Machine", price: 2500, category: "Power Tools", description: "10mm, variable speed" },
      { name: "Screws (100pc)", price: 80, category: "Fasteners", description: "4mm x 25mm" },
      { name: "Asian Paints (1L)", price: 350, category: "Paints", description: "Interior emulsion" },
      { name: "PVC Pipe (10ft)", price: 180, category: "Plumbing", description: "1 inch diameter" },
      { name: "Cement (50kg)", price: 380, category: "Building Materials", description: "OPC 53 grade" },
    ],
    welcomeMessage: "Your hardware store is ready to build!",
    emptyStateMessage: "Add your first hardware items to start selling",
    pageContent: {
      productsTitle: "Hardware Inventory",
      productsDescription: "Manage tools, building materials, and supplies",
      customersTitle: "Contractors & Customers",
      customersDescription: "Track contractors and regular customers",
      ordersTitle: "Orders & Bulk Requests",
      ordersDescription: "View orders and contractor bulk requests",
      emptyProductsTitle: "No hardware items yet",
      emptyProductsDescription: "Add tools, paints, and building materials",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Contractors and customers will appear here when they make purchases",
      addProductButton: "Add Hardware Item",
      addCustomerButton: "Add Contractor",
    },
  },

  other: {
    id: "other",
    label: "Other Retail",
    description: "Other retail",
    image: otherImg,
    icon: Store,
    theme: {
      primary: "262 83% 58%",
      primaryLight: "270 75% 65%",
      accent: "280 70% 55%",
      gradient: "from-purple-500 to-violet-500",
    },
    terminology: {
      product: "product",
      productPlural: "products",
      customer: "customer",
      customerPlural: "customers",
      order: "order",
      orderPlural: "orders",
    },
    dashboardIcons: {
      revenue: Calculator,
      orders: Package,
      products: Store,
      customers: Users,
    },
    quickActions: createQuickActions([
      { title: "Add Product", description: "New product", icon: Package, color: "bg-primary text-primary-foreground", href: "/dashboard/products" },
      { title: "AI Upload", description: "Photo to product", icon: Sparkles, color: "bg-gradient-to-br from-violet-500 to-purple-600 text-white", href: "/dashboard/ai-upload" },
      { title: "Categories", description: "Organize items", icon: Tag, color: "bg-blue-500 text-white", href: "/dashboard/products" },
      { title: "Orders", description: "View orders", icon: Receipt, color: "bg-green-500 text-white", href: "/dashboard/orders" },
    ]),
    tips: [
      { title: "Categories", description: "Organize products into categories", icon: Tag },
      { title: "Descriptions", description: "Add detailed product descriptions", icon: Package },
      { title: "Photos", description: "Use clear product photos", icon: Sparkles },
    ],
    suggestedCategories: ["Popular", "New Arrivals", "Sale", "Featured"],
    sampleProducts: [
      { name: "Sample Product 1", price: 199, category: "Popular", description: "Best seller" },
      { name: "Sample Product 2", price: 299, category: "New Arrivals", description: "Just added" },
      { name: "Sample Product 3", price: 149, category: "Sale", description: "Limited offer" },
    ],
    welcomeMessage: "Your store is ready for business!",
    emptyStateMessage: "Add your first products to start selling",
    pageContent: {
      productsTitle: "Products",
      productsDescription: "Manage your product inventory",
      customersTitle: "Customers",
      customersDescription: "Manage your customer relationships",
      ordersTitle: "Orders",
      ordersDescription: "View and manage your orders",
      emptyProductsTitle: "No products yet",
      emptyProductsDescription: "Add your first products to start selling",
      emptyCustomersTitle: "No customers yet",
      emptyCustomersDescription: "Customers will appear here when they make purchases",
      addProductButton: "Add Product",
      addCustomerButton: "Add Customer",
    },
  },
};

// Helper function to get category config
export function getCategoryConfig(categoryId: string | null | undefined): CategoryConfig {
  if (!categoryId) return categoryConfigs.other;
  
  // Normalize the category ID
  const normalizedId = categoryId.toLowerCase().replace(/[-_\s]/g, "");
  
  // Try to find exact match
  if (categoryConfigs[normalizedId]) {
    return categoryConfigs[normalizedId];
  }
  
  // Try partial matches
  for (const [key, config] of Object.entries(categoryConfigs)) {
    if (normalizedId.includes(key) || key.includes(normalizedId)) {
      return config;
    }
  }
  
  return categoryConfigs.other;
}

// Hook-friendly export
export const useCategoryConfig = (categoryId: string | null | undefined): CategoryConfig => {
  return getCategoryConfig(categoryId);
};
