import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Link2, Copy, ExternalLink, Share2, QrCode, 
  Check, Eye, MessageCircle, Facebook, Twitter,
  Smartphone, Monitor, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

interface DashboardContext {
  store: {
    id: string;
    name: string;
    category: string;
    is_active: boolean;
  } | null;
}

const CatalogueLinkPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "desktop">("mobile");

  const baseUrl = window.location.origin;
  const storeLink = store ? `${baseUrl}/store/${store.id}` : "";

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

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading store information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Link2 className="w-6 h-6" />
          Store Catalogue Link
        </h1>
        <p className="text-muted-foreground">
          Share your digital catalogue with customers
        </p>
      </div>

      {/* Store Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{store.name}</CardTitle>
                <CardDescription className="capitalize">
                  {(store.category || "").replace("-", " ")} Store
                </CardDescription>
              </div>
              <Badge variant={store.is_active ? "default" : "secondary"}>
                {store.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Input
                  value={storeLink}
                  readOnly
                  className="pr-24 font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 gap-1"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <><Check className="w-3 h-3" /> Copied</>
                  ) : (
                    <><Copy className="w-3 h-3" /> Copy</>
                  )}
                </Button>
              </div>
              <Button onClick={handleOpenStore} className="gap-2">
                <ExternalLink className="w-4 h-4" />
                View Store
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Share Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Your Store
            </CardTitle>
            <CardDescription>
              Share your catalogue link on social media and messaging apps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="gap-2 h-auto py-4 flex-col"
                onClick={handleShareWhatsApp}
              >
                <MessageCircle className="w-6 h-6 text-green-500" />
                <span>WhatsApp</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2 h-auto py-4 flex-col"
                onClick={handleShareFacebook}
              >
                <Facebook className="w-6 h-6 text-blue-600" />
                <span>Facebook</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2 h-auto py-4 flex-col"
                onClick={handleShareTwitter}
              >
                <Twitter className="w-6 h-6 text-sky-500" />
                <span>Twitter</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2 h-auto py-4 flex-col"
                onClick={handleCopy}
              >
                <Copy className="w-6 h-6 text-muted-foreground" />
                <span>Copy Link</span>
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
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-40 h-40 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                  <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">QR Code Preview</p>
                </div>
              </div>
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
                <Button variant="outline" className="gap-2">
                  <QrCode className="w-4 h-4" />
                  Download QR Code
                </Button>
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
                src={storeLink}
                className="w-full h-full"
                title="Store Preview"
              />
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm" onClick={() => {
                const iframe = document.querySelector('iframe');
                if (iframe) iframe.src = storeLink;
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
  );
};

export default CatalogueLinkPage;