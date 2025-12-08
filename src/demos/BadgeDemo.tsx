import React from "react";
import Badge, { BadgeOverlay } from "../components/rachanaUI/ui/Badge";

/* Simple cart icon for demo */
function CartIcon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
      }}
    >
      🛒
    </div>
  );
}

export default function BadgeDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 24,
        fontFamily: "var(--font-family-system)",
        background: "var(--color-surface)",
        color: "var(--text-primary)",
      }}
    >
      {/* Normal badges */}
      <div style={{ display: "flex", gap: 8 }}>
        <Badge>Draft</Badge>
        <Badge tone="primary">New</Badge>
        <Badge tone="success">Active</Badge>
        <Badge tone="warning">Pending</Badge>
        <Badge tone="error">Failed</Badge>
      </div>

      {/* Cart icon with badge – TOP RIGHT (like your screenshot) */}
      <div style={{ display: "flex", gap: 24 }}>
        <BadgeOverlay badgeContent={4} position="top-right">
          <CartIcon />
        </BadgeOverlay>

        {/* Other positions so you can see how it behaves */}
        <BadgeOverlay badgeContent={2} position="top-left">
          <CartIcon />
        </BadgeOverlay>

        <BadgeOverlay badgeContent={1} position="bottom-right">
          <CartIcon />
        </BadgeOverlay>

        <BadgeOverlay badgeContent={7} position="bottom-left">
          <CartIcon />
        </BadgeOverlay>
      </div>
    </div>
  );
}
