import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Theme, ThemeContextProvider } from "@/context/theme";
import { dark as clerkDark } from "@clerk/themes";
import { Bebas_Neue, Maven_Pro } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas-neue",
});

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-maven-pro",
});

export const metadata: Metadata = {
  title: "FlyBy Events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initTheme = cookies().get("theme");

  return (
    <ThemeContextProvider initTheme={initTheme?.value as Theme}>
      <ClerkProvider
        appearance={{
          baseTheme: clerkDark,
        }}
      >
        <html lang="en">
          <body
            className={clsx(
              initTheme?.value,
              mavenPro.variable,
              bebasNeue.variable
            )}
          >
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ThemeContextProvider>
  );
}
