import type { SearchResult } from './search-result';
import type { MatchDataExt } from './match-data-ext';
export interface SearchResultExt extends SearchResult {
    ns?: string;
    matchData: MatchDataExt;
    data?: any;
}
