import { IObserverSyncCallback } from '../../src/interfaces';
import { Observer } from '../../src/observer';

export interface IChange {
    [key: string]: Observer[];
}

export class Data {

    private attributes: {[key: string]: any};

    private change: IChange;

    constructor(attributes: {[key: string]: any}) {
        this.attributes = attributes || {};
        this.change = {};
    }

    public on(key: string, callback: Observer) {
        if (this.hasCallback(key, callback)) {
            return;
        }
        this.change[key] = this.change[key] || [];
        this.change[key].push(callback);
    }

    public hasCallback(key: string, callback: IObserverSyncCallback) {
        return this.indexOf(this.change[key], callback) !== -1;
    }

    public off(key: string, callback: IObserverSyncCallback) {
        const index = this.indexOf(this.change[key], callback);
        if (index !== -1) {
            this.change[key].splice(index, 1);
        }
    }

    public set(attributes: {[key: string]: any}) {
        let old;
        let key;

        for (key in attributes) {
            if (this.attributes[key]) {
                old = this.attributes[key];
                this.attributes[key] = attributes[key];
                if (this.get(key) !== old) {
                    this.alertCallbacks(key);
                }
            }
        }
    }

    public get(key: string) {
        return this.attributes[key];
    }

    public alertCallbacks(key: string) {
        if (!this.change[key]) {
            return;
        }

        for (const i in this.change[key]) {
            if (this.change[key][i]) {
                this.change[key][i].sync();
            }
        }
    }

    private indexOf<Type>(array: Array<Type>, value: Type) {
        array = array || [];
        if (array.indexOf) {
            return array.indexOf(value);
        }

        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }
}
