import { useCategoryImages } from "@/hooks/useCategoryImages";

interface CategorySidebarProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryClick: (category: string | null) => void;
}

const CategorySidebar = ({ 
  categories, 
  activeCategory, 
  onCategoryClick 
}: CategorySidebarProps) => {
  const allCategories = ["All", ...categories];
  const { getCategoryImage } = useCategoryImages(categories);

  return (
    <aside className="hidden lg:block w-28 xl:w-32 min-h-screen bg-gradient-to-b from-card to-card/95 border-r border-border/50 sticky top-[140px] self-start overflow-y-auto shadow-sm max-h-[calc(100vh-140px)]">
      <div className="py-4 space-y-1">
        {allCategories.map((category) => {
          const isActive = 
            (category === "All" && activeCategory === null) ||
            category === activeCategory;
          const categoryImage = getCategoryImage(category);

          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category === "All" ? null : category)}
              className={`w-full flex flex-col items-center gap-2 py-3 px-2 transition-all duration-200 relative group ${
                isActive 
                  ? "bg-primary/8" 
                  : "hover:bg-muted/60"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-14 bg-gradient-to-b from-primary to-primary/80 rounded-r-full shadow-sm" />
              )}
              
              <div className={`w-14 h-14 xl:w-16 xl:h-16 rounded-2xl overflow-hidden border-2 transition-all duration-200 shadow-sm group-hover:shadow-md ${
                isActive 
                  ? "border-primary shadow-md ring-2 ring-primary/20" 
                  : "border-transparent group-hover:border-muted-foreground/20"
              }`}>
                <img 
                  src={categoryImage} 
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <span className={`text-[10px] xl:text-xs font-semibold text-center leading-tight line-clamp-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              }`}>
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
