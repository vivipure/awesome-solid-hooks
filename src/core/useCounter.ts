import { createSignal } from "solid-js";

const defaultOptions = {
  min: -Infinity,
  max: Infinity,
  step: 1,
};

export function useCounter(
  initialCount: number = 0,
  options?: {
    min?: number;
    max?: number;
    step?: number;
  }
) {
  const finalOptions = { ...defaultOptions };
  Object.assign(finalOptions, options || {});
  const max = finalOptions.max;
  const min = finalOptions.min;
  const step = finalOptions.step;

  const [count, setCount] = createSignal(initialCount);
  const set = (v: number) => {
    if (v > max) return;
    if (v < min) return;
    setCount(v);
  };

  const reset = () => {
    setCount(initialCount);
  };
  const inc = () => {
    if (count() === max) return;
    setCount((prev) => prev + step);
  };
  const dec = () => {
    if (count() === min) return;
    setCount((prev) => prev - step);
  };

  return {
    count,
    set,
    reset,
    inc,
    dec,
  };
}
