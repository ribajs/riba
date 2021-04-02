import * as lunr from 'lunr';
import type { Builder, Index } from 'lunr';
import type { CreateOptions, Builders, Indices, SearchResult } from './types';
export declare class LunrService {
    static lunr: typeof lunr;
    protected builders: Builders;
    protected indices: Indices;
    create(namespace?: string, options?: CreateOptions): Builder;
    buildIndex(namespace: string): Index;
    getBuilder(namespace: string): Builder;
    getIndex(namespace: string): Index;
    getNamespaces(): string[];
    search(ns: string, query: string): SearchResult[];
    searchAll(query: string): SearchResult[];
}
