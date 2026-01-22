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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const detectedProducts: ProductDetection[] = [];

    for (let i = 0; i < images.length; i++) {
      const imageData = images[i];
      console.log(`Processing image ${i + 1} of ${images.length}`);

      // Step 1: Analyze product details
      const analysisResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
              
              Available categories: ${ALL_CATEGORIES.join(", ")}
              
              Choose the most specific category that fits the product. For stationery items, use specific categories like "Pens", "Notebooks", "Books" etc.
              Estimate reasonable prices based on the Indian market.`
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this product image and extract the product details. Choose the most specific category from the available list."
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
                      description: "Product name (e.g., 'Amul Butter 500g', 'Cello Butterflo Ball Pen')"
                    },
                    price: {
                      type: "number",
                      description: "Estimated price in Indian Rupees"
                    },
                    category: {
                      type: "string",
                      enum: ALL_CATEGORIES,
                      description: "Product category - choose the most specific one"
                    },
                    description: {
                      type: "string",
                      description: "Brief product description including size/quantity if visible"
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

      if (!analysisResponse.ok) {
        if (analysisResponse.status === 429) {
          console.error("Rate limited");
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (analysisResponse.status === 402) {
          return new Response(
            JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const errorText = await analysisResponse.text();
        console.error("AI gateway error:", analysisResponse.status, errorText);
        continue;
      }

      const analysisResult = await analysisResponse.json();
      const toolCall = analysisResult.choices?.[0]?.message?.tool_calls?.[0];
      
      let productData = {
        name: "Unknown Product",
        price: 99,
        category: "Groceries",
        description: "",
        brand: "",
        confidence: 70
      };

      if (toolCall?.function?.arguments) {
        try {
          const parsed = JSON.parse(toolCall.function.arguments);
          productData = {
            name: parsed.name || "Unknown Product",
            price: parsed.price || 99,
            category: parsed.category || "Groceries",
            description: parsed.description || "",
            brand: parsed.brand || "",
            confidence: parsed.confidence || 85
          };
        } catch (parseError) {
          console.error("Failed to parse AI response:", parseError);
        }
      }

      // Step 2: Enhance image with white background (if enabled)
      let enhancedImageUrl: string | undefined;
      
      if (enhanceImages) {
        try {
          console.log(`Enhancing image ${i + 1}...`);
          const enhanceResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-2.5-flash-image-preview",
              messages: [
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: "Please edit this product image to have a clean, pure white background. Keep the product itself clear and well-lit. Remove any shadows, clutter, or distracting elements. Make it look professional and suitable for an e-commerce catalog. Maintain the product's natural colors and details."
                    },
                    {
                      type: "image_url",
                      image_url: { url: imageData }
                    }
                  ]
                }
              ],
              modalities: ["image", "text"]
            }),
          });

          if (enhanceResponse.ok) {
            const enhanceResult = await enhanceResponse.json();
            const enhancedImage = enhanceResult.choices?.[0]?.message?.images?.[0]?.image_url?.url;
            if (enhancedImage) {
              enhancedImageUrl = enhancedImage;
              console.log(`Image ${i + 1} enhanced successfully`);
            }
          } else {
            console.log(`Image enhancement failed for image ${i + 1}, using original`);
          }
        } catch (enhanceError) {
          console.error("Enhancement error:", enhanceError);
        }
      }

      detectedProducts.push({
        ...productData,
        originalImage: imageData,
        enhancedImage: enhancedImageUrl
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
