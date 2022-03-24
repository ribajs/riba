import type { ScopeBase } from "@ribajs/core";
import type { Dataset } from "./index.js";
import type { SearchComponent } from "../components/search/search.component.js";

export interface NavbarComponentScope extends ScopeBase<{ dataset: Dataset }> {
  searchEl?: SearchComponent;
  searchHasFocus: boolean;
}
