import { type Theme, themes } from "@/definitions/themes"

export const validateTheme = (themeInput: string | undefined, defaultTheme: Theme): Theme => {
  return themes.find(theme => theme === themeInput) ?? defaultTheme;
}