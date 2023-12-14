"use client";

import { useThemeContext } from "@/context/theme";
import { Sun, Moon } from "lucide-react";
import { setCookie } from "@/actions/cookie";

export default function ThemeToggle(props: {
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const { theme, setTheme } = useThemeContext();
  // HARD-CODED:
  const newTheme = theme === "dark" ? "light" : "dark";

  const setCookieWithTheme = setCookie.bind(null, newTheme);

  const toggleTheme = () => {
    setTheme(newTheme);
    setCookieWithTheme();
  };

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      {...props}
    >
      {theme === "light" ? (
        <Moon className="text-primary-800 hover:text-primary-950 hover:scale-125 transition-all" />
      ) : (
        <Sun className="text-primary-800 hover:text-primary-950 hover:scale-125 transition-all" />
      )}
    </button>
  );
}
