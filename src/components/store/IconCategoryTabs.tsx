import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

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

interface IconCategoryTabsProps {
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
      className="flex items-center gap-2 py-2.5 px-3 bg-card border-b border-border overflow-x-auto scrollbar-hide lg:hidden"
    >
      {allCategories.map((category) => {
        const isActive = 
          (category === "All" && activeCategory === null) ||
          category === activeCategory;
        const categoryImage = getCategoryImage(category);

        return (
          <button
            key={category}
            ref={isActive ? activeRef : null}
            onClick={() => onCategoryClick(category === "All" ? null : category)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-1 py-1 rounded-xl transition-all ${
              isActive 
                ? "bg-primary/5" 
                : "hover:bg-muted"
            }`}
          >
            <motion.div 
              className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                isActive 
                  ? "border-primary shadow-md" 
                  : "border-muted bg-muted"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={categoryImage} 
                alt={category}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className={`text-[10px] font-medium whitespace-nowrap ${
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