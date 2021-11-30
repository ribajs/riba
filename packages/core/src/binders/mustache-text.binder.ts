import { DataElement } from "../types";
import { Binder } from "../binder";

export class mustacheTextBinder extends Binder<string, DataElement> {
  name = "mustache-text";
  routine(node: DataElement, value: string) {
    node.data = value != null ? value : "";
  }
}
