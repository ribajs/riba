export const withUrl = async <T>(url: string, run: () => T | Promise<T>) => {
  const originalUrl = window.location.href;
  (globalThis as any).jsdom?.reconfigure?.({ url });
  try {
    return await run();
  } finally {
    (globalThis as any).jsdom?.reconfigure?.({ url: originalUrl });
  }
};
