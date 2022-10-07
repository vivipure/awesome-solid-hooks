import { createSignal } from "solid-js";
import Cookie from "js-cookie";

export function useCookie(key: string, initialValue?: string) {
  const cookieValue = Cookie.get(key) || initialValue;
  const [cookie, setCookie] = createSignal(cookieValue);

  const set = (cookie: string, options: Cookie.CookieAttributes) => {
    Cookie.set(key, cookie, options);
    setCookie(cookie);
  };
  const remove = () => {
    Cookie.remove(key);
    setCookie(undefined);
  };

  return [cookie, set, remove];
}
