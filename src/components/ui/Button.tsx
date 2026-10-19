import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
}

export function Button({
  children,
  className = "",
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors tap-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  const variants = {
    primary: "bg-accent text-on-accent hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none",
    outline: "border border-border text-text hover:bg-card disabled:opacity-50 disabled:pointer-events-none",
    ghost: "text-text hover:bg-card disabled:opacity-50 disabled:pointer-events-none",
  };
  return (
    <button
      className={[base, variants[variant], className].filter(Boolean).join(" ")}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
