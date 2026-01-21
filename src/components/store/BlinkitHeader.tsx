import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, X } from "lucide-react";
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
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-3 py-2 bg-primary">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={storeName} 
            className="h-7 w-7 rounded-lg object-cover bg-background"
          />
        ) : (
          <div className="h-7 w-7 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">
              {storeName.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-primary-foreground font-semibold text-sm truncate">{storeName}</h1>
          {storeLocation && (
            <div className="flex items-center gap-1 text-primary-foreground/70">
              <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
              <span className="text-[10px] truncate">{storeLocation}</span>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 py-2">
        <motion.div 
          className={`relative flex items-center bg-muted rounded-lg transition-all ${
            isFocused ? "ring-1 ring-primary bg-background" : ""
          }`}
        >
          <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search products..."
            className="pl-8 pr-8 py-2 h-8 bg-transparent border-none text-xs placeholder:text-muted-foreground focus-visible:ring-0"
          />
          
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 p-0.5 hover:bg-muted-foreground/20 rounded-full"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default BlinkitHeader;
