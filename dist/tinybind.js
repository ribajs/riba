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
exports.adapter = exports.Adapter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The default `.` adapter that comes with tinybind.js. Allows subscribing to
 * properties on plain objects, implemented in ES5 natives using
 * `Object.defineProperty`.
 */
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
exports.adapter = adapter;

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
exports.binders = void 0;

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");

var createView = function createView(binding, models, anchorEl) {
  var template = binding.el.cloneNode(true);
  var view = new _view.View(template, models, binding.view.options);
  view.bind();

  if (!binding || !binding.marker || binding.marker.parentNode === null) {
    throw new Error('No parent node for binding!');
  }

  binding.marker.parentNode.insertBefore(template, anchorEl);
  return view;
};

var binders = {
  /**
   * Binds an event handler on the element.
   */
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
        if (this.args === null) {
          throw new Error('args is null');
        }

        el.removeEventListener(this.args[0], this.customData);
      }
    },
    routine: function routine(el, value
    /*TODO*/
    ) {
      if (this.customData.handler) {
        if (this.args === null) {
          throw new Error('args is null');
        }

        el.removeEventListener(this.args[0], this.customData.handler);
      }

      this.customData.handler = this.eventHandler(value);

      if (this.args === null) {
        throw new Error('args is null');
      }

      el.addEventListener(this.args[0], this.customData.handler);
    }
  },

  /**
   * Appends bound instances of the element in place for each item in the array.
   */
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

      if (this.args === null) {
        throw new Error('args is null');
      }

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
        (0, _utils.times)(this.customData.iterated.length - collection.length, function () {
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
        if (_this2.args === null) {
          throw new Error('args is null');
        }

        if (key !== _this2.args[0]) {
          data[key] = models[key];
        }
      });
      this.customData.iterated.forEach(function (view) {
        view.update(data);
      });
    }
  },

  /**
   * Adds or removes the class from the element when value is true or false.
   */
  'class-*': function (el, value) {
    var elClass = " ".concat(el.className, " ");

    if (this.args === null) {
      throw new Error('args is null');
    }

    if (value !== elClass.indexOf(" ".concat(this.args[0], " ")) > -1) {
      if (value) {
        el.className = "".concat(el.className, " ").concat(this.args[0]);
      } else {
        el.className = elClass.replace(" ".concat(this.args[0], " "), ' ').trim();
      }
    }
  },

  /**
   * Sets the element's text value.
   */
  text: function (el, value) {
    el.textContent = value != null ? value : '';
  },

  /**
   * Sets the element's HTML content.
   */
  html: function (el, value) {
    el.innerHTML = value != null ? value : '';
  },

  /**
   * Shows the element when value is true.
   */
  show: function (el, value) {
    el.style.display = value ? '' : 'none';
  },

  /**
   * Hides the element when value is true (negated version of `show` binder).
   */
  hide: function (el, value) {
    el.style.display = value ? 'none' : '';
  },

  /**
   * Enables the element when value is true.
   */
  enabled: function (el, value) {
    el.disabled = !value;
  },

  /**
   * Disables the element when value is true (negated version of `enabled` binder).
   */
  disabled: function (el, value) {
    el.disabled = !!value;
  },

  /**
   * Checks a checkbox or radio input when the value is true. Also sets the model
   * property when the input is checked or unchecked (two-way binder).
   */
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
        el.checked = (0, _utils.getString)(el.value) === (0, _utils.getString)(value);
      } else {
        el.checked = !!value;
      }
    }
  },

  /**
   * Sets the element's value. Also sets the model property when the input changes
   * (two-way binder).
   */
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
        } else if ((0, _utils.getString)(value) !== (0, _utils.getString)(el.value)) {
          el.value = value != null ? value : '';
        }
      }
    }
  },

  /**
   * Inserts and binds the element and it's child nodes into the DOM when true.
   */
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
exports.binders = binders;

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
exports.Binding = exports.FORMATTER_SPLIT = exports.FORMATTER_ARGS = void 0;

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

var FORMATTER_ARGS = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
exports.FORMATTER_ARGS = FORMATTER_ARGS;
var FORMATTER_SPLIT = /\s+/;
/**
 *  A single binding between a model attribute and a DOM element.
 */

