import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Store, MapPin, Phone, ShoppingCart, Search, Filter, 
  Grid3X3, List, Heart, Share2, ArrowLeft, Package,
  MessageCircle, Clock, Star, Instagram, Facebook, Gift, Percent
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
        .single();
      if (error) throw error;
      return data as StoreInfo;
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Store link copied to clipboard!");
  };

  const handleWhatsAppOrder = (product: Product) => {
    if (!store) return;
    const phone = customization?.whatsapp_number?.replace(/\D/g, "") || "";
    const message = `Hi! I'm interested in ordering:\n\n*${product.name}*\nPrice: ₹${product.price}\n\nFrom: ${store.name}`;
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
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-32 w-full mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (storeError || !store) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Store Not Found</h1>
          <p className="text-muted-foreground">
            This store doesn't exist or is currently unavailable.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      {customization?.announcement_active && customization?.announcement_text && (
        <div 
          className="text-white text-center py-2 px-4 text-sm font-medium"
          style={{ backgroundColor: themeColor }}
        >
          {customization.announcement_text}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              {customization?.logo_url ? (
                <img src={customization.logo_url} alt={store.name} className="h-8" />
              ) : (
                <img src={logoDarkBg} alt="BizGrow 360" className="h-8" />
              )}
            </Link>
            <div className="flex items-center gap-2">
              {customization?.instagram_url && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={customization.instagram_url} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {customization?.facebook_url && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={customization.facebook_url} target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5" />
                  </a>
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Store Banner */}
      {(customization?.show_banner !== false) && (
        <div 
          className="relative py-12 md:py-16 overflow-hidden"
          style={{
            background: customization?.banner_image_url 
              ? `url(${customization.banner_image_url}) center/cover` 
              : `linear-gradient(135deg, ${themeColor}, ${accentColor})`
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white/20 shadow-xl">
                <AvatarImage src={customization?.logo_url || ""} />
                <AvatarFallback className="text-2xl font-bold" style={{ backgroundColor: themeColor, color: "white" }}>
                  {store.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-white">
                <h1 className="text-2xl md:text-4xl font-bold">{customization?.banner_text || store.name}</h1>
                <p className="text-lg opacity-90 mt-1">{customization?.banner_subtitle || customization?.tagline || ""}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <Badge variant="secondary" className="capitalize bg-white/20 text-white border-0">
                    {(store.category || "").replace("-", " ")}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    {store.city}, {store.state}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4" />
                    {(store.business_mode || "").replace("-", " + ").replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleShare}
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      {customization?.welcome_message && (
        <div className="bg-muted/50 py-4">
          <div className="container mx-auto px-4">
            <p className="text-center text-muted-foreground">{customization.welcome_message}</p>
          </div>
        </div>
      )}

      {/* Promotions/Offers Section */}
      {customization?.show_offers_section !== false && promotions.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5" style={{ color: themeColor }} />
            Special Offers
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {promotions.map((promo) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-shrink-0 w-64 p-4 rounded-xl border-2 border-dashed"
                style={{ borderColor: themeColor, backgroundColor: `${themeColor}10` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {promo.discount_percentage && (
                    <Badge style={{ backgroundColor: themeColor }} className="text-white">
                      {promo.discount_percentage}% OFF
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold">{promo.title}</h3>
                {promo.description && (
                  <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        {customization?.show_search !== false && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {customization?.show_categories !== false && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden sm:flex gap-1 border rounded-lg p-1">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Products Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {/* Products Grid */}
        {productsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try a different search term" : "This store hasn't added any products yet"}
            </p>
          </div>
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
                transition={{ delay: index * 0.05 }}
                className={
                  viewMode === "grid"
                    ? "bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all group"
                    : "bg-card rounded-xl border border-border p-4 flex gap-4 hover:shadow-lg transition-all"
                }
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground/50" />
                        </div>
                      )}
                      {product.compare_price && product.compare_price > product.price && (
                        <Badge className="absolute top-2 left-2" style={{ backgroundColor: themeColor }}>
                          {Math.round((1 - product.price / product.compare_price) * 100)}% OFF
                        </Badge>
                      )}
                      {product.stock_quantity !== null && product.stock_quantity <= 5 && product.stock_quantity > 0 && (
                        <Badge variant="secondary" className="absolute top-2 right-2">
                          Only {product.stock_quantity} left
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {product.category?.replace("-", " ") || "General"}
                      </p>
                      <h3 className="font-semibold line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold" style={{ color: themeColor }}>₹{product.price}</span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.compare_price}
                          </span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full mt-3 gap-2"
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
                    <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        {product.category?.replace("-", " ") || "General"}
                      </p>
                      <h3 className="font-semibold">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold" style={{ color: themeColor }}>₹{product.price}</span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.compare_price}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="gap-2 self-center"
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
      <footer className="bg-muted/50 border-t mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <Link to="/" className="font-medium hover:underline" style={{ color: themeColor }}>
              BizGrow 360
            </Link>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Create your own digital store catalogue today!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StoreCatalogue;