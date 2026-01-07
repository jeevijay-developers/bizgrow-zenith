import { motion } from "framer-motion";
import { Camera, Upload, Sparkles, Image, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIUploadPage = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">AI Product Upload</h1>
        <p className="text-muted-foreground mt-2">
          Snap a photo and let AI extract all product details automatically
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-primary/50 transition-colors bg-card"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-purple-light flex items-center justify-center mx-auto mb-6">
          <Camera className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">Upload Product Images</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Take a photo of your product or upload from gallery. Our AI will extract name, price, and details.
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
      </motion.div>

      {/* How it works */}
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

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-primary/5 to-purple-light/5 rounded-xl border border-primary/20 p-6"
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
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIUploadPage;
