import { motion } from "framer-motion";

// Shimmer animation component
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-muted rounded-2xl ${className}`}>
    <motion.div
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ translateX: ["−100%", "100%"] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    />
  </div>
);

// Banner Skeleton
export const BannerSkeleton = () => (
  <div className="relative h-[180px] md:h-[220px] mx-4 mt-4 rounded-3xl overflow-hidden">
    <Shimmer className="w-full h-full" />
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      <Shimmer className="h-8 w-48 mb-2" />
      <Shimmer className="h-4 w-32" />
    </div>
  </div>
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

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-3xl border border-border overflow-hidden"
  >
    <Shimmer className="aspect-[4/3] w-full rounded-none" />
    <div className="p-4 space-y-3">
      <Shimmer className="h-5 w-3/4" />
      <Shimmer className="h-4 w-1/2" />
      <div className="flex items-center justify-between pt-2">
        <Shimmer className="h-6 w-20" />
        <Shimmer className="h-10 w-10 rounded-full" />
      </div>
    </div>
  </motion.div>
);

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// Category Pills Skeleton
export const CategoryPillsSkeleton = () => (
  <div className="flex gap-2 px-4 mt-5 overflow-hidden">
    {[1, 2, 3, 4, 5].map((i) => (
      <Shimmer key={i} className="h-11 w-24 rounded-full flex-shrink-0" />
    ))}
  </div>
);

// Full Page Loading Skeleton
export const StorePageSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
    {/* Header Skeleton */}
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Shimmer className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Shimmer className="h-5 w-32" />
            <Shimmer className="h-3 w-24" />
          </div>
        </div>
        <div className="flex gap-2">
          <Shimmer className="h-10 w-10 rounded-full" />
          <Shimmer className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>

    {/* Banner Skeleton */}
    <BannerSkeleton />

    {/* Stats Skeleton */}
    <StatsBarSkeleton />

    {/* Search Skeleton */}
    <div className="px-4 mt-6">
      <Shimmer className="h-14 w-full rounded-2xl" />
    </div>

    {/* Categories Skeleton */}
    <CategoryPillsSkeleton />

    {/* Products Header Skeleton */}
    <div className="flex items-center justify-between px-4 mt-6 mb-4">
      <div className="space-y-2">
        <Shimmer className="h-6 w-32" />
        <Shimmer className="h-4 w-24" />
      </div>
    </div>

    {/* Products Grid Skeleton */}
    <ProductGridSkeleton count={4} />
  </div>
);

export default StorePageSkeleton;
