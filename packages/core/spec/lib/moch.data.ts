import { IObserverSyncCallback } from '../../src/interfaces'

export class Data {

    private attributes: {[key: string]: any};

    constructor(attributes: {[key: string]: any}) {
        this.attributes = attributes || {};
        this.change = {};
    }

    public on(key: string, callback: IObserverSyncCallback) {
        if (this.hasCallback(key, callback)) {
            return;
        }
        const ref = this.change[key] || (this.change[key] = []);
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

        for (let i in this.change[key]) {
            if (this.change[key][i]) {
                this.change[key][i].sync(this.get(key));
            }
        }
    }

    private indexOf(array: Array<any>, value: any) {
        array = array || [];
        if (array.indexOf) {
            return array.indexOf(value);
        }

        for (let i in array || {}) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }
}
