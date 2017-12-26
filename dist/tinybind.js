(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tinybind"] = factory();
	else
		root["tinybind"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/constants.js
var OPTIONS = ['prefix', 'templateDelimiters', 'rootInterface', 'preloadData', 'handler'];

var EXTENSIONS = ['binders', 'formatters', 'adapters'];
// CONCATENATED MODULE: ./src/parsers.js
var PRIMITIVE = 0;
var KEYPATH = 1;
var TEXT = 0;
var BINDING = 1;

var QUOTED_STR = /^'.*'$|^".*"$/;

// Parser and tokenizer for getting the type and value from a string.
function parseType(string) {
  var type = PRIMITIVE;
  var value = string;

  if (QUOTED_STR.test(string)) {
    value = string.slice(1, -1);
  } else if (string === 'true') {
    value = true;
  } else if (string === 'false') {
    value = false;
  } else if (string === 'null') {
    value = null;
  } else if (string === 'undefined') {
    value = undefined;
  } else if (!isNaN(string)) {
    value = Number(string);
  } else {
    type = KEYPATH;
  }

  return { type: type, value: value };
}

// Template parser and tokenizer for mustache-style text content bindings.
// Parses the template and returns a set of tokens, separating static portions
// of text from binding declarations.
function parseTemplate(template, delimiters) {
  var tokens;
  var length = template.length;
  var index = 0;
  var lastIndex = 0;
  var open = delimiters[0],
      close = delimiters[1];

  while (lastIndex < length) {
    index = template.indexOf(open, lastIndex);

    if (index < 0) {
      if (tokens) {
        tokens.push({
          type: TEXT,
          value: template.slice(lastIndex)
        });
      }

      break;
    } else {
      tokens || (tokens = []);
      if (index > 0 && lastIndex < index) {
        tokens.push({
          type: TEXT,
          value: template.slice(lastIndex, index)
        });
      }

      lastIndex = index + open.length;
      index = template.indexOf(close, lastIndex);

      if (index < 0) {
        var substring = template.slice(lastIndex - close.length);
        var lastToken = tokens[tokens.length - 1];

        if (lastToken && lastToken.type === TEXT) {
          lastToken.value += substring;
        } else {
          tokens.push({
            type: TEXT,
            value: substring
          });
        }

        break;
      }

      var value = template.slice(lastIndex, index).trim();

      tokens.push({
        type: BINDING,
        value: value
      });

      lastIndex = index + close.length;
    }
  }

  return tokens;
}
// CONCATENATED MODULE: ./src/rivets.js



var rivets = {
  // Global binders.
  binders: {},

  // Global formatters.
  formatters: {},

  // Global sightglass adapters.
  adapters: {},

  // Default attribute prefix.
  _prefix: 'rv',

  _fullPrefix: 'rv-',

  get prefix() {
    return this._prefix;
  },

  set prefix(value) {
    this._prefix = value;
    this._fullPrefix = value + '-';
  },

  parseTemplate: parseTemplate,

  parseType: parseType,

  // Default template delimiters.
  templateDelimiters: ['{', '}'],

  // Default sightglass root interface.
  rootInterface: '.',

  // Preload data by default.
  preloadData: true,

  // Default event handler.
  handler: function handler(context, ev, binding) {
    this.call(context, ev, binding.view.models);
  },

  // Sets the attribute on the element. If no binder above is matched it will fall
  // back to using this binder.
  fallbackBinder: function fallbackBinder(el, value) {
    if (value != null) {
      el.setAttribute(this.type, value);
    } else {
      el.removeAttribute(this.type);
    }
  },

  // Merges an object literal into the corresponding global options.
  configure: function configure(options) {
    var _this = this;

    if (!options) {
      return;
    }
    Object.keys(options).forEach(function (option) {
      var value = options[option];

      if (EXTENSIONS.indexOf(option) > -1) {
        Object.keys(value).forEach(function (key) {
          _this[option][key] = value[key];
        });
      } else {
        _this[option] = value;
      }
    });
  }
};

/* harmony default export */ var src_rivets = (rivets);
// CONCATENATED MODULE: ./src/observer.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Check if a value is an object than can be observed.
function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
}

// Error thrower.
function error(message) {
  throw new Error('[Observer] ' + message);
}

var adapters;
var interfaces;
var rootInterface;

// Constructs a new keypath observer and kicks things off.
function Observer(obj, keypath, callback) {
  this.keypath = keypath;
  this.callback = callback;
  this.objectPath = [];
  this.parse();
  this.obj = this.getRootObject(obj);

  if (isObject(this.target = this.realize())) {
    this.set(true, this.key, this.target, this.callback);
  }
}

Observer.updateOptions = function (options) {
  adapters = options.adapters;
  interfaces = Object.keys(adapters);
  rootInterface = options.rootInterface;
};

// Tokenizes the provided keypath string into interface + path tokens for the
// observer to work with.
Observer.tokenize = function (keypath, root) {
  var tokens = [];
  var current = { i: root, path: '' };
  var index, chr;

  for (index = 0; index < keypath.length; index++) {
    chr = keypath.charAt(index);

    if (!!~interfaces.indexOf(chr)) {
      tokens.push(current);
      current = { i: chr, path: '' };
    } else {
      current.path += chr;
    }
  }

  tokens.push(current);
  return tokens;
};

// Parses the keypath using the interfaces defined on the view. Sets variables
// for the tokenized keypath as well as the end key.
Observer.prototype.parse = function () {
  var path, root;

  if (!interfaces.length) {
    error('Must define at least one adapter interface.');
  }

  if (!!~interfaces.indexOf(this.keypath[0])) {
    root = this.keypath[0];
    path = this.keypath.substr(1);
  } else {
    root = rootInterface;
    path = this.keypath;
  }

  this.tokens = Observer.tokenize(path, root);
  this.key = this.tokens.pop();
};

// Realizes the full keypath, attaching observers for every key and correcting
// old observers to any changed objects in the keypath.
Observer.prototype.realize = function () {
  var current = this.obj;
  var unreached = -1;
  var prev;
  var token;

  for (var index = 0; index < this.tokens.length; index++) {
    token = this.tokens[index];
    if (isObject(current)) {
      if (typeof this.objectPath[index] !== 'undefined') {
        if (current !== (prev = this.objectPath[index])) {
          this.set(false, token, prev, this);
          this.set(true, token, current, this);
          this.objectPath[index] = current;
        }
      } else {
        this.set(true, token, current, this);
        this.objectPath[index] = current;
      }

      current = this.get(token, current);
    } else {
      if (unreached === -1) {
        unreached = index;
      }

      if (prev = this.objectPath[index]) {
        this.set(false, token, prev, this);
      }
    }
  }

  if (unreached !== -1) {
    this.objectPath.splice(unreached);
  }

  return current;
};

// Updates the keypath. This is called when any intermediary key is changed.
Observer.prototype.sync = function () {
  var next, oldValue, newValue;

  if ((next = this.realize()) !== this.target) {
    if (isObject(this.target)) {
      this.set(false, this.key, this.target, this.callback);
    }

    if (isObject(next)) {
      this.set(true, this.key, next, this.callback);
    }

    oldValue = this.value();
    this.target = next;
    newValue = this.value();
    if (newValue !== oldValue || newValue instanceof Function) this.callback.sync();
  } else if (next instanceof Array) {
    this.callback.sync();
  }
};

// Reads the current end value of the observed keypath. Returns undefined if
// the full keypath is unreachable.
Observer.prototype.value = function () {
  if (isObject(this.target)) {
    return this.get(this.key, this.target);
  }
};

// Sets the current end value of the observed keypath. Calling setValue when
// the full keypath is unreachable is a no-op.
Observer.prototype.setValue = function (value) {
  if (isObject(this.target)) {
    adapters[this.key.i].set(this.target, this.key.path, value);
  }
};

// Gets the provided key on an object.
Observer.prototype.get = function (key, obj) {
  return adapters[key.i].get(obj, key.path);
};

// Observes or unobserves a callback on the object using the provided key.
Observer.prototype.set = function (active, key, obj, callback) {
  var action = active ? 'observe' : 'unobserve';
  adapters[key.i][action](obj, key.path, callback);
};

// Unobserves the entire keypath.
Observer.prototype.unobserve = function () {
  var obj;
  var token;

  for (var index = 0; index < this.tokens.length; index++) {
    token = this.tokens[index];
    if (obj = this.objectPath[index]) {
      this.set(false, token, obj, this);
    }
  }

  if (isObject(this.target)) {
    this.set(false, this.key, this.target, this.callback);
  }
};
// traverse the scope chain to find the scope which has the root property
// if the property is not found in chain, returns the root scope
Observer.prototype.getRootObject = function (obj) {
  var rootProp, current;
  if (!obj.$parent) {
    return obj;
  }

  if (this.tokens.length) {
    rootProp = this.tokens[0].path;
  } else {
    rootProp = this.key.path;
  }

  current = obj;
  while (current.$parent && current[rootProp] === undefined) {
    current = current.$parent;
  }

  return current;
};

/* harmony default export */ var observer = (Observer);
// CONCATENATED MODULE: ./src/bindings.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




function getInputValue(el) {
  var results = [];
  if (el.type === 'checkbox') {
    return el.checked;
  } else if (el.type === 'select-multiple') {

    el.options.forEach(function (option) {
      if (option.selected) {
        results.push(option.value);
      }
    });

    return results;
  } else {
    return el.value;
  }
}

var FORMATTER_ARGS = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
var FORMATTER_SPLIT = /\s+/;

// A single binding between a model attribute and a DOM element.
var bindings_Binding = function () {
  // All information about the binding is passed into the constructor; the
  // containing view, the DOM node, the type of binding, the model object and the
  // keypath at which to listen for changes.
  function Binding(view, el, type, keypath, binder, arg, formatters) {
    _classCallCheck(this, Binding);

    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    this.binder = binder;
    this.arg = arg;
    this.formatters = formatters;
    this.formatterObservers = {};
    this.model = undefined;
  }

  // Observes the object keypath


  Binding.prototype.observe = function observe(obj, keypath) {
    return new observer(obj, keypath, this);
  };

  Binding.prototype.parseTarget = function parseTarget() {
    if (this.keypath) {
      var token = parseType(this.keypath);

      if (token.type === 0) {
        this.value = token.value;
      } else {
        this.observer = this.observe(this.view.models, this.keypath);
        this.model = this.observer.target;
      }
    } else {
      this.value = undefined;
    }
  };

  Binding.prototype.parseFormatterArguments = function parseFormatterArguments(args, formatterIndex) {
    var _this = this;

    return args.map(parseType).map(function (_ref, ai) {
      var type = _ref.type,
          value = _ref.value;

      if (type === 0) {
        return value;
      } else {
        if (!_this.formatterObservers[formatterIndex]) {
          _this.formatterObservers[formatterIndex] = {};
        }

        var observer = _this.formatterObservers[formatterIndex][ai];

        if (!observer) {
          observer = _this.observe(_this.view.models, value);
          _this.formatterObservers[formatterIndex][ai] = observer;
        }

        return observer.value();
      }
    });
  };

  // Applies all the current formatters to the supplied value and returns the
  // formatted value.


  Binding.prototype.formattedValue = function formattedValue(value) {
    var _this2 = this;

    return this.formatters.reduce(function (result, declaration, index) {
      var args = declaration.match(FORMATTER_ARGS);
      var id = args.shift();
      var formatter = _this2.view.options.formatters[id];

      var processedArgs = _this2.parseFormatterArguments(args, index);

      if (formatter && formatter.read instanceof Function) {
        result = formatter.read.apply(formatter, [result].concat(processedArgs));
      } else if (formatter instanceof Function) {
        result = formatter.apply(undefined, [result].concat(processedArgs));
      }
      return result;
    }, value);
  };

  // Returns an event handler for the binding around the supplied function.


  Binding.prototype.eventHandler = function eventHandler(fn) {
    var binding = this;
    var handler = binding.view.options.handler;

    return function (ev) {
      handler.call(fn, this, ev, binding);
    };
  };

  // Sets the value for the binding. This Basically just runs the binding routine
  // with the supplied value formatted.


  Binding.prototype.set = function set(value) {
    if (value instanceof Function && !this.binder.function) {
      value = this.formattedValue(value.call(this.model));
    } else {
      value = this.formattedValue(value);
    }

    var routineFn = this.binder.routine || this.binder;

    if (routineFn instanceof Function) {
      routineFn.call(this, this.el, value);
    }
  };

  // Syncs up the view binding with the model.


  Binding.prototype.sync = function sync() {
    if (this.observer) {
      this.model = this.observer.target;
      this.set(this.observer.value());
    } else {
      this.set(this.value);
    }
  };

  // Publishes the value currently set on the input element back to the model.


  Binding.prototype.publish = function publish() {
    var _this3 = this;

    if (this.observer) {
      var value = this.formatters.reduceRight(function (result, declaration, index) {
        var args = declaration.split(FORMATTER_SPLIT);
        var id = args.shift();
        var formatter = _this3.view.options.formatters[id];
        var processedArgs = _this3.parseFormatterArguments(args, index);

        if (formatter && formatter.publish) {
          result = formatter.publish.apply(formatter, [result].concat(processedArgs));
        }
        return result;
      }, this.getValue(this.el));

      this.observer.setValue(value);
    }
  };

  // Subscribes to the model for changes at the specified keypath. Bi-directional
  // routines will also listen for changes on the element to propagate them back
  // to the model.


  Binding.prototype.bind = function bind() {
    this.parseTarget();

    if (this.binder.hasOwnProperty('bind')) {
      this.binder.bind.call(this, this.el);
    }

    if (this.view.options.preloadData) {
      this.sync();
    }
  };

  // Unsubscribes from the model and the element.


  Binding.prototype.unbind = function unbind() {
    var _this4 = this;

    if (this.binder.unbind) {
      this.binder.unbind.call(this, this.el);
    }

    if (this.observer) {
      this.observer.unobserve();
    }

    Object.keys(this.formatterObservers).forEach(function (fi) {
      var args = _this4.formatterObservers[fi];

      Object.keys(args).forEach(function (ai) {
        args[ai].unobserve();
      });
    });

    this.formatterObservers = {};
  };

  // Updates the binding's model from what is currently set on the view. Unbinds
  // the old model first and then re-binds with the new model.


  Binding.prototype.update = function update() {
    var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this.observer) {
      this.model = this.observer.target;
    }

    if (this.binder.update) {
      this.binder.update.call(this, models);
    }
  };

  // Returns elements value


  Binding.prototype.getValue = function getValue(el) {
    if (this.binder && this.binder.getValue) {
      return this.binder.getValue.call(this, el);
    } else {
      return getInputValue(el);
    }
  };

  return Binding;
}();
// CONCATENATED MODULE: ./src/view.js
function view__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var textBinder = {
  routine: function routine(node, value) {
    node.data = value != null ? value : '';
  }
};

var DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;

var view_parseNode = function parseNode(view, node) {
  var block = false;

  if (node.nodeType === 3) {
    var tokens = parseTemplate(node.data, src_rivets.templateDelimiters);

    if (tokens) {
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var text = document.createTextNode(token.value);
        node.parentNode.insertBefore(text, node);

        if (token.type === 1) {
          view.buildBinding(text, null, token.value, textBinder, null);
        }
      }

      node.parentNode.removeChild(node);
    }
    block = true;
  } else if (node.nodeType === 1) {
    block = view.traverse(node);
  }

  if (!block) {
    for (var _i = 0; _i < node.childNodes.length; _i++) {
      parseNode(view, node.childNodes[_i]);
    }
  }
};

var bindingComparator = function bindingComparator(a, b) {
  var aPriority = a.binder ? a.binder.priority || 0 : 0;
  var bPriority = b.binder ? b.binder.priority || 0 : 0;
  return bPriority - aPriority;
};

var trimStr = function trimStr(str) {
  return str.trim();
};

// A collection of bindings built from a set of parent nodes.

var view_View = function () {
  // The DOM elements and the model objects for binding are passed into the
  // constructor along with any local options that should be used throughout the
  // context of the view and it's bindings.
  function View(els, models, options) {
    view__classCallCheck(this, View);

    if (els.jquery || els instanceof Array) {
      this.els = els;
    } else {
      this.els = [els];
    }

    this.models = models;
    this.options = options;

    this.build();
  }

  View.prototype.buildBinding = function buildBinding(node, type, declaration, binder, arg) {
    var pipes = declaration.match(DECLARATION_SPLIT).map(trimStr);

    var keypath = pipes.shift();

    this.bindings.push(new bindings_Binding(this, node, type, keypath, binder, arg, pipes));
  };

  // Parses the DOM tree and builds `Binding` instances for every matched
  // binding declaration.


  View.prototype.build = function build() {
    this.bindings = [];

    var elements = this.els,
        i = void 0,
        len = void 0;
    for (i = 0, len = elements.length; i < len; i++) {
      view_parseNode(this, elements[i]);
    }

    this.bindings.sort(bindingComparator);
  };

  View.prototype.traverse = function traverse(node) {
    var bindingPrefix = src_rivets._fullPrefix;
    var block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
    var attributes = node.attributes;
    var bindInfos = [];
    var starBinders = this.options.starBinders;
    var type, binder, identifier, arg;

    for (var i = 0, len = attributes.length; i < len; i++) {
      var attribute = attributes[i];
      if (attribute.name.indexOf(bindingPrefix) === 0) {
        type = attribute.name.slice(bindingPrefix.length);
        binder = this.options.binders[type];
        arg = undefined;

        if (!binder) {
          for (var k = 0; k < starBinders.length; k++) {
            identifier = starBinders[k];
            if (type.slice(0, identifier.length - 1) === identifier.slice(0, -1)) {
              binder = this.options.binders[identifier];
              arg = type.slice(identifier.length - 1);
              break;
            }
          }
        }

        if (!binder) {
          binder = src_rivets.fallbackBinder;
        }

        if (binder.block) {
          this.buildBinding(node, type, attribute.value, binder, arg);
          node.removeAttribute(attribute.name);
          return true;
        }

        bindInfos.push({ attr: attribute, binder: binder, type: type, arg: arg });
      }
    }

    for (var _i2 = 0; _i2 < bindInfos.length; _i2++) {
      var bindInfo = bindInfos[_i2];
      this.buildBinding(node, bindInfo.type, bindInfo.attr.value, bindInfo.binder, bindInfo.arg);
      node.removeAttribute(bindInfo.attr.name);
    }

    return block;
  };

  // Binds all of the current bindings for this view.


  View.prototype.bind = function bind() {
    this.bindings.forEach(function (binding) {
      binding.bind();
    });
  };

  // Unbinds all of the current bindings for this view.


  View.prototype.unbind = function unbind() {
    this.bindings.forEach(function (binding) {
      binding.unbind();
    });
  };

  // Syncs up the view with the model by running the routines on all bindings.


  View.prototype.sync = function sync() {
    this.bindings.forEach(function (binding) {
      binding.sync();
    });
  };

  // Publishes the input values from the view back to the model (reverse sync).


  View.prototype.publish = function publish() {
    this.bindings.forEach(function (binding) {
      if (binding.binder && binding.binder.publishes) {
        binding.publish();
      }
    });
  };

  // Updates the view's models along with any affected bindings.


  View.prototype.update = function update() {
    var _this = this;

    var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    Object.keys(models).forEach(function (key) {
      _this.models[key] = models[key];
    });

    this.bindings.forEach(function (binding) {
      if (binding.update) {
        binding.update(models);
      }
    });
  };

  return View;
}();

