import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import localStorage from "../localstorage";

const ThemeContext = createContext({});

const THEME = "app-theme";
const LIGHT = "light";
const DARK = "dark";

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.has(THEME) ? localStorage.get(THEME) : LIGHT
  );
  const switchTheme = useCallback(() => {
    setTheme((theme) => (theme === LIGHT ? DARK : LIGHT));
  }, [setTheme]);

  useEffect(() => {
    localStorage.set(THEME, theme);
    navigator.serviceWorker &&
      navigator.serviceWorker.controller?.postMessage({ theme });
    document.querySelector("body").classList =
      theme === LIGHT ? ["_light"] : ["_dark"];
  }, [theme, navigator.serviceWorker]);

  return (
    <ThemeContext.Provider
      value={{ isLightTheme: theme === LIGHT, switchTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
