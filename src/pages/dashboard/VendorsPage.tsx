import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  TrendingUp,
  PackageSearch,
  Wallet,
  CalendarDays,
  Trophy,
  AlertCircle,
  Loader2,
  Plus,
  Receipt,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
  Banknote,
  Smartphone,
  Landmark,
  Edit3,
  Trash2,
  ChevronRight,
  ArrowLeft,
  IndianRupee,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  useVendors,
  useVendorPurchases,
  useVendorPayments,
  useVendorStats,
  useAddVendor,
  useUpdateVendor,
  useDeleteVendor,
  useAddPurchase,
  useRecordPayment,
  type Vendor,
  type VendorPurchase,
  type NewVendorForm,
  type NewPurchaseForm,
} from "@/hooks/useVendors";

interface DashboardContext {
  store: {
    id: string;
    name: string;
    category?: string;
  } | null;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const formatCurrency = (amount: number) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

const paymentStatusConfig = {
  paid: { label: "Paid", icon: CheckCircle2, className: "bg-green-500/10 text-green-600 border-green-500/20" },
  partial: { label: "Partial", icon: Clock, className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  unpaid: { label: "Unpaid", icon: XCircle, className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const paymentMethodIcons = {
  cash: Banknote,
  upi: Smartphone,
  card: CreditCard,
  bank_transfer: Landmark,
};

const emptyVendorForm: NewVendorForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

const today = new Date().toISOString().slice(0, 10);
const emptyPurchaseForm: NewPurchaseForm = {
  vendor_id: "",
  product_id: "",
  product_name: "",
  quantity: 1,
  unit_price: 0,
  total_amount: 0,
  paid_amount: 0,
  payment_method: "cash",
  purchase_date: today,
  notes: "",
};

// ─────────────────────────────────────────────
// Stats Card
// ─────────────────────────────────────────────

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  delay: number;
  sub?: string;
}

const VendorStatsCard = ({ title, value, icon: Icon, iconBg, delay, sub }: StatsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="bg-card rounded-xl border p-4 flex items-center gap-4"
  >
    <div className={`p-2.5 rounded-xl ${iconBg}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-muted-foreground truncate">{title}</p>
      <p className="text-lg font-bold truncate">{value}</p>
      {sub && <p className="text-xs text-muted-foreground truncate">{sub}</p>}
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────

const VendorsPage = () => {
  const { store } = useOutletContext<DashboardContext>();
  const storeId = store?.id;

  // ── Data ──────────────────────────────────
  const { data: vendors = [], isLoading: vendorsLoading } = useVendors(storeId);
  const { data: purchases = [], isLoading: purchasesLoading } = useVendorPurchases(storeId);
  const { data: payments = [], isLoading: paymentsLoading } = useVendorPayments(storeId);
  const stats = useVendorStats(vendors, purchases);

  // Products for the purchase form
  const { data: products = [] } = useQuery({
    queryKey: ["products", storeId],
    queryFn: async () => {
      if (!storeId) return [];
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price")
        .eq("store_id", storeId)
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!storeId,
  });

  // ── Mutations ─────────────────────────────
  const addVendor = useAddVendor(storeId);
  const updateVendor = useUpdateVendor(storeId);
  const deleteVendor = useDeleteVendor(storeId);
  const addPurchase = useAddPurchase(storeId);
  const recordPayment = useRecordPayment(storeId);

  // ── UI State ──────────────────────────────
  const [activeTab, setActiveTab] = useState("vendors");
  const [searchQuery, setSearchQuery] = useState("");

  // Vendor dialogs
  const [addVendorOpen, setAddVendorOpen] = useState(false);
  const [editVendorOpen, setEditVendorOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [vendorForm, setVendorForm] = useState<NewVendorForm>(emptyVendorForm);

  // Purchase dialogs
  const [addPurchaseOpen, setAddPurchaseOpen] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState<NewPurchaseForm>(emptyPurchaseForm);

  // Purchase detail
  const [selectedPurchase, setSelectedPurchase] = useState<VendorPurchase | null>(null);
  const [purchaseDetailOpen, setPurchaseDetailOpen] = useState(false);

  // Record payment dialog
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "upi" | "card" | "bank_transfer">("cash");
  const [paymentComment, setPaymentComment] = useState("");

  // Vendor filter for purchases tab
  const [filterVendorId, setFilterVendorId] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // ── Filtered lists ─────────────────────────
  const filteredVendors = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return vendors.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        (v.phone?.toLowerCase() ?? "").includes(q)
    );
  }, [vendors, searchQuery]);

  const filteredPurchases = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return purchases.filter((p) => {
      const matchSearch =
        p.product_name.toLowerCase().includes(q) ||
        (p.vendor as unknown as Vendor)?.name?.toLowerCase().includes(q);
      const matchVendor = filterVendorId === "all" || p.vendor_id === filterVendorId;
      const matchStatus = filterStatus === "all" || p.payment_status === filterStatus;
      return matchSearch && matchVendor && matchStatus;
    });
  }, [purchases, searchQuery, filterVendorId, filterStatus]);

  // ── Handlers: Vendors ───────────────────────
  const handleOpenAddVendor = () => {
    setVendorForm(emptyVendorForm);
    setAddVendorOpen(true);
  };

  const handleSubmitAddVendor = () => {
    if (!vendorForm.name.trim()) {
      return;
    }
    addVendor.mutate(vendorForm, { onSuccess: () => setAddVendorOpen(false) });
  };

  const handleOpenEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setVendorForm({
      name: vendor.name,
      phone: vendor.phone ?? "",
      email: vendor.email ?? "",
      address: vendor.address ?? "",
      notes: vendor.notes ?? "",
    });
    setEditVendorOpen(true);
  };

  const handleSubmitEditVendor = () => {
    if (!editingVendor || !vendorForm.name.trim()) return;
    updateVendor.mutate(
      { id: editingVendor.id, form: vendorForm },
      { onSuccess: () => setEditVendorOpen(false) }
    );
  };

  const handleDeleteVendor = (vendorId: string) => {
    if (window.confirm("Delete this vendor? This cannot be undone.")) {
      deleteVendor.mutate(vendorId);
    }
  };

  // ── Handlers: Purchases ─────────────────────
  const handleOpenAddPurchase = (vendorId?: string) => {
    setPurchaseForm({
      ...emptyPurchaseForm,
      purchase_date: new Date().toISOString().slice(0, 10),
      vendor_id: vendorId ?? "",
    });
    setAddPurchaseOpen(true);
  };

  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setPurchaseForm((prev) => {
        const unitPrice = product.price ?? 0;
        const total = Number((unitPrice * prev.quantity).toFixed(2));
        return {
          ...prev,
          product_id: productId,
          product_name: product.name,
          unit_price: unitPrice,
          total_amount: total,
        };
      });
    } else {
      setPurchaseForm((prev) => ({ ...prev, product_id: productId, product_name: "" }));
    }
  };

  const handleQtyOrPriceChange = (field: "quantity" | "unit_price", raw: string) => {
    const value = parseFloat(raw) || 0;
    setPurchaseForm((prev) => {
      const q = field === "quantity" ? value : prev.quantity;
      const u = field === "unit_price" ? value : prev.unit_price;
      return { ...prev, [field]: value, total_amount: Number((q * u).toFixed(2)) };
    });
  };

  const handleSubmitPurchase = () => {
    if (!purchaseForm.vendor_id) { return; }
    if (!purchaseForm.product_name.trim()) { return; }
    if (purchaseForm.quantity <= 0 || purchaseForm.total_amount <= 0) { return; }
    addPurchase.mutate(purchaseForm, { onSuccess: () => setAddPurchaseOpen(false) });
  };

  // ── Handlers: Record Payment ─────────────────
  const handleOpenRecordPayment = (purchase: VendorPurchase) => {
    setSelectedPurchase(purchase);
    setPaymentAmount("");
    setPaymentMethod("cash");
    setPaymentComment("");
    setRecordPaymentOpen(true);
    setPurchaseDetailOpen(false);
  };

  const handleSubmitPayment = () => {
    if (!selectedPurchase) return;
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0) return;
    if (amount > selectedPurchase.remaining_amount) return;
    recordPayment.mutate(
      {
        purchaseId: selectedPurchase.id,
        currentPaidAmount: selectedPurchase.paid_amount,
        currentTotal: selectedPurchase.total_amount,
        paymentAmount: amount,
        paymentMethod,
        comment: paymentComment,
      },
      {
        onSuccess: () => {
          setRecordPaymentOpen(false);
          setSelectedPurchase(null);
        },
      }
    );
  };

  const isLoading = vendorsLoading || purchasesLoading;

  // ── Render ─────────────────────────────────
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 pb-24 lg:pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Vendors
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track purchases from your distributors & suppliers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleOpenAddPurchase()}>
            <Receipt className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Add Purchase</span>
            <span className="sm:hidden">Purchase</span>
          </Button>
          <Button size="sm" onClick={handleOpenAddVendor}>
            <Plus className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Add Vendor</span>
            <span className="sm:hidden">Vendor</span>
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <VendorStatsCard
          title="Total Vendors"
          value={String(stats.totalVendors)}
          icon={Building2}
          iconBg="bg-blue-500/10 text-blue-600"
          delay={0}
        />
        <VendorStatsCard
          title="Total Purchases"
          value={String(stats.totalPurchases)}
          icon={PackageSearch}
          iconBg="bg-purple-500/10 text-purple-600"
          delay={0.05}
        />
        <VendorStatsCard
          title="Amount Spent"
          value={formatCurrency(stats.totalAmountSpent)}
          icon={IndianRupee}
          iconBg="bg-green-500/10 text-green-600"
          delay={0.1}
        />
        <VendorStatsCard
          title="This Month"
          value={formatCurrency(stats.thisMonthSpending)}
          icon={CalendarDays}
          iconBg="bg-cyan-500/10 text-cyan-600"
          delay={0.15}
        />
        <VendorStatsCard
          title="Top Vendor"
          value={stats.topVendorName}
          icon={Trophy}
          iconBg="bg-yellow-500/10 text-yellow-600"
          delay={0.2}
        />
        <VendorStatsCard
          title="Pending Payments"
          value={formatCurrency(stats.pendingPayments)}
          icon={AlertCircle}
          iconBg="bg-red-500/10 text-red-600"
          delay={0.25}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSearchQuery(""); }}>
        <div className="flex items-center gap-3 flex-wrap">
          <TabsList>
            <TabsTrigger value="vendors">Vendors ({vendors.length})</TabsTrigger>
            <TabsTrigger value="purchases">Purchases ({purchases.length})</TabsTrigger>
            <TabsTrigger value="payments">Payments ({payments.length})</TabsTrigger>
          </TabsList>
          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={activeTab === "vendors" ? "Search vendors…" : activeTab === "purchases" ? "Search purchases…" : ""}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          {/* Purchases filters */}
          {activeTab === "purchases" && (
            <div className="flex gap-2">
              <Select value={filterVendorId} onValueChange={setFilterVendorId}>
                <SelectTrigger className="h-9 w-36">
                  <SelectValue placeholder="All Vendors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vendors</SelectItem>
                  {vendors.map((v) => (
                    <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="h-9 w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* ── Vendors Tab ───────────────────── */}
        {activeTab === "vendors" && (
          <div className="mt-4">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredVendors.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-3 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="font-medium">No vendors yet</p>
                <p className="text-sm text-muted-foreground">Add your first vendor to start tracking purchases</p>
                <Button size="sm" onClick={handleOpenAddVendor}>
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Vendor
                </Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <AnimatePresence>
                  {filteredVendors.map((vendor, i) => {
                    const vendorPurchases = purchases.filter((p) => p.vendor_id === vendor.id);
                    const totalSpent = vendorPurchases.reduce((s, p) => s + p.total_amount, 0);
                    const pending = vendorPurchases.reduce((s, p) => s + p.remaining_amount, 0);
                    return (
                      <motion.div
                        key={vendor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ delay: i * 0.04 }}
                        className="bg-card border rounded-xl p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Building2 className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold truncate">{vendor.name}</p>
                              {vendor.phone && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Phone className="w-3 h-3" /> {vendor.phone}
                                </p>
                              )}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenAddPurchase(vendor.id)}>
                                <Receipt className="w-4 h-4 mr-2" /> Add Purchase
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleOpenEditVendor(vendor)}>
                                <Edit3 className="w-4 h-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteVendor(vendor.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {vendor.address && (
                          <p className="text-xs text-muted-foreground flex items-start gap-1">
                            <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{vendor.address}</span>
                          </p>
                        )}

                        <Separator />

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-xs text-muted-foreground">Purchases</p>
                            <p className="font-semibold text-sm">{vendorPurchases.length}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Spent</p>
                            <p className="font-semibold text-sm">{formatCurrency(totalSpent)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Pending</p>
                            <p className={`font-semibold text-sm ${pending > 0 ? "text-red-500" : "text-green-500"}`}>
                              {formatCurrency(pending)}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full h-8 text-xs"
                          onClick={() => {
                            setFilterVendorId(vendor.id);
                            setActiveTab("purchases");
                          }}
                        >
                          View Purchases
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* ── Purchases Tab ─────────────────── */}
        {activeTab === "purchases" && (
          <div className="mt-4">
            {purchasesLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredPurchases.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-3 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <PackageSearch className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="font-medium">No purchases found</p>
                <p className="text-sm text-muted-foreground">Record your first purchase from a vendor</p>
                <Button size="sm" onClick={() => handleOpenAddPurchase()}>
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Purchase
                </Button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {filteredPurchases.map((purchase, i) => {
                    const statusCfg = paymentStatusConfig[purchase.payment_status];
                    const StatusIcon = statusCfg.icon;
                    const vendorName = (purchase.vendor as unknown as Vendor)?.name ?? "—";
                    return (
                      <motion.div
                        key={purchase.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        transition={{ delay: i * 0.03 }}
                        className="bg-card border rounded-xl p-4 cursor-pointer hover:shadow-sm transition-shadow"
                        onClick={() => {
                          setSelectedPurchase(purchase);
                          setPurchaseDetailOpen(true);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                            <PackageSearch className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold truncate">{purchase.product_name}</p>
                              <Badge variant="outline" className={`text-xs ${statusCfg.className}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusCfg.label}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground flex-wrap">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" /> {vendorName}
                              </span>
                              <span>Qty: {purchase.quantity}</span>
                              <span className="flex items-center gap-0.5">
                                <CalendarDays className="w-3 h-3" />
                                {format(new Date(purchase.purchase_date), "dd MMM yyyy")}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold">{formatCurrency(purchase.total_amount)}</p>
                            {purchase.remaining_amount > 0 && (
                              <p className="text-xs text-red-500">Due: {formatCurrency(purchase.remaining_amount)}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* ── Payments Tab ──────────────────── */}
        {activeTab === "payments" && (
          <div className="mt-4">
            {paymentsLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : payments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 gap-3 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <Wallet className="w-7 h-7 text-muted-foreground" />
                </div>
                <p className="font-medium">No payments recorded</p>
                <p className="text-sm text-muted-foreground">Payments will appear here as you record them</p>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-2">
                {payments.map((payment, i) => {
                  const MethodIcon = paymentMethodIcons[payment.payment_method as keyof typeof paymentMethodIcons] ?? Banknote;
                  const purchaseInfo = payment.purchase as unknown as { product_name: string; vendor: { name: string } } | undefined;
                  return (
                    <motion.div
                      key={payment.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-card border rounded-xl p-4 flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <MethodIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {purchaseInfo?.product_name ?? "Purchase"} — {purchaseInfo?.vendor?.name ?? "Vendor"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="capitalize">{payment.payment_method.replace("_", " ")}</span>
                          {payment.comment && <span>· {payment.comment}</span>}
                          <span>· {format(new Date(payment.created_at), "dd MMM yyyy, hh:mm a")}</span>
                        </div>
                      </div>
                      <p className="font-bold text-green-600 shrink-0">{formatCurrency(payment.amount)}</p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Tabs>

      {/* ════════════════════════════════════════
          Dialogs
      ════════════════════════════════════════ */}

      {/* Add / Edit Vendor Dialog */}
      {[
        { open: addVendorOpen, setOpen: setAddVendorOpen, title: "Add Vendor", onSubmit: handleSubmitAddVendor, loading: addVendor.isPending },
        { open: editVendorOpen, setOpen: setEditVendorOpen, title: "Edit Vendor", onSubmit: handleSubmitEditVendor, loading: updateVendor.isPending },
      ].map(({ open, setOpen, title, onSubmit, loading }) => (
        <Dialog key={title} open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-2">
              <div>
                <Label>Vendor / Distributor Name *</Label>
                <Input
                  className="mt-1"
                  placeholder="e.g. Lays Distributor, PepsiCo Wholesale"
                  value={vendorForm.name}
                  onChange={(e) => setVendorForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Phone</Label>
                  <Input
                    className="mt-1"
                    placeholder="98765XXXXX"
                    value={vendorForm.phone}
                    onChange={(e) => setVendorForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    className="mt-1"
                    placeholder="vendor@email.com"
                    type="email"
                    value={vendorForm.email}
                    onChange={(e) => setVendorForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <Input
                  className="mt-1"
                  placeholder="Vendor address"
                  value={vendorForm.address}
                  onChange={(e) => setVendorForm((f) => ({ ...f, address: e.target.value }))}
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  className="mt-1 resize-none"
                  placeholder="Any notes about this vendor…"
                  rows={2}
                  value={vendorForm.notes}
                  onChange={(e) => setVendorForm((f) => ({ ...f, notes: e.target.value }))}
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={onSubmit} disabled={loading || !vendorForm.name.trim()}>
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {title === "Add Vendor" ? "Add Vendor" : "Save Changes"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}

      {/* Add Purchase Dialog */}
      <Dialog open={addPurchaseOpen} onOpenChange={setAddPurchaseOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Record Purchase</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 pt-2">
            {/* Vendor */}
            <div>
              <Label>Vendor *</Label>
              <Select
                value={purchaseForm.vendor_id}
                onValueChange={(v) => setPurchaseForm((f) => ({ ...f, vendor_id: v }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((v) => (
                    <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product */}
            <div>
              <Label>Product *</Label>
              <Select
                value={purchaseForm.product_id || "__manual__"}
                onValueChange={(v) => {
                  if (v === "__manual__") {
                    setPurchaseForm((f) => ({ ...f, product_id: "", product_name: "" }));
                  } else {
                    handleProductSelect(v);
                  }
                }}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select from catalog or enter manually" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__manual__">— Enter manually —</SelectItem>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(!purchaseForm.product_id || purchaseForm.product_id === "") && (
                <Input
                  className="mt-2"
                  placeholder="e.g. Lays Classic (100g), Milk Packet"
                  value={purchaseForm.product_name}
                  onChange={(e) => setPurchaseForm((f) => ({ ...f, product_name: e.target.value }))}
                />
              )}
            </div>

            {/* Qty & Unit Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Quantity *</Label>
                <Input
                  className="mt-1"
                  type="number"
                  min="0.01"
                  step="any"
                  placeholder="e.g. 100 or 1 box"
                  value={purchaseForm.quantity || ""}
                  onChange={(e) => handleQtyOrPriceChange("quantity", e.target.value)}
                />
              </div>
              <div>
                <Label>Unit Price (₹) *</Label>
                <Input
                  className="mt-1"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="Cost per unit"
                  value={purchaseForm.unit_price || ""}
                  onChange={(e) => handleQtyOrPriceChange("unit_price", e.target.value)}
                />
              </div>
            </div>

            {/* Total Amount */}
            <div>
              <Label>Total Amount (₹) *</Label>
              <Input
                className="mt-1"
                type="number"
                min="0"
                step="any"
                value={purchaseForm.total_amount || ""}
                onChange={(e) => setPurchaseForm((f) => ({ ...f, total_amount: parseFloat(e.target.value) || 0 }))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Auto-calculated from Qty × Unit Price. You can override it.
              </p>
            </div>

            <Separator />

            {/* Payment */}
            <div>
              <Label>Amount Paying Now (₹)</Label>
              <Input
                className="mt-1"
                type="number"
                min="0"
                step="any"
                placeholder="0 = Unpaid"
                value={purchaseForm.paid_amount || ""}
                onChange={(e) =>
                  setPurchaseForm((f) => ({ ...f, paid_amount: parseFloat(e.target.value) || 0 }))
                }
              />
            </div>

            {purchaseForm.paid_amount > 0 && (
              <div>
                <Label>Payment Method</Label>
                <Select
                  value={purchaseForm.payment_method}
                  onValueChange={(v) =>
                    setPurchaseForm((f) => ({ ...f, payment_method: v as NewPurchaseForm["payment_method"] }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date & Notes */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Purchase Date</Label>
                <Input
                  className="mt-1"
                  type="date"
                  value={purchaseForm.purchase_date}
                  onChange={(e) => setPurchaseForm((f) => ({ ...f, purchase_date: e.target.value }))}
                />
              </div>
              <div>
                <Label>Notes</Label>
                <Input
                  className="mt-1"
                  placeholder="Optional"
                  value={purchaseForm.notes}
                  onChange={(e) => setPurchaseForm((f) => ({ ...f, notes: e.target.value }))}
                />
              </div>
            </div>

            {/* Summary */}
            {purchaseForm.total_amount > 0 && (
              <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">{formatCurrency(purchaseForm.total_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Paying Now</span>
                  <span className="font-medium text-green-600">{formatCurrency(purchaseForm.paid_amount)}</span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className={`font-semibold ${purchaseForm.total_amount - purchaseForm.paid_amount > 0 ? "text-red-500" : "text-green-600"}`}>
                    {formatCurrency(Math.max(0, purchaseForm.total_amount - purchaseForm.paid_amount))}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setAddPurchaseOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmitPurchase}
                disabled={
                  addPurchase.isPending ||
                  !purchaseForm.vendor_id ||
                  !purchaseForm.product_name.trim() ||
                  purchaseForm.quantity <= 0 ||
                  purchaseForm.total_amount <= 0
                }
              >
                {addPurchase.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Record Purchase
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Purchase Detail Dialog */}
      <Dialog open={purchaseDetailOpen} onOpenChange={setPurchaseDetailOpen}>
        <DialogContent className="max-w-md">
          {selectedPurchase && (() => {
            const statusCfg = paymentStatusConfig[selectedPurchase.payment_status];
            const StatusIcon = statusCfg.icon;
            const vendorName = (selectedPurchase.vendor as unknown as Vendor)?.name ?? "—";
            const purchasePayments = payments.filter((p) => p.purchase_id === selectedPurchase.id);
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 -ml-1"
                      onClick={() => setPurchaseDetailOpen(false)}
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <DialogTitle>Purchase Details</DialogTitle>
                  </div>
                </DialogHeader>
                <div className="flex flex-col gap-4 pt-1">
                  <div className="bg-muted/40 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-lg">{selectedPurchase.product_name}</p>
                      <Badge variant="outline" className={statusCfg.className}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusCfg.label}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                      <span className="text-muted-foreground">Vendor</span><span className="font-medium">{vendorName}</span>
                      <span className="text-muted-foreground">Quantity</span><span className="font-medium">{selectedPurchase.quantity}</span>
                      <span className="text-muted-foreground">Unit Price</span><span className="font-medium">{formatCurrency(selectedPurchase.unit_price)}</span>
                      <span className="text-muted-foreground">Total</span><span className="font-bold">{formatCurrency(selectedPurchase.total_amount)}</span>
                      <span className="text-muted-foreground">Date</span><span className="font-medium">{format(new Date(selectedPurchase.purchase_date), "dd MMM yyyy")}</span>
                    </div>
                  </div>

                  <div className="bg-muted/40 rounded-xl p-4 space-y-2">
                    <p className="font-medium text-sm">Payment Summary</p>
                    <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                      <span className="text-muted-foreground">Paid</span>
                      <span className="font-medium text-green-600">{formatCurrency(selectedPurchase.paid_amount)}</span>
                      <span className="text-muted-foreground">Remaining</span>
                      <span className={`font-semibold ${selectedPurchase.remaining_amount > 0 ? "text-red-500" : "text-green-600"}`}>
                        {formatCurrency(selectedPurchase.remaining_amount)}
                      </span>
                    </div>
                  </div>

                  {purchasePayments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Payment History</p>
                      <div className="flex flex-col gap-1.5">
                        {purchasePayments.map((pay) => {
                          const MIcon = paymentMethodIcons[pay.payment_method as keyof typeof paymentMethodIcons] ?? Banknote;
                          return (
                            <div key={pay.id} className="flex items-center gap-2 text-sm">
                              <MIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              <span className="capitalize text-muted-foreground">{pay.payment_method.replace("_", " ")}</span>
                              {pay.comment && <span className="text-muted-foreground">· {pay.comment}</span>}
                              <span className="ml-auto font-medium">{formatCurrency(pay.amount)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {selectedPurchase.notes && (
                    <p className="text-sm text-muted-foreground border rounded-lg p-3">{selectedPurchase.notes}</p>
                  )}

                  {selectedPurchase.payment_status !== "paid" && (
                    <Button onClick={() => handleOpenRecordPayment(selectedPurchase)}>
                      <Wallet className="w-4 h-4 mr-2" />
                      Record Payment ({formatCurrency(selectedPurchase.remaining_amount)} due)
                    </Button>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Record Payment Dialog */}
      <Dialog open={recordPaymentOpen} onOpenChange={setRecordPaymentOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          {selectedPurchase && (
            <div className="flex flex-col gap-4 pt-2">
              <div className="bg-muted/40 rounded-lg p-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product</span>
                  <span className="font-medium">{selectedPurchase.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Due</span>
                  <span className="font-semibold text-red-500">{formatCurrency(selectedPurchase.remaining_amount)}</span>
                </div>
              </div>

              <div>
                <Label>Payment Amount (₹) *</Label>
                <Input
                  className="mt-1"
                  type="number"
                  min="0.01"
                  max={selectedPurchase.remaining_amount}
                  step="any"
                  placeholder={`Max: ${formatCurrency(selectedPurchase.remaining_amount)}`}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>

              <div>
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Comment (optional)</Label>
                <Input
                  className="mt-1"
                  placeholder="e.g. Paid via GPay"
                  value={paymentComment}
                  onChange={(e) => setPaymentComment(e.target.value)}
                />
              </div>

              <div className="flex gap-2 pt-1">
                <Button variant="outline" className="flex-1" onClick={() => setRecordPaymentOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitPayment}
                  disabled={
                    recordPayment.isPending ||
                    !paymentAmount ||
                    parseFloat(paymentAmount) <= 0 ||
                    parseFloat(paymentAmount) > selectedPurchase.remaining_amount
                  }
                >
                  {recordPayment.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Confirm Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorsPage;
