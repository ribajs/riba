import { BinderDeprecated, DataElement } from "../types";

export const mustacheTextBinder: BinderDeprecated<string, DataElement> = {
  name: "mustache-text",
  routine: (node: DataElement, value: string) => {
    node.data = value != null ? value : "";
  },
};
