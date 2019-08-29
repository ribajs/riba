import { IAdapters, Root, IKey, IObserverSyncCallback, Obj, IViewOptions } from './interfaces';
export declare class Observer {
    static adapters: IAdapters;
    static interfaces: string[];
    static rootInterface: Root;
    static updateOptions(options: IViewOptions): void;
    /**
     * Tokenizes the provided keypath string into interface + path tokens for the
     * observer to work with.
     */
    static tokenize(keypath: string, root: Root): any[];
    keypath: string;
    callback: IObserverSyncCallback;
    objectPath: Obj[];
    obj: Obj;
    target: Obj;
    key: IKey;
    tokens: IKey[];
    /**
     * Constructs a new keypath observer and kicks things off.
     * @param obj
     * @param keypath
     * @param callback
     */
    constructor(obj: Obj, keypath: string, callback: IObserverSyncCallback);
    /**
     * Parses the keypath using the interfaces defined on the view. Sets variables
     * for the tokenized keypath as well as the end key.
     */
    parse(): {
        key: IKey;
        tokens: IKey[];
    };
    /**
     * Realizes the full keypath, attaching observers for every key and correcting
     * old observers to any changed objects in the keypath.
     */
    realize(): any;
    /**
     * Updates the keypath. This is called when any intermediary key is changed.
     */
    sync(): void;
    /**
     * Reads the current end value of the observed keypath. Returns undefined if
     * the full keypath is unreachable.
     */
    value(): any;
    /**
     * Sets the current end value of the observed keypath. Calling setValue when
     *  the full keypath is unreachable is a no-op.
     * @param value
     */
    setValue(value: any): void;
    /**
     * Gets the provided key on an object.
     * @param key
     * @param obj
     */
    get(key: IKey, obj: Obj): any;
    /**
     * Observes or unobserves a callback on the object using the provided key.
     * @param active
     * @param key
     * @param obj
     * @param callback
     */
    set(active: boolean, key: IKey, obj: Obj, callback: IObserverSyncCallback): void;
    /**
     * Unobserves the entire keypath.
     */
    unobserve(): void;
    /**
     * traverse the scope chain to find the scope which has the root property
     * if the property is not found in chain, returns the root scope
     * @param obj
     */
    getRootObject(obj: Obj): any;
}
