import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import Index from "./pages/Index";
import Join from "./pages/Join";
import Auth from "./pages/Auth";
import EmailVerification from "./pages/EmailVerification";
import NotFound from "./pages/NotFound";
import StoreCatalogue from "./pages/StoreCatalogue";
import OrderConfirmation from "./pages/OrderConfirmation";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import POSBillingPage from "./pages/dashboard/POSBillingPage";
import ProductsPage from "./pages/dashboard/ProductsPage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import CustomersPage from "./pages/dashboard/CustomersPage";
import AIUploadPage from "./pages/dashboard/AIUploadPage";
import WhatsAppPage from "./pages/dashboard/WhatsAppPage";
import DeliveryPage from "./pages/dashboard/DeliveryPage";
import StoreSettingsPage from "./pages/dashboard/StoreSettingsPage";
import StoreCustomizationPage from "./pages/dashboard/StoreCustomizationPage";
import BillingPage from "./pages/dashboard/BillingPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import CatalogueLinkPage from "./pages/dashboard/CatalogueLinkPage";
import VendorsPage from "./pages/dashboard/VendorsPage";

// Feature Pages
import DigitalCataloguePage from "./pages/features/DigitalCataloguePage";
import AIUploadFeaturePage from "./pages/features/AIUploadFeaturePage";
import WhatsAppOrdersPage from "./pages/features/WhatsAppOrdersPage";
import AnalyticsFeaturePage from "./pages/features/AnalyticsFeaturePage";

// Solution Pages
import KiranaStorePage from "./pages/solutions/KiranaStorePage";
import BakeryStorePage from "./pages/solutions/BakeryStorePage";
import DairyStorePage from "./pages/solutions/DairyStorePage";
import ClothingStorePage from "./pages/solutions/ClothingStorePage";
import ElectronicsStorePage from "./pages/solutions/ElectronicsStorePage";
import CosmeticsStorePage from "./pages/solutions/CosmeticsStorePage";
import MobileStorePage from "./pages/solutions/MobileStorePage";
import FruitsVegetablesStorePage from "./pages/solutions/FruitsVegetablesStorePage";
import ElectricalStorePage from "./pages/solutions/ElectricalStorePage";
import PharmacyStorePage from "./pages/solutions/PharmacyStorePage";
import StationeryStorePage from "./pages/solutions/StationeryStorePage";
import HardwareStorePage from "./pages/solutions/HardwareStorePage";
import OtherRetailStorePage from "./pages/solutions/OtherRetailStorePage";
import ContactUs from "./pages/ContactUs";
import Pricing from "./pages/Pricing";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStores from "./pages/admin/AdminStores";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import { useSubscription } from "./hooks/useSubscription";

const queryClient = new QueryClient();

// Scroll to top on route change (fixes Issue #1)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }
  
  return <>{children}</>;
};

const FeatureProtectedRoute = ({ 
  children, 
  featureKey 
}: { 
  children: React.ReactNode; 
  featureKey: string;
}) => {
  const { hasFeature, isLoading } = useSubscription();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!hasFeature(featureKey)) {
    return <Navigate to="/dashboard/billing" replace />;
  }
  
  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  // Allow password reset even if user is logged in (Supabase creates a session from reset token)
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');
  const isResetPassword = mode === 'reset-password';
  
  if (user && !isResetPassword) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  return (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/join" element={<Join />} />
          <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/store/:storeId" element={<StoreCatalogue />} />
          {/* Support slug-based URLs like /s/storename-d3105ef5 */}
          <Route path="/s/:storeId" element={<StoreCatalogue />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          
          {/* Feature Pages */}
          <Route path="/features/digital-catalogue" element={<DigitalCataloguePage />} />
          <Route path="/features/ai-upload" element={<AIUploadFeaturePage />} />
          <Route path="/features/whatsapp-orders" element={<WhatsAppOrdersPage />} />
          <Route path="/features/analytics" element={<AnalyticsFeaturePage />} />
          
          {/* Solution Pages */}
          <Route path="/solutions/kirana" element={<KiranaStorePage />} />
          <Route path="/solutions/bakery" element={<BakeryStorePage />} />
          <Route path="/solutions/dairy" element={<DairyStorePage />} />
          <Route path="/solutions/clothing" element={<ClothingStorePage />} />
          <Route path="/solutions/electronics" element={<ElectronicsStorePage />} />
          <Route path="/solutions/cosmetics" element={<CosmeticsStorePage />} />
          <Route path="/solutions/mobile" element={<MobileStorePage />} />
          <Route path="/solutions/fruits-vegetables" element={<FruitsVegetablesStorePage />} />
          <Route path="/solutions/electrical" element={<ElectricalStorePage />} />
          <Route path="/solutions/pharmacy" element={<PharmacyStorePage />} />
          <Route path="/solutions/stationery" element={<StationeryStorePage />} />
          <Route path="/solutions/hardware" element={<HardwareStorePage />} />
          <Route path="/solutions/other-retail" element={<OtherRetailStorePage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="pos" element={<POSBillingPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="customers" element={<FeatureProtectedRoute featureKey="customers"><CustomersPage /></FeatureProtectedRoute>} />
            <Route path="analytics" element={<FeatureProtectedRoute featureKey="analytics"><AnalyticsPage /></FeatureProtectedRoute>} />
            <Route path="ai-upload" element={<FeatureProtectedRoute featureKey="ai-upload"><AIUploadPage /></FeatureProtectedRoute>} />
            <Route path="whatsapp" element={<FeatureProtectedRoute featureKey="whatsapp"><WhatsAppPage /></FeatureProtectedRoute>} />
            <Route path="delivery" element={<FeatureProtectedRoute featureKey="delivery"><DeliveryPage /></FeatureProtectedRoute>} />
            <Route path="catalogue-link" element={<CatalogueLinkPage />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="customize-store" element={<FeatureProtectedRoute featureKey="customize-store"><StoreCustomizationPage /></FeatureProtectedRoute>} />
            <Route path="store-settings" element={<StoreSettingsPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="stores" element={<AdminStores />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;