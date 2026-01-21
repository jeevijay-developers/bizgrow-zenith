import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CSVProduct {
  name: string;
  price: string;
  compare_price?: string;
  category?: string;
  stock_quantity?: string;
  description?: string;
  is_available?: string;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

export function useCSVImport(storeId: string | undefined) {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Generate CSV template
  const downloadTemplate = () => {
    const headers = ["name", "price", "compare_price", "category", "stock_quantity", "description", "is_available"];
    const sampleData = [
      ["Sample Product 1", "100", "120", "Groceries", "50", "Product description here", "true"],
      ["Sample Product 2", "200", "", "Dairy", "25", "Another product", "true"],
    ];
    
    const csvContent = [
      headers.join(","),
      ...sampleData.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products-template.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Template downloaded!");
  };

  // Parse CSV file
  const parseCSV = (content: string): CSVProduct[] => {
    const lines = content.split("\n").map(line => line.trim()).filter(line => line);
    if (lines.length < 2) {
      throw new Error("CSV file must have headers and at least one data row");
    }

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
    const requiredHeaders = ["name", "price"];
    
    for (const required of requiredHeaders) {
      if (!headers.includes(required)) {
        throw new Error(`Missing required column: ${required}`);
      }
    }

    const products: CSVProduct[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const product: CSVProduct = {
        name: "",
        price: "",
      };

      headers.forEach((header, index) => {
        const value = values[index]?.trim() || "";
        switch (header) {
          case "name":
            product.name = value;
            break;
          case "price":
            product.price = value;
            break;
          case "compare_price":
            product.compare_price = value;
            break;
          case "category":
            product.category = value;
            break;
          case "stock_quantity":
            product.stock_quantity = value;
            break;
          case "description":
            product.description = value;
            break;
          case "is_available":
            product.is_available = value;
            break;
        }
      });

      if (product.name && product.price) {
        products.push(product);
      }
    }

    return products;
  };

  // Parse CSV line handling quoted values
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    
    return result;
  };

  // Validate and import products
  const importProducts = async (file: File): Promise<ImportResult> => {
    if (!storeId) {
      throw new Error("Store not found");
    }

    setImporting(true);
    setProgress(0);

    try {
      const content = await file.text();
      const products = parseCSV(content);
      
      if (products.length === 0) {
        throw new Error("No valid products found in CSV");
      }

      const result: ImportResult = {
        success: 0,
        failed: 0,
        errors: [],
      };

      // Import in batches of 10
      const batchSize = 10;
      const totalBatches = Math.ceil(products.length / batchSize);

      for (let i = 0; i < products.length; i += batchSize) {
        const batch = products.slice(i, i + batchSize);
        const batchNumber = Math.floor(i / batchSize) + 1;

        const productsToInsert = batch.map(p => ({
          store_id: storeId,
          name: p.name,
          price: parseFloat(p.price) || 0,
          compare_price: p.compare_price ? parseFloat(p.compare_price) : null,
          category: p.category || null,
          stock_quantity: p.stock_quantity ? parseInt(p.stock_quantity) : 0,
          description: p.description || null,
          is_available: p.is_available?.toLowerCase() !== "false",
        }));

        const { error } = await supabase
          .from("products")
          .insert(productsToInsert);

        if (error) {
          result.failed += batch.length;
          result.errors.push(`Batch ${batchNumber}: ${error.message}`);
        } else {
          result.success += batch.length;
        }

        setProgress(Math.round((batchNumber / totalBatches) * 100));
      }

      return result;
    } finally {
      setImporting(false);
      setProgress(0);
    }
  };

  return {
    importing,
    progress,
    downloadTemplate,
    importProducts,
  };
}
