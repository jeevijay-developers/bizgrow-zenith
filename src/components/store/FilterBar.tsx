import { ArrowUpDown, IndianRupee, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  onSortChange: (sort: string) => void;
  onPriceFilterChange: (filter: string | null) => void;
  currentSort: string;
  currentPriceFilter: string | null;
}

const sortOptions = [
  { value: "relevance", label: "Relevance", icon: Sparkles },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "discount", label: "Discount" },
  { value: "newest", label: "Newest First" },
];

const priceFilters = [
  { value: null, label: "All Prices" },
  { value: "0-100", label: "Under ₹100" },
  { value: "100-500", label: "₹100 - ₹500" },
  { value: "500-1000", label: "₹500 - ₹1000" },
  { value: "1000+", label: "Above ₹1000" },
];

const FilterBar = ({
  onSortChange,
  onPriceFilterChange,
  currentSort,
  currentPriceFilter,
}: FilterBarProps) => {
  const activeSort = sortOptions.find(o => o.value === currentSort);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 py-2.5 px-4 bg-gradient-to-r from-card via-card/95 to-card border-b border-border/50 overflow-x-auto scrollbar-hide"
    >
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 h-8 text-[11px] font-semibold border-border/60 px-3 gap-1.5 bg-background/80 hover:bg-muted/80 shadow-sm"
          >
            <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
            {activeSort?.label || "Sort"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44 p-1.5">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`flex items-center justify-between text-xs rounded-lg px-3 py-2 cursor-pointer ${
                currentSort === option.value ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <span className="font-medium">{option.label}</span>
              {currentSort === option.value && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Price Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`flex-shrink-0 h-8 text-[11px] font-semibold border-border/60 px-3 gap-1.5 shadow-sm transition-all ${
              currentPriceFilter 
                ? "bg-primary/10 border-primary/50 text-primary hover:bg-primary/15" 
                : "bg-background/80 hover:bg-muted/80"
            }`}
          >
            <IndianRupee className="h-3 w-3" />
            {currentPriceFilter 
              ? priceFilters.find(f => f.value === currentPriceFilter)?.label 
              : "Price"
            }
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-36 p-1.5">
          {priceFilters.map((filter) => (
            <DropdownMenuItem
              key={filter.value ?? "all"}
              onClick={() => onPriceFilterChange(filter.value)}
              className={`flex items-center justify-between text-xs rounded-lg px-3 py-2 cursor-pointer ${
                currentPriceFilter === filter.value ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <span className="font-medium">{filter.label}</span>
              {currentPriceFilter === filter.value && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default FilterBar;
