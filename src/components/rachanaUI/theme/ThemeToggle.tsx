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
