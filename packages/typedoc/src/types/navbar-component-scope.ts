import type { SearchComponent } from "../components/search/search.component";

export interface NavbarComponentScope {
  searchEl?: SearchComponent;
  searchHasFocus: boolean;
}
