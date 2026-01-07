import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Search, Filter, Eye, Phone, MessageCircle,
  Clock, CheckCircle, Truck, Package, XCircle, IndianRupee,
  Calendar, Download, ChevronDown, MapPin, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const mockOrders = [
  {
    id: "ORD-2024-001",
    customer: { name: "Rahul Sharma", phone: "+91 98765 43210", address: "123 MG Road, Bengaluru" },
    items: [
      { name: "Tata Salt 1kg", qty: 2, price: 28 },
      { name: "Amul Butter 500g", qty: 1, price: 275 },
    ],
    total: 331,
    status: "pending",
    paymentMethod: "COD",
    createdAt: "2 hours ago",
    date: "Today, 10:30 AM"
  },
  {
    id: "ORD-2024-002",
    customer: { name: "Priya Patel", phone: "+91 87654 32109", address: "456 HSR Layout, Bengaluru" },
    items: [
      { name: "Fortune Sunflower Oil 1L", qty: 1, price: 189 },
      { name: "Maggi Noodles Pack", qty: 3, price: 168 },
    ],
    total: 693,
    status: "confirmed",
    paymentMethod: "UPI",
    createdAt: "5 hours ago",
    date: "Today, 7:30 AM"
  },
  {
    id: "ORD-2024-003",
    customer: { name: "Amit Kumar", phone: "+91 76543 21098", address: "789 Koramangala, Bengaluru" },
    items: [
      { name: "Coca Cola 2L", qty: 4, price: 95 },
      { name: "Parle-G Biscuits", qty: 10, price: 10 },
    ],
    total: 480,
    status: "out-for-delivery",
    paymentMethod: "UPI",
    createdAt: "Yesterday",
    date: "Yesterday, 3:45 PM"
  },
  {
    id: "ORD-2024-004",
    customer: { name: "Sneha Gupta", phone: "+91 65432 10987", address: "321 Indiranagar, Bengaluru" },
    items: [
      { name: "Amul Milk 1L", qty: 5, price: 65 },
    ],
    total: 325,
    status: "delivered",
    paymentMethod: "COD",
    createdAt: "2 days ago",
    date: "Jan 5, 2024, 9:00 AM"
  },
  {
    id: "ORD-2024-005",
    customer: { name: "Vikram Singh", phone: "+91 54321 09876", address: "654 Whitefield, Bengaluru" },
    items: [
      { name: "Tata Salt 1kg", qty: 1, price: 28 },
      { name: "Fortune Sunflower Oil 1L", qty: 2, price: 189 },
    ],
    total: 406,
    status: "cancelled",
    paymentMethod: "UPI",
    createdAt: "3 days ago",
    date: "Jan 4, 2024, 2:15 PM"
  },
];

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
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = [
    { label: "Total Orders", value: mockOrders.length, icon: ShoppingCart, color: "text-primary" },
    { label: "Pending", value: mockOrders.filter(o => o.status === "pending").length, icon: Clock, color: "text-yellow-600" },
    { label: "In Progress", value: mockOrders.filter(o => ["confirmed", "out-for-delivery"].includes(o.status)).length, icon: Truck, color: "text-blue-600" },
    { label: "Delivered", value: mockOrders.filter(o => o.status === "delivered").length, icon: CheckCircle, color: "text-green-600" },
  ];

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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="out-for-delivery">Delivering</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          
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

        <div className="mt-6">
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
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Order Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold">{order.id}</span>
                            <Badge className={`${statusConfig.color} text-xs`}>
                              <statusConfig.icon className="w-3 h-3 mr-1" />
                              {statusConfig.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {order.paymentMethod}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {order.customer.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              {order.items.length} items
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {order.createdAt}
                            </div>
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-lg font-bold">₹{order.total}</p>
                            <p className="text-xs text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
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
        </div>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              Order {selectedOrder?.id}
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
                    <span className="font-medium">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedOrder.customer.address}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
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
                  <span className="text-xl font-bold">₹{selectedOrder.total}</span>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Update Status</h4>
                <Select defaultValue={selectedOrder.status}>
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
                <Button className="flex-1">Update Order</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
