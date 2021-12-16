import type { Cache } from "./cache.ts";

export interface Route {
  path: string[];
  component: string;
  meta?: any;
  cache?: Cache;
}
