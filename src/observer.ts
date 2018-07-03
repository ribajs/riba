
import { IAdapters } from './adapter';
import { isObject } from './utils';
import { IViewOptions } from './tinybind';

export interface IObserverSyncCallback {
  sync: () => void;
}
export interface IKey {
  path: any;
  i: Root;
}

export interface IObservers {
  [key: string]: Observer;
}

export type Obj = any;

export type Root = any;

export class Observer {
  keypath: string;
  callback: IObserverSyncCallback;
  objectPath: Obj[];
  obj: Obj;
  target: Obj;
  key: IKey;
  tokens: IKey[];

  static adapters: IAdapters;
  static interfaces: string[];
  static rootInterface: Root;

  /**
   * Constructs a new keypath observer and kicks things off.
   * @param obj 
   * @param keypath 
   * @param callback 
   */
  constructor(obj: Obj, keypath: string, callback: IObserverSyncCallback) {
    
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

  static updateOptions = function(options: IViewOptions) {
    Observer.adapters = options.adapters;
    Observer.interfaces = Object.keys(Observer.adapters);
    Observer.rootInterface = options.rootInterface;
  }
  
  /**
   * Tokenizes the provided keypath string into interface + path tokens for the
   * observer to work with.
   */
  static tokenize = function(keypath: string, root: Root) {
    var tokens: any[] = [];
    var current: IKey = {i: root, path: ''};
    var index: number;
    var chr: string;
  
    for (index = 0; index < keypath.length; index++) {
      chr = keypath.charAt(index);
  
      if (!!~Observer.interfaces.indexOf(chr)) {
        tokens.push(current);
        current = {i: chr, path: ''};
      } else {
        current.path += chr;
      }
    }
  
    tokens.push(current);
    return tokens;
  }
  
  /**
   * Parses the keypath using the interfaces defined on the view. Sets variables
   * for the tokenized keypath as well as the end key.
   */
  parse() {
    var path: string;
    var root: Root;
  
    if (!Observer.interfaces.length) {
      new Error('[Observer] Must define at least one adapter interface.');
    }
  
    if (!!~Observer.interfaces.indexOf(this.keypath[0])) {
      root = this.keypath[0];
      path = this.keypath.substr(1);
    } else {
      root = Observer.rootInterface;
      path = this.keypath;
    }
  
    this.tokens = Observer.tokenize(path, root);

    if(!this.tokens.length) {
      new Error('[Observer] No tokens');
    }

    this.key = (this.tokens.pop() as IKey);
    
    return {
      key: this.key,
      tokens: this.tokens,
    }
  }
  
  /**
   * Realizes the full keypath, attaching observers for every key and correcting
   * old observers to any changed objects in the keypath.
   */
  realize() {
    var current: Obj = this.obj
    var unreached = -1
    var prev
    var token
  
    for (let index = 0; index < this.tokens.length; index++) {
      token = this.tokens[index]
      if (isObject(current)) {
        if (typeof this.objectPath[index] !== 'undefined') {
          if (current !== (prev = this.objectPath[index])) {
            this.set(false, token, prev, this)
            this.set(true, token, current, this)
            this.objectPath[index] = current
          }
        } else {
          this.set(true, token, current, this)
          this.objectPath[index] = current
        }
  
        current = this.get(token, current)
      } else {
        if (unreached === -1) {
          unreached = index
        }
  
        if (prev = this.objectPath[index]) {
          this.set(false, token, prev, this)
        }
      }
    }
  
    if (unreached !== -1) {
      this.objectPath.splice(unreached)
    }
  
    return current
  }
  
  /**
   * Updates the keypath. This is called when any intermediary key is changed.
   */
  sync() {
    var next, oldValue, newValue
  
    if ((next = this.realize()) !== this.target) {
      if (isObject(this.target)) {
        this.set(false, this.key, this.target, this.callback)
      }
  
      if (isObject(next)) {
        this.set(true, this.key, next, this.callback)
      }
  
      oldValue = this.value()
      this.target = next
      newValue = this.value()
      if (newValue !== oldValue || newValue instanceof Function) this.callback.sync()
    } else if (next instanceof Array) {
      this.callback.sync()
    }
  }
  
  /**
   * Reads the current end value of the observed keypath. Returns undefined if
   * the full keypath is unreachable.
   */
  value() {
    if (isObject(this.target)) {
      return this.get(this.key, this.target)
    }
  }
  
  /**
   * Sets the current end value of the observed keypath. Calling setValue when
   *  the full keypath is unreachable is a no-op.
   * @param value 
   */
  setValue(value: any) {
    if (isObject(this.target)) {
      Observer.adapters[this.key.i].set(this.target, this.key.path, value)
    }
  }
  
  /**
   * Gets the provided key on an object.
   * @param key 
   * @param obj 
   */
  get(key: IKey, obj: Obj) {
    return Observer.adapters[key.i].get(obj, key.path)
  }
  
  /**
   * Observes or unobserves a callback on the object using the provided key.
   * @param active 
   * @param key 
   * @param obj 
   * @param callback 
   */
  set(active: boolean, key: IKey, obj: Obj, callback: IObserverSyncCallback) {
    if(active) {
      Observer.adapters[key.i].observe(obj, key.path, callback)
    } else {
      Observer.adapters[key.i].unobserve(obj, key.path, callback)
    }
  }
  
  /**
   * Unobserves the entire keypath.
   */
  unobserve() {
    var obj: Obj;
    var token;
  
    for (let index = 0; index < this.tokens.length; index++) {
      token = this.tokens[index]
      if (obj = this.objectPath[index]) {
        this.set(false, token, obj, this)
      }
    }
  
    if (isObject(this.target)) {
      this.set(false, this.key, this.target, this.callback)
    }
  }

  /**
   * traverse the scope chain to find the scope which has the root property
   * if the property is not found in chain, returns the root scope
   * @param obj 
   */
  getRootObject(obj: Obj) {
    var rootProp, current;
    if (!obj.$parent) {
      return obj;
    }
  
    if (this.tokens.length) {
      rootProp = this.tokens[0].path
    } else {
      rootProp = this.key.path
    }
  
    current = obj;
    while (current.$parent && (current[rootProp] === undefined)) {
      current = current.$parent
    }
  
    return current;
  }
}
