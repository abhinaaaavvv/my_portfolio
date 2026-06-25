import { useEffect, useState } from "react";

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const App = () => {
  const [localTime, setLocalTime] = useState(() =>
    timeFormatter.format(new Date()),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLocalTime(timeFormatter.format(new Date()));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen w-full px-6 py-16 sm:px-8 sm:py-14 md:px-10 md:py-20 lg:px-12 lg:py-16">
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
            className="underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            india.
          </a>
        </p>
        <p className="pb-4 text-stone-400">{localTime} local time</p>
        <p>
          <a
            href="mailto:abhi.sarkar.anu@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            abhi.sarkar.anu@gmail.com
          </a>
          <span className="mx-1 text-stone-400"> | </span>
          <a
            href="https://discord.com/users/1396207633073180762"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            discord
          </a>
          <span className="mx-1 text-stone-400"> | </span>
          <a
            href="https://github.com/abhinaaaavvv/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            github
          </a>
          <span className="mx-1 text-stone-400"> | </span>
          <a
            href="https://www.instagram.com/abhinaaaavvv._/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            instagram
          </a>
          <span className="mx-1 text-stone-400"> | </span>
          <a
            href="https://www.linkedin.com/in/abhinavsarkar-bangalore/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            linkedin
          </a>
          <span className="mx-1 text-stone-400"> | </span>
          <a
            href="https://www.reddit.com/user/Beautiful_Tap_5717/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            reddit
          </a>
          <span className="mx-1 text-stone-400"> | </span>
          <a
            href="https://x.com/abhinaaaavvv"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-[#141414]"
          >
            x.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
