import { useCategoryImages } from "@/hooks/useCategoryImages";
import { motion } from "framer-motion";
import { Package, Sparkles } from "lucide-react";

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
    <aside className="hidden lg:flex flex-col w-36 xl:w-44 min-h-screen bg-gradient-to-b from-card via-card to-muted/30 border-r border-border/50 sticky top-[180px] self-start overflow-y-auto shadow-lg max-h-[calc(100vh-180px)]">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Categories</p>
            <p className="text-[10px] text-muted-foreground">{categories.length} types</p>
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="py-3 space-y-0.5 flex-1">
        {allCategories.map((category, index) => {
          const isActive = 
            (category === "All" && activeCategory === null) ||
            category === activeCategory;
          const categoryImage = getCategoryImage(category);

          return (
            <motion.button
              key={category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onCategoryClick(category === "All" ? null : category)}
              className={`w-full flex items-center gap-3 py-2.5 px-3 transition-all duration-200 relative group ${
                isActive 
                  ? "bg-primary/10" 
                  : "hover:bg-muted/60"
              }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/80 rounded-r-full shadow-sm" 
                />
              )}
              
              {/* Category Image */}
              <div className={`w-10 h-10 xl:w-12 xl:h-12 rounded-xl overflow-hidden border-2 transition-all duration-200 shadow-sm group-hover:shadow-md flex-shrink-0 ${
                isActive 
                  ? "border-primary shadow-md ring-2 ring-primary/20" 
                  : "border-transparent group-hover:border-muted-foreground/20"
              }`}>
                {category === "All" ? (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                ) : (
                  <img 
                    src={categoryImage} 
                    alt={category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                )}
              </div>

              {/* Category Name */}
              <span className={`text-xs xl:text-sm font-semibold text-left leading-tight line-clamp-2 transition-colors flex-1 ${
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              }`}>
                {category}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border/50 bg-muted/30">
        <p className="text-[10px] text-muted-foreground text-center">
          Tap to filter products
        </p>
      </div>
    </aside>
  );
};

export default CategorySidebar;
