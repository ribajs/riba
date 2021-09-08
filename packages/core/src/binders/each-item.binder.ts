import { Bindable, Binder } from "../types";
import { View } from "../view";
import { times, camelCase } from "@ribajs/utils";

/**
 * each-*
 * Appends bound instances of the element in place for each item in the array.
 */
export const eachStarBinder: Binder<any[]> = {
  name: "each-*",
  block: true,
  priority: 4000,

  bind(el: HTMLElement) {
    if (!this.marker) {
      this.marker = document?.createComment(` riba: ${this.type} `);
      this.customData = {
        iterated: [] as View[],
      };
      if (!el.parentNode?.insertBefore || !this.marker) {
        // console.warn('No parent node!');
      } else {
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      }
    } else {
      this.customData.iterated.forEach((view: View) => {
        view.bind();
      });
    }
  },

  unbind() {
    if (this.customData.iterated) {
      this.customData.iterated.forEach((view: View) => {
        view.unbind();
      });
    }
  },

  routine(el, collection) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    let isObject = false;
    const modelName = camelCase(this.args[0].toString());
    collection = collection || [];

    // Transform object to array to iterate over
    if (
      !Array.isArray(collection) &&
      typeof collection === "object" &&
      collection !== null
    ) {
      console.debug("original collection", collection);
      collection = Object.entries(collection).map(([key, value]) => {
        return { key, value };
      });
      isObject = true;
      console.debug("converted collection", collection);
    }

    if (!Array.isArray(collection)) {
      throw new Error(
        `each-${
          this.args[0]
        } needs an array or object to iterate over, but it is ${typeof collection}`
      );
    }

    // if index name is set by `index-property` use this name, otherwise `%[modelName]%`
    const indexProp =
      el.getAttribute("index-property") || this.getIterationAlias(modelName);

    collection.forEach((model, index) => {
      const scope: any = { $parent: this.view.models };
      // Is object transformed to array
      if (isObject) {
        scope[indexProp] = model.key;
        scope[modelName] = model.value;
      }
      // Is Array
      else {
        scope[indexProp] = index;
        scope[modelName] = model;
      }
      let view = this.customData.iterated[index];

      if (!view) {
        let previous: Comment | HTMLElement | undefined;

        if (this.customData.iterated.length) {
          previous =
            this.customData.iterated[this.customData.iterated.length - 1]
              .els[0];
        } else if (this.marker) {
          previous = this.marker;
        }

        if (!previous) {
          return;
        }

        view = View.create(this, scope, previous.nextSibling);
        this.customData.iterated.push(view);
      } else {
        if (view.models[modelName] !== model) {
          // search for a view that matches the model
          let matchIndex;
          let nextView;
          for (
            let nextIndex = index + 1;
            nextIndex < this.customData.iterated.length;
            nextIndex++
          ) {
            nextView = this.customData.iterated[nextIndex];
            if (nextView.models[modelName] === model) {
              matchIndex = nextIndex;
              break;
            }
          }
          if (matchIndex !== undefined) {
            // model is in other position
            // TODO: consider avoiding the splice here by setting a flag
            // profile performance before implementing such change
            this.customData.iterated.splice(matchIndex, 1);
            if (!this.marker || !this.marker.parentNode?.insertBefore) {
              throw new Error("Marker has no parent node");
            }
            if (nextView.els[0] && view.els[0]) {
              this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);
            }

            nextView.models[indexProp] = index;
          } else {
            // new model
            nextView = View.create(this, scope, view.els[0]);
          }
          this.customData.iterated.splice(index, 0, nextView);
        } else {
          view.models[indexProp] = index;
        }
      }
    });

    if (this.customData.iterated.length > collection.length) {
      times(this.customData.iterated.length - collection.length, () => {
        const view = this.customData.iterated.pop();
        view.unbind();
        if (!this.marker || !this.marker.parentNode) {
          throw new Error("Marker has no parent node");
        }
        this.marker.parentNode.removeChild(view.els[0]);
      });
    }

    if (el.nodeName === "OPTION" && this.view.bindings) {
      this.view.bindings.forEach((binding: Bindable) => {
        if (
          this.marker &&
          binding.el === this.marker.parentNode &&
          binding.type === "value" &&
          binding.sync
        ) {
          binding.sync();
        }
      });
    }
  },

  update(models) {
    const data: any = {};
    // TODO: add test and fix if necessary
    Object.keys(models).forEach((key) => {
      if (this.args === null) {
        throw new Error("args is null");
      }
      if (key !== this.args[0]) {
        data[key] = models[key];
      }
    });

    this.customData.iterated.forEach((view: View) => {
      view.update(data);
    });
  },
};
