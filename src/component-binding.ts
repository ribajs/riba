import { tinybind, IOptionsParam } from './tinybind';
import { PRIMITIVE, KEYPATH, parseType } from './parsers';
import { Binding } from './binding';
import { IBinders } from './binders';
import { IFormatters } from './formatters';
import { View } from './view';
import { IComponent, IComponents } from './components';
import { IObservers } from './observer';
import { IAdapters } from './adapter';
import { mergeObject } from './utils';

export interface IBoundElement extends HTMLElement {	
  _bound?: boolean	
}

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
  component: IComponent<any>;
  /**
   * static values (PRIMITIVE Attributes)
   */
  static: any = {};
  /**
   * keypath values (KEYPATH Attributes)
   */
  keypaths: IKeypaths = {};
  observers: IObservers;
  bindingPrefix = tinybind._fullPrefix;

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
    this.parseTarget();
  }
    
    
  /**
   * Intercepts `tinybind.Binding::sync` since component bindings are not bound to
   * a particular model to update it's value.
   */
  sync() {
    Object.keys(this.observers).forEach(key => {
      if(this.componentView) {
        this.componentView.models[key] = this.observers[key].target;
      }
    });
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

  getMergedOptions() {
    var options: IOptionsParam = {
      // EXTENSIONS
      binders: <IBinders<any>> Object.create(null),
      formatters: <IFormatters> Object.create(null),
      components: <IComponents> Object.create(null),
      adapters: <IAdapters> Object.create(null),
    };
    
    mergeObject(options.binders, this.component.binders);
    mergeObject(options.formatters, this.component.formatters);
    mergeObject(options.components, this.component.components);
    mergeObject(options.adapters, this.component.adapters);

    mergeObject(options.binders, this.view.options.binders);
    mergeObject(options.formatters, this.view.options.formatters);
    mergeObject(options.components, this.view.options.components);
    mergeObject(options.adapters, this.view.options.adapters);

    options.prefix = this.component.prefix ? this.component.prefix : this.view.options.prefix
    options.templateDelimiters = this.component.templateDelimiters ? this.component.templateDelimiters : this.view.options.templateDelimiters
    options.rootInterface = this.component.rootInterface ? this.component.rootInterface : this.view.options.rootInterface
    options.preloadData = this.component.preloadData ? this.component.preloadData : this.view.options.preloadData
    options.handler = this.component.handler ? this.component.handler : this.view.options.handler
    return options;
  }
    
  /**
   * Intercepts `tinybind.Binding::bind` to build `this.componentView` with a localized
   * map of models from the root view. Bind `this.componentView` on subsequent calls.
   */
  bind() {
    if (!this.componentView) {
      this.el.innerHTML = this.component.template.call(this);
      /**
       * there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
       */
      let scope = this.component.initialize.call(this, this.el, this.locals());
      this.componentView = tinybind.bind(Array.prototype.slice.call(this.el.childNodes), scope, this.getMergedOptions());
      this.el._bound = true;
    } else {
      this.componentView.bind();
    }
  }

  parseTarget() {
    // parse component attributes
    for (let i = 0, len = this.el.attributes.length; i < len; i++) {
      let attribute = this.el.attributes[i];

      // if attribute starts not with binding prefix. E.g. rv-
      if (attribute.name.indexOf(this.bindingPrefix) !== 0) {
        let propertyName = this.camelCase(attribute.name);
        let token = parseType(attribute.value);
      if(token.type === PRIMITIVE) {
          this.static[propertyName] = token.value;
        } else if(token.type === KEYPATH) {
          this.keypaths[propertyName] = attribute.value;
          this.observers[propertyName] = this.observe(this.view.models, this.keypaths[propertyName], this);
        } else {
          throw new Error('can\'t parse component attribute');
        }
      }
    }

  }
    
  /**
   * Intercept `tinybind.Binding::unbind` to be called on `this.componentView`.
   */
  unbind() {    
    Object.keys(this.observers).forEach(key => {
      this.observers[key].unobserve();
    });
    
    if (this.componentView) {
      this.componentView.unbind.call(this);
    }
  }
}