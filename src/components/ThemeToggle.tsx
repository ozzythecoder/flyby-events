"use client";

import { useThemeContext } from "@/context/theme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle(props: {
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    const root = document.getElementsByTagName("body")[0];
    root.classList.toggle("dark");
    if (root.classList.contains("dark")) {
      setTheme("dark");
      document.cookie = "theme=dark";
    } else {
      setTheme("light");
      document.cookie = "theme=light";
    }
  };

  return (
    <button onClick={toggleTheme} {...props}>
      {theme === "dark" ? (
        <Moon className="text-primary-800 hover:text-primary-950 hover:scale-125 transition-all" />
      ) : (
        <Sun className="text-primary-800 hover:text-primary-950 hover:scale-125 transition-all" />
      )}
    </button>
  );
}
