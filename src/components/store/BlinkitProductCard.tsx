import { Heart, Plus, Minus, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
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

// Extract weight/quantity info from description
const extractProductInfo = (description: string | null): string[] => {
  if (!description) return [];
  const patterns = [
    /(\d+(?:\.\d+)?\s*(?:kg|g|ml|l|L|pc|pcs|pack|pieces?))/gi,
    /(pack of \d+)/gi,
    /(stainless steel|plastic|glass|ceramic|wooden)/gi,
  ];
  
  const matches: string[] = [];
  patterns.forEach(pattern => {
    const found = description.match(pattern);
    if (found) matches.push(...found.slice(0, 2));
  });
  
  return [...new Set(matches)].slice(0, 2);
};

// Calculate discount percentage
const getDiscountPercent = (price: number, comparePrice: number | null): number | null => {
  if (!comparePrice || comparePrice <= price) return null;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
};

// Generate random rating for display (in real app, would come from DB)
const getProductRating = (productId: string): { rating: number; count: number } => {
  const hash = productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return {
    rating: 3.5 + (hash % 15) / 10,
    count: 50 + (hash % 9950)
  };
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
  const isOutOfStock = product.is_available === false || product.stock_quantity === 0;
  const discountPercent = getDiscountPercent(product.price, product.compare_price);
  const productTags = extractProductInfo(product.description);
  const { rating, count } = getProductRating(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-square bg-muted cursor-pointer"
        onClick={onViewDetails}
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/90 shadow-sm"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
            }`} 
          />
        </button>

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
            {discountPercent}% OFF
          </div>
        )}

        {/* Product Image */}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className={`w-full h-full object-contain p-3 ${isOutOfStock ? 'opacity-50' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg" />
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="bg-background text-foreground text-xs font-medium px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* ADD Button (Positioned at bottom-right of image) */}
        {!isOutOfStock && (
          <div className="absolute bottom-2 right-2 z-10">
            {quantity === 0 ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                variant="outline"
                size="sm"
                className="h-7 px-4 bg-background border-primary text-primary font-bold text-xs hover:bg-primary/10 shadow-md"
              >
                ADD
              </Button>
            ) : (
              <div className="flex items-center gap-0 bg-primary rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(-1);
                  }}
                  className="p-1.5 hover:bg-primary/80 text-primary-foreground transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="px-2.5 text-primary-foreground font-bold text-sm min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(1);
                  }}
                  className="p-1.5 hover:bg-primary/80 text-primary-foreground transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1" onClick={onViewDetails}>
        {/* Product Tags */}
        {productTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {productTags.map((tag, i) => (
              <span 
                key={i}
                className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 mb-1.5">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex items-center gap-0.5 bg-accent/20 px-1.5 py-0.5 rounded">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-[11px] font-semibold text-foreground">{rating.toFixed(1)}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">({count.toLocaleString()})</span>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center gap-1 mb-2">
          <Clock className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-medium text-primary">13 MINS</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-bold text-foreground">₹{product.price}</span>
          {product.compare_price && product.compare_price > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.compare_price}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlinkitProductCard;
