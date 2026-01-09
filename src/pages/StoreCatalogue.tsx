import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Search, Grid3X3, List, Share2, ArrowLeft, Package,
  MessageCircle, Clock, Instagram, Facebook, Gift, Heart,
  ShoppingBag, Sparkles, ChevronRight, Plus, Minus, X, ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoDarkBg from "@/assets/logo-dark-bg.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

const StoreCatalogue = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  // Filter and sort products
  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  // Cart functions
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
    toast.success(`${product.name} added to cart`);
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
        toast.success("Store link copied!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Store link copied!");
    }
  };

  const handleWhatsAppCheckout = () => {
    if (!store || cart.length === 0) return;
    const phone = customization?.whatsapp_number?.replace(/\D/g, "") || "";
    
    const itemsList = cart.map(item => 
      `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
    ).join("\n");
    
    const message = `🛒 *New Order from ${store.name}*\n\n${itemsList}\n\n💰 *Total: ₹${cartTotal.toLocaleString()}*\n\n📞 Please confirm availability and delivery details.`;
    
    const whatsappUrl = phone 
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleQuickOrder = (product: Product) => {
    if (!store) return;
    const phone = customization?.whatsapp_number?.replace(/\D/g, "") || "";
    const message = `Hi! I'm interested in ordering:\n\n🛒 *${product.name}*\n💰 Price: ₹${product.price.toLocaleString()}\n\nFrom: ${store.name}`;
    const whatsappUrl = phone 
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Theme colors from customization
  const themeColor = customization?.theme_color || "#10b981";
  const accentColor = customization?.accent_color || "#f59e0b";

  if (storeLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-4 py-6">
          <Skeleton className="h-40 w-full rounded-2xl mb-6" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (storeError || !store) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-bold">Store Not Found</h1>
          <p className="text-muted-foreground text-sm">
            This store doesn't exist or is unavailable.
          </p>
          <Link to="/">
            <Button size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Announcement Bar */}
      <AnimatePresence>
        {customization?.announcement_active && customization?.announcement_text && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-white text-center py-2 px-4 text-xs font-medium overflow-hidden"
            style={{ background: `linear-gradient(90deg, ${themeColor}, ${accentColor})` }}
          >
            <Sparkles className="w-3 h-3 inline mr-1.5" />
            {customization.announcement_text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2" style={{ borderColor: themeColor }}>
              <AvatarImage src={customization?.logo_url || ""} />
              <AvatarFallback 
                className="text-sm font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${themeColor}, ${accentColor})` }}
              >
                {store.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="font-bold text-sm truncate">{store.name}</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {store.city}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {customization?.instagram_url && (
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" asChild>
                <a href={customization.instagram_url} target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner - Mobile Optimized */}
      {(customization?.show_banner !== false) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative mx-4 mt-4 rounded-2xl overflow-hidden"
        >
          <div 
            className="relative py-10 px-5"
            style={{
              background: customization?.banner_image_url 
                ? `url(${customization.banner_image_url}) center/cover` 
                : `linear-gradient(135deg, ${themeColor} 0%, ${accentColor} 100%)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl" />
            <div className="relative text-white text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold"
              >
                {customization?.banner_text || store.name}
              </motion.h2>
              {(customization?.banner_subtitle || customization?.tagline) && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm opacity-90 mt-1"
                >
                  {customization?.banner_subtitle || customization?.tagline}
                </motion.p>
              )}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 mt-3"
              >
                <Badge className="bg-white/20 text-white border-0 text-xs capitalize">
                  {(store.category || "").replace("-", " ")}
                </Badge>
                <Badge className="bg-white/20 text-white border-0 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {(store.business_mode || "").replace("-", "+")}
                </Badge>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Welcome Message */}
      {customization?.welcome_message && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 mt-4 p-3 bg-muted/50 rounded-xl"
        >
          <p className="text-center text-sm text-muted-foreground">{customization.welcome_message}</p>
        </motion.div>
      )}

      {/* Promotions - Horizontal Scroll */}
      {customization?.show_offers_section !== false && promotions.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-bold flex items-center gap-1.5 px-4 mb-3">
            <Gift className="w-4 h-4" style={{ color: accentColor }} />
            Special Offers
          </h3>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-60 snap-start"
              >
                <div 
                  className="relative p-4 rounded-xl h-full"
                  style={{ 
                    background: `linear-gradient(135deg, ${themeColor}15, ${accentColor}15)`,
                    border: `1.5px solid ${themeColor}30`
                  }}
                >
                  {promo.discount_percentage && (
                    <Badge 
                      className="text-white text-xs mb-2"
                      style={{ backgroundColor: accentColor }}
                    >
                      {promo.discount_percentage}% OFF
                    </Badge>
                  )}
                  <h4 className="font-bold text-sm">{promo.title}</h4>
                  {promo.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{promo.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Category Pills - Horizontal Scroll */}
      {customization?.show_categories !== false && categories.length > 0 && (
        <div className="mt-5 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-full flex-shrink-0 h-8 text-xs"
              style={selectedCategory === "all" ? { backgroundColor: themeColor } : {}}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full flex-shrink-0 h-8 text-xs capitalize"
                style={selectedCategory === cat ? { backgroundColor: themeColor } : {}}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      {customization?.show_search !== false && (
        <div className="px-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-xl bg-muted/50 border-0 text-sm"
            />
          </div>
        </div>
      )}

      {/* Products Count & View Toggle */}
      <div className="flex items-center justify-between px-4 mt-4 mb-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
        </p>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
          <Button 
            variant={viewMode === "grid" ? "secondary" : "ghost"} 
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "secondary" : "ghost"} 
            size="icon"
            className="h-7 w-7 rounded-md"
            onClick={() => setViewMode("list")}
          >
            <List className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Products Grid - Mobile Optimized */}
      <div className="px-4">
        {productsLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">No products found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery ? "Try a different search" : "Check back soon!"}
            </p>
          </motion.div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={
                  viewMode === "grid"
                    ? "bg-card rounded-2xl border border-border/40 overflow-hidden shadow-sm active:scale-[0.98] transition-transform"
                    : "bg-card rounded-2xl border border-border/40 p-3 flex gap-3 shadow-sm active:scale-[0.99] transition-transform"
                }
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="aspect-square bg-gradient-to-br from-muted to-muted/30 relative overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground/20" />
                        </div>
                      )}
                      {product.compare_price && product.compare_price > product.price && (
                        <Badge 
                          className="absolute top-2 left-2 text-white text-[10px] px-1.5 py-0.5"
                          style={{ backgroundColor: accentColor }}
                        >
                          {Math.round((1 - product.price / product.compare_price) * 100)}% OFF
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 h-8 w-8 rounded-full shadow-lg"
                        style={{ backgroundColor: themeColor }}
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                        {product.category?.replace("-", " ") || "General"}
                      </p>
                      <h3 className="font-semibold text-sm line-clamp-2 mt-0.5 min-h-[2.5rem] leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-1.5 mt-1.5">
                        <span className="text-base font-bold" style={{ color: themeColor }}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{product.compare_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/30 rounded-xl flex-shrink-0 overflow-hidden relative">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-muted-foreground/20" />
                        </div>
                      )}
                      {product.compare_price && product.compare_price > product.price && (
                        <Badge 
                          className="absolute top-1 left-1 text-white text-[9px] px-1 py-0"
                          style={{ backgroundColor: accentColor }}
                        >
                          -{Math.round((1 - product.price / product.compare_price) * 100)}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                        {product.category?.replace("-", " ") || "General"}
                      </p>
                      <h3 className="font-semibold text-sm line-clamp-1 mt-0.5">{product.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="font-bold" style={{ color: themeColor }}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{product.compare_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      className="h-9 w-9 rounded-xl self-center flex-shrink-0"
                      style={{ backgroundColor: themeColor }}
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </Button>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8 px-4 text-center border-t bg-muted/30">
        <p className="text-xs text-muted-foreground">
          Powered by{" "}
          <Link to="/" className="font-semibold" style={{ color: themeColor }}>
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
            className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t safe-area-bottom"
          >
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button 
                  className="w-full h-12 rounded-xl text-white font-semibold gap-3 text-base shadow-lg"
                  style={{ backgroundColor: themeColor }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  View Cart ({cartCount})
                  <span className="ml-auto">₹{cartTotal.toLocaleString()}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
                <SheetHeader className="pb-4 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Your Cart ({cartCount} items)
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto py-4 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-sm font-bold mt-0.5" style={{ color: themeColor }}>
                          ₹{item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-7 w-7 rounded-full"
                            onClick={() => updateCartQuantity(item.id, -1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-semibold w-6 text-center">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-7 w-7 rounded-full"
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
                          className="h-7 w-7 text-muted-foreground"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <p className="font-bold text-sm">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span style={{ color: themeColor }}>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <Button 
                    className="w-full h-12 rounded-xl text-white font-semibold gap-2 text-base"
                    style={{ backgroundColor: "#25D366" }}
                    onClick={handleWhatsAppCheckout}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Order via WhatsApp
                  </Button>
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
