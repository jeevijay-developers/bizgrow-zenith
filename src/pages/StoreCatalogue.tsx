import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Search, Grid3X3, List, Share2, ArrowLeft, Package,
  MessageCircle, Clock, Instagram, Facebook, Gift, Star, Heart,
  ShoppingBag, Sparkles, ChevronRight
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: store?.name,
          text: `Check out ${store?.name} on BizGrow 360!`,
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

  const handleWhatsAppOrder = (product: Product) => {
    if (!store) return;
    const phone = customization?.whatsapp_number?.replace(/\D/g, "") || "";
    const message = `Hi! I'm interested in ordering:\n\n🛒 *${product.name}*\n💰 Price: ₹${product.price}\n\nFrom: ${store.name}`;
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
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-48 w-full rounded-2xl mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-72 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (storeError || !store) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 p-8"
        >
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Package className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Store Not Found</h1>
          <p className="text-muted-foreground max-w-sm">
            This store doesn't exist or is currently unavailable.
          </p>
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Announcement Bar */}
      <AnimatePresence>
        {customization?.announcement_active && customization?.announcement_text && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-white text-center py-2.5 px-4 text-sm font-medium overflow-hidden"
            style={{ background: `linear-gradient(90deg, ${themeColor}, ${accentColor})` }}
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            {customization.announcement_text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              {customization?.logo_url ? (
                <img src={customization.logo_url} alt={store.name} className="h-9 object-contain" />
              ) : (
                <img src={logoDarkBg} alt="BizGrow 360" className="h-9" />
              )}
            </Link>
            <div className="flex items-center gap-1">
              {customization?.instagram_url && (
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <a href={customization.instagram_url} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {customization?.facebook_url && (
                <Button variant="ghost" size="icon" className="rounded-full" asChild>
                  <a href={customization.facebook_url} target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5" />
                  </a>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      {(customization?.show_banner !== false) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden"
        >
          <div 
            className="relative py-16 md:py-24"
            style={{
              background: customization?.banner_image_url 
                ? `url(${customization.banner_image_url}) center/cover` 
                : `linear-gradient(135deg, ${themeColor} 0%, ${accentColor} 100%)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="container mx-auto px-4 relative">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
              >
                <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-white/30 shadow-2xl ring-4 ring-white/10">
                  <AvatarImage src={customization?.logo_url || ""} />
                  <AvatarFallback 
                    className="text-3xl font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${themeColor}, ${accentColor})` }}
                  >
                    {store.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-white">
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold tracking-tight"
                  >
                    {customization?.banner_text || store.name}
                  </motion.h1>
                  {(customization?.banner_subtitle || customization?.tagline) && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl opacity-90 mt-2"
                    >
                      {customization?.banner_subtitle || customization?.tagline}
                    </motion.p>
                  )}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4"
                  >
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm capitalize px-3 py-1">
                      {(store.category || "").replace("-", " ")}
                    </Badge>
                    <span className="flex items-center gap-1.5 text-sm text-white/90">
                      <MapPin className="w-4 h-4" />
                      {store.city}, {store.state}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-white/90">
                      <Clock className="w-4 h-4" />
                      {(store.business_mode || "").replace("-", " + ").replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Welcome Message */}
      {customization?.welcome_message && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/50 border-b"
        >
          <div className="container mx-auto px-4 py-4">
            <p className="text-center text-muted-foreground">{customization.welcome_message}</p>
          </div>
        </motion.div>
      )}

      {/* Promotions Carousel */}
      {customization?.show_offers_section !== false && promotions.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
              <Gift className="w-6 h-6" style={{ color: themeColor }} />
              Special Offers
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
              {promotions.map((promo, index) => (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-72 snap-start"
                >
                  <div 
                    className="relative p-5 rounded-2xl overflow-hidden h-full"
                    style={{ 
                      background: `linear-gradient(135deg, ${themeColor}15, ${accentColor}15)`,
                      border: `2px solid ${themeColor}30`
                    }}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20"
                      style={{ background: `radial-gradient(circle, ${themeColor}, transparent)`, transform: 'translate(30%, -30%)' }}
                    />
                    {promo.discount_percentage && (
                      <Badge 
                        className="text-white mb-3 text-sm px-3 py-1"
                        style={{ backgroundColor: themeColor }}
                      >
                        {promo.discount_percentage}% OFF
                      </Badge>
                    )}
                    <h3 className="font-bold text-lg">{promo.title}</h3>
                    {promo.description && (
                      <p className="text-sm text-muted-foreground mt-2">{promo.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Category Pills */}
      {customization?.show_categories !== false && categories.length > 0 && (
        <div className="container mx-auto px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-full flex-shrink-0"
              style={selectedCategory === "all" ? { backgroundColor: themeColor } : {}}
              onClick={() => setSelectedCategory("all")}
            >
              All Products
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full flex-shrink-0 capitalize"
                style={selectedCategory === cat ? { backgroundColor: themeColor } : {}}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-4">
        {customization?.show_search !== false && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl bg-muted/50 border-0 focus-visible:ring-2"
                style={{ '--tw-ring-color': themeColor } as React.CSSProperties}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 h-12 rounded-xl bg-muted/50 border-0">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden sm:flex gap-1 bg-muted/50 rounded-xl p-1">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="icon"
                  className="rounded-lg"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="icon"
                  className="rounded-lg"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Products Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filteredProducts.length}</span> products found
          </p>
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-72 w-full rounded-2xl" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery ? "Try a different search term" : "This store hasn't added any products yet"}
            </p>
          </motion.div>
        ) : (
          <div className={
            viewMode === "grid" 
              ? `grid gap-4 ${customization?.layout_style === "compact" ? "grid-cols-3 md:grid-cols-4 lg:grid-cols-6" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}` 
              : "space-y-4"
          }>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -4 }}
                className={
                  viewMode === "grid"
                    ? "bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                    : "bg-card rounded-2xl border border-border/50 p-4 flex gap-4 shadow-sm hover:shadow-xl transition-all duration-300"
                }
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-16 h-16 text-muted-foreground/30" />
                        </div>
                      )}
                      {product.compare_price && product.compare_price > product.price && (
                        <Badge 
                          className="absolute top-3 left-3 text-white shadow-lg"
                          style={{ backgroundColor: themeColor }}
                        >
                          {Math.round((1 - product.price / product.compare_price) * 100)}% OFF
                        </Badge>
                      )}
                      {product.stock_quantity !== null && product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                        <Badge variant="secondary" className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm">
                          Only {product.stock_quantity} left
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-medium">
                        {product.category?.replace("-", " ") || "General"}
                      </p>
                      <h3 className="font-semibold line-clamp-2 min-h-[2.75rem] leading-snug">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-xl font-bold" style={{ color: themeColor }}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.compare_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-4 gap-2 rounded-xl h-10 font-medium"
                        style={{ backgroundColor: themeColor }}
                        onClick={() => handleWhatsAppOrder(product)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Order via WhatsApp
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-28 h-28 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex-shrink-0 overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                        {product.category?.replace("-", " ") || "General"}
                      </p>
                      <h3 className="font-semibold mt-1">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{product.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold" style={{ color: themeColor }}>
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.compare_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      className="gap-2 self-center rounded-xl"
                      style={{ backgroundColor: themeColor }}
                      onClick={() => handleWhatsAppOrder(product)}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Order
                    </Button>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t mt-16 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <Link to="/" className="font-semibold hover:underline" style={{ color: themeColor }}>
              BizGrow 360
            </Link>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Create your own digital store catalogue today!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StoreCatalogue;
