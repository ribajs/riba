import type { SearchResult } from ".";
import type { SearchComponent } from "../components/search/search.component";
import type { NavbarComponent } from "../components/navbar/navbar.component";

export interface SearchComponentScope {
  /** The base url of the remote search server */
  serverBaseUrl: string;
  /** `true` as log as we are waiting for the search response */
  isLoading: boolean;
  /** `true` if the search response has an error */
  hasFailure: boolean;
  /** `true` if the result is ready (is not loading and has no failure) */
  isReady: boolean;
  /** Array of the the search result items */
  results: SearchResult[];
  /** The search query */
  query: string;
  preventPress: boolean;
  /** Reference to the search input field element */
  fieldEl?: HTMLInputElement;
  /** Reference to the search results container element */
  resultsEl?: HTMLElement;
  /** Reference to the navbar element in which the search is placed */
  navbarEl?: NavbarComponent;
  setFocus: SearchComponent["setFocus"];
  onFocus: SearchComponent["onFocus"];
  onBlur: SearchComponent["onBlur"];
  onInput: SearchComponent["onInput"];
  onKeydown: SearchComponent["onKeydown"];
  onKeypress: SearchComponent["onKeypress"];
  onSearchResultHover: SearchComponent["onSearchResultHover"];
  onSearchResultClick: SearchComponent["onSearchResultClick"];
}
