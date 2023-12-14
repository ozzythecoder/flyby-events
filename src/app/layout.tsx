import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeContextProvider } from "@/context/theme";
import { bebasNeue, mavenPro } from "@/fonts/fonts";
import "./globals.css";
import clsx from "clsx";
import { validateTheme } from "@/lib/validateTheme";
import App from "./App";

const DEFAULT_THEME = "dark";

export const metadata: Metadata = {
  title: "FlyBy Events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeCookie = cookies().get("theme")?.value;
  const theme = validateTheme(themeCookie, DEFAULT_THEME);

  return (
    <ThemeContextProvider themeInput={theme}>
      <ClerkProvider>
        <App>
          <body className={clsx(mavenPro.variable, bebasNeue.variable)}>
            {children}
          </body>
        </App>
      </ClerkProvider>
    </ThemeContextProvider>
  );
}
