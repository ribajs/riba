import {
  BinderDeprecated,
  View,
  handleizeFormatter,
  FormatterFn,
} from "@ribajs/core";
import { isObject } from "@ribajs/utils/src/type";
import { Pjax, HideShowTransition } from "../services";

const handleize = handleizeFormatter.read as FormatterFn;

/**
 * Loads a url with pjax and show them inside the element this binder is used on
 */
export const viewStaticBinder: BinderDeprecated<string> = {
  name: "view-static",
  block: true,

  bind() {
    if (!this.customData) {
      this.customData = {
        nested: null,
      };
    }
  },

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

    if (this.customData.nested) {
      this.customData.nested.unbind();
    }
    this.customData.nested = new View(
      response.container,
      this.view.models,
      this.view.options
    );
    this.customData.nested.bind();
  },

  unbind() {
    if (this.customData.nested) {
      this.customData.nested.unbind();
    }
    delete this.customData;
  },
};
