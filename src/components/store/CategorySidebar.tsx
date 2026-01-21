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
    <aside className="hidden lg:block w-16 min-h-screen bg-card border-r border-border sticky top-0 overflow-y-auto">
      <div className="py-2">
        {allCategories.map((category) => {
          const isActive = 
            (category === "All" && activeCategory === null) ||
            category === activeCategory;
          const Icon = getCategoryIcon(category);

          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category === "All" ? null : category)}
              className={`w-full flex flex-col items-center gap-0.5 py-2 px-1 transition-colors relative ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r" />
              )}
              
              <div className={`p-1.5 rounded-lg ${
                isActive ? "bg-primary/20" : "bg-muted"
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[8px] font-medium text-center leading-tight line-clamp-1">
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
