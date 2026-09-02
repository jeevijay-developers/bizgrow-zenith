import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Single source of truth for the "ledger, made modern" type scale — the
 * serif/grotesk pairing and sizes established on the homepage. Every
 * marketing page should compose headings and body copy from these instead
 * of re-declaring font sizes/weights inline, so the whole site scales and
 * drifts together. Pass `className` to override color (e.g. text-ledger-paper
 * on a dark section) or spacing (e.g. mb-6) — later classes win.
 */

export const H1 = ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
  <h1
    className={cn(
      "font-ledger text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-ledger-ink leading-[1.05] tracking-tight",
      className,
    )}
    {...props}
  />
);

export const H2 = ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
  <h2
    className={cn(
      "font-ledger text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-ledger-ink",
      className,
    )}
    {...props}
  />
);

export const H3 = ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
  <h3
    className={cn("font-ledger text-xl sm:text-2xl font-semibold text-ledger-ink", className)}
    {...props}
  />
);

export const Lead = ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
  <p
    className={cn("font-grotesk text-lg md:text-xl text-ledger-ink/65 leading-relaxed", className)}
    {...props}
  />
);

export const Body = ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
  <p className={cn("font-grotesk text-base text-ledger-ink/70 leading-relaxed", className)} {...props} />
);

export const Caption = ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
  <p className={cn("font-grotesk text-sm text-ledger-ink/55", className)} {...props} />
);
