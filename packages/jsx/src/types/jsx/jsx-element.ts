import type { JsxComponent, JsxChildren } from "./index.js";
import type { JsxFragment } from "../../jsx-fragment.js";

export interface JsxElement {
  tag: typeof JsxFragment | string | JsxComponent<any>;
  props: object | null;
  children: JsxChildren[];
}
