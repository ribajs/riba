import View from './view';
import { Observer } from './observer';
import { IView } from '../index';

export interface IBinding {
  view: View;
  el: HTMLElement;
  /**
   * Name of the binder without the prefix
   */
  type: string;
  binder: Binder<any>;
  formatters: string[];
  formatterObservers: any[];
  keypath: string;
  /**
   * Arguments parsed from star binders, e.g. on foo-*-* args[0] is the first star, args[1] the second-
   */
  args: string[];
  /**
   * 
   */
  model?: any;
  /**
   * HTML Comment to mark a binding in the DOM
   */
  marker: Comment;
  /**
   * just to have a value where we could store custom data
   */
  customData?: any;
  /**
   * Subscribes to the model for changes at the specified keypath. Bi-directional
   * routines will also listen for changes on the element to propagate them back
   * to the model.
   */
  bind: (element: HTMLElement) => void;
  /**
   * Returns an event handler for the binding around the supplied function.
   */
  eventHandler: (handler: (event: Event) => void) => () => any;
  /**
   * Applies all the current formatters to the supplied value and returns the
   * formatted value.
   */
  formattedValue: (value: any) => void;
  /**
   * Returns elements value
   */
  getValue?: (element: HTMLElement) => void;

  parseFormatterArguments: (args: any, formatterIndex: number) => any;

  parseTarget: () => void;
  /**
   * Publishes the value currently set on the input element back to the model.
   */
  publish: () => any | void;
  /**
   * Sets the value for the binding. This Basically just runs the binding routine
   * with the supplied value formatted.
   */
  set: (value: any) => void;
  /**
   * Syncs up the view binding with the model.
   */
  sync: () => void;
  /**
   * Unsubscribes from the model and the element.
   */
  unbind: () => void;
  /**
   * Updates the binding's model from what is currently set on the view. Unbinds
   * the old model first and then re-binds with the new model.
   */
  //update: (models: any) => void;
  update: (model: any) => void;
  /**
   * Observes the object keypath
   */
  observe: (obj: Object, keypath: string, callback: (newValue: any) => void) => Observer;
  
  /**
   * Get the iteration alias, used in the interation binders like `each-*`
   */
  getIterationAlias: (modelName: string) => string;
}

export interface IOneWayBinder<ValueType> {
  (this: IBinding, element: HTMLElement, value: ValueType): void;
}

export interface ITwoWayBinder<ValueType> {
  routine?: (this: IBinding, element: HTMLElement, value: ValueType) => void;
  bind: (this: IBinding, element: HTMLElement) => void;
  unbind?: (this: IBinding, element: HTMLElement) => void;
  update?: (this: IBinding, model: any) => void;
  getValue?: (this: IBinding, element: HTMLElement) => void;
  block?: boolean;
  function?: boolean;
  publishes?: boolean;
  priority?: number;
  /**
   * If you want to save custom data in this use this object
   */
  customData?: any;
}

export type Binder<ValueType> = IOneWayBinder<ValueType> | ITwoWayBinder<ValueType>

export interface IBinders {
  [name: string]: Binder<any>;
}

const getString = (value: string) => {
  return value != null ? value.toString() : undefined;
};

const times = (n: number, cb:() => void) => {
  for (let i = 0; i < n; i++) cb();
};

function createView(binding: IBinding, models: any, anchorEl: HTMLElement | Node | null) {
  let template = binding.el.cloneNode(true);
  let view = new View(template, models, binding.view.options);
  view.bind();
  if(binding.marker.parentNode === null) {
    throw new Error('No parent node for binding!');
  }

  binding.marker.parentNode.insertBefore(template, anchorEl);

  return view;
}

const binders: any /* TODO IBinders */ = {
  // Binds an event handler on the element.
  'on-*': <ITwoWayBinder<any>> {
    function: true,
    priority: 1000,

    bind(el) {
      if(!this.customData) {
        this.customData = {
          handler: null
        };
      }
    },

    unbind: function(el: HTMLElement) {
      if (this.customData.handler) {
        el.removeEventListener(this.args[0], this.customData);
      }
    },

    routine: function(el: HTMLElement, value: any /*TODO*/) {
      if (this.customData.handler) {
        el.removeEventListener(this.args[0], this.customData.handler);
      }

      this.customData.handler = this.eventHandler(value);
      el.addEventListener(this.args[0], this.customData.handler);
    }
  },

  // Appends bound instances of the element in place for each item in the array.
  'each-*': <ITwoWayBinder<any>> {
    block: true,

    priority: 4000,

    bind(el: HTMLElement) {
      if (!this.marker) {
        this.marker = document.createComment(` tinybind: ${this.type} `);
        this.customData = {
          iterated: <IView[]> []
        };
        if(!el.parentNode) {
          throw new Error('No parent node!');
        }
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else {
        this.customData.iterated.forEach((view: IView)  => {
          view.bind();
        });
      }
    },

    unbind(el) {
      if (this.customData.iterated) {
        this.customData.iterated.forEach((view: IView) => {
          view.unbind();
        });
      }
    },

    routine(el, collection) {
      let modelName = this.args[0];
      collection = collection || [];

      // TODO support object keys to iterate over
      if(!Array.isArray(collection)) {
        throw new Error('each-' + modelName + ' needs an array to iterate over, but it is');
      }

      // if index name is seted by `index-property` use this name, otherwise `%[modelName]%`  
      let indexProp = el.getAttribute('index-property') || this.getIterationAlias(modelName);

      collection.forEach((model, index) => {
        let scope: any = {$parent: this.view.models};
        scope[indexProp] = index;
        scope[modelName] = model;
        let view = this.customData.iterated[index];

        if (!view) {

          let previous: Comment | HTMLElement = this.marker;

          if (this.customData.iterated.length) {
            previous = this.customData.iterated[this.customData.iterated.length - 1].els[0];
          }

          view = createView(this, scope, previous.nextSibling);
          this.customData.iterated.push(view);
        } else {
          if (view.models[modelName] !== model) {
            // search for a view that matches the model
            let matchIndex, nextView;
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
              if(!this.marker.parentNode) {
                throw new Error('Marker has no parent node');
              }
              this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);
              nextView.models[indexProp] = index;
            } else {
              //new model
              nextView = createView(this, scope, view.els[0]);
            }
            this.customData.iterated.splice(index, 0, nextView);
          } else {
            view.models[indexProp] = index;
          }
        }
      });

      if (this.customData.iterated.length > collection.length) {
        times(this.customData.iterated.length - collection.length, () => {
          let view = this.customData.iterated.pop();
          view.unbind();
          if(!this.marker.parentNode) {
            throw new Error('Marker has no parent node');
          }
          this.marker.parentNode.removeChild(view.els[0]);
        });
      }

      if (el.nodeName === 'OPTION' && this.view.bindings) {
        this.view.bindings.forEach(binding => {
          if (binding.el === this.marker.parentNode && binding.type === 'value') {
            binding.sync();
          }
        });
      }
    },

    update(models) {
      let data: any = {};

      //todo: add test and fix if necessary

      Object.keys(models).forEach(key => {
        if (key !== this.args[0]) {
          data[key] = models[key];
        }
      });

      this.customData.iterated.forEach((view: IView) => {
        view.update(data);
      });
    }
  },

  // Adds or removes the class from the element when value is true or false.
  'class-*': function(el: HTMLElement, value: boolean) {
    let elClass = ` ${el.className} `;

    if (value !== (elClass.indexOf(` ${this.args[0]} `) > -1)) {
      if (value) {
        el.className = `${el.className} ${this.args[0]}`;
      } else {
        el.className = elClass.replace(` ${this.args[0]} `, ' ').trim();
      }
    }
  },

  // Sets the element's text value.
  text: <IOneWayBinder> (el: HTMLElement, value: string) => {
    el.textContent = value != null ? value : '';
  },

  // Sets the element's HTML content.
  html: <IOneWayBinder> (el: HTMLElement, value: string) => {
    el.innerHTML = value != null ? value : '';
  },

  // Shows the element when value is true.
  show: <IOneWayBinder> (el: HTMLElement, value: boolean) => {
    el.style.display = value ? '' : 'none';
  },

  // Hides the element when value is true (negated version of `show` binder).
  hide: <IOneWayBinder> (el: HTMLElement, value: boolean) => {
    el.style.display = value ? 'none' : '';
  },

  // Enables the element when value is true.
  enabled: <IOneWayBinder> (el: HTMLButtonElement, value: boolean) => {
    el.disabled = !value;
  },

  // Disables the element when value is true (negated version of `enabled` binder).
  disabled: <IOneWayBinder> (el: HTMLButtonElement, value: boolean) => {
    el.disabled = !!value;
  },

  // Checks a checkbox or radio input when the value is true. Also sets the model
  // property when the input is checked or unchecked (two-way binder).
  checked: <ITwoWayBinder<any>> {
    publishes: true,
    priority: 2000,

    bind: function(el) {
      var self = this;
      this.customData = {};
      if (!this.customData.callback) {
        this.customData.callback = function () {
          self.publish();
        };
      }
      el.addEventListener('change', this.customData.callback);
    },

    unbind: function(el) {
      el.removeEventListener('change', this.customData.callback);
    },

    routine: function(el: HTMLSelectElement, value) {
      if (el.type === 'radio') {
        el.checked = getString(el.value) === getString(value);
      } else {
        el.checked = !!value;
      }
    }
  },

  // Sets the element's value. Also sets the model property when the input changes
  // (two-way binder).
  value: <ITwoWayBinder<any>> {
    publishes: true,
    priority: 3000,

    bind: function(el: HTMLInputElement) {
      this.customData = {};
      this.customData.isRadio = el.tagName === 'INPUT' && el.type === 'radio';
      if (!this.customData.isRadio) {
        this.customData.event = el.getAttribute('event-name') || (el.tagName === 'SELECT' ? 'change' : 'input');

        var self = this;
        if (!this.customData.callback) {
          this.customData.callback = function () {
            self.publish();
          };
        }

        el.addEventListener(this.customData.event, this.customData.callback);
      }
    },

    unbind: function(el) {
      if (!this.customData.isRadio) {
        el.removeEventListener(this.customData.event, this.customData.callback);
      }
    },

    routine: function(el: HTMLInputElement | HTMLSelectElement, value) {
      if (this.customData && this.customData.isRadio) {
        el.setAttribute('value', value);
      } else {
        if (el.type === 'select-multiple' && el instanceof HTMLSelectElement) {
          if (value instanceof Array) {
            for (let i = 0; i < el.length; i++) {
              let option = el[i];
              option.selected = value.indexOf(option.value) > -1;
            }
          }
        } else if (getString(value) !== getString(el.value)) {
          el.value = value != null ? value : '';
        }
      }
    }
  },

  // Inserts and binds the element and it's child nodes into the DOM when true.
  if: <ITwoWayBinder<any>> {
    block: true,
    priority: 4000,

    bind: function(el: HTMLUnknownElement) {
      this.customData = {};
      if (!this.marker) {
        this.marker = document.createComment(' tinybind: ' + this.type + ' ' + this.keypath + ' ');
        this.customData.attached = false;
        if(!el.parentNode) {
          throw new Error('Element has no parent node');
        }
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else if ( this.customData.bound === false &&  this.customData.nested) {
         this.customData.nested.bind();
      }
       this.customData.bound = true;
    },

    unbind: function() {
      if ( this.customData.nested) {
         this.customData.nested.unbind();
         this.customData.bound = false;
      }
    },

    routine: function(el, value) {
      value = !!value;
      if (value !== this.customData.attached) {
        if (value) {

          if (! this.customData.nested) {
             this.customData.nested = new View(el, this.view.models, this.view.options);
             this.customData.nested.bind();
          }
          if(!this.marker.parentNode) {
            throw new Error('Marker has no parent node');
          }
          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
          this.customData.attached = true;
        } else {
          if(!el.parentNode) {
            throw new Error('Element has no parent node');
          }
          el.parentNode.removeChild(el);
          this.customData.attached = false;
        }
      }
    },

    update: function(models) {
      if ( this.customData.nested) {
         this.customData.nested.update(models);
      }
    }
  }
};

export default binders;
