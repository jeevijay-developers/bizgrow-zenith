import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Store, Camera, MapPin, Phone, Mail, Clock, Globe, 
  Save, Loader2, Upload, Building, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardContext {
  store: {
    id: string;
    name: string;
    category: string;
    business_mode: string;
    city: string;
    state: string;
    address: string | null;
    is_active: boolean;
  } | null;
}

const categories = [
  "kirana-store",
  "grocery",
  "dairy-farm",
  "bakery",
  "pharmacy",
  "electronics",
  "clothing",
  "restaurant",
  "other"
];

const businessModes = [
  "walk-in",
  "delivery",
  "walk-in + delivery"
];

const StoreSettingsPage = () => {
  const { user } = useAuth();
  const { store } = useOutletContext<DashboardContext>();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: store?.name || "",
    category: store?.category || "",
    business_mode: store?.business_mode || "",
    city: store?.city || "",
    state: store?.state || "",
    address: store?.address || "",
    is_active: store?.is_active ?? true,
  });

  const updateStoreMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!store?.id) throw new Error("No store found");
      const { error } = await supabase
        .from("stores")
        .update(data)
        .eq("id", store.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-store"] });
      toast.success("Store settings updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update settings: " + error.message);
    },
  });

  const handleSave = () => {
    updateStoreMutation.mutate(formData);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Store Settings</h1>
          <p className="text-muted-foreground">Manage your store information</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={updateStoreMutation.isPending}
          className="gap-2"
        >
          {updateStoreMutation.isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Changes</>
          )}
        </Button>
      </div>

      {/* Store Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4">Store Logo</h3>
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">
              {formData.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "ST"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Logo
            </Button>
            <p className="text-xs text-muted-foreground">
              Recommended: 200x200px, Max 2MB (PNG, JPG)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Store className="w-5 h-5" />
          Basic Information
        </h3>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your Store Name"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Business Mode</Label>
            <Select 
              value={formData.business_mode}
              onValueChange={(value) => setFormData(prev => ({ ...prev, business_mode: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select business mode" />
              </SelectTrigger>
              <SelectContent>
                {businessModes.map(mode => (
                  <SelectItem key={mode} value={mode}>
                    {mode.split(' ').map(word => 
                      word.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-')
                    ).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location
        </h3>
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input 
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Mumbai"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input 
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                placeholder="Maharashtra"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Full Address</Label>
            <Textarea 
              value={formData.address || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter your complete store address"
              rows={3}
            />
          </div>
        </div>
      </motion.div>

      {/* Store Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4">Store Status</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Store Active</p>
            <p className="text-sm text-muted-foreground">
              When disabled, your store won't be visible to customers
            </p>
          </div>
          <Switch 
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
          />
        </div>
      </motion.div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Business Hours
        </h3>
        <div className="space-y-4">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <div key={day} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium">{day}</span>
              <Input type="time" defaultValue="09:00" className="w-28" />
              <span className="text-muted-foreground">to</span>
              <Input type="time" defaultValue="21:00" className="w-28" />
              <Switch defaultChecked className="ml-auto" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StoreSettingsPage;
