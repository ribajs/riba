import type { Observer } from "../observer.js";

export interface FormatterObservers {
  [key: string]: {
    [key: string]: Observer;
  };
}
