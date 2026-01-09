import { useRef, useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Image, FileCode } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface QRCodeGeneratorProps {
  url: string;
  storeName: string;
  themeColor?: string;
}

export function QRCodeGenerator({ url, storeName, themeColor = "#10b981" }: QRCodeGeneratorProps) {
  const [size, setSize] = useState<"128" | "256" | "512">("256");
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const sizeNum = parseInt(size);

  const downloadPNG = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) {
      toast.error("Failed to generate QR code");
      return;
    }

    const link = document.createElement("a");
    link.download = `${storeName.replace(/\s+/g, "-").toLowerCase()}-qr-code.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast.success("QR Code downloaded as PNG!");
  };

  const downloadSVG = () => {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg) {
      toast.error("Failed to generate QR code");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.download = `${storeName.replace(/\s+/g, "-").toLowerCase()}-qr-code.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success("QR Code downloaded as SVG!");
  };

  return (
    <div className="space-y-4">
      {/* Size selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Size:</span>
        <Select value={size} onValueChange={(v) => setSize(v as typeof size)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="128">Small (128px)</SelectItem>
            <SelectItem value="256">Medium (256px)</SelectItem>
            <SelectItem value="512">Large (512px)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* QR Code Display */}
      <div className="flex flex-col items-center gap-4">
        <div 
          className="bg-white p-4 rounded-xl shadow-lg border"
          style={{ width: sizeNum + 32, height: sizeNum + 32 }}
        >
          <div ref={svgRef}>
            <QRCodeSVG
              value={url}
              size={sizeNum}
              level="H"
              includeMargin={false}
              fgColor={themeColor}
              bgColor="#ffffff"
            />
          </div>
        </div>
        
        {/* Hidden canvas for PNG download */}
        <div ref={canvasRef} className="hidden">
          <QRCodeCanvas
            value={url}
            size={sizeNum * 2}
            level="H"
            includeMargin={true}
            fgColor={themeColor}
            bgColor="#ffffff"
          />
        </div>
      </div>

      {/* Download buttons */}
      <div className="flex gap-2 justify-center">
        <Button variant="outline" className="gap-2" onClick={downloadPNG}>
          <Image className="w-4 h-4" />
          PNG
        </Button>
        <Button variant="outline" className="gap-2" onClick={downloadSVG}>
          <FileCode className="w-4 h-4" />
          SVG
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Scan to open: {url.length > 50 ? url.slice(0, 50) + "..." : url}
      </p>
    </div>
  );
}