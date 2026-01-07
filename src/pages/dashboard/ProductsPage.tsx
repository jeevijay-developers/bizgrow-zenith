import { motion } from "framer-motion";
import { Package, Plus, Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalogue</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/ai-upload">
            <Button variant="outline" className="gap-2">
              <Package className="w-4 h-4" />
              AI Upload
            </Button>
          </Link>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No products yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Start building your catalogue by adding products manually or use AI to auto-fill from photos.
        </p>
        <div className="flex justify-center gap-3">
          <Link to="/dashboard/ai-upload">
            <Button variant="outline">AI Upload</Button>
          </Link>
          <Button>Add Manually</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductsPage;
