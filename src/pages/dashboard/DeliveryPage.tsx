import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Truck, MapPin, Clock, Package, CheckCircle, Phone, 
  User, Navigation, Calendar, Search,
  Route, Timer, Loader2, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface DashboardContext {
  store: {
    id: string;
    name: string;
  } | null;
}

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface DeliveryOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  items: OrderItem[];
  total_amount: number;
  status: string;
  order_type: string | null;
  delivery_mode: string | null;
  created_at: string;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "pending":
      return { label: "Pending", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock };
    case "confirmed":
      return { label: "Confirmed", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Package };
    case "out-for-delivery":
      return { label: "Out for Delivery", color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: Truck };
    case "delivered":
      return { label: "Delivered", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle };
    default:
      return { label: status, color: "bg-muted text-muted-foreground", icon: Package };
  }
};

const DeliveryPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const queryClient = useQueryClient();
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOrder | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // Fetch delivery orders from database
  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ["deliveries", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("store_id", store.id)
        .eq("delivery_mode", "delivery")
        .in("status", ["pending", "confirmed", "out-for-delivery", "delivered"])
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(order => ({
        ...order,
        items: Array.isArray(order.items) 
          ? (order.items as unknown as OrderItem[]) 
          : []
      })) as DeliveryOrder[];
    },
    enabled: !!store?.id,
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries", store?.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", store?.id] });
      toast.success("Delivery status updated!");
      setSelectedDelivery(null);
    },
    onError: (error) => {
      toast.error("Failed to update: " + error.message);
    },
  });

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || delivery.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = [
    { label: "Total Deliveries", value: deliveries.length, icon: Truck, color: "text-primary" },
    { label: "In Transit", value: deliveries.filter(d => d.status === "out-for-delivery").length, icon: Navigation, color: "text-purple-500" },
    { label: "Completed", value: deliveries.filter(d => d.status === "delivered").length, icon: CheckCircle, color: "text-green-500" },
    { label: "Pending", value: deliveries.filter(d => d.status === "pending" || d.status === "confirmed").length, icon: Timer, color: "text-yellow-500" },
  ];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsApp = (phone: string, customerName: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    const message = encodeURIComponent(`Hi ${customerName}, this is regarding your delivery from ${store?.name}. `);
    window.open(`https://wa.me/91${cleanPhone}?text=${message}`, "_blank");
  };

  const handleNavigate = (address: string | null) => {
    if (address) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank");
    }
  };

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
          <h1 className="text-2xl font-bold">Delivery Management</h1>
          <p className="text-muted-foreground">Track and manage all deliveries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Today
          </Button>
          <Button size="sm" className="gap-2">
            <Route className="w-4 h-4" />
            Optimize Route
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search deliveries..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="out-for-delivery">In Transit</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Delivery List */}
      <div className="grid gap-4">
        {filteredDeliveries.map((delivery, index) => {
          const statusConfig = getStatusConfig(delivery.status);
          const StatusIcon = statusConfig.icon;
          const itemsCount = delivery.items.reduce((sum, item) => sum + item.qty, 0);
          
          return (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedDelivery(delivery);
                setNewStatus(delivery.status);
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusConfig.color.split(' ')[0]}`}>
                    <StatusIcon className={`w-6 h-6 ${statusConfig.color.split(' ')[1]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold">{delivery.id.slice(0, 8).toUpperCase()}</span>
                      <Badge className={`${statusConfig.color} text-xs`}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{delivery.customer_name}</span>
                    </div>
                    {delivery.customer_address && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="truncate">{delivery.customer_address}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Items</p>
                    <p className="font-medium">{itemsCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium text-xs">
                      {formatDistanceToNow(new Date(delivery.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">₹{delivery.total_amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCall(delivery.customer_phone);
                      }}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(delivery.customer_address);
                      }}
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {delivery.status === "out-for-delivery" && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Delivery Progress</span>
                        <span className="font-medium">In Transit</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredDeliveries.length === 0 && (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No deliveries found</h3>
          <p className="text-muted-foreground">
            Deliveries will appear here when orders are ready for dispatch.
          </p>
        </div>
      )}

      {/* Delivery Details Dialog */}
      <Dialog open={!!selectedDelivery} onOpenChange={() => setSelectedDelivery(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              Delivery {selectedDelivery?.id.slice(0, 8).toUpperCase()}
              {selectedDelivery && (
                <Badge className={`${getStatusConfig(selectedDelivery.status).color} text-xs`}>
                  {getStatusConfig(selectedDelivery.status).label}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedDelivery && (
            <div className="space-y-6 pt-4">
              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Customer Details</h4>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{selectedDelivery.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedDelivery.customer_phone}</span>
                  </div>
                  {selectedDelivery.customer_address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{selectedDelivery.customer_address}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Order Items</h4>
                <div className="space-y-2">
                  {selectedDelivery.items.map((item, idx) => (
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
                  <span className="text-xl font-bold">₹{selectedDelivery.total_amount}</span>
                </div>
              </div>

              <Separator />

              {/* Delivery Timeline */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Delivery Timeline</h4>
                <div className="space-y-4">
                  {["pending", "confirmed", "out-for-delivery", "delivered"].map((step, idx) => {
                    const stepLabels: Record<string, string> = {
                      "pending": "Order Placed",
                      "confirmed": "Confirmed",
                      "out-for-delivery": "Out for Delivery",
                      "delivered": "Delivered"
                    };
                    const statusIndex = ["pending", "confirmed", "out-for-delivery", "delivered"].indexOf(selectedDelivery.status);
                    const isCompleted = idx <= statusIndex;
                    const isCurrent = idx === statusIndex;
                    
                    return (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={isCurrent ? 'font-medium' : 'text-muted-foreground'}>
                          {stepLabels[step]}
                        </span>
                        {isCurrent && (
                          <Badge variant="outline" className="ml-auto">Current</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Update Status */}
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
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => handleCall(selectedDelivery.customer_phone)}
                >
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => handleWhatsApp(selectedDelivery.customer_phone, selectedDelivery.customer_name)}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button 
                  className="flex-1"
                  disabled={newStatus === selectedDelivery.status || updateStatusMutation.isPending}
                  onClick={() => updateStatusMutation.mutate({ orderId: selectedDelivery.id, status: newStatus })}
                >
                  {updateStatusMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Update"
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

export default DeliveryPage;
