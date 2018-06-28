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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tinybind.ts");
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
exports.default = exports.Adapter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// The default `.` adapter that comes with tinybind.js. Allows subscribing to
// properties on plain objects, implemented in ES5 natives using
// `Object.defineProperty`.
var ARRAY_METHODS = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice'];

var Adapter =
/*#__PURE__*/
function () {
  function Adapter() {
    _classCallCheck(this, Adapter);

    _defineProperty(this, "counter", 0);

    _defineProperty(this, "weakmap", {});
  }

  _createClass(Adapter, [{
    key: "weakReference",
    value: function weakReference(obj) {
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
    }
  }, {
    key: "cleanupWeakReference",
    value: function cleanupWeakReference(ref, id) {
      if (!Object.keys(ref.callbacks).length) {
        if (!(ref.pointers && Object.keys(ref.pointers).length)) {
          delete this.weakmap[id];
        }
      }
    }
  }, {
    key: "stubFunction",
    value: function stubFunction(obj, fn) {
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
    }
  }, {
    key: "observeMutations",
    value: function observeMutations(obj, ref, keypath) {
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
    }
  }, {
    key: "unobserveMutations",
    value: function unobserveMutations(obj, ref, keypath) {
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
    }
  }, {
    key: "observe",
    value: function observe(obj, keypath, callback) {
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
    }
  }, {
    key: "unobserve",
    value: function unobserve(obj, keypath, callback) {
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
    }
  }, {
    key: "get",
    value: function get(obj, keypath) {
      return obj[keypath];
    }
  }, {
    key: "set",
    value: function set(obj, keypath, value) {
      obj[keypath] = value;
    }
  }]);

  return Adapter;
}();

exports.Adapter = Adapter;
;
var adapter = new Adapter();
var _default = adapter;
exports.default = _default;

/***/ }),

/***/ "./src/binders.ts":
/*!************************!*\
  !*** ./src/binders.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var getString = function getString(value) {
  return value != null ? value.toString() : undefined;
};

var times = function times(n, cb) {
  for (var i = 0; i < n; i++) {
    cb();
  }
};

function createView(binding, models, anchorEl) {
  var template = binding.el.cloneNode(true);
  var view = new _view.View(template, models, binding.view.options);
  view.bind();

  if (!binding || !binding.marker || binding.marker.parentNode === null) {
    throw new Error('No parent node for binding!');
  }

  binding.marker.parentNode.insertBefore(template, anchorEl);
  return view;
}

var binders = {
  // Binds an event handler on the element.
  'on-*': {
    function: true,
    priority: 1000,
    bind: function bind(el) {
      if (!this.customData) {
        this.customData = {
          handler: null
        };
      }
    },
    unbind: function unbind(el) {
      if (this.customData.handler) {
        el.removeEventListener(this.args[0], this.customData);
      }
    },
    routine: function routine(el, value
    /*TODO*/
    ) {
      if (this.customData.handler) {
        el.removeEventListener(this.args[0], this.customData.handler);
      }

      this.customData.handler = this.eventHandler(value);
      el.addEventListener(this.args[0], this.customData.handler);
    }
  },
  // Appends bound instances of the element in place for each item in the array.
  'each-*': {
    block: true,
    priority: 4000,
    bind: function bind(el) {
      if (!this.marker) {
        this.marker = document.createComment(" tinybind: ".concat(this.type, " "));
        this.customData = {
          iterated: []
        };

        if (!el.parentNode) {
          throw new Error('No parent node!');
        }

        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else {
        this.customData.iterated.forEach(function (view) {
          view.bind();
        });
      }
    },
    unbind: function unbind(el) {
      if (this.customData.iterated) {
        this.customData.iterated.forEach(function (view) {
          view.unbind();
        });
      }
    },
    routine: function routine(el, collection) {
      var _this = this;

      var modelName = this.args[0];
      collection = collection || []; // TODO support object keys to iterate over

      if (!Array.isArray(collection)) {
        throw new Error('each-' + modelName + ' needs an array to iterate over, but it is');
      } // if index name is seted by `index-property` use this name, otherwise `%[modelName]%`  


      var indexProp = el.getAttribute('index-property') || this.getIterationAlias(modelName);
      collection.forEach(function (model, index) {
        var scope = {
          $parent: _this.view.models
        };
        scope[indexProp] = index;
        scope[modelName] = model;
        var view = _this.customData.iterated[index];

        if (!view) {
          var previous;

          if (_this.customData.iterated.length) {
            previous = _this.customData.iterated[_this.customData.iterated.length - 1].els[0];
          } else if (_this.marker) {
            previous = _this.marker;
          } else {
            throw new Error('previous not defined');
          }

          view = createView(_this, scope, previous.nextSibling);

          _this.customData.iterated.push(view);
        } else {
          if (view.models[modelName] !== model) {
            // search for a view that matches the model
            var matchIndex, nextView;

            for (var nextIndex = index + 1; nextIndex < _this.customData.iterated.length; nextIndex++) {
              nextView = _this.customData.iterated[nextIndex];

              if (nextView.models[modelName] === model) {
                matchIndex = nextIndex;
                break;
              }
            }

            if (matchIndex !== undefined) {
              // model is in other position
              // todo: consider avoiding the splice here by setting a flag
              // profile performance before implementing such change
              _this.customData.iterated.splice(matchIndex, 1);

              if (!_this.marker || !_this.marker.parentNode) {
                throw new Error('Marker has no parent node');
              }

              _this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);

              nextView.models[indexProp] = index;
            } else {
              //new model
              nextView = createView(_this, scope, view.els[0]);
            }

            _this.customData.iterated.splice(index, 0, nextView);
          } else {
            view.models[indexProp] = index;
          }
        }
      });

      if (this.customData.iterated.length > collection.length) {
        times(this.customData.iterated.length - collection.length, function () {
          var view = _this.customData.iterated.pop();

          view.unbind();

          if (!_this.marker || !_this.marker.parentNode) {
            throw new Error('Marker has no parent node');
          }

          _this.marker.parentNode.removeChild(view.els[0]);
        });
      }

      if (el.nodeName === 'OPTION' && this.view.bindings) {
        this.view.bindings.forEach(function (binding) {
          if (_this.marker && binding.el === _this.marker.parentNode && binding.type === 'value') {
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
      this.customData.iterated.forEach(function (view) {
        view.update(data);
      });
    }
  },
  // Adds or removes the class from the element when value is true or false.
  'class-*': function (el, value) {
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
  text: function (el, value) {
    el.textContent = value != null ? value : '';
  },
  // Sets the element's HTML content.
  html: function (el, value) {
    el.innerHTML = value != null ? value : '';
  },
  // Shows the element when value is true.
  show: function (el, value) {
    el.style.display = value ? '' : 'none';
  },
  // Hides the element when value is true (negated version of `show` binder).
  hide: function (el, value) {
    el.style.display = value ? 'none' : '';
  },
  // Enables the element when value is true.
  enabled: function (el, value) {
    el.disabled = !value;
  },
  // Disables the element when value is true (negated version of `enabled` binder).
  disabled: function (el, value) {
    el.disabled = !!value;
  },
  // Checks a checkbox or radio input when the value is true. Also sets the model
  // property when the input is checked or unchecked (two-way binder).
  checked: {
    publishes: true,
    priority: 2000,
    bind: function bind(el) {
      var self = this;
      this.customData = {};

      if (!this.customData.callback) {
        this.customData.callback = function () {
          self.publish();
        };
      }

      el.addEventListener('change', this.customData.callback);
    },
    unbind: function unbind(el) {
      el.removeEventListener('change', this.customData.callback);
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
    unbind: function unbind(el) {
      if (!this.customData.isRadio) {
        el.removeEventListener(this.customData.event, this.customData.callback);
      }
    },
    routine: function routine(el, value) {
      if (this.customData && this.customData.isRadio) {
        el.setAttribute('value', value);
      } else {
        if (el.type === 'select-multiple' && el instanceof HTMLSelectElement) {
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
      this.customData = {};

      if (!this.marker) {
        this.marker = document.createComment(' tinybind: ' + this.type + ' ' + this.keypath + ' ');
        this.customData.attached = false;

        if (!el.parentNode) {
          throw new Error('Element has no parent node');
        }

        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      } else if (this.customData.bound === false && this.customData.nested) {
        this.customData.nested.bind();
      }

      this.customData.bound = true;
    },
    unbind: function unbind() {
      if (this.customData.nested) {
        this.customData.nested.unbind();
        this.customData.bound = false;
      }
    },
    routine: function routine(el, value) {
      value = !!value;

      if (value !== this.customData.attached) {
        if (value) {
          if (!this.customData.nested) {
            this.customData.nested = new _view.View(el, this.view.models, this.view.options);
            this.customData.nested.bind();
          }

          if (!this.marker || !this.marker.parentNode) {
            throw new Error('Marker has no parent node');
          }

          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
          this.customData.attached = true;
        } else {
          if (!el.parentNode) {
            throw new Error('Element has no parent node');
          }

          el.parentNode.removeChild(el);
          this.customData.attached = false;
        }
      }
    },
    update: function update(models) {
      if (this.customData.nested) {
        this.customData.nested.update(models);
      }
    }
  }
};
var _default = binders;
exports.default = _default;

/***/ }),

/***/ "./src/binding.ts":
/*!************************!*\
  !*** ./src/binding.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Binding = void 0;

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * TODO move to utils
 * @param el
 */
function getInputValue(el) {
  var results = [];

  if (el.type === 'checkbox') {
    return el.checked;
  } else if (el.type === 'select-multiple') {
    var options = el.options;

    for (var _key in options) {
      if (options.hasOwnProperty(_key)) {
        var option = options[_key];

        if (option.selected) {
          results.push(option.value);
        }
      }
    }

    return results;
  } else {
    return el.value;
  }
}
/**
 * Used also in parsers.parseType
 * TODO outsource
 */


var PRIMITIVE = 0;
var KEYPATH = 1;
var FORMATTER_ARGS = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
var FORMATTER_SPLIT = /\s+/; // A single binding between a model attribute and a DOM element.

var Binding =
/*#__PURE__*/
function () {
  /**
   * Name of the binder without the prefix
   */

  /**
   * Arguments parsed from star binders, e.g. on foo-*-* args[0] is the first star, args[1] the second-
   */

  /**
   * 
   */

  /**
   * HTML Comment to mark a binding in the DOM
   */

  /**
   * Used in component bindings. TODO e.g. move to ComponentBinding or binders?
   */

  /**
   * just to have a value where we could store custom data
   */

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

    _defineProperty(this, "value", void 0);

    _defineProperty(this, "observer", void 0);

    _defineProperty(this, "view", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "binder", void 0);

    _defineProperty(this, "formatters", void 0);

    _defineProperty(this, "formatterObservers", void 0);

    _defineProperty(this, "keypath", void 0);

    _defineProperty(this, "args", void 0);

    _defineProperty(this, "model", void 0);

    _defineProperty(this, "marker", void 0);

    _defineProperty(this, "_bound", void 0);

    _defineProperty(this, "customData", void 0);

    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    this.binder = binder;
    this.args = args;
    this.formatters = formatters;
    this.formatterObservers = {};
    this.model = undefined;
    this.customData = {};
  }
  /**
   * Observes the object keypath
   * @param obj 
   * @param keypath 
   */


  _createClass(Binding, [{
    key: "observe",
    value: function observe(obj, keypath) {
      return new _observer.Observer(obj, keypath, this);
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
          throw new Error('Unknown type in token');
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
          var primitiveValue = value;
          return primitiveValue;
        } else if (type === KEYPATH) {
          // keypath is string
          var keypath = value;

          if (!_this.formatterObservers[formatterIndex]) {
            _this.formatterObservers[formatterIndex] = {};
          }

          var observer = _this.formatterObservers[formatterIndex][ai];

          if (!observer) {
            observer = _this.observe(_this.view.models, keypath);
            _this.formatterObservers[formatterIndex][ai] = observer;
          }

          return observer.value();
        } else {
          throw new Error('Unknown argument type');
        }
      });
    }
    /**
     * Applies all the current formatters to the supplied value and returns the
     * formatted value.
     */

  }, {
    key: "formattedValue",
    value: function formattedValue(value) {
      var _this2 = this;

      return this.formatters.reduce(function (result, declaration, index) {
        var args = declaration.match(FORMATTER_ARGS);

        if (args === null) {
          throw new Error('No args matched from FORMATTER_ARGS');
        }

        var id = args.shift();

        if (!id) {
          throw new Error('No id found in args');
        }

        var formatter = _this2.view.options.formatters[id];

        var processedArgs = _this2.parseFormatterArguments(args, index);

        if (formatter && formatter.read instanceof Function) {
          result = formatter.read.apply(formatter, [result].concat(_toConsumableArray(processedArgs)));
        } else if (formatter instanceof Function) {
          result = formatter.apply(void 0, [result].concat(_toConsumableArray(processedArgs)));
        }

        return result;
      }, value);
    }
    /**
     * Returns an event handler for the binding around the supplied function.
     */

  }, {
    key: "eventHandler",
    value: function eventHandler(fn) {
      var _this3 = this;

      var binding = this;
      var handler = binding.view.options.handler;
      return function (ev) {
        if (!handler) {
          throw new Error('No handler defined in binding.view.options.handler');
        }

        handler.call(fn, _this3, ev, binding);
      };
    }
    /**
     * Sets the value for the binding. This Basically just runs the binding routine
     * with the supplied value formatted.
     */

  }, {
    key: "set",
    value: function set(value) {
      if (value instanceof Function && !this.binder.function) {
        value = value;
        value = this.formattedValue(value.call(this.model));
      } else {
        value = value;
        value = this.formattedValue(value);
      }

      var routineFn;

      if (this.binder.hasOwnProperty('routine')) {
        this.binder = this.binder;
        routineFn = this.binder.routine;
      } else {
        this.binder = this.binder;
        routineFn = this.binder;
      }

      if (routineFn instanceof Function) {
        routineFn.call(this, this.el, value);
      }
    }
    /**
     * Syncs up the view binding with the model.
     */

  }, {
    key: "sync",
    value: function sync() {
      if (this.observer) {
        this.model = this.observer.target;
        this.set(this.observer.value());
      } else {
        this.set(this.value);
      }
    }
    /**
     * Publishes the value currently set on the input element back to the model.
     */

  }, {
    key: "publish",
    value: function publish() {
      var _this4 = this;

      if (this.observer) {
        var value = this.formatters.reduceRight(function (result, declaration, index) {
          var args = declaration.split(FORMATTER_SPLIT);
          var id = args.shift();

          if (!id) {
            throw new Error('id not defined');
          }

          var formatter = _this4.view.options.formatters[id];

          var processedArgs = _this4.parseFormatterArguments(args, index);

          if (formatter && formatter.publish) {
            result = formatter.publish.apply(formatter, [result].concat(_toConsumableArray(processedArgs)));
          }

          return result;
        }, this.getValue(this.el));
        this.observer.setValue(value);
      }
    }
    /**
     * Subscribes to the model for changes at the specified keypath. Bi-directional
     * routines will also listen for changes on the element to propagate them back
     * to the model.
     */

  }, {
    key: "bind",
    value: function bind() {
      this.parseTarget();

      if (this.binder && this.binder.hasOwnProperty('bind')) {
        this.binder = this.binder;

        if (!this.binder.bind && typeof this.binder.bind !== 'function') {
          throw new Error('the method bind is not a function');
        }

        this.binder.bind.call(this, this.el);
      }

      if (this.view.options.preloadData) {
        this.sync();
      }
    }
    /**
     * Unsubscribes from the model and the element.
     */

  }, {
    key: "unbind",
    value: function unbind() {
      var _this5 = this;

      if (this.binder.hasOwnProperty('bind')) {
        this.binder = this.binder;

        if (this.binder.unbind) {
          this.binder.unbind.call(this, this.el);
        }
      }

      if (this.observer) {
        this.observer.unobserve();
      }

      Object.keys(this.formatterObservers).forEach(function (fi) {
        var args = _this5.formatterObservers[fi];
        Object.keys(args).forEach(function (ai) {
          args[ai].unobserve();
        });
      });
      this.formatterObservers = {};
    }
    /**
     * Updates the binding's model from what is currently set on the view. Unbinds
     * the old model first and then re-binds with the new model.
     * @param {any} models 
     */

  }, {
    key: "update",
    value: function update() {
      var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.observer) {
        this.model = this.observer.target;
      }

      if (this.binder.hasOwnProperty('update')) {
        this.binder = this.binder;

        if (this.binder.update) {
          this.binder.update.call(this, models);
        }
      }
    }
    /**
     * Returns elements value
     * @param el 
     */

  }, {
    key: "getValue",
    value: function getValue(el) {
      if (this.binder.hasOwnProperty('getValue')) {
        this.binder = this.binder;

        if (typeof this.binder.getValue !== 'function') {
          throw new Error('getValue is not a function');
        }

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

/***/ "./src/component-binding.ts":
/*!**********************************!*\
  !*** ./src/component-binding.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentBinding = void 0;

var _tinybind = _interopRequireDefault(__webpack_require__(/*! ./tinybind */ "./src/tinybind.ts"));

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.ts");

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "view", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "el", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "type", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "component", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "static", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "observers", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "upstreamObservers", void 0);

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
          throw new Error('can\'t parse component attribute');
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

/***/ "./src/formatters.ts":
/*!***************************!*\
  !*** ./src/formatters.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatters = void 0;
var formatters = {};
exports.formatters = formatters;

formatters.not = function (value) {
  return !value;
};

/***/ }),

/***/ "./src/observer.ts":
/*!*************************!*\
  !*** ./src/observer.ts ***!
  \*************************/
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

/***/ "./src/parsers.ts":
/*!************************!*\
  !*** ./src/parsers.ts ***!
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
  } else if (!isNaN(Number(string))) {
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
}

// Template parser and tokenizer for mustache-style text content bindings.
// Parses the template and returns a set of tokens, separating static portions
// of text from binding declarations.
function parseTemplate(template, delimiters) {
  var tokens = null;
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

      var _value = template.slice(lastIndex, index).trim();

      tokens.push({
        type: BINDING,
        value: _value
      });
      lastIndex = index + close.length;
    }
  }

  return tokens;
}

/***/ }),

