📘 Rachana UI Documentation

A lightweight, token-driven design system.

#️⃣ 1. Setup Guide
1.1 Install / Import CSS

Import the global design tokens once in your main entry file:

// main.tsx or index.tsx
import "./components/rachanaUI/css/BrandSetting.css";


Then import component-level styles:

import "./components/rachanaUI/css/Button.css";
import "./components/rachanaUI/css/Spinner.css";

1.2 Folder Structure
src/
  components/
    rachanaUI/
      css/
        BrandSetting.css   <-- tokens + themes
        Button.css
        Spinner.css
      ui/
        Button.tsx
        Spinner.tsx
        ThemeToggle.tsx
  theme.ts                  <-- theme logic

☀🌙 2. Theme (Light / Dark / System)
2.1 Theme Logic (theme.ts)
export type Theme = "light" | "dark" | "system";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    prefersDark ? root.classList.add("dark") : root.classList.remove("dark");
    return;
  }

  theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
}

export function initializeTheme() {
  const saved = localStorage.getItem("theme") as Theme | null;
  const theme = saved || "system";

  applyTheme(theme);

  if (theme === "system") {
    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => applyTheme("system"));
  }

  return theme;
}

export function setTheme(theme: Theme) {
  localStorage.setItem("theme", theme);
  applyTheme(theme);
}

2.2 Theme Toggle Component
import { useState, useEffect } from "react";
import { initializeTheme, setTheme } from "./theme";
import type { Theme } from "./theme";

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    setThemeState(initializeTheme());
  }, []);

  const changeTheme = (value: Theme) => {
    setThemeState(value);
    setTheme(value);
  };

  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <button onClick={() => changeTheme("light")}>Light</button>
      <button onClick={() => changeTheme("dark")}>Dark</button>
      <button onClick={() => changeTheme("system")}>System</button>
    </div>
  );
}

🔘 3. Button Component
3.1 Button Usage
import Button from "@/components/rachanaUI/ui/Button";

<Button>Default Button</Button>

<Button variant="secondary">Cancel</Button>

<Button variant="ghost">Ghost Button</Button>

<Button variant="destructive">Delete</Button>

<Button size="lg">Large Button</Button>

<Button fullWidth>Submit</Button>

<Button loading>Saving...</Button>

3.2 Button Props
Prop	Type	Default	Description
variant	"primary" | "secondary" | "ghost" | "destructive"	"primary"	Visual style
size	"sm" | "md" | "lg"	"md"	Button size
loading	boolean	false	Shows spinner
disabled	boolean	false	Disables button
fullWidth	boolean	false	Expands button to 100%
children	ReactNode	—	Button label
onClick	() => void	—	Click handler
3.3 Button Component Code
import React from "react";
import Spinner from "./Spinner";
import "../css/Button.css";

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
  const classes = `
    btn
    btn--${variant}
    btn--${size}
    ${fullWidth ? "btn--full" : ""}
    ${loading ? "btn--loading" : ""}
    ${disabled ? "btn--disabled" : ""}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <span className="btn__spinner-wrapper">
          <Spinner size="sm" variant={variant === "primary" ? "primary" : "secondary"} />
        </span>
      )}
      <span className="btn__label">{children}</span>
    </button>
  );
}

🔄 4. Spinner Component
4.1 Spinner Usage
import Spinner from "@/components/rachanaUI/ui/Spinner";

<Spinner />                     // default
<Spinner size="sm" />           // small
<Spinner size="lg" />           // large
<Spinner variant="secondary" /> // different color
<Spinner variant="success" />   // green

4.2 Spinner Props
Prop	Type	Default	Description
size	"xs" | "sm" | "md" | "lg" | "xl"	"md"	Size of loader
variant	"primary" | "secondary" | "success" | "error" | "warning" | "neutral"	"primary"	Color theme
className	string	—	Custom styling
style	React.CSSProperties	—	Inline styles
4.3 Spinner Component Code
import React from "react";
import "../css/Spinner.css";

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

📦 5. Best Practices
✔ Always import BrandSetting.css once globally
✔ Never hardcode colors; always use design tokens
✔ Use variants to maintain consistent UI
✔ Use loading state in buttons with spinner
✔ Spinner inherits theme automatically (light/dark)
✔ Keep components small and composable