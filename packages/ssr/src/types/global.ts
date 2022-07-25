import type { SharedContext } from "./shared-context.js";

declare global {
  interface Window {
    ssr: SharedContext;
  }
}
export {};
