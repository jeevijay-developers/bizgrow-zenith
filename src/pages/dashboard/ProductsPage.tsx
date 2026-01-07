import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, Plus, Search, Filter, Grid, List, MoreVertical, 
  Edit, Trash2, Eye, Image, Star, TrendingUp, AlertTriangle,
  X, Upload, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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

const mockProducts = [
  { 
    id: 1, 
    name: "Tata Salt", 
    category: "Groceries", 
    price: 28, 
    comparePrice: 32,
    stock: 45, 
    image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=100&h=100&fit=crop",
    status: "active",
    sales: 234,
    rating: 4.5
  },
  { 
    id: 2, 
    name: "Amul Butter 500g", 
    category: "Dairy", 
    price: 275, 
    comparePrice: 290,
    stock: 12, 
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&h=100&fit=crop",
    status: "active",
    sales: 189,
    rating: 4.8
  },
  { 
    id: 3, 
    name: "Maggi Noodles Pack", 
    category: "Snacks", 
    price: 168, 
    comparePrice: 180,
    stock: 5, 
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=100&h=100&fit=crop",
    status: "low-stock",
    sales: 456,
    rating: 4.2
  },
  { 
    id: 4, 
    name: "Fortune Sunflower Oil 1L", 
    category: "Groceries", 
    price: 189, 
    comparePrice: 210,
    stock: 28, 
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop",
    status: "active",
    sales: 312,
    rating: 4.6
  },
  { 
    id: 5, 
    name: "Parle-G Biscuits", 
    category: "Snacks", 
    price: 10, 
    comparePrice: 12,
    stock: 0, 
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop",
    status: "out-of-stock",
    sales: 567,
    rating: 4.9
  },
  { 
    id: 6, 
    name: "Coca Cola 2L", 
    category: "Beverages", 
    price: 95, 
    comparePrice: 105,
    stock: 34, 
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=100&h=100&fit=crop",
    status: "active",
    sales: 278,
    rating: 4.3
  },
];

const categories = ["All", "Groceries", "Dairy", "Snacks", "Beverages", "Personal Care"];

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addProductOpen, setAddProductOpen] = useState(false);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "low-stock": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "out-of-stock": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalogue ({mockProducts.length} products)</p>
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
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload product image</p>
                </div>
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input placeholder="Enter product name" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price (₹)</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Compare Price</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map(cat => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Stock Quantity</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Enter product description..." />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label>Available for sale</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setAddProductOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1">Add Product</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: mockProducts.length, icon: Package, color: "text-primary" },
          { label: "Active", value: mockProducts.filter(p => p.status === "active").length, icon: TrendingUp, color: "text-green-600" },
          { label: "Low Stock", value: mockProducts.filter(p => p.status === "low-stock").length, icon: AlertTriangle, color: "text-orange-600" },
          { label: "Out of Stock", value: mockProducts.filter(p => p.status === "out-of-stock").length, icon: X, color: "text-red-600" },
        ].map((stat, idx) => (
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
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              {searchQuery ? "Try adjusting your search or filters" : "Start building your catalogue by adding products."}
            </p>
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={`${getStatusColor(product.status)} text-xs`}>
                      {product.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button size="sm" variant="secondary" className="flex-1 h-8">
                      <Eye className="w-3 h-3 mr-1" /> View
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1 h-8">
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> View</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">₹{product.price}</span>
                      {product.comparePrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through ml-2">₹{product.comparePrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="text-muted-foreground">Stock: {product.stock}</span>
                    <span className="text-muted-foreground">{product.sales} sold</span>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Sales</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {product.rating}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{product.category}</td>
                    <td className="p-4">
                      <span className="font-medium">₹{product.price}</span>
                      {product.comparePrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through ml-2">₹{product.comparePrice}</span>
                      )}
                    </td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">
                      <Badge className={`${getStatusColor(product.status)} text-xs`}>
                        {product.status.replace("-", " ")}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground">{product.sales}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
