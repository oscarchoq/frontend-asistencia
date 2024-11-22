import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        male: "border-transparent bg-blue-600 text-primary-foreground shadow hover:bg-blue-600/80",
        female:
          "border-transparent bg-pink-600 text-primary-foreground shadow hover:bg-female/80",
        activo:
          "border-transparent bg-green-100 text-green-700 shadow hover:bg-green-100/80 dark:text-green-900 dark:bg-green-400",
        desactivo:
          "border-transparent bg-red-100 text-red-700 shadow hover:bg-red-100/80 dark:text-red-900 dark:bg-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
