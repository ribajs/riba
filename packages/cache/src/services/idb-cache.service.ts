import createCache from "keshi";
import type { Storage } from "keshi";
import { get, set, keys, del, clear } from "idb-keyval";

const idbStorage: Storage = {
  get,
  set,
  keys,
  del,
  clear: () => {
    return clear() as any;
  },
};
const idbCache = createCache({
  // Use default memory storage on ssr
  customStorage: (window as any).ssr ? undefined : idbStorage,
});

export { idbCache };
