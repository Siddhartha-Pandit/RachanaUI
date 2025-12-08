import React from "react";
import "../css/Skeleton.css";

type SkeletonType = "text" | "rect" | "circle" | "inline";

type SkeletonProps = {
  type?: SkeletonType;
  width?: string | number;     // e.g. "60%", "240px", 120
  height?: string | number;    // fixed height for rect / circle
  lines?: number;              // text skeleton only
  animated?: boolean;
  className?: string;
};

export default function Skeleton({
  type = "text",
  width = "100%",
  height,
  lines = 1,
  animated = true,
  className = ""
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width,
    height
  };

  const baseClasses = `
    skeleton
    skeleton--${type}
    ${animated ? "skeleton--animated" : ""}
    ${className}
  `.trim();

  // Text skeleton renders multiple lines
  if (type === "text") {
    return (
      <div className="skeleton__text-group" aria-hidden="true">
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className={baseClasses}
            style={{
              ...style,
              width: idx === lines - 1 ? "60%" : width
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={baseClasses}
      style={style}
      aria-hidden="true"
    />
  );
}
