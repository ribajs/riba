import type { SearchComponent } from "../components/search/search.component.js";

export interface NavbarComponentScope {
  searchEl?: SearchComponent;
  searchHasFocus: boolean;
}
