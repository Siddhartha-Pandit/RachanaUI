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
  ...props
}: InputProps) {
  const inputId = id ?? React.useId();
  const helperId = helper ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy = error
    ? errorId
    : helper
    ? helperId
    : undefined;

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
          error && "error",
          disabled && "disabled",
          readOnly && "readonly"
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {prefix && <span className="input-prefix">{prefix}</span>}

        <input
          id={inputId}
          className="input"
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />

        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>

      {!error && helper && (
        <div id={helperId} className="helper-text">
          {helper}
        </div>
      )}

      {error && (
        <div id={errorId} className="error-text" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   PHONE INPUT
============================================================================ */
/* ============================================================================
   PHONE INPUT (FULLY PROP-DRIVEN)
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

  /** 🔑 REQUIRED DATA */
  countries: Country[];

  /** 🔁 CONTROLLED COUNTRY */
  country?: Country;
  onCountryChange?: (country: Country) => void;

  /** 🔁 UNCONTROLLED COUNTRY */
  defaultCountry?: Country;

  /** PHONE VALUE */
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
  /* ------------------------------------------------------------------------
     COUNTRY STATE (CONTROLLED / UNCONTROLLED)
  ------------------------------------------------------------------------ */
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

  if (!country) return null; // safety guard

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

      {!error && helper && (
        <div className="helper-text">{helper}</div>
      )}

      {error && (
        <div className="error-text" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

