import { ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";

export type BoundedProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  noPadding?: boolean;
};

export const Bounded = forwardRef<HTMLElement, BoundedProps>(
  ({ 
    as: Comp = "section", 
    className, 
    children, 
    size = "lg",
    noPadding = false,
    ...restProps 
  }, ref) => {
    const sizeClasses = {
      sm: "max-w-3xl",
      md: "max-w-4xl", 
      lg: "max-w-6xl",
      xl: "max-w-7xl"
    };

    return (
      <Comp
        ref={ref}
        className={clsx(
          // Base responsive padding
          !noPadding && "px-4 sm:px-6 lg:px-8",
          // Header spacing - accounts for fixed header
          "[.header+&]:pt-44 [.header+&]:md:pt-32",
          className,
        )}
        {...restProps}
      >
        <div className={clsx(
          "mx-auto w-full",
          sizeClasses[size]
        )}>
          {children}
        </div>
      </Comp>
    );
  },
);

Bounded.displayName = "Bounded";
