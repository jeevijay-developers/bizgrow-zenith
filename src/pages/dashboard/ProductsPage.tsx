import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, Plus, Search, Filter, Grid, List, MoreVertical, 
  Edit, Trash2, Eye, Star, TrendingUp, AlertTriangle,
  X, Upload, Camera, Loader2, ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useOutletContext } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useImageUpload } from "@/hooks/useImageUpload";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

interface DashboardContext {
  store: {
    id: string;
    name: string;
  } | null;
}

const categories = ["All", "Groceries", "Dairy", "Snacks", "Beverages", "Personal Care", "Household"];

interface Product {
  id: string;
  name: string;
  price: number;
  compare_price: number | null;
  category: string | null;
  stock_quantity: number | null;
  description: string | null;
  is_available: boolean | null;
  image_url: string | null;
}

const ProductsPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    compare_price: "",
    category: "",
    stock_quantity: "",
    description: "",
    is_available: true,
    image_url: "",
  });
  
  // Image upload hook
  const { uploadImage, uploading: imageUploading, progress: uploadProgress } = useImageUpload({
    bucket: "product-images",
    folder: store?.id || "uploads",
  });
  const addImageInputRef = useRef<HTMLInputElement>(null);
  const editImageInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload for new product
  const handleAddProductImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const url = await uploadImage(file);
    if (url) {
      setNewProduct(prev => ({ ...prev, image_url: url }));
      toast.success("Image uploaded!");
    }
  };

  // Handle image upload for editing product
  const handleEditProductImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;
    
    const url = await uploadImage(file);
    if (url) {
      setEditingProduct(prev => prev ? { ...prev, image_url: url } : null);
      toast.success("Image uploaded!");
    }
  };

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!store?.id,
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async () => {
      if (!store?.id) throw new Error("No store found");
      const { error } = await supabase.from("products").insert({
        store_id: store.id,
        name: newProduct.name,
        price: parseFloat(newProduct.price) || 0,
        compare_price: newProduct.compare_price ? parseFloat(newProduct.compare_price) : null,
        category: newProduct.category || null,
        stock_quantity: parseInt(newProduct.stock_quantity) || 0,
        description: newProduct.description || null,
        is_available: newProduct.is_available,
        image_url: newProduct.image_url || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", store?.id] });
      toast.success("Product added successfully!");
      setAddProductOpen(false);
      setNewProduct({
        name: "",
        price: "",
        compare_price: "",
        category: "",
        stock_quantity: "",
        description: "",
        is_available: true,
        image_url: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to add product: " + error.message);
    },
  });

  // Edit product mutation
  const editProductMutation = useMutation({
    mutationFn: async (product: Partial<Product> & { id: string }) => {
      const { error } = await supabase
        .from("products")
        .update({
          name: product.name,
          price: product.price,
          compare_price: product.compare_price,
          category: product.category,
          stock_quantity: product.stock_quantity,
          description: product.description,
          is_available: product.is_available,
          image_url: product.image_url,
        })
        .eq("id", product.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", store?.id] });
      toast.success("Product updated successfully!");
      setEditProductOpen(false);
      setEditingProduct(null);
    },
    onError: (error) => {
      toast.error("Failed to update product: " + error.message);
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase.from("products").delete().eq("id", productId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", store?.id] });
      toast.success("Product deleted!");
    },
    onError: (error) => {
      toast.error("Failed to delete product: " + error.message);
    },
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditProductOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusConfig = (product: typeof products[0]) => {
    if (!product.is_available) return { status: "unavailable", color: "bg-gray-500/10 text-gray-600 border-gray-500/20" };
    if ((product.stock_quantity ?? 0) === 0) return { status: "out-of-stock", color: "bg-red-500/10 text-red-600 border-red-500/20" };
    if ((product.stock_quantity ?? 0) < 10) return { status: "low-stock", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" };
    return { status: "active", color: "bg-green-500/10 text-green-600 border-green-500/20" };
  };

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-primary" },
    { label: "Active", value: products.filter(p => p.is_available && (p.stock_quantity ?? 0) > 0).length, icon: TrendingUp, color: "text-green-600" },
    { label: "Low Stock", value: products.filter(p => (p.stock_quantity ?? 0) > 0 && (p.stock_quantity ?? 0) < 10).length, icon: AlertTriangle, color: "text-orange-600" },
    { label: "Out of Stock", value: products.filter(p => (p.stock_quantity ?? 0) === 0).length, icon: X, color: "text-red-600" },
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
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalogue ({products.length} products)</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/ai-upload">
            <Button variant="outline" className="gap-2">
              <Camera className="w-4 h-4" />
              AI Upload
            </Button>
          </Link>
          <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {/* Image Upload */}
                <input
                  type="file"
                  ref={addImageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleAddProductImage}
                />
                <div 
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden"
                  onClick={() => addImageInputRef.current?.click()}
                >
                  {newProduct.image_url ? (
                    <div className="relative">
                      <img src={newProduct.image_url} alt="Product" className="w-full h-32 object-contain rounded-lg" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0 h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewProduct(prev => ({ ...prev, image_url: "" }));
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : imageUploading ? (
                    <div className="space-y-2">
                      <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
                      <Progress value={uploadProgress} className="h-2 w-32 mx-auto" />
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload product image</p>
                    </>
                  )}
                </div>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Product Name *</Label>
                    <Input 
                      placeholder="Enter product name" 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price (₹) *</Label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Compare Price</Label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        value={newProduct.compare_price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, compare_price: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select 
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Stock Quantity</Label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        value={newProduct.stock_quantity}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, stock_quantity: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Enter product description..." 
                      value={newProduct.description}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Available for sale</Label>
                    <Switch 
                      checked={newProduct.is_available}
                      onCheckedChange={(checked) => setNewProduct(prev => ({ ...prev, is_available: checked }))}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => addProductMutation.mutate()}
                    disabled={!newProduct.name || !newProduct.price || addProductMutation.isPending}
                  >
                    {addProductMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding...</>
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Product Dialog */}
          <Dialog open={editProductOpen} onOpenChange={setEditProductOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              {editingProduct && (
                <div className="space-y-4 pt-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Product Name *</Label>
                      <Input 
                        placeholder="Enter product name" 
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, name: e.target.value } : null)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price (₹) *</Label>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Compare Price</Label>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          value={editingProduct.compare_price || ""}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, compare_price: e.target.value ? parseFloat(e.target.value) : null } : null)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select 
                          value={editingProduct.category || ""}
                          onValueChange={(value) => setEditingProduct(prev => prev ? { ...prev, category: value } : null)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Stock Quantity</Label>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          value={editingProduct.stock_quantity ?? 0}
                          onChange={(e) => setEditingProduct(prev => prev ? { ...prev, stock_quantity: parseInt(e.target.value) || 0 } : null)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        placeholder="Enter product description..." 
                        value={editingProduct.description || ""}
                        onChange={(e) => setEditingProduct(prev => prev ? { ...prev, description: e.target.value } : null)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Available for sale</Label>
                      <Switch 
                        checked={editingProduct.is_available ?? true}
                        onCheckedChange={(checked) => setEditingProduct(prev => prev ? { ...prev, is_available: checked } : null)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setEditProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={() => editingProduct && editProductMutation.mutate(editingProduct)}
                      disabled={!editingProduct.name || editProductMutation.isPending}
                    >
                      {editProductMutation.isPending ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Bar */}
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
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid/List */}
      <AnimatePresence mode="wait">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-xl border border-border p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "No products found" : "No products yet"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              {searchQuery ? "Try adjusting your search or filters" : "Start building your catalogue by adding products."}
            </p>
            {!searchQuery && (
              <div className="flex justify-center gap-3">
                <Link to="/dashboard/ai-upload">
                  <Button variant="outline">AI Upload</Button>
                </Link>
                <Button onClick={() => setAddProductOpen(true)}>Add Manually</Button>
              </div>
            )}
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredProducts.map((product, index) => {
              const statusConfig = getStatusConfig(product);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group"
                >
                  <div className="aspect-square relative overflow-hidden bg-muted">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground/50" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge className={`${statusConfig.color} text-xs`}>
                        {statusConfig.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category || "Uncategorized"}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => deleteProductMutation.mutate(product.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold">₹{product.price}</span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-sm text-muted-foreground line-through ml-2">₹{product.compare_price}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>Stock: {product.stock_quantity ?? 0}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stock</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product, index) => {
                  const statusConfig = getStatusConfig(product);
                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                            {product.image_url ? (
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-6 h-6 text-muted-foreground/50" />
                            )}
                          </div>
                          <p className="font-medium">{product.name}</p>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{product.category || "—"}</td>
                      <td className="p-4">
                        <span className="font-medium">₹{product.price}</span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-sm text-muted-foreground line-through ml-2">₹{product.compare_price}</span>
                        )}
                      </td>
                      <td className="p-4">{product.stock_quantity ?? 0}</td>
                      <td className="p-4">
                        <Badge className={`${statusConfig.color} text-xs`}>
                          {statusConfig.status.replace("-", " ")}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => deleteProductMutation.mutate(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
