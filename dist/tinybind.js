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
                    console.log('cb', cb);
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

var _adapter = _interopRequireDefault(__webpack_require__(/*! ./adapter */ "./src/adapter.js"));

var _binders = _interopRequireDefault(__webpack_require__(/*! ./binders */ "./src/binders.js"));

var _sightglass = __webpack_require__(/*! ./sightglass */ "./src/sightglass.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the public interface.
_tinybind.default.binders = _binders.default;
_tinybind.default.adapters['.'] = _adapter.default;

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
    starBinders: Object.create(null)
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
  viewOptions.rootInterface = options && options.prefix ? options.rootInterface : _tinybind.default.rootInterface;
  viewOptions.preloadData = options && options.prefix ? options.preloadData : _tinybind.default.preloadData;
  viewOptions.handler = options && options.prefix ? options.handler : _tinybind.default.handler; // merge extensions

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

var Observer = // Constructs a new keypath observer and kicks things off.
function Observer(_obj, keypath, _callback) {
  _classCallCheck(this, Observer);

  _defineProperty(this, "keypath", void 0);

  _defineProperty(this, "callback", void 0);

  _defineProperty(this, "objectPath", void 0);

  _defineProperty(this, "obj", void 0);

  _defineProperty(this, "target", void 0);

  _defineProperty(this, "key", void 0);

  _defineProperty(this, "parse", function () {
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
  });

  _defineProperty(this, "realize", function () {
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
  });

  _defineProperty(this, "sync", function () {
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
  });

  _defineProperty(this, "value", function () {
    if (isObject(this.target)) {
      return this.get(this.key, this.target);
    }
  });

  _defineProperty(this, "setValue", function (value) {
    if (isObject(this.target)) {
      adapters[this.key.i].set(this.target, this.key.path, value);
    }
  });

  _defineProperty(this, "get", function (key, obj) {
    return adapters[key.i].get(obj, key.path);
  });

  _defineProperty(this, "set", function (active, key, obj, callback) {
    var action = active ? 'observe' : 'unobserve';
    adapters[key.i][action](obj, key.path, callback);
  });

  _defineProperty(this, "unobserve", function () {
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
  });

  _defineProperty(this, "getRootObject", function (obj) {
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
  });

  this.keypath = keypath;
  this.callback = _callback;
  this.objectPath = [];
  this.parse();
  this.obj = this.getRootObject(_obj);
  this.target = this.realize();

  if (isObject(this.target)) {
    this.set(true, this.key, this.target, this.callback);
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci5qcyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2V4cG9ydC50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLmpzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3NpZ2h0Z2xhc3MudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdGlueWJpbmQuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdmlldy5qcyJdLCJuYW1lcyI6WyJBUlJBWV9NRVRIT0RTIiwiYWRhcHRlciIsImNvdW50ZXIiLCJ3ZWFrbWFwIiwid2Vha1JlZmVyZW5jZSIsIm9iaiIsImhhc093blByb3BlcnR5IiwiaWQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiX19ydiIsImNhbGxiYWNrcyIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwicmVmIiwia2V5cyIsImxlbmd0aCIsInBvaW50ZXJzIiwic3R1YkZ1bmN0aW9uIiwiZm4iLCJvcmlnaW5hbCIsIm1hcCIsImFyZ3MiLCJyZXNwb25zZSIsImFwcGx5IiwiZm9yRWFjaCIsImsiLCJyIiwiQXJyYXkiLCJjYWxsYmFjayIsInN5bmMiLCJvYnNlcnZlTXV0YXRpb25zIiwia2V5cGF0aCIsImluZGV4T2YiLCJwdXNoIiwidW5vYnNlcnZlTXV0YXRpb25zIiwiaWR4Iiwic3BsaWNlIiwib2JzZXJ2ZSIsImRlc2MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXQiLCJzZXQiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwibmV3VmFsdWUiLCJjb25zb2xlIiwibG9nIiwiY2IiLCJ1bm9ic2VydmUiLCJnZXRTdHJpbmciLCJ0b1N0cmluZyIsInVuZGVmaW5lZCIsInRpbWVzIiwibiIsImkiLCJjcmVhdGVWaWV3IiwiYmluZGluZyIsImRhdGEiLCJhbmNob3JFbCIsInRlbXBsYXRlIiwiZWwiLCJjbG9uZU5vZGUiLCJ2aWV3IiwiVmlldyIsIm9wdGlvbnMiLCJiaW5kIiwibWFya2VyIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsImJpbmRlcnMiLCJmdW5jdGlvbiIsInByaW9yaXR5IiwidW5iaW5kIiwiaGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyb3V0aW5lIiwiZXZlbnRIYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJsb2NrIiwiZG9jdW1lbnQiLCJjcmVhdGVDb21tZW50IiwidHlwZSIsIml0ZXJhdGVkIiwicmVtb3ZlQ2hpbGQiLCJjb2xsZWN0aW9uIiwibW9kZWxOYW1lIiwiaXNBcnJheSIsIkVycm9yIiwiaW5kZXhQcm9wIiwiZ2V0QXR0cmlidXRlIiwiZ2V0SXRlcmF0aW9uQWxpYXMiLCJtb2RlbCIsImluZGV4IiwiJHBhcmVudCIsIm1vZGVscyIsInByZXZpb3VzIiwiZWxzIiwibmV4dFNpYmxpbmciLCJtYXRjaEluZGV4IiwibmV4dFZpZXciLCJuZXh0SW5kZXgiLCJwb3AiLCJub2RlTmFtZSIsImJpbmRpbmdzIiwidXBkYXRlIiwia2V5IiwiZWxDbGFzcyIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ0cmltIiwidGV4dCIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiaWYiLCJhdHRhY2hlZCIsImJvdW5kIiwibmVzdGVkIiwiZ2V0SW5wdXRWYWx1ZSIsInJlc3VsdHMiLCJGT1JNQVRURVJfQVJHUyIsIkZPUk1BVFRFUl9TUExJVCIsIlBSSU1JVElWRSIsIktFWVBBVEgiLCJCaW5kaW5nIiwiYmluZGVyIiwiZm9ybWF0dGVycyIsImZvcm1hdHRlck9ic2VydmVycyIsIk9ic2VydmVyIiwidG9rZW4iLCJvYnNlcnZlciIsInRhcmdldCIsImZvcm1hdHRlckluZGV4IiwicGFyc2VUeXBlIiwiYWkiLCJyZWR1Y2UiLCJyZXN1bHQiLCJkZWNsYXJhdGlvbiIsIm1hdGNoIiwic2hpZnQiLCJmb3JtYXR0ZXIiLCJwcm9jZXNzZWRBcmdzIiwicGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMiLCJyZWFkIiwiRnVuY3Rpb24iLCJldiIsImNhbGwiLCJmb3JtYXR0ZWRWYWx1ZSIsInJvdXRpbmVGbiIsInJlZHVjZVJpZ2h0Iiwic3BsaXQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwicGFyc2VUYXJnZXQiLCJwcmVsb2FkRGF0YSIsImZpIiwiQ29tcG9uZW50QmluZGluZyIsImNvbXBvbmVudCIsImNvbXBvbmVudHMiLCJzdGF0aWMiLCJvYnNlcnZlcnMiLCJ1cHN0cmVhbU9ic2VydmVycyIsImJpbmRpbmdQcmVmaXgiLCJ0aW55YmluZCIsIl9mdWxsUHJlZml4IiwibGVuIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsIm5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJjYW1lbENhc2UiLCJzdGF0Iiwic3RyaW5nIiwiZ3JvdXBlZCIsInRvVXBwZXJDYXNlIiwiY29tcG9uZW50VmlldyIsInNjb3BlIiwiaW5pdGlhbGl6ZSIsImxvY2FscyIsIl9ib3VuZCIsIkVYVEVOU0lPTlMiLCJleHRlbnNpb25UeXBlIiwiT1BUSU9OUyIsInByb3RvdHlwZSIsInNsaWNlIiwiY2hpbGROb2RlcyIsInVwc3RyZWFtIiwiYWRhcHRlcnMiLCJtZXJnZU9iamVjdCIsInZpZXdPcHRpb25zIiwiY3JlYXRlIiwic3RhckJpbmRlcnMiLCJwcmVmaXgiLCJ0ZW1wbGF0ZURlbGltaXRlcnMiLCJyb290SW50ZXJmYWNlIiwiZmlsdGVyIiwidXBkYXRlT3B0aW9ucyIsImluaXQiLCJjb21wb25lbnRLZXkiLCJjcmVhdGVFbGVtZW50IiwibmVnYXRlIiwibm90IiwiUVVPVEVEX1NUUiIsIlRFWFQiLCJCSU5ESU5HIiwiaXNKc29uIiwic3RyIiwidmFsIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZVRlbXBsYXRlIiwiZGVsaW1pdGVycyIsInRva2VucyIsImxhc3RJbmRleCIsIm9wZW4iLCJjbG9zZSIsInN1YnN0cmluZyIsImxhc3RUb2tlbiIsImlzT2JqZWN0IiwibWVzc2FnZSIsImludGVyZmFjZXMiLCJwYXRoIiwicm9vdCIsInN1YnN0ciIsInRva2VuaXplIiwiY3VycmVudCIsInVucmVhY2hlZCIsInByZXYiLCJvYmplY3RQYXRoIiwibmV4dCIsIm9sZFZhbHVlIiwicmVhbGl6ZSIsImFjdGl2ZSIsImFjdGlvbiIsInJvb3RQcm9wIiwiZ2V0Um9vdE9iamVjdCIsImNociIsImNoYXJBdCIsIl9wcmVmaXgiLCJjb250ZXh0IiwiZmFsbGJhY2tCaW5kZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25maWd1cmUiLCJ0ZXh0QmluZGVyIiwibm9kZSIsIkRFQ0xBUkFUSU9OX1NQTElUIiwicGFyc2VOb2RlIiwibm9kZVR5cGUiLCJjcmVhdGVUZXh0Tm9kZSIsImJ1aWxkQmluZGluZyIsInRyYXZlcnNlIiwiYmluZGluZ0NvbXBhcmF0b3IiLCJhIiwiYiIsImFQcmlvcml0eSIsImJQcmlvcml0eSIsInRyaW1TdHIiLCJqcXVlcnkiLCJidWlsZCIsInBpcGVzIiwiZWxlbWVudHMiLCJzb3J0IiwiYmluZEluZm9zIiwiaWRlbnRpZmllciIs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LGtCQUFRZ0QsTUFBUixDQUFlVixNQUFmO0FBQ0Q7QUFDRixPQUpEO0FBS0QiLCJmaWxlIjoidGlueWJpbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0aW55YmluZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0aW55YmluZFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZXhwb3J0LnRzXCIpO1xuIiwiLy8gVGhlIGRlZmF1bHQgYC5gIGFkYXB0ZXIgdGhhdCBjb21lcyB3aXRoIHRpbnliaW5kLmpzLiBBbGxvd3Mgc3Vic2NyaWJpbmcgdG9cbi8vIHByb3BlcnRpZXMgb24gcGxhaW4gb2JqZWN0cywgaW1wbGVtZW50ZWQgaW4gRVM1IG5hdGl2ZXMgdXNpbmdcbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgLlxuXG5jb25zdCBBUlJBWV9NRVRIT0RTID0gW1xuICAncHVzaCcsXG4gICdwb3AnLFxuICAnc2hpZnQnLFxuICAndW5zaGlmdCcsXG4gICdzb3J0JyxcbiAgJ3JldmVyc2UnLFxuICAnc3BsaWNlJ1xuXTtcblxuY29uc3QgYWRhcHRlciA9IHtcbiAgY291bnRlcjogMCxcbiAgd2Vha21hcDoge30sXG5cbiAgd2Vha1JlZmVyZW5jZTogZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoJ19fcnYnKSkge1xuICAgICAgbGV0IGlkID0gdGhpcy5jb3VudGVyKys7XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX3J2Jywge1xuICAgICAgICB2YWx1ZTogaWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy53ZWFrbWFwW29iai5fX3J2XSkge1xuICAgICAgdGhpcy53ZWFrbWFwW29iai5fX3J2XSA9IHtcbiAgICAgICAgY2FsbGJhY2tzOiB7fVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcbiAgfSxcblxuICBjbGVhbnVwV2Vha1JlZmVyZW5jZTogZnVuY3Rpb24ocmVmLCBpZCkge1xuICAgIGlmICghT2JqZWN0LmtleXMocmVmLmNhbGxiYWNrcykubGVuZ3RoKSB7XG4gICAgICBpZiAoIShyZWYucG9pbnRlcnMgJiYgT2JqZWN0LmtleXMocmVmLnBvaW50ZXJzKS5sZW5ndGgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLndlYWttYXBbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzdHViRnVuY3Rpb246IGZ1bmN0aW9uKG9iaiwgZm4pIHtcbiAgICBsZXQgb3JpZ2luYWwgPSBvYmpbZm5dO1xuICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcbiAgICBsZXQgd2Vha21hcCA9IHRoaXMud2Vha21hcDtcblxuICAgIG9ialtmbl0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gb3JpZ2luYWwuYXBwbHkob2JqLCBhcmdzKTtcblxuICAgICAgT2JqZWN0LmtleXMobWFwLnBvaW50ZXJzKS5mb3JFYWNoKHIgPT4ge1xuICAgICAgICBsZXQgayA9IG1hcC5wb2ludGVyc1tyXTtcblxuICAgICAgICBpZiAod2Vha21hcFtyXSkge1xuICAgICAgICAgIGlmICh3ZWFrbWFwW3JdLmNhbGxiYWNrc1trXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB3ZWFrbWFwW3JdLmNhbGxiYWNrc1trXS5mb3JFYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2suc3luYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG4gIH0sXG5cbiAgb2JzZXJ2ZU11dGF0aW9uczogZnVuY3Rpb24ob2JqLCByZWYsIGtleXBhdGgpIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcblxuICAgICAgaWYgKCFtYXAucG9pbnRlcnMpIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzID0ge307XG5cbiAgICAgICAgQVJSQVlfTUVUSE9EUy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICB0aGlzLnN0dWJGdW5jdGlvbihvYmosIGZuKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzW3JlZl0pIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzW3JlZl0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcC5wb2ludGVyc1tyZWZdLmluZGV4T2Yoa2V5cGF0aCkgPT09IC0xKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdLnB1c2goa2V5cGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHVub2JzZXJ2ZU11dGF0aW9uczogZnVuY3Rpb24ob2JqLCByZWYsIGtleXBhdGgpIHtcbiAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEFycmF5KSAmJiAob2JqLl9fcnYgIT0gbnVsbCkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICBpZiAobWFwKSB7XG4gICAgICAgIGxldCBwb2ludGVycyA9IG1hcC5wb2ludGVyc1tyZWZdO1xuXG4gICAgICAgIGlmIChwb2ludGVycykge1xuICAgICAgICAgIGxldCBpZHggPSBwb2ludGVycy5pbmRleE9mKGtleXBhdGgpO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICBwb2ludGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5wb2ludGVyc1tyZWZdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY2xlYW51cFdlYWtSZWZlcmVuY2UobWFwLCBvYmouX19ydik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgb2JzZXJ2ZTogZnVuY3Rpb24ob2JqLCBrZXlwYXRoLCBjYWxsYmFjaykge1xuICAgIHZhciB2YWx1ZTtcbiAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaikuY2FsbGJhY2tzO1xuXG4gICAgaWYgKCFjYWxsYmFja3Nba2V5cGF0aF0pIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXSA9IFtdO1xuICAgICAgbGV0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5cGF0aCk7XG5cbiAgICAgIGlmICghZGVzYyB8fCAhKGRlc2MuZ2V0IHx8IGRlc2Muc2V0IHx8ICFkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgICAgdmFsdWUgPSBvYmpba2V5cGF0aF07XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5cGF0aCwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMudW5vYnNlcnZlTXV0YXRpb25zKHZhbHVlLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICAgICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKGNiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NiJywgY2IpO1xuICAgICAgICAgICAgICAgICAgICBjYi5zeW5jKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMobmV3VmFsdWUsIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrc1trZXlwYXRoXS5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gIH0sXG5cbiAgdW5vYnNlcnZlOiBmdW5jdGlvbihvYmosIGtleXBhdGgsIGNhbGxiYWNrKSB7XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBsZXQgaWR4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuXG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgICAgIGlmICghY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG4gICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBnZXQ6IGZ1bmN0aW9uKG9iaiwga2V5cGF0aCkge1xuICAgIHJldHVybiBvYmpba2V5cGF0aF07XG4gIH0sXG5cbiAgc2V0OiAob2JqLCBrZXlwYXRoLCB2YWx1ZSkgPT4ge1xuICAgIG9ialtrZXlwYXRoXSA9IHZhbHVlO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGFwdGVyO1xuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcblxuY29uc3QgZ2V0U3RyaW5nID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsID8gdmFsdWUudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRpbWVzID0gKG4sIGNiKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSBjYigpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVmlldyhiaW5kaW5nLCBkYXRhLCBhbmNob3JFbCkge1xuICBsZXQgdGVtcGxhdGUgPSBiaW5kaW5nLmVsLmNsb25lTm9kZSh0cnVlKTtcbiAgbGV0IHZpZXcgPSBuZXcgVmlldyh0ZW1wbGF0ZSwgZGF0YSwgYmluZGluZy52aWV3Lm9wdGlvbnMpO1xuICB2aWV3LmJpbmQoKTtcbiAgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGVtcGxhdGUsIGFuY2hvckVsKTtcbiAgcmV0dXJuIHZpZXc7XG59XG5cbmNvbnN0IGJpbmRlcnMgPSB7XG4gIC8vIEJpbmRzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIGVsZW1lbnQuXG4gICdvbi0qJzoge1xuICAgIGZ1bmN0aW9uOiB0cnVlLFxuICAgIHByaW9yaXR5OiAxMDAwLFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5oYW5kbGVyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZTogZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhhbmRsZXIgPSB0aGlzLmV2ZW50SGFuZGxlcih2YWx1ZSk7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5oYW5kbGVyKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQXBwZW5kcyBib3VuZCBpbnN0YW5jZXMgb2YgdGhlIGVsZW1lbnQgaW4gcGxhY2UgZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuXG4gICdlYWNoLSonOiB7XG4gICAgYmxvY2s6IHRydWUsXG5cbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWwpIHtcbiAgICAgIGlmICghdGhpcy5tYXJrZXIpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KGAgdGlueWJpbmQ6ICR7dGhpcy50eXBlfSBgKTtcbiAgICAgICAgdGhpcy5pdGVyYXRlZCA9IFtdO1xuXG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pdGVyYXRlZC5mb3JFYWNoKHZpZXcgPT4ge1xuICAgICAgICAgIHZpZXcuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsKSB7XG4gICAgICBpZiAodGhpcy5pdGVyYXRlZCkge1xuICAgICAgICB0aGlzLml0ZXJhdGVkLmZvckVhY2godmlldyA9PiB7XG4gICAgICAgICAgdmlldy51bmJpbmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWwsIGNvbGxlY3Rpb24pIHtcbiAgICAgIGxldCBtb2RlbE5hbWUgPSB0aGlzLmFyZ3NbMF07XG4gICAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbiB8fCBbXTtcblxuICAgICAgLy8gVE9ETyBzdXBwb3J0IG9iamVjdCBrZXlzIHRvIGl0ZXJhdGUgb3ZlclxuICAgICAgaWYoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlYWNoLScgKyBtb2RlbE5hbWUgKyAnIG5lZWRzIGFuIGFycmF5IHRvIGl0ZXJhdGUgb3ZlciwgYnV0IGl0IGlzJywgY29sbGVjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGluZGV4IG5hbWUgaXMgc2V0ZWQgYnkgYGluZGV4LXByb3BlcnR5YCB1c2UgdGhpcyBuYW1lLCBvdGhlcndpc2UgYCVbbW9kZWxOYW1lXSVgICBcbiAgICAgIGxldCBpbmRleFByb3AgPSBlbC5nZXRBdHRyaWJ1dGUoJ2luZGV4LXByb3BlcnR5JykgfHwgdGhpcy5nZXRJdGVyYXRpb25BbGlhcyhtb2RlbE5hbWUpO1xuXG4gICAgICBjb2xsZWN0aW9uLmZvckVhY2goKG1vZGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgZGF0YSA9IHskcGFyZW50OiB0aGlzLnZpZXcubW9kZWxzfTtcbiAgICAgICAgZGF0YVtpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgIGRhdGFbbW9kZWxOYW1lXSA9IG1vZGVsO1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMuaXRlcmF0ZWRbaW5kZXhdO1xuXG4gICAgICAgIGlmICghdmlldykge1xuXG4gICAgICAgICAgbGV0IHByZXZpb3VzID0gdGhpcy5tYXJrZXI7XG5cbiAgICAgICAgICBpZiAodGhpcy5pdGVyYXRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5pdGVyYXRlZFt0aGlzLml0ZXJhdGVkLmxlbmd0aCAtIDFdLmVsc1swXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2aWV3ID0gY3JlYXRlVmlldyh0aGlzLCBkYXRhLCBwcmV2aW91cy5uZXh0U2libGluZyk7XG4gICAgICAgICAgdGhpcy5pdGVyYXRlZC5wdXNoKHZpZXcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2aWV3Lm1vZGVsc1ttb2RlbE5hbWVdICE9PSBtb2RlbCkge1xuICAgICAgICAgICAgLy8gc2VhcmNoIGZvciBhIHZpZXcgdGhhdCBtYXRjaGVzIHRoZSBtb2RlbFxuICAgICAgICAgICAgbGV0IG1hdGNoSW5kZXgsIG5leHRWaWV3O1xuICAgICAgICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gaW5kZXggKyAxOyBuZXh0SW5kZXggPCB0aGlzLml0ZXJhdGVkLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSB0aGlzLml0ZXJhdGVkW25leHRJbmRleF07XG4gICAgICAgICAgICAgIGlmIChuZXh0Vmlldy5tb2RlbHNbbW9kZWxOYW1lXSA9PT0gbW9kZWwpIHtcbiAgICAgICAgICAgICAgICBtYXRjaEluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIC8vIG1vZGVsIGlzIGluIG90aGVyIHBvc2l0aW9uXG4gICAgICAgICAgICAgIC8vIHRvZG86IGNvbnNpZGVyIGF2b2lkaW5nIHRoZSBzcGxpY2UgaGVyZSBieSBzZXR0aW5nIGEgZmxhZ1xuICAgICAgICAgICAgICAvLyBwcm9maWxlIHBlcmZvcm1hbmNlIGJlZm9yZSBpbXBsZW1lbnRpbmcgc3VjaCBjaGFuZ2VcbiAgICAgICAgICAgICAgdGhpcy5pdGVyYXRlZC5zcGxpY2UobWF0Y2hJbmRleCwgMSk7XG4gICAgICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5leHRWaWV3LmVsc1swXSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgICBuZXh0Vmlldy5tb2RlbHNbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy9uZXcgbW9kZWxcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSBjcmVhdGVWaWV3KHRoaXMsIGRhdGEsIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXRlcmF0ZWQuc3BsaWNlKGluZGV4LCAwLCBuZXh0Vmlldyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5pdGVyYXRlZC5sZW5ndGggPiBjb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICB0aW1lcyh0aGlzLml0ZXJhdGVkLmxlbmd0aCAtIGNvbGxlY3Rpb24ubGVuZ3RoLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHZpZXcgPSB0aGlzLml0ZXJhdGVkLnBvcCgpO1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2aWV3LmVsc1swXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwubm9kZU5hbWUgPT09ICdPUFRJT04nKSB7XG4gICAgICAgIHRoaXMudmlldy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICAgIGlmIChiaW5kaW5nLmVsID09PSB0aGlzLm1hcmtlci5wYXJlbnROb2RlICYmIGJpbmRpbmcudHlwZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgYmluZGluZy5zeW5jKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlKG1vZGVscykge1xuICAgICAgbGV0IGRhdGEgPSB7fTtcblxuICAgICAgLy90b2RvOiBhZGQgdGVzdCBhbmQgZml4IGlmIG5lY2Vzc2FyeVxuXG4gICAgICBPYmplY3Qua2V5cyhtb2RlbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGtleSAhPT0gdGhpcy5hcmdzWzBdKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gbW9kZWxzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLml0ZXJhdGVkLmZvckVhY2godmlldyA9PiB7XG4gICAgICAgIHZpZXcudXBkYXRlKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFkZHMgb3IgcmVtb3ZlcyB0aGUgY2xhc3MgZnJvbSB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgb3IgZmFsc2UuXG4gICdjbGFzcy0qJzogZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgbGV0IGVsQ2xhc3MgPSBgICR7ZWwuY2xhc3NOYW1lfSBgO1xuXG4gICAgaWYgKHZhbHVlICE9PSAoZWxDbGFzcy5pbmRleE9mKGAgJHt0aGlzLmFyZ3NbMF19IGApID4gLTEpKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gYCR7ZWwuY2xhc3NOYW1lfSAke3RoaXMuYXJnc1swXX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWxDbGFzcy5yZXBsYWNlKGAgJHt0aGlzLmFyZ3NbMF19IGAsICcgJykudHJpbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgdGV4dCB2YWx1ZS5cbiAgdGV4dDogKGVsLCB2YWx1ZSkgPT4ge1xuICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIEhUTUwgY29udGVudC5cbiAgaHRtbDogKGVsLCB2YWx1ZSkgPT4ge1xuICAgIGVsLmlubmVySFRNTCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8vIFNob3dzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZS5cbiAgc2hvdzogKGVsLCB2YWx1ZSkgPT4ge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICB9LFxuXG4gIC8vIEhpZGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSAobmVnYXRlZCB2ZXJzaW9uIG9mIGBzaG93YCBiaW5kZXIpLlxuICBoaWRlOiAoZWwsIHZhbHVlKSA9PiB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gIH0sXG5cbiAgLy8gRW5hYmxlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIGVuYWJsZWQ6IChlbCwgdmFsdWUpID0+IHtcbiAgICBlbC5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgfSxcblxuICAvLyBEaXNhYmxlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgKG5lZ2F0ZWQgdmVyc2lvbiBvZiBgZW5hYmxlZGAgYmluZGVyKS5cbiAgZGlzYWJsZWQ6IChlbCwgdmFsdWUpID0+IHtcbiAgICBlbC5kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH0sXG5cbiAgLy8gQ2hlY2tzIGEgY2hlY2tib3ggb3IgcmFkaW8gaW5wdXQgd2hlbiB0aGUgdmFsdWUgaXMgdHJ1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbFxuICAvLyBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBpcyBjaGVja2VkIG9yIHVuY2hlY2tlZCAodHdvLXdheSBiaW5kZXIpLlxuICBjaGVja2VkOiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAyMDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGlmICghdGhpcy5jYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jYWxsYmFjayk7XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICByb3V0aW5lOiBmdW5jdGlvbihlbCwgdmFsdWUpIHtcbiAgICAgIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSBnZXRTdHJpbmcoZWwudmFsdWUpID09PSBnZXRTdHJpbmcodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyB2YWx1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbCBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBjaGFuZ2VzXG4gIC8vICh0d28td2F5IGJpbmRlcikuXG4gIHZhbHVlOiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAzMDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHRoaXMuaXNSYWRpbyA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWwudHlwZSA9PT0gJ3JhZGlvJztcbiAgICAgIGlmICghdGhpcy5pc1JhZGlvKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2V2ZW50LW5hbWUnKSB8fCAoZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcgPyAnY2hhbmdlJyA6ICdpbnB1dCcpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmNhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICBpZiAoIXRoaXMuaXNSYWRpbykge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lOiBmdW5jdGlvbihlbCwgdmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmlzUmFkaW8pIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJykge1xuICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGxldCBvcHRpb24gPSBlbFtpXTtcbiAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGdldFN0cmluZyh2YWx1ZSkgIT09IGdldFN0cmluZyhlbC52YWx1ZSkpIHtcbiAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEluc2VydHMgYW5kIGJpbmRzIHRoZSBlbGVtZW50IGFuZCBpdCdzIGNoaWxkIG5vZGVzIGludG8gdGhlIERPTSB3aGVuIHRydWUuXG4gIGlmOiB7XG4gICAgYmxvY2s6IHRydWUsXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgaWYgKCF0aGlzLm1hcmtlcikge1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyB0aW55YmluZDogJyArIHRoaXMudHlwZSArICcgJyArIHRoaXMua2V5cGF0aCArICcgJyk7XG4gICAgICAgIHRoaXMuYXR0YWNoZWQgPSBmYWxzZTtcblxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ib3VuZCA9PT0gZmFsc2UgJiYgdGhpcy5uZXN0ZWQpIHtcbiAgICAgICAgdGhpcy5uZXN0ZWQuYmluZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5ib3VuZCA9IHRydWU7XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5uZXN0ZWQpIHtcbiAgICAgICAgdGhpcy5uZXN0ZWQudW5iaW5kKCk7XG4gICAgICAgIHRoaXMuYm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZTogZnVuY3Rpb24oZWwsIHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgICBpZiAodmFsdWUgIT09IHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cbiAgICAgICAgICBpZiAoIXRoaXMubmVzdGVkKSB7XG4gICAgICAgICAgICB0aGlzLm5lc3RlZCA9IG5ldyBWaWV3KGVsLCB0aGlzLnZpZXcubW9kZWxzLCB0aGlzLnZpZXcub3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLm5lc3RlZC5iaW5kKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHRoaXMubWFya2VyLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmF0dGFjaGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICB0aGlzLmF0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbihtb2RlbHMpIHtcbiAgICAgIGlmICh0aGlzLm5lc3RlZCkge1xuICAgICAgICB0aGlzLm5lc3RlZC51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJpbmRlcnM7XG4iLCJpbXBvcnQge3BhcnNlVHlwZX0gZnJvbSAnLi9wYXJzZXJzJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAnLi9zaWdodGdsYXNzJztcblxuZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZShlbCkge1xuICBsZXQgcmVzdWx0cyA9IFtdO1xuICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgIHJldHVybiBlbC5jaGVja2VkO1xuICB9IGVsc2UgaWYgKGVsLnR5cGUgPT09ICdzZWxlY3QtbXVsdGlwbGUnKSB7XG5cbiAgICBlbC5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKG9wdGlvbi52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwudmFsdWU7XG4gIH1cbn1cblxuY29uc3QgRk9STUFUVEVSX0FSR1MgPSAgL1teXFxzJ10rfCcoW14nXXwnW15cXHNdKSonfFwiKFteXCJdfFwiW15cXHNdKSpcIi9nO1xuY29uc3QgRk9STUFUVEVSX1NQTElUID0gL1xccysvO1xuXG4vKipcbiAqIFVzZWQgYWxzbyBpbiBwYXJzZXJzLnBhcnNlVHlwZVxuICogVE9ETyBvdXRzb3VyY2VcbiAqL1xuY29uc3QgUFJJTUlUSVZFID0gMDtcbmNvbnN0IEtFWVBBVEggPSAxO1xuXG4vLyBBIHNpbmdsZSBiaW5kaW5nIGJldHdlZW4gYSBtb2RlbCBhdHRyaWJ1dGUgYW5kIGEgRE9NIGVsZW1lbnQuXG5leHBvcnQgY2xhc3MgQmluZGluZyB7XG4gIC8qKlxuICAgKiBBbGwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGJpbmRpbmcgaXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yOyB0aGVcbiAgICogY29udGFpbmluZyB2aWV3LCB0aGUgRE9NIG5vZGUsIHRoZSB0eXBlIG9mIGJpbmRpbmcsIHRoZSBtb2RlbCBvYmplY3QgYW5kIHRoZVxuICAgKiBrZXlwYXRoIGF0IHdoaWNoIHRvIGxpc3RlbiBmb3IgY2hhbmdlcy5cbiAgICogQHBhcmFtIHsqfSB2aWV3IFxuICAgKiBAcGFyYW0geyp9IGVsIFxuICAgKiBAcGFyYW0geyp9IHR5cGUgXG4gICAqIEBwYXJhbSB7Kn0ga2V5cGF0aCBcbiAgICogQHBhcmFtIHsqfSBiaW5kZXIgXG4gICAqIEBwYXJhbSB7Kn0gYXJncyBUaGUgc3RhcnQgYmluZGVycywgb24gYGNsYXNzLSpgIGFyZ3NbMF0gd2lsIGJlIHRoZSBjbGFzc25hbWUgXG4gICAqIEBwYXJhbSB7Kn0gZm9ybWF0dGVycyBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHZpZXcsIGVsLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIGZvcm1hdHRlcnMpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5iaW5kZXIgPSBiaW5kZXI7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gICAgdGhpcy5tb2RlbCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIE9ic2VydmVzIHRoZSBvYmplY3Qga2V5cGF0aFxuICBvYnNlcnZlKG9iaiwga2V5cGF0aCkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCB0aGlzKTtcbiAgfVxuXG4gIHBhcnNlVGFyZ2V0KCkge1xuICAgIGlmICh0aGlzLmtleXBhdGgpIHtcbiAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZSh0aGlzLmtleXBhdGgpO1xuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdG9rZW4udmFsdWU7XG4gICAgICB9IGVsc2UgaWYodG9rZW4udHlwZSA9PT0gS0VZUEFUSCl7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgaW4gdG9rZW4nLCB0b2tlbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogR2V0IHRoZSBpdGVyYXRpb24gYWxpYXMsIHVzZWQgaW4gdGhlIGludGVyYXRpb24gYmluZGVycyBsaWtlIGBlYWNoLSpgXG4gICAqIEBwYXJhbSB7Kn0gbW9kZWxOYW1lIFxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMjZcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDExNzVcbiAgICovXG4gIGdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZSkge1xuICAgIHJldHVybiAnJScgKyBtb2RlbE5hbWUgKyAnJSc7XG4gIH1cblxuICBwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBmb3JtYXR0ZXJJbmRleCkge1xuICAgIHJldHVybiBhcmdzXG4gICAgICAubWFwKHBhcnNlVHlwZSlcbiAgICAgIC5tYXAoKHt0eXBlLCB2YWx1ZX0sIGFpKSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gS0VZUEFUSCkge1xuICAgICAgICAgIGlmICghdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0gPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldO1xuXG4gICAgICAgICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgICAgICAgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdW2FpXSA9IG9ic2VydmVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBvYnNlcnZlci52YWx1ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlJywgdHlwZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIEFwcGxpZXMgYWxsIHRoZSBjdXJyZW50IGZvcm1hdHRlcnMgdG8gdGhlIHN1cHBsaWVkIHZhbHVlIGFuZCByZXR1cm5zIHRoZVxuICAvLyBmb3JtYXR0ZWQgdmFsdWUuXG4gIGZvcm1hdHRlZFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVycy5yZWR1Y2UoKHJlc3VsdCwgZGVjbGFyYXRpb24sIGluZGV4KSA9PiB7XG4gICAgICBsZXQgYXJncyA9IGRlY2xhcmF0aW9uLm1hdGNoKEZPUk1BVFRFUl9BUkdTKTtcbiAgICAgIGxldCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGxldCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcblxuICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICBpZiAoZm9ybWF0dGVyICYmIChmb3JtYXR0ZXIucmVhZCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucmVhZChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgdmFsdWUpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhbiBldmVudCBoYW5kbGVyIGZvciB0aGUgYmluZGluZyBhcm91bmQgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICBldmVudEhhbmRsZXIoZm4pIHtcbiAgICBsZXQgYmluZGluZyA9IHRoaXM7XG4gICAgbGV0IGhhbmRsZXIgPSBiaW5kaW5nLnZpZXcub3B0aW9ucy5oYW5kbGVyO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGV2KSB7XG4gICAgICBoYW5kbGVyLmNhbGwoZm4sIHRoaXMsIGV2LCBiaW5kaW5nKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gU2V0cyB0aGUgdmFsdWUgZm9yIHRoZSBiaW5kaW5nLiBUaGlzIEJhc2ljYWxseSBqdXN0IHJ1bnMgdGhlIGJpbmRpbmcgcm91dGluZVxuICAvLyB3aXRoIHRoZSBzdXBwbGllZCB2YWx1ZSBmb3JtYXR0ZWQuXG4gIHNldCh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgJiYgIXRoaXMuYmluZGVyLmZ1bmN0aW9uKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUuY2FsbCh0aGlzLm1vZGVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgbGV0IHJvdXRpbmVGbiA9IHRoaXMuYmluZGVyLnJvdXRpbmUgfHwgdGhpcy5iaW5kZXI7XG5cbiAgICBpZiAocm91dGluZUZuIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJvdXRpbmVGbi5jYWxsKHRoaXMsIHRoaXMuZWwsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBTeW5jcyB1cCB0aGUgdmlldyBiaW5kaW5nIHdpdGggdGhlIG1vZGVsLlxuICBzeW5jKCkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgICB0aGlzLnNldCh0aGlzLm9ic2VydmVyLnZhbHVlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBQdWJsaXNoZXMgdGhlIHZhbHVlIGN1cnJlbnRseSBzZXQgb24gdGhlIGlucHV0IGVsZW1lbnQgYmFjayB0byB0aGUgbW9kZWwuXG4gIHB1Ymxpc2goKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVycy5yZWR1Y2VSaWdodCgocmVzdWx0LCBkZWNsYXJhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgYXJncyA9IGRlY2xhcmF0aW9uLnNwbGl0KEZPUk1BVFRFUl9TUExJVCk7XG4gICAgICAgIGNvbnN0IGlkID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICAgIGlmIChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLnB1Ymxpc2gpIHtcbiAgICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucHVibGlzaChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB0aGlzLmdldFZhbHVlKHRoaXMuZWwpKTtcblxuICAgICAgdGhpcy5vYnNlcnZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU3Vic2NyaWJlcyB0byB0aGUgbW9kZWwgZm9yIGNoYW5nZXMgYXQgdGhlIHNwZWNpZmllZCBrZXlwYXRoLiBCaS1kaXJlY3Rpb25hbFxuICAvLyByb3V0aW5lcyB3aWxsIGFsc28gbGlzdGVuIGZvciBjaGFuZ2VzIG9uIHRoZSBlbGVtZW50IHRvIHByb3BhZ2F0ZSB0aGVtIGJhY2tcbiAgLy8gdG8gdGhlIG1vZGVsLlxuICBiaW5kKCkge1xuICAgIHRoaXMucGFyc2VUYXJnZXQoKTtcblxuICAgIGlmICh0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnYmluZCcpKSB7XG4gICAgICB0aGlzLmJpbmRlci5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhKSB7XG4gICAgICB0aGlzLnN5bmMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBVbnN1YnNjcmliZXMgZnJvbSB0aGUgbW9kZWwgYW5kIHRoZSBlbGVtZW50LlxuICB1bmJpbmQoKSB7XG4gICAgaWYgKHRoaXMuYmluZGVyLnVuYmluZCkge1xuICAgICAgdGhpcy5iaW5kZXIudW5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIudW5vYnNlcnZlKCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMpLmZvckVhY2goZmkgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmaV07XG5cbiAgICAgIE9iamVjdC5rZXlzKGFyZ3MpLmZvckVhY2goYWkgPT4ge1xuICAgICAgICBhcmdzW2FpXS51bm9ic2VydmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMgPSB7fTtcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIGJpbmRpbmcncyBtb2RlbCBmcm9tIHdoYXQgaXMgY3VycmVudGx5IHNldCBvbiB0aGUgdmlldy4gVW5iaW5kc1xuICAvLyB0aGUgb2xkIG1vZGVsIGZpcnN0IGFuZCB0aGVuIHJlLWJpbmRzIHdpdGggdGhlIG5ldyBtb2RlbC5cbiAgdXBkYXRlKG1vZGVscyA9IHt9KSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5iaW5kZXIudXBkYXRlKSB7XG4gICAgICB0aGlzLmJpbmRlci51cGRhdGUuY2FsbCh0aGlzLCBtb2RlbHMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgZWxlbWVudHMgdmFsdWVcbiAgZ2V0VmFsdWUoZWwpIHtcbiAgICBpZiAodGhpcy5iaW5kZXIgJiYgdGhpcy5iaW5kZXIuZ2V0VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmJpbmRlci5nZXRWYWx1ZS5jYWxsKHRoaXMsIGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldElucHV0VmFsdWUoZWwpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHRpbnliaW5kIGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHtwYXJzZVR5cGV9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQge0VYVEVOU0lPTlMsIE9QVElPTlN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7QmluZGluZ30gZnJvbSAnLi9iaW5kaW5nJztcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuLy8gY29tcG9uZW50IHZpZXcgZW5jYXBzdWxhdGVkIGFzIGEgYmluZGluZyB3aXRoaW4gaXQncyBwYXJlbnQgdmlldy5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRCaW5kaW5nIGV4dGVuZHMgQmluZGluZyB7XG4gIC8vIEluaXRpYWxpemVzIGEgY29tcG9uZW50IGJpbmRpbmcgZm9yIHRoZSBzcGVjaWZpZWQgdmlldy4gVGhlIHJhdyBjb21wb25lbnRcbiAgLy8gZWxlbWVudCBpcyBwYXNzZWQgaW4gYWxvbmcgd2l0aCB0aGUgY29tcG9uZW50IHR5cGUuIEF0dHJpYnV0ZXMgYW5kIHNjb3BlXG4gIC8vIGluZmxlY3Rpb25zIGFyZSBkZXRlcm1pbmVkIGJhc2VkIG9uIHRoZSBjb21wb25lbnRzIGRlZmluZWQgYXR0cmlidXRlcy5cbiAgY29uc3RydWN0b3IodmlldywgZWwsIHR5cGUpIHtcbiAgICBzdXBlcih2aWV3LCBlbCwgdHlwZSwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHZpZXcub3B0aW9ucy5jb21wb25lbnRzW3RoaXMudHlwZV07XG4gICAgdGhpcy5zdGF0aWMgPSB7fTtcbiAgICB0aGlzLm9ic2VydmVycyA9IHt9O1xuICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnMgPSB7fTtcbiAgICBcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIFxuICAgIC8vIHBhcnNlIGNvbXBvbmVudCBhdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuXG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIG5vdCB3aXRoIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2LVxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YoYmluZGluZ1ByZWZpeCkgIT09IDApIHtcbiAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IHRoaXMuY2FtZWxDYXNlKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgIGxldCBzdGF0ID0gdGhpcy5jb21wb25lbnQuc3RhdGljO1xuICAgIFxuICAgICAgICBpZiAoc3RhdCAmJiBzdGF0LmluZGV4T2YocHJvcGVydHlOYW1lKSA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5zdGF0aWNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICAgIHRoaXMuc3RhdGljW3Byb3BlcnR5TmFtZV0gPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgICB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuXFwndCBwYXJzZSBjb21wb25lbnQgYXR0cmlidXRlJywgYXR0cmlidXRlLCB0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgICBcbiAgICBcbiAgLy8gSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6c3luY2Agc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmQgdG9cbiAgLy8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICBzeW5jKCkge31cbiAgICBcbiAgLy8gSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6dXBkYXRlYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAvLyB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gIHVwZGF0ZSgpIHt9XG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnB1Ymxpc2hgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kXG4gIC8vIHRvIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgcHVibGlzaCgpIHt9XG4gICAgXG4gIC8vIFJldHVybnMgYW4gb2JqZWN0IG1hcCB1c2luZyB0aGUgY29tcG9uZW50J3Mgc2NvcGUgaW5mbGVjdGlvbnMuXG4gIGxvY2FscygpIHtcbiAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5zdGF0aWMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5zdGF0aWNba2V5XTtcbiAgICB9KTtcbiAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLm9ic2VydmVyc1trZXldLnZhbHVlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAgIFxuICAvLyBSZXR1cm5zIGEgY2FtZWwtY2FzZWQgdmVyc2lvbiBvZiB0aGUgc3RyaW5nLiBVc2VkIHdoZW4gdHJhbnNsYXRpbmcgYW5cbiAgLy8gZWxlbWVudCdzIGF0dHJpYnV0ZSBuYW1lIGludG8gYSBwcm9wZXJ0eSBuYW1lIGZvciB0aGUgY29tcG9uZW50J3Mgc2NvcGUuXG4gIGNhbWVsQ2FzZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLy0oW2Etel0pL2csIGdyb3VwZWQgPT4ge1xuICAgICAgcmV0dXJuIGdyb3VwZWRbMV0udG9VcHBlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuICAgIFxuICAvLyBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpiaW5kYCB0byBidWlsZCBgdGhpcy5jb21wb25lbnRWaWV3YCB3aXRoIGEgbG9jYWxpemVkXG4gIC8vIG1hcCBvZiBtb2RlbHMgZnJvbSB0aGUgcm9vdCB2aWV3LiBCaW5kIGB0aGlzLmNvbXBvbmVudFZpZXdgIG9uIHN1YnNlcXVlbnQgY2FsbHMuXG4gIGJpbmQoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICBpZiAoIXRoaXMuYm91bmQpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBrZXlwYXRoID0gdGhpcy5vYnNlcnZlcnNba2V5XTtcbiAgICBcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNba2V5XSA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCBrZXlwYXRoLCAoa2V5ID0+IHtcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRWaWV3Lm1vZGVsc1trZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhbGwodGhpcywga2V5KSk7XG4gICAgICB9KTtcbiAgICBcbiAgICAgIHRoaXMuYm91bmQgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcuYmluZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMuY29tcG9uZW50LnRlbXBsYXRlLmNhbGwodGhpcyk7XG4gICAgICBsZXQgc2NvcGUgPSB0aGlzLmNvbXBvbmVudC5pbml0aWFsaXplLmNhbGwodGhpcywgdGhpcy5lbCwgdGhpcy5sb2NhbHMoKSk7XG4gICAgICB0aGlzLmVsLl9ib3VuZCA9IHRydWU7XG4gICAgXG4gICAgXG4gICAgICBFWFRFTlNJT05TLmZvckVhY2goZXh0ZW5zaW9uVHlwZSA9PiB7XG4gICAgICAgIG9wdGlvbnNbZXh0ZW5zaW9uVHlwZV0gPSB7fTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50W2V4dGVuc2lvblR5cGVdKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRbZXh0ZW5zaW9uVHlwZV0pLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnNbZXh0ZW5zaW9uVHlwZV1ba2V5XSA9IHRoaXMuY29tcG9uZW50W2V4dGVuc2lvblR5cGVdW2tleV07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy52aWV3Lm9wdGlvbnNbZXh0ZW5zaW9uVHlwZV0pLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAob3B0aW9uc1tleHRlbnNpb25UeXBlXVtrZXldKSB7XG4gICAgICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdW2tleV0gPSB0aGlzLnZpZXdbZXh0ZW5zaW9uVHlwZV1ba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgXG4gICAgICBPUFRJT05TLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50W29wdGlvbl0gIT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnNbb3B0aW9uXSA9IHRoaXMuY29tcG9uZW50W29wdGlvbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9uc1tvcHRpb25dID0gdGhpcy52aWV3W29wdGlvbl07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIFxuICAgICAgLy90aGVyZSdzIGEgY3ljbGljIGRlcGVuZGVuY3kgdGhhdCBtYWtlcyBpbXBvcnRlZCBWaWV3IGEgZHVtbXkgb2JqZWN0LiBVc2UgdGlueWJpbmQuYmluZFxuICAgICAgLy90aGlzLmNvbXBvbmVudFZpZXcgPSBuZXcgVmlldyh0aGlzLmVsLCBzY29wZSwgb3B0aW9ucylcbiAgICAgIC8vdGhpcy5jb21wb25lbnRWaWV3LmJpbmQoKVxuICAgICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdGlueWJpbmQuYmluZChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsLmNoaWxkTm9kZXMpLCBzY29wZSwgb3B0aW9ucyk7XG4gICAgXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmVyc1trZXldO1xuICAgICAgICBsZXQgbW9kZWxzID0gdGhpcy5jb21wb25lbnRWaWV3Lm1vZGVscztcbiAgICBcbiAgICAgICAgbGV0IHVwc3RyZWFtID0gdGhpcy5vYnNlcnZlKG1vZGVscywga2V5LCAoKGtleSwgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuc2V0VmFsdWUodGhpcy5jb21wb25lbnRWaWV3Lm1vZGVsc1trZXldKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIGtleSwgb2JzZXJ2ZXIpKTtcbiAgICBcbiAgICAgICAgdGhpcy51cHN0cmVhbU9ic2VydmVyc1trZXldID0gdXBzdHJlYW07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgICBcbiAgLy8gSW50ZXJjZXB0IGB0aW55YmluZC5CaW5kaW5nOjp1bmJpbmRgIHRvIGJlIGNhbGxlZCBvbiBgdGhpcy5jb21wb25lbnRWaWV3YC5cbiAgdW5iaW5kKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMudXBzdHJlYW1PYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnNba2V5XS51bm9ic2VydmUoKTtcbiAgICB9KTtcbiAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5vYnNlcnZlcnNba2V5XS51bm9ic2VydmUoKTtcbiAgICB9KTtcbiAgICBcbiAgICBpZiAodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcudW5iaW5kLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG59IiwiZXhwb3J0IHR5cGUgVEV4dGVuc2lvbktleSA9ICdiaW5kZXJzJyB8ICdmb3JtYXR0ZXJzJyB8ICdjb21wb25lbnRzJyB8ICdhZGFwdGVycyc7XG5cbmV4cG9ydCBjb25zdCBPUFRJT05TID0gW1xuICAncHJlZml4JyxcbiAgJ3RlbXBsYXRlRGVsaW1pdGVycycsXG4gICdyb290SW50ZXJmYWNlJyxcbiAgJ3ByZWxvYWREYXRhJyxcbiAgJ2hhbmRsZXInXG5dO1xuXG5leHBvcnQgY29uc3QgRVhURU5TSU9OUyA9IFtcbiAgJ2JpbmRlcnMnLFxuICAnZm9ybWF0dGVycycsXG4gICdjb21wb25lbnRzJyxcbiAgJ2FkYXB0ZXJzJ1xuXTsiLCJpbXBvcnQgdGlueWJpbmQgZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgT1BUSU9OUywgRVhURU5TSU9OUywgVEV4dGVuc2lvbktleSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBhZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuL3NpZ2h0Z2xhc3MnO1xuXG5pbXBvcnQgeyBJT3B0aW9ucywgSUV4dGVuc2lvbnMsIElDb21wb25lbnQgfSBmcm9tICcuLi9pbmRleCc7XG5cbi8vIFJldHVybnMgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG5cbnRpbnliaW5kLmJpbmRlcnMgPSBiaW5kZXJzO1xudGlueWJpbmQuYWRhcHRlcnNbJy4nXSA9IGFkYXB0ZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnNQYXJhbSBleHRlbmRzIElFeHRlbnNpb25zLCBJT3B0aW9ucyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3T3B0aW9ucyBleHRlbmRzIElPcHRpb25zUGFyYW0ge1xuICBzdGFyQmluZGVyczogYW55O1xufVxuXG5jb25zdCBtZXJnZU9iamVjdCA9ICh0YXJnZXQ6IGFueSwgb2JqOiBhbnkpID0+IHtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRhcmdldDsgXG59O1xuXG5cbi8vIEJpbmRzIHNvbWUgZGF0YSB0byBhIHRlbXBsYXRlIC8gZWxlbWVudC4gUmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXG50aW55YmluZC5iaW5kID0gKGVsOiBIVE1MRWxlbWVudCwgbW9kZWxzOiBhbnksIG9wdGlvbnM/OiBJT3B0aW9uc1BhcmFtKSA9PiB7XG4gIGxldCB2aWV3T3B0aW9uczogSVZpZXdPcHRpb25zID0ge1xuICAgIC8vIEVYVEVOU0lPTlNcbiAgICBiaW5kZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIGZvcm1hdHRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgY29tcG9uZW50czogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBhZGFwdGVyczogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAvLyBvdGhlclxuICAgIHN0YXJCaW5kZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICB9O1xuICBtb2RlbHMgPSBtb2RlbHMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgLy8gb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYob3B0aW9ucykge1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIG9wdGlvbnMuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCBvcHRpb25zLmFkYXB0ZXJzKTtcbiAgfVxuXG4gIHZpZXdPcHRpb25zLnByZWZpeCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnByZWZpeCA6IHRpbnliaW5kLnByZWZpeFxuICB2aWV3T3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPSBvcHRpb25zICYmIG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID8gb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgOiB0aW55YmluZC50ZW1wbGF0ZURlbGltaXRlcnNcbiAgdmlld09wdGlvbnMucm9vdEludGVyZmFjZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnJvb3RJbnRlcmZhY2UgOiB0aW55YmluZC5yb290SW50ZXJmYWNlXG4gIHZpZXdPcHRpb25zLnByZWxvYWREYXRhID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZWZpeCA/IG9wdGlvbnMucHJlbG9hZERhdGEgOiB0aW55YmluZC5wcmVsb2FkRGF0YVxuICB2aWV3T3B0aW9ucy5oYW5kbGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZWZpeCA/IG9wdGlvbnMuaGFuZGxlciA6IHRpbnliaW5kLmhhbmRsZXJcblxuICAvLyBtZXJnZSBleHRlbnNpb25zXG4gIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIHRpbnliaW5kLmJpbmRlcnMpO1xuICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCB0aW55YmluZC5mb3JtYXR0ZXJzKTtcbiAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuY29tcG9uZW50cywgdGlueWJpbmQuY29tcG9uZW50cyk7XG4gIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCB0aW55YmluZC5hZGFwdGVycyk7XG5cbiAgLy8gZ2V0IGFsbCBzdGFyQmluZGVycyBmcm9tIGF2YWlsYWJsZSBiaW5kZXJzXG4gIHZpZXdPcHRpb25zLnN0YXJCaW5kZXJzID0gT2JqZWN0LmtleXModmlld09wdGlvbnMuYmluZGVycykuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4ga2V5LmluZGV4T2YoJyonKSA+IDA7XG4gIH0pO1xuXG4gIE9ic2VydmVyLnVwZGF0ZU9wdGlvbnModmlld09wdGlvbnMpO1xuXG4gIGxldCB2aWV3ID0gbmV3IFZpZXcoZWwsIG1vZGVscywgdmlld09wdGlvbnMpO1xuICB2aWV3LmJpbmQoKTtcbiAgcmV0dXJuIHZpZXc7XG59O1xuXG4vLyBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBvbiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgYW5kXG4vLyByZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cdFxudGlueWJpbmQuaW5pdCA9IChjb21wb25lbnRLZXk6IHN0cmluZywgZWw6IEhUTUxFbGVtZW50LCBkYXRhID0ge30pID0+IHtcbiAgaWYgKCFlbCkge1xuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIH1cblxuICBjb25zdCBjb21wb25lbnQgPSB0aW55YmluZC5jb21wb25lbnRzW2NvbXBvbmVudEtleV07XG4gIGVsLmlubmVySFRNTCA9IGNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRpbnliaW5kLCBlbCk7XG4gIGxldCBzY29wZSA9IGNvbXBvbmVudC5pbml0aWFsaXplLmNhbGwodGlueWJpbmQsIGVsLCBkYXRhKTtcblxuICBsZXQgdmlldyA9IHRpbnliaW5kLmJpbmQoZWwsIHNjb3BlKTtcbiAgdmlldy5iaW5kKCk7XG4gIHJldHVybiB2aWV3O1xufTtcblxudGlueWJpbmQuZm9ybWF0dGVycy5uZWdhdGUgPSB0aW55YmluZC5mb3JtYXR0ZXJzLm5vdCA9IGZ1bmN0aW9uICh2YWx1ZTogYm9vbGVhbikge1xuICByZXR1cm4gIXZhbHVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGlueWJpbmQ7XG4iLCIvKipcbiAqIFVzZWQgYWxzbyBpbiBwYXJzZXJzLnBhcnNlVHlwZVxuICogVE9ETyBvdXRzb3VyY2VcbiAqL1xuY29uc3QgUFJJTUlUSVZFID0gMDtcbmNvbnN0IEtFWVBBVEggPSAxO1xuXG5jb25zdCBRVU9URURfU1RSID0gL14nLionJHxeXCIuKlwiJC87IC8vIHJlZ2V4IHRvIHRlc3QgaWYgc3RyaW5nIGlzIHdyYXBwZWQgaW4gXCIgb3IgJ1xuXG4vLyBVc2VkIGluIHBhcnNlcnMucGFyc2VUZW1wbGF0ZVxuY29uc3QgVEVYVCA9IDA7XG5jb25zdCBCSU5ESU5HID0gMTtcblxuLy8gVGVzdCBpZiBzdHJpbmcgaXMgYSBqc29uIHN0cmluZ1xuZXhwb3J0IGZ1bmN0aW9uIGlzSnNvbihzdHIpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2YWwgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuICh2YWwgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWwgaW5zdGFuY2VvZiBPYmplY3QpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBQYXJzZXIgYW5kIHRva2VuaXplciBmb3IgZ2V0dGluZyB0aGUgdHlwZSBhbmQgdmFsdWUgZnJvbSBhIHN0cmluZy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVR5cGUoc3RyaW5nKSB7XG4gIGxldCB0eXBlID0gUFJJTUlUSVZFO1xuICBsZXQgdmFsdWUgPSBzdHJpbmc7XG4gIGlmIChRVU9URURfU1RSLnRlc3Qoc3RyaW5nKSkge1xuICAgIHZhbHVlID0gc3RyaW5nLnNsaWNlKDEsIC0xKTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd0cnVlJykge1xuICAgIHZhbHVlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdmYWxzZScpIHtcbiAgICB2YWx1ZSA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ251bGwnKSB7XG4gICAgdmFsdWUgPSBudWxsO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICghaXNOYU4oc3RyaW5nKSkge1xuICAgIHZhbHVlID0gTnVtYmVyKHN0cmluZyk7XG4gIH0gZWxzZSBpZiAoaXNKc29uKHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IEpTT04ucGFyc2Uoc3RyaW5nKTtcbiAgfSBlbHNlIHtcbiAgICB0eXBlID0gS0VZUEFUSDtcbiAgfVxuICByZXR1cm4ge3R5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZX07XG59XG5cbi8vIFRlbXBsYXRlIHBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBtdXN0YWNoZS1zdHlsZSB0ZXh0IGNvbnRlbnQgYmluZGluZ3MuXG4vLyBQYXJzZXMgdGhlIHRlbXBsYXRlIGFuZCByZXR1cm5zIGEgc2V0IG9mIHRva2Vucywgc2VwYXJhdGluZyBzdGF0aWMgcG9ydGlvbnNcbi8vIG9mIHRleHQgZnJvbSBiaW5kaW5nIGRlY2xhcmF0aW9ucy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCBkZWxpbWl0ZXJzKSB7XG4gIHZhciB0b2tlbnM7XG4gIGxldCBsZW5ndGggPSB0ZW1wbGF0ZS5sZW5ndGg7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBsYXN0SW5kZXggPSAwO1xuICBsZXQgb3BlbiA9IGRlbGltaXRlcnNbMF0sIGNsb3NlID0gZGVsaW1pdGVyc1sxXTtcblxuICB3aGlsZSAobGFzdEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKG9wZW4sIGxhc3RJbmRleCk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zID0gdG9rZW5zIHx8IFtdO1xuICAgICAgaWYgKGluZGV4ID4gMCAmJiBsYXN0SW5kZXggPCBpbmRleCkge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgb3Blbi5sZW5ndGg7XG4gICAgICBpbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoY2xvc2UsIGxhc3RJbmRleCk7XG5cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgbGV0IHN1YnN0cmluZyA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCAtIGNsb3NlLmxlbmd0aCk7XG4gICAgICAgIGxldCBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09IFRFWFQpIHtcbiAgICAgICAgICBsYXN0VG9rZW4udmFsdWUgKz0gc3Vic3RyaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgICB2YWx1ZTogc3Vic3RyaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlID0gdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleCkudHJpbSgpO1xuXG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IEJJTkRJTkcsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgY2xvc2UubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG4iLCJcbi8vIENoZWNrIGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0IHRoYW4gY2FuIGJlIG9ic2VydmVkLlxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGxcbn1cblxuLy8gRXJyb3IgdGhyb3dlci5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdbT2JzZXJ2ZXJdICcgKyBtZXNzYWdlKVxufVxuXG4vLyBUT0RPXG5sZXQgYWRhcHRlcnM7XG5sZXQgaW50ZXJmYWNlcztcbmxldCByb290SW50ZXJmYWNlO1xuXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZXIge1xuICBrZXlwYXRoO1xuICBjYWxsYmFjaztcbiAgb2JqZWN0UGF0aDtcbiAgb2JqO1xuICB0YXJnZXQ7XG4gIGtleTtcbiAgLy8gQ29uc3RydWN0cyBhIG5ldyBrZXlwYXRoIG9ic2VydmVyIGFuZCBraWNrcyB0aGluZ3Mgb2ZmLlxuICBjb25zdHJ1Y3RvcihvYmosIGtleXBhdGgsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5vYmplY3RQYXRoID0gW107XG4gICAgdGhpcy5wYXJzZSgpO1xuICAgIHRoaXMub2JqID0gdGhpcy5nZXRSb290T2JqZWN0KG9iaik7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLnJlYWxpemUoKTtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldCh0cnVlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgYWRhcHRlcnMgPSBvcHRpb25zLmFkYXB0ZXJzO1xuICAgIGludGVyZmFjZXMgPSBPYmplY3Qua2V5cyhhZGFwdGVycyk7XG4gICAgcm9vdEludGVyZmFjZSA9IG9wdGlvbnMucm9vdEludGVyZmFjZTtcbiAgfVxuICBcbiAgLy8gVG9rZW5pemVzIHRoZSBwcm92aWRlZCBrZXlwYXRoIHN0cmluZyBpbnRvIGludGVyZmFjZSArIHBhdGggdG9rZW5zIGZvciB0aGVcbiAgLy8gb2JzZXJ2ZXIgdG8gd29yayB3aXRoLlxuICBzdGF0aWMgdG9rZW5pemUgPSBmdW5jdGlvbihrZXlwYXRoLCByb290KSB7XG4gICAgdmFyIHRva2VuczogYW55W10gPSBbXVxuICAgIHZhciBjdXJyZW50ID0ge2k6IHJvb3QsIHBhdGg6ICcnfVxuICAgIHZhciBpbmRleCwgY2hyXG4gIFxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGtleXBhdGgubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjaHIgPSBrZXlwYXRoLmNoYXJBdChpbmRleClcbiAgXG4gICAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKGNocikpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudClcbiAgICAgICAgY3VycmVudCA9IHtpOiBjaHIsIHBhdGg6ICcnfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudC5wYXRoICs9IGNoclxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgdG9rZW5zLnB1c2goY3VycmVudClcbiAgICByZXR1cm4gdG9rZW5zXG4gIH1cbiAgXG4gIC8vIFBhcnNlcyB0aGUga2V5cGF0aCB1c2luZyB0aGUgaW50ZXJmYWNlcyBkZWZpbmVkIG9uIHRoZSB2aWV3LiBTZXRzIHZhcmlhYmxlc1xuICAvLyBmb3IgdGhlIHRva2VuaXplZCBrZXlwYXRoIGFzIHdlbGwgYXMgdGhlIGVuZCBrZXkuXG4gIHBhcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhdGgsIHJvb3RcbiAgXG4gICAgaWYgKCFpbnRlcmZhY2VzLmxlbmd0aCkge1xuICAgICAgZXJyb3IoJ011c3QgZGVmaW5lIGF0IGxlYXN0IG9uZSBhZGFwdGVyIGludGVyZmFjZS4nKVxuICAgIH1cbiAgXG4gICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZih0aGlzLmtleXBhdGhbMF0pKSB7XG4gICAgICByb290ID0gdGhpcy5rZXlwYXRoWzBdXG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoLnN1YnN0cigxKVxuICAgIH0gZWxzZSB7XG4gICAgICByb290ID0gcm9vdEludGVyZmFjZVxuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aFxuICAgIH1cbiAgXG4gICAgdGhpcy50b2tlbnMgPSBPYnNlcnZlci50b2tlbml6ZShwYXRoLCByb290KVxuICAgIHRoaXMua2V5ID0gdGhpcy50b2tlbnMucG9wKClcbiAgfVxuICBcbiAgLy8gUmVhbGl6ZXMgdGhlIGZ1bGwga2V5cGF0aCwgYXR0YWNoaW5nIG9ic2VydmVycyBmb3IgZXZlcnkga2V5IGFuZCBjb3JyZWN0aW5nXG4gIC8vIG9sZCBvYnNlcnZlcnMgdG8gYW55IGNoYW5nZWQgb2JqZWN0cyBpbiB0aGUga2V5cGF0aC5cbiAgcmVhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJyZW50ID0gdGhpcy5vYmpcbiAgICB2YXIgdW5yZWFjaGVkID0gLTFcbiAgICB2YXIgcHJldlxuICAgIHZhciB0b2tlblxuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKGlzT2JqZWN0KGN1cnJlbnQpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vYmplY3RQYXRoW2luZGV4XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoY3VycmVudCAhPT0gKHByZXYgPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldCh0cnVlLCB0b2tlbiwgY3VycmVudCwgdGhpcylcbiAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICB9XG4gIFxuICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQodG9rZW4sIGN1cnJlbnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodW5yZWFjaGVkID09PSAtMSkge1xuICAgICAgICAgIHVucmVhY2hlZCA9IGluZGV4XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGlmIChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKHVucmVhY2hlZCAhPT0gLTEpIHtcbiAgICAgIHRoaXMub2JqZWN0UGF0aC5zcGxpY2UodW5yZWFjaGVkKVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnRcbiAgfVxuICBcbiAgLy8gVXBkYXRlcyB0aGUga2V5cGF0aC4gVGhpcyBpcyBjYWxsZWQgd2hlbiBhbnkgaW50ZXJtZWRpYXJ5IGtleSBpcyBjaGFuZ2VkLlxuICBzeW5jID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5leHQsIG9sZFZhbHVlLCBuZXdWYWx1ZVxuICBcbiAgICBpZiAoKG5leHQgPSB0aGlzLnJlYWxpemUoKSkgIT09IHRoaXMudGFyZ2V0KSB7XG4gICAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgaWYgKGlzT2JqZWN0KG5leHQpKSB7XG4gICAgICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCBuZXh0LCB0aGlzLmNhbGxiYWNrKVxuICAgICAgfVxuICBcbiAgICAgIG9sZFZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgICB0aGlzLnRhcmdldCA9IG5leHRcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlIHx8IG5ld1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMuY2FsbGJhY2suc3luYygpXG4gICAgfSBlbHNlIGlmIChuZXh0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2suc3luYygpXG4gICAgfVxuICB9XG4gIFxuICAvLyBSZWFkcyB0aGUgY3VycmVudCBlbmQgdmFsdWUgb2YgdGhlIG9ic2VydmVkIGtleXBhdGguIFJldHVybnMgdW5kZWZpbmVkIGlmXG4gIC8vIHRoZSBmdWxsIGtleXBhdGggaXMgdW5yZWFjaGFibGUuXG4gIHZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5LCB0aGlzLnRhcmdldClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNldHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBDYWxsaW5nIHNldFZhbHVlIHdoZW5cbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZSBpcyBhIG5vLW9wLlxuICBzZXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgYWRhcHRlcnNbdGhpcy5rZXkuaV0uc2V0KHRoaXMudGFyZ2V0LCB0aGlzLmtleS5wYXRoLCB2YWx1ZSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEdldHMgdGhlIHByb3ZpZGVkIGtleSBvbiBhbiBvYmplY3QuXG4gIGdldCA9IGZ1bmN0aW9uKGtleSwgb2JqKSB7XG4gICAgcmV0dXJuIGFkYXB0ZXJzW2tleS5pXS5nZXQob2JqLCBrZXkucGF0aClcbiAgfVxuICBcbiAgLy8gT2JzZXJ2ZXMgb3IgdW5vYnNlcnZlcyBhIGNhbGxiYWNrIG9uIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGtleS5cbiAgc2V0ID0gZnVuY3Rpb24oYWN0aXZlLCBrZXksIG9iaiwgY2FsbGJhY2spIHtcbiAgICB2YXIgYWN0aW9uID0gYWN0aXZlID8gJ29ic2VydmUnIDogJ3Vub2JzZXJ2ZSdcbiAgICBhZGFwdGVyc1trZXkuaV1bYWN0aW9uXShvYmosIGtleS5wYXRoLCBjYWxsYmFjaylcbiAgfVxuICBcbiAgXG4gIC8vIFVub2JzZXJ2ZXMgdGhlIGVudGlyZSBrZXlwYXRoLlxuICB1bm9ic2VydmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb2JqXG4gICAgdmFyIHRva2VuXG4gIFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgICBpZiAob2JqID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIG9iaiwgdGhpcylcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0KGZhbHNlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIC8vIHRyYXZlcnNlIHRoZSBzY29wZSBjaGFpbiB0byBmaW5kIHRoZSBzY29wZSB3aGljaCBoYXMgdGhlIHJvb3QgcHJvcGVydHlcbiAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBmb3VuZCBpbiBjaGFpbiwgcmV0dXJucyB0aGUgcm9vdCBzY29wZVxuICBnZXRSb290T2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciByb290UHJvcCwgY3VycmVudDtcbiAgICBpZiAoIW9iai4kcGFyZW50KSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgcm9vdFByb3AgPSB0aGlzLnRva2Vuc1swXS5wYXRoXG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy5rZXkucGF0aFxuICAgIH1cbiAgXG4gICAgY3VycmVudCA9IG9iajtcbiAgICB3aGlsZSAoY3VycmVudC4kcGFyZW50ICYmIChjdXJyZW50W3Jvb3RQcm9wXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQuJHBhcmVudFxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtFWFRFTlNJT05TfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge3BhcnNlVGVtcGxhdGUsIHBhcnNlVHlwZX0gZnJvbSAnLi9wYXJzZXJzJztcblxuY29uc3QgdGlueWJpbmQgPSB7XG4gIC8vIEdsb2JhbCBiaW5kZXJzLlxuICBiaW5kZXJzOiB7fSxcblxuICAvLyBHbG9iYWwgY29tcG9uZW50cy5cbiAgY29tcG9uZW50czoge30sXG5cbiAgLy8gR2xvYmFsIGZvcm1hdHRlcnMuXG4gIGZvcm1hdHRlcnM6IHt9LFxuXG4gIC8vIEdsb2JhbCBzaWdodGdsYXNzIGFkYXB0ZXJzLlxuICBhZGFwdGVyczoge30sXG5cbiAgLy8gRGVmYXVsdCBhdHRyaWJ1dGUgcHJlZml4LlxuICBfcHJlZml4OiAncnYnLFxuXG4gIF9mdWxsUHJlZml4OiAncnYtJyxcblxuICBnZXQgcHJlZml4ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9LFxuXG4gIHNldCBwcmVmaXggKHZhbHVlKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gICAgdGhpcy5fZnVsbFByZWZpeCA9IHZhbHVlICsgJy0nO1xuICB9LFxuXG4gIHBhcnNlVGVtcGxhdGU6IHBhcnNlVGVtcGxhdGUsXG5cbiAgcGFyc2VUeXBlOiBwYXJzZVR5cGUsXG5cbiAgLy8gRGVmYXVsdCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLlxuICB0ZW1wbGF0ZURlbGltaXRlcnM6IFsneycsICd9J10sXG5cbiAgLy8gRGVmYXVsdCBzaWdodGdsYXNzIHJvb3QgaW50ZXJmYWNlLlxuICByb290SW50ZXJmYWNlOiAnLicsXG5cbiAgLy8gUHJlbG9hZCBkYXRhIGJ5IGRlZmF1bHQuXG4gIHByZWxvYWREYXRhOiB0cnVlLFxuXG4gIC8vIERlZmF1bHQgZXZlbnQgaGFuZGxlci5cbiAgaGFuZGxlcjogZnVuY3Rpb24oY29udGV4dCwgZXYsIGJpbmRpbmcpIHtcbiAgICB0aGlzLmNhbGwoY29udGV4dCwgZXYsIGJpbmRpbmcudmlldy5tb2RlbHMpO1xuICB9LFxuXG4gIC8vIFNldHMgdGhlIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC4gSWYgbm8gYmluZGVyIGFib3ZlIGlzIG1hdGNoZWQgaXQgd2lsbCBmYWxsXG4gIC8vIGJhY2sgdG8gdXNpbmcgdGhpcyBiaW5kZXIuXG4gIGZhbGxiYWNrQmluZGVyOiBmdW5jdGlvbihlbCwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKHRoaXMudHlwZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy50eXBlKTtcbiAgICB9ICBcbiAgfSxcblxuICAvLyBNZXJnZXMgYW4gb2JqZWN0IGxpdGVyYWwgaW50byB0aGUgY29ycmVzcG9uZGluZyBnbG9iYWwgb3B0aW9ucy5cbiAgY29uZmlndXJlOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXTtcblxuICAgICAgaWYgKEVYVEVOU0lPTlMuaW5kZXhPZihvcHRpb24pID4gLTEpIHtcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICB0aGlzW29wdGlvbl1ba2V5XSA9IHZhbHVlW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1tvcHRpb25dID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbnliaW5kO1xuIiwiaW1wb3J0IHRpbnliaW5kIGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nIH0gZnJvbSAnLi9jb21wb25lbnQtYmluZGluZyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlIH0gZnJvbSAnLi9wYXJzZXJzJztcblxuY29uc3QgdGV4dEJpbmRlciA9IHtcbiAgcm91dGluZTogKG5vZGUsIHZhbHVlKSA9PiB7XG4gICAgbm9kZS5kYXRhID0gKHZhbHVlICE9IG51bGwpID8gdmFsdWUgOiAnJztcbiAgfVxufTtcblxuY29uc3QgREVDTEFSQVRJT05fU1BMSVQgPSAvKCg/OidbXiddKicpKig/Oig/OlteXFx8J10qKD86J1teJ10qJykrW15cXHwnXSopK3xbXlxcfF0rKSl8XiQvZztcblxuY29uc3QgcGFyc2VOb2RlID0gKHZpZXcsIG5vZGUpID0+IHtcbiAgbGV0IGJsb2NrID0gZmFsc2U7XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICBsZXQgdG9rZW5zID0gcGFyc2VUZW1wbGF0ZShub2RlLmRhdGEsIHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVycyk7XG5cbiAgICBpZiAodG9rZW5zKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9rZW4udmFsdWUpO1xuICAgICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRleHQsIG5vZGUpO1xuXG4gICAgICAgIGlmICh0b2tlbi50eXBlID09PSAxKSB7XG4gICAgICAgICAgdmlldy5idWlsZEJpbmRpbmcodGV4dCwgbnVsbCwgdG9rZW4udmFsdWUsIHRleHRCaW5kZXIsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgYmxvY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBibG9jayA9IHZpZXcudHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICBpZiAoIWJsb2NrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhcnNlTm9kZSh2aWV3LCBub2RlLmNoaWxkTm9kZXNbaV0pO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgYmluZGluZ0NvbXBhcmF0b3IgPSAoYSwgYikgPT4ge1xuICBsZXQgYVByaW9yaXR5ID0gYS5iaW5kZXIgPyAoYS5iaW5kZXIucHJpb3JpdHkgfHwgMCkgOiAwO1xuICBsZXQgYlByaW9yaXR5ID0gYi5iaW5kZXIgPyAoYi5iaW5kZXIucHJpb3JpdHkgfHwgMCkgOiAwO1xuICByZXR1cm4gYlByaW9yaXR5IC0gYVByaW9yaXR5O1xufTtcblxuY29uc3QgdHJpbVN0ciA9IChzdHIpID0+IHtcbiAgcmV0dXJuIHN0ci50cmltKCk7XG59O1xuXG4vLyBBIGNvbGxlY3Rpb24gb2YgYmluZGluZ3MgYnVpbHQgZnJvbSBhIHNldCBvZiBwYXJlbnQgbm9kZXMuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3IHtcbiAgLy8gVGhlIERPTSBlbGVtZW50cyBhbmQgdGhlIG1vZGVsIG9iamVjdHMgZm9yIGJpbmRpbmcgYXJlIHBhc3NlZCBpbnRvIHRoZVxuICAvLyBjb25zdHJ1Y3RvciBhbG9uZyB3aXRoIGFueSBsb2NhbCBvcHRpb25zIHRoYXQgc2hvdWxkIGJlIHVzZWQgdGhyb3VnaG91dCB0aGVcbiAgLy8gY29udGV4dCBvZiB0aGUgdmlldyBhbmQgaXQncyBiaW5kaW5ncy5cbiAgY29uc3RydWN0b3IoZWxzLCBtb2RlbHMsIG9wdGlvbnMpIHtcbiAgICBpZiAoZWxzLmpxdWVyeSB8fCBlbHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5lbHMgPSBlbHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxzID0gW2Vsc107XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlbHMgPSBtb2RlbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMuYnVpbGQoKTtcbiAgfVxuXG5cbiAgYnVpbGRCaW5kaW5nKG5vZGUsIHR5cGUsIGRlY2xhcmF0aW9uLCBiaW5kZXIsIGFyZ3MpIHtcbiAgICBsZXQgcGlwZXMgPSBkZWNsYXJhdGlvbi5tYXRjaChERUNMQVJBVElPTl9TUExJVCkubWFwKHRyaW1TdHIpO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKTtcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IEJpbmRpbmcodGhpcywgbm9kZSwgdHlwZSwga2V5cGF0aCwgYmluZGVyLCBhcmdzLCBwaXBlcykpO1xuICB9XG5cbiAgLy8gUGFyc2VzIHRoZSBET00gdHJlZSBhbmQgYnVpbGRzIGBCaW5kaW5nYCBpbnN0YW5jZXMgZm9yIGV2ZXJ5IG1hdGNoZWRcbiAgLy8gYmluZGluZyBkZWNsYXJhdGlvbi5cbiAgYnVpbGQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdO1xuXG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbHMsIGksIGxlbjtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcGFyc2VOb2RlKHRoaXMsIGVsZW1lbnRzW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRpbmdzLnNvcnQoYmluZGluZ0NvbXBhcmF0b3IpO1xuICB9XG5cbiAgdHJhdmVyc2Uobm9kZSkge1xuICAgIGxldCBiaW5kaW5nUHJlZml4ID0gdGlueWJpbmQuX2Z1bGxQcmVmaXg7XG4gICAgbGV0IGJsb2NrID0gbm9kZS5ub2RlTmFtZSA9PT0gJ1NDUklQVCcgfHwgbm9kZS5ub2RlTmFtZSA9PT0gJ1NUWUxFJztcbiAgICBsZXQgYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlcztcbiAgICBsZXQgYmluZEluZm9zID0gW107XG4gICAgbGV0IHN0YXJCaW5kZXJzID0gdGhpcy5vcHRpb25zLnN0YXJCaW5kZXJzO1xuICAgIHZhciB0eXBlLCBiaW5kZXIsIGlkZW50aWZpZXIsIGFyZ3M7XG5cblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgIC8vIGlmIGF0dHJpYnV0ZSBzdGFydHMgd2l0aCB0aGUgYmluZGluZyBwcmVmaXguIEUuZy4gcnZcbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKGJpbmRpbmdQcmVmaXgpID09PSAwKSB7XG4gICAgICAgIHR5cGUgPSBhdHRyaWJ1dGUubmFtZS5zbGljZShiaW5kaW5nUHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIGJpbmRlciA9IHRoaXMub3B0aW9ucy5iaW5kZXJzW3R5cGVdO1xuICAgICAgICBhcmdzID0gW107XG5cbiAgICAgICAgaWYgKCFiaW5kZXIpIHtcbiAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHN0YXJCaW5kZXJzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVyID0gc3RhckJpbmRlcnNba107XG4gICAgICAgICAgICBpZiAodHlwZS5zbGljZSgwLCBpZGVudGlmaWVyLmxlbmd0aCAtIDEpID09PSBpZGVudGlmaWVyLnNsaWNlKDAsIC0xKSkge1xuICAgICAgICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1tpZGVudGlmaWVyXTtcbiAgICAgICAgICAgICAgYXJncy5wdXNoKHR5cGUuc2xpY2UoaWRlbnRpZmllci5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgYmluZGVyID0gdGlueWJpbmQuZmFsbGJhY2tCaW5kZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmluZGVyLmJsb2NrKSB7XG4gICAgICAgICAgdGhpcy5idWlsZEJpbmRpbmcobm9kZSwgdHlwZSwgYXR0cmlidXRlLnZhbHVlLCBiaW5kZXIsIGFyZ3MpO1xuICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpbmRJbmZvcy5wdXNoKHthdHRyOiBhdHRyaWJ1dGUsIGJpbmRlcjogYmluZGVyLCB0eXBlOiB0eXBlLCBhcmdzOiBhcmdzfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kSW5mb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiaW5kSW5mbyA9IGJpbmRJbmZvc1tpXTtcbiAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIGJpbmRJbmZvLnR5cGUsIGJpbmRJbmZvLmF0dHIudmFsdWUsIGJpbmRJbmZvLmJpbmRlciwgYmluZEluZm8uYXJncyk7XG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShiaW5kSW5mby5hdHRyLm5hbWUpO1xuICAgIH1cblxuICAgIC8vIGJpbmQgY29tcG9uZW50c1xuICAgIGlmICghYmxvY2spIHtcbiAgICAgIHR5cGUgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcG9uZW50c1t0eXBlXSAmJiAhbm9kZS5fYm91bmQpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5wdXNoKG5ldyBDb21wb25lbnRCaW5kaW5nKHRoaXMsIG5vZGUsIHR5cGUpKTtcbiAgICAgICAgYmxvY2sgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBibG9jaztcbiAgfVxuXG4gIC8vIEJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICBiaW5kKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGJpbmRpbmcuYmluZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVW5iaW5kcyBhbGwgb2YgdGhlIGN1cnJlbnQgYmluZGluZ3MgZm9yIHRoaXMgdmlldy5cbiAgdW5iaW5kKCkge1xuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5iaW5kaW5ncykpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgYmluZGluZy51bmJpbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZih0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBTeW5jcyB1cCB0aGUgdmlldyB3aXRoIHRoZSBtb2RlbCBieSBydW5uaW5nIHRoZSByb3V0aW5lcyBvbiBhbGwgYmluZGluZ3MuXG4gIHN5bmMoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5zeW5jKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBQdWJsaXNoZXMgdGhlIGlucHV0IHZhbHVlcyBmcm9tIHRoZSB2aWV3IGJhY2sgdG8gdGhlIG1vZGVsIChyZXZlcnNlIHN5bmMpLlxuICBwdWJsaXNoKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGlmIChiaW5kaW5nLmJpbmRlciAmJiBiaW5kaW5nLmJpbmRlci5wdWJsaXNoZXMpIHtcbiAgICAgICAgYmluZGluZy5wdWJsaXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSB2aWV3J3MgbW9kZWxzIGFsb25nIHdpdGggYW55IGFmZmVjdGVkIGJpbmRpbmdzLlxuICB1cGRhdGUobW9kZWxzID0ge30pIHtcbiAgICBPYmplY3Qua2V5cyhtb2RlbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMubW9kZWxzW2tleV0gPSBtb2RlbHNba2V5XTtcbiAgICB9KTtcblxuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGlmIChiaW5kaW5nLnVwZGF0ZSkge1xuICAgICAgICBiaW5kaW5nLnVwZGF0ZShtb2RlbHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9