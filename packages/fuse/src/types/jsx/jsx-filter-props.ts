import type { JsxHtmlGlobalProps } from "@ribajs/jsx";
import type { Expression, IFuseOptions } from "fuse.js";

export type JsxFuseSearchProps<T = any, F = any> = JsxHtmlGlobalProps & {
  [key in "items" | "rv-items" | "rv-co-items"]?: string | T[];
} & {
  options?: string | IFuseOptions<F>;
  limit?: number;
  "search-pattern"?: string | Expression;
};
