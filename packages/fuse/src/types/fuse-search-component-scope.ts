import type Fuse from "fuse.js";
import type { FuseSearchComponent } from "../components/search/search.component.js";

export interface FuseSearchComponentScope<T = any, F = any> {
  items: T[];
  searchPattern: string | Fuse.Expression;
  options: Fuse.IFuseOptions<F>;
  limit: number;
  results: Fuse.FuseResult<T>[];
  search: FuseSearchComponent["search"];
}
