/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Adapters,
  Root,
  Key,
  ObserverSyncCallback,
  Obj,
  Options,
} from "./interfaces";
import { isObject } from "@ribajs/utils/src/type";

export class Observer {
  public static adapters: Adapters;
  public static interfaces: string[] = [];
  public static rootInterface: Root;

  public static updateOptions(options: Partial<Options>): void {
    if (!options.adapters) {
      throw new Error("adapters are required!");
    }

    if (options.adapters) {
      Observer.adapters = { ...Observer.adapters, ...options.adapters };
      Observer.interfaces = Object.keys(Observer.adapters);
    }

    Observer.rootInterface = options.rootInterface || Observer.interfaces[0];

    if (!Observer.rootInterface) {
      throw new Error("rootInterface is required!");
    }
  }

  /**
   * Tokenizes the provided keypath string into interface + path tokens for the
   * observer to work with.
   */
  public static tokenize(keypath: string, root: Root): any[] {
    const tokens: any[] = [];
    let current: Key = { i: root, path: "" };
    let index: number;
    let chr: string;

    for (index = 0; index < keypath.length; index++) {
      chr = keypath.charAt(index);
      if (~Observer.interfaces.indexOf(chr)) {
        tokens.push(current);
        current = { i: chr, path: "" };
      } else {
        current.path += chr;
      }
    }
    tokens.push(current);
    return tokens;
  }

  public keypath: string;
  public callback: ObserverSyncCallback;
  public objectPath: Obj[];
  public obj: Obj;
  public target: Obj;
  public key: Key;
  public tokens: Key[];

  /**
   * Constructs a new keypath observer and kicks things off.
   * @param obj
   * @param keypath
   * @param callback
   */
  constructor(obj: Obj, keypath: string, callback: ObserverSyncCallback) {
    this.keypath = keypath;
    this.callback = callback;
    this.objectPath = [];
    const parseResult = this.parse();
    this.key = parseResult.key;
    this.tokens = parseResult.tokens;
    this.obj = this.getRootObject(obj);
    this.target = this.realize();
    if (isObject(this.target)) {
      this.set(true, this.key, this.target, this.callback);
    }
  }

  /**
   * Parses the keypath using the interfaces defined on the view. Sets variables
   * for the tokenized keypath as well as the end key.
   */
  public parse() {
    let path: string;
    let root: Root;

    if (!Observer.interfaces || !Observer.interfaces.length) {
      throw new Error(
        `[Observer] Must define at least one adapter interface. interfaces: "${JSON.stringify(
          Observer.interfaces
        )}" adapters: "${JSON.stringify(Observer.adapters)}"`
      );
    }

    if (~Observer.interfaces.indexOf(this.keypath[0])) {
      root = this.keypath[0];
      path = this.keypath.substr(1);
    } else {
      root = Observer.rootInterface;
      path = this.keypath;
    }

    this.tokens = Observer.tokenize(path, root);

    if (!this.tokens.length) {
      throw new Error("[Observer] No tokens");
    }

    this.key = this.tokens.pop() as Key;

    return {
      key: this.key,
      tokens: this.tokens,
    };
  }

  /**
   * Realizes the full keypath, attaching observers for every key and correcting
   * old observers to any changed objects in the keypath.
   */
  public realize() {
    let current: Obj = this.obj;
    let unreached = -1;
    let prev;
    let token;

    for (let index = 0; index < this.tokens.length; index++) {
      token = this.tokens[index];
      if (isObject(current)) {
        if (typeof this.objectPath[index] !== "undefined") {
          prev = this.objectPath[index];
          if (current !== prev) {
            this.set(false, token, prev, this);
            this.set(true, token, current, this);
            this.objectPath[index] = current;
          }
        } else {
          this.set(true, token, current, this);
          this.objectPath[index] = current;
        }
        current = this.get(token, current);
      } else {
        if (unreached === -1) {
          unreached = index;
        }
        prev = this.objectPath[index];
        if (prev) {
          this.set(false, token, prev, this);
        }
      }
    }
    if (unreached !== -1) {
      this.objectPath.splice(unreached);
    }
    return current;
  }

  /**
   * Updates the keypath. This is called when any intermediary key is changed.
   */
  public sync() {
    let oldValue;
    let newValue;
    const next = this.realize();
    if (next !== this.target) {
      if (isObject(this.target)) {
        this.set(false, this.key, this.target, this.callback);
      }

      if (isObject(next)) {
        this.set(true, this.key, next, this.callback);
      }

      oldValue = this.value();
      this.target = next;
      newValue = this.value();
      if (newValue !== oldValue || Array.isArray(newValue)) {
        this.callback.sync();
      }
    } else if (Array.isArray(next)) {
      this.callback.sync();
    }
  }

  /**
   * Reads the current end value of the observed keypath. Returns undefined if
   * the full keypath is unreachable.
   */
  public value() {
    if (isObject(this.target)) {
      return this.get(this.key, this.target);
    }
  }

  /**
   * Sets the current end value of the observed keypath. Calling setValue when
   *  the full keypath is unreachable is a no-op.
   * @param value
   */
  public setValue(value: any) {
    if (isObject(this.target)) {
      Observer.adapters[this.key.i].set(this.target, this.key.path, value);
    }
  }

  /**
   * Gets the provided key on an object.
   * @param key
   * @param obj
   */
  public get(key: Key, obj: Obj) {
    return Observer.adapters[key.i].get(obj, key.path);
  }

  /**
   * Observes or unobserves a callback on the object using the provided key.
   * @param active
   * @param key
   * @param obj
   * @param callback
   */
  public set(
    active: boolean,
    key: Key,
    obj: Obj,
    callback: ObserverSyncCallback
  ) {
    if (active) {
      Observer.adapters[key.i].observe(obj, key.path, callback);
    } else {
      Observer.adapters[key.i].unobserve(obj, key.path, callback);
    }
  }

  /**
   * Unobserves the entire keypath.
   */
  public unobserve() {
    let obj: Obj;
    let token;

    for (let index = 0; index < this.tokens.length; index++) {
      token = this.tokens[index];
      obj = this.objectPath[index];
      if (obj) {
        this.set(false, token, obj, this);
      }
    }

    if (isObject(this.target)) {
      this.set(false, this.key, this.target, this.callback);
    }
  }

  /**
   * traverse the scope chain to find the scope which has the root property
   * if the property is not found in chain, returns the root scope
   * @param obj
   */
  public getRootObject(obj: Obj) {
    let rootProp;
    let current;
    if (!obj.$parent) {
      return obj;
    }

    if (this.tokens.length) {
      rootProp = this.tokens[0].path;
    } else {
      rootProp = this.key.path;
    }

    current = obj;
    while (current.$parent && current[rootProp] === undefined) {
      current = current.$parent;
    }
    return current;
  }
}
