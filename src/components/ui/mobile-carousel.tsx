import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface MobileCarouselProps {
  children: ReactNode[];
  /** Tailwind width class for each slide — controls how much of the next card peeks in (default: w-[80%], leaving ~20% peek). */
  slideClassName?: string;
  className?: string;
  containerClassName?: string;
  align?: "start" | "center";
  startIndex?: number;
  /** How many slides one swipe advances. Default 1 (swipe reveals the next single card). */
  slidesToScroll?: number;
  /** Whether the carousel should allow bleeding across container padding on mobile. Default true. */
  bleed?: boolean;
  /** Custom gap between slides. Default: gap-3.5 sm:gap-4. */
  gapClassName?: string;
}

/**
 * Swipeable, scroll-snap-backed carousel with a deliberate 15-20% "peek"
 * of adjacent cards on mobile breakpoints.
 */
export function MobileCarousel({
  children,
  slideClassName = "w-[80%]",
  className,
  containerClassName,
  align = "center",
  startIndex = 0,
  slidesToScroll = 1,
  bleed = false,
  gapClassName = "gap-3.5 sm:gap-4",
}: MobileCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    containScroll: "trimSnaps",
    startIndex,
    slidesToScroll,
  });
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Re-reads the snap list — must run on every "reInit", not just on mount.
  // Embla recalculates snaps (via its internal ResizeObserver) once images/fonts
  // finish loading and the slide widths settle, which can happen after first
  // paint; without this the dots can be missing or wrong until a full reload
  // happens to load everything from cache before Embla's first measurement.
  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onInit);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className={cn("w-full min-w-0 max-w-full", className)}>
      <div
        className={cn(
          "overflow-hidden w-full min-w-0",
          bleed && "-mx-4 px-4 w-[calc(100%+2rem)]",
          containerClassName
        )}
        ref={emblaRef}
      >
        <div className={cn("flex", gapClassName)}>
          {children.map((child, i) => (
            <div key={i} className={cn("shrink-0 min-w-0", slideClassName)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 p-0.5",
                i === selectedIndex
                  ? "w-6 bg-primary shadow-xs"
                  : "w-2 bg-primary/20 hover:bg-primary/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MobileCarousel;
