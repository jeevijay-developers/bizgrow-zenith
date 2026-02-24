import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface Vendor {
  id: string;
  store_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VendorPurchase {
  id: string;
  store_id: string;
  vendor_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  payment_status: "paid" | "partial" | "unpaid";
  paid_amount: number;
  remaining_amount: number;
  purchase_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  vendor?: Vendor;
}

export interface VendorPayment {
  id: string;
  purchase_id: string;
  store_id: string;
  amount: number;
  payment_method: "cash" | "upi" | "card" | "bank_transfer";
  comment: string | null;
  created_at: string;
  purchase?: VendorPurchase;
}

export interface NewVendorForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

export interface NewPurchaseForm {
  vendor_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  paid_amount: number;
  payment_method: "cash" | "upi" | "card" | "bank_transfer";
  purchase_date: string;
  notes: string;
}

// ─────────────────────────────────────────────
// Vendor Stats
// ─────────────────────────────────────────────

export interface VendorStats {
  totalVendors: number;
  totalPurchases: number;
  totalAmountSpent: number;
  thisMonthSpending: number;
  topVendorName: string;
  pendingPayments: number;
}

// ─────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────

export function useVendors(storeId: string | undefined) {
  return useQuery({
    queryKey: ["vendors", storeId],
    queryFn: async () => {
      if (!storeId) return [];
      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("store_id", storeId)
        .order("name");
      if (error) throw error;
      return (data ?? []) as Vendor[];
    },
    enabled: !!storeId,
  });
}

export function useVendorPurchases(storeId: string | undefined) {
  return useQuery({
    queryKey: ["vendor-purchases", storeId],
    queryFn: async () => {
      if (!storeId) return [];
      const { data, error } = await supabase
        .from("vendor_purchases")
        .select("*, vendor:vendors(id, name, phone)")
        .eq("store_id", storeId)
        .order("purchase_date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as VendorPurchase[];
    },
    enabled: !!storeId,
  });
}

export function useVendorPayments(storeId: string | undefined) {
  return useQuery({
    queryKey: ["vendor-payments", storeId],
    queryFn: async () => {
      if (!storeId) return [];
      const { data, error } = await supabase
        .from("vendor_payments")
        .select("*, purchase:vendor_purchases(id, product_name, vendor:vendors(name))")
        .eq("store_id", storeId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as VendorPayment[];
    },
    enabled: !!storeId,
  });
}

export function useVendorStats(
  vendors: Vendor[],
  purchases: VendorPurchase[]
): VendorStats {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  const totalVendors = vendors.filter((v) => v.is_active).length;
  const totalPurchases = purchases.length;
  const totalAmountSpent = purchases.reduce((sum, p) => sum + p.total_amount, 0);

  const thisMonthSpending = purchases
    .filter((p) => {
      const d = new Date(p.purchase_date);
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .reduce((sum, p) => sum + p.total_amount, 0);

  // Top vendor by total amount across purchases
  const vendorTotals: Record<string, { name: string; total: number }> = {};
  for (const p of purchases) {
    if (!vendorTotals[p.vendor_id]) {
      const vendor = vendors.find((v) => v.id === p.vendor_id);
      vendorTotals[p.vendor_id] = { name: vendor?.name ?? "Unknown", total: 0 };
    }
    vendorTotals[p.vendor_id].total += p.total_amount;
  }
  const topEntry = Object.values(vendorTotals).sort((a, b) => b.total - a.total)[0];
  const topVendorName = topEntry?.name ?? "—";

  const pendingPayments = purchases
    .filter((p) => p.payment_status !== "paid")
    .reduce((sum, p) => sum + p.remaining_amount, 0);

  return {
    totalVendors,
    totalPurchases,
    totalAmountSpent,
    thisMonthSpending,
    topVendorName,
    pendingPayments,
  };
}

// ─────────────────────────────────────────────
// Mutations
// ─────────────────────────────────────────────

export function useAddVendor(storeId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: NewVendorForm) => {
      if (!storeId) throw new Error("No store");
      const { error } = await supabase.from("vendors").insert({
        store_id: storeId,
        name: form.name.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        address: form.address.trim() || null,
        notes: form.notes.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors", storeId] });
      toast.success("Vendor added successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useUpdateVendor(storeId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, form }: { id: string; form: Partial<NewVendorForm> & { is_active?: boolean } }) => {
      const { error } = await supabase
        .from("vendors")
        .update({
          name: form.name?.trim(),
          phone: form.phone?.trim() || null,
          email: form.email?.trim() || null,
          address: form.address?.trim() || null,
          notes: form.notes?.trim() || null,
          is_active: form.is_active,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors", storeId] });
      toast.success("Vendor updated");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteVendor(storeId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vendorId: string) => {
      const { error } = await supabase.from("vendors").delete().eq("id", vendorId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors", storeId] });
      queryClient.invalidateQueries({ queryKey: ["vendor-purchases", storeId] });
      toast.success("Vendor deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useAddPurchase(storeId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (form: NewPurchaseForm) => {
      if (!storeId) throw new Error("No store");
      const remainingAmount = form.total_amount - form.paid_amount;
      let paymentStatus: "paid" | "partial" | "unpaid" = "unpaid";
      if (form.paid_amount >= form.total_amount) paymentStatus = "paid";
      else if (form.paid_amount > 0) paymentStatus = "partial";

      // Insert purchase
      const { data: purchase, error: purchaseError } = await supabase
        .from("vendor_purchases")
        .insert({
          store_id: storeId,
          vendor_id: form.vendor_id,
          product_id: form.product_id || null,
          product_name: form.product_name.trim(),
          quantity: form.quantity,
          unit_price: form.unit_price,
          total_amount: form.total_amount,
          paid_amount: form.paid_amount,
          remaining_amount: remainingAmount < 0 ? 0 : remainingAmount,
          payment_status: paymentStatus,
          purchase_date: form.purchase_date,
          notes: form.notes.trim() || null,
        })
        .select()
        .single();
      if (purchaseError) throw purchaseError;

      // If initial payment > 0, record it as a payment entry
      if (form.paid_amount > 0 && purchase) {
        const { error: payError } = await supabase.from("vendor_payments").insert({
          purchase_id: purchase.id,
          store_id: storeId,
          amount: form.paid_amount,
          payment_method: form.payment_method,
          comment: "Initial payment",
        });
        if (payError) throw payError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendor-purchases", storeId] });
      queryClient.invalidateQueries({ queryKey: ["vendor-payments", storeId] });
      toast.success("Purchase recorded");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useRecordPayment(storeId: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      purchaseId,
      currentPaidAmount,
      currentTotal,
      paymentAmount,
      paymentMethod,
      comment,
    }: {
      purchaseId: string;
      currentPaidAmount: number;
      currentTotal: number;
      paymentAmount: number;
      paymentMethod: "cash" | "upi" | "card" | "bank_transfer";
      comment: string;
    }) => {
      if (!storeId) throw new Error("No store");
      const newPaidAmount = currentPaidAmount + paymentAmount;
      const newRemaining = currentTotal - newPaidAmount;
      let newStatus: "paid" | "partial" | "unpaid" = "unpaid";
      if (newPaidAmount >= currentTotal) newStatus = "paid";
      else if (newPaidAmount > 0) newStatus = "partial";

      // Insert payment record
      const { error: payError } = await supabase.from("vendor_payments").insert({
        purchase_id: purchaseId,
        store_id: storeId,
        amount: paymentAmount,
        payment_method: paymentMethod,
        comment: comment.trim() || null,
      });
      if (payError) throw payError;

      // Update purchase totals
      const { error: updateError } = await supabase
        .from("vendor_purchases")
        .update({
          paid_amount: newPaidAmount,
          remaining_amount: newRemaining < 0 ? 0 : newRemaining,
          payment_status: newStatus,
        })
        .eq("id", purchaseId);
      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendor-purchases", storeId] });
      queryClient.invalidateQueries({ queryKey: ["vendor-payments", storeId] });
      toast.success("Payment recorded");
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
