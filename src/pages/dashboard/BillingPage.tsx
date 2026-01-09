import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, Check, Zap, Crown, Download, Calendar,
  FileText, IndianRupee, AlertCircle, Star, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  is_popular: boolean;
}

const BillingPage = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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
      return data.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : []
      })) as Plan[];
    },
  });

  const trialDaysLeft = store?.trial_ends_at 
    ? Math.max(0, Math.ceil((new Date(store.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  const invoices = [
    { id: "INV-001", date: "2024-01-01", amount: 999, status: "paid" },
    { id: "INV-002", date: "2024-02-01", amount: 999, status: "paid" },
    { id: "INV-003", date: "2024-03-01", amount: 999, status: "pending" },
  ];

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
              className={`bg-card rounded-xl border p-6 relative cursor-pointer transition-all ${
                plan.is_popular 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              } ${selectedPlan === plan.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.is_popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-4">
                <h4 className="font-semibold text-lg">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full mt-6" 
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
          <Button variant="outline" size="sm">Update</Button>
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
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export All
          </Button>
        </div>
        <div className="divide-y divide-border">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{invoice.id}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(invoice.date), "MMMM d, yyyy")}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{invoice.amount}</p>
                <Badge variant={invoice.status === "paid" ? "default" : "secondary"} className="text-xs">
                  {invoice.status}
                </Badge>
              </div>
              <Button variant="ghost" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BillingPage;
