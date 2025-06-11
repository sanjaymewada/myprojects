import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/components/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-neutral-900 to-neutral-800 text-neutral-50 shadow-lg hover:shadow-xl hover:from-neutral-800 hover:to-neutral-900 dark:from-neutral-50 dark:to-neutral-200 dark:text-neutral-900 dark:hover:from-neutral-200 dark:hover:to-neutral-50",
        destructive:
          "bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl hover:from-red-500 hover:to-red-600 dark:from-red-800 dark:to-red-700",
        outline:
          "border-2 border-neutral-200 bg-white/50 backdrop-blur-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950/50 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-gradient-to-br from-neutral-200 to-neutral-100 text-neutral-900 shadow-md hover:shadow-lg hover:from-neutral-100 hover:to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 dark:text-neutral-50",
        ghost:
          "hover:bg-neutral-100/80 hover:text-neutral-900 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-50 backdrop-blur-sm",
        link:
          "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50 hover:text-neutral-600 dark:hover:text-neutral-400",
        premium:
          "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // Warn in dev if a button is nested inside this one
    if (
      process.env.NODE_ENV !== "production" &&
      !asChild &&
      React.Children.toArray(props.children).some(
        (child: any) =>
          React.isValidElement(child) && child.type === "button"
      )
    ) {
      console.warn(
        "⚠️ Do not nest a <button> inside another <button>. This will cause hydration errors."
      )
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98] motion-safe:transition"
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
