import * as React from "react";
import { createPortal } from "react-dom";
import { useDevice } from "../hook/useDevice";
import "../css/Drawer.css";

/* ---------------------------------------------------------------------------
   CONTEXT
--------------------------------------------------------------------------- */
type DrawerContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) {
    throw new Error("Drawer components must be used inside <Drawer />");
  }
  return ctx;
}

/* ---------------------------------------------------------------------------
   ROOT
--------------------------------------------------------------------------- */
type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

export function Drawer({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children
}: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] =
    React.useState<boolean>(defaultOpen);

  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange]
  );

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

/* ---------------------------------------------------------------------------
   TRIGGER
   NOTE: children must accept HTML attributes (onClick, aria-expanded, etc.)
--------------------------------------------------------------------------- */
type DrawerTriggerProps = {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
};

export function DrawerTrigger({ children }: DrawerTriggerProps) {
  const { open, setOpen } = useDrawerContext();

  // Preserve existing onClick on the child and then toggle drawer.
  return React.cloneElement(children, {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      // call existing handler if present
      const existingOnClick = (children.props as {
        onClick?: (e: React.MouseEvent<HTMLElement>) => void;
      }).onClick;
      existingOnClick?.(event);
      setOpen(!open);
    },
    "aria-expanded": open
  });
}

/* ---------------------------------------------------------------------------
   PORTAL
--------------------------------------------------------------------------- */
export function DrawerPortal({ children }: { children: React.ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

/* ---------------------------------------------------------------------------
   OVERLAY
--------------------------------------------------------------------------- */
export function DrawerOverlay() {
  const { open, setOpen } = useDrawerContext();

  if (!open) return null;

  return (
    <div
      className="drawer-overlay"
      onClick={() => setOpen(false)}
      aria-hidden
    />
  );
}

/* ---------------------------------------------------------------------------
   CONTENT
--------------------------------------------------------------------------- */
type DrawerContentProps = {
  children: React.ReactNode;
};

export function DrawerContent({ children }: DrawerContentProps) {
  const { open, setOpen } = useDrawerContext();
  const device = useDevice();
  const ref = React.useRef<HTMLDivElement | null>(null);

  const placement =
    device === "mobile" ? "bottom" : device === "tablet" ? "right" : "left";

  /* ESC handling */
  React.useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  /* Focus management & body scroll lock */
  React.useEffect(() => {
    const prevActive = document.activeElement as HTMLElement | null;
    if (open) {
      // focus the dialog container for screen readers / keyboard
      ref.current?.focus();
      // lock body scroll
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = prevOverflow;
        prevActive?.focus?.();
      };
    }
    return;
  }, [open]);

  if (!open) return null;

  return (
    <DrawerPortal>
      <div className={`drawer-portal ${open ? "open" : ""}`} data-state={open ? "open" : "closed"}>
        <DrawerOverlay />
        <div
          ref={ref}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          className={`drawer-content drawer--${placement}`}
        >
          {children}
        </div>
      </div>
    </DrawerPortal>
  );
}

/* ---------------------------------------------------------------------------
   HEADER
--------------------------------------------------------------------------- */
export function DrawerHeader({ children }: { children: React.ReactNode }) {
  return <div className="drawer-header">{children}</div>;
}

/* ---------------------------------------------------------------------------
   TITLE
--------------------------------------------------------------------------- */
export function DrawerTitle({ children }: { children: React.ReactNode }) {
  return <div className="drawer-title">{children}</div>;
}

/* ---------------------------------------------------------------------------
   DESCRIPTION
--------------------------------------------------------------------------- */
export function DrawerDescription({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="drawer-description">{children}</div>;
}

/* ---------------------------------------------------------------------------
   BODY
--------------------------------------------------------------------------- */
export function DrawerBody({ children }: { children: React.ReactNode }) {
  return <div className="drawer-body">{children}</div>;
}

/* ---------------------------------------------------------------------------
   FOOTER
--------------------------------------------------------------------------- */
export function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <div className="drawer-footer">{children}</div>;
}

/* ---------------------------------------------------------------------------
   CLOSE
--------------------------------------------------------------------------- */
export function DrawerClose({ children }: { children: React.ReactNode }) {
  const { setOpen } = useDrawerContext();

  return (
    <button
      className="drawer-close"
      onClick={() => setOpen(false)}
      aria-label="Close drawer"
    >
      {children}
    </button>
  );
}
