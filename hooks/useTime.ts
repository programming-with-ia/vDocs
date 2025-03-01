import { useState, useEffect } from "react";

/**
 * Options for configuring the `useTime` hook.
 */
type UseTimeProps = {
  /** Update interval in milliseconds. */
  interval?: number;

  /** Function to skip updates based on custom logic. */
  ignoreUpdate?: (newDate: Date, oldDate: Date) => boolean;
};

/**
 * Hook to get the current date and time with customizable update logic.
 * @param {UseTimeProps} [options] - Configuration options for interval and update logic.
 * @returns {Date} Current date and time.
 * @public
 * @see [Documentation](https://programming-with-ia.github.io/vDocs/hooks/use-time)
 * @example
 * ```tsx
 * const time = useTime({ interval: 1000 });
 * console.log(time.toLocaleTimeString());
 * ```
 */
export const useTime = ({
  interval = 1000,
  ignoreUpdate = (newDate, oldDate) =>
    newDate.getMinutes() === oldDate.getMinutes(),
}: UseTimeProps = {}) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      if (!ignoreUpdate(date, time)) {
        setTime(date);
      }
    };

    const timerId = setInterval(tick, interval);

    return () => clearInterval(timerId);
  }, [interval, ignoreUpdate, time]);

  return time;
};
