import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface StickyCategoryBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isVisible: boolean;
}

const StickyCategoryBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  isVisible,
}: StickyCategoryBarProps) => {
  if (!isVisible || categories.length === 0) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-[60px] left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
    >
      <div className="flex gap-2 overflow-x-auto py-3 px-4 scrollbar-hide">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          className={`rounded-full flex-shrink-0 h-9 px-5 text-xs font-semibold transition-all ${
            selectedCategory === "all"
              ? "bg-primary text-primary-foreground shadow-md"
              : "border-border bg-card hover:bg-muted"
          }`}
          onClick={() => onCategoryChange("all")}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            className={`rounded-full flex-shrink-0 h-9 px-5 text-xs font-semibold capitalize transition-all ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow-md"
                : "border-border bg-card hover:bg-muted"
            }`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat.replace("-", " ")}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default StickyCategoryBar;
