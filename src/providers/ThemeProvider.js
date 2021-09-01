import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { analytics } from "../firebase";
import localStorage from "../localstorage";

const ThemeContext = createContext({});

const THEME = "app-theme";
const LIGHT = "light";
const DARK = "dark";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.has(THEME) ? localStorage.get(THEME) : DARK
  );
  const switchTheme = useCallback(() => {
    setTheme((theme) => (theme === LIGHT ? DARK : LIGHT));
  }, [setTheme]);

  useEffect(() => {
    localStorage.set(THEME, theme);
    document.querySelector("body").classList =
      theme === LIGHT ? ["_light"] : ["_dark"];
    analytics.logEvent("theme", { theme });
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, isLightTheme: theme === LIGHT, switchTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
