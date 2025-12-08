import "../css/Divider.css";

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  inset?: "none" | "start" | "both";
  label?: string;
  decorative?: boolean;
  className?: string;
};

/**
 * Divider
 *
 * Structural, non-interactive separator.
 *
 * Notes:
 * - Horizontal dividers separate vertical content stacks
 * - Vertical dividers are intended for flex row layouts
 *   and stretch to match parent height
 */
export default function Divider({
  orientation = "horizontal",
  spacing = "md",
  inset = "none",
  label,
  decorative = true,
  className = ""
}: DividerProps) {
  const classes = `
    divider
    divider--${orientation}
    divider--spacing-${spacing}
    divider--inset-${inset}
    ${label ? "divider--labeled" : ""}
    ${className}
  `.trim();

  return (
    <div
      className={classes}
      role={decorative ? undefined : "separator"}
      aria-hidden={decorative}
      aria-orientation={
        !decorative && orientation === "vertical"
          ? "vertical"
          : undefined
      }
    >
      {label && (
        <span className="divider__label">
          {label}
        </span>
      )}
    </div>
  );
}
