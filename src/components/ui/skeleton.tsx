import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shimmer?: boolean;
}

function Skeleton({ className, shimmer = false, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-muted",
        shimmer
          ? "relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer"
          : "animate-pulse",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
