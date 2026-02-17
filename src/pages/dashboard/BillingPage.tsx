import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, Check, Zap, Crown, Download, Calendar,
  FileText, IndianRupee, AlertCircle, Star, Sparkles, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  is_popular: boolean;
}

interface SubscriptionInvoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  payment_method: string | null;
  created_at: string;
  billing_period_start: string | null;
  billing_period_end: string | null;
  paid_at: string | null;
}

const BillingPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const { data: store } = useQuery({
    queryKey: ["user-store", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("stores")
        .select("*, subscription_plans(*)")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: plans = [] } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("is_active", true)
        .order("price", { ascending: true });
      if (error) throw error;
      
      // If no plans in database, use default plans
      if (!data || data.length === 0) {
        return [
          {
            id: "free",
            name: "free",
            price: 0,
            period: "forever",
            features: [
              "Up to 10 products",
              "Basic catalogue",
              "Email support",
              "Mobile app access"
            ],
            is_popular: false
          },
          {
            id: "starter",
            name: "starter",
            price: 999,
            period: "month",
            features: [
              "Up to 100 products",
              "Basic catalogue",
              "WhatsApp orders",
              "Email support",
              "Mobile app access"
            ],
            is_popular: false
          },
          {
            id: "pro",
            name: "pro",
            price: 1499,
            period: "month",
            features: [
              "Unlimited products",
              "AI Photo Upload",
              "Analytics dashboard",
              "Priority support",
              "Custom domain",
              "Advanced features"
            ],
            is_popular: true
          }
        ] as Plan[];
      }
      
      return data.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : []
      })) as Plan[];
    },
  });

  const trialDaysLeft = store?.trial_ends_at 
    ? Math.max(0, Math.ceil((new Date(store.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  // Fetch subscription invoices
  const { data: invoices = [], isLoading: invoicesLoading } = useQuery({
    queryKey: ["subscription-invoices", store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("store_id", store.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as SubscriptionInvoice[];
    },
    enabled: !!store?.id,
  });

  // Select plan mutation
  const selectPlanMutation = useMutation({
    mutationFn: async (planId: string) => {
      if (!store?.id) throw new Error("Store not found");
      
      // In a real implementation, this would:
      // 1. Integrate with payment gateway (Razorpay/Stripe)
      // 2. Process payment
      // 3. Update subscription
      // 4. Create invoice
      
      // For now, just update the subscription plan
      const { error } = await supabase
        .from("stores")
        .update({ 
          subscription_plan_id: planId,
          subscription_status: "active"
        })
        .eq("id", store.id);
      
      if (error) throw error;
      return planId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-store", user?.id] });
      toast.success("Plan updated successfully!");
      setPlanDialogOpen(false);
      setSelectedPlan(null);
    },
    onError: (error: Error) => {
      toast.error("Failed to update plan: " + error.message);
    },
  });

  // Download invoice
  const downloadInvoice = (invoice: SubscriptionInvoice) => {
    // In a real implementation, this would generate and download a PDF
    // For now, create a simple text invoice
    const invoiceText = `
INVOICE: ${invoice.invoice_number}
${'='.repeat(50)}
Date: ${format(new Date(invoice.created_at), "MMMM d, yyyy")}
Amount: ₹${invoice.amount}
Status: ${invoice.status}
Payment Method: ${invoice.payment_method || 'Pending'}
${'='.repeat(50)}
    `;
    
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.invoice_number}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Invoice downloaded");
  };

  // Export all invoices
  const exportAllInvoices = () => {
    if (invoices.length === 0) {
      toast.error("No invoices to export");
      return;
    }

    const headers = [
      "Invoice Number",
      "Date",
      "Amount (₹)",
      "Status",
      "Payment Method",
      "Billing Period"
    ];

    const csvData = invoices.map(invoice => [
      invoice.invoice_number,
      format(new Date(invoice.created_at), "MMM d, yyyy"),
      invoice.amount,
      invoice.status,
      invoice.payment_method || "N/A",
      invoice.billing_period_start && invoice.billing_period_end
        ? `${format(new Date(invoice.billing_period_start), "MMM d")} - ${format(new Date(invoice.billing_period_end), "MMM d, yyyy")}`
        : "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => 
        row.map(cell => 
          typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))
            ? `"${cell.replace(/"/g, '""')}"`
            : cell
        ).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `subscription_invoices_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Exported ${invoices.length} invoices to CSV`);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setPlanDialogOpen(true);
  };

  const handleUpdatePaymentMethod = () => {
    setPaymentDialogOpen(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and billing details</p>
      </div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 rounded-xl border border-primary/20 p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-2">
              {store?.subscription_status === "trial" ? "Free Trial" : "Active"}
            </Badge>
            <h3 className="text-xl font-bold mb-1">
              {store?.subscription_plans?.name || "Free Trial"}
            </h3>
            <p className="text-muted-foreground">
              {store?.subscription_status === "trial" 
                ? `${trialDaysLeft} days remaining in your trial`
                : "Your subscription renews monthly"
              }
            </p>
          </div>
          {store?.subscription_status === "trial" && (
            <Button className="gap-2">
              <Zap className="w-4 h-4" />
              Upgrade Now
            </Button>
          )}
        </div>
        
        {store?.subscription_status === "trial" && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Trial Progress</span>
              <span>{14 - trialDaysLeft} / 14 days used</span>
            </div>
            <Progress value={((14 - trialDaysLeft) / 14) * 100} className="h-2" />
          </div>
        )}
      </motion.div>

      {/* Plans */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Your Plan</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-card rounded-xl border p-6 relative cursor-pointer transition-all flex flex-col ${
                plan.is_popular 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              } ${selectedPlan === plan.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.is_popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-4">
                <h4 className="font-semibold text-lg capitalize">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full mt-auto" 
                variant={plan.is_popular ? "default" : "outline"}
              >
                {store?.subscription_plan_id === plan.id ? "Current Plan" : "Select Plan"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Method
        </h3>
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
            VISA
          </div>
          <div className="flex-1">
            <p className="font-medium">•••• •••• •••• 4242</p>
            <p className="text-sm text-muted-foreground">Expires 12/25</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleUpdatePaymentMethod}>Update</Button>
        </div>
        <Button variant="link" className="mt-2 text-sm p-0 h-auto">
          + Add new payment method
        </Button>
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-border"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Billing History
            </h3>
            <p className="text-sm text-muted-foreground">Download your past invoices</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={exportAllInvoices}
            disabled={invoices.length === 0}
          >
            <Download className="w-4 h-4" />
            Export All
          </Button>
        </div>
        <div className="divide-y divide-border">
          {invoicesLoading ? (
            <div className="p-8 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">No invoices yet</p>
            </div>
          ) : (
            invoices.map((invoice) => (
              <div key={invoice.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{invoice.invoice_number}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(invoice.created_at), "MMMM d, yyyy")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{invoice.amount}</p>
                  <Badge 
                    variant={invoice.status === "paid" ? "default" : invoice.status === "pending" ? "secondary" : "destructive"} 
                    className="text-xs capitalize"
                  >
                    {invoice.status}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => downloadInvoice(invoice)}
                  title="Download invoice"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Plan Selection Dialog */}
      <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Plan Selection</DialogTitle>
            <DialogDescription>
              {selectedPlan && plans.find(p => p.id === selectedPlan) && (
                <>
                  You are about to select the <strong className="capitalize">{plans.find(p => p.id === selectedPlan)?.name}</strong> plan 
                  for ₹{plans.find(p => p.id === selectedPlan)?.price}/{plans.find(p => p.id === selectedPlan)?.period}.
                  <br /><br />
                  <span className="text-amber-600">Note: This is a demo. In production, you would be redirected to a payment gateway.</span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => selectedPlan && selectPlanMutation.mutate(selectedPlan)}
              disabled={selectPlanMutation.isPending}
            >
              {selectPlanMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Confirm Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Method Update Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
            <DialogDescription>
              Add or update your payment method for subscription billing.
              <br /><br />
              <span className="text-amber-600">Note: This is a demo. In production, you would integrate with Razorpay/Stripe for secure payment method management.</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Payment gateway integration features:
            </p>
            <ul className="text-sm space-y-2 ml-4">
              <li>✓ Credit/Debit Card</li>
              <li>✓ UPI</li>
              <li>✓ Net Banking</li>
              <li>✓ Wallets</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillingPage;
