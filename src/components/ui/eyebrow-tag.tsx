import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface EyebrowTagProps extends ComponentPropsWithoutRef<"div"> {
  icon?: LucideIcon;
  /** "positive" tints the icon sage — use for success/growth/trust eyebrows. */
  tone?: "neutral" | "positive";
}

/**
 * The single eyebrow-tag pattern used above every section heading site-wide:
 * a hairline outline, no fill, one consistent icon weight. Pass `className`
 * to adapt colors for a dark (ink) background — e.g.
 * "border-ledger-paper/25 text-ledger-paper/85".
 */
export const EyebrowTag = ({ icon: Icon, tone = "neutral", className, children, ...props }: EyebrowTagProps) => (
  <div
    className={cn(
      "inline-flex items-center gap-2 border border-ledger-rule rounded-full px-4 py-2 text-sm font-grotesk font-medium text-ledger-ink/75",
      className,
    )}
    {...props}
  >
    {Icon && (
      <Icon className={cn("w-4 h-4", tone === "positive" ? "text-ledger-sage" : "text-ledger-ink/60")} strokeWidth={1.75} />
    )}
    {children}
  </div>
);
