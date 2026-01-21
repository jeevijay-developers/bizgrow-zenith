import { useState } from "react";
import { Heart, Plus, Minus, Sparkles, Eye, Tag, Package, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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

interface BlinkitProductCardProps {
  product: Product;
  quantity: number;
  isFavorite: boolean;
  onAddToCart: () => void;
  onUpdateQuantity: (delta: number) => void;
  onToggleFavorite: () => void;
  onViewDetails: () => void;
  index: number;
}

const extractProductInfo = (description: string | null): string[] => {
  if (!description) return [];
  const patterns = [
    /(\d+(?:\.\d+)?\s*(?:kg|g|ml|l|L|pc|pcs|pack|pieces?))/gi,
    /(pack of \d+)/gi,
  ];
  
  const matches: string[] = [];
  patterns.forEach(pattern => {
    const found = description.match(pattern);
    if (found) matches.push(...found.slice(0, 1));
  });
  
  return [...new Set(matches)].slice(0, 1);
};

const getDiscountPercent = (price: number, comparePrice: number | null): number | null => {
  if (!comparePrice || comparePrice <= price) return null;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

const BlinkitProductCard = ({
  product,
  quantity,
  isFavorite,
  onAddToCart,
  onUpdateQuantity,
  onToggleFavorite,
  onViewDetails,
  index,
}: BlinkitProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = product.is_available === false || product.stock_quantity === 0;
  const discountPercent = getDiscountPercent(product.price, product.compare_price);
  const productTags = extractProductInfo(product.description);
  const savings = product.compare_price ? product.compare_price - product.price : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, delay: index * 0.02, ease: "easeOut" }}
      whileHover={{ y: -2, boxShadow: "0 8px 24px -8px hsl(var(--primary) / 0.15)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-card rounded-2xl border border-border/60 shadow-sm hover:shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 relative"
    >
      {/* Quick View Tooltip */}
      <AnimatePresence>
        {isHovered && !isOutOfStock && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="bg-foreground/95 backdrop-blur-md text-background px-3 py-2 rounded-xl shadow-xl border border-border/20 min-w-[140px]">
              {/* Arrow */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-foreground/95 rotate-45" />
              
              <div className="relative space-y-1.5">
                {/* Quick View Header */}
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary-foreground/80 border-b border-white/10 pb-1.5">
                  <Eye className="h-3 w-3" />
                  Quick View
                </div>
                
                {/* Category */}
                {product.category && (
                  <div className="flex items-center gap-1.5 text-[9px]">
                    <Tag className="h-2.5 w-2.5 text-primary" />
                    <span className="capitalize">{product.category}</span>
                  </div>
                )}
                
                {/* Stock Status */}
                {product.stock_quantity !== null && (
                  <div className="flex items-center gap-1.5 text-[9px]">
                    <Package className="h-2.5 w-2.5 text-primary" />
                    <span>
                      {product.stock_quantity > 10 
                        ? "In Stock" 
                        : product.stock_quantity > 0 
                          ? `Only ${product.stock_quantity} left!`
                          : "Out of Stock"
                      }
                    </span>
                  </div>
                )}
                
                {/* Savings */}
                {savings > 0 && (
                  <div className="flex items-center gap-1.5 text-[9px]">
                    <Zap className="h-2.5 w-2.5 text-accent" />
                    <span className="text-accent font-semibold">Save ₹{savings}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Container */}
      <div 
        className="relative aspect-square bg-gradient-to-br from-muted/30 to-muted/60 cursor-pointer overflow-hidden"
        onClick={onViewDetails}
      >
        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/90 backdrop-blur-sm shadow-sm border border-border/50 hover:bg-background transition-all"
        >
          <Heart 
            className={`h-3.5 w-3.5 transition-all duration-200 ${
              isFavorite ? "fill-destructive text-destructive scale-110" : "text-muted-foreground"
            }`} 
          />
        </motion.button>

        {/* Discount Badge with HOT DEAL pulse for 25%+ */}
        {discountPercent && (
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ 
              scale: discountPercent >= 25 ? [1, 1.08, 1] : 1, 
              rotate: 0 
            }}
            transition={{
              scale: discountPercent >= 25 ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : undefined
            }}
            className={`absolute top-2 left-2 z-10 flex items-center gap-0.5 text-[9px] font-bold px-2 py-1 rounded-full shadow-md ${
              discountPercent >= 25 
                ? 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white ring-2 ring-orange-300/50 ring-offset-1 ring-offset-transparent' 
                : 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground'
            }`}
          >
            {discountPercent >= 25 ? (
              <>
                <Zap className="h-2.5 w-2.5 animate-pulse" />
                HOT {discountPercent}% OFF
              </>
            ) : (
              <>
                <Sparkles className="h-2.5 w-2.5" />
                {discountPercent}% OFF
              </>
            )}
          </motion.div>
        )}

        {/* Low Stock Indicator */}
        {product.stock_quantity !== null && product.stock_quantity > 0 && product.stock_quantity <= 5 && !isOutOfStock && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-2 left-2 z-10 flex items-center gap-1 bg-accent text-accent-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full"
          >
            <Zap className="h-2 w-2" />
            {product.stock_quantity} left
          </motion.div>
        )}

        {/* Product Image */}
        {product.image_url ? (
          <motion.img
            src={product.image_url}
            alt={product.name}
            className={`w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300 ${isOutOfStock ? 'opacity-40 grayscale' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 bg-gradient-to-br from-muted-foreground/5 to-muted-foreground/15 rounded-2xl" />
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-foreground/90 text-background text-[10px] font-semibold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* ADD Button */}
        {!isOutOfStock && (
          <div className="absolute bottom-2 right-2 z-10">
            {quantity === 0 ? (
              <motion.div whileTap={{ scale: 0.92 }}>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart();
                  }}
                  variant="outline"
                  size="sm"
                  className="h-7 px-4 bg-background/95 backdrop-blur-sm border-primary text-primary font-bold text-[10px] hover:bg-primary hover:text-primary-foreground shadow-md transition-all duration-200"
                >
                  ADD
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-0 bg-gradient-to-r from-primary to-primary/95 rounded-full shadow-lg overflow-hidden"
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(-1);
                  }}
                  className="p-1.5 hover:bg-white/10 text-primary-foreground transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </motion.button>
                <span className="px-2.5 text-primary-foreground font-bold text-xs min-w-[20px] text-center">
                  {quantity}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(1);
                  }}
                  className="p-1.5 hover:bg-white/10 text-primary-foreground transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col flex-1 cursor-pointer" onClick={onViewDetails}>
        {/* Product Tags */}
        {productTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {productTags.map((tag, i) => (
              <span 
                key={i}
                className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-md capitalize font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Category Badge (Visible on hover) */}
        <AnimatePresence>
          {isHovered && product.category && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-1"
            >
              <span className="text-[8px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded capitalize">
                {product.category}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Name */}
        <h3 className="font-medium text-foreground text-xs leading-snug line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-bold text-foreground text-sm">₹{product.price}</span>
          {product.compare_price && product.compare_price > product.price && (
            <span className="text-[10px] text-muted-foreground line-through">
              ₹{product.compare_price}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlinkitProductCard;
