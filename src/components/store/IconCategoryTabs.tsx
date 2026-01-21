import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Milk, 
  Apple, 
  Cake, 
  Coffee, 
  Sparkles,
  Shirt,
  Home,
  Smartphone,
  Package,
  Snowflake,
  Tv,
  Lamp
} from "lucide-react";

interface IconCategoryTabsProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryClick: (category: string | null) => void;
}

// Map category names to icons
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, React.ElementType> = {
    "all": ShoppingBag,
    "dairy": Milk,
    "fruits": Apple,
    "vegetables": Apple,
    "bakery": Cake,
    "beverages": Coffee,
    "beauty": Sparkles,
    "cosmetics": Sparkles,
    "clothing": Shirt,
    "fashion": Shirt,
    "home": Home,
    "decor": Lamp,
    "electronics": Tv,
    "mobile": Smartphone,
    "winter": Snowflake,
  };

  const lowerCategory = category.toLowerCase();
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (lowerCategory.includes(key)) {
      return Icon;
    }
  }
  return Package;
};

const IconCategoryTabs = ({ 
  categories, 
  activeCategory, 
  onCategoryClick 
}: IconCategoryTabsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const allCategories = ["All", ...categories];

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const element = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      if (elementRect.left < containerRect.left || elementRect.right > containerRect.right) {
        element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [activeCategory]);

  return (
    <div 
      ref={scrollRef}
      className="flex items-center gap-1 py-2 px-3 bg-card border-b border-border overflow-x-auto scrollbar-hide lg:hidden"
    >
      {allCategories.map((category) => {
        const isActive = 
          (category === "All" && activeCategory === null) ||
          category === activeCategory;
        const Icon = getCategoryIcon(category);

        return (
          <button
            key={category}
            ref={isActive ? activeRef : null}
            onClick={() => onCategoryClick(category === "All" ? null : category)}
            className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
              isActive 
                ? "bg-primary/10" 
                : "hover:bg-muted"
            }`}
          >
            <motion.div 
              className={`p-1.5 rounded-lg transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-4 w-4" />
            </motion.div>
            <span className={`text-[9px] font-medium whitespace-nowrap ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}>
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default IconCategoryTabs;
