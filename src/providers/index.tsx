import { ClerkProvider } from "@clerk/nextjs";
import { ThemeContextProvider } from "@/lib/context/theme";
import { validateTheme } from "@/lib/validateTheme";
import { config } from "@/config";
import { cookies } from "next/headers";

const DEFAULT_THEME = config.default_theme;

/**
 * Provides Clerk and Theme Contexts to the app.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const themeCookie = cookies().get("theme")?.value;
  const theme = validateTheme(themeCookie, DEFAULT_THEME);

  return (
    <ThemeContextProvider themeInput={theme}>
      <ClerkProvider>{children}</ClerkProvider>
    </ThemeContextProvider>
  );
}
