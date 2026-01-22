import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isLogin = mode === "login";

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse(formData);
      } else {
        signupSchema.parse(formData);
      }
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path.length > 0) {
            errors[e.path[0] as string] = e.message;
          }
        });
        setFieldErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            setError("Invalid email or password. Please try again.");
          } else {
            setError(error.message);
          }
        } else {
          navigate(redirectTo);
        }
      } else {
        const { error } = await signUp(formData.email, formData.password);
        if (error) {
          if (error.message.includes("already registered")) {
            setError("This email is already registered. Please login instead.");
          } else {
            setError(error.message);
          }
        } else {
          setSuccess("Account created successfully! Redirecting...");
          setTimeout(() => navigate(redirectTo), 1500);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-primary via-primary to-[hsl(284,100%,8%)] relative overflow-hidden flex flex-col">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-light/10 rounded-full blur-3xl" />
      </div>

      {/* Header - Fixed height for mobile */}
      <header className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 md:py-6 relative z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline text-sm">Back to Home</span>
          </Link>
          <img src={logoDarkBg} alt="BizGrow 360" className="h-7 sm:h-8 md:h-10" />
        </div>
      </header>

      {/* Main Content - Centered with proper mobile padding */}
      <main className="flex-1 flex items-center justify-center px-4 py-4 sm:py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-border/50 p-5 sm:p-6 md:p-8">
            {/* Header - Compact on mobile */}
            <div className="text-center mb-5 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-purple-light/50 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <Store className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-card-foreground">
                {isLogin ? "Seller Login" : "Create Account"}
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5 sm:mt-2">
                {isLogin 
                  ? "Sign in to manage your store" 
                  : "Join BizGrow 360 and grow your business"
                }
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2 text-destructive"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600"
              >
                <p className="text-sm">{success}</p>
              </motion.div>
            )}

            {/* Form - Compact spacing on mobile */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`h-11 sm:h-12 ${fieldErrors.email ? "border-destructive" : ""}`}
                  disabled={isLoading}
                />
                {fieldErrors.email && (
                  <p className="text-destructive text-xs sm:text-sm">{fieldErrors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm">
                  <Lock className="w-4 h-4 text-primary" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className={`h-11 sm:h-12 pr-10 ${fieldErrors.password ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-destructive text-xs sm:text-sm">{fieldErrors.password}</p>
                )}
              </div>

              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-1.5"
                >
                  <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`h-11 sm:h-12 ${fieldErrors.confirmPassword ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="text-destructive text-xs sm:text-sm">{fieldErrors.confirmPassword}</p>
                  )}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 sm:h-12 bg-primary text-primary-foreground font-semibold text-sm sm:text-base mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            {/* Toggle mode */}
            <div className="mt-5 sm:mt-6 text-center">
              <p className="text-muted-foreground text-xs sm:text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                {" "}
                <Link
                  to={`/auth?mode=${isLogin ? "signup" : "login"}${redirectTo !== "/dashboard" ? `&redirect=${redirectTo}` : ""}`}
                  className="text-primary font-medium hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </Link>
              </p>
            </div>

            {/* Join as retailer CTA */}
            {isLogin && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-center text-muted-foreground text-xs sm:text-sm mb-3">
                  Want to list your store?
                </p>
                <Link to="/join">
                  <Button variant="outline" className="w-full h-10 sm:h-11 font-semibold text-sm">
                    Join as Retailer
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Auth;