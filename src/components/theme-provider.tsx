"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
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
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const resolveTheme = (): Theme => getStoredTheme() ?? getSystemTheme();

// External store for the theme. Reading localStorage / matchMedia during render
// is avoided; instead the value is cached here and updated via subscriptions.
let theme: Theme = "light";

if (typeof window !== "undefined") {
  theme = resolveTheme();
}

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  let mq: MediaQueryList | null = null;
  const handler = () => {
    // A user's explicit choice overrides system preference changes.
    if (getStoredTheme() !== null) return;
    const next = getSystemTheme();
    if (next !== theme) {
      theme = next;
      listeners.forEach((l) => l());
    }
  };
  if (typeof window !== "undefined" && window.matchMedia) {
    mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", handler);
  }

  return () => {
    if (mq) mq.removeEventListener("change", handler);
    listeners.delete(listener);
  };
};

const getSnapshot = (): Theme => theme;
const getServerSnapshot = (): Theme => "light";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeValue = useSyncExternalStore<Theme>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    const [light, dark] =
      themeValue === "light" ? ["#f1ece9", "#141414"] : ["#141414", "#f1ece9"];

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
    root.style.colorScheme = themeValue;
  }, [themeValue]);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors (e.g. private mode).
    }
    theme = next;
    listeners.forEach((l) => l());
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: themeValue, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
