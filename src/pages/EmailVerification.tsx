import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoDarkBg from "@/assets/logo-dark-bg.png";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleEmailVerification = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      
      // If we have a token hash, verify it
      if (token_hash && type === 'email') {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'email',
          });

          if (error) {
            setStatus('error');
            setMessage(error.message || "Failed to verify email. The link may have expired.");
          } else {
            setStatus('success');
            setMessage("Email verified successfully! Redirecting...");
            
            // Redirect to dashboard or specified page after 2 seconds
            setTimeout(() => {
              navigate(redirectTo, { replace: true });
            }, 2000);
          }
        } catch (err) {
          setStatus('error');
          setMessage("An error occurred during verification. Please try again.");
        }
      } else {
        // No token, show the "check your email" page
        const userEmail = searchParams.get('email');
        if (userEmail) {
          setEmail(userEmail);
        }
        setStatus('success');
        setMessage("Please check your email to verify your account.");
      }
    };

    handleEmailVerification();
  }, [searchParams, navigate]);

  // Listen for auth state changes to auto-redirect when email is verified
  useEffect(() => {
    // Only set up listener if we're on the "check your email" page (no token_hash)
    const token_hash = searchParams.get('token_hash');
    if (token_hash) return;

    const redirectTo = searchParams.get('redirect') || '/dashboard';
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // If user just confirmed their email
      if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
        setStatus('success');
        setMessage("Email verified successfully! Redirecting...");
        
        // Redirect after a brief moment
        setTimeout(() => {
          navigate(redirectTo, { replace: true });
        }, 1500);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [searchParams, navigate]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email address is required");
      return;
    }

    setIsResending(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Verification email sent! Please check your inbox.");
      }
    } catch (err) {
      toast.error("Failed to resend email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

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
              {status === 'loading' || isResending ? (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : status === 'success' ? (
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
              {status === 'loading' ? 'Verifying Email...' :
               isResending ? 'Sending Email...' :
               status === 'success' && !searchParams.get('token_hash') ? 'Check Your Email' :
               status === 'success' ? 'Email Verified!' :
               'Verification Failed'}
            </h1>
            
            <p className="text-muted-foreground mb-6">
              {status === 'loading' ? 'Please wait while we verify your email address.' :
               isResending ? 'Sending verification email...' :
               status === 'success' && !searchParams.get('token_hash') 
                 ? `We've sent a verification link to ${email || 'your email'}. Click the link in the email to verify your account.`
                 : message}
            </p>

            {/* Email Display */}
            {email && status === 'success' && !searchParams.get('token_hash') && (
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
              {status === 'success' && searchParams.get('token_hash') && (
                <Button 
                  className="w-full gap-2" 
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {status === 'success' && !searchParams.get('token_hash') && email && (
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
                    'Resend Verification Email'
                  )}
                </Button>
              )}

              {status === 'error' && (
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
                        'Resend Verification Email'
                      )}
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/auth?mode=login')}
                  >
                    Back to Login
                  </Button>
                </>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or{' '}
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
              Need help?{' '}
              <a href="mailto:support@bizgrow360.com" className="text-primary hover:underline font-medium">
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
