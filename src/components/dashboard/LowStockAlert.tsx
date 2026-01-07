import { motion } from "framer-motion";
import { AlertTriangle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LowStockItem {
  id: string;
  name: string;
  stock: number;
  maxStock: number;
}

const mockLowStock: LowStockItem[] = [
  { id: "1", name: "Tata Salt 1kg", stock: 3, maxStock: 50 },
  { id: "2", name: "Amul Butter 500g", stock: 2, maxStock: 30 },
  { id: "3", name: "Maggi Noodles Pack", stock: 5, maxStock: 100 },
  { id: "4", name: "Fortune Oil 1L", stock: 4, maxStock: 40 },
];

export function LowStockAlert() {
  if (mockLowStock.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="bg-card rounded-xl border border-border"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
            <p className="text-sm text-muted-foreground">{mockLowStock.length} products running low</p>
          </div>
        </div>
        <Button variant="outline" size="sm">Restock All</Button>
      </div>
      
      <div className="p-4 space-y-4">
        {mockLowStock.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Progress 
                  value={(item.stock / item.maxStock) * 100} 
                  className="h-1.5 flex-1"
                />
                <span className="text-xs text-amber-600 font-medium">{item.stock} left</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              Update
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
