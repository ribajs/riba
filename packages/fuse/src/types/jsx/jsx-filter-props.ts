import type { JsxHtmlGlobalProps } from "@ribajs/jsx/src/index.js";
import type Fuse from "fuse.js";

export type JsxFuseSearchProps<T = any, F = any> = JsxHtmlGlobalProps & {
  [key in "items" | "rv-items" | "rv-co-items"]?: string | T[];
} & {
  options?: string | Fuse.IFuseOptions<F>;
  limit?: number;
  "search-pattern"?: string | Fuse.Expression;
};
