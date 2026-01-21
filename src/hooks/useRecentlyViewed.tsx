import { useState, useEffect, useCallback } from "react";

interface ViewedProduct {
  id: string;
  name: string;
  price: number;
  compare_price: number | null;
  image_url: string | null;
  category: string | null;
  viewedAt: number;
}

const STORAGE_KEY_PREFIX = "bizgrow_recently_viewed_";
const MAX_ITEMS = 10;

export const useRecentlyViewed = (storeId: string | undefined) => {
  const [recentlyViewed, setRecentlyViewed] = useState<ViewedProduct[]>([]);
  const storageKey = storeId ? `${STORAGE_KEY_PREFIX}${storeId}` : null;

  // Load from localStorage on mount
  useEffect(() => {
    if (!storageKey) return;
    
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as ViewedProduct[];
        // Filter out items older than 7 days
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const filtered = parsed.filter(item => item.viewedAt > weekAgo);
        setRecentlyViewed(filtered);
      }
    } catch (error) {
      console.error("Error loading recently viewed:", error);
    }
  }, [storageKey]);

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    if (!storageKey || recentlyViewed.length === 0) return;
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error("Error saving recently viewed:", error);
    }
  }, [recentlyViewed, storageKey]);

  const addToRecentlyViewed = useCallback((product: {
    id: string;
    name: string;
    price: number;
    compare_price: number | null;
    image_url: string | null;
    category: string | null;
  }) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== product.id);
      
      // Add to beginning with timestamp
      const newItem: ViewedProduct = {
        ...product,
        viewedAt: Date.now(),
      };
      
      // Keep only MAX_ITEMS
      return [newItem, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
};
