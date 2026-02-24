import { PlanName } from "@/hooks/useSubscription";

export interface FeatureConfig {
  key: string;
  minPlan: PlanName;
  description: string;
}

// Define all features and their minimum required plan
export const FEATURES: Record<string, FeatureConfig> = {
  // Main menu features
  DASHBOARD: {
    key: "dashboard",
    minPlan: "free",
    description: "Access to dashboard overview",
  },
  POS_BILLING: {
    key: "pos",
    minPlan: "free",
    description: "Point of Sale billing system",
  },
  ORDERS: {
    key: "orders",
    minPlan: "free",
    description: "View and manage orders",
  },
  PRODUCTS: {
    key: "products",
    minPlan: "free",
    description: "Product management",
  },
  CUSTOMERS: {
    key: "customers",
    minPlan: "starter",
    description: "Customer management",
  },
  ANALYTICS: {
    key: "analytics",
    minPlan: "starter",
    description: "Analytics dashboard and insights",
  },
  VENDORS: {
    key: "vendors",
    minPlan: "free",
    description: "Track purchases from vendors and distributors",
  },

  // Tools features
  CATALOGUE_LINK: {
    key: "catalogue-link",
    minPlan: "free",
    description: "Public catalogue link",
  },
  CUSTOMIZE_STORE: {
    key: "customize-store",
    minPlan: "starter",
    description: "Store customization options",
  },
  AI_UPLOAD: {
    key: "ai-upload",
    minPlan: "pro",
    description: "AI-powered product photo upload",
  },
  WHATSAPP: {
    key: "whatsapp",
    minPlan: "starter",
    description: "WhatsApp integration",
  },
  DELIVERY: {
    key: "delivery",
    minPlan: "starter",
    description: "Delivery management",
  },

  // Settings features
  STORE_SETTINGS: {
    key: "store-settings",
    minPlan: "free",
    description: "Basic store settings",
  },
  BILLING: {
    key: "billing",
    minPlan: "free",
    description: "Billing and subscription management",
  },
  NOTIFICATIONS: {
    key: "notifications",
    minPlan: "free",
    description: "Notification preferences",
  },
  SETTINGS: {
    key: "settings",
    minPlan: "free",
    description: "Account settings",
  },
};

// Plan hierarchy for comparison
const PLAN_HIERARCHY: Record<PlanName, number> = {
  free: 0,
  starter: 1,
  pro: 2,
};

// Check if a plan has access to a feature
export const canAccessFeature = (
  userPlan: PlanName,
  featureKey: string
): boolean => {
  const feature = Object.values(FEATURES).find((f) => f.key === featureKey);
  if (!feature) return false;
  
  return PLAN_HIERARCHY[userPlan] >= PLAN_HIERARCHY[feature.minPlan];
};

// Get all features accessible by a plan
export const getAccessibleFeatures = (plan: PlanName): string[] => {
  const planLevel = PLAN_HIERARCHY[plan];
  return Object.values(FEATURES)
    .filter((feature) => PLAN_HIERARCHY[feature.minPlan] <= planLevel)
    .map((feature) => feature.key);
};

// Get locked features for a plan
export const getLockedFeatures = (plan: PlanName): FeatureConfig[] => {
  const planLevel = PLAN_HIERARCHY[plan];
  return Object.values(FEATURES).filter(
    (feature) => PLAN_HIERARCHY[feature.minPlan] > planLevel
  );
};

// Product limits by plan
export const PRODUCT_LIMITS: Record<PlanName, number> = {
  free: 10,
  starter: 100,
  pro: Infinity,
};
