"use client";

import { useEffect, useState } from "react";

function istTime(): string {
  const d = new Date();
  const ist = new Date(d.getTime() + (d.getTimezoneOffset() + 330) * 60000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(ist.getHours())}:${p(ist.getMinutes())}:${p(ist.getSeconds())} IST`;
}

/** Live-updating Manipal (IST) clock for the footer "CURRENTLY" block. */
export function ManipalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(istTime());
    const id = setInterval(() => setTime(istTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-ink">{time ?? "--:--:-- IST"}</span>;
}