/* harmony default export */ var src_view = (view_View);
// CONCATENATED MODULE: ./src/adapter.js
// The default `.` adapter that comes with Rivets.js. Allows subscribing to
// properties on plain objects, implemented in ES5 natives using
// `Object.defineProperty`.

var ARRAY_METHODS = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];

var adapter = {
  counter: 0,
  weakmap: {},

  weakReference: function weakReference(obj) {
    if (!obj.hasOwnProperty('__rv')) {
      var id = this.counter++;

      Object.defineProperty(obj, '__rv', {
        value: id
      });
    }

    if (!this.weakmap[obj.__rv]) {
      this.weakmap[obj.__rv] = {
        callbacks: {}
      };
    }

    return this.weakmap[obj.__rv];
  },

  cleanupWeakReference: function cleanupWeakReference(ref, id) {
    if (!Object.keys(ref.callbacks).length) {
      if (!(ref.pointers && Object.keys(ref.pointers).length)) {
        delete this.weakmap[id];
      }
    }
  },

  stubFunction: function stubFunction(obj, fn) {
    var original = obj[fn];
    var map = this.weakReference(obj);
    var weakmap = this.weakmap;

    obj[fn] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var response = original.apply(obj, args);

      Object.keys(map.pointers).forEach(function (r) {
        var k = map.pointers[r];

        if (weakmap[r]) {
          if (weakmap[r].callbacks[k] instanceof Array) {
            weakmap[r].callbacks[k].forEach(function (callback) {
              callback.sync();
            });
          }
        }
      });

      return response;
    };
  },

  observeMutations: function observeMutations(obj, ref, keypath) {
    var _this = this;

    if (obj instanceof Array) {
      var map = this.weakReference(obj);

      if (!map.pointers) {
        map.pointers = {};

        ARRAY_METHODS.forEach(function (fn) {
          _this.stubFunction(obj, fn);
        });
      }

      if (!map.pointers[ref]) {
        map.pointers[ref] = [];
      }

      if (map.pointers[ref].indexOf(keypath) === -1) {
        map.pointers[ref].push(keypath);
      }
    }
  },

  unobserveMutations: function unobserveMutations(obj, ref, keypath) {
    if (obj instanceof Array && obj.__rv != null) {
      var map = this.weakmap[obj.__rv];

      if (map) {
        var pointers = map.pointers[ref];

        if (pointers) {
          var idx = pointers.indexOf(keypath);

          if (idx > -1) {
            pointers.splice(idx, 1);
          }

          if (!pointers.length) {
            delete map.pointers[ref];
          }

          this.cleanupWeakReference(map, obj.__rv);
        }
      }
    }
  },

  observe: function observe(obj, keypath, callback) {
    var _this2 = this;

    var value;
    var callbacks = this.weakReference(obj).callbacks;

    if (!callbacks[keypath]) {
      callbacks[keypath] = [];
      var desc = Object.getOwnPropertyDescriptor(obj, keypath);

      if (!desc || !(desc.get || desc.set || !desc.configurable)) {
        value = obj[keypath];

        Object.defineProperty(obj, keypath, {
          enumerable: true,

          get: function get() {
            return value;
          },

          set: function set(newValue) {
            if (newValue !== value) {
              _this2.unobserveMutations(value, obj.__rv, keypath);
              value = newValue;
              var map = _this2.weakmap[obj.__rv];

              if (map) {
                var _callbacks = map.callbacks[keypath];

                if (_callbacks) {
                  _callbacks.forEach(function (cb) {
                    cb.sync();
                  });
                }

                _this2.observeMutations(newValue, obj.__rv, keypath);
              }
            }
          }
        });
      }
    }

    if (callbacks[keypath].indexOf(callback) === -1) {
      callbacks[keypath].push(callback);
    }

    this.observeMutations(obj[keypath], obj.__rv, keypath);
  },

  unobserve: function unobserve(obj, keypath, callback) {
    var map = this.weakmap[obj.__rv];

    if (map) {
      var callbacks = map.callbacks[keypath];

      if (callbacks) {
        var idx = callbacks.indexOf(callback);

        if (idx > -1) {
          callbacks.splice(idx, 1);

          if (!callbacks.length) {
            delete map.callbacks[keypath];
            this.unobserveMutations(obj[keypath], obj.__rv, keypath);
          }
        }

        this.cleanupWeakReference(map, obj.__rv);
      }
    }
  },

  get: function get(obj, keypath) {
    return obj[keypath];
  },

  set: function set(obj, keypath, value) {
    obj[keypath] = value;
  }
};

/* harmony default export */ var src_adapter = (adapter);
// CONCATENATED MODULE: ./src/binders.js


var getString = function getString(value) {
  return value != null ? value.toString() : undefined;
};

var times = function times(n, cb) {
  for (var i = 0; i < n; i++) {
    cb();
  }
};

function createView(binding, data, anchorEl) {
  var template = binding.el.cloneNode(true);
  var view = new src_view(template, data, binding.view.options);
  view.bind();
  binding.marker.parentNode.insertBefore(template, anchorEl);
  return view;
}

var binders = {
  // Binds an event handler on the element.
  'on-*': {
    function: true,
    priority: 1000,

    unbind: function unbind(el) {
      if (this.handler) {
        el.removeEventListener(this.arg, this.handler);
      }
    },

    routine: function routine(el, value) {
      if (this.handler) {
        el.removeEventListener(this.arg, this.handler);
      }

      this.handler = this.eventHandler(value);
      el.addEventListener(this.arg, this.handler);
    }
  },

  // Appends bound instances of the element in place for each item in the array.
  'each-*': {
    block: true,

    priority: 4000,

    bind: function bind(el) {
      if (!this.marker) {
        this.marker = document.createComment(' rivets: ' + this.type + ' ');
        this.iterated = [];

        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else {
        this.iterated.forEach(function (view) {
          view.bind();
        });
      }
    },

    unbind: function unbind(el) {
      if (this.iterated) {
        this.iterated.forEach(function (view) {
          view.unbind();
        });
      }
    },

    routine: function routine(el, collection) {
      var _this = this;

      var modelName = this.arg;
      collection = collection || [];
      var indexProp = el.getAttribute('index-property') || '$index';

      collection.forEach(function (model, index) {
        var data = { $parent: _this.view.models };
        data[indexProp] = index;
        data[modelName] = model;
        var view = _this.iterated[index];

        if (!view) {

          var previous = _this.marker;

          if (_this.iterated.length) {
            previous = _this.iterated[_this.iterated.length - 1].els[0];
          }

          view = createView(_this, data, previous.nextSibling);
          _this.iterated.push(view);
        } else {
          if (view.models[modelName] !== model) {
            // search for a view that matches the model
            var matchIndex = void 0,
                nextView = void 0;
            for (var nextIndex = index + 1; nextIndex < _this.iterated.length; nextIndex++) {
              nextView = _this.iterated[nextIndex];
              if (nextView.models[modelName] === model) {
                matchIndex = nextIndex;
                break;
              }
            }
            if (matchIndex !== undefined) {
              // model is in other position
              // todo: consider avoiding the splice here by setting a flag
              // profile performance before implementing such change
              _this.iterated.splice(matchIndex, 1);
              _this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);
              nextView.models[indexProp] = index;
            } else {
              //new model
              nextView = createView(_this, data, view.els[0]);
            }
            _this.iterated.splice(index, 0, nextView);
          } else {
            view.models[indexProp] = index;
          }
        }
      });

      if (this.iterated.length > collection.length) {
        times(this.iterated.length - collection.length, function () {
          var view = _this.iterated.pop();
          view.unbind();
          _this.marker.parentNode.removeChild(view.els[0]);
        });
      }

      if (el.nodeName === 'OPTION') {
        this.view.bindings.forEach(function (binding) {
          if (binding.el === _this.marker.parentNode && binding.type === 'value') {
            binding.sync();
          }
        });
      }
    },

    update: function update(models) {
      var _this2 = this;

      var data = {};

      //todo: add test and fix if necessary

      Object.keys(models).forEach(function (key) {
        if (key !== _this2.arg) {
          data[key] = models[key];
        }
      });

      this.iterated.forEach(function (view) {
        view.update(data);
      });
    }
  },

  // Adds or removes the class from the element when value is true or false.
  'class-*': function _class(el, value) {
    var elClass = ' ' + el.className + ' ';

    if (!value === elClass.indexOf(' ' + this.arg + ' ') > -1) {
      if (value) {
        el.className = el.className + ' ' + this.arg;
      } else {
        el.className = elClass.replace(' ' + this.arg + ' ', ' ').trim();
      }
    }
  },

  // Sets the element's text value.
  text: function text(el, value) {
    el.textContent = value != null ? value : '';
  },

  // Sets the element's HTML content.
  html: function html(el, value) {
    el.innerHTML = value != null ? value : '';
  },

  // Shows the element when value is true.
  show: function show(el, value) {
    el.style.display = value ? '' : 'none';
  },

  // Hides the element when value is true (negated version of `show` binder).
  hide: function hide(el, value) {
    el.style.display = value ? 'none' : '';
  },

  // Enables the element when value is true.
  enabled: function enabled(el, value) {
    el.disabled = !value;
  },

  // Disables the element when value is true (negated version of `enabled` binder).
  disabled: function disabled(el, value) {
    el.disabled = !!value;
  },

  // Checks a checkbox or radio input when the value is true. Also sets the model
  // property when the input is checked or unchecked (two-way binder).
  checked: {
    publishes: true,
    priority: 2000,

    bind: function bind(el) {
      var self = this;
      if (!this.callback) {
        this.callback = function () {
          self.publish();
        };
      }
      el.addEventListener('change', this.callback);
    },

    unbind: function unbind(el) {
      el.removeEventListener('change', this.callback);
    },

    routine: function routine(el, value) {
      if (el.type === 'radio') {
        el.checked = getString(el.value) === getString(value);
      } else {
        el.checked = !!value;
      }
    }
  },

  // Sets the element's value. Also sets the model property when the input changes
  // (two-way binder).
  value: {
    publishes: true,
    priority: 3000,

    bind: function bind(el) {
      this.isRadio = el.tagName === 'INPUT' && el.type === 'radio';
      if (!this.isRadio) {
        this.event = el.getAttribute('event-name') || (el.tagName === 'SELECT' ? 'change' : 'input');

        var self = this;
        if (!this.callback) {
          this.callback = function () {
            self.publish();
          };
        }

        el.addEventListener(this.event, this.callback);
      }
    },

    unbind: function unbind(el) {
      if (!this.isRadio) {
        el.removeEventListener(this.event, this.callback);
      }
    },

    routine: function routine(el, value) {
      if (this.isRadio) {
        el.setAttribute('value', value);
      } else {
        if (el.type === 'select-multiple') {
          if (value instanceof Array) {
            for (var i = 0; i < el.length; i++) {
              var option = el[i];
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
  if: {
    block: true,
    priority: 4000,

    bind: function bind(el) {
      if (!this.marker) {
        this.marker = document.createComment(' rivets: ' + this.type + ' ' + this.keypath + ' ');
        this.attached = false;

        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else if (this.bound === false && this.nested) {
        this.nested.bind();
      }
      this.bound = true;
    },

    unbind: function unbind() {
      if (this.nested) {
        this.nested.unbind();
        this.bound = false;
      }
    },

    routine: function routine(el, value) {
      if (!!value !== this.attached) {
        if (value) {

          if (!this.nested) {
            this.nested = new src_view(el, this.view.models, this.view.options);
            this.nested.bind();
          }

          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
          this.attached = true;
        } else {
          el.parentNode.removeChild(el);
          this.attached = false;
        }
      }
    },

    update: function update(models) {
      if (this.nested) {
        this.nested.update(models);
      }
    }
  }
};

/* harmony default export */ var src_binders = (binders);
// CONCATENATED MODULE: ./src/export.js







// Returns the public interface.

src_rivets.binders = src_binders;
src_rivets.adapters['.'] = src_adapter;

// Binds some data to a template / element. Returns a Rivets.View instance.
src_rivets.bind = function (el, models, options) {
  var viewOptions = {};
  models = models || {};
  options = options || {};

  EXTENSIONS.forEach(function (extensionType) {
    viewOptions[extensionType] = Object.create(null);

    if (options[extensionType]) {
      Object.keys(options[extensionType]).forEach(function (key) {
        viewOptions[extensionType][key] = options[extensionType][key];
      });
    }

    Object.keys(src_rivets[extensionType]).forEach(function (key) {
      if (!viewOptions[extensionType][key]) {
        viewOptions[extensionType][key] = src_rivets[extensionType][key];
      }
    });
  });

  OPTIONS.forEach(function (option) {
    var value = options[option];
    viewOptions[option] = value != null ? value : src_rivets[option];
  });

  viewOptions.starBinders = Object.keys(viewOptions.binders).filter(function (key) {
    return key.indexOf('*') > 0;
  });

  observer.updateOptions(viewOptions);

  var view = new src_view(el, models, viewOptions);
  view.bind();
  return view;
};

src_rivets.formatters.negate = src_rivets.formatters.not = function (value) {
  return !value;
};

/* harmony default export */ var src_export = __webpack_exports__["default"] = (src_rivets);

/***/ })
/******/ ])["default"];
});