import { Binder, View, handleizeFormatter, FormatterFn } from "@ribajs/core";
import { isObject } from "@ribajs/utils/src/type.js";
import { Pjax, HideShowTransition } from "../services/index.js";

const handleize = handleizeFormatter.read as FormatterFn;

/**
 * Loads a url with pjax and show them inside the element this binder is used on
 */
export class ViewStaticBinder extends Binder<string, HTMLAnchorElement> {
  static key = "view-static";
  static block = true;

  private nested: View | null = null;

  async routine(el: HTMLElement, options: any) {
    const wrapper = el;

    // Set default options
    options = options || {};
    options.listenAllLinks = false;
    options.listenPopstate = false;
    options.parseTitle = false;
    options.transition = options.transition || new HideShowTransition();
    options.viewId =
      options.viewId || el.getAttribute("id") || handleize(options.url);
    options.containerSelector = options.containerSelector || "[data-namespace]";
    options.changeBrowserUrl = false;

    const pjax = new Pjax(options);

    const { responsePromise } = await pjax.loadResponseCached(
      options.url,
      false,
      false
    );

    const response = await responsePromise;

    wrapper.replaceWith(response.container);

    response.container.style.visibility = "visible";

    // add the dataset to the model
    if (!isObject(this.view.models)) {
      this.view.models = {};
    }

    if (this.nested) {
      this.nested.unbind();
    }
    this.nested = new View(
      response.container,
      this.view.models,
      this.view.options
    );
    this.nested.bind();
  }

  unbind() {
    if (this.nested) {
      this.nested.unbind();
    }
  }
}
