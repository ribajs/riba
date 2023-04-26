import { JsxElement } from "@ribajs/jsx";

export type TemplateFunction = () =>
  | Promise<JsxElement | HTMLElement | string | null>
  | JsxElement
  | HTMLElement
  | string
  | null;
