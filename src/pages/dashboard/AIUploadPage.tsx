import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Upload, Sparkles, Image, CheckCircle2, 
  RefreshCw, Edit, Trash2, Plus, Package, Loader2,
  Zap, Clock, Target, ImagePlus, AlertCircle, Check, X,
  Wand2, ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DetectedProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  confidence: number;
  originalImage: string;
  enhancedImage?: string;
  selectedImage: "original" | "enhanced";
  description?: string;
  brand?: string;
}

interface DashboardContext {
  store: {
    id: string;
    name: string;
  } | null;
}

const defaultCategories = [
  // General categories
  "Groceries", "Dairy", "Snacks", "Beverages", "Personal Care", 
  "Household", "Electronics", "Clothing", "Fruits", "Vegetables",
  "Bakery", "Frozen Foods", "Meat & Seafood", "Health & Wellness",
  "Baby Products", "Pet Supplies", "Home Decor",
  // Stationery specific
  "Pens", "Pencils", "Notebooks", "Books", "Stickers", "Art & Craft",
  "Paper & Notebooks", "Stamps", "Gifts & Decor", "Frames & Decor",
  "Accessories", "Party Supplies", "Office Supplies", "School Supplies",
  // Additional categories
  "Toys", "Games", "Sports", "Automotive", "Garden", "Hardware",
  "Pharmacy", "Cosmetics", "Jewelry", "Watches", "Bags", "Footwear"
];

interface UploadFailure {
  productName: string;
  error: string;
  type: 'image' | 'product';
}

const AIUploadPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "processing" | "enhancing" | "results">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [detectedProducts, setDetectedProducts] = useState<DetectedProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newCategoryInput, setNewCategoryInput] = useState<string>("");
  const [showAddCategory, setShowAddCategory] = useState<string | null>(null);
  const [uploadFailures, setUploadFailures] = useState<UploadFailure[]>([]);
  
  const allCategories = [...defaultCategories, ...customCategories];
  const [isAddingToCatalogue, setIsAddingToCatalogue] = useState(false);
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

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
    setUploadedFiles(validFiles);

    // Start upload
    setUploadState("uploading");
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Convert images to base64 and send to AI
      const base64Images = await Promise.all(validFiles.map(fileToBase64));
      
      setUploadProgress(100);
      setUploadState("processing");

      // Small delay before moving to enhancing state
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadState("enhancing");

      // Call AI edge function with enhancement enabled
      const { data, error } = await supabase.functions.invoke('ai-product-detection', {
        body: { images: base64Images, enhanceImages: true }
      });

      clearInterval(progressInterval);

      if (error) {
        console.error("AI detection error:", error);
        toast.error("Failed to analyze images. Please try again.");
        setUploadState("idle");
        return;
      }

      if (data?.products && data.products.length > 0) {
        // Map AI results with uploaded images
        const detectedWithImages: DetectedProduct[] = data.products.map((product: any, index: number) => ({
          id: `prod-${Date.now()}-${index}`,
          name: product.name || `Product ${index + 1}`,
          price: product.price || 0,
          category: product.category || "Groceries",
          confidence: product.confidence || 85,
          originalImage: product.originalImage || imageUrls[index] || imageUrls[0],
          enhancedImage: product.enhancedImage,
          selectedImage: product.enhancedImage ? "enhanced" : "original",
          description: product.description,
          brand: product.brand
        }));

        setDetectedProducts(detectedWithImages);
        setSelectedProducts(new Set(detectedWithImages.map(p => p.id)));
        setUploadState("results");
        
        const enhancedCount = detectedWithImages.filter(p => p.enhancedImage).length;
        toast.success(`${detectedWithImages.length} products detected! ${enhancedCount > 0 ? `${enhancedCount} images enhanced.` : ''}`);
      } else {
        toast.error("No products detected. Try with a clearer image.");
        setUploadState("idle");
      }
    } catch (err) {
      console.error("Processing error:", err);
      clearInterval(progressInterval);
      toast.error("Failed to process images. Please try again.");
      setUploadState("idle");
    }
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
    // Revoke object URLs
    uploadedImages.forEach(url => URL.revokeObjectURL(url));
    setUploadedImages([]);
    setUploadedFiles([]);
  };

  const toggleImageSelection = (productId: string) => {
    setDetectedProducts(prev => 
      prev.map(p => {
        if (p.id === productId && p.enhancedImage) {
          return { 
            ...p, 
            selectedImage: p.selectedImage === "original" ? "enhanced" : "original" 
          };
        }
        return p;
      })
    );
  };

  const handleAddToCatalogue = async () => {
    if (!store) {
      toast.error("Store not found. Please try again.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;
    if (userError || !user) {
      console.error("Auth error fetching user:", userError);
      toast.error("Session expired. Please login again.");
      return;
    }

    const selectedProductsList = detectedProducts.filter(p => selectedProducts.has(p.id));
    if (selectedProductsList.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }

    setIsAddingToCatalogue(true);
    const failures: UploadFailure[] = [];
    let successCount = 0;

    try {
      // Upload images to storage and create products
      for (const product of selectedProductsList) {
        let imageUrl = null;
        let imageUploadFailed = false;

        // Get the selected image (original or enhanced)
        const imageToUpload = product.selectedImage === "enhanced" && product.enhancedImage 
          ? product.enhancedImage 
          : product.originalImage;

        // Convert base64 to blob and upload
        if (imageToUpload) {
          try {
            let blob: Blob;
            
            if (imageToUpload.startsWith('data:')) {
              // Base64 image - convert to blob properly
              const base64Data = imageToUpload.split(',')[1];
              const mimeType = imageToUpload.split(';')[0].split(':')[1] || 'image/jpeg';
              const byteCharacters = atob(base64Data);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              blob = new Blob([byteArray], { type: mimeType });
            } else if (imageToUpload.startsWith('blob:')) {
              // Blob URL - use the original file
              const productIndex = detectedProducts.indexOf(product);
              const file = uploadedFiles[productIndex];
              if (file) {
                blob = file;
              } else {
                const response = await fetch(imageToUpload);
                blob = await response.blob();
              }
            } else {
              // Regular URL
              const response = await fetch(imageToUpload);
              blob = await response.blob();
            }

            const fileExt = blob.type.includes('png') ? 'png' : 'jpg';
            // Storage RLS expects the first folder to be the authenticated user's id
            const fileName = `${user.id}/${store.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('product-images')
              .upload(fileName, blob, { 
                contentType: blob.type || 'image/jpeg',
                upsert: false
              });

            if (uploadError) {
              console.error("Storage upload error:", uploadError);
              imageUploadFailed = true;
              failures.push({
                productName: product.name,
                error: uploadError.message || 'Storage upload failed',
                type: 'image'
              });
            } else if (uploadData) {
              const { data: publicUrl } = supabase.storage
                .from('product-images')
                .getPublicUrl(uploadData.path);
              imageUrl = publicUrl.publicUrl;
              console.log("Image uploaded successfully:", imageUrl);
            }
          } catch (imgError) {
            console.error("Error uploading image:", imgError);
            imageUploadFailed = true;
            failures.push({
              productName: product.name,
              error: imgError instanceof Error ? imgError.message : 'Image processing failed',
              type: 'image'
            });
          }
        }

        // Insert product into database
        const { error: insertError } = await supabase.from('products').insert({
          store_id: store.id,
          name: product.name,
          price: product.price,
          category: product.category.toLowerCase(),
          description: product.description || null,
          image_url: imageUrl,
          is_available: true,
          stock_quantity: 100
        });

        if (insertError) {
          console.error("Error adding product:", insertError);
          failures.push({
            productName: product.name,
            error: insertError.message || 'Database insert failed',
            type: 'product'
          });
        } else {
          successCount++;
        }
      }

      // Update failures state for display
      setUploadFailures(failures);

      if (successCount > 0) {
        if (failures.length > 0) {
          toast.warning(`${successCount} products added, ${failures.length} failed`);
        } else {
          toast.success(`${successCount} products added to catalogue!`);
          resetUpload();
        }
      } else if (failures.length > 0) {
        toast.error("All uploads failed. Check the errors below.");
      }
    } catch (err) {
      console.error("Error adding to catalogue:", err);
      toast.error("Failed to add products. Please try again.");
    } finally {
      setIsAddingToCatalogue(false);
    }
  };

  const clearFailures = () => setUploadFailures([]);

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
          Snap a photo and let AI extract all product details and enhance images with clean white backgrounds.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { icon: Zap, label: "Instant Detection", value: "<5 sec" },
          { icon: Wand2, label: "Auto Enhancement", value: "Clean BG" },
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
              Drag and drop images here, or use the buttons below. Our AI will extract details and enhance images automatically.
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

        {(uploadState === "uploading" || uploadState === "processing" || uploadState === "enhancing") && (
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
              ) : uploadState === "processing" ? (
                <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-white animate-pulse" />
              ) : (
                <Wand2 className="w-8 sm:w-10 h-8 sm:h-10 text-white animate-pulse" />
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {uploadState === "uploading" 
                ? "Uploading Images..." 
                : uploadState === "processing" 
                  ? "AI Analyzing..." 
                  : "Enhancing Images..."
              }
            </h3>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              {uploadState === "uploading" 
                ? "Please wait while we upload your images" 
                : uploadState === "processing"
                  ? "Detecting products and extracting details"
                  : "Creating clean white backgrounds for your products"
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
                {uploadState === "uploading" 
                  ? `${uploadProgress}%` 
                  : uploadState === "processing"
                    ? "Processing with AI..."
                    : "Enhancing images..."
                }
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
                  disabled={selectedProducts.size === 0 || isAddingToCatalogue}
                  onClick={handleAddToCatalogue}
                >
                  {isAddingToCatalogue ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      Add {selectedProducts.size} to Catalogue
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Upload Failures Banner */}
            {uploadFailures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/30 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-destructive text-sm">
                        {uploadFailures.length} Upload{uploadFailures.length > 1 ? 's' : ''} Failed
                      </h4>
                      <div className="mt-2 space-y-1.5">
                        {uploadFailures.map((failure, idx) => (
                          <div key={idx} className="text-xs bg-background/50 rounded-lg px-2.5 py-1.5 flex items-start gap-2">
                            <Badge variant="outline" className="flex-shrink-0 text-[9px] h-4">
                              {failure.type === 'image' ? 'Image' : 'Product'}
                            </Badge>
                            <div className="min-w-0">
                              <span className="font-medium text-foreground truncate block">{failure.productName}</span>
                              <span className="text-muted-foreground truncate block">{failure.error}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                    onClick={clearFailures}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

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
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image Selection */}
                    <div className="flex-shrink-0">
                      <div className="flex gap-2 sm:flex-col">
                        {/* Original Image */}
                        <div 
                          onClick={() => product.enhancedImage && updateProductField(product.id, 'selectedImage' as any, 'original')}
                          className={`relative cursor-pointer transition-all ${
                            product.selectedImage === "original" || !product.enhancedImage
                              ? "ring-2 ring-primary rounded-lg" 
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={product.originalImage}
                            alt={`${product.name} - Original`}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                          />
                          <div className="absolute -top-1 -left-1 bg-muted text-muted-foreground text-[8px] px-1.5 py-0.5 rounded-full font-medium">
                            Original
                          </div>
                          {(product.selectedImage === "original" || !product.enhancedImage) && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </div>
                          )}
                        </div>

                        {/* Enhanced Image */}
                        {product.enhancedImage && (
                          <div 
                            onClick={() => updateProductField(product.id, 'selectedImage' as any, 'enhanced')}
                            className={`relative cursor-pointer transition-all ${
                              product.selectedImage === "enhanced" 
                                ? "ring-2 ring-primary rounded-lg" 
                                : "opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={product.enhancedImage}
                              alt={`${product.name} - Enhanced`}
                              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover bg-white"
                            />
                            <div className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-[8px] px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                              <Wand2 className="w-2 h-2" />
                              Enhanced
                            </div>
                            {product.selectedImage === "enhanced" && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Select/Deselect checkbox */}
                      <button
                        onClick={() => toggleProductSelection(product.id)}
                        className={`mt-2 w-full text-xs py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors ${
                          selectedProducts.has(product.id)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {selectedProducts.has(product.id) ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            Selected
                          </>
                        ) : (
                          "Select"
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
                            {product.enhancedImage && (
                              <Badge variant="outline" className="text-xs text-primary border-primary/30">
                                <Wand2 className="w-2.5 h-2.5 mr-1" />
                                AI Enhanced
                              </Badge>
                            )}
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
                          {showAddCategory === product.id ? (
                            <div className="flex gap-2">
                              <Input
                                value={newCategoryInput}
                                onChange={(e) => setNewCategoryInput(e.target.value)}
                                placeholder="New category..."
                                className="h-9 flex-1"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && newCategoryInput.trim()) {
                                    const newCat = newCategoryInput.trim();
                                    if (!allCategories.some(c => c.toLowerCase() === newCat.toLowerCase())) {
                                      setCustomCategories(prev => [...prev, newCat]);
                                    }
                                    updateProductField(product.id, 'category', newCat.toLowerCase());
                                    setNewCategoryInput("");
                                    setShowAddCategory(null);
                                  } else if (e.key === "Escape") {
                                    setNewCategoryInput("");
                                    setShowAddCategory(null);
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                className="h-9 px-3"
                                onClick={() => {
                                  if (newCategoryInput.trim()) {
                                    const newCat = newCategoryInput.trim();
                                    if (!allCategories.some(c => c.toLowerCase() === newCat.toLowerCase())) {
                                      setCustomCategories(prev => [...prev, newCat]);
                                    }
                                    updateProductField(product.id, 'category', newCat.toLowerCase());
                                    setNewCategoryInput("");
                                    setShowAddCategory(null);
                                  }
                                }}
                              >
                                Add
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-9 px-2"
                                onClick={() => {
                                  setNewCategoryInput("");
                                  setShowAddCategory(null);
                                }}
                              >
                                ✕
                              </Button>
                            </div>
                          ) : (
                            <Select 
                              value={product.category.toLowerCase()}
                              onValueChange={(value) => {
                                if (value === "__add_new__") {
                                  setShowAddCategory(product.id);
                                } else {
                                  updateProductField(product.id, 'category', value);
                                }
                              }}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {allCategories.map(cat => (
                                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                                ))}
                                <SelectItem value="__add_new__" className="text-primary font-medium">
                                  <span className="flex items-center gap-2">
                                    <Plus className="w-3 h-3" />
                                    Add Custom Category
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
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
          
          <div className="grid sm:grid-cols-4 gap-6">
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
                icon: Wand2,
                title: "3. Enhancement",
                description: "AI enhances images with clean white backgrounds",
              },
              {
                icon: CheckCircle2,
                title: "4. Review & Add",
                description: "Compare images, review details and add to catalogue",
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
                <li>• AI will enhance images with clean white backgrounds</li>
                <li>• You can choose between original or enhanced image</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIUploadPage;
