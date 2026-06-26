"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export const LocalTime = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatter.format(new Date()));
    const id = window.setInterval(() => {
      setTime(formatter.format(new Date()));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (time === null) return null;

  return <>{time} local time</>;
};
