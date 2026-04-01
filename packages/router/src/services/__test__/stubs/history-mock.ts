import { vi } from "vitest";

export const installHistoryMocks = () => {
  const pushes: string[] = [];
  const replaces: string[] = [];
  const pushSpy = vi
    .spyOn(window.history, "pushState")
    .mockImplementation(
      (state: any, unused: string, url?: string | URL | null) => {
        if (typeof url === "string") {
          pushes.push(url);
        } else if (url instanceof URL) {
          pushes.push(url.toString());
        }
      },
    );
  const replaceSpy = vi
    .spyOn(window.history, "replaceState")
    .mockImplementation(
      (state: any, unused: string, url?: string | URL | null) => {
        if (typeof url === "string") {
          replaces.push(url);
        } else if (url instanceof URL) {
          replaces.push(url.toString());
        }
      },
    );
  return {
    pushes,
    replaces,
    pushSpy,
    replaceSpy,
  };
};
