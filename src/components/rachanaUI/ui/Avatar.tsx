import React, {useEffect,useMemo,useState} from "react";
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

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // keep 32-bit
  }
  return Math.abs(hash);
}

function getAvatarColor(name: string): string {
  const safeName = name?.trim().toLowerCase() || "user";
  const hash = hashString(safeName);

  // Optional brand band: blue → violet (210°–280°)
  const BRAND_START = 210;
  const BRAND_RANGE = 70;

  const hue = BRAND_START + (hash % BRAND_RANGE);
  let saturation = 65;
  let lightness = 40;

  // Darken if needed (conservative approach)
  if (lightness > 42) lightness = 40;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


export default function Avatar({
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
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const showImage = src && !imgError && imgLoaded;

  const initials = useMemo(
    () => getInitials(name, size),
    [name, size]
  );

  const fallbackColor = useMemo(
    () => getAvatarColor(name),
    [name]
  );

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

  const ariaLabel =
    alt || (name ? `Avatar – ${name}` : "User avatar");

  return (
    <div
      className={classes}
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      aria-label={clickable ? ariaLabel : undefined}
      onClick={clickable && !disabled ? onClick : undefined}
    >
      {/* Image */}
      {src && !imgError && (
        <img
          src={src}
          alt={ariaLabel}
          className="avatar__image"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          draggable={false}
        />
      )}

      {/* Fallback */}
      {!showImage && (
        <span
          className="avatar__fallback"
          style={{ backgroundColor: fallbackColor }}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}

      {/* Status */}
      {status && (
        <span
          className={`avatar__status avatar__status--${status}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}