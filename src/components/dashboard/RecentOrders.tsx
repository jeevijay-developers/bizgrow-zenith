import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  time: string;
}

const mockOrders: Order[] = [
  { id: "ORD-001", customer: "Rahul Sharma", items: 3, total: "₹450", status: "pending", time: "2 min ago" },
  { id: "ORD-002", customer: "Priya Patel", items: 1, total: "₹120", status: "confirmed", time: "15 min ago" },
  { id: "ORD-003", customer: "Amit Kumar", items: 5, total: "₹890", status: "shipped", time: "1 hour ago" },
  { id: "ORD-004", customer: "Sneha Gupta", items: 2, total: "₹280", status: "delivered", time: "3 hours ago" },
  { id: "ORD-005", customer: "Vikram Singh", items: 1, total: "₹75", status: "cancelled", time: "5 hours ago" },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: CheckCircle2 },
  shipped: { label: "Shipped", color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
};

export function RecentOrders() {
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
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="divide-y divide-border">
        {mockOrders.map((order, index) => {
          const StatusIcon = statusConfig[order.status].icon;
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
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">{order.total}</p>
                  <p className="text-xs text-muted-foreground">{order.items} items</p>
                </div>
                
                <Badge variant="outline" className={cn("gap-1", statusConfig[order.status].color)}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig[order.status].label}
                </Badge>
                
                <span className="text-xs text-muted-foreground hidden md:block">{order.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
