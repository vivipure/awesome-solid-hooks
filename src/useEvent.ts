import { onCleanup } from "solid-js";
import type { EventType } from "solid-testing-library";

export function useEvent(
  target: Element | Node | Window | Document,
  eventName: EventType,
  handler: (e?: Event) => boolean | void
) {
  if (!target || !handler) return;

  target.addEventListener(eventName, handler);

  onCleanup(() => {
    target.removeEventListener(eventName, handler);
  });
}
