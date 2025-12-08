import React, { useEffect, useMemo, useState } from "react";
import "../css/Avatar.css";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "rounded";
export type AvatarStatus = "online" | "away" | "busy" | "offline";

export type AvatarProps = {
  name: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: AvatarStatus;
  disabled?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};
function getInitials(name: string, size: AvatarSize): string {
  if (!name) return "?";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return size === "xs" || size === "sm"
      ? parts[0][0].toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getAvatarColor(name: string) {
  const safe = name?.trim().toLowerCase() || "user";
  const hash = hashString(safe);

  // brand-friendly blue → violet range
  const hue = 210 + (hash % 70);
  return `hsl(${hue}, 65%, 40%)`;
}

/* ========================================================================= */
/* AVATAR COMPONENT                                                          */
/* ========================================================================= */

export function Avatar({
  name,
  src,
  alt,
  size = "md",
  shape = "circle",
  status,
  disabled = false,
  clickable = false,
  onClick,
  className = "",
  style,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const showImage = Boolean(src && !imgError && imgLoaded);
  const initials = useMemo(() => getInitials(name, size), [name, size]);
  const bgColor = useMemo(() => getAvatarColor(name), [name]);

  useEffect(() => {
    setImgError(false);
    setImgLoaded(false);
  }, [src]);

  const classes = [
    "avatar",
    `avatar--${size}`,
    `avatar--${shape}`,
    clickable && !disabled && "avatar--clickable",
    disabled && "avatar--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const ariaLabel = alt || (name ? `Avatar – ${name}` : "User avatar");

  return (
    <div
      className={classes}
      style={style}
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      aria-label={clickable ? ariaLabel : undefined}
      onClick={clickable && !disabled ? onClick : undefined}
    >
      {src && !imgError && (
        <img
          src={src}
          alt={ariaLabel}
          className="avatar__image"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}

      {!showImage && (
        <span
          className="avatar__fallback"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </span>
      )}

      {status && (
        <span className={`avatar__status avatar__status--${status}`} />
      )}
    </div>
  );
}

export type AvatarGroupProps = {
  children: React.ReactElement<AvatarProps>[];
  max?: number;
  size?: AvatarSize;
  overlapPx?: number;
};

export function AvatarGroup({
  children,
  max = 3,
  size = "md",
  overlapPx,
}: AvatarGroupProps) {
  const avatars = React.Children.toArray(
    children
  ) as React.ReactElement<AvatarProps>[];

  const visible = avatars.slice(0, max);
  const hidden = avatars.length - visible.length;

  const overlap = overlapPx ?? getDefaultOverlap(size);

  return (
    <div className="avatar-group">
      {visible.map((child, index) => (
        <div
          key={index}
          className="avatar-group__item"
          style={{
            marginLeft: index === 0 ? 0 : -overlap,
            zIndex: visible.length - index,
          }}
        >
          {React.cloneElement(child, { size })}
        </div>
      ))}

      {hidden > 0 && (
        <div
          className="avatar-group__item"
          style={{ marginLeft: -overlap }}
        >
          <Avatar name={`+${hidden}`} size={size} />
        </div>
      )}
    </div>
  );
}

function getDefaultOverlap(size: AvatarSize) {
  switch (size) {
    case "xs":
      return 10;
    case "sm":
      return 12;
    case "md":
      return 14;
    case "lg":
      return 18;
    case "xl":
      return 24;
    default:
      return 14;
  }
}
