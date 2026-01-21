import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface ExportOptions {
  storeId: string;
  type: "orders" | "products" | "customers" | "invoices";
  dateRange?: {
    from: Date;
    to: Date;
  };
}

// Convert data to CSV format
function convertToCSV(data: Record<string, unknown>[], columns: string[]): string {
  if (data.length === 0) return "";
  
  const headers = columns.join(",");
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col];
      if (value === null || value === undefined) return "";
      if (typeof value === "object") return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      if (typeof value === "string" && (value.includes(",") || value.includes('"') || value.includes("\n"))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return String(value);
    }).join(",")
  );
  
  return [headers, ...rows].join("\n");
}

// Download CSV file
function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function useExportData() {
  const exportData = async ({ storeId, type, dateRange }: ExportOptions) => {
    try {
      let query;
      let columns: string[];
      let filename: string;

      const dateStr = format(new Date(), "yyyy-MM-dd");

      switch (type) {
        case "orders":
          query = supabase
            .from("orders")
            .select("id, customer_name, customer_phone, customer_address, total_amount, status, payment_method, order_type, delivery_mode, notes, created_at")
            .eq("store_id", storeId)
            .order("created_at", { ascending: false });
          
          if (dateRange) {
            query = query
              .gte("created_at", dateRange.from.toISOString())
              .lte("created_at", dateRange.to.toISOString());
          }
          
          columns = ["id", "customer_name", "customer_phone", "customer_address", "total_amount", "status", "payment_method", "order_type", "delivery_mode", "notes", "created_at"];
          filename = `orders-${dateStr}.csv`;
          break;

        case "products":
          query = supabase
            .from("products")
            .select("id, name, description, category, price, compare_price, stock_quantity, is_available, created_at")
            .eq("store_id", storeId)
            .order("name", { ascending: true });
          
          columns = ["id", "name", "description", "category", "price", "compare_price", "stock_quantity", "is_available", "created_at"];
          filename = `products-${dateStr}.csv`;
          break;

        case "customers":
          query = supabase
            .from("customers")
            .select("id, name, phone, email, address, total_orders, total_spent, status, created_at")
            .eq("store_id", storeId)
            .order("name", { ascending: true });
          
          columns = ["id", "name", "phone", "email", "address", "total_orders", "total_spent", "status", "created_at"];
          filename = `customers-${dateStr}.csv`;
          break;

        case "invoices":
          query = supabase
            .from("invoices")
            .select("id, invoice_number, customer_name, customer_phone, subtotal, gst_amount, discount_amount, total_amount, payment_method, payment_status, created_at")
            .eq("store_id", storeId)
            .order("created_at", { ascending: false });
          
          if (dateRange) {
            query = query
              .gte("created_at", dateRange.from.toISOString())
              .lte("created_at", dateRange.to.toISOString());
          }
          
          columns = ["id", "invoice_number", "customer_name", "customer_phone", "subtotal", "gst_amount", "discount_amount", "total_amount", "payment_method", "payment_status", "created_at"];
          filename = `invoices-${dateStr}.csv`;
          break;

        default:
          throw new Error("Invalid export type");
      }

      const { data, error } = await query;

      if (error) throw error;

      if (!data || data.length === 0) {
        toast.info(`No ${type} data to export`);
        return;
      }

      const csv = convertToCSV(data, columns);
      downloadCSV(csv, filename);
      
      toast.success(`Exported ${data.length} ${type} to ${filename}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  return { exportData };
}
