import type { Fields, Plugin } from '.';
import type { tokenizer, Pipeline } from 'lunr';
export interface CreateOptions {
    fields?: Fields | string[];
    invertedIndex?: object;
    documentTermFrequencies?: object;
    documentLengths?: object;
    tokenizer?: typeof tokenizer;
    pipeline?: Pipeline;
    searchPipeline?: Pipeline;
    documentCount?: number;
    b?: number;
    k1?: number;
    termIndex?: number;
    metadataWhitelist?: string[];
    ref?: string;
    plugins?: Plugin[];
}
