import { motion } from "framer-motion";
import { AlertTriangle, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export function LowStockAlert() {
  const { user } = useAuth();

  const { data: store } = useQuery({
    queryKey: ["user-store", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("stores")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: lowStockProducts = [], isLoading } = useQuery({
    queryKey: ["low-stock", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("products")
        .select("id, name, stock_quantity")
        .eq("store_id", store.id)
        .lt("stock_quantity", 10)
        .gt("stock_quantity", 0)
        .order("stock_quantity", { ascending: true })
        .limit(4);
      if (error) throw error;
      return data;
    },
    enabled: !!store?.id,
  });

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-8 flex items-center justify-center"
      >
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </motion.div>
    );
  }

  if (lowStockProducts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Package className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Stock Status</h3>
            <p className="text-sm text-muted-foreground">All products well stocked!</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="bg-card rounded-xl border border-border"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
            <p className="text-sm text-muted-foreground">{lowStockProducts.length} products running low</p>
          </div>
        </div>
        <Link to="/dashboard/products">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>
      
      <div className="p-4 space-y-4">
        {lowStockProducts.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Progress 
                  value={((item.stock_quantity || 0) / 50) * 100} 
                  className="h-1.5 flex-1"
                />
                <span className="text-xs text-amber-600 font-medium">{item.stock_quantity} left</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
