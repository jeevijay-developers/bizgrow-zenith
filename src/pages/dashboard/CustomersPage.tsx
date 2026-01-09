import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Search, Phone, MessageCircle, 
  MoreVertical, ShoppingCart, TrendingUp, UserPlus,
  Calendar, Download, Eye, Crown, Award, Star, Loader2, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

interface DashboardContext {
  store: {
    id: string;
    name: string;
  } | null;
}

interface Customer {
  id: string;
  store_id: string;
  name: string;
  email: string | null;
  phone: string;
  address: string | null;
  total_orders: number;
  total_spent: number;
  status: string;
  created_at: string;
  updated_at: string;
}

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
  const { store } = useOutletContext<DashboardContext>();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fetch customers
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Customer[];
    },
    enabled: !!store?.id,
  });

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.email?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      customer.phone.includes(searchQuery);
    const matchesTab = activeTab === "all" || customer.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalSpent = customers.reduce((acc, c) => acc + c.total_spent, 0);
  const avgLifetimeValue = customers.length > 0 ? Math.round(totalSpent / customers.length) : 0;

  const stats = [
    { label: "Total Customers", value: customers.length, icon: Users, color: "text-primary" },
    { label: "VIP Customers", value: customers.filter(c => c.status === "vip").length, icon: Crown, color: "text-yellow-600" },
    { label: "New This Month", value: customers.filter(c => c.status === "new").length, icon: UserPlus, color: "text-green-600" },
    { label: "Avg. Lifetime Value", value: `₹${avgLifetimeValue.toLocaleString()}`, icon: TrendingUp, color: "text-blue-600" },
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
                                {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">{customer.phone}</p>
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
                          <span className="font-medium">{customer.total_orders}</span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">₹{customer.total_spent.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" 
                              onClick={(e) => {
                                e.stopPropagation();
                                const phone = customer.phone.replace(/\D/g, "");
                                window.open(`https://wa.me/${phone}?text=Hi ${customer.name}!`, "_blank");
                              }}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" 
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(`tel:${customer.phone}`, "_self");
                              }}
                            >
                              <Phone className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                                  <Eye className="w-4 h-4 mr-2" /> View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem><ShoppingCart className="w-4 h-4 mr-2" /> View Orders</DropdownMenuItem>
                                {customer.email && (
                                  <DropdownMenuItem onClick={() => window.open(`mailto:${customer.email}`, "_self")}>
                                    <Mail className="w-4 h-4 mr-2" /> Send Email
                                  </DropdownMenuItem>
                                )}
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
                    {selectedCustomer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                    <Badge className={`${getStatusConfig(selectedCustomer.status).color} text-xs`}>
                      {getStatusConfig(selectedCustomer.status).label}
                    </Badge>
                  </div>
                  {selectedCustomer.email && (
                    <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                </div>
              </div>

              <Separator />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">{selectedCustomer.total_orders}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">₹{selectedCustomer.total_spent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Customer since
                  </span>
                  <span className="font-medium">
                    {format(new Date(selectedCustomer.created_at), "MMM yyyy")}
                  </span>
                </div>
                {selectedCustomer.address && (
                  <div className="flex items-start justify-between text-sm">
                    <span className="text-muted-foreground">Address</span>
                    <span className="font-medium text-right max-w-[200px]">{selectedCustomer.address}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 text-green-600 border-green-200 hover:bg-green-50"
                  onClick={() => {
                    const phone = selectedCustomer.phone.replace(/\D/g, "");
                    window.open(`https://wa.me/${phone}?text=Hi ${selectedCustomer.name}!`, "_blank");
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => window.open(`tel:${selectedCustomer.phone}`, "_self")}
                >
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
