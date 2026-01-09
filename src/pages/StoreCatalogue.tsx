import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Search, Share2, Package,
  MessageCircle, Clock, Instagram, Gift, Heart,
  ShoppingBag, Sparkles, Plus, Minus, X, ShoppingCart,
  Truck, Store, ChevronDown, Star, Zap, TrendingUp,
  User, Phone, Home, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  image_url: string | null;
  category: string | null;
  is_available: boolean | null;
  stock_quantity: number | null;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreInfo {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  address: string | null;
  business_mode: string;
  is_active: boolean | null;
}

interface StoreCustomization {
  banner_image_url: string | null;
  banner_text: string | null;
  banner_subtitle: string | null;
  theme_color: string;
  accent_color: string;
  logo_url: string | null;
  tagline: string | null;
  welcome_message: string | null;
  show_banner: boolean;
  show_offers_section: boolean;
  show_categories: boolean;
  show_search: boolean;
  whatsapp_number: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  announcement_text: string | null;
  announcement_active: boolean;
  layout_style: string;
}

interface Promotion {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  is_active: boolean;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

const StoreCatalogue = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"takeaway" | "delivery">("takeaway");
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Fetch store info
  const { data: store, isLoading: storeLoading, error: storeError } = useQuery({
    queryKey: ["public-store", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("id", storeId)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      return data as StoreInfo | null;
    },
    enabled: !!storeId,
  });

  // Fetch store customization
  const { data: customization } = useQuery({
    queryKey: ["public-store-customization", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_customizations")
        .select("*")
        .eq("store_id", storeId)
        .maybeSingle();
      if (error) throw error;
      return data as StoreCustomization | null;
    },
    enabled: !!storeId,
  });

  // Fetch promotions
  const { data: promotions = [] } = useQuery({
    queryKey: ["public-store-promotions", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_promotions")
        .select("*")
        .eq("store_id", storeId)
        .eq("is_active", true);
      if (error) throw error;
      return data as Promotion[];
    },
    enabled: !!storeId,
  });

  // Fetch products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["public-products", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", storeId)
        .eq("is_available", true)
        .order("name");
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!storeId && !!store,
  });

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))] as string[];

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Products with discounts
  const discountedProducts = products.filter(p => p.compare_price && p.compare_price > p.price);

  // Cart functions
  const getCartItemQuantity = (productId: string) => {
    return cart.find(item => item.id === productId)?.quantity || 0;
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`Added to cart`, { duration: 1500 });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: store?.name,
          text: `Check out ${store?.name}!`,
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  const handleWhatsAppCheckout = () => {
    if (!store || cart.length === 0) return;
    if (!customerDetails.name || !customerDetails.phone) {
      toast.error("Please fill your name and phone number");
      return;
    }
    if (deliveryMode === "delivery" && !customerDetails.address) {
      toast.error("Please provide delivery address");
      return;
    }

    const phone = customization?.whatsapp_number?.replace(/\D/g, "") || "";
    
    const itemsList = cart.map(item => 
      `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
    ).join("\n");
    
    const orderType = deliveryMode === "delivery" ? "🚚 Home Delivery" : "🏪 Store Pickup";
    const addressLine = deliveryMode === "delivery" ? `\n📍 *Delivery Address:*\n${customerDetails.address}` : "";
    const notesLine = customerDetails.notes ? `\n📝 *Notes:* ${customerDetails.notes}` : "";
    
    const message = `🛒 *New Order from ${store.name}*\n\n${orderType}\n\n*Items:*\n${itemsList}\n\n💰 *Total: ₹${cartTotal.toLocaleString()}*\n\n👤 *Customer:* ${customerDetails.name}\n📞 *Phone:* ${customerDetails.phone}${addressLine}${notesLine}`;
    
    const whatsappUrl = phone 
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Theme colors from customization
  const themeColor = customization?.theme_color || "#10b981";
  const accentColor = customization?.accent_color || "#f59e0b";

  // Check if delivery is available
  const hasDelivery = store?.business_mode?.includes("delivery");
  const hasTakeaway = !store?.business_mode?.includes("delivery") || store?.business_mode?.includes("shop");

  if (storeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 py-6">
          <Skeleton className="h-44 w-full rounded-3xl mb-6" />
          <div className="flex gap-2 mb-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-9 w-20 rounded-full" />)}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (storeError || !store) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto shadow-inner">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Store Not Found</h1>
          <p className="text-gray-500">
            This store doesn't exist or is currently unavailable.
          </p>
          <Link to="/">
            <Button className="mt-4 rounded-full px-6">
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-32">
      {/* Announcement Bar */}
      <AnimatePresence>
        {customization?.announcement_active && customization?.announcement_text && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-white text-center py-2.5 px-4 text-xs font-medium overflow-hidden"
            style={{ background: `linear-gradient(90deg, ${themeColor}, ${accentColor})` }}
          >
            <Sparkles className="w-3 h-3 inline mr-1.5 animate-pulse" />
            {customization.announcement_text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 ring-2 ring-offset-2 shadow-md ring-emerald-500">
              <AvatarImage src={customization?.logo_url || ""} />
              <AvatarFallback 
                className="text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${accentColor})` }}
              >
                {store.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-900 truncate">{store.name}</h1>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" />
                  {store.city}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  4.8
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {customization?.instagram_url && (
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-pink-50" asChild>
                <a href={customization.instagram_url} target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 text-pink-500" />
                </a>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-gray-100" onClick={handleShare}>
              <Share2 className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      {(customization?.show_banner !== false) && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4"
        >
          <div 
            className="relative rounded-3xl overflow-hidden shadow-xl"
            style={{ aspectRatio: "16/9" }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: customization?.banner_image_url 
                  ? `url(${customization.banner_image_url}) center/cover` 
                  : `linear-gradient(135deg, ${themeColor} 0%, ${accentColor} 100%)`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold drop-shadow-lg"
              >
                {customization?.banner_text || `Welcome to ${store.name}`}
              </motion.h2>
              {(customization?.banner_subtitle || customization?.tagline) && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm opacity-90 mt-1 drop-shadow"
                >
                  {customization?.banner_subtitle || customization?.tagline}
                </motion.p>
              )}
              <div className="flex items-center gap-2 mt-3">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs px-3 py-1 capitalize">
                  {(store.category || "").replace("-", " ")}
                </Badge>
                {hasDelivery && (
                  <Badge className="bg-green-500/90 text-white border-0 text-xs px-3 py-1">
                    <Truck className="w-3 h-3 mr-1" />
                    Delivery
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="flex gap-3 px-4 mt-4 overflow-x-auto pb-1 scrollbar-hide">
        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2.5 rounded-2xl flex-shrink-0 border border-emerald-100">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-emerald-600 font-medium">{products.length}+ Products</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2.5 rounded-2xl flex-shrink-0 border border-amber-100">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-amber-600 font-medium">Fast Service</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2.5 rounded-2xl flex-shrink-0 border border-purple-100">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-purple-600 font-medium">Top Rated</p>
          </div>
        </div>
      </div>

      {/* Promotions Carousel */}
      {customization?.show_offers_section !== false && promotions.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Gift className="w-5 h-5" style={{ color: accentColor }} />
              Special Offers
            </h3>
            <span className="text-xs text-gray-500">{promotions.length} offers</span>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-72 snap-start"
              >
                <div 
                  className="relative p-5 rounded-2xl h-full overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${themeColor}, ${accentColor})`,
                  }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="relative text-white">
                    {promo.discount_percentage && (
                      <Badge className="bg-white text-gray-900 text-sm font-bold mb-2">
                        {promo.discount_percentage}% OFF
                      </Badge>
                    )}
                    <h4 className="font-bold text-lg">{promo.title}</h4>
                    {promo.description && (
                      <p className="text-sm opacity-90 mt-1 line-clamp-2">{promo.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Shop By Deals - Only show if there are discounted products */}
      {discountedProducts.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Hot Deals
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-500 h-8"
              onClick={() => setSelectedCategory("all")}
            >
              See all
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {discountedProducts.slice(0, 5).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-36"
              >
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-gray-200" />
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2">
                      {Math.round((1 - product.price / (product.compare_price || product.price)) * 100)}% OFF
                    </Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-900 line-clamp-1">{product.name}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm font-bold" style={{ color: themeColor }}>₹{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{product.compare_price}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      {customization?.show_search !== false && (
        <div className="px-4 mt-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-2xl bg-gray-50 border-0 text-base placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>
      )}

      {/* Category Pills */}
      {customization?.show_categories !== false && categories.length > 0 && (
        <div className="mt-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              className={`rounded-full flex-shrink-0 h-10 px-5 text-sm font-medium transition-all ${
                selectedCategory === "all" ? "shadow-lg" : "border-gray-200"
              }`}
              style={selectedCategory === "all" ? { backgroundColor: themeColor } : {}}
              onClick={() => setSelectedCategory("all")}
            >
              All Items
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className={`rounded-full flex-shrink-0 h-10 px-5 text-sm font-medium capitalize transition-all ${
                  selectedCategory === cat ? "shadow-lg" : "border-gray-200"
                }`}
                style={selectedCategory === cat ? { backgroundColor: themeColor } : {}}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Products Header */}
      <div className="flex items-center justify-between px-4 mt-5 mb-3">
        <h3 className="text-base font-bold text-gray-900">
          {selectedCategory === "all" ? "All Products" : selectedCategory.replace("-", " ")}
          <span className="text-gray-400 font-normal ml-2 text-sm">({filteredProducts.length})</span>
        </h3>
      </div>

      {/* Products Grid - 2 Column */}
      <div className="px-4">
        {productsLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="font-semibold text-gray-900">No products found</h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchQuery ? "Try a different search term" : "Check back soon!"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product, index) => {
              const itemQty = getCartItemQuantity(product.id);
              const isFavorite = favorites.has(product.id);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-14 h-14 text-gray-200" />
                      </div>
                    )}
                    
                    {/* Discount Badge */}
                    {product.compare_price && product.compare_price > product.price && (
                      <Badge 
                        className="absolute top-2 left-2 text-white text-[10px] px-2 py-0.5 font-semibold"
                        style={{ backgroundColor: "#ef4444" }}
                      >
                        {Math.round((1 - product.price / product.compare_price) * 100)}% OFF
                      </Badge>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
                      />
                    </button>

                    {/* Add to Cart Button */}
                    {itemQty === 0 ? (
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 h-10 w-10 rounded-full shadow-lg active:scale-95 transition-transform"
                        style={{ backgroundColor: themeColor }}
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </Button>
                    ) : (
                      <div 
                        className="absolute bottom-2 right-2 flex items-center gap-1 bg-white rounded-full shadow-lg px-1 py-1"
                        style={{ border: `2px solid ${themeColor}` }}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full hover:bg-gray-100"
                          onClick={() => updateCartQuantity(product.id, -1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-6 text-center font-bold text-sm">{itemQty}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full hover:bg-gray-100"
                          onClick={() => updateCartQuantity(product.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      {product.category?.replace("-", " ") || "General"}
                    </p>
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mt-0.5 min-h-[2.5rem] leading-tight">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1">{product.description}</p>
                    )}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold" style={{ color: themeColor }}>
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.compare_price && product.compare_price > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.compare_price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8 px-4 text-center">
        <p className="text-xs text-gray-400">
          Powered by{" "}
          <Link to="/" className="font-semibold text-gray-600 hover:underline">
            BizGrow 360
          </Link>
        </p>
      </footer>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button 
                  className="w-full h-14 rounded-2xl text-white font-semibold gap-3 text-base shadow-xl active:scale-[0.98] transition-transform"
                  style={{ backgroundColor: themeColor }}
                >
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs font-bold" style={{ color: themeColor }}>
                      {cartCount}
                    </span>
                  </div>
                  <span>View Cart</span>
                  <span className="ml-auto font-bold">₹{cartTotal.toLocaleString()}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-4 pb-3 border-b border-gray-100">
                    <SheetTitle className="flex items-center gap-2 text-lg">
                      <ShoppingCart className="w-5 h-5" />
                      Your Cart
                      <Badge variant="secondary" className="ml-2">{cartCount} items</Badge>
                    </SheetTitle>
                  </SheetHeader>
                  
                  {!checkoutOpen ? (
                    <>
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {cart.map((item) => (
                          <motion.div 
                            key={item.id} 
                            layout
                            className="flex gap-3 p-3 bg-gray-50 rounded-2xl"
                          >
                            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                              {item.image_url ? (
                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-8 h-8 text-gray-200" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                              <p className="text-sm font-bold mt-1" style={{ color: themeColor }}>
                                ₹{item.price.toLocaleString()}
                              </p>
                              <div className="flex items-center gap-1 mt-2">
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-8 w-8 rounded-full border-gray-200"
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="font-bold w-8 text-center">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-8 w-8 rounded-full border-gray-200"
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8 text-gray-400 hover:text-red-500"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                              <p className="font-bold text-gray-900">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-4 border-t border-gray-100 space-y-4 bg-white">
                        <div className="flex items-center justify-between text-lg">
                          <span className="text-gray-500">Subtotal</span>
                          <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <Button 
                          className="w-full h-14 rounded-2xl text-white font-semibold text-base shadow-lg"
                          style={{ backgroundColor: themeColor }}
                          onClick={() => setCheckoutOpen(true)}
                        >
                          Proceed to Checkout
                          <ChevronDown className="w-5 h-5 ml-2 rotate-[-90deg]" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto p-4 space-y-5">
                        {/* Delivery Mode Selection */}
                        <div>
                          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Select Order Type</Label>
                          <RadioGroup 
                            value={deliveryMode} 
                            onValueChange={(v) => setDeliveryMode(v as "takeaway" | "delivery")}
                            className="grid grid-cols-2 gap-3"
                          >
                            {hasTakeaway && (
                              <Label
                                htmlFor="takeaway"
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                  deliveryMode === "takeaway" 
                                    ? "border-current bg-opacity-5" 
                                    : "border-gray-200 bg-gray-50"
                                }`}
                                style={deliveryMode === "takeaway" ? { borderColor: themeColor, backgroundColor: `${themeColor}10` } : {}}
                              >
                                <RadioGroupItem value="takeaway" id="takeaway" className="sr-only" />
                                <Store className="w-8 h-8" style={{ color: deliveryMode === "takeaway" ? themeColor : "#9ca3af" }} />
                                <span className="font-semibold text-sm">Store Pickup</span>
                                {deliveryMode === "takeaway" && (
                                  <Check className="w-5 h-5 absolute top-2 right-2" style={{ color: themeColor }} />
                                )}
                              </Label>
                            )}
                            {hasDelivery && (
                              <Label
                                htmlFor="delivery"
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                                  deliveryMode === "delivery" 
                                    ? "border-current bg-opacity-5" 
                                    : "border-gray-200 bg-gray-50"
                                }`}
                                style={deliveryMode === "delivery" ? { borderColor: themeColor, backgroundColor: `${themeColor}10` } : {}}
                              >
                                <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                                <Truck className="w-8 h-8" style={{ color: deliveryMode === "delivery" ? themeColor : "#9ca3af" }} />
                                <span className="font-semibold text-sm">Home Delivery</span>
                                {deliveryMode === "delivery" && (
                                  <Check className="w-5 h-5 absolute top-2 right-2" style={{ color: themeColor }} />
                                )}
                              </Label>
                            )}
                          </RadioGroup>
                        </div>

                        {/* Customer Details */}
                        <div className="space-y-4">
                          <Label className="text-sm font-semibold text-gray-700">Your Details</Label>
                          <div className="space-y-3">
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                placeholder="Your name *"
                                value={customerDetails.name}
                                onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                                className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-200"
                              />
                            </div>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <Input
                                placeholder="Phone number *"
                                type="tel"
                                value={customerDetails.phone}
                                onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                                className="pl-12 h-12 rounded-xl bg-gray-50 border-gray-200"
                              />
                            </div>
                            {deliveryMode === "delivery" && (
                              <div className="relative">
                                <Home className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                <Textarea
                                  placeholder="Delivery address *"
                                  value={customerDetails.address}
                                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                                  className="pl-12 min-h-[80px] rounded-xl bg-gray-50 border-gray-200 resize-none"
                                />
                              </div>
                            )}
                            <Textarea
                              placeholder="Special instructions (optional)"
                              value={customerDetails.notes}
                              onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                              className="min-h-[60px] rounded-xl bg-gray-50 border-gray-200 resize-none"
                            />
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                          <h4 className="font-semibold text-gray-700">Order Summary</h4>
                          {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.name} × {item.quantity}</span>
                              <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-base">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold" style={{ color: themeColor }}>₹{cartTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-t border-gray-100 space-y-3 bg-white">
                        <Button 
                          variant="outline"
                          className="w-full h-12 rounded-xl"
                          onClick={() => setCheckoutOpen(false)}
                        >
                          Back to Cart
                        </Button>
                        <Button 
                          className="w-full h-14 rounded-2xl text-white font-semibold text-base gap-2 shadow-lg"
                          style={{ backgroundColor: "#25D366" }}
                          onClick={handleWhatsAppCheckout}
                        >
                          <MessageCircle className="w-5 h-5" />
                          Order via WhatsApp
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreCatalogue;
