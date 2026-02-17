import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { canAccessFeature, PRODUCT_LIMITS } from "@/config/featureAccess";

export type PlanName = "free" | "starter" | "pro";

interface SubscriptionPlan {
  id: string;
  name: PlanName;
  price: number;
  period: string;
  features: string[];
  is_popular: boolean;
}

interface Store {
  id: string;
  subscription_plan_id: string | null;
  subscription_plans?: SubscriptionPlan;
}

export const useSubscription = () => {
  const { user } = useAuth();

  const { data: store, isLoading } = useQuery({
    queryKey: ["user-store", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("stores")
        .select("*, subscription_plans(*)")
        .eq("user_id", user.id)
        .maybeSingle();
      return data as Store | null;
    },
    enabled: !!user?.id,
  });

  const currentPlan: PlanName = (store?.subscription_plans?.name as PlanName) || "free";

  // Feature access control based on plan
  const hasFeature = (featureKey: string): boolean => {
    return canAccessFeature(currentPlan, featureKey);
  };

  const getProductLimit = (): number => {
    return PRODUCT_LIMITS[currentPlan];
  };

  return {
    currentPlan,
    subscriptionPlan: store?.subscription_plans,
    store,
    hasFeature,
    getProductLimit,
    isLoading,
  };
};
