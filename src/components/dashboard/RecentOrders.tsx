import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, XCircle, Truck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customer_name: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: CheckCircle2 },
  "out-for-delivery": { label: "Shipping", color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
};

export function RecentOrders() {
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

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["recent-orders", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("orders")
        .select("id, customer_name, items, total_amount, status, created_at")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return (data || []).map(order => ({
        ...order,
        items: (Array.isArray(order.items) ? order.items : []) as unknown as OrderItem[]
      })) as Order[];
    },
    enabled: !!store?.id,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-xl border border-border"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">Latest customer orders</p>
        </div>
        <Link to="/dashboard/orders">
          <Button variant="outline" size="sm">View All</Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="p-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : orders.length === 0 ? (
        <div className="p-12 text-center">
          <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No orders yet</p>
          <p className="text-sm text-muted-foreground">Orders will appear here</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {orders.map((order, index) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            const items = Array.isArray(order.items) ? order.items : [];
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">{order.customer_name}</p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium">₹{order.total_amount}</p>
                    <p className="text-xs text-muted-foreground">{items.length} items</p>
                  </div>
                  
                  <Badge variant="outline" className={cn("gap-1", status.color)}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </Badge>
                  
                  <span className="text-xs text-muted-foreground hidden md:block">
                    {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
