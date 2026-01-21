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
  order_type?: "online" | "walkin";
  gst_percentage?: number;
  discount_amount?: number;
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
    const { 
      store_id, 
      customer_name, 
      customer_phone, 
      customer_address, 
      items, 
      notes, 
      payment_method, 
      delivery_mode,
      order_type = "online",
      gst_percentage = 0,
      discount_amount = 0
    } = body;

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
      .select("id, name, user_id, address")
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

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst_amount = gst_percentage > 0 ? (subtotal * gst_percentage / 100) : 0;
    const total_amount = subtotal + gst_amount - discount_amount;

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        store_id,
        customer_name,
        customer_phone,
        customer_address: customer_address || null,
        items: items.map(item => ({ name: item.name, qty: item.quantity, price: item.price })),
        total_amount,
        notes: notes || null,
        payment_method: payment_method || "COD",
        status: "pending",
        order_type,
        delivery_mode: delivery_mode || "delivery"
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

    console.log(`Order ${order.id} created for store ${store_id} (type: ${order_type})`);

    // Auto-deduct inventory for each item
    for (const item of items) {
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("id, stock_quantity, name")
        .eq("id", item.id)
        .single();

      if (product && !productError) {
        const currentStock = product.stock_quantity || 0;
        const newStock = Math.max(0, currentStock - item.quantity);

        // Update stock
        await supabase
          .from("products")
          .update({ stock_quantity: newStock })
          .eq("id", item.id);

        console.log(`Stock updated for ${product.name}: ${currentStock} -> ${newStock}`);

        // Create low stock notification if below threshold
        if (newStock > 0 && newStock < 10) {
          await supabase.from("notifications").insert({
            store_id,
            user_id: store.user_id,
            type: "low_stock",
            title: "Low Stock Alert",
            message: `${product.name} has only ${newStock} units left`,
            data: { product_id: item.id, product_name: product.name, stock_quantity: newStock }
          });
          console.log(`Low stock alert created for ${product.name}`);
        }
      }
    }

    // Generate invoice
    const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
    
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        order_id: order.id,
        store_id,
        invoice_number: invoiceNumber,
        customer_name,
        customer_phone,
        customer_address: customer_address || null,
        items: items.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        subtotal,
        gst_percentage,
        gst_amount,
        discount_amount,
        total_amount,
        payment_method: payment_method || "cash",
        payment_status: order_type === "walkin" ? "paid" : "pending"
      })
      .select()
      .single();

    if (invoiceError) {
      console.error("Error creating invoice:", invoiceError);
      // Don't fail the order if invoice creation fails
    } else {
      console.log(`Invoice ${invoiceNumber} created for order ${order.id}`);
    }

    // Handle customer record
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
        title: order_type === "walkin" ? "New Walk-in Sale!" : "New Order Received!",
        message: `${order_type === "walkin" ? "Walk-in" : "Online"} order from ${customer_name} - ₹${total_amount.toLocaleString()}`,
        data: { order_id: order.id, customer_name, total_amount, order_type }
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        order: {
          id: order.id,
          total_amount,
          status: order.status,
          order_type,
          created_at: order.created_at
        },
        invoice: invoice ? {
          id: invoice.id,
          invoice_number: invoice.invoice_number,
          total_amount: invoice.total_amount
        } : null
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
