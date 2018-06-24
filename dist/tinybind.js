(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tinybind"] = factory();
	else
		root["tinybind"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/export.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/adapter.js":
/*!************************!*\
  !*** ./src/adapter.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// The default `.` adapter that comes with tinybind.js. Allows subscribing to
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
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
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
var _default = adapter;
exports.default = _default;

/***/ }),

/***/ "./src/binders.js":
/*!************************!*\
  !*** ./src/binders.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(__webpack_require__(/*! ./view */ "./src/view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var view = new _view.default(template, data, binding.view.options);
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
        el.removeEventListener(this.args[0], this.handler);
      }
    },
    routine: function routine(el, value) {
      if (this.handler) {
        el.removeEventListener(this.args[0], this.handler);
      }

      this.handler = this.eventHandler(value);
      el.addEventListener(this.args[0], this.handler);
    }
  },
  // Appends bound instances of the element in place for each item in the array.
  'each-*': {
    block: true,
    priority: 4000,
    bind: function bind(el) {
      if (!this.marker) {
        this.marker = document.createComment(" tinybind: ".concat(this.type, " "));
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

      var modelName = this.args[0];
      collection = collection || []; // TODO support object keys to iterate over

      if (!Array.isArray(collection)) {
        throw new Error('each-' + modelName + ' needs an array to iterate over, but it is', collection);
      } // if index name is seted by `index-property` use this name, otherwise `%[modelName]%`  


      var indexProp = el.getAttribute('index-property') || this.getIterationAlias(modelName);
      collection.forEach(function (model, index) {
        var data = {
          $parent: _this.view.models
        };
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
            var matchIndex, nextView;

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

      var data = {}; //todo: add test and fix if necessary

      Object.keys(models).forEach(function (key) {
        if (key !== _this2.args[0]) {
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
    var elClass = " ".concat(el.className, " ");

    if (value !== elClass.indexOf(" ".concat(this.args[0], " ")) > -1) {
      if (value) {
        el.className = "".concat(el.className, " ").concat(this.args[0]);
      } else {
        el.className = elClass.replace(" ".concat(this.args[0], " "), ' ').trim();
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
        this.marker = document.createComment(' tinybind: ' + this.type + ' ' + this.keypath + ' ');
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
      value = !!value;

      if (value !== this.attached) {
        if (value) {
          if (!this.nested) {
            this.nested = new _view.default(el, this.view.models, this.view.options);
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
var _default = binders;
exports.default = _default;

/***/ }),

/***/ "./src/binding.js":
/*!************************!*\
  !*** ./src/binding.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Binding = void 0;

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.js");

var _sightglass = __webpack_require__(/*! ./sightglass */ "./src/sightglass.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
/**
 * Used also in parsers.parseType
 * TODO outsource
 */

var PRIMITIVE = 0;
var KEYPATH = 1; // A single binding between a model attribute and a DOM element.

var Binding =
/*#__PURE__*/
function () {
  /**
   * All information about the binding is passed into the constructor; the
   * containing view, the DOM node, the type of binding, the model object and the
   * keypath at which to listen for changes.
   * @param {*} view 
   * @param {*} el 
   * @param {*} type 
   * @param {*} keypath 
   * @param {*} binder 
   * @param {*} args The start binders, on `class-*` args[0] wil be the classname 
   * @param {*} formatters 
   */
  function Binding(view, el, type, keypath, binder, args, formatters) {
    _classCallCheck(this, Binding);

    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    this.binder = binder;
    this.args = args;
    this.formatters = formatters;
    this.formatterObservers = {};
    this.model = undefined;
  } // Observes the object keypath


  _createClass(Binding, [{
    key: "observe",
    value: function observe(obj, keypath) {
      return new _sightglass.Observer(obj, keypath, this);
    }
  }, {
    key: "parseTarget",
    value: function parseTarget() {
      if (this.keypath) {
        var token = (0, _parsers.parseType)(this.keypath);

        if (token.type === PRIMITIVE) {
          this.value = token.value;
        } else if (token.type === KEYPATH) {
          this.observer = this.observe(this.view.models, this.keypath);
          this.model = this.observer.target;
        } else {
          throw new Error('Unknown type in token', token);
        }
      } else {
        this.value = undefined;
      }
    }
    /**
     * Get the iteration alias, used in the interation binders like `each-*`
     * @param {*} modelName 
     * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L26
     * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L1175
     */

  }, {
    key: "getIterationAlias",
    value: function getIterationAlias(modelName) {
      return '%' + modelName + '%';
    }
  }, {
    key: "parseFormatterArguments",
    value: function parseFormatterArguments(args, formatterIndex) {
      var _this = this;

      return args.map(_parsers.parseType).map(function (_ref, ai) {
        var type = _ref.type,
            value = _ref.value;

        if (type === PRIMITIVE) {
          return value;
        } else if (type === KEYPATH) {
          if (!_this.formatterObservers[formatterIndex]) {
            _this.formatterObservers[formatterIndex] = {};
          }

          var observer = _this.formatterObservers[formatterIndex][ai];

          if (!observer) {
            observer = _this.observe(_this.view.models, value);
            _this.formatterObservers[formatterIndex][ai] = observer;
          }

          return observer.value();
        } else {
          throw new Error('Unknown type', type, value);
        }
      });
    } // Applies all the current formatters to the supplied value and returns the
    // formatted value.

  }, {
    key: "formattedValue",
    value: function formattedValue(value) {
      var _this2 = this;

      return this.formatters.reduce(function (result, declaration, index) {
        var args = declaration.match(FORMATTER_ARGS);
        var id = args.shift();
        var formatter = _this2.view.options.formatters[id];

        var processedArgs = _this2.parseFormatterArguments(args, index);

        if (formatter && formatter.read instanceof Function) {
          result = formatter.read.apply(formatter, [result].concat(_toConsumableArray(processedArgs)));
        } else if (formatter instanceof Function) {
          result = formatter.apply(void 0, [result].concat(_toConsumableArray(processedArgs)));
        }

        return result;
      }, value);
    } // Returns an event handler for the binding around the supplied function.

  }, {
    key: "eventHandler",
    value: function eventHandler(fn) {
      var binding = this;
      var handler = binding.view.options.handler;
      return function (ev) {
        handler.call(fn, this, ev, binding);
      };
    } // Sets the value for the binding. This Basically just runs the binding routine
    // with the supplied value formatted.

  }, {
    key: "set",
    value: function set(value) {
      if (value instanceof Function && !this.binder.function) {
        value = this.formattedValue(value.call(this.model));
      } else {
        value = this.formattedValue(value);
      }

      var routineFn = this.binder.routine || this.binder;

      if (routineFn instanceof Function) {
        routineFn.call(this, this.el, value);
      }
    } // Syncs up the view binding with the model.

  }, {
    key: "sync",
    value: function sync() {
      if (this.observer) {
        this.model = this.observer.target;
        this.set(this.observer.value());
      } else {
        this.set(this.value);
      }
    } // Publishes the value currently set on the input element back to the model.

  }, {
    key: "publish",
    value: function publish() {
      var _this3 = this;

      if (this.observer) {
        var value = this.formatters.reduceRight(function (result, declaration, index) {
          var args = declaration.split(FORMATTER_SPLIT);
          var id = args.shift();
          var formatter = _this3.view.options.formatters[id];

          var processedArgs = _this3.parseFormatterArguments(args, index);

          if (formatter && formatter.publish) {
            result = formatter.publish.apply(formatter, [result].concat(_toConsumableArray(processedArgs)));
          }

          return result;
        }, this.getValue(this.el));
        this.observer.setValue(value);
      }
    } // Subscribes to the model for changes at the specified keypath. Bi-directional
    // routines will also listen for changes on the element to propagate them back
    // to the model.

  }, {
    key: "bind",
    value: function bind() {
      this.parseTarget();

      if (this.binder.hasOwnProperty('bind')) {
        this.binder.bind.call(this, this.el);
      }

      if (this.view.options.preloadData) {
        this.sync();
      }
    } // Unsubscribes from the model and the element.

  }, {
    key: "unbind",
    value: function unbind() {
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
    } // Updates the binding's model from what is currently set on the view. Unbinds
    // the old model first and then re-binds with the new model.

  }, {
    key: "update",
    value: function update() {
      var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.observer) {
        this.model = this.observer.target;
      }

      if (this.binder.update) {
        this.binder.update.call(this, models);
      }
    } // Returns elements value

  }, {
    key: "getValue",
    value: function getValue(el) {
      if (this.binder && this.binder.getValue) {
        return this.binder.getValue.call(this, el);
      } else {
        return getInputValue(el);
      }
    }
  }]);

  return Binding;
}();

exports.Binding = Binding;

/***/ }),

/***/ "./src/component-binding.js":
/*!**********************************!*\
  !*** ./src/component-binding.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentBinding = void 0;

var _tinybind = _interopRequireDefault(__webpack_require__(/*! ./tinybind */ "./src/tinybind.js"));

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.js");

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.ts");

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Used also in parsers.parseType
 * TODO outsource
 */
var PRIMITIVE = 0;
var KEYPATH = 1; // component view encapsulated as a binding within it's parent view.

var ComponentBinding =
/*#__PURE__*/
function (_Binding) {
  _inherits(ComponentBinding, _Binding);

  // Initializes a component binding for the specified view. The raw component
  // element is passed in along with the component type. Attributes and scope
  // inflections are determined based on the components defined attributes.
  function ComponentBinding(view, el, type) {
    var _this;

    _classCallCheck(this, ComponentBinding);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentBinding).call(this, view, el, type, null, null, null, null));
    _this.view = view;
    _this.el = el;
    _this.type = type;
    _this.component = view.options.components[_this.type];
    _this.static = {};
    _this.observers = {};
    _this.upstreamObservers = {};
    var bindingPrefix = _tinybind.default._fullPrefix; // parse component attributes

    for (var i = 0, len = el.attributes.length; i < len; i++) {
      var attribute = el.attributes[i]; // if attribute starts not with binding prefix. E.g. rv-

      if (attribute.name.indexOf(bindingPrefix) !== 0) {
        var propertyName = _this.camelCase(attribute.name);

        var token = (0, _parsers.parseType)(attribute.value);
        var stat = _this.component.static;

        if (stat && stat.indexOf(propertyName) > -1) {
          _this.static[propertyName] = attribute.value;
        } else if (token.type === PRIMITIVE) {
          _this.static[propertyName] = token.value;
        } else if (token.type === KEYPATH) {
          _this.observers[propertyName] = attribute.value;
        } else {
          throw new Error('can\'t parse component attribute', attribute, token);
        }
      }
    }

    return _this;
  } // Intercepts `tinybind.Binding::sync` since component bindings are not bound to
  // a particular model to update it's value.


  _createClass(ComponentBinding, [{
    key: "sync",
    value: function sync() {} // Intercepts `tinybind.Binding::update` since component bindings are not bound
    // to a particular model to update it's value.

  }, {
    key: "update",
    value: function update() {} // Intercepts `tinybind.Binding::publish` since component bindings are not bound
    // to a particular model to update it's value.

  }, {
    key: "publish",
    value: function publish() {} // Returns an object map using the component's scope inflections.

  }, {
    key: "locals",
    value: function locals() {
      var _this2 = this;

      var result = {};
      Object.keys(this.static).forEach(function (key) {
        result[key] = _this2.static[key];
      });
      Object.keys(this.observers).forEach(function (key) {
        result[key] = _this2.observers[key].value();
      });
      return result;
    } // Returns a camel-cased version of the string. Used when translating an
    // element's attribute name into a property name for the component's scope.

  }, {
    key: "camelCase",
    value: function camelCase(string) {
      return string.replace(/-([a-z])/g, function (grouped) {
        return grouped[1].toUpperCase();
      });
    } // Intercepts `tinybind.Binding::bind` to build `this.componentView` with a localized
    // map of models from the root view. Bind `this.componentView` on subsequent calls.

  }, {
    key: "bind",
    value: function bind() {
      var _this3 = this;

      var options = {};

      if (!this.bound) {
        Object.keys(this.observers).forEach(function (key) {
          var keypath = _this3.observers[key];
          _this3.observers[key] = _this3.observe(_this3.view.models, keypath, function (key) {
            return function () {
              _this3.componentView.models[key] = _this3.observers[key].value();
            };
          }.call(_this3, key));
        });
        this.bound = true;
      }

      if (this.componentView) {
        this.componentView.bind();
      } else {
        this.el.innerHTML = this.component.template.call(this);
        var scope = this.component.initialize.call(this, this.el, this.locals());
        this.el._bound = true;

        _constants.EXTENSIONS.forEach(function (extensionType) {
          options[extensionType] = {};

          if (_this3.component[extensionType]) {
            Object.keys(_this3.component[extensionType]).forEach(function (key) {
              options[extensionType][key] = _this3.component[extensionType][key];
            });
          }

          Object.keys(_this3.view.options[extensionType]).forEach(function (key) {
            if (options[extensionType][key]) {
              options[extensionType][key] = _this3.view[extensionType][key];
            }
          });
        });

        _constants.OPTIONS.forEach(function (option) {
          if (_this3.component[option] != null) {
            options[option] = _this3.component[option];
          } else {
            options[option] = _this3.view[option];
          }
        }); //there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
        //this.componentView = new View(this.el, scope, options)
        //this.componentView.bind()


        this.componentView = _tinybind.default.bind(Array.prototype.slice.call(this.el.childNodes), scope, options);
        Object.keys(this.observers).forEach(function (key) {
          var observer = _this3.observers[key];
          var models = _this3.componentView.models;

          var upstream = _this3.observe(models, key, function (key, observer) {
            return function () {
              observer.setValue(_this3.componentView.models[key]);
            };
          }.call(_this3, key, observer));

          _this3.upstreamObservers[key] = upstream;
        });
      }
    } // Intercept `tinybind.Binding::unbind` to be called on `this.componentView`.

  }, {
    key: "unbind",
    value: function unbind() {
      var _this4 = this;

      Object.keys(this.upstreamObservers).forEach(function (key) {
        _this4.upstreamObservers[key].unobserve();
      });
      Object.keys(this.observers).forEach(function (key) {
        _this4.observers[key].unobserve();
      });

      if (this.componentView) {
        this.componentView.unbind.call(this);
      }
    }
  }]);

  return ComponentBinding;
}(_binding.Binding);

exports.ComponentBinding = ComponentBinding;

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXTENSIONS = exports.OPTIONS = void 0;
var OPTIONS = ['prefix', 'templateDelimiters', 'rootInterface', 'preloadData', 'handler'];
exports.OPTIONS = OPTIONS;
var EXTENSIONS = ['binders', 'formatters', 'components', 'adapters'];
exports.EXTENSIONS = EXTENSIONS;

/***/ }),

/***/ "./src/export.ts":
/*!***********************!*\
  !*** ./src/export.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tinybind = _interopRequireDefault(__webpack_require__(/*! ./tinybind */ "./src/tinybind.js"));

