// Category images imports
import allProductsImg from "@/assets/categories/all-products.png";
import dairyImg from "@/assets/categories/dairy.png";
import fruitsImg from "@/assets/categories/fruits.png";
import vegetablesImg from "@/assets/categories/vegetables.png";
import bakeryImg from "@/assets/categories/bakery.png";
import beveragesImg from "@/assets/categories/beverages.png";
import beautyImg from "@/assets/categories/beauty.png";
import clothingImg from "@/assets/categories/clothing.png";
import homeImg from "@/assets/categories/home.png";
import electronicsImg from "@/assets/categories/electronics.png";
import groceryImg from "@/assets/categories/grocery.png";
import snacksImg from "@/assets/categories/snacks.png";

interface CategorySidebarProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryClick: (category: string | null) => void;
}

// Map category names to images
const getCategoryImage = (category: string): string => {
  const imageMap: Record<string, string> = {
    "all": allProductsImg,
    "dairy": dairyImg,
    "milk": dairyImg,
    "fruits": fruitsImg,
    "fruit": fruitsImg,
    "vegetables": vegetablesImg,
    "vegetable": vegetablesImg,
    "veggies": vegetablesImg,
    "bakery": bakeryImg,
    "bread": bakeryImg,
    "cake": bakeryImg,
    "beverages": beveragesImg,
    "drinks": beveragesImg,
    "juice": beveragesImg,
    "coffee": beveragesImg,
    "tea": beveragesImg,
    "beauty": beautyImg,
    "cosmetics": beautyImg,
    "skincare": beautyImg,
    "makeup": beautyImg,
    "clothing": clothingImg,
    "clothes": clothingImg,
    "fashion": clothingImg,
    "apparel": clothingImg,
    "home": homeImg,
    "decor": homeImg,
    "furniture": homeImg,
    "household": homeImg,
    "electronics": electronicsImg,
    "mobile": electronicsImg,
    "phone": electronicsImg,
    "gadgets": electronicsImg,
    "tech": electronicsImg,
    "grocery": groceryImg,
    "groceries": groceryImg,
    "staples": groceryImg,
    "kirana": groceryImg,
    "snacks": snacksImg,
    "chips": snacksImg,
    "biscuits": snacksImg,
    "namkeen": snacksImg,
  };

  const lowerCategory = category.toLowerCase();
  
  // First check for exact match
  if (imageMap[lowerCategory]) {
    return imageMap[lowerCategory];
  }
  
  // Then check for partial matches
  for (const [key, img] of Object.entries(imageMap)) {
    if (lowerCategory.includes(key) || key.includes(lowerCategory)) {
      return img;
    }
  }
  
  return allProductsImg;
};

const CategorySidebar = ({ 
  categories, 
  activeCategory, 
  onCategoryClick 
}: CategorySidebarProps) => {
  const allCategories = ["All", ...categories];

  return (
    <aside className="hidden lg:block w-28 xl:w-32 min-h-screen bg-gradient-to-b from-card to-card/95 border-r border-border/50 sticky top-[140px] self-start overflow-y-auto shadow-sm max-h-[calc(100vh-140px)]">
      <div className="py-4 space-y-1">
        {allCategories.map((category, index) => {
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