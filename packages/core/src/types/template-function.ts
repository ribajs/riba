import { JsxElement } from "@ribajs/jsx";

export type TemplateFunction = () =>
  | Promise<HTMLElement | string | null>
  | JsxElement
  | HTMLElement
  | string
  | null;
