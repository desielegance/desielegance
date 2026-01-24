import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-16 md:py-24 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto px-5 md:px-8",
          fullWidth ? "w-full max-w-none p-0" : "max-w-7xl"
        )}
      >
        {children}
      </div>
    </section>
  );
}
