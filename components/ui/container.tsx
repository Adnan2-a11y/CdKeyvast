import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Container({ children, className, size = "lg" }: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-6xl", // 1024px
    md: "max-w-7xl", // 1280px
    lg: "max-w-7xl", // 1280px (same as current 1200px approx)
    xl: "max-w-8xl", // 1536px
  };

  return (
    <div className={cn(
      "w-full mx-auto px-4 sm:px-6 lg:px-8",
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  );
}
