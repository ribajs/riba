import { Dictionary, Storage, LoadOptions, AddWordOptions, RemoveWordOptions, SuggestResult } from './types';
export declare class Suggest {
    protected dict: Dictionary;
    protected dictStore: Storage;
    protected alphabet: string[];
    protected noop(): void;
    protected isEmpty(obj: any): boolean;
    protected store(cb: () => void): void;
    protected train(corpus: string, regex?: RegExp): void;
    protected edits(word: string, alphabetOverride: string[]): any[];
    protected order(candidates: any, min: number, max: number): any[];
    constructor(dictStore?: Storage);
    reset(): void;
    load(corpus?: string | Dictionary, opts?: LoadOptions): void;
    addWord(word: string, opts?: number | string | AddWordOptions): void;
    removeWord(word: string, opts?: RemoveWordOptions): void;
    suggest(word: string, alphabet?: string[]): SuggestResult[];
    lucky(word: string, alphabet?: string[]): string;
    export(): {
        corpus: Dictionary;
    };
}
