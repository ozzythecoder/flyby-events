"use client";

import { useThemeContext } from "@/context/theme";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useThemeContext();
  return <div className={theme === "dark" ? "dark" : ""}>{children}</div>;
}
