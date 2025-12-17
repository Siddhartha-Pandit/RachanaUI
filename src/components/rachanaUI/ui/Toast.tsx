import * as React from "react";
import { createPortal } from "react-dom";
import "../css/Toast.css";

/* ---------------------------------------------------------------------------
   TYPES
--------------------------------------------------------------------------- */
type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "neutral"
  | "loading";

type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

type ToastAction = {
  label: React.ReactNode;
  onClick: () => void;
};

type ToastItem = {
  id: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant: ToastVariant;
  duration: number | null;
  action?: ToastAction;
};

/* ---------------------------------------------------------------------------
   INTERNAL STORE (SONNER-LIKE)
--------------------------------------------------------------------------- */
let pushToast:
  | ((toast: Omit<ToastItem, "id">) => void)
  | null = null;

/* ---------------------------------------------------------------------------
   TOASTER
--------------------------------------------------------------------------- */
type ToasterProps = {
  position?: ToastPosition;
  max?: number;
};

export function Toaster({
  position = "top-right",
  max = 3
}: ToasterProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const push = React.useCallback(
    (toast: Omit<ToastItem, "id">) => {
      setToasts((prev) => {
        const next = [...prev, { ...toast, id: Date.now() }];
        return next.slice(-max);
      });
    },
    [max]
  );

  const dismiss = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* REGISTER GLOBAL DISPATCHER */
  React.useEffect(() => {
    pushToast = push;
    return () => {
      pushToast = null;
    };
  }, [push]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={`toaster ${position}`}>
      {toasts.map((toast) => (
        <ToastView key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>,
    document.body
  );
}

/* ---------------------------------------------------------------------------
   TOAST VIEW
--------------------------------------------------------------------------- */
function ToastView({
  toast,
  onDismiss
}: {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(true);

    if (toast.duration !== null) {
      const timer = setTimeout(() => {
        setOpen(false);
        setTimeout(() => onDismiss(toast.id), 240);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  return (
    <div
      className={`toast ${toast.variant}`}
      data-state={open ? "open" : "closed"}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon" aria-hidden>
        ●
      </div>

      <div className="toast-content">
        {toast.title && <div className="toast-title">{toast.title}</div>}
        {toast.description && (
          <div className="toast-description">{toast.description}</div>
        )}
      </div>

      <div className="toast-actions">
        {toast.action && (
          <button
            className="toast-action"
            onClick={() => {
              toast.action?.onClick();
              onDismiss(toast.id);
            }}
          >
            {toast.action.label}
          </button>
        )}
        <button
          className="toast-close"
          aria-label="Close"
          onClick={() => onDismiss(toast.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   IMPERATIVE API (SONNER-LIKE)
--------------------------------------------------------------------------- */
function emitToast(
  variant: ToastVariant,
  title: React.ReactNode,
  options?: Partial<Omit<ToastItem, "id" | "variant" | "title">>
) {
 if (!pushToast) {
  if (typeof window !== "undefined") {
    console.warn(
      "[Toast] <Toaster /> is not mounted. Toast will not be shown."
    );
  }
  return;
}


  pushToast({
    variant,
    title,
    description: options?.description,
    action: options?.action,
    duration: options?.duration ?? 4500
  });
}

/* ---------------------------------------------------------------------------
   EXPORT: toast
--------------------------------------------------------------------------- */
export const toast = {
  success: (title: React.ReactNode, opts?: any) =>
    emitToast("success", title, { ...opts, duration: opts?.duration ?? 3000 }),

  error: (title: React.ReactNode, opts?: any) =>
    emitToast("error", title, { ...opts, duration: opts?.duration ?? 8000 }),

  warning: (title: React.ReactNode, opts?: any) =>
    emitToast("warning", title, opts),

  info: (title: React.ReactNode, opts?: any) =>
    emitToast("info", title, opts),

  message: (title: React.ReactNode, opts?: any) =>
    emitToast("neutral", title, opts),

  dismiss: () => {
    /* optional: add global dismiss later */
  }
};
