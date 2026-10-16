import { useEffect, useState } from "react";

export const TAAPE_EXPIRES_AT = new Date("2026-11-01T00:00:00+07:00").getTime();

/** A shared expiry clock also restores pages left open after the exhibition. */
export const useTaapeActive = () => {
  const [active, setActive] = useState(() => Date.now() < TAAPE_EXPIRES_AT);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const check = () => {
      const remaining = TAAPE_EXPIRES_AT - Date.now();
      setActive(remaining > 0);
      if (remaining > 0) timer = setTimeout(check, Math.min(remaining, 86400000));
    };
    check();
    return () => clearTimeout(timer);
  }, []);

  return active;
};