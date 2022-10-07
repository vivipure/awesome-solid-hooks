import { createSignal } from "solid-js";
import { useEvent } from "./useEvent";

interface MouseOptions {
  /**
   * Mouse position based by  page or client
   * @default page
   * */
  type?: "page" | "client" | "screen";
}

export function useMouse(options: MouseOptions = {}) {
  const { type = "page" } = options;

  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);

  const handler = (event: MouseEvent) => {
    if (type === "page") {
      setX(event.pageX);
      setY(event.pageY);
      return;
    }

    if (type === "client") {
      setX(event.clientX);
      setY(event.clientY);
      return;
    }

    if (type === "screen") {
      setX(event.screenX);
      setY(event.screenY);
    }
  };
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive
  useEvent(window, 'mousemove', handler, {
    passive: true,
  });
  return {
    x,
    y,
  };
}
