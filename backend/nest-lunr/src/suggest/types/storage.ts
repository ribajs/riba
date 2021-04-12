import { Dictionary } from './dictionary';

export interface Storage {
  get: () => Dictionary;
  store: (dict: Dictionary, cb?: () => void) => void;
}
