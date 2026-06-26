"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { LocalTime } from "@/components/local-time";
import { Links } from "@/components/links";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed right-5 top-5 z-10 inline-flex border px-3 py-1 leading-none transition-opacity hover:opacity-70 sm:right-8 sm:top-8"
      aria-label={`Switch to ${next} mode`}
      aria-pressed={theme === "dark"}
    >
      {next} mode
    </button>
  );
};

const Content = () => (
  <div className="mx-auto w-full max-w-3xl p-4 sm:p-6 md:p-8 lg:p-10">
    <p className="pb-4">hey, this is <a href="https://www.linkedin.com/in/abhinavsarkar-bangalore/" className="underline decoration-(--link-underline) underline-offset-4 transition-[text-decoration-color] hover:decoration-(--link-underline-hover)" target="_blank" rel="noreferrer">abhinav</a>,</p>
    <p className="pb-4">i make cool stuff...or more like i want to.</p>
    <p className="pb-4">i&aposm 17</p>
    <p className="pb-4">
      i build things, sometimes they work mostly they break, either ways, i
      learn something.
    </p>
    <p className="pb-4">
      thanks to a fictional character who is crazy rich and smart and escaped
      from a cave, i was convinced that engineering is fun and ever since then i
      found my interest in tech and entrepreneurship.
    </p>
    <p className="pb-4">
      im a full stack developer, video editor, full time overthinker and an
      amibitious kid.
    </p>
    <p className="pb-4">
      in the past year i learnt web/app development, agentic ai, linux, video
      editing, mun, basketball, trading and e comm and theres another list of
      things i wanna learn.
    </p>
    <p className="pb-4">
      {" "}
      so yeah, i don&apost really have a niche. i love learning and i collect
      skills like infinity stones.
    </p>
    <p className="pb-4">
      i&aposm currently building projects, studying startups, binge watching
      podcasts, learning new stuff along with surviving 12th isc and trying to
      become the kind of engineer my 10 y/o self would&aposve thought was fictional.
    </p>
    <p className="pb-4">
      i belive engineering is the closest thing to having a superpower, i mean u
      can literally build anything you want from scratch.
    </p>
    <p className="pb-4">
      i don&apost dream about getting a job, i dream about building a company people
      wish existed.
    </p>
    <p className="pb-4">
      if something doesn&apost exist, i&aposll probably try making it.
    </p>
    <p className="pb-4">
      still figuring everything out. and that&aposs the fun part.
    </p>
    <p className="pb-4">
      <a
        href="https://maps.app.goo.gl/JuB4mwM1AEpRkM8B8"
        target="_blank"
        rel="noreferrer"
        className="underline decoration-(--link-underline) underline-offset-4 transition-[text-decoration-color] hover:decoration-(--link-underline-hover)"
      >
        india.
      </a>
    </p>
    <p className="pb-4 opacity-60">
      <LocalTime />
    </p>
    <p>
      <Links />
    </p>
  </div>
);

const App = () => (
  <ThemeProvider>
    <div className="min-h-screen w-full px-6 py-16 sm:px-8 sm:py-14 md:px-10 md:py-20 lg:px-12 lg:py-16">
      <ThemeToggle />
      <Content />
      <SpeedInsights />
      <Analytics />
    </div>
  </ThemeProvider>
);

export default App;
