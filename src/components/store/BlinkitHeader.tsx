import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, X, Mic } from "lucide-react";
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
    <header className="sticky top-0 z-30 bg-background border-b border-border">
      {/* Top Bar with Location */}
      <div className="flex items-center justify-between px-4 py-2 bg-primary">
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={storeName} 
              className="h-8 w-8 rounded-lg object-cover bg-background"
            />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                {storeName.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-primary-foreground font-bold text-sm">{storeName}</h1>
            {storeLocation && (
              <div className="flex items-center gap-1 text-primary-foreground/80">
                <MapPin className="h-3 w-3" />
                <span className="text-[10px]">{storeLocation}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Delivery Time Badge */}
        <div className="flex items-center gap-1 bg-accent px-2 py-1 rounded-full">
          <Clock className="h-3 w-3 text-accent-foreground" />
          <span className="text-[10px] text-accent-foreground font-medium">13 mins</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <motion.div 
          className={`relative flex items-center bg-muted rounded-xl transition-all ${
            isFocused ? "ring-2 ring-primary bg-background" : ""
          }`}
          animate={{ scale: isFocused ? 1.01 : 1 }}
        >
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder='Search "products"'
            className="pl-10 pr-16 py-2.5 bg-transparent border-none text-sm placeholder:text-muted-foreground focus-visible:ring-0"
          />
          
          {searchQuery ? (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 p-1 hover:bg-muted-foreground/20 rounded-full"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          ) : (
            <div className="absolute right-3 flex items-center gap-2">
              <div className="w-px h-4 bg-border" />
              <Mic className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default BlinkitHeader;