/***/ "./src/tinybind.ts":
/*!*************************!*\
  !*** ./src/tinybind.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.ts");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _formatters = __webpack_require__(/*! ./formatters */ "./src/formatters.ts");

var _adapter = _interopRequireDefault(__webpack_require__(/*! ./adapter */ "./src/adapter.ts"));

var _binders = _interopRequireDefault(__webpack_require__(/*! ./binders */ "./src/binders.ts"));

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  binders: _binders.default,
  // Global components.
  components: {},
  // Global formatters.
  formatters: _formatters.formatters,
  // Global sightglass adapters.
  adapters: {
    '.': _adapter.default
  },
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

  /**
   * Default event handler.
   * TODO is this used?
   */
  handler: function handler(context, ev, binding) {
    // console.warn('yes it is used');
    this.call(context, ev, binding.view.models);
  },

  /**
   * Sets the attribute on the element. If no binder above is matched it will fall
   * back to using this binder.
   */
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
  },
  // Initializes a new instance of a component on the specified element and
  // returns a tinybind.View instance.	
  init: function init(componentKey, el) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!el) {
      el = document.createElement('div');
    }

    var component = tinybind.components[componentKey];
    el.innerHTML = component.template.call(tinybind, el);
    var scope = component.initialize.call(tinybind, el, data);
    var view = tinybind.bind(el, scope);
    view.bind();
    return view;
  },
  // Binds some data to a template / element. Returns a tinybind.View instance.
  bind: function bind(el, models, options) {
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

    viewOptions.prefix = options && options.prefix ? options.prefix : tinybind.prefix;
    viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : tinybind.templateDelimiters;
    viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : tinybind.rootInterface;
    viewOptions.preloadData = options && options.preloadData ? options.preloadData : tinybind.preloadData;
    viewOptions.handler = options && options.handler ? options.handler : tinybind.handler; // merge extensions

    mergeObject(viewOptions.binders, tinybind.binders);
    mergeObject(viewOptions.formatters, tinybind.formatters);
    mergeObject(viewOptions.components, tinybind.components);
    mergeObject(viewOptions.adapters, tinybind.adapters); // get all starBinders from available binders

    viewOptions.starBinders = Object.keys(viewOptions.binders).filter(function (key) {
      return key.indexOf('*') > 0;
    });

    _observer.Observer.updateOptions(viewOptions);

    var view = new _view.View(el, models, viewOptions);
    view.bind();
    return view;
  }
};
var _default = tinybind;
exports.default = _default;

/***/ }),

/***/ "./src/view.ts":
/*!*********************!*\
  !*** ./src/view.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _tinybind = _interopRequireDefault(__webpack_require__(/*! ./tinybind */ "./src/tinybind.ts"));

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.ts");

var _componentBinding = __webpack_require__(/*! ./component-binding */ "./src/component-binding.ts");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var textBinder = {
  routine: function routine(node, value) {
    node.data = value != null ? value : '';
  }
};
var DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;

var parseNode = function parseNode(view, node) {
  var block = false; // if node.nodeType === Node.TEXT_NODE

  node = node;

  if (node.nodeType === 3) {
    if (!node.data) {
      throw new Error('node has no data');
    }

    var tokens = (0, _parsers.parseTemplate)(node.data, _tinybind.default.templateDelimiters);

    if (tokens) {
      if (!node.parentNode) {
        throw new Error('Node has no parent node');
      }

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

    _defineProperty(this, "els", void 0);

    _defineProperty(this, "models", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "bindings", []);

    _defineProperty(this, "componentView", null);

    if (els instanceof Array) {
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
      var matches = declaration.match(DECLARATION_SPLIT);

      if (matches === null) {
        throw new Error('no matches');
      }

      var pipes = matches.map(trimStr);
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

exports.View = View;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2Zvcm1hdHRlcnMudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvb2JzZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvcGFyc2Vycy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy90aW55YmluZC50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy92aWV3LnRzIl0sIm5hbWVzIjpbIkFSUkFZX01FVEhPRFMiLCJBZGFwdGVyIiwib2JqIiwiaGFzT3duUHJvcGVydHkiLCJpZCIsImNvdW50ZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid2Vha21hcCIsIl9fcnYiLCJjYWxsYmFja3MiLCJyZWYiLCJrZXlzIiwibGVuZ3RoIiwicG9pbnRlcnMiLCJmbiIsIm9yaWdpbmFsIiwibWFwIiwid2Vha1JlZmVyZW5jZSIsImFyZ3MiLCJyZXNwb25zZSIsImFwcGx5IiwiZm9yRWFjaCIsImsiLCJyIiwiQXJyYXkiLCJjYWxsYmFjayIsInN5bmMiLCJrZXlwYXRoIiwic3R1YkZ1bmN0aW9uIiwiaW5kZXhPZiIsInB1c2giLCJpZHgiLCJzcGxpY2UiLCJjbGVhbnVwV2Vha1JlZmVyZW5jZSIsImRlc2MiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXQiLCJzZXQiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwibmV3VmFsdWUiLCJ1bm9ic2VydmVNdXRhdGlvbnMiLCJjYiIsIm9ic2VydmVNdXRhdGlvbnMiLCJhZGFwdGVyIiwiZ2V0U3RyaW5nIiwidG9TdHJpbmciLCJ1bmRlZmluZWQiLCJ0aW1lcyIsIm4iLCJpIiwiY3JlYXRlVmlldyIsImJpbmRpbmciLCJtb2RlbHMiLCJhbmNob3JFbCIsInRlbXBsYXRlIiwiZWwiLCJjbG9uZU5vZGUiLCJ2aWV3IiwiVmlldyIsIm9wdGlvbnMiLCJiaW5kIiwibWFya2VyIiwicGFyZW50Tm9kZSIsIkVycm9yIiwiaW5zZXJ0QmVmb3JlIiwiYmluZGVycyIsImZ1bmN0aW9uIiwicHJpb3JpdHkiLCJjdXN0b21EYXRhIiwiaGFuZGxlciIsInVuYmluZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyb3V0aW5lIiwiZXZlbnRIYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJsb2NrIiwiZG9jdW1lbnQiLCJjcmVhdGVDb21tZW50IiwidHlwZSIsIml0ZXJhdGVkIiwicmVtb3ZlQ2hpbGQiLCJjb2xsZWN0aW9uIiwibW9kZWxOYW1lIiwiaXNBcnJheSIsImluZGV4UHJvcCIsImdldEF0dHJpYnV0ZSIsImdldEl0ZXJhdGlvbkFsaWFzIiwibW9kZWwiLCJpbmRleCIsInNjb3BlIiwiJHBhcmVudCIsInByZXZpb3VzIiwiZWxzIiwibmV4dFNpYmxpbmciLCJtYXRjaEluZGV4IiwibmV4dFZpZXciLCJuZXh0SW5kZXgiLCJwb3AiLCJub2RlTmFtZSIsImJpbmRpbmdzIiwidXBkYXRlIiwiZGF0YSIsImtleSIsImVsQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXBsYWNlIiwidHJpbSIsInRleHQiLCJ0ZXh0Q29udGVudCIsImh0bWwiLCJpbm5lckhUTUwiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaGlkZSIsImVuYWJsZWQiLCJkaXNhYmxlZCIsImNoZWNrZWQiLCJwdWJsaXNoZXMiLCJzZWxmIiwicHVibGlzaCIsImlzUmFkaW8iLCJ0YWdOYW1lIiwiZXZlbnQiLCJzZXRBdHRyaWJ1dGUiLCJIVE1MU2VsZWN0RWxlbWVudCIsIm9wdGlvbiIsInNlbGVjdGVkIiwiaWYiLCJhdHRhY2hlZCIsImJvdW5kIiwibmVzdGVkIiwiZ2V0SW5wdXRWYWx1ZSIsInJlc3VsdHMiLCJQUklNSVRJVkUiLCJLRVlQQVRIIiwiRk9STUFUVEVSX0FSR1MiLCJGT1JNQVRURVJfU1BMSVQiLCJCaW5kaW5nIiwiYmluZGVyIiwiZm9ybWF0dGVycyIsImZvcm1hdHRlck9ic2VydmVycyIsIk9ic2VydmVyIiwidG9rZW4iLCJvYnNlcnZlciIsIm9ic2VydmUiLCJ0YXJnZXQiLCJmb3JtYXR0ZXJJbmRleCIsInBhcnNlVHlwZSIsImFpIiwicHJpbWl0aXZlVmFsdWUiLCJyZWR1Y2UiLCJyZXN1bHQiLCJkZWNsYXJhdGlvbiIsIm1hdGNoIiwic2hpZnQiLCJmb3JtYXR0ZXIiLCJwcm9jZXNzZWRBcmdzIiwicGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMiLCJyZWFkIiwiRnVuY3Rpb24iLCJldiIsImNhbGwiLCJmb3JtYXR0ZWRWYWx1ZSIsInJvdXRpbmVGbiIsInJlZHVjZVJpZ2h0Iiwic3BsaXQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwicGFyc2VUYXJnZXQiLCJwcmVsb2FkRGF0YSIsInVub2JzZXJ2ZSIsImZpIiwiQ29tcG9uZW50QmluZGluZyIsImNvbXBvbmVudCIsImNvbXBvbmVudHMiLCJzdGF0aWMiLCJvYnNlcnZlcnMiLCJ1cHN0cmVhbU9ic2VydmVycyIsImJpbmRpbmdQcmVmaXgiLCJ0aW55YmluZCIsIl9mdWxsUHJlZml4IiwibGVuIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsIm5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJjYW1lbENhc2UiLCJzdGF0Iiwic3RyaW5nIiwiZ3JvdXBlZCIsInRvVXBwZXJDYXNlIiwiY29tcG9uZW50VmlldyIsImluaXRpYWxpemUiLCJsb2NhbHMiLCJfYm91bmQiLCJFWFRFTlNJT05TIiwiZXh0ZW5zaW9uVHlwZSIsIk9QVElPTlMiLCJwcm90b3R5cGUiLCJzbGljZSIsImNoaWxkTm9kZXMiLCJ1cHN0cmVhbSIsIm5vdCIsImlzT2JqZWN0IiwiZXJyb3IiLCJtZXNzYWdlIiwiYWRhcHRlcnMiLCJpbnRlcmZhY2VzIiwicm9vdEludGVyZmFjZSIsIm9iamVjdFBhdGgiLCJwYXJzZVJlc3VsdCIsInBhcnNlIiwidG9rZW5zIiwiZ2V0Um9vdE9iamVjdCIsInJlYWxpemUiLCJwYXRoIiwicm9vdCIsInN1YnN0ciIsInRva2VuaXplIiwiY3VycmVudCIsInVucmVhY2hlZCIsInByZXYiLCJuZXh0Iiwib2xkVmFsdWUiLCJhY3RpdmUiLCJyb290UHJvcCIsImNociIsImNoYXJBdCIsIlFVT1RFRF9TVFIiLCJURVhUIiwiQklORElORyIsImlzSnNvbiIsInN0ciIsInZhbCIsIkpTT04iLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZVRlbXBsYXRlIiwiZGVsaW1pdGVycyIsImxhc3RJbmRleCIsIm9wZW4iLCJjbG9zZSIsInN1YnN0cmluZyIsImxhc3RUb2tlbiIsIm1lcmdlT2JqZWN0IiwiX3ByZWZpeCIsInByZWZpeCIsInRlbXBsYXRlRGVsaW1pdGVycyIsImNvbnRleHQiLCJmYWxsYmFja0JpbmRlciIsInJlbW92ZUF0dHJpYnV0ZSIsImNvbmZpZ3VyZSIsImluaXQiLCJjb21wb25lbnRLZXkiLCJjcmVhdGVFbGVtZW50Iiwidmlld09wdGlvbnMiLCJjcmVhdGUiLCJzdGFyQmluZGVycyIsImZpbHRlciIsInVwZGF0ZU9wdGlvbnMiLCJ0ZXh0QmluZGVyIiwibm9kZSIsIkRFQ0xBUkFUSU9OX1NQTElUIiwicGFyc2VOb2RlIiwibm9kZVR5cGUiLCJjcmVhdGVUZXh0Tm9kZSIsImJ1aWxkQmluZGluZyIsInRyYXZlcnNlIiwiYmluZGluZ0NvbXBhcmF0b3IiLCJhIiwiYiIsImFQcmlvcml0eSIsImJQcmlvcml0eSIsInRyaW1TdHIiLCJidWlsZCIsIm1hdGNoZXMiLCJwaXBlcyIsImVsZW1lbnRzIiwic29ydCIsImJpbmRJbmZvcyIsImlkZW50aWZpZXIiLCJhdHRyIiwiYmluZEluZm8iLCJ0b0xvd2VyQ2FzZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBRUEsSUFBTUEsZ0JBQWdCLENBQ3BCLE1BRG9CLEVBRXBCLEtBRm9CLEVBR3BCLE9BSG9CLEVBSXBCLFNBSm9CLEVBS3BCLE1BTG9CLEVBTXBCLFNBTm9CLEVBT3BCLFFBUG9CLENBQXRCOztJQXdDYUMsTzs7Ozs7O3FDQUNPLEM7O3FDQUNKLEU7Ozs7O2tDQUVBQyxHLEVBQVU7QUFDdEIsVUFBSSxDQUFDQSxJQUFJQyxjQUFKLENBQW1CLE1BQW5CLENBQUwsRUFBaUM7QUFDL0IsWUFBSUMsS0FBSyxLQUFL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LE1BQVQsQ0FBdUNyQixTQUE3RCxFQUF3RTtBQUN0RW5FLGtCQUFRcUUsT0FBUjtBQUNEO0FBQ0YsT0FKRDtBQUtELEssQ0FFRDs7Ozs2QkFDeUI7QUFBQTs7QUFBQSxVQUFsQnBFLE1BQWtCLHVFQUFKLEVBQUk7QUFDdkJqRCxhQUFPTyxJQUFQLENBQVkwQyxNQUFaLEVBQW9CaEMsT0FBcEIsQ0FBNEIsZUFBTztBQUNqQyxjQUFLZ0MsTUFBTCxDQUFZa0QsR0FBWixJQUFtQmxELE9BQU9rRCxHQUFQLENBQW5CO0FBQ0QsT0FGRDtBQUlBLFdBQUtILFFBQUwsQ0FBYy9FLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IsWUFBSStCLFFBQVFpRCxNQUFaLEVBQW9CO0FBQ2xCakQsa0JBQVFpRCxNQUFSLENBQWVoRCxNQUFmO0FBQ0Q7QUFDRixPQUpEO0FBS0QiLCJmaWxlIjoidGlueWJpbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0aW55YmluZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0aW55YmluZFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdGlueWJpbmQudHNcIik7XG4iLCJpbXBvcnQgeyBJQ2FsbGJhY2sgfSBmcm9tICcuL29ic2VydmVyJztcblxuLy8gVGhlIGRlZmF1bHQgYC5gIGFkYXB0ZXIgdGhhdCBjb21lcyB3aXRoIHRpbnliaW5kLmpzLiBBbGxvd3Mgc3Vic2NyaWJpbmcgdG9cbi8vIHByb3BlcnRpZXMgb24gcGxhaW4gb2JqZWN0cywgaW1wbGVtZW50ZWQgaW4gRVM1IG5hdGl2ZXMgdXNpbmdcbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgLlxuXG5jb25zdCBBUlJBWV9NRVRIT0RTID0gW1xuICAncHVzaCcsXG4gICdwb3AnLFxuICAnc2hpZnQnLFxuICAndW5zaGlmdCcsXG4gICdzb3J0JyxcbiAgJ3JldmVyc2UnLFxuICAnc3BsaWNlJ1xuXTtcblxuZXhwb3J0IGludGVyZmFjZSBJUmVmIHtcbiAgY2FsbGJhY2tzOiBhbnlbXTtcbiAgcG9pbnRlcnM6IGFueVtdO1xufVxuXG4vLyBUT0RPIHdoYXQgdGhlIGhlbGw/IVxuZXhwb3J0IGludGVyZmFjZSBJUlZBcnJheSBleHRlbmRzIEFycmF5PGFueT4ge1xuICBfX3J2OiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIEFkYXB0ZXJGdW5jdGlvbiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBZGFwdGVyIHtcbiAgY291bnRlcjogbnVtYmVyO1xuICB3ZWFrbWFwOiBhbnk7XG4gIHdlYWtSZWZlcmVuY2U6IChvYmo6IGFueSkgPT4gYW55OyAvLyA9PiBfX3J2ID9cbiAgY2xlYW51cFdlYWtSZWZlcmVuY2U6IChyZWY6IElSZWYsIGlkOiBudW1iZXIpID0+IHZvaWQ7XG4gIHN0dWJGdW5jdGlvbjogKG9iajogYW55LCBmbjogc3RyaW5nKSA9PiBhbnkgLy8gPT4gcmVzcG9uc2UgP1xuICBvYnNlcnZlTXV0YXRpb25zOiAob2JqOiBhbnksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVub2JzZXJ2ZU11dGF0aW9uczogKG9iajogSVJWQXJyYXksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9ic2VydmU6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSUNhbGxiYWNrKSA9PiB2b2lkOyBcbiAgdW5vYnNlcnZlOiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElDYWxsYmFjaykgPT4gdm9pZDtcbiAgZ2V0OiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZykgPT4gYW55O1xuICBzZXQ6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBZGFwdGVycyB7XG4gIFtuYW1lOiBzdHJpbmddOiBJQWRhcHRlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFkYXB0ZXIgaW1wbGVtZW50cyBJQWRhcHRlciB7XG4gIGNvdW50ZXI6IG51bWJlciA9IDA7XG4gIHdlYWttYXA6YW55ID0ge307XG5cbiAgd2Vha1JlZmVyZW5jZShvYmo6IGFueSkge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KCdfX3J2JykpIHtcbiAgICAgIGxldCBpZCA9IHRoaXMuY291bnRlcisrO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnX19ydicsIHtcbiAgICAgICAgdmFsdWU6IGlkXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMud2Vha21hcFtvYmouX19ydl0pIHtcbiAgICAgIHRoaXMud2Vha21hcFtvYmouX19ydl0gPSB7XG4gICAgICAgIGNhbGxiYWNrczoge31cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMud2Vha21hcFtvYmouX19ydl07XG4gIH1cblxuICBjbGVhbnVwV2Vha1JlZmVyZW5jZShyZWY6IElSZWYsIGlkOiBudW1iZXIpIHtcbiAgICBpZiAoIU9iamVjdC5rZXlzKHJlZi5jYWxsYmFja3MpLmxlbmd0aCkge1xuICAgICAgaWYgKCEocmVmLnBvaW50ZXJzICYmIE9iamVjdC5rZXlzKHJlZi5wb2ludGVycykubGVuZ3RoKSkge1xuICAgICAgICBkZWxldGUgdGhpcy53ZWFrbWFwW2lkXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdHViRnVuY3Rpb24ob2JqOiBhbnksIGZuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3JpZ2luYWwgPSBvYmpbZm5dO1xuICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcbiAgICBsZXQgd2Vha21hcCA9IHRoaXMud2Vha21hcDtcblxuICAgIG9ialtmbl0gPSAoLi4uYXJnczogYW55W10pOiBBZGFwdGVyRnVuY3Rpb24gPT4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gb3JpZ2luYWwuYXBwbHkob2JqLCBhcmdzKTtcblxuICAgICAgT2JqZWN0LmtleXMobWFwLnBvaW50ZXJzKS5mb3JFYWNoKHIgPT4ge1xuICAgICAgICBsZXQgayA9IG1hcC5wb2ludGVyc1tyXTtcblxuICAgICAgICBpZiAod2Vha21hcFtyXSkge1xuICAgICAgICAgIGlmICh3ZWFrbWFwW3JdLmNhbGxiYWNrc1trXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB3ZWFrbWFwW3JdLmNhbGxiYWNrc1trXS5mb3JFYWNoKChjYWxsYmFjazogSUNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrLnN5bmMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuICB9XG5cbiAgb2JzZXJ2ZU11dGF0aW9ucyhvYmo6IGFueSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgbGV0IG1hcCA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopO1xuXG4gICAgICBpZiAoIW1hcC5wb2ludGVycykge1xuICAgICAgICBtYXAucG9pbnRlcnMgPSB7fTtcblxuICAgICAgICBBUlJBWV9NRVRIT0RTLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgIHRoaXMuc3R1YkZ1bmN0aW9uKG9iaiwgZm4pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFtYXAucG9pbnRlcnNbcmVmXSkge1xuICAgICAgICBtYXAucG9pbnRlcnNbcmVmXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFwLnBvaW50ZXJzW3JlZl0uaW5kZXhPZihrZXlwYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzW3JlZl0ucHVzaChrZXlwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1bm9ic2VydmVNdXRhdGlvbnMob2JqOiBJUlZBcnJheSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykge1xuICAgIGlmICgob2JqIGluc3RhbmNlb2YgQXJyYXkpICYmIChvYmouX19ydiAhPSBudWxsKSkge1xuICAgICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICAgIGlmIChtYXApIHtcbiAgICAgICAgbGV0IHBvaW50ZXJzID0gbWFwLnBvaW50ZXJzW3JlZl07XG5cbiAgICAgICAgaWYgKHBvaW50ZXJzKSB7XG4gICAgICAgICAgbGV0IGlkeCA9IHBvaW50ZXJzLmluZGV4T2Yoa2V5cGF0aCk7XG5cbiAgICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHBvaW50ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghcG9pbnRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgbWFwLnBvaW50ZXJzW3JlZl07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jbGVhbnVwV2Vha1JlZmVyZW5jZShtYXAsIG9iai5fX3J2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElDYWxsYmFjaykge1xuICAgIHZhciB2YWx1ZTogYW55O1xuICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKS5jYWxsYmFja3M7XG5cbiAgICBpZiAoIWNhbGxiYWNrc1trZXlwYXRoXSkge1xuICAgICAgY2FsbGJhY2tzW2tleXBhdGhdID0gW107XG4gICAgICBsZXQgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXlwYXRoKTtcblxuICAgICAgaWYgKCFkZXNjIHx8ICEoZGVzYy5nZXQgfHwgZGVzYy5zZXQgfHwgIWRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgICB2YWx1ZSA9IG9ialtrZXlwYXRoXTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXlwYXRoLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcblxuICAgICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdGhpcy51bm9ic2VydmVNdXRhdGlvbnModmFsdWUsIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICAgICAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFja3MgPSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLmZvckVhY2goKGNiOiBJQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2Iuc3luYygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlTXV0YXRpb25zKG5ld1ZhbHVlLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjYWxsYmFja3Nba2V5cGF0aF0uaW5kZXhPZihjYWxsYmFjaykgPT09IC0xKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0ucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgdGhpcy5vYnNlcnZlTXV0YXRpb25zKG9ialtrZXlwYXRoXSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICB9XG5cbiAgdW5vYnNlcnZlKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJQ2FsbGJhY2spIHtcbiAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgIGlmIChtYXApIHtcbiAgICAgIGxldCBjYWxsYmFja3MgPSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuXG4gICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIGxldCBpZHggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG5cbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICAgICAgaWYgKCFjYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcbiAgICAgICAgICAgIHRoaXMudW5vYnNlcnZlTXV0YXRpb25zKG9ialtrZXlwYXRoXSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xlYW51cFdlYWtSZWZlcmVuY2UobWFwLCBvYmouX19ydik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0KG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gb2JqW2tleXBhdGhdO1xuICB9XG5cbiAgc2V0KG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBvYmpba2V5cGF0aF0gPSB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3QgYWRhcHRlciA9IG5ldyBBZGFwdGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFkYXB0ZXI7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbi8vIGltcG9ydCB7IE5vZGUgfSBmcm9tICdiYWJlbC10eXBlcyc7XG5cbmV4cG9ydCB0eXBlIElPbmVXYXlCaW5kZXI8VmFsdWVUeXBlPiA9ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWU6IFZhbHVlVHlwZSkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBJVHdvV2F5QmluZGVyPFZhbHVlVHlwZT4ge1xuICByb3V0aW5lOiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQsIHZhbHVlOiBWYWx1ZVR5cGUpID0+IHZvaWQ7XG4gIGJpbmQ/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIHVuYmluZD86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgdXBkYXRlPzogKHRoaXM6IEJpbmRpbmcsIG1vZGVsOiBhbnkpID0+IHZvaWQ7XG4gIGdldFZhbHVlPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICBibG9jaz86IGJvb2xlYW47XG4gIGZ1bmN0aW9uPzogYm9vbGVhbjtcbiAgcHVibGlzaGVzPzogYm9vbGVhbjtcbiAgcHJpb3JpdHk/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBJZiB5b3Ugd2FudCB0byBzYXZlIGN1c3RvbSBkYXRhIGluIHRoaXMgdXNlIHRoaXMgb2JqZWN0XG4gICAqL1xuICBjdXN0b21EYXRhPzogYW55O1xufVxuXG5leHBvcnQgdHlwZSBCaW5kZXI8VmFsdWVUeXBlPiA9IElPbmVXYXlCaW5kZXI8VmFsdWVUeXBlPiB8IElUd29XYXlCaW5kZXI8VmFsdWVUeXBlPlxuXG5leHBvcnQgaW50ZXJmYWNlIElCaW5kZXJzPFZhbHVlVHlwZT4ge1xuICBbbmFtZTogc3RyaW5nXTogQmluZGVyPFZhbHVlVHlwZT47XG59XG5cbmNvbnN0IGdldFN0cmluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsID8gdmFsdWUudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRpbWVzID0gKG46IG51bWJlciwgY2I6KCkgPT4gdm9pZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgY2IoKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVZpZXcoYmluZGluZzogQmluZGluZywgbW9kZWxzOiBhbnksIGFuY2hvckVsOiBIVE1MRWxlbWVudCB8IE5vZGUgfCBudWxsKSB7XG4gIGxldCB0ZW1wbGF0ZSA9IGJpbmRpbmcuZWwuY2xvbmVOb2RlKHRydWUpO1xuICBsZXQgdmlldyA9IG5ldyBWaWV3KCh0ZW1wbGF0ZSBhcyBOb2RlKSwgbW9kZWxzLCBiaW5kaW5nLnZpZXcub3B0aW9ucyk7XG4gIHZpZXcuYmluZCgpO1xuICBpZighYmluZGluZyB8fCAhYmluZGluZy5tYXJrZXIgfHwgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcGFyZW50IG5vZGUgZm9yIGJpbmRpbmchJyk7XG4gIH1cblxuICBiaW5kaW5nLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZW1wbGF0ZSwgYW5jaG9yRWwpO1xuXG4gIHJldHVybiB2aWV3O1xufVxuXG5jb25zdCBiaW5kZXJzOiBJQmluZGVyczxhbnk+ID0ge1xuICAvLyBCaW5kcyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBlbGVtZW50LlxuICAnb24tKic6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBwcmlvcml0eTogMTAwMCxcblxuICAgIGJpbmQoZWwpIHtcbiAgICAgIGlmKCF0aGlzLmN1c3RvbURhdGEpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0ge1xuICAgICAgICAgIGhhbmRsZXI6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSAvKlRPRE8qLykge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEuaGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyID0gdGhpcy5ldmVudEhhbmRsZXIodmFsdWUpO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQXBwZW5kcyBib3VuZCBpbnN0YW5jZXMgb2YgdGhlIGVsZW1lbnQgaW4gcGxhY2UgZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuXG4gICdlYWNoLSonOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG5cbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChgIHRpbnliaW5kOiAke3RoaXMudHlwZX0gYCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHtcbiAgICAgICAgICBpdGVyYXRlZDogPFZpZXdbXT4gW11cbiAgICAgICAgfTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpICA9PiB7XG4gICAgICAgICAgdmlldy5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWwpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbCwgY29sbGVjdGlvbikge1xuICAgICAgbGV0IG1vZGVsTmFtZSA9IHRoaXMuYXJnc1swXTtcbiAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uIHx8IFtdO1xuXG4gICAgICAvLyBUT0RPIHN1cHBvcnQgb2JqZWN0IGtleXMgdG8gaXRlcmF0ZSBvdmVyXG4gICAgICBpZighQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VhY2gtJyArIG1vZGVsTmFtZSArICcgbmVlZHMgYW4gYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLCBidXQgaXQgaXMnKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgaW5kZXggbmFtZSBpcyBzZXRlZCBieSBgaW5kZXgtcHJvcGVydHlgIHVzZSB0aGlzIG5hbWUsIG90aGVyd2lzZSBgJVttb2RlbE5hbWVdJWAgIFxuICAgICAgbGV0IGluZGV4UHJvcCA9IGVsLmdldEF0dHJpYnV0ZSgnaW5kZXgtcHJvcGVydHknKSB8fCB0aGlzLmdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZSk7XG5cbiAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgobW9kZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBzY29wZTogYW55ID0geyRwYXJlbnQ6IHRoaXMudmlldy5tb2RlbHN9O1xuICAgICAgICBzY29wZVtpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgIHNjb3BlW21vZGVsTmFtZV0gPSBtb2RlbDtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbaW5kZXhdO1xuXG4gICAgICAgIGlmICghdmlldykge1xuICAgICAgICAgIGxldCBwcmV2aW91czogQ29tbWVudCB8IEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkW3RoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSAxXS5lbHNbMF07XG4gICAgICAgICAgfSBlbHNlIGlmKHRoaXMubWFya2VyKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHRoaXMubWFya2VyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlldyA9IGNyZWF0ZVZpZXcodGhpcywgc2NvcGUsIHByZXZpb3VzLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQucHVzaCh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldy5tb2RlbHNbbW9kZWxOYW1lXSAhPT0gbW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgbW9kZWxcbiAgICAgICAgICAgIGxldCBtYXRjaEluZGV4LCBuZXh0VmlldztcbiAgICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IGluZGV4ICsgMTsgbmV4dEluZGV4IDwgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWaWV3Lm1vZGVsc1ttb2RlbE5hbWVdID09PSBtb2RlbCkge1xuICAgICAgICAgICAgICAgIG1hdGNoSW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gbW9kZWwgaXMgaW4gb3RoZXIgcG9zaXRpb25cbiAgICAgICAgICAgICAgLy8gdG9kbzogY29uc2lkZXIgYXZvaWRpbmcgdGhlIHNwbGljZSBoZXJlIGJ5IHNldHRpbmcgYSBmbGFnXG4gICAgICAgICAgICAgIC8vIHByb2ZpbGUgcGVyZm9ybWFuY2UgYmVmb3JlIGltcGxlbWVudGluZyBzdWNoIGNoYW5nZVxuICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKG1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXh0Vmlldy5lbHNbMF0sIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgICAgbmV4dFZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vbmV3IG1vZGVsXG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gY3JlYXRlVmlldyh0aGlzLCBzY29wZSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnNwbGljZShpbmRleCwgMCwgbmV4dFZpZXcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3Lm1vZGVsc1tpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggPiBjb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICB0aW1lcyh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoIC0gY29sbGVjdGlvbi5sZW5ndGgsICgpID0+IHtcbiAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5wb3AoKTtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodmlldy5lbHNbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09PSAnT1BUSU9OJyAmJiB0aGlzLnZpZXcuYmluZGluZ3MpIHtcbiAgICAgICAgdGhpcy52aWV3LmJpbmRpbmdzLmZvckVhY2goKGJpbmRpbmc6IEJpbmRpbmcpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5tYXJrZXIgJiYgKGJpbmRpbmcuZWwgPT09IHRoaXMubWFya2VyLnBhcmVudE5vZGUpICYmIChiaW5kaW5nLnR5cGUgPT09ICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUobW9kZWxzKSB7XG4gICAgICBsZXQgZGF0YTogYW55ID0ge307XG5cbiAgICAgIC8vdG9kbzogYWRkIHRlc3QgYW5kIGZpeCBpZiBuZWNlc3NhcnlcblxuICAgICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgIT09IHRoaXMuYXJnc1swXSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IG1vZGVsc1trZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgdmlldy51cGRhdGUoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQWRkcyBvciByZW1vdmVzIHRoZSBjbGFzcyBmcm9tIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSBvciBmYWxzZS5cbiAgJ2NsYXNzLSonOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGxldCBlbENsYXNzID0gYCAke2VsLmNsYXNzTmFtZX0gYDtcblxuICAgIGlmICh2YWx1ZSAhPT0gKGVsQ2xhc3MuaW5kZXhPZihgICR7dGhpcy5hcmdzWzBdfSBgKSA+IC0xKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gJHt0aGlzLmFyZ3NbMF19YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsQ2xhc3MucmVwbGFjZShgICR7dGhpcy5hcmdzWzBdfSBgLCAnICcpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIHRleHQgdmFsdWUuXG4gIHRleHQ6IDxJT25lV2F5QmluZGVyPHN0cmluZz4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIEhUTUwgY29udGVudC5cbiAgaHRtbDogPElPbmVXYXlCaW5kZXI8c3RyaW5nPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWwuaW5uZXJIVE1MID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gIH0sXG5cbiAgLy8gU2hvd3MgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICBzaG93OiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICB9LFxuXG4gIC8vIEhpZGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSAobmVnYXRlZCB2ZXJzaW9uIG9mIGBzaG93YCBiaW5kZXIpLlxuICBoaWRlOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICcnO1xuICB9LFxuXG4gIC8vIEVuYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICBlbmFibGVkOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxCdXR0b25FbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLmRpc2FibGVkID0gIXZhbHVlO1xuICB9LFxuXG4gIC8vIERpc2FibGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSAobmVnYXRlZCB2ZXJzaW9uIG9mIGBlbmFibGVkYCBiaW5kZXIpLlxuICBkaXNhYmxlZDogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MQnV0dG9uRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH0sXG5cbiAgLy8gQ2hlY2tzIGEgY2hlY2tib3ggb3IgcmFkaW8gaW5wdXQgd2hlbiB0aGUgdmFsdWUgaXMgdHJ1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbFxuICAvLyBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBpcyBjaGVja2VkIG9yIHVuY2hlY2tlZCAodHdvLXdheSBiaW5kZXIpLlxuICBjaGVja2VkOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAyMDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTFNlbGVjdEVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICBlbC5jaGVja2VkID0gZ2V0U3RyaW5nKGVsLnZhbHVlKSA9PT0gZ2V0U3RyaW5nKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgdmFsdWUuIEFsc28gc2V0cyB0aGUgbW9kZWwgcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgY2hhbmdlc1xuICAvLyAodHdvLXdheSBiaW5kZXIpLlxuICB2YWx1ZTogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMzAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8gPSBlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICdyYWRpbyc7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ldmVudCA9IGVsLmdldEF0dHJpYnV0ZSgnZXZlbnQtbmFtZScpIHx8IChlbC50YWdOYW1lID09PSAnU0VMRUNUJyA/ICdjaGFuZ2UnIDogJ2lucHV0Jyk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjaykge1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuY3VzdG9tRGF0YS5ldmVudCwgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsKSB7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5jdXN0b21EYXRhLmV2ZW50LCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhICYmIHRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1tdWx0aXBsZScgJiYgZWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGxldCBvcHRpb24gPSBlbFtpXTtcbiAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGdldFN0cmluZyh2YWx1ZSkgIT09IGdldFN0cmluZyhlbC52YWx1ZSkpIHtcbiAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEluc2VydHMgYW5kIGJpbmRzIHRoZSBlbGVtZW50IGFuZCBpdCdzIGNoaWxkIG5vZGVzIGludG8gdGhlIERPTSB3aGVuIHRydWUuXG4gIGlmOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MVW5rbm93bkVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgaWYgKCF0aGlzLm1hcmtlcikge1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyB0aW55YmluZDogJyArIHRoaXMudHlwZSArICcgJyArIHRoaXMua2V5cGF0aCArICcgJyk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICBpZighZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9PT0gZmFsc2UgJiYgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgfVxuICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IHRydWU7XG4gICAgfSxcblxuICAgIHVuYmluZCgpIHtcbiAgICAgIGlmICggdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC51bmJpbmQoKTtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuXG4gICAgICAgICAgaWYgKCEgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQgPSBuZXcgVmlldyhlbCwgdGhpcy52aWV3Lm1vZGVscywgdGhpcy52aWV3Lm9wdGlvbnMpO1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgdGhpcy5tYXJrZXIubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlKG1vZGVscykge1xuICAgICAgaWYgKCB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLnVwZGF0ZShtb2RlbHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYmluZGVycztcbiIsImltcG9ydCB7IHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgQmluZGVyLCBJT25lV2F5QmluZGVyLCBJVHdvV2F5QmluZGVyIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuLy8gaW1wb3J0IHsgaXNGb3JPZlN0YXRlbWVudCB9IGZyb20gJ2JhYmVsLXR5cGVzJztcbmltcG9ydCB7IElGb3JtYXR0ZXJzIH0gZnJvbSAnLi9mb3JtYXR0ZXJzJztcblxuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVyT2JzZXJ2ZXJzIHtcbiAgW2tleTogc3RyaW5nXToge1xuICAgIFtrZXk6IHN0cmluZ106IE9ic2VydmVyXG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgZXZlbnRIYW5kbGVyRnVuY3Rpb24gPSAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xuXG4vKipcbiAqIFRPRE8gbW92ZSB0byB1dGlsc1xuICogQHBhcmFtIGVsXG4gKi9cbmZ1bmN0aW9uIGdldElucHV0VmFsdWUoZWw6IEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudCkge1xuICBsZXQgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcbiAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICByZXR1cm4gKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQ7XG4gIH0gZWxzZSBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1tdWx0aXBsZScpIHtcbiAgICBsZXQgb3B0aW9uczpIVE1MT3B0aW9uc0NvbGxlY3Rpb24gPSAoZWwgYXMgSFRNTFNlbGVjdEVsZW1lbnQpLm9wdGlvbnM7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChvcHRpb24udmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbmNvbnN0IEZPUk1BVFRFUl9BUkdTID0gIC9bXlxccyddK3wnKFteJ118J1teXFxzXSkqJ3xcIihbXlwiXXxcIlteXFxzXSkqXCIvZztcbmNvbnN0IEZPUk1BVFRFUl9TUExJVCA9IC9cXHMrLztcblxuLy8gQSBzaW5nbGUgYmluZGluZyBiZXR3ZWVuIGEgbW9kZWwgYXR0cmlidXRlIGFuZCBhIERPTSBlbGVtZW50LlxuZXhwb3J0IGNsYXNzIEJpbmRpbmcge1xuICB2YWx1ZT86IGFueTtcbiAgb2JzZXJ2ZXI/OiBPYnNlcnZlcjtcbiAgdmlldzogVmlldztcbiAgZWw6IEhUTUxFbGVtZW50O1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgYmluZGVyIHdpdGhvdXQgdGhlIHByZWZpeFxuICAgKi9cbiAgdHlwZTogc3RyaW5nO1xuICBiaW5kZXI6IEJpbmRlcjxhbnk+O1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgZm9ybWF0dGVyT2JzZXJ2ZXJzOiBJRm9ybWF0dGVyT2JzZXJ2ZXJzO1xuICBrZXlwYXRoOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBcmd1bWVudHMgcGFyc2VkIGZyb20gc3RhciBiaW5kZXJzLCBlLmcuIG9uIGZvby0qLSogYXJnc1swXSBpcyB0aGUgZmlyc3Qgc3RhciwgYXJnc1sxXSB0aGUgc2Vjb25kLVxuICAgKi9cbiAgYXJnczogc3RyaW5nW107XG4gIC8qKlxuICAgKiBcbiAgICovXG4gIG1vZGVsPzogYW55O1xuICAvKipcbiAgICogSFRNTCBDb21tZW50IHRvIG1hcmsgYSBiaW5kaW5nIGluIHRoZSBET01cbiAgICovXG4gIG1hcmtlcj86IENvbW1lbnQ7XG4gIC8qKlxuICAgKiBVc2VkIGluIGNvbXBvbmVudCBiaW5kaW5ncy4gVE9ETyBlLmcuIG1vdmUgdG8gQ29tcG9uZW50QmluZGluZyBvciBiaW5kZXJzP1xuICAgKi9cbiAgX2JvdW5kPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGp1c3QgdG8gaGF2ZSBhIHZhbHVlIHdoZXJlIHdlIGNvdWxkIHN0b3JlIGN1c3RvbSBkYXRhXG4gICAqL1xuICBjdXN0b21EYXRhPzogYW55O1xuXG4gIC8qKlxuICAgKiBBbGwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGJpbmRpbmcgaXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yOyB0aGVcbiAgICogY29udGFpbmluZyB2aWV3LCB0aGUgRE9NIG5vZGUsIHRoZSB0eXBlIG9mIGJpbmRpbmcsIHRoZSBtb2RlbCBvYmplY3QgYW5kIHRoZVxuICAgKiBrZXlwYXRoIGF0IHdoaWNoIHRvIGxpc3RlbiBmb3IgY2hhbmdlcy5cbiAgICogQHBhcmFtIHsqfSB2aWV3IFxuICAgKiBAcGFyYW0geyp9IGVsIFxuICAgKiBAcGFyYW0geyp9IHR5cGUgXG4gICAqIEBwYXJhbSB7Kn0ga2V5cGF0aCBcbiAgICogQHBhcmFtIHsqfSBiaW5kZXIgXG4gICAqIEBwYXJhbSB7Kn0gYXJncyBUaGUgc3RhcnQgYmluZGVycywgb24gYGNsYXNzLSpgIGFyZ3NbMF0gd2lsIGJlIHRoZSBjbGFzc25hbWUgXG4gICAqIEBwYXJhbSB7Kn0gZm9ybWF0dGVycyBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHZpZXc6IFZpZXcsIGVsOiBIVE1MRWxlbWVudCwgdHlwZTogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcsIGJpbmRlcjogQmluZGVyPGFueT4sIGFyZ3M6IHN0cmluZ1tdLCBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycykge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICB0aGlzLmJpbmRlciA9IGJpbmRlcjtcbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIHRoaXMuZm9ybWF0dGVycyA9IGZvcm1hdHRlcnM7XG4gICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMgPSB7fTtcbiAgICB0aGlzLm1vZGVsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuXG4gIH1cblxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIG9iamVjdCBrZXlwYXRoXG4gICAqIEBwYXJhbSBvYmogXG4gICAqIEBwYXJhbSBrZXlwYXRoIFxuICAgKi9cbiAgb2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKTogT2JzZXJ2ZXIge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCB0aGlzKTtcbiAgfVxuXG4gIHBhcnNlVGFyZ2V0KCkge1xuICAgIGlmICh0aGlzLmtleXBhdGgpIHtcbiAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZSh0aGlzLmtleXBhdGgpO1xuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdG9rZW4udmFsdWU7XG4gICAgICB9IGVsc2UgaWYodG9rZW4udHlwZSA9PT0gS0VZUEFUSCl7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgaW4gdG9rZW4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXQgdGhlIGl0ZXJhdGlvbiBhbGlhcywgdXNlZCBpbiB0aGUgaW50ZXJhdGlvbiBiaW5kZXJzIGxpa2UgYGVhY2gtKmBcbiAgICogQHBhcmFtIHsqfSBtb2RlbE5hbWUgXG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pa2VyaWMvcml2ZXRzL2Jsb2IvbWFzdGVyL2Rpc3Qvcml2ZXRzLmpzI0wyNlxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMTE3NVxuICAgKi9cbiAgZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gJyUnICsgbW9kZWxOYW1lICsgJyUnO1xuICB9XG5cbiAgcGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJnczogc3RyaW5nW10sIGZvcm1hdHRlckluZGV4OiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIGFyZ3NcbiAgICAubWFwKHBhcnNlVHlwZSlcbiAgICAubWFwKCh7dHlwZSwgdmFsdWV9LCBhaSkgPT4ge1xuICAgICAgaWYgKHR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gcHJpbWl0aXZlVmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgLy8ga2V5cGF0aCBpcyBzdHJpbmdcbiAgICAgICAgY29uc3Qga2V5cGF0aCA9ICh2YWx1ZSBhcyBzdHJpbmcgKTtcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0pIHtcbiAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV07XG5cbiAgICAgICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgICAgIG9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIGtleXBhdGgpO1xuICAgICAgICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV0gPSBvYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIudmFsdWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBhcmd1bWVudCB0eXBlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbGwgdGhlIGN1cnJlbnQgZm9ybWF0dGVycyB0byB0aGUgc3VwcGxpZWQgdmFsdWUgYW5kIHJldHVybnMgdGhlXG4gICAqIGZvcm1hdHRlZCB2YWx1ZS5cbiAgICovXG4gIGZvcm1hdHRlZFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZSgocmVzdWx0OiBhbnkvKmNoZWNrIHR5cGUqLywgZGVjbGFyYXRpb246IHN0cmluZyAvKmNoZWNrIHR5cGUqLywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSBkZWNsYXJhdGlvbi5tYXRjaChGT1JNQVRURVJfQVJHUyk7XG4gICAgICBpZihhcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYXJncyBtYXRjaGVkIGZyb20gRk9STUFUVEVSX0FSR1MnKTtcbiAgICAgIH1cbiAgICAgIGxldCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGlmKCFpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGlkIGZvdW5kIGluIGFyZ3MnKTtcbiAgICAgIH1cbiAgICAgIGxldCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcblxuICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICBpZiAoZm9ybWF0dGVyICYmIChmb3JtYXR0ZXIucmVhZCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucmVhZChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIGJpbmRpbmcgYXJvdW5kIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAgICovXG4gIGV2ZW50SGFuZGxlcihmbjogZXZlbnRIYW5kbGVyRnVuY3Rpb24pOiAoZXY6IEV2ZW50KSA9PiBhbnkge1xuICAgIGxldCBiaW5kaW5nID0gdGhpcztcbiAgICBsZXQgaGFuZGxlciA9IGJpbmRpbmcudmlldy5vcHRpb25zLmhhbmRsZXI7XG5cbiAgICByZXR1cm4gKGV2KSA9PiB7XG4gICAgICBpZighaGFuZGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGhhbmRsZXIgZGVmaW5lZCBpbiBiaW5kaW5nLnZpZXcub3B0aW9ucy5oYW5kbGVyJyk7XG4gICAgICB9XG4gICAgICBoYW5kbGVyLmNhbGwoZm4sIHRoaXMsIGV2LCBiaW5kaW5nKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGZvciB0aGUgYmluZGluZy4gVGhpcyBCYXNpY2FsbHkganVzdCBydW5zIHRoZSBiaW5kaW5nIHJvdXRpbmVcbiAgICogd2l0aCB0aGUgc3VwcGxpZWQgdmFsdWUgZm9ybWF0dGVkLlxuICAgKi9cbiAgc2V0KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pICYmICEodGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+ICkuZnVuY3Rpb24pIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElPbmVXYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUuY2FsbCh0aGlzLm1vZGVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElUd29XYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIGxldCByb3V0aW5lRm47XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ3JvdXRpbmUnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICByb3V0aW5lRm4gPSB0aGlzLmJpbmRlci5yb3V0aW5lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSU9uZVdheUJpbmRlcjxhbnk+KTtcbiAgICAgIHJvdXRpbmVGbiA9IHRoaXMuYmluZGVyO1xuICAgIH1cblxuICAgIGlmIChyb3V0aW5lRm4gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcm91dGluZUZuLmNhbGwodGhpcywgdGhpcy5lbCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB1cCB0aGUgdmlldyBiaW5kaW5nIHdpdGggdGhlIG1vZGVsLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgdGhpcy5zZXQodGhpcy5vYnNlcnZlci52YWx1ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1Ymxpc2hlcyB0aGUgdmFsdWUgY3VycmVudGx5IHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudCBiYWNrIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIHB1Ymxpc2goKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVycy5yZWR1Y2VSaWdodCgocmVzdWx0OiBhbnkvKmNoZWNrIHR5cGUqLywgZGVjbGFyYXRpb246IHN0cmluZyAvKmNoZWNrIHR5cGUqLywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBhcmdzID0gZGVjbGFyYXRpb24uc3BsaXQoRk9STUFUVEVSX1NQTElUKTtcbiAgICAgICAgY29uc3QgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGlmKCFpZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWQgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICAgIGlmIChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLnB1Ymxpc2gpIHtcbiAgICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucHVibGlzaChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB0aGlzLmdldFZhbHVlKCh0aGlzLmVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpKSk7XG5cbiAgICAgIHRoaXMub2JzZXJ2ZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIHRoZSBtb2RlbCBmb3IgY2hhbmdlcyBhdCB0aGUgc3BlY2lmaWVkIGtleXBhdGguIEJpLWRpcmVjdGlvbmFsXG4gICAqIHJvdXRpbmVzIHdpbGwgYWxzbyBsaXN0ZW4gZm9yIGNoYW5nZXMgb24gdGhlIGVsZW1lbnQgdG8gcHJvcGFnYXRlIHRoZW0gYmFja1xuICAgKiB0byB0aGUgbW9kZWwuXG4gICAqL1xuICBiaW5kKCkge1xuICAgIHRoaXMucGFyc2VUYXJnZXQoKTtcblxuICAgIGlmICh0aGlzLmJpbmRlciAmJiB0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnYmluZCcpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICh0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYoIXRoaXMuYmluZGVyLmJpbmQgJiYgdHlwZW9mKHRoaXMuYmluZGVyLmJpbmQpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIG1ldGhvZCBiaW5kIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmJpbmRlci5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhKSB7XG4gICAgICB0aGlzLnN5bmMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmVzIGZyb20gdGhlIG1vZGVsIGFuZCB0aGUgZWxlbWVudC5cbiAgICovXG4gIHVuYmluZCgpIHtcbiAgICBpZih0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnYmluZCcpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmICh0aGlzLmJpbmRlci51bmJpbmQpIHtcbiAgICAgICAgdGhpcy5iaW5kZXIudW5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIudW5vYnNlcnZlKCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMpLmZvckVhY2goZmkgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmaV07XG5cbiAgICAgIE9iamVjdC5rZXlzKGFyZ3MpLmZvckVhY2goYWkgPT4ge1xuICAgICAgICBhcmdzW2FpXS51bm9ic2VydmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBiaW5kaW5nJ3MgbW9kZWwgZnJvbSB3aGF0IGlzIGN1cnJlbnRseSBzZXQgb24gdGhlIHZpZXcuIFVuYmluZHNcbiAgICogdGhlIG9sZCBtb2RlbCBmaXJzdCBhbmQgdGhlbiByZS1iaW5kcyB3aXRoIHRoZSBuZXcgbW9kZWwuXG4gICAqIEBwYXJhbSB7YW55fSBtb2RlbHMgXG4gICAqL1xuICB1cGRhdGUobW9kZWxzOiBhbnkgPSB7fSkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCd1cGRhdGUnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZiAodGhpcy5iaW5kZXIudXBkYXRlKSB7XG4gICAgICAgIHRoaXMuYmluZGVyLnVwZGF0ZS5jYWxsKHRoaXMsIG1vZGVscyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZWxlbWVudHMgdmFsdWVcbiAgICogQHBhcmFtIGVsIFxuICAgKi9cbiAgZ2V0VmFsdWUoZWw6IEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudCkge1xuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdnZXRWYWx1ZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmKHR5cGVvZih0aGlzLmJpbmRlci5nZXRWYWx1ZSkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRWYWx1ZSBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYmluZGVyLmdldFZhbHVlLmNhbGwodGhpcywgZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0SW5wdXRWYWx1ZShlbCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgdGlueWJpbmQgZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgRVhURU5TSU9OUywgT1BUSU9OUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5cbi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbi8vIGNvbXBvbmVudCB2aWV3IGVuY2Fwc3VsYXRlZCBhcyBhIGJpbmRpbmcgd2l0aGluIGl0J3MgcGFyZW50IHZpZXcuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmluZGluZyBleHRlbmRzIEJpbmRpbmcge1xuICB2aWV3O1xuICBlbDtcbiAgdHlwZTtcbiAgY29tcG9uZW50O1xuICBzdGF0aWM6IGFueTtcbiAgb2JzZXJ2ZXJzO1xuICB1cHN0cmVhbU9ic2VydmVycztcbiAgLy8gSW5pdGlhbGl6ZXMgYSBjb21wb25lbnQgYmluZGluZyBmb3IgdGhlIHNwZWNpZmllZCB2aWV3LiBUaGUgcmF3IGNvbXBvbmVudFxuICAvLyBlbGVtZW50IGlzIHBhc3NlZCBpbiBhbG9uZyB3aXRoIHRoZSBjb21wb25lbnQgdHlwZS4gQXR0cmlidXRlcyBhbmQgc2NvcGVcbiAgLy8gaW5mbGVjdGlvbnMgYXJlIGRldGVybWluZWQgYmFzZWQgb24gdGhlIGNvbXBvbmVudHMgZGVmaW5lZCBhdHRyaWJ1dGVzLlxuICBjb25zdHJ1Y3Rvcih2aWV3OiBWaWV3LCBlbDogRWxlbWVudCwgdHlwZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodmlldywgZWwsIHR5cGUsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wb25lbnQgPSB2aWV3Lm9wdGlvbnMuY29tcG9uZW50c1t0aGlzLnR5cGVdO1xuICAgIHRoaXMuc3RhdGljID0ge307XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTtcbiAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzID0ge307XG4gICAgXG4gICAgbGV0IGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcbiAgICBcbiAgICAvLyBwYXJzZSBjb21wb25lbnQgYXR0cmlidXRlc1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcblxuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyBub3Qgd2l0aCBiaW5kaW5nIHByZWZpeC4gRS5nLiBydi1cbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKGJpbmRpbmdQcmVmaXgpICE9PSAwKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSB0aGlzLmNhbWVsQ2FzZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICBsZXQgc3RhdCA9IHRoaXMuY29tcG9uZW50LnN0YXRpYztcbiAgICBcbiAgICAgICAgaWYgKHN0YXQgJiYgc3RhdC5pbmRleE9mKHByb3BlcnR5TmFtZSkgPiAtMSkge1xuICAgICAgICAgIHRoaXMuc3RhdGljW3Byb3BlcnR5TmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgICB0aGlzLnN0YXRpY1twcm9wZXJ0eU5hbWVdID0gdG9rZW4udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgICAgdGhpcy5vYnNlcnZlcnNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gICAgXG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnN5bmNgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kIHRvXG4gIC8vIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgc3luYygpIHt9XG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnVwZGF0ZWAgc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmRcbiAgLy8gdG8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICB1cGRhdGUoKSB7fVxuICAgIFxuICAvLyBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpwdWJsaXNoYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAvLyB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gIHB1Ymxpc2goKSB7fVxuICAgIFxuICAvLyBSZXR1cm5zIGFuIG9iamVjdCBtYXAgdXNpbmcgdGhlIGNvbXBvbmVudCdzIHNjb3BlIGluZmxlY3Rpb25zLlxuICBsb2NhbHMoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3RhdGljKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICByZXN1bHRba2V5XSA9IHRoaXMuc3RhdGljW2tleV07XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgICBcbiAgLy8gUmV0dXJucyBhIGNhbWVsLWNhc2VkIHZlcnNpb24gb2YgdGhlIHN0cmluZy4gVXNlZCB3aGVuIHRyYW5zbGF0aW5nIGFuXG4gIC8vIGVsZW1lbnQncyBhdHRyaWJ1dGUgbmFtZSBpbnRvIGEgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGNvbXBvbmVudCdzIHNjb3BlLlxuICBjYW1lbENhc2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8tKFthLXpdKS9nLCBncm91cGVkID0+IHtcbiAgICAgIHJldHVybiBncm91cGVkWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cbiAgICBcbiAgLy8gSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6YmluZGAgdG8gYnVpbGQgYHRoaXMuY29tcG9uZW50Vmlld2Agd2l0aCBhIGxvY2FsaXplZFxuICAvLyBtYXAgb2YgbW9kZWxzIGZyb20gdGhlIHJvb3Qgdmlldy4gQmluZCBgdGhpcy5jb21wb25lbnRWaWV3YCBvbiBzdWJzZXF1ZW50IGNhbGxzLlxuICBiaW5kKCkge1xuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgaWYgKCF0aGlzLmJvdW5kKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQga2V5cGF0aCA9IHRoaXMub2JzZXJ2ZXJzW2tleV07XG4gICAgXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywga2V5cGF0aCwgKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSA9IHRoaXMub2JzZXJ2ZXJzW2tleV0udmFsdWUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIGtleSkpO1xuICAgICAgfSk7XG4gICAgXG4gICAgICB0aGlzLmJvdW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LmJpbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy5lbC5fYm91bmQgPSB0cnVlO1xuICAgIFxuICAgIFxuICAgICAgRVhURU5TSU9OUy5mb3JFYWNoKGV4dGVuc2lvblR5cGUgPT4ge1xuICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdID0ge307XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFtleHRlbnNpb25UeXBlXSkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50W2V4dGVuc2lvblR5cGVdKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdW2tleV0gPSB0aGlzLmNvbXBvbmVudFtleHRlbnNpb25UeXBlXVtrZXldO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudmlldy5vcHRpb25zW2V4dGVuc2lvblR5cGVdKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKG9wdGlvbnNbZXh0ZW5zaW9uVHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgb3B0aW9uc1tleHRlbnNpb25UeXBlXVtrZXldID0gdGhpcy52aWV3W2V4dGVuc2lvblR5cGVdW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIFxuICAgICAgT1BUSU9OUy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFtvcHRpb25dICE9IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zW29wdGlvbl0gPSB0aGlzLmNvbXBvbmVudFtvcHRpb25dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnNbb3B0aW9uXSA9IHRoaXMudmlld1tvcHRpb25dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBcbiAgICAgIC8vdGhlcmUncyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHRoYXQgbWFrZXMgaW1wb3J0ZWQgVmlldyBhIGR1bW15IG9iamVjdC4gVXNlIHRpbnliaW5kLmJpbmRcbiAgICAgIC8vdGhpcy5jb21wb25lbnRWaWV3ID0gbmV3IFZpZXcodGhpcy5lbCwgc2NvcGUsIG9wdGlvbnMpXG4gICAgICAvL3RoaXMuY29tcG9uZW50Vmlldy5iaW5kKClcbiAgICAgIHRoaXMuY29tcG9uZW50VmlldyA9IHRpbnliaW5kLmJpbmQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbC5jaGlsZE5vZGVzKSwgc2NvcGUsIG9wdGlvbnMpO1xuICAgIFxuICAgICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnNba2V5XTtcbiAgICAgICAgbGV0IG1vZGVscyA9IHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHM7XG4gICAgXG4gICAgICAgIGxldCB1cHN0cmVhbSA9IHRoaXMub2JzZXJ2ZShtb2RlbHMsIGtleSwgKChrZXksIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLnNldFZhbHVlKHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkuY2FsbCh0aGlzLCBrZXksIG9ic2VydmVyKSk7XG4gICAgXG4gICAgICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnNba2V5XSA9IHVwc3RyZWFtO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gICAgXG4gIC8vIEludGVyY2VwdCBgdGlueWJpbmQuQmluZGluZzo6dW5iaW5kYCB0byBiZSBjYWxsZWQgb24gYHRoaXMuY29tcG9uZW50Vmlld2AuXG4gIHVuYmluZCgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxufSIsImV4cG9ydCB0eXBlIFRFeHRlbnNpb25LZXkgPSAnYmluZGVycycgfCAnZm9ybWF0dGVycycgfCAnY29tcG9uZW50cycgfCAnYWRhcHRlcnMnO1xuXG5leHBvcnQgY29uc3QgT1BUSU9OUyA9IFtcbiAgJ3ByZWZpeCcsXG4gICd0ZW1wbGF0ZURlbGltaXRlcnMnLFxuICAncm9vdEludGVyZmFjZScsXG4gICdwcmVsb2FkRGF0YScsXG4gICdoYW5kbGVyJ1xuXTtcblxuZXhwb3J0IGNvbnN0IEVYVEVOU0lPTlMgPSBbXG4gICdiaW5kZXJzJyxcbiAgJ2Zvcm1hdHRlcnMnLFxuICAnY29tcG9uZW50cycsXG4gICdhZGFwdGVycydcbl07IiwiZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVyIHtcbiAgKHZhbDogYW55LCAuLi5hcmdzOiBhbnlbXSk6IGFueTtcbiAgcmVhZD86IChyZXN1bHQ6IHN0cmluZywgLi4ucHJvY2Vzc2VkQXJnczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHB1Ymxpc2g/OiAocmVzdWx0OiBzdHJpbmcsIC4uLnByb2Nlc3NlZEFyZ3M6IHN0cmluZ1tdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXJzIHtcbiAgW25hbWU6IHN0cmluZ106IElGb3JtYXR0ZXI7XG59XG5cbmNvbnN0IGZvcm1hdHRlcnM6IElGb3JtYXR0ZXJzID0ge307XG5cbmZvcm1hdHRlcnMubm90ID0gZnVuY3Rpb24gKHZhbHVlOiBib29sZWFuKSB7XG4gIHJldHVybiAhdmFsdWU7XG59O1xuXG5leHBvcnQgeyBmb3JtYXR0ZXJzIH07XG4iLCJcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5cbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gJy4vZXhwb3J0JztcblxuZXhwb3J0IGludGVyZmFjZSBJQ2FsbGJhY2sge1xuICBzeW5jOiAoKSA9PiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJS2V5IHtcbiAgcGF0aDogYW55O1xuICBpOiBSb290O1xufVxuXG5leHBvcnQgdHlwZSBPYmogPSBhbnk7XG5cbmV4cG9ydCB0eXBlIFJvb3QgPSBhbnk7XG5cbi8vIENoZWNrIGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0IHRoYW4gY2FuIGJlIG9ic2VydmVkLlxuZnVuY3Rpb24gaXNPYmplY3Qob2JqOiBPYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbFxufVxuXG4vLyBFcnJvciB0aHJvd2VyLlxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIHRocm93IG5ldyBFcnJvcignW09ic2VydmVyXSAnICsgbWVzc2FnZSlcbn1cblxuLy8gVE9ET1xubGV0IGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG5sZXQgaW50ZXJmYWNlczogc3RyaW5nW107XG5sZXQgcm9vdEludGVyZmFjZTogUm9vdDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcbiAga2V5cGF0aDogc3RyaW5nO1xuICBjYWxsYmFjazogSUNhbGxiYWNrO1xuICBvYmplY3RQYXRoOiBPYmpbXTtcbiAgb2JqOiBPYmo7XG4gIHRhcmdldDogT2JqO1xuICBrZXk6IElLZXk7XG4gIHRva2VuczogSUtleVtdO1xuICAvLyBDb25zdHJ1Y3RzIGEgbmV3IGtleXBhdGggb2JzZXJ2ZXIgYW5kIGtpY2tzIHRoaW5ncyBvZmYuXG4gIGNvbnN0cnVjdG9yKG9iajogT2JqLCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJQ2FsbGJhY2spIHtcbiAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLm9iamVjdFBhdGggPSBbXTtcbiAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHRoaXMucGFyc2UoKTtcbiAgICB0aGlzLmtleSA9IHBhcnNlUmVzdWx0LmtleTtcbiAgICB0aGlzLnRva2VucyA9IHBhcnNlUmVzdWx0LnRva2VucztcbiAgICB0aGlzLm9iaiA9IHRoaXMuZ2V0Um9vdE9iamVjdChvYmopO1xuICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5yZWFsaXplKCk7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnM6IElWaWV3T3B0aW9ucykge1xuICAgIGFkYXB0ZXJzID0gb3B0aW9ucy5hZGFwdGVycztcbiAgICBpbnRlcmZhY2VzID0gT2JqZWN0LmtleXMoYWRhcHRlcnMpO1xuICAgIHJvb3RJbnRlcmZhY2UgPSBvcHRpb25zLnJvb3RJbnRlcmZhY2U7XG4gIH1cbiAgXG4gIC8vIFRva2VuaXplcyB0aGUgcHJvdmlkZWQga2V5cGF0aCBzdHJpbmcgaW50byBpbnRlcmZhY2UgKyBwYXRoIHRva2VucyBmb3IgdGhlXG4gIC8vIG9ic2VydmVyIHRvIHdvcmsgd2l0aC5cbiAgc3RhdGljIHRva2VuaXplID0gZnVuY3Rpb24oa2V5cGF0aDogc3RyaW5nLCByb290OiBSb290KSB7XG4gICAgdmFyIHRva2VuczogYW55W10gPSBbXTtcbiAgICB2YXIgY3VycmVudDogSUtleSA9IHtpOiByb290LCBwYXRoOiAnJ307XG4gICAgdmFyIGluZGV4OiBudW1iZXI7XG4gICAgdmFyIGNocjogc3RyaW5nO1xuICBcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBrZXlwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY2hyID0ga2V5cGF0aC5jaGFyQXQoaW5kZXgpO1xuICBcbiAgICAgIGlmICghIX5pbnRlcmZhY2VzLmluZGV4T2YoY2hyKSkge1xuICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICAgICAgY3VycmVudCA9IHtpOiBjaHIsIHBhdGg6ICcnfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQucGF0aCArPSBjaHI7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG4gIFxuICAvLyBQYXJzZXMgdGhlIGtleXBhdGggdXNpbmcgdGhlIGludGVyZmFjZXMgZGVmaW5lZCBvbiB0aGUgdmlldy4gU2V0cyB2YXJpYWJsZXNcbiAgLy8gZm9yIHRoZSB0b2tlbml6ZWQga2V5cGF0aCBhcyB3ZWxsIGFzIHRoZSBlbmQga2V5LlxuICBwYXJzZSgpIHtcbiAgICB2YXIgcGF0aDogc3RyaW5nO1xuICAgIHZhciByb290OiBSb290O1xuICBcbiAgICBpZiAoIWludGVyZmFjZXMubGVuZ3RoKSB7XG4gICAgICBlcnJvcignTXVzdCBkZWZpbmUgYXQgbGVhc3Qgb25lIGFkYXB0ZXIgaW50ZXJmYWNlLicpO1xuICAgIH1cbiAgXG4gICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZih0aGlzLmtleXBhdGhbMF0pKSB7XG4gICAgICByb290ID0gdGhpcy5rZXlwYXRoWzBdO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aC5zdWJzdHIoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSByb290SW50ZXJmYWNlO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aDtcbiAgICB9XG4gIFxuICAgIHRoaXMudG9rZW5zID0gT2JzZXJ2ZXIudG9rZW5pemUocGF0aCwgcm9vdCk7XG5cbiAgICBpZighdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHRva2VucycpO1xuICAgIH1cblxuICAgIHRoaXMua2V5ID0gKHRoaXMudG9rZW5zLnBvcCgpIGFzIElLZXkpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgdG9rZW5zOiB0aGlzLnRva2VucyxcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWxpemVzIHRoZSBmdWxsIGtleXBhdGgsIGF0dGFjaGluZyBvYnNlcnZlcnMgZm9yIGV2ZXJ5IGtleSBhbmQgY29ycmVjdGluZ1xuICAvLyBvbGQgb2JzZXJ2ZXJzIHRvIGFueSBjaGFuZ2VkIG9iamVjdHMgaW4gdGhlIGtleXBhdGguXG4gIHJlYWxpemUoKSB7XG4gICAgdmFyIGN1cnJlbnQ6IE9iaiA9IHRoaXMub2JqXG4gICAgdmFyIHVucmVhY2hlZCA9IC0xXG4gICAgdmFyIHByZXZcbiAgICB2YXIgdG9rZW5cbiAgXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1tpbmRleF1cbiAgICAgIGlmIChpc09iamVjdChjdXJyZW50KSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQgIT09IChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5vYmplY3RQYXRoW2luZGV4XSA9IGN1cnJlbnRcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgdGhpcy5vYmplY3RQYXRoW2luZGV4XSA9IGN1cnJlbnRcbiAgICAgICAgfVxuICBcbiAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHRva2VuLCBjdXJyZW50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHVucmVhY2hlZCA9PT0gLTEpIHtcbiAgICAgICAgICB1bnJlYWNoZWQgPSBpbmRleFxuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAocHJldiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIHByZXYsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmICh1bnJlYWNoZWQgIT09IC0xKSB7XG4gICAgICB0aGlzLm9iamVjdFBhdGguc3BsaWNlKHVucmVhY2hlZClcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdXJyZW50XG4gIH1cbiAgXG4gIC8vIFVwZGF0ZXMgdGhlIGtleXBhdGguIFRoaXMgaXMgY2FsbGVkIHdoZW4gYW55IGludGVybWVkaWFyeSBrZXkgaXMgY2hhbmdlZC5cbiAgc3luYygpIHtcbiAgICB2YXIgbmV4dCwgb2xkVmFsdWUsIG5ld1ZhbHVlXG4gIFxuICAgIGlmICgobmV4dCA9IHRoaXMucmVhbGl6ZSgpKSAhPT0gdGhpcy50YXJnZXQpIHtcbiAgICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICAgIH1cbiAgXG4gICAgICBpZiAoaXNPYmplY3QobmV4dCkpIHtcbiAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIG5leHQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgb2xkVmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIHRoaXMudGFyZ2V0ID0gbmV4dFxuICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUgfHwgbmV3VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9IGVsc2UgaWYgKG5leHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gUmV0dXJucyB1bmRlZmluZWQgaWZcbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZS5cbiAgdmFsdWUoKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5LCB0aGlzLnRhcmdldClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNldHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBDYWxsaW5nIHNldFZhbHVlIHdoZW5cbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZSBpcyBhIG5vLW9wLlxuICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgYWRhcHRlcnNbdGhpcy5rZXkuaV0uc2V0KHRoaXMudGFyZ2V0LCB0aGlzLmtleS5wYXRoLCB2YWx1ZSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEdldHMgdGhlIHByb3ZpZGVkIGtleSBvbiBhbiBvYmplY3QuXG4gIGdldChrZXk6IElLZXksIG9iajogT2JqKSB7XG4gICAgcmV0dXJuIGFkYXB0ZXJzW2tleS5pXS5nZXQob2JqLCBrZXkucGF0aClcbiAgfVxuICBcbiAgLy8gT2JzZXJ2ZXMgb3IgdW5vYnNlcnZlcyBhIGNhbGxiYWNrIG9uIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGtleS5cbiAgc2V0KGFjdGl2ZTogYm9vbGVhbiwga2V5OiBJS2V5LCBvYmo6IE9iaiwgY2FsbGJhY2s6IElDYWxsYmFjaykge1xuICAgIGlmKGFjdGl2ZSkge1xuICAgICAgYWRhcHRlcnNba2V5LmldLm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkYXB0ZXJzW2tleS5pXS51bm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIFxuICBcbiAgLy8gVW5vYnNlcnZlcyB0aGUgZW50aXJlIGtleXBhdGguXG4gIHVub2JzZXJ2ZSgpIHtcbiAgICB2YXIgb2JqOiBPYmo7XG4gICAgdmFyIHRva2VuO1xuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKG9iaiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBvYmosIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldChmYWxzZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKVxuICAgIH1cbiAgfVxuICAvLyB0cmF2ZXJzZSB0aGUgc2NvcGUgY2hhaW4gdG8gZmluZCB0aGUgc2NvcGUgd2hpY2ggaGFzIHRoZSByb290IHByb3BlcnR5XG4gIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgZm91bmQgaW4gY2hhaW4sIHJldHVybnMgdGhlIHJvb3Qgc2NvcGVcbiAgZ2V0Um9vdE9iamVjdChvYmo6IE9iaikge1xuICAgIHZhciByb290UHJvcCwgY3VycmVudDtcbiAgICBpZiAoIW9iai4kcGFyZW50KSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgcm9vdFByb3AgPSB0aGlzLnRva2Vuc1swXS5wYXRoXG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy5rZXkucGF0aFxuICAgIH1cbiAgXG4gICAgY3VycmVudCA9IG9iajtcbiAgICB3aGlsZSAoY3VycmVudC4kcGFyZW50ICYmIChjdXJyZW50W3Jvb3RQcm9wXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQuJHBhcmVudFxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH1cbn1cbiIsIi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbmNvbnN0IFFVT1RFRF9TVFIgPSAvXicuKickfF5cIi4qXCIkLzsgLy8gcmVnZXggdG8gdGVzdCBpZiBzdHJpbmcgaXMgd3JhcHBlZCBpbiBcIiBvciAnXG5cbi8vIFVzZWQgaW4gcGFyc2Vycy5wYXJzZVRlbXBsYXRlXG5jb25zdCBURVhUID0gMDtcbmNvbnN0IEJJTkRJTkcgPSAxO1xuXG4vLyBUZXN0IGlmIHN0cmluZyBpcyBhIGpzb24gc3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gaXNKc29uKHN0cjogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdmFsID0gSlNPTi5wYXJzZShzdHIpO1xuICAgIHJldHVybiAodmFsIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsIGluc3RhbmNlb2YgT2JqZWN0KSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gUGFyc2VyIGFuZCB0b2tlbml6ZXIgZm9yIGdldHRpbmcgdGhlIHR5cGUgYW5kIHZhbHVlIGZyb20gYSBzdHJpbmcuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUeXBlKHN0cmluZzogc3RyaW5nKSB7XG4gIGxldCB0eXBlID0gUFJJTUlUSVZFO1xuICBsZXQgdmFsdWU6IGFueSA9IHN0cmluZztcbiAgaWYgKFFVT1RFRF9TVFIudGVzdChzdHJpbmcpKSB7XG4gICAgdmFsdWUgPSBzdHJpbmcuc2xpY2UoMSwgLTEpO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgdmFsdWUgPSB0cnVlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ2ZhbHNlJykge1xuICAgIHZhbHVlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAnbnVsbCcpIHtcbiAgICB2YWx1ZSA9IG51bGw7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKCFpc05hTihOdW1iZXIoc3RyaW5nKSkpIHtcbiAgICB2YWx1ZSA9IE51bWJlcihzdHJpbmcpO1xuICB9IGVsc2UgaWYgKGlzSnNvbihzdHJpbmcpKSB7XG4gICAgdmFsdWUgPSBKU09OLnBhcnNlKHN0cmluZyk7XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IEtFWVBBVEg7XG4gIH1cbiAgcmV0dXJuIHt0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWV9O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRva2VucyB7XG4gIHR5cGU6IG51bWJlcjtcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuLy8gVGVtcGxhdGUgcGFyc2VyIGFuZCB0b2tlbml6ZXIgZm9yIG11c3RhY2hlLXN0eWxlIHRleHQgY29udGVudCBiaW5kaW5ncy5cbi8vIFBhcnNlcyB0aGUgdGVtcGxhdGUgYW5kIHJldHVybnMgYSBzZXQgb2YgdG9rZW5zLCBzZXBhcmF0aW5nIHN0YXRpYyBwb3J0aW9uc1xuLy8gb2YgdGV4dCBmcm9tIGJpbmRpbmcgZGVjbGFyYXRpb25zLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgZGVsaW1pdGVyczogc3RyaW5nW10pIHtcbiAgdmFyIHRva2VuczogSVRva2Vuc1tdIHwgbnVsbCA9IG51bGw7XG4gIGxldCBsZW5ndGggPSB0ZW1wbGF0ZS5sZW5ndGg7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBsYXN0SW5kZXggPSAwO1xuICBsZXQgb3BlbiA9IGRlbGltaXRlcnNbMF0sIGNsb3NlID0gZGVsaW1pdGVyc1sxXTtcblxuICB3aGlsZSAobGFzdEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKG9wZW4sIGxhc3RJbmRleCk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zID0gdG9rZW5zIHx8IFtdO1xuICAgICAgaWYgKGluZGV4ID4gMCAmJiBsYXN0SW5kZXggPCBpbmRleCkge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgb3Blbi5sZW5ndGg7XG4gICAgICBpbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoY2xvc2UsIGxhc3RJbmRleCk7XG5cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgbGV0IHN1YnN0cmluZyA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCAtIGNsb3NlLmxlbmd0aCk7XG4gICAgICAgIGxldCBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09IFRFWFQpIHtcbiAgICAgICAgICBsYXN0VG9rZW4udmFsdWUgKz0gc3Vic3RyaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgICB2YWx1ZTogc3Vic3RyaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlID0gdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleCkudHJpbSgpO1xuXG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IEJJTkRJTkcsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgY2xvc2UubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG4iLCJpbXBvcnQgeyBFWFRFTlNJT05TIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgcGFyc2VUZW1wbGF0ZSwgcGFyc2VUeXBlIH0gZnJvbSAnLi9wYXJzZXJzJztcbmltcG9ydCB7IElGb3JtYXR0ZXJzLCBmb3JtYXR0ZXJzIH0gZnJvbSAnLi9mb3JtYXR0ZXJzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IGFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCBiaW5kZXJzIGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBJQmluZGVycyB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBPYnNlcnZlciwgUm9vdCB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSUNvbXBvbmVudHMgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zIHtcbiAgLy8gQXR0cmlidXRlIHByZWZpeCBpbiB0ZW1wbGF0ZXNcbiAgcHJlZml4Pzogc3RyaW5nO1xuXG4gIC8vUHJlbG9hZCB0ZW1wbGF0ZXMgd2l0aCBpbml0aWFsIGRhdGEgb24gYmluZFxuICBwcmVsb2FkRGF0YT86IGJvb2xlYW47XG5cbiAgLy9Sb290IHNpZ2h0Z2xhc3MgaW50ZXJmYWNlIGZvciBrZXlwYXRoc1xuICByb290SW50ZXJmYWNlPzogc3RyaW5nO1xuXG4gIC8vIFRlbXBsYXRlIGRlbGltaXRlcnMgZm9yIHRleHQgYmluZGluZ3NcbiAgdGVtcGxhdGVEZWxpbWl0ZXJzPzogQXJyYXk8c3RyaW5nPlxuXG4gIC8vIEF1Z21lbnQgdGhlIGV2ZW50IGhhbmRsZXIgb2YgdGhlIG9uLSogYmluZGVyXG4gIGhhbmRsZXI/OiBGdW5jdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRXh0ZW5zaW9ucyB7XG4gIGJpbmRlcnM6IElCaW5kZXJzPGFueT47XG4gIGZvcm1hdHRlcnM6IElGb3JtYXR0ZXJzO1xuICBjb21wb25lbnRzOiBJQ29tcG9uZW50cztcbiAgYWRhcHRlcnM6IElBZGFwdGVycztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uc1BhcmFtIGV4dGVuZHMgSUV4dGVuc2lvbnMsIElPcHRpb25zIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdPcHRpb25zIGV4dGVuZHMgSU9wdGlvbnNQYXJhbSB7XG4gIHN0YXJCaW5kZXJzOiBhbnk7XG4gIC8vIHNpZ2h0Z2xhc3NcbiAgcm9vdEludGVyZmFjZTogUm9vdDtcbn1cblxuLy8gVE9ETyBtb3ZlIHRvIHVpdGlsc1xuY29uc3QgbWVyZ2VPYmplY3QgPSAodGFyZ2V0OiBhbnksIG9iajogYW55KSA9PiB7XG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmICghdGFyZ2V0W2tleV0gfHwgdGFyZ2V0W2tleV0gPT09IHt9KSB7XG4gICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7IFxufTtcblxuY29uc3QgdGlueWJpbmQgPSB7XG4gIC8vIEdsb2JhbCBiaW5kZXJzLlxuICBiaW5kZXJzOiBiaW5kZXJzLFxuXG4gIC8vIEdsb2JhbCBjb21wb25lbnRzLlxuICBjb21wb25lbnRzOiB7fSxcblxuICAvLyBHbG9iYWwgZm9ybWF0dGVycy5cbiAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBmb3JtYXR0ZXJzLFxuXG4gIC8vIEdsb2JhbCBzaWdodGdsYXNzIGFkYXB0ZXJzLlxuICBhZGFwdGVyczoge1xuICAgICcuJzogYWRhcHRlcixcbiAgfSxcblxuICAvLyBEZWZhdWx0IGF0dHJpYnV0ZSBwcmVmaXguXG4gIF9wcmVmaXg6ICdydicsXG5cbiAgX2Z1bGxQcmVmaXg6ICdydi0nLFxuXG4gIGdldCBwcmVmaXggKCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH0sXG5cbiAgc2V0IHByZWZpeCAodmFsdWUpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgICB0aGlzLl9mdWxsUHJlZml4ID0gdmFsdWUgKyAnLSc7XG4gIH0sXG5cbiAgcGFyc2VUZW1wbGF0ZTogcGFyc2VUZW1wbGF0ZSxcblxuICBwYXJzZVR5cGU6IHBhcnNlVHlwZSxcblxuICAvLyBEZWZhdWx0IHRlbXBsYXRlIGRlbGltaXRlcnMuXG4gIHRlbXBsYXRlRGVsaW1pdGVyczogWyd7JywgJ30nXSxcblxuICAvLyBEZWZhdWx0IHNpZ2h0Z2xhc3Mgcm9vdCBpbnRlcmZhY2UuXG4gIHJvb3RJbnRlcmZhY2U6ICcuJyxcblxuICAvLyBQcmVsb2FkIGRhdGEgYnkgZGVmYXVsdC5cbiAgcHJlbG9hZERhdGE6IHRydWUsXG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZXZlbnQgaGFuZGxlci5cbiAgICogVE9ETyBpcyB0aGlzIHVzZWQ/XG4gICAqL1xuICBoYW5kbGVyKGNvbnRleHQ6IGFueSwgZXY6IEV2ZW50LCBiaW5kaW5nOiBCaW5kaW5nKSB7XG4gICAgLy8gY29uc29sZS53YXJuKCd5ZXMgaXQgaXMgdXNlZCcpO1xuICAgIHRoaXMuY2FsbChjb250ZXh0LCBldiwgYmluZGluZy52aWV3Lm1vZGVscyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC4gSWYgbm8gYmluZGVyIGFib3ZlIGlzIG1hdGNoZWQgaXQgd2lsbCBmYWxsXG4gICAqIGJhY2sgdG8gdXNpbmcgdGhpcyBiaW5kZXIuXG4gICAqL1xuICBmYWxsYmFja0JpbmRlcihlbDogSFRNTEVsZW1lbnQsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSh0aGlzLnR5cGUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKHRoaXMudHlwZSk7XG4gICAgfSAgXG4gIH0sXG5cbiAgLy8gTWVyZ2VzIGFuIG9iamVjdCBsaXRlcmFsIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9wdGlvbnMuXG4gIGNvbmZpZ3VyZShvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbWVyZ2VPYmplY3QodGhpcy5iaW5kZXJzLCBvcHRpb25zLmJpbmRlcnMpO1xuICAgIC8vIG1lcmdlT2JqZWN0KHRoaXMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICAvLyBtZXJnZU9iamVjdCh0aGlzLmNvbXBvbmVudHMsIG9wdGlvbnMuY29tcG9uZW50cyk7XG4gICAgLy8gbWVyZ2VPYmplY3QodGhpcy5hZGFwdGVycywgb3B0aW9ucy5hZGFwdGVycyk7XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBvcHRpb25zW29wdGlvbl07XG5cbiAgICAgIGlmIChFWFRFTlNJT05TLmluZGV4T2Yob3B0aW9uKSA+IC0xKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgdGhpc1tvcHRpb25dW2tleV0gPSB2YWx1ZVtrZXldO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbb3B0aW9uXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8vIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIGEgY29tcG9uZW50IG9uIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBhbmRcbiAgLy8gcmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXHRcbiAgaW5pdDogKGNvbXBvbmVudEtleTogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQsIGRhdGEgPSB7fSkgPT4ge1xuICAgIGlmICghZWwpIHtcbiAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50ID0gdGlueWJpbmQuY29tcG9uZW50c1tjb21wb25lbnRLZXldO1xuICAgIGVsLmlubmVySFRNTCA9IGNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRpbnliaW5kLCBlbCk7XG4gICAgbGV0IHNjb3BlID0gY29tcG9uZW50LmluaXRpYWxpemUuY2FsbCh0aW55YmluZCwgZWwsIGRhdGEpO1xuXG4gICAgbGV0IHZpZXcgPSB0aW55YmluZC5iaW5kKGVsLCBzY29wZSk7XG4gICAgdmlldy5iaW5kKCk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH0sXG5cbiAgLy8gQmluZHMgc29tZSBkYXRhIHRvIGEgdGVtcGxhdGUgLyBlbGVtZW50LiBSZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cbiAgYmluZDogKGVsOiBIVE1MRWxlbWVudCwgbW9kZWxzOiBhbnksIG9wdGlvbnM/OiBJT3B0aW9uc1BhcmFtKSA9PiB7XG4gICAgbGV0IHZpZXdPcHRpb25zOiBJVmlld09wdGlvbnMgPSB7XG4gICAgICAvLyBFWFRFTlNJT05TXG4gICAgICBiaW5kZXJzOiA8SUJpbmRlcnM8YW55Pj4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGZvcm1hdHRlcnM6IDxJRm9ybWF0dGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGNvbXBvbmVudHM6IDxJQ29tcG9uZW50cz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGFkYXB0ZXJzOiA8SUFkYXB0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgLy8gb3RoZXJcbiAgICAgIHN0YXJCaW5kZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgLy8gc2lnaHRnbGFzc1xuICAgICAgcm9vdEludGVyZmFjZTogPFJvb3Q+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgfTtcbiAgICBtb2RlbHMgPSBtb2RlbHMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAvLyBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIG9wdGlvbnMuYmluZGVycyk7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCBvcHRpb25zLmZvcm1hdHRlcnMpO1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuY29tcG9uZW50cywgb3B0aW9ucy5jb21wb25lbnRzKTtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCBvcHRpb25zLmFkYXB0ZXJzKTtcbiAgICB9XG5cbiAgICB2aWV3T3B0aW9ucy5wcmVmaXggPSBvcHRpb25zICYmIG9wdGlvbnMucHJlZml4ID8gb3B0aW9ucy5wcmVmaXggOiB0aW55YmluZC5wcmVmaXhcbiAgICB2aWV3T3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPSBvcHRpb25zICYmIG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID8gb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgOiB0aW55YmluZC50ZW1wbGF0ZURlbGltaXRlcnNcbiAgICB2aWV3T3B0aW9ucy5yb290SW50ZXJmYWNlID0gb3B0aW9ucyAmJiBvcHRpb25zLnJvb3RJbnRlcmZhY2UgPyBvcHRpb25zLnJvb3RJbnRlcmZhY2UgOiB0aW55YmluZC5yb290SW50ZXJmYWNlXG4gICAgdmlld09wdGlvbnMucHJlbG9hZERhdGEgPSBvcHRpb25zICYmIG9wdGlvbnMucHJlbG9hZERhdGEgPyBvcHRpb25zLnByZWxvYWREYXRhIDogdGlueWJpbmQucHJlbG9hZERhdGFcbiAgICB2aWV3T3B0aW9ucy5oYW5kbGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmhhbmRsZXIgPyBvcHRpb25zLmhhbmRsZXIgOiB0aW55YmluZC5oYW5kbGVyXG5cbiAgICAvLyBtZXJnZSBleHRlbnNpb25zXG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYmluZGVycywgdGlueWJpbmQuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgdGlueWJpbmQuZm9ybWF0dGVycyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuY29tcG9uZW50cywgdGlueWJpbmQuY29tcG9uZW50cyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYWRhcHRlcnMsIHRpbnliaW5kLmFkYXB0ZXJzKTtcblxuICAgIC8vIGdldCBhbGwgc3RhckJpbmRlcnMgZnJvbSBhdmFpbGFibGUgYmluZGVyc1xuICAgIHZpZXdPcHRpb25zLnN0YXJCaW5kZXJzID0gT2JqZWN0LmtleXModmlld09wdGlvbnMuYmluZGVycykuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBrZXkuaW5kZXhPZignKicpID4gMDtcbiAgICB9KTtcblxuICAgIE9ic2VydmVyLnVwZGF0ZU9wdGlvbnModmlld09wdGlvbnMpO1xuXG4gICAgbGV0IHZpZXcgPSBuZXcgVmlldyhlbCwgbW9kZWxzLCB2aWV3T3B0aW9ucyk7XG4gICAgdmlldy5iaW5kKCk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0aW55YmluZDtcbiIsImltcG9ydCB0aW55YmluZCBmcm9tICcuL3RpbnliaW5kJztcbmltcG9ydCB7IEJpbmRlciwgSVR3b1dheUJpbmRlciB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IENvbXBvbmVudEJpbmRpbmcgfSBmcm9tICcuL2NvbXBvbmVudC1iaW5kaW5nJztcbmltcG9ydCB7IHBhcnNlVGVtcGxhdGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi9leHBvcnQnO1xuLy8gaW1wb3J0IHsgTm9kZSB9IGZyb20gJ2JhYmVsLXR5cGVzJztcblxuZXhwb3J0IHR5cGUgVEJsb2NrID0gYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGRhdGE/OiBzdHJpbmc7XG4gIF9ib3VuZD86IGJvb2xlYW5cbn1cblxuY29uc3QgdGV4dEJpbmRlcjogSVR3b1dheUJpbmRlcjxzdHJpbmc+ID0ge1xuICByb3V0aW5lOiAobm9kZTogSURhdGFFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgbm9kZS5kYXRhID0gKHZhbHVlICE9IG51bGwpID8gdmFsdWUgOiAnJztcbiAgfVxufTtcblxuY29uc3QgREVDTEFSQVRJT05fU1BMSVQgPSAvKCg/OidbXiddKicpKig/Oig/OlteXFx8J10qKD86J1teJ10qJykrW15cXHwnXSopK3xbXlxcfF0rKSl8XiQvZztcblxuY29uc3QgcGFyc2VOb2RlID0gKHZpZXc6IFZpZXcsIG5vZGU6IElEYXRhRWxlbWVudCkgPT4ge1xuICBsZXQgYmxvY2s6IFRCbG9jayA9IGZhbHNlO1xuXG4gIC8vIGlmIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFXG4gIG5vZGUgPSAoIG5vZGUgYXMgSURhdGFFbGVtZW50KTtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICBpZighbm9kZS5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vZGUgaGFzIG5vIGRhdGEnKTtcbiAgICB9XG4gICAgbGV0IHRva2VucyA9IHBhcnNlVGVtcGxhdGUobm9kZS5kYXRhLCB0aW55YmluZC50ZW1wbGF0ZURlbGltaXRlcnMpO1xuXG4gICAgaWYgKHRva2Vucykge1xuICAgICAgaWYoIW5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9rZW4udmFsdWUpO1xuICAgICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRleHQsIG5vZGUpO1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMSkge1xuICAgICAgICAgIHZpZXcuYnVpbGRCaW5kaW5nKHRleHQsIG51bGwsIHRva2VuLnZhbHVlLCB0ZXh0QmluZGVyLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgICBibG9jayA9IHRydWU7XG4gIH0gZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGJsb2NrID0gdmlldy50cmF2ZXJzZShub2RlKTtcbiAgfVxuXG4gIGlmICghYmxvY2spIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFyc2VOb2RlKHZpZXcsIChub2RlLmNoaWxkTm9kZXNbaV0gYXMgSURhdGFFbGVtZW50KSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBiaW5kaW5nQ29tcGFyYXRvciA9IChhOiBCaW5kaW5nLCBiOiBCaW5kaW5nKSA9PiB7XG4gIGxldCBhUHJpb3JpdHkgPSBhLmJpbmRlciA/ICgoYS5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5wcmlvcml0eSB8fCAwKSA6IDA7XG4gIGxldCBiUHJpb3JpdHkgPSBiLmJpbmRlciA/ICgoYi5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5wcmlvcml0eSB8fCAwKSA6IDA7XG4gIHJldHVybiBiUHJpb3JpdHkgLSBhUHJpb3JpdHk7XG59O1xuXG5jb25zdCB0cmltU3RyID0gKHN0cjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBzdHIudHJpbSgpO1xufTtcblxuLy8gQSBjb2xsZWN0aW9uIG9mIGJpbmRpbmdzIGJ1aWx0IGZyb20gYSBzZXQgb2YgcGFyZW50IG5vZGVzLlxuZXhwb3J0IGNsYXNzIFZpZXcge1xuXG4gIGVsczogSFRNTENvbGxlY3Rpb24gfCBIVE1MRWxlbWVudFtdIHwgTm9kZVtdO1xuICBtb2RlbHM6IGFueTtcbiAgb3B0aW9uczogSVZpZXdPcHRpb25zO1xuICBiaW5kaW5nczogQmluZGluZ1tdID0gW107XG4gIGNvbXBvbmVudFZpZXc6IFZpZXcgfCBudWxsID0gbnVsbDtcblxuICAvLyBUaGUgRE9NIGVsZW1lbnRzIGFuZCB0aGUgbW9kZWwgb2JqZWN0cyBmb3IgYmluZGluZyBhcmUgcGFzc2VkIGludG8gdGhlXG4gIC8vIGNvbnN0cnVjdG9yIGFsb25nIHdpdGggYW55IGxvY2FsIG9wdGlvbnMgdGhhdCBzaG91bGQgYmUgdXNlZCB0aHJvdWdob3V0IHRoZVxuICAvLyBjb250ZXh0IG9mIHRoZSB2aWV3IGFuZCBpdCdzIGJpbmRpbmdzLlxuICBjb25zdHJ1Y3RvcihlbHM6IEhUTUxDb2xsZWN0aW9uIHwgSFRNTEVsZW1lbnQgfCBOb2RlLCBtb2RlbHM6IGFueSwgb3B0aW9uczogSVZpZXdPcHRpb25zKSB7XG4gICAgaWYgKGVscyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLmVscyA9IGVscztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbHMgPSAoW2Vsc10gYXMgSFRNTEVsZW1lbnRbXSB8IE5vZGVbXSApO1xuICAgIH1cblxuICAgIHRoaXMubW9kZWxzID0gbW9kZWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmJ1aWxkKCk7XG4gIH1cblxuICBwdWJsaWMgYnVpbGRCaW5kaW5nKG5vZGU6IEhUTUxFbGVtZW50IHwgVGV4dCwgdHlwZTogc3RyaW5nIHwgbnVsbCwgZGVjbGFyYXRpb246IHN0cmluZywgYmluZGVyOiBCaW5kZXI8YW55PiwgYXJnczogc3RyaW5nW10gfCBudWxsKSB7XG4gICAgbGV0IG1hdGNoZXMgPSBkZWNsYXJhdGlvbi5tYXRjaChERUNMQVJBVElPTl9TUExJVCk7XG4gICAgaWYobWF0Y2hlcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBtYXRjaGVzJyk7XG4gICAgfVxuICAgIGxldCBwaXBlcyA9IG1hdGNoZXMubWFwKHRyaW1TdHIpO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKTtcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IEJpbmRpbmcoKHRoaXMgYXMgVmlldyksIChub2RlIGFzIEhUTUxFbGVtZW50KSwgdHlwZSwga2V5cGF0aCwgYmluZGVyLCBhcmdzLCBwaXBlcykpO1xuICB9XG5cbiAgLy8gUGFyc2VzIHRoZSBET00gdHJlZSBhbmQgYnVpbGRzIGBCaW5kaW5nYCBpbnN0YW5jZXMgZm9yIGV2ZXJ5IG1hdGNoZWRcbiAgLy8gYmluZGluZyBkZWNsYXJhdGlvbi5cbiAgYnVpbGQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdO1xuXG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbHMsIGksIGxlbjtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcGFyc2VOb2RlKHRoaXMsIChlbGVtZW50c1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRpbmdzLnNvcnQoYmluZGluZ0NvbXBhcmF0b3IpO1xuICB9XG5cbiAgdHJhdmVyc2Uobm9kZTogSURhdGFFbGVtZW50KTogVEJsb2NrIHtcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIGxldCBibG9jayA9IG5vZGUubm9kZU5hbWUgPT09ICdTQ1JJUFQnIHx8IG5vZGUubm9kZU5hbWUgPT09ICdTVFlMRSc7XG4gICAgbGV0IGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgbGV0IGJpbmRJbmZvcyA9IFtdO1xuICAgIGxldCBzdGFyQmluZGVycyA9IHRoaXMub3B0aW9ucy5zdGFyQmluZGVycztcbiAgICB2YXIgdHlwZSwgYmluZGVyLCBpZGVudGlmaWVyLCBhcmdzO1xuXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIHdpdGggdGhlIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2XG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuaW5kZXhPZihiaW5kaW5nUHJlZml4KSA9PT0gMCkge1xuICAgICAgICB0eXBlID0gYXR0cmlidXRlLm5hbWUuc2xpY2UoYmluZGluZ1ByZWZpeC5sZW5ndGgpO1xuICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1t0eXBlXTtcbiAgICAgICAgYXJncyA9IFtdO1xuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzdGFyQmluZGVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgaWRlbnRpZmllciA9IHN0YXJCaW5kZXJzW2tdO1xuICAgICAgICAgICAgaWYgKHR5cGUuc2xpY2UoMCwgaWRlbnRpZmllci5sZW5ndGggLSAxKSA9PT0gaWRlbnRpZmllci5zbGljZSgwLCAtMSkpIHtcbiAgICAgICAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgIGFyZ3MucHVzaCh0eXBlLnNsaWNlKGlkZW50aWZpZXIubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGJpbmRlciA9IHRpbnliaW5kLmZhbGxiYWNrQmluZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChiaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5ibG9jaykge1xuICAgICAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIHR5cGUsIGF0dHJpYnV0ZS52YWx1ZSwgYmluZGVyLCBhcmdzKTtcbiAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5kSW5mb3MucHVzaCh7YXR0cjogYXR0cmlidXRlLCBiaW5kZXI6IGJpbmRlciwgdHlwZTogdHlwZSwgYXJnczogYXJnc30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZEluZm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmluZEluZm8gPSBiaW5kSW5mb3NbaV07XG4gICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCBiaW5kSW5mby50eXBlLCBiaW5kSW5mby5hdHRyLnZhbHVlLCBiaW5kSW5mby5iaW5kZXIsIGJpbmRJbmZvLmFyZ3MpO1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYmluZEluZm8uYXR0ci5uYW1lKTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIGNvbXBvbmVudHNcbiAgICBpZiAoIWJsb2NrKSB7XG4gICAgICB0eXBlID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbXBvbmVudHNbdHlwZV0gJiYgIW5vZGUuX2JvdW5kKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQ29tcG9uZW50QmluZGluZygodGhpcyBhcyBWaWV3KSwgbm9kZSwgdHlwZSkpO1xuICAgICAgICBibG9jayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJsb2NrO1xuICB9XG5cbiAgLy8gQmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5iaW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICB1bmJpbmQoKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLmJpbmRpbmdzKSkge1xuICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICBiaW5kaW5nLnVuYmluZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN5bmNzIHVwIHRoZSB2aWV3IHdpdGggdGhlIG1vZGVsIGJ5IHJ1bm5pbmcgdGhlIHJvdXRpbmVzIG9uIGFsbCBiaW5kaW5ncy5cbiAgc3luYygpIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1Ymxpc2hlcyB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIHZpZXcgYmFjayB0byB0aGUgbW9kZWwgKHJldmVyc2Ugc3luYykuXG4gIHB1Ymxpc2goKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcuYmluZGVyICYmIChiaW5kaW5nLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnB1Ymxpc2hlcykge1xuICAgICAgICBiaW5kaW5nLnB1Ymxpc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIHZpZXcncyBtb2RlbHMgYWxvbmcgd2l0aCBhbnkgYWZmZWN0ZWQgYmluZGluZ3MuXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm1vZGVsc1trZXldID0gbW9kZWxzW2tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBpZiAoYmluZGluZy51cGRhdGUpIHtcbiAgICAgICAgYmluZGluZy51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==