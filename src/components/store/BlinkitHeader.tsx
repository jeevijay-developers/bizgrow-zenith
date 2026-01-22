import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, Store, Phone, Clock, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface BlinkitHeaderProps {
  storeName: string;
  storeLocation?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  logoUrl?: string | null;
  whatsappNumber?: string | null;
}

const BlinkitHeader = ({
  storeName,
  storeLocation,
  searchQuery,
  onSearchChange,
  logoUrl,
  whatsappNumber,
}: BlinkitHeaderProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      {/* Top Announcement Bar - Desktop Only */}
      <div className="hidden lg:block bg-muted/50 border-b border-border/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-primary" />
              Open Now
            </span>
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="h-3 w-3 text-primary" />
              Free delivery above ₹500
            </span>
          </div>
          {whatsappNumber && (
            <a 
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone className="h-3 w-3" />
              Contact Us
            </a>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary/95">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 lg:px-6 py-3 lg:py-4">
          {/* Logo */}
          {logoUrl ? (
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={logoUrl} 
              alt={storeName} 
              className="h-10 w-10 lg:h-14 lg:w-14 rounded-xl lg:rounded-2xl object-cover bg-background shadow-lg ring-2 ring-white/20"
            />
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-10 w-10 lg:h-14 lg:w-14 rounded-xl lg:rounded-2xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shadow-lg ring-2 ring-white/20"
            >
              <Store className="h-5 w-5 lg:h-7 lg:w-7 text-primary-foreground" />
            </motion.div>
          )}
          
          {/* Store Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <motion.h1 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-primary-foreground font-bold text-base lg:text-2xl truncate tracking-tight"
              >
                {storeName}
              </motion.h1>
              <Badge className="hidden lg:flex bg-white/20 text-primary-foreground border-0 text-[10px] font-semibold">
                Verified Store
              </Badge>
            </div>
            {storeLocation && (
              <motion.div 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-1.5 text-primary-foreground/80"
              >
                <MapPin className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                <span className="text-xs lg:text-sm truncate font-medium">{storeLocation}</span>
              </motion.div>
            )}
          </div>

          {/* Desktop Search Bar - In Header */}
          <div className="hidden lg:block flex-1 max-w-xl">
            <motion.div 
              animate={{ 
                boxShadow: isFocused 
                  ? "0 8px 32px -8px rgba(0, 0, 0, 0.2)" 
                  : "0 2px 8px 0 rgba(0, 0, 0, 0.08)"
              }}
              className={`relative flex items-center bg-background rounded-2xl transition-all duration-200 ${
                isFocused ? "ring-2 ring-white/30" : ""
              }`}
            >
              <Search className={`absolute left-4 h-5 w-5 transition-colors duration-200 ${
                isFocused ? "text-primary" : "text-muted-foreground"
              }`} />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search for products..."
                className="pl-12 pr-10 py-3 h-12 bg-transparent border-none text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 font-medium"
              />
              
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 p-1.5 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 py-3">
        <motion.div 
          animate={{ 
            boxShadow: isFocused 
              ? "0 4px 20px -4px hsl(var(--primary) / 0.2)" 
              : "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
          }}
          className={`relative flex items-center bg-muted/60 rounded-xl transition-all duration-200 ${
            isFocused ? "ring-2 ring-primary/30 bg-background" : ""
          }`}
        >
          <Search className={`absolute left-3 h-4 w-4 transition-colors duration-200 ${
            isFocused ? "text-primary" : "text-muted-foreground"
          }`} />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search products..."
            className="pl-10 pr-10 py-3 h-10 bg-transparent border-none text-sm placeholder:text-muted-foreground/70 focus-visible:ring-0 font-medium"
          />
          
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => onSearchChange("")}
                className="absolute right-3 p-1.5 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
};

export default BlinkitHeader;
