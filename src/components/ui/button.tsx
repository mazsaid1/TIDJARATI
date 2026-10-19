import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium tracking-tight outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-[image:var(--gradient-brand)] text-white shadow-[0_10px_30px_-12px_rgba(124,58,237,0.75)] hover:shadow-[0_16px_38px_-12px_rgba(124,58,237,0.9)] hover:-translate-y-0.5",
        secondary:
          "bg-primary-soft text-primary hover:bg-primary/15 dark:hover:bg-primary/25",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:border-primary/50 hover:bg-primary-soft",
        ghost: "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground",
        danger: "bg-danger text-white hover:brightness-110 shadow-[0_10px_28px_-14px_rgba(239,68,68,0.9)]",
        success: "bg-success text-white hover:brightness-110",
        glass: "glass text-foreground hover:border-primary/40 hover:shadow-glow",
      },
      size: {
        sm: "h-8 rounded-lg px-3 text-[13px]",
        md: "h-10 px-4 text-sm",
        lg: "h-12 rounded-2xl px-6 text-[15px]",
        xl: "h-14 rounded-2xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  ),
);
Button.displayName = "Button";

export { buttonVariants };
