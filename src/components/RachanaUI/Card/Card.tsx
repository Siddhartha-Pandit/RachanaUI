import "./Card.css";

// ─── Root ───────────────────────────────────────────────────────────────────

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
    onClick?: () => void;
    [key: string]: unknown;
}

function Card({
    children,
    className = "",
    hoverable = false,
    onClick,
    ...props
}: CardProps) {
    return (
        <div
            className={[
                "card-root",
                hoverable ? "card-root--hoverable" : "",
                onClick ? "card-root--clickable" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
}

// ─── Header ─────────────────────────────────────────────────────────────────

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
    /** "row" lays children out horizontally — useful for title + badge side-by-side */
    layout?: "column" | "row";
    [key: string]: unknown;
}

function CardHeader({
    children,
    className = "",
    layout = "column",
    ...props
}: CardHeaderProps) {
    return (
        <div
            className={[
                "card-header",
                layout === "row" ? "card-header--row" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            {...props}
        >
            {children}
        </div>
    );
}

// ─── Header Text wrapper (used inside row layout) ────────────────────────────

interface CardHeaderTextProps {
    children: React.ReactNode;
    className?: string;
}

function CardHeaderText({ children, className = "" }: CardHeaderTextProps) {
    return (
        <div className={`card-header-text ${className}`}>{children}</div>
    );
}

// ─── Title ───────────────────────────────────────────────────────────────────

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    [key: string]: unknown;
}

function CardTitle({
    children,
    className = "",
    as: Tag = "h3",
    ...props
}: CardTitleProps) {
    return (
        <Tag className={`card-title ${className}`} {...props}>
            {children}
        </Tag>
    );
}

// ─── Description ─────────────────────────────────────────────────────────────

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
}

function CardDescription({
    children,
    className = "",
    ...props
}: CardDescriptionProps) {
    return (
        <p className={`card-description ${className}`} {...props}>
            {children}
        </p>
    );
}

// ─── Content ─────────────────────────────────────────────────────────────────

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
    /** Controls internal padding. Default = sp-6 (24px). */
    size?: "flush" | "sm" | "default" | "lg";
    [key: string]: unknown;
}

function CardContent({
    children,
    className = "",
    size = "default",
    ...props
}: CardContentProps) {
    return (
        <div
            className={[
                "card-content",
                size !== "default" ? `card-content--${size}` : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            {...props}
        >
            {children}
        </div>
    );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
    align?: "start" | "center" | "end" | "between";
    [key: string]: unknown;
}

function CardFooter({
    children,
    className = "",
    align = "end",
    ...props
}: CardFooterProps) {
    return (
        <div
            className={`card-footer card-footer--${align} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

// ─── Separator ───────────────────────────────────────────────────────────────

interface CardSeparatorProps {
    className?: string;
    /** "full" removes horizontal margin so the line spans edge-to-edge */
    full?: boolean;
}

function CardSeparator({ className = "", full = false }: CardSeparatorProps) {
    return (
        <div
            className={[
                "card-separator",
                full ? "card-separator--full" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        />
    );
}

// ─── Badge ───────────────────────────────────────────────────────────────────

interface CardBadgeProps {
    children: React.ReactNode;
    variant?: "brand" | "success" | "warning" | "danger" | "neutral";
    className?: string;
}

function CardBadge({
    children,
    variant = "neutral",
    className = "",
}: CardBadgeProps) {
    return (
        <span className={`card-badge card-badge--${variant} ${className}`}>
            {children}
        </span>
    );
}

// ─── Icon area ───────────────────────────────────────────────────────────────

interface CardIconProps {
    children: React.ReactNode;
    variant?: "brand" | "success" | "warning" | "danger" | "neutral";
    className?: string;
}

function CardIcon({
    children,
    variant = "neutral",
    className = "",
}: CardIconProps) {
    return (
        <div className={`card-icon card-icon--${variant} ${className}`}>
            {children}
        </div>
    );
}

// ─── Stat ────────────────────────────────────────────────────────────────────

interface CardStatProps {
    label: string;
    value: string | number;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    className?: string;
}

function CardStat({
    label,
    value,
    trend,
    trendValue,
    className = "",
}: CardStatProps) {
    return (
        <div className={`card-stat ${className}`}>
            <div className="card-stat-label">{label}</div>
            <div className="card-stat-value">{value}</div>
            {trend && trendValue && (
                <div className={`card-stat-trend card-stat-trend--${trend}`}>
                    {trend === "up" && (
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                        </svg>
                    )}
                    {trend === "down" && (
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                            <polyline points="17 18 23 18 23 12" />
                        </svg>
                    )}
                    {trendValue}
                </div>
            )}
        </div>
    );
}

// ─── Stat Grid ───────────────────────────────────────────────────────────────

interface CardStatGridProps {
    children: React.ReactNode;
    columns?: 2 | 3;
    className?: string;
}

function CardStatGrid({
    children,
    columns = 2,
    className = "",
}: CardStatGridProps) {
    return (
        <div
            className={`card-stat-grid card-stat-grid--${columns} ${className}`}
        >
            {children}
        </div>
    );
}

// ─── Compound exports ─────────────────────────────────────────────────────────

Card.Header = CardHeader;
Card.HeaderText = CardHeaderText;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Separator = CardSeparator;
Card.Badge = CardBadge;
Card.Icon = CardIcon;
Card.Stat = CardStat;
Card.StatGrid = CardStatGrid;

export default Card;