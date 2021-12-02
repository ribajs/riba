import { Bindable } from "../types";
import { View } from "../view";
import { Binder } from "../binder";
import { times, camelCase } from "@ribajs/utils";

/**
 * each-*
 * Appends bound instances of the element in place for each item in the array.
 */
export class EachStarBinder extends Binder<any[], HTMLElement> {
  static key = "each-*";
  static block = true;
  priority = 4000;

  iterated: View[] = [];

  bind(el: HTMLElement) {
    if (!this.marker) {
      this.marker = window?.document?.createComment(` riba: ${this.type} `);
      if (!el.parentNode?.insertBefore || !this.marker) {
        // console.warn('No parent node!');
      } else {
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      }
    } else {
      this.iterated.forEach((view: View) => {
        view.bind();
      });
    }
  }

  unbind() {
    if (this.iterated) {
      this.iterated.forEach((view: View) => {
        view.unbind();
      });
    }
  }

  routine(el: HTMLElement, collection: any[]) {
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

      let view = this.iterated[index];

      if (!view) {
        let previous: HTMLElement | Element | Node | undefined;

        if (this.iterated.length) {
          previous = this.iterated[this.iterated.length - 1].els[0];
        } else if (this.marker) {
          previous = this.marker;
        }

        if (!previous) {
          return;
        }
        view = View.create(this, scope, previous.nextSibling);
        this.iterated.push(view);
      } else {
        if (view.models[modelName] !== model) {
          // search for a view that matches the model
          let matchIndex;
          let nextView: View = this.iterated[index];
          for (
            let nextIndex = index + 1;
            nextIndex < this.iterated.length;
            nextIndex++
          ) {
            nextView = this.iterated[nextIndex];
            if (nextView.models[modelName] === model) {
              matchIndex = nextIndex;
              break;
            }
          }
          if (matchIndex !== undefined) {
            // model is in other position
            // TODO: consider avoiding the splice here by setting a flag
            // profile performance before implementing such change
            this.iterated.splice(matchIndex, 1);
            if (!this.marker || !this.marker.parentNode?.insertBefore) {
              throw new Error("Marker has no parent node");
            }
            if (nextView && nextView.els[0] && view.els[0]) {
              this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);
            }

            nextView.models[indexProp] = index;
          } else {
            // new model
            nextView = View.create(this, scope, view.els[0]);
          }
          this.iterated.splice(index, 0, nextView);
        } else {
          view.models[indexProp] = index;
        }
      }
    });

    if (this.iterated.length > collection.length) {
      times(this.iterated.length - collection.length, () => {
        const view = this.iterated.pop();
        if (!view) {
          throw new Error("view is undefined!");
        }
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
  }

  update(models: any) {
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

    this.iterated.forEach((view: View) => {
      view.update(data);
    });
  }
}
