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
    <aside className="hidden lg:block w-20 min-h-screen bg-card border-r border-border sticky top-0 overflow-y-auto">
      <div className="py-2">
        {allCategories.map((category) => {
          const isActive = 
            (category === "All" && activeCategory === null) ||
            category === activeCategory;
          const categoryImage = getCategoryImage(category);

          return (
            <button
              key={category}
              onClick={() => onCategoryClick(category === "All" ? null : category)}
              className={`w-full flex flex-col items-center gap-1 py-2.5 px-1.5 transition-colors relative ${
                isActive 
                  ? "bg-primary/10" 
                  : "hover:bg-muted"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-primary rounded-r" />
              )}
              
              <div className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                isActive 
                  ? "border-primary shadow-md" 
                  : "border-transparent"
              }`}>
                <img 
                  src={categoryImage} 
                  alt={category}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`text-[9px] font-medium text-center leading-tight line-clamp-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
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