// src/App.tsx
import { useState } from "react";

import { Box } from "./components/rachanaUI/ui/Box";

import AvatarDemo from "./demos/AvtarDemo";
import BadgeDemo from "./demos/BadgeDemo";
import ButtonDemo from "./demos/ButtonDemo";
import DividerDemo from "./demos/DividerDemo";
import DraggableDemo from "./demos/DraggableDemo";
import OverlayDemo from "./demos/OverlayDemo";
import ResizableDemo from "./demos/ResizableDemo";
import SkeletonDemo from "./demos/SkeletonDemo";
import SidebarDemo from "./demos/SidebarDemo";

type Demo =
  | "sidebar"
  | "avatar"
  | "badge"
  | "button"
  | "divider"
  | "draggable"
  | "overlay"
  | "resizable"
  | "skeleton";

export default function App() {
  const [activeDemo, setActiveDemo] = useState<Demo>("sidebar");

  // ✅ Sidebar/Navbar MUST own the page
  if (activeDemo === "sidebar") {
    return (
      <>
        <DemoSwitcher value={activeDemo} onChange={setActiveDemo} floating />
        <SidebarDemo />
      </>
    );
  }

  // ✅ All other component demos stack vertically
  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Inter, sans-serif",
        background: "#f7f7fb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 48,
      }}
    >
      <DemoSwitcher value={activeDemo} onChange={setActiveDemo} />

      <Box><AvatarDemo /></Box>
      <Box><BadgeDemo /></Box>
      <Box><ButtonDemo /></Box>
      <Box><DividerDemo /></Box>
      <Box><DraggableDemo /></Box>
      <Box><OverlayDemo /></Box>
      <Box><ResizableDemo /></Box>
      <Box><SkeletonDemo /></Box>
    </div>
  );
}

/* ============================================================================
   DEMO SWITCHER (Dev-only utility)
   ========================================================================== */

function DemoSwitcher({
  value,
  onChange,
  floating = false,
}: {
  value: Demo;
  onChange: (v: Demo) => void;
  floating?: boolean;
}) {
  const demos: Demo[] = [
    "sidebar",
    "avatar",
    "badge",
    "button",
    "divider",
    "draggable",
    "overlay",
    "resizable",
    "skeleton",
  ];

  return (
    <div
      style={{
        position: floating ? "fixed" : "static",
        top: floating ? 16 : undefined,
        right: floating ? 16 : undefined,
        zIndex: 200,
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        background: floating ? "white" : "transparent",
        padding: floating ? 8 : 0,
        borderRadius: floating ? 8 : 0,
        boxShadow: floating ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
      }}
    >
      {demos.map((demo) => (
        <button
          key={demo}
          onClick={() => onChange(demo)}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            cursor: "pointer",
            fontSize: 12,
            background: demo === value ? "#2371E7" : "#fff",
            color: demo === value ? "#fff" : "#000",
          }}
        >
          {demo}
        </button>
      ))}
    </div>
  );
}
