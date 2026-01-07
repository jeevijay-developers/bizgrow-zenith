import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Search, Filter, Mail, Phone, MessageCircle, 
  MoreVertical, Star, ShoppingCart, TrendingUp, UserPlus,
  Calendar, Download, Eye, Crown, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockCustomers = [
  { 
    id: 1, 
    name: "Rahul Sharma", 
    email: "rahul@email.com", 
    phone: "+91 98765 43210", 
    orders: 28, 
    totalSpent: 12560, 
    lastOrder: "2 days ago",
    joinedDate: "Mar 2023",
    avgOrderValue: 448,
    status: "vip",
    recentOrders: [
      { id: "ORD-001", date: "Jan 5, 2024", total: 456, items: 3 },
      { id: "ORD-002", date: "Dec 28, 2023", total: 892, items: 5 },
    ]
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    email: "priya@email.com", 
    phone: "+91 87654 32109", 
    orders: 15, 
    totalSpent: 6340, 
    lastOrder: "1 week ago",
    joinedDate: "Jun 2023",
    avgOrderValue: 423,
    status: "regular",
    recentOrders: [
      { id: "ORD-003", date: "Dec 30, 2023", total: 325, items: 2 },
    ]
  },
  { 
    id: 3, 
    name: "Amit Kumar", 
    email: "amit@email.com", 
    phone: "+91 76543 21098", 
    orders: 45, 
    totalSpent: 18920, 
    lastOrder: "Yesterday",
    joinedDate: "Jan 2023",
    avgOrderValue: 420,
    status: "vip",
    recentOrders: [
      { id: "ORD-004", date: "Jan 6, 2024", total: 1120, items: 8 },
      { id: "ORD-005", date: "Jan 3, 2024", total: 567, items: 4 },
    ]
  },
  { 
    id: 4, 
    name: "Sneha Gupta", 
    email: "sneha@email.com", 
    phone: "+91 65432 10987", 
    orders: 8, 
    totalSpent: 2120, 
    lastOrder: "3 days ago",
    joinedDate: "Oct 2023",
    avgOrderValue: 265,
    status: "new",
    recentOrders: [
      { id: "ORD-006", date: "Jan 4, 2024", total: 289, items: 2 },
    ]
  },
  { 
    id: 5, 
    name: "Vikram Singh", 
    email: "vikram@email.com", 
    phone: "+91 54321 09876", 
    orders: 22, 
    totalSpent: 8450, 
    lastOrder: "5 days ago",
    joinedDate: "Apr 2023",
    avgOrderValue: 384,
    status: "regular",
    recentOrders: [
      { id: "ORD-007", date: "Jan 2, 2024", total: 445, items: 3 },
    ]
  },
  { 
    id: 6, 
    name: "Meera Reddy", 
    email: "meera@email.com", 
    phone: "+91 43210 98765", 
    orders: 3, 
    totalSpent: 890, 
    lastOrder: "2 weeks ago",
    joinedDate: "Dec 2023",
    avgOrderValue: 297,
    status: "new",
    recentOrders: []
  },
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "vip":
      return { icon: Crown, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", label: "VIP" };
    case "regular":
      return { icon: Award, color: "bg-blue-500/10 text-blue-600 border-blue-500/20", label: "Regular" };
    case "new":
      return { icon: Star, color: "bg-green-500/10 text-green-600 border-green-500/20", label: "New" };
    default:
      return { icon: Users, color: "bg-muted text-muted-foreground", label: status };
  }
};

const CustomersPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    const matchesTab = activeTab === "all" || customer.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = [
    { label: "Total Customers", value: mockCustomers.length, icon: Users, color: "text-primary" },
    { label: "VIP Customers", value: mockCustomers.filter(c => c.status === "vip").length, icon: Crown, color: "text-yellow-600" },
    { label: "New This Month", value: mockCustomers.filter(c => c.status === "new").length, icon: UserPlus, color: "text-green-600" },
    { label: "Avg. Lifetime Value", value: `₹${Math.round(mockCustomers.reduce((acc, c) => acc + c.totalSpent, 0) / mockCustomers.length).toLocaleString()}`, icon: TrendingUp, color: "text-blue-600" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Customer
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
            placeholder="Search customers..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
            <TabsTrigger value="regular">Regular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Customer List */}
      <AnimatePresence mode="wait">
        {filteredCustomers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-card rounded-xl border border-border p-12 text-center"
          >
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No customers found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search" : "Customers will appear here when they make purchases"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Orders</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Avg. Order</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Order</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCustomers.map((customer, index) => {
                    const statusConfig = getStatusConfig(customer.status);
                    return (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * index }}
                        className="hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {customer.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">{customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={`${statusConfig.color} text-xs`}>
                            <statusConfig.icon className="w-3 h-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">{customer.orders}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">₹{customer.totalSpent.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-muted-foreground">₹{customer.avgOrderValue}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-muted-foreground">{customer.lastOrder}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                              <Phone className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View Profile</DropdownMenuItem>
                                <DropdownMenuItem><ShoppingCart className="w-4 h-4 mr-2" /> View Orders</DropdownMenuItem>
                                <DropdownMenuItem><Mail className="w-4 h-4 mr-2" /> Send Email</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Customer Profile</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6 pt-4">
              {/* Customer Header */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                    {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    <Badge className={`${getStatusConfig(selectedCustomer.status).color} text-xs`}>
                      {getStatusConfig(selectedCustomer.status).label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                </div>
              </div>

              <Separator />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedCustomer.orders}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">₹{selectedCustomer.avgOrderValue}</p>
                  <p className="text-xs text-muted-foreground">Avg. Order</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Customer since
                  </span>
                  <span className="font-medium">{selectedCustomer.joinedDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Last order
                  </span>
                  <span className="font-medium">{selectedCustomer.lastOrder}</span>
                </div>
              </div>

              <Separator />

              {/* Recent Orders */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Recent Orders</h4>
                {selectedCustomer.recentOrders.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCustomer.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.date} • {order.items} items</p>
                        </div>
                        <p className="font-medium">₹{order.total}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent orders</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button className="flex-1 gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  View Orders
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
