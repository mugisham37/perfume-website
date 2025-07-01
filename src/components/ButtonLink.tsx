import clsx from "clsx";
import {
  TransitionLink,
  TransitionLinkProps,
} from "./TransitionLink";

export type ButtonLinkProps = TransitionLinkProps & {
  variant?: "Primary" | "Secondary" | "Ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
};

export const ButtonLink = ({ 
  className,
  variant = "Primary",
  size = "md",
  isLoading = false,
  disabled = false,
  children,
  onClick,
  ...restProps 
}: ButtonLinkProps) => {
    const sizeClasses = {
      sm: "px-8 py-2 text-sm",
      md: "px-12 py-4 text-base",
      lg: "px-16 py-5 text-lg"
    };

    const variantClasses = {
      Primary: "bg-white text-black hover:bg-white/80 focus:bg-white/90",
      Secondary: "border border-white text-white hover:bg-white/20 focus:bg-white/30",
      Ghost: "text-white hover:bg-white/10 focus:bg-white/20"
    };

    const handleClick = () => {
      if (disabled || isLoading) {
        return;
      }
      onClick?.();
    };

    return (
      <TransitionLink
        className={clsx(
          // Base styles
          "inline-flex items-center justify-center text-center font-extrabold tracking-wider uppercase transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black",
          // Size variants
          sizeClasses[size],
          // Color variants
          variantClasses[variant],
          // States
          (disabled || isLoading) && "opacity-50 cursor-not-allowed",
          isLoading && "pointer-events-none",
          className,
        )}
        onClick={handleClick}
        aria-disabled={disabled || isLoading}
        {...restProps}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </TransitionLink>
    );
};

ButtonLink.displayName = "ButtonLink";
