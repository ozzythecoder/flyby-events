"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type Theme = "light" | "dark";

interface IThemeContext {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeContextProvider = ({
  children,
  initTheme,
}: {
  children: React.ReactNode;
  initTheme?: Theme | undefined;
}) => {
  const [theme, setTheme] = useState<Theme>(initTheme ?? "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
