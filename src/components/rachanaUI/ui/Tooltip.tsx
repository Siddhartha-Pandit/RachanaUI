import * as React from "react";
import { createPortal } from "react-dom";
import { useDevice } from "../hook/useDevice";
import "../css/BrandSetting.css";
import "../css/Tooltip.css";

/* ============================================================================
   PROVIDER
============================================================================ */
type TooltipProviderProps = {
  children: React.ReactNode;
  delayDuration?: number;
  longPressDuration?: number;
  disableOnMobile?: boolean;
};

type ProviderConfig = {
  delayDuration: number;
  longPressDuration: number;
  disableOnMobile: boolean;
};

const ProviderContext = React.createContext<ProviderConfig | null>(null);

export function TooltipProvider({
  children,
  delayDuration = 120,
  longPressDuration = 500,
  disableOnMobile = false
}: TooltipProviderProps) {
  return (
    <ProviderContext.Provider
      value={{ delayDuration, longPressDuration, disableOnMobile }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

function useProvider(): ProviderConfig {
  return (
    React.useContext(ProviderContext) ?? {
      delayDuration: 120,
      longPressDuration: 500,
      disableOnMobile: false
    }
  );
}

/* ============================================================================
   TOOLTIP ROOT
============================================================================ */
type TooltipContextValue = {
  open: boolean;
  show: () => void;
  hide: () => void;
  id: string;
  triggerRef: React.RefObject<HTMLSpanElement | null>;
};

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

type TooltipProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Tooltip({ children, defaultOpen = false }: TooltipProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLSpanElement | null>(null);
  const id = React.useId().replace(/:/g, "");

  return (
    <TooltipContext.Provider
      value={{
        open,
        show: () => setOpen(true),
        hide: () => setOpen(false),
        id: `tooltip-${id}`,
        triggerRef
      }}
    >
      <span className="tooltip-root">{children}</span>
    </TooltipContext.Provider>
  );
}

function useTooltip(): TooltipContextValue {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) {
    throw new Error("Tooltip components must be used inside <Tooltip />");
  }
  return ctx;
}

/* ============================================================================
   TRIGGER
============================================================================ */
type TooltipTriggerProps = {
  children: React.ReactNode;
};

export function TooltipTrigger({ children }: TooltipTriggerProps) {
  const { show, hide, open, triggerRef, id } = useTooltip();
  const provider = useProvider();
  const device = useDevice();

  const hoverTimer = React.useRef<number | null>(null);
  const longPressTimer = React.useRef<number | null>(null);

  const isTouch = device === "mobile" || device === "tablet";

  React.useEffect(() => {
    return () => {
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
      if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
    };
  }, []);

  return (
    <span
      ref={triggerRef}
      className="tooltip-trigger"
      tabIndex={0}
      aria-describedby={open ? id : undefined}
      onMouseEnter={() => {
        if (provider.disableOnMobile && isTouch) return;
        hoverTimer.current = window.setTimeout(show, provider.delayDuration);
      }}
      onMouseLeave={() => {
        if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
        hide();
      }}
      onFocus={() => {
        if (provider.disableOnMobile && isTouch) return;
        show();
      }}
      onBlur={hide}
      onKeyDown={(e) => {
        if (e.key === "Escape") hide();
      }}
      onTouchStart={() => {
        if (!isTouch) return;
        longPressTimer.current = window.setTimeout(
          show,
          provider.longPressDuration
        );
      }}
      onTouchEnd={() => {
        if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
        hide();
      }}
    >
      {children}
    </span>
  );
}

/* ============================================================================
   PORTAL
============================================================================ */
export function TooltipPortal({ children }: { children: React.ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

/* ============================================================================
   CONTENT
============================================================================ */
type TooltipContentProps = {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
};

export function TooltipContent({
  children,
  side = "top"
}: TooltipContentProps) {
  const { open, id, triggerRef } = useTooltip();
  const provider = useProvider();
  const device = useDevice();

  if (!open) return null;
  if (provider.disableOnMobile && device === "mobile") return null;

  const rect = triggerRef.current?.getBoundingClientRect();
  if (!rect) return null;

  const gap = 6;
  let style: React.CSSProperties;

  switch (side) {
    case "bottom":
      style = {
        top: rect.bottom + gap,
        left: rect.left + rect.width / 2,
        transform: "translateX(-50%)"
      };
      break;
    case "left":
      style = {
        top: rect.top + rect.height / 2,
        left: rect.left - gap,
        transform: "translate(-100%, -50%)"
      };
      break;
    case "right":
      style = {
        top: rect.top + rect.height / 2,
        left: rect.right + gap,
        transform: "translateY(-50%)"
      };
      break;
    default:
      style = {
        top: rect.top - gap,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)"
      };
  }

  return (
    <TooltipPortal>
      <div
        id={id}
        role="tooltip"
        data-state="open"
        className={`tooltip-content tooltip-${side}`}
        style={style}
      >
        <div className="tooltip-inner">{children}</div>
        <span className="tooltip-arrow" aria-hidden />
      </div>
    </TooltipPortal>
  );
}
