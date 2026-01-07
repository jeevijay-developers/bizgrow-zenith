import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Search, Filter, Eye, Phone, MessageCircle,
  Clock, CheckCircle, Truck, Package, XCircle,
  Calendar, Download, ChevronDown, MapPin, User, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow, format } from "date-fns";

interface DashboardContext {
  store: {
    id: string;
    name: string;
  } | null;
}

interface Order {
  id: string;
  store_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  items: Array<{ name: string; qty: number; price: number }>;
  total_amount: number;
  status: string;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "pending":
      return { icon: Clock, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", label: "Pending" };
    case "confirmed":
      return { icon: CheckCircle, color: "bg-blue-500/10 text-blue-600 border-blue-500/20", label: "Confirmed" };
    case "out-for-delivery":
      return { icon: Truck, color: "bg-purple-500/10 text-purple-600 border-purple-500/20", label: "Out for Delivery" };
    case "delivered":
      return { icon: Package, color: "bg-green-500/10 text-green-600 border-green-500/20", label: "Delivered" };
    case "cancelled":
      return { icon: XCircle, color: "bg-red-500/10 text-red-600 border-red-500/20", label: "Cancelled" };
    default:
      return { icon: Clock, color: "bg-muted text-muted-foreground", label: status };
  }
};

const OrdersPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [newStatus, setNewStatus] = useState("");

  // Fetch orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!store?.id,
  });

  // Update order status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", store?.id] });
      toast.success("Order status updated!");
      setSelectedOrder(null);
    },
    onError: (error) => {
      toast.error("Failed to update order: " + error.message);
    },
  });

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = [
    { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "text-primary" },
    { label: "Pending", value: orders.filter(o => o.status === "pending").length, icon: Clock, color: "text-yellow-600" },
    { label: "In Progress", value: orders.filter(o => ["confirmed", "out-for-delivery"].includes(o.status)).length, icon: Truck, color: "text-blue-600" },
    { label: "Delivered", value: orders.filter(o => o.status === "delivered").length, icon: CheckCircle, color: "text-green-600" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Today
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="out-for-delivery">Delivering</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search orders..." 
              className="pl-10 w-64" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <AnimatePresence mode="wait">
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-card rounded-xl border border-border p-12 text-center"
          >
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search" : "Orders will appear here when customers place them"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredOrders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              const items = Array.isArray(order.items) ? order.items : [];
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedOrder(order);
                    setNewStatus(order.status);
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-semibold">{order.id.slice(0, 8).toUpperCase()}</span>
                        <Badge className={`${statusConfig.color} text-xs`}>
                          <statusConfig.icon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {order.payment_method || "COD"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {order.customer_name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          {items.length} items
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold">₹{order.total_amount}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(order.created_at), "MMM d, h:mm a")}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={(e) => e.stopPropagation()}>
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={(e) => e.stopPropagation()}>
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={(e) => e.stopPropagation()}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              Order {selectedOrder?.id.slice(0, 8).toUpperCase()}
              {selectedOrder && (
                <Badge className={`${getStatusConfig(selectedOrder.status).color} text-xs`}>
                  {getStatusConfig(selectedOrder.status).label}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 pt-4">
              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Customer Details</h4>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{selectedOrder.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedOrder.customer_phone}</span>
                  </div>
                  {selectedOrder.customer_address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedOrder.customer_address}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Order Items</h4>
                <div className="space-y-2">
                  {(Array.isArray(selectedOrder.items) ? selectedOrder.items : []).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                      </div>
                      <p className="font-medium">₹{item.price * item.qty}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">₹{selectedOrder.total_amount}</span>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Update Status</h4>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button 
                  className="flex-1"
                  disabled={newStatus === selectedOrder.status || updateStatusMutation.isPending}
                  onClick={() => updateStatusMutation.mutate({ orderId: selectedOrder.id, status: newStatus })}
                >
                  {updateStatusMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Update Order"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
