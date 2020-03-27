import { Binder } from "../interfaces";
import { View } from "../view";

/**
 * template
 * Similar to rv-html but also binds the html with riba, so you can also use binders and componentes in this templates.
 */
export const templateBinder: Binder<string> = {
  name: "template",
  bind(el: HTMLUnknownElement) {
    this.customData = {
      nested: new View(el, this.view.models, this.view.options)
    };
  },
  routine(el: HTMLUnknownElement, value: string) {
    this.customData.nested?.unbind();
    el.innerHTML = value ? value : "";
    this.customData.nested = new View(el, this.view.models, this.view.options);
    this.customData.nested?.bind();
  },
  unbind() {
    this.customData.nested?.unbind();
  },
  update(models) {
    this.customData.nested?.update(models);
  }
};
