import { useEffect } from "react";

export interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function Toast({ open, message, onClose }: ToastProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const timer = setTimeout(() => onClose(), 2500);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) {
    return null;
  }
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 max-w-xs z-50"
      role="alert"
      aria-live="polite"
    >
      <div className="bg-card border border-border text-text rounded-lg px-4 py-3 shadow-lg">
        {message}
      </div>
      <button
        onClick={onClose}
        className="mt-2 text-xs text-muted hover:text-text"
        aria-label="بستن پیام"
      >
        بستن
      </button>
    </div>
  );
}
