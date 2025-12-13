"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import "../css/Sidebar.css";
import { useDevice } from "../hook/useDevice";

/* =========================================================
   TYPES
========================================================= */

type SidebarState = "expanded" | "collapsed";
type SidebarSide = "left" | "right";
type SidebarCollapsible = "offcanvas" | "icon" | "none";

type SidebarContextValue = {
  state: SidebarState;
  open: boolean;
  openMobile: boolean;
  width: number;
  setWidth: (w: number) => void;
  toggleSidebar: () => void;
  side: SidebarSide;
  collapsible: SidebarCollapsible;
};

/* =========================================================
   CONTEXT
========================================================= */

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }
  return ctx;
}

/* =========================================================
   PROVIDER
========================================================= */

export function SidebarProvider({
  children,
  defaultOpen = true,
  side = "left",
  collapsible = "icon",
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  side?: SidebarSide;
  collapsible?: SidebarCollapsible;
}) {
  const device = useDevice();
  const isMobile = device === "mobile";

  const [open, setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);
  const [width, setWidth] = useState(260);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((v) => !v);
    } else {
      setOpen((v) => !v);
    }
  }, [isMobile]);

  /* ⌨️ Keyboard shortcut (Ctrl/Cmd + B) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  const value = useMemo<SidebarContextValue>(
    () => ({
      state: open ? "expanded" : "collapsed",
      open,
      openMobile,
      width,
      setWidth,
      toggleSidebar,
      side,
      collapsible,
    }),
    [open, openMobile, width, toggleSidebar, side, collapsible]
  );

  return (
    <SidebarContext.Provider value={value}>
      <div className="sidebar-layout">{children}</div>
    </SidebarContext.Provider>
  );
}

/* =========================================================
   SIDEBAR CORE
========================================================= */

export function Sidebar({ children }: { children?: React.ReactNode }) {
  const ctx = useSidebar();

  /* 📱 Mobile off-canvas */
  if (ctx.openMobile) {
    return (
      <div className="sidebar-mobile-overlay" onClick={ctx.toggleSidebar}>
        <div
          className="sidebar-mobile-panel"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <aside
      className="sidebar-root"
      data-state={ctx.state}
      data-side={ctx.side}
      data-collapsible={ctx.state === "collapsed" ? ctx.collapsible : ""}
      style={{
        width: ctx.state === "collapsed" ? 64 : ctx.width,
      }}
    >
      <div className="sidebar-inner">{children}</div>
      <SidebarResizeHandle />
    </aside>
  );
}

/* =========================================================
   RESIZE HANDLE
========================================================= */

function SidebarResizeHandle() {
  const { width, setWidth, side, state } = useSidebar();

  if (state === "collapsed") return null;

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX;
      const next = side === "left" ? startWidth + delta : startWidth - delta;

      setWidth(Math.min(Math.max(next, 180), 420));
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      className="sidebar-resize-handle"
      data-side={side}
      onMouseDown={onMouseDown}
    />
  );
}

/* =========================================================
   BASIC STRUCTURE
========================================================= */

export const SidebarHeader = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="sidebar-header" {...p} />
);

export const SidebarFooter = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="sidebar-footer" {...p} />
);

export const SidebarContent = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="sidebar-content" {...p} />
);

export const SidebarInset = (p: React.HTMLAttributes<HTMLElement>) => {
  const { width, state, side } = useSidebar();

  return (
    <main
      className="sidebar-inset"
      style={{
        marginLeft: side === "left" && state === "expanded" ? width : undefined,
        marginRight:
          side === "right" && state === "expanded" ? width : undefined,
      }}
      {...p}
    />
  );
};

/* =========================================================
   TRIGGER
========================================================= */

export function SidebarTrigger() {
  const ctx = useSidebar();
  return (
    <button className="sidebar-trigger" onClick={ctx.toggleSidebar}>
      ☰
    </button>
  );
}

export const SidebarRail = SidebarTrigger;

/* =========================================================
   GROUP (COLLAPSIBLE)
========================================================= */

export function SidebarGroup({
  defaultOpen = true,
  children,
}: {
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const { state } = useSidebar();
  const [open, setOpen] = useState(defaultOpen);

  const isOpen = state === "collapsed" || open;

  return (
    <div className="sidebar-group" data-open={isOpen}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        if (child.type === SidebarGroupLabel) {
          return React.cloneElement(child as any, {
            onClick: () => setOpen((v) => !v),
            role: "button",
            tabIndex: 0,
          });
        }

        if (child.type === SidebarGroupContent && !isOpen) {
          return null;
        }

        return child;
      })}
    </div>
  );
}

export const SidebarGroupLabel = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="sidebar-group-label" {...p} />
);

export const SidebarGroupAction = (
  p: React.ButtonHTMLAttributes<HTMLButtonElement>
) => <button className="sidebar-group-action" {...p} />;

export const SidebarGroupContent = (
  p: React.HTMLAttributes<HTMLDivElement>
) => <div className="sidebar-group-content" {...p} />;

/* =========================================================
   UTILS
========================================================= */

export const SidebarSeparator = () => <div className="sidebar-separator" />;

export const SidebarInput = (
  p: React.InputHTMLAttributes<HTMLInputElement>
) => <input className="sidebar-input" {...p} />;

/* =========================================================
   MENU
========================================================= */

export const SidebarMenu = (p: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="sidebar-menu" {...p} />
);

export const SidebarMenuItem = (p: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className="sidebar-menu-item" {...p} />
);

export const SidebarMenuButton = ({
  isActive,
  ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
}) => <button className="sidebar-menu-button" data-active={isActive} {...p} />;

export const SidebarMenuAction = (
  p: React.ButtonHTMLAttributes<HTMLButtonElement>
) => <button className="sidebar-menu-action" {...p} />;

export const SidebarMenuBadge = (p: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="sidebar-menu-badge" {...p} />
);

export const SidebarMenuSkeleton = () => (
  <div className="sidebar-menu-skeleton" />
);

/* =========================================================
   SUB MENU
========================================================= */

export const SidebarMenuSub = (p: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className="sidebar-menu-sub" {...p} />
);

export const SidebarMenuSubItem = (
  p: React.LiHTMLAttributes<HTMLLIElement>
) => <li className="sidebar-menu-sub-item" {...p} />;

export const SidebarMenuSubButton = ({
  isActive,
  ...p
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
}) => <a className="sidebar-menu-sub-button" data-active={isActive} {...p} />;
