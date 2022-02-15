import { JsxElement } from "./jsx-element";

export declare type JsxChildren =
  | JsxElement
  | string
  | number
  | null
  | undefined
  | JsxChildren[];
