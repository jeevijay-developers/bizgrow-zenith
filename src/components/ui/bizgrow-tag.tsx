import React, { forwardRef, type ComponentType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BizgrowTagProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ComponentType<{ className?: string }> | ReactNode;
  children: ReactNode;
  className?: string;
  iconClassName?: string;
  asChild?: boolean;
}

/**
 * Refined Sitewide Tag / Eyebrow Badge component for BizGrow 360.
 *
 * Specifications:
 * - 10px rounded rectangle (deliberately not a full 999px pill)
 * - Solid #FFFFFF background with 1px rgba(59,10,68,0.14) plum hairline border
 * - 8px 14px padding with 13px font-weight 600 in #3B0A44 ink
 * - Plain inline #7A2B87 plum icon (no circular chip background)
 * - Hover / Focus-visible: -2px lift, #A88900 gold border, gold shadow glow, icon color shift & scale(1.08)
 */
export const BizgrowTag = forwardRef<HTMLDivElement, BizgrowTagProps>(
  ({ icon: Icon, children, className, iconClassName, ...props }, ref) => {
    // Helper to render icon component or node
    const renderIcon = () => {
      if (!Icon) return null;
      if (typeof Icon === "function" || (typeof Icon === "object" && "render" in (Icon as any))) {
        const IconComponent = Icon as ComponentType<{ className?: string }>;
        return <IconComponent className={cn("tag-icon w-3.5 h-3.5 shrink-0 text-[#7A2B87] transition-all duration-[220ms] ease-out group-hover:text-[#A88900] group-hover:scale-[1.08]", iconClassName)} />;
      }
      return <span className={cn("tag-icon inline-flex text-[#7A2B87] transition-all duration-[220ms] ease-out group-hover:text-[#A88900] group-hover:scale-[1.08]", iconClassName)}>{Icon as ReactNode}</span>;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "group inline-flex items-center gap-2 bg-white border border-[#3B0A44]/[0.14] rounded-[10px] px-[14px] py-[8px] text-[13px] font-semibold tracking-[0.01em] text-[#3B0A44] shadow-[0_1px_2px_rgba(59,10,68,0.05)] cursor-default select-none",
          "transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]",
          "hover:-translate-y-[2px] hover:border-[#A88900] hover:shadow-[0_6px_16px_rgba(168,137,0,0.16),0_2px_4px_rgba(59,10,68,0.06)]",
          "focus-visible:outline-none focus-visible:-translate-y-[2px] focus-visible:border-[#A88900] focus-visible:shadow-[0_6px_16px_rgba(168,137,0,0.16),0_2px_4px_rgba(59,10,68,0.06)]",
          className
        )}
        {...props}
      >
        {renderIcon()}
        <span>{children}</span>
      </div>
    );
  }
);

BizgrowTag.displayName = "BizgrowTag";

export const Tag = BizgrowTag;
export default BizgrowTag;
