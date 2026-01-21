import { Heart, Plus, Minus, Star } from "lucide-react";
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
  ];
  
  const matches: string[] = [];
  patterns.forEach(pattern => {
    const found = description.match(pattern);
    if (found) matches.push(...found.slice(0, 1));
  });
  
  return [...new Set(matches)].slice(0, 1);
};

// Calculate discount percentage
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
  const isOutOfStock = product.is_available === false || product.stock_quantity === 0;
  const discountPercent = getDiscountPercent(product.price, product.compare_price);
  const productTags = extractProductInfo(product.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-square bg-muted/50 cursor-pointer"
        onClick={onViewDetails}
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-1.5 right-1.5 z-10 p-1 rounded-full bg-background/80 shadow-sm"
        >
          <Heart 
            className={`h-3.5 w-3.5 transition-colors ${
              isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"
            }`} 
          />
        </button>

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-1.5 left-1.5 z-10 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded">
            {discountPercent}% OFF
          </div>
        )}

        {/* Product Image */}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className={`w-full h-full object-contain p-2 ${isOutOfStock ? 'opacity-50' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 bg-muted-foreground/10 rounded-lg" />
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
            <span className="bg-background text-foreground text-[10px] font-medium px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* ADD Button */}
        {!isOutOfStock && (
          <div className="absolute bottom-1.5 right-1.5 z-10">
            {quantity === 0 ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                variant="outline"
                size="sm"
                className="h-6 px-3 bg-background border-primary text-primary font-bold text-[10px] hover:bg-primary/10 shadow-sm"
              >
                ADD
              </Button>
            ) : (
              <div className="flex items-center gap-0 bg-primary rounded-md shadow-sm overflow-hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(-1);
                  }}
                  className="p-1 hover:bg-primary/80 text-primary-foreground transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-2 text-primary-foreground font-bold text-xs min-w-[18px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(1);
                  }}
                  className="p-1 hover:bg-primary/80 text-primary-foreground transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 flex flex-col flex-1" onClick={onViewDetails}>
        {/* Product Tags */}
        {productTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {productTags.map((tag, i) => (
              <span 
                key={i}
                className="text-[9px] text-muted-foreground bg-muted px-1 py-0.5 rounded capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-medium text-foreground text-xs leading-tight line-clamp-2 mb-1">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mt-auto flex items-baseline gap-1.5">
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
