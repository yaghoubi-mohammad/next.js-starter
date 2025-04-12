import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "w-full text-sm px-3 py-2 dark:bg-octa-base-100 bg-octa-base-100 hover:bg-octa-base-100/70 dark:hover:bg-octa-base-100/70 text-bold rounded-full transition-all text-white dark:text-white",
        destructive:
          "w-full text-sm px-3 py-2 dark:bg-octa-base-100/10 bg-octa-base-100/10 text-bold rounded-full transition-all dark:text-white",
        outline:
          "w-full text-sm px-3 py-2 dark:bg-octa-base-100/10 bg-octa-base-100/10 dark:hover:bg-octa-base-100/20 hover:bg-octa-base-100/20 text-bold rounded-full transition-all text-octa-base-1 dark:text-octa-base-1 border border-octa-base-1",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-octa-base-1 text-center w-full",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
