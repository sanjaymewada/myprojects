import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/components/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none cursor-default",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-primary/90 to-primary text-primary-foreground hover:from-primary hover:to-primary/90 shadow-sm hover:shadow-md",
        secondary:
          "border-transparent bg-gradient-to-r from-secondary/90 to-secondary text-secondary-foreground hover:from-secondary hover:to-secondary/90 shadow-sm hover:shadow-md",
        destructive:
          "border-transparent bg-gradient-to-r from-destructive/90 to-destructive text-destructive-foreground hover:from-destructive hover:to-destructive/90 shadow-sm hover:shadow-md",
        outline: "text-foreground border-2 hover:bg-accent hover:text-accent-foreground",
        success: "border-transparent bg-gradient-to-r from-green-500/90 to-green-600 text-white hover:from-green-600 hover:to-green-500/90 shadow-sm hover:shadow-md",
        warning: "border-transparent bg-gradient-to-r from-yellow-500/90 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-500/90 shadow-sm hover:shadow-md",
        info: "border-transparent bg-gradient-to-r from-blue-500/90 to-blue-600 text-white hover:from-blue-600 hover:to-blue-500/90 shadow-sm hover:shadow-md",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.25 text-[0.625rem]",
        lg: "px-3 py-0.75 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends Omit<HTMLMotionProps<"div">, keyof VariantProps<typeof badgeVariants>>,
    VariantProps<typeof badgeVariants> {
  animated?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, animated = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...(animated && {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 }
        })}
        {...(props as HTMLMotionProps<"div">)}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
