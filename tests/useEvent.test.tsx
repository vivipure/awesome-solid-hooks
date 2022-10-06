import { onMount } from "solid-js";
import { fireEvent, render } from "solid-testing-library";
import { describe, expect, it } from "vitest";
import { useEvent } from "../src/useEvent";

describe("useEvent", () => {
  it("event bind successful", async () => {
    let clickTimes = 0;
    const { container, unmount } = render(() => {
      let divRef: HTMLDivElement | undefined;
      onMount(() => {
        useEvent(divRef!, "click", () => {
          clickTimes++;
        });
      });
      return <div id="test" ref={divRef}></div>;
    });
    const dom = container.querySelector("#test") as HTMLElement;
    fireEvent.click(dom);
    expect(clickTimes).toBe(1);
    fireEvent.click(dom);
    expect(clickTimes).toBe(2);
    unmount()
  });

  it("event unbind successful", async () => {
    let clickTimes = 0;
    const { container, unmount } = render(() => {
      let divRef: HTMLDivElement | undefined;
      onMount(() => {
        useEvent(divRef!, "click", () => {
          clickTimes++;
        });
      });
      return <div id="test" ref={divRef}></div>;
    });
    const dom = container.querySelector("#test") as HTMLElement;
    fireEvent.click(dom);
    expect(clickTimes).toBe(1);
    unmount()
    fireEvent.click(dom);
    expect(clickTimes).toBe(1)
  });
});
