import { Dictionary } from './dictionary';

export interface LoadOptions {
  /** Corpus string to initialize to */
  corpus?: string | Dictionary;
  /** Whether you want to reset the existing dictionary or just append to what already exists */
  reset?: boolean;
  /** Decide if you want to use storage */
  store?: boolean;
  /** Function to call back when store is done */
  afterStore?: () => void;
}
