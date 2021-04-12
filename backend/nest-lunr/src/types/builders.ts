import type { Builder } from 'lunr';
import type { CreateOptions } from './create-options';

export interface Builders {
  [namespace: string]: {
    builder?: Builder;
    options?: CreateOptions;
  };
}
