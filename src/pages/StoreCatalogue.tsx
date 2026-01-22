import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Minus, X, ShoppingCart,
  Truck, Store, Check, Loader2, User, ChevronRight
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// New Blinkit-style components
import BlinkitProductCard from "@/components/store/BlinkitProductCard";
import BlinkitProductModal from "@/components/store/BlinkitProductModal";
import BlinkitHeader from "@/components/store/BlinkitHeader";
import BlinkitBottomNav from "@/components/store/BlinkitBottomNav";
import DesktopStickyFooter from "@/components/store/DesktopStickyFooter";
import CategorySidebar from "@/components/store/CategorySidebar";
import IconCategoryTabs from "@/components/store/IconCategoryTabs";
import FilterBar from "@/components/store/FilterBar";
import PromoBannerCarousel from "@/components/store/PromoBannerCarousel";
import { StorePageSkeleton, ProductGridSkeleton } from "@/components/store/StoreSkeletons";
import { NoProductsFound, StoreNotFound } from "@/components/store/EmptyStates";
import RecentlyViewedSection from "@/components/store/RecentlyViewedSection";
import StoreFooter from "@/components/store/StoreFooter";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useWishlist } from "@/hooks/useWishlist";

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

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

const StoreCatalogue = () => {
  const { storeId: rawStoreId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  
  // Extract store ID from slug
  const extractStoreId = (raw: string | undefined): string | undefined => {
    if (!raw) return undefined;
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const match = raw.match(uuidRegex);
    if (match) return match[0];
    if (raw.length === 36 && raw.includes('-')) return raw;
    return raw;
  };
  
  const storeId = extractStoreId(rawStoreId);
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart hook
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

  // Recently viewed hook
  const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed(storeId);

  // Wishlist hook - persists to database for logged-in users
  const { isFavorite, toggleFavorite } = useWishlist({ storeId });

  // Fetch store info
  const { data: store, isLoading: storeLoading, error: storeError } = useQuery({
    queryKey: ["public-store", storeId],
    queryFn: async () => {
      if (!storeId) return null;
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
  let filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    
    // Price filter
    let matchesPrice = true;
    if (priceFilter) {
      if (priceFilter === "0-100") matchesPrice = p.price < 100;
      else if (priceFilter === "100-500") matchesPrice = p.price >= 100 && p.price < 500;
      else if (priceFilter === "500-1000") matchesPrice = p.price >= 500 && p.price < 1000;
      else if (priceFilter === "1000+") matchesPrice = p.price >= 1000;
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort
  if (sortOrder === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOrder === "discount") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const discA = a.compare_price ? (a.compare_price - a.price) / a.compare_price : 0;
      const discB = b.compare_price ? (b.compare_price - b.price) / b.compare_price : 0;
      return discB - discA;
    });
  }

  // Similar products for modal
  const getSimilarProducts = (product: Product | null) => {
    if (!product) return [];
    return products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 6);
  };

  // Cart wrapper - now includes stock_quantity for inventory limits
  const addToCart = (product: Product) => {
    addToCartHook({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock_quantity: product.stock_quantity,
    });
    toast.success(`Added to cart`, { duration: 1500 });
  };

  const handleWhatsAppChat = () => {
    if (!customization?.whatsapp_number) {
      toast.info("WhatsApp contact not available");
      return;
    }
    const phone = customization.whatsapp_number.replace(/\D/g, "");
    const message = `Hi! I'm browsing ${store?.name}. Can you help me?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
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
      const phone = customization?.whatsapp_number?.replace(/\D/g, "") || "";
      
      if (phone) {
        const itemsList = cart.map(item =>
          `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toLocaleString()}`
        ).join("\n");
        const orderType = deliveryMode === "delivery" ? "🚚 Home Delivery" : "🏪 Store Pickup";
        const message = `🛒 *New Order from ${store.name}*\n\n${orderType}\n\n*Items:*\n${itemsList}\n\n💰 *Total: ₹${cartTotal.toLocaleString()}*\n\n👤 *Customer:* ${customerDetails.name}\n📞 *Phone:* ${customerDetails.phone}`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
      }

      clearCart();
      setCartOpen(false);
      setCheckoutOpen(false);
      navigate(`/order-confirmation/${orderId}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasDelivery = store?.business_mode?.includes("delivery");

  if (storeLoading) return <StorePageSkeleton />;

  if (storeError || !store) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-6">
        <StoreNotFound onGoHome={() => navigate("/")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted via-muted to-muted/80 pb-28 md:pb-24">
      {/* Header */}
      <BlinkitHeader
        storeName={store.name}
        storeLocation={`${store.city}, ${store.state}`}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        logoUrl={customization?.logo_url}
      />

      {/* Desktop Container - Max Width for proper alignment */}
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        {/* Icon Category Tabs (Mobile) */}
        <IconCategoryTabs
          categories={categories}
          activeCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />

        {/* Filter Bar */}
        <div className="px-2 sm:px-0">
          <FilterBar
            onSortChange={setSortOrder}
            onPriceFilterChange={setPriceFilter}
            currentSort={sortOrder}
            currentPriceFilter={priceFilter}
          />
        </div>

        {/* Promotions Carousel */}
        {promotions.length > 0 && (
          <div className="px-2 sm:px-0 py-3">
            <PromoBannerCarousel promotions={promotions} />
          </div>
        )}

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && !searchQuery && !selectedCategory && (
          <div className="px-2 sm:px-0">
            <RecentlyViewedSection
              products={recentlyViewed}
              onProductClick={(productId) => {
                const product = products.find(p => p.id === productId);
                if (product) {
                  setSelectedProduct(product);
                  setProductModalOpen(true);
                }
              }}
              onClear={clearRecentlyViewed}
              onAddToCart={(productId) => {
                const product = products.find(p => p.id === productId);
                if (product) addToCart(product);
              }}
            />
          </div>
        )}

        {/* Main Content with Sidebar */}
        <div className="flex">
          {/* Category Sidebar (Desktop) */}
          <CategorySidebar
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryClick={setSelectedCategory}
          />

          {/* Products Grid */}
          <main className="flex-1 px-2 sm:px-0 lg:px-4 py-4">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 px-1 sm:px-0">
              <div>
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">
                  {selectedCategory || "All Products"}
                </h2>
                <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground mt-0.5">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
                </p>
              </div>
            </div>

            {productsLoading ? (
              <ProductGridSkeleton count={12} />
            ) : filteredProducts.length === 0 ? (
              <NoProductsFound 
                searchQuery={searchQuery}
                onClearFilters={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setPriceFilter(null);
                }} 
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                {filteredProducts.map((product, index) => (
                  <BlinkitProductCard
                    key={product.id}
                    product={product}
                    quantity={getItemQuantity(product.id)}
                    isFavorite={isFavorite(product.id)}
                    onAddToCart={() => addToCart(product)}
                    onUpdateQuantity={(delta) => updateQuantity(product.id, delta)}
                    onToggleFavorite={() => toggleFavorite(product.id)}
                    onViewDetails={() => {
                      setSelectedProduct(product);
                      setProductModalOpen(true);
                      addToRecentlyViewed(product);
                    }}
                    index={index}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Store Footer - Inside container */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <StoreFooter
          storeName={store.name}
          storeAddress={store.address}
          whatsappNumber={customization?.whatsapp_number}
          instagramUrl={customization?.instagram_url}
          facebookUrl={customization?.facebook_url}
        />
      </div>

      <BlinkitProductModal
        product={selectedProduct}
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
        quantity={selectedProduct ? getItemQuantity(selectedProduct.id) : 0}
        onAddToCart={() => selectedProduct && addToCart(selectedProduct)}
        onUpdateQuantity={(delta) => selectedProduct && updateQuantity(selectedProduct.id, delta)}
        isFavorite={selectedProduct ? isFavorite(selectedProduct.id) : false}
        onToggleFavorite={() => selectedProduct && toggleFavorite(selectedProduct.id)}
        whatsappNumber={customization?.whatsapp_number}
        storeName={store.name}
        similarProducts={getSimilarProducts(selectedProduct)}
        onViewProduct={(p) => setSelectedProduct(p)}
      />

      {/* Cart Sheet - Enhanced Design */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="bottom" className="h-[85vh] sm:h-[80vh] rounded-t-3xl p-0 overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-background z-10 px-4 sm:px-6 pt-4 pb-3 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-3 text-lg sm:text-xl">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="font-bold">Your Cart</span>
                  <p className="text-xs text-muted-foreground font-normal">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
                </div>
              </SheetTitle>
              {cart.length > 0 && !checkoutOpen && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
              <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                Looks like you haven't added anything yet. Start shopping to fill your cart!
              </p>
              <Button onClick={() => setCartOpen(false)} className="bg-primary hover:bg-primary/90 px-8">
                <Store className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </div>
          ) : checkoutOpen ? (
            <div className="px-4 sm:px-6 py-5 overflow-y-auto h-[calc(85vh-80px)] sm:h-[calc(80vh-80px)]">
              {/* Order Summary Mini */}
              <div className="bg-muted/50 rounded-xl p-4 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Order Summary</span>
                  <button onClick={() => setCheckoutOpen(false)} className="text-xs text-primary font-medium">
                    Edit Cart
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {cart.slice(0, 3).map((item, i) => (
                      <div key={item.id} className="w-10 h-10 rounded-lg bg-card border-2 border-background overflow-hidden">
                        {item.image_url ? (
                          <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <ShoppingCart className="h-4 w-4 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                    ))}
                    {cart.length > 3 && (
                      <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold border-2 border-background">
                        +{cart.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{cartCount} items</p>
                    <p className="text-lg font-bold text-primary">₹{cartTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Customer Details
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Full Name *</Label>
                    <Input
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your name"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Phone Number *</Label>
                    <Input
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                      placeholder="10-digit number"
                      className="h-11"
                      maxLength={10}
                    />
                  </div>
                </div>
                
                {hasDelivery && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Delivery Option</Label>
                    <RadioGroup value={deliveryMode} onValueChange={(v) => setDeliveryMode(v as any)} className="grid grid-cols-2 gap-3">
                      <Label 
                        htmlFor="takeaway" 
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          deliveryMode === 'takeaway' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/30'
                        }`}
                      >
                        <RadioGroupItem value="takeaway" id="takeaway" className="sr-only" />
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          deliveryMode === 'takeaway' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <Store className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Store Pickup</p>
                          <p className="text-xs text-muted-foreground">Collect from store</p>
                        </div>
                        {deliveryMode === 'takeaway' && (
                          <Check className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </Label>
                      <Label 
                        htmlFor="delivery" 
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          deliveryMode === 'delivery' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/30'
                        }`}
                      >
                        <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          deliveryMode === 'delivery' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <Truck className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Home Delivery</p>
                          <p className="text-xs text-muted-foreground">To your address</p>
                        </div>
                        {deliveryMode === 'delivery' && (
                          <Check className="h-5 w-5 text-primary ml-auto" />
                        )}
                      </Label>
                    </RadioGroup>
                  </div>
                )}

                <AnimatePresence>
                  {deliveryMode === "delivery" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <Label className="text-sm font-medium">Delivery Address *</Label>
                      <Textarea
                        value={customerDetails.address}
                        onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your complete delivery address"
                        className="min-h-[80px]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-muted-foreground">Special Instructions (Optional)</Label>
                  <Textarea
                    value={customerDetails.notes}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special requests or notes..."
                    className="min-h-[60px]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 mt-6 border-t sticky bottom-0 bg-background pb-4">
                <Button variant="outline" onClick={() => setCheckoutOpen(false)} className="flex-1 h-12">
                  Back to Cart
                </Button>
                <Button 
                  onClick={handleCheckout} 
                  disabled={isSubmitting} 
                  className="flex-1 h-12 bg-primary hover:bg-primary/90 font-semibold"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Place Order • ₹{cartTotal.toLocaleString()}
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-[calc(85vh-80px)] sm:h-[calc(80vh-80px)]">
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
                {cart.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-xl border border-border/50"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-card rounded-xl overflow-hidden flex-shrink-0 border">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <ShoppingCart className="h-6 w-6 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base line-clamp-2">{item.name}</p>
                      <p className="text-primary font-bold text-base sm:text-lg mt-1">
                        ₹{(item.price * item.quantity).toLocaleString()}
                        {item.quantity > 1 && (
                          <span className="text-xs text-muted-foreground font-normal ml-2">
                            (₹{item.price} × {item.quantity})
                          </span>
                        )}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-1 bg-background rounded-lg border p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 hover:bg-muted rounded-md transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer with Total & Checkout */}
              <div className="sticky bottom-0 bg-background border-t px-4 sm:px-6 py-4 space-y-4">
                {/* Bill Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                    <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between">
                    <span className="font-bold text-base">Total Amount</span>
                    <span className="font-bold text-xl text-primary">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setCheckoutOpen(true)} 
                  className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold text-base"
                >
                  Proceed to Checkout
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Bottom Navigation - Mobile */}
      <BlinkitBottomNav
        cartCount={cartCount}
        cartTotal={cartTotal}
        onHomeClick={scrollToTop}
        onCategoriesClick={() => setSelectedCategory(null)}
        onCartClick={() => setCartOpen(true)}
        onWhatsAppClick={handleWhatsAppChat}
        showBackToTop={showBackToTop}
        onBackToTop={scrollToTop}
      />

      {/* Desktop Sticky Footer */}
      <DesktopStickyFooter
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setCartOpen(true)}
        onWhatsAppClick={handleWhatsAppChat}
        storeName={store.name}
        showBackToTop={showBackToTop}
        onBackToTop={scrollToTop}
      />
    </div>
  );
};

export default StoreCatalogue;
