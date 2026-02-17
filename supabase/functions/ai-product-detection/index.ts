/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-expect-error - Deno npm: imports work in Edge Functions but VS Code doesn't recognize them
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-expect-error - npm: prefix is Deno-specific, works when deployed to Supabase
import { GoogleGenAI } from "npm:@google/genai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ProductDetection {
  name: string;
  price: number;
  category: string;
  description: string;
  brand: string;
  confidence: number;
  originalImage: string;
  enhancedImage?: string;
}

// Extended category list for better detection
const ALL_CATEGORIES = [
  // General
  "Groceries", "Dairy", "Snacks", "Beverages", "Personal Care", 
  "Household", "Electronics", "Clothing", "Fruits", "Vegetables",
  "Bakery", "Frozen Foods", "Meat & Seafood", "Health & Wellness",
  "Baby Products", "Pet Supplies", "Home Decor",
  // Stationery specific
  "Pens", "Pencils", "Notebooks", "Books", "Stickers", "Art & Craft",
  "Paper & Notebooks", "Stamps", "Gifts & Decor", "Frames & Decor",
  "Accessories", "Party Supplies", "Office Supplies", "School Supplies",
  // Additional
  "Toys", "Games", "Sports", "Automotive", "Garden", "Hardware",
  "Pharmacy", "Cosmetics", "Jewelry", "Watches", "Bags", "Footwear"
];

// Gemini models to try in order (fallback chain)
const GEMINI_MODELS = [
  "gemini-3-flash-preview",
  "gemini-1.5-flash",
  "gemini-1.5-pro"
];

// Robust JSON extraction from text
function extractJsonFromText(text: string): string | null {
  if (!text) return null;
  
  let cleanText = text.trim();
  
  // Try to extract JSON from markdown code blocks
  const codeBlockMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    cleanText = codeBlockMatch[1].trim();
  }
  
  // Try to find JSON object pattern in text
  const jsonMatch = cleanText.match(/\{[\s\S]*?"name"[\s\S]*?"price"[\s\S]*?\}/);
  if (jsonMatch) {
    cleanText = jsonMatch[0];
  }
  
  // Remove any leading/trailing non-JSON characters
  const startIdx = cleanText.indexOf('{');
  const endIdx = cleanText.lastIndexOf('}');
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleanText = cleanText.substring(startIdx, endIdx + 1);
  }
  
  return cleanText;
}

// Parse price from various formats
function parsePrice(price: any): number {
  if (typeof price === 'number') return Math.max(0, Math.round(price));
  if (typeof price === 'string') {
    // Remove currency symbols, commas, and extract number
    const numMatch = price.replace(/[₹$,\s]/g, '').match(/[\d.]+/);
    if (numMatch) {
      return Math.max(0, Math.round(parseFloat(numMatch[0])));
    }
  }
  return 99; // Default price
}

