import { motion } from "framer-motion";
import { MapPin, Truck, Store, Star, Verified, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CompactBannerProps {
  storeName: string;
  storeCategory: string;
  storeCity: string;
  logoUrl?: string | null;
  bannerImageUrl?: string | null;
  bannerText?: string | null;
  bannerSubtitle?: string | null;
  tagline?: string | null;
  hasDelivery?: boolean;
  hasTakeaway?: boolean;
  themeColor?: string;
}

const CompactBanner = ({
  storeName,
  storeCategory,
  storeCity,
  logoUrl,
  bannerImageUrl,
  bannerText,
  bannerSubtitle,
  tagline,
  hasDelivery = false,
  hasTakeaway = true,
  themeColor,
}: CompactBannerProps) => {
  // Get store initials for fallback
  const storeInitials = storeName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-4 mt-4"
    >
      <div 
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "180px", minHeight: "140px" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: bannerImageUrl
              ? `url(${bannerImageUrl}) center/cover`
              : `linear-gradient(135deg, hsl(284 100% 15%) 0%, hsl(284 100% 22%) 40%, hsl(42 100% 70%) 100%)`,
          }}
        />

        {/* Overlay - darker for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

        {/* Decorative Elements - BizGrow inspired patterns */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="80" cy="20" r="30" fill="hsl(42 100% 70%)" />
            <circle cx="90" cy="40" r="15" fill="hsl(42 100% 70%)" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="20" cy="80" r="20" fill="white" />
          </svg>
        </div>

        {/* Sparkle decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-4 right-4 opacity-30"
        >
          <Sparkles className="w-6 h-6 text-accent" />
        </motion.div>

        {/* Content */}
        <div className="relative h-full flex items-center p-5 md:p-6">
          {/* Store Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex-shrink-0 mr-4"
          >
            <Avatar className="h-16 w-16 md:h-20 md:w-20 ring-4 ring-white/20 shadow-2xl">
              <AvatarImage src={logoUrl || ""} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground text-lg md:text-xl font-bold">
                {storeInitials}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Store Info */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Store Name */}
              <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg truncate">
                {bannerText || storeName}
              </h2>

              {/* Tagline */}
              {(bannerSubtitle || tagline) && (
                <p className="text-sm md:text-base text-white/80 mt-0.5 truncate drop-shadow">
                  {bannerSubtitle || tagline}
                </p>
              )}

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {/* Location */}
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/20 text-xs px-2.5 py-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {storeCity}
                </Badge>

                {/* Category */}
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/20 text-xs px-2.5 py-1 capitalize">
                  <Store className="w-3 h-3 mr-1" />
                  {storeCategory.replace("-", " ")}
                </Badge>

                {/* Delivery Badge */}
                {hasDelivery && (
                  <Badge className="bg-emerald-500/90 backdrop-blur-sm text-white border-0 text-xs px-2.5 py-1">
                    <Truck className="w-3 h-3 mr-1" />
                    Delivery
                  </Badge>
                )}

                {/* Rating */}
                <Badge className="bg-accent/90 backdrop-blur-sm text-accent-foreground border-0 text-xs px-2.5 py-1 hidden sm:flex">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  4.8
                </Badge>
              </div>
            </motion.div>
          </div>

          {/* Verified Badge - Desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex flex-shrink-0 ml-4"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <div className="flex flex-col items-center gap-1">
                <Verified className="w-6 h-6 text-accent" />
                <span className="text-[10px] text-white/80 font-medium">Verified</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </motion.div>
  );
};

export default CompactBanner;
