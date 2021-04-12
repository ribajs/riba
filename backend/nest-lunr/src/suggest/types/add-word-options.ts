export interface AddWordOptions {
  /** Number of times the word appears in a text, defaults to one */
  count?: number;
  /** Decide if you want to use storage */
  store?: boolean;
  score?: number;
  /** Function to call back when store is done */
  done?: () => void;
}
