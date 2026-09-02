import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { H1, H3, Lead, Body, Caption } from "@/components/ui/typography";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 relative overflow-hidden bg-ledger-ink">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <H1 className="text-ledger-paper mb-4">
            Get in Touch
          </H1>
          <Lead className="text-ledger-paper/70 max-w-2xl mx-auto">
            Have questions about BizGrow 360? Want a custom enterprise plan? We'd love to hear from you.
          </Lead>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <H3 className="mb-2">Contact Information</H3>
                <Body>
                  Reach out to us through any channel. Our team responds within 24 hours.
                </Body>
              </div>

              <div className="space-y-5">
                <a href="tel:+919876543210" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl border border-ledger-rule bg-transparent flex items-center justify-center flex-shrink-0 group-hover:border-ledger-marigold/60 transition-colors">
                    <Phone className="w-5 h-5 text-ledger-ink/70" />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-ledger-ink">Phone</p>
                    <Caption>+91 98765 43210</Caption>
                  </div>
                </a>
                <a href="mailto:hello@bizgrow360.com" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-xl border border-ledger-rule bg-transparent flex items-center justify-center flex-shrink-0 group-hover:border-ledger-marigold/60 transition-colors">
                    <Mail className="w-5 h-5 text-ledger-ink/70" />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-ledger-ink">Email</p>
                    <Caption>hello@bizgrow360.com</Caption>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl border border-ledger-rule bg-transparent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-ledger-ink/70" />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-ledger-ink">Office</p>
                    <Caption>Bangalore, Karnataka, India</Caption>
                  </div>
                </div>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-ledger-ink">WhatsApp</p>
                    <Caption>Chat with our team</Caption>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white border border-ledger-rule shadow-ledger-sm rounded-2xl p-6 sm:p-8 space-y-5">
                <H3 className="mb-2">Send us a message</H3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your needs..." rows={5} required />
                </div>
                <Button type="submit" size="lg" variant="ledger" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
