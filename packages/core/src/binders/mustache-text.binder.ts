import { DataElement } from "../types/index.js";
import { Binder } from "../binder.js";

export class MustacheTextBinder extends Binder<string, DataElement> {
  static key = "mustache-text";
  routine(node: DataElement, value: string) {
    node.data = value != null ? value : "";
  }
}