var _view = _interopRequireDefault(__webpack_require__(/*! ./view */ "./src/view.js"));

var _adapter = _interopRequireDefault(__webpack_require__(/*! ./adapter */ "./src/adapter.js"));

var _binders = _interopRequireDefault(__webpack_require__(/*! ./binders */ "./src/binders.js"));

var _sightglass = __webpack_require__(/*! ./sightglass */ "./src/sightglass.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the public interface.
_tinybind.default.binders = _binders.default;
_tinybind.default.adapters['.'] = _adapter.default;

var mergeObject = function mergeObject(target, obj) {
  console.log('mergeObject', target, obj);
  Object.keys(obj).forEach(function (key) {
    if (!target[key] || target[key] === {}) {
      target[key] = obj[key];
    }
  });
  console.log('result', target);
  return target;
}; // Binds some data to a template / element. Returns a tinybind.View instance.


_tinybind.default.bind = function (el, models, options) {
  var viewOptions = {
    // EXTENSIONS
    binders: {},
    formatters: {},
    components: {},
    adapters: {},
    // other
    starBinders: {}
  };
  models = models || {}; // options = options || {};

  if (options) {
    mergeObject(viewOptions.binders, options.binders);
    mergeObject(viewOptions.formatters, options.formatters);
    mergeObject(viewOptions.components, options.components);
    mergeObject(viewOptions.adapters, options.adapters);
    viewOptions.prefix = options.prefix ? options.prefix : _tinybind.default.prefix;
    viewOptions.templateDelimiters = options.templateDelimiters ? options.templateDelimiters : _tinybind.default.templateDelimiters;
    viewOptions.rootInterface = options.prefix ? options.rootInterface : _tinybind.default.rootInterface;
    viewOptions.preloadData = options.prefix ? options.preloadData : _tinybind.default.preloadData;
    viewOptions.handler = options.prefix ? options.handler : _tinybind.default.handler;
  } // merge extensions


  mergeObject(viewOptions.binders, _tinybind.default.binders);
  mergeObject(viewOptions.formatters, _tinybind.default.formatters);
  mergeObject(viewOptions.components, _tinybind.default.components);
  mergeObject(viewOptions.adapters, _tinybind.default.adapters); // get all starBinders from available binders

  viewOptions.starBinders = Object.keys(viewOptions.binders).filter(function (key) {
    return key.indexOf('*') > 0;
  });

  _sightglass.Observer.updateOptions(viewOptions);

  var view = new _view.default(el, models, viewOptions);
  view.bind();
  return view;
}; // Initializes a new instance of a component on the specified element and
// returns a tinybind.View instance.	


_tinybind.default.init = function (componentKey, el) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!el) {
    el = document.createElement('div');
  }

  var component = _tinybind.default.components[componentKey];
  el.innerHTML = component.template.call(_tinybind.default, el);
  var scope = component.initialize.call(_tinybind.default, el, data);

  var view = _tinybind.default.bind(el, scope);

  view.bind();
  return view;
};

_tinybind.default.formatters.negate = _tinybind.default.formatters.not = function (value) {
  return !value;
};

var _default = _tinybind.default;
exports.default = _default;

/***/ }),

/***/ "./src/parsers.js":
/*!************************!*\
  !*** ./src/parsers.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isJson = isJson;
exports.parseType = parseType;
exports.parseTemplate = parseTemplate;

/**
 * Used also in parsers.parseType
 * TODO outsource
 */
var PRIMITIVE = 0;
var KEYPATH = 1;
var QUOTED_STR = /^'.*'$|^".*"$/; // regex to test if string is wrapped in " or '
// Used in parsers.parseTemplate

var TEXT = 0;
var BINDING = 1; // Test if string is a json string

function isJson(str) {
  try {
    var val = JSON.parse(str);
    return val instanceof Array || val instanceof Object ? true : false;
  } catch (error) {
    return false;
  }
} // Parser and tokenizer for getting the type and value from a string.


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
  } else if (isJson(string)) {
    value = JSON.parse(string);
  } else {
    type = KEYPATH;
  }

  return {
    type: type,
    value: value
  };
} // Template parser and tokenizer for mustache-style text content bindings.
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
      tokens = tokens || [];

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

/***/ }),

/***/ "./src/sightglass.js":
/*!***************************!*\
  !*** ./src/sightglass.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = Observer;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Check if a value is an object than can be observed.
function isObject(obj) {
  return _typeof(obj) === 'object' && obj !== null;
} // Error thrower.


function error(message) {
  throw new Error('[Observer] ' + message);
} // workaround


window.adapters;
window.interfaces;
window.rootInterface; // Constructs a new keypath observer and kicks things off.

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
  window.adapters = options.adapters;
  window.interfaces = Object.keys(adapters);
  window.rootInterface = options.rootInterface;
}; // Tokenizes the provided keypath string into interface + path tokens for the
// observer to work with.


Observer.tokenize = function (keypath, root) {
  var tokens = [];
  var current = {
    i: root,
    path: ''
  };
  var index, chr;

  for (index = 0; index < keypath.length; index++) {
    chr = keypath.charAt(index);

    if (!!~interfaces.indexOf(chr)) {
      tokens.push(current);
      current = {
        i: chr,
        path: ''
      };
    } else {
      current.path += chr;
    }
  }

  tokens.push(current);
  return tokens;
}; // Parses the keypath using the interfaces defined on the view. Sets variables
// for the tokenized keypath as well as the end key.


Observer.prototype.parse = function () {
  var path, root;

  if (!window.interfaces.length) {
    error('Must define at least one adapter interface.');
  }

  if (!!~window.interfaces.indexOf(this.keypath[0])) {
    root = this.keypath[0];
    path = this.keypath.substr(1);
  } else {
    root = window.rootInterface;
    path = this.keypath;
  }

  this.tokens = Observer.tokenize(path, root);
  this.key = this.tokens.pop();
}; // Realizes the full keypath, attaching observers for every key and correcting
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
}; // Updates the keypath. This is called when any intermediary key is changed.


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
}; // Reads the current end value of the observed keypath. Returns undefined if
// the full keypath is unreachable.


Observer.prototype.value = function () {
  if (isObject(this.target)) {
    return this.get(this.key, this.target);
  }
}; // Sets the current end value of the observed keypath. Calling setValue when
// the full keypath is unreachable is a no-op.


Observer.prototype.setValue = function (value) {
  if (isObject(this.target)) {
    adapters[this.key.i].set(this.target, this.key.path, value);
  }
}; // Gets the provided key on an object.


Observer.prototype.get = function (key, obj) {
  console.log;
  return adapters[key.i].get(obj, key.path);
}; // Observes or unobserves a callback on the object using the provided key.


Observer.prototype.set = function (active, key, obj, callback) {
  console.log('set ', active, key, obj);
  var action = active ? 'observe' : 'unobserve';
  adapters[key.i][action](obj, key.path, callback);
}; // Unobserves the entire keypath.


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
}; // traverse the scope chain to find the scope which has the root property
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

/***/ }),

/***/ "./src/tinybind.js":
/*!*************************!*\
  !*** ./src/tinybind.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.ts");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.js");

var tinybind = {
  // Global binders.
  binders: {},
  // Global components.
  components: {},
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

  parseTemplate: _parsers.parseTemplate,
  parseType: _parsers.parseType,
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

      if (_constants.EXTENSIONS.indexOf(option) > -1) {
        Object.keys(value).forEach(function (key) {
          _this[option][key] = value[key];
        });
      } else {
        _this[option] = value;
      }
    });
  }
};
var _default = tinybind;
exports.default = _default;

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tinybind = _interopRequireDefault(__webpack_require__(/*! ./tinybind */ "./src/tinybind.js"));

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.js");

var _componentBinding = __webpack_require__(/*! ./component-binding */ "./src/component-binding.js");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var textBinder = {
  routine: function routine(node, value) {
    node.data = value != null ? value : '';
  }
};
var DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;

