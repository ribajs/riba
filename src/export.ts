import tinybind from './tinybind';
import View from './view';
import { OPTIONS, EXTENSIONS, TExtensionKey } from './constants';
import adapter from './adapter';
import binders from './binders';
import { Observer } from './sightglass';

import { IOptions, IExtensions, IComponent } from '../index';

// Returns the public interface.

tinybind.binders = binders;
tinybind.adapters['.'] = adapter;

export interface IOptionsParam extends IExtensions, IOptions {}

export interface IViewOptions extends IOptionsParam {
  starBinders: any;
}

const mergeObject = (target: any, obj: any) => {
  console.log('mergeObject', target, obj);
  Object.keys(obj).forEach(key => {
    if (!target[key] || target[key] === {}) {
      target[key] = obj[key];
    }
  });
  console.log('result', target);
  return target; 
};


// Binds some data to a template / element. Returns a tinybind.View instance.
tinybind.bind = (el: HTMLElement, models: any, options?: IOptionsParam) => {
  let viewOptions: IViewOptions = {
    // EXTENSIONS
    binders: {},
    formatters: {},
    components: {},
    adapters: {},
    // other
    starBinders: {},
  };
  models = models || {};
  // options = options || {};

  if(options) {
    mergeObject(viewOptions.binders, options.binders);
    mergeObject(viewOptions.formatters, options.formatters);
    mergeObject(viewOptions.components, options.components);
    mergeObject(viewOptions.adapters, options.adapters);

    viewOptions.prefix = options.prefix ? options.prefix : tinybind.prefix
    viewOptions.templateDelimiters = options.templateDelimiters ? options.templateDelimiters : tinybind.templateDelimiters
    viewOptions.rootInterface = options.prefix ? options.rootInterface : tinybind.rootInterface
    viewOptions.preloadData = options.prefix ? options.preloadData : tinybind.preloadData
    viewOptions.handler = options.prefix ? options.handler : tinybind.handler
  }

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

tinybind.formatters.negate = tinybind.formatters.not = function (value: boolean) {
  return !value;
};

export default tinybind;
