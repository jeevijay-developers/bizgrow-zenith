import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Static fallback images
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

interface CategoryImage {
  category_name: string;
  image_url: string;
}

// Static fallback mapping
const staticImageMap: Record<string, string> = {
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

const getStaticFallback = (category: string): string => {
  const lowerCategory = category.toLowerCase();
  
  // First check for exact match
  if (staticImageMap[lowerCategory]) {
    return staticImageMap[lowerCategory];
  }
  
  // Then check for partial matches
  for (const [key, img] of Object.entries(staticImageMap)) {
    if (lowerCategory.includes(key) || key.includes(lowerCategory)) {
      return img;
    }
  }
  
  return allProductsImg;
};

export const useCategoryImages = (categories: string[]) => {
  const { data: dbCategoryImages } = useQuery({
    queryKey: ["category-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("category_images")
        .select("category_name, image_url");
      
      if (error) {
        console.error("Error fetching category images:", error);
        return [];
      }
      
      return data as CategoryImage[];
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

  const getCategoryImage = (category: string): string => {
    if (category.toLowerCase() === "all") {
      return allProductsImg;
    }

    // Check if we have an AI-generated image in the database
    if (dbCategoryImages && dbCategoryImages.length > 0) {
      const lowerCategory = category.toLowerCase();
      
      // Find exact match first
      const exactMatch = dbCategoryImages.find(
        img => img.category_name.toLowerCase() === lowerCategory
      );
      if (exactMatch) {
        return exactMatch.image_url;
      }
      
      // Find partial match
      const partialMatch = dbCategoryImages.find(
        img => 
          img.category_name.toLowerCase().includes(lowerCategory) ||
          lowerCategory.includes(img.category_name.toLowerCase())
      );
      if (partialMatch) {
        return partialMatch.image_url;
      }
    }
    
    // Fallback to static images
    return getStaticFallback(category);
  };

  return { getCategoryImage, isLoaded: !!dbCategoryImages };
};
