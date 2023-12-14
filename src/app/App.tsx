"use client";

import { useThemeContext } from "@/context/theme";

export default function App({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();

  return (
    <html className={theme}>
      {children}
    </html>
  )
}