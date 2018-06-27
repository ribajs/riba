import tinybind from './tinybind';
import { View } from './view';
import adapter from './adapter';
import { IAdapters } from './adapter';
import binders from './binders';
import { IBinders } from './binders';
import { Observer, Root } from './observer';

import { IFormatters, IComponents } from '../index';

export interface IOptions {
  // Attribute prefix in templates
  prefix?: string;

  //Preload templates with initial data on bind
  preloadData?: boolean;

  //Root sightglass interface for keypaths
  rootInterface?: string;

  // Template delimiters for text bindings
  templateDelimiters?: Array<string>

  // Augment the event handler of the on-* binder
  handler?: Function;
}

export interface IExtensions {
  binders: IBinders<any>;
  formatters: IFormatters;
  components: IComponents;
  adapters: IAdapters;
}

// Returns the public interface.

tinybind.binders = binders;
tinybind.adapters['.'] = adapter;

export interface IOptionsParam extends IExtensions, IOptions {}

export interface IViewOptions extends IOptionsParam {
  starBinders: any;
  // sightglass
  rootInterface: Root;
}

// TODO move to uitils
const mergeObject = (target: any, obj: any) => {
  Object.keys(obj).forEach(key => {
    if (!target[key] || target[key] === {}) {
      target[key] = obj[key];
    }
  });
  return target; 
};


// Binds some data to a template / element. Returns a tinybind.View instance.
tinybind.bind = (el: HTMLElement, models: any, options?: IOptionsParam) => {
  let viewOptions: IViewOptions = {
    // EXTENSIONS
    binders: Object.create(null),
    formatters: Object.create(null),
    components: Object.create(null),
    adapters: Object.create(null),
    // other
    starBinders: Object.create(null),
    // sightglass
    rootInterface: Object.create(null),
  };
  models = models || Object.create(null);
  // options = options || {};

  if(options) {
    mergeObject(viewOptions.binders, options.binders);
    mergeObject(viewOptions.formatters, options.formatters);
    mergeObject(viewOptions.components, options.components);
    mergeObject(viewOptions.adapters, options.adapters);
  }

  viewOptions.prefix = options && options.prefix ? options.prefix : tinybind.prefix
  viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : tinybind.templateDelimiters
  viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : tinybind.rootInterface
  viewOptions.preloadData = options && options.preloadData ? options.preloadData : tinybind.preloadData
  viewOptions.handler = options && options.handler ? options.handler : tinybind.handler

  // merge extensions
  mergeObject(viewOptions.binders, tinybind.binders);
  mergeObject(viewOptions.formatters, tinybind.formatters);
  mergeObject(viewOptions.components, tinybind.components);
  mergeObject(viewOptions.adapters, tinybind.adapters);

  // get all starBinders from available binders
  viewOptions.starBinders = Object.keys(viewOptions.binders).filter(function (key) {
    return key.indexOf('*') > 0;
  });

  Observer.updateOptions(viewOptions);

  let view = new View(el, models, viewOptions);
  view.bind();
  return view;
};

// Initializes a new instance of a component on the specified element and
// returns a tinybind.View instance.	
tinybind.init = (componentKey: string, el: HTMLElement, data = {}) => {
  if (!el) {
    el = document.createElement('div');
  }

  const component = tinybind.components[componentKey];
  el.innerHTML = component.template.call(tinybind, el);
  let scope = component.initialize.call(tinybind, el, data);

  let view = tinybind.bind(el, scope);
  view.bind();
  return view;
};

// Move to formatters
tinybind.formatters.negate = tinybind.formatters.not = function (value: boolean) {
  return !value;
};

export default tinybind;
