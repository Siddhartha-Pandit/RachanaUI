import React, { useRef, useState, useEffect } from "react";

type BoundsType =
  | string
  | React.RefObject<HTMLElement>
  | React.RefObject<HTMLElement | null>;

type DraggableMode = "free" | "bounded" | "grid";

type DraggableProps = {
  children: React.ReactNode;
  mode?: DraggableMode;
  bounds?: BoundsType;
  gridSize?: number;
  initialX?: number;
  initialY?: number;
  className?: string;

  /** NEW FEATURE: Only drag when clicking this selector */
  dragHandle?: string;
};

const Draggable: React.FC<DraggableProps> = ({
  children,
  mode = "free",
  bounds,
  gridSize = 20,
  initialX = 0,
  initialY = 0,
  className = "",
  dragHandle, // NEW
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const offset = useRef({ x: 0, y: 0 });
  const boundsRect = useRef<DOMRect | null>(null);

  useEffect(() => {
    if (mode !== "bounded" || !bounds) return;

    let el: HTMLElement | null = null;

    if (typeof bounds === "string") {
      el = document.querySelector(bounds);
    } else if ("current" in bounds) {
      el = bounds.current ?? null;
    }

    if (el) {
      boundsRect.current = el.getBoundingClientRect();
    }
  }, [mode, bounds]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // ---------------------------------------------
    // ✅ NEW: Only allow drag when clicking dragHandle
    // ---------------------------------------------
    if (dragHandle) {
      const target = e.target as HTMLElement;
      const root = nodeRef.current;

      if (!root) return;

      const handleElement = root.querySelector(dragHandle);
      if (!handleElement) {
        console.warn(`Draggable: dragHandle "${dragHandle}" not found`);
        return;
      }

      if (!handleElement.contains(target)) {
        return; // ❌ not clicked on handle → ignore drag
      }
    }

    // ---------------------------------------------
    // ✔ Existing correct math to avoid jumping
    // ---------------------------------------------
    const rect = nodeRef.current?.getBoundingClientRect();
    const parent = nodeRef.current?.offsetParent as HTMLElement;
    const parentRect = parent?.getBoundingClientRect();

    offset.current = {
      x: e.clientX - (rect!.left - parentRect.left),
      y: e.clientY - (rect!.top - parentRect.top),
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const parent = nodeRef.current?.offsetParent as HTMLElement;
    const parentRect = parent?.getBoundingClientRect();

    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    if (mode === "grid") {
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }

    if (mode === "bounded" && boundsRect.current && nodeRef.current) {
      const itemRect = nodeRef.current.getBoundingClientRect();
      const b = boundsRect.current;

      newX = Math.max(
        b.left - parentRect.left,
        Math.min(newX, b.right - parentRect.left - itemRect.width)
      );
      newY = Math.max(
        b.top - parentRect.top,
        Math.min(newY, b.bottom - parentRect.top - itemRect.height)
      );
    }

    setPos({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={nodeRef}
      onMouseDown={handleMouseDown}
      className={className}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        cursor: dragHandle ? "default" : "grab", // use grab only if whole area draggable
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
