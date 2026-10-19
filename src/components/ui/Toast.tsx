"use client";

import { useEffect, useRef } from "react";
import { fa } from "@/content/fa";

export type ToastTone = "success" | "error" | "info";

export interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  /** How long the toast stays on screen, in milliseconds. */
  duration?: number;
  tone?: ToastTone;
}

const TONE_PATH: Record<ToastTone, string> = {
  success: "M20 6L9 17l-5-5",
  error: "M18 6L6 18M6 6l12 12",
  info: "M12 16v-5M12 8h.01",
};

function ToneIcon({ tone }: { tone: ToastTone }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" opacity="0.35" />
      <path d={TONE_PATH[tone]} />
    </svg>
  );
}

export function Toast({
  open,
  message,
  onClose,
  duration = 2500,
  tone = "success",
}: ToastProps) {
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
    const timer = setTimeout(() => closeRef.current(), duration);
    return () => clearTimeout(timer);
  }, [open, duration]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto w-full max-w-xs rounded-2xl border border-accent/30 bg-card/80 backdrop-blur-md shadow-2xl px-6 py-5 text-center animate-toast-in">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-inset ring-accent/40">
          <ToneIcon tone={tone} />
        </div>
        <p className="text-text text-base font-bold leading-relaxed">{message}</p>
        <button
          onClick={() => closeRef.current()}
          className="mt-3 text-xs text-muted hover:text-text"
          aria-label={fa.toast.closeLabel}
        >
          {fa.toast.close}
        </button>
      </div>
    </div>
  );
}
