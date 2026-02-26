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
  IndianRupee,
  History,
  Wallet,
  AlertCircle,
  PackagePlus,
  Clock,
  ChevronDown,
  ChevronUp,
  Tag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { PaymentDetailsDialog } from "@/components/invoice/PaymentDetailsDialog";

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
  isCustom?: boolean; // true for ad-hoc items not in the catalogue
}

interface CustomItemForm {
  name: string;
  price: string;
  quantity: string;
}

interface PartialInvoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  payment_comment: string | null;
  created_at: string;
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
  items: Array<{ name: string; quantity: number; price: number; is_custom?: boolean }>;
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
  const [paymentType, setPaymentType] = useState<"full" | "partial">("full");
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentComment, setPaymentComment] = useState("");
  const [enableGST, setEnableGST] = useState(false);
  const [gstPercentage, setGstPercentage] = useState("5");
  const [discountAmount, setDiscountAmount] = useState("");
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  // Custom item state
  const [showCustomItemForm, setShowCustomItemForm] = useState(false);
  const [customItemForm, setCustomItemForm] = useState<CustomItemForm>({ name: "", price: "", quantity: "1" });

  // Partial bills section
  const [showPartialBills, setShowPartialBills] = useState(true);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<string | null>(null);
  const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);

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

  // Fetch recent partial payment invoices
  const { data: partialInvoices = [] } = useQuery({
    queryKey: ["partial-invoices", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("invoices")
        .select("id, invoice_number, customer_name, total_amount, paid_amount, remaining_amount, payment_comment, created_at")
        .eq("store_id", store.id)
        .eq("payment_status", "partial")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as PartialInvoice[];
    },
    enabled: !!store?.id,
  });
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
    setPaymentType("full");
    setPaidAmount("");
    setPaymentComment("");
    setShowCustomItemForm(false);
    setCustomItemForm({ name: "", price: "", quantity: "1" });
  };

  // Add ad-hoc custom item to cart (not in catalogue)
  const addCustomItem = () => {
    const name = customItemForm.name.trim();
    const price = parseFloat(customItemForm.price);
    const quantity = parseInt(customItemForm.quantity) || 1;

    if (!name) { toast.error("Please enter an item name"); return; }
    if (!price || price <= 0) { toast.error("Please enter a valid price"); return; }

    const customItem: CartItem = {
      id: `custom-${Date.now()}`,
      name,
      price,
      image_url: null,
      category: null,
      stock_quantity: null,
      is_available: true,
      quantity,
      isCustom: true,
    };

    setCart(prev => [...prev, customItem]);
    setCustomItemForm({ name: "", price: "", quantity: "1" });
    setShowCustomItemForm(false);
    toast.success(`"${name}" added to cart`);
  };

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (!store?.id) throw new Error("Store not found");

      const orderItems = cart.map((item) => ({
        // Custom items have a generated id like "custom-..." — don't send to edge fn
        id: item.isCustom ? undefined : item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        is_custom: item.isCustom || false,
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
          payment_type: paymentType,
          paid_amount: paymentType === "partial" ? parseFloat(paidAmount) || 0 : total,
          payment_comment: paymentType === "partial" ? paymentComment : null,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders", store?.id] });
      queryClient.invalidateQueries({ queryKey: ["products", store?.id] });
      queryClient.invalidateQueries({ queryKey: ["partial-invoices", store?.id] });

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
          is_custom: item.isCustom || false,
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

        {/* Recent Partial Bills */}
        {partialInvoices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-sm font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors"
              onClick={() => setShowPartialBills(v => !v)}
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending Partial Payments ({partialInvoices.length})
              </span>
              {showPartialBills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showPartialBills && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {partialInvoices.map(inv => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between gap-3 p-3 bg-card border border-amber-200/60 dark:border-amber-800/40 rounded-lg"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono text-muted-foreground">{inv.invoice_number}</span>
                          </div>
                          <p className="font-medium text-sm truncate">{inv.customer_name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-green-600 font-medium">Paid ₹{inv.paid_amount.toFixed(0)}</span>
                            <span className="text-xs text-red-600 font-medium">Due ₹{inv.remaining_amount.toFixed(0)}</span>
                          </div>
                          {inv.payment_comment && (
                            <p className="text-xs text-muted-foreground truncate mt-0.5 italic">"{inv.payment_comment}"</p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="shrink-0 gap-1 h-8 border-amber-300 text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-950/50"
                          onClick={() => {
                            setSelectedInvoiceForPayment(inv.id);
                            setPaymentDetailsOpen(true);
                          }}
                        >
                          <Wallet className="w-3 h-3" />
                          Pay
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Search + Custom Item */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products by name or category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 shrink-0"
            onClick={() => setShowCustomItemForm((v) => !v)}
          >
            <PackagePlus className="w-4 h-4" />
            <span className="hidden sm:inline">Custom Item</span>
          </Button>
        </div>

        {/* Custom Item Form */}
        <AnimatePresence>
          {showCustomItemForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden"
            >
              <div className="p-4 border-2 border-dashed border-primary/40 bg-primary/5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                    <Tag className="w-4 h-4" />
                    Add Custom / Unlisted Item
                  </h3>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowCustomItemForm(false)}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add a one-time item to this bill. It won't be added to your product catalogue.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Item Name *</label>
                    <Input
                      placeholder="e.g. Gift Wrapping"
                      value={customItemForm.name}
                      onChange={(e) => setCustomItemForm(f => ({ ...f, name: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
                      className="h-9"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Price (₹) *</label>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      value={customItemForm.price}
                      onChange={(e) => setCustomItemForm(f => ({ ...f, price: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
                      className="h-9"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Qty</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="1"
                        min="1"
                        value={customItemForm.quantity}
                        onChange={(e) => setCustomItemForm(f => ({ ...f, quantity: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
                        className="h-9"
                      />
                      <Button size="sm" className="h-9 gap-1 shrink-0" onClick={addCustomItem}>
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="font-medium text-sm line-clamp-1">
                          {item.name}
                        </p>
                        {item.isCustom && (
                          <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 border-primary/40 text-primary shrink-0">
                            Custom
                          </Badge>
                        )}
                      </div>
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

              {/* Payment Type */}
              <div className="space-y-3 mb-4">
                <Label className="text-sm flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
                  Payment Type
                </Label>
                <RadioGroup
                  value={paymentType}
                  onValueChange={(value) => setPaymentType(value as "full" | "partial")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="full" />
                    <Label htmlFor="full" className="font-normal cursor-pointer">
                      Full Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="partial" />
                    <Label htmlFor="partial" className="font-normal cursor-pointer">
                      Partial Payment
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Partial Payment Fields */}
              {paymentType === "partial" && (
                <div className="space-y-3 mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="space-y-2">
                    <Label className="text-sm">Paid Amount</Label>
                    <Input
                      placeholder="Enter amount paid"
                      type="number"
                      value={paidAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numValue = parseFloat(value) || 0;
                        if (numValue <= total) {
                          setPaidAmount(value);
                        } else {
                          toast.error("Paid amount cannot exceed total");
                        }
                      }}
                      className="h-9"
                      min="0"
                      max={total}
                      step="0.01"
                    />
                  </div>
                  
                  {paidAmount && parseFloat(paidAmount) > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded border border-amber-300 dark:border-amber-700">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Remaining Amount</p>
                        <p className="text-sm font-semibold text-amber-600">
                          ₹{(total - (parseFloat(paidAmount) || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Comment / Note</Label>
                    <Textarea
                      placeholder="e.g., Customer will pay remaining by next week"
                      value={paymentComment}
                      onChange={(e) => setPaymentComment(e.target.value)}
                      className="resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              )}

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
                <IndianRupee className="w-4 h-4 text-muted-foreground" />
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
                onClick={() => {
                  if (paymentType === "partial" && (!paidAmount || parseFloat(paidAmount) <= 0)) {
                    toast.error("Please enter a valid paid amount for partial payment");
                    return;
                  }
                  if (paymentType === "partial" && parseFloat(paidAmount) >= total) {
                    toast.error("For full payment, please select 'Full Payment' option");
                    return;
                  }
                  createOrderMutation.mutate();
                }}
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

      {/* Payment Details Dialog (for partial bill follow-up payments) */}
      {selectedInvoiceForPayment && store && (
        <PaymentDetailsDialog
          invoiceId={selectedInvoiceForPayment}
          open={paymentDetailsOpen}
          onOpenChange={(open) => {
            setPaymentDetailsOpen(open);
            if (!open) {
              // Refresh partial invoices list after recording a payment
              queryClient.invalidateQueries({ queryKey: ["partial-invoices", store.id] });
            }
          }}
          storeId={store.id}
        />
      )}
    </div>
  );
};

export default POSBillingPage;
