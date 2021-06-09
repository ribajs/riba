import type { Fields, PluginOption } from '.';
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
    metadataAllowList?: string[];
    ref?: string;
    plugins?: PluginOption[];
    data?: {
        include?: boolean;
        highlight?: boolean;
    };
}
