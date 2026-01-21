import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, Store } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlinkitHeaderProps {
  storeName: string;
  storeLocation?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  logoUrl?: string | null;
}

const BlinkitHeader = ({
  storeName,
  storeLocation,
  searchQuery,
  onSearchChange,
  logoUrl,
}: BlinkitHeaderProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary/95">
        <div className="max-w-7xl mx-auto flex items-center gap-3 px-4 lg:px-6 py-3">
          {logoUrl ? (
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={logoUrl} 
              alt={storeName} 
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl object-cover bg-background shadow-md ring-2 ring-white/20"
            />
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shadow-md ring-2 ring-white/20"
            >
              <Store className="h-5 w-5 lg:h-6 lg:w-6 text-primary-foreground" />
            </motion.div>
          )}
          <div className="flex-1 min-w-0">
            <motion.h1 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-primary-foreground font-bold text-base lg:text-xl truncate tracking-tight"
            >
              {storeName}
            </motion.h1>
            {storeLocation && (
              <motion.div 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-1 text-primary-foreground/80"
              >
                <MapPin className="h-3 w-3 lg:h-3.5 lg:w-3.5 flex-shrink-0" />
                <span className="text-xs lg:text-sm truncate font-medium">{storeLocation}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
        <motion.div 
          animate={{ 
            boxShadow: isFocused 
              ? "0 4px 20px -4px hsl(var(--primary) / 0.2)" 
              : "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
          }}
          className={`relative flex items-center bg-muted/60 rounded-xl lg:rounded-2xl transition-all duration-200 max-w-2xl ${
            isFocused ? "ring-2 ring-primary/30 bg-background" : ""
          }`}
        >
          <Search className={`absolute left-3 lg:left-4 h-4 w-4 lg:h-5 lg:w-5 transition-colors duration-200 ${
            isFocused ? "text-primary" : "text-muted-foreground"
          }`} />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search products..."
            className="pl-10 lg:pl-12 pr-10 py-3 h-10 lg:h-12 bg-transparent border-none text-sm lg:text-base placeholder:text-muted-foreground/70 focus-visible:ring-0 font-medium"
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
