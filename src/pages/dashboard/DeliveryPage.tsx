import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Truck, MapPin, Clock, Package, CheckCircle, Phone, 
  User, Navigation, Calendar, Filter, Search, MoreVertical,
  Play, Pause, Route, Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

interface Delivery {
  id: string;
  order_id: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  items_count: number;
  total_amount: number;
  status: "pending" | "picked" | "in-transit" | "delivered";
  eta: string;
  distance: string;
}

const mockDeliveries: Delivery[] = [
  { 
    id: "1", order_id: "ORD-001", customer_name: "Rahul Sharma", customer_phone: "+91 98765 43210",
    address: "123, MG Road, Andheri West, Mumbai - 400053", items_count: 5, total_amount: 850,
    status: "in-transit", eta: "15 min", distance: "2.5 km"
  },
  { 
    id: "2", order_id: "ORD-002", customer_name: "Priya Patel", customer_phone: "+91 98765 43211",
    address: "45, Park Street, Bandra East, Mumbai - 400051", items_count: 3, total_amount: 420,
    status: "pending", eta: "30 min", distance: "4.2 km"
  },
  { 
    id: "3", order_id: "ORD-003", customer_name: "Amit Kumar", customer_phone: "+91 98765 43212",
    address: "78, Hill Road, Khar West, Mumbai - 400052", items_count: 8, total_amount: 1250,
    status: "picked", eta: "20 min", distance: "3.1 km"
  },
  { 
    id: "4", order_id: "ORD-004", customer_name: "Sneha Gupta", customer_phone: "+91 98765 43213",
    address: "22, Carter Road, Bandra West, Mumbai - 400050", items_count: 2, total_amount: 180,
    status: "delivered", eta: "Delivered", distance: "1.8 km"
  },
];

const getStatusConfig = (status: Delivery["status"]) => {
  switch (status) {
    case "pending":
      return { label: "Pending", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock };
    case "picked":
      return { label: "Picked Up", color: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Package };
    case "in-transit":
      return { label: "In Transit", color: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: Truck };
    case "delivered":
      return { label: "Delivered", color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle };
    default:
      return { label: status, color: "bg-muted text-muted-foreground", icon: Package };
  }
};

const DeliveryPage = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDeliveries = mockDeliveries.filter(delivery => {
    const matchesSearch = delivery.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.order_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || delivery.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = [
    { label: "Today's Deliveries", value: "24", icon: Truck, color: "text-primary" },
    { label: "In Transit", value: "8", icon: Navigation, color: "text-purple-500" },
    { label: "Completed", value: "14", icon: CheckCircle, color: "text-green-500" },
    { label: "Avg. Time", value: "28m", icon: Timer, color: "text-blue-500" },
  ];

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
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Delivery List */}
      <div className="grid gap-4">
        {filteredDeliveries.map((delivery, index) => {
          const statusConfig = getStatusConfig(delivery.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => setSelectedDelivery(delivery)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusConfig.color.split(' ')[0]}`}>
                    <StatusIcon className={`w-6 h-6 ${statusConfig.color.split(' ')[1]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold">{delivery.order_id}</span>
                      <Badge className={`${statusConfig.color} text-xs`}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{delivery.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{delivery.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{delivery.distance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">ETA</p>
                    <p className="font-medium">{delivery.eta}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-medium">₹{delivery.total_amount}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {delivery.status === "in-transit" && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Delivery Progress</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
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
              Delivery {selectedDelivery?.order_id}
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
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{selectedDelivery.address}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Delivery Progress */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Delivery Timeline</h4>
                <div className="space-y-4">
                  {["Order Placed", "Picked Up", "In Transit", "Delivered"].map((step, idx) => {
                    const isCompleted = idx <= ["pending", "picked", "in-transit", "delivered"].indexOf(selectedDelivery.status);
                    const isCurrent = idx === ["pending", "picked", "in-transit", "delivered"].indexOf(selectedDelivery.status);
                    
                    return (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span className={isCurrent ? 'font-medium' : 'text-muted-foreground'}>{step}</span>
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
                <Select defaultValue={selectedDelivery.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="picked">Picked Up</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Navigation className="w-4 h-4" />
                  Navigate
                </Button>
                <Button className="flex-1">
                  Update Status
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
