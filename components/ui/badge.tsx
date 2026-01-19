import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-primary-foreground shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300",
        secondary:
          "border-transparent bg-gradient-to-r from-gray-100 to-gray-50 text-secondary-foreground hover:from-gray-200 hover:to-gray-100 transition-all duration-300",
        destructive:
          "border-transparent bg-gradient-to-r from-rose-600 to-pink-600 text-destructive-foreground shadow hover:from-rose-700 hover:to-pink-700 transition-all duration-300",
        outline:
          "text-foreground border-2 border-gray-300 hover:border-indigo-400 hover:text-indigo-600 bg-transparent transition-all duration-300",
        success:
          "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow hover:from-emerald-600 hover:to-teal-600 transition-all duration-300",
        warning:
          "border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow hover:from-amber-600 hover:to-orange-600 transition-all duration-300",
        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-gray-100 transition-colors",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-2 text-sm",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, animation, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant, size, animation }), className)} 
      {...props} 
    />
  )
}

export { Badge, badgeVariants }