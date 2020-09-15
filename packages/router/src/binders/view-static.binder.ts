import { Binder, View, handleizeFormatter, FormatterFn } from "@ribajs/core";
import { isObject } from "@ribajs/utils/src/type";
import { Pjax, HideShowTransition } from "../services";

const handleize = handleizeFormatter.read as FormatterFn;

/**
 * Loads a url with pjax and show them insite the element this binder is used on
 */
export const viewStaticBinder: Binder<string> = {
  name: "view-static",
  block: true,

  bind(/*el: HTMLElement*/) {
    if (!this.customData) {
      this.customData = {
        nested: null,
      };
    }
  },

  routine(el: HTMLElement, options: any) {
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

    // TODO use prefetch.loadResponseCached to use the cache
    const response = pjax.loadResponseCached(options.url);

    response.then((_response) => {
      wrapper.replaceWith(_response.container);

      _response.container.style.visibility = "visible";

      // add the dateset to the model
      if (!isObject(this.view.models)) {
        this.view.models = {};
      }

      // this.view.models.dataset = container.data();
      if (this.customData.nested) {
        this.customData.nested.unbind();
      }
      this.customData.nested = new View(
        _response.container,
        this.view.models,
        this.view.options
      );
      this.customData.nested.bind();
    });
  },

  unbind(/*el: HTMLUnknownElement*/) {
    if (this.customData.nested) {
      this.customData.nested.unbind();
    }
    delete this.customData;
  },
};
