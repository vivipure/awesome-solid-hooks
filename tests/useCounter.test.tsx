import { render } from "solid-testing-library";
import { describe, expect, it } from "vitest";
import { useCounter } from "../src/core";

describe("useCounter", () => {
  it("count should be 0 when initCount is Empty", () => {
    let value;
    render(() => {
      const { count } = useCounter();
      value = count();
      return <div></div>;
    });
    expect(value).toBe(0);
  });

  it("count should be initCount when set initCount", () => {
    let initCount = 10;
    let value;
    render(() => {
      const { count } = useCounter(initCount);
      value = count();
      return <div></div>;
    });
    expect(value).toBe(initCount);
  });

  it("inc correctly increase count", () => {
    let value;
    render(() => {
      const { count, inc } = useCounter();
      inc();
      value = count();
      return <div></div>;
    });
    expect(value).toBe(1);
  });
  it("dec correctly decrease count", () => {
    let value;
    render(() => {
      const { count, dec } = useCounter();
      dec();
      value = count();
      return <div></div>;
    });
    expect(value).toBe(-1);
  });

  it("set correctly set count", () => {
    let targetValue = 10;
    let value;
    render(() => {
      const { count, set } = useCounter();
      set(targetValue);
      value = count();
      return <div></div>;
    });
    expect(value).toBe(targetValue);
  });

  it("reset correctly recover initial count", () => {
    let initCount = 10;
    let value1;
    let value2;
    render(() => {
      const { count, inc, reset } = useCounter(initCount);
      inc();
      inc();
      value1 = count();
      reset();
      value2 = count();

      return <div></div>;
    });
    expect(value1).toBe(initCount + 2);
    expect(value2).toBe(initCount);
  });

  it("setp correctly work", () => {
    let value = 0;
    let step = 3;
    let initialCount = 0
    render(() => {
      const { count, inc,  } = useCounter(initialCount, { step });
      inc();
      value = count();
      return <div></div>;
    });
    expect(value).toBe(initialCount + step);
  });
});
