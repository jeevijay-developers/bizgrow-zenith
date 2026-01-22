import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category } = await req.json();
    
    if (!category || typeof category !== "string") {
      return new Response(
        JSON.stringify({ error: "Category name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedCategory = category.toLowerCase().trim();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if category image already exists
    const { data: existingImage, error: fetchError } = await supabase
      .from("category_images")
      .select("image_url")
      .eq("category_name", normalizedCategory)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching existing category image:", fetchError);
    }

    if (existingImage?.image_url) {
      console.log(`Category "${normalizedCategory}" already has an image, reusing it`);
      return new Response(
        JSON.stringify({ 
          imageUrl: existingImage.image_url, 
          cached: true,
          category: normalizedCategory 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate new category image using AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating new category image for: ${normalizedCategory}`);

    const prompt = `Generate a clean, modern category icon image for "${category}" products. 
    The image should be:
    - A simple, flat design illustration style
    - Feature typical items from the "${category}" category arranged nicely
    - Have a clean white or very light gradient background
    - Be colorful and appealing for an e-commerce store
    - Professional looking, suitable for a category thumbnail
    - Square aspect ratio
    - No text or labels in the image
    Examples: For "Pens" show colorful pens, for "Books" show stacked books, for "Dairy" show milk and cheese, etc.`;

    const generateResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!generateResponse.ok) {
      if (generateResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (generateResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await generateResponse.text();
      console.error("AI generation error:", generateResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate category image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const generateResult = await generateResponse.json();
    const generatedImageBase64 = generateResult.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!generatedImageBase64) {
      console.error("No image in AI response");
      return new Response(
        JSON.stringify({ error: "AI did not return an image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Upload to storage
    const base64Data = generatedImageBase64.split(",")[1];
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    const fileName = `categories/${normalizedCategory.replace(/[^a-z0-9]/g, "-")}-${Date.now()}.png`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("store-assets")
      .upload(fileName, binaryData, {
        contentType: "image/png",
        upsert: false
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to save category image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from("store-assets")
      .getPublicUrl(fileName);

    const imageUrl = publicUrl.publicUrl;

    // Save to database for future reuse
    const { error: insertError } = await supabase
      .from("category_images")
      .insert({
        category_name: normalizedCategory,
        image_url: imageUrl
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
      // Still return the image even if DB save fails
    }

    console.log(`Category image generated and saved for: ${normalizedCategory}`);

    return new Response(
      JSON.stringify({ 
        imageUrl, 
        cached: false,
        category: normalizedCategory 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in generate-category-image:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
