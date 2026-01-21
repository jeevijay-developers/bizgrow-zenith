import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Receipt,
  Loader2,
  User,
  Phone,
  MapPin,
  Percent,
  Calculator,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { InvoiceModal } from "@/components/invoice/InvoiceModal";

interface DashboardContext {
  store: {
    id: string;
    name: string;
    address?: string;
  } | null;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string | null;
  stock_quantity: number | null;
  is_available: boolean | null;
}

interface CartItem extends Product {
  quantity: number;
}

interface InvoiceData {
  id: string;
  invoice_number: string;
  order_id: string;
  store_name: string;
  store_address: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  gst_percentage: number;
  gst_amount: number;
  discount_amount: number;
  total_amount: number;
  payment_method: string;
  created_at: string;
}

const POSBillingPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [enableGST, setEnableGST] = useState(false);
  const [gstPercentage, setGstPercentage] = useState("5");
  const [discountAmount, setDiscountAmount] = useState("");
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  // Fetch products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", store.id)
        .eq("is_available", true)
        .order("name");
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!store?.id,
  });

  // Filter products by search
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Cart calculations
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const gstAmount = enableGST
    ? (subtotal * parseFloat(gstPercentage || "0")) / 100
    : 0;
  const discount = parseFloat(discountAmount) || 0;
  const total = subtotal + gstAmount - discount;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart functions
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setDiscountAmount("");
    setEnableGST(false);
  };

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (!store?.id) throw new Error("Store not found");

      const orderItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const { data, error } = await supabase.functions.invoke("create-order", {
        body: {
          store_id: store.id,
          customer_name: customerName || "Walk-in Customer",
          customer_phone: customerPhone || "0000000000",
          customer_address: customerAddress || null,
          items: orderItems,
          payment_method: paymentMethod.toUpperCase(),
          delivery_mode: "takeaway",
          order_type: "walkin",
          gst_percentage: enableGST ? parseFloat(gstPercentage) : 0,
          discount_amount: discount,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders", store?.id] });
      queryClient.invalidateQueries({ queryKey: ["products", store?.id] });

      // Prepare invoice data
      const invoice: InvoiceData = {
        id: data.invoice?.id || "",
        invoice_number: data.invoice?.invoice_number || `INV-${Date.now()}`,
        order_id: data.order?.id || "",
        store_name: store?.name || "",
        store_address: store?.address || "",
        customer_name: customerName || "Walk-in Customer",
        customer_phone: customerPhone || "",
        customer_address: customerAddress || "",
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        gst_percentage: enableGST ? parseFloat(gstPercentage) : 0,
        gst_amount: gstAmount,
        discount_amount: discount,
        total_amount: total,
        payment_method: paymentMethod,
        created_at: new Date().toISOString(),
      };

      setInvoiceData(invoice);
      setShowInvoice(true);
      toast.success("Order created successfully!");
      clearCart();
    },
    onError: (error) => {
      toast.error("Failed to create order: " + error.message);
    },
  });

  if (productsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto">
      {/* Products Section */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Receipt className="w-6 h-6 text-primary" />
              POS Billing
            </h1>
            <p className="text-muted-foreground text-sm">
              Quick billing for walk-in customers
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/dashboard/orders")}
          >
            <History className="w-4 h-4" />
            Order History
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products by name or category..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Products Grid */}
        <ScrollArea className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-4">
              <AnimatePresence>
                {filteredProducts.map((product) => {
                  const inCart = cart.find((item) => item.id === product.id);
                  const isLowStock =
                    product.stock_quantity !== null &&
                    product.stock_quantity < 10;
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`relative bg-card border rounded-xl p-3 cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${
                        inCart ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => addToCart(product)}
                    >
                      {/* Product Image */}
                      <div className="aspect-square rounded-lg bg-muted mb-2 overflow-hidden">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ShoppingCart className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <h3 className="font-medium text-sm line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-primary font-bold">₹{product.price}</p>

                      {/* Stock Badge */}
                      {isLowStock && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 right-2 text-xs"
                        >
                          Low: {product.stock_quantity}
                        </Badge>
                      )}

                      {/* Cart Quantity Badge */}
                      {inCart && (
                        <Badge className="absolute top-2 left-2 bg-primary">
                          {inCart.quantity}
                        </Badge>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Cart Section */}
      <Card className="w-full lg:w-96 flex flex-col">
        <CardHeader className="py-4">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Cart ({cartCount})
            </span>
            {cart.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={clearCart}
              >
                Clear
              </Button>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 pt-0 min-h-0">
          {/* Cart Items */}
          <ScrollArea className="flex-1 -mx-4 px-4">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Cart is empty</p>
                <p className="text-xs">Click products to add</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-muted/50 rounded-lg p-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{item.price} × {item.quantity} = ₹
                        {item.price * item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {cart.length > 0 && (
            <>
              <Separator className="my-4" />

              {/* Customer Details */}
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Details (Optional)
                </h4>
                <div className="grid gap-2">
                  <Input
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="h-9"
                  />
                  <Input
                    placeholder="Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 mb-4">
                <Label className="text-sm">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* GST Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={enableGST}
                    onCheckedChange={setEnableGST}
                    id="gst-toggle"
                  />
                  <Label htmlFor="gst-toggle" className="text-sm">
                    Add GST
                  </Label>
                </div>
                {enableGST && (
                  <Select value={gstPercentage} onValueChange={setGstPercentage}>
                    <SelectTrigger className="w-24 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Discount */}
              <div className="flex items-center gap-2 mb-4">
                <Percent className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Discount (₹)"
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  className="h-9"
                />
              </div>

              <Separator className="mb-4" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {enableGST && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      GST ({gstPercentage}%)
                    </span>
                    <span>₹{gstAmount.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Generate Bill Button */}
              <Button
                className="w-full mt-4 gap-2"
                size="lg"
                onClick={() => createOrderMutation.mutate()}
                disabled={createOrderMutation.isPending}
              >
                {createOrderMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Receipt className="w-4 h-4" />
                )}
                Generate Bill
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Invoice Modal */}
      {invoiceData && (
        <InvoiceModal
          open={showInvoice}
          onOpenChange={setShowInvoice}
          invoice={invoiceData}
        />
      )}
    </div>
  );
};

export default POSBillingPage;
