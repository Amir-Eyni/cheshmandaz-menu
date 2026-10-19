export interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function Toast({ open, message, onClose }: ToastProps) {
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
