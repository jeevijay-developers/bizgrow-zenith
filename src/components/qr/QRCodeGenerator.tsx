import { useRef, useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Image, FileCode, Printer, Store, Smartphone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface QRCodeGeneratorProps {
  url: string;
  storeName: string;
  themeColor?: string;
  logoUrl?: string;
}

export function QRCodeGenerator({ url, storeName, themeColor = "#10b981", logoUrl }: QRCodeGeneratorProps) {
  const [size, setSize] = useState<"128" | "256" | "512">("256");
  const [showLogo, setShowLogo] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

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

  const printPoster = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${storeName} - QR Code</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body { 
              font-family: 'Segoe UI', system-ui, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 40px;
              box-sizing: border-box;
              text-align: center;
            }
            .store-name {
              font-size: 36px;
              font-weight: bold;
              color: ${themeColor};
              margin-bottom: 20px;
            }
            .tagline {
              font-size: 18px;
              color: #666;
              margin-bottom: 40px;
            }
            .qr-container {
              padding: 30px;
              border: 3px solid ${themeColor};
              border-radius: 20px;
              background: white;
              margin-bottom: 30px;
            }
            .qr-container svg {
              display: block;
            }
            .scan-text {
              font-size: 24px;
              font-weight: 600;
              color: #333;
              margin-bottom: 10px;
            }
            .url-text {
              font-size: 14px;
              color: #888;
              word-break: break-all;
              max-width: 400px;
            }
            .footer {
              margin-top: 40px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="store-name">${storeName}</div>
          <div class="tagline">Scan to browse our products</div>
          <div class="qr-container">
            ${svgRef.current?.innerHTML || ''}
          </div>
          <div class="scan-text">Scan with your phone camera</div>
          <div class="url-text">${url}</div>
          <div class="footer">Powered by BizGrow 360</div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
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
        
        {logoUrl && (
          <div className="flex items-center gap-2">
            <Switch 
              id="show-logo" 
              checked={showLogo} 
              onCheckedChange={setShowLogo}
            />
            <Label htmlFor="show-logo" className="text-sm text-muted-foreground cursor-pointer">
              Show Logo
            </Label>
          </div>
        )}
      </div>

      {/* QR Code Display */}
      <div className="flex flex-col items-center gap-4" ref={posterRef}>
        <div 
          className="bg-white p-4 rounded-xl shadow-lg border relative"
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
              imageSettings={showLogo && logoUrl ? {
                src: logoUrl,
                x: undefined,
                y: undefined,
                height: sizeNum * 0.2,
                width: sizeNum * 0.2,
                excavate: true,
              } : undefined}
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
            imageSettings={showLogo && logoUrl ? {
              src: logoUrl,
              x: undefined,
              y: undefined,
              height: sizeNum * 0.4,
              width: sizeNum * 0.4,
              excavate: true,
            } : undefined}
          />
        </div>
      </div>

      {/* Download buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" className="gap-2" onClick={downloadPNG}>
          <Image className="w-4 h-4" />
          PNG
        </Button>
        <Button variant="outline" className="gap-2" onClick={downloadSVG}>
          <FileCode className="w-4 h-4" />
          SVG
        </Button>
        <Button variant="outline" className="gap-2" onClick={printPoster}>
          <Printer className="w-4 h-4" />
          Print Poster
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Scan to open: {url.length > 50 ? url.slice(0, 50) + "..." : url}
      </p>
    </div>
  );
}