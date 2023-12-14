"use client";

import { type Theme } from "@/definitions/themes";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IThemeContext {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeContextProvider = ({
  children,
  themeInput,
}: {
  children: React.ReactNode;
  themeInput: Theme;
}) => {

  const [theme, setTheme] = useState<Theme>(themeInput);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
