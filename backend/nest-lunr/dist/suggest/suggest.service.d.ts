export declare class SuggestService {
    protected dict: {
        [word: string]: number;
    };
    protected dictStore: any;
    protected alphabet: string[];
    protected noop(): void;
    protected isEmpty(obj: any): boolean;
    setStorage(dictStore: any): void;
    protected store(cb: () => void): void;
    protected train(corpus: string, regex?: RegExp): void;
    protected edits(word: string, alphabetOverride: string[]): any[];
    protected order(candidates: any, min: number, max: number): any[];
    reset(): void;
    load(corpus?: string | {
        [word: string]: number;
    }, opts?: {
        corpus?: string | {
            [word: string]: number;
        };
        reset?: boolean;
        store?: boolean;
        after_store?: () => void;
    }): void;
    addWord(word: string, opts?: number | string | {
        count?: number;
        store?: boolean;
        score?: number;
        corpus?: string;
        done?: () => void;
    }): void;
    removeWord(word: string, opts?: {
        store?: boolean;
        done?: () => void;
    }): void;
    suggest(word: string, alphabet?: string[]): any[];
    lucky(word: string, alphabet?: string[]): string;
    export(): any;
}
