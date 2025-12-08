import React from "react";
import "../css/Badge.css";

export type BadgeProps = {
  children: React.ReactNode;
  variant?: "subtle" | "outline" | "filled";
  tone?: "neutral" | "primary" | "success" | "error" | "warning";
  shape?: "rounded" | "pill";
  icon?: React.ReactNode;
  interactive?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Badge({
  children,
  variant = "subtle",
  tone = "neutral",
  shape = "pill",
  icon,
  interactive = false,
  disabled = false,
  className = "",
  onClick,
}: BadgeProps) {
  const classes = [
    "badge",
    `badge--${variant}`,
    `badge--${tone}`,
    `badge--${shape}`,
    interactive && !disabled ? "badge--interactive" : "",
    disabled ? "badge--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      onClick={interactive && !disabled ? onClick : undefined}
      aria-disabled={disabled || undefined}
    >
      {icon && <span className="badge__icon">{icon}</span>}
      <span className="badge__label">{children}</span>
    </span>
  );
}


export type BadgeOverlayPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

type BadgeOverlayProps = {
  children: React.ReactNode;
  badgeContent: React.ReactNode;
  position?: BadgeOverlayPosition;
  className?: string;
} & Omit<BadgeProps, "children" | "className">;


export function BadgeOverlay({
  children,
  badgeContent,
  position = "top-right",
  className = "",
  ...badgeProps
}: BadgeOverlayProps) {
  const wrapperClass = [
    "badge-overlay",
    `badge-overlay--${position}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={wrapperClass}>
      {children}
      <span className="badge-overlay__badge">
        <Badge variant="filled" tone="primary" shape="pill" {...badgeProps}>
          {badgeContent}
        </Badge>
      </span>
    </span>
  );
}
