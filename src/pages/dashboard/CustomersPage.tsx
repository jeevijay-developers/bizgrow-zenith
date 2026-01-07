import { motion } from "framer-motion";
import { Users, Search, Filter, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockCustomers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@email.com", phone: "+91 98765 43210", orders: 12, totalSpent: "₹4,560", lastOrder: "2 days ago" },
  { id: 2, name: "Priya Patel", email: "priya@email.com", phone: "+91 87654 32109", orders: 8, totalSpent: "₹2,340", lastOrder: "1 week ago" },
  { id: 3, name: "Amit Kumar", email: "amit@email.com", phone: "+91 76543 21098", orders: 23, totalSpent: "₹8,920", lastOrder: "Yesterday" },
  { id: 4, name: "Sneha Gupta", email: "sneha@email.com", phone: "+91 65432 10987", orders: 5, totalSpent: "₹1,120", lastOrder: "3 days ago" },
];

const CustomersPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Customer List */}
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
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Contact</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Orders</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Order</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
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
                    <p className="text-sm">{customer.phone}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary">{customer.orders} orders</Badge>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{customer.totalSpent}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-muted-foreground">{customer.lastOrder}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomersPage;
