import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CreateOrderRequest {
  store_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address?: string;
  items: OrderItem[];
  notes?: string;
  payment_method?: string;
  delivery_mode: "takeaway" | "delivery";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: CreateOrderRequest = await req.json();
    const { store_id, customer_name, customer_phone, customer_address, items, notes, payment_method, delivery_mode } = body;

    // Validate required fields
    if (!store_id || !customer_name || !customer_phone || !items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify store exists and is active
    const { data: store, error: storeError } = await supabase
      .from("stores")
      .select("id, name, user_id")
      .eq("id", store_id)
      .eq("is_active", true)
      .single();

    if (storeError || !store) {
      console.error("Store not found:", storeError);
      return new Response(
        JSON.stringify({ error: "Store not found or inactive" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate total
    const total_amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        store_id,
        customer_name,
        customer_phone,
        customer_address: customer_address || null,
        items: items,
        total_amount,
        notes: notes || null,
        payment_method: payment_method || "COD",
        status: "pending"
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if customer exists, if not create one
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id, total_orders, total_spent")
      .eq("store_id", store_id)
      .eq("phone", customer_phone)
      .single();

    if (existingCustomer) {
      // Update existing customer
      await supabase
        .from("customers")
        .update({
          name: customer_name,
          address: customer_address || null,
          total_orders: existingCustomer.total_orders + 1,
          total_spent: existingCustomer.total_spent + total_amount,
          status: "active"
        })
        .eq("id", existingCustomer.id);
    } else {
      // Create new customer
      await supabase
        .from("customers")
        .insert({
          store_id,
          name: customer_name,
          phone: customer_phone,
          address: customer_address || null,
          total_orders: 1,
          total_spent: total_amount,
          status: "new"
        });
    }

    // Create notification for store owner
    await supabase
      .from("notifications")
      .insert({
        store_id,
        user_id: store.user_id,
        type: "new_order",
        title: "New Order Received!",
        message: `Order from ${customer_name} - ₹${total_amount.toLocaleString()}`,
        data: { order_id: order.id, customer_name, total_amount }
      });

    console.log(`Order ${order.id} created successfully for store ${store_id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        order: {
          id: order.id,
          total_amount,
          status: order.status,
          created_at: order.created_at
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in create-order:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});