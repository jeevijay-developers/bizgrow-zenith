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
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-square bg-gray-50 cursor-pointer"
        onClick={onViewDetails}
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 shadow-sm"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`} 
          />
        </button>

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute top-2 left-2 z-10 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
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
            <div className="w-16 h-16 bg-gray-200 rounded-lg" />
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
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
                className="h-7 px-4 bg-white border-emerald-500 text-emerald-600 font-bold text-xs hover:bg-emerald-50 shadow-md"
              >
                ADD
              </Button>
            ) : (
              <div className="flex items-center gap-0 bg-emerald-500 rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(-1);
                  }}
                  className="p-1.5 hover:bg-emerald-600 text-white transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="px-2.5 text-white font-bold text-sm min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(1);
                  }}
                  className="p-1.5 hover:bg-emerald-600 text-white transition-colors"
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
                className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-1.5">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded">
            <Star className="h-3 w-3 fill-emerald-500 text-emerald-500" />
            <span className="text-[11px] font-semibold text-emerald-700">{rating.toFixed(1)}</span>
          </div>
          <span className="text-[10px] text-gray-400">({count.toLocaleString()})</span>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center gap-1 mb-2">
          <Clock className="h-3 w-3 text-emerald-500" />
          <span className="text-[10px] font-medium text-emerald-600">13 MINS</span>
        </div>

        {/* Price Section */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-bold text-gray-900">₹{product.price}</span>
          {product.compare_price && product.compare_price > product.price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.compare_price}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlinkitProductCard;
