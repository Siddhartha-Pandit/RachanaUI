/* ============================================================================
   Sidebar + Navbar (shadcn-style, production ready)
   ========================================================================== */

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useDevice } from "../hook/useDevice";
import "../css/SidebarNavbar.css";

/* ============================================================================
   SIDEBAR CONTEXT
   ========================================================================== */

type SidebarState = "expanded" | "collapsed" | "hidden";

type SidebarContextValue = {
  state: SidebarState;
  setState: (s: SidebarState) => void;
  isCollapsed: boolean;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SidebarState>("expanded");

  return (
    <SidebarContext.Provider
      value={{
        state,
        setState,
        isCollapsed: state === "collapsed",
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("Sidebar components must be used inside SidebarProvider");
  }
  return ctx;
}

/* ============================================================================
   OVERLAY
   ========================================================================== */

function SidebarOverlay({ onClick }: { onClick?: () => void }) {
  return <div className="overlay overlay--sidebar" onClick={onClick} />;
}

/* ============================================================================
   SIDEBAR ROOT
   ========================================================================== */

export function Sidebar({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { state, setState } = useSidebar();
  const device = useDevice();

  const isOverlay = device !== "desktop";
  const isHidden = state === "hidden";

  function close() {
    if (isOverlay) setState("hidden");
  }

  return (
    <>
      {isOverlay && !isHidden && <SidebarOverlay onClick={close} />}

      <aside
        className={[
          "sidebar",
          `sidebar--${state}`,
          isOverlay ? "sidebar--overlay" : "sidebar--docked",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={isHidden}
      >
        <div className="sidebar__inner">{children}</div>
      </aside>
    </>
  );
}

/* ============================================================================
   SIDEBAR LAYOUT
   ========================================================================== */

export function SidebarHeader({ children }: { children: ReactNode }) {
  return <div className="sidebar__header">{children}</div>;
}

export function SidebarContent({ children }: { children: ReactNode }) {
  return <div className="sidebar__content">{children}</div>;
}

export function SidebarFooter({ children }: { children: ReactNode }) {
  return <div className="sidebar__footer">{children}</div>;
}

/* ============================================================================
   SIDEBAR MENU
   ========================================================================== */

export function SidebarMenu({ children }: { children: ReactNode }) {
  return (
    <nav className="sidebar-menu" aria-label="Primary navigation">
      {children}
    </nav>
  );
}

export function SidebarMenuItem({ children }: { children: ReactNode }) {
  return <div className="sidebar-menu__item">{children}</div>;
}

export function SidebarMenuButton({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  const { isCollapsed } = useSidebar();

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "sidebar-menu__button",
        active && "sidebar-menu__button--active",
        isCollapsed && "sidebar-menu__button--collapsed",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}

/* ============================================================================
   SIDEBAR GROUP (collapsible)
   ========================================================================== */

export function SidebarGroup({
  label,
  defaultOpen = true,
  children,
}: {
  label: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const { isCollapsed } = useSidebar();
  const [open, setOpen] = useState(defaultOpen);

  if (isCollapsed) {
    return <div className="sidebar-group--collapsed">{children}</div>;
  }

  return (
    <section className="sidebar-group">
      <button
        className="sidebar-group__label"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <span
          className={`sidebar-group__chevron ${
            open ? "sidebar-group__chevron--open" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && <div className="sidebar-group__items">{children}</div>}
    </section>
  );
}

/* ============================================================================
   NAVBAR
   ========================================================================== */

export default function Navbar({ children }: { children: ReactNode }) {
  return (
    <header className="navbar navbar--bordered" role="banner">
      {children}
    </header>
  );
}

export function NavbarSection({
  align = "left",
  children,
}: {
  align?: "left" | "center" | "right";
  children: ReactNode;
}) {
  return (
    <div className={`navbar__section navbar__section--${align}`}>
      {children}
    </div>
  );
}

export function NavbarBrand({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="navbar__brand">
      <span className="navbar__brand-title">{title}</span>
      {subtitle && (
        <span className="navbar__brand-subtitle">{subtitle}</span>
      )}
    </div>
  );
}

export function NavbarActions({ children }: { children: ReactNode }) {
  return <div className="navbar__actions">{children}</div>;
}

export function NavbarSidebarToggle({ label }: { label?: string }) {
  const device = useDevice();
  const { state, setState } = useSidebar();

  function toggle() {
    if (device === "desktop") {
      setState(state === "collapsed" ? "expanded" : "collapsed");
    } else {
      setState(state === "hidden" ? "expanded" : "hidden");
    }
  }

  return (
    <button
      className="navbar__toggle"
      aria-label={label ?? "Toggle navigation"}
      onClick={toggle}
    >
      <span className="navbar__toggle-icon">☰</span>
    </button>
  );
}
