import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Link2, Copy, ExternalLink, Share2, 
  Check, Eye, MessageCircle, Facebook, Twitter,
  Smartphone, Monitor, RefreshCw, QrCode, X, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeGenerator } from "@/components/qr/QRCodeGenerator";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface DashboardContext {
  store: {
    id: string;
    name: string;
    category: string;
    is_active: boolean;
  } | null;
}

// Generate store slug from name (lowercase, remove special chars, replace spaces with hyphens)
const generateStoreSlug = (name: string | undefined | null): string => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 20);
};

const CatalogueLinkPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");
  const [showShareSheet, setShowShareSheet] = useState(false);

  // Fetch store customizations for logo
  const { data: customization } = useQuery({
    queryKey: ["store-customization", store?.id],
    queryFn: async () => {
      if (!store?.id) return null;
      const { data, error } = await supabase
        .from("store_customizations")
        .select("logo_url, theme_color")
        .eq("store_id", store.id)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!store?.id,
  });

  // For now, use the current origin. In production with custom domain, this would be bizgrow360.com
  const baseUrl = window.location.origin;
  const storeSlug = store ? generateStoreSlug(store.name) : '';
  // Create a friendly URL with store slug + full UUID for reliable lookup
  const storeLink = store ? `${baseUrl}/s/${storeSlug}-${store.id}` : "";
  
  // Preview link uses the full store ID for internal preview
  const previewLink = store ? `${baseUrl}/store/${store.id}` : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(storeLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenStore = () => {
    window.open(storeLink, "_blank");
  };

  const handleShareWhatsApp = () => {
    const message = `Check out my store "${store?.name}" on BizGrow 360!\n\n${storeLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeLink)}`, "_blank");
  };

  const handleShareTwitter = () => {
    const message = `Check out my store "${store?.name}" on BizGrow 360!`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(storeLink)}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${store?.name} - Digital Store`,
          text: `Check out my store "${store?.name}"!`,
          url: storeLink,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      setShowShareSheet(true);
    }
  };

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading store information...</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 max-w-4xl mx-auto pb-24 lg:pb-6">
        {/* Prominent Share Store Hero - Mobile First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-primary-foreground"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge className="bg-white/20 text-white border-0 mb-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Your Digital Store
                </Badge>
                <h1 className="text-xl sm:text-2xl font-bold mb-1">{store.name}</h1>
                <p className="text-white/70 text-sm capitalize">
                  {(store.category || "").replace("-", " ")} Store
                </p>
              </div>
              <Badge 
                className={store.is_active 
                  ? "bg-green-500/20 text-green-300 border-green-500/30" 
                  : "bg-white/10 text-white/60 border-white/20"
                }
              >
                {store.is_active ? "● Live" : "○ Offline"}
              </Badge>
            </div>

            {/* Big Share Button */}
            <Button
              size="lg"
              onClick={handleNativeShare}
              className="w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg gap-2 h-12 text-base"
            >
              <Share2 className="w-5 h-5" />
              Share Your Store
            </Button>

            {/* Quick Actions Row */}
            <div className="flex gap-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white gap-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenStore}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                View Store
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Store Link Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                Your Store Link
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    value={storeLink}
                    readOnly
                    className="pr-20 font-mono text-xs sm:text-sm bg-muted/50"
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 gap-1 text-xs"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Share this link with customers to let them browse your products
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share Options - Desktop Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="hidden sm:block"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Quick Share
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  className="gap-2 h-auto py-3 flex-col hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950"
                  onClick={handleShareWhatsApp}
                >
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span className="text-xs">WhatsApp</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 h-auto py-3 flex-col hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950"
                  onClick={handleShareFacebook}
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <span className="text-xs">Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 h-auto py-3 flex-col hover:bg-sky-50 hover:border-sky-200 dark:hover:bg-sky-950"
                  onClick={handleShareTwitter}
                >
                  <Twitter className="w-5 h-5 text-sky-500" />
                  <span className="text-xs">Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 h-auto py-3 flex-col"
                  onClick={handleCopy}
                >
                  <Copy className="w-5 h-5 text-muted-foreground" />
                  <span className="text-xs">Copy Link</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      {/* QR Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code
            </CardTitle>
            <CardDescription>
              Print this QR code for in-store display
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <QRCodeGenerator 
                url={storeLink} 
                storeName={store.name} 
                themeColor={customization?.theme_color || "#10b981"}
                logoUrl={customization?.logo_url || undefined}
              />
              <div className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground">
                  Customers can scan this QR code to instantly access your digital catalogue. 
                  Perfect for:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• In-store counter display</li>
                  <li>• Business cards</li>
                  <li>• Flyers and posters</li>
                  <li>• Product packaging</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Store Preview
                </CardTitle>
                <CardDescription>
                  See how your store looks to customers
                </CardDescription>
              </div>
              <div className="flex gap-1 border rounded-lg p-1">
                <Button
                  variant={previewDevice === "mobile" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewDevice("mobile")}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
                <Button
                  variant={previewDevice === "desktop" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewDevice("desktop")}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`mx-auto bg-muted rounded-xl overflow-hidden border-4 border-foreground/10 ${
              previewDevice === "mobile" ? "w-64 h-[480px]" : "w-full h-[400px]"
            }`}>
              <iframe
                src={previewLink}
                className="w-full h-full"
                title="Store Preview"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm" onClick={() => {
                const iframe = document.querySelector('iframe');
                if (iframe) iframe.src = previewLink;
              }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">💡 Tips to get more customers</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>• Share your store link on WhatsApp status daily</li>
              <li>• Add products with good photos and descriptions</li>
              <li>• Keep your product prices updated</li>
              <li>• Print QR code and display it at your store counter</li>
              <li>• Add your store link to your business card</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>

    {/* Mobile Share Sheet */}
    <Sheet open={showShareSheet} onOpenChange={setShowShareSheet}>
      <SheetContent side="bottom" className="h-auto rounded-t-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-left flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Store
          </SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          <button
            onClick={() => { handleShareWhatsApp(); setShowShareSheet(false); }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-medium">WhatsApp</span>
          </button>
          <button
            onClick={() => { handleShareFacebook(); setShowShareSheet(false); }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <Facebook className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-medium">Facebook</span>
          </button>
          <button
            onClick={() => { handleShareTwitter(); setShowShareSheet(false); }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-full bg-sky-500 flex items-center justify-center shadow-lg">
              <Twitter className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs font-medium">Twitter</span>
          </button>
          <button
            onClick={() => { handleCopy(); setShowShareSheet(false); }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center shadow-lg">
              <Copy className="w-7 h-7 text-foreground" />
            </div>
            <span className="text-xs font-medium">Copy Link</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>

    {/* Floating Share Button - Mobile */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="lg:hidden fixed bottom-20 right-4 z-40"
    >
      <Button
        size="lg"
        onClick={handleNativeShare}
        className="h-14 w-14 rounded-full shadow-xl bg-accent hover:bg-accent/90 p-0"
      >
        <Share2 className="w-6 h-6" />
      </Button>
    </motion.div>
    </>
  );
};

export default CatalogueLinkPage;