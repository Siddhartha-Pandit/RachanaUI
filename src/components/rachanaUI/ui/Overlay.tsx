import React from "react";
import "../css/Overlay.css";

type OverlayProps = {
  open: boolean;
  intensity?: "low" | "medium" | "high";
  dismissible?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Overlay({
  open,
  intensity = "medium",
  dismissible = true,
  onClick,
  className = ""
}: OverlayProps) {
  if (!open) return null;

  const classes = `
    overlay
    overlay--${intensity}
    ${dismissible ? "overlay--dismissible" : "overlay--blocking"}
    ${className}
  `.trim();

  return (
    <div
      className={classes}
      aria-hidden="true"
      onClick={dismissible ? onClick : undefined}
    />
  );
}
