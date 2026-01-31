import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Download, Share2, Facebook, Twitter, 
  MessageCircle, Copy, Check, Sparkles, Image as ImageIcon,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toPng, toJpeg } from "html-to-image";

interface ProductFlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    compare_price?: number | null;
    image_url?: string | null;
    category?: string | null;
    description?: string | null;
  };
  storeName?: string;
}

const flyerTemplates = [
  {
    id: "gradient-purple",
    name: "Purple Gradient",
    bgClass: "bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800",
    textClass: "text-white",
    accentClass: "bg-yellow-400 text-purple-900",
    badgeClass: "bg-white/20 text-white",
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    bgClass: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    textClass: "text-white",
    accentClass: "bg-emerald-500 text-white",
    badgeClass: "bg-emerald-500/20 text-emerald-400",
  },
  {
    id: "warm-orange",
    name: "Warm Orange",
    bgClass: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
    textClass: "text-white",
    accentClass: "bg-white text-orange-600",
    badgeClass: "bg-white/20 text-white",
  },
  {
    id: "fresh-green",
    name: "Fresh Green",
    bgClass: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
    textClass: "text-white",
    accentClass: "bg-yellow-300 text-emerald-800",
    badgeClass: "bg-white/20 text-white",
  },
  {
    id: "elegant-gold",
    name: "Elegant Gold",
    bgClass: "bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-400",
    textClass: "text-gray-900",
    accentClass: "bg-gray-900 text-amber-400",
    badgeClass: "bg-gray-900/20 text-gray-900",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    bgClass: "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700",
    textClass: "text-white",
    accentClass: "bg-cyan-400 text-blue-900",
    badgeClass: "bg-white/20 text-white",
  },
];

export function ProductFlyerModal({ isOpen, onClose, product, storeName = "BizGrow Store" }: ProductFlyerModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);

  const template = flyerTemplates[selectedTemplate];
  const discount = product.compare_price && product.compare_price > product.price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null;

  const handleDownload = async (format: "png" | "jpeg" = "png") => {
    if (!flyerRef.current) return;
    
    setDownloading(true);
    try {
      const dataUrl = format === "png" 
        ? await toPng(flyerRef.current, { quality: 1, pixelRatio: 2 })
        : await toJpeg(flyerRef.current, { quality: 0.95, pixelRatio: 2 });
      
      const link = document.createElement("a");
      link.download = `${product.name.replace(/\s+/g, "-")}-flyer.${format}`;
      link.href = dataUrl;
      link.click();
      
      toast.success("Flyer downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download flyer");
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async (platform: "whatsapp" | "facebook" | "twitter" | "copy") => {
    const shareText = `🔥 ${product.name} - Just ₹${product.price}${discount ? ` (${discount}% OFF!)` : ""}\n\nShop now at ${storeName}!`;
    
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
        break;
      case "copy":
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  const handleNativeShare = async () => {
    if (!flyerRef.current || !navigator.share) return;
    
    try {
      const dataUrl = await toPng(flyerRef.current, { quality: 1, pixelRatio: 2 });
      const blob = await fetch(dataUrl).then(res => res.blob());
      const file = new File([blob], `${product.name}-flyer.png`, { type: "image/png" });
      
      await navigator.share({
        title: `${product.name} - ${storeName}`,
        text: `Check out ${product.name} at just ₹${product.price}!`,
        files: [file],
      });
    } catch (error) {
      // User cancelled or share failed silently
      console.log("Share cancelled or failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-background rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Product Flyer</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Flyer Preview */}
            <div className="space-y-4">
              <div className="relative">
                {/* Template Navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg"
                  onClick={() => setSelectedTemplate(prev => prev === 0 ? flyerTemplates.length - 1 : prev - 1)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg"
                  onClick={() => setSelectedTemplate(prev => prev === flyerTemplates.length - 1 ? 0 : prev + 1)}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* The Actual Flyer - This gets exported */}
                <div
                  ref={flyerRef}
                  className={`relative aspect-[4/5] rounded-xl overflow-hidden ${template.bgClass}`}
                >
                  {/* Decorative elements */}
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full p-6">
                    {/* Store Badge */}
                    <div className={`self-start px-3 py-1 rounded-full text-xs font-medium ${template.badgeClass}`}>
                      {storeName}
                    </div>

                    {/* Discount Badge */}
                    {discount && (
                      <div className={`absolute top-6 right-6 w-16 h-16 rounded-full flex items-center justify-center ${template.accentClass} font-bold text-lg shadow-lg`}>
                        {discount}%<br/>OFF
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="flex-1 flex items-center justify-center py-6">
                      {product.image_url ? (
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl scale-110" />
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="relative w-48 h-48 object-contain rounded-xl bg-white/90 p-3 shadow-2xl"
                          />
                        </div>
                      ) : (
                        <div className="w-48 h-48 rounded-xl bg-white/20 flex items-center justify-center">
                          <ImageIcon className="w-20 h-20 text-white/50" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={`space-y-3 ${template.textClass}`}>
                      {product.category && (
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium ${template.badgeClass}`}>
                          {product.category}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold leading-tight line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-black">₹{product.price}</span>
                        {product.compare_price && product.compare_price > product.price && (
                          <span className="text-lg line-through opacity-60">₹{product.compare_price}</span>
                        )}
                      </div>
                      
                      {/* CTA */}
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${template.accentClass}`}>
                        <span>Order Now</span>
                        <MessageCircle className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Selector */}
              <div className="flex gap-2 justify-center flex-wrap">
                {flyerTemplates.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(idx)}
                    className={`w-8 h-8 rounded-full ${t.bgClass} transition-all ${
                      selectedTemplate === idx ? "ring-2 ring-offset-2 ring-primary scale-110" : "opacity-70 hover:opacity-100"
                    }`}
                    title={t.name}
                  />
                ))}
              </div>
            </div>

            {/* Actions Panel */}
            <div className="space-y-6">
              {/* Download Section */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Flyer
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleDownload("png")}
                    disabled={downloading}
                    className="gap-2"
                  >
                    {downloading ? "Downloading..." : "PNG (Best Quality)"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload("jpeg")}
                    disabled={downloading}
                    className="gap-2"
                  >
                    JPEG (Smaller Size)
                  </Button>
                </div>
              </div>

              {/* Share Section */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share to Social Media
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleShare("whatsapp")}
                    className="gap-2 bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("facebook")}
                    className="gap-2 bg-[#1877F2]/10 border-[#1877F2]/30 text-[#1877F2] hover:bg-[#1877F2]/20"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("twitter")}
                    className="gap-2 bg-[#1DA1F2]/10 border-[#1DA1F2]/30 text-[#1DA1F2] hover:bg-[#1DA1F2]/20"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("copy")}
                    className="gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Text"}
                  </Button>
                </div>

                {/* Native Share (Mobile) */}
                {typeof navigator !== "undefined" && navigator.share && (
                  <Button
                    onClick={handleNativeShare}
                    className="w-full gap-2"
                    variant="secondary"
                  >
                    <Share2 className="w-4 h-4" />
                    Share with Image
                  </Button>
                )}
              </div>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                <h4 className="font-medium text-sm flex items-center gap-2 text-primary">
                  <Sparkles className="w-4 h-4" />
                  Pro Tips
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Download as PNG for best quality on social media</li>
                  <li>• Use WhatsApp to share directly with customers</li>
                  <li>• Try different templates for different occasions</li>
                  <li>• Add to WhatsApp Status for maximum reach</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
