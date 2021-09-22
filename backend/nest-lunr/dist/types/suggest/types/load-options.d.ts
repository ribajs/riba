import { Dictionary } from './dictionary';
export interface LoadOptions {
    corpus?: string | Dictionary;
    reset?: boolean;
    store?: boolean;
    afterStore?: () => void;
}
