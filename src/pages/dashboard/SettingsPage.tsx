import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, Lock, Shield, Palette, Globe, Trash2, 
  Save, Loader2, Eye, EyeOff, Moon, Sun, Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  whatsapp: string | null;
  avatar_url: string | null;
}

const SettingsPage = () => {
  const { user, signOut } = useAuth();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [twoFactor, setTwoFactor] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChanging, setPasswordChanging] = useState(false);

  // Fetch profile from database
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user?.id,
  });

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setPhone(profile.phone || "");
      setWhatsapp(profile.whatsapp || "");
    }
  }, [profile]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("Not logged in");
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone: phone,
          whatsapp: whatsapp || null,
        })
        .eq("user_id", user.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast.success("Settings saved successfully!");
    },
    onError: (error) => {
      toast.error("Failed to save: " + error.message);
    },
  });

  const handleSave = () => {
    updateProfileMutation.mutate();
  };

  // Password change handler
  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setPasswordChanging(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to update password: " + (error as Error).message);
    } finally {
      setPasswordChanging(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={updateProfileMutation.isPending} 
          className="gap-2"
        >
          {updateProfileMutation.isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4" /> Save Changes</>
          )}
        </Button>
      </div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile
        </h3>
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {fullName?.slice(0, 2).toUpperCase() || user?.email?.slice(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">Change Avatar</Button>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG or GIF. Max 2MB.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input 
              placeholder="Your name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={user?.email || ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input 
              placeholder="+91 98765 43210" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>WhatsApp Number</Label>
            <Input 
              placeholder="+91 98765 43210" 
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Security
        </h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You are logged in as: <span className="font-medium">{user?.email}</span>
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <div className="relative">
                <Input 
                  type={showNewPassword ? "text" : "password"} 
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handlePasswordChange}
            disabled={passwordChanging || !newPassword || !confirmPassword}
            className="gap-2"
          >
            {passwordChanging ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Theme</p>
              <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={theme === "light" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTheme("light")}
              >
                <Sun className="w-4 h-4 mr-2" />
                Light
              </Button>
              <Button 
                variant={theme === "dark" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTheme("dark")}
              >
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </Button>
              <Button 
                variant={theme === "system" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTheme("system")}
              >
                <Monitor className="w-4 h-4 mr-2" />
                System
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Language</p>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="mr">मराठी</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl border border-destructive/30 p-6"
      >
        <h3 className="font-semibold mb-4 text-destructive flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
