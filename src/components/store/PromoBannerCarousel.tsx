import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gift, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Promotion {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  is_active: boolean;
  image_url?: string | null;
}

interface PromoBannerCarouselProps {
  promotions: Promotion[];
  autoPlayInterval?: number;
  className?: string;
}

const PromoBannerCarousel = ({
  promotions,
  autoPlayInterval = 4000,
  className = "",
}: PromoBannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activePromos = promotions.filter((p) => p.is_active);

  const nextSlide = useCallback(() => {
    if (activePromos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activePromos.length);
  }, [activePromos.length]);

  const prevSlide = useCallback(() => {
    if (activePromos.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activePromos.length) % activePromos.length);
  }, [activePromos.length]);

  // Auto-play
  useEffect(() => {
    if (isPaused || activePromos.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, autoPlayInterval, activePromos.length]);

  if (activePromos.length === 0) return null;

  const currentPromo = activePromos[currentIndex];

  // Gradient backgrounds based on index
  const gradients = [
    "from-primary via-primary/90 to-primary/80",
    "from-violet-600 via-purple-600 to-indigo-600",
    "from-rose-500 via-pink-500 to-fuchsia-500",
    "from-amber-500 via-orange-500 to-red-500",
    "from-emerald-500 via-teal-500 to-cyan-500",
  ];

  const currentGradient = gradients[currentIndex % gradients.length];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPromo.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`relative p-6 rounded-3xl overflow-hidden bg-gradient-to-br ${currentGradient} shadow-xl`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute top-4 right-4 opacity-20"
          >
            <Sparkles className="w-16 h-16 text-white" />
          </motion.div>

          {/* Content */}
          <div className="relative text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {currentPromo.discount_percentage && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-lg font-bold px-4 py-1.5 mb-3 shadow-lg">
                      <Gift className="w-4 h-4 mr-2" />
                      {currentPromo.discount_percentage}% OFF
                    </Badge>
                  </motion.div>
                )}
                {currentPromo.discount_amount && !currentPromo.discount_percentage && (
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-lg font-bold px-4 py-1.5 mb-3 shadow-lg">
                    <Gift className="w-4 h-4 mr-2" />
                    ₹{currentPromo.discount_amount} OFF
                  </Badge>
                )}

                <h4 className="font-bold text-xl md:text-2xl leading-tight">
                  {currentPromo.title}
                </h4>
                {currentPromo.description && (
                  <p className="text-sm md:text-base opacity-90 mt-2 line-clamp-2 max-w-md">
                    {currentPromo.description}
                  </p>
                )}
              </div>
            </div>

            {/* Progress Dots */}
            {activePromos.length > 1 && (
              <div className="flex items-center gap-2 mt-5">
                {activePromos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
                <span className="ml-auto text-xs opacity-70">
                  {currentIndex + 1}/{activePromos.length}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {activePromos.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default PromoBannerCarousel;
