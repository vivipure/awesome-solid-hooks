import {  onCleanup } from "solid-js";

export function useEvent(
  target: Element | Node | Window | Document,
  eventName: string,
  handler: (e?: any) => boolean | void,
  options?: AddEventListenerOptions
) {
  if (!target || !handler) return;

  target.addEventListener(eventName, handler, options);
  const removeHandle = () => {
    target.removeEventListener(eventName, handler, options);
  };
  onCleanup(() => {
    removeHandle();
  });

  return removeHandle
}
