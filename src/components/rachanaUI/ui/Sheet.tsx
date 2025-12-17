import React, { useEffect, useRef, useState } from "react";
import "../css/Sheet.css";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement?: "right" | "left" | "bottom" | "top";
  size?: "sm" | "md" | "lg" | "xl" | "half" | "full";
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  trapFocus?: boolean;
  resizable?: boolean;
  children: React.ReactNode;
};

export function Sheet({
  open,
  onOpenChange,
  placement = "right",
  size = "md",
  closeOnOutsideClick = true,
  closeOnEsc = true,
  trapFocus = true,
  resizable = true,
  children
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const [dimension, setDimension] = useState<number | null>(null);
  const resizing = useRef(false);

  /* Focus */
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      sheetRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      lastFocused.current?.focus();
      document.body.style.overflow = "";
    }
  }, [open]);

  /* ESC */
  useEffect(() => {
    if (!closeOnEsc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, onOpenChange]);

  /* Resize handlers */
  const startResize = () => (resizing.current = true);
  const stopResize = () => (resizing.current = false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!resizing.current || !sheetRef.current) return;

      if (placement === "right") {
        setDimension(window.innerWidth - e.clientX);
      }
      if (placement === "left") {
        setDimension(e.clientX);
      }
      if (placement === "bottom") {
        setDimension(window.innerHeight - e.clientY);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stopResize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [placement]);

  if (!open) return null;

  const style =
    dimension != null
      ? placement === "bottom"
        ? { height: dimension }
        : { width: dimension }
      : undefined;

  return (
    <div className={`sheet-portal sheet-portal--open`}>
      <div
        className="sheet-backdrop"
        onClick={() => closeOnOutsideClick && onOpenChange(false)}
      />

      <div
        ref={sheetRef}
        tabIndex={-1}
        role="dialog"
        aria-modal={trapFocus}
        className={`sheet sheet--${placement} sheet--${size}`}
        style={style}
      >
        {resizable && (
          <div
            className="sheet__resize"
            onMouseDown={startResize}
            aria-hidden
          />
        )}

        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   SLOT COMPONENTS
--------------------------------------------------------------------------- */

export const SheetHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="sheet__header">{children}</div>
);

export const SheetTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="sheet__title">{children}</div>
);

export const SheetDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="sheet__description">{children}</div>
);

export const SheetBody = ({ children }: { children: React.ReactNode }) => (
  <div className="sheet__body">{children}</div>
);

export const SheetFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="sheet__footer">{children}</div>
);

export const SheetClose = ({
  onClick,
  children
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <button className="sheet__close" onClick={onClick} aria-label="Close sheet">
    {children}
  </button>
);
