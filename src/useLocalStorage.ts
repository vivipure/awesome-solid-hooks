import { createSignal } from "solid-js";
import type { Accessor, Setter } from "solid-js/types/reactive/signal";

export function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [Accessor<T>, (v: Parameters<Setter<T>>[0]) => void] {
  const item = localStorage.getItem(key);
  let value: any = initialValue;
  if (item) {
    try {
      value = JSON.parse(item);
    } catch {
      value = item;
    }
  }

  const [storedValue, setStoredValue] = createSignal<T>(value);

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
  return [storedValue, setValue];
}
