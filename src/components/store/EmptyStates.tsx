import { motion } from "framer-motion";
import { 
  ShoppingBag, Search, Package, Heart, 
  ShoppingCart, Star, AlertCircle, WifiOff 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ElementType;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState = ({
  title,
  description,
  icon: Icon = Package,
  action,
  className = "",
}: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", duration: 0.5 }}
    className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
  >
    {/* Animated Icon Container */}
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      className="relative mb-6"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl scale-150" />
      
      {/* Icon Circle */}
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border/50 shadow-xl">
        <Icon className="w-12 h-12 text-muted-foreground/50" />
      </div>

      {/* Decorative Dots */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0 }}
        className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary/30"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
        className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-accent/30"
      />
    </motion.div>

    {/* Text Content */}
    <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
      {description}
    </p>

    {/* Action Button */}
    {action && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <Button
          onClick={action.onClick}
          className="rounded-full px-6 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          {action.label}
        </Button>
      </motion.div>
    )}
  </motion.div>
);

// Pre-configured empty states
export const NoProductsFound = ({ 
  searchQuery, 
  onClearSearch,
  onClearFilters 
}: { 
  searchQuery?: string;
  onClearSearch?: () => void;
  onClearFilters?: () => void;
}) => (
  <EmptyState
    icon={searchQuery ? Search : ShoppingBag}
    title={searchQuery ? "No results found" : "No products yet"}
    description={
      searchQuery
        ? `We couldn't find any products matching "${searchQuery}". Try a different search term.`
        : "This store is setting up their catalogue. Check back soon for amazing products!"
    }
    action={
      onClearFilters
        ? { label: "Clear Filters", onClick: onClearFilters }
        : searchQuery && onClearSearch
        ? { label: "Clear Search", onClick: onClearSearch }
        : undefined
    }
  />
);

export const EmptyCart = ({ onContinueShopping }: { onContinueShopping?: () => void }) => (
  <EmptyState
    icon={ShoppingCart}
    title="Your cart is empty"
    description="Looks like you haven't added any items yet. Start shopping to fill your cart!"
    action={
      onContinueShopping
        ? { label: "Start Shopping", onClick: onContinueShopping }
        : undefined
    }
  />
);

export const NoFavorites = ({ onBrowseProducts }: { onBrowseProducts?: () => void }) => (
  <EmptyState
    icon={Heart}
    title="No favorites yet"
    description="Tap the heart icon on products you love to save them here for later."
    action={
      onBrowseProducts
        ? { label: "Browse Products", onClick: onBrowseProducts }
        : undefined
    }
  />
);

export const StoreNotFound = ({ onGoHome }: { onGoHome?: () => void }) => (
  <EmptyState
    icon={AlertCircle}
    title="Store not found"
    description="This store doesn't exist or is currently unavailable. Please check the link and try again."
    action={onGoHome ? { label: "Go Home", onClick: onGoHome } : undefined}
  />
);

export const NetworkError = ({ onRetry }: { onRetry?: () => void }) => (
  <EmptyState
    icon={WifiOff}
    title="Connection error"
    description="We're having trouble loading this page. Please check your internet connection and try again."
    action={onRetry ? { label: "Try Again", onClick: onRetry } : undefined}
  />
);

export default EmptyState;
