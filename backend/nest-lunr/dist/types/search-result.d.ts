import type { Index } from 'lunr';
export interface SearchResult extends Index.Result {
    ns: string;
}
