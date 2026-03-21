import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Helper: create store from pending localStorage data (idempotent — checks first)
async function createPendingStore(userId: string) {
  const pendingRaw = localStorage.getItem("bizgrow_pending_store");
  if (!pendingRaw) return;

  try {
    // Check if store already exists for this user to avoid duplicates
    const { data: existing } = await supabase
      .from("stores")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      // Store already exists — just clean up localStorage
      localStorage.removeItem("bizgrow_pending_store");
      return;
    }

    const storeData = JSON.parse(pendingRaw);
    const { error } = await supabase.from("stores").insert({
      user_id: userId,
      name: storeData.storeName,
      category: storeData.category,
      business_mode: storeData.businessMode,
      state: storeData.state,
      city: storeData.city,
      subscription_status: "trial",
    });

    if (!error) {
      // Only remove from localStorage after a confirmed successful insert
      localStorage.removeItem("bizgrow_pending_store");
    } else {
      console.error("Pending store insert error:", error);
    }
  } catch (err) {
    console.error("Failed to create pending store:", err);
  }
}

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  // Guard against double-handling the session (race between getSession & onAuthStateChange)
  const sessionHandled = useRef(false);

  // ── Path A: token_hash in URL (PKCE / OTP link) ──────────────────────────
  useEffect(() => {
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const redirectTo = searchParams.get("redirect") || "/dashboard";

    if (!token_hash || !type) return; // handled by Path B

    const verify = async () => {
      try {
        // Accept any OTP type Supabase sends (signup, email, recovery, etc.)
        const { data: verifyData, error } = await supabase.auth.verifyOtp({
          token_hash,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type: type as any,
        });

        if (error) {
          setStatus("error");
          setMessage(error.message || "Failed to verify email. The link may have expired.");
          return;
        }

        const userId = verifyData?.user?.id;
        if (userId) {
          await createPendingStore(userId);
        }

        setStatus("success");
        setMessage("Email verified successfully! Redirecting...");
        setTimeout(() => navigate(redirectTo, { replace: true }), 2000);
      } catch {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verify();
  }, [searchParams, navigate]);

  // ── Path B: no token_hash — "check your email" page ──────────────────────
  // Handles both:
  //   1. Implicit flow: Supabase puts tokens in the URL hash; the client
  //      processes them automatically and fires SIGNED_IN *before* React mounts.
  //      We may only get INITIAL_SESSION here, so we check getSession() too.
  //   2. Normal flow: user confirms email in another tab; SIGNED_IN fires later.
  useEffect(() => {
    const token_hash = searchParams.get("token_hash");
    if (token_hash) return; // Path A handles this

    const redirectTo = searchParams.get("redirect") || "/dashboard";
    const userEmail = searchParams.get("email");
    if (userEmail) setEmail(userEmail);
    setStatus("success");
    setMessage("Please check your email to verify your account.");

    const handleVerifiedSession = async (userId: string) => {
      if (sessionHandled.current) return;
      sessionHandled.current = true;

      setStatus("success");
      setMessage("Email verified! Setting up your store...");

      await createPendingStore(userId);

      setTimeout(() => navigate(redirectTo, { replace: true }), 1500);
    };

    // Check if Supabase already established a session before this component
    // mounted (common with implicit flow where hash tokens are parsed immediately).
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        handleVerifiedSession(session.user.id);
      }
    });

    // Also listen for future SIGNED_IN / INITIAL_SESSION events.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (
          (event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
          session?.user?.id
        ) {
          await handleVerifiedSession(session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email address is required");
      return;
    }

    setIsResending(true);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/email-verification`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Verification email sent! Please check your inbox.");
      }
    } catch {
      toast.error("Failed to resend email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const hasTokenHash = !!searchParams.get("token_hash");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={"/favicon.png"} alt="BizGrow 360" className="h-10" />
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {status === "loading" || isResending ? (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : status === "success" ? (
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
              )}
            </div>

            {/* Title & Message */}
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {status === "loading"
                ? "Verifying Email..."
                : isResending
                ? "Sending Email..."
                : status === "success" && !hasTokenHash
                ? "Check Your Email"
                : status === "success"
                ? "Email Verified!"
                : "Verification Failed"}
            </h1>

            <p className="text-muted-foreground mb-6">
              {status === "loading"
                ? "Please wait while we verify your email address."
                : isResending
                ? "Sending verification email..."
                : status === "success" && !hasTokenHash
                ? `We've sent a verification link to ${email || "your email"}. Click the link in the email to verify your account.`
                : message}
            </p>

            {/* Email Display */}
            {email && status === "success" && !hasTokenHash && (
              <div className="bg-muted rounded-lg p-4 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-xs text-muted-foreground">Email sent to</p>
                  <p className="text-sm font-medium text-foreground">{email}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              {status === "success" && hasTokenHash && (
                <Button
                  className="w-full gap-2"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {status === "success" && !hasTokenHash && email && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleResendEmail}
                  disabled={isResending}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Resend Verification Email"
                  )}
                </Button>
              )}

              {status === "error" && (
                <>
                  {email && (
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={handleResendEmail}
                      disabled={isResending}
                    >
                      {isResending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Resend Verification Email"
                      )}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/auth?mode=login")}
                  >
                    Back to Login
                  </Button>
                </>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                {email && (
                  <button
                    onClick={handleResendEmail}
                    className="text-primary hover:underline font-medium"
                    disabled={isResending}
                  >
                    resend
                  </button>
                )}
              </p>
            </div>
          </div>

          {/* Footer Link */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <a
                href="mailto:support@bizgrow360.com"
                className="text-primary hover:underline font-medium"
              >
                Contact Support
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailVerification;
