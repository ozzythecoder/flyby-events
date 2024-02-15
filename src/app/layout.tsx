import type { Metadata } from "next";
import { fonts } from "@/fonts";
import "./globals.css";
import ThemeWrapper from "@components/ThemeWrapper";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "FlyBy Events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html className={fonts}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </html>
    </Providers>
  );
}
