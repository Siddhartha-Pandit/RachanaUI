import { useState, useEffect } from "react";
import { initializeTheme, setTheme } from "./theme";
import type { Theme } from "./theme";
import Button from "../ui/Button";
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
      <Button onClick={() => changeTheme("light")}>Light</Button>
      <Button onClick={() => changeTheme("dark")}>Dark</Button>
      <Button onClick={() => changeTheme("system")}>System</Button>
    </div>
  );
}
