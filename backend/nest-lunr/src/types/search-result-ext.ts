import type { SearchResult } from './search-result';
import type { MatchDataExt } from './match-data-ext';

export interface SearchResultExt extends SearchResult {
  /**
   * The namespace you have searched in
   */
  ns?: string;
  /**
   * A cloned collection of metadata associated with this document.
   */
  matchData: MatchDataExt;

  data?: any;
}
