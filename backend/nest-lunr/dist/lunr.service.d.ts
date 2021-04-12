import * as lunr from 'lunr';
import type { Builder, Index } from 'lunr';
import type { CreateOptions, Builders, Indices, SearchResultExt, Data, SortedPositionItem } from './types';
export declare class LunrService {
    static lunr: typeof lunr;
    protected builders: Builders;
    protected indices: Indices;
    protected data: Data;
    protected getData(ns: string, resultRef: string): any;
    protected getSortedPositions(metadata: SearchResultExt['matchData']['metadata']): SortedPositionItem[];
    protected insertAt(target: string, insert: string, position: number): string;
    protected highlightResult(result: SearchResultExt): SearchResultExt;
    protected highlightResults(results: SearchResultExt[]): SearchResultExt[];
    getRef(ns?: string): string;
    getOptions(ns?: string): CreateOptions;
    create(namespace?: string, options?: CreateOptions): Builder;
    buildIndex(namespace: string): Index;
    getBuilder(namespace: string): Builder;
    getIndex(namespace: string): Index;
    getNamespaces(): string[];
    add(ns: string, doc: any, attributes?: {
        boost?: number;
    }): void;
    build(ns: string): Index;
    use(ns: string, plugin: Builder.Plugin, ...args: any[]): void;
    search(ns: string, query: string): SearchResultExt[];
    searchAll(query: string): SearchResultExt[];
}
