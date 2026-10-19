"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Toast, type ToastTone } from "@/components/ui/Toast";

export interface ToastApi {
  /**
   * Shows a notification, replacing the one currently on screen.
   * The parameter names are prefixed with `_` because the plain ESLint
   * no-unused-vars rule cannot read TypeScript type signatures.
   */
  show(_message: string, _tone?: ToastTone): void;
  /** Hides the current notification. */
  hide(): void;
}

const ToastContext = createContext<ToastApi | null>(null);

/**
 * Gives access to the app-wide notification. Any component below the
 * provider can raise a toast without owning its own state.
 */
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return api;
}

type ToastState = { id: number; open: boolean; message: string; tone: ToastTone };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    id: 0,
    open: false,
    message: "",
    tone: "success",
  });

  const show = useCallback((message: string, tone: ToastTone = "success") => {
    // The id changes on every call, so the toast is remounted and its
    // auto-hide timer restarts even when the same message is shown twice.
    setToast((prev) => ({ id: prev.id + 1, open: true, message, tone }));
  }, []);

  const hide = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const api = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Toast
        key={toast.id}
        open={toast.open}
        message={toast.message}
        tone={toast.tone}
        onClose={hide}
      />
    </ToastContext.Provider>
  );
}
