import React, { useState, useRef } from "react";

type Handle =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type ResizableProps = {
  initialWidth?: number;
  initialHeight?: number;
  initialTop?: number;
  initialLeft?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
  children?: React.ReactNode;

  disabledHandles?: Partial<Record<Handle, boolean>>;
};

export default function Resizable({
  initialWidth = 300,
  initialHeight = 200,
  initialTop = 100,
  initialLeft = 100,
  minWidth = 50,
  minHeight = 50,
  maxWidth = Infinity,
  maxHeight = Infinity,
  disabledHandles = {},
  children,
}: ResizableProps) {
  const [rect, setRect] = useState({
    width: initialWidth,
    height: initialHeight,
    top: initialTop,
    left: initialLeft,
  });

  const [hoverSide, setHoverSide] = useState<Handle | null>(null);

  const active = useRef<{
    handles: Handle[];
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startTop: number;
    startLeft: number;
  } | null>(null);

  function startResize(handle: Handle, e: React.PointerEvent) {
    if (disabledHandles[handle]) return;

    e.preventDefault();
    e.stopPropagation();

    if (!active.current) {
      active.current = {
        handles: [handle],
        startX: e.clientX,
        startY: e.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
        startTop: rect.top,
        startLeft: rect.left,
      };
    } else {
      if (!active.current.handles.includes(handle)) {
        active.current.handles.push(handle);
      }
    }

    window.addEventListener("pointermove", onResize);
    window.addEventListener("pointerup", stopResize);
  }

  function onResize(e: PointerEvent) {
    const drag = active.current;
    if (!drag) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    let newWidth = drag.startWidth;
    let newHeight = drag.startHeight;
    let newTop = drag.startTop;
    let newLeft = drag.startLeft;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    drag.handles.forEach((handle) => {
      if (handle.includes("right") && !disabledHandles["right"]) {
        newWidth = clamp(drag.startWidth + dx, minWidth, maxWidth);
      }
      if (handle.includes("left") && !disabledHandles["left"]) {
        newWidth = clamp(drag.startWidth - dx, minWidth, maxWidth);
        newLeft = drag.startLeft + (drag.startWidth - newWidth);
      }
      if (handle.includes("bottom") && !disabledHandles["bottom"]) {
        newHeight = clamp(drag.startHeight + dy, minHeight, maxHeight);
      }
      if (handle.includes("top") && !disabledHandles["top"]) {
        newHeight = clamp(drag.startHeight - dy, minHeight, maxHeight);
        newTop = drag.startTop + (drag.startHeight - newHeight);
      }
    });

    setRect({
      width: newWidth,
      height: newHeight,
      top: newTop,
      left: newLeft,
    });
  }

  function stopResize() {
    active.current = null;
    window.removeEventListener("pointermove", onResize);
    window.removeEventListener("pointerup", stopResize);
  }

  // Full-side hitboxes
  const handleStyles: Record<Handle, React.CSSProperties> = {
    top: { top: -3, left: 0, width: "100%", height: 6, cursor: "ns-resize" },
    bottom: { bottom: -3, left: 0, width: "100%", height: 6, cursor: "ns-resize" },
    left: { left: -3, top: 0, width: 6, height: "100%", cursor: "ew-resize" },
    right: { right: -3, top: 0, width: 6, height: "100%", cursor: "ew-resize" },

    "top-left": { top: -4, left: -4, width: 10, height: 10, cursor: "nwse-resize" },
    "top-right": { top: -4, right: -4, width: 10, height: 10, cursor: "nesw-resize" },
    "bottom-left": { bottom: -4, left: -4, width: 10, height: 10, cursor: "nesw-resize" },
    "bottom-right": { bottom: -4, right: -4, width: 10, height: 10, cursor: "nwse-resize" },
  };

  // Borders only appear if active or hovered
  function dynamicBorder(side: Handle) {
    if (disabledHandles[side]) {
      return hoverSide === side ? "2px solid #e1e1e5" : "2px solid transparent";
    }

    if (active.current?.handles.some((h) => h.includes(side))) {
      return "3px solid #e1e1e5";
    }

    if (hoverSide?.includes(side)) {
      return "2px solid #e1e1e5";
    }

    return "2px solid transparent"; // default = invisible
  }

  return (
    <div
      style={{
        position: "absolute",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        background: "#f5f5f6",
        userSelect: "none",
        boxSizing: "border-box",

        borderTop: dynamicBorder("top"),
        borderBottom: dynamicBorder("bottom"),
        borderLeft: dynamicBorder("left"),
        borderRight: dynamicBorder("right"),
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>{children}</div>

      {(Object.keys(handleStyles) as Handle[]).map((h) => {
        if (disabledHandles[h]) return null;

        return (
          <div
            key={h}
            onPointerDown={(e) => startResize(h, e)}
            onMouseEnter={() => setHoverSide(h)}
            onMouseLeave={() => setHoverSide(null)}
            style={{
              position: "absolute",
              background: "transparent",
              ...handleStyles[h],
            }}
          />
        );
      })}
    </div>
  );
}
