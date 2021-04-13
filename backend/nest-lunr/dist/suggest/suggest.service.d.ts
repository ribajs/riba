import { SuggestByNamespace, Storage, Dictionary, LoadOptions, AddWordOptions, RemoveWordOptions, SuggestResultExt } from './types';
import { Suggest } from './suggest';
export declare class SuggestService {
    protected suggests: SuggestByNamespace;
    create(ns: string, storage?: Storage): Suggest;
    get(ns: string): Suggest;
    getNamespaces(): string[];
    ignore(ns: string, ignoreWords: string | string[]): void;
    reset(ns: string): void;
    load(ns: string, corpus?: string | Dictionary, opts?: LoadOptions): void;
    addWord(ns: string, word: string, opts?: number | string | AddWordOptions): void;
    removeWord(ns: string, word: string, opts?: RemoveWordOptions): void;
    suggest(ns: string, word: string, alphabet?: string[]): import("./types").SuggestResult[];
    suggestAll(word: string, alphabet?: string[]): SuggestResultExt[];
    lucky(ns: string, word: string, alphabet?: string[]): string;
    luckyAll(word: string, alphabet?: string[]): string;
    export(ns: string): {
        corpus: Dictionary;
    };
}
