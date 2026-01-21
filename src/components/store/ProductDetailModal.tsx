import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Package, Heart, Minus, Plus, ShoppingCart, 
  MessageCircle, Share2, Check, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
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

interface ProductDetailModalProps {
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
}

// Extract quantity/pack info from description
const extractProductDetails = (description: string | null) => {
  if (!description) return { details: [], cleanDescription: "" };
  
  const patterns = [
    { regex: /(\d+)\s*(pcs?|pieces?|pack|units?|pairs?)/gi, label: "Pack" },
    { regex: /(\d+)\s*(gm?|grams?|kg|ml|l|liters?)/gi, label: "Weight" },
    { regex: /size[:\s]*([a-zA-Z0-9-]+)/gi, label: "Size" },
  ];
  
  const details: { label: string; value: string }[] = [];
  let cleanDescription = description;
  
  patterns.forEach(({ regex, label }) => {
    const match = description.match(regex);
    if (match) {
      details.push({ label, value: match[0] });
    }
  });
  
  return { details, cleanDescription };
};

const getStockStatus = (quantity: number | null) => {
  if (quantity === null || quantity === undefined) return { text: "In Stock", color: "bg-emerald-500", textColor: "text-emerald-600" };
  if (quantity === 0) return { text: "Out of Stock", color: "bg-red-500", textColor: "text-red-600" };
  if (quantity <= 5) return { text: `Only ${quantity} left!`, color: "bg-amber-500", textColor: "text-amber-600" };
  if (quantity <= 20) return { text: `${quantity} in stock`, color: "bg-emerald-500", textColor: "text-emerald-600" };
  return { text: "In Stock", color: "bg-emerald-500", textColor: "text-emerald-600" };
};

const ProductContent = ({
  product,
  quantity,
  onAddToCart,
  onUpdateQuantity,
  isFavorite,
  onToggleFavorite,
  whatsappNumber,
  storeName,
  onClose,
}: ProductDetailModalProps & { onClose: () => void }) => {
  if (!product) return null;

  const { details, cleanDescription } = extractProductDetails(product.description);
  const stockStatus = getStockStatus(product.stock_quantity);
  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / product.compare_price!) * 100) 
    : 0;
  const savings = hasDiscount ? product.compare_price! - product.price : 0;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}!`,
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

  const handleWhatsAppInquiry = () => {
    if (!whatsappNumber) return;
    const phone = whatsappNumber.replace(/\D/g, "");
    const message = `Hi! I'm interested in:\n\n*${product.name}*\nPrice: ₹${product.price.toLocaleString()}\n\nCan you provide more details?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="flex flex-col max-h-[90vh] md:max-h-[85vh]">
      {/* Product Image Section */}
      <div className="relative aspect-square md:aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 overflow-hidden flex-shrink-0">
        {product.image_url ? (
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-24 h-24 text-muted-foreground/20" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {hasDiscount && (
            <Badge className="bg-red-500 text-white text-sm px-3 py-1.5 font-bold shadow-lg">
              {discountPercent}% OFF
            </Badge>
          )}
          {product.category && (
            <Badge variant="secondary" className="backdrop-blur-md capitalize px-3 py-1.5 shadow-lg">
              {product.category.replace("-", " ")}
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg md:hidden"
          >
            <X className="w-5 h-5 text-foreground" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleFavorite}
            className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
          >
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Stock Status */}
        <div className="absolute bottom-4 left-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm shadow-lg ${stockStatus.textColor}`}>
            <span className={`w-2 h-2 rounded-full ${stockStatus.color} animate-pulse`} />
            <span className="text-sm font-medium">{stockStatus.text}</span>
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Name & Price */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            {product.name}
          </h2>
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-3xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.compare_price?.toLocaleString()}
                </span>
                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  Save ₹{savings.toLocaleString()}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Quick Details Chips */}
        {details.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {details.map((detail, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full">
                <span className="text-xs text-muted-foreground">{detail.label}:</span>
                <span className="text-sm font-semibold text-foreground">{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        {product.description && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        {/* WhatsApp Inquiry */}
        {whatsappNumber && (
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl gap-2 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-950"
            onClick={handleWhatsAppInquiry}
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 dark:text-emerald-400">Ask on WhatsApp</span>
          </Button>
        )}
      </div>

      {/* Add to Cart Section - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-border bg-card p-4 space-y-3">
        {product.stock_quantity === 0 ? (
          <Button disabled className="w-full h-14 rounded-2xl gap-2">
            <AlertCircle className="w-5 h-5" />
            Out of Stock
          </Button>
        ) : (
          <>
            {quantity === 0 ? (
              <Button
                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold shadow-lg gap-3"
                onClick={onAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5 bg-muted rounded-2xl p-2 flex-1 justify-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-xl hover:bg-card"
                    onClick={() => onUpdateQuantity(-1)}
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <span className="w-12 text-center font-bold text-xl text-foreground">{quantity}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-xl hover:bg-card"
                    onClick={() => onUpdateQuantity(1)}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
                <Button
                  className="h-14 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg gap-2"
                  onClick={onAddToCart}
                >
                  <Check className="w-5 h-5" />
                  Added
                </Button>
              </div>
            )}
            <p className="text-xs text-center text-muted-foreground">
              Subtotal: ₹{(product.price * Math.max(1, quantity)).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const ProductDetailModal = (props: ProductDetailModalProps) => {
  const isMobile = useIsMobile();
  const { open, onOpenChange, product } = props;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[95vh] outline-none">
          <DrawerTitle className="sr-only">{product?.name || "Product Details"}</DrawerTitle>
          <ProductContent {...props} onClose={() => onOpenChange(false)} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-3xl gap-0">
        <DialogTitle className="sr-only">{product?.name || "Product Details"}</DialogTitle>
        <ProductContent {...props} onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
