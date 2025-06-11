"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { motion } from "framer-motion"
import { cn } from "@/components/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    animated?: boolean;
    gradient?: boolean;
  }
>(
  (
    { 
      className, 
      orientation = "horizontal", 
      decorative = true, 
      animated = false,
      gradient = false,
      ...props 
    },
    ref
  ) => {
    const baseStyles = cn(
      orientation === "horizontal" ? "h-[2px] w-full" : "h-full w-[2px]",
      gradient 
        ? "bg-gradient-to-r from-transparent via-blue-500/50 to-transparent dark:from-transparent dark:via-blue-400/50 dark:to-transparent"
        : "bg-neutral-200 dark:bg-neutral-800",
      "shrink-0",
      className
    )

    if (animated) {
      return (
        <SeparatorPrimitive.Root
          ref={ref}
          decorative={decorative}
          orientation={orientation}
          asChild
          {...props}
        >
          <motion.div
            className={baseStyles}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          />
        </SeparatorPrimitive.Root>
      )
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={baseStyles}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
