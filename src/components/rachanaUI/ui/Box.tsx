import React, { type HTMLAttributes, type ReactNode } from "react";
import "../css/Box.css";
type BoxVariant = "card" | "panel" | "sheet";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BoxVariant;
  header?: ReactNode;
  footer?: ReactNode;
  clickable?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export const Box: React.FC<BoxProps> = ({
  variant = "card",
  header,
  footer,
  clickable = false,
  selected = false,
  disabled = false,
  className = "",
  children,
  ...props
}) => {
  const interactive = clickable && !disabled;

  // Build classes (very simple logic)
  let classes = `ui-box ui-box--${variant}`;
  if (interactive) classes += " ui-box--interactive";
  if (selected) classes += " ui-box--selected";
  if (disabled) classes += " ui-box--disabled";
  if (className) classes += ` ${className}`;

  return (
    <div
      {...props}
      className={classes}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled || undefined}
    >
      {header && <div className="ui-box__header">{header}</div>}
      <div className="ui-box__content">{children}</div>
      {footer && <div className="ui-box__footer">{footer}</div>}
    </div>
  );
};
