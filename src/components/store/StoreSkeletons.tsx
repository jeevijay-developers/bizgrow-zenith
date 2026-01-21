import { motion } from "framer-motion";

// Enhanced Shimmer animation component with smoother gradient
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br from-muted/60 to-muted rounded-2xl ${className}`}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ 
        repeat: Infinity, 
        duration: 1.2, 
        ease: "easeInOut",
        repeatDelay: 0.3
      }}
    />
  </div>
);

// Product Card Skeleton - matches BlinkitProductCard dimensions
export const ProductCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.4, 
      delay: index * 0.05,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm"
  >
    {/* Image placeholder */}
    <div className="relative aspect-square">
      <Shimmer className="w-full h-full rounded-none" />
      {/* Favorite button placeholder */}
      <div className="absolute top-2 right-2">
        <Shimmer className="w-7 h-7 rounded-full" />
      </div>
      {/* ADD button placeholder */}
      <div className="absolute bottom-2 right-2">
        <Shimmer className="w-14 h-7 rounded-full" />
      </div>
    </div>
    
    {/* Content */}
    <div className="p-2.5 space-y-2">
      {/* Tag */}
      <Shimmer className="h-4 w-12 rounded-md" />
      {/* Product name */}
      <Shimmer className="h-4 w-full rounded-lg" />
      <Shimmer className="h-4 w-3/4 rounded-lg" />
      {/* Price */}
      <div className="flex items-center gap-2 pt-1">
        <Shimmer className="h-5 w-14 rounded-lg" />
        <Shimmer className="h-3 w-10 rounded-lg" />
      </div>
    </div>
  </motion.div>
);

// Product Grid Skeleton with staggered animation
export const ProductGridSkeleton = ({ count = 12 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} index={i} />
    ))}
  </div>
);

// Category Tab Skeleton
export const CategoryTabSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    className="flex-shrink-0 flex flex-col items-center gap-1.5 px-1 py-1.5"
  >
    <Shimmer className="w-14 h-14 rounded-2xl" />
    <Shimmer className="h-3 w-12 rounded-md" />
  </motion.div>
);

// Category Tabs Skeleton (Mobile)
export const CategoryTabsSkeleton = () => (
  <div className="flex items-center gap-3 py-3 px-4 bg-card border-b border-border/50 overflow-hidden lg:hidden">
    {Array.from({ length: 6 }).map((_, i) => (
      <CategoryTabSkeleton key={i} index={i} />
    ))}
  </div>
);

// Filter Bar Skeleton
export const FilterBarSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-2 py-2.5 px-4 bg-card border-b border-border/50"
  >
    <Shimmer className="h-8 w-24 rounded-lg" />
    <Shimmer className="h-8 w-20 rounded-lg" />
  </motion.div>
);

// Header Skeleton
export const HeaderSkeleton = () => (
  <div className="sticky top-0 z-30 bg-background border-b border-border/50">
    {/* Top Bar */}
    <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/90">
      <Shimmer className="h-8 w-8 rounded-xl" />
      <div className="flex-1 space-y-1.5">
        <Shimmer className="h-4 w-28 rounded-lg bg-white/20" />
        <Shimmer className="h-3 w-20 rounded-lg bg-white/15" />
      </div>
    </div>
    {/* Search Bar */}
    <div className="px-3 py-2.5">
      <Shimmer className="h-9 w-full rounded-xl" />
    </div>
  </div>
);

// Sidebar Skeleton (Desktop)
export const SidebarSkeleton = () => (
  <aside className="hidden lg:block w-22 min-h-screen bg-card border-r border-border/50 sticky top-0">
    <div className="py-3 space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col items-center gap-1.5 py-2.5 px-2"
        >
          <Shimmer className="w-13 h-13 rounded-2xl" />
          <Shimmer className="h-2.5 w-10 rounded-md" />
        </motion.div>
      ))}
    </div>
  </aside>
);

// Banner Skeleton
export const BannerSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative h-[120px] md:h-[140px] mx-3 my-3 rounded-2xl overflow-hidden"
  >
    <Shimmer className="w-full h-full" />
  </motion.div>
);

// Stats Bar Skeleton
export const StatsBarSkeleton = () => (
  <div className="flex gap-3 px-4 mt-5 overflow-hidden">
    {[1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="flex items-center gap-3 px-4 py-3 rounded-2xl flex-shrink-0 border border-border/50"
      >
        <Shimmer className="w-10 h-10 rounded-xl" />
        <Shimmer className="h-4 w-20" />
      </motion.div>
    ))}
  </div>
);

// Category Pills Skeleton (Legacy)
export const CategoryPillsSkeleton = () => (
  <div className="flex gap-2 px-4 mt-5 overflow-hidden">
    {[1, 2, 3, 4, 5].map((i) => (
      <Shimmer key={i} className="h-11 w-24 rounded-full flex-shrink-0" />
    ))}
  </div>
);

// Full Page Loading Skeleton
export const StorePageSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-muted"
  >
    {/* Header */}
    <HeaderSkeleton />
    
    {/* Category Tabs (Mobile) */}
    <CategoryTabsSkeleton />
    
    {/* Filter Bar */}
    <FilterBarSkeleton />
    
    {/* Main Content */}
    <div className="flex">
      {/* Sidebar (Desktop) */}
      <SidebarSkeleton />
      
      {/* Products Grid */}
      <main className="flex-1 px-3 py-3">
        <ProductGridSkeleton count={12} />
      </main>
    </div>
  </motion.div>
);

export default StorePageSkeleton;
