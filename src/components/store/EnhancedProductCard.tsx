import { motion } from "framer-motion";
import { Package, Heart, Plus, Minus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface EnhancedProductCardProps {
  product: Product;
  quantity: number;
  isFavorite: boolean;
  onAddToCart: () => void;
  onUpdateQuantity: (delta: number) => void;
  onToggleFavorite: () => void;
  onViewDetails: () => void;
  index: number;
}

// Extract key info from description for display chips
const extractQuickInfo = (description: string | null) => {
  if (!description) return null;
  
  // Look for patterns like "500g", "10 pieces", "Pack of 6"
  const patterns = [
    /(\d+)\s*(gm?|kg|ml|l)\b/i,
    /(\d+)\s*(pcs?|pieces?)\b/i,
    /pack\s*of\s*(\d+)/i,
    /(\d+)\s*pairs?/i,
  ];
  
  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) {
      return match[0];
    }
  }
  return null;
};

const getStockIndicator = (quantity: number | null) => {
  if (quantity === null || quantity === undefined) return null;
  if (quantity === 0) return { color: "bg-red-500", ring: "ring-red-200" };
  if (quantity <= 5) return { color: "bg-amber-500", ring: "ring-amber-200" };
  return { color: "bg-emerald-500", ring: "ring-emerald-200" };
};

const EnhancedProductCard = ({
  product,
  quantity,
  isFavorite,
  onAddToCart,
  onUpdateQuantity,
  onToggleFavorite,
  onViewDetails,
  index,
}: EnhancedProductCardProps) => {
  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPercent = hasDiscount 
    ? Math.round((1 - product.price / product.compare_price!) * 100) 
    : 0;
  const quickInfo = extractQuickInfo(product.description);
  const stockIndicator = getStockIndicator(product.stock_quantity);
  const isOutOfStock = product.stock_quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div 
        className={`bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${isOutOfStock ? 'opacity-75' : ''}`}
        onClick={onViewDetails}
      >
        {/* Product Image - Larger aspect ratio */}
        <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
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
          {hasDiscount && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1.5 font-bold shadow-lg">
              {discountPercent}% OFF
            </Badge>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge className="bg-card text-foreground text-sm px-4 py-2">Out of Stock</Badge>
            </div>
          )}

          {/* Stock Indicator Dot */}
          {stockIndicator && !isOutOfStock && (
            <div className="absolute top-3 right-14">
              <span className={`block w-3 h-3 rounded-full ${stockIndicator.color} ring-2 ${stockIndicator.ring} shadow-lg`} />
            </div>
          )}

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} 
            />
          </motion.button>

          {/* View Details Hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
              <Eye className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">View Details</span>
            </div>
          </div>

          {/* Add to Cart - Bottom Right */}
          {!isOutOfStock && (
            <div 
              className="absolute bottom-3 right-3"
              onClick={(e) => e.stopPropagation()}
            >
              {quantity === 0 ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl"
                    onClick={onAddToCart}
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </motion.div>
              ) : (
                <div className="flex items-center gap-0.5 bg-card rounded-full shadow-xl border-2 border-primary p-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-full hover:bg-muted"
                    onClick={() => onUpdateQuantity(-1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-bold text-sm text-foreground">{quantity}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-full hover:bg-muted"
                    onClick={() => onUpdateQuantity(1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Info - Larger text */}
        <div className="p-4">
          {/* Category */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              {product.category?.replace("-", " ") || "General"}
            </span>
            {quickInfo && (
              <>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-[10px] text-primary font-bold uppercase">{quickInfo}</span>
              </>
            )}
          </div>

          {/* Product Name - Larger */}
          <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-2 min-h-[2.75rem] leading-snug">
            {product.name}
          </h3>

          {/* Price Section - Larger */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.compare_price?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status Text */}
          {product.stock_quantity !== null && product.stock_quantity <= 5 && product.stock_quantity > 0 && (
            <p className="text-xs text-amber-600 font-medium mt-2">
              Only {product.stock_quantity} left in stock!
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedProductCard;
