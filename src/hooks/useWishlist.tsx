import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface WishlistItem {
  id: string;
  product_id: string;
  store_id: string;
  created_at: string;
}

interface UseWishlistOptions {
  storeId: string | undefined;
}

const STORAGE_KEY_PREFIX = "wishlist_";

export function useWishlist({ storeId }: UseWishlistOptions) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Local storage fallback for guests
  const [guestFavorites, setGuestFavorites] = useState<Set<string>>(() => {
    if (!storeId) return new Set();
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${storeId}`);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Sync guest favorites to localStorage
  useEffect(() => {
    if (!user && storeId) {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}${storeId}`,
        JSON.stringify([...guestFavorites])
      );
    }
  }, [guestFavorites, storeId, user]);

  // Fetch wishlist from database for logged-in users
  const { data: dbWishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.id, storeId],
    queryFn: async () => {
      if (!user?.id || !storeId) return [];
      
      const { data, error } = await supabase
        .from("wishlists")
        .select("*")
        .eq("user_id", user.id)
        .eq("store_id", storeId);
      
      if (error) throw error;
      return data as WishlistItem[];
    },
    enabled: !!user?.id && !!storeId,
  });

  // Add to wishlist mutation
  const addMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!user?.id || !storeId) throw new Error("Not authenticated");
      
      const { error } = await supabase
        .from("wishlists")
        .insert({
          user_id: user.id,
          store_id: storeId,
          product_id: productId,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?.id, storeId] });
    },
    onError: (error: Error) => {
      // Ignore duplicate key errors (already in wishlist)
      if (!error.message.includes("duplicate")) {
        toast.error("Failed to add to wishlist");
      }
    },
  });

  // Remove from wishlist mutation
  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!user?.id || !storeId) throw new Error("Not authenticated");
      
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("store_id", storeId)
        .eq("product_id", productId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?.id, storeId] });
    },
    onError: () => {
      toast.error("Failed to remove from wishlist");
    },
  });

  // Check if a product is in the wishlist
  const isFavorite = useCallback((productId: string): boolean => {
    if (user) {
      return dbWishlist.some(item => item.product_id === productId);
    }
    return guestFavorites.has(productId);
  }, [user, dbWishlist, guestFavorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback((productId: string) => {
    if (user) {
      // Logged-in user: use database
      const isCurrentlyFavorite = dbWishlist.some(item => item.product_id === productId);
      if (isCurrentlyFavorite) {
        removeMutation.mutate(productId);
      } else {
        addMutation.mutate(productId);
      }
    } else {
      // Guest user: use localStorage
      setGuestFavorites(prev => {
        const newSet = new Set(prev);
        if (newSet.has(productId)) {
          newSet.delete(productId);
        } else {
          newSet.add(productId);
        }
        return newSet;
      });
    }
  }, [user, dbWishlist, addMutation, removeMutation]);

  // Get all favorite product IDs
  const favorites = user 
    ? new Set(dbWishlist.map(item => item.product_id))
    : guestFavorites;

  // Sync guest favorites to database when user logs in
  useEffect(() => {
    if (user?.id && storeId && guestFavorites.size > 0) {
      // Migrate guest favorites to database
      const migrateGuestFavorites = async () => {
        const promises = [...guestFavorites].map(productId =>
          supabase
            .from("wishlists")
            .upsert({
              user_id: user.id,
              store_id: storeId,
              product_id: productId,
            }, { onConflict: "user_id,store_id,product_id" })
        );
        
        await Promise.allSettled(promises);
        
        // Clear guest favorites after migration
        setGuestFavorites(new Set());
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}${storeId}`);
        
        // Refresh the wishlist
        queryClient.invalidateQueries({ queryKey: ["wishlist", user.id, storeId] });
      };
      
      migrateGuestFavorites();
    }
  }, [user?.id, storeId, guestFavorites, queryClient]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoading,
    count: favorites.size,
  };
}
