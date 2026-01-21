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
      className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-card via-card to-card/95 border-b border-border/50 overflow-x-auto scrollbar-hide lg:hidden shadow-sm"
    >
      {allCategories.map((category, index) => {
        const isActive = 
          (category === "All" && activeCategory === null) ||
          category === activeCategory;
        const categoryImage = getCategoryImage(category);

        return (
          <motion.button
            key={category}
            ref={isActive ? activeRef : null}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => onCategoryClick(category === "All" ? null : category)}
            className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-1 py-1.5 rounded-2xl transition-all duration-200 ${
              isActive 
                ? "bg-primary/8" 
                : "hover:bg-muted/60"
            }`}
          >
            <motion.div 
              className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                isActive 
                  ? "border-primary shadow-md ring-2 ring-primary/20" 
                  : "border-muted hover:border-muted-foreground/30"
              }`}
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.03 }}
            >
              <img 
                src={categoryImage} 
                alt={category}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className={`text-[10px] font-semibold whitespace-nowrap transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}>
              {category}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default IconCategoryTabs;