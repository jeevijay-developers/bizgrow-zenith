import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImagePlus, Upload, X, Check, Loader2, Package, 
  ChevronLeft, ChevronRight, AlertCircle, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string | null;
}

interface BulkImageUploadProps {
  storeId: string;
  productsWithoutImages: Product[];
  onComplete: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  assignedProductId: string | null;
}

const BulkImageUpload = ({ 
  storeId, 
  productsWithoutImages, 
  onComplete, 
  open, 
  onOpenChange 
}: BulkImageUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get products that still need images (not yet assigned)
  const availableProducts = productsWithoutImages.filter(
    p => !uploadedImages.some(img => img.assignedProductId === p.id)
  );

  // Get assigned count
  const assignedCount = uploadedImages.filter(img => img.assignedProductId).length;

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(
      file => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      toast.error("Please upload valid image files (max 10MB each)");
      return;
    }

    const newImages: UploadedImage[] = validFiles.map(file => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      file,
      preview: URL.createObjectURL(file),
      assignedProductId: null,
    }));

    setUploadedImages(prev => [...prev, ...newImages]);
    toast.success(`${validFiles.length} images added`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const assignImageToProduct = (productId: string) => {
    if (!selectedImageId) return;
    
    setUploadedImages(prev =>
      prev.map(img =>
        img.id === selectedImageId
          ? { ...img, assignedProductId: productId }
          : img
      )
    );
    setSelectedImageId(null);
    toast.success("Image assigned to product");
  };

  const unassignImage = (imageId: string) => {
    setUploadedImages(prev =>
      prev.map(img =>
        img.id === imageId ? { ...img, assignedProductId: null } : img
      )
    );
  };

  const removeImage = (imageId: string) => {
    const image = uploadedImages.find(img => img.id === imageId);
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    if (selectedImageId === imageId) {
      setSelectedImageId(null);
    }
  };

  const getProductForImage = (imageId: string) => {
    const image = uploadedImages.find(img => img.id === imageId);
    if (!image?.assignedProductId) return null;
    return productsWithoutImages.find(p => p.id === image.assignedProductId);
  };

  const handleSaveAll = async () => {
    const imagesToUpload = uploadedImages.filter(img => img.assignedProductId);
    
    if (imagesToUpload.length === 0) {
      toast.error("Please assign at least one image to a product");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;
    if (userError || !user) {
      console.error("Auth error fetching user:", userError);
      toast.error("Session expired. Please login again.");
      setIsUploading(false);
      return;
    }

    let successCount = 0;
    const totalImages = imagesToUpload.length;

    try {
      for (let i = 0; i < imagesToUpload.length; i++) {
        const image = imagesToUpload[i];
        
        try {
          // Upload image to storage
          const fileExt = image.file.name.split(".").pop();
          // Storage RLS expects the first folder to be the authenticated user's id
          const fileName = `${user.id}/${storeId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError, data: uploadData } = await supabase.storage
            .from("product-images")
            .upload(fileName, image.file, {
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from("product-images")
            .getPublicUrl(fileName);

          // Update product with image URL
          const { error: updateError } = await supabase
            .from("products")
            .update({ image_url: publicUrl })
            .eq("id", image.assignedProductId);

          if (updateError) throw updateError;

          successCount++;
        } catch (error) {
          console.error(`Failed to upload image for product:`, error);
        }

        setUploadProgress(Math.round(((i + 1) / totalImages) * 100));
      }

      if (successCount > 0) {
        toast.success(`${successCount} product images uploaded successfully!`);
        
        // Clear uploaded images
        uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
        setUploadedImages([]);
        
        onComplete();
        onOpenChange(false);
      } else {
        toast.error("Failed to upload images");
      }
    } catch (error) {
      console.error("Bulk upload error:", error);
      toast.error("Failed to complete bulk upload");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetAll = () => {
    uploadedImages.forEach(img => URL.revokeObjectURL(img.preview));
    setUploadedImages([]);
    setSelectedImageId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2 border-b">
          <DialogTitle className="flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-primary" />
            Bulk Image Upload
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {productsWithoutImages.length} products without images • {assignedCount} images assigned
          </p>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row h-[70vh]">
          {/* Left Panel - Upload and Images */}
          <div className="flex-1 p-4 border-r overflow-hidden flex flex-col">
            {/* Upload Zone */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all mb-4 flex-shrink-0 ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Drop images here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports JPG, PNG • Max 10MB per image
              </p>
            </div>

            {/* Uploaded Images Grid */}
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">
                  Uploaded Images ({uploadedImages.length})
                </h3>
                {uploadedImages.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetAll} className="text-xs h-7">
                    Clear All
                  </Button>
                )}
              </div>
              
              <ScrollArea className="h-[calc(100%-2rem)]">
                {uploadedImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ImagePlus className="w-12 h-12 text-muted-foreground/30 mb-2" />
                    <p className="text-sm text-muted-foreground">No images uploaded yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pb-4">
                    {uploadedImages.map(image => {
                      const assignedProduct = getProductForImage(image.id);
                      const isSelected = selectedImageId === image.id;
                      
                      return (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            isSelected
                              ? "border-primary ring-2 ring-primary/30"
                              : assignedProduct
                                ? "border-green-500"
                                : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedImageId(isSelected ? null : image.id)}
                        >
                          <img
                            src={image.preview}
                            alt="Upload"
                            className="w-full h-full object-cover"
                          />
                          
                          {/* Assigned indicator */}
                          {assignedProduct && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <Check className="w-6 h-6 text-primary" />
                            </div>
                          )}
                          
                          {/* Selection indicator */}
                          {isSelected && !assignedProduct && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <div className="text-xs font-medium text-primary bg-background/90 px-2 py-1 rounded">
                                Select a product →
                              </div>
                            </div>
                          )}
                          
                          {/* Actions */}
                          <div className="absolute top-1 right-1 flex gap-1">
                            {assignedProduct && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  unassignImage(image.id);
                                }}
                                className="p-1 bg-background/90 rounded-full hover:bg-background"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(image.id);
                              }}
                              className="p-1 bg-destructive/90 text-destructive-foreground rounded-full hover:bg-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          
                          {/* Product name badge */}
                          {assignedProduct && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                              <p className="text-[9px] text-white truncate font-medium">
                                {assignedProduct.name}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          {/* Right Panel - Products without images */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col bg-muted/30">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <h3 className="text-sm font-medium">
                Products Without Images ({availableProducts.length})
              </h3>
              {selectedImageId && (
                <Badge variant="secondary" className="text-xs">
                  Click a product to assign
                </Badge>
              )}
            </div>

            <ScrollArea className="flex-1">
              {availableProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Check className="w-12 h-12 text-primary mb-2" />
                  <p className="text-sm font-medium text-primary">All products have images!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload images assigned to {assignedCount} products
                  </p>
                </div>
              ) : (
                <div className="space-y-2 pb-4">
                  {availableProducts.map(product => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: selectedImageId ? 1.02 : 1 }}
                      onClick={() => selectedImageId && assignImageToProduct(product.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        selectedImageId
                          ? "cursor-pointer hover:border-primary hover:bg-primary/5"
                          : "cursor-default"
                      } bg-card`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-primary font-medium">₹{product.price}</span>
                          {product.category && (
                            <Badge variant="outline" className="text-[9px] h-4 capitalize">
                              {product.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {selectedImageId && (
                        <div className="text-xs text-primary font-medium">
                          + Assign
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {assignedCount > 0 ? (
              <span className="text-primary font-medium">
                {assignedCount} images ready to upload
              </span>
            ) : (
              <span>Select an image, then click a product to assign</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveAll} 
              disabled={assignedCount === 0 || isUploading}
              className="min-w-[140px]"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload {assignedCount} Images
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkImageUpload;
