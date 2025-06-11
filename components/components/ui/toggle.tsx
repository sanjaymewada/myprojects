"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/components/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: "bg-white hover:bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 data-[state=on]:bg-neutral-100 dark:data-[state=on]:bg-neutral-800",
        soft: "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 data-[state=on]:bg-blue-100 dark:data-[state=on]:bg-blue-900",
        outline: "border-2 border-neutral-200 bg-transparent hover:border-neutral-300 hover:bg-neutral-100/50 dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/50 data-[state=on]:border-blue-500 data-[state=on]:bg-blue-100/50 dark:data-[state=on]:border-blue-400 dark:data-[state=on]:bg-blue-900/50",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900 dark:data-[state=on]:bg-neutral-800 dark:data-[state=on]:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50 data-[state=on]:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
        icon: "h-10 w-10",
      },
      glow: {
        true: "shadow-lg shadow-blue-500/25 dark:shadow-blue-500/15",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: false,
    },
  }
)

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  animated?: boolean;
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, glow, animated = false, ...props }, ref) => {
  const baseClassName = cn(toggleVariants({ variant, size, glow, className }))

  if (animated) {
    return (
      <TogglePrimitive.Root
        ref={ref}
        {...props}
        asChild
      >
        <motion.button
          className={baseClassName}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        />
      </TogglePrimitive.Root>
    )
  }

  return (
    <TogglePrimitive.Root
      ref={ref}
      className={baseClassName}
      {...props}
    />
  )
})

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
export type { ToggleProps }
