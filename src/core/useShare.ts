export interface UseShareOptions {
  title?: string;
  files?: File[];
  text?: string;
  url?: string;
}

export function useShare(options: UseShareOptions = {}) {
  const navigator = window.navigator;
  const isSupported = !!navigator && "canShare" in navigator;
  const share = (
    overridOptions: UseShareOptions = {}
  ): Promise<void> | void => {
    if (isSupported) {
      const data = {
        ...options,
        ...overridOptions,
      };
      return navigator.share(data);
    }
  };
  return {
    share,
    isSupported,
  };
}
