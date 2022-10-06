import { createSignal } from "solid-js";
import type { Accessor, Setter } from "solid-js/types/reactive/signal";

interface OptionInterface {
  /**
   * get raw value,not deserialize
   * 
   * @default false
   * */
  raw: boolean;
}

export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
  options: OptionInterface = {
    raw: false,
  }
): [Accessor<T>, (v: Parameters<Setter<T>>[0]) => void, () => void] {
  const initialize = (key: string) => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue) {
      const rawCondition = initialValue && typeof initialValue === "string";
      if (rawCondition || options.raw) {
        return localStorageValue;
      }
      try {
        return JSON.parse(localStorageValue);
      } catch {
        return localStorageValue;
      }
    }
    return initialValue;
  };

  const [storedValue, setStoredValue] = createSignal<T>(initialize(key));

  const setValue = (value: Parameters<Setter<T>>[0]) => {
    try {
      // support function callback
      const valueToStore =
        value instanceof Function ? value(storedValue()) : value;

      localStorage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  const remove = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(null as any);
    } catch {}
  };

  return [storedValue, setValue, remove];
}
