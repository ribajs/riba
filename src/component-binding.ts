import { tinybind, IOptionsParam } from './tinybind';
import { parseType } from './parsers';
import { Binding } from './binding';
import { IBinders } from './binders';
import { IFormatters } from './formatters';
import { View } from './view';
import { IComponent, IComponents } from './components';
import { IObservers } from './observer';
import { IAdapters } from './adapter';

const mergeObject = (target: any, obj: any) => {
  if(obj) {
    Object.keys(obj).forEach(key => {
      if (!target[key] || target[key] === {}) {
        target[key] = obj[key];
      }
    });
  }
  return target; 
};

export interface IBoundElement extends HTMLElement {
  _bound?: boolean
}

/**
 * Used also in parsers.parseType
 * TODO outsource
 */
const PRIMITIVE = 0;
const KEYPATH = 1;

export interface IKeypaths {
  [propertyName: string]: string;
}

/**
 * component view encapsulated as a binding within it's parent view.
 */
export class ComponentBinding extends Binding {
  view: View;
  componentView?: View;
  el: IBoundElement;
  type: string;
  component: IComponent;
  /**
   * static values (PRIMITIVE Attributes)
   */
  static: any;
  bound: boolean = false;
  /**
   * keypath values (KEYPATH Attributes)
   */
  keypaths: IKeypaths = {};
  observers: IObservers;
  upstreamObservers: IObservers;

  // Initializes a component binding for the specified view. The raw component
  // element is passed in along with the component type. Attributes and scope
  // inflections are determined based on the components defined attributes.
  constructor(view: View, el: HTMLElement, type: string) {
    super(view, el, type, null, null, null, null);
    this.view = view;
    this.el = el;
    this.type = type;
    this.component = view.options.components[this.type];
    this.static = {};
    this.observers = {};
    this.upstreamObservers = {};
    
    let bindingPrefix = tinybind._fullPrefix;
    
    // parse component attributes
    for (let i = 0, len = el.attributes.length; i < len; i++) {
      let attribute = el.attributes[i];

      // if attribute starts not with binding prefix. E.g. rv-
      if (attribute.name.indexOf(bindingPrefix) !== 0) {
        let propertyName = this.camelCase(attribute.name);
        let token = parseType(attribute.value);
        let stat = this.component.static;
    
        if (stat && stat.indexOf(propertyName) > -1) {
          this.static[propertyName] = attribute.value;
        } else if(token.type === PRIMITIVE) {
          this.static[propertyName] = token.value;
        } else if(token.type === KEYPATH) {
          // TODO attribute.value is not an observer
          this.keypaths[propertyName] = attribute.value;
        } else {
          throw new Error('can\'t parse component attribute');
        }
      }
    }
  }
    
    
  /**
   * Intercepts `tinybind.Binding::sync` since component bindings are not bound to
   * a particular model to update it's value.
   */
  sync() {
  }
    
  /**
   * Intercepts `tinybind.Binding::update` since component bindings are not bound
   * to a particular model to update it's value.
   */
  update() {}
    
  /**
   * Intercepts `tinybind.Binding::publish` since component bindings are not bound
   * to a particular model to update it's value.
   */
  publish() {}
    
  /**
   * Returns an object map using the component's scope inflections.
   */
  locals() {
    let result: any = {};
    
    Object.keys(this.static).forEach(key => {
      result[key] = this.static[key];
    });
    
    Object.keys(this.observers).forEach(key => {
      result[key] = this.observers[key].value();
    });
    
    return result;
  }
    

  /**
   * Returns a camel-cased version of the string. Used when translating an
   * element's attribute name into a property name for the component's scope.
   * TODO move to utils
   * @param string 
   */
  camelCase(string: string) {
    return string.replace(/-([a-z])/g, grouped => {
      return grouped[1].toUpperCase();
    });
  }
    
  /**
   * Intercepts `tinybind.Binding::bind` to build `this.componentView` with a localized
   * map of models from the root view. Bind `this.componentView` on subsequent calls.
   */
  bind() {
    var options: IOptionsParam = {
      // EXTENSIONS
      binders: <IBinders<any>> Object.create(null),
      formatters: <IFormatters> Object.create(null),
      components: <IComponents> Object.create(null),
      adapters: <IAdapters> Object.create(null),
    };

    if (!this.bound) {
      Object.keys(this.keypaths).forEach(key => {
        let keypath = this.keypaths[key];

        // TODO TESTME
        this.observers[key] = this.observe(this.view.models, keypath, {sync: () => {
          for (const key in this.observers) {
            if (this.observers.hasOwnProperty(key)) {
              const observer = this.observers[key];
              if(!this.componentView) {
                throw new Error('componentView is not set');
              }
              this.componentView.models[key] = observer.value();
            }
          }
        }});
      });
    
      this.bound = true;
    }
    
    if (this.componentView) {
      this.componentView.bind();
    } else {
      this.el.innerHTML = this.component.template.call(this);
      let scope = this.component.initialize.call(this, this.el, this.locals());
      this.el._bound = true;

      mergeObject(options.binders, this.component.binders);
      mergeObject(options.formatters, this.component.formatters);
      mergeObject(options.components, this.component.components);
      mergeObject(options.formatters, this.component.adapters);

      mergeObject(options.binders, this.view.options.binders);
      mergeObject(options.formatters, this.view.options.formatters);
      mergeObject(options.components, this.view.options.components);
      mergeObject(options.formatters, this.view.options.adapters);

      options.prefix = this.component.prefix ? this.component.prefix : this.view.options.prefix
      options.templateDelimiters = this.component.templateDelimiters ? this.component.templateDelimiters : this.view.options.templateDelimiters
      options.rootInterface = this.component.rootInterface ? this.component.rootInterface : this.view.options.rootInterface
      options.preloadData = this.component.preloadData ? this.component.preloadData : this.view.options.preloadData
      options.handler = this.component.handler ? this.component.handler : this.view.options.handler
      
      /**
       * there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
       */
      this.componentView = tinybind.bind(Array.prototype.slice.call(this.el.childNodes), scope, options);
    
      Object.keys(this.observers).forEach(key => {
        let observer = this.observers[key];
        if(!this.componentView) {
          throw new Error('componentView not set');
        }
        const models = this.componentView.models;

        // TODO TESTME
        const upstream = this.observe(models, key, {sync: () => {
          for (const key in this.observers) {
            if (this.observers.hasOwnProperty(key)) {
              const observer = this.observers[key];
              observer.setValue(models[key]);
            }
          }
        }});
        this.upstreamObservers[key] = upstream;
      });
    }
  }
    
  /**
   * Intercept `tinybind.Binding::unbind` to be called on `this.componentView`.
   */
  unbind() {
    Object.keys(this.upstreamObservers).forEach(key => {
      this.upstreamObservers[key].unobserve();
    });
    
    Object.keys(this.observers).forEach(key => {
      this.observers[key].unobserve();
    });
    
    if (this.componentView) {
      this.componentView.unbind.call(this);
    }
  }
}