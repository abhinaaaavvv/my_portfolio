"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

let time = "";

if (typeof window !== "undefined") {
  time = formatter.format(new Date());
}

const subscribe = (onChange: () => void) => {
  const id = window.setInterval(() => {
    time = formatter.format(new Date());
    onChange();
  }, 1000);
  return () => window.clearInterval(id);
};

const getSnapshot = () => {
  if (time === "") {
    time = formatter.format(new Date());
  }
  return time;
};

const getServerSnapshot = () => "";

export const LocalTime = () => {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!current) return null;

  return <>{current} local time</>;
};
