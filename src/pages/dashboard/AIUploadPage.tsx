import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Upload, Sparkles, Image, CheckCircle2, X, 
  RefreshCw, Edit, Trash2, Plus, Package, Loader2,
  Zap, Clock, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DetectedProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  confidence: number;
  image: string;
}

const mockDetectedProducts: DetectedProduct[] = [
  { id: "1", name: "Tata Salt 1kg", price: 28, category: "Groceries", confidence: 95, image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=200&h=200&fit=crop" },
  { id: "2", name: "Amul Butter 500g", price: 275, category: "Dairy", confidence: 92, image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop" },
  { id: "3", name: "Fortune Oil 1L", price: 189, category: "Groceries", confidence: 88, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop" },
];

const categories = ["Groceries", "Dairy", "Snacks", "Beverages", "Personal Care", "Household"];

const AIUploadPage = () => {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "processing" | "results">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [detectedProducts, setDetectedProducts] = useState<DetectedProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const simulateUpload = () => {
    setUploadState("uploading");
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("processing");
          setTimeout(() => {
            setDetectedProducts(mockDetectedProducts);
            setSelectedProducts(new Set(mockDetectedProducts.map(p => p.id)));
            setUploadState("results");
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const resetUpload = () => {
    setUploadState("idle");
    setUploadProgress(0);
    setDetectedProducts([]);
    setSelectedProducts(new Set());
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          AI-Powered
        </div>
        <h1 className="text-2xl font-bold">AI Product Upload</h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Snap a photo and let AI extract all product details automatically. Save hours of manual data entry.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Zap, label: "Instant Detection", value: "<5 sec" },
          { icon: Target, label: "Accuracy Rate", value: "95%" },
          { icon: Clock, label: "Time Saved", value: "10x faster" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card rounded-xl border border-border p-4 text-center"
          >
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {uploadState === "idle" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              simulateUpload();
            }}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all bg-card cursor-pointer ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
            onClick={simulateUpload}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Camera className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Upload Product Images</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Drag and drop images here, or click to browse. Our AI will extract name, price, and details automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Camera className="w-5 h-5" />
                Take Photo
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Upload className="w-5 h-5" />
                Upload from Gallery
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Supports: JPG, PNG, HEIC • Max 10MB per image • Up to 20 images at once
            </p>
          </motion.div>
        )}

        {(uploadState === "uploading" || uploadState === "processing") && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-2xl border border-border p-12 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
              {uploadState === "uploading" ? (
                <Upload className="w-10 h-10 text-white animate-bounce" />
              ) : (
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              )}
            </div>

            <h3 className="text-xl font-semibold mb-2">
              {uploadState === "uploading" ? "Uploading Images..." : "AI Analyzing..."}
            </h3>
            <p className="text-muted-foreground mb-6">
              {uploadState === "uploading" 
                ? "Please wait while we upload your images" 
                : "Detecting products and extracting details"
              }
            </p>

            <div className="max-w-xs mx-auto space-y-2">
              <Progress value={uploadState === "uploading" ? uploadProgress : 100} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {uploadState === "uploading" ? `${uploadProgress}%` : "Processing with AI..."}
              </p>
            </div>
          </motion.div>
        )}

        {uploadState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Detected Products</h3>
                <p className="text-sm text-muted-foreground">
                  {detectedProducts.length} products found • {selectedProducts.size} selected
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetUpload} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Upload More
                </Button>
                <Button className="gap-2" disabled={selectedProducts.size === 0}>
                  <Package className="w-4 h-4" />
                  Add {selectedProducts.size} to Catalogue
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid gap-4">
              {detectedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-card rounded-xl border p-4 transition-all ${
                    selectedProducts.has(product.id)
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <button
                        onClick={() => toggleProductSelection(product.id)}
                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          selectedProducts.has(product.id)
                            ? "bg-primary text-white"
                            : "bg-muted border border-border"
                        }`}
                      >
                        {selectedProducts.has(product.id) && (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <Input
                            defaultValue={product.name}
                            className="font-medium border-none p-0 h-auto text-base focus-visible:ring-0"
                          />
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {product.confidence}% match
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => {
                              setDetectedProducts(prev => prev.filter(p => p.id !== product.id));
                              setSelectedProducts(prev => {
                                const newSet = new Set(prev);
                                newSet.delete(product.id);
                                return newSet;
                              });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Price (₹)</Label>
                          <Input
                            type="number"
                            defaultValue={product.price}
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Category</Label>
                          <Select defaultValue={product.category.toLowerCase()}>
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How it works */}
      {uploadState === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <h3 className="text-lg font-semibold mb-6 text-center">How AI Upload Works</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Camera,
                title: "1. Capture",
                description: "Take a photo of your product or its packaging",
              },
              {
                icon: Sparkles,
                title: "2. AI Analysis",
                description: "Our AI extracts name, price, category & more",
              },
              {
                icon: CheckCircle2,
                title: "3. Review & Add",
                description: "Review details and add to your catalogue",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-medium mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tips */}
      {uploadState === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl border border-primary/20 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Image className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-2">Tips for best results</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use good lighting - avoid shadows and glare</li>
                <li>• Capture the product label clearly</li>
                <li>• Include price tags if visible</li>
                <li>• Take photos in landscape for better accuracy</li>
                <li>• Upload multiple products in one image for batch processing</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIUploadPage;
