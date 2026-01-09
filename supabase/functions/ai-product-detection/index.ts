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
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { images } = await req.json();
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return new Response(
        JSON.stringify({ error: "No images provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const detectedProducts: ProductDetection[] = [];

    for (const imageData of images) {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant specialized in analyzing product images for Indian retail stores. 
              Analyze the image and extract product information. Be accurate with pricing in Indian Rupees (₹).
              Common categories: Groceries, Dairy, Snacks, Beverages, Personal Care, Household, Electronics, Clothing, Fruits, Vegetables.
              Estimate reasonable prices based on the Indian market.`
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this product image and extract the product details."
                },
                {
                  type: "image_url",
                  image_url: { url: imageData }
                }
              ]
            }
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "extract_product_details",
                description: "Extract product details from the analyzed image",
                parameters: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Product name (e.g., 'Amul Butter 500g')"
                    },
                    price: {
                      type: "number",
                      description: "Estimated price in Indian Rupees"
                    },
                    category: {
                      type: "string",
                      enum: ["Groceries", "Dairy", "Snacks", "Beverages", "Personal Care", "Household", "Electronics", "Clothing", "Fruits", "Vegetables"],
                      description: "Product category"
                    },
                    description: {
                      type: "string",
                      description: "Brief product description"
                    },
                    brand: {
                      type: "string",
                      description: "Brand name if identifiable"
                    },
                    confidence: {
                      type: "number",
                      description: "Confidence score 0-100"
                    }
                  },
                  required: ["name", "price", "category", "description", "confidence"],
                  additionalProperties: false
                }
              }
            }
          ],
          tool_choice: { type: "function", function: { name: "extract_product_details" } }
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.error("Rate limited");
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (response.status === 402) {
          return new Response(
            JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const errorText = await response.text();
        console.error("AI gateway error:", response.status, errorText);
        continue;
      }

      const result = await response.json();
      const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
      
      if (toolCall?.function?.arguments) {
        try {
          const productData = JSON.parse(toolCall.function.arguments);
          detectedProducts.push({
            name: productData.name || "Unknown Product",
            price: productData.price || 99,
            category: productData.category || "Groceries",
            description: productData.description || "",
            brand: productData.brand || "",
            confidence: productData.confidence || 85
          });
        } catch (parseError) {
          console.error("Failed to parse AI response:", parseError);
          detectedProducts.push({
            name: "Product",
            price: 99,
            category: "Groceries",
            description: "Product detected",
            brand: "",
            confidence: 70
          });
        }
      }
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