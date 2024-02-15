"use client";

import { useThemeContext } from "@/lib/context/theme";

export default function App({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();

  return <body className={theme}>{children}</body>;
}
