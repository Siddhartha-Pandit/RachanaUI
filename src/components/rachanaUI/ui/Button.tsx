import React from "react";
import Spinner from "./Spinner";
import "../css/Button.css"

type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    className = "",
    onClick
}: ButtonProps) {
   
    const classes=`btn btn--${variant}
    btn--${size}
    ${fullWidth ? "btn--fullWidth" : ""}
    ${loading ? "btn--loading" : ""}
    ${disabled ? "btn--disabled" : ""}
    ${className}
    `.trim();
    
   

    return (
        <button
           className={classes}
           onClick={onClick}
           disabled={disabled || loading}
        >
            {loading && (
                <span className="btn__spinner-wrapper">
                <Spinner size="sm" variant={variant==="primary"?"primary":"secondary"} />
                </span>
            )}

           <span className="btn__label">{children}</span>
        </button>
    );
}
