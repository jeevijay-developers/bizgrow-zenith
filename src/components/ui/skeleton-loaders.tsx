import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

// Product Card Skeleton
export const ProductCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-4 border border-border", className)}>
    <Skeleton className="aspect-square rounded-xl mb-3" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-3 w-1/2 mb-3" />
    <div className="flex justify-between items-center">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

// Store Card Skeleton
export const StoreCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-5 border border-border", className)}>
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-3 w-full mb-2" />
    <Skeleton className="h-3 w-2/3" />
  </div>
);

// Dashboard Stats Skeleton
export const DashboardStatsSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="w-12 h-4" />
        </div>
        <Skeleton className="h-7 w-20 mb-1" />
        <Skeleton className="h-3 w-16" />
      </div>
    ))}
  </div>
);

// Order List Skeleton
export const OrderListSkeleton = ({ count = 3, className }: { count?: number; className?: string }) => (
  <div className={cn("space-y-3", className)}>
    {[...Array(count)].map((_, i) => (
      <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="text-right">
          <Skeleton className="h-4 w-16 mb-1" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    ))}
  </div>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, cols = 4, className }: { rows?: number; cols?: number; className?: string }) => (
  <div className={cn("bg-card rounded-xl border border-border overflow-hidden", className)}>
    {/* Header */}
    <div className="bg-muted/50 px-4 py-3 flex gap-4">
      {[...Array(cols)].map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
    {/* Rows */}
    <div className="divide-y divide-border">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="px-4 py-3 flex gap-4">
          {[...Array(cols)].map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Feature Card Skeleton
export const FeatureCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-6 border border-border", className)}>
    <Skeleton className="w-12 h-12 rounded-xl mb-4" />
    <Skeleton className="h-5 w-3/4 mb-2" />
    <Skeleton className="h-3 w-full mb-1" />
    <Skeleton className="h-3 w-2/3" />
  </div>
);

// Testimonial Card Skeleton
export const TestimonialCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-6 border border-border", className)}>
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="w-4 h-4" />
      ))}
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-6" />
    <div className="flex items-center gap-3">
      <Skeleton className="w-11 h-11 rounded-xl" />
      <div>
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  </div>
);

// Pricing Card Skeleton
export const PricingCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-8 border border-border", className)}>
    <div className="text-center mb-6">
      <Skeleton className="w-12 h-12 rounded-xl mx-auto mb-4" />
      <Skeleton className="h-5 w-20 mx-auto mb-2" />
      <Skeleton className="h-8 w-24 mx-auto mb-2" />
      <Skeleton className="h-3 w-40 mx-auto" />
    </div>
    <div className="space-y-3 mb-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-3 flex-1" />
        </div>
      ))}
    </div>
    <Skeleton className="h-12 w-full rounded-xl" />
  </div>
);

// Avatar Group Skeleton
export const AvatarGroupSkeleton = ({ count = 4, className }: { count?: number; className?: string }) => (
  <div className={cn("flex -space-x-2", className)}>
    {[...Array(count)].map((_, i) => (
      <Skeleton key={i} className="w-8 h-8 rounded-full border-2 border-background" />
    ))}
  </div>
);

// Profile Card Skeleton
export const ProfileCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("bg-card rounded-2xl p-6 border border-border", className)}>
    <div className="flex items-center gap-4 mb-4">
      <Skeleton className="w-16 h-16 rounded-xl" />
      <div className="flex-1">
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  </div>
);

// Page Header Skeleton
export const PageHeaderSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("text-center max-w-3xl mx-auto mb-12", className)}>
    <Skeleton className="h-6 w-40 mx-auto mb-4 rounded-full" />
    <Skeleton className="h-10 w-3/4 mx-auto mb-2" />
    <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
    <Skeleton className="h-4 w-2/3 mx-auto" />
  </div>
);

// Grid Skeleton
export const GridSkeleton = ({ 
  count = 6, 
  columns = 3,
  children,
  className 
}: { 
  count?: number; 
  columns?: number;
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn(`grid gap-4`, className)} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
    {[...Array(count)].map((_, i) => (
      <div key={i}>{children || <FeatureCardSkeleton />}</div>
    ))}
  </div>
);
