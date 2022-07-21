import { JsxElement } from "@ribajs/jsx/src/index.js";

export type TemplateFunction = () =>
  | Promise<JsxElement | HTMLElement | string | null>
  | JsxElement
  | HTMLElement
  | string
  | null;
