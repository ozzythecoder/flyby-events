import clsx from "clsx";
import { Bebas_Neue, Maven_Pro } from "next/font/google";

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

export const fonts = clsx(mavenPro.variable, bebasNeue.variable);
