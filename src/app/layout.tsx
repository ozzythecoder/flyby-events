import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { ThemeContextProvider } from "@/context/theme";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initTheme = cookies().get("theme");

  return (
    <ThemeContextProvider initTheme={initTheme?.value}>
      <ClerkProvider>
        <html lang="en">
          <body className={initTheme?.value}>{children}</body>
        </html>
      </ClerkProvider>
    </ThemeContextProvider>
  );
}
