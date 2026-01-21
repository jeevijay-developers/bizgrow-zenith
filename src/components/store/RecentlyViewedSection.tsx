import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewedProduct {
  id: string;
  name: string;
  price: number;
  compare_price: number | null;
  image_url: string | null;
  category: string | null;
  viewedAt: number;
}

interface RecentlyViewedSectionProps {
  products: ViewedProduct[];
  onProductClick: (productId: string) => void;
  onClear: () => void;
  onAddToCart: (productId: string) => void;
}

const RecentlyViewedSection = ({
  products,
  onProductClick,
  onClear,
  onAddToCart,
}: RecentlyViewedSectionProps) => {
  if (products.length === 0) return null;

  const getTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getDiscountPercent = (price: number, comparePrice: number | null): number | null => {
    if (!comparePrice || comparePrice <= price) return null;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-3 py-4 bg-gradient-to-r from-card via-card to-card/95"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">Recently Viewed</h3>
            <p className="text-[10px] text-muted-foreground">{products.length} items</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-7 px-2 text-[10px] text-muted-foreground hover:text-destructive"
        >
          <X className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>

      {/* Scrollable Products */}
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
        <AnimatePresence mode="popLayout">
          {products.map((product, index) => {
            const discount = getDiscountPercent(product.price, product.compare_price);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => onProductClick(product.id)}
                className="flex-shrink-0 w-28 group cursor-pointer"
              >
                <div className="relative aspect-square bg-gradient-to-br from-muted/30 to-muted/60 rounded-xl overflow-hidden mb-1.5 border border-border/50 group-hover:border-primary/30 transition-all shadow-sm group-hover:shadow-md">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-10 h-10 bg-muted-foreground/10 rounded-xl" />
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {discount && (
                    <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      {discount}%
                    </div>
                  )}
                  
                  {/* Time Badge */}
                  <div className="absolute bottom-1 right-1 bg-background/90 backdrop-blur-sm text-[8px] text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
                    {getTimeAgo(product.viewedAt)}
                  </div>
                </div>
                
                {/* Product Info */}
                <h4 className="text-[10px] font-medium text-foreground line-clamp-2 leading-tight mb-0.5 group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-foreground">₹{product.price}</span>
                  {product.compare_price && product.compare_price > product.price && (
                    <span className="text-[9px] text-muted-foreground line-through">
                      ₹{product.compare_price}
                    </span>
                  )}
                </div>
                
                {/* Quick Add Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product.id);
                  }}
                  className="mt-1.5 w-full py-1 text-[9px] font-bold text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg transition-all"
                >
                  ADD
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* See All Button */}
        {products.length >= 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0 w-20 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-10 h-10 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-1">
                <ChevronRight className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">View All</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default RecentlyViewedSection;