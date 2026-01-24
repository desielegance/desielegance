"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: "bg-obsidian text-ivory hover:bg-copper hover:text-white font-medium border border-transparent",
      secondary: "bg-sand text-obsidian hover:bg-copper hover:text-white",
      outline:
        "border border-current bg-transparent hover:bg-obsidian hover:text-ivory",
      ghost: "hover:bg-obsidian/5 text-currentColor",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
      icon: "h-10 w-10",
    };

    const baseStyles =
      "inline-flex items-center justify-center rounded-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-charcoal disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider font-serif";

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    const content = (
      <>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {/* We wrap inner content in a motion.span to allow for click animations if needed, 
              but for Links, usually we just animate the container or use a motion.a if we want gestures.
              To keep it simple and consistent, we'll just style the link. 
          */}
          {content}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={combinedClassName}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
