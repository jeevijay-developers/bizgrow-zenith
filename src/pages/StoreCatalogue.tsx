import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Search, Share2, Package,
  MessageCircle, Clock, Instagram, Gift, Heart,
  ShoppingBag, Sparkles, Plus, Minus, X, ShoppingCart,
  Truck, Store, ChevronDown, Star, Zap, TrendingUp,
  User, Phone, Home, Check, ChevronRight, Filter, Loader2
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"takeaway" | "delivery">("takeaway");
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Use persistent cart hook
  const {
    cart,
    addToCart: addToCartHook,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    cartTotal,
    cartCount,
  } = useCart(storeId);

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

  // Cart wrapper function to show toast
  const addToCart = (product: Product) => {
    addToCartHook({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
    toast.success(`Added to cart`, { duration: 1500 });
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

  const handleCheckout = async () => {
    if (!store || !storeId || cart.length === 0) return;
    if (!customerDetails.name || !customerDetails.phone) {
      toast.error("Please fill your name and phone number");
      return;
    }
    if (deliveryMode === "delivery" && !customerDetails.address) {
      toast.error("Please provide delivery address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the create-order edge function
      const { data, error } = await supabase.functions.invoke("create-order", {
        body: {
          store_id: storeId,
          customer_name: customerDetails.name,
          customer_phone: customerDetails.phone,
          customer_address: deliveryMode === "delivery" ? customerDetails.address : null,
          items: cart.map((item) => ({
            product_id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image_url: item.image_url,
          })),
          total_amount: cartTotal,
          notes: customerDetails.notes || null,
          payment_method: "COD",
        },
      });

      if (error) throw error;

      const orderId = data?.order?.id;

      // Optionally send WhatsApp message
      const phone = customization?.whatsapp_number?.replace(/\D/g, "") || "";
      if (phone) {
        const itemsList = cart
          .map(
            (item) =>
              `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
          )
          .join("\n");

        const orderType = deliveryMode === "delivery" ? "🚚 Home Delivery" : "🏪 Store Pickup";
        const addressLine =
          deliveryMode === "delivery" ? `\n📍 *Delivery Address:*\n${customerDetails.address}` : "";
        const notesLine = customerDetails.notes ? `\n📝 *Notes:* ${customerDetails.notes}` : "";

        const message = `🛒 *New Order from ${store.name}*\n\n${orderType}\n\n*Items:*\n${itemsList}\n\n💰 *Total: ₹${cartTotal.toLocaleString()}*\n\n👤 *Customer:* ${customerDetails.name}\n📞 *Phone:* ${customerDetails.phone}${addressLine}${notesLine}`;

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      }

      // Clear cart and navigate to confirmation
      clearCart();
      setCartOpen(false);
      setCheckoutOpen(false);
      navigate(`/order-confirmation/${orderId}`);
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if delivery is available
  const hasDelivery = store?.business_mode?.includes("delivery");
  const hasTakeaway = !store?.business_mode?.includes("delivery") || store?.business_mode?.includes("shop");

  // Premium loading skeleton
  if (storeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="px-4 py-6 space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-48 w-full rounded-3xl" />
          <div className="flex gap-3">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-72 w-full rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Store not found
  if (storeError || !store) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-sm"
        >
          <motion.div 
            className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto shadow-xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Store className="w-14 h-14 text-primary/50" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Store Not Found</h1>
            <p className="text-muted-foreground mt-2">
              This store doesn't exist or is currently unavailable.
            </p>
          </div>
          <Link to="/">
            <Button className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 via-background to-accent/5 pb-36">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Announcement Bar */}
      <AnimatePresence>
        {customization?.announcement_active && customization?.announcement_text && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground text-center py-3 px-4 text-sm font-medium">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{customization.announcement_text}</span>
                <Sparkles className="w-4 h-4 text-accent" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Avatar className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-lg">
                <AvatarImage src={customization?.logo_url || ""} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-bold">
                  {store.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="min-w-0">
              <h1 className="font-bold text-foreground text-lg truncate">{store.name}</h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {store.city}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">4.8</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {customization?.instagram_url && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-full bg-pink-50 hover:bg-pink-100 dark:bg-pink-500/10 dark:hover:bg-pink-500/20" 
                  asChild
                >
                  <a href={customization.instagram_url} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5 text-pink-500" />
                  </a>
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-muted hover:bg-muted/80" 
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      {(customization?.show_banner !== false) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-4 mt-4"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/8" }}>
            {/* Background */}
            <div 
              className="absolute inset-0"
              style={{
                background: customization?.banner_image_url 
                  ? `url(${customization.banner_image_url}) center/cover` 
                  : `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 50%, hsl(var(--accent)) 100%)`
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute bottom-8 left-8 w-16 h-16 bg-primary/30 rounded-full blur-xl" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  {customization?.banner_text || `Welcome to ${store.name}`}
                </h2>
                {(customization?.banner_subtitle || customization?.tagline) && (
                  <p className="text-sm md:text-base text-white/90 mt-2 drop-shadow">
                    {customization?.banner_subtitle || customization?.tagline}
                  </p>
                )}
              </motion.div>
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 px-4 py-1.5 text-xs font-medium capitalize">
                  {(store.category || "").replace("-", " ")}
                </Badge>
                {hasDelivery && (
                  <Badge className="bg-green-500/90 backdrop-blur-md text-white border-0 px-4 py-1.5 text-xs font-medium">
                    <Truck className="w-3.5 h-3.5 mr-1.5" />
                    Free Delivery
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="flex gap-3 px-4 mt-5 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { icon: Package, label: `${products.length}+ Items`, color: "from-emerald-500 to-teal-500", bg: "from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10" },
          { icon: Zap, label: "Quick Service", color: "from-amber-500 to-orange-500", bg: "from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10" },
          { icon: Star, label: "Top Rated", color: "from-primary to-primary/80", bg: "from-primary/10 to-primary/5" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-3 bg-gradient-to-r ${stat.bg} px-4 py-3 rounded-2xl flex-shrink-0 border border-border/50 shadow-sm`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Promotions */}
      {customization?.show_offers_section !== false && promotions.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Gift className="w-5 h-5 text-accent" />
              Special Offers
            </h3>
            <Badge variant="secondary" className="text-xs">{promotions.length} active</Badge>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-3 snap-x snap-mandatory scrollbar-hide">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-80 snap-start"
              >
                <div className="relative p-6 rounded-3xl h-full overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-xl">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative text-primary-foreground">
                    {promo.discount_percentage && (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Badge className="bg-accent text-accent-foreground text-base font-bold px-4 py-1 mb-3 shadow-lg">
                          {promo.discount_percentage}% OFF
                        </Badge>
                      </motion.div>
                    )}
                    <h4 className="font-bold text-xl">{promo.title}</h4>
                    {promo.description && (
                      <p className="text-sm opacity-90 mt-2 line-clamp-2">{promo.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Hot Deals Section */}
      {discountedProducts.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Hot Deals
            </h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
              See all <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto px-4 pb-3 scrollbar-hide">
            {discountedProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-40"
              >
                <div className="bg-card rounded-3xl border border-border shadow-lg overflow-hidden group">
                  <div className="aspect-square relative bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-[11px] px-2.5 py-1 font-bold shadow-lg">
                      {Math.round((1 - product.price / (product.compare_price || product.price)) * 100)}% OFF
                    </Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-foreground line-clamp-1">{product.name}</p>
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-base font-bold text-primary">₹{product.price}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{product.compare_price}</span>
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
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 mt-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 rounded-2xl bg-card border-border text-base shadow-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </motion.div>
      )}

      {/* Category Pills */}
      {customization?.show_categories !== false && categories.length > 0 && (
        <div className="mt-5 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                className={`rounded-full flex-shrink-0 h-11 px-6 text-sm font-semibold transition-all ${
                  selectedCategory === "all" 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "border-border bg-card hover:bg-muted"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                All Items
              </Button>
            </motion.div>
            {categories.map(cat => (
              <motion.div key={cat} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full flex-shrink-0 h-11 px-6 text-sm font-semibold capitalize transition-all ${
                    selectedCategory === cat 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "border-border bg-card hover:bg-muted"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.replace("-", " ")}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {selectedCategory === "all" ? "All Products" : selectedCategory.replace("-", " ")}
            </h3>
            <p className="text-sm text-muted-foreground">{filteredProducts.length} items available</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-4">
          {productsLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-72 w-full rounded-3xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-12 h-12 text-muted-foreground/50" />
              </div>
              <h3 className="font-bold text-lg text-foreground">No products found</h3>
              <p className="text-muted-foreground mt-2">
                {searchQuery ? "Try a different search term" : "Check back soon for new arrivals!"}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product, index) => {
                const itemQty = getItemQuantity(product.id);
                const isFavorite = favorites.has(product.id);
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <div className="bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Product Image */}
                      <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-16 h-16 text-muted-foreground/20" />
                          </div>
                        )}
                        
                        {/* Discount Badge */}
                        {product.compare_price && product.compare_price > product.price && (
                          <Badge className="absolute top-3 left-3 bg-red-500 text-white text-[11px] px-2.5 py-1 font-bold shadow-lg">
                            {Math.round((1 - product.price / product.compare_price) * 100)}% OFF
                          </Badge>
                        )}

                        {/* Favorite Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                        >
                          <Heart 
                            className={`w-4 h-4 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} 
                          />
                        </motion.button>

                        {/* Add to Cart */}
                        <div className="absolute bottom-3 right-3">
                          {itemQty === 0 ? (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="icon"
                                className="h-11 w-11 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl"
                                onClick={() => addToCart(product)}
                              >
                                <Plus className="w-5 h-5" />
                              </Button>
                            </motion.div>
                          ) : (
                            <div className="flex items-center gap-0.5 bg-card rounded-full shadow-xl border-2 border-primary p-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full hover:bg-muted"
                                onClick={() => updateQuantity(product.id, -1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-7 text-center font-bold text-sm text-foreground">{itemQty}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full hover:bg-muted"
                                onClick={() => updateQuantity(product.id, 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                          {product.category?.replace("-", " ") || "General"}
                        </p>
                        <h3 className="font-semibold text-sm text-foreground line-clamp-2 mt-1 min-h-[2.5rem] leading-snug">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-1.5">{product.description}</p>
                        )}
                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-xl font-bold text-primary">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.compare_price && product.compare_price > product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{product.compare_price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
          <span className="text-xs text-muted-foreground">Powered by</span>
          <Link to="/" className="font-bold text-sm text-primary hover:underline">
            BizGrow 360
          </Link>
        </div>
      </footer>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-xl border-t border-border shadow-2xl"
          >
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-4 text-base shadow-xl"
                  >
                    <div className="relative">
                      <ShoppingCart className="w-6 h-6" />
                      <motion.span 
                        key={cartCount}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold"
                      >
                        {cartCount}
                      </motion.span>
                    </div>
                    <span>View Cart</span>
                    <span className="ml-auto text-lg font-bold">₹{cartTotal.toLocaleString()}</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-5 pb-4 border-b border-border">
                    <SheetTitle className="flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                      </div>
                      Your Cart
                      <Badge variant="secondary" className="ml-auto text-sm px-3 py-1">{cartCount} items</Badge>
                    </SheetTitle>
                  </SheetHeader>
                  
                  {!checkoutOpen ? (
                    <>
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {cart.map((item) => (
                          <motion.div 
                            key={item.id} 
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-4 p-4 bg-muted/50 rounded-2xl"
                          >
                            <div className="w-20 h-20 bg-card rounded-xl overflow-hidden flex-shrink-0 border border-border shadow-sm">
                              {item.image_url ? (
                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-8 h-8 text-muted-foreground/30" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-foreground line-clamp-1">{item.name}</h4>
                              <p className="text-base font-bold text-primary mt-1">
                                ₹{item.price.toLocaleString()}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="font-bold w-8 text-center">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Cart Footer */}
                      <div className="border-t border-border p-4 space-y-4 bg-card">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="text-xl font-bold text-foreground">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <Button 
                          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg"
                          onClick={() => setCheckoutOpen(true)}
                        >
                          Proceed to Checkout
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Checkout Form */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-5">
                        <Button 
                          variant="ghost" 
                          className="gap-2 text-muted-foreground"
                          onClick={() => setCheckoutOpen(false)}
                        >
                          <ChevronDown className="w-4 h-4 rotate-90" />
                          Back to cart
                        </Button>

                        {/* Delivery Mode */}
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">How would you like to receive your order?</Label>
                          <RadioGroup 
                            value={deliveryMode} 
                            onValueChange={(v) => setDeliveryMode(v as "takeaway" | "delivery")}
                            className="grid grid-cols-2 gap-3"
                          >
                            {hasTakeaway && (
                              <div>
                                <RadioGroupItem value="takeaway" id="takeaway" className="sr-only" />
                                <Label
                                  htmlFor="takeaway"
                                  className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                    deliveryMode === "takeaway" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <Store className={`w-6 h-6 mb-2 ${deliveryMode === "takeaway" ? "text-primary" : "text-muted-foreground"}`} />
                                  <span className={`text-sm font-medium ${deliveryMode === "takeaway" ? "text-primary" : ""}`}>Store Pickup</span>
                                </Label>
                              </div>
                            )}
                            {hasDelivery && (
                              <div>
                                <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                                <Label
                                  htmlFor="delivery"
                                  className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                    deliveryMode === "delivery" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <Truck className={`w-6 h-6 mb-2 ${deliveryMode === "delivery" ? "text-primary" : "text-muted-foreground"}`} />
                                  <span className={`text-sm font-medium ${deliveryMode === "delivery" ? "text-primary" : ""}`}>Home Delivery</span>
                                </Label>
                              </div>
                            )}
                          </RadioGroup>
                        </div>

                        {/* Customer Details */}
                        <div className="space-y-4">
                          <Label className="text-sm font-semibold">Your Details</Label>
                          
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name *</Label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="name"
                                placeholder="Enter your name"
                                value={customerDetails.name}
                                onChange={(e) => setCustomerDetails(p => ({...p, name: e.target.value}))}
                                className="pl-11 h-12 rounded-xl"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs text-muted-foreground">Phone Number *</Label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter phone number"
                                value={customerDetails.phone}
                                onChange={(e) => setCustomerDetails(p => ({...p, phone: e.target.value}))}
                                className="pl-11 h-12 rounded-xl"
                              />
                            </div>
                          </div>

                          {deliveryMode === "delivery" && (
                            <div className="space-y-2">
                              <Label htmlFor="address" className="text-xs text-muted-foreground">Delivery Address *</Label>
                              <div className="relative">
                                <Home className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                                <Textarea
                                  id="address"
                                  placeholder="Enter full address"
                                  value={customerDetails.address}
                                  onChange={(e) => setCustomerDetails(p => ({...p, address: e.target.value}))}
                                  className="pl-11 min-h-[100px] rounded-xl resize-none"
                                />
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label htmlFor="notes" className="text-xs text-muted-foreground">Special Instructions (optional)</Label>
                            <Textarea
                              id="notes"
                              placeholder="Any special requests..."
                              value={customerDetails.notes}
                              onChange={(e) => setCustomerDetails(p => ({...p, notes: e.target.value}))}
                              className="min-h-[80px] rounded-xl resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Checkout Footer */}
                      <div className="border-t border-border p-4 space-y-4 bg-card">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Total Amount</span>
                          <span className="text-2xl font-bold text-foreground">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <Button 
                          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base shadow-lg gap-3"
                          onClick={handleCheckout}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Placing Order...
                            </>
                          ) : (
                            <>
                              <Check className="w-5 h-5" />
                              Place Order
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          {customization?.whatsapp_number ? "Order will be sent via WhatsApp" : "Order will be saved to the store"}
                        </p>
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
