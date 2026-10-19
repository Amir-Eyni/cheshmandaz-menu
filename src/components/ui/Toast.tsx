import { useEffect, useRef } from "react";
import { fa } from "@/content/fa";

export interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function Toast({ open, message, onClose }: ToastProps) {
  // Keep the latest callback in a ref so the auto-hide timer is not reset
  // every time the parent re-renders with a new inline function.
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const timer = setTimeout(() => closeRef.current(), 2500);
    return () => clearTimeout(timer);
  }, [open]);

  if (!open) {
    return null;
  }
  return (
    <div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 max-w-xs z-50"
      role="status"
      aria-live="polite"
    >
      <div className="bg-card border border-border text-text rounded-lg px-4 py-3 shadow-lg">
        {message}
      </div>
      <button
        onClick={() => closeRef.current()}
        className="mt-2 text-xs text-muted hover:text-text"
        aria-label={fa.toast.closeLabel}
      >
        {fa.toast.close}
      </button>
    </div>
  );
}
