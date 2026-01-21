import { useState } from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";
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
  { value: "relevance", label: "Relevance" },
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 py-3 px-4 bg-card border-b border-border overflow-x-auto">
      {/* Filters Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`flex-shrink-0 h-8 text-xs font-medium border-border ${
          filtersOpen ? "bg-primary/10 border-primary text-primary" : ""
        }`}
      >
        <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
        Filters
      </Button>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 h-8 text-xs font-medium border-border"
          >
            Sort
            <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className="flex items-center justify-between"
            >
              {option.label}
              {currentSort === option.value && (
                <Check className="h-4 w-4 text-primary" />
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
            className={`flex-shrink-0 h-8 text-xs font-medium border-border ${
              currentPriceFilter ? "bg-primary/10 border-primary text-primary" : ""
            }`}
          >
            Price
            <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          {priceFilters.map((filter) => (
            <DropdownMenuItem
              key={filter.value ?? "all"}
              onClick={() => onPriceFilterChange(filter.value)}
              className="flex items-center justify-between"
            >
              {filter.label}
              {currentPriceFilter === filter.value && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Quick Category Pills (visible on mobile) */}
      <div className="lg:hidden flex items-center gap-2 ml-2">
        <span className="text-xs text-muted-foreground flex-shrink-0">|</span>
        <div className="flex gap-2">
          {["Popular", "New", "Offers"].map((tag) => (
            <button
              key={tag}
              className="flex-shrink-0 text-xs text-muted-foreground hover:text-primary font-medium transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
