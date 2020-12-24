import type { SharedContext } from "./shared-context";

declare global {
  interface Window {
    ssr: SharedContext;
  }
}
export {};
