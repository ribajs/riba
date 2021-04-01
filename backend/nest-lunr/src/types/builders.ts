import type { Builder } from 'lunr';

export interface Builders {
  [namespace: string]: Builder;
}
