import { IBindable, ITwoWayBinder } from '../interfaces';
import { BinderWrapper } from '../services/binder.service';
import { View } from '../view';
import { Utils } from '../services/utils';

export const eachStarBinder: ITwoWayBinder<any[]> = {
  block: true,
  priority: 4000,

  bind(el: HTMLElement) {
    if (!this.marker) {
      this.marker = document.createComment(` riba: ${this.type} `);
      this.customData = {
        iterated: <View[]> [],
      };
      if (!el.parentNode) {
        // console.warn('No parent node!');
      } else {
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      }
    } else {
      this.customData.iterated.forEach((view: View)  => {
        view.bind();
      });
    }
  },

  unbind(el) {
    if (this.customData.iterated) {
      this.customData.iterated.forEach((view: View) => {
        view.unbind();
      });
    }
  },

  routine(el, collection) {
    if (this.args === null) {
      throw new Error('args is null');
    }
    const modelName = this.args[0] as string;
    collection = collection || [];

    // TODO support object keys to iterate over
    if (!Array.isArray(collection)) {
      throw new Error('each-' + modelName + ' needs an array to iterate over, but it is');
    }

    // if index name is seted by `index-property` use this name, otherwise `%[modelName]%`
    const indexProp = el.getAttribute('index-property') || this.getIterationAlias(modelName);

    collection.forEach((model, index) => {
      const scope: any = {$parent: this.view.models};
      scope[indexProp] = index;
      scope[modelName] = model;
      let view = this.customData.iterated[index];

      if (!view) {
        let previous: Comment | HTMLElement;

        if (this.customData.iterated.length) {
          previous = this.customData.iterated[this.customData.iterated.length - 1].els[0];
        } else if (this.marker) {
          previous = this.marker;
        } else {
          throw new Error('previous not defined');
        }

        view = View.create(this, scope, previous.nextSibling);
        this.customData.iterated.push(view);
      } else {
        if (view.models[modelName] !== model) {
          // search for a view that matches the model
          let matchIndex;
          let nextView;
          for (let nextIndex = index + 1; nextIndex < this.customData.iterated.length; nextIndex++) {
            nextView = this.customData.iterated[nextIndex];
            if (nextView.models[modelName] === model) {
              matchIndex = nextIndex;
              break;
            }
          }
          if (matchIndex !== undefined) {
            // model is in other position
            // todo: consider avoiding the splice here by setting a flag
            // profile performance before implementing such change
            this.customData.iterated.splice(matchIndex, 1);
            if (!this.marker || !this.marker.parentNode) {
              throw new Error('Marker has no parent node');
            }
            this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);
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
      Utils.times(this.customData.iterated.length - collection.length, () => {
        const view = this.customData.iterated.pop();
        view.unbind();
        if (!this.marker || !this.marker.parentNode) {
          throw new Error('Marker has no parent node');
        }
        this.marker.parentNode.removeChild(view.els[0]);
      });
    }

    if (el.nodeName === 'OPTION' && this.view.bindings) {
      this.view.bindings.forEach((binding: IBindable) => {
        if (this.marker && (binding.el === this.marker.parentNode) && (binding.type === 'value') && binding.sync) {
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
        throw new Error('args is null');
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

/**
 * each-*
 * Appends bound instances of the element in place for each item in the array.
 */
export const eachStarBinderWrapper: BinderWrapper = () => {
  const name = 'each-*';

  return {
    binder: eachStarBinder,
    name,
  };
};
