"use client";

import type { ReactNode } from "react";

type Link = {
  href: string;
  label: string;
};

const links: Link[] = [
  { href: "mailto:abhi.sarkar.anu@gmail.com", label: "abhi.sarkar.anu@gmail.com" },
  { href: "https://discord.com/users/1396207633073180762", label: "discord" },
  { href: "https://github.com/abhinaaaavvv/", label: "github" },
  { href: "https://www.instagram.com/abhinaaaavvv._/", label: "instagram" },
  { href: "https://www.linkedin.com/in/abhinavsarkar-bangalore/", label: "linkedin" },
  { href: "https://www.reddit.com/user/Beautiful_Tap_5717/", label: "reddit" },
  { href: "https://x.com/abhinaaaavvv", label: "x.com" },
];

const linkClass =
  "underline decoration-(--link-underline) underline-offset-4 transition-[text-decoration-color] hover:decoration-(--link-underline-hover)";

export const Links = () => {
  const result: ReactNode[] = [];

  links.forEach((link, i) => {
    if (i > 0) {
      result.push(
        <span key={`sep-${i}`} className="mx-1 opacity-60">
          {" "}
          |{" "}
        </span>,
      );
    }
    result.push(
      <a
        key={link.href}
        href={link.href}
        target="_blank"
        rel="noreferrer"
        className={linkClass}
      >
        {link.label}
      </a>,
    );
  });

  return <>{result}</>;
};
