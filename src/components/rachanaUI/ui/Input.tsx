"use client";

import * as React from "react";
import "../css/Input.css";

/* ============================================================================
   TYPES
============================================================================ */

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix" | "suffix"
>;

export type InputSize = "sm" | "md" | "lg";

export type InputProps = {
  label?: string;
  helper?: string;
  error?: string;
  size?: InputSize;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;

  /** REGEX VALIDATION */
  regex?: string;
  regexError?: string;
} & NativeInputProps;

/* ============================================================================
   BASE INPUT
============================================================================ */

export function Input({
  label,
  helper,
  error,
  size = "md",
  prefix,
  suffix,
  fullWidth,
  disabled,
  readOnly,
  id,
  value,
  regex,
  regexError,
  onChange,
  ...props
}: InputProps) {
  const inputId = id ?? React.useId();

  /* ------------------------------------------------------------------------
     REGEX SETUP
  ------------------------------------------------------------------------ */
  const pattern = React.useMemo(() => {
    if (!regex) return null;
    try {
      return new RegExp(regex);
    } catch {
      console.warn("Invalid regex provided to Input:", regex);
      return null;
    }
  }, [regex]);

  const [internalRegexError, setInternalRegexError] =
    React.useState<string | null>(null);

  /* ------------------------------------------------------------------------
     VALIDATION
  ------------------------------------------------------------------------ */
  const validate = React.useCallback(
    (val?: string) => {
      if (!pattern || disabled || readOnly) return null;
      if (!val) return null;
      return pattern.test(val)
        ? null
        : regexError || "Invalid value";
    },
    [pattern, regexError, disabled, readOnly]
  );

  // ✅ Re-validate whenever VALUE changes
  React.useEffect(() => {
    if (typeof value === "string") {
      setInternalRegexError(validate(value));
    }
  }, [value, validate]);

  const showError = error || internalRegexError;

  const helperId = helper ? `${inputId}-helper` : undefined;
  const errorId = showError ? `${inputId}-error` : undefined;

  const describedBy = showError
    ? errorId
    : helper
    ? helperId
    : undefined;

  /* ------------------------------------------------------------------------
     HANDLERS
  ------------------------------------------------------------------------ */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className={`field ${fullWidth ? "full-width" : ""}`}>
      {label && (
        <label htmlFor={inputId} className="label">
          {label}
        </label>
      )}

      <div
        className={[
          "input-wrapper",
          `size-${size}`,
          showError && "error",
          disabled && "disabled",
          readOnly && "readonly"
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {prefix && <span className="input-prefix">{prefix}</span>}

        {/* 🔑 FIXED INPUT (props order matters) */}
        <input
          {...props}
          id={inputId}
          className="input"
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          aria-invalid={!!showError}
          aria-describedby={describedBy}
          onChange={handleChange}
        />

        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>

      {!showError && helper && (
        <div id={helperId} className="helper-text">
          {helper}
        </div>
      )}

      {showError && (
        <div id={errorId} className="error-text" role="alert">
          {error || internalRegexError}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   PHONE INPUT
============================================================================ */

export type Country = {
  code: string;
  dialCode: string;
  flag: string;
  label: string;
};

export type PhoneInputProps = {
  label?: string;
  helper?: string;
  error?: string;
  size?: InputSize;
  fullWidth?: boolean;
  disabled?: boolean;

  countries: Country[];

  country?: Country;
  onCountryChange?: (country: Country) => void;

  defaultCountry?: Country;

  value?: string;
  onChange?: (value: string) => void;
};

export function PhoneInput({
  label,
  helper,
  error,
  size = "md",
  fullWidth,
  disabled,

  countries,
  country: controlledCountry,
  defaultCountry,
  onCountryChange,

  value,
  onChange
}: PhoneInputProps) {
  const isControlled = controlledCountry !== undefined;

  const [internalCountry, setInternalCountry] = React.useState<Country | null>(
    defaultCountry ?? countries[0] ?? null
  );

  const country = isControlled ? controlledCountry! : internalCountry;

  const setCountry = (c: Country) => {
    if (!isControlled) setInternalCountry(c);
    onCountryChange?.(c);
  };

  const [open, setOpen] = React.useState(false);

  if (!country) return null;

  return (
    <div className={`field ${fullWidth ? "full-width" : ""}`}>
      {label && <label className="label">{label}</label>}

      <div
        className={[
          "input-wrapper",
          "phone-wrapper",
          `size-${size}`,
          error && "error",
          disabled && "disabled"
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* COUNTRY SELECT */}
        <div className="phone-country-wrapper">
          <button
            type="button"
            className="phone-country"
            disabled={disabled}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span className="phone-flag">{country.flag}</span>
            <span className="phone-code">{country.dialCode}</span>
          </button>

          {open && (
            <ul className="phone-dropdown" role="listbox">
              {countries.map((c) => (
                <li
                  key={c.code}
                  role="option"
                  aria-selected={c.code === country.code}
                  className="phone-option"
                  onClick={() => {
                    setCountry(c);
                    setOpen(false);
                  }}
                >
                  <span>{c.flag}</span>
                  <span>{c.label}</span>
                  <span>{c.dialCode}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* PHONE INPUT */}
        <input
          type="tel"
          className="input phone-input"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          aria-invalid={!!error}
          placeholder="Phone number"
        />
      </div>

      {!error && helper && <div className="helper-text">{helper}</div>}

      {error && (
        <div className="error-text" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
