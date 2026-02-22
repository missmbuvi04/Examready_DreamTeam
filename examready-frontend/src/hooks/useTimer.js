import { useState, useEffect } from "react";

/**
 * useTimer
 * @param {number} initialSeconds - starting countdown value
 * @param {boolean} active        - whether the timer should be running
 * @param {Function} onExpire     - callback fired when timer hits 0
 */
function useTimer(initialSeconds, active, onExpire) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, initialSeconds, onExpire]);

  const formatted = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  return { seconds, formatted };
}

export default useTimer;
