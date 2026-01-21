import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Minus, X, ShoppingCart,
  Truck, Store, Check, Loader2
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
import CategorySidebar from "@/components/store/CategorySidebar";
import IconCategoryTabs from "@/components/store/IconCategoryTabs";
import FilterBar from "@/components/store/FilterBar";
import PromoBannerCarousel from "@/components/store/PromoBannerCarousel";
import { StorePageSkeleton } from "@/components/store/StoreSkeletons";
import { NoProductsFound, StoreNotFound } from "@/components/store/EmptyStates";

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
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
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

  // Cart wrapper
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
    <div className="min-h-screen bg-muted pb-32">
      {/* Blinkit Header */}
      <BlinkitHeader
        storeName={store.name}
        storeLocation={`${store.city}, ${store.state}`}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        logoUrl={customization?.logo_url}
      />

      {/* Icon Category Tabs (Mobile) */}
      <IconCategoryTabs
        categories={categories}
        activeCategory={selectedCategory}
        onCategoryClick={setSelectedCategory}
      />

      {/* Filter Bar */}
      <FilterBar
        onSortChange={setSortOrder}
        onPriceFilterChange={setPriceFilter}
        currentSort={sortOrder}
        currentPriceFilter={priceFilter}
      />

      {/* Promotions Carousel */}
      {promotions.length > 0 && (
        <div className="px-4 py-4 lg:pl-24">
          <PromoBannerCarousel promotions={promotions} />
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
        <main className="flex-1 px-4 py-4">
          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl h-72 animate-pulse border border-border" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <NoProductsFound 
              searchQuery={searchQuery}
              onClearFilters={() => {
                setSearchQuery("");
              setSelectedCategory(null);
              setPriceFilter(null);
            }} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredProducts.map((product, index) => (
                <BlinkitProductCard
                  key={product.id}
                  product={product}
                  quantity={getItemQuantity(product.id)}
                  isFavorite={favorites.has(product.id)}
                  onAddToCart={() => addToCart(product)}
                  onUpdateQuantity={(delta) => updateQuantity(product.id, getItemQuantity(product.id) + delta)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  onViewDetails={() => {
                    setSelectedProduct(product);
                    setProductModalOpen(true);
                  }}
                  index={index}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Product Detail Modal */}
      <BlinkitProductModal
        product={selectedProduct}
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
        quantity={selectedProduct ? getItemQuantity(selectedProduct.id) : 0}
        onAddToCart={() => selectedProduct && addToCart(selectedProduct)}
        onUpdateQuantity={(delta) => selectedProduct && updateQuantity(selectedProduct.id, getItemQuantity(selectedProduct.id) + delta)}
        isFavorite={selectedProduct ? favorites.has(selectedProduct.id) : false}
        onToggleFavorite={() => selectedProduct && toggleFavorite(selectedProduct.id)}
        whatsappNumber={customization?.whatsapp_number}
        storeName={store.name}
        similarProducts={getSimilarProducts(selectedProduct)}
        onViewProduct={(p) => setSelectedProduct(p)}
      />

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart ({cartCount} items)
            </SheetTitle>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">Your cart is empty</p>
              <Button onClick={() => setCartOpen(false)} className="mt-4 bg-primary hover:bg-primary/90">
                Continue Shopping
              </Button>
            </div>
          ) : checkoutOpen ? (
            <div className="py-4 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                <div>
                  <Label>Name *</Label>
                  <Input
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="10-digit phone number"
                  />
                </div>
                
                {hasDelivery && (
                  <RadioGroup value={deliveryMode} onValueChange={(v) => setDeliveryMode(v as any)}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="takeaway" id="takeaway" />
                      <Label htmlFor="takeaway" className="flex items-center gap-2 cursor-pointer">
                        <Store className="h-4 w-4" /> Store Pickup
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer">
                        <Truck className="h-4 w-4" /> Home Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                )}

                {deliveryMode === "delivery" && (
                  <div>
                    <Label>Delivery Address *</Label>
                    <Textarea
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Full delivery address"
                    />
                  </div>
                )}

                <div>
                  <Label>Notes (optional)</Label>
                  <Textarea
                    value={customerDetails.notes}
                    onChange={(e) => setCustomerDetails(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special instructions"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setCheckoutOpen(false)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleCheckout} disabled={isSubmitting} className="flex-1 bg-primary hover:bg-primary/90">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                  Place Order
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="py-4 space-y-3 overflow-y-auto max-h-[50vh]">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <div className="w-16 h-16 bg-card rounded-lg overflow-hidden">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                          <ShoppingCart className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-primary font-bold">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 bg-muted-foreground/20 rounded-lg hover:bg-muted-foreground/30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-1 text-muted-foreground hover:text-destructive">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{cartTotal.toLocaleString()}</span>
                </div>
                <Button onClick={() => setCheckoutOpen(true)} className="w-full bg-primary hover:bg-primary/90">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Bottom Navigation */}
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
    </div>
  );
};

export default StoreCatalogue;
