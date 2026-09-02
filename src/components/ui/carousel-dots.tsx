import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

export const CarouselDots = ({ api }: { api: CarouselApi | undefined }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (scrollSnaps.length <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-4">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={`h-1.5 rounded-full transition-all ${
            index === selectedIndex ? "w-6 bg-ledger-ink" : "w-2 bg-ledger-rule"
          }`}
        />
      ))}
    </div>
  );
};
