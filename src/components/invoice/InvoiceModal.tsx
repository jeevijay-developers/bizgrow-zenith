import { useState } from "react";
import { Printer, Download, MessageCircle, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InvoiceTemplate, InvoiceData } from "./InvoiceTemplate";
import { toast } from "sonner";

interface InvoiceItem {
  name: string;
  qty?: number;
  quantity?: number;
  price: number;
}

interface InvoiceInput {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_phone: string | null;
  customer_address: string | null;
  items: InvoiceItem[];
  subtotal: number;
  gst_percentage: number | null;
  gst_amount: number | null;
  discount_amount: number | null;
  total_amount: number;
  payment_method: string | null;
  created_at: string | null;
}

interface InvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: InvoiceInput;
  storeName?: string;
  storeAddress?: string;
}

export function InvoiceModal({ open, onOpenChange, invoice, storeName = "Store", storeAddress = "" }: InvoiceModalProps) {
  // Transform invoice to InvoiceData format
  const invoiceData: InvoiceData = {
    id: invoice.id,
    invoice_number: invoice.invoice_number,
    order_id: invoice.id,
    store_name: storeName,
    store_address: storeAddress,
    customer_name: invoice.customer_name,
    customer_phone: invoice.customer_phone || "",
    customer_address: invoice.customer_address || "",
    items: invoice.items.map((item) => ({
      name: item.name,
      quantity: item.qty || item.quantity || 1,
      price: item.price,
    })),
    subtotal: invoice.subtotal,
    gst_percentage: invoice.gst_percentage || 0,
    gst_amount: invoice.gst_amount || 0,
    discount_amount: invoice.discount_amount || 0,
    total_amount: invoice.total_amount,
    payment_method: invoice.payment_method || "cash",
    created_at: invoice.created_at || new Date().toISOString(),
  };
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    const printContent = document.getElementById("invoice-print");
    if (!printContent) {
      toast.error("Could not find invoice to print");
      setIsPrinting(false);
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Please allow popups to print invoice");
      setIsPrinting(false);
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${invoice.invoice_number}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              padding: 20px;
              max-width: 400px;
              margin: 0 auto;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
            .font-medium { font-weight: 500; }
            .font-semibold { font-weight: 600; }
            .text-sm { font-size: 0.875rem; }
            .text-xs { font-size: 0.75rem; }
            .text-lg { font-size: 1.125rem; }
            .text-2xl { font-size: 1.5rem; }
            .mb-1 { margin-bottom: 0.25rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mt-4 { margin-top: 1rem; }
            .mt-6 { margin-top: 1.5rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .p-3 { padding: 0.75rem; }
            .pt-4 { padding-top: 1rem; }
            .gap-2 { gap: 0.5rem; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .justify-center { justify-content: center; }
            .space-y-1 > * + * { margin-top: 0.25rem; }
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .text-gray-600 { color: #4b5563; }
            .text-gray-400 { color: #9ca3af; }
            .text-green-700 { color: #15803d; }
            .bg-gray-100 { background-color: #f3f4f6; }
            .rounded-lg { border-radius: 0.5rem; }
            .border-b { border-bottom: 1px solid #e5e7eb; }
            .border-t { border-top: 1px solid #e5e7eb; }
            .border-dashed { border-style: dashed; }
            .separator { height: 1px; background: #d1d5db; margin: 1rem 0; }
            .grid { display: grid; }
            .grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
            .col-span-6 { grid-column: span 6; }
            .col-span-2 { grid-column: span 2; }
            .badge { 
              display: inline-block;
              padding: 0.25rem 0.5rem;
              background: #f3f4f6;
              border-radius: 0.375rem;
              font-size: 0.75rem;
              text-transform: uppercase;
            }
            @media print {
              body { padding: 10px; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
      setIsPrinting(false);
      toast.success("Invoice printed!");
    }, 500);
  };

  const handleWhatsAppShare = () => {
    const itemsList = invoiceData.items
      .map((item) => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`)
      .join("\n");

    const message = `🧾 *Invoice from ${invoiceData.store_name}*

Invoice #: ${invoiceData.invoice_number}
Date: ${new Date(invoiceData.created_at).toLocaleDateString()}

*Items:*
${itemsList}

Subtotal: ₹${invoiceData.subtotal.toFixed(2)}${
      invoiceData.gst_percentage > 0
        ? `\nGST (${invoiceData.gst_percentage}%): ₹${invoiceData.gst_amount.toFixed(2)}`
        : ""
    }${invoiceData.discount_amount > 0 ? `\nDiscount: -₹${invoiceData.discount_amount.toFixed(2)}` : ""}

*Total: ₹${invoiceData.total_amount.toFixed(2)}*

Payment: ${invoiceData.payment_method.toUpperCase()}

Thank you for shopping with us! 🙏`;

    const phoneNumber = invoiceData.customer_phone?.replace(/\D/g, "");
    const whatsappUrl = phoneNumber
      ? `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp...");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Invoice Details
          </DialogTitle>
        </DialogHeader>

        {/* Invoice Preview */}
        <div className="border rounded-lg overflow-hidden my-4">
          <InvoiceTemplate invoice={invoiceData} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            <Printer className="w-4 h-4" />
            Print Invoice
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2 text-emerald-600 border-emerald-500/30 hover:bg-emerald-50"
            onClick={handleWhatsAppShare}
          >
            <MessageCircle className="w-4 h-4" />
            Share on WhatsApp
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full mt-2"
          onClick={() => onOpenChange(false)}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
