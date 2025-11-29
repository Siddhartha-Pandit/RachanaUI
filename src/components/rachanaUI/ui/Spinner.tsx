import React from "react";
import "../css/Spinner.css"

export type SpinnerProps = {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "secondary" | "success" | "error" | "warning" | "neutral";
    className?: string;
    style?: React.CSSProperties;
};

export default function Spinner({
    size = "md",
    variant = "primary",
    className = "",
    style
}: SpinnerProps) {
    const classes = `spinner spinner-${size} spinner-${variant} ${className}`.trim();

    return (
        <span
            className={classes}
            style={style}
            aria-label="loading"
            role="status"
        />
    );
}
