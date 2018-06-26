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

/***/ "./src/adapter.ts":
/*!************************!*\
  !*** ./src/adapter.ts ***!
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
        var _pointers = map.pointers[ref];

        if (_pointers) {
          var idx = _pointers.indexOf(keypath);

          if (idx > -1) {
            _pointers.splice(idx, 1);
          }

          if (!_pointers.length) {
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
      var _callbacks2 = map.callbacks[keypath];

      if (_callbacks2) {
        var idx = _callbacks2.indexOf(callback);

        if (idx > -1) {
          _callbacks2.splice(idx, 1);

          if (!_callbacks2.length) {
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

var _sightglass = __webpack_require__(/*! ./sightglass */ "./src/sightglass.ts");

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

var _adapter = _interopRequireDefault(__webpack_require__(/*! ./adapter */ "./src/adapter.ts"));

var _binders = _interopRequireDefault(__webpack_require__(/*! ./binders */ "./src/binders.js"));

var _sightglass = __webpack_require__(/*! ./sightglass */ "./src/sightglass.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the public interface.
_tinybind.default.binders = _binders.default;
_tinybind.default.adapters['.'] = _adapter.default;

// TODO move to uitils
var mergeObject = function mergeObject(target, obj) {
  Object.keys(obj).forEach(function (key) {
    if (!target[key] || target[key] === {}) {
      target[key] = obj[key];
    }
  });
  return target;
}; // Binds some data to a template / element. Returns a tinybind.View instance.


_tinybind.default.bind = function (el, models, options) {
  var viewOptions = {
    // EXTENSIONS
    binders: Object.create(null),
    formatters: Object.create(null),
    components: Object.create(null),
    adapters: Object.create(null),
    // other
    starBinders: Object.create(null),
    // sightglass
    rootInterface: Object.create(null)
  };
  models = models || Object.create(null); // options = options || {};

  if (options) {
    mergeObject(viewOptions.binders, options.binders);
    mergeObject(viewOptions.formatters, options.formatters);
    mergeObject(viewOptions.components, options.components);
    mergeObject(viewOptions.adapters, options.adapters);
  }

  viewOptions.prefix = options && options.prefix ? options.prefix : _tinybind.default.prefix;
  viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : _tinybind.default.templateDelimiters;
  viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : _tinybind.default.rootInterface;
  viewOptions.preloadData = options && options.preloadData ? options.preloadData : _tinybind.default.preloadData;
  viewOptions.handler = options && options.handler ? options.handler : _tinybind.default.handler; // merge extensions

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
}; // Move to formatters


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

/***/ "./src/sightglass.ts":
/*!***************************!*\
  !*** ./src/sightglass.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Check if a value is an object than can be observed.
function isObject(obj) {
  return _typeof(obj) === 'object' && obj !== null;
} // Error thrower.


function error(message) {
  throw new Error('[Observer] ' + message);
} // TODO


var adapters;
var interfaces;
var rootInterface;

var Observer =
/*#__PURE__*/
function () {
  // Constructs a new keypath observer and kicks things off.
  function Observer(obj, keypath, callback) {
    _classCallCheck(this, Observer);

    _defineProperty(this, "keypath", void 0);

    _defineProperty(this, "callback", void 0);

    _defineProperty(this, "objectPath", void 0);

    _defineProperty(this, "obj", void 0);

    _defineProperty(this, "target", void 0);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "tokens", void 0);

    this.keypath = keypath;
    this.callback = callback;
    this.objectPath = [];
    var parseResult = this.parse();
    this.key = parseResult.key;
    this.tokens = parseResult.tokens;
    this.obj = this.getRootObject(obj);
    this.target = this.realize();

    if (isObject(this.target)) {
      this.set(true, this.key, this.target, this.callback);
    }
  }

  _createClass(Observer, [{
    key: "parse",
    // Parses the keypath using the interfaces defined on the view. Sets variables
    // for the tokenized keypath as well as the end key.
    value: function parse() {
      var path;
      var root;

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

      if (!this.tokens.length) {
        throw new Error('no tokens');
      }

      this.key = this.tokens.pop();
      return {
        key: this.key,
        tokens: this.tokens
      };
    } // Realizes the full keypath, attaching observers for every key and correcting
    // old observers to any changed objects in the keypath.

  }, {
    key: "realize",
    value: function realize() {
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
    } // Updates the keypath. This is called when any intermediary key is changed.

  }, {
    key: "sync",
    value: function sync() {
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
    } // Reads the current end value of the observed keypath. Returns undefined if
    // the full keypath is unreachable.

  }, {
    key: "value",
    value: function value() {
      if (isObject(this.target)) {
        return this.get(this.key, this.target);
      }
    } // Sets the current end value of the observed keypath. Calling setValue when
    // the full keypath is unreachable is a no-op.

  }, {
    key: "setValue",
    value: function setValue(value) {
      if (isObject(this.target)) {
        adapters[this.key.i].set(this.target, this.key.path, value);
      }
    } // Gets the provided key on an object.

  }, {
    key: "get",
    value: function get(key, obj) {
      return adapters[key.i].get(obj, key.path);
    } // Observes or unobserves a callback on the object using the provided key.

  }, {
    key: "set",
    value: function set(active, key, obj, callback) {
      if (active) {
        adapters[key.i].observe(obj, key.path, callback);
      } else {
        adapters[key.i].unobserve(obj, key.path, callback);
      }
    } // Unobserves the entire keypath.

  }, {
    key: "unobserve",
    value: function unobserve() {
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
    } // traverse the scope chain to find the scope which has the root property
    // if the property is not found in chain, returns the root scope

  }, {
    key: "getRootObject",
    value: function getRootObject(obj) {
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
    }
  }]);

  return Observer;
}();

exports.Observer = Observer;

_defineProperty(Observer, "updateOptions", function (options) {
  adapters = options.adapters;
  interfaces = Object.keys(adapters);
  rootInterface = options.rootInterface;
});

_defineProperty(Observer, "tokenize", function (keypath, root) {
  var tokens = [];
  var current = {
    i: root,
    path: ''
  };
  var index;
  var chr;

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
});

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

