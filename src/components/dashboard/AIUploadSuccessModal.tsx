import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, Sparkles, Tag, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UploadedProduct {
  name: string;
  price: number;
  category: string;
  imageUrl?: string | null;
}

interface AIUploadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: UploadedProduct[];
  onViewProducts: () => void;
}

const AIUploadSuccessModal = ({ isOpen, onClose, products, onViewProducts }: AIUploadSuccessModalProps) => {
  const totalProducts = products.length;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0">
        {/* Success Header with Animation */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-6 text-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                initial={{ 
                  x: Math.random() * 300, 
                  y: Math.random() * 100,
                  scale: 0 
                }}
                animate={{ 
                  y: [null, -100],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>
          
          {/* Success Icon */}
          <motion.div 
            className="relative z-10 flex flex-col items-center text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <motion.div 
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2 justify-center">
                <Sparkles className="w-5 h-5" />
                Upload Successful!
              </DialogTitle>
            </DialogHeader>
            <p className="text-white/90 mt-2">
              {totalProducts} {totalProducts === 1 ? 'product' : 'products'} added to your catalogue
            </p>
          </motion.div>
        </div>

        {/* Product Preview */}
        <div className="p-6 space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Products Added
          </h4>
          
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            <AnimatePresence>
              {products.slice(0, 5).map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border hover:bg-muted/80 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden border border-border shrink-0">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-primary/50" />
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{product.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-0.5">
                        <Tag className="w-3 h-3" />
                        {product.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center text-emerald-600 font-semibold shrink-0">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {product.price.toLocaleString('en-IN')}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {products.length > 5 && (
              <p className="text-center text-sm text-muted-foreground py-2">
                +{products.length - 5} more products
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Add More Products
            </Button>
            <Button
              onClick={onViewProducts}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              View Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIUploadSuccessModal;
