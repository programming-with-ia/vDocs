import { useState, useEffect } from "react";

/**
 * Battery manager information from the Battery Status API.
 */
type BatteryManager = {
  /** Current battery level (0 to 1). */
  level: number;
  /** Whether the device is currently charging. */
  charging: boolean;
  /** Time remaining until fully charged, in seconds. */
  chargingTime: number;
  /** Time remaining until fully discharged, in seconds. */
  dischargingTime: number;
  /** Add an event listener for battery events. */
  addEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | AddEventListenerOptions
  ): void;
  /** Remove an event listener for battery events. */
  removeEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | EventListenerOptions
  ): void;
};

/**
 * Battery state returned by the `useBattery` hook.
 */
type BatteryState = {
  /** Whether the Battery API is supported. */
  supported: boolean;
  /** Whether battery information is still loading. */
  loading: boolean;
  /** Current battery level (0 to 1) or null if unavailable. */
  level: number | null;
  /** Whether the device is charging or null if unavailable. */
  charging: boolean | null;
  /** Time remaining until fully charged, in seconds, or null if unavailable. */
  chargingTime: number | null;
  /** Time remaining until fully discharged, in seconds, or null if unavailable. */
  dischargingTime: number | null;
};

/**
 * Extension of Navigator to include the `getBattery` method.
 */
type NavigatorWithBattery = Navigator & {
  /** Method to retrieve battery information. */
  getBattery: () => Promise<BatteryManager>;
};

/**
 * Hook to monitor device battery status using the Battery Status API.
 * @returns {BatteryState} Current battery status information.
 * @public
 * @see [Documentation](https://programming-with-ia.github.io/vDocs/hooks/use-battery)
 * @example
 * ```tsx
 * const battery = useBattery();
 * console.log(battery.level, battery.charging);
 * ```
 */
export const useBattery = (): BatteryState => {
  const [batteryState, setBatteryState] = useState<BatteryState>({
    supported: false,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    const _navigator = navigator as NavigatorWithBattery;
    let battery: BatteryManager;

    const handleBatteryChange = () => {
      setBatteryState({
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      });
    };

    if (!_navigator.getBattery) {
      setBatteryState((batteryState) => ({
        ...batteryState,
        supported: false,
        loading: false,
      }));
      return;
    }

    _navigator.getBattery().then((_battery) => {
      battery = _battery;
      handleBatteryChange();

      _battery.addEventListener("levelchange", handleBatteryChange);
      _battery.addEventListener("chargingchange", handleBatteryChange);
      _battery.addEventListener("chargingtimechange", handleBatteryChange);
      _battery.addEventListener("dischargingtimechange", handleBatteryChange);
    });

    return () => {
      if (!battery) return;
      battery.removeEventListener("levelchange", handleBatteryChange);
      battery.removeEventListener("chargingchange", handleBatteryChange);
      battery.removeEventListener("chargingtimechange", handleBatteryChange);
      battery.removeEventListener("dischargingtimechange", handleBatteryChange);
    };
  }, []);

  return batteryState;
};