exports.FORMATTER_SPLIT = FORMATTER_SPLIT;

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

    _defineProperty(this, "formatterObservers", {});

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
    value: function observe(obj, keypath, callback) {
      if (callback) {
        return new _observer.Observer(obj, keypath, callback);
      } else {
        return new _observer.Observer(obj, keypath, this);
      }
    }
  }, {
    key: "parseTarget",
    value: function parseTarget() {
      if (this.keypath) {
        var token = (0, _parsers.parseType)(this.keypath);

        if (token.type === _parsers.PRIMITIVE) {
          this.value = token.value;
        } else if (token.type === _parsers.KEYPATH) {
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

        if (type === _parsers.PRIMITIVE) {
          var primitiveValue = value;
          return primitiveValue;
        } else if (type === _parsers.KEYPATH) {
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

      if (this.formatters === null) {
        throw new Error('formatters is null');
      }

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

      if (this.binder === null) {
        throw new Error('binder is null');
      }

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
        if (this.formatters === null) {
          throw new Error('formatters is null');
        }

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

      if (this.binder === null) {
        throw new Error('binder is null');
      }

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

      if (this.binder === null) {
        throw new Error('binder is null');
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
      if (this.binder === null) {
        throw new Error('binder is null');
      }

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

var _tinybind = __webpack_require__(/*! ./tinybind */ "./src/tinybind.ts");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.ts");

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
 * component view encapsulated as a binding within it's parent view.
 */
var ComponentBinding =
/*#__PURE__*/
function (_Binding) {
  _inherits(ComponentBinding, _Binding);

  /**
   * static values (PRIMITIVE Attributes)
   */

  /**
   * keypath values (KEYPATH Attributes)
   */

  /**
   * Initializes a component binding for the specified view. The raw component
   * element is passed in along with the component type. Attributes and scope
   * inflections are determined based on the components defined attributes.
   * 
   * @param view 
   * @param el 
   * @param type 
   */
  function ComponentBinding(view, el, type) {
    var _this;

    _classCallCheck(this, ComponentBinding);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentBinding).call(this, view, el, type, null, null, null, null));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "view", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentView", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "el", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "type", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "component", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "static", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keypaths", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "formattersObservers", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "observers", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bindingPrefix", _tinybind.tinybind._fullPrefix);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pipes", {});

    _this.view = view;
    _this.el = el;
    _this.type = type;
    _this.component = view.options.components[_this.type];
    _this.static = {};
    _this.observers = {};

    _this.parseTarget();

    _this.sync();

    return _this;
  }
  /**
   * Updates the values in model when the observer calls this function 
   */


  _createClass(ComponentBinding, [{
    key: "sync",
    value: function sync() {
      var _this2 = this;

      Object.keys(this.observers).forEach(function (propertyName) {
        _this2.view.models[propertyName] = _this2.observers[propertyName].value(); // TODO
        // this.view.models[propertyName] = this.formattedValues(this.observers[propertyName].value(), propertyName);
      });
    }
    /**
     * Intercepts `tinybind.Binding::update` since component bindings are not bound
     * to a particular model to update it's value.
     */

  }, {
    key: "update",
    value: function update() {}
    /**
     * Publishes the value currently set on the model back to the parent model.
     * You need to call this method manually in your component
     */

  }, {
    key: "publish",
    value: function publish(propertyName, value) {
      var _this3 = this;

      if (propertyName) {
        if (this.observers[propertyName]) {
          this.observers[propertyName].setValue(value);
        }
      } else {
        // sync all observers
        Object.keys(this.observers).forEach(function (propertyName) {
          _this3.observers[propertyName].setValue(_this3.view.models[propertyName]);
        });
      }
    }
    /**
     * Returns an object map using the component's scope inflections.
     */

  }, {
    key: "locals",
    value: function locals() {
      var _this4 = this;

      var result = {};
      Object.keys(this.static).forEach(function (key) {
        result[key] = _this4.formattedValues(_this4.static[key], key);
      });
      /**
       * 
       */

      Object.keys(this.observers).forEach(function (key) {
        // TODO fixme
        result[key] = _this4.observers[key].value(); // result[key] = this.formattedValues(this.observers[key].value(), key);
      });
      return result;
    }
    /**
     * Returns a camel-cased version of the string. Used when translating an
     * element's attribute name into a property name for the component's scope.
     * TODO move to utils
     * @param string 
     */

  }, {
    key: "camelCase",
    value: function camelCase(string) {
      return string.replace(/-([a-z])/g, function (grouped) {
        return grouped[1].toUpperCase();
      });
    }
  }, {
    key: "getMergedOptions",
    value: function getMergedOptions() {
      var options = {
        // EXTENSIONS
        binders: Object.create(null),
        formatters: Object.create(null),
        components: Object.create(null),
        adapters: Object.create(null)
      };
      (0, _utils.mergeObject)(options.binders, this.component.binders);
      (0, _utils.mergeObject)(options.formatters, this.component.formatters);
      (0, _utils.mergeObject)(options.components, this.component.components);
      (0, _utils.mergeObject)(options.adapters, this.component.adapters);
      (0, _utils.mergeObject)(options.binders, this.view.options.binders);
      (0, _utils.mergeObject)(options.formatters, this.view.options.formatters);
      (0, _utils.mergeObject)(options.components, this.view.options.components);
      (0, _utils.mergeObject)(options.adapters, this.view.options.adapters);
      options.prefix = this.component.prefix ? this.component.prefix : this.view.options.prefix;
      options.templateDelimiters = this.component.templateDelimiters ? this.component.templateDelimiters : this.view.options.templateDelimiters;
      options.rootInterface = this.component.rootInterface ? this.component.rootInterface : this.view.options.rootInterface;
      options.preloadData = this.component.preloadData ? this.component.preloadData : this.view.options.preloadData;
      options.handler = this.component.handler ? this.component.handler : this.view.options.handler;
      return options;
    }
    /**
     * Intercepts `tinybind.Binding::bind` to build `this.componentView` with a localized
     * map of models from the root view. Bind `this.componentView` on subsequent calls.
     */

  }, {
    key: "bind",
    value: function bind() {
      if (!this.el._bound) {
        this.el.innerHTML = this.component.template.call(this);
        /**
         * there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
         */

        var scope = this.component.initialize.call(this, this.el, this.locals());
        this.view = _tinybind.tinybind.bind(Array.prototype.slice.call(this.el.childNodes), scope, this.getMergedOptions());
        this.el._bound = true;
      } else {
        this.view.bind();
      }
    }
  }, {
    key: "parseTarget",
    value: function parseTarget() {
      // parse component attributes
      for (var i = 0, len = this.el.attributes.length; i < len; i++) {
        var attribute = this.el.attributes[i]; // if attribute starts not with binding prefix. E.g. rv-

        if (attribute.name.indexOf(this.bindingPrefix) !== 0) {
          var _propertyName = this.camelCase(attribute.name);

          var declaration = attribute.value;

          var parsedDeclaration = _view.View.parseDeclaration(declaration);

          this.pipes[_propertyName] = parsedDeclaration.pipes;

          if (parsedDeclaration.keypath === null) {
            throw new Error('parsedDeclaration.keypath is null');
          }

          var token = (0, _parsers.parseType)(parsedDeclaration.keypath);

          if (token.type === _parsers.PRIMITIVE) {
            this.static[_propertyName] = token.value;
          } else if (token.type === _parsers.KEYPATH) {
            this.keypaths[_propertyName] = attribute.value;
            this.observers[_propertyName] = this.observe(this.view.models, this.keypaths[_propertyName], this); // model biding is called in this.sync!!
          } else {
            throw new Error('can\'t parse component attribute');
          }
        }
      }
    }
    /**
     * 
     * @param args parses the formatters in arguments
     * @param formatterIndex 
     */

  }, {
    key: "parseFormatterArgumentsProperty",
    value: function parseFormatterArgumentsProperty(args, formatterIndex, propertyName) {
      var _this5 = this;

      return args.map(_parsers.parseType).map(function (_ref, ai) {
        var type = _ref.type,
            value = _ref.value;

        if (type === _parsers.PRIMITIVE) {
          var primitiveValue = value;
          return primitiveValue;
        } else if (type === _parsers.KEYPATH) {
          console.log('TODO', propertyName); // keypath is string

          var keypath = value;

          if (!_this5.formattersObservers[propertyName]) {
            _this5.formattersObservers[propertyName] = {};
          }

          if (!_this5.formattersObservers[propertyName][formatterIndex]) {
            _this5.formattersObservers[propertyName][formatterIndex] = {};
          }

          var observer = _this5.formattersObservers[propertyName][formatterIndex][ai];

          if (!observer) {
            observer = _this5.observe(_this5.view.models, keypath);
            _this5.formattersObservers[propertyName][formatterIndex][ai] = observer;
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
    key: "formattedValues",
    value: function formattedValues(value, propertyName) {
      var _this6 = this;

      if (this.pipes[propertyName] === null) {
        throw new Error('formatters is null');
      }

      return this.pipes[propertyName].reduce(function (result, declaration, index) {
        var args = declaration.match(_binding.FORMATTER_ARGS);

        if (args === null) {
          throw new Error('No args matched from FORMATTER_ARGS');
        }

        var id = args.shift();

        if (!id) {
          throw new Error('No id found in args');
        }

        var formatter = _this6.view.options.formatters[id];

        var processedArgs = _this6.parseFormatterArgumentsProperty(args, index, propertyName);

        if (formatter && formatter.read instanceof Function) {
          result = formatter.read.apply(formatter, [result].concat(_toConsumableArray(processedArgs)));
        } else if (formatter instanceof Function) {
          result = formatter.apply(void 0, [result].concat(_toConsumableArray(processedArgs)));
        }

        return result;
      }, value);
    }
    /**
     * Intercept `tinybind.Binding::unbind` to be called on `this.componentView`.
     */

  }, {
    key: "unbind",
    value: function unbind() {
      var _this7 = this;

      Object.keys(this.observers).forEach(function (propertyName) {
        _this7.observers[propertyName].unobserve();
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
/**
 * negate a boolean value
 */

exports.formatters = formatters;

formatters.not = function (value) {
  return !value;
};
/**
 * parse json string to object
 * @example <div rv-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */


formatters.parse = function (jsonString) {
  if (typeof jsonString === 'string') {
    var object = JSON.parse(jsonString);
    return object;
  }

  return null;
};
/**
 * parse json string to object
 * @example <div rv-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */


formatters.json = function (obj) {
  return JSON.stringify(obj);
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

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Error thrower.
function error(message) {
  throw new Error('[Observer] ' + message);
} // TODO


var adapters;
var interfaces;
var rootInterface;

var Observer =
/*#__PURE__*/
function () {
  /**
   * Constructs a new keypath observer and kicks things off.
   * @param obj 
   * @param keypath 
   * @param callback 
   */
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

    if ((0, _utils.isObject)(this.target)) {
      this.set(true, this.key, this.target, this.callback);
    }
  }

  _createClass(Observer, [{
    key: "parse",

    /**
     * Parses the keypath using the interfaces defined on the view. Sets variables
     * for the tokenized keypath as well as the end key.
     */
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
    }
    /**
     * Realizes the full keypath, attaching observers for every key and correcting
     * old observers to any changed objects in the keypath.
     */

  }, {
    key: "realize",
    value: function realize() {
      var current = this.obj;
      var unreached = -1;
      var prev;
      var token;

      for (var index = 0; index < this.tokens.length; index++) {
        token = this.tokens[index];

        if ((0, _utils.isObject)(current)) {
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
    }
    /**
     * Updates the keypath. This is called when any intermediary key is changed.
     */

  }, {
    key: "sync",
    value: function sync() {
      var next, oldValue, newValue;

      if ((next = this.realize()) !== this.target) {
        if ((0, _utils.isObject)(this.target)) {
          this.set(false, this.key, this.target, this.callback);
        }

        if ((0, _utils.isObject)(next)) {
          this.set(true, this.key, next, this.callback);
        }

        oldValue = this.value();
        this.target = next;
        newValue = this.value();
        if (newValue !== oldValue || newValue instanceof Function) this.callback.sync();
      } else if (next instanceof Array) {
        this.callback.sync();
      }
    }
    /**
     * Reads the current end value of the observed keypath. Returns undefined if
     * the full keypath is unreachable.
     */

  }, {
    key: "value",
    value: function value() {
      if ((0, _utils.isObject)(this.target)) {
        return this.get(this.key, this.target);
      }
    }
    /**
     * Sets the current end value of the observed keypath. Calling setValue when
     *  the full keypath is unreachable is a no-op.
     * @param value 
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      if ((0, _utils.isObject)(this.target)) {
        adapters[this.key.i].set(this.target, this.key.path, value);
      }
    }
    /**
     * Gets the provided key on an object.
     * @param key 
     * @param obj 
     */

  }, {
    key: "get",
    value: function get(key, obj) {
      return adapters[key.i].get(obj, key.path);
    }
    /**
     * Observes or unobserves a callback on the object using the provided key.
     * @param active 
     * @param key 
     * @param obj 
     * @param callback 
     */

  }, {
    key: "set",
    value: function set(active, key, obj, callback) {
      if (active) {
        adapters[key.i].observe(obj, key.path, callback);
      } else {
        adapters[key.i].unobserve(obj, key.path, callback);
      }
    }
    /**
     * Unobserves the entire keypath.
     */

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

      if ((0, _utils.isObject)(this.target)) {
        this.set(false, this.key, this.target, this.callback);
      }
    }
    /**
     * traverse the scope chain to find the scope which has the root property
     * if the property is not found in chain, returns the root scope
     * @param obj 
     */

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
exports.parseType = parseType;
exports.parseTemplate = parseTemplate;
exports.BINDING = exports.TEXT = exports.KEYPATH = exports.PRIMITIVE = void 0;

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");

/**
 * Used also in parsers.parseType
 * TODO outsource
 */
var PRIMITIVE = 0;
exports.PRIMITIVE = PRIMITIVE;
var KEYPATH = 1;
exports.KEYPATH = KEYPATH;
var TEXT = 0;
exports.TEXT = TEXT;
var BINDING = 1;
exports.BINDING = BINDING;
var QUOTED_STR = /^'.*'$|^".*"$/; // regex to test if string is wrapped in " or '

/**
 * Parser and tokenizer for getting the type and value from a string.
 * @param string 
 */

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
  } else if ((0, _utils.isJson)(string)) {
    value = JSON.parse(string);
  } else {
    type = KEYPATH;
  }

  return {
    type: type,
    value: value
  };
}

/**
 * Template parser and tokenizer for mustache-style text content bindings.
 * Parses the template and returns a set of tokens, separating static portions
 * of text from binding declarations.
 * @param template 
 * @param delimiters 
 */
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
exports.default = exports.tinybind = void 0;

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _formatters = __webpack_require__(/*! ./formatters */ "./src/formatters.ts");

var _adapter = __webpack_require__(/*! ./adapter */ "./src/adapter.ts");

var _binders = __webpack_require__(/*! ./binders */ "./src/binders.ts");

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

var tinybind = {
  // Global binders.
  binders: _binders.binders,
  // Global components.
  components: {},
  // Global formatters.
  formatters: _formatters.formatters,
  // Global sightglass adapters.
  adapters: {
    '.': _adapter.adapter
  },

  /** Default attribute prefix. */
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

  /** Default template delimiters. */
  templateDelimiters: ['{', '}'],

  /** Default sightglass root interface. */
  rootInterface: '.',

  /** Preload data by default. */
  preloadData: true,

  /**
   * Default event handler.
   */
  handler: function handler(context, ev, binding) {
    this.call(context, ev, binding.view.models);
  },

  /**
   * Sets the attribute on the element. If no binder above is matched it will fall
   * back to using this binder.
   */
  fallbackBinder: function fallbackBinder(el, value) {
    if (!this.type) {
      throw new Error('Can\'t set atttribute of ' + this.type);
    }

    if (value != null) {
      el.setAttribute(this.type, value);
    } else {
      el.removeAttribute(this.type);
    }
  },

  /**
   * Merges an object literal into the corresponding global options.
   * @param options 
   */
  configure: function configure(options) {
    var _this = this;

    if (!options) {
      return;
    }

    Object.keys(options).forEach(function (option) {
      var value = options[option];

      switch (option) {
        case 'binders':
          (0, _utils.mergeObject)(_this.binders, value);
          break;

        case 'formatters':
          (0, _utils.mergeObject)(_this.formatters, value);
          break;

        case 'components':
          (0, _utils.mergeObject)(_this.components, value);
          break;

        case 'adapters':
          (0, _utils.mergeObject)(_this.adapters, value);
          break;

        case 'adapter':
          (0, _utils.mergeObject)(_this.adapters, value);
          break;

        case 'prefix':
          _this.prefix = value;
          break;

        case 'parseTemplate':
          _this.parseTemplate = value;
          break;

        case 'parseType':
          _this.parseType = value;
          break;

        case 'prefix':
          _this.prefix = value;
          break;

        case 'templateDelimiters':
          _this.templateDelimiters = value;
          break;

        case 'rootInterface':
          _this.rootInterface = value;
          break;

        case 'preloadData':
          _this.preloadData = value;
          break;

        default:
          console.warn('Option not supported', option, value);
          break;
      }
    });
  },

  /**
   * Initializes a new instance of a component on the specified element and
   * returns a tinybind.View instance.	
   */
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

  /**
   * Binds some data to a template / element. Returns a tinybind.View instance.
   */
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
      (0, _utils.mergeObject)(viewOptions.binders, options.binders);
      (0, _utils.mergeObject)(viewOptions.formatters, options.formatters);
      (0, _utils.mergeObject)(viewOptions.components, options.components);
      (0, _utils.mergeObject)(viewOptions.adapters, options.adapters);
    }

    viewOptions.prefix = options && options.prefix ? options.prefix : tinybind.prefix;
    viewOptions.templateDelimiters = options && options.templateDelimiters ? options.templateDelimiters : tinybind.templateDelimiters;
    viewOptions.rootInterface = options && options.rootInterface ? options.rootInterface : tinybind.rootInterface;
    viewOptions.preloadData = options && options.preloadData ? options.preloadData : tinybind.preloadData;
    viewOptions.handler = options && options.handler ? options.handler : tinybind.handler; // merge extensions

    (0, _utils.mergeObject)(viewOptions.binders, tinybind.binders);
    (0, _utils.mergeObject)(viewOptions.formatters, tinybind.formatters);
    (0, _utils.mergeObject)(viewOptions.components, tinybind.components);
    (0, _utils.mergeObject)(viewOptions.adapters, tinybind.adapters); // get all starBinders from available binders

    viewOptions.starBinders = Object.keys(viewOptions.binders).filter(function (key) {
      return key.indexOf('*') > 0;
    });

    _observer.Observer.updateOptions(viewOptions);

    var view = new _view.View(el, models, viewOptions);
    view.bind();
    return view;
  }
};
exports.tinybind = tinybind;
var _default = tinybind;
exports.default = _default;

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.times = exports.getString = exports.isObject = exports.isJson = exports.mergeObject = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var mergeObject = function mergeObject(target, obj) {
  if (obj) {
    Object.keys(obj).forEach(function (key) {
      if (!target[key] || target[key] === {}) {
        target[key] = obj[key];
      }
    });
  }

  return target;
};
/**
 * Test if string is a json string
 * @param str 
 */


exports.mergeObject = mergeObject;

var isJson = function isJson(str) {
  try {
    var val = JSON.parse(str);
    return val instanceof Array || val instanceof Object ? true : false;
  } catch (error) {
    return false;
  }
};
/**
 * Check if a value is an object than can be observed.
 * @param obj 
 */


exports.isJson = isJson;

var isObject = function isObject(obj) {
  return _typeof(obj) === 'object' && obj !== null;
};

exports.isObject = isObject;

var getString = function getString(value) {
  return value != null ? value.toString() : undefined;
};

exports.getString = getString;

var times = function times(n, cb) {
  for (var i = 0; i < n; i++) {
    cb();
  }
};

exports.times = times;

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

var _tinybind = __webpack_require__(/*! ./tinybind */ "./src/tinybind.ts");

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.ts");

var _componentBinding = __webpack_require__(/*! ./component-binding */ "./src/component-binding.ts");

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

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

    var tokens = (0, _parsers.parseTemplate)(node.data, _tinybind.tinybind.templateDelimiters);

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
    if (node.childNodes) {
      for (var _i = 0; _i < node.childNodes.length; _i++) {
        parseNode(view, node.childNodes[_i]);
      }
    }
  }
};

var bindingComparator = function bindingComparator(a, b) {
  var aPriority = a.binder ? a.binder.priority || 0 : 0;
  var bPriority = b.binder ? b.binder.priority || 0 : 0;
  return bPriority - aPriority;
};
/**
 * A collection of bindings built from a set of parent nodes.
 */


var View =
/*#__PURE__*/
function () {
  /**
   * The DOM elements and the model objects for binding are passed into the
   * constructor along with any local options that should be used throughout the
   * context of the view and it's bindings.
   * @param els 
   * @param models 
   * @param options 
   */
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
      var parsedDeclaration = View.parseDeclaration(declaration);
      var keypath = parsedDeclaration.keypath;
      var pipes = parsedDeclaration.pipes;
      this.bindings.push(new _binding.Binding(this, node, type, keypath, binder, args, pipes));
    }
    /**
     * Parses the DOM tree and builds `Binding` instances for every matched
     * binding declaration.
     */

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
      var bindingPrefix = _tinybind.tinybind._fullPrefix;
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
            binder = _tinybind.tinybind.fallbackBinder;
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
    }
    /**
     * Binds all of the current bindings for this view.
     */

  }, {
    key: "bind",
    value: function bind() {
      this.bindings.forEach(function (binding) {
        binding.bind();
      });
    }
    /**
     * Unbinds all of the current bindings for this view.
     */

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
    }
    /**
     * Syncs up the view with the model by running the routines on all bindings.
     */

  }, {
    key: "sync",
    value: function sync() {
      this.bindings.forEach(function (binding) {
        binding.sync();
      });
    }
    /**
     * Publishes the input values from the view back to the model (reverse sync).
     */

  }, {
    key: "publish",
    value: function publish() {
      this.bindings.forEach(function (binding) {
        if (binding.binder && binding.binder.publishes) {
          binding.publish();
        }
      });
    }
    /**
     * Updates the view's models along with any affected bindings.
     * @param models 
     */

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
  }], [{
    key: "parseDeclaration",
    value: function parseDeclaration(declaration) {
      var matches = declaration.match(DECLARATION_SPLIT);

      if (matches === null) {
        throw new Error('no matches');
      }

      var pipes = matches.map(function (str) {
        return str.trim();
      });
      var keypath = pipes.shift() || null;
      return {
        keypath: keypath,
        pipes: pipes
      };
    }
  }]);

  return View;
}();

exports.View = View;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvZm9ybWF0dGVycy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9vYnNlcnZlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3RpbnliaW5kLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3ZpZXcudHMiXSwibmFtZXMiOlsiQVJSQVlfTUVUSE9EUyIsIkFkYXB0ZXIiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwiY291bnRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3ZWFrbWFwIiwiX19ydiIsImNhbGxiYWNrcyIsInJlZiIsImtleXMiLCJsZW5ndGgiLCJwb2ludGVycyIsImZuIiwib3JpZ2luYWwiLCJtYXAiLCJ3ZWFrUmVmZXJlbmNlIiwiYXJncyIsInJlc3BvbnNlIiwiYXBwbHkiLCJmb3JFYWNoIiwiayIsInIiLCJBcnJheSIsImNhbGxiYWNrIiwic3luYyIsImtleXBhdGgiLCJzdHViRnVuY3Rpb24iLCJpbmRleE9mIiwicHVzaCIsImlkeCIsInNwbGljZSIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsInNldCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJuZXdWYWx1ZSIsInVub2JzZXJ2ZU11dGF0aW9ucyIsImNiIiwib2JzZXJ2ZU11dGF0aW9ucyIsImFkYXB0ZXIiLCJjcmVhdGVWaWV3IiwiYmluZGluZyIsIm1vZGVscyIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiRXJyb3IiLCJpbnNlcnRCZWZvcmUiLCJiaW5kZXJzIiwiZnVuY3Rpb24iLCJwcmlvcml0eSIsImN1c3RvbURhdGEiLCJoYW5kbGVyIiwidW5iaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiaW5kZXhQcm9wIiwiZ2V0QXR0cmlidXRlIiwiZ2V0SXRlcmF0aW9uQWxpYXMiLCJtb2RlbCIsImluZGV4Iiwic2NvcGUiLCIkcGFyZW50IiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInVuZGVmaW5lZCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJkYXRhIiwia2V5IiwiZWxDbGFzcyIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ0cmltIiwidGV4dCIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIkhUTUxTZWxlY3RFbGVtZW50IiwiaSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiaWYiLCJhdHRhY2hlZCIsImJvdW5kIiwibmVzdGVkIiwiZ2V0SW5wdXRWYWx1ZSIsInJlc3VsdHMiLCJGT1JNQVRURVJfQVJHUyIsIkZPUk1BVFRFUl9TUExJVCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIlBSSU1JVElWRSIsIktFWVBBVEgiLCJvYnNlcnZlciIsIm9ic2VydmUiLCJ0YXJnZXQiLCJmb3JtYXR0ZXJJbmRleCIsInBhcnNlVHlwZSIsImFpIiwicHJpbWl0aXZlVmFsdWUiLCJmb3JtYXR0ZXJPYnNlcnZlcnMiLCJyZWR1Y2UiLCJyZXN1bHQiLCJkZWNsYXJhdGlvbiIsIm1hdGNoIiwic2hpZnQiLCJmb3JtYXR0ZXIiLCJwcm9jZXNzZWRBcmdzIiwicGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMiLCJyZWFkIiwiRnVuY3Rpb24iLCJldiIsImNhbGwiLCJmb3JtYXR0ZWRWYWx1ZSIsInJvdXRpbmVGbiIsInJlZHVjZVJpZ2h0Iiwic3BsaXQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwicGFyc2VUYXJnZXQiLCJwcmVsb2FkRGF0YSIsInVub2JzZXJ2ZSIsImZpIiwiQ29tcG9uZW50QmluZGluZyIsInRpbnliaW5kIiwiX2Z1bGxQcmVmaXgiLCJjb21wb25lbnQiLCJjb21wb25lbnRzIiwic3RhdGljIiwib2JzZXJ2ZXJzIiwicHJvcGVydHlOYW1lIiwiZm9ybWF0dGVkVmFsdWVzIiwic3RyaW5nIiwiZ3JvdXBlZCIsInRvVXBwZXJDYXNlIiwiY3JlYXRlIiwiYWRhcHRlcnMiLCJwcmVmaXgiLCJ0ZW1wbGF0ZURlbGltaXRlcnMiLCJyb290SW50ZXJmYWNlIiwiX2JvdW5kIiwiaW5pdGlhbGl6ZSIsImxvY2FscyIsInByb3RvdHlwZSIsInNsaWNlIiwiY2hpbGROb2RlcyIsImdldE1lcmdlZE9wdGlvbnMiLCJsZW4iLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlIiwibmFtZSIsImJpbmRpbmdQcmVmaXgiLCJjYW1lbENhc2UiLCJwYXJzZWREZWNsYXJhdGlvbiIsInBhcnNlRGVjbGFyYXRpb24iLCJwaXBlcyIsImtleXBhdGhzIiwiY29uc29sZSIsImxvZyIsImZvcm1hdHRlcnNPYnNlcnZlcnMiLCJwYXJzZUZvcm1hdHRlckFyZ3VtZW50c1Byb3BlcnR5IiwiY29tcG9uZW50VmlldyIsIm5vdCIsInBhcnNlIiwianNvblN0cmluZyIsIm9iamVjdCIsIkpTT04iLCJqc29uIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJtZXNzYWdlIiwiaW50ZXJmYWNlcyIsIm9iamVjdFBhdGgiLCJwYXJzZVJlc3VsdCIsInRva2VucyIsImdldFJvb3RPYmplY3QiLCJyZWFsaXplIiwicGF0aCIsInJvb3QiLCJzdWJzdHIiLCJ0b2tlbml6ZSIsImN1cnJlbnQiLCJ1bnJlYWNoZWQiLCJwcmV2IiwibmV4dCIsIm9sZFZhbHVlIiwiYWN0aXZlIiwicm9vdFByb3AiLCJjaHIiLCJjaGFyQXQiLCJURVhUIiwiQklORElORyIsIlFVT1RFRF9TVFIiLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZVRlbXBsYXRlIiwiZGVsaW1pdGVycyIsImxhc3RJbmRleCIsIm9wZW4iLCJjbG9zZSIsInN1YnN0cmluZyIsImxhc3RUb2tlbiIsIl9wcmVmaXgiLCJjb250ZXh0IiwiZmFsbGJhY2tCaW5kZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25maWd1cmUiLCJ3YXJuIiwiaW5pdCIsImNvbXBvbmVudEtleSIsImNyZWF0ZUVsZW1lbnQiLCJ2aWV3T3B0aW9ucyIsInN0YXJCaW5kZXJzIiwiZmlsdGVyIiwidXBkYXRlT3B0aW9ucyIsIm1lcmdlT2JqZWN0IiwiaXNKc29uIiwic3RyIiwidmFsIiwiaXNPYmplY3QiLCJnZXRTdHJpbmciLCJ0b1N0cmluZyIsInRpbWVzIiwibiIsInRleHRCaW5kZXIiLCJub2RlIiwiREVDTEFSQVRJT05fU1BMSVQiLCJwYXJzZU5vZGUiLCJub2RlVHlwZSIsImNyZWF0ZVRleHROb2RlIiwiYnVpbGRCaW5kaW5nIiwidHJhdmVyc2UiLCJiaW5kaW5nQ29tcGFyYXRvciIsImEiLCJiIiwiYVByaW9yaXR5IiwiYlByaW9yaXR5IiwiYnVpbGQiLCJlbGVtZW50cyIsInNvcnQiLCJiaW5kSW5mb3MiLCJpZGVudGlmaWVyIiwiYXR0ciIsImJpbmRJbmZvIiwidG9Mb3dlckNhc2UiLCJtYXRjaGVzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7Ozs7QUFRQSxJQUFNQSxnQkFBZ0IsQ0FDcEIsTUFEb0IsRUFFcEIsS0FGb0IsRUFHcEIsT0FIb0IsRUFJcEIsU0FKb0IsRUFLcEIsTUFMb0IsRUFNcEIsU0FOb0IsRUFPcEIsUUFQb0IsQ0FBdEI7O0lBMENhQyxPOzs7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SStJLFVBQVUvSSxZQUFZQyxLQUFaLENBQWtCMkgsaUJBQWxCLENBQWQ7O0FBQ0EsVUFBR21CLFlBQVksSUFBZixFQUFxQjtBQUNuQixjQUFNLElBQUkzTyxLQUFKLENBQVUsWUFBVixDQUFOO0FBQ0Q7O0FBQ0QsVUFBSWdKLFFBQVEyRixRQUFRclIsR0FBUixDQUFZLFVBQUN5UCxHQUFELEVBQWlCO0FBQ3ZDLGVBQU9BLElBQUluSyxJQUFKLEVBQVA7QUFDRCxPQUZXLENBQVo7QUFHQSxVQUFJM0UsVUFBVStLLE1BQU1sRCxLQUFOLE1BQWlCLElBQS9CO0FBQ0EsYUFBTztBQUNMN0gsd0JBREs7QUFFTCtLO0FBRkssT0FBUDtBQUlEIiwiZmlsZSI6InRpbnliaW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3RpbnliaW5kLnRzXCIpO1xuIiwiLyoqXG4gKiBUaGUgZGVmYXVsdCBgLmAgYWRhcHRlciB0aGF0IGNvbWVzIHdpdGggdGlueWJpbmQuanMuIEFsbG93cyBzdWJzY3JpYmluZyB0b1xuICogcHJvcGVydGllcyBvbiBwbGFpbiBvYmplY3RzLCBpbXBsZW1lbnRlZCBpbiBFUzUgbmF0aXZlcyB1c2luZ1xuICogYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAuXG4gKi9cblxuaW1wb3J0IHsgSU9ic2VydmVyU3luY0NhbGxiYWNrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5cbmNvbnN0IEFSUkFZX01FVEhPRFMgPSBbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZScsXG4gICdzcGxpY2UnXG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWYge1xuICBjYWxsYmFja3M6IGFueVtdO1xuICBwb2ludGVyczogYW55W107XG59XG5cbi8qKlxuICogVE9ETyBGb3Igd2hhdCBpcyB0aGlzP1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElSVkFycmF5IGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIF9fcnY6IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgQWRhcHRlckZ1bmN0aW9uID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXI7XG4gIHdlYWttYXA6IGFueTtcbiAgd2Vha1JlZmVyZW5jZTogKG9iajogYW55KSA9PiBhbnk7IC8vID0+IF9fcnYgP1xuICBjbGVhbnVwV2Vha1JlZmVyZW5jZTogKHJlZjogSVJlZiwgaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgc3R1YkZ1bmN0aW9uOiAob2JqOiBhbnksIGZuOiBzdHJpbmcpID0+IGFueSAvLyA9PiByZXNwb25zZSA/XG4gIG9ic2VydmVNdXRhdGlvbnM6IChvYmo6IGFueSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgdW5vYnNlcnZlTXV0YXRpb25zOiAob2JqOiBJUlZBcnJheSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgb2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHZvaWQ7IFxuICB1bm9ic2VydmU6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSA9PiB2b2lkO1xuICBnZXQ6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSA9PiBhbnk7XG4gIHNldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXJzIHtcbiAgW25hbWU6IHN0cmluZ106IElBZGFwdGVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRhcHRlciBpbXBsZW1lbnRzIElBZGFwdGVyIHtcbiAgY291bnRlcjogbnVtYmVyID0gMDtcbiAgd2Vha21hcDphbnkgPSB7fTtcblxuICB3ZWFrUmVmZXJlbmNlKG9iajogYW55KSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoJ19fcnYnKSkge1xuICAgICAgbGV0IGlkID0gdGhpcy5jb3VudGVyKys7XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX3J2Jywge1xuICAgICAgICB2YWx1ZTogaWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy53ZWFrbWFwW29iai5fX3J2XSkge1xuICAgICAgdGhpcy53ZWFrbWFwW29iai5fX3J2XSA9IHtcbiAgICAgICAgY2FsbGJhY2tzOiB7fVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcbiAgfVxuXG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlKHJlZjogSVJlZiwgaWQ6IG51bWJlcikge1xuICAgIGlmICghT2JqZWN0LmtleXMocmVmLmNhbGxiYWNrcykubGVuZ3RoKSB7XG4gICAgICBpZiAoIShyZWYucG9pbnRlcnMgJiYgT2JqZWN0LmtleXMocmVmLnBvaW50ZXJzKS5sZW5ndGgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLndlYWttYXBbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0dWJGdW5jdGlvbihvYmo6IGFueSwgZm46IHN0cmluZykge1xuICAgIGxldCBvcmlnaW5hbCA9IG9ialtmbl07XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopO1xuICAgIGxldCB3ZWFrbWFwID0gdGhpcy53ZWFrbWFwO1xuXG4gICAgb2JqW2ZuXSA9ICguLi5hcmdzOiBhbnlbXSk6IEFkYXB0ZXJGdW5jdGlvbiA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBvcmlnaW5hbC5hcHBseShvYmosIGFyZ3MpO1xuXG4gICAgICBPYmplY3Qua2V5cyhtYXAucG9pbnRlcnMpLmZvckVhY2gociA9PiB7XG4gICAgICAgIGxldCBrID0gbWFwLnBvaW50ZXJzW3JdO1xuXG4gICAgICAgIGlmICh3ZWFrbWFwW3JdKSB7XG4gICAgICAgICAgaWYgKHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdLmZvckVhY2goKGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2suc3luYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG4gIH1cblxuICBvYnNlcnZlTXV0YXRpb25zKG9iajogYW55LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzKSB7XG4gICAgICAgIG1hcC5wb2ludGVycyA9IHt9O1xuXG4gICAgICAgIEFSUkFZX01FVEhPRFMuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgdGhpcy5zdHViRnVuY3Rpb24ob2JqLCBmbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1hcC5wb2ludGVyc1tyZWZdKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdID0gW107XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXAucG9pbnRlcnNbcmVmXS5pbmRleE9mKGtleXBhdGgpID09PSAtMSkge1xuICAgICAgICBtYXAucG9pbnRlcnNbcmVmXS5wdXNoKGtleXBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVub2JzZXJ2ZU11dGF0aW9ucyhvYmo6IElSVkFycmF5LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKChvYmogaW5zdGFuY2VvZiBBcnJheSkgJiYgKG9iai5fX3J2ICE9IG51bGwpKSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgaWYgKG1hcCkge1xuICAgICAgICBsZXQgcG9pbnRlcnMgPSBtYXAucG9pbnRlcnNbcmVmXTtcblxuICAgICAgICBpZiAocG9pbnRlcnMpIHtcbiAgICAgICAgICBsZXQgaWR4ID0gcG9pbnRlcnMuaW5kZXhPZihrZXlwYXRoKTtcblxuICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgcG9pbnRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAucG9pbnRlcnNbcmVmXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlOiBhbnk7XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopLmNhbGxiYWNrcztcblxuICAgIGlmICghY2FsbGJhY2tzW2tleXBhdGhdKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0gPSBbXTtcbiAgICAgIGxldCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXBhdGgpO1xuXG4gICAgICBpZiAoIWRlc2MgfHwgIShkZXNjLmdldCB8fCBkZXNjLnNldCB8fCAhZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleXBhdGhdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleXBhdGgsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyh2YWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2I6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYi5zeW5jKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMobmV3VmFsdWUsIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrc1trZXlwYXRoXS5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gIH1cblxuICB1bm9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgaWYgKG1hcCkge1xuICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgbGV0IGlkeCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcblxuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgICBpZiAoIWNhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuICAgICAgICAgICAgdGhpcy51bm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhbnVwV2Vha1JlZmVyZW5jZShtYXAsIG9iai5fX3J2KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBvYmpba2V5cGF0aF07XG4gIH1cblxuICBzZXQob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIG9ialtrZXlwYXRoXSA9IHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCBhZGFwdGVyID0gbmV3IEFkYXB0ZXIoKTtcbmV4cG9ydCB7IGFkYXB0ZXIgfVxuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IHRpbWVzLCBnZXRTdHJpbmcgfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBPbmUgd2F5IGJpbmRlciBpbnRlcmZhY2VcbiAqL1xuZXhwb3J0IHR5cGUgSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+ID0gKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKSA9PiB2b2lkO1xuXG4vKipcbiAqIFRvIHdheSBiaW5kZXIgaW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+IHtcbiAgcm91dGluZTogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKSA9PiB2b2lkO1xuICBiaW5kPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICB1bmJpbmQ/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIHVwZGF0ZT86ICh0aGlzOiBCaW5kaW5nLCBtb2RlbDogYW55KSA9PiB2b2lkO1xuICBnZXRWYWx1ZT86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgYmxvY2s/OiBib29sZWFuO1xuICBmdW5jdGlvbj86IGJvb2xlYW47XG4gIHB1Ymxpc2hlcz86IGJvb2xlYW47XG4gIHByaW9yaXR5PzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgeW91IHdhbnQgdG8gc2F2ZSBjdXN0b20gZGF0YSBpbiB0aGlzIHVzZSB0aGlzIG9iamVjdFxuICAgKi9cbiAgY3VzdG9tRGF0YT86IGFueTtcbn1cblxuLyoqXG4gKiBBIGJpbmRlciBjYW4gYmUgYSBvbmUgd2F5IGJpbmRlciBvciBhIHR3byB3YXkgYmluZGVyXG4gKi9cbmV4cG9ydCB0eXBlIEJpbmRlcjxWYWx1ZVR5cGU+ID0gSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+IHwgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+XG5cbi8qKlxuICogQSBsaXN0IG9mIGJpbmRlcnMgd2l0aCBhbnkga2V5IG5hbWVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQmluZGVyczxWYWx1ZVR5cGU+IHtcbiAgW25hbWU6IHN0cmluZ106IEJpbmRlcjxWYWx1ZVR5cGU+O1xufVxuXG5jb25zdCBjcmVhdGVWaWV3ID0gKGJpbmRpbmc6IEJpbmRpbmcsIG1vZGVsczogYW55LCBhbmNob3JFbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgbnVsbCkgPT4ge1xuICBsZXQgdGVtcGxhdGUgPSBiaW5kaW5nLmVsLmNsb25lTm9kZSh0cnVlKTtcbiAgbGV0IHZpZXcgPSBuZXcgVmlldygodGVtcGxhdGUgYXMgTm9kZSksIG1vZGVscywgYmluZGluZy52aWV3Lm9wdGlvbnMpO1xuICB2aWV3LmJpbmQoKTtcbiAgaWYoIWJpbmRpbmcgfHwgIWJpbmRpbmcubWFya2VyIHx8IGJpbmRpbmcubWFya2VyLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIGZvciBiaW5kaW5nIScpO1xuICB9XG5cbiAgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGVtcGxhdGUsIGFuY2hvckVsKTtcblxuICByZXR1cm4gdmlldztcbn1cblxuY29uc3QgYmluZGVyczogSUJpbmRlcnM8YW55PiA9IHtcblxuICAvKipcbiAgICogQmluZHMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgZWxlbWVudC5cbiAgICovXG4gICdvbi0qJzogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIGZ1bmN0aW9uOiB0cnVlLFxuICAgIHByaW9yaXR5OiAxMDAwLFxuXG4gICAgYmluZChlbCkge1xuICAgICAgaWYoIXRoaXMuY3VzdG9tRGF0YSkge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEgPSB7XG4gICAgICAgICAgaGFuZGxlcjogbnVsbFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpIHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkgLypUT0RPKi8pIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaGFuZGxlcikge1xuICAgICAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEuaGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyID0gdGhpcy5ldmVudEhhbmRsZXIodmFsdWUpO1xuICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICB9XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQXBwZW5kcyBib3VuZCBpbnN0YW5jZXMgb2YgdGhlIGVsZW1lbnQgaW4gcGxhY2UgZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuXG4gICAqL1xuICAnZWFjaC0qJzogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIGJsb2NrOiB0cnVlLFxuXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKCF0aGlzLm1hcmtlcikge1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoYCB0aW55YmluZDogJHt0aGlzLnR5cGV9IGApO1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEgPSB7XG4gICAgICAgICAgaXRlcmF0ZWQ6IDxWaWV3W10+IFtdXG4gICAgICAgIH07XG4gICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBwYXJlbnQgbm9kZSEnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSAgPT4ge1xuICAgICAgICAgIHZpZXcuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSA9PiB7XG4gICAgICAgICAgdmlldy51bmJpbmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWwsIGNvbGxlY3Rpb24pIHtcbiAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgbGV0IG1vZGVsTmFtZSA9IHRoaXMuYXJnc1swXTtcbiAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uIHx8IFtdO1xuXG4gICAgICAvLyBUT0RPIHN1cHBvcnQgb2JqZWN0IGtleXMgdG8gaXRlcmF0ZSBvdmVyXG4gICAgICBpZighQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VhY2gtJyArIG1vZGVsTmFtZSArICcgbmVlZHMgYW4gYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLCBidXQgaXQgaXMnKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgaW5kZXggbmFtZSBpcyBzZXRlZCBieSBgaW5kZXgtcHJvcGVydHlgIHVzZSB0aGlzIG5hbWUsIG90aGVyd2lzZSBgJVttb2RlbE5hbWVdJWAgIFxuICAgICAgbGV0IGluZGV4UHJvcCA9IGVsLmdldEF0dHJpYnV0ZSgnaW5kZXgtcHJvcGVydHknKSB8fCB0aGlzLmdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZSk7XG5cbiAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgobW9kZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBzY29wZTogYW55ID0geyRwYXJlbnQ6IHRoaXMudmlldy5tb2RlbHN9O1xuICAgICAgICBzY29wZVtpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgIHNjb3BlW21vZGVsTmFtZV0gPSBtb2RlbDtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbaW5kZXhdO1xuXG4gICAgICAgIGlmICghdmlldykge1xuICAgICAgICAgIGxldCBwcmV2aW91czogQ29tbWVudCB8IEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkW3RoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSAxXS5lbHNbMF07XG4gICAgICAgICAgfSBlbHNlIGlmKHRoaXMubWFya2VyKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHRoaXMubWFya2VyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlldyA9IGNyZWF0ZVZpZXcodGhpcywgc2NvcGUsIHByZXZpb3VzLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQucHVzaCh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldy5tb2RlbHNbbW9kZWxOYW1lXSAhPT0gbW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgbW9kZWxcbiAgICAgICAgICAgIGxldCBtYXRjaEluZGV4LCBuZXh0VmlldztcbiAgICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IGluZGV4ICsgMTsgbmV4dEluZGV4IDwgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWaWV3Lm1vZGVsc1ttb2RlbE5hbWVdID09PSBtb2RlbCkge1xuICAgICAgICAgICAgICAgIG1hdGNoSW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gbW9kZWwgaXMgaW4gb3RoZXIgcG9zaXRpb25cbiAgICAgICAgICAgICAgLy8gdG9kbzogY29uc2lkZXIgYXZvaWRpbmcgdGhlIHNwbGljZSBoZXJlIGJ5IHNldHRpbmcgYSBmbGFnXG4gICAgICAgICAgICAgIC8vIHByb2ZpbGUgcGVyZm9ybWFuY2UgYmVmb3JlIGltcGxlbWVudGluZyBzdWNoIGNoYW5nZVxuICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKG1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXh0Vmlldy5lbHNbMF0sIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgICAgbmV4dFZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vbmV3IG1vZGVsXG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gY3JlYXRlVmlldyh0aGlzLCBzY29wZSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnNwbGljZShpbmRleCwgMCwgbmV4dFZpZXcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3Lm1vZGVsc1tpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggPiBjb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICB0aW1lcyh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoIC0gY29sbGVjdGlvbi5sZW5ndGgsICgpID0+IHtcbiAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5wb3AoKTtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodmlldy5lbHNbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09PSAnT1BUSU9OJyAmJiB0aGlzLnZpZXcuYmluZGluZ3MpIHtcbiAgICAgICAgdGhpcy52aWV3LmJpbmRpbmdzLmZvckVhY2goKGJpbmRpbmc6IEJpbmRpbmcpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5tYXJrZXIgJiYgKGJpbmRpbmcuZWwgPT09IHRoaXMubWFya2VyLnBhcmVudE5vZGUpICYmIChiaW5kaW5nLnR5cGUgPT09ICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUobW9kZWxzKSB7XG4gICAgICBsZXQgZGF0YTogYW55ID0ge307XG4gICAgICAvL3RvZG86IGFkZCB0ZXN0IGFuZCBmaXggaWYgbmVjZXNzYXJ5XG4gICAgICBPYmplY3Qua2V5cyhtb2RlbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ICE9PSB0aGlzLmFyZ3NbMF0pIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSBtb2RlbHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSA9PiB7XG4gICAgICAgIHZpZXcudXBkYXRlKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBBZGRzIG9yIHJlbW92ZXMgdGhlIGNsYXNzIGZyb20gdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIGZhbHNlLlxuICAgKi9cbiAgJ2NsYXNzLSonOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGxldCBlbENsYXNzID0gYCAke2VsLmNsYXNzTmFtZX0gYDtcbiAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPT0gKGVsQ2xhc3MuaW5kZXhPZihgICR7dGhpcy5hcmdzWzBdfSBgKSA+IC0xKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gJHt0aGlzLmFyZ3NbMF19YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsQ2xhc3MucmVwbGFjZShgICR7dGhpcy5hcmdzWzBdfSBgLCAnICcpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGVsZW1lbnQncyB0ZXh0IHZhbHVlLlxuICAgKi9cbiAgdGV4dDogPElPbmVXYXlCaW5kZXI8c3RyaW5nPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyB0aGUgZWxlbWVudCdzIEhUTUwgY29udGVudC5cbiAgICovXG4gIGh0bWw6IDxJT25lV2F5QmluZGVyPHN0cmluZz4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGVsLmlubmVySFRNTCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTaG93cyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gICAqL1xuICBzaG93OiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICB9LFxuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgKG5lZ2F0ZWQgdmVyc2lvbiBvZiBgc2hvd2AgYmluZGVyKS5cbiAgICovXG4gIGhpZGU6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICAgKi9cbiAgZW5hYmxlZDogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MQnV0dG9uRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgfSxcblxuICAvKipcbiAgICogRGlzYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYGVuYWJsZWRgIGJpbmRlcikuXG4gICAqL1xuICBkaXNhYmxlZDogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MQnV0dG9uRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBhIGNoZWNrYm94IG9yIHJhZGlvIGlucHV0IHdoZW4gdGhlIHZhbHVlIGlzIHRydWUuIEFsc28gc2V0cyB0aGUgbW9kZWxcbiAgICogcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgaXMgY2hlY2tlZCBvciB1bmNoZWNrZWQgKHR3by13YXkgYmluZGVyKS5cbiAgICovXG4gIGNoZWNrZWQ6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBwdWJsaXNoZXM6IHRydWUsXG4gICAgcHJpb3JpdHk6IDIwMDAsXG5cbiAgICBiaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjaykge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWUpIHtcbiAgICAgIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSBnZXRTdHJpbmcoZWwudmFsdWUpID09PSBnZXRTdHJpbmcodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBlbGVtZW50J3MgdmFsdWUuIEFsc28gc2V0cyB0aGUgbW9kZWwgcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgY2hhbmdlc1xuICAgKiAodHdvLXdheSBiaW5kZXIpLlxuICAgKi9cbiAgdmFsdWU6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBwdWJsaXNoZXM6IHRydWUsXG4gICAgcHJpb3JpdHk6IDMwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbC50eXBlID09PSAncmFkaW8nO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuZXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2V2ZW50LW5hbWUnKSB8fCAoZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcgPyAnY2hhbmdlJyA6ICdpbnB1dCcpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmN1c3RvbURhdGEuZXZlbnQsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZChlbCkge1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuY3VzdG9tRGF0YS5ldmVudCwgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LCB2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YSAmJiB0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnR5cGUgPT09ICdzZWxlY3QtbXVsdGlwbGUnICYmIGVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZWxbaV07XG4gICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChnZXRTdHJpbmcodmFsdWUpICE9PSBnZXRTdHJpbmcoZWwudmFsdWUpKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogSW5zZXJ0cyBhbmQgYmluZHMgdGhlIGVsZW1lbnQgYW5kIGl0J3MgY2hpbGQgbm9kZXMgaW50byB0aGUgRE9NIHdoZW4gdHJ1ZS5cbiAgICovXG4gIGlmOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MVW5rbm93bkVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgaWYgKCF0aGlzLm1hcmtlcikge1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyB0aW55YmluZDogJyArIHRoaXMudHlwZSArICcgJyArIHRoaXMua2V5cGF0aCArICcgJyk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICBpZighZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9PT0gZmFsc2UgJiYgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgfVxuICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IHRydWU7XG4gICAgfSxcblxuICAgIHVuYmluZCgpIHtcbiAgICAgIGlmICggdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC51bmJpbmQoKTtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuXG4gICAgICAgICAgaWYgKCEgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQgPSBuZXcgVmlldyhlbCwgdGhpcy52aWV3Lm1vZGVscywgdGhpcy52aWV3Lm9wdGlvbnMpO1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgdGhpcy5tYXJrZXIubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlKG1vZGVscykge1xuICAgICAgaWYgKCB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLnVwZGF0ZShtb2RlbHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgYmluZGVycyB9OyIsImltcG9ydCB7IFBSSU1JVElWRSwgS0VZUEFUSCwgcGFyc2VUeXBlIH0gZnJvbSAnLi9wYXJzZXJzJztcbmltcG9ydCB7IE9ic2VydmVyLCBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2sgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IEJpbmRlciwgSU9uZVdheUJpbmRlciwgSVR3b1dheUJpbmRlciB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcblxuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVyT2JzZXJ2ZXJzIHtcbiAgW2tleTogc3RyaW5nXToge1xuICAgIFtrZXk6IHN0cmluZ106IE9ic2VydmVyXG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgZXZlbnRIYW5kbGVyRnVuY3Rpb24gPSAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkO1xuXG4vKipcbiAqIFRPRE8gbW92ZSB0byB1dGlsc1xuICogQHBhcmFtIGVsXG4gKi9cbmZ1bmN0aW9uIGdldElucHV0VmFsdWUoZWw6IEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudCkge1xuICBsZXQgcmVzdWx0czogc3RyaW5nW10gPSBbXTtcbiAgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICByZXR1cm4gKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQ7XG4gIH0gZWxzZSBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1tdWx0aXBsZScpIHtcbiAgICBsZXQgb3B0aW9uczpIVE1MT3B0aW9uc0NvbGxlY3Rpb24gPSAoZWwgYXMgSFRNTFNlbGVjdEVsZW1lbnQpLm9wdGlvbnM7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNba2V5XTtcbiAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChvcHRpb24udmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBGT1JNQVRURVJfQVJHUyA9ICAvW15cXHMnXSt8JyhbXiddfCdbXlxcc10pKid8XCIoW15cIl18XCJbXlxcc10pKlwiL2c7XG5leHBvcnQgY29uc3QgRk9STUFUVEVSX1NQTElUID0gL1xccysvO1xuXG4vKipcbiAqICBBIHNpbmdsZSBiaW5kaW5nIGJldHdlZW4gYSBtb2RlbCBhdHRyaWJ1dGUgYW5kIGEgRE9NIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5kaW5nIHtcbiAgdmFsdWU/OiBhbnk7XG4gIG9ic2VydmVyPzogT2JzZXJ2ZXI7XG4gIHZpZXc6IFZpZXc7XG4gIGVsOiBIVE1MRWxlbWVudDtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGJpbmRlciB3aXRob3V0IHRoZSBwcmVmaXhcbiAgICovXG4gIHR5cGU6IHN0cmluZyB8IG51bGw7XG4gIGJpbmRlcjogQmluZGVyPGFueT4gfCBudWxsO1xuICBmb3JtYXR0ZXJzOiBzdHJpbmdbXSB8IG51bGw7XG4gIGZvcm1hdHRlck9ic2VydmVyczogSUZvcm1hdHRlck9ic2VydmVycyA9IHt9O1xuICBrZXlwYXRoOiBzdHJpbmcgfCBudWxsO1xuICAvKipcbiAgICogQXJndW1lbnRzIHBhcnNlZCBmcm9tIHN0YXIgYmluZGVycywgZS5nLiBvbiBmb28tKi0qIGFyZ3NbMF0gaXMgdGhlIGZpcnN0IHN0YXIsIGFyZ3NbMV0gdGhlIHNlY29uZC1cbiAgICovXG4gIGFyZ3M6IHN0cmluZ1tdIHwgbnVsbDtcbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgbW9kZWw/OiBhbnk7XG4gIC8qKlxuICAgKiBIVE1MIENvbW1lbnQgdG8gbWFyayBhIGJpbmRpbmcgaW4gdGhlIERPTVxuICAgKi9cbiAgbWFya2VyPzogQ29tbWVudDtcbiAgLyoqXG4gICAqIFVzZWQgaW4gY29tcG9uZW50IGJpbmRpbmdzLiBUT0RPIGUuZy4gbW92ZSB0byBDb21wb25lbnRCaW5kaW5nIG9yIGJpbmRlcnM/XG4gICAqL1xuICBfYm91bmQ/OiBib29sZWFuO1xuICAvKipcbiAgICoganVzdCB0byBoYXZlIGEgdmFsdWUgd2hlcmUgd2UgY291bGQgc3RvcmUgY3VzdG9tIGRhdGFcbiAgICovXG4gIGN1c3RvbURhdGE/OiBhbnk7XG5cbiAgLyoqXG4gICAqIEFsbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYmluZGluZyBpcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3I7IHRoZVxuICAgKiBjb250YWluaW5nIHZpZXcsIHRoZSBET00gbm9kZSwgdGhlIHR5cGUgb2YgYmluZGluZywgdGhlIG1vZGVsIG9iamVjdCBhbmQgdGhlXG4gICAqIGtleXBhdGggYXQgd2hpY2ggdG8gbGlzdGVuIGZvciBjaGFuZ2VzLlxuICAgKiBAcGFyYW0geyp9IHZpZXcgXG4gICAqIEBwYXJhbSB7Kn0gZWwgXG4gICAqIEBwYXJhbSB7Kn0gdHlwZSBcbiAgICogQHBhcmFtIHsqfSBrZXlwYXRoIFxuICAgKiBAcGFyYW0geyp9IGJpbmRlciBcbiAgICogQHBhcmFtIHsqfSBhcmdzIFRoZSBzdGFydCBiaW5kZXJzLCBvbiBgY2xhc3MtKmAgYXJnc1swXSB3aWwgYmUgdGhlIGNsYXNzbmFtZSBcbiAgICogQHBhcmFtIHsqfSBmb3JtYXR0ZXJzIFxuICAgKi9cbiAgY29uc3RydWN0b3IodmlldzogVmlldywgZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcgfCBudWxsLCBrZXlwYXRoOiBzdHJpbmcgfCBudWxsLCBiaW5kZXI6IEJpbmRlcjxhbnk+IHwgbnVsbCwgYXJnczogc3RyaW5nW10gfCBudWxsLCBmb3JtYXR0ZXJzOiBzdHJpbmdbXSB8IG51bGwpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5iaW5kZXIgPSBiaW5kZXI7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIHRoaXMubW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jdXN0b21EYXRhID0ge307XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUgb2JqZWN0IGtleXBhdGhcbiAgICogQHBhcmFtIG9iaiBcbiAgICogQHBhcmFtIGtleXBhdGggXG4gICAqL1xuICBvYnNlcnZlKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrPzogSU9ic2VydmVyU3luY0NhbGxiYWNrKTogT2JzZXJ2ZXIge1xuICAgIGlmKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmVyKG9iaiwga2V5cGF0aCwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmVyKG9iaiwga2V5cGF0aCwgdGhpcyk7XG4gICAgfVxuICAgIFxuICB9XG5cbiAgcGFyc2VUYXJnZXQoKSB7XG4gICAgaWYgKHRoaXMua2V5cGF0aCkge1xuICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKHRoaXMua2V5cGF0aCk7XG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKXtcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCB0aGlzLmtleXBhdGgpO1xuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZSBpbiB0b2tlbicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEdldCB0aGUgaXRlcmF0aW9uIGFsaWFzLCB1c2VkIGluIHRoZSBpbnRlcmF0aW9uIGJpbmRlcnMgbGlrZSBgZWFjaC0qYFxuICAgKiBAcGFyYW0geyp9IG1vZGVsTmFtZSBcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDI2XG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pa2VyaWMvcml2ZXRzL2Jsb2IvbWFzdGVyL2Rpc3Qvcml2ZXRzLmpzI0wxMTc1XG4gICAqL1xuICBnZXRJdGVyYXRpb25BbGlhcyhtb2RlbE5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiAnJScgKyBtb2RlbE5hbWUgKyAnJSc7XG4gIH1cblxuICBwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzOiBzdHJpbmdbXSwgZm9ybWF0dGVySW5kZXg6IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gYXJnc1xuICAgIC5tYXAocGFyc2VUeXBlKVxuICAgIC5tYXAoKHt0eXBlLCB2YWx1ZX0sIGFpKSA9PiB7XG4gICAgICBpZiAodHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZVZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBwcmltaXRpdmVWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gS0VZUEFUSCkge1xuICAgICAgICAvLyBrZXlwYXRoIGlzIHN0cmluZ1xuICAgICAgICBjb25zdCBrZXlwYXRoID0gKHZhbHVlIGFzIHN0cmluZyApO1xuICAgICAgICBpZiAoIXRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XSkge1xuICAgICAgICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdW2FpXTtcblxuICAgICAgICBpZiAoIW9ic2VydmVyKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywga2V5cGF0aCk7XG4gICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdW2FpXSA9IG9ic2VydmVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYnNlcnZlci52YWx1ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGFyZ3VtZW50IHR5cGUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGFsbCB0aGUgY3VycmVudCBmb3JtYXR0ZXJzIHRvIHRoZSBzdXBwbGllZCB2YWx1ZSBhbmQgcmV0dXJucyB0aGVcbiAgICogZm9ybWF0dGVkIHZhbHVlLlxuICAgKi9cbiAgZm9ybWF0dGVkVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmKHRoaXMuZm9ybWF0dGVycyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtYXR0ZXJzIGlzIG51bGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVycy5yZWR1Y2UoKHJlc3VsdDogYW55LypjaGVjayB0eXBlKi8sIGRlY2xhcmF0aW9uOiBzdHJpbmcgLypjaGVjayB0eXBlKi8sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGxldCBhcmdzID0gZGVjbGFyYXRpb24ubWF0Y2goRk9STUFUVEVSX0FSR1MpO1xuICAgICAgaWYoYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFyZ3MgbWF0Y2hlZCBmcm9tIEZPUk1BVFRFUl9BUkdTJyk7XG4gICAgICB9XG4gICAgICBsZXQgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICBpZighaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBpZCBmb3VuZCBpbiBhcmdzJyk7XG4gICAgICB9XG4gICAgICBsZXQgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG5cbiAgICAgIGNvbnN0IHByb2Nlc3NlZEFyZ3MgPSB0aGlzLnBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3MsIGluZGV4KTtcblxuICAgICAgaWYgKGZvcm1hdHRlciAmJiAoZm9ybWF0dGVyLnJlYWQgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyLnJlYWQocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH0gZWxzZSBpZiAoZm9ybWF0dGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBiaW5kaW5nIGFyb3VuZCB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICAqL1xuICBldmVudEhhbmRsZXIoZm46IGV2ZW50SGFuZGxlckZ1bmN0aW9uKTogKGV2OiBFdmVudCkgPT4gYW55IHtcbiAgICBsZXQgYmluZGluZyA9IHRoaXM7XG4gICAgbGV0IGhhbmRsZXIgPSBiaW5kaW5nLnZpZXcub3B0aW9ucy5oYW5kbGVyO1xuXG4gICAgcmV0dXJuIChldikgPT4ge1xuICAgICAgaWYoIWhhbmRsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBoYW5kbGVyIGRlZmluZWQgaW4gYmluZGluZy52aWV3Lm9wdGlvbnMuaGFuZGxlcicpO1xuICAgICAgfVxuICAgICAgaGFuZGxlci5jYWxsKGZuLCB0aGlzLCBldiwgYmluZGluZyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBmb3IgdGhlIGJpbmRpbmcuIFRoaXMgQmFzaWNhbGx5IGp1c3QgcnVucyB0aGUgYmluZGluZyByb3V0aW5lXG4gICAqIHdpdGggdGhlIHN1cHBsaWVkIHZhbHVlIGZvcm1hdHRlZC5cbiAgICovXG4gIHNldCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSAmJiAhKHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55PiApLmZ1bmN0aW9uKSB7XG4gICAgICB2YWx1ZSA9ICh2YWx1ZSBhcyBJT25lV2F5QmluZGVyPGFueT4gKVxuICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlKHZhbHVlLmNhbGwodGhpcy5tb2RlbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9ICh2YWx1ZSBhcyBJVHdvV2F5QmluZGVyPGFueT4gKVxuICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBsZXQgcm91dGluZUZuO1xuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdyb3V0aW5lJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgcm91dGluZUZuID0gdGhpcy5iaW5kZXIucm91dGluZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElPbmVXYXlCaW5kZXI8YW55Pik7XG4gICAgICByb3V0aW5lRm4gPSB0aGlzLmJpbmRlcjtcbiAgICB9XG5cbiAgICBpZiAocm91dGluZUZuIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJvdXRpbmVGbi5jYWxsKHRoaXMsIHRoaXMuZWwsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3luY3MgdXAgdGhlIHZpZXcgYmluZGluZyB3aXRoIHRoZSBtb2RlbC5cbiAgICovXG4gIHN5bmMoKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICAgIHRoaXMuc2V0KHRoaXMub2JzZXJ2ZXIudmFsdWUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaXNoZXMgdGhlIHZhbHVlIGN1cnJlbnRseSBzZXQgb24gdGhlIGlucHV0IGVsZW1lbnQgYmFjayB0byB0aGUgbW9kZWwuXG4gICAqL1xuICBwdWJsaXNoKCkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICBpZih0aGlzLmZvcm1hdHRlcnMgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtYXR0ZXJzIGlzIG51bGwnKTtcbiAgICAgIH1cbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVycy5yZWR1Y2VSaWdodCgocmVzdWx0OiBhbnkvKmNoZWNrIHR5cGUqLywgZGVjbGFyYXRpb246IHN0cmluZyAvKmNoZWNrIHR5cGUqLywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBhcmdzID0gZGVjbGFyYXRpb24uc3BsaXQoRk9STUFUVEVSX1NQTElUKTtcbiAgICAgICAgY29uc3QgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGlmKCFpZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWQgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICAgIGlmIChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLnB1Ymxpc2gpIHtcbiAgICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucHVibGlzaChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB0aGlzLmdldFZhbHVlKCh0aGlzLmVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpKSk7XG5cbiAgICAgIHRoaXMub2JzZXJ2ZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIHRoZSBtb2RlbCBmb3IgY2hhbmdlcyBhdCB0aGUgc3BlY2lmaWVkIGtleXBhdGguIEJpLWRpcmVjdGlvbmFsXG4gICAqIHJvdXRpbmVzIHdpbGwgYWxzbyBsaXN0ZW4gZm9yIGNoYW5nZXMgb24gdGhlIGVsZW1lbnQgdG8gcHJvcGFnYXRlIHRoZW0gYmFja1xuICAgKiB0byB0aGUgbW9kZWwuXG4gICAqL1xuICBiaW5kKCkge1xuICAgIHRoaXMucGFyc2VUYXJnZXQoKTtcblxuICAgIGlmICh0aGlzLmJpbmRlciAmJiB0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnYmluZCcpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICh0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYoIXRoaXMuYmluZGVyLmJpbmQgJiYgdHlwZW9mKHRoaXMuYmluZGVyLmJpbmQpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIG1ldGhvZCBiaW5kIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmJpbmRlci5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhKSB7XG4gICAgICB0aGlzLnN5bmMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmVzIGZyb20gdGhlIG1vZGVsIGFuZCB0aGUgZWxlbWVudC5cbiAgICovXG4gIHVuYmluZCgpIHtcbiAgICBpZih0aGlzLmJpbmRlciA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kZXIgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZih0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnYmluZCcpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmICh0aGlzLmJpbmRlci51bmJpbmQpIHtcbiAgICAgICAgdGhpcy5iaW5kZXIudW5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIudW5vYnNlcnZlKCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMpLmZvckVhY2goZmkgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmaV07XG5cbiAgICAgIE9iamVjdC5rZXlzKGFyZ3MpLmZvckVhY2goYWkgPT4ge1xuICAgICAgICBhcmdzW2FpXS51bm9ic2VydmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBiaW5kaW5nJ3MgbW9kZWwgZnJvbSB3aGF0IGlzIGN1cnJlbnRseSBzZXQgb24gdGhlIHZpZXcuIFVuYmluZHNcbiAgICogdGhlIG9sZCBtb2RlbCBmaXJzdCBhbmQgdGhlbiByZS1iaW5kcyB3aXRoIHRoZSBuZXcgbW9kZWwuXG4gICAqIEBwYXJhbSB7YW55fSBtb2RlbHMgXG4gICAqL1xuICB1cGRhdGUobW9kZWxzOiBhbnkgPSB7fSkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCd1cGRhdGUnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZiAodGhpcy5iaW5kZXIudXBkYXRlKSB7XG4gICAgICAgIHRoaXMuYmluZGVyLnVwZGF0ZS5jYWxsKHRoaXMsIG1vZGVscyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZWxlbWVudHMgdmFsdWVcbiAgICogQHBhcmFtIGVsIFxuICAgKi9cbiAgZ2V0VmFsdWUoZWw6IEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudCkge1xuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdnZXRWYWx1ZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmKHR5cGVvZih0aGlzLmJpbmRlci5nZXRWYWx1ZSkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRWYWx1ZSBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYmluZGVyLmdldFZhbHVlLmNhbGwodGhpcywgZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0SW5wdXRWYWx1ZShlbCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB0aW55YmluZCwgSU9wdGlvbnNQYXJhbSB9IGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHsgUFJJTUlUSVZFLCBLRVlQQVRILCBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgQmluZGluZywgRk9STUFUVEVSX0FSR1MsIElGb3JtYXR0ZXJPYnNlcnZlcnMgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgSUJpbmRlcnMgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgSUZvcm1hdHRlcnMgfSBmcm9tICcuL2Zvcm1hdHRlcnMnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBJQ29tcG9uZW50LCBJQ29tcG9uZW50cyB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBPYnNlcnZlciwgSU9ic2VydmVycyB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IG1lcmdlT2JqZWN0IH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5kRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcdFxuICBfYm91bmQ/OiBib29sZWFuXHRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVyc09ic2VydmVycyB7XG4gIFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IElGb3JtYXR0ZXJPYnNlcnZlcnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUtleXBhdGhzIHtcbiAgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogc3RyaW5nO1xufVxuXG4vKipcbiAqIGNvbXBvbmVudCB2aWV3IGVuY2Fwc3VsYXRlZCBhcyBhIGJpbmRpbmcgd2l0aGluIGl0J3MgcGFyZW50IHZpZXcuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRCaW5kaW5nIGV4dGVuZHMgQmluZGluZyB7XG4gIHZpZXc6IFZpZXc7XG4gIGNvbXBvbmVudFZpZXc/OiBWaWV3O1xuICBlbDogSUJvdW5kRWxlbWVudDtcbiAgdHlwZTogc3RyaW5nO1xuICBjb21wb25lbnQ6IElDb21wb25lbnQ8YW55PjtcbiAgLyoqXG4gICAqIHN0YXRpYyB2YWx1ZXMgKFBSSU1JVElWRSBBdHRyaWJ1dGVzKVxuICAgKi9cbiAgc3RhdGljOiBhbnkgPSB7fTtcbiAgLyoqXG4gICAqIGtleXBhdGggdmFsdWVzIChLRVlQQVRIIEF0dHJpYnV0ZXMpXG4gICAqL1xuICBrZXlwYXRoczogSUtleXBhdGhzID0ge307XG4gIGZvcm1hdHRlcnNPYnNlcnZlcnM6IElGb3JtYXR0ZXJzT2JzZXJ2ZXJzID0ge307XG4gIG9ic2VydmVyczogSU9ic2VydmVycztcbiAgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICBwaXBlczogYW55ID0ge307XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGEgY29tcG9uZW50IGJpbmRpbmcgZm9yIHRoZSBzcGVjaWZpZWQgdmlldy4gVGhlIHJhdyBjb21wb25lbnRcbiAgICogZWxlbWVudCBpcyBwYXNzZWQgaW4gYWxvbmcgd2l0aCB0aGUgY29tcG9uZW50IHR5cGUuIEF0dHJpYnV0ZXMgYW5kIHNjb3BlXG4gICAqIGluZmxlY3Rpb25zIGFyZSBkZXRlcm1pbmVkIGJhc2VkIG9uIHRoZSBjb21wb25lbnRzIGRlZmluZWQgYXR0cmlidXRlcy5cbiAgICogXG4gICAqIEBwYXJhbSB2aWV3IFxuICAgKiBAcGFyYW0gZWwgXG4gICAqIEBwYXJhbSB0eXBlIFxuICAgKi9cbiAgY29uc3RydWN0b3IodmlldzogVmlldywgZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcpIHtcbiAgICBzdXBlcih2aWV3LCBlbCwgdHlwZSwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHZpZXcub3B0aW9ucy5jb21wb25lbnRzW3RoaXMudHlwZV07XG4gICAgdGhpcy5zdGF0aWMgPSB7fTtcbiAgICB0aGlzLm9ic2VydmVycyA9IHt9OyAgICAgICAgXG4gICAgdGhpcy5wYXJzZVRhcmdldCgpO1xuICAgIHRoaXMuc3luYygpO1xuICB9ICAgXG4gICAgXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB2YWx1ZXMgaW4gbW9kZWwgd2hlbiB0aGUgb2JzZXJ2ZXIgY2FsbHMgdGhpcyBmdW5jdGlvbiBcbiAgICovXG4gIHN5bmMoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2gocHJvcGVydHlOYW1lID0+IHtcbiAgICAgIHRoaXMudmlldy5tb2RlbHNbcHJvcGVydHlOYW1lXSA9IHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV0udmFsdWUoKTtcbiAgICAgIC8vIFRPRE9cbiAgICAgIC8vIHRoaXMudmlldy5tb2RlbHNbcHJvcGVydHlOYW1lXSA9IHRoaXMuZm9ybWF0dGVkVmFsdWVzKHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV0udmFsdWUoKSwgcHJvcGVydHlOYW1lKTtcbiAgICB9KTtcbiAgfVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6dXBkYXRlYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAgKiB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gICAqL1xuICB1cGRhdGUoKSB7fVxuICAgIFxuICAvKipcbiAgICogUHVibGlzaGVzIHRoZSB2YWx1ZSBjdXJyZW50bHkgc2V0IG9uIHRoZSBtb2RlbCBiYWNrIHRvIHRoZSBwYXJlbnQgbW9kZWwuXG4gICAqIFlvdSBuZWVkIHRvIGNhbGwgdGhpcyBtZXRob2QgbWFudWFsbHkgaW4geW91ciBjb21wb25lbnRcbiAgICovXG4gIHB1Ymxpc2gocHJvcGVydHlOYW1lPzogc3RyaW5nLCB2YWx1ZT86IGFueSkge1xuICAgIGlmKHByb3BlcnR5TmFtZSkge1xuICAgICAgaWYodGhpcy5vYnNlcnZlcnNbcHJvcGVydHlOYW1lXSkge1xuICAgICAgICB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc3luYyBhbGwgb2JzZXJ2ZXJzXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChwcm9wZXJ0eU5hbWUgPT4ge1xuICAgICAgICB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdLnNldFZhbHVlKHRoaXMudmlldy5tb2RlbHNbcHJvcGVydHlOYW1lXSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuICAgIFxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgbWFwIHVzaW5nIHRoZSBjb21wb25lbnQncyBzY29wZSBpbmZsZWN0aW9ucy5cbiAgICovXG4gIGxvY2FscygpIHtcbiAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcbiAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLnN0YXRpYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLmZvcm1hdHRlZFZhbHVlcyh0aGlzLnN0YXRpY1trZXldLCBrZXkpO1xuICAgIH0pO1xuICAgIFxuICAgIC8qKlxuICAgICAqIFxuICAgICAqL1xuICAgIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAvLyBUT0RPIGZpeG1lXG4gICAgICByZXN1bHRba2V5XSA9IHRoaXMub2JzZXJ2ZXJzW2tleV0udmFsdWUoKTtcbiAgICAgIC8vIHJlc3VsdFtrZXldID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZXModGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpLCBrZXkpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgICBcblxuICAvKipcbiAgICogUmV0dXJucyBhIGNhbWVsLWNhc2VkIHZlcnNpb24gb2YgdGhlIHN0cmluZy4gVXNlZCB3aGVuIHRyYW5zbGF0aW5nIGFuXG4gICAqIGVsZW1lbnQncyBhdHRyaWJ1dGUgbmFtZSBpbnRvIGEgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGNvbXBvbmVudCdzIHNjb3BlLlxuICAgKiBUT0RPIG1vdmUgdG8gdXRpbHNcbiAgICogQHBhcmFtIHN0cmluZyBcbiAgICovXG4gIGNhbWVsQ2FzZShzdHJpbmc6IHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLShbYS16XSkvZywgZ3JvdXBlZCA9PiB7XG4gICAgICByZXR1cm4gZ3JvdXBlZFsxXS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TWVyZ2VkT3B0aW9ucygpIHtcbiAgICB2YXIgb3B0aW9uczogSU9wdGlvbnNQYXJhbSA9IHtcbiAgICAgIC8vIEVYVEVOU0lPTlNcbiAgICAgIGJpbmRlcnM6IDxJQmluZGVyczxhbnk+PiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgY29tcG9uZW50czogPElDb21wb25lbnRzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgfTtcbiAgICBcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmJpbmRlcnMsIHRoaXMuY29tcG9uZW50LmJpbmRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuZm9ybWF0dGVycywgdGhpcy5jb21wb25lbnQuZm9ybWF0dGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5jb21wb25lbnRzLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmFkYXB0ZXJzLCB0aGlzLmNvbXBvbmVudC5hZGFwdGVycyk7XG5cbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmJpbmRlcnMsIHRoaXMudmlldy5vcHRpb25zLmJpbmRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuZm9ybWF0dGVycywgdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5jb21wb25lbnRzLCB0aGlzLnZpZXcub3B0aW9ucy5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmFkYXB0ZXJzLCB0aGlzLnZpZXcub3B0aW9ucy5hZGFwdGVycyk7XG5cbiAgICBvcHRpb25zLnByZWZpeCA9IHRoaXMuY29tcG9uZW50LnByZWZpeCA/IHRoaXMuY29tcG9uZW50LnByZWZpeCA6IHRoaXMudmlldy5vcHRpb25zLnByZWZpeFxuICAgIG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID0gdGhpcy5jb21wb25lbnQudGVtcGxhdGVEZWxpbWl0ZXJzID8gdGhpcy5jb21wb25lbnQudGVtcGxhdGVEZWxpbWl0ZXJzIDogdGhpcy52aWV3Lm9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzXG4gICAgb3B0aW9ucy5yb290SW50ZXJmYWNlID0gdGhpcy5jb21wb25lbnQucm9vdEludGVyZmFjZSA/IHRoaXMuY29tcG9uZW50LnJvb3RJbnRlcmZhY2UgOiB0aGlzLnZpZXcub3B0aW9ucy5yb290SW50ZXJmYWNlXG4gICAgb3B0aW9ucy5wcmVsb2FkRGF0YSA9IHRoaXMuY29tcG9uZW50LnByZWxvYWREYXRhID8gdGhpcy5jb21wb25lbnQucHJlbG9hZERhdGEgOiB0aGlzLnZpZXcub3B0aW9ucy5wcmVsb2FkRGF0YVxuICAgIG9wdGlvbnMuaGFuZGxlciA9IHRoaXMuY29tcG9uZW50LmhhbmRsZXIgPyB0aGlzLmNvbXBvbmVudC5oYW5kbGVyIDogdGhpcy52aWV3Lm9wdGlvbnMuaGFuZGxlclxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpiaW5kYCB0byBidWlsZCBgdGhpcy5jb21wb25lbnRWaWV3YCB3aXRoIGEgbG9jYWxpemVkXG4gICAqIG1hcCBvZiBtb2RlbHMgZnJvbSB0aGUgcm9vdCB2aWV3LiBCaW5kIGB0aGlzLmNvbXBvbmVudFZpZXdgIG9uIHN1YnNlcXVlbnQgY2FsbHMuXG4gICAqL1xuICBiaW5kKCkge1xuICAgIGlmICghdGhpcy5lbC5fYm91bmQpIHtcbiAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdGhpcy5jb21wb25lbnQudGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgICAgIC8qKlxuICAgICAgICogdGhlcmUncyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHRoYXQgbWFrZXMgaW1wb3J0ZWQgVmlldyBhIGR1bW15IG9iamVjdC4gVXNlIHRpbnliaW5kLmJpbmRcbiAgICAgICAqL1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy52aWV3ID0gdGlueWJpbmQuYmluZChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsLmNoaWxkTm9kZXMpLCBzY29wZSwgdGhpcy5nZXRNZXJnZWRPcHRpb25zKCkpO1xuICAgICAgdGhpcy5lbC5fYm91bmQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXcuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlVGFyZ2V0KCkge1xuXG4gICAgLy8gcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZXNcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5lbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gdGhpcy5lbC5hdHRyaWJ1dGVzW2ldO1xuXG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIG5vdCB3aXRoIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2LVxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YodGhpcy5iaW5kaW5nUHJlZml4KSAhPT0gMCkge1xuICAgICAgICBsZXQgcHJvcGVydHlOYW1lID0gdGhpcy5jYW1lbENhc2UoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICBjb25zdCBkZWNsYXJhdGlvbiA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgY29uc3QgcGFyc2VkRGVjbGFyYXRpb24gPSBWaWV3LnBhcnNlRGVjbGFyYXRpb24oZGVjbGFyYXRpb24pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5waXBlc1twcm9wZXJ0eU5hbWVdID0gcGFyc2VkRGVjbGFyYXRpb24ucGlwZXM7XG4gICAgICAgIGlmKHBhcnNlZERlY2xhcmF0aW9uLmtleXBhdGggPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhcnNlZERlY2xhcmF0aW9uLmtleXBhdGggaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZShwYXJzZWREZWNsYXJhdGlvbi5rZXlwYXRoKTtcbiAgICAgIGlmKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICAgIHRoaXMuc3RhdGljW3Byb3BlcnR5TmFtZV0gPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgICB0aGlzLmtleXBhdGhzW3Byb3BlcnR5TmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgICAgdGhpcy5vYnNlcnZlcnNbcHJvcGVydHlOYW1lXSA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCB0aGlzLmtleXBhdGhzW3Byb3BlcnR5TmFtZV0sIHRoaXMpO1xuICAgICAgICAgIC8vIG1vZGVsIGJpZGluZyBpcyBjYWxsZWQgaW4gdGhpcy5zeW5jISFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFxuICAgKiBAcGFyYW0gYXJncyBwYXJzZXMgdGhlIGZvcm1hdHRlcnMgaW4gYXJndW1lbnRzXG4gICAqIEBwYXJhbSBmb3JtYXR0ZXJJbmRleCBcbiAgICovXG4gIHBhcnNlRm9ybWF0dGVyQXJndW1lbnRzUHJvcGVydHkoYXJnczogc3RyaW5nW10sIGZvcm1hdHRlckluZGV4OiBudW1iZXIsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBhcmdzXG4gICAgLm1hcChwYXJzZVR5cGUpXG4gICAgLm1hcCgoe3R5cGUsIHZhbHVlfSwgYWkpID0+IHtcbiAgICAgIGlmICh0eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZVZhbHVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUT0RPJywgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgLy8ga2V5cGF0aCBpcyBzdHJpbmdcbiAgICAgICAgY29uc3Qga2V5cGF0aCA9ICh2YWx1ZSBhcyBzdHJpbmcgKTtcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1hdHRlcnNPYnNlcnZlcnNbcHJvcGVydHlOYW1lXSkge1xuICAgICAgICAgIHRoaXMuZm9ybWF0dGVyc09ic2VydmVyc1twcm9wZXJ0eU5hbWVdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmZvcm1hdHRlcnNPYnNlcnZlcnNbcHJvcGVydHlOYW1lXVtmb3JtYXR0ZXJJbmRleF0pIHtcbiAgICAgICAgICB0aGlzLmZvcm1hdHRlcnNPYnNlcnZlcnNbcHJvcGVydHlOYW1lXVtmb3JtYXR0ZXJJbmRleF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMuZm9ybWF0dGVyc09ic2VydmVyc1twcm9wZXJ0eU5hbWVdW2Zvcm1hdHRlckluZGV4XVthaV07XG5cbiAgICAgICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgICAgIG9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIGtleXBhdGgpO1xuICAgICAgICAgIHRoaXMuZm9ybWF0dGVyc09ic2VydmVyc1twcm9wZXJ0eU5hbWVdW2Zvcm1hdHRlckluZGV4XVthaV0gPSBvYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIudmFsdWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBhcmd1bWVudCB0eXBlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbGwgdGhlIGN1cnJlbnQgZm9ybWF0dGVycyB0byB0aGUgc3VwcGxpZWQgdmFsdWUgYW5kIHJldHVybnMgdGhlXG4gICAqIGZvcm1hdHRlZCB2YWx1ZS5cbiAgICovXG4gIGZvcm1hdHRlZFZhbHVlcyh2YWx1ZTogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgIGlmKHRoaXMucGlwZXNbcHJvcGVydHlOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtYXR0ZXJzIGlzIG51bGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGlwZXNbcHJvcGVydHlOYW1lXS5yZWR1Y2UoKHJlc3VsdDogYW55LypjaGVjayB0eXBlKi8sIGRlY2xhcmF0aW9uOiBzdHJpbmcgLypjaGVjayB0eXBlKi8sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGxldCBhcmdzID0gZGVjbGFyYXRpb24ubWF0Y2goRk9STUFUVEVSX0FSR1MpO1xuICAgICAgaWYoYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFyZ3MgbWF0Y2hlZCBmcm9tIEZPUk1BVFRFUl9BUkdTJyk7XG4gICAgICB9XG4gICAgICBsZXQgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICBpZighaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBpZCBmb3VuZCBpbiBhcmdzJyk7XG4gICAgICB9XG4gICAgICBsZXQgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG5cbiAgICAgIGNvbnN0IHByb2Nlc3NlZEFyZ3MgPSB0aGlzLnBhcnNlRm9ybWF0dGVyQXJndW1lbnRzUHJvcGVydHkoYXJncywgaW5kZXgsIHByb3BlcnR5TmFtZSk7XG5cbiAgICAgIGlmIChmb3JtYXR0ZXIgJiYgKGZvcm1hdHRlci5yZWFkIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5yZWFkKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlcihyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB2YWx1ZSk7XG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdCBgdGlueWJpbmQuQmluZGluZzo6dW5iaW5kYCB0byBiZSBjYWxsZWQgb24gYHRoaXMuY29tcG9uZW50Vmlld2AuXG4gICAqL1xuICB1bmJpbmQoKSB7ICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2ZXJzKS5mb3JFYWNoKHByb3BlcnR5TmFtZSA9PiB7XG4gICAgICB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdLnVub2JzZXJ2ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGlmICh0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cbn0iLCJleHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXIge1xuICAodmFsOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogYW55O1xuICByZWFkPzogKHJlc3VsdDogc3RyaW5nLCAuLi5wcm9jZXNzZWRBcmdzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgcHVibGlzaD86IChyZXN1bHQ6IHN0cmluZywgLi4ucHJvY2Vzc2VkQXJnczogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUZvcm1hdHRlcjtcbn1cblxuY29uc3QgZm9ybWF0dGVyczogSUZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBuZWdhdGUgYSBib29sZWFuIHZhbHVlXG4gKi9cbmZvcm1hdHRlcnMubm90ID0gZnVuY3Rpb24gKHZhbHVlOiBib29sZWFuKSB7XG4gIHJldHVybiAhdmFsdWU7XG59O1xuXG4vKipcbiAqIHBhcnNlIGpzb24gc3RyaW5nIHRvIG9iamVjdFxuICogQGV4YW1wbGUgPGRpdiBydi1jbGFzcz0nXCJbXCJjb2wtMlwiLCBcImNvbC0zXCIsIFwiY29sLTRcIiwgXCJjb2wtNVwiLCBcImNvbC02XCJdXCIgfCBwYXJzZSB8IHJhbmRvbSc+XG4gKi9cbmZvcm1hdHRlcnMucGFyc2UgPSAoanNvblN0cmluZzogc3RyaW5nKSA9PiB7XG4gIGlmICh0eXBlb2YoanNvblN0cmluZykgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3Qgb2JqZWN0ID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBwYXJzZSBqc29uIHN0cmluZyB0byBvYmplY3RcbiAqIEBleGFtcGxlIDxkaXYgcnYtY2xhc3M9J1wiW1wiY29sLTJcIiwgXCJjb2wtM1wiLCBcImNvbC00XCIsIFwiY29sLTVcIiwgXCJjb2wtNlwiXVwiIHwgcGFyc2UgfCByYW5kb20nPlxuICovXG5mb3JtYXR0ZXJzLmpzb24gPSAob2JqOiBhbnkpID0+IHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG59O1xuXG5leHBvcnQgeyBmb3JtYXR0ZXJzIH07XG4iLCJcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi90aW55YmluZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyU3luY0NhbGxiYWNrIHtcbiAgc3luYzogKCkgPT4gdm9pZDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUtleSB7XG4gIHBhdGg6IGFueTtcbiAgaTogUm9vdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXJzIHtcbiAgW2tleTogc3RyaW5nXTogT2JzZXJ2ZXI7XG59XG5cbmV4cG9ydCB0eXBlIE9iaiA9IGFueTtcblxuZXhwb3J0IHR5cGUgUm9vdCA9IGFueTtcblxuLy8gRXJyb3IgdGhyb3dlci5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1tPYnNlcnZlcl0gJyArIG1lc3NhZ2UpXG59XG5cbi8vIFRPRE9cbmxldCBhZGFwdGVyczogSUFkYXB0ZXJzO1xubGV0IGludGVyZmFjZXM6IHN0cmluZ1tdO1xubGV0IHJvb3RJbnRlcmZhY2U6IFJvb3Q7XG5cbmV4cG9ydCBjbGFzcyBPYnNlcnZlciB7XG4gIGtleXBhdGg6IHN0cmluZztcbiAgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaztcbiAgb2JqZWN0UGF0aDogT2JqW107XG4gIG9iajogT2JqO1xuICB0YXJnZXQ6IE9iajtcbiAga2V5OiBJS2V5O1xuICB0b2tlbnM6IElLZXlbXTtcblxuICAvKipcbiAgICogQ29uc3RydWN0cyBhIG5ldyBrZXlwYXRoIG9ic2VydmVyIGFuZCBraWNrcyB0aGluZ3Mgb2ZmLlxuICAgKiBAcGFyYW0gb2JqIFxuICAgKiBAcGFyYW0ga2V5cGF0aCBcbiAgICogQHBhcmFtIGNhbGxiYWNrIFxuICAgKi9cbiAgY29uc3RydWN0b3Iob2JqOiBPYmosIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMub2JqZWN0UGF0aCA9IFtdO1xuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gdGhpcy5wYXJzZSgpO1xuICAgIHRoaXMua2V5ID0gcGFyc2VSZXN1bHQua2V5O1xuICAgIHRoaXMudG9rZW5zID0gcGFyc2VSZXN1bHQudG9rZW5zO1xuICAgIHRoaXMub2JqID0gdGhpcy5nZXRSb290T2JqZWN0KG9iaik7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLnJlYWxpemUoKTtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldCh0cnVlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9uczogSVZpZXdPcHRpb25zKSB7XG4gICAgYWRhcHRlcnMgPSBvcHRpb25zLmFkYXB0ZXJzO1xuICAgIGludGVyZmFjZXMgPSBPYmplY3Qua2V5cyhhZGFwdGVycyk7XG4gICAgcm9vdEludGVyZmFjZSA9IG9wdGlvbnMucm9vdEludGVyZmFjZTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRva2VuaXplcyB0aGUgcHJvdmlkZWQga2V5cGF0aCBzdHJpbmcgaW50byBpbnRlcmZhY2UgKyBwYXRoIHRva2VucyBmb3IgdGhlXG4gICAqIG9ic2VydmVyIHRvIHdvcmsgd2l0aC5cbiAgICovXG4gIHN0YXRpYyB0b2tlbml6ZSA9IGZ1bmN0aW9uKGtleXBhdGg6IHN0cmluZywgcm9vdDogUm9vdCkge1xuICAgIHZhciB0b2tlbnM6IGFueVtdID0gW107XG4gICAgdmFyIGN1cnJlbnQ6IElLZXkgPSB7aTogcm9vdCwgcGF0aDogJyd9O1xuICAgIHZhciBpbmRleDogbnVtYmVyO1xuICAgIHZhciBjaHI6IHN0cmluZztcbiAgXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwga2V5cGF0aC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNociA9IGtleXBhdGguY2hhckF0KGluZGV4KTtcbiAgXG4gICAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKGNocikpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudCk7XG4gICAgICAgIGN1cnJlbnQgPSB7aTogY2hyLCBwYXRoOiAnJ307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50LnBhdGggKz0gY2hyO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgdG9rZW5zLnB1c2goY3VycmVudCk7XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuICBcbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUga2V5cGF0aCB1c2luZyB0aGUgaW50ZXJmYWNlcyBkZWZpbmVkIG9uIHRoZSB2aWV3LiBTZXRzIHZhcmlhYmxlc1xuICAgKiBmb3IgdGhlIHRva2VuaXplZCBrZXlwYXRoIGFzIHdlbGwgYXMgdGhlIGVuZCBrZXkuXG4gICAqL1xuICBwYXJzZSgpIHtcbiAgICB2YXIgcGF0aDogc3RyaW5nO1xuICAgIHZhciByb290OiBSb290O1xuICBcbiAgICBpZiAoIWludGVyZmFjZXMubGVuZ3RoKSB7XG4gICAgICBlcnJvcignTXVzdCBkZWZpbmUgYXQgbGVhc3Qgb25lIGFkYXB0ZXIgaW50ZXJmYWNlLicpO1xuICAgIH1cbiAgXG4gICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZih0aGlzLmtleXBhdGhbMF0pKSB7XG4gICAgICByb290ID0gdGhpcy5rZXlwYXRoWzBdO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aC5zdWJzdHIoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSByb290SW50ZXJmYWNlO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aDtcbiAgICB9XG4gIFxuICAgIHRoaXMudG9rZW5zID0gT2JzZXJ2ZXIudG9rZW5pemUocGF0aCwgcm9vdCk7XG5cbiAgICBpZighdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHRva2VucycpO1xuICAgIH1cblxuICAgIHRoaXMua2V5ID0gKHRoaXMudG9rZW5zLnBvcCgpIGFzIElLZXkpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgdG9rZW5zOiB0aGlzLnRva2VucyxcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBSZWFsaXplcyB0aGUgZnVsbCBrZXlwYXRoLCBhdHRhY2hpbmcgb2JzZXJ2ZXJzIGZvciBldmVyeSBrZXkgYW5kIGNvcnJlY3RpbmdcbiAgICogb2xkIG9ic2VydmVycyB0byBhbnkgY2hhbmdlZCBvYmplY3RzIGluIHRoZSBrZXlwYXRoLlxuICAgKi9cbiAgcmVhbGl6ZSgpIHtcbiAgICB2YXIgY3VycmVudDogT2JqID0gdGhpcy5vYmpcbiAgICB2YXIgdW5yZWFjaGVkID0gLTFcbiAgICB2YXIgcHJldlxuICAgIHZhciB0b2tlblxuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKGlzT2JqZWN0KGN1cnJlbnQpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vYmplY3RQYXRoW2luZGV4XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoY3VycmVudCAhPT0gKHByZXYgPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldCh0cnVlLCB0b2tlbiwgY3VycmVudCwgdGhpcylcbiAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICB9XG4gIFxuICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQodG9rZW4sIGN1cnJlbnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodW5yZWFjaGVkID09PSAtMSkge1xuICAgICAgICAgIHVucmVhY2hlZCA9IGluZGV4XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGlmIChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKHVucmVhY2hlZCAhPT0gLTEpIHtcbiAgICAgIHRoaXMub2JqZWN0UGF0aC5zcGxpY2UodW5yZWFjaGVkKVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnRcbiAgfVxuICBcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGtleXBhdGguIFRoaXMgaXMgY2FsbGVkIHdoZW4gYW55IGludGVybWVkaWFyeSBrZXkgaXMgY2hhbmdlZC5cbiAgICovXG4gIHN5bmMoKSB7XG4gICAgdmFyIG5leHQsIG9sZFZhbHVlLCBuZXdWYWx1ZVxuICBcbiAgICBpZiAoKG5leHQgPSB0aGlzLnJlYWxpemUoKSkgIT09IHRoaXMudGFyZ2V0KSB7XG4gICAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgaWYgKGlzT2JqZWN0KG5leHQpKSB7XG4gICAgICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCBuZXh0LCB0aGlzLmNhbGxiYWNrKVxuICAgICAgfVxuICBcbiAgICAgIG9sZFZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgICB0aGlzLnRhcmdldCA9IG5leHRcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlIHx8IG5ld1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMuY2FsbGJhY2suc3luYygpXG4gICAgfSBlbHNlIGlmIChuZXh0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2suc3luYygpXG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogUmVhZHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBSZXR1cm5zIHVuZGVmaW5lZCBpZlxuICAgKiB0aGUgZnVsbCBrZXlwYXRoIGlzIHVucmVhY2hhYmxlLlxuICAgKi9cbiAgdmFsdWUoKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5LCB0aGlzLnRhcmdldClcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gQ2FsbGluZyBzZXRWYWx1ZSB3aGVuXG4gICAqICB0aGUgZnVsbCBrZXlwYXRoIGlzIHVucmVhY2hhYmxlIGlzIGEgbm8tb3AuXG4gICAqIEBwYXJhbSB2YWx1ZSBcbiAgICovXG4gIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICBhZGFwdGVyc1t0aGlzLmtleS5pXS5zZXQodGhpcy50YXJnZXQsIHRoaXMua2V5LnBhdGgsIHZhbHVlKVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEdldHMgdGhlIHByb3ZpZGVkIGtleSBvbiBhbiBvYmplY3QuXG4gICAqIEBwYXJhbSBrZXkgXG4gICAqIEBwYXJhbSBvYmogXG4gICAqL1xuICBnZXQoa2V5OiBJS2V5LCBvYmo6IE9iaikge1xuICAgIHJldHVybiBhZGFwdGVyc1trZXkuaV0uZ2V0KG9iaiwga2V5LnBhdGgpXG4gIH1cbiAgXG4gIC8qKlxuICAgKiBPYnNlcnZlcyBvciB1bm9ic2VydmVzIGEgY2FsbGJhY2sgb24gdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQga2V5LlxuICAgKiBAcGFyYW0gYWN0aXZlIFxuICAgKiBAcGFyYW0ga2V5IFxuICAgKiBAcGFyYW0gb2JqIFxuICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAqL1xuICBzZXQoYWN0aXZlOiBib29sZWFuLCBrZXk6IElLZXksIG9iajogT2JqLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgaWYoYWN0aXZlKSB7XG4gICAgICBhZGFwdGVyc1trZXkuaV0ub2JzZXJ2ZShvYmosIGtleS5wYXRoLCBjYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgYWRhcHRlcnNba2V5LmldLnVub2JzZXJ2ZShvYmosIGtleS5wYXRoLCBjYWxsYmFjaylcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBVbm9ic2VydmVzIHRoZSBlbnRpcmUga2V5cGF0aC5cbiAgICovXG4gIHVub2JzZXJ2ZSgpIHtcbiAgICB2YXIgb2JqOiBPYmo7XG4gICAgdmFyIHRva2VuO1xuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKG9iaiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBvYmosIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldChmYWxzZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0cmF2ZXJzZSB0aGUgc2NvcGUgY2hhaW4gdG8gZmluZCB0aGUgc2NvcGUgd2hpY2ggaGFzIHRoZSByb290IHByb3BlcnR5XG4gICAqIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgZm91bmQgaW4gY2hhaW4sIHJldHVybnMgdGhlIHJvb3Qgc2NvcGVcbiAgICogQHBhcmFtIG9iaiBcbiAgICovXG4gIGdldFJvb3RPYmplY3Qob2JqOiBPYmopIHtcbiAgICB2YXIgcm9vdFByb3AsIGN1cnJlbnQ7XG4gICAgaWYgKCFvYmouJHBhcmVudCkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIFxuICAgIGlmICh0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy50b2tlbnNbMF0ucGF0aFxuICAgIH0gZWxzZSB7XG4gICAgICByb290UHJvcCA9IHRoaXMua2V5LnBhdGhcbiAgICB9XG4gIFxuICAgIGN1cnJlbnQgPSBvYmo7XG4gICAgd2hpbGUgKGN1cnJlbnQuJHBhcmVudCAmJiAoY3VycmVudFtyb290UHJvcF0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LiRwYXJlbnRcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG59XG4iLCJpbXBvcnQgeyBpc0pzb24gfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmV4cG9ydCBjb25zdCBQUklNSVRJVkUgPSAwO1xuZXhwb3J0IGNvbnN0IEtFWVBBVEggPSAxO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSAwO1xuZXhwb3J0IGNvbnN0IEJJTkRJTkcgPSAxO1xuXG5jb25zdCBRVU9URURfU1RSID0gL14nLionJHxeXCIuKlwiJC87IC8vIHJlZ2V4IHRvIHRlc3QgaWYgc3RyaW5nIGlzIHdyYXBwZWQgaW4gXCIgb3IgJ1xuXG5cbi8qKlxuICogUGFyc2VyIGFuZCB0b2tlbml6ZXIgZm9yIGdldHRpbmcgdGhlIHR5cGUgYW5kIHZhbHVlIGZyb20gYSBzdHJpbmcuXG4gKiBAcGFyYW0gc3RyaW5nIFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUeXBlKHN0cmluZzogc3RyaW5nKSB7XG4gIGxldCB0eXBlID0gUFJJTUlUSVZFO1xuICBsZXQgdmFsdWU6IGFueSA9IHN0cmluZztcbiAgaWYgKFFVT1RFRF9TVFIudGVzdChzdHJpbmcpKSB7XG4gICAgdmFsdWUgPSBzdHJpbmcuc2xpY2UoMSwgLTEpO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgdmFsdWUgPSB0cnVlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ2ZhbHNlJykge1xuICAgIHZhbHVlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAnbnVsbCcpIHtcbiAgICB2YWx1ZSA9IG51bGw7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKCFpc05hTihOdW1iZXIoc3RyaW5nKSkpIHtcbiAgICB2YWx1ZSA9IE51bWJlcihzdHJpbmcpO1xuICB9IGVsc2UgaWYgKGlzSnNvbihzdHJpbmcpKSB7XG4gICAgdmFsdWUgPSBKU09OLnBhcnNlKHN0cmluZyk7XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IEtFWVBBVEg7XG4gIH1cbiAgcmV0dXJuIHt0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWV9O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRva2VucyB7XG4gIHR5cGU6IG51bWJlcjtcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUZW1wbGF0ZSBwYXJzZXIgYW5kIHRva2VuaXplciBmb3IgbXVzdGFjaGUtc3R5bGUgdGV4dCBjb250ZW50IGJpbmRpbmdzLlxuICogUGFyc2VzIHRoZSB0ZW1wbGF0ZSBhbmQgcmV0dXJucyBhIHNldCBvZiB0b2tlbnMsIHNlcGFyYXRpbmcgc3RhdGljIHBvcnRpb25zXG4gKiBvZiB0ZXh0IGZyb20gYmluZGluZyBkZWNsYXJhdGlvbnMuXG4gKiBAcGFyYW0gdGVtcGxhdGUgXG4gKiBAcGFyYW0gZGVsaW1pdGVycyBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgZGVsaW1pdGVyczogc3RyaW5nW10pIHtcbiAgdmFyIHRva2VuczogSVRva2Vuc1tdIHwgbnVsbCA9IG51bGw7XG4gIGxldCBsZW5ndGggPSB0ZW1wbGF0ZS5sZW5ndGg7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBsYXN0SW5kZXggPSAwO1xuICBsZXQgb3BlbiA9IGRlbGltaXRlcnNbMF0sIGNsb3NlID0gZGVsaW1pdGVyc1sxXTtcblxuICB3aGlsZSAobGFzdEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKG9wZW4sIGxhc3RJbmRleCk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zID0gdG9rZW5zIHx8IFtdO1xuICAgICAgaWYgKGluZGV4ID4gMCAmJiBsYXN0SW5kZXggPCBpbmRleCkge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgb3Blbi5sZW5ndGg7XG4gICAgICBpbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoY2xvc2UsIGxhc3RJbmRleCk7XG5cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgbGV0IHN1YnN0cmluZyA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCAtIGNsb3NlLmxlbmd0aCk7XG4gICAgICAgIGxldCBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09IFRFWFQpIHtcbiAgICAgICAgICBsYXN0VG9rZW4udmFsdWUgKz0gc3Vic3RyaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgICB2YWx1ZTogc3Vic3RyaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlID0gdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleCkudHJpbSgpO1xuXG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IEJJTkRJTkcsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgY2xvc2UubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG4iLCJpbXBvcnQgeyBtZXJnZU9iamVjdCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgcGFyc2VUZW1wbGF0ZSwgcGFyc2VUeXBlLCBJVG9rZW5zIH0gZnJvbSAnLi9wYXJzZXJzJztcbmltcG9ydCB7IElGb3JtYXR0ZXJzLCBmb3JtYXR0ZXJzIH0gZnJvbSAnLi9mb3JtYXR0ZXJzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgYWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBiaW5kZXJzLCBJQmluZGVyc30gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IE9ic2VydmVyLCBSb290IH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBJQ29tcG9uZW50cyB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5cbmludGVyZmFjZSBJRXh0ZW5zaW9ucyB7XG4gIGJpbmRlcnM6IElCaW5kZXJzPGFueT47XG4gIGZvcm1hdHRlcnM6IElGb3JtYXR0ZXJzO1xuICBjb21wb25lbnRzOiBJQ29tcG9uZW50cztcbiAgYWRhcHRlcnM6IElBZGFwdGVycztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9ucyB7XG4gIC8qKiBBdHRyaWJ1dGUgcHJlZml4IGluIHRlbXBsYXRlcyAqL1xuICBwcmVmaXg/OiBzdHJpbmc7XG5cbiAgLyoqIFByZWxvYWQgdGVtcGxhdGVzIHdpdGggaW5pdGlhbCBkYXRhIG9uIGJpbmQgKi9cbiAgcHJlbG9hZERhdGE/OiBib29sZWFuO1xuXG4gIC8qKiBSb290IHNpZ2h0Z2xhc3MgaW50ZXJmYWNlIGZvciBrZXlwYXRocyAqL1xuICByb290SW50ZXJmYWNlPzogc3RyaW5nO1xuXG4gIC8qKiBUZW1wbGF0ZSBkZWxpbWl0ZXJzIGZvciB0ZXh0IGJpbmRpbmdzICovXG4gIHRlbXBsYXRlRGVsaW1pdGVycz86IEFycmF5PHN0cmluZz5cblxuICAvKiogQXVnbWVudCB0aGUgZXZlbnQgaGFuZGxlciBvZiB0aGUgb24tKiBiaW5kZXIgKi9cbiAgaGFuZGxlcj86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSU9wdGlvbnNQYXJhbSBleHRlbmRzIElFeHRlbnNpb25zLCBJT3B0aW9ucyB7fVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSVZpZXdPcHRpb25zIGV4dGVuZHMgSU9wdGlvbnNQYXJhbSB7XG4gIHN0YXJCaW5kZXJzOiBhbnk7XG4gIC8vIHNpZ2h0Z2xhc3NcbiAgcm9vdEludGVyZmFjZTogUm9vdDtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElUaW55YmluZCB7XG4gIGJpbmRlcnM6IElCaW5kZXJzPGFueT47XG4gIGNvbXBvbmVudHM6IElDb21wb25lbnRzO1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgYWRhcHRlcnM6IElBZGFwdGVycztcbiAgX3ByZWZpeDogc3RyaW5nO1xuICBfZnVsbFByZWZpeDogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgcGFyc2VUZW1wbGF0ZTogKHRlbXBsYXRlOiBzdHJpbmcsIGRlbGltaXRlcnM6IHN0cmluZ1tdKSA9PiBJVG9rZW5zW10gfCBudWxsO1xuICBwYXJzZVR5cGU6IChzdHJpbmc6IHN0cmluZykgPT4ge1xuICAgIHR5cGU6IG51bWJlcjtcbiAgICB2YWx1ZTogYW55O1xuICB9O1xuICB0ZW1wbGF0ZURlbGltaXRlcnM6IHN0cmluZ1tdO1xuICByb290SW50ZXJmYWNlOiBzdHJpbmc7XG4gIHByZWxvYWREYXRhOiBib29sZWFuO1xuICBoYW5kbGVyKHRoaXM6IGFueSwgY29udGV4dDogYW55LCBldjogRXZlbnQsIGJpbmRpbmc6IEJpbmRpbmcpOiB2b2lkO1xuICBmYWxsYmFja0JpbmRlcih0aGlzOiBCaW5kaW5nLCBlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpOiB2b2lkO1xuICBjb25maWd1cmUob3B0aW9uczogYW55KTogdm9pZDtcbiAgaW5pdDogKGNvbXBvbmVudEtleTogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQsIGRhdGE/OiB7fSkgPT4gVmlldztcbiAgYmluZDogKGVsOiBIVE1MRWxlbWVudCwgbW9kZWxzOiBhbnksIG9wdGlvbnM/OiBJT3B0aW9uc1BhcmFtIHwgdW5kZWZpbmVkKSA9PiBWaWV3O1xufVxuXG5jb25zdCB0aW55YmluZDogSVRpbnliaW5kID0ge1xuICAvLyBHbG9iYWwgYmluZGVycy5cbiAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IGJpbmRlcnMsXG5cbiAgLy8gR2xvYmFsIGNvbXBvbmVudHMuXG4gIGNvbXBvbmVudHM6IDxJQ29tcG9uZW50cz4ge30sXG5cbiAgLy8gR2xvYmFsIGZvcm1hdHRlcnMuXG4gIGZvcm1hdHRlcnM6IDxJRm9ybWF0dGVycz4gZm9ybWF0dGVycyxcblxuICAvLyBHbG9iYWwgc2lnaHRnbGFzcyBhZGFwdGVycy5cbiAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IHtcbiAgICAnLic6IGFkYXB0ZXIsXG4gIH0sXG4gXG4gIC8qKiBEZWZhdWx0IGF0dHJpYnV0ZSBwcmVmaXguICovXG4gIF9wcmVmaXg6ICdydicsXG5cbiAgX2Z1bGxQcmVmaXg6ICdydi0nLFxuXG4gIGdldCBwcmVmaXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZpeDtcbiAgfSxcblxuICBzZXQgcHJlZml4KHZhbHVlKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gICAgdGhpcy5fZnVsbFByZWZpeCA9IHZhbHVlICsgJy0nO1xuICB9LFxuXG4gIHBhcnNlVGVtcGxhdGU6IHBhcnNlVGVtcGxhdGUsXG5cbiAgcGFyc2VUeXBlOiBwYXJzZVR5cGUsXG5cbiAgLyoqIERlZmF1bHQgdGVtcGxhdGUgZGVsaW1pdGVycy4gKi9cbiAgdGVtcGxhdGVEZWxpbWl0ZXJzOiBbJ3snLCAnfSddLFxuXG4gIC8qKiBEZWZhdWx0IHNpZ2h0Z2xhc3Mgcm9vdCBpbnRlcmZhY2UuICovXG4gIHJvb3RJbnRlcmZhY2U6ICcuJyxcblxuXG4gIC8qKiBQcmVsb2FkIGRhdGEgYnkgZGVmYXVsdC4gKi9cbiAgcHJlbG9hZERhdGE6IHRydWUsXG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZXZlbnQgaGFuZGxlci5cbiAgICovXG4gIGhhbmRsZXIodGhpczogYW55LCBjb250ZXh0OiBhbnksIGV2OiBFdmVudCwgYmluZGluZzogQmluZGluZykge1xuICAgIHRoaXMuY2FsbChjb250ZXh0LCBldiwgYmluZGluZy52aWV3Lm1vZGVscyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC4gSWYgbm8gYmluZGVyIGFib3ZlIGlzIG1hdGNoZWQgaXQgd2lsbCBmYWxsXG4gICAqIGJhY2sgdG8gdXNpbmcgdGhpcyBiaW5kZXIuXG4gICAqL1xuICBmYWxsYmFja0JpbmRlcih0aGlzOiBCaW5kaW5nLCBlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoIXRoaXMudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IHNldCBhdHR0cmlidXRlIG9mICcgKyB0aGlzLnR5cGUpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKHRoaXMudHlwZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy50eXBlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1lcmdlcyBhbiBvYmplY3QgbGl0ZXJhbCBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIGdsb2JhbCBvcHRpb25zLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBcbiAgICovXG4gIGNvbmZpZ3VyZShvcHRpb25zOiBhbnkpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBvcHRpb25zW29wdGlvbl07XG4gICAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2JpbmRlcnMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYmluZGVycywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZm9ybWF0dGVycyc6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5mb3JtYXR0ZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb21wb25lbnRzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmNvbXBvbmVudHMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FkYXB0ZXJzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmFkYXB0ZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGFwdGVyJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmFkYXB0ZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcmVmaXgnOlxuICAgICAgICAgIHRoaXMucHJlZml4ID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3BhcnNlVGVtcGxhdGUnOlxuICAgICAgICAgIHRoaXMucGFyc2VUZW1wbGF0ZSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYXJzZVR5cGUnOlxuICAgICAgICAgIHRoaXMucGFyc2VUeXBlID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZWZpeCc6XG4gICAgICAgICAgdGhpcy5wcmVmaXggPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGVtcGxhdGVEZWxpbWl0ZXJzJzpcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlRGVsaW1pdGVycyA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyb290SW50ZXJmYWNlJzpcbiAgICAgICAgICB0aGlzLnJvb3RJbnRlcmZhY2UgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJlbG9hZERhdGEnOlxuICAgICAgICAgIHRoaXMucHJlbG9hZERhdGEgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ09wdGlvbiBub3Qgc3VwcG9ydGVkJywgb3B0aW9uLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBvbiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgYW5kXG4gICAqIHJldHVybnMgYSB0aW55YmluZC5WaWV3IGluc3RhbmNlLlx0XG4gICAqL1xuICBpbml0OiAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YSA9IHt9KSA9PiB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aW55YmluZC5jb21wb25lbnRzW2NvbXBvbmVudEtleV07XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlLmNhbGwodGlueWJpbmQsIGVsKTtcbiAgICBsZXQgc2NvcGUgPSBjb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRpbnliaW5kLCBlbCwgZGF0YSk7XG5cbiAgICBsZXQgdmlldyA9IHRpbnliaW5kLmJpbmQoZWwsIHNjb3BlKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcblxuICAvKipcbiAgICogQmluZHMgc29tZSBkYXRhIHRvIGEgdGVtcGxhdGUgLyBlbGVtZW50LiBSZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cbiAgICovXG4gIGJpbmQ6IChlbDogSFRNTEVsZW1lbnQsIG1vZGVsczogYW55LCBvcHRpb25zPzogSU9wdGlvbnNQYXJhbSkgPT4ge1xuICAgIGxldCB2aWV3T3B0aW9uczogSVZpZXdPcHRpb25zID0ge1xuICAgICAgLy8gRVhURU5TSU9OU1xuICAgICAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBmb3JtYXR0ZXJzOiA8SUZvcm1hdHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBjb21wb25lbnRzOiA8SUNvbXBvbmVudHM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBhZGFwdGVyczogPElBZGFwdGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIC8vIG90aGVyXG4gICAgICBzdGFyQmluZGVyczogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIC8vIHNpZ2h0Z2xhc3NcbiAgICAgIHJvb3RJbnRlcmZhY2U6IDxSb290PiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIH07XG4gICAgbW9kZWxzID0gbW9kZWxzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgLy8gb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBpZihvcHRpb25zKSB7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCBvcHRpb25zLmJpbmRlcnMpO1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmNvbXBvbmVudHMsIG9wdGlvbnMuY29tcG9uZW50cyk7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgb3B0aW9ucy5hZGFwdGVycyk7XG4gICAgfVxuXG4gICAgdmlld09wdGlvbnMucHJlZml4ID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZWZpeCA/IG9wdGlvbnMucHJlZml4IDogdGlueWJpbmQucHJlZml4XG4gICAgdmlld09wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID0gb3B0aW9ucyAmJiBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA/IG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzIDogdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzXG4gICAgdmlld09wdGlvbnMucm9vdEludGVyZmFjZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yb290SW50ZXJmYWNlID8gb3B0aW9ucy5yb290SW50ZXJmYWNlIDogdGlueWJpbmQucm9vdEludGVyZmFjZVxuICAgIHZpZXdPcHRpb25zLnByZWxvYWREYXRhID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZWxvYWREYXRhID8gb3B0aW9ucy5wcmVsb2FkRGF0YSA6IHRpbnliaW5kLnByZWxvYWREYXRhXG4gICAgdmlld09wdGlvbnMuaGFuZGxlciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5oYW5kbGVyID8gb3B0aW9ucy5oYW5kbGVyIDogdGlueWJpbmQuaGFuZGxlclxuXG4gICAgLy8gbWVyZ2UgZXh0ZW5zaW9uc1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIHRpbnliaW5kLmJpbmRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmZvcm1hdHRlcnMsIHRpbnliaW5kLmZvcm1hdHRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmNvbXBvbmVudHMsIHRpbnliaW5kLmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCB0aW55YmluZC5hZGFwdGVycyk7XG5cbiAgICAvLyBnZXQgYWxsIHN0YXJCaW5kZXJzIGZyb20gYXZhaWxhYmxlIGJpbmRlcnNcbiAgICB2aWV3T3B0aW9ucy5zdGFyQmluZGVycyA9IE9iamVjdC5rZXlzKHZpZXdPcHRpb25zLmJpbmRlcnMpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4ga2V5LmluZGV4T2YoJyonKSA+IDA7XG4gICAgfSk7XG5cbiAgICBPYnNlcnZlci51cGRhdGVPcHRpb25zKHZpZXdPcHRpb25zKTtcblxuICAgIGxldCB2aWV3ID0gbmV3IFZpZXcoZWwsIG1vZGVscywgdmlld09wdGlvbnMpO1xuICAgIHZpZXcuYmluZCgpO1xuICAgIHJldHVybiB2aWV3O1xuICB9LFxufTtcblxuZXhwb3J0IHsgdGlueWJpbmQgfTtcblxuZXhwb3J0IGRlZmF1bHQgdGlueWJpbmQ7XG4iLCJleHBvcnQgY29uc3QgbWVyZ2VPYmplY3QgPSAodGFyZ2V0OiBhbnksIG9iajogYW55KSA9PiB7XG4gIGlmIChvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBUZXN0IGlmIHN0cmluZyBpcyBhIGpzb24gc3RyaW5nXG4gKiBAcGFyYW0gc3RyIFxuICovXG5leHBvcnQgY29uc3QgaXNKc29uID0gKHN0cjogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdmFsID0gSlNPTi5wYXJzZShzdHIpO1xuICAgIHJldHVybiAodmFsIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsIGluc3RhbmNlb2YgT2JqZWN0KSA/IHRydWUgOiBmYWxzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QgdGhhbiBjYW4gYmUgb2JzZXJ2ZWQuXG4gKiBAcGFyYW0gb2JqIFxuICovXG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSAob2JqOiBvYmplY3QpID0+IHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTdHJpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdGltZXMgPSAobjogbnVtYmVyLCBjYjogKCkgPT4gdm9pZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGNiKCk7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyB0aW55YmluZCwgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBCaW5kZXIsIElUd29XYXlCaW5kZXIgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nLCBJQm91bmRFbGVtZW50IH0gZnJvbSAnLi9jb21wb25lbnQtYmluZGluZyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlIH0gZnJvbSAnLi9wYXJzZXJzJztcblxuZXhwb3J0IHR5cGUgVEJsb2NrID0gYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGRhdGE/OiBzdHJpbmc7XG59XG5cbmNvbnN0IHRleHRCaW5kZXI6IElUd29XYXlCaW5kZXI8c3RyaW5nPiA9IHtcbiAgcm91dGluZTogKG5vZGU6IElEYXRhRWxlbWVudCwgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIG5vZGUuZGF0YSA9ICh2YWx1ZSAhPSBudWxsKSA/IHZhbHVlIDogJyc7XG4gIH1cbn07XG5cbmNvbnN0IERFQ0xBUkFUSU9OX1NQTElUID0gLygoPzonW14nXSonKSooPzooPzpbXlxcfCddKig/OidbXiddKicpK1teXFx8J10qKSt8W15cXHxdKykpfF4kL2c7XG5cbmNvbnN0IHBhcnNlTm9kZSA9ICh2aWV3OiBWaWV3LCBub2RlOiBJRGF0YUVsZW1lbnQpID0+IHtcbiAgbGV0IGJsb2NrOiBUQmxvY2sgPSBmYWxzZTtcblxuICAvLyBpZiBub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERVxuICBub2RlID0gKCBub2RlIGFzIElEYXRhRWxlbWVudCk7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgaWYoIW5vZGUuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub2RlIGhhcyBubyBkYXRhJyk7XG4gICAgfVxuICAgIGxldCB0b2tlbnMgPSBwYXJzZVRlbXBsYXRlKG5vZGUuZGF0YSwgdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzKTtcblxuICAgIGlmICh0b2tlbnMpIHtcbiAgICAgIGlmKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZXh0LCBub2RlKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICB2aWV3LmJ1aWxkQmluZGluZyh0ZXh0LCBudWxsLCB0b2tlbi52YWx1ZSwgdGV4dEJpbmRlciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgYmxvY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBibG9jayA9IHZpZXcudHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICBpZiAoIWJsb2NrKSB7XG4gICAgaWYobm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJzZU5vZGUodmlldywgKG5vZGUuY2hpbGROb2Rlc1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGJpbmRpbmdDb21wYXJhdG9yID0gKGE6IEJpbmRpbmcsIGI6IEJpbmRpbmcpID0+IHtcbiAgbGV0IGFQcmlvcml0eSA9IGEuYmluZGVyID8gKChhLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgbGV0IGJQcmlvcml0eSA9IGIuYmluZGVyID8gKChiLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgcmV0dXJuIGJQcmlvcml0eSAtIGFQcmlvcml0eTtcbn07XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIGJpbmRpbmdzIGJ1aWx0IGZyb20gYSBzZXQgb2YgcGFyZW50IG5vZGVzLlxuICovXG5leHBvcnQgY2xhc3MgVmlldyB7XG5cbiAgZWxzOiBIVE1MQ29sbGVjdGlvbiB8IEhUTUxFbGVtZW50W10gfCBOb2RlW107XG4gIG1vZGVsczogYW55O1xuICBvcHRpb25zOiBJVmlld09wdGlvbnM7XG4gIGJpbmRpbmdzOiBCaW5kaW5nW10gPSBbXTtcbiAgY29tcG9uZW50VmlldzogVmlldyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgRE9NIGVsZW1lbnRzIGFuZCB0aGUgbW9kZWwgb2JqZWN0cyBmb3IgYmluZGluZyBhcmUgcGFzc2VkIGludG8gdGhlXG4gICAqIGNvbnN0cnVjdG9yIGFsb25nIHdpdGggYW55IGxvY2FsIG9wdGlvbnMgdGhhdCBzaG91bGQgYmUgdXNlZCB0aHJvdWdob3V0IHRoZVxuICAgKiBjb250ZXh0IG9mIHRoZSB2aWV3IGFuZCBpdCdzIGJpbmRpbmdzLlxuICAgKiBAcGFyYW0gZWxzIFxuICAgKiBAcGFyYW0gbW9kZWxzIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsczogSFRNTENvbGxlY3Rpb24gfCBIVE1MRWxlbWVudCB8IE5vZGUsIG1vZGVsczogYW55LCBvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZWxzID0gZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVscyA9IChbZWxzXSBhcyBIVE1MRWxlbWVudFtdIHwgTm9kZVtdICk7XG4gICAgfVxuICAgIHRoaXMubW9kZWxzID0gbW9kZWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmJ1aWxkKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHBhcnNlRGVjbGFyYXRpb24oZGVjbGFyYXRpb246IHN0cmluZykge1xuICAgIGxldCBtYXRjaGVzID0gZGVjbGFyYXRpb24ubWF0Y2goREVDTEFSQVRJT05fU1BMSVQpO1xuICAgIGlmKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbWF0Y2hlcycpO1xuICAgIH1cbiAgICBsZXQgcGlwZXMgPSBtYXRjaGVzLm1hcCgoc3RyOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBzdHIudHJpbSgpO1xuICAgIH0pO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKSB8fCBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBrZXlwYXRoLFxuICAgICAgcGlwZXMsXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGJ1aWxkQmluZGluZyhub2RlOiBIVE1MRWxlbWVudCB8IFRleHQsIHR5cGU6IHN0cmluZyB8IG51bGwsIGRlY2xhcmF0aW9uOiBzdHJpbmcsIGJpbmRlcjogQmluZGVyPGFueT4sIGFyZ3M6IHN0cmluZ1tdIHwgbnVsbCkge1xuICAgIGNvbnN0IHBhcnNlZERlY2xhcmF0aW9uID0gVmlldy5wYXJzZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9uKTtcbiAgICBjb25zdCBrZXlwYXRoID0gcGFyc2VkRGVjbGFyYXRpb24ua2V5cGF0aDtcbiAgICBjb25zdCBwaXBlcyA9IHBhcnNlZERlY2xhcmF0aW9uLnBpcGVzO1xuICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQmluZGluZygodGhpcyBhcyBWaWV3KSwgKG5vZGUgYXMgSFRNTEVsZW1lbnQpLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIHBpcGVzKSk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBET00gdHJlZSBhbmQgYnVpbGRzIGBCaW5kaW5nYCBpbnN0YW5jZXMgZm9yIGV2ZXJ5IG1hdGNoZWRcbiAgICogYmluZGluZyBkZWNsYXJhdGlvbi5cbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHRoaXMuYmluZGluZ3MgPSBbXTtcblxuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuZWxzLCBpLCBsZW47XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHBhcnNlTm9kZSh0aGlzLCAoZWxlbWVudHNbaV0gYXMgSURhdGFFbGVtZW50KSk7XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kaW5ncy5zb3J0KGJpbmRpbmdDb21wYXJhdG9yKTtcbiAgfVxuXG4gIHRyYXZlcnNlKG5vZGU6IElCb3VuZEVsZW1lbnQpOiBUQmxvY2sge1xuICAgIGxldCBiaW5kaW5nUHJlZml4ID0gdGlueWJpbmQuX2Z1bGxQcmVmaXg7XG4gICAgbGV0IGJsb2NrID0gbm9kZS5ub2RlTmFtZSA9PT0gJ1NDUklQVCcgfHwgbm9kZS5ub2RlTmFtZSA9PT0gJ1NUWUxFJztcbiAgICBsZXQgYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlcztcbiAgICBsZXQgYmluZEluZm9zID0gW107XG4gICAgbGV0IHN0YXJCaW5kZXJzID0gdGhpcy5vcHRpb25zLnN0YXJCaW5kZXJzO1xuICAgIHZhciB0eXBlLCBiaW5kZXIsIGlkZW50aWZpZXIsIGFyZ3M7XG5cblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgIC8vIGlmIGF0dHJpYnV0ZSBzdGFydHMgd2l0aCB0aGUgYmluZGluZyBwcmVmaXguIEUuZy4gcnZcbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKGJpbmRpbmdQcmVmaXgpID09PSAwKSB7XG4gICAgICAgIHR5cGUgPSBhdHRyaWJ1dGUubmFtZS5zbGljZShiaW5kaW5nUHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIGJpbmRlciA9IHRoaXMub3B0aW9ucy5iaW5kZXJzW3R5cGVdO1xuICAgICAgICBhcmdzID0gW107XG5cbiAgICAgICAgaWYgKCFiaW5kZXIpIHtcbiAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHN0YXJCaW5kZXJzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBpZGVudGlmaWVyID0gc3RhckJpbmRlcnNba107XG4gICAgICAgICAgICBpZiAodHlwZS5zbGljZSgwLCBpZGVudGlmaWVyLmxlbmd0aCAtIDEpID09PSBpZGVudGlmaWVyLnNsaWNlKDAsIC0xKSkge1xuICAgICAgICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1tpZGVudGlmaWVyXTtcbiAgICAgICAgICAgICAgYXJncy5wdXNoKHR5cGUuc2xpY2UoaWRlbnRpZmllci5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgYmluZGVyID0gdGlueWJpbmQuZmFsbGJhY2tCaW5kZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKGJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLmJsb2NrKSB7XG4gICAgICAgICAgdGhpcy5idWlsZEJpbmRpbmcobm9kZSwgdHlwZSwgYXR0cmlidXRlLnZhbHVlLCBiaW5kZXIsIGFyZ3MpO1xuICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpbmRJbmZvcy5wdXNoKHthdHRyOiBhdHRyaWJ1dGUsIGJpbmRlcjogYmluZGVyLCB0eXBlOiB0eXBlLCBhcmdzOiBhcmdzfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kSW5mb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBiaW5kSW5mbyA9IGJpbmRJbmZvc1tpXTtcbiAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIGJpbmRJbmZvLnR5cGUsIGJpbmRJbmZvLmF0dHIudmFsdWUsIGJpbmRJbmZvLmJpbmRlciwgYmluZEluZm8uYXJncyk7XG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShiaW5kSW5mby5hdHRyLm5hbWUpO1xuICAgIH1cblxuICAgIC8vIGJpbmQgY29tcG9uZW50c1xuICAgIGlmICghYmxvY2spIHtcbiAgICAgIHR5cGUgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29tcG9uZW50c1t0eXBlXSAmJiAhbm9kZS5fYm91bmQpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5wdXNoKG5ldyBDb21wb25lbnRCaW5kaW5nKCh0aGlzIGFzIFZpZXcpLCBub2RlLCB0eXBlKSk7XG4gICAgICAgIGJsb2NrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYmxvY2s7XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gICAqL1xuICBiaW5kKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGJpbmRpbmcuYmluZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuYmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gICAqL1xuICB1bmJpbmQoKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLmJpbmRpbmdzKSkge1xuICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICBiaW5kaW5nLnVuYmluZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB1cCB0aGUgdmlldyB3aXRoIHRoZSBtb2RlbCBieSBydW5uaW5nIHRoZSByb3V0aW5lcyBvbiBhbGwgYmluZGluZ3MuXG4gICAqL1xuICBzeW5jKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGJpbmRpbmcuc3luYygpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFB1Ymxpc2hlcyB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIHZpZXcgYmFjayB0byB0aGUgbW9kZWwgKHJldmVyc2Ugc3luYykuXG4gICAqL1xuICBwdWJsaXNoKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGlmIChiaW5kaW5nLmJpbmRlciAmJiAoYmluZGluZy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5wdWJsaXNoZXMpIHtcbiAgICAgICAgYmluZGluZy5wdWJsaXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlldydzIG1vZGVscyBhbG9uZyB3aXRoIGFueSBhZmZlY3RlZCBiaW5kaW5ncy5cbiAgICogQHBhcmFtIG1vZGVscyBcbiAgICovXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm1vZGVsc1trZXldID0gbW9kZWxzW2tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBpZiAoYmluZGluZy51cGRhdGUpIHtcbiAgICAgICAgYmluZGluZy51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==