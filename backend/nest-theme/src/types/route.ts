import type { Cache } from './cache';

export interface Route {
  path: string[];
  component: string;
  meta?: any;
  cache?: Cache;
}