// Find best matching category (case-insensitive, partial match)
function findCategory(category: string | undefined): string {
  if (!category) return "Groceries";
  
  const normalizedInput = category.toLowerCase().trim();
  
  // Exact match (case-insensitive)
  const exactMatch = ALL_CATEGORIES.find(c => c.toLowerCase() === normalizedInput);
  if (exactMatch) return exactMatch;
  
  // Partial match
  const partialMatch = ALL_CATEGORIES.find(c => 
    c.toLowerCase().includes(normalizedInput) || normalizedInput.includes(c.toLowerCase())
  );
  if (partialMatch) return partialMatch;
  
  // Return as-is if no match (will be handled by the category selection UI)
  return category;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { images, enhanceImages = true } = await req.json();
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      console.error("No images provided in request");
      return new Response(
        JSON.stringify({ error: "No images provided", details: "Please upload at least one image" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY environment variable not configured");
      return new Response(
        JSON.stringify({ 
          error: "AI service not configured", 
          details: "Please set GEMINI_API_KEY in Supabase Edge Function secrets" 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Starting AI detection for ${images.length} image(s)`);
    
    // Initialize Google AI client (reads GEMINI_API_KEY from environment)
    const ai = new GoogleGenAI({});
    const detectedProducts: ProductDetection[] = [];

    for (let i = 0; i < images.length; i++) {
      const imageData = images[i];
      console.log(`\n=== Processing image ${i + 1} of ${images.length} ===`);

      // Extract base64 data from data URL - handle more formats
      const base64Match = imageData.match(/^data:image\/([\w+]+);base64,(.+)$/);
      if (!base64Match) {
        console.error(`Invalid image format for image ${i + 1}. Expected data:image/xxx;base64,...`);
        console.error(`Image starts with: ${imageData.substring(0, 50)}...`);
        detectedProducts.push({
          name: "Invalid Image Format",
          price: 0,
          category: "Groceries",
          description: "Image format not recognized. Please use JPG, PNG, or HEIC.",
          brand: "",
          confidence: 0,
          originalImage: imageData,
          enhancedImage: undefined
        });
        continue;
      }
      
      const imageFormat = base64Match[1].toLowerCase();
      // Normalize MIME types
      let mimeType = `image/${imageFormat}`;
      if (imageFormat === 'jpg') mimeType = 'image/jpeg';
      if (imageFormat === 'heic') mimeType = 'image/heic';
      
      const base64Data = base64Match[2];
      console.log(`Image format: ${mimeType}, base64 length: ${base64Data.length}`);

      // Try each Gemini model until one works
      let responseText: string | null = null;
      let lastError: string | null = null;
      
      for (const modelName of GEMINI_MODELS) {
        console.log(`Trying model: ${modelName}`);
        
        try {
          const prompt = `You are an expert AI product analyzer for Indian retail stores. Analyze this product image carefully.

TASK: Extract product details from the image.

IMPORTANT INSTRUCTIONS:
1. Look for ANY visible text on the product (brand name, product name, weight, price, MRP, ingredients list, etc.)
2. If you see a price tag or MRP printed on the product, use that exact price
3. If no price is visible, estimate a reasonable price for the Indian market in Rupees
4. Be specific with the product name - include brand, variant, size/weight if visible
5. Choose the most appropriate category from this list:
   ${ALL_CATEGORIES.join(", ")}

RESPOND WITH ONLY A VALID JSON OBJECT (no markdown, no explanation, no code blocks):
{"name":"Full product name with brand and size","price":99,"category":"Category","description":"Brief description of the product","brand":"Brand name","confidence":85}

EXAMPLE RESPONSES:
{"name":"Parle-G Gold Biscuits 200g","price":30,"category":"Snacks","description":"Glucose biscuits enriched with vitamins","brand":"Parle","confidence":92}
{"name":"Amul Butter 500g","price":280,"category":"Dairy","description":"Pasteurized table butter","brand":"Amul","confidence":95}`;

          const response = await ai.models.generateContent({
            model: modelName,
            contents: [
              {
                role: "user",
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      data: base64Data,
                      mimeType: mimeType
                    }
                  }
                ]
              }
            ]
          });

          responseText = response.text;
          console.log(`Model ${modelName} responded successfully`);
          console.log("Response text:", responseText ? responseText.substring(0, 300) : "EMPTY");
          break; // Success, exit model loop
          
        } catch (error) {
          lastError = error instanceof Error ? error.message : String(error);
          console.error(`Model ${modelName} error:`, lastError);
          
          // Check for rate limiting
          if (lastError.includes("429") || lastError.toLowerCase().includes("rate limit")) {
            return new Response(
              JSON.stringify({ 
                error: "Rate limit exceeded", 
                details: "Too many requests. Please wait a moment and try again." 
              }),
              { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          }
          // Try next model
        }
      }

      // Process the result
      let productData = {
        name: "Unknown Product",
        price: 99,
        category: "Groceries",
        description: "",
        brand: "",
        confidence: 0
      };

      if (!responseText) {
        console.error(`All models failed for image ${i + 1}. Last error: ${lastError}`);
        productData.description = `Detection failed: ${lastError || 'Unknown error'}`;
      } else {
        // Parse the AI response
        try {
          const cleanJson = extractJsonFromText(responseText);
          console.log("Extracted JSON:", cleanJson ? cleanJson.substring(0, 300) : "NULL");
          
          if (cleanJson) {
            const parsed = JSON.parse(cleanJson);
            productData = {
              name: parsed.name || "Unknown Product",
              price: parsePrice(parsed.price),
              category: findCategory(parsed.category),
              description: parsed.description || "",
              brand: parsed.brand || "",
              confidence: Math.min(100, Math.max(0, parseInt(parsed.confidence) || 70))
            };
            console.log("✓ Parsed product:", productData.name, "- ₹" + productData.price);
          } else {
            console.error("Could not extract JSON from response");
            productData.description = "Could not parse AI response";
          }
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.error("Failed text:", responseText.substring(0, 300));
          productData.description = "Failed to parse product details";
        }
      }

      detectedProducts.push({
        ...productData,
        originalImage: imageData,
        enhancedImage: undefined
      });
    }

    console.log(`\n=== Detection complete: ${detectedProducts.length} products from ${images.length} images ===`);
    
    // Log summary
    const successful = detectedProducts.filter(p => p.confidence > 0).length;
    console.log(`Successful detections: ${successful}, Failed: ${detectedProducts.length - successful}`);

    return new Response(
      JSON.stringify({ products: detectedProducts }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unhandled error in ai-product-detection:", error);
    return new Response(
      JSON.stringify({ 
        error: "Processing failed", 
        details: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
