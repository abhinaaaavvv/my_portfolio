import { useEffect, useState, type CSSProperties } from "react";
import { Analytics } from "@vercel/analytics/react";

type Theme = "light" | "dark";
type ThemeStyle = CSSProperties &
  Record<
    "--light" | "--dark" | "--link-underline" | "--link-underline-hover",
    string
  >;
type ThemeState = { theme: Theme; hasStoredTheme: boolean };

const THEME_STORAGE_KEY = "portfolio-theme";

const themeStyles: Record<Theme, ThemeStyle> = {
  light: {
    "--light": "#f1ece9",
    "--dark": "#141414",
    "--link-underline": "color-mix(in srgb, var(--dark) 25%, var(--light))",
    "--link-underline-hover": "var(--dark)",
    backgroundColor: "var(--light)",
    color: "var(--dark)",
    colorScheme: "light",
  },
  dark: {
    "--light": "#141414",
    "--dark": "#f1ece9",
    "--link-underline": "color-mix(in srgb, var(--dark) 35%, var(--light))",
    "--link-underline-hover": "var(--dark)",
    backgroundColor: "var(--light)",
    color: "var(--dark)",
    colorScheme: "dark",
  },
};

const linkClassName =
  "text-inherit underline decoration-[var(--link-underline)] underline-offset-4 transition-colors hover:decoration-[var(--link-underline-hover)]";

const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
};

const getSystemTheme = (): Theme => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialThemeState = (): ThemeState => {
  const storedTheme = getStoredTheme();

  return {
    theme: storedTheme ?? getSystemTheme(),
    hasStoredTheme: storedTheme !== null,
  };
};

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const App = () => {
  const [{ theme, hasStoredTheme }, setThemeState] =
    useState<ThemeState>(getInitialThemeState);
  const [localTime, setLocalTime] = useState(() =>
    timeFormatter.format(new Date()),
  );

  const isDarkMode = theme === "dark";
  const nextTheme = isDarkMode ? "light" : "dark";

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLocalTime(timeFormatter.format(new Date()));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--light",
      themeStyles[theme]["--light"],
    );
    document.documentElement.style.setProperty(
      "--dark",
      themeStyles[theme]["--dark"],
    );
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (hasStoredTheme || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (event: MediaQueryListEvent) => {
      setThemeState({
        theme: event.matches ? "dark" : "light",
        hasStoredTheme: false,
      });
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, [hasStoredTheme]);

  const handleThemeToggle = () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setThemeState({ theme: nextTheme, hasStoredTheme: true });
  };

  return (
    <div
      className="min-h-screen w-full px-6 py-16 sm:px-8 sm:py-14 md:px-10 md:py-20 lg:px-12 lg:py-16"
      style={themeStyles[theme]}
    >
      <button
        type="button"
        onClick={handleThemeToggle}
        className="fixed right-5 top-5 z-10 inline-flex border px-3 py-1 leading-none transition-opacity hover:opacity-70 sm:right-8 sm:top-8"
        aria-label={`Switch to ${nextTheme} mode`}
        aria-pressed={isDarkMode}
      >
        {nextTheme} mode
      </button>
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-6 md:p-8 lg:p-10">
        <p className="pb-4">hey, this is abhinav,</p>
        <p className="pb-4">i make cool stuff...or more like i want to.</p>
        <p className="pb-4">i'm 17</p>
        <p className="pb-4">
          i build things, sometimes they work mostly they break, either ways, i
          learn something.
        </p>
        <p className="pb-4">
          thanks to a fictional character who is crazy rich and smart and
          escaped from a cave, i was convinced that engineering is fun and ever
          since then i found my interest in tech and entrepreneurship.
        </p>
        <p className="pb-4">
          im a full stack developer, video editor, full time overthinker and an
          amibitious kid.
        </p>
        <p className="pb-4">
          in the past year i learnt web/app development, agentic ai, linux,
          video editing, mun, basketball, trading and e comm and theres another
          list of things i wanna learn.
        </p>
        <p className="pb-4">
          {" "}
          so yeah, i don't really have a niche. i love learning and i collect
          skills like infinity stones.
        </p>
        <p className="pb-4">
          i'm currently building projects, studying startups, binge watching
          podcasts, learning new stuff along with surviving 12th isc and trying
          to become the kind of engineer my 10 y/o self would've thought was
          fictional.
        </p>
        <p className="pb-4">
          i belive engineering is the closest thing to having a superpower, i
          mean u can literally build anything you want from scratch.
        </p>
        <p className="pb-4">
          i don't dream about getting a job, i dream about building a company
          people wish existed.
        </p>
        <p className="pb-4">
          if something doesn't exist, i'll probably try making it.
        </p>
        <p className="pb-4">
          still figuring everything out. and that's the fun part.
        </p>
        <p className="pb-4">
          <a
            href="https://maps.app.goo.gl/JuB4mwM1AEpRkM8B8"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            india.
          </a>
        </p>
        <p className="pb-4 opacity-60">{localTime} local time</p>
        <p>
          <a
            href="mailto:abhi.sarkar.anu@gmail.com"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            abhi.sarkar.anu@gmail.com
          </a>
          <span className="mx-1 opacity-60"> | </span>
          <a
            href="https://discord.com/users/1396207633073180762"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            discord
          </a>
          <span className="mx-1 opacity-60"> | </span>
          <a
            href="https://github.com/abhinaaaavvv/"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            github
          </a>
          <span className="mx-1 opacity-60"> | </span>
          <a
            href="https://www.instagram.com/abhinaaaavvv._/"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            instagram
          </a>
          <span className="mx-1 opacity-60"> | </span>
          <a
            href="https://www.linkedin.com/in/abhinavsarkar-bangalore/"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            linkedin
          </a>
          <span className="mx-1 opacity-60"> | </span>
          <a
            href="https://www.reddit.com/user/Beautiful_Tap_5717/"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            reddit
          </a>
          <span className="mx-1 opacity-60"> | </span>
          <a
            href="https://x.com/abhinaaaavvv"
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            x.com
          </a>
        </p>
      </div>
      <Analytics />
    </div>
  );
};

export default App;
