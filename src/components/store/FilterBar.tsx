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
  return (
    <div className="flex items-center gap-1.5 py-2 px-3 bg-card border-b border-border overflow-x-auto">
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 h-7 text-[10px] font-medium border-border px-2"
          >
            Sort
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className="flex items-center justify-between text-xs"
            >
              {option.label}
              {currentSort === option.value && (
                <Check className="h-3 w-3 text-primary" />
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
            className={`flex-shrink-0 h-7 text-[10px] font-medium border-border px-2 ${
              currentPriceFilter ? "bg-primary/10 border-primary text-primary" : ""
            }`}
          >
            Price
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-32">
          {priceFilters.map((filter) => (
            <DropdownMenuItem
              key={filter.value ?? "all"}
              onClick={() => onPriceFilterChange(filter.value)}
              className="flex items-center justify-between text-xs"
            >
              {filter.label}
              {currentPriceFilter === filter.value && (
                <Check className="h-3 w-3 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterBar;
