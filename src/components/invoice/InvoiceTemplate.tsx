import { format } from "date-fns";
import { Store, Phone, MapPin, Receipt, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  id: string;
  invoice_number: string;
  order_id: string;
  store_name: string;
  store_address: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: InvoiceItem[];
  subtotal: number;
  gst_percentage: number;
  gst_amount: number;
  discount_amount: number;
  total_amount: number;
  payment_method: string;
  created_at: string;
  payment_type?: string;
  payment_status?: string;
  paid_amount?: number;
  remaining_amount?: number;
  payment_comment?: string;
}

interface InvoiceTemplateProps {
  invoice: InvoiceData;
  showActions?: boolean;
}

export function InvoiceTemplate({ invoice }: InvoiceTemplateProps) {
  return (
    <div className="bg-white text-black p-6 max-w-md mx-auto" id="invoice-print">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Store className="w-6 h-6" />
          <h1 className="text-2xl font-bold">{invoice.store_name}</h1>
        </div>
        {invoice.store_address && (
          <p className="text-sm text-gray-600">{invoice.store_address}</p>
        )}
      </div>

      <Separator className="mb-4 bg-gray-300" />

      {/* Invoice Details */}
      <div className="flex justify-between text-sm mb-4">
        <div>
          <p className="font-semibold">Invoice #</p>
          <p className="font-mono">{invoice.invoice_number}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">Date</p>
          <p>{format(new Date(invoice.created_at), "dd MMM yyyy, hh:mm a")}</p>
        </div>
      </div>

      {/* Customer Details */}
      {invoice.customer_name && invoice.customer_name !== "Walk-in Customer" && (
        <div className="bg-gray-100 rounded-lg p-3 mb-4 text-sm">
          <p className="font-semibold mb-1">Customer Details</p>
          <div className="space-y-1">
            <p className="flex items-center gap-2">
              <span className="font-medium">{invoice.customer_name}</span>
            </p>
            {invoice.customer_phone && (
              <p className="flex items-center gap-2 text-gray-600">
                <Phone className="w-3 h-3" />
                {invoice.customer_phone}
              </p>
            )}
            {invoice.customer_address && (
              <p className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-3 h-3" />
                {invoice.customer_address}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Items Table */}
      <div className="mb-4">
        <div className="grid grid-cols-12 gap-2 text-sm font-semibold py-2 border-b border-gray-300">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">Total</div>
        </div>
        {invoice.items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 gap-2 text-sm py-2 border-b border-gray-100"
          >
            <div className="col-span-6 font-medium">{item.name}</div>
            <div className="col-span-2 text-center">{item.quantity}</div>
            <div className="col-span-2 text-right">₹{item.price}</div>
            <div className="col-span-2 text-right font-medium">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{invoice.subtotal.toFixed(2)}</span>
        </div>
        {invoice.gst_percentage > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">GST ({invoice.gst_percentage}%)</span>
            <span>₹{invoice.gst_amount.toFixed(2)}</span>
          </div>
        )}
        {invoice.discount_amount > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Discount</span>
            <span>-₹{invoice.discount_amount.toFixed(2)}</span>
          </div>
        )}
        <Separator className="bg-gray-300" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{invoice.total_amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">Payment Method</span>
        <Badge variant="secondary" className="uppercase">
          {invoice.payment_method}
        </Badge>
      </div>

      {/* Payment Status */}
      {(invoice.payment_type || invoice.payment_status) && (
        <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Payment Status</span>
            <Badge
              variant="outline"
              className={
                invoice.payment_status === "completed"
                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                  : invoice.payment_status === "partial"
                  ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  : "bg-gray-500/10 text-gray-600 border-gray-500/20"
              }
            >
              {invoice.payment_status === "completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
              {invoice.payment_status === "partial" && <Clock className="w-3 h-3 mr-1" />}
              {invoice.payment_status === "completed"
                ? "Completed"
                : invoice.payment_status === "partial"
                ? "Partial Payment"
                : "Pending"}
            </Badge>
          </div>
          
          {invoice.payment_type === "partial" && (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Paid Amount</span>
                <span className="font-semibold text-green-600">
                  ₹{(invoice.paid_amount || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining</span>
                <span className="font-semibold text-red-600">
                  ₹{(invoice.remaining_amount || 0).toFixed(2)}
                </span>
              </div>
              {invoice.payment_comment && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex items-start gap-1 text-xs text-gray-600">
                    <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{invoice.payment_comment}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-dashed border-gray-300 text-center">
        <p className="text-sm text-gray-600">Thank you for your purchase!</p>
        <p className="text-xs text-gray-400 mt-1">
          Powered by BizGrow 360
        </p>
      </div>
    </div>
  );
}
