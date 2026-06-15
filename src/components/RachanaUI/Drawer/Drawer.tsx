import "./Drawer.css";
import { useEffect, useRef, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { XIcon } from "../Icons/Icons";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export type DrawerSide = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

/* ─────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────── */
interface DrawerContextValue {
  open: boolean;
  side: DrawerSide;
  onClose: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("Must be used inside <Drawer>");
  return ctx;
};

/* ─────────────────────────────────────────────
   SIZE MAP
───────────────────────────────────────────── */
const SIZE_MAP: Record<DrawerSide, Record<DrawerSize, string>> = {
  left:   { sm: "280px", md: "360px", lg: "480px", xl: "600px", full: "100vw" },
  right:  { sm: "280px", md: "360px", lg: "480px", xl: "600px", full: "100vw" },
  top:    { sm: "200px", md: "280px", lg: "360px", xl: "480px", full: "100vh" },
  bottom: { sm: "200px", md: "280px", lg: "360px", xl: "480px", full: "100vh" },
};

/* ─────────────────────────────────────────────
   ROOT
───────────────────────────────────────────── */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  dismissible?: boolean;
  children: ReactNode;
  className?: string;
}

function DrawerRoot({
  open,
  onClose,
  side = "right",
  size = "md",
  dismissible = true,
  children,
  className = "",
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissible) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, dismissible, onClose]);

  /* Focus trap */
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  const isHorizontal = side === "left" || side === "right";
  const sizeValue = SIZE_MAP[side][size];

  return (
    <DrawerContext.Provider value={{ open, side, onClose }}>
      {/* Portal-like fixed container */}
      <div
        className={`drawer-root${open ? " drawer-root-open" : ""}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`drawer-backdrop${open ? " drawer-backdrop-visible" : ""}`}
          onClick={dismissible ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          className={[
            "drawer-panel",
            `drawer-panel-${side}`,
            open ? "drawer-panel-open" : "",
            className,
          ].filter(Boolean).join(" ")}
          style={
            isHorizontal
              ? { width: sizeValue }
              : { height: sizeValue }
          }
        >
          {children}
        </div>
      </div>
    </DrawerContext.Provider>
  );
}

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
interface DrawerHeaderProps {
  children: ReactNode;
  className?: string;
}

function DrawerHeader({ children, className = "" }: DrawerHeaderProps) {
  const { onClose } = useDrawer();
  return (
    <div className={`drawer-header ${className}`}>
      <div className="drawer-header-content">{children}</div>
      <button
        className="drawer-close"
        onClick={onClose}
        aria-label="Close drawer"
      >
        <XIcon size={18} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TITLE
───────────────────────────────────────────── */
function DrawerTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`drawer-title ${className}`}>{children}</h2>;
}

/* ─────────────────────────────────────────────
   DESCRIPTION
───────────────────────────────────────────── */
function DrawerDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`drawer-description ${className}`}>{children}</p>;
}

/* ─────────────────────────────────────────────
   CONTENT (scrollable body)
───────────────────────────────────────────── */
function DrawerContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`drawer-content ${className}`}>{children}</div>;
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function DrawerFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`drawer-footer ${className}`}>{children}</div>;
}

/* ─────────────────────────────────────────────
   SEPARATOR
───────────────────────────────────────────── */
function DrawerSeparator() {
  return <div className="drawer-separator" />;
}

/* ─────────────────────────────────────────────
   TRIGGER (convenience wrapper)
───────────────────────────────────────────── */
interface DrawerTriggerProps {
  children: ReactNode;
  onClick: () => void;
}

function DrawerTrigger({ children, onClick }: DrawerTriggerProps) {
  return (
    <span className="drawer-trigger" onClick={onClick} role="presentation">
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   COMPOUND EXPORT
───────────────────────────────────────────── */
export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Content: DrawerContent,
  Footer: DrawerFooter,
  Separator: DrawerSeparator,
});

export default Drawer;