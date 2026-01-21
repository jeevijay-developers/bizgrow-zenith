import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rippleButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        "outline-light": "border border-white/30 bg-transparent text-white hover:bg-white/10 active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
        glow: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-primary active:scale-[0.98]",
        "glow-accent": "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-glow-accent active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface RippleStyle {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof rippleButtonVariants> {
  asChild?: boolean;
  ripple?: boolean;
}

const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, variant, size, asChild = false, ripple = true, onClick, children, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<RippleStyle[]>([]);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && buttonRef.current) {
        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const newRipple: RippleStyle = {
          left: x,
          top: y,
          width: size,
          height: size,
        };

        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.slice(1));
        }, 600);
      }

      onClick?.(event);
    };

    if (asChild) {
      return <Slot className={cn(rippleButtonVariants({ variant, size, className }))} {...props}>{children}</Slot>;
    }

    return (
      <button
        className={cn(rippleButtonVariants({ variant, size, className }))}
        ref={buttonRef}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripple &&
          ripples.map((ripple, index) => (
            <span
              key={index}
              className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
              style={{
                left: ripple.left,
                top: ripple.top,
                width: ripple.width,
                height: ripple.height,
              }}
            />
          ))}
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";

export { RippleButton, rippleButtonVariants };
