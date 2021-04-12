export interface RemoveWordOptions {
  /** Decide if you want to use storage */
  store?: boolean;
  /** Function to call back when store is done */
  done?: () => void;
}
