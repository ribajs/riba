/// <reference path="../keshi.d.ts" />
import Cache from "keshi";
import type { Storage } from "keshi";
import { get, set, keys, del, clear } from "idb-keyval";

export const idbStorage: Storage = {
  get,
  set,
  keys,
  del,
  clear: () => {
    return clear() as any;
  },
};

export const idbCache = new Cache({
  // Use default memory storage on ssr
  customStorage: (window as any).ssr ? undefined : idbStorage,
});
