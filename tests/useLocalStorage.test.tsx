import { describe, expect, it } from "vitest";
import { useLocalStorage } from "../src/core/useLocalStorage";

import { render } from "solid-testing-library";

describe("useLocalStorage", () => {
  it("retrieves an exist value from localStorage", () => {
    localStorage.setItem("test", "foo");
    let value;
    render(() => {
      const [storageValue] = useLocalStorage("test");
      value = storageValue();
      return <div></div>;
    });
    expect(value).toBe("foo");
  });

  it("should return initial value if localStorage empty and set that to localStorage", () => {
    const initValue = "foo";
    let value;
    render(() => {
      const [storageValue] = useLocalStorage("test1", initValue);
      value = storageValue();
      return <div></div>;
    });
    expect(value).toBe(initValue);
    expect(localStorage.getItem("test")).toBe(initValue);
  });

  it("should prefer existing value over initial value", () => {
    localStorage.setItem("test2", "bar");
    let value;
    render(() => {
      const [storageValue] = useLocalStorage("test2", "baz");
      value = storageValue();
      return <div></div>;
    });

    expect(value).toBe("bar");
  });

  it("existing value not change if set initial value", () => {
    localStorage.setItem("test3", "bar");
    render(() => {
      const [] = useLocalStorage("test3", "baz");
      return <div></div>;
    });

    expect(localStorage.getItem("test3")).toBe("bar");
  });

  it("correctly update value", () => {
    let value = () => {};
    render(() => {
      const [storageValue, setStorageValue] = useLocalStorage("test4", "baz");
      value = storageValue;
      setStorageValue("foo");

      return <div></div>;
    });
    expect(value()).toBe("foo");
  });

  it("correctly update storage value", () => {
    render(() => {
      const [, setStorageValue] = useLocalStorage("test5", "baz");
      setStorageValue("foo");
      return <div></div>;
    });
    expect(localStorage.getItem("test5")).toEqual('"foo"');
  });

  it("existing object vlaue return object by default ", () => {
    localStorage.setItem("test6", JSON.stringify({ foo: "bar" }));
    let value = () => {};

    render(() => {
      const [storageValue] = useLocalStorage("test6");
      value = storageValue;
      return <div></div>;
    });

    expect(value()).toBeTypeOf("object");
    expect(value()).toEqual({ foo: "bar" });
  });

  it("existing object vlaue return string if options.raw is true ", () => {
    localStorage.setItem("test7", JSON.stringify({ foo: "bar" }));
    let value = () => {};

    render(() => {
      const [storageValue] = useLocalStorage("test7", null, { raw: true });
      value = storageValue;
      return <div></div>;
    });

    expect(value()).toBeTypeOf("string");
    expect(value()).toBe(JSON.stringify({ foo: "bar" }))
  });

  it("existing object vlaue return object if options.raw is false ", () => {
    localStorage.setItem("test8", JSON.stringify({ foo: "bar" }));
    let value = () => {};

    render(() => {
      const [storageValue] = useLocalStorage("test8", null, { raw: false });

      value = storageValue;
      return <div></div>;
    });

    expect(value()).toBeTypeOf("object");
    expect(value()).toEqual({ foo: "bar" });
  });


  it("existing object vlaue return string if initial value is string", () => {
    localStorage.setItem("test9", JSON.stringify({ foo: "bar" }));
    let value = () => {};

    render(() => {
      const [storageValue] = useLocalStorage("test9", "1111");

      value = storageValue;
      return <div></div>;
    });

    expect(value()).toBeTypeOf("string");
    expect(value()).toEqual(JSON.stringify({ foo: "bar" }));
  });
});
