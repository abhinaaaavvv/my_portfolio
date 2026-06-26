"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
};

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [hasStored, setHasStored] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) {
      setTheme(stored);
      setHasStored(true);
    } else {
      setTheme(getSystemTheme());
    }
  }, []);

  useEffect(() => {
    const [light, dark] =
      theme === "light" ? ["#f1ece9", "#141414"] : ["#141414", "#f1ece9"];

    const root = document.documentElement;
    root.style.setProperty("--light", light);
    root.style.setProperty("--dark", dark);
    root.style.setProperty(
      "--link-underline",
      `color-mix(in srgb, ${dark} 25%, ${light})`,
    );
    root.style.setProperty("--link-underline-hover", dark);
    root.style.backgroundColor = light;
    root.style.color = dark;
    root.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (hasStored || typeof window === "undefined" || !window.matchMedia)
      return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [hasStored]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
    setHasStored(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
