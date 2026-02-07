import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { images, enhanceImages = true } = await req.json();
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return new Response(
        JSON.stringify({ error: "No images provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured. Please set GEMINI_API_KEY." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const detectedProducts: ProductDetection[] = [];

    for (let i = 0; i < images.length; i++) {
      const imageData = images[i];
      console.log(`Processing image ${i + 1} of ${images.length}`);

      // Extract base64 data from data URL
      const base64Match = imageData.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!base64Match) {
        console.error(`Invalid image format for image ${i + 1}`);
        continue;
      }
      const mimeType = `image/${base64Match[1]}`;
      const base64Data = base64Match[2];

      // Step 1: Analyze product details using Gemini API directly
      const analysisResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI assistant specialized in analyzing product images for Indian retail stores. 
Analyze this product image and extract the product details.

Available categories: ${ALL_CATEGORIES.join(", ")}

Choose the most specific category that fits the product. For stationery items, use specific categories like "Pens", "Notebooks", "Books" etc.
Estimate reasonable prices based on the Indian market in Indian Rupees (₹).

Respond ONLY with a valid JSON object in this exact format (no markdown, no code blocks):
{
  "name": "Product name with size/quantity",
  "price": 99,
  "category": "Category from the list",
  "description": "Brief description",
  "brand": "Brand name if visible",
  "confidence": 85
}`
                },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 32,
            topP: 1,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!analysisResponse.ok) {
        if (analysisResponse.status === 429) {
          console.error("Rate limited");
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const errorText = await analysisResponse.text();
        console.error("Gemini API error:", analysisResponse.status, errorText);
        // Still add a placeholder product with error info for debugging
        detectedProducts.push({
          name: "Analysis Failed",
          price: 0,
          category: "Groceries",
          description: `Error: ${analysisResponse.status}`,
          brand: "",
          confidence: 0,
          originalImage: imageData,
          enhancedImage: undefined
        });
        continue;
      }

      const analysisResult = await analysisResponse.json();
      console.log("Gemini API response received:", JSON.stringify(analysisResult).substring(0, 500));
      
      let productData = {
        name: "Unknown Product",
        price: 99,
        category: "Groceries",
        description: "",
        brand: "",
        confidence: 70
      };

      // Parse Gemini response
      const responseText = analysisResult.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log("Response text from Gemini:", responseText ? responseText.substring(0, 300) : "EMPTY");
      
      if (responseText) {
        try {
          // Clean up the response - remove markdown code blocks if present
          let cleanJson = responseText.trim();
          if (cleanJson.startsWith("```json")) {
            cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/\s*```$/, "");
          } else if (cleanJson.startsWith("```")) {
            cleanJson = cleanJson.replace(/^```\s*/, "").replace(/\s*```$/, "");
          }
          
          const parsed = JSON.parse(cleanJson);
          productData = {
            name: parsed.name || "Unknown Product",
            price: typeof parsed.price === 'number' ? parsed.price : parseInt(parsed.price) || 99,
            category: ALL_CATEGORIES.includes(parsed.category) ? parsed.category : "Groceries",
            description: parsed.description || "",
            brand: parsed.brand || "",
            confidence: parsed.confidence || 85
          };
        } catch (parseError) {
          console.error("Failed to parse Gemini response:", parseError, responseText);
        }
      }

      // Step 2: Image enhancement is not available with direct Gemini API
      // Using original image only

      detectedProducts.push({
        ...productData,
        originalImage: imageData,
        enhancedImage: undefined
      });
    }

    console.log(`Detected ${detectedProducts.length} products from ${images.length} images`);

    return new Response(
      JSON.stringify({ products: detectedProducts }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in ai-product-detection:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
