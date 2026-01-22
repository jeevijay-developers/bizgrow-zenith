import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  stock_quantity?: number | null;
}

const CART_STORAGE_KEY = "bizgrow-cart";

export function useCart(storeId: string | undefined) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (!storeId) return;
    
    const storageKey = `${CART_STORAGE_KEY}-${storeId}`;
    const savedCart = localStorage.getItem(storageKey);
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from storage:", e);
        setCart([]);
      }
    }
    setInitialized(true);
  }, [storeId]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!storeId || !initialized) return;
    
    const storageKey = `${CART_STORAGE_KEY}-${storeId}`;
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storeId, initialized]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      const maxStock = item.stock_quantity ?? Infinity;
      
      if (existing) {
        // Check if we can add more
        if (existing.quantity >= maxStock) {
          toast.error(`Only ${maxStock} available in stock`);
          return prev;
        }
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            const maxStock = item.stock_quantity ?? Infinity;
            
            // Check stock limit when increasing
            if (delta > 0 && newQty > maxStock) {
              toast.error(`Only ${maxStock} available in stock`);
              return item;
            }
            
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    if (storeId) {
      localStorage.removeItem(`${CART_STORAGE_KEY}-${storeId}`);
    }
  }, [storeId]);

  const getItemQuantity = useCallback(
    (id: string) => cart.find((item) => item.id === id)?.quantity || 0,
    [cart]
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    cartTotal,
    cartCount,
    initialized,
  };
}