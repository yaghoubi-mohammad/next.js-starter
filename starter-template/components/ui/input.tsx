import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { readOnly?: boolean }
>(({ className, type, readOnly, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full placeholder-shown:text-gray-400 rounded-lg border border-octa-light-200 dark:border-octa-dark-100 bg-transparent dark:bg-octa-dark-200 px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed md:text-sm",
        readOnly &&
          "dark:bg-octa-dark-100 dark:text-octa-light-300 bg-octa-light-200 cursor-not-allowed",
        className
      )}
      ref={ref}
      disabled={readOnly}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