var parseNode = function parseNode(view, node) {
  var block = false;

  if (node.nodeType === 3) {
    var tokens = (0, _parsers.parseTemplate)(node.data, _tinybind.default.templateDelimiters);

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
}; // A collection of bindings built from a set of parent nodes.


var View =
/*#__PURE__*/
function () {
  // The DOM elements and the model objects for binding are passed into the
  // constructor along with any local options that should be used throughout the
  // context of the view and it's bindings.
  function View(els, models, options) {
    _classCallCheck(this, View);

    if (els.jquery || els instanceof Array) {
      this.els = els;
    } else {
      this.els = [els];
    }

    this.models = models;
    this.options = options;
    this.build();
  }

  _createClass(View, [{
    key: "buildBinding",
    value: function buildBinding(node, type, declaration, binder, args) {
      var pipes = declaration.match(DECLARATION_SPLIT).map(trimStr);
      var keypath = pipes.shift();
      this.bindings.push(new _binding.Binding(this, node, type, keypath, binder, args, pipes));
    } // Parses the DOM tree and builds `Binding` instances for every matched
    // binding declaration.

  }, {
    key: "build",
    value: function build() {
      this.bindings = [];
      var elements = this.els,
          i,
          len;

      for (i = 0, len = elements.length; i < len; i++) {
        parseNode(this, elements[i]);
      }

      this.bindings.sort(bindingComparator);
    }
  }, {
    key: "traverse",
    value: function traverse(node) {
      var bindingPrefix = _tinybind.default._fullPrefix;
      var block = node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE';
      var attributes = node.attributes;
      var bindInfos = [];
      var starBinders = this.options.starBinders;
      var type, binder, identifier, args;

      for (var i = 0, len = attributes.length; i < len; i++) {
        var attribute = attributes[i]; // if attribute starts with the binding prefix. E.g. rv

        if (attribute.name.indexOf(bindingPrefix) === 0) {
          type = attribute.name.slice(bindingPrefix.length);
          binder = this.options.binders[type];
          args = [];

          if (!binder) {
            for (var k = 0; k < starBinders.length; k++) {
              identifier = starBinders[k];

              if (type.slice(0, identifier.length - 1) === identifier.slice(0, -1)) {
                binder = this.options.binders[identifier];
                args.push(type.slice(identifier.length - 1));
                break;
              }
            }
          }

          if (!binder) {
            binder = _tinybind.default.fallbackBinder;
          }

          if (binder.block) {
            this.buildBinding(node, type, attribute.value, binder, args);
            node.removeAttribute(attribute.name);
            return true;
          }

          bindInfos.push({
            attr: attribute,
            binder: binder,
            type: type,
            args: args
          });
        }
      }

      for (var _i2 = 0; _i2 < bindInfos.length; _i2++) {
        var bindInfo = bindInfos[_i2];
        this.buildBinding(node, bindInfo.type, bindInfo.attr.value, bindInfo.binder, bindInfo.args);
        node.removeAttribute(bindInfo.attr.name);
      } // bind components


      if (!block) {
        type = node.nodeName.toLowerCase();

        if (this.options.components[type] && !node._bound) {
          this.bindings.push(new _componentBinding.ComponentBinding(this, node, type));
          block = true;
        }
      }

      return block;
    } // Binds all of the current bindings for this view.

  }, {
    key: "bind",
    value: function bind() {
      this.bindings.forEach(function (binding) {
        binding.bind();
      });
    } // Unbinds all of the current bindings for this view.

  }, {
    key: "unbind",
    value: function unbind() {
      if (Array.isArray(this.bindings)) {
        this.bindings.forEach(function (binding) {
          binding.unbind();
        });
      }

      if (this.componentView) {
        this.componentView.unbind();
      }
    } // Syncs up the view with the model by running the routines on all bindings.

  }, {
    key: "sync",
    value: function sync() {
      this.bindings.forEach(function (binding) {
        binding.sync();
      });
    } // Publishes the input values from the view back to the model (reverse sync).

  }, {
    key: "publish",
    value: function publish() {
      this.bindings.forEach(function (binding) {
        if (binding.binder && binding.binder.publishes) {
          binding.publish();
        }
      });
    } // Updates the view's models along with any affected bindings.

  }, {
    key: "update",
    value: function update() {
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
    }
  }]);

  return View;
}();

exports.default = View;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci5qcyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2V4cG9ydC50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLmpzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3NpZ2h0Z2xhc3MuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdGlueWJpbmQuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdmlldy5qcyJdLCJuYW1lcyI6WyJBUlJBWV9NRVRIT0RTIiwiYWRhcHRlciIsImNvdW50ZXIiLCJ3ZWFrbWFwIiwid2Vha1JlZmVyZW5jZSIsIm9iaiIsImhhc093blByb3BlcnR5IiwiaWQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiX19ydiIsImNhbGxiYWNrcyIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwicmVmIiwia2V5cyIsImxlbmd0aCIsInBvaW50ZXJzIiwic3R1YkZ1bmN0aW9uIiwiZm4iLCJvcmlnaW5hbCIsIm1hcCIsImFyZ3MiLCJyZXNwb25zZSIsImFwcGx5IiwiZm9yRWFjaCIsImsiLCJyIiwiQXJyYXkiLCJjYWxsYmFjayIsInN5bmMiLCJvYnNlcnZlTXV0YXRpb25zIiwia2V5cGF0aCIsImluZGV4T2YiLCJwdXNoIiwidW5vYnNlcnZlTXV0YXRpb25zIiwiaWR4Iiwic3BsaWNlIiwib2JzZXJ2ZSIsImRlc2MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXQiLCJzZXQiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwibmV3VmFsdWUiLCJjYiIsInVub2JzZXJ2ZSIsImdldFN0cmluZyIsInRvU3RyaW5nIiwidW5kZWZpbmVkIiwidGltZXMiLCJuIiwiaSIsImNyZWF0ZVZpZXciLCJiaW5kaW5nIiwiZGF0YSIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiYmluZGVycyIsImZ1bmN0aW9uIiwicHJpb3JpdHkiLCJ1bmJpbmQiLCJoYW5kbGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiRXJyb3IiLCJpbmRleFByb3AiLCJnZXRBdHRyaWJ1dGUiLCJnZXRJdGVyYXRpb25BbGlhcyIsIm1vZGVsIiwiaW5kZXgiLCIkcGFyZW50IiwibW9kZWxzIiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJrZXkiLCJlbENsYXNzIiwiY2xhc3NOYW1lIiwicmVwbGFjZSIsInRyaW0iLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJodG1sIiwiaW5uZXJIVE1MIiwic2hvdyIsInN0eWxlIiwiZGlzcGxheSIsImhpZGUiLCJlbmFibGVkIiwiZGlzYWJsZWQiLCJjaGVja2VkIiwicHVibGlzaGVzIiwic2VsZiIsInB1Ymxpc2giLCJpc1JhZGlvIiwidGFnTmFtZSIsImV2ZW50Iiwic2V0QXR0cmlidXRlIiwib3B0aW9uIiwic2VsZWN0ZWQiLCJpZiIsImF0dGFjaGVkIiwiYm91bmQiLCJuZXN0ZWQiLCJnZXRJbnB1dFZhbHVlIiwicmVzdWx0cyIsIkZPUk1BVFRFUl9BUkdTIiwiRk9STUFUVEVSX1NQTElUIiwiUFJJTUlUSVZFIiwiS0VZUEFUSCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiZm9ybWF0dGVyT2JzZXJ2ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIm9ic2VydmVyIiwidGFyZ2V0IiwiZm9ybWF0dGVySW5kZXgiLCJwYXJzZVR5cGUiLCJhaSIsInJlZHVjZSIsInJlc3VsdCIsImRlY2xhcmF0aW9uIiwibWF0Y2giLCJzaGlmdCIsImZvcm1hdHRlciIsInByb2Nlc3NlZEFyZ3MiLCJwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyIsInJlYWQiLCJGdW5jdGlvbiIsImV2IiwiY2FsbCIsImZvcm1hdHRlZFZhbHVlIiwicm91dGluZUZuIiwicmVkdWNlUmlnaHQiLCJzcGxpdCIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJwYXJzZVRhcmdldCIsInByZWxvYWREYXRhIiwiZmkiLCJDb21wb25lbnRCaW5kaW5nIiwiY29tcG9uZW50IiwiY29tcG9uZW50cyIsInN0YXRpYyIsIm9ic2VydmVycyIsInVwc3RyZWFtT2JzZXJ2ZXJzIiwiYmluZGluZ1ByZWZpeCIsInRpbnliaW5kIiwiX2Z1bGxQcmVmaXgiLCJsZW4iLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlIiwibmFtZSIsInByb3BlcnR5TmFtZSIsImNhbWVsQ2FzZSIsInN0YXQiLCJzdHJpbmciLCJncm91cGVkIiwidG9VcHBlckNhc2UiLCJjb21wb25lbnRWaWV3Iiwic2NvcGUiLCJpbml0aWFsaXplIiwibG9jYWxzIiwiX2JvdW5kIiwiRVhURU5TSU9OUyIsImV4dGVuc2lvblR5cGUiLCJPUFRJT05TIiwicHJvdG90eXBlIiwic2xpY2UiLCJjaGlsZE5vZGVzIiwidXBzdHJlYW0iLCJhZGFwdGVycyIsIm1lcmdlT2JqZWN0IiwiY29uc29sZSIsImxvZyIsInZpZXdPcHRpb25zIiwic3RhckJpbmRlcnMiLCJwcmVmaXgiLCJ0ZW1wbGF0ZURlbGltaXRlcnMiLCJyb290SW50ZXJmYWNlIiwiZmlsdGVyIiwidXBkYXRlT3B0aW9ucyIsImluaXQiLCJjb21wb25lbnRLZXkiLCJjcmVhdGVFbGVtZW50IiwibmVnYXRlIiwibm90IiwiUVVPVEVEX1NUUiIsIlRFWFQiLCJCSU5ESU5HIiwiaXNKc29uIiwic3RyIiwidmFsIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZVRlbXBsYXRlIiwiZGVsaW1pdGVycyIsInRva2VucyIsImxhc3RJbmRleCIsIm9wZW4iLCJjbG9zZSIsInN1YnN0cmluZyIsImxhc3RUb2tlbiIsImlzT2JqZWN0IiwibWVzc2FnZSIsIndpbmRvdyIsImludGVyZmFjZXMiLCJvYmplY3RQYXRoIiwiZ2V0Um9vdE9iamVjdCIsInJlYWxpemUiLCJ0b2tlbml6ZSIsInJvb3QiLCJjdXJyZW50IiwicGF0aCIsImNociIsImNoYXJBdCIsInN1YnN0ciIsInVucmVhY2hlZCIsInByZXYiLCJuZXh0Iiwib2xkVmFsdWUiLCJhY3RpdmUiLCJhY3Rpb24iLCJyb290UHJvcCIsIl9wcmVmaXgiLCJjb250ZXh0IiwiZmFsbGJhY2tCaW5kZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25maWd1cmUiLCJ0ZXh0QmluZGVyIiwibm9kZSIsIkRFQ0xBUkFUSU9OX1NQTElUIiwicGFyc2VOb2RlIiwibm9kZVR5cGUiLCJjcmVhdGVUZXh0Tm9kZSIsImJ1aWxkQmluZGluZyIsInRyYXZlcnNlIiwiYmluZGluZ0NvbXBhcmF0b3IiLCJhIiwiYiIsImFQcmlvcml0eSIsImJQcmlvcml0eSIsInRyaW1TdHIiLCJqcXVlcnkiLCJidWlsZCIsInBpcGVzIiwiZWxlbWVudHMiLCJzb3J0IiwiYmluZEluZm9zIiwiaWRlbnRpZmllciIs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QVIsSUFBa0JyRixRQUFRcUYsTUFBUixDQUFlcEIsU0FBckMsRUFBZ0Q7QUFDOUNqRSxrQkFBUW1FLE9BQVI7QUFDRDtBQUNGLE9BSkQ7QUFLRCxLLENBRUQ7Ozs7NkJBQ29CO0FBQUE7O0FBQUEsVUFBYjdCLE1BQWEsdUVBQUosRUFBSTtBQUNsQnJGLGFBQU9PLElBQVAsQ0FBWThFLE1BQVosRUFBb0JwRSxPQUFwQixDQUE0QixlQUFPO0FBQ2pDLGNBQUtvRSxNQUFMLENBQVlXLEdBQVosSUFBbUJYLE9BQU9XLEdBQVAsQ0FBbkI7QUFDRCxPQUZEO0FBSUEsV0FBS0YsUUFBTCxDQUFjN0UsT0FBZCxDQUFzQixtQkFBVztBQUMvQixZQUFJOEIsUUFBUWdELE1BQVosRUFBb0I7QUFDbEJoRCxrQkFBUWdELE1BQVIsQ0FBZVYsTUFBZjtBQUNEO0FBQ0YsT0FKRDtBQUtEIiwiZmlsZSI6InRpbnliaW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2V4cG9ydC50c1wiKTtcbiIsIi8vIFRoZSBkZWZhdWx0IGAuYCBhZGFwdGVyIHRoYXQgY29tZXMgd2l0aCB0aW55YmluZC5qcy4gQWxsb3dzIHN1YnNjcmliaW5nIHRvXG4vLyBwcm9wZXJ0aWVzIG9uIHBsYWluIG9iamVjdHMsIGltcGxlbWVudGVkIGluIEVTNSBuYXRpdmVzIHVzaW5nXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YC5cblxuY29uc3QgQVJSQVlfTUVUSE9EUyA9IFtcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJyxcbiAgJ3NwbGljZSdcbl07XG5cbmNvbnN0IGFkYXB0ZXIgPSB7XG4gIGNvdW50ZXI6IDAsXG4gIHdlYWttYXA6IHt9LFxuXG4gIHdlYWtSZWZlcmVuY2U6IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KCdfX3J2JykpIHtcbiAgICAgIGxldCBpZCA9IHRoaXMuY291bnRlcisrO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnX19ydicsIHtcbiAgICAgICAgdmFsdWU6IGlkXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMud2Vha21hcFtvYmouX19ydl0pIHtcbiAgICAgIHRoaXMud2Vha21hcFtvYmouX19ydl0gPSB7XG4gICAgICAgIGNhbGxiYWNrczoge31cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMud2Vha21hcFtvYmouX19ydl07XG4gIH0sXG5cbiAgY2xlYW51cFdlYWtSZWZlcmVuY2U6IGZ1bmN0aW9uKHJlZiwgaWQpIHtcbiAgICBpZiAoIU9iamVjdC5rZXlzKHJlZi5jYWxsYmFja3MpLmxlbmd0aCkge1xuICAgICAgaWYgKCEocmVmLnBvaW50ZXJzICYmIE9iamVjdC5rZXlzKHJlZi5wb2ludGVycykubGVuZ3RoKSkge1xuICAgICAgICBkZWxldGUgdGhpcy53ZWFrbWFwW2lkXTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc3R1YkZ1bmN0aW9uOiBmdW5jdGlvbihvYmosIGZuKSB7XG4gICAgbGV0IG9yaWdpbmFsID0gb2JqW2ZuXTtcbiAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG4gICAgbGV0IHdlYWttYXAgPSB0aGlzLndlYWttYXA7XG5cbiAgICBvYmpbZm5dID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IG9yaWdpbmFsLmFwcGx5KG9iaiwgYXJncyk7XG5cbiAgICAgIE9iamVjdC5rZXlzKG1hcC5wb2ludGVycykuZm9yRWFjaChyID0+IHtcbiAgICAgICAgbGV0IGsgPSBtYXAucG9pbnRlcnNbcl07XG5cbiAgICAgICAgaWYgKHdlYWttYXBbcl0pIHtcbiAgICAgICAgICBpZiAod2Vha21hcFtyXS5jYWxsYmFja3Nba10gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgd2Vha21hcFtyXS5jYWxsYmFja3Nba10uZm9yRWFjaChjYWxsYmFjayA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrLnN5bmMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuICB9LFxuXG4gIG9ic2VydmVNdXRhdGlvbnM6IGZ1bmN0aW9uKG9iaiwgcmVmLCBrZXlwYXRoKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzKSB7XG4gICAgICAgIG1hcC5wb2ludGVycyA9IHt9O1xuXG4gICAgICAgIEFSUkFZX01FVEhPRFMuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgdGhpcy5zdHViRnVuY3Rpb24ob2JqLCBmbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1hcC5wb2ludGVyc1tyZWZdKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdID0gW107XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXAucG9pbnRlcnNbcmVmXS5pbmRleE9mKGtleXBhdGgpID09PSAtMSkge1xuICAgICAgICBtYXAucG9pbnRlcnNbcmVmXS5wdXNoKGtleXBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB1bm9ic2VydmVNdXRhdGlvbnM6IGZ1bmN0aW9uKG9iaiwgcmVmLCBrZXlwYXRoKSB7XG4gICAgaWYgKChvYmogaW5zdGFuY2VvZiBBcnJheSkgJiYgKG9iai5fX3J2ICE9IG51bGwpKSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgaWYgKG1hcCkge1xuICAgICAgICBsZXQgcG9pbnRlcnMgPSBtYXAucG9pbnRlcnNbcmVmXTtcblxuICAgICAgICBpZiAocG9pbnRlcnMpIHtcbiAgICAgICAgICBsZXQgaWR4ID0gcG9pbnRlcnMuaW5kZXhPZihrZXlwYXRoKTtcblxuICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgcG9pbnRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAucG9pbnRlcnNbcmVmXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG9ic2VydmU6IGZ1bmN0aW9uKG9iaiwga2V5cGF0aCwgY2FsbGJhY2spIHtcbiAgICB2YXIgdmFsdWU7XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopLmNhbGxiYWNrcztcblxuICAgIGlmICghY2FsbGJhY2tzW2tleXBhdGhdKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0gPSBbXTtcbiAgICAgIGxldCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXBhdGgpO1xuXG4gICAgICBpZiAoIWRlc2MgfHwgIShkZXNjLmdldCB8fCBkZXNjLnNldCB8fCAhZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleXBhdGhdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleXBhdGgsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyh2YWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaChjYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2Iuc3luYygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlTXV0YXRpb25zKG5ld1ZhbHVlLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjYWxsYmFja3Nba2V5cGF0aF0uaW5kZXhPZihjYWxsYmFjaykgPT09IC0xKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0ucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgdGhpcy5vYnNlcnZlTXV0YXRpb25zKG9ialtrZXlwYXRoXSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICB9LFxuXG4gIHVub2JzZXJ2ZTogZnVuY3Rpb24ob2JqLCBrZXlwYXRoLCBjYWxsYmFjaykge1xuICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgaWYgKG1hcCkge1xuICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgbGV0IGlkeCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcblxuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgICBpZiAoIWNhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuICAgICAgICAgICAgdGhpcy51bm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhbnVwV2Vha1JlZmVyZW5jZShtYXAsIG9iai5fX3J2KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgZ2V0OiBmdW5jdGlvbihvYmosIGtleXBhdGgpIHtcbiAgICByZXR1cm4gb2JqW2tleXBhdGhdO1xuICB9LFxuXG4gIHNldDogKG9iaiwga2V5cGF0aCwgdmFsdWUpID0+IHtcbiAgICBvYmpba2V5cGF0aF0gPSB2YWx1ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IGdldFN0cmluZyA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCB0aW1lcyA9IChuLCBjYikgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgY2IoKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVZpZXcoYmluZGluZywgZGF0YSwgYW5jaG9yRWwpIHtcbiAgbGV0IHRlbXBsYXRlID0gYmluZGluZy5lbC5jbG9uZU5vZGUodHJ1ZSk7XG4gIGxldCB2aWV3ID0gbmV3IFZpZXcodGVtcGxhdGUsIGRhdGEsIGJpbmRpbmcudmlldy5vcHRpb25zKTtcbiAgdmlldy5iaW5kKCk7XG4gIGJpbmRpbmcubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRlbXBsYXRlLCBhbmNob3JFbCk7XG4gIHJldHVybiB2aWV3O1xufVxuXG5jb25zdCBiaW5kZXJzID0ge1xuICAvLyBCaW5kcyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBlbGVtZW50LlxuICAnb24tKic6IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBwcmlvcml0eTogMTAwMCxcblxuICAgIHVuYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuaGFuZGxlcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmU6IGZ1bmN0aW9uKGVsLCB2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5oYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oYW5kbGVyID0gdGhpcy5ldmVudEhhbmRsZXIodmFsdWUpO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuaGFuZGxlcik7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFwcGVuZHMgYm91bmQgaW5zdGFuY2VzIG9mIHRoZSBlbGVtZW50IGluIHBsYWNlIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5LlxuICAnZWFjaC0qJzoge1xuICAgIGJsb2NrOiB0cnVlLFxuXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsKSB7XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChgIHRpbnliaW5kOiAke3RoaXMudHlwZX0gYCk7XG4gICAgICAgIHRoaXMuaXRlcmF0ZWQgPSBbXTtcblxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXRlcmF0ZWQuZm9yRWFjaCh2aWV3ID0+IHtcbiAgICAgICAgICB2aWV3LmJpbmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZChlbCkge1xuICAgICAgaWYgKHRoaXMuaXRlcmF0ZWQpIHtcbiAgICAgICAgdGhpcy5pdGVyYXRlZC5mb3JFYWNoKHZpZXcgPT4ge1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsLCBjb2xsZWN0aW9uKSB7XG4gICAgICBsZXQgbW9kZWxOYW1lID0gdGhpcy5hcmdzWzBdO1xuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24gfHwgW107XG5cbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBvYmplY3Qga2V5cyB0byBpdGVyYXRlIG92ZXJcbiAgICAgIGlmKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZWFjaC0nICsgbW9kZWxOYW1lICsgJyBuZWVkcyBhbiBhcnJheSB0byBpdGVyYXRlIG92ZXIsIGJ1dCBpdCBpcycsIGNvbGxlY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBpbmRleCBuYW1lIGlzIHNldGVkIGJ5IGBpbmRleC1wcm9wZXJ0eWAgdXNlIHRoaXMgbmFtZSwgb3RoZXJ3aXNlIGAlW21vZGVsTmFtZV0lYCAgXG4gICAgICBsZXQgaW5kZXhQcm9wID0gZWwuZ2V0QXR0cmlidXRlKCdpbmRleC1wcm9wZXJ0eScpIHx8IHRoaXMuZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lKTtcblxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChtb2RlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSB7JHBhcmVudDogdGhpcy52aWV3Lm1vZGVsc307XG4gICAgICAgIGRhdGFbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICBkYXRhW21vZGVsTmFtZV0gPSBtb2RlbDtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLml0ZXJhdGVkW2luZGV4XTtcblxuICAgICAgICBpZiAoIXZpZXcpIHtcblxuICAgICAgICAgIGxldCBwcmV2aW91cyA9IHRoaXMubWFya2VyO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaXRlcmF0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHRoaXMuaXRlcmF0ZWRbdGhpcy5pdGVyYXRlZC5sZW5ndGggLSAxXS5lbHNbMF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlldyA9IGNyZWF0ZVZpZXcodGhpcywgZGF0YSwgcHJldmlvdXMubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuaXRlcmF0ZWQucHVzaCh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldy5tb2RlbHNbbW9kZWxOYW1lXSAhPT0gbW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgbW9kZWxcbiAgICAgICAgICAgIGxldCBtYXRjaEluZGV4LCBuZXh0VmlldztcbiAgICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IGluZGV4ICsgMTsgbmV4dEluZGV4IDwgdGhpcy5pdGVyYXRlZC5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gdGhpcy5pdGVyYXRlZFtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAobmV4dFZpZXcubW9kZWxzW21vZGVsTmFtZV0gPT09IG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hJbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBtb2RlbCBpcyBpbiBvdGhlciBwb3NpdGlvblxuICAgICAgICAgICAgICAvLyB0b2RvOiBjb25zaWRlciBhdm9pZGluZyB0aGUgc3BsaWNlIGhlcmUgYnkgc2V0dGluZyBhIGZsYWdcbiAgICAgICAgICAgICAgLy8gcHJvZmlsZSBwZXJmb3JtYW5jZSBiZWZvcmUgaW1wbGVtZW50aW5nIHN1Y2ggY2hhbmdlXG4gICAgICAgICAgICAgIHRoaXMuaXRlcmF0ZWQuc3BsaWNlKG1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXh0Vmlldy5lbHNbMF0sIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgICAgbmV4dFZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vbmV3IG1vZGVsXG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gY3JlYXRlVmlldyh0aGlzLCBkYXRhLCB2aWV3LmVsc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLml0ZXJhdGVkLnNwbGljZShpbmRleCwgMCwgbmV4dFZpZXcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3Lm1vZGVsc1tpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuaXRlcmF0ZWQubGVuZ3RoID4gY29sbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgdGltZXModGhpcy5pdGVyYXRlZC5sZW5ndGggLSBjb2xsZWN0aW9uLmxlbmd0aCwgKCkgPT4ge1xuICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5pdGVyYXRlZC5wb3AoKTtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodmlldy5lbHNbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09PSAnT1BUSU9OJykge1xuICAgICAgICB0aGlzLnZpZXcuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICBpZiAoYmluZGluZy5lbCA9PT0gdGhpcy5tYXJrZXIucGFyZW50Tm9kZSAmJiBiaW5kaW5nLnR5cGUgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgIGJpbmRpbmcuc3luYygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZShtb2RlbHMpIHtcbiAgICAgIGxldCBkYXRhID0ge307XG5cbiAgICAgIC8vdG9kbzogYWRkIHRlc3QgYW5kIGZpeCBpZiBuZWNlc3NhcnlcblxuICAgICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgIT09IHRoaXMuYXJnc1swXSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IG1vZGVsc1trZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5pdGVyYXRlZC5mb3JFYWNoKHZpZXcgPT4ge1xuICAgICAgICB2aWV3LnVwZGF0ZShkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGNsYXNzIGZyb20gdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIGZhbHNlLlxuICAnY2xhc3MtKic6IGZ1bmN0aW9uKGVsLCB2YWx1ZSkge1xuICAgIGxldCBlbENsYXNzID0gYCAke2VsLmNsYXNzTmFtZX0gYDtcblxuICAgIGlmICh2YWx1ZSAhPT0gKGVsQ2xhc3MuaW5kZXhPZihgICR7dGhpcy5hcmdzWzBdfSBgKSA+IC0xKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gJHt0aGlzLmFyZ3NbMF19YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsQ2xhc3MucmVwbGFjZShgICR7dGhpcy5hcmdzWzBdfSBgLCAnICcpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIHRleHQgdmFsdWUuXG4gIHRleHQ6IChlbCwgdmFsdWUpID0+IHtcbiAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyBIVE1MIGNvbnRlbnQuXG4gIGh0bWw6IChlbCwgdmFsdWUpID0+IHtcbiAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvLyBTaG93cyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIHNob3c6IChlbCwgdmFsdWUpID0+IHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgfSxcblxuICAvLyBIaWRlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgKG5lZ2F0ZWQgdmVyc2lvbiBvZiBgc2hvd2AgYmluZGVyKS5cbiAgaGlkZTogKGVsLCB2YWx1ZSkgPT4ge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICcnO1xuICB9LFxuXG4gIC8vIEVuYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICBlbmFibGVkOiAoZWwsIHZhbHVlKSA9PiB7XG4gICAgZWwuZGlzYWJsZWQgPSAhdmFsdWU7XG4gIH0sXG5cbiAgLy8gRGlzYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYGVuYWJsZWRgIGJpbmRlcikuXG4gIGRpc2FibGVkOiAoZWwsIHZhbHVlKSA9PiB7XG4gICAgZWwuZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9LFxuXG4gIC8vIENoZWNrcyBhIGNoZWNrYm94IG9yIHJhZGlvIGlucHV0IHdoZW4gdGhlIHZhbHVlIGlzIHRydWUuIEFsc28gc2V0cyB0aGUgbW9kZWxcbiAgLy8gcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgaXMgY2hlY2tlZCBvciB1bmNoZWNrZWQgKHR3by13YXkgYmluZGVyKS5cbiAgY2hlY2tlZDoge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMjAwMCxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgcm91dGluZTogZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICBlbC5jaGVja2VkID0gZ2V0U3RyaW5nKGVsLnZhbHVlKSA9PT0gZ2V0U3RyaW5nKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgdmFsdWUuIEFsc28gc2V0cyB0aGUgbW9kZWwgcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgY2hhbmdlc1xuICAvLyAodHdvLXdheSBiaW5kZXIpLlxuICB2YWx1ZToge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMzAwMCxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB0aGlzLmlzUmFkaW8gPSBlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICdyYWRpbyc7XG4gICAgICBpZiAoIXRoaXMuaXNSYWRpbykge1xuICAgICAgICB0aGlzLmV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdldmVudC1uYW1lJykgfHwgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnID8gJ2NoYW5nZScgOiAnaW5wdXQnKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5jYWxsYmFjaykge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgaWYgKCF0aGlzLmlzUmFkaW8pIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZTogZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1tdWx0aXBsZScpIHtcbiAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZWxbaV07XG4gICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChnZXRTdHJpbmcodmFsdWUpICE9PSBnZXRTdHJpbmcoZWwudmFsdWUpKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBJbnNlcnRzIGFuZCBiaW5kcyB0aGUgZWxlbWVudCBhbmQgaXQncyBjaGlsZCBub2RlcyBpbnRvIHRoZSBET00gd2hlbiB0cnVlLlxuICBpZjoge1xuICAgIGJsb2NrOiB0cnVlLFxuICAgIHByaW9yaXR5OiA0MDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIGlmICghdGhpcy5tYXJrZXIpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcgdGlueWJpbmQ6ICcgKyB0aGlzLnR5cGUgKyAnICcgKyB0aGlzLmtleXBhdGggKyAnICcpO1xuICAgICAgICB0aGlzLmF0dGFjaGVkID0gZmFsc2U7XG5cbiAgICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5tYXJrZXIsIGVsKTtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYm91bmQgPT09IGZhbHNlICYmIHRoaXMubmVzdGVkKSB7XG4gICAgICAgIHRoaXMubmVzdGVkLmJpbmQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYm91bmQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMubmVzdGVkKSB7XG4gICAgICAgIHRoaXMubmVzdGVkLnVuYmluZCgpO1xuICAgICAgICB0aGlzLmJvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmU6IGZ1bmN0aW9uKGVsLCB2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmF0dGFjaGVkKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLm5lc3RlZCkge1xuICAgICAgICAgICAgdGhpcy5uZXN0ZWQgPSBuZXcgVmlldyhlbCwgdGhpcy52aWV3Lm1vZGVscywgdGhpcy52aWV3Lm9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5uZXN0ZWQuYmluZCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLm1hcmtlci5uZXh0U2libGluZyk7XG4gICAgICAgICAgdGhpcy5hdHRhY2hlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgdGhpcy5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgICBpZiAodGhpcy5uZXN0ZWQpIHtcbiAgICAgICAgdGhpcy5uZXN0ZWQudXBkYXRlKG1vZGVscyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBiaW5kZXJzO1xuIiwiaW1wb3J0IHtwYXJzZVR5cGV9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4vc2lnaHRnbGFzcyc7XG5cbmZ1bmN0aW9uIGdldElucHV0VmFsdWUoZWwpIHtcbiAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICByZXR1cm4gZWwuY2hlY2tlZDtcbiAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJykge1xuXG4gICAgZWwub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChvcHRpb24udmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlO1xuICB9XG59XG5cbmNvbnN0IEZPUk1BVFRFUl9BUkdTID0gIC9bXlxccyddK3wnKFteJ118J1teXFxzXSkqJ3xcIihbXlwiXXxcIlteXFxzXSkqXCIvZztcbmNvbnN0IEZPUk1BVFRFUl9TUExJVCA9IC9cXHMrLztcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuLy8gQSBzaW5nbGUgYmluZGluZyBiZXR3ZWVuIGEgbW9kZWwgYXR0cmlidXRlIGFuZCBhIERPTSBlbGVtZW50LlxuZXhwb3J0IGNsYXNzIEJpbmRpbmcge1xuICAvKipcbiAgICogQWxsIGluZm9ybWF0aW9uIGFib3V0IHRoZSBiaW5kaW5nIGlzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvcjsgdGhlXG4gICAqIGNvbnRhaW5pbmcgdmlldywgdGhlIERPTSBub2RlLCB0aGUgdHlwZSBvZiBiaW5kaW5nLCB0aGUgbW9kZWwgb2JqZWN0IGFuZCB0aGVcbiAgICoga2V5cGF0aCBhdCB3aGljaCB0byBsaXN0ZW4gZm9yIGNoYW5nZXMuXG4gICAqIEBwYXJhbSB7Kn0gdmlldyBcbiAgICogQHBhcmFtIHsqfSBlbCBcbiAgICogQHBhcmFtIHsqfSB0eXBlIFxuICAgKiBAcGFyYW0geyp9IGtleXBhdGggXG4gICAqIEBwYXJhbSB7Kn0gYmluZGVyIFxuICAgKiBAcGFyYW0geyp9IGFyZ3MgVGhlIHN0YXJ0IGJpbmRlcnMsIG9uIGBjbGFzcy0qYCBhcmdzWzBdIHdpbCBiZSB0aGUgY2xhc3NuYW1lIFxuICAgKiBAcGFyYW0geyp9IGZvcm1hdHRlcnMgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih2aWV3LCBlbCwgdHlwZSwga2V5cGF0aCwgYmluZGVyLCBhcmdzLCBmb3JtYXR0ZXJzKSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgIHRoaXMuYmluZGVyID0gYmluZGVyO1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdGhpcy5mb3JtYXR0ZXJzID0gZm9ybWF0dGVycztcbiAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVycyA9IHt9O1xuICAgIHRoaXMubW9kZWwgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBPYnNlcnZlcyB0aGUgb2JqZWN0IGtleXBhdGhcbiAgb2JzZXJ2ZShvYmosIGtleXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmVyKG9iaiwga2V5cGF0aCwgdGhpcyk7XG4gIH1cblxuICBwYXJzZVRhcmdldCgpIHtcbiAgICBpZiAodGhpcy5rZXlwYXRoKSB7XG4gICAgICBsZXQgdG9rZW4gPSBwYXJzZVR5cGUodGhpcy5rZXlwYXRoKTtcbiAgICAgIGlmICh0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRva2VuLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpe1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHRoaXMua2V5cGF0aCk7XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlIGluIHRva2VuJywgdG9rZW4pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEdldCB0aGUgaXRlcmF0aW9uIGFsaWFzLCB1c2VkIGluIHRoZSBpbnRlcmF0aW9uIGJpbmRlcnMgbGlrZSBgZWFjaC0qYFxuICAgKiBAcGFyYW0geyp9IG1vZGVsTmFtZSBcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDI2XG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pa2VyaWMvcml2ZXRzL2Jsb2IvbWFzdGVyL2Rpc3Qvcml2ZXRzLmpzI0wxMTc1XG4gICAqL1xuICBnZXRJdGVyYXRpb25BbGlhcyhtb2RlbE5hbWUpIHtcbiAgICByZXR1cm4gJyUnICsgbW9kZWxOYW1lICsgJyUnO1xuICB9XG5cbiAgcGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgZm9ybWF0dGVySW5kZXgpIHtcbiAgICByZXR1cm4gYXJnc1xuICAgICAgLm1hcChwYXJzZVR5cGUpXG4gICAgICAubWFwKCh7dHlwZSwgdmFsdWV9LCBhaSkgPT4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdW2FpXTtcblxuICAgICAgICAgIGlmICghb2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIG9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV0gPSBvYnNlcnZlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIudmFsdWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZScsIHR5cGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvLyBBcHBsaWVzIGFsbCB0aGUgY3VycmVudCBmb3JtYXR0ZXJzIHRvIHRoZSBzdXBwbGllZCB2YWx1ZSBhbmQgcmV0dXJucyB0aGVcbiAgLy8gZm9ybWF0dGVkIHZhbHVlLlxuICBmb3JtYXR0ZWRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdHRlcnMucmVkdWNlKChyZXN1bHQsIGRlY2xhcmF0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSBkZWNsYXJhdGlvbi5tYXRjaChGT1JNQVRURVJfQVJHUyk7XG4gICAgICBsZXQgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICBsZXQgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG5cbiAgICAgIGNvbnN0IHByb2Nlc3NlZEFyZ3MgPSB0aGlzLnBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3MsIGluZGV4KTtcblxuICAgICAgaWYgKGZvcm1hdHRlciAmJiAoZm9ybWF0dGVyLnJlYWQgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyLnJlYWQocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH0gZWxzZSBpZiAoZm9ybWF0dGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHZhbHVlKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIGJpbmRpbmcgYXJvdW5kIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAgZXZlbnRIYW5kbGVyKGZuKSB7XG4gICAgbGV0IGJpbmRpbmcgPSB0aGlzO1xuICAgIGxldCBoYW5kbGVyID0gYmluZGluZy52aWV3Lm9wdGlvbnMuaGFuZGxlcjtcblxuICAgIHJldHVybiBmdW5jdGlvbihldikge1xuICAgICAgaGFuZGxlci5jYWxsKGZuLCB0aGlzLCBldiwgYmluZGluZyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIFNldHMgdGhlIHZhbHVlIGZvciB0aGUgYmluZGluZy4gVGhpcyBCYXNpY2FsbHkganVzdCBydW5zIHRoZSBiaW5kaW5nIHJvdXRpbmVcbiAgLy8gd2l0aCB0aGUgc3VwcGxpZWQgdmFsdWUgZm9ybWF0dGVkLlxuICBzZXQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pICYmICF0aGlzLmJpbmRlci5mdW5jdGlvbikge1xuICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlKHZhbHVlLmNhbGwodGhpcy5tb2RlbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIGxldCByb3V0aW5lRm4gPSB0aGlzLmJpbmRlci5yb3V0aW5lIHx8IHRoaXMuYmluZGVyO1xuXG4gICAgaWYgKHJvdXRpbmVGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByb3V0aW5lRm4uY2FsbCh0aGlzLCB0aGlzLmVsLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU3luY3MgdXAgdGhlIHZpZXcgYmluZGluZyB3aXRoIHRoZSBtb2RlbC5cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgdGhpcy5zZXQodGhpcy5vYnNlcnZlci52YWx1ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHVibGlzaGVzIHRoZSB2YWx1ZSBjdXJyZW50bHkgc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50IGJhY2sgdG8gdGhlIG1vZGVsLlxuICBwdWJsaXNoKCkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLmZvcm1hdHRlcnMucmVkdWNlUmlnaHQoKHJlc3VsdCwgZGVjbGFyYXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBkZWNsYXJhdGlvbi5zcGxpdChGT1JNQVRURVJfU1BMSVQpO1xuICAgICAgICBjb25zdCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEFyZ3MgPSB0aGlzLnBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3MsIGluZGV4KTtcblxuICAgICAgICBpZiAoZm9ybWF0dGVyICYmIGZvcm1hdHRlci5wdWJsaXNoKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyLnB1Ymxpc2gocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwgdGhpcy5nZXRWYWx1ZSh0aGlzLmVsKSk7XG5cbiAgICAgIHRoaXMub2JzZXJ2ZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN1YnNjcmliZXMgdG8gdGhlIG1vZGVsIGZvciBjaGFuZ2VzIGF0IHRoZSBzcGVjaWZpZWQga2V5cGF0aC4gQmktZGlyZWN0aW9uYWxcbiAgLy8gcm91dGluZXMgd2lsbCBhbHNvIGxpc3RlbiBmb3IgY2hhbmdlcyBvbiB0aGUgZWxlbWVudCB0byBwcm9wYWdhdGUgdGhlbSBiYWNrXG4gIC8vIHRvIHRoZSBtb2RlbC5cbiAgYmluZCgpIHtcbiAgICB0aGlzLnBhcnNlVGFyZ2V0KCk7XG5cbiAgICBpZiAodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2JpbmQnKSkge1xuICAgICAgdGhpcy5iaW5kZXIuYmluZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXcub3B0aW9ucy5wcmVsb2FkRGF0YSkge1xuICAgICAgdGhpcy5zeW5jKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gVW5zdWJzY3JpYmVzIGZyb20gdGhlIG1vZGVsIGFuZCB0aGUgZWxlbWVudC5cbiAgdW5iaW5kKCkge1xuICAgIGlmICh0aGlzLmJpbmRlci51bmJpbmQpIHtcbiAgICAgIHRoaXMuYmluZGVyLnVuYmluZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLnVub2JzZXJ2ZSgpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzKS5mb3JFYWNoKGZpID0+IHtcbiAgICAgIGxldCBhcmdzID0gdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZmldO1xuXG4gICAgICBPYmplY3Qua2V5cyhhcmdzKS5mb3JFYWNoKGFpID0+IHtcbiAgICAgICAgYXJnc1thaV0udW5vYnNlcnZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSBiaW5kaW5nJ3MgbW9kZWwgZnJvbSB3aGF0IGlzIGN1cnJlbnRseSBzZXQgb24gdGhlIHZpZXcuIFVuYmluZHNcbiAgLy8gdGhlIG9sZCBtb2RlbCBmaXJzdCBhbmQgdGhlbiByZS1iaW5kcyB3aXRoIHRoZSBuZXcgbW9kZWwuXG4gIHVwZGF0ZShtb2RlbHMgPSB7fSkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmluZGVyLnVwZGF0ZSkge1xuICAgICAgdGhpcy5iaW5kZXIudXBkYXRlLmNhbGwodGhpcywgbW9kZWxzKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGVsZW1lbnRzIHZhbHVlXG4gIGdldFZhbHVlKGVsKSB7XG4gICAgaWYgKHRoaXMuYmluZGVyICYmIHRoaXMuYmluZGVyLmdldFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5iaW5kZXIuZ2V0VmFsdWUuY2FsbCh0aGlzLCBlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRJbnB1dFZhbHVlKGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB0aW55YmluZCBmcm9tICcuL3RpbnliaW5kJztcbmltcG9ydCB7cGFyc2VUeXBlfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHtFWFRFTlNJT05TLCBPUFRJT05TfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vYmluZGluZyc7XG5cbi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbi8vIGNvbXBvbmVudCB2aWV3IGVuY2Fwc3VsYXRlZCBhcyBhIGJpbmRpbmcgd2l0aGluIGl0J3MgcGFyZW50IHZpZXcuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmluZGluZyBleHRlbmRzIEJpbmRpbmcge1xuICAvLyBJbml0aWFsaXplcyBhIGNvbXBvbmVudCBiaW5kaW5nIGZvciB0aGUgc3BlY2lmaWVkIHZpZXcuIFRoZSByYXcgY29tcG9uZW50XG4gIC8vIGVsZW1lbnQgaXMgcGFzc2VkIGluIGFsb25nIHdpdGggdGhlIGNvbXBvbmVudCB0eXBlLiBBdHRyaWJ1dGVzIGFuZCBzY29wZVxuICAvLyBpbmZsZWN0aW9ucyBhcmUgZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgY29tcG9uZW50cyBkZWZpbmVkIGF0dHJpYnV0ZXMuXG4gIGNvbnN0cnVjdG9yKHZpZXcsIGVsLCB0eXBlKSB7XG4gICAgc3VwZXIodmlldywgZWwsIHR5cGUsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wb25lbnQgPSB2aWV3Lm9wdGlvbnMuY29tcG9uZW50c1t0aGlzLnR5cGVdO1xuICAgIHRoaXMuc3RhdGljID0ge307XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTtcbiAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzID0ge307XG4gICAgXG4gICAgbGV0IGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcbiAgICBcbiAgICAvLyBwYXJzZSBjb21wb25lbnQgYXR0cmlidXRlc1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcblxuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyBub3Qgd2l0aCBiaW5kaW5nIHByZWZpeC4gRS5nLiBydi1cbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKGJpbmRpbmdQcmVmaXgpICE9PSAwKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSB0aGlzLmNhbWVsQ2FzZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICBsZXQgc3RhdCA9IHRoaXMuY29tcG9uZW50LnN0YXRpYztcbiAgICBcbiAgICAgICAgaWYgKHN0YXQgJiYgc3RhdC5pbmRleE9mKHByb3BlcnR5TmFtZSkgPiAtMSkge1xuICAgICAgICAgIHRoaXMuc3RhdGljW3Byb3BlcnR5TmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgICB0aGlzLnN0YXRpY1twcm9wZXJ0eU5hbWVdID0gdG9rZW4udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgICAgdGhpcy5vYnNlcnZlcnNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZScsIGF0dHJpYnV0ZSwgdG9rZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gICAgXG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnN5bmNgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kIHRvXG4gIC8vIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgc3luYygpIHt9XG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnVwZGF0ZWAgc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmRcbiAgLy8gdG8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICB1cGRhdGUoKSB7fVxuICAgIFxuICAvLyBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpwdWJsaXNoYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAvLyB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gIHB1Ymxpc2goKSB7fVxuICAgIFxuICAvLyBSZXR1cm5zIGFuIG9iamVjdCBtYXAgdXNpbmcgdGhlIGNvbXBvbmVudCdzIHNjb3BlIGluZmxlY3Rpb25zLlxuICBsb2NhbHMoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3RhdGljKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICByZXN1bHRba2V5XSA9IHRoaXMuc3RhdGljW2tleV07XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgICBcbiAgLy8gUmV0dXJucyBhIGNhbWVsLWNhc2VkIHZlcnNpb24gb2YgdGhlIHN0cmluZy4gVXNlZCB3aGVuIHRyYW5zbGF0aW5nIGFuXG4gIC8vIGVsZW1lbnQncyBhdHRyaWJ1dGUgbmFtZSBpbnRvIGEgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGNvbXBvbmVudCdzIHNjb3BlLlxuICBjYW1lbENhc2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8tKFthLXpdKS9nLCBncm91cGVkID0+IHtcbiAgICAgIHJldHVybiBncm91cGVkWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cbiAgICBcbiAgLy8gSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6YmluZGAgdG8gYnVpbGQgYHRoaXMuY29tcG9uZW50Vmlld2Agd2l0aCBhIGxvY2FsaXplZFxuICAvLyBtYXAgb2YgbW9kZWxzIGZyb20gdGhlIHJvb3Qgdmlldy4gQmluZCBgdGhpcy5jb21wb25lbnRWaWV3YCBvbiBzdWJzZXF1ZW50IGNhbGxzLlxuICBiaW5kKCkge1xuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgaWYgKCF0aGlzLmJvdW5kKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQga2V5cGF0aCA9IHRoaXMub2JzZXJ2ZXJzW2tleV07XG4gICAgXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywga2V5cGF0aCwgKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSA9IHRoaXMub2JzZXJ2ZXJzW2tleV0udmFsdWUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIGtleSkpO1xuICAgICAgfSk7XG4gICAgXG4gICAgICB0aGlzLmJvdW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LmJpbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy5lbC5fYm91bmQgPSB0cnVlO1xuICAgIFxuICAgIFxuICAgICAgRVhURU5TSU9OUy5mb3JFYWNoKGV4dGVuc2lvblR5cGUgPT4ge1xuICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdID0ge307XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFtleHRlbnNpb25UeXBlXSkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50W2V4dGVuc2lvblR5cGVdKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdW2tleV0gPSB0aGlzLmNvbXBvbmVudFtleHRlbnNpb25UeXBlXVtrZXldO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudmlldy5vcHRpb25zW2V4dGVuc2lvblR5cGVdKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKG9wdGlvbnNbZXh0ZW5zaW9uVHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgb3B0aW9uc1tleHRlbnNpb25UeXBlXVtrZXldID0gdGhpcy52aWV3W2V4dGVuc2lvblR5cGVdW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIFxuICAgICAgT1BUSU9OUy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFtvcHRpb25dICE9IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zW29wdGlvbl0gPSB0aGlzLmNvbXBvbmVudFtvcHRpb25dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnNbb3B0aW9uXSA9IHRoaXMudmlld1tvcHRpb25dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBcbiAgICAgIC8vdGhlcmUncyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHRoYXQgbWFrZXMgaW1wb3J0ZWQgVmlldyBhIGR1bW15IG9iamVjdC4gVXNlIHRpbnliaW5kLmJpbmRcbiAgICAgIC8vdGhpcy5jb21wb25lbnRWaWV3ID0gbmV3IFZpZXcodGhpcy5lbCwgc2NvcGUsIG9wdGlvbnMpXG4gICAgICAvL3RoaXMuY29tcG9uZW50Vmlldy5iaW5kKClcbiAgICAgIHRoaXMuY29tcG9uZW50VmlldyA9IHRpbnliaW5kLmJpbmQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbC5jaGlsZE5vZGVzKSwgc2NvcGUsIG9wdGlvbnMpO1xuICAgIFxuICAgICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnNba2V5XTtcbiAgICAgICAgbGV0IG1vZGVscyA9IHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHM7XG4gICAgXG4gICAgICAgIGxldCB1cHN0cmVhbSA9IHRoaXMub2JzZXJ2ZShtb2RlbHMsIGtleSwgKChrZXksIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLnNldFZhbHVlKHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkuY2FsbCh0aGlzLCBrZXksIG9ic2VydmVyKSk7XG4gICAgXG4gICAgICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnNba2V5XSA9IHVwc3RyZWFtO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gICAgXG4gIC8vIEludGVyY2VwdCBgdGlueWJpbmQuQmluZGluZzo6dW5iaW5kYCB0byBiZSBjYWxsZWQgb24gYHRoaXMuY29tcG9uZW50Vmlld2AuXG4gIHVuYmluZCgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxufSIsImV4cG9ydCB0eXBlIFRFeHRlbnNpb25LZXkgPSAnYmluZGVycycgfCAnZm9ybWF0dGVycycgfCAnY29tcG9uZW50cycgfCAnYWRhcHRlcnMnO1xuXG5leHBvcnQgY29uc3QgT1BUSU9OUyA9IFtcbiAgJ3ByZWZpeCcsXG4gICd0ZW1wbGF0ZURlbGltaXRlcnMnLFxuICAncm9vdEludGVyZmFjZScsXG4gICdwcmVsb2FkRGF0YScsXG4gICdoYW5kbGVyJ1xuXTtcblxuZXhwb3J0IGNvbnN0IEVYVEVOU0lPTlMgPSBbXG4gICdiaW5kZXJzJyxcbiAgJ2Zvcm1hdHRlcnMnLFxuICAnY29tcG9uZW50cycsXG4gICdhZGFwdGVycydcbl07IiwiaW1wb3J0IHRpbnliaW5kIGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IE9QVElPTlMsIEVYVEVOU0lPTlMsIFRFeHRlbnNpb25LZXkgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgYWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAnLi9zaWdodGdsYXNzJztcblxuaW1wb3J0IHsgSU9wdGlvbnMsIElFeHRlbnNpb25zLCBJQ29tcG9uZW50IH0gZnJvbSAnLi4vaW5kZXgnO1xuXG4vLyBSZXR1cm5zIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxuXG50aW55YmluZC5iaW5kZXJzID0gYmluZGVycztcbnRpbnliaW5kLmFkYXB0ZXJzWycuJ10gPSBhZGFwdGVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zUGFyYW0gZXh0ZW5kcyBJRXh0ZW5zaW9ucywgSU9wdGlvbnMge31cblxuZXhwb3J0IGludGVyZmFjZSBJVmlld09wdGlvbnMgZXh0ZW5kcyBJT3B0aW9uc1BhcmFtIHtcbiAgc3RhckJpbmRlcnM6IGFueTtcbn1cblxuY29uc3QgbWVyZ2VPYmplY3QgPSAodGFyZ2V0OiBhbnksIG9iajogYW55KSA9PiB7XG4gIGNvbnNvbGUubG9nKCdtZXJnZU9iamVjdCcsIHRhcmdldCwgb2JqKTtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9KTtcbiAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHRhcmdldCk7XG4gIHJldHVybiB0YXJnZXQ7IFxufTtcblxuXG4vLyBCaW5kcyBzb21lIGRhdGEgdG8gYSB0ZW1wbGF0ZSAvIGVsZW1lbnQuIFJldHVybnMgYSB0aW55YmluZC5WaWV3IGluc3RhbmNlLlxudGlueWJpbmQuYmluZCA9IChlbDogSFRNTEVsZW1lbnQsIG1vZGVsczogYW55LCBvcHRpb25zPzogSU9wdGlvbnNQYXJhbSkgPT4ge1xuICBsZXQgdmlld09wdGlvbnM6IElWaWV3T3B0aW9ucyA9IHtcbiAgICAvLyBFWFRFTlNJT05TXG4gICAgYmluZGVyczoge30sXG4gICAgZm9ybWF0dGVyczoge30sXG4gICAgY29tcG9uZW50czoge30sXG4gICAgYWRhcHRlcnM6IHt9LFxuICAgIC8vIG90aGVyXG4gICAgc3RhckJpbmRlcnM6IHt9LFxuICB9O1xuICBtb2RlbHMgPSBtb2RlbHMgfHwge307XG4gIC8vIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmKG9wdGlvbnMpIHtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCBvcHRpb25zLmJpbmRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuY29tcG9uZW50cywgb3B0aW9ucy5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgb3B0aW9ucy5hZGFwdGVycyk7XG5cbiAgICB2aWV3T3B0aW9ucy5wcmVmaXggPSBvcHRpb25zLnByZWZpeCA/IG9wdGlvbnMucHJlZml4IDogdGlueWJpbmQucHJlZml4XG4gICAgdmlld09wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID0gb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPyBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA6IHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVyc1xuICAgIHZpZXdPcHRpb25zLnJvb3RJbnRlcmZhY2UgPSBvcHRpb25zLnByZWZpeCA/IG9wdGlvbnMucm9vdEludGVyZmFjZSA6IHRpbnliaW5kLnJvb3RJbnRlcmZhY2VcbiAgICB2aWV3T3B0aW9ucy5wcmVsb2FkRGF0YSA9IG9wdGlvbnMucHJlZml4ID8gb3B0aW9ucy5wcmVsb2FkRGF0YSA6IHRpbnliaW5kLnByZWxvYWREYXRhXG4gICAgdmlld09wdGlvbnMuaGFuZGxlciA9IG9wdGlvbnMucHJlZml4ID8gb3B0aW9ucy5oYW5kbGVyIDogdGlueWJpbmQuaGFuZGxlclxuICB9XG5cbiAgLy8gbWVyZ2UgZXh0ZW5zaW9uc1xuICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCB0aW55YmluZC5iaW5kZXJzKTtcbiAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgdGlueWJpbmQuZm9ybWF0dGVycyk7XG4gIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmNvbXBvbmVudHMsIHRpbnliaW5kLmNvbXBvbmVudHMpO1xuICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgdGlueWJpbmQuYWRhcHRlcnMpO1xuXG4gIC8vIGdldCBhbGwgc3RhckJpbmRlcnMgZnJvbSBhdmFpbGFibGUgYmluZGVyc1xuICB2aWV3T3B0aW9ucy5zdGFyQmluZGVycyA9IE9iamVjdC5rZXlzKHZpZXdPcHRpb25zLmJpbmRlcnMpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5pbmRleE9mKCcqJykgPiAwO1xuICB9KTtcblxuICBPYnNlcnZlci51cGRhdGVPcHRpb25zKHZpZXdPcHRpb25zKTtcblxuICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCBtb2RlbHMsIHZpZXdPcHRpb25zKTtcbiAgdmlldy5iaW5kKCk7XG4gIHJldHVybiB2aWV3O1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgb24gdGhlIHNwZWNpZmllZCBlbGVtZW50IGFuZFxuLy8gcmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXHRcbnRpbnliaW5kLmluaXQgPSAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YSA9IHt9KSA9PiB7XG4gIGlmICghZWwpIHtcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9XG5cbiAgY29uc3QgY29tcG9uZW50ID0gdGlueWJpbmQuY29tcG9uZW50c1tjb21wb25lbnRLZXldO1xuICBlbC5pbm5lckhUTUwgPSBjb21wb25lbnQudGVtcGxhdGUuY2FsbCh0aW55YmluZCwgZWwpO1xuICBsZXQgc2NvcGUgPSBjb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRpbnliaW5kLCBlbCwgZGF0YSk7XG5cbiAgbGV0IHZpZXcgPSB0aW55YmluZC5iaW5kKGVsLCBzY29wZSk7XG4gIHZpZXcuYmluZCgpO1xuICByZXR1cm4gdmlldztcbn07XG5cbnRpbnliaW5kLmZvcm1hdHRlcnMubmVnYXRlID0gdGlueWJpbmQuZm9ybWF0dGVycy5ub3QgPSBmdW5jdGlvbiAodmFsdWU6IGJvb2xlYW4pIHtcbiAgcmV0dXJuICF2YWx1ZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbnliaW5kO1xuIiwiLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuY29uc3QgUVVPVEVEX1NUUiA9IC9eJy4qJyR8XlwiLipcIiQvOyAvLyByZWdleCB0byB0ZXN0IGlmIHN0cmluZyBpcyB3cmFwcGVkIGluIFwiIG9yICdcblxuLy8gVXNlZCBpbiBwYXJzZXJzLnBhcnNlVGVtcGxhdGVcbmNvbnN0IFRFWFQgPSAwO1xuY29uc3QgQklORElORyA9IDE7XG5cbi8vIFRlc3QgaWYgc3RyaW5nIGlzIGEganNvbiBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBpc0pzb24oc3RyKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdmFsID0gSlNPTi5wYXJzZShzdHIpO1xuICAgIHJldHVybiAodmFsIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsIGluc3RhbmNlb2YgT2JqZWN0KSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gUGFyc2VyIGFuZCB0b2tlbml6ZXIgZm9yIGdldHRpbmcgdGhlIHR5cGUgYW5kIHZhbHVlIGZyb20gYSBzdHJpbmcuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUeXBlKHN0cmluZykge1xuICBsZXQgdHlwZSA9IFBSSU1JVElWRTtcbiAgbGV0IHZhbHVlID0gc3RyaW5nO1xuICBpZiAoUVVPVEVEX1NUUi50ZXN0KHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IHN0cmluZy5zbGljZSgxLCAtMSk7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICB2YWx1ZSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAnZmFsc2UnKSB7XG4gICAgdmFsdWUgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdudWxsJykge1xuICAgIHZhbHVlID0gbnVsbDtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoIWlzTmFOKHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IE51bWJlcihzdHJpbmcpO1xuICB9IGVsc2UgaWYgKGlzSnNvbihzdHJpbmcpKSB7XG4gICAgdmFsdWUgPSBKU09OLnBhcnNlKHN0cmluZyk7XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IEtFWVBBVEg7XG4gIH1cbiAgcmV0dXJuIHt0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWV9O1xufVxuXG4vLyBUZW1wbGF0ZSBwYXJzZXIgYW5kIHRva2VuaXplciBmb3IgbXVzdGFjaGUtc3R5bGUgdGV4dCBjb250ZW50IGJpbmRpbmdzLlxuLy8gUGFyc2VzIHRoZSB0ZW1wbGF0ZSBhbmQgcmV0dXJucyBhIHNldCBvZiB0b2tlbnMsIHNlcGFyYXRpbmcgc3RhdGljIHBvcnRpb25zXG4vLyBvZiB0ZXh0IGZyb20gYmluZGluZyBkZWNsYXJhdGlvbnMuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgZGVsaW1pdGVycykge1xuICB2YXIgdG9rZW5zO1xuICBsZXQgbGVuZ3RoID0gdGVtcGxhdGUubGVuZ3RoO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgbGV0IG9wZW4gPSBkZWxpbWl0ZXJzWzBdLCBjbG9zZSA9IGRlbGltaXRlcnNbMV07XG5cbiAgd2hpbGUgKGxhc3RJbmRleCA8IGxlbmd0aCkge1xuICAgIGluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihvcGVuLCBsYXN0SW5kZXgpO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VucyA9IHRva2VucyB8fCBbXTtcbiAgICAgIGlmIChpbmRleCA+IDAgJiYgbGFzdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIG9wZW4ubGVuZ3RoO1xuICAgICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKGNsb3NlLCBsYXN0SW5kZXgpO1xuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGxldCBzdWJzdHJpbmcgPSB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXggLSBjbG9zZS5sZW5ndGgpO1xuICAgICAgICBsZXQgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAobGFzdFRva2VuICYmIGxhc3RUb2tlbi50eXBlID09PSBURVhUKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnZhbHVlICs9IHN1YnN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgICAgdmFsdWU6IHN1YnN0cmluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpLnRyaW0oKTtcblxuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBCSU5ESU5HLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIGNsb3NlLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuIiwiXG4vLyBDaGVjayBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdCB0aGFuIGNhbiBiZSBvYnNlcnZlZC5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsXG59XG5cbi8vIEVycm9yIHRocm93ZXIuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlKSB7XG4gIHRocm93IG5ldyBFcnJvcignW09ic2VydmVyXSAnICsgbWVzc2FnZSlcbn1cblxuLy8gd29ya2Fyb3VuZFxud2luZG93LmFkYXB0ZXJzO1xud2luZG93LmludGVyZmFjZXM7XG53aW5kb3cucm9vdEludGVyZmFjZTtcblxuLy8gQ29uc3RydWN0cyBhIG5ldyBrZXlwYXRoIG9ic2VydmVyIGFuZCBraWNrcyB0aGluZ3Mgb2ZmLlxuZnVuY3Rpb24gT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCBjYWxsYmFjaykge1xuICB0aGlzLmtleXBhdGggPSBrZXlwYXRoXG4gIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICB0aGlzLm9iamVjdFBhdGggPSBbXVxuICB0aGlzLnBhcnNlKClcbiAgdGhpcy5vYmogPSB0aGlzLmdldFJvb3RPYmplY3Qob2JqKVxuXG4gIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCA9IHRoaXMucmVhbGl6ZSgpKSkge1xuICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgfVxufVxuXG5PYnNlcnZlci51cGRhdGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB3aW5kb3cuYWRhcHRlcnMgPSBvcHRpb25zLmFkYXB0ZXJzXG4gIHdpbmRvdy5pbnRlcmZhY2VzID0gT2JqZWN0LmtleXMoYWRhcHRlcnMpXG4gIHdpbmRvdy5yb290SW50ZXJmYWNlID0gb3B0aW9ucy5yb290SW50ZXJmYWNlXG59XG5cbi8vIFRva2VuaXplcyB0aGUgcHJvdmlkZWQga2V5cGF0aCBzdHJpbmcgaW50byBpbnRlcmZhY2UgKyBwYXRoIHRva2VucyBmb3IgdGhlXG4vLyBvYnNlcnZlciB0byB3b3JrIHdpdGguXG5PYnNlcnZlci50b2tlbml6ZSA9IGZ1bmN0aW9uKGtleXBhdGgsIHJvb3QpIHtcbiAgdmFyIHRva2VucyA9IFtdXG4gIHZhciBjdXJyZW50ID0ge2k6IHJvb3QsIHBhdGg6ICcnfVxuICB2YXIgaW5kZXgsIGNoclxuXG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGtleXBhdGgubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hyID0ga2V5cGF0aC5jaGFyQXQoaW5kZXgpXG5cbiAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKGNocikpIHtcbiAgICAgIHRva2Vucy5wdXNoKGN1cnJlbnQpXG4gICAgICBjdXJyZW50ID0ge2k6IGNociwgcGF0aDogJyd9XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnQucGF0aCArPSBjaHJcbiAgICB9XG4gIH1cblxuICB0b2tlbnMucHVzaChjdXJyZW50KVxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8vIFBhcnNlcyB0aGUga2V5cGF0aCB1c2luZyB0aGUgaW50ZXJmYWNlcyBkZWZpbmVkIG9uIHRoZSB2aWV3LiBTZXRzIHZhcmlhYmxlc1xuLy8gZm9yIHRoZSB0b2tlbml6ZWQga2V5cGF0aCBhcyB3ZWxsIGFzIHRoZSBlbmQga2V5LlxuT2JzZXJ2ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRoLCByb290XG5cbiAgaWYgKCF3aW5kb3cuaW50ZXJmYWNlcy5sZW5ndGgpIHtcbiAgICBlcnJvcignTXVzdCBkZWZpbmUgYXQgbGVhc3Qgb25lIGFkYXB0ZXIgaW50ZXJmYWNlLicpXG4gIH1cblxuICBpZiAoISF+d2luZG93LmludGVyZmFjZXMuaW5kZXhPZih0aGlzLmtleXBhdGhbMF0pKSB7XG4gICAgcm9vdCA9IHRoaXMua2V5cGF0aFswXVxuICAgIHBhdGggPSB0aGlzLmtleXBhdGguc3Vic3RyKDEpXG4gIH0gZWxzZSB7XG4gICAgcm9vdCA9IHdpbmRvdy5yb290SW50ZXJmYWNlXG4gICAgcGF0aCA9IHRoaXMua2V5cGF0aFxuICB9XG5cbiAgdGhpcy50b2tlbnMgPSBPYnNlcnZlci50b2tlbml6ZShwYXRoLCByb290KVxuICB0aGlzLmtleSA9IHRoaXMudG9rZW5zLnBvcCgpXG59XG5cbi8vIFJlYWxpemVzIHRoZSBmdWxsIGtleXBhdGgsIGF0dGFjaGluZyBvYnNlcnZlcnMgZm9yIGV2ZXJ5IGtleSBhbmQgY29ycmVjdGluZ1xuLy8gb2xkIG9ic2VydmVycyB0byBhbnkgY2hhbmdlZCBvYmplY3RzIGluIHRoZSBrZXlwYXRoLlxuT2JzZXJ2ZXIucHJvdG90eXBlLnJlYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGN1cnJlbnQgPSB0aGlzLm9ialxuICB2YXIgdW5yZWFjaGVkID0gLTFcbiAgdmFyIHByZXZcbiAgdmFyIHRva2VuXG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgaWYgKGlzT2JqZWN0KGN1cnJlbnQpKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChjdXJyZW50ICE9PSAocHJldiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pKSB7XG4gICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICAgIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gPSBjdXJyZW50XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgfVxuXG4gICAgICBjdXJyZW50ID0gdGhpcy5nZXQodG9rZW4sIGN1cnJlbnQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh1bnJlYWNoZWQgPT09IC0xKSB7XG4gICAgICAgIHVucmVhY2hlZCA9IGluZGV4XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIHByZXYsIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHVucmVhY2hlZCAhPT0gLTEpIHtcbiAgICB0aGlzLm9iamVjdFBhdGguc3BsaWNlKHVucmVhY2hlZClcbiAgfVxuXG4gIHJldHVybiBjdXJyZW50XG59XG5cbi8vIFVwZGF0ZXMgdGhlIGtleXBhdGguIFRoaXMgaXMgY2FsbGVkIHdoZW4gYW55IGludGVybWVkaWFyeSBrZXkgaXMgY2hhbmdlZC5cbk9ic2VydmVyLnByb3RvdHlwZS5zeW5jID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuZXh0LCBvbGRWYWx1ZSwgbmV3VmFsdWVcblxuICBpZiAoKG5leHQgPSB0aGlzLnJlYWxpemUoKSkgIT09IHRoaXMudGFyZ2V0KSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3QobmV4dCkpIHtcbiAgICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCBuZXh0LCB0aGlzLmNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9sZFZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgdGhpcy50YXJnZXQgPSBuZXh0XG4gICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlIHx8IG5ld1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMuY2FsbGJhY2suc3luYygpXG4gIH0gZWxzZSBpZiAobmV4dCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgfVxufVxuXG4vLyBSZWFkcyB0aGUgY3VycmVudCBlbmQgdmFsdWUgb2YgdGhlIG9ic2VydmVkIGtleXBhdGguIFJldHVybnMgdW5kZWZpbmVkIGlmXG4vLyB0aGUgZnVsbCBrZXlwYXRoIGlzIHVucmVhY2hhYmxlLlxuT2JzZXJ2ZXIucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQodGhpcy5rZXksIHRoaXMudGFyZ2V0KVxuICB9XG59XG5cbi8vIFNldHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBDYWxsaW5nIHNldFZhbHVlIHdoZW5cbi8vIHRoZSBmdWxsIGtleXBhdGggaXMgdW5yZWFjaGFibGUgaXMgYSBuby1vcC5cbk9ic2VydmVyLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICBhZGFwdGVyc1t0aGlzLmtleS5pXS5zZXQodGhpcy50YXJnZXQsIHRoaXMua2V5LnBhdGgsIHZhbHVlKVxuICB9XG59XG5cbi8vIEdldHMgdGhlIHByb3ZpZGVkIGtleSBvbiBhbiBvYmplY3QuXG5PYnNlcnZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oa2V5LCBvYmopIHtcbiAgY29uc29sZS5sb2dcbiAgcmV0dXJuIGFkYXB0ZXJzW2tleS5pXS5nZXQob2JqLCBrZXkucGF0aClcbn1cblxuLy8gT2JzZXJ2ZXMgb3IgdW5vYnNlcnZlcyBhIGNhbGxiYWNrIG9uIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGtleS5cbk9ic2VydmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihhY3RpdmUsIGtleSwgb2JqLCBjYWxsYmFjaykge1xuICBjb25zb2xlLmxvZygnc2V0ICcsIGFjdGl2ZSwga2V5LCBvYmopO1xuICB2YXIgYWN0aW9uID0gYWN0aXZlID8gJ29ic2VydmUnIDogJ3Vub2JzZXJ2ZSdcbiAgYWRhcHRlcnNba2V5LmldW2FjdGlvbl0ob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG59XG5cblxuLy8gVW5vYnNlcnZlcyB0aGUgZW50aXJlIGtleXBhdGguXG5PYnNlcnZlci5wcm90b3R5cGUudW5vYnNlcnZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvYmpcbiAgdmFyIHRva2VuXG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgaWYgKG9iaiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgb2JqLCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICB0aGlzLnNldChmYWxzZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKVxuICB9XG59XG4vLyB0cmF2ZXJzZSB0aGUgc2NvcGUgY2hhaW4gdG8gZmluZCB0aGUgc2NvcGUgd2hpY2ggaGFzIHRoZSByb290IHByb3BlcnR5XG4vLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IGZvdW5kIGluIGNoYWluLCByZXR1cm5zIHRoZSByb290IHNjb3BlXG5PYnNlcnZlci5wcm90b3R5cGUuZ2V0Um9vdE9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJvb3RQcm9wLCBjdXJyZW50O1xuICBpZiAoIW9iai4kcGFyZW50KSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGlmICh0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICByb290UHJvcCA9IHRoaXMudG9rZW5zWzBdLnBhdGhcbiAgfSBlbHNlIHtcbiAgICByb290UHJvcCA9IHRoaXMua2V5LnBhdGhcbiAgfVxuXG4gIGN1cnJlbnQgPSBvYmo7XG4gIHdoaWxlIChjdXJyZW50LiRwYXJlbnQgJiYgKGN1cnJlbnRbcm9vdFByb3BdID09PSB1bmRlZmluZWQpKSB7XG4gICAgY3VycmVudCA9IGN1cnJlbnQuJHBhcmVudFxuICB9XG5cbiAgcmV0dXJuIGN1cnJlbnQ7XG59XG5cbmV4cG9ydCB7IE9ic2VydmVyIH07IiwiaW1wb3J0IHtFWFRFTlNJT05TfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge3BhcnNlVGVtcGxhdGUsIHBhcnNlVHlwZX0gZnJvbSAnLi9wYXJzZXJzJztcblxuY29uc3QgdGlueWJpbmQgPSB7XG4gIC8vIEdsb2JhbCBiaW5kZXJzLlxuICBiaW5kZXJzOiB7fSxcblxuICAvLyBHbG9iYWwgY29tcG9uZW50cy5cbiAgY29tcG9uZW50czoge30sXG5cbiAgLy8gR2xvYmFsIGZvcm1hdHRlcnMuXG4gIGZvcm1hdHRlcnM6IHt9LFxuXG4gIC8vIEdsb2JhbCBzaWdodGdsYXNzIGFkYXB0ZXJzLlxuICBhZGFwdGVyczoge30sXG5cbiAgLy8gRGVmYXVsdCBhdHRyaWJ1dGUgcHJlZml4LlxuICBfcHJlZml4OiAncnYnLFxuXG4gIF9mdWxsUHJlZml4OiAncnYtJyxcblxuICBnZXQgcHJlZml4ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9LFxuXG4gIHNldCBwcmVmaXggKHZhbHVlKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gICAgdGhpcy5fZnVsbFByZWZpeCA9IHZhbHVlICsgJy0nO1xuICB9LFxuXG4gIHBhcnNlVGVtcGxhdGU6IHBhcnNlVGVtcGxhdGUsXG5cbiAgcGFyc2VUeXBlOiBwYXJzZVR5cGUsXG5cbiAgLy8gRGVmYXVsdCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLlxuICB0ZW1wbGF0ZURlbGltaXRlcnM6IFsneycsICd9J10sXG5cbiAgLy8gRGVmYXVsdCBzaWdodGdsYXNzIHJvb3QgaW50ZXJmYWNlLlxuICByb290SW50ZXJmYWNlOiAnLicsXG5cbiAgLy8gUHJlbG9hZCBkYXRhIGJ5IGRlZmF1bHQuXG4gIHByZWxvYWREYXRhOiB0cnVlLFxuXG4gIC8vIERlZmF1bHQgZXZlbnQgaGFuZGxlci5cbiAgaGFuZGxlcjogZnVuY3Rpb24oY29udGV4dCwgZXYsIGJpbmRpbmcpIHtcbiAgICB0aGlzLmNhbGwoY29udGV4dCwgZXYsIGJpbmRpbmcudmlldy5tb2RlbHMpO1xuICB9LFxuXG4gIC8vIFNldHMgdGhlIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC4gSWYgbm8gYmluZGVyIGFib3ZlIGlzIG1hdGNoZWQgaXQgd2lsbCBmYWxsXG4gIC8vIGJhY2sgdG8gdXNpbmcgdGhpcyBiaW5kZXIuXG4gIGZhbGxiYWNrQmluZGVyOiBmdW5jdGlvbihlbCwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKHRoaXMudHlwZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy50eXBlKTtcbiAgICB9ICBcbiAgfSxcblxuICAvLyBNZXJnZXMgYW4gb2JqZWN0IGxpdGVyYWwgaW50byB0aGUgY29ycmVzcG9uZGluZyBnbG9iYWwgb3B0aW9ucy5cbiAgY29uZmlndXJlOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXTtcblxuICAgICAgaWYgKEVYVEVOU0lPTlMuaW5kZXhPZihvcHRpb24pID4gLTEpIHtcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICB0aGlzW29wdGlvbl1ba2V5XSA9IHZhbHVlW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1tvcHRpb25dID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbnliaW5kO1xuIiwiaW1wb3J0IHRpbnliaW5kIGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nIH0gZnJvbSAnLi9jb21wb25lbnQtYmluZGluZyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlIH0gZnJvbSAnLi9wYXJzZXJzJztcblxuY29uc3QgdGV4dEJpbmRlciA9IHtcbiAgcm91dGluZTogKG5vZGUsIHZhbHVlKSA9PiB7XG4gICAgbm9kZS5kYXRhID0gKHZhbHVlICE9IG51bGwpID8gdmFsdWUgOiAnJztcbiAgfVxufTtcblxuY29uc3QgREVDTEFSQVRJT05fU1BMSVQgPSAvKCg/OidbXiddKicpKig/Oig/OlteXFx8J10qKD86J1teJ10qJykrW15cXHwnXSopK3xbXlxcfF0rKSl8XiQvZztcblxuY29uc3QgcGFyc2VOb2RlID0gKHZpZXcsIG5vZGUpID0+IHtcbiAgbGV0IGJsb2NrID0gZmFsc2U7XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICBsZXQgdG9rZW5zID0gcGFyc2VUZW1wbGF0ZShub2RlLmRhdGEsIHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVycyk7XG5cbiAgICBpZiAodG9rZW5zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9rZW4udmFsdWUpO1xuICAgICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRleHQsIG5vZGUpO1xuXG4gICAgICAgIGlmICh0b2tlbi50eXBlID09PSAxKSB7XG4gICAgICAgICAgdmlldy5idWlsZEJpbmRpbmcodGV4dCwgbnVsbCwgdG9rZW4udmFsdWUsIHRleHRCaW5kZXIsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgYmxvY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBibG9jayA9IHZpZXcudHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICBpZiAoIWJsb2NrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhcnNlTm9kZSh2aWV3LCBub2RlLmNoaWxkTm9kZXNbaV0pO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgYmluZGluZ0NvbXBhcmF0b3IgPSAoYSwgYikgPT4ge1xuICBsZXQgYVByaW9yaXR5ID0gYS5iaW5kZXIgPyAoYS5iaW5kZXIucHJpb3JpdHkgfHwgMCkgOiAwO1xuICBsZXQgYlByaW9yaXR5ID0gYi5iaW5kZXIgPyAoYi5iaW5kZXIucHJpb3JpdHkgfHwgMCkgOiAwO1xuICByZXR1cm4gYlByaW9yaXR5IC0gYVByaW9yaXR5O1xufTtcblxuY29uc3QgdHJpbVN0ciA9IChzdHIpID0+IHtcbiAgcmV0dXJuIHN0ci50cmltKCk7XG59O1xuXG4vLyBBIGNvbGxlY3Rpb24gb2YgYmluZGluZ3MgYnVpbHQgZnJvbSBhIHNldCBvZiBwYXJlbnQgbm9kZXMuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgLy8gVGhlIERPTSBlbGVtZW50cyBhbmQgdGhlIG1vZGVsIG9iamVjdHMgZm9yIGJpbmRpbmcgYXJlIHBhc3NlZCBpbnRvIHRoZVxuICAvLyBjb25zdHJ1Y3RvciBhbG9uZyB3aXRoIGFueSBsb2NhbCBvcHRpb25zIHRoYXQgc2hvdWxkIGJlIHVzZWQgdGhyb3VnaG91dCB0aGVcbiAgLy8gY29udGV4dCBvZiB0aGUgdmlldyBhbmQgaXQncyBiaW5kaW5ncy5cbiAgY29uc3RydWN0b3IoZWxzLCBtb2RlbHMsIG9wdGlvbnMpIHtcbiAgICBpZiAoZWxzLmpxdWVyeSB8fCBlbHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5lbHMgPSBlbHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxzID0gW2Vsc107XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlbHMgPSBtb2RlbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMuYnVpbGQoKTtcbiAgfVxuXG5cbiAgYnVpbGRCaW5kaW5nKG5vZGUsIHR5cGUsIGRlY2xhcmF0aW9uLCBiaW5kZXIsIGFyZ3MpIHtcbiAgICBsZXQgcGlwZXMgPSBkZWNsYXJhdGlvbi5tYXRjaChERUNMQVJBVElPTl9TUExJVCkubWFwKHRyaW1TdHIpO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKTtcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IEJpbmRpbmcodGhpcywgbm9kZSwgdHlwZSwga2V5cGF0aCwgYmluZGVyLCBhcmdzLCBwaXBlcykpO1xuICB9XG5cbiAgLy8gUGFyc2VzIHRoZSBET00gdHJlZSBhbmQgYnVpbGRzIGBCaW5kaW5nYCBpbnN0YW5jZXMgZm9yIGV2ZXJ5IG1hdGNoZWRcbiAgLy8gYmluZGluZyBkZWNsYXJhdGlvbi5cbiAgYnVpbGQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdO1xuXG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbHMsIGksIGxlbjtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcGFyc2VOb2RlKHRoaXMsIGVsZW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRpbmdzLnNvcnQoYmluZGluZ0NvbXBhcmF0b3IpO1xuICB9XG5cbiAgdHJhdmVyc2Uobm9kZSkge1xuICAgIGxldCBiaW5kaW5nUHJlZml4ID0gdGlueWJpbmQuX2Z1bGxQcmVmaXg7XG4gICAgbGV0IGJsb2NrID0gbm9kZS5ub2RlTmFtZSA9PT0gJ1NDUklQVCcgfHwgbm9kZS5ub2RlTmFtZSA9PT0gJ1NUWUxFJztcbiAgICBsZXQgYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlcztcbiAgICBsZXQgYmluZEluZm9zID0gW107XG4gICAgbGV0IHN0YXJCaW5kZXJzID0gdGhpcy5vcHRpb25zLnN0YXJCaW5kZXJzO1xuICAgIHZhciB0eXBlLCBiaW5kZXIsIGlkZW50aWZpZXIsIGFyZ3M7XG5cblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgIC8vIGlmIGF0dHJpYnV0ZSBzdGFydHMgd2l0aCB0aGUgYmluZGluZyBwcmVmaXguIEUuZy4gcnZcbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKGJpbmRpbmdQcmVmaXgpID09PSAwKSB7XG4gICAgICAgIHR5cGUgPSBhdHRyaWJ1dGUubmFtZS5zbGljZShiaW5kaW5nUHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIGJpbmRlciA9IHRoaXMub3B0aW9ucy5iaW5kZXJzW3R5cGVdO1xuICAgICAgICBhcmdzID0gW107XG5cbiAgICAgICAgaWYgKCFiaW5kZXIpIHtcbiAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHN0YXJCaW5kZXJzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVyID0gc3RhckJpbmRlcnNba107XG4gICAgICAgICAgICBpZiAodHlwZS5zbGljZSgwLCBpZGVudGlmaWVyLmxlbmd0aCAtIDEpID09PSBpZGVudGlmaWVyLnNsaWNlKDAsIC0xKSkge1xuICAgICAgICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1tpZGVudGlmaWVyXTtcbiAgICAgICAgICAgICAgYXJncy5wdXNoKHR5cGUuc2xpY2UoaWRlbnRpZmllci5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgYmluZGVyID0gdGlueWJpbmQuZmFsbGJhY2tCaW5kZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmluZGVyLmJsb2NrKSB7XG4gICAgICAgICAgdGhpcy5idWlsZEJpbmRpbmcobm9kZSwgdHlwZSwgYXR0cmlidXRlLnZhbHVlLCBiaW5kZXIsIGFyZ3MpO1xuICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpbmRJbmZvcy5wdXNoKHthdHRyOiBhdHRyaWJ1dGUsIGJpbmRlcjogYmluZGVyLCB0eXBlOiB0eXBlLCBhcmdzOiBhcmdzfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kSW5mb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiaW5kSW5mbyA9IGJpbmRJbmZvc1tpXTtcbiAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIGJpbmRJbmZvLnR5cGUsIGJpbmRJbmZvLmF0dHIudmFsdWUsIGJpbmRJbmZvLmJpbmRlciwgYmluZEluZm8uYXJncyk7XG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShiaW5kSW5mby5hdHRyLm5hbWUpO1xuICAgIH1cblxuICAgIC8vIGJpbmQgY29tcG9uZW50c1xuICAgIGlmICghYmxvY2spIHtcbiAgICAgIHR5cGUgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcG9uZW50c1t0eXBlXSAmJiAhbm9kZS5fYm91bmQpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5wdXNoKG5ldyBDb21wb25lbnRCaW5kaW5nKHRoaXMsIG5vZGUsIHR5cGUpKTtcbiAgICAgICAgYmxvY2sgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBibG9jaztcbiAgfVxuXG4gIC8vIEJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICBiaW5kKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGJpbmRpbmcuYmluZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVW5iaW5kcyBhbGwgb2YgdGhlIGN1cnJlbnQgYmluZGluZ3MgZm9yIHRoaXMgdmlldy5cbiAgdW5iaW5kKCkge1xuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5iaW5kaW5ncykpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgYmluZGluZy51bmJpbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZih0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBTeW5jcyB1cCB0aGUgdmlldyB3aXRoIHRoZSBtb2RlbCBieSBydW5uaW5nIHRoZSByb3V0aW5lcyBvbiBhbGwgYmluZGluZ3MuXG4gIHN5bmMoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5zeW5jKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBQdWJsaXNoZXMgdGhlIGlucHV0IHZhbHVlcyBmcm9tIHRoZSB2aWV3IGJhY2sgdG8gdGhlIG1vZGVsIChyZXZlcnNlIHN5bmMpLlxuICBwdWJsaXNoKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGlmIChiaW5kaW5nLmJpbmRlciAmJiBiaW5kaW5nLmJpbmRlci5wdWJsaXNoZXMpIHtcbiAgICAgICAgYmluZGluZy5wdWJsaXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSB2aWV3J3MgbW9kZWxzIGFsb25nIHdpdGggYW55IGFmZmVjdGVkIGJpbmRpbmdzLlxuICB1cGRhdGUobW9kZWxzID0ge30pIHtcbiAgICBPYmplY3Qua2V5cyhtb2RlbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMubW9kZWxzW2tleV0gPSBtb2RlbHNba2V5XTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGlmIChiaW5kaW5nLnVwZGF0ZSkge1xuICAgICAgICBiaW5kaW5nLnVwZGF0ZShtb2RlbHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9