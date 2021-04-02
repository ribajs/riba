import type { Index } from 'lunr';

/**
 * A result contains details of a document matching a search query.
 */
export interface SearchResult extends Index.Result {
  /**
   * The namespace you have searched in
   */
  ns: string;
}
