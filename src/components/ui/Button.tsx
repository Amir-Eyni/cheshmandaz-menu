import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "glass" | "accent";
  size?: "sm" | "md" | "icon";
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: ButtonProps) {
  // The shape lives in the variant, not in the base, so a variant can pick
  // its own radius (rounded-lg vs rounded-full) without a utility conflict.
  const base =
    "inline-flex items-center justify-center font-medium transition-colors tap-target focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  const variants = {
    primary:
      "rounded-lg bg-accent text-on-accent hover:opacity-90 disabled:opacity-50 disabled:pointer-events-none",
    outline:
      "rounded-lg border border-border text-text hover:bg-card disabled:opacity-50 disabled:pointer-events-none",
    ghost:
      "rounded-lg text-text hover:bg-card disabled:opacity-50 disabled:pointer-events-none",
    // Frosted glass: translucent card colour, hairline border, blurred backdrop
    // and a thin accent edge that reads as a light reflection. Built only from
    // theme tokens, so it follows the palette in src/config/site.ts.
    glass:
      "rounded-lg bg-card/55 border border-border/70 ring-1 ring-inset ring-accent/15 backdrop-blur-sm text-text hover:bg-card/75 disabled:opacity-50 disabled:pointer-events-none",
    // Soft accent: a circular chip with a faint accent fill and a brighter
    // accent edge, used for the "add" action next to a plain ghost button.
    accent:
      "rounded-full bg-accent/10 text-accent ring-1 ring-inset ring-accent/40 hover:bg-accent/20 disabled:opacity-50 disabled:pointer-events-none",
  };
  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    // Square icon button, 40x40, with a larger glyph.
    icon: "w-10 h-10 p-0 text-base",
  };
  return (
    <button
      className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
