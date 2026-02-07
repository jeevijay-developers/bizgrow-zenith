/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Palette, Image, Type, MessageCircle, Megaphone, Layout,
  Save, Loader2, Eye, Instagram, Facebook, Phone, Sparkles,
  Gift, Tag, Percent, Plus, Trash2, Upload, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext, Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DashboardContext {
  store: {
    id: string;
    name: string;
    category: string;
  } | null;
}

interface StoreCustomization {
  id?: string;
  store_id: string;
  banner_image_url: string | null;
  banner_text: string | null;
  banner_subtitle: string | null;
  theme_color: string;
  accent_color: string;
  logo_url: string | null;
  tagline: string | null;
  welcome_message: string | null;
  show_banner: boolean;
  show_offers_section: boolean;
  show_categories: boolean;
  show_search: boolean;
  whatsapp_number: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  announcement_text: string | null;
  announcement_active: boolean;
  layout_style: string;
}

interface Promotion {
  id: string;
  store_id: string;
  title: string;
  description: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
}

const themeColors = [
  { name: "Emerald", value: "#10b981" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Indigo", value: "#6366f1" },
];

const StoreCustomizationPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [newPromo, setNewPromo] = useState({
    title: "",
    description: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
  });

  const defaultCustomization: StoreCustomization = {
    store_id: store?.id || "",
    banner_image_url: null,
    banner_text: "Welcome to our store!",
    banner_subtitle: "Discover amazing products",
    theme_color: "#10b981",
    accent_color: "#f59e0b",
    logo_url: null,
    tagline: null,
    welcome_message: null,
    show_banner: true,
    show_offers_section: true,
    show_categories: true,
    show_search: true,
    whatsapp_number: null,
    instagram_url: null,
    facebook_url: null,
    announcement_text: null,
    announcement_active: false,
    layout_style: "grid",
  };

  const [formData, setFormData] = useState<StoreCustomization>(defaultCustomization);

  // Fetch customization
  const { data: customization } = useQuery({
    queryKey: ["store-customization", store?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_customizations")
        .select("*")
        .eq("store_id", store?.id)
        .maybeSingle();
      if (error) throw error;
      return data as StoreCustomization | null;
    },
    enabled: !!store?.id,
  });

  // Fetch promotions
  const { data: promotions = [] } = useQuery({
    queryKey: ["store-promotions", store?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_promotions")
        .select("*")
        .eq("store_id", store?.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Promotion[];
    },
    enabled: !!store?.id,
  });

  useEffect(() => {
    if (customization) {
      setFormData(customization);
    } else if (store?.id) {
      setFormData({ ...defaultCustomization, store_id: store.id });
    }
  }, [customization, store?.id]);

  // Upload image to storage
  const uploadImage = async (file: File, type: "banner" | "logo") => {
    if (!user?.id) throw new Error("Not authenticated");
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('store-assets')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('store-assets')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploadingBanner(true);
    try {
      const url = await uploadImage(file, "banner");
      setFormData(prev => ({ ...prev, banner_image_url: url }));
      toast.success("Banner uploaded!");
    } catch (error: any) {
      toast.error("Failed to upload: " + error.message);
    } finally {
      setUploadingBanner(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be less than 2MB");
      return;
    }

    setUploadingLogo(true);
    try {
      const url = await uploadImage(file, "logo");
      setFormData(prev => ({ ...prev, logo_url: url }));
      toast.success("Logo uploaded!");
    } catch (error: any) {
      toast.error("Failed to upload: " + error.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  // Save customization
  const saveMutation = useMutation({
    mutationFn: async (data: StoreCustomization) => {
      if (customization?.id) {
        const { error } = await supabase
          .from("store_customizations")
          .update(data)
          .eq("id", customization.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("store_customizations")
          .insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-customization"] });
      toast.success("Store customization saved!");
    },
    onError: (error) => {
      toast.error("Failed to save: " + error.message);
    },
  });

  // Add promotion
  const addPromoMutation = useMutation({
    mutationFn: async (promo: typeof newPromo) => {
      const { error } = await supabase.from("store_promotions").insert({
        store_id: store?.id,
        title: promo.title,
        description: promo.description || null,
        discount_percentage: promo.discount_percentage ? parseInt(promo.discount_percentage) : null,
        start_date: promo.start_date || null,
        end_date: promo.end_date || null,
        is_active: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-promotions"] });
      setPromoDialogOpen(false);
      setNewPromo({ title: "", description: "", discount_percentage: "", start_date: "", end_date: "" });
      toast.success("Promotion added!");
    },
    onError: (error) => {
      toast.error("Failed to add promotion: " + error.message);
    },
  });

  // Delete promotion
  const deletePromoMutation = useMutation({
    mutationFn: async (promoId: string) => {
      const { error } = await supabase.from("store_promotions").delete().eq("id", promoId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-promotions"] });
      toast.success("Promotion deleted!");
    },
  });

  // Toggle promotion
  const togglePromoMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("store_promotions")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-promotions"] });
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  if (!store) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-64 bg-muted rounded-lg mb-2" />
            <div className="h-4 w-48 bg-muted rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-muted rounded-lg" />
            <div className="h-10 w-32 bg-muted rounded-lg" />
          </div>
        </div>
        
        {/* Tabs Skeleton */}
        <div className="h-12 bg-muted rounded-lg" />
        
        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-64 bg-muted rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-muted rounded-lg" />
            <div className="h-20 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Customize Your Store
          </h1>
          <p className="text-muted-foreground">
            Make your catalogue unique and attractive
          </p>
        </div>
        <div className="flex gap-2">
          <Link to={`/store/${store.id}`} target="_blank">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          </Link>
          <Button 
            onClick={handleSave} 
            disabled={saveMutation.isPending}
            className="gap-2"
          >
            {saveMutation.isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="banner" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          <TabsTrigger value="banner" className="gap-2 py-3">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Banner</span>
          </TabsTrigger>
          <TabsTrigger value="theme" className="gap-2 py-3">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Theme</span>
          </TabsTrigger>
          <TabsTrigger value="offers" className="gap-2 py-3">
            <Gift className="w-4 h-4" />
            <span className="hidden sm:inline">Offers</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2 py-3">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Social</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="gap-2 py-3">
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Layout</span>
          </TabsTrigger>
        </TabsList>

        {/* Banner Tab */}
        <TabsContent value="banner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Configuration */}
            <div className="lg:col-span-7 space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-8">
                  {/* Show Banner Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-base mb-1">Show Banner</h3>
                      <p className="text-sm text-muted-foreground">Display the banner on your store homepage</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        {formData.show_banner ? "On" : "Off"}
                      </span>
                      <Switch
                        checked={formData.show_banner}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_banner: checked }))}
                      />
                    </div>
                  </div>

                  {formData.show_banner && (
                    <>
                      {/* Banner Image Upload */}
                      <div className="space-y-3">
                        <input
                          type="file"
                          ref={bannerInputRef}
                          onChange={handleBannerUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        {formData.banner_image_url ? (
                          <div className="relative rounded-xl overflow-hidden">
                            <img 
                              src={formData.banner_image_url} 
                              alt="Banner" 
                              className="w-full h-64 object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-4 right-4"
                              onClick={() => setFormData(prev => ({ ...prev, banner_image_url: null }))}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => bannerInputRef.current?.click()}
                            className="w-full h-64 border-2 border-dashed border-gray-300 bg-muted/30 rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all group"
                          >
                            {uploadingBanner ? (
                              <Loader2 className="w-12 h-12 mx-auto animate-spin text-muted-foreground" />
                            ) : (
                              <>
                                <Upload className="w-12 h-12 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
                                <p className="font-medium text-slate-700 mb-1">Click or drag and drop to upload banner image</p>
                                <p className="text-sm text-muted-foreground">Recommended: 1200x400px, Max 5MB</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Banner Title Input */}
                      <div className="space-y-2">
                        <Label htmlFor="banner-title" className="text-sm font-semibold">Banner Title</Label>
                        <Input
                          id="banner-title"
                          value={formData.banner_text || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, banner_text: e.target.value }))}
                          placeholder="Welcome to our store!"
                          className="h-11"
                        />
                      </div>

                      {/* Banner Subtitle Input */}
                      <div className="space-y-2">
                        <Label htmlFor="banner-subtitle" className="text-sm font-semibold">Banner Subtitle</Label>
                        <Input
                          id="banner-subtitle"
                          value={formData.banner_subtitle || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, banner_subtitle: e.target.value }))}
                          placeholder="Discover amazing products and deals"
                          className="h-11"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview & Announcement */}
            <div className="lg:col-span-5 space-y-6">
              {/* Live Preview */}
              {formData.show_banner && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Live Preview</CardTitle>
                    <CardDescription className="text-sm">
                      How your banner will appear to customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Browser Mockup */}
                    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                      {/* Browser Chrome */}
                      <div className="bg-gray-200 px-4 py-2 flex items-center h-8">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <div className="w-1/2 h-3 bg-gray-300 rounded-full mx-auto"></div>
                      </div>
                      {/* Banner Preview */}
                      <div 
                        className="h-64 w-full flex flex-col items-center justify-center text-center p-8 relative"
                        style={{
                          background: formData.banner_image_url 
                            ? `url(${formData.banner_image_url}) center/cover` 
                            : `linear-gradient(135deg, ${formData.theme_color}, ${formData.accent_color})`
                        }}
                      >
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10">
                          <h3 className="text-white text-2xl font-bold mb-4">
                            {formData.banner_text || "Welcome to BizGrow360!"}
                          </h3>
                          <p className="text-white opacity-90 text-sm mb-6">
                            {formData.banner_subtitle || "Discover amazing products and deals"}
                          </p>
                          <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition shadow-sm">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Announcement Bar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Megaphone className="w-5 h-5" />
                    Announcement Bar
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Display important announcements at the top of your store
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Toggle Row */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Show Announcement</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        {formData.announcement_active ? "On" : "Off"}
                      </span>
                      <Switch
                        checked={formData.announcement_active}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, announcement_active: checked }))}
                      />
                    </div>
                  </div>

                  {/* Announcement Text Input */}
                  <div className="space-y-2">
                    <Label htmlFor="announce-text" className="text-sm font-semibold">Announcement Text</Label>
                    <Input
                      id="announce-text"
                      value={formData.announcement_text || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, announcement_text: e.target.value }))}
                      placeholder="Free delivery on orders above ₹500!"
                      disabled={!formData.announcement_active}
                      className={`h-11 ${!formData.announcement_active ? 'bg-muted cursor-not-allowed' : ''}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme" className="space-y-6">
          {/* Color Selection & Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Color Selection */}
            <div className="lg:col-span-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Color Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Primary Color */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Primary Color</Label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {themeColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setFormData(prev => ({ ...prev, theme_color: color.value }))}
                          className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${
                            formData.theme_color === color.value 
                              ? "ring-2 ring-offset-2 ring-slate-400 scale-110" 
                              : "ring-2 ring-transparent"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    {/* Color Input with Preview */}
                    <div className="relative flex items-center">
                      <div 
                        className="absolute left-3 w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: formData.theme_color }}
                      />
                      <Input
                        value={formData.theme_color}
                        onChange={(e) => setFormData(prev => ({ ...prev, theme_color: e.target.value }))}
                        className="pl-10 pr-10 h-10 font-mono text-sm"
                        placeholder="#000000"
                      />
                      <Palette className="absolute right-3 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Accent Color</Label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {themeColors.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setFormData(prev => ({ ...prev, accent_color: color.value }))}
                          className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${
                            formData.accent_color === color.value 
                              ? "ring-2 ring-offset-2 ring-slate-400 scale-110" 
                              : "ring-2 ring-transparent"
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    {/* Color Input with Preview */}
                    <div className="relative flex items-center">
                      <div 
                        className="absolute left-3 w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: formData.accent_color }}
                      />
                      <Input
                        value={formData.accent_color}
                        onChange={(e) => setFormData(prev => ({ ...prev, accent_color: e.target.value }))}
                        className="pl-10 pr-10 h-10 font-mono text-sm"
                        placeholder="#000000"
                      />
                      <Palette className="absolute right-3 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Live Preview */}
            <div className="lg:col-span-8">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Live Store Preview</CardTitle>
                    <span className="text-sm text-muted-foreground hidden sm:block">Changes apply instantly</span>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Store Mockup */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    {/* Mockup Navbar */}
                    <div 
                      className="text-white px-4 py-3 flex items-center justify-between"
                      style={{ backgroundColor: formData.theme_color }}
                    >
                      <div className="bg-white/20 px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase">
                        {store.name}
                      </div>
                      <div className="hidden md:flex space-x-6 text-sm font-medium">
                        <span className="opacity-100">Home</span>
                        <span className="opacity-80">Products</span>
                        <span className="opacity-80">About</span>
                      </div>
                    </div>

                    {/* Mockup Hero */}
                    <div 
                      className="relative h-48 md:h-56 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${formData.theme_color}, ${formData.accent_color})`
                      }}
                    >
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative text-center z-10 px-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                          {formData.banner_text || "Welcome to our store!"}
                        </h3>
                        <button 
                          className="text-white px-6 py-2 rounded text-sm font-semibold transition shadow-md"
                          style={{ backgroundColor: formData.theme_color }}
                        >
                          Shop Now
                        </button>
                      </div>
                    </div>

                    {/* Mockup Products */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="bg-white rounded shadow-sm p-3 flex flex-col">
                            <div className="w-full h-24 bg-slate-200 rounded mb-3"></div>
                            <h4 className="text-xs font-bold text-slate-800 mb-1">Product {i}</h4>
                            <p className="text-xs text-slate-500 mb-3">₹{(i * 100).toFixed(2)}</p>
                            <button 
                              className="mt-auto text-white text-[10px] py-1.5 px-2 rounded transition"
                              style={{ backgroundColor: formData.theme_color }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Store Branding Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Type className="w-5 h-5" />
                Store Branding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Logo Upload */}
                <div className="flex flex-col h-full">
                  <Label className="text-sm font-semibold mb-3">Store Logo</Label>
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {formData.logo_url ? (
                    <div className="relative w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center p-4">
                      <img 
                        src={formData.logo_url} 
                        alt="Logo" 
                        className="max-w-full max-h-full object-contain"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7"
                        onClick={() => setFormData(prev => ({ ...prev, logo_url: null }))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => logoInputRef.current?.click()}
                      className="w-full h-40 border-2 border-dashed border-gray-300 bg-muted/30 rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      {uploadingLogo ? (
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-3" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                          <Button variant="secondary" size="sm" className="mb-2">
                            Upload Logo
                          </Button>
                        </>
                      )}
                      <p className="text-xs text-muted-foreground">200x200px, Max 2MB</p>
                    </div>
                  )}
                </div>

                {/* Tagline */}
                <div className="flex flex-col">
                  <Label className="text-sm font-semibold mb-3">Store Tagline</Label>
                  <Input
                    value={formData.tagline || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                    placeholder="Quality products at best prices"
                    className="h-11"
                  />
                </div>

                {/* Welcome Message */}
                <div className="flex flex-col">
                  <Label className="text-sm font-semibold mb-3">Welcome Message</Label>
                  <Textarea
                    value={formData.welcome_message || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, welcome_message: e.target.value }))}
                    placeholder="Welcome to our store! We are happy to serve you."
                    className="h-32 resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Offers Tab */}
        <TabsContent value="offers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Promotions & Offers
                  </CardTitle>
                  <CardDescription>
                    Create special offers to attract customers
                  </CardDescription>
                </div>
                <Dialog open={promoDialogOpen} onOpenChange={setPromoDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Offer
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Promotion</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Offer Title *</Label>
                        <Input
                          value={newPromo.title}
                          onChange={(e) => setNewPromo(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Summer Sale!"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={newPromo.description}
                          onChange={(e) => setNewPromo(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Get amazing discounts on all products"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Discount Percentage</Label>
                        <Input
                          type="number"
                          value={newPromo.discount_percentage}
                          onChange={(e) => setNewPromo(prev => ({ ...prev, discount_percentage: e.target.value }))}
                          placeholder="20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={newPromo.start_date}
                            onChange={(e) => setNewPromo(prev => ({ ...prev, start_date: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            value={newPromo.end_date}
                            onChange={(e) => setNewPromo(prev => ({ ...prev, end_date: e.target.value }))}
                          />
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => addPromoMutation.mutate(newPromo)}
                        disabled={!newPromo.title || addPromoMutation.isPending}
                      >
                        {addPromoMutation.isPending ? "Adding..." : "Add Promotion"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label>Show Offers Section</Label>
                  <p className="text-sm text-muted-foreground">Display offers on your store</p>
                </div>
                <Switch
                  checked={formData.show_offers_section}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_offers_section: checked }))}
                />
              </div>

              {promotions.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-xl">
                  <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No promotions yet</p>
                  <p className="text-sm text-muted-foreground">Add offers to attract more customers</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {promotions.map((promo) => (
                    <motion.div
                      key={promo.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {promo.discount_percentage ? (
                            <Percent className="w-5 h-5 text-primary" />
                          ) : (
                            <Tag className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{promo.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {promo.discount_percentage && `${promo.discount_percentage}% off`}
                            {promo.end_date && ` • Until ${new Date(promo.end_date).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={promo.is_active}
                          onCheckedChange={(checked) => togglePromoMutation.mutate({ id: promo.id, is_active: checked })}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deletePromoMutation.mutate(promo.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Contact & Social
              </CardTitle>
              <CardDescription>
                Let customers reach you easily
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  WhatsApp Number
                </Label>
                <Input
                  value={formData.whatsapp_number || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                  placeholder="+91 98765 43210"
                />
                <p className="text-xs text-muted-foreground">
                  Include country code. This will be used for WhatsApp orders.
                </p>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  Instagram URL
                </Label>
                <Input
                  value={formData.instagram_url || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram_url: e.target.value }))}
                  placeholder="https://instagram.com/yourstore"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook URL
                </Label>
                <Input
                  value={formData.facebook_url || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, facebook_url: e.target.value }))}
                  placeholder="https://facebook.com/yourstore"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layout Tab */}
        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="w-5 h-5" />
                Store Layout
              </CardTitle>
              <CardDescription>
                Configure how your store displays content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Product Layout Style</Label>
                <Select
                  value={formData.layout_style}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, layout_style: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="compact">Compact Grid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Display Options</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Categories</p>
                      <p className="text-sm text-muted-foreground">Display category filter tabs</p>
                    </div>
                    <Switch
                      checked={formData.show_categories}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_categories: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Search Bar</p>
                      <p className="text-sm text-muted-foreground">Let customers search products</p>
                    </div>
                    <Switch
                      checked={formData.show_search}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, show_search: checked }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreCustomizationPage;
