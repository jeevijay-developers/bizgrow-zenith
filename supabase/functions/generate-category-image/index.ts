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
    // Note: Direct Gemini API doesn't support image generation in the same way
    // Using a placeholder approach for now - in production, you could use:
    // 1. Imagen API for image generation
    // 2. Pre-made category images
    // 3. A different image generation service
    
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      console.log("GEMINI_API_KEY not configured, using placeholder");
      // Return a placeholder or skip image generation
      return new Response(
        JSON.stringify({ 
          error: "Category image generation not available. Please upload a custom image.",
          category: normalizedCategory 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Category image generation requested for: ${normalizedCategory}`);
    console.log("Note: Direct image generation requires Imagen API or alternative service");
    
    // For now, return a message indicating manual upload is needed
    return new Response(
      JSON.stringify({ 
        message: "Please upload a custom category image",
        category: normalizedCategory,
        imageUrl: null
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
