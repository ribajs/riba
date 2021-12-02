import { Binder } from "../binder";
import { View } from "../view";

/**
 * template
 * Similar to rv-html but also binds the html with riba, so you can also use binders and components in this templates.
 */
export class TemplateBinder extends Binder<string, HTMLElement> {
  static key = "template";

  private nested?: View;

  bind(el: HTMLUnknownElement) {
    this.nested = new View(el, this.view.models, this.view.options);
  }

  routine(el: HTMLUnknownElement, value: string) {
    this.nested?.unbind();
    el.innerHTML = value ? value : "";
    this.nested = new View(el, this.view.models, this.view.options);
    this.nested?.bind();
  }

  unbind() {
    this.nested?.unbind();
  }

  update(models: any) {
    this.nested?.update(models);
  }
};
