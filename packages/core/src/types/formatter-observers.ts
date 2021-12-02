import type { Observer } from "../observer";

export interface FormatterObservers {
  [key: string]: {
    [key: string]: Observer;
  };
}
