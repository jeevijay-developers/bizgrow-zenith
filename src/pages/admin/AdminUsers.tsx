import { useState } from "react";
import { motion } from "framer-motion";
import { Search, User, Mail, Calendar, Store, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  created_at: string;
  stores: { id: string; name: string; is_active: boolean }[];
}

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all profiles with their stores
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (profilesError) throw profilesError;

      // Fetch stores for each user
      const usersWithStores = await Promise.all(
        profiles.map(async (profile) => {
          const { data: stores } = await supabase
            .from("stores")
            .select("id, name, is_active")
            .eq("user_id", profile.user_id);
          return { ...profile, stores: stores || [] };
        })
      );

      return usersWithStores as UserProfile[];
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground">{users.length} registered users</p>
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.full_name?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{user.full_name || "No name"}</h3>
                    <p className="text-sm text-muted-foreground">{user.phone}</p>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Joined {format(new Date(user.created_at), "MMM d, yyyy")}
                    </div>

                    {user.stores.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Store className="w-3 h-3" />
                          {user.stores.length} store{user.stores.length > 1 ? "s" : ""}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {user.stores.slice(0, 2).map((store) => (
                            <Badge 
                              key={store.id} 
                              variant={store.is_active ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {store.name.length > 15 ? store.name.slice(0, 15) + "..." : store.name}
                            </Badge>
                          ))}
                          {user.stores.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.stores.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {user.stores.length === 0 && (
                      <Badge variant="outline" className="mt-3 text-xs">
                        No stores
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No users found</h3>
          <p className="text-muted-foreground">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;