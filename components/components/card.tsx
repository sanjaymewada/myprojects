'use client';

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../lib/utils";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    }
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  gradient?: boolean;
  hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, gradient, hoverEffect = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={hoverEffect ? "hover" : undefined}
        variants={cardVariants}
        className={cn(
          "rounded-xl border border-border/40 bg-card p-6 shadow-lg transition-colors",
          "backdrop-blur-[2px] dark:shadow-2xl dark:shadow-gray-950/50",
          gradient && "bg-gradient-to-b from-muted/50 to-muted dark:from-muted/20 dark:to-muted/40",
          "hover:border-border/80 dark:hover:border-border/60",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends HTMLMotionProps<"h3"> {
  gradient?: boolean;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, gradient, ...props }, ref) => (
    <motion.h3
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={cn(
        "text-2xl font-semibold tracking-tight",
        gradient && "bg-gradient-to-br from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/60 bg-clip-text text-transparent",
        "hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 hover:bg-clip-text hover:text-transparent transition-all duration-300",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, HTMLMotionProps<"p">>(
  ({ className, ...props }, ref) => (
    <motion.p
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className={cn(
        "text-sm text-muted-foreground line-clamp-3",
        "leading-relaxed tracking-wide",
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={cn(
        "text-pretty font-sans text-sm text-muted-foreground",
        "leading-relaxed [&:not(:first-child)]:pt-4",
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className={cn(
        "flex items-center pt-4 mt-auto",
        "border-t border-border/50",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}; 