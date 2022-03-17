import { JsxElement } from "./jsx-element.js";

export declare type JsxChildren =
  | JsxElement
  | string
  | number
  | null
  | undefined
  | JsxChildren[];
