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
  Package
} from "lucide-react";

interface CategorySidebarProps {
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
    "electronics": Smartphone,
    "mobile": Smartphone,
  };

  const lowerCategory = category.toLowerCase();
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (lowerCategory.includes(key)) {
      return Icon;
    }
  }
  return Package;
};

const CategorySidebar = ({ 
  categories, 
  activeCategory, 
  onCategoryClick 
}: CategorySidebarProps) => {
  const allCategories = ["All", ...categories];

  return (
    <aside className="hidden lg:block w-20 min-h-screen bg-card border-r border-border sticky top-0 overflow-y-auto">
      <div className="py-4">
        {allCategories.map((category) => {
          const isActive = 
            (category === "All" && activeCategory === null) ||
            category === activeCategory;
          const Icon = getCategoryIcon(category);

          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category === "All" ? null : category)}
              className={`w-full flex flex-col items-center gap-1 py-3 px-2 transition-colors relative ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r" />
              )}
              
              <div className={`p-2 rounded-xl ${
                isActive ? "bg-primary/20" : "bg-muted"
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-medium text-center leading-tight line-clamp-2">
                {category}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default CategorySidebar;
