import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  Search,
  Share2,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Headphones,
  Truck,
  Plus,
  Minus,
  Package,
  Store,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

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

interface BlinkitProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quantity: number;
  onAddToCart: () => void;
  onUpdateQuantity: (delta: number) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  whatsappNumber?: string | null;
  storeName?: string;
  similarProducts?: Product[];
  onViewProduct?: (product: Product) => void;
}

// Extract product details from description
const extractDetails = (description: string | null) => {
  const details: { label: string; value: string }[] = [];
  if (!description) return { details, cleanDescription: "" };

  const patterns = [
    { regex: /(\d+(?:\.\d+)?\s*(?:kg|g))/i, label: "Weight" },
    { regex: /(\d+(?:\.\d+)?\s*(?:ml|l|L))/i, label: "Capacity" },
    { regex: /(\d+\s*(?:pc|pcs|pieces?))/i, label: "Quantity" },
    { regex: /(pack of \d+)/i, label: "Pack Size" },
    { regex: /(stainless steel|plastic|glass|ceramic|wooden|cotton)/i, label: "Material" },
  ];

  let cleanDescription = description;
  patterns.forEach(({ regex, label }) => {
    const match = description.match(regex);
    if (match) {
      details.push({ label, value: match[1] });
    }
  });

  return { details, cleanDescription: cleanDescription.slice(0, 200) };
};

// Generate rating
const getProductRating = (productId: string): { rating: number; count: number } => {
  const hash = productId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return {
    rating: 3.5 + (hash % 15) / 10,
    count: 50 + (hash % 9950),
  };
};

// Calculate discount
const getDiscountPercent = (price: number, comparePrice: number | null): number | null => {
  if (!comparePrice || comparePrice <= price) return null;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

const TrustBadge = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) => (
  <div className="flex flex-col items-center text-center p-3 bg-muted rounded-xl flex-1">
    <Icon className="h-5 w-5 text-primary mb-1" />
    <span className="text-xs font-semibold text-foreground">{title}</span>
    <span className="text-[10px] text-muted-foreground">{subtitle}</span>
  </div>
);

const AccordionSection = ({ 
  title, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="font-medium text-foreground text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 text-sm text-muted-foreground">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductContent = ({
  product,
  onClose,
  quantity,
  onAddToCart,
  onUpdateQuantity,
  isFavorite,
  onToggleFavorite,
  whatsappNumber,
  storeName,
  similarProducts = [],
  onViewProduct,
}: BlinkitProductModalProps & { onClose: () => void }) => {
  if (!product) return null;

  const { rating, count } = getProductRating(product.id);
  const discountPercent = getDiscountPercent(product.price, product.compare_price);
  const { details, cleanDescription } = extractDetails(product.description);
  const isOutOfStock = product.is_available === false || product.stock_quantity === 0;

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} for ₹${product.price}`,
      url: window.location.href,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleWhatsAppInquiry = () => {
    if (!whatsappNumber) return;
    const message = encodeURIComponent(
      `Hi! I'm interested in ${product.name} (₹${product.price}) from ${storeName || "your store"}. Is it available?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-background z-10">
        <button onClick={onClose} className="p-1">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h2 className="font-medium text-foreground text-sm truncate max-w-[50%]">
          {product.name}
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={onToggleFavorite} className="p-1">
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
              }`}
            />
          </button>
          <button className="p-1">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
          <button onClick={handleShare} className="p-1">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Image */}
        <div className="relative bg-muted aspect-square">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-24 w-24 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Image Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 py-4">
          {/* Delivery Badge */}
          <div className="inline-flex items-center gap-1.5 bg-primary/10 px-2 py-1 rounded-full mb-3">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">13 MINS</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-accent text-accent"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({count.toLocaleString()})</span>
          </div>

          {/* Product Name */}
          <h1 className="text-xl font-bold text-foreground mb-1">{product.name}</h1>
          
          {/* Category */}
          {product.category && (
            <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-foreground">₹{product.price}</span>
            {product.compare_price && product.compare_price > product.price && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  MRP ₹{product.compare_price}
                </span>
                {discountPercent && (
                  <span className="text-sm font-bold text-primary">
                    {discountPercent}% OFF
                  </span>
                )}
              </>
            )}
          </div>

          {/* Accordion Sections */}
          <div className="border-t border-border">
            <AccordionSection title="View product details" defaultOpen>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {cleanDescription || "High quality product from trusted brand."}
              </p>
            </AccordionSection>

            {details.length > 0 && (
              <AccordionSection title="Key Information">
                <div className="space-y-2">
                  {details.map((detail, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-muted-foreground">{detail.label}</span>
                      <span className="text-foreground font-medium capitalize">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </AccordionSection>
            )}

            <AccordionSection title="Info">
              <p className="text-muted-foreground text-sm">
                Disclaimer: Product information is provided by the seller or manufacturer. 
                Actual product may vary from image shown.
              </p>
            </AccordionSection>
          </div>

          {/* Trust Badges */}
          <div className="flex gap-2 mt-4 mb-6">
            <TrustBadge 
              icon={RefreshCw} 
              title="72 hours" 
              subtitle="Replacement" 
            />
            <TrustBadge 
              icon={Headphones} 
              title="24/7" 
              subtitle="Support" 
            />
            <TrustBadge 
              icon={Truck} 
              title="Fast" 
              subtitle="Delivery" 
            />
          </div>

          {/* Store/Brand Section */}
          {storeName && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-xl mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-border">
                  <Store className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{storeName}</p>
                  <p className="text-xs text-muted-foreground">Explore all products</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          )}

          {/* WhatsApp Inquiry */}
          {whatsappNumber && (
            <Button
              onClick={handleWhatsAppInquiry}
              variant="outline"
              className="w-full mb-4 border-primary text-primary hover:bg-primary/10"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ask on WhatsApp
            </Button>
          )}

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-foreground mb-3">Similar Products</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                {similarProducts.slice(0, 6).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onViewProduct?.(p)}
                    className="flex-shrink-0 w-32 cursor-pointer"
                  >
                    <div className="bg-muted rounded-xl aspect-square mb-2 overflow-hidden">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-medium text-foreground line-clamp-2">{p.name}</p>
                    <p className="text-xs font-bold text-foreground mt-1">₹{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-4 py-3 flex items-center justify-between z-20">
        <div>
          <p className="text-lg font-bold text-foreground">₹{product.price}</p>
          <p className="text-[10px] text-muted-foreground">Inclusive of all taxes</p>
        </div>
        
        {isOutOfStock ? (
          <Button disabled className="bg-muted text-muted-foreground px-8">
            Out of Stock
          </Button>
        ) : quantity === 0 ? (
          <Button
            onClick={onAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8"
          >
            Add to cart
          </Button>
        ) : (
          <div className="flex items-center gap-0 bg-primary rounded-lg overflow-hidden">
            <button
              onClick={() => onUpdateQuantity(-1)}
              className="p-3 hover:bg-primary/80 text-primary-foreground transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 text-primary-foreground font-bold text-lg min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(1)}
              className="p-3 hover:bg-primary/80 text-primary-foreground transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const BlinkitProductModal = (props: BlinkitProductModalProps) => {
  const isMobile = useIsMobile();
  const handleClose = () => props.onOpenChange(false);

  if (isMobile) {
    return (
      <Sheet open={props.open} onOpenChange={props.onOpenChange}>
        <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-3xl">
          <ProductContent {...props} onClose={handleClose} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-md h-[90vh] p-0 overflow-hidden">
        <ProductContent {...props} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default BlinkitProductModal;
