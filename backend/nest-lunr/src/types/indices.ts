import type { Index } from 'lunr';

export interface Indices {
  [namespace: string]: Index;
}