// TODO move to uitils
var mergeObject = function mergeObject(target, obj) {
  Object.keys(obj).forEach(function (key) {
    if (!target[key] || target[key] === {}) {
      target[key] = obj[key];
    }
  });
  return target;
};

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
    } // mergeObject(this.binders, options.binders);
    // mergeObject(this.formatters, options.formatters);
    // mergeObject(this.components, options.components);
    // mergeObject(this.adapters, options.adapters);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2V4cG9ydC50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLmpzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3NpZ2h0Z2xhc3MudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdGlueWJpbmQuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdmlldy5qcyJdLCJuYW1lcyI6WyJBUlJBWV9NRVRIT0RTIiwiYWRhcHRlciIsImNvdW50ZXIiLCJ3ZWFrbWFwIiwid2Vha1JlZmVyZW5jZSIsIm9iaiIsImhhc093blByb3BlcnR5IiwiaWQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiX19ydiIsImNhbGxiYWNrcyIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwicmVmIiwia2V5cyIsImxlbmd0aCIsInBvaW50ZXJzIiwic3R1YkZ1bmN0aW9uIiwiZm4iLCJvcmlnaW5hbCIsIm1hcCIsImFyZ3MiLCJyZXNwb25zZSIsImFwcGx5IiwiZm9yRWFjaCIsImsiLCJyIiwiQXJyYXkiLCJjYWxsYmFjayIsInN5bmMiLCJvYnNlcnZlTXV0YXRpb25zIiwia2V5cGF0aCIsImluZGV4T2YiLCJwdXNoIiwidW5vYnNlcnZlTXV0YXRpb25zIiwiaWR4Iiwic3BsaWNlIiwib2JzZXJ2ZSIsImRlc2MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXQiLCJzZXQiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwibmV3VmFsdWUiLCJjYiIsInVub2JzZXJ2ZSIsImdldFN0cmluZyIsInRvU3RyaW5nIiwidW5kZWZpbmVkIiwidGltZXMiLCJuIiwiaSIsImNyZWF0ZVZpZXciLCJiaW5kaW5nIiwiZGF0YSIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiYmluZGVycyIsImZ1bmN0aW9uIiwicHJpb3JpdHkiLCJ1bmJpbmQiLCJoYW5kbGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiRXJyb3IiLCJpbmRleFByb3AiLCJnZXRBdHRyaWJ1dGUiLCJnZXRJdGVyYXRpb25BbGlhcyIsIm1vZGVsIiwiaW5kZXgiLCIkcGFyZW50IiwibW9kZWxzIiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJrZXkiLCJlbENsYXNzIiwiY2xhc3NOYW1lIiwicmVwbGFjZSIsInRyaW0iLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJodG1sIiwiaW5uZXJIVE1MIiwic2hvdyIsInN0eWxlIiwiZGlzcGxheSIsImhpZGUiLCJlbmFibGVkIiwiZGlzYWJsZWQiLCJjaGVja2VkIiwicHVibGlzaGVzIiwic2VsZiIsInB1Ymxpc2giLCJpc1JhZGlvIiwidGFnTmFtZSIsImV2ZW50Iiwic2V0QXR0cmlidXRlIiwib3B0aW9uIiwic2VsZWN0ZWQiLCJpZiIsImF0dGFjaGVkIiwiYm91bmQiLCJuZXN0ZWQiLCJnZXRJbnB1dFZhbHVlIiwicmVzdWx0cyIsIkZPUk1BVFRFUl9BUkdTIiwiRk9STUFUVEVSX1NQTElUIiwiUFJJTUlUSVZFIiwiS0VZUEFUSCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiZm9ybWF0dGVyT2JzZXJ2ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIm9ic2VydmVyIiwidGFyZ2V0IiwiZm9ybWF0dGVySW5kZXgiLCJwYXJzZVR5cGUiLCJhaSIsInJlZHVjZSIsInJlc3VsdCIsImRlY2xhcmF0aW9uIiwibWF0Y2giLCJzaGlmdCIsImZvcm1hdHRlciIsInByb2Nlc3NlZEFyZ3MiLCJwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyIsInJlYWQiLCJGdW5jdGlvbiIsImV2IiwiY2FsbCIsImZvcm1hdHRlZFZhbHVlIiwicm91dGluZUZuIiwicmVkdWNlUmlnaHQiLCJzcGxpdCIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJwYXJzZVRhcmdldCIsInByZWxvYWREYXRhIiwiZmkiLCJDb21wb25lbnRCaW5kaW5nIiwiY29tcG9uZW50IiwiY29tcG9uZW50cyIsInN0YXRpYyIsIm9ic2VydmVycyIsInVwc3RyZWFtT2JzZXJ2ZXJzIiwiYmluZGluZ1ByZWZpeCIsInRpbnliaW5kIiwiX2Z1bGxQcmVmaXgiLCJsZW4iLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlIiwibmFtZSIsInByb3BlcnR5TmFtZSIsImNhbWVsQ2FzZSIsInN0YXQiLCJzdHJpbmciLCJncm91cGVkIiwidG9VcHBlckNhc2UiLCJjb21wb25lbnRWaWV3Iiwic2NvcGUiLCJpbml0aWFsaXplIiwibG9jYWxzIiwiX2JvdW5kIiwiRVhURU5TSU9OUyIsImV4dGVuc2lvblR5cGUiLCJPUFRJT05TIiwicHJvdG90eXBlIiwic2xpY2UiLCJjaGlsZE5vZGVzIiwidXBzdHJlYW0iLCJhZGFwdGVycyIsIm1lcmdlT2JqZWN0Iiwidmlld09wdGlvbnMiLCJjcmVhdGUiLCJzdGFyQmluZGVycyIsInJvb3RJbnRlcmZhY2UiLCJwcmVmaXgiLCJ0ZW1wbGF0ZURlbGltaXRlcnMiLCJmaWx0ZXIiLCJ1cGRhdGVPcHRpb25zIiwiaW5pdCIsImNvbXBvbmVudEtleSIsImNyZWF0ZUVsZW1lbnQiLCJuZWdhdGUiLCJub3QiLCJRVU9URURfU1RSIiwiVEVYVCIsIkJJTkRJTkciLCJpc0pzb24iLCJzdHIiLCJ2YWwiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsInRlc3QiLCJpc05hTiIsIk51bWJlciIsInBhcnNlVGVtcGxhdGUiLCJkZWxpbWl0ZXJzIiwidG9rZW5zIiwibGFzdEluZGV4Iiwib3BlbiIsImNsb3NlIiwic3Vic3RyaW5nIiwibGFzdFRva2VuIiwiaXNPYmplY3QiLCJtZXNzYWdlIiwiaW50ZXJmYWNlcyIsIm9iamVjdFBhdGgiLCJwYXJzZVJlc3VsdCIsImdldFJvb3RPYmplY3QiLCJyZWFsaXplIiwicGF0aCIsInJvb3QiLCJzdWJzdHIiLCJ0b2tlbml6ZSIsImN1cnJlbnQiLCJ1bnJlYWNoZWQiLCJwcmV2IiwibmV4dCIsIm9sZFZhbHVlIiwiYWN0aXZlIiwicm9vdFByb3AiLCJjaHIiLCJjaGFyQXQiLCJfcHJlZml4IiwiY29udGV4dCIsImZhbGxiYWNrQmluZGVyIiwicmVtb3ZlQXR0cmlidXRlIiwiY29uZmlndXJlIiwidGV4dEJpbmRlciIsIm5vZGUiLCJERUNMQVJBVElPTl9TUExJVCIsInBhcnNlTm9kZSIsIm5vZGVUeXBlIiwiY3JlYXRlVGV4dE5vZGUiLCJidWlsZEJpbmRpbmciLCJ0cmF2ZXJzZSIsImJpbmRpbmdDb21wYXJhdG9yIiwiYSIsImIiLCJhUHJpb3JpdHkiLCJiUHJpb3JpdHkiLCJ0cmltU3RyIiwianF1ZXJ5IiwiYnVpbGQiLCJwaXBlcyIsImVsZW1lbnRzIiwic29ydCIsImJpbmRJbmZvcyIsImlkZW50aWZpZXIiLCJhdHRyIiwiYmlu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S0EsUUFBTCxDQUFjN0UsT0FBZCxDQUFzQixtQkFBVztBQUMvQjhCLGtCQUFRZ0IsTUFBUjtBQUNELFNBRkQ7QUFHRDs7QUFDRCxVQUFHLEtBQUt1SCxhQUFSLEVBQXVCO0FBQ3JCLGFBQUtBLGFBQUwsQ0FBbUJ2SCxNQUFuQjtBQUNEO0FBQ0YsSyxDQUVEOzs7OzJCQUNPO0FBQ0wsV0FBSytCLFFBQUwsQ0FBYzdFLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0I4QixnQkFBUXpCLElBQVI7QUFDRCxPQUZEO0FBR0QsSyxDQUVEOzs7OzhCQUNVO0FBQ1IsV0FBS3dFLFFBQUwsQ0FBYzdFLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IsWUFBSThCLFFBQVFxRixNQUFSLElBQWtCckYsUUFBUXFGLE1BQVIsQ0FBZXBCLFNBQXJDLEVBQWdEO0FBQzlDakUsa0JBQVFtRSxPQUFSO0FBQ0Q7QUFDRixPQUpEO0FBS0QsSyxDQUVEOzs7OzZCQUNvQjtBQUFBOztBQUFBLFVBQWI3QixNQUFhLHVFQUFKLEVBQUk7QUFDbEJyRixhQUFPTyxJQUFQLENBQVk4RSxNQUFaLEVBQW9CcEUsT0FBcEIsQ0FBNEIsZUFBTztBQUNqQyxjQUFLb0UsTUFBTCxDQUFZVyxHQUFaLElBQW1CWCxPQUFPVyxHQUFQLENBQW5CO0FBQ0QsT0FGRDtBQUlBLFdBQUtGLFFBQUwsQ0FBYzdFLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IsWUFBSThCLFFBQVFnRCxNQUFaLEVBQW9CO0FBQ2xCaEQsa0JBQVFnRCxNQUFSLENBQWVWLE1BQWY7QUFDRDtBQUNGLE9BSkQ7QUFLRCIsImZpbGUiOiJ0aW55YmluZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRpbnliaW5kXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRpbnliaW5kXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9leHBvcnQudHNcIik7XG4iLCJpbXBvcnQgeyBJQ2FsbGJhY2sgfSBmcm9tICcuL3NpZ2h0Z2xhc3MnO1xuXG4vLyBUaGUgZGVmYXVsdCBgLmAgYWRhcHRlciB0aGF0IGNvbWVzIHdpdGggdGlueWJpbmQuanMuIEFsbG93cyBzdWJzY3JpYmluZyB0b1xuLy8gcHJvcGVydGllcyBvbiBwbGFpbiBvYmplY3RzLCBpbXBsZW1lbnRlZCBpbiBFUzUgbmF0aXZlcyB1c2luZ1xuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAuXG5cbmNvbnN0IEFSUkFZX01FVEhPRFMgPSBbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZScsXG4gICdzcGxpY2UnXG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWYge1xuICBjYWxsYmFja3M6IGFueVtdO1xuICBwb2ludGVyczogYW55W107XG59XG5cbi8vIFRPRE8gd2hhdCB0aGUgaGVsbD8hXG5leHBvcnQgaW50ZXJmYWNlIElSVkFycmF5IGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIF9fcnY6IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgQWRhcHRlckZ1bmN0aW9uID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXI7XG4gIHdlYWttYXA6IGFueTtcbiAgd2Vha1JlZmVyZW5jZTogKG9iajogYW55KSA9PiBhbnk7IC8vID0+IF9fcnYgP1xuICBjbGVhbnVwV2Vha1JlZmVyZW5jZTogKHJlZjogSVJlZiwgaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgc3R1YkZ1bmN0aW9uOiAob2JqOiBhbnksIGZuOiBzdHJpbmcpID0+IGFueSAvLyA9PiByZXNwb25zZSA/XG4gIG9ic2VydmVNdXRhdGlvbnM6IChvYmo6IGFueSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgdW5vYnNlcnZlTXV0YXRpb25zOiAob2JqOiBJUlZBcnJheSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgb2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJQ2FsbGJhY2spID0+IHZvaWQ7IFxuICB1bm9ic2VydmU6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSUNhbGxiYWNrKSA9PiB2b2lkO1xuICBnZXQ6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSA9PiBhbnk7XG4gIHNldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXJzIHtcbiAgW25hbWU6IHN0cmluZ106IElBZGFwdGVyO1xufVxuXG5jb25zdCBhZGFwdGVyOiBJQWRhcHRlciA9IHtcbiAgY291bnRlcjogMCxcbiAgd2Vha21hcDoge30sXG5cbiAgd2Vha1JlZmVyZW5jZTogZnVuY3Rpb24ob2JqOiBhbnkpIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eSgnX19ydicpKSB7XG4gICAgICBsZXQgaWQgPSB0aGlzLmNvdW50ZXIrKztcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19fcnYnLCB7XG4gICAgICAgIHZhbHVlOiBpZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndlYWttYXBbb2JqLl9fcnZdKSB7XG4gICAgICB0aGlzLndlYWttYXBbb2JqLl9fcnZdID0ge1xuICAgICAgICBjYWxsYmFja3M6IHt9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuICB9LFxuXG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlOiBmdW5jdGlvbihyZWY6IElSZWYsIGlkOiBudW1iZXIpIHtcbiAgICBpZiAoIU9iamVjdC5rZXlzKHJlZi5jYWxsYmFja3MpLmxlbmd0aCkge1xuICAgICAgaWYgKCEocmVmLnBvaW50ZXJzICYmIE9iamVjdC5rZXlzKHJlZi5wb2ludGVycykubGVuZ3RoKSkge1xuICAgICAgICBkZWxldGUgdGhpcy53ZWFrbWFwW2lkXTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc3R1YkZ1bmN0aW9uOiBmdW5jdGlvbihvYmo6IGFueSwgZm46IHN0cmluZykge1xuICAgIGxldCBvcmlnaW5hbCA9IG9ialtmbl07XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopO1xuICAgIGxldCB3ZWFrbWFwID0gdGhpcy53ZWFrbWFwO1xuXG4gICAgb2JqW2ZuXSA9ICguLi5hcmdzOiBhbnlbXSk6IEFkYXB0ZXJGdW5jdGlvbiA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBvcmlnaW5hbC5hcHBseShvYmosIGFyZ3MpO1xuXG4gICAgICBPYmplY3Qua2V5cyhtYXAucG9pbnRlcnMpLmZvckVhY2gociA9PiB7XG4gICAgICAgIGxldCBrID0gbWFwLnBvaW50ZXJzW3JdO1xuXG4gICAgICAgIGlmICh3ZWFrbWFwW3JdKSB7XG4gICAgICAgICAgaWYgKHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdLmZvckVhY2goKGNhbGxiYWNrOiBJQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2suc3luYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG4gIH0sXG5cbiAgb2JzZXJ2ZU11dGF0aW9uczogZnVuY3Rpb24ob2JqOiBhbnksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcblxuICAgICAgaWYgKCFtYXAucG9pbnRlcnMpIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzID0ge307XG5cbiAgICAgICAgQVJSQVlfTUVUSE9EUy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICB0aGlzLnN0dWJGdW5jdGlvbihvYmosIGZuKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzW3JlZl0pIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzW3JlZl0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcC5wb2ludGVyc1tyZWZdLmluZGV4T2Yoa2V5cGF0aCkgPT09IC0xKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdLnB1c2goa2V5cGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHVub2JzZXJ2ZU11dGF0aW9uczogZnVuY3Rpb24ob2JqOiBJUlZBcnJheSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykge1xuICAgIGlmICgob2JqIGluc3RhbmNlb2YgQXJyYXkpICYmIChvYmouX19ydiAhPSBudWxsKSkge1xuICAgICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICAgIGlmIChtYXApIHtcbiAgICAgICAgbGV0IHBvaW50ZXJzID0gbWFwLnBvaW50ZXJzW3JlZl07XG5cbiAgICAgICAgaWYgKHBvaW50ZXJzKSB7XG4gICAgICAgICAgbGV0IGlkeCA9IHBvaW50ZXJzLmluZGV4T2Yoa2V5cGF0aCk7XG5cbiAgICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHBvaW50ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghcG9pbnRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgbWFwLnBvaW50ZXJzW3JlZl07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jbGVhbnVwV2Vha1JlZmVyZW5jZShtYXAsIG9iai5fX3J2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBvYnNlcnZlOiBmdW5jdGlvbihvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSUNhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlOiBhbnk7XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopLmNhbGxiYWNrcztcblxuICAgIGlmICghY2FsbGJhY2tzW2tleXBhdGhdKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0gPSBbXTtcbiAgICAgIGxldCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXBhdGgpO1xuXG4gICAgICBpZiAoIWRlc2MgfHwgIShkZXNjLmdldCB8fCBkZXNjLnNldCB8fCAhZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleXBhdGhdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleXBhdGgsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyh2YWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2I6IElDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYi5zeW5jKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMobmV3VmFsdWUsIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrc1trZXlwYXRoXS5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gIH0sXG5cbiAgdW5vYnNlcnZlOiBmdW5jdGlvbihvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSUNhbGxiYWNrKSB7XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBsZXQgaWR4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuXG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgICAgIGlmICghY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG4gICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBnZXQ6IGZ1bmN0aW9uKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gb2JqW2tleXBhdGhdO1xuICB9LFxuXG4gIHNldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHtcbiAgICBvYmpba2V5cGF0aF0gPSB2YWx1ZTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCBWaWV3IGZyb20gJy4vdmlldyc7XG5cbmNvbnN0IGdldFN0cmluZyA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCB0aW1lcyA9IChuLCBjYikgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgY2IoKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVZpZXcoYmluZGluZywgZGF0YSwgYW5jaG9yRWwpIHtcbiAgbGV0IHRlbXBsYXRlID0gYmluZGluZy5lbC5jbG9uZU5vZGUodHJ1ZSk7XG4gIGxldCB2aWV3ID0gbmV3IFZpZXcodGVtcGxhdGUsIGRhdGEsIGJpbmRpbmcudmlldy5vcHRpb25zKTtcbiAgdmlldy5iaW5kKCk7XG4gIGJpbmRpbmcubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRlbXBsYXRlLCBhbmNob3JFbCk7XG4gIHJldHVybiB2aWV3O1xufVxuXG5jb25zdCBiaW5kZXJzID0ge1xuICAvLyBCaW5kcyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBlbGVtZW50LlxuICAnb24tKic6IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBwcmlvcml0eTogMTAwMCxcblxuICAgIHVuYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuaGFuZGxlcik7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmU6IGZ1bmN0aW9uKGVsLCB2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5oYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oYW5kbGVyID0gdGhpcy5ldmVudEhhbmRsZXIodmFsdWUpO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuaGFuZGxlcik7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFwcGVuZHMgYm91bmQgaW5zdGFuY2VzIG9mIHRoZSBlbGVtZW50IGluIHBsYWNlIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5LlxuICAnZWFjaC0qJzoge1xuICAgIGJsb2NrOiB0cnVlLFxuXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsKSB7XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChgIHRpbnliaW5kOiAke3RoaXMudHlwZX0gYCk7XG4gICAgICAgIHRoaXMuaXRlcmF0ZWQgPSBbXTtcblxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXRlcmF0ZWQuZm9yRWFjaCh2aWV3ID0+IHtcbiAgICAgICAgICB2aWV3LmJpbmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZChlbCkge1xuICAgICAgaWYgKHRoaXMuaXRlcmF0ZWQpIHtcbiAgICAgICAgdGhpcy5pdGVyYXRlZC5mb3JFYWNoKHZpZXcgPT4ge1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsLCBjb2xsZWN0aW9uKSB7XG4gICAgICBsZXQgbW9kZWxOYW1lID0gdGhpcy5hcmdzWzBdO1xuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24gfHwgW107XG5cbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBvYmplY3Qga2V5cyB0byBpdGVyYXRlIG92ZXJcbiAgICAgIGlmKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZWFjaC0nICsgbW9kZWxOYW1lICsgJyBuZWVkcyBhbiBhcnJheSB0byBpdGVyYXRlIG92ZXIsIGJ1dCBpdCBpcycsIGNvbGxlY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBpbmRleCBuYW1lIGlzIHNldGVkIGJ5IGBpbmRleC1wcm9wZXJ0eWAgdXNlIHRoaXMgbmFtZSwgb3RoZXJ3aXNlIGAlW21vZGVsTmFtZV0lYCAgXG4gICAgICBsZXQgaW5kZXhQcm9wID0gZWwuZ2V0QXR0cmlidXRlKCdpbmRleC1wcm9wZXJ0eScpIHx8IHRoaXMuZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lKTtcblxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChtb2RlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IGRhdGEgPSB7JHBhcmVudDogdGhpcy52aWV3Lm1vZGVsc307XG4gICAgICAgIGRhdGFbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICBkYXRhW21vZGVsTmFtZV0gPSBtb2RlbDtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLml0ZXJhdGVkW2luZGV4XTtcblxuICAgICAgICBpZiAoIXZpZXcpIHtcblxuICAgICAgICAgIGxldCBwcmV2aW91cyA9IHRoaXMubWFya2VyO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaXRlcmF0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHRoaXMuaXRlcmF0ZWRbdGhpcy5pdGVyYXRlZC5sZW5ndGggLSAxXS5lbHNbMF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlldyA9IGNyZWF0ZVZpZXcodGhpcywgZGF0YSwgcHJldmlvdXMubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuaXRlcmF0ZWQucHVzaCh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldy5tb2RlbHNbbW9kZWxOYW1lXSAhPT0gbW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgbW9kZWxcbiAgICAgICAgICAgIGxldCBtYXRjaEluZGV4LCBuZXh0VmlldztcbiAgICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IGluZGV4ICsgMTsgbmV4dEluZGV4IDwgdGhpcy5pdGVyYXRlZC5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gdGhpcy5pdGVyYXRlZFtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAobmV4dFZpZXcubW9kZWxzW21vZGVsTmFtZV0gPT09IG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hJbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBtb2RlbCBpcyBpbiBvdGhlciBwb3NpdGlvblxuICAgICAgICAgICAgICAvLyB0b2RvOiBjb25zaWRlciBhdm9pZGluZyB0aGUgc3BsaWNlIGhlcmUgYnkgc2V0dGluZyBhIGZsYWdcbiAgICAgICAgICAgICAgLy8gcHJvZmlsZSBwZXJmb3JtYW5jZSBiZWZvcmUgaW1wbGVtZW50aW5nIHN1Y2ggY2hhbmdlXG4gICAgICAgICAgICAgIHRoaXMuaXRlcmF0ZWQuc3BsaWNlKG1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXh0Vmlldy5lbHNbMF0sIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgICAgbmV4dFZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vbmV3IG1vZGVsXG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gY3JlYXRlVmlldyh0aGlzLCBkYXRhLCB2aWV3LmVsc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLml0ZXJhdGVkLnNwbGljZShpbmRleCwgMCwgbmV4dFZpZXcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3Lm1vZGVsc1tpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuaXRlcmF0ZWQubGVuZ3RoID4gY29sbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgdGltZXModGhpcy5pdGVyYXRlZC5sZW5ndGggLSBjb2xsZWN0aW9uLmxlbmd0aCwgKCkgPT4ge1xuICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5pdGVyYXRlZC5wb3AoKTtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodmlldy5lbHNbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09PSAnT1BUSU9OJykge1xuICAgICAgICB0aGlzLnZpZXcuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICBpZiAoYmluZGluZy5lbCA9PT0gdGhpcy5tYXJrZXIucGFyZW50Tm9kZSAmJiBiaW5kaW5nLnR5cGUgPT09ICd2YWx1ZScpIHtcbiAgICAgICAgICAgIGJpbmRpbmcuc3luYygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZShtb2RlbHMpIHtcbiAgICAgIGxldCBkYXRhID0ge307XG5cbiAgICAgIC8vdG9kbzogYWRkIHRlc3QgYW5kIGZpeCBpZiBuZWNlc3NhcnlcblxuICAgICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgIT09IHRoaXMuYXJnc1swXSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IG1vZGVsc1trZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5pdGVyYXRlZC5mb3JFYWNoKHZpZXcgPT4ge1xuICAgICAgICB2aWV3LnVwZGF0ZShkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGNsYXNzIGZyb20gdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIGZhbHNlLlxuICAnY2xhc3MtKic6IGZ1bmN0aW9uKGVsLCB2YWx1ZSkge1xuICAgIGxldCBlbENsYXNzID0gYCAke2VsLmNsYXNzTmFtZX0gYDtcblxuICAgIGlmICh2YWx1ZSAhPT0gKGVsQ2xhc3MuaW5kZXhPZihgICR7dGhpcy5hcmdzWzBdfSBgKSA+IC0xKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gJHt0aGlzLmFyZ3NbMF19YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsQ2xhc3MucmVwbGFjZShgICR7dGhpcy5hcmdzWzBdfSBgLCAnICcpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIHRleHQgdmFsdWUuXG4gIHRleHQ6IChlbCwgdmFsdWUpID0+IHtcbiAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyBIVE1MIGNvbnRlbnQuXG4gIGh0bWw6IChlbCwgdmFsdWUpID0+IHtcbiAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvLyBTaG93cyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIHNob3c6IChlbCwgdmFsdWUpID0+IHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgfSxcblxuICAvLyBIaWRlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgKG5lZ2F0ZWQgdmVyc2lvbiBvZiBgc2hvd2AgYmluZGVyKS5cbiAgaGlkZTogKGVsLCB2YWx1ZSkgPT4ge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICcnO1xuICB9LFxuXG4gIC8vIEVuYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICBlbmFibGVkOiAoZWwsIHZhbHVlKSA9PiB7XG4gICAgZWwuZGlzYWJsZWQgPSAhdmFsdWU7XG4gIH0sXG5cbiAgLy8gRGlzYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYGVuYWJsZWRgIGJpbmRlcikuXG4gIGRpc2FibGVkOiAoZWwsIHZhbHVlKSA9PiB7XG4gICAgZWwuZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9LFxuXG4gIC8vIENoZWNrcyBhIGNoZWNrYm94IG9yIHJhZGlvIGlucHV0IHdoZW4gdGhlIHZhbHVlIGlzIHRydWUuIEFsc28gc2V0cyB0aGUgbW9kZWxcbiAgLy8gcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgaXMgY2hlY2tlZCBvciB1bmNoZWNrZWQgKHR3by13YXkgYmluZGVyKS5cbiAgY2hlY2tlZDoge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMjAwMCxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBpZiAoIXRoaXMuY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgcm91dGluZTogZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICBlbC5jaGVja2VkID0gZ2V0U3RyaW5nKGVsLnZhbHVlKSA9PT0gZ2V0U3RyaW5nKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgdmFsdWUuIEFsc28gc2V0cyB0aGUgbW9kZWwgcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgY2hhbmdlc1xuICAvLyAodHdvLXdheSBiaW5kZXIpLlxuICB2YWx1ZToge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMzAwMCxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB0aGlzLmlzUmFkaW8gPSBlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICdyYWRpbyc7XG4gICAgICBpZiAoIXRoaXMuaXNSYWRpbykge1xuICAgICAgICB0aGlzLmV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdldmVudC1uYW1lJykgfHwgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnID8gJ2NoYW5nZScgOiAnaW5wdXQnKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5jYWxsYmFjaykge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgaWYgKCF0aGlzLmlzUmFkaW8pIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZTogZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1tdWx0aXBsZScpIHtcbiAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZWxbaV07XG4gICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChnZXRTdHJpbmcodmFsdWUpICE9PSBnZXRTdHJpbmcoZWwudmFsdWUpKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBJbnNlcnRzIGFuZCBiaW5kcyB0aGUgZWxlbWVudCBhbmQgaXQncyBjaGlsZCBub2RlcyBpbnRvIHRoZSBET00gd2hlbiB0cnVlLlxuICBpZjoge1xuICAgIGJsb2NrOiB0cnVlLFxuICAgIHByaW9yaXR5OiA0MDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIGlmICghdGhpcy5tYXJrZXIpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcgdGlueWJpbmQ6ICcgKyB0aGlzLnR5cGUgKyAnICcgKyB0aGlzLmtleXBhdGggKyAnICcpO1xuICAgICAgICB0aGlzLmF0dGFjaGVkID0gZmFsc2U7XG5cbiAgICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5tYXJrZXIsIGVsKTtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYm91bmQgPT09IGZhbHNlICYmIHRoaXMubmVzdGVkKSB7XG4gICAgICAgIHRoaXMubmVzdGVkLmJpbmQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYm91bmQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMubmVzdGVkKSB7XG4gICAgICAgIHRoaXMubmVzdGVkLnVuYmluZCgpO1xuICAgICAgICB0aGlzLmJvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmU6IGZ1bmN0aW9uKGVsLCB2YWx1ZSkge1xuICAgICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmF0dGFjaGVkKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuXG4gICAgICAgICAgaWYgKCF0aGlzLm5lc3RlZCkge1xuICAgICAgICAgICAgdGhpcy5uZXN0ZWQgPSBuZXcgVmlldyhlbCwgdGhpcy52aWV3Lm1vZGVscywgdGhpcy52aWV3Lm9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5uZXN0ZWQuYmluZCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLm1hcmtlci5uZXh0U2libGluZyk7XG4gICAgICAgICAgdGhpcy5hdHRhY2hlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgdGhpcy5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24obW9kZWxzKSB7XG4gICAgICBpZiAodGhpcy5uZXN0ZWQpIHtcbiAgICAgICAgdGhpcy5uZXN0ZWQudXBkYXRlKG1vZGVscyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBiaW5kZXJzO1xuIiwiaW1wb3J0IHtwYXJzZVR5cGV9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4vc2lnaHRnbGFzcyc7XG5cbmZ1bmN0aW9uIGdldElucHV0VmFsdWUoZWwpIHtcbiAgbGV0IHJlc3VsdHMgPSBbXTtcbiAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICByZXR1cm4gZWwuY2hlY2tlZDtcbiAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJykge1xuXG4gICAgZWwub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChvcHRpb24udmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlO1xuICB9XG59XG5cbmNvbnN0IEZPUk1BVFRFUl9BUkdTID0gIC9bXlxccyddK3wnKFteJ118J1teXFxzXSkqJ3xcIihbXlwiXXxcIlteXFxzXSkqXCIvZztcbmNvbnN0IEZPUk1BVFRFUl9TUExJVCA9IC9cXHMrLztcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuLy8gQSBzaW5nbGUgYmluZGluZyBiZXR3ZWVuIGEgbW9kZWwgYXR0cmlidXRlIGFuZCBhIERPTSBlbGVtZW50LlxuZXhwb3J0IGNsYXNzIEJpbmRpbmcge1xuICAvKipcbiAgICogQWxsIGluZm9ybWF0aW9uIGFib3V0IHRoZSBiaW5kaW5nIGlzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvcjsgdGhlXG4gICAqIGNvbnRhaW5pbmcgdmlldywgdGhlIERPTSBub2RlLCB0aGUgdHlwZSBvZiBiaW5kaW5nLCB0aGUgbW9kZWwgb2JqZWN0IGFuZCB0aGVcbiAgICoga2V5cGF0aCBhdCB3aGljaCB0byBsaXN0ZW4gZm9yIGNoYW5nZXMuXG4gICAqIEBwYXJhbSB7Kn0gdmlldyBcbiAgICogQHBhcmFtIHsqfSBlbCBcbiAgICogQHBhcmFtIHsqfSB0eXBlIFxuICAgKiBAcGFyYW0geyp9IGtleXBhdGggXG4gICAqIEBwYXJhbSB7Kn0gYmluZGVyIFxuICAgKiBAcGFyYW0geyp9IGFyZ3MgVGhlIHN0YXJ0IGJpbmRlcnMsIG9uIGBjbGFzcy0qYCBhcmdzWzBdIHdpbCBiZSB0aGUgY2xhc3NuYW1lIFxuICAgKiBAcGFyYW0geyp9IGZvcm1hdHRlcnMgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih2aWV3LCBlbCwgdHlwZSwga2V5cGF0aCwgYmluZGVyLCBhcmdzLCBmb3JtYXR0ZXJzKSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgIHRoaXMuYmluZGVyID0gYmluZGVyO1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdGhpcy5mb3JtYXR0ZXJzID0gZm9ybWF0dGVycztcbiAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVycyA9IHt9O1xuICAgIHRoaXMubW9kZWwgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBPYnNlcnZlcyB0aGUgb2JqZWN0IGtleXBhdGhcbiAgb2JzZXJ2ZShvYmosIGtleXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmVyKG9iaiwga2V5cGF0aCwgdGhpcyk7XG4gIH1cblxuICBwYXJzZVRhcmdldCgpIHtcbiAgICBpZiAodGhpcy5rZXlwYXRoKSB7XG4gICAgICBsZXQgdG9rZW4gPSBwYXJzZVR5cGUodGhpcy5rZXlwYXRoKTtcbiAgICAgIGlmICh0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRva2VuLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpe1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHRoaXMua2V5cGF0aCk7XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlIGluIHRva2VuJywgdG9rZW4pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEdldCB0aGUgaXRlcmF0aW9uIGFsaWFzLCB1c2VkIGluIHRoZSBpbnRlcmF0aW9uIGJpbmRlcnMgbGlrZSBgZWFjaC0qYFxuICAgKiBAcGFyYW0geyp9IG1vZGVsTmFtZSBcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDI2XG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pa2VyaWMvcml2ZXRzL2Jsb2IvbWFzdGVyL2Rpc3Qvcml2ZXRzLmpzI0wxMTc1XG4gICAqL1xuICBnZXRJdGVyYXRpb25BbGlhcyhtb2RlbE5hbWUpIHtcbiAgICByZXR1cm4gJyUnICsgbW9kZWxOYW1lICsgJyUnO1xuICB9XG5cbiAgcGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgZm9ybWF0dGVySW5kZXgpIHtcbiAgICByZXR1cm4gYXJnc1xuICAgICAgLm1hcChwYXJzZVR5cGUpXG4gICAgICAubWFwKCh7dHlwZSwgdmFsdWV9LCBhaSkgPT4ge1xuICAgICAgICBpZiAodHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdID0ge307XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdW2FpXTtcblxuICAgICAgICAgIGlmICghb2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIG9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV0gPSBvYnNlcnZlcjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIudmFsdWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZScsIHR5cGUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvLyBBcHBsaWVzIGFsbCB0aGUgY3VycmVudCBmb3JtYXR0ZXJzIHRvIHRoZSBzdXBwbGllZCB2YWx1ZSBhbmQgcmV0dXJucyB0aGVcbiAgLy8gZm9ybWF0dGVkIHZhbHVlLlxuICBmb3JtYXR0ZWRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdHRlcnMucmVkdWNlKChyZXN1bHQsIGRlY2xhcmF0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSBkZWNsYXJhdGlvbi5tYXRjaChGT1JNQVRURVJfQVJHUyk7XG4gICAgICBsZXQgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICBsZXQgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG5cbiAgICAgIGNvbnN0IHByb2Nlc3NlZEFyZ3MgPSB0aGlzLnBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3MsIGluZGV4KTtcblxuICAgICAgaWYgKGZvcm1hdHRlciAmJiAoZm9ybWF0dGVyLnJlYWQgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyLnJlYWQocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH0gZWxzZSBpZiAoZm9ybWF0dGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHZhbHVlKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIGJpbmRpbmcgYXJvdW5kIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAgZXZlbnRIYW5kbGVyKGZuKSB7XG4gICAgbGV0IGJpbmRpbmcgPSB0aGlzO1xuICAgIGxldCBoYW5kbGVyID0gYmluZGluZy52aWV3Lm9wdGlvbnMuaGFuZGxlcjtcblxuICAgIHJldHVybiBmdW5jdGlvbihldikge1xuICAgICAgaGFuZGxlci5jYWxsKGZuLCB0aGlzLCBldiwgYmluZGluZyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIFNldHMgdGhlIHZhbHVlIGZvciB0aGUgYmluZGluZy4gVGhpcyBCYXNpY2FsbHkganVzdCBydW5zIHRoZSBiaW5kaW5nIHJvdXRpbmVcbiAgLy8gd2l0aCB0aGUgc3VwcGxpZWQgdmFsdWUgZm9ybWF0dGVkLlxuICBzZXQodmFsdWUpIHtcbiAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pICYmICF0aGlzLmJpbmRlci5mdW5jdGlvbikge1xuICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlKHZhbHVlLmNhbGwodGhpcy5tb2RlbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIGxldCByb3V0aW5lRm4gPSB0aGlzLmJpbmRlci5yb3V0aW5lIHx8IHRoaXMuYmluZGVyO1xuXG4gICAgaWYgKHJvdXRpbmVGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByb3V0aW5lRm4uY2FsbCh0aGlzLCB0aGlzLmVsLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU3luY3MgdXAgdGhlIHZpZXcgYmluZGluZyB3aXRoIHRoZSBtb2RlbC5cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgdGhpcy5zZXQodGhpcy5vYnNlcnZlci52YWx1ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHVibGlzaGVzIHRoZSB2YWx1ZSBjdXJyZW50bHkgc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50IGJhY2sgdG8gdGhlIG1vZGVsLlxuICBwdWJsaXNoKCkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB2YXIgdmFsdWUgPSB0aGlzLmZvcm1hdHRlcnMucmVkdWNlUmlnaHQoKHJlc3VsdCwgZGVjbGFyYXRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBkZWNsYXJhdGlvbi5zcGxpdChGT1JNQVRURVJfU1BMSVQpO1xuICAgICAgICBjb25zdCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEFyZ3MgPSB0aGlzLnBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3MsIGluZGV4KTtcblxuICAgICAgICBpZiAoZm9ybWF0dGVyICYmIGZvcm1hdHRlci5wdWJsaXNoKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyLnB1Ymxpc2gocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwgdGhpcy5nZXRWYWx1ZSh0aGlzLmVsKSk7XG5cbiAgICAgIHRoaXMub2JzZXJ2ZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN1YnNjcmliZXMgdG8gdGhlIG1vZGVsIGZvciBjaGFuZ2VzIGF0IHRoZSBzcGVjaWZpZWQga2V5cGF0aC4gQmktZGlyZWN0aW9uYWxcbiAgLy8gcm91dGluZXMgd2lsbCBhbHNvIGxpc3RlbiBmb3IgY2hhbmdlcyBvbiB0aGUgZWxlbWVudCB0byBwcm9wYWdhdGUgdGhlbSBiYWNrXG4gIC8vIHRvIHRoZSBtb2RlbC5cbiAgYmluZCgpIHtcbiAgICB0aGlzLnBhcnNlVGFyZ2V0KCk7XG5cbiAgICBpZiAodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2JpbmQnKSkge1xuICAgICAgdGhpcy5iaW5kZXIuYmluZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXcub3B0aW9ucy5wcmVsb2FkRGF0YSkge1xuICAgICAgdGhpcy5zeW5jKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gVW5zdWJzY3JpYmVzIGZyb20gdGhlIG1vZGVsIGFuZCB0aGUgZWxlbWVudC5cbiAgdW5iaW5kKCkge1xuICAgIGlmICh0aGlzLmJpbmRlci51bmJpbmQpIHtcbiAgICAgIHRoaXMuYmluZGVyLnVuYmluZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLnVub2JzZXJ2ZSgpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzKS5mb3JFYWNoKGZpID0+IHtcbiAgICAgIGxldCBhcmdzID0gdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZmldO1xuXG4gICAgICBPYmplY3Qua2V5cyhhcmdzKS5mb3JFYWNoKGFpID0+IHtcbiAgICAgICAgYXJnc1thaV0udW5vYnNlcnZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSBiaW5kaW5nJ3MgbW9kZWwgZnJvbSB3aGF0IGlzIGN1cnJlbnRseSBzZXQgb24gdGhlIHZpZXcuIFVuYmluZHNcbiAgLy8gdGhlIG9sZCBtb2RlbCBmaXJzdCBhbmQgdGhlbiByZS1iaW5kcyB3aXRoIHRoZSBuZXcgbW9kZWwuXG4gIHVwZGF0ZShtb2RlbHMgPSB7fSkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYmluZGVyLnVwZGF0ZSkge1xuICAgICAgdGhpcy5iaW5kZXIudXBkYXRlLmNhbGwodGhpcywgbW9kZWxzKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGVsZW1lbnRzIHZhbHVlXG4gIGdldFZhbHVlKGVsKSB7XG4gICAgaWYgKHRoaXMuYmluZGVyICYmIHRoaXMuYmluZGVyLmdldFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5iaW5kZXIuZ2V0VmFsdWUuY2FsbCh0aGlzLCBlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRJbnB1dFZhbHVlKGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB0aW55YmluZCBmcm9tICcuL3RpbnliaW5kJztcbmltcG9ydCB7cGFyc2VUeXBlfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHtFWFRFTlNJT05TLCBPUFRJT05TfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge0JpbmRpbmd9IGZyb20gJy4vYmluZGluZyc7XG5cbi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbi8vIGNvbXBvbmVudCB2aWV3IGVuY2Fwc3VsYXRlZCBhcyBhIGJpbmRpbmcgd2l0aGluIGl0J3MgcGFyZW50IHZpZXcuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmluZGluZyBleHRlbmRzIEJpbmRpbmcge1xuICAvLyBJbml0aWFsaXplcyBhIGNvbXBvbmVudCBiaW5kaW5nIGZvciB0aGUgc3BlY2lmaWVkIHZpZXcuIFRoZSByYXcgY29tcG9uZW50XG4gIC8vIGVsZW1lbnQgaXMgcGFzc2VkIGluIGFsb25nIHdpdGggdGhlIGNvbXBvbmVudCB0eXBlLiBBdHRyaWJ1dGVzIGFuZCBzY29wZVxuICAvLyBpbmZsZWN0aW9ucyBhcmUgZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgY29tcG9uZW50cyBkZWZpbmVkIGF0dHJpYnV0ZXMuXG4gIGNvbnN0cnVjdG9yKHZpZXcsIGVsLCB0eXBlKSB7XG4gICAgc3VwZXIodmlldywgZWwsIHR5cGUsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wb25lbnQgPSB2aWV3Lm9wdGlvbnMuY29tcG9uZW50c1t0aGlzLnR5cGVdO1xuICAgIHRoaXMuc3RhdGljID0ge307XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTtcbiAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzID0ge307XG4gICAgXG4gICAgbGV0IGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcbiAgICBcbiAgICAvLyBwYXJzZSBjb21wb25lbnQgYXR0cmlidXRlc1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcblxuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyBub3Qgd2l0aCBiaW5kaW5nIHByZWZpeC4gRS5nLiBydi1cbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKGJpbmRpbmdQcmVmaXgpICE9PSAwKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSB0aGlzLmNhbWVsQ2FzZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICBsZXQgc3RhdCA9IHRoaXMuY29tcG9uZW50LnN0YXRpYztcbiAgICBcbiAgICAgICAgaWYgKHN0YXQgJiYgc3RhdC5pbmRleE9mKHByb3BlcnR5TmFtZSkgPiAtMSkge1xuICAgICAgICAgIHRoaXMuc3RhdGljW3Byb3BlcnR5TmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgICB0aGlzLnN0YXRpY1twcm9wZXJ0eU5hbWVdID0gdG9rZW4udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgICAgdGhpcy5vYnNlcnZlcnNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZScsIGF0dHJpYnV0ZSwgdG9rZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gICAgXG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnN5bmNgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kIHRvXG4gIC8vIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgc3luYygpIHt9XG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnVwZGF0ZWAgc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmRcbiAgLy8gdG8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICB1cGRhdGUoKSB7fVxuICAgIFxuICAvLyBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpwdWJsaXNoYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAvLyB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gIHB1Ymxpc2goKSB7fVxuICAgIFxuICAvLyBSZXR1cm5zIGFuIG9iamVjdCBtYXAgdXNpbmcgdGhlIGNvbXBvbmVudCdzIHNjb3BlIGluZmxlY3Rpb25zLlxuICBsb2NhbHMoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3RhdGljKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICByZXN1bHRba2V5XSA9IHRoaXMuc3RhdGljW2tleV07XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgICBcbiAgLy8gUmV0dXJucyBhIGNhbWVsLWNhc2VkIHZlcnNpb24gb2YgdGhlIHN0cmluZy4gVXNlZCB3aGVuIHRyYW5zbGF0aW5nIGFuXG4gIC8vIGVsZW1lbnQncyBhdHRyaWJ1dGUgbmFtZSBpbnRvIGEgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGNvbXBvbmVudCdzIHNjb3BlLlxuICBjYW1lbENhc2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8tKFthLXpdKS9nLCBncm91cGVkID0+IHtcbiAgICAgIHJldHVybiBncm91cGVkWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cbiAgICBcbiAgLy8gSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6YmluZGAgdG8gYnVpbGQgYHRoaXMuY29tcG9uZW50Vmlld2Agd2l0aCBhIGxvY2FsaXplZFxuICAvLyBtYXAgb2YgbW9kZWxzIGZyb20gdGhlIHJvb3Qgdmlldy4gQmluZCBgdGhpcy5jb21wb25lbnRWaWV3YCBvbiBzdWJzZXF1ZW50IGNhbGxzLlxuICBiaW5kKCkge1xuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgaWYgKCF0aGlzLmJvdW5kKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQga2V5cGF0aCA9IHRoaXMub2JzZXJ2ZXJzW2tleV07XG4gICAgXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywga2V5cGF0aCwgKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSA9IHRoaXMub2JzZXJ2ZXJzW2tleV0udmFsdWUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIGtleSkpO1xuICAgICAgfSk7XG4gICAgXG4gICAgICB0aGlzLmJvdW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LmJpbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy5lbC5fYm91bmQgPSB0cnVlO1xuICAgIFxuICAgIFxuICAgICAgRVhURU5TSU9OUy5mb3JFYWNoKGV4dGVuc2lvblR5cGUgPT4ge1xuICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdID0ge307XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFtleHRlbnNpb25UeXBlXSkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50W2V4dGVuc2lvblR5cGVdKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdW2tleV0gPSB0aGlzLmNvbXBvbmVudFtleHRlbnNpb25UeXBlXVtrZXldO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudmlldy5vcHRpb25zW2V4dGVuc2lvblR5cGVdKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKG9wdGlvbnNbZXh0ZW5zaW9uVHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgb3B0aW9uc1tleHRlbnNpb25UeXBlXVtrZXldID0gdGhpcy52aWV3W2V4dGVuc2lvblR5cGVdW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIFxuICAgICAgT1BUSU9OUy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFtvcHRpb25dICE9IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zW29wdGlvbl0gPSB0aGlzLmNvbXBvbmVudFtvcHRpb25dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnNbb3B0aW9uXSA9IHRoaXMudmlld1tvcHRpb25dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBcbiAgICAgIC8vdGhlcmUncyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHRoYXQgbWFrZXMgaW1wb3J0ZWQgVmlldyBhIGR1bW15IG9iamVjdC4gVXNlIHRpbnliaW5kLmJpbmRcbiAgICAgIC8vdGhpcy5jb21wb25lbnRWaWV3ID0gbmV3IFZpZXcodGhpcy5lbCwgc2NvcGUsIG9wdGlvbnMpXG4gICAgICAvL3RoaXMuY29tcG9uZW50Vmlldy5iaW5kKClcbiAgICAgIHRoaXMuY29tcG9uZW50VmlldyA9IHRpbnliaW5kLmJpbmQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbC5jaGlsZE5vZGVzKSwgc2NvcGUsIG9wdGlvbnMpO1xuICAgIFxuICAgICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnNba2V5XTtcbiAgICAgICAgbGV0IG1vZGVscyA9IHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHM7XG4gICAgXG4gICAgICAgIGxldCB1cHN0cmVhbSA9IHRoaXMub2JzZXJ2ZShtb2RlbHMsIGtleSwgKChrZXksIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLnNldFZhbHVlKHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkuY2FsbCh0aGlzLCBrZXksIG9ic2VydmVyKSk7XG4gICAgXG4gICAgICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnNba2V5XSA9IHVwc3RyZWFtO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gICAgXG4gIC8vIEludGVyY2VwdCBgdGlueWJpbmQuQmluZGluZzo6dW5iaW5kYCB0byBiZSBjYWxsZWQgb24gYHRoaXMuY29tcG9uZW50Vmlld2AuXG4gIHVuYmluZCgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxufSIsImV4cG9ydCB0eXBlIFRFeHRlbnNpb25LZXkgPSAnYmluZGVycycgfCAnZm9ybWF0dGVycycgfCAnY29tcG9uZW50cycgfCAnYWRhcHRlcnMnO1xuXG5leHBvcnQgY29uc3QgT1BUSU9OUyA9IFtcbiAgJ3ByZWZpeCcsXG4gICd0ZW1wbGF0ZURlbGltaXRlcnMnLFxuICAncm9vdEludGVyZmFjZScsXG4gICdwcmVsb2FkRGF0YScsXG4gICdoYW5kbGVyJ1xuXTtcblxuZXhwb3J0IGNvbnN0IEVYVEVOU0lPTlMgPSBbXG4gICdiaW5kZXJzJyxcbiAgJ2Zvcm1hdHRlcnMnLFxuICAnY29tcG9uZW50cycsXG4gICdhZGFwdGVycydcbl07IiwiaW1wb3J0IHRpbnliaW5kIGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCBhZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBJQWRhcHRlcnMgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IE9ic2VydmVyLCBSb290IH0gZnJvbSAnLi9zaWdodGdsYXNzJztcblxuaW1wb3J0IHsgSUJpbmRlcnMsIElGb3JtYXR0ZXJzLCBJT3B0aW9ucywgSUNvbXBvbmVudHMgfSBmcm9tICcuLi9pbmRleCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV4dGVuc2lvbnMge1xuICBiaW5kZXJzOiBJQmluZGVycztcbiAgZm9ybWF0dGVyczogSUZvcm1hdHRlcnM7XG4gIGNvbXBvbmVudHM6IElDb21wb25lbnRzO1xuICBhZGFwdGVyczogSUFkYXB0ZXJzO1xufVxuXG4vLyBSZXR1cm5zIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxuXG50aW55YmluZC5iaW5kZXJzID0gYmluZGVycztcbnRpbnliaW5kLmFkYXB0ZXJzWycuJ10gPSBhZGFwdGVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zUGFyYW0gZXh0ZW5kcyBJRXh0ZW5zaW9ucywgSU9wdGlvbnMge31cblxuZXhwb3J0IGludGVyZmFjZSBJVmlld09wdGlvbnMgZXh0ZW5kcyBJT3B0aW9uc1BhcmFtIHtcbiAgc3RhckJpbmRlcnM6IGFueTtcbiAgLy8gc2lnaHRnbGFzc1xuICByb290SW50ZXJmYWNlOiBSb290O1xufVxuXG4vLyBUT0RPIG1vdmUgdG8gdWl0aWxzXG5jb25zdCBtZXJnZU9iamVjdCA9ICh0YXJnZXQ6IGFueSwgb2JqOiBhbnkpID0+IHtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRhcmdldDsgXG59O1xuXG5cbi8vIEJpbmRzIHNvbWUgZGF0YSB0byBhIHRlbXBsYXRlIC8gZWxlbWVudC4gUmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXG50aW55YmluZC5iaW5kID0gKGVsOiBIVE1MRWxlbWVudCwgbW9kZWxzOiBhbnksIG9wdGlvbnM/OiBJT3B0aW9uc1BhcmFtKSA9PiB7XG4gIGxldCB2aWV3T3B0aW9uczogSVZpZXdPcHRpb25zID0ge1xuICAgIC8vIEVYVEVOU0lPTlNcbiAgICBiaW5kZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIGZvcm1hdHRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgY29tcG9uZW50czogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBhZGFwdGVyczogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAvLyBvdGhlclxuICAgIHN0YXJCaW5kZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIC8vIHNpZ2h0Z2xhc3NcbiAgICByb290SW50ZXJmYWNlOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICB9O1xuICBtb2RlbHMgPSBtb2RlbHMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgLy8gb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYob3B0aW9ucykge1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIG9wdGlvbnMuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCBvcHRpb25zLmFkYXB0ZXJzKTtcbiAgfVxuXG4gIHZpZXdPcHRpb25zLnByZWZpeCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnByZWZpeCA6IHRpbnliaW5kLnByZWZpeFxuICB2aWV3T3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPSBvcHRpb25zICYmIG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID8gb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgOiB0aW55YmluZC50ZW1wbGF0ZURlbGltaXRlcnNcbiAgdmlld09wdGlvbnMucm9vdEludGVyZmFjZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yb290SW50ZXJmYWNlID8gb3B0aW9ucy5yb290SW50ZXJmYWNlIDogdGlueWJpbmQucm9vdEludGVyZmFjZVxuICB2aWV3T3B0aW9ucy5wcmVsb2FkRGF0YSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVsb2FkRGF0YSA/IG9wdGlvbnMucHJlbG9hZERhdGEgOiB0aW55YmluZC5wcmVsb2FkRGF0YVxuICB2aWV3T3B0aW9ucy5oYW5kbGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmhhbmRsZXIgPyBvcHRpb25zLmhhbmRsZXIgOiB0aW55YmluZC5oYW5kbGVyXG5cbiAgLy8gbWVyZ2UgZXh0ZW5zaW9uc1xuICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCB0aW55YmluZC5iaW5kZXJzKTtcbiAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgdGlueWJpbmQuZm9ybWF0dGVycyk7XG4gIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmNvbXBvbmVudHMsIHRpbnliaW5kLmNvbXBvbmVudHMpO1xuICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgdGlueWJpbmQuYWRhcHRlcnMpO1xuXG4gIC8vIGdldCBhbGwgc3RhckJpbmRlcnMgZnJvbSBhdmFpbGFibGUgYmluZGVyc1xuICB2aWV3T3B0aW9ucy5zdGFyQmluZGVycyA9IE9iamVjdC5rZXlzKHZpZXdPcHRpb25zLmJpbmRlcnMpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5pbmRleE9mKCcqJykgPiAwO1xuICB9KTtcblxuICBPYnNlcnZlci51cGRhdGVPcHRpb25zKHZpZXdPcHRpb25zKTtcblxuICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCBtb2RlbHMsIHZpZXdPcHRpb25zKTtcbiAgdmlldy5iaW5kKCk7XG4gIHJldHVybiB2aWV3O1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgb24gdGhlIHNwZWNpZmllZCBlbGVtZW50IGFuZFxuLy8gcmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXHRcbnRpbnliaW5kLmluaXQgPSAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YSA9IHt9KSA9PiB7XG4gIGlmICghZWwpIHtcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9XG5cbiAgY29uc3QgY29tcG9uZW50ID0gdGlueWJpbmQuY29tcG9uZW50c1tjb21wb25lbnRLZXldO1xuICBlbC5pbm5lckhUTUwgPSBjb21wb25lbnQudGVtcGxhdGUuY2FsbCh0aW55YmluZCwgZWwpO1xuICBsZXQgc2NvcGUgPSBjb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRpbnliaW5kLCBlbCwgZGF0YSk7XG5cbiAgbGV0IHZpZXcgPSB0aW55YmluZC5iaW5kKGVsLCBzY29wZSk7XG4gIHZpZXcuYmluZCgpO1xuICByZXR1cm4gdmlldztcbn07XG5cbi8vIE1vdmUgdG8gZm9ybWF0dGVyc1xudGlueWJpbmQuZm9ybWF0dGVycy5uZWdhdGUgPSB0aW55YmluZC5mb3JtYXR0ZXJzLm5vdCA9IGZ1bmN0aW9uICh2YWx1ZTogYm9vbGVhbikge1xuICByZXR1cm4gIXZhbHVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGlueWJpbmQ7XG4iLCIvKipcbiAqIFVzZWQgYWxzbyBpbiBwYXJzZXJzLnBhcnNlVHlwZVxuICogVE9ETyBvdXRzb3VyY2VcbiAqL1xuY29uc3QgUFJJTUlUSVZFID0gMDtcbmNvbnN0IEtFWVBBVEggPSAxO1xuXG5jb25zdCBRVU9URURfU1RSID0gL14nLionJHxeXCIuKlwiJC87IC8vIHJlZ2V4IHRvIHRlc3QgaWYgc3RyaW5nIGlzIHdyYXBwZWQgaW4gXCIgb3IgJ1xuXG4vLyBVc2VkIGluIHBhcnNlcnMucGFyc2VUZW1wbGF0ZVxuY29uc3QgVEVYVCA9IDA7XG5jb25zdCBCSU5ESU5HID0gMTtcblxuLy8gVGVzdCBpZiBzdHJpbmcgaXMgYSBqc29uIHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIGlzSnNvbihzdHIpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2YWwgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuICh2YWwgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWwgaW5zdGFuY2VvZiBPYmplY3QpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBQYXJzZXIgYW5kIHRva2VuaXplciBmb3IgZ2V0dGluZyB0aGUgdHlwZSBhbmQgdmFsdWUgZnJvbSBhIHN0cmluZy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVR5cGUoc3RyaW5nKSB7XG4gIGxldCB0eXBlID0gUFJJTUlUSVZFO1xuICBsZXQgdmFsdWUgPSBzdHJpbmc7XG4gIGlmIChRVU9URURfU1RSLnRlc3Qoc3RyaW5nKSkge1xuICAgIHZhbHVlID0gc3RyaW5nLnNsaWNlKDEsIC0xKTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd0cnVlJykge1xuICAgIHZhbHVlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdmYWxzZScpIHtcbiAgICB2YWx1ZSA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ251bGwnKSB7XG4gICAgdmFsdWUgPSBudWxsO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICghaXNOYU4oc3RyaW5nKSkge1xuICAgIHZhbHVlID0gTnVtYmVyKHN0cmluZyk7XG4gIH0gZWxzZSBpZiAoaXNKc29uKHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IEpTT04ucGFyc2Uoc3RyaW5nKTtcbiAgfSBlbHNlIHtcbiAgICB0eXBlID0gS0VZUEFUSDtcbiAgfVxuICByZXR1cm4ge3R5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZX07XG59XG5cbi8vIFRlbXBsYXRlIHBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBtdXN0YWNoZS1zdHlsZSB0ZXh0IGNvbnRlbnQgYmluZGluZ3MuXG4vLyBQYXJzZXMgdGhlIHRlbXBsYXRlIGFuZCByZXR1cm5zIGEgc2V0IG9mIHRva2Vucywgc2VwYXJhdGluZyBzdGF0aWMgcG9ydGlvbnNcbi8vIG9mIHRleHQgZnJvbSBiaW5kaW5nIGRlY2xhcmF0aW9ucy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCBkZWxpbWl0ZXJzKSB7XG4gIHZhciB0b2tlbnM7XG4gIGxldCBsZW5ndGggPSB0ZW1wbGF0ZS5sZW5ndGg7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBsYXN0SW5kZXggPSAwO1xuICBsZXQgb3BlbiA9IGRlbGltaXRlcnNbMF0sIGNsb3NlID0gZGVsaW1pdGVyc1sxXTtcblxuICB3aGlsZSAobGFzdEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKG9wZW4sIGxhc3RJbmRleCk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zID0gdG9rZW5zIHx8IFtdO1xuICAgICAgaWYgKGluZGV4ID4gMCAmJiBsYXN0SW5kZXggPCBpbmRleCkge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgb3Blbi5sZW5ndGg7XG4gICAgICBpbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoY2xvc2UsIGxhc3RJbmRleCk7XG5cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgbGV0IHN1YnN0cmluZyA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCAtIGNsb3NlLmxlbmd0aCk7XG4gICAgICAgIGxldCBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09IFRFWFQpIHtcbiAgICAgICAgICBsYXN0VG9rZW4udmFsdWUgKz0gc3Vic3RyaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgICB2YWx1ZTogc3Vic3RyaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlID0gdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleCkudHJpbSgpO1xuXG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IEJJTkRJTkcsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgY2xvc2UubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG4iLCJcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5cbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gJy4vZXhwb3J0JztcblxuZXhwb3J0IGludGVyZmFjZSBJQ2FsbGJhY2sge1xuICBzeW5jOiAoKSA9PiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJS2V5IHtcbiAgcGF0aDogYW55O1xuICBpOiBSb290O1xufVxuXG5leHBvcnQgdHlwZSBPYmogPSBhbnk7XG5cbmV4cG9ydCB0eXBlIFJvb3QgPSBhbnk7XG5cbi8vIENoZWNrIGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0IHRoYW4gY2FuIGJlIG9ic2VydmVkLlxuZnVuY3Rpb24gaXNPYmplY3Qob2JqOiBPYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbFxufVxuXG4vLyBFcnJvciB0aHJvd2VyLlxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIHRocm93IG5ldyBFcnJvcignW09ic2VydmVyXSAnICsgbWVzc2FnZSlcbn1cblxuLy8gVE9ET1xubGV0IGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG5sZXQgaW50ZXJmYWNlczogc3RyaW5nW107XG5sZXQgcm9vdEludGVyZmFjZTogUm9vdDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcbiAga2V5cGF0aDogc3RyaW5nO1xuICBjYWxsYmFjazogSUNhbGxiYWNrO1xuICBvYmplY3RQYXRoOiBPYmpbXTtcbiAgb2JqOiBPYmo7XG4gIHRhcmdldDogT2JqO1xuICBrZXk6IElLZXk7XG4gIHRva2VuczogSUtleVtdO1xuICAvLyBDb25zdHJ1Y3RzIGEgbmV3IGtleXBhdGggb2JzZXJ2ZXIgYW5kIGtpY2tzIHRoaW5ncyBvZmYuXG4gIGNvbnN0cnVjdG9yKG9iajogT2JqLCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJQ2FsbGJhY2spIHtcbiAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLm9iamVjdFBhdGggPSBbXTtcbiAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHRoaXMucGFyc2UoKTtcbiAgICB0aGlzLmtleSA9IHBhcnNlUmVzdWx0LmtleTtcbiAgICB0aGlzLnRva2VucyA9IHBhcnNlUmVzdWx0LnRva2VucztcbiAgICB0aGlzLm9iaiA9IHRoaXMuZ2V0Um9vdE9iamVjdChvYmopO1xuICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5yZWFsaXplKCk7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnM6IElWaWV3T3B0aW9ucykge1xuICAgIGFkYXB0ZXJzID0gb3B0aW9ucy5hZGFwdGVycztcbiAgICBpbnRlcmZhY2VzID0gT2JqZWN0LmtleXMoYWRhcHRlcnMpO1xuICAgIHJvb3RJbnRlcmZhY2UgPSBvcHRpb25zLnJvb3RJbnRlcmZhY2U7XG4gIH1cbiAgXG4gIC8vIFRva2VuaXplcyB0aGUgcHJvdmlkZWQga2V5cGF0aCBzdHJpbmcgaW50byBpbnRlcmZhY2UgKyBwYXRoIHRva2VucyBmb3IgdGhlXG4gIC8vIG9ic2VydmVyIHRvIHdvcmsgd2l0aC5cbiAgc3RhdGljIHRva2VuaXplID0gZnVuY3Rpb24oa2V5cGF0aDogc3RyaW5nLCByb290OiBSb290KSB7XG4gICAgdmFyIHRva2VuczogYW55W10gPSBbXTtcbiAgICB2YXIgY3VycmVudDogSUtleSA9IHtpOiByb290LCBwYXRoOiAnJ307XG4gICAgdmFyIGluZGV4OiBudW1iZXI7XG4gICAgdmFyIGNocjogc3RyaW5nO1xuICBcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBrZXlwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY2hyID0ga2V5cGF0aC5jaGFyQXQoaW5kZXgpO1xuICBcbiAgICAgIGlmICghIX5pbnRlcmZhY2VzLmluZGV4T2YoY2hyKSkge1xuICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICAgICAgY3VycmVudCA9IHtpOiBjaHIsIHBhdGg6ICcnfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQucGF0aCArPSBjaHI7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG4gIFxuICAvLyBQYXJzZXMgdGhlIGtleXBhdGggdXNpbmcgdGhlIGludGVyZmFjZXMgZGVmaW5lZCBvbiB0aGUgdmlldy4gU2V0cyB2YXJpYWJsZXNcbiAgLy8gZm9yIHRoZSB0b2tlbml6ZWQga2V5cGF0aCBhcyB3ZWxsIGFzIHRoZSBlbmQga2V5LlxuICBwYXJzZSgpIHtcbiAgICB2YXIgcGF0aDogc3RyaW5nO1xuICAgIHZhciByb290OiBSb290O1xuICBcbiAgICBpZiAoIWludGVyZmFjZXMubGVuZ3RoKSB7XG4gICAgICBlcnJvcignTXVzdCBkZWZpbmUgYXQgbGVhc3Qgb25lIGFkYXB0ZXIgaW50ZXJmYWNlLicpO1xuICAgIH1cbiAgXG4gICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZih0aGlzLmtleXBhdGhbMF0pKSB7XG4gICAgICByb290ID0gdGhpcy5rZXlwYXRoWzBdO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aC5zdWJzdHIoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSByb290SW50ZXJmYWNlO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aDtcbiAgICB9XG4gIFxuICAgIHRoaXMudG9rZW5zID0gT2JzZXJ2ZXIudG9rZW5pemUocGF0aCwgcm9vdCk7XG5cbiAgICBpZighdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHRva2VucycpO1xuICAgIH1cblxuICAgIHRoaXMua2V5ID0gKHRoaXMudG9rZW5zLnBvcCgpIGFzIElLZXkpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgdG9rZW5zOiB0aGlzLnRva2VucyxcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWxpemVzIHRoZSBmdWxsIGtleXBhdGgsIGF0dGFjaGluZyBvYnNlcnZlcnMgZm9yIGV2ZXJ5IGtleSBhbmQgY29ycmVjdGluZ1xuICAvLyBvbGQgb2JzZXJ2ZXJzIHRvIGFueSBjaGFuZ2VkIG9iamVjdHMgaW4gdGhlIGtleXBhdGguXG4gIHJlYWxpemUoKSB7XG4gICAgdmFyIGN1cnJlbnQ6IE9iaiA9IHRoaXMub2JqXG4gICAgdmFyIHVucmVhY2hlZCA9IC0xXG4gICAgdmFyIHByZXZcbiAgICB2YXIgdG9rZW5cbiAgXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1tpbmRleF1cbiAgICAgIGlmIChpc09iamVjdChjdXJyZW50KSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQgIT09IChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5vYmplY3RQYXRoW2luZGV4XSA9IGN1cnJlbnRcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgdGhpcy5vYmplY3RQYXRoW2luZGV4XSA9IGN1cnJlbnRcbiAgICAgICAgfVxuICBcbiAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHRva2VuLCBjdXJyZW50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHVucmVhY2hlZCA9PT0gLTEpIHtcbiAgICAgICAgICB1bnJlYWNoZWQgPSBpbmRleFxuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAocHJldiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIHByZXYsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmICh1bnJlYWNoZWQgIT09IC0xKSB7XG4gICAgICB0aGlzLm9iamVjdFBhdGguc3BsaWNlKHVucmVhY2hlZClcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdXJyZW50XG4gIH1cbiAgXG4gIC8vIFVwZGF0ZXMgdGhlIGtleXBhdGguIFRoaXMgaXMgY2FsbGVkIHdoZW4gYW55IGludGVybWVkaWFyeSBrZXkgaXMgY2hhbmdlZC5cbiAgc3luYygpIHtcbiAgICB2YXIgbmV4dCwgb2xkVmFsdWUsIG5ld1ZhbHVlXG4gIFxuICAgIGlmICgobmV4dCA9IHRoaXMucmVhbGl6ZSgpKSAhPT0gdGhpcy50YXJnZXQpIHtcbiAgICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICAgIH1cbiAgXG4gICAgICBpZiAoaXNPYmplY3QobmV4dCkpIHtcbiAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIG5leHQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgb2xkVmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIHRoaXMudGFyZ2V0ID0gbmV4dFxuICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUgfHwgbmV3VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9IGVsc2UgaWYgKG5leHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gUmV0dXJucyB1bmRlZmluZWQgaWZcbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZS5cbiAgdmFsdWUoKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5LCB0aGlzLnRhcmdldClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNldHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBDYWxsaW5nIHNldFZhbHVlIHdoZW5cbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZSBpcyBhIG5vLW9wLlxuICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgYWRhcHRlcnNbdGhpcy5rZXkuaV0uc2V0KHRoaXMudGFyZ2V0LCB0aGlzLmtleS5wYXRoLCB2YWx1ZSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEdldHMgdGhlIHByb3ZpZGVkIGtleSBvbiBhbiBvYmplY3QuXG4gIGdldChrZXk6IElLZXksIG9iajogT2JqKSB7XG4gICAgcmV0dXJuIGFkYXB0ZXJzW2tleS5pXS5nZXQob2JqLCBrZXkucGF0aClcbiAgfVxuICBcbiAgLy8gT2JzZXJ2ZXMgb3IgdW5vYnNlcnZlcyBhIGNhbGxiYWNrIG9uIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGtleS5cbiAgc2V0KGFjdGl2ZTogYm9vbGVhbiwga2V5OiBJS2V5LCBvYmo6IE9iaiwgY2FsbGJhY2s6IElDYWxsYmFjaykge1xuICAgIGlmKGFjdGl2ZSkge1xuICAgICAgYWRhcHRlcnNba2V5LmldLm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkYXB0ZXJzW2tleS5pXS51bm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIFxuICBcbiAgLy8gVW5vYnNlcnZlcyB0aGUgZW50aXJlIGtleXBhdGguXG4gIHVub2JzZXJ2ZSgpIHtcbiAgICB2YXIgb2JqOiBPYmo7XG4gICAgdmFyIHRva2VuO1xuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKG9iaiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBvYmosIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldChmYWxzZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKVxuICAgIH1cbiAgfVxuICAvLyB0cmF2ZXJzZSB0aGUgc2NvcGUgY2hhaW4gdG8gZmluZCB0aGUgc2NvcGUgd2hpY2ggaGFzIHRoZSByb290IHByb3BlcnR5XG4gIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgZm91bmQgaW4gY2hhaW4sIHJldHVybnMgdGhlIHJvb3Qgc2NvcGVcbiAgZ2V0Um9vdE9iamVjdChvYmo6IE9iaikge1xuICAgIHZhciByb290UHJvcCwgY3VycmVudDtcbiAgICBpZiAoIW9iai4kcGFyZW50KSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgcm9vdFByb3AgPSB0aGlzLnRva2Vuc1swXS5wYXRoXG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy5rZXkucGF0aFxuICAgIH1cbiAgXG4gICAgY3VycmVudCA9IG9iajtcbiAgICB3aGlsZSAoY3VycmVudC4kcGFyZW50ICYmIChjdXJyZW50W3Jvb3RQcm9wXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQuJHBhcmVudFxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IEVYVEVOU0lPTlMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlLCBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuXG4vLyBUT0RPIG1vdmUgdG8gdWl0aWxzXG5jb25zdCBtZXJnZU9iamVjdCA9ICh0YXJnZXQsIG9iaikgPT4ge1xuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAoIXRhcmdldFtrZXldIHx8IHRhcmdldFtrZXldID09PSB7fSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0OyBcbn07XG5cbmNvbnN0IHRpbnliaW5kID0ge1xuICAvLyBHbG9iYWwgYmluZGVycy5cbiAgYmluZGVyczoge30sXG5cbiAgLy8gR2xvYmFsIGNvbXBvbmVudHMuXG4gIGNvbXBvbmVudHM6IHt9LFxuXG4gIC8vIEdsb2JhbCBmb3JtYXR0ZXJzLlxuICBmb3JtYXR0ZXJzOiB7fSxcblxuICAvLyBHbG9iYWwgc2lnaHRnbGFzcyBhZGFwdGVycy5cbiAgYWRhcHRlcnM6IHt9LFxuXG4gIC8vIERlZmF1bHQgYXR0cmlidXRlIHByZWZpeC5cbiAgX3ByZWZpeDogJ3J2JyxcblxuICBfZnVsbFByZWZpeDogJ3J2LScsXG5cbiAgZ2V0IHByZWZpeCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZpeDtcbiAgfSxcblxuICBzZXQgcHJlZml4ICh2YWx1ZSkge1xuICAgIHRoaXMuX3ByZWZpeCA9IHZhbHVlO1xuICAgIHRoaXMuX2Z1bGxQcmVmaXggPSB2YWx1ZSArICctJztcbiAgfSxcblxuICBwYXJzZVRlbXBsYXRlOiBwYXJzZVRlbXBsYXRlLFxuXG4gIHBhcnNlVHlwZTogcGFyc2VUeXBlLFxuXG4gIC8vIERlZmF1bHQgdGVtcGxhdGUgZGVsaW1pdGVycy5cbiAgdGVtcGxhdGVEZWxpbWl0ZXJzOiBbJ3snLCAnfSddLFxuXG4gIC8vIERlZmF1bHQgc2lnaHRnbGFzcyByb290IGludGVyZmFjZS5cbiAgcm9vdEludGVyZmFjZTogJy4nLFxuXG4gIC8vIFByZWxvYWQgZGF0YSBieSBkZWZhdWx0LlxuICBwcmVsb2FkRGF0YTogdHJ1ZSxcblxuICAvLyBEZWZhdWx0IGV2ZW50IGhhbmRsZXIuXG4gIGhhbmRsZXI6IGZ1bmN0aW9uKGNvbnRleHQsIGV2LCBiaW5kaW5nKSB7XG4gICAgdGhpcy5jYWxsKGNvbnRleHQsIGV2LCBiaW5kaW5nLnZpZXcubW9kZWxzKTtcbiAgfSxcblxuICAvLyBTZXRzIHRoZSBhdHRyaWJ1dGUgb24gdGhlIGVsZW1lbnQuIElmIG5vIGJpbmRlciBhYm92ZSBpcyBtYXRjaGVkIGl0IHdpbGwgZmFsbFxuICAvLyBiYWNrIHRvIHVzaW5nIHRoaXMgYmluZGVyLlxuICBmYWxsYmFja0JpbmRlcjogZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSh0aGlzLnR5cGUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKHRoaXMudHlwZSk7XG4gICAgfSAgXG4gIH0sXG5cbiAgLy8gTWVyZ2VzIGFuIG9iamVjdCBsaXRlcmFsIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9wdGlvbnMuXG4gIGNvbmZpZ3VyZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIG1lcmdlT2JqZWN0KHRoaXMuYmluZGVycywgb3B0aW9ucy5iaW5kZXJzKTtcbiAgICAvLyBtZXJnZU9iamVjdCh0aGlzLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgLy8gbWVyZ2VPYmplY3QodGhpcy5jb21wb25lbnRzLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgIC8vIG1lcmdlT2JqZWN0KHRoaXMuYWRhcHRlcnMsIG9wdGlvbnMuYWRhcHRlcnMpO1xuXG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgbGV0IHZhbHVlID0gb3B0aW9uc1tvcHRpb25dO1xuXG4gICAgICBpZiAoRVhURU5TSU9OUy5pbmRleE9mKG9wdGlvbikgPiAtMSkge1xuICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIHRoaXNbb3B0aW9uXVtrZXldID0gdmFsdWVba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzW29wdGlvbl0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGlueWJpbmQ7XG4iLCJpbXBvcnQgdGlueWJpbmQgZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IENvbXBvbmVudEJpbmRpbmcgfSBmcm9tICcuL2NvbXBvbmVudC1iaW5kaW5nJztcbmltcG9ydCB7IHBhcnNlVGVtcGxhdGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuXG5jb25zdCB0ZXh0QmluZGVyID0ge1xuICByb3V0aW5lOiAobm9kZSwgdmFsdWUpID0+IHtcbiAgICBub2RlLmRhdGEgPSAodmFsdWUgIT0gbnVsbCkgPyB2YWx1ZSA6ICcnO1xuICB9XG59O1xuXG5jb25zdCBERUNMQVJBVElPTl9TUExJVCA9IC8oKD86J1teJ10qJykqKD86KD86W15cXHwnXSooPzonW14nXSonKStbXlxcfCddKikrfFteXFx8XSspKXxeJC9nO1xuXG5jb25zdCBwYXJzZU5vZGUgPSAodmlldywgbm9kZSkgPT4ge1xuICBsZXQgYmxvY2sgPSBmYWxzZTtcblxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgIGxldCB0b2tlbnMgPSBwYXJzZVRlbXBsYXRlKG5vZGUuZGF0YSwgdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzKTtcblxuICAgIGlmICh0b2tlbnMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b2tlbi52YWx1ZSk7XG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGV4dCwgbm9kZSk7XG5cbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICB2aWV3LmJ1aWxkQmluZGluZyh0ZXh0LCBudWxsLCB0b2tlbi52YWx1ZSwgdGV4dEJpbmRlciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgICBibG9jayA9IHRydWU7XG4gIH0gZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGJsb2NrID0gdmlldy50cmF2ZXJzZShub2RlKTtcbiAgfVxuXG4gIGlmICghYmxvY2spIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFyc2VOb2RlKHZpZXcsIG5vZGUuY2hpbGROb2Rlc1tpXSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBiaW5kaW5nQ29tcGFyYXRvciA9IChhLCBiKSA9PiB7XG4gIGxldCBhUHJpb3JpdHkgPSBhLmJpbmRlciA/IChhLmJpbmRlci5wcmlvcml0eSB8fCAwKSA6IDA7XG4gIGxldCBiUHJpb3JpdHkgPSBiLmJpbmRlciA/IChiLmJpbmRlci5wcmlvcml0eSB8fCAwKSA6IDA7XG4gIHJldHVybiBiUHJpb3JpdHkgLSBhUHJpb3JpdHk7XG59O1xuXG5jb25zdCB0cmltU3RyID0gKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnRyaW0oKTtcbn07XG5cbi8vIEEgY29sbGVjdGlvbiBvZiBiaW5kaW5ncyBidWlsdCBmcm9tIGEgc2V0IG9mIHBhcmVudCBub2Rlcy5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICAvLyBUaGUgRE9NIGVsZW1lbnRzIGFuZCB0aGUgbW9kZWwgb2JqZWN0cyBmb3IgYmluZGluZyBhcmUgcGFzc2VkIGludG8gdGhlXG4gIC8vIGNvbnN0cnVjdG9yIGFsb25nIHdpdGggYW55IGxvY2FsIG9wdGlvbnMgdGhhdCBzaG91bGQgYmUgdXNlZCB0aHJvdWdob3V0IHRoZVxuICAvLyBjb250ZXh0IG9mIHRoZSB2aWV3IGFuZCBpdCdzIGJpbmRpbmdzLlxuICBjb25zdHJ1Y3RvcihlbHMsIG1vZGVscywgb3B0aW9ucykge1xuICAgIGlmIChlbHMuanF1ZXJ5IHx8IGVscyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLmVscyA9IGVscztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbHMgPSBbZWxzXTtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGVscyA9IG1vZGVscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy5idWlsZCgpO1xuICB9XG5cblxuICBidWlsZEJpbmRpbmcobm9kZSwgdHlwZSwgZGVjbGFyYXRpb24sIGJpbmRlciwgYXJncykge1xuICAgIGxldCBwaXBlcyA9IGRlY2xhcmF0aW9uLm1hdGNoKERFQ0xBUkFUSU9OX1NQTElUKS5tYXAodHJpbVN0cik7XG4gICAgbGV0IGtleXBhdGggPSBwaXBlcy5zaGlmdCgpO1xuICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQmluZGluZyh0aGlzLCBub2RlLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIHBpcGVzKSk7XG4gIH1cblxuICAvLyBQYXJzZXMgdGhlIERPTSB0cmVlIGFuZCBidWlsZHMgYEJpbmRpbmdgIGluc3RhbmNlcyBmb3IgZXZlcnkgbWF0Y2hlZFxuICAvLyBiaW5kaW5nIGRlY2xhcmF0aW9uLlxuICBidWlsZCgpIHtcbiAgICB0aGlzLmJpbmRpbmdzID0gW107XG5cbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVscywgaSwgbGVuO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwYXJzZU5vZGUodGhpcywgZWxlbWVudHNbaV0pO1xuICAgIH1cblxuICAgIHRoaXMuYmluZGluZ3Muc29ydChiaW5kaW5nQ29tcGFyYXRvcik7XG4gIH1cblxuICB0cmF2ZXJzZShub2RlKSB7XG4gICAgbGV0IGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcbiAgICBsZXQgYmxvY2sgPSBub2RlLm5vZGVOYW1lID09PSAnU0NSSVBUJyB8fCBub2RlLm5vZGVOYW1lID09PSAnU1RZTEUnO1xuICAgIGxldCBhdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgIGxldCBiaW5kSW5mb3MgPSBbXTtcbiAgICBsZXQgc3RhckJpbmRlcnMgPSB0aGlzLm9wdGlvbnMuc3RhckJpbmRlcnM7XG4gICAgdmFyIHR5cGUsIGJpbmRlciwgaWRlbnRpZmllciwgYXJncztcblxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyB3aXRoIHRoZSBiaW5kaW5nIHByZWZpeC4gRS5nLiBydlxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YoYmluZGluZ1ByZWZpeCkgPT09IDApIHtcbiAgICAgICAgdHlwZSA9IGF0dHJpYnV0ZS5uYW1lLnNsaWNlKGJpbmRpbmdQcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbdHlwZV07XG4gICAgICAgIGFyZ3MgPSBbXTtcblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc3RhckJpbmRlcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXIgPSBzdGFyQmluZGVyc1trXTtcbiAgICAgICAgICAgIGlmICh0eXBlLnNsaWNlKDAsIGlkZW50aWZpZXIubGVuZ3RoIC0gMSkgPT09IGlkZW50aWZpZXIuc2xpY2UoMCwgLTEpKSB7XG4gICAgICAgICAgICAgIGJpbmRlciA9IHRoaXMub3B0aW9ucy5iaW5kZXJzW2lkZW50aWZpZXJdO1xuICAgICAgICAgICAgICBhcmdzLnB1c2godHlwZS5zbGljZShpZGVudGlmaWVyLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFiaW5kZXIpIHtcbiAgICAgICAgICBiaW5kZXIgPSB0aW55YmluZC5mYWxsYmFja0JpbmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiaW5kZXIuYmxvY2spIHtcbiAgICAgICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCB0eXBlLCBhdHRyaWJ1dGUudmFsdWUsIGJpbmRlciwgYXJncyk7XG4gICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZEluZm9zLnB1c2goe2F0dHI6IGF0dHJpYnV0ZSwgYmluZGVyOiBiaW5kZXIsIHR5cGU6IHR5cGUsIGFyZ3M6IGFyZ3N9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJpbmRJbmZvID0gYmluZEluZm9zW2ldO1xuICAgICAgdGhpcy5idWlsZEJpbmRpbmcobm9kZSwgYmluZEluZm8udHlwZSwgYmluZEluZm8uYXR0ci52YWx1ZSwgYmluZEluZm8uYmluZGVyLCBiaW5kSW5mby5hcmdzKTtcbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGJpbmRJbmZvLmF0dHIubmFtZSk7XG4gICAgfVxuXG4gICAgLy8gYmluZCBjb21wb25lbnRzXG4gICAgaWYgKCFibG9jaykge1xuICAgICAgdHlwZSA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb21wb25lbnRzW3R5cGVdICYmICFub2RlLl9ib3VuZCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IENvbXBvbmVudEJpbmRpbmcodGhpcywgbm9kZSwgdHlwZSkpO1xuICAgICAgICBibG9jayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJsb2NrO1xuICB9XG5cbiAgLy8gQmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5iaW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICB1bmJpbmQoKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLmJpbmRpbmdzKSkge1xuICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICBiaW5kaW5nLnVuYmluZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN5bmNzIHVwIHRoZSB2aWV3IHdpdGggdGhlIG1vZGVsIGJ5IHJ1bm5pbmcgdGhlIHJvdXRpbmVzIG9uIGFsbCBiaW5kaW5ncy5cbiAgc3luYygpIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1Ymxpc2hlcyB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIHZpZXcgYmFjayB0byB0aGUgbW9kZWwgKHJldmVyc2Ugc3luYykuXG4gIHB1Ymxpc2goKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcuYmluZGVyICYmIGJpbmRpbmcuYmluZGVyLnB1Ymxpc2hlcykge1xuICAgICAgICBiaW5kaW5nLnB1Ymxpc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIHZpZXcncyBtb2RlbHMgYWxvbmcgd2l0aCBhbnkgYWZmZWN0ZWQgYmluZGluZ3MuXG4gIHVwZGF0ZShtb2RlbHMgPSB7fSkge1xuICAgIE9iamVjdC5rZXlzKG1vZGVscykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5tb2RlbHNba2V5XSA9IG1vZGVsc1trZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcudXBkYXRlKSB7XG4gICAgICAgIGJpbmRpbmcudXBkYXRlKG1vZGVscyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=