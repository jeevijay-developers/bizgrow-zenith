import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
  children: ReactNode[];
  /** Tailwind width class for each slide — controls how much of the next card peeks in. */
  slideClassName?: string;
  className?: string;
  align?: "start" | "center";
  startIndex?: number;
}

/**
 * Swipeable, scroll-snap-backed carousel for mobile breakpoints.
 * Render this alongside a `hidden md:grid ...` desktop layout, wrapped in `md:hidden`.
 */
export function MobileCarousel({
  children,
  slideClassName = "w-[85%]",
  className,
  align = "start",
  startIndex = 0,
}: MobileCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    containScroll: "trimSnaps",
    startIndex,
  });
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={className}>
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-4">
          {children.map((child, i) => (
            <div key={i} className={cn("shrink-0", slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-border"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
