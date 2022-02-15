import type { JsxComponent, JsxChildren } from ".";
import type { JsxFragment } from "../../jsx-fragment";

export interface JsxElement {
  tag: typeof JsxFragment | string | JsxComponent<any>;
  props: object | null;
  children: JsxChildren[];
}
