import "./Radio.css";
import { createContext, useContext, useId } from "react";
import type { ReactNode } from "react";

/* ─────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────── */
interface RadioGroupContextValue {
    value: string;
    name: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const useRadioGroup = () => {
    const ctx = useContext(RadioGroupContext);
    if (!ctx) throw new Error("Radio must be used inside <Radio.Group>");
    return ctx;
};

/* ─────────────────────────────────────────────
   GROUP
───────────────────────────────────────────── */
export interface RadioGroupProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    orientation?: "vertical" | "horizontal";
    label?: string;
    hint?: string;
    error?: string;
    children: ReactNode;
    className?: string;
}

function RadioGroup({
    value,
    onChange,
    disabled,
    orientation = "vertical",
    label,
    hint,
    error,
    children,
    className = "",
}: RadioGroupProps) {
    const name = useId();

    return (
        <RadioGroupContext.Provider value={{ value, name, disabled, onChange }}>
            <fieldset
                className={`radio-fieldset ${className}`}
                disabled={disabled}
                aria-invalid={!!error}
            >
                {label && <legend className="radio-legend">{label}</legend>}

                <div
                    className={["radio-group", `radio-group-${orientation}`].join(" ")}
                    role="radiogroup"
                >
                    {children}
                </div>

                {error ? (
                    <p className="radio-error" role="alert">
                        {error}
                    </p>
                ) : hint ? (
                    <p className="radio-hint">{hint}</p>
                ) : null}
            </fieldset>
        </RadioGroupContext.Provider>
    );
}

/* ─────────────────────────────────────────────
   ITEM
───────────────────────────────────────────── */
export interface RadioItemProps {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    className?: string;
}

function RadioItem({
    value,
    label,
    description,
    disabled: itemDisabled,
    className = "",
}: RadioItemProps) {
    const {
        value: groupValue,
        name,
        disabled: groupDisabled,
        onChange,
    } = useRadioGroup();
    const id = useId();
    const checked = groupValue === value;
    const disabled = itemDisabled || groupDisabled;

    return (
        <label
            htmlFor={id}
            className={[
                "radio-item",
                checked ? "radio-item-checked" : "",
                disabled ? "radio-item-disabled" : "",
                // KEY FIX: add modifier class when a description is present so CSS
                // can switch from align-items:center (simple label) to
                // align-items:flex-start + margin-top offset (label + description).
                description ? "radio-item-has-description" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                // Deselect on click if already checked — native radio never fires
                // `change` when re-clicking the same option, so we use onClick.
                onClick={() => onChange(checked ? "" : value)}
                onChange={() => { }} // suppress React controlled-input warning
                className="radio-input"
                aria-describedby={description ? `${id}-desc` : undefined}
            />

            <span className="radio-control" aria-hidden="true">
                <span className="radio-dot" />
            </span>

            <span className="radio-label-wrap">
                <span className="radio-label">{label}</span>
                {description && (
                    <span id={`${id}-desc`} className="radio-description">
                        {description}
                    </span>
                )}
            </span>
        </label>
    );
}

/* ─────────────────────────────────────────────
   CARD
───────────────────────────────────────────── */
export interface RadioCardProps {
    value: string;
    label: string;
    description?: string;
    badge?: string;
    disabled?: boolean;
    className?: string;
}

function RadioCard({
    value,
    label,
    description,
    badge,
    disabled: itemDisabled,
    className = "",
}: RadioCardProps) {
    const {
        value: groupValue,
        name,
        disabled: groupDisabled,
        onChange,
    } = useRadioGroup();
    const id = useId();
    const checked = groupValue === value;
    const disabled = itemDisabled || groupDisabled;

    return (
        <label
            htmlFor={id}
            className={[
                "radio-card",
                checked ? "radio-card-checked" : "",
                disabled ? "radio-card-disabled" : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                onClick={() => onChange(checked ? "" : value)}
                onChange={() => { }}
                className="radio-input"
            />

            <div className="radio-card-header">
                <span className="radio-card-label">{label}</span>
                <div className="radio-card-right">
                    {badge && <span className="radio-card-badge">{badge}</span>}
                    <span
                        className="radio-control"
                        aria-hidden="true"
                        style={
                            checked
                                ? {
                                    background: "var(--brand-400)",
                                    borderColor: "var(--brand-400)",
                                }
                                : undefined
                        }
                    >
                        <span
                            className="radio-dot"
                            style={
                                checked
                                    ? {
                                        transform: "scale(1)",
                                        background: "var(--neutral-0)",
                                    }
                                    : undefined
                            }
                        />
                    </span>
                </div>
            </div>

            {description && (
                <span className="radio-card-description">{description}</span>
            )}
        </label>
    );
}

/* ─────────────────────────────────────────────
   COMPOUND EXPORT
───────────────────────────────────────────── */
export const Radio = Object.assign(RadioGroup, {
    Group: RadioGroup,
    Item: RadioItem,
    Card: RadioCard,
});

export default Radio;