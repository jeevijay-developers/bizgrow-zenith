import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
  Loader2,
  IndianRupee,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react";
import { format } from "date-fns";

interface PaymentDetailsDialogProps {
  invoiceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storeId: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  payment_type: string;
  payment_status: string;
  payment_comment: string | null;
  customer_name: string;
  created_at: string;
}

interface BillPayment {
  id: string;
  amount: number;
  comment: string | null;
  created_at: string;
}

export function PaymentDetailsDialog({
  invoiceId,
  open,
  onOpenChange,
  storeId,
}: PaymentDetailsDialogProps) {
  const queryClient = useQueryClient();
  const [isRecordingPayment, setIsRecordingPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentComment, setPaymentComment] = useState("");

  // Fetch invoice details
  const { data: invoice, isLoading: invoiceLoading } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("id", invoiceId)
        .single();
      if (error) throw error;
      return data as Invoice;
    },
    enabled: open && !!invoiceId,
  });

  // Fetch payment history
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["bill_payments", invoiceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bill_payments")
        .select("*")
        .eq("invoice_id", invoiceId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as BillPayment[];
    },
    enabled: open && !!invoiceId,
  });

  // Record payment mutation
  const recordPaymentMutation = useMutation({
    mutationFn: async () => {
      if (!invoice) throw new Error("Invoice not found");
      
      const amount = parseFloat(paymentAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid amount");
      }
      
      if (amount > invoice.remaining_amount) {
        throw new Error("Amount exceeds remaining balance");
      }

      const newPaidAmount = invoice.paid_amount + amount;
      const newRemainingAmount = invoice.remaining_amount - amount;
      const newPaymentStatus = newRemainingAmount === 0 ? "completed" : "partial";

      // Insert payment record
      const { error: paymentError } = await supabase
        .from("bill_payments")
        .insert({
          invoice_id: invoiceId,
          store_id: storeId,
          amount,
          comment: paymentComment || null,
        });

      if (paymentError) throw paymentError;

      // Update invoice
      const { error: invoiceError } = await supabase
        .from("invoices")
        .update({
          paid_amount: newPaidAmount,
          remaining_amount: newRemainingAmount,
          payment_status: newPaymentStatus,
        })
        .eq("id", invoiceId);

      if (invoiceError) throw invoiceError;

      return { newPaymentStatus };
    },
    onSuccess: ({ newPaymentStatus }) => {
      queryClient.invalidateQueries({ queryKey: ["invoice", invoiceId] });
      queryClient.invalidateQueries({ queryKey: ["bill_payments", invoiceId] });
      queryClient.invalidateQueries({ queryKey: ["orders", storeId] });
      queryClient.invalidateQueries({ queryKey: ["invoices", storeId] });
      
      toast.success(
        newPaymentStatus === "completed"
          ? "Payment recorded! Bill is now fully paid."
          : "Payment recorded successfully!"
      );
      
      setPaymentAmount("");
      setPaymentComment("");
      setIsRecordingPayment(false);
    },
    onError: (error) => {
      toast.error("Failed to record payment: " + (error as Error).message);
    },
  });

  const isLoading = invoiceLoading || paymentsLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            {invoice && `Invoice ${invoice.invoice_number} - ${invoice.customer_name}`}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : invoice ? (
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6">
              {/* Payment Summary */}
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Payment Status</span>
                    <Badge
                      variant={
                        invoice.payment_status === "completed"
                          ? "default"
                          : invoice.payment_status === "partial"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        invoice.payment_status === "completed"
                          ? "bg-green-500 hover:bg-green-600"
                          : invoice.payment_status === "partial"
                          ? "bg-amber-500 hover:bg-amber-600"
                          : ""
                      }
                    >
                      {invoice.payment_status === "completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {invoice.payment_status === "partial" && <Clock className="w-3 h-3 mr-1" />}
                      {invoice.payment_status.charAt(0).toUpperCase() + invoice.payment_status.slice(1)}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                      <p className="text-lg font-semibold">₹{invoice.total_amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Paid Amount</p>
                      <p className="text-lg font-semibold text-green-600">
                        ₹{invoice.paid_amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                      <p className="text-lg font-semibold text-red-600">
                        ₹{invoice.remaining_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {invoice.payment_comment && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Initial Comment
                        </p>
                        <p className="text-sm">{invoice.payment_comment}</p>
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* Payment History */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Payment History ({payments.length})
                </h3>
                <div className="space-y-2">
                  {payments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No payments recorded yet
                    </p>
                  ) : (
                    payments.map((payment, index) => (
                      <Card key={payment.id} className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Payment {payments.length - index}
                              </Badge>
                              <span className="text-sm font-semibold text-green-600">
                                ₹{payment.amount.toFixed(2)}
                              </span>
                            </div>
                            {payment.comment && (
                              <p className="text-xs text-muted-foreground">{payment.comment}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(payment.created_at), "dd MMM yyyy")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(payment.created_at), "hh:mm a")}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>

              {/* Record New Payment */}
              {invoice.payment_status === "partial" && (
                <div>
                  {!isRecordingPayment ? (
                    <Button
                      onClick={() => setIsRecordingPayment(true)}
                      className="w-full gap-2"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                      Record Payment
                    </Button>
                  ) : (
                    <Card className="p-4 bg-primary/5 border-primary/20">
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        Record New Payment
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Amount</Label>
                          <Input
                            type="number"
                            placeholder="Enter payment amount"
                            value={paymentAmount}
                            onChange={(e) => {
                              const value = e.target.value;
                              const numValue = parseFloat(value) || 0;
                              if (numValue <= invoice.remaining_amount) {
                                setPaymentAmount(value);
                              } else {
                                toast.error("Amount cannot exceed remaining balance");
                              }
                            }}
                            min="0"
                            max={invoice.remaining_amount}
                            step="0.01"
                          />
                          <p className="text-xs text-muted-foreground">
                            Maximum: ₹{invoice.remaining_amount.toFixed(2)}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label>Comment (Optional)</Label>
                          <Textarea
                            placeholder="Add a note about this payment"
                            value={paymentComment}
                            onChange={(e) => setPaymentComment(e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => recordPaymentMutation.mutate()}
                            disabled={recordPaymentMutation.isPending || !paymentAmount}
                            className="flex-1"
                          >
                            {recordPaymentMutation.isPending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              "Submit Payment"
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsRecordingPayment(false);
                              setPaymentAmount("");
                              setPaymentComment("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Invoice not found
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
