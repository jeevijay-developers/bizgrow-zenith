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
  Coffee,
  Salad,
  Scissors,
  Palette,
  Gift,
  Baby,
  PawPrint,
  Gem,
  Watch,
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

export interface CategoryConfig {
  id: string;
  label: string;
  description: string;
  image: string;
  icon: LucideIcon;
  // Theme colors (HSL values for CSS variables)
  theme: {
    primary: string;        // Main brand color
    primaryLight: string;   // Lighter variant
    accent: string;         // Accent color
    gradient: string;       // Tailwind gradient classes
  };
  // Category-specific terminology
  terminology: {
    product: string;        // What to call products (items, dishes, medicines, etc.)
    productPlural: string;
    customer: string;       // What to call customers (patients, clients, etc.)
    customerPlural: string;
    order: string;          // What to call orders (prescription, booking, etc.)
    orderPlural: string;
  };
  // Category-specific icons for dashboard
  dashboardIcons: {
    revenue: LucideIcon;
    orders: LucideIcon;
    products: LucideIcon;
    customers: LucideIcon;
  };
  // Category-specific quick actions
  quickActions: CategoryQuickAction[];
  // Category-specific tips for new stores
  tips: CategoryTip[];
  // Suggested product categories for this store type
  suggestedCategories: string[];
  // Welcome messages
  welcomeMessage: string;
  emptyStateMessage: string;
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
      primary: "25 95% 53%",      // Orange
      primaryLight: "35 95% 60%",
      accent: "45 93% 47%",       // Amber
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
    welcomeMessage: "Your kirana store is ready to serve the neighborhood!",
    emptyStateMessage: "Add your first grocery items to start selling",
  },

  bakery: {
    id: "bakery",
    label: "Bakery",
    description: "Fresh baked goods",
    image: bakeryImg,
    icon: Croissant,
    theme: {
      primary: "35 95% 55%",      // Warm amber
      primaryLight: "40 95% 65%",
      accent: "25 90% 50%",       // Orange-brown
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
    welcomeMessage: "Your bakery is ready to serve fresh delights!",
    emptyStateMessage: "Add your first baked goods to start selling",
  },

  dairy: {
    id: "dairy",
    label: "Dairy Shop",
    description: "Milk & dairy",
    image: dairyImg,
    icon: Milk,
    theme: {
      primary: "199 89% 48%",     // Cyan/blue
      primaryLight: "195 85% 60%",
      accent: "175 80% 45%",      // Teal
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
    welcomeMessage: "Your dairy shop is ready for daily deliveries!",
    emptyStateMessage: "Add your first dairy products to start selling",
  },

  clothing: {
    id: "clothing",
    label: "Clothing Store",
    description: "Fashion & apparel",
    image: clothingImg,
    icon: Shirt,
    theme: {
      primary: "330 81% 60%",     // Pink
      primaryLight: "340 75% 70%",
      accent: "350 89% 60%",      // Rose
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
    welcomeMessage: "Your fashion store is ready to showcase your collection!",
    emptyStateMessage: "Add your first clothing items to start selling",
  },

  cosmetic: {
    id: "cosmetic",
    label: "Cosmetics",
    description: "Beauty & skincare",
    image: cosmeticsImg,
    icon: Sparkles,
    theme: {
      primary: "270 67% 58%",     // Purple
      primaryLight: "280 65% 68%",
      accent: "300 65% 55%",      // Violet
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
    welcomeMessage: "Your beauty store is ready to glow!",
    emptyStateMessage: "Add your first beauty products to start selling",
  },

  mobile: {
    id: "mobile",
    label: "Electronics",
    description: "Gadgets & more",
    image: electronicsImg,
    icon: Smartphone,
    theme: {
      primary: "215 20% 45%",     // Slate blue
      primaryLight: "210 25% 55%",
      accent: "200 70% 50%",      // Blue
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
    welcomeMessage: "Your electronics store is ready for business!",
    emptyStateMessage: "Add your first devices to start selling",
  },

  fruits: {
    id: "fruits",
    label: "Fruits & Vegetables",
    description: "Fresh produce",
    image: fruitsVegetablesImg,
    icon: Apple,
    theme: {
      primary: "142 71% 45%",     // Green
      primaryLight: "145 65% 55%",
      accent: "100 70% 50%",      // Lime
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
    welcomeMessage: "Your fresh produce store is ready!",
    emptyStateMessage: "Add your first fruits & vegetables to start selling",
  },

  electrical: {
    id: "electrical",
    label: "Electrical Supplies",
    description: "Electrical goods",
    image: electricalImg,
    icon: Zap,
    theme: {
      primary: "45 93% 47%",      // Yellow
      primaryLight: "50 90% 55%",
      accent: "35 95% 50%",       // Orange
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
    welcomeMessage: "Your electrical store is powered up!",
    emptyStateMessage: "Add your first electrical products to start selling",
  },

  pharmacy: {
    id: "pharmacy",
    label: "Pharmacy",
    description: "Health & medicine",
    image: pharmacyImg,
    icon: Pill,
    theme: {
      primary: "168 76% 42%",     // Teal
      primaryLight: "170 70% 52%",
      accent: "185 75% 45%",      // Cyan
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
    welcomeMessage: "Your pharmacy is ready to serve patients!",
    emptyStateMessage: "Add your first medicines to start selling",
  },

  stationery: {
    id: "stationery",
    label: "Stationery",
    description: "Books & supplies",
    image: stationeryImg,
    icon: BookOpen,
    theme: {
      primary: "234 89% 58%",     // Indigo
      primaryLight: "230 80% 65%",
      accent: "210 90% 55%",      // Blue
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
    welcomeMessage: "Your stationery store is ready to inspire!",
    emptyStateMessage: "Add your first stationery items to start selling",
  },

  hardware: {
    id: "hardware",
    label: "Hardware",
    description: "Tools & equipment",
    image: hardwareImg,
    icon: Wrench,
    theme: {
      primary: "220 13% 40%",     // Gray-slate
      primaryLight: "215 15% 50%",
      accent: "220 20% 55%",      // Steel blue
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
    welcomeMessage: "Your hardware store is ready to build!",
    emptyStateMessage: "Add your first hardware items to start selling",
  },

  other: {
    id: "other",
    label: "Other Retail",
    description: "Other retail",
    image: otherImg,
    icon: Store,
    theme: {
      primary: "262 83% 58%",     // Purple (default)
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
    welcomeMessage: "Your store is ready for business!",
    emptyStateMessage: "Add your first products to start selling",
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
