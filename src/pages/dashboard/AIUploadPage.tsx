import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Upload, Sparkles, Image, CheckCircle2, 
  RefreshCw, Edit, Trash2, Plus, Package, Loader2,
  Zap, Clock, Target, ImagePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
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

const categories = ["Groceries", "Dairy", "Snacks", "Beverages", "Personal Care", "Household", "Electronics", "Clothing"];

const AIUploadPage = () => {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "processing" | "results">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [detectedProducts, setDetectedProducts] = useState<DetectedProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const validFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );

    if (validFiles.length === 0) {
      toast.error("Please upload valid image files");
      return;
    }

    // Create preview URLs
    const imageUrls = validFiles.map(file => URL.createObjectURL(file));
    setUploadedImages(imageUrls);

    // Start upload simulation
    setUploadState("uploading");
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("processing");
          
          // Simulate AI processing
          setTimeout(() => {
            // Generate mock detected products based on uploaded images
            const mockProducts: DetectedProduct[] = validFiles.map((file, index) => ({
              id: `prod-${Date.now()}-${index}`,
              name: `Product ${index + 1}`,
              price: Math.floor(Math.random() * 500) + 50,
              category: categories[Math.floor(Math.random() * categories.length)],
              confidence: Math.floor(Math.random() * 15) + 85,
              image: imageUrls[index] || "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=200&h=200&fit=crop"
            }));
            
            setDetectedProducts(mockProducts);
            setSelectedProducts(new Set(mockProducts.map(p => p.id)));
            setUploadState("results");
            toast.success(`${mockProducts.length} products detected!`);
          }, 2000);
          
          return 100;
        }
        return prev + 8;
      });
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
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
    setUploadedImages([]);
    // Revoke object URLs
    uploadedImages.forEach(url => URL.revokeObjectURL(url));
  };

  const handleAddToCatalogue = () => {
    const selectedCount = selectedProducts.size;
    toast.success(`${selectedCount} products added to catalogue!`);
    resetUpload();
  };

  const updateProductField = (id: string, field: keyof DetectedProduct, value: string | number) => {
    setDetectedProducts(prev => 
      prev.map(p => p.id === id ? { ...p, [field]: value } : p)
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-0">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          AI-Powered
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">AI Product Upload</h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm sm:text-base">
          Snap a photo and let AI extract all product details automatically. Save hours of manual data entry.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
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
            className="bg-card rounded-xl border border-border p-3 sm:p-4 text-center"
          >
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-base sm:text-lg font-bold">{stat.value}</p>
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
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all bg-card ${
              dragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-light flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ImagePlus className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Upload Product Images</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm sm:text-base">
              Drag and drop images here, or use the buttons below. Our AI will extract name, price, and details automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 h-12"
                onClick={() => cameraInputRef.current?.click()}
              >
                <Camera className="w-5 h-5" />
                Take Photo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 h-12"
                onClick={() => fileInputRef.current?.click()}
              >
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
            className="bg-card rounded-2xl border border-border p-8 sm:p-12 text-center"
          >
            <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-light flex items-center justify-center mx-auto mb-6 shadow-lg">
              {uploadState === "uploading" ? (
                <Upload className="w-8 sm:w-10 h-8 sm:h-10 text-white animate-bounce" />
              ) : (
                <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-white animate-pulse" />
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {uploadState === "uploading" ? "Uploading Images..." : "AI Analyzing..."}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              {uploadState === "uploading" 
                ? "Please wait while we upload your images" 
                : "Detecting products and extracting details"
              }
            </p>

            {/* Preview uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="flex justify-center gap-2 mb-6 flex-wrap">
                {uploadedImages.slice(0, 4).map((url, idx) => (
                  <img 
                    key={idx}
                    src={url} 
                    alt={`Upload ${idx + 1}`}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-primary/20"
                  />
                ))}
                {uploadedImages.length > 4 && (
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-sm font-medium">
                    +{uploadedImages.length - 4}
                  </div>
                )}
              </div>
            )}

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
            className="space-y-4 sm:space-y-6"
          >
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Detected Products</h3>
                <p className="text-sm text-muted-foreground">
                  {detectedProducts.length} products found • {selectedProducts.size} selected
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetUpload} className="gap-2 flex-1 sm:flex-none">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload More</span>
                  <span className="sm:hidden">More</span>
                </Button>
                <Button 
                  className="gap-2 flex-1 sm:flex-none" 
                  disabled={selectedProducts.size === 0}
                  onClick={handleAddToCatalogue}
                >
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
                    <div className="relative flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
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
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <Input
                            value={product.name}
                            onChange={(e) => updateProductField(product.id, 'name', e.target.value)}
                            className="font-medium border-none p-0 h-auto text-base focus-visible:ring-0 bg-transparent"
                            placeholder="Product name"
                          />
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {product.confidence}% match
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
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
                            value={product.price}
                            onChange={(e) => updateProductField(product.id, 'price', Number(e.target.value))}
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Category</Label>
                          <Select 
                            value={product.category.toLowerCase()}
                            onValueChange={(value) => updateProductField(product.id, 'category', value)}
                          >
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
          className="bg-card rounded-xl border border-border p-4 sm:p-6"
        >
          <h3 className="text-lg font-semibold mb-6 text-center">How AI Upload Works</h3>
          
          <div className="grid sm:grid-cols-3 gap-6">
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
          className="bg-gradient-to-br from-primary/5 to-purple-light/5 rounded-xl border border-primary/20 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
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