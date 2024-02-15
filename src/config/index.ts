import { Theme } from "@/definitions/themes";

type AppConfig = {
  dev: boolean;
  default_theme: Theme;
};

export const config: AppConfig = {
  dev: process.env.NODE_ENV === "development",
  default_theme: "dark",
};
