import type { Expression, IFuseOptions, FuseResult } from "fuse.js";
import type { FuseSearchComponent } from "../components/search/search.component.js";

export interface FuseSearchComponentScope<T = any, F = any> {
  items: T[];
  searchPattern: string | Expression;
  options: IFuseOptions<F>;
  limit: number;
  results: FuseResult<T>[];
  search: FuseSearchComponent["search"];
}
