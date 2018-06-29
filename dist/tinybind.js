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
exports.default = exports.adapter = exports.Adapter = void 0;

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
exports.adapter = adapter;
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
exports.default = exports.binders = void 0;

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
  // Adds or removes the class from the element when value is true or false.
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
        el.checked = (0, _utils.getString)(el.value) === (0, _utils.getString)(value);
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
        } else if ((0, _utils.getString)(value) !== (0, _utils.getString)(el.value)) {
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
exports.binders = binders;
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

var FORMATTER_ARGS = /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g;
var FORMATTER_SPLIT = /\s+/;
/**
 *  A single binding between a model attribute and a DOM element.
 */

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

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");

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
  // Initializes a component binding for the specified view. The raw component
  // element is passed in along with the component type. Attributes and scope
  // inflections are determined based on the components defined attributes.
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "observers", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bindingPrefix", _tinybind.tinybind._fullPrefix);

    _this.view = view;
    _this.el = el;
    _this.type = type;
    _this.component = view.options.components[_this.type];
    _this.static = {};
    _this.observers = {};

    _this.parseTarget();

    return _this;
  }
  /**
   * Intercepts `tinybind.Binding::sync` since component bindings are not bound to
   * a particular model to update it's value.
   */


  _createClass(ComponentBinding, [{
    key: "sync",
    value: function sync() {
      var _this2 = this;

      Object.keys(this.observers).forEach(function (key) {
        if (_this2.componentView) {
          _this2.componentView.models[key] = _this2.observers[key].target;
        }
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
     * Intercepts `tinybind.Binding::publish` since component bindings are not bound
     * to a particular model to update it's value.
     */

  }, {
    key: "publish",
    value: function publish() {}
    /**
     * Returns an object map using the component's scope inflections.
     */

  }, {
    key: "locals",
    value: function locals() {
      var _this3 = this;

      var result = {};
      Object.keys(this.static).forEach(function (key) {
        result[key] = _this3.static[key];
      });
      Object.keys(this.observers).forEach(function (key) {
        result[key] = _this3.observers[key].value();
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
      if (!this.componentView) {
        this.el.innerHTML = this.component.template.call(this);
        /**
         * there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
         */

        var scope = this.component.initialize.call(this, this.el, this.locals());
        this.componentView = _tinybind.tinybind.bind(Array.prototype.slice.call(this.el.childNodes), scope, this.getMergedOptions());
        this.el._bound = true;
      } else {
        this.componentView.bind();
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

          var token = (0, _parsers.parseType)(attribute.value);

          if (token.type === _parsers.PRIMITIVE) {
            this.static[_propertyName] = token.value;
          } else if (token.type === _parsers.KEYPATH) {
            this.keypaths[_propertyName] = attribute.value;
            this.observers[_propertyName] = this.observe(this.view.models, this.keypaths[_propertyName], this);
          } else {
            throw new Error('can\'t parse component attribute');
          }
        }
      }
    }
    /**
     * Intercept `tinybind.Binding::unbind` to be called on `this.componentView`.
     */

  }, {
    key: "unbind",
    value: function unbind() {
      var _this4 = this;

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

/***/ "./src/components.ts":
/*!***************************!*\
  !*** ./src/components.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _components = __webpack_require__(/*! ./components */ "./src/components.ts");

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
    } // Reads the current end value of the observed keypath. Returns undefined if
    // the full keypath is unreachable.

  }, {
    key: "value",
    value: function value() {
      if ((0, _utils.isObject)(this.target)) {
        return this.get(this.key, this.target);
      }
    } // Sets the current end value of the observed keypath. Calling setValue when
    // the full keypath is unreachable is a no-op.

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
Object.defineProperty(exports, "parseTemplate", {
  enumerable: true,
  get: function get() {
    return _parsers.parseTemplate;
  }
});
Object.defineProperty(exports, "parseType", {
  enumerable: true,
  get: function get() {
    return _parsers.parseType;
  }
});
Object.defineProperty(exports, "IFormatters", {
  enumerable: true,
  get: function get() {
    return _formatters.IFormatters;
  }
});
Object.defineProperty(exports, "formatters", {
  enumerable: true,
  get: function get() {
    return _formatters.formatters;
  }
});
Object.defineProperty(exports, "Binding", {
  enumerable: true,
  get: function get() {
    return _binding.Binding;
  }
});
Object.defineProperty(exports, "adapter", {
  enumerable: true,
  get: function get() {
    return _adapter.adapter;
  }
});
Object.defineProperty(exports, "IAdapters", {
  enumerable: true,
  get: function get() {
    return _adapter.IAdapters;
  }
});
Object.defineProperty(exports, "binders", {
  enumerable: true,
  get: function get() {
    return _binders.binders;
  }
});
Object.defineProperty(exports, "Binder", {
  enumerable: true,
  get: function get() {
    return _binders.Binder;
  }
});
Object.defineProperty(exports, "IBinders", {
  enumerable: true,
  get: function get() {
    return _binders.IBinders;
  }
});
Object.defineProperty(exports, "ITwoWayBinder", {
  enumerable: true,
  get: function get() {
    return _binders.ITwoWayBinder;
  }
});
Object.defineProperty(exports, "IOneWayBinder", {
  enumerable: true,
  get: function get() {
    return _binders.IOneWayBinder;
  }
});
Object.defineProperty(exports, "View", {
  enumerable: true,
  get: function get() {
    return _view.View;
  }
});
Object.defineProperty(exports, "Observer", {
  enumerable: true,
  get: function get() {
    return _observer.Observer;
  }
});
Object.defineProperty(exports, "Root", {
  enumerable: true,
  get: function get() {
    return _observer.Root;
  }
});
Object.defineProperty(exports, "IComponents", {
  enumerable: true,
  get: function get() {
    return _components.IComponents;
  }
});
Object.defineProperty(exports, "IComponent", {
  enumerable: true,
  get: function get() {
    return _components.IComponent;
  }
});
exports.default = exports.tinybind = void 0;

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _formatters = __webpack_require__(/*! ./formatters */ "./src/formatters.ts");

var _binding = __webpack_require__(/*! ./binding */ "./src/binding.ts");

var _adapter = __webpack_require__(/*! ./adapter */ "./src/adapter.ts");

var _binders = __webpack_require__(/*! ./binders */ "./src/binders.ts");

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

var _components = __webpack_require__(/*! ./components */ "./src/components.ts");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.ts");

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
}; // Test if string is a json string


exports.mergeObject = mergeObject;

var isJson = function isJson(str) {
  try {
    var val = JSON.parse(str);
    return val instanceof Array || val instanceof Object ? true : false;
  } catch (error) {
    return false;
  }
}; // Check if a value is an object than can be observed.


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
      var keypath = pipes.shift() || null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50cy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9mb3JtYXR0ZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL29ic2VydmVyLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3BhcnNlcnMudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdGlueWJpbmQudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvdmlldy50cyJdLCJuYW1lcyI6WyJBUlJBWV9NRVRIT0RTIiwiQWRhcHRlciIsIm9iaiIsImhhc093blByb3BlcnR5IiwiaWQiLCJjb3VudGVyIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsIndlYWttYXAiLCJfX3J2IiwiY2FsbGJhY2tzIiwicmVmIiwia2V5cyIsImxlbmd0aCIsInBvaW50ZXJzIiwiZm4iLCJvcmlnaW5hbCIsIm1hcCIsIndlYWtSZWZlcmVuY2UiLCJhcmdzIiwicmVzcG9uc2UiLCJhcHBseSIsImZvckVhY2giLCJrIiwiciIsIkFycmF5IiwiY2FsbGJhY2siLCJzeW5jIiwia2V5cGF0aCIsInN0dWJGdW5jdGlvbiIsImluZGV4T2YiLCJwdXNoIiwiaWR4Iiwic3BsaWNlIiwiY2xlYW51cFdlYWtSZWZlcmVuY2UiLCJkZXNjIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0Iiwic2V0IiwiY29uZmlndXJhYmxlIiwiZW51bWVyYWJsZSIsIm5ld1ZhbHVlIiwidW5vYnNlcnZlTXV0YXRpb25zIiwiY2IiLCJvYnNlcnZlTXV0YXRpb25zIiwiYWRhcHRlciIsImNyZWF0ZVZpZXciLCJiaW5kaW5nIiwibW9kZWxzIiwiYW5jaG9yRWwiLCJ0ZW1wbGF0ZSIsImVsIiwiY2xvbmVOb2RlIiwidmlldyIsIlZpZXciLCJvcHRpb25zIiwiYmluZCIsIm1hcmtlciIsInBhcmVudE5vZGUiLCJFcnJvciIsImluc2VydEJlZm9yZSIsImJpbmRlcnMiLCJmdW5jdGlvbiIsInByaW9yaXR5IiwiY3VzdG9tRGF0YSIsImhhbmRsZXIiLCJ1bmJpbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicm91dGluZSIsImV2ZW50SGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJibG9jayIsImRvY3VtZW50IiwiY3JlYXRlQ29tbWVudCIsInR5cGUiLCJpdGVyYXRlZCIsInJlbW92ZUNoaWxkIiwiY29sbGVjdGlvbiIsIm1vZGVsTmFtZSIsImlzQXJyYXkiLCJpbmRleFByb3AiLCJnZXRBdHRyaWJ1dGUiLCJnZXRJdGVyYXRpb25BbGlhcyIsIm1vZGVsIiwiaW5kZXgiLCJzY29wZSIsIiRwYXJlbnQiLCJwcmV2aW91cyIsImVscyIsIm5leHRTaWJsaW5nIiwibWF0Y2hJbmRleCIsIm5leHRWaWV3IiwibmV4dEluZGV4IiwidW5kZWZpbmVkIiwicG9wIiwibm9kZU5hbWUiLCJiaW5kaW5ncyIsInVwZGF0ZSIsImRhdGEiLCJrZXkiLCJlbENsYXNzIiwiY2xhc3NOYW1lIiwicmVwbGFjZSIsInRyaW0iLCJ0ZXh0IiwidGV4dENvbnRlbnQiLCJodG1sIiwiaW5uZXJIVE1MIiwic2hvdyIsInN0eWxlIiwiZGlzcGxheSIsImhpZGUiLCJlbmFibGVkIiwiZGlzYWJsZWQiLCJjaGVja2VkIiwicHVibGlzaGVzIiwic2VsZiIsInB1Ymxpc2giLCJpc1JhZGlvIiwidGFnTmFtZSIsImV2ZW50Iiwic2V0QXR0cmlidXRlIiwiSFRNTFNlbGVjdEVsZW1lbnQiLCJpIiwib3B0aW9uIiwic2VsZWN0ZWQiLCJpZiIsImF0dGFjaGVkIiwiYm91bmQiLCJuZXN0ZWQiLCJnZXRJbnB1dFZhbHVlIiwicmVzdWx0cyIsIkZPUk1BVFRFUl9BUkdTIiwiRk9STUFUVEVSX1NQTElUIiwiQmluZGluZyIsImJpbmRlciIsImZvcm1hdHRlcnMiLCJmb3JtYXR0ZXJPYnNlcnZlcnMiLCJPYnNlcnZlciIsInRva2VuIiwiUFJJTUlUSVZFIiwiS0VZUEFUSCIsIm9ic2VydmVyIiwib2JzZXJ2ZSIsInRhcmdldCIsImZvcm1hdHRlckluZGV4IiwicGFyc2VUeXBlIiwiYWkiLCJwcmltaXRpdmVWYWx1ZSIsInJlZHVjZSIsInJlc3VsdCIsImRlY2xhcmF0aW9uIiwibWF0Y2giLCJzaGlmdCIsImZvcm1hdHRlciIsInByb2Nlc3NlZEFyZ3MiLCJwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyIsInJlYWQiLCJGdW5jdGlvbiIsImV2IiwiY2FsbCIsImZvcm1hdHRlZFZhbHVlIiwicm91dGluZUZuIiwicmVkdWNlUmlnaHQiLCJzcGxpdCIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJwYXJzZVRhcmdldCIsInByZWxvYWREYXRhIiwidW5vYnNlcnZlIiwiZmkiLCJDb21wb25lbnRCaW5kaW5nIiwidGlueWJpbmQiLCJfZnVsbFByZWZpeCIsImNvbXBvbmVudCIsImNvbXBvbmVudHMiLCJzdGF0aWMiLCJvYnNlcnZlcnMiLCJjb21wb25lbnRWaWV3Iiwic3RyaW5nIiwiZ3JvdXBlZCIsInRvVXBwZXJDYXNlIiwiY3JlYXRlIiwiYWRhcHRlcnMiLCJwcmVmaXgiLCJ0ZW1wbGF0ZURlbGltaXRlcnMiLCJyb290SW50ZXJmYWNlIiwiaW5pdGlhbGl6ZSIsImxvY2FscyIsInByb3RvdHlwZSIsInNsaWNlIiwiY2hpbGROb2RlcyIsImdldE1lcmdlZE9wdGlvbnMiLCJfYm91bmQiLCJsZW4iLCJhdHRyaWJ1dGVzIiwiYXR0cmlidXRlIiwibmFtZSIsImJpbmRpbmdQcmVmaXgiLCJwcm9wZXJ0eU5hbWUiLCJjYW1lbENhc2UiLCJrZXlwYXRocyIsIm5vdCIsImVycm9yIiwibWVzc2FnZSIsImludGVyZmFjZXMiLCJvYmplY3RQYXRoIiwicGFyc2VSZXN1bHQiLCJwYXJzZSIsInRva2VucyIsImdldFJvb3RPYmplY3QiLCJyZWFsaXplIiwicGF0aCIsInJvb3QiLCJzdWJzdHIiLCJ0b2tlbml6ZSIsImN1cnJlbnQiLCJ1bnJlYWNoZWQiLCJwcmV2IiwibmV4dCIsIm9sZFZhbHVlIiwiYWN0aXZlIiwicm9vdFByb3AiLCJjaHIiLCJjaGFyQXQiLCJURVhUIiwiQklORElORyIsIlFVT1RFRF9TVFIiLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJKU09OIiwicGFyc2VUZW1wbGF0ZSIsImRlbGltaXRlcnMiLCJsYXN0SW5kZXgiLCJvcGVuIiwiY2xvc2UiLCJzdWJzdHJpbmciLCJsYXN0VG9rZW4iLCJfcHJlZml4IiwiY29udGV4dCIsImZhbGxiYWNrQmluZGVyIiwicmVtb3ZlQXR0cmlidXRlIiwiY29uZmlndXJlIiwiY29uc29sZSIsIndhcm4iLCJpbml0IiwiY29tcG9uZW50S2V5IiwiY3JlYXRlRWxlbWVudCIsInZpZXdPcHRpb25zIiwic3RhckJpbmRlcnMiLCJmaWx0ZXIiLCJ1cGRhdGVPcHRpb25zIiwibWVyZ2VPYmplY3QiLCJpc0pzb24iLCJzdHIiLCJ2YWwiLCJpc09iamVjdCIsImdldFN0cmluZyIsInRvU3RyaW5nIiwidGltZXMiLCJuIiwidGV4dEJpbmRlciIsIm5vZGUiLCJERUNMQVJBVElPTl9TUExJVCIsInBhcnNlTm9kZSIsIm5vZGVUeXBlIiwiY3JlYXRlVGV4dE5vZGUiLCJidWlsZEJpbmRpbmciLCJ0cmF2ZXJzZSIsImJpbmRpbmdDb21wYXJhdG9yIiwiYSIsImIiLCJhUHJpb3JpdHkiLCJiUHJpb3JpdHkiLCJ0cmltU3RyIiwiYnVpbGQiLCJtYXRjaGVzIiwicGlwZXMiLCJlbGVtZW50cyIsInNvcnQiLCJiaW5kSW5mb3MiLCJpZGVudGlmaWVyIiwiYXR0ciIsImJpbmRJbmZvIiwidG9Mb3dlckNhc2UiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLGdCQUFnQixDQUNwQixNQURvQixFQUVwQixLQUZvQixFQUdwQixPQUhvQixFQUlwQixTQUpvQixFQUtwQixNQUxvQixFQU1wQixTQU5vQixFQU9wQixRQVBvQixDQUF0Qjs7SUEwQ2FDLE87Ozs7OztxQ0FDTyxDOztxQ0FDSixFOzs7OztrQ0FFQUMsRyxFQUFVO0FBQ3RCLFVBQUksQ0FBQ0EsSUFBSUMsY0FBSixDQUFtQixNQUFuQixDQUFMLEVBQWlDO0FBQy9CLFlBQUlDLEtB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OiJ0aW55YmluZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRpbnliaW5kXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRpbnliaW5kXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy90aW55YmluZC50c1wiKTtcbiIsImltcG9ydCB7IElPYnNlcnZlclN5bmNDYWxsYmFjayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuXG4vLyBUaGUgZGVmYXVsdCBgLmAgYWRhcHRlciB0aGF0IGNvbWVzIHdpdGggdGlueWJpbmQuanMuIEFsbG93cyBzdWJzY3JpYmluZyB0b1xuLy8gcHJvcGVydGllcyBvbiBwbGFpbiBvYmplY3RzLCBpbXBsZW1lbnRlZCBpbiBFUzUgbmF0aXZlcyB1c2luZ1xuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAuXG5cbmNvbnN0IEFSUkFZX01FVEhPRFMgPSBbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZScsXG4gICdzcGxpY2UnXG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWYge1xuICBjYWxsYmFja3M6IGFueVtdO1xuICBwb2ludGVyczogYW55W107XG59XG5cbi8qKlxuICogVE9ETyBGb3Igd2hhdCBpcyB0aGlzP1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElSVkFycmF5IGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIF9fcnY6IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgQWRhcHRlckZ1bmN0aW9uID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXI7XG4gIHdlYWttYXA6IGFueTtcbiAgd2Vha1JlZmVyZW5jZTogKG9iajogYW55KSA9PiBhbnk7IC8vID0+IF9fcnYgP1xuICBjbGVhbnVwV2Vha1JlZmVyZW5jZTogKHJlZjogSVJlZiwgaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgc3R1YkZ1bmN0aW9uOiAob2JqOiBhbnksIGZuOiBzdHJpbmcpID0+IGFueSAvLyA9PiByZXNwb25zZSA/XG4gIG9ic2VydmVNdXRhdGlvbnM6IChvYmo6IGFueSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgdW5vYnNlcnZlTXV0YXRpb25zOiAob2JqOiBJUlZBcnJheSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgb2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHZvaWQ7IFxuICB1bm9ic2VydmU6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSA9PiB2b2lkO1xuICBnZXQ6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSA9PiBhbnk7XG4gIHNldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXJzIHtcbiAgW25hbWU6IHN0cmluZ106IElBZGFwdGVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRhcHRlciBpbXBsZW1lbnRzIElBZGFwdGVyIHtcbiAgY291bnRlcjogbnVtYmVyID0gMDtcbiAgd2Vha21hcDphbnkgPSB7fTtcblxuICB3ZWFrUmVmZXJlbmNlKG9iajogYW55KSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoJ19fcnYnKSkge1xuICAgICAgbGV0IGlkID0gdGhpcy5jb3VudGVyKys7XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX3J2Jywge1xuICAgICAgICB2YWx1ZTogaWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy53ZWFrbWFwW29iai5fX3J2XSkge1xuICAgICAgdGhpcy53ZWFrbWFwW29iai5fX3J2XSA9IHtcbiAgICAgICAgY2FsbGJhY2tzOiB7fVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcbiAgfVxuXG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlKHJlZjogSVJlZiwgaWQ6IG51bWJlcikge1xuICAgIGlmICghT2JqZWN0LmtleXMocmVmLmNhbGxiYWNrcykubGVuZ3RoKSB7XG4gICAgICBpZiAoIShyZWYucG9pbnRlcnMgJiYgT2JqZWN0LmtleXMocmVmLnBvaW50ZXJzKS5sZW5ndGgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLndlYWttYXBbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0dWJGdW5jdGlvbihvYmo6IGFueSwgZm46IHN0cmluZykge1xuICAgIGxldCBvcmlnaW5hbCA9IG9ialtmbl07XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopO1xuICAgIGxldCB3ZWFrbWFwID0gdGhpcy53ZWFrbWFwO1xuXG4gICAgb2JqW2ZuXSA9ICguLi5hcmdzOiBhbnlbXSk6IEFkYXB0ZXJGdW5jdGlvbiA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBvcmlnaW5hbC5hcHBseShvYmosIGFyZ3MpO1xuXG4gICAgICBPYmplY3Qua2V5cyhtYXAucG9pbnRlcnMpLmZvckVhY2gociA9PiB7XG4gICAgICAgIGxldCBrID0gbWFwLnBvaW50ZXJzW3JdO1xuXG4gICAgICAgIGlmICh3ZWFrbWFwW3JdKSB7XG4gICAgICAgICAgaWYgKHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdLmZvckVhY2goKGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2suc3luYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG4gIH1cblxuICBvYnNlcnZlTXV0YXRpb25zKG9iajogYW55LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzKSB7XG4gICAgICAgIG1hcC5wb2ludGVycyA9IHt9O1xuXG4gICAgICAgIEFSUkFZX01FVEhPRFMuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgdGhpcy5zdHViRnVuY3Rpb24ob2JqLCBmbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1hcC5wb2ludGVyc1tyZWZdKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdID0gW107XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXAucG9pbnRlcnNbcmVmXS5pbmRleE9mKGtleXBhdGgpID09PSAtMSkge1xuICAgICAgICBtYXAucG9pbnRlcnNbcmVmXS5wdXNoKGtleXBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVub2JzZXJ2ZU11dGF0aW9ucyhvYmo6IElSVkFycmF5LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKChvYmogaW5zdGFuY2VvZiBBcnJheSkgJiYgKG9iai5fX3J2ICE9IG51bGwpKSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgaWYgKG1hcCkge1xuICAgICAgICBsZXQgcG9pbnRlcnMgPSBtYXAucG9pbnRlcnNbcmVmXTtcblxuICAgICAgICBpZiAocG9pbnRlcnMpIHtcbiAgICAgICAgICBsZXQgaWR4ID0gcG9pbnRlcnMuaW5kZXhPZihrZXlwYXRoKTtcblxuICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgcG9pbnRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAucG9pbnRlcnNbcmVmXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlOiBhbnk7XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopLmNhbGxiYWNrcztcblxuICAgIGlmICghY2FsbGJhY2tzW2tleXBhdGhdKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0gPSBbXTtcbiAgICAgIGxldCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXBhdGgpO1xuXG4gICAgICBpZiAoIWRlc2MgfHwgIShkZXNjLmdldCB8fCBkZXNjLnNldCB8fCAhZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleXBhdGhdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleXBhdGgsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyh2YWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2I6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYi5zeW5jKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMobmV3VmFsdWUsIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrc1trZXlwYXRoXS5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gIH1cblxuICB1bm9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgaWYgKG1hcCkge1xuICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgbGV0IGlkeCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcblxuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgICBpZiAoIWNhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuICAgICAgICAgICAgdGhpcy51bm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhbnVwV2Vha1JlZmVyZW5jZShtYXAsIG9iai5fX3J2KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBvYmpba2V5cGF0aF07XG4gIH1cblxuICBzZXQob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIG9ialtrZXlwYXRoXSA9IHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCBhZGFwdGVyID0gbmV3IEFkYXB0ZXIoKTtcbmV4cG9ydCB7IGFkYXB0ZXIgfVxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyB0aW1lcywgZ2V0U3RyaW5nIH0gZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogT25lIHdheSBiaW5kZXIgaW50ZXJmYWNlXG4gKi9cbmV4cG9ydCB0eXBlIElPbmVXYXlCaW5kZXI8VmFsdWVUeXBlPiA9ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWU6IFZhbHVlVHlwZSkgPT4gdm9pZDtcblxuLyoqXG4gKiBUbyB3YXkgYmluZGVyIGludGVyZmFjZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIElUd29XYXlCaW5kZXI8VmFsdWVUeXBlPiB7XG4gIHJvdXRpbmU6ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWU6IFZhbHVlVHlwZSkgPT4gdm9pZDtcbiAgYmluZD86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgdW5iaW5kPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICB1cGRhdGU/OiAodGhpczogQmluZGluZywgbW9kZWw6IGFueSkgPT4gdm9pZDtcbiAgZ2V0VmFsdWU/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIGJsb2NrPzogYm9vbGVhbjtcbiAgZnVuY3Rpb24/OiBib29sZWFuO1xuICBwdWJsaXNoZXM/OiBib29sZWFuO1xuICBwcmlvcml0eT86IG51bWJlcjtcbiAgLyoqXG4gICAqIElmIHlvdSB3YW50IHRvIHNhdmUgY3VzdG9tIGRhdGEgaW4gdGhpcyB1c2UgdGhpcyBvYmplY3RcbiAgICovXG4gIGN1c3RvbURhdGE/OiBhbnk7XG59XG5cbi8qKlxuICogQSBiaW5kZXIgY2FuIGJlIGEgb25lIHdheSBiaW5kZXIgb3IgYSB0d28gd2F5IGJpbmRlclxuICovXG5leHBvcnQgdHlwZSBCaW5kZXI8VmFsdWVUeXBlPiA9IElPbmVXYXlCaW5kZXI8VmFsdWVUeXBlPiB8IElUd29XYXlCaW5kZXI8VmFsdWVUeXBlPlxuXG4vKipcbiAqIEEgbGlzdCBvZiBiaW5kZXJzIHdpdGggYW55IGtleSBuYW1lXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUJpbmRlcnM8VmFsdWVUeXBlPiB7XG4gIFtuYW1lOiBzdHJpbmddOiBCaW5kZXI8VmFsdWVUeXBlPjtcbn1cblxuY29uc3QgY3JlYXRlVmlldyA9IChiaW5kaW5nOiBCaW5kaW5nLCBtb2RlbHM6IGFueSwgYW5jaG9yRWw6IEhUTUxFbGVtZW50IHwgTm9kZSB8IG51bGwpID0+IHtcbiAgbGV0IHRlbXBsYXRlID0gYmluZGluZy5lbC5jbG9uZU5vZGUodHJ1ZSk7XG4gIGxldCB2aWV3ID0gbmV3IFZpZXcoKHRlbXBsYXRlIGFzIE5vZGUpLCBtb2RlbHMsIGJpbmRpbmcudmlldy5vcHRpb25zKTtcbiAgdmlldy5iaW5kKCk7XG4gIGlmKCFiaW5kaW5nIHx8ICFiaW5kaW5nLm1hcmtlciB8fCBiaW5kaW5nLm1hcmtlci5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBwYXJlbnQgbm9kZSBmb3IgYmluZGluZyEnKTtcbiAgfVxuXG4gIGJpbmRpbmcubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRlbXBsYXRlLCBhbmNob3JFbCk7XG5cbiAgcmV0dXJuIHZpZXc7XG59XG5cbmNvbnN0IGJpbmRlcnM6IElCaW5kZXJzPGFueT4gPSB7XG4gIC8vIEJpbmRzIGFuIGV2ZW50IGhhbmRsZXIgb24gdGhlIGVsZW1lbnQuXG4gICdvbi0qJzogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIGZ1bmN0aW9uOiB0cnVlLFxuICAgIHByaW9yaXR5OiAxMDAwLFxuXG4gICAgYmluZChlbCkge1xuICAgICAgaWYoIXRoaXMuY3VzdG9tRGF0YSkge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEgPSB7XG4gICAgICAgICAgaGFuZGxlcjogbnVsbFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpIHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkgLypUT0RPKi8pIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaGFuZGxlcikge1xuICAgICAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEuaGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyID0gdGhpcy5ldmVudEhhbmRsZXIodmFsdWUpO1xuICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICB9XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBBcHBlbmRzIGJvdW5kIGluc3RhbmNlcyBvZiB0aGUgZWxlbWVudCBpbiBwbGFjZSBmb3IgZWFjaCBpdGVtIGluIHRoZSBhcnJheS5cbiAgJ2VhY2gtKic6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBibG9jazogdHJ1ZSxcblxuICAgIHByaW9yaXR5OiA0MDAwLFxuXG4gICAgYmluZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgIGlmICghdGhpcy5tYXJrZXIpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KGAgdGlueWJpbmQ6ICR7dGhpcy50eXBlfSBgKTtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0ge1xuICAgICAgICAgIGl0ZXJhdGVkOiA8Vmlld1tdPiBbXVxuICAgICAgICB9O1xuICAgICAgICBpZighZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcGFyZW50IG5vZGUhJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5tYXJrZXIsIGVsKTtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuZm9yRWFjaCgodmlldzogVmlldykgID0+IHtcbiAgICAgICAgICB2aWV3LmJpbmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZChlbCkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZCkge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuZm9yRWFjaCgodmlldzogVmlldykgPT4ge1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsLCBjb2xsZWN0aW9uKSB7XG4gICAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgIH1cbiAgICAgIGxldCBtb2RlbE5hbWUgPSB0aGlzLmFyZ3NbMF07XG4gICAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbiB8fCBbXTtcblxuICAgICAgLy8gVE9ETyBzdXBwb3J0IG9iamVjdCBrZXlzIHRvIGl0ZXJhdGUgb3ZlclxuICAgICAgaWYoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlYWNoLScgKyBtb2RlbE5hbWUgKyAnIG5lZWRzIGFuIGFycmF5IHRvIGl0ZXJhdGUgb3ZlciwgYnV0IGl0IGlzJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGluZGV4IG5hbWUgaXMgc2V0ZWQgYnkgYGluZGV4LXByb3BlcnR5YCB1c2UgdGhpcyBuYW1lLCBvdGhlcndpc2UgYCVbbW9kZWxOYW1lXSVgICBcbiAgICAgIGxldCBpbmRleFByb3AgPSBlbC5nZXRBdHRyaWJ1dGUoJ2luZGV4LXByb3BlcnR5JykgfHwgdGhpcy5nZXRJdGVyYXRpb25BbGlhcyhtb2RlbE5hbWUpO1xuXG4gICAgICBjb2xsZWN0aW9uLmZvckVhY2goKG1vZGVsLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgc2NvcGU6IGFueSA9IHskcGFyZW50OiB0aGlzLnZpZXcubW9kZWxzfTtcbiAgICAgICAgc2NvcGVbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICBzY29wZVttb2RlbE5hbWVdID0gbW9kZWw7XG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkW2luZGV4XTtcblxuICAgICAgICBpZiAoIXZpZXcpIHtcbiAgICAgICAgICBsZXQgcHJldmlvdXM6IENvbW1lbnQgfCBIVE1MRWxlbWVudDtcblxuICAgICAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZFt0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoIC0gMV0uZWxzWzBdO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGlzLm1hcmtlcikge1xuICAgICAgICAgICAgcHJldmlvdXMgPSB0aGlzLm1hcmtlcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmV2aW91cyBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZpZXcgPSBjcmVhdGVWaWV3KHRoaXMsIHNjb3BlLCBwcmV2aW91cy5uZXh0U2libGluZyk7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnB1c2godmlldyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHZpZXcubW9kZWxzW21vZGVsTmFtZV0gIT09IG1vZGVsKSB7XG4gICAgICAgICAgICAvLyBzZWFyY2ggZm9yIGEgdmlldyB0aGF0IG1hdGNoZXMgdGhlIG1vZGVsXG4gICAgICAgICAgICBsZXQgbWF0Y2hJbmRleCwgbmV4dFZpZXc7XG4gICAgICAgICAgICBmb3IgKGxldCBuZXh0SW5kZXggPSBpbmRleCArIDE7IG5leHRJbmRleCA8IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGg7IG5leHRJbmRleCsrKSB7XG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkW25leHRJbmRleF07XG4gICAgICAgICAgICAgIGlmIChuZXh0Vmlldy5tb2RlbHNbbW9kZWxOYW1lXSA9PT0gbW9kZWwpIHtcbiAgICAgICAgICAgICAgICBtYXRjaEluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIC8vIG1vZGVsIGlzIGluIG90aGVyIHBvc2l0aW9uXG4gICAgICAgICAgICAgIC8vIHRvZG86IGNvbnNpZGVyIGF2b2lkaW5nIHRoZSBzcGxpY2UgaGVyZSBieSBzZXR0aW5nIGEgZmxhZ1xuICAgICAgICAgICAgICAvLyBwcm9maWxlIHBlcmZvcm1hbmNlIGJlZm9yZSBpbXBsZW1lbnRpbmcgc3VjaCBjaGFuZ2VcbiAgICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnNwbGljZShtYXRjaEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgaWYoIXRoaXMubWFya2VyIHx8ICF0aGlzLm1hcmtlci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV4dFZpZXcuZWxzWzBdLCB2aWV3LmVsc1swXSk7XG4gICAgICAgICAgICAgIG5leHRWaWV3Lm1vZGVsc1tpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvL25ldyBtb2RlbFxuICAgICAgICAgICAgICBuZXh0VmlldyA9IGNyZWF0ZVZpZXcodGhpcywgc2NvcGUsIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5zcGxpY2UoaW5kZXgsIDAsIG5leHRWaWV3KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmlldy5tb2RlbHNbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoID4gY29sbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgdGltZXModGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCAtIGNvbGxlY3Rpb24ubGVuZ3RoLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQucG9wKCk7XG4gICAgICAgICAgdmlldy51bmJpbmQoKTtcbiAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHZpZXcuZWxzWzBdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbC5ub2RlTmFtZSA9PT0gJ09QVElPTicgJiYgdGhpcy52aWV3LmJpbmRpbmdzKSB7XG4gICAgICAgIHRoaXMudmlldy5iaW5kaW5ncy5mb3JFYWNoKChiaW5kaW5nOiBCaW5kaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubWFya2VyICYmIChiaW5kaW5nLmVsID09PSB0aGlzLm1hcmtlci5wYXJlbnROb2RlKSAmJiAoYmluZGluZy50eXBlID09PSAndmFsdWUnKSkge1xuICAgICAgICAgICAgYmluZGluZy5zeW5jKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlKG1vZGVscykge1xuICAgICAgbGV0IGRhdGE6IGFueSA9IHt9O1xuXG4gICAgICAvL3RvZG86IGFkZCB0ZXN0IGFuZCBmaXggaWYgbmVjZXNzYXJ5XG5cbiAgICAgIE9iamVjdC5rZXlzKG1vZGVscykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkgIT09IHRoaXMuYXJnc1swXSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IG1vZGVsc1trZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgdmlldy51cGRhdGUoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQWRkcyBvciByZW1vdmVzIHRoZSBjbGFzcyBmcm9tIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSBvciBmYWxzZS5cbiAgJ2NsYXNzLSonOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGxldCBlbENsYXNzID0gYCAke2VsLmNsYXNzTmFtZX0gYDtcbiAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPT0gKGVsQ2xhc3MuaW5kZXhPZihgICR7dGhpcy5hcmdzWzBdfSBgKSA+IC0xKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gJHt0aGlzLmFyZ3NbMF19YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsQ2xhc3MucmVwbGFjZShgICR7dGhpcy5hcmdzWzBdfSBgLCAnICcpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIHRleHQgdmFsdWUuXG4gIHRleHQ6IDxJT25lV2F5QmluZGVyPHN0cmluZz4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIEhUTUwgY29udGVudC5cbiAgaHRtbDogPElPbmVXYXlCaW5kZXI8c3RyaW5nPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWwuaW5uZXJIVE1MID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gIH0sXG5cbiAgLy8gU2hvd3MgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICBzaG93OiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICB9LFxuXG4gIC8vIEhpZGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSAobmVnYXRlZCB2ZXJzaW9uIG9mIGBzaG93YCBiaW5kZXIpLlxuICBoaWRlOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICcnO1xuICB9LFxuXG4gIC8vIEVuYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICBlbmFibGVkOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxCdXR0b25FbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLmRpc2FibGVkID0gIXZhbHVlO1xuICB9LFxuXG4gIC8vIERpc2FibGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSAobmVnYXRlZCB2ZXJzaW9uIG9mIGBlbmFibGVkYCBiaW5kZXIpLlxuICBkaXNhYmxlZDogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MQnV0dG9uRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH0sXG5cbiAgLy8gQ2hlY2tzIGEgY2hlY2tib3ggb3IgcmFkaW8gaW5wdXQgd2hlbiB0aGUgdmFsdWUgaXMgdHJ1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbFxuICAvLyBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBpcyBjaGVja2VkIG9yIHVuY2hlY2tlZCAodHdvLXdheSBiaW5kZXIpLlxuICBjaGVja2VkOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAyMDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTFNlbGVjdEVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICBlbC5jaGVja2VkID0gZ2V0U3RyaW5nKGVsLnZhbHVlKSA9PT0gZ2V0U3RyaW5nKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgdmFsdWUuIEFsc28gc2V0cyB0aGUgbW9kZWwgcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgY2hhbmdlc1xuICAvLyAodHdvLXdheSBiaW5kZXIpLlxuICB2YWx1ZTogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMzAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8gPSBlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICdyYWRpbyc7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ldmVudCA9IGVsLmdldEF0dHJpYnV0ZSgnZXZlbnQtbmFtZScpIHx8IChlbC50YWdOYW1lID09PSAnU0VMRUNUJyA/ICdjaGFuZ2UnIDogJ2lucHV0Jyk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjaykge1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuY3VzdG9tRGF0YS5ldmVudCwgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsKSB7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5jdXN0b21EYXRhLmV2ZW50LCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhICYmIHRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1tdWx0aXBsZScgJiYgZWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGxldCBvcHRpb24gPSBlbFtpXTtcbiAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGdldFN0cmluZyh2YWx1ZSkgIT09IGdldFN0cmluZyhlbC52YWx1ZSkpIHtcbiAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEluc2VydHMgYW5kIGJpbmRzIHRoZSBlbGVtZW50IGFuZCBpdCdzIGNoaWxkIG5vZGVzIGludG8gdGhlIERPTSB3aGVuIHRydWUuXG4gIGlmOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MVW5rbm93bkVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgaWYgKCF0aGlzLm1hcmtlcikge1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyB0aW55YmluZDogJyArIHRoaXMudHlwZSArICcgJyArIHRoaXMua2V5cGF0aCArICcgJyk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICBpZighZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9PT0gZmFsc2UgJiYgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgfVxuICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IHRydWU7XG4gICAgfSxcblxuICAgIHVuYmluZCgpIHtcbiAgICAgIGlmICggdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC51bmJpbmQoKTtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuXG4gICAgICAgICAgaWYgKCEgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQgPSBuZXcgVmlldyhlbCwgdGhpcy52aWV3Lm1vZGVscywgdGhpcy52aWV3Lm9wdGlvbnMpO1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgdGhpcy5tYXJrZXIubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlKG1vZGVscykge1xuICAgICAgaWYgKCB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLnVwZGF0ZShtb2RlbHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgYmluZGVycyB9O1xuXG5leHBvcnQgZGVmYXVsdCBiaW5kZXJzO1xuIiwiaW1wb3J0IHsgUFJJTUlUSVZFLCBLRVlQQVRILCBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIElPYnNlcnZlclN5bmNDYWxsYmFjayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgQmluZGVyLCBJT25lV2F5QmluZGVyLCBJVHdvV2F5QmluZGVyIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXJPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgW2tleTogc3RyaW5nXTogT2JzZXJ2ZXJcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBldmVudEhhbmRsZXJGdW5jdGlvbiA9IChldmVudDogRXZlbnQpID0+IHZvaWQ7XG5cbi8qKlxuICogVE9ETyBtb3ZlIHRvIHV0aWxzXG4gKiBAcGFyYW0gZWxcbiAqL1xuZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZShlbDogSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50KSB7XG4gIGxldCByZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgIHJldHVybiAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZDtcbiAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJykge1xuICAgIGxldCBvcHRpb25zOkhUTUxPcHRpb25zQ29sbGVjdGlvbiA9IChlbCBhcyBIVE1MU2VsZWN0RWxlbWVudCkub3B0aW9ucztcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1trZXldO1xuICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwudmFsdWU7XG4gIH1cbn1cblxuXG5jb25zdCBGT1JNQVRURVJfQVJHUyA9ICAvW15cXHMnXSt8JyhbXiddfCdbXlxcc10pKid8XCIoW15cIl18XCJbXlxcc10pKlwiL2c7XG5jb25zdCBGT1JNQVRURVJfU1BMSVQgPSAvXFxzKy87XG5cbi8qKlxuICogIEEgc2luZ2xlIGJpbmRpbmcgYmV0d2VlbiBhIG1vZGVsIGF0dHJpYnV0ZSBhbmQgYSBET00gZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmRpbmcge1xuICB2YWx1ZT86IGFueTtcbiAgb2JzZXJ2ZXI/OiBPYnNlcnZlcjtcbiAgdmlldzogVmlldztcbiAgZWw6IEhUTUxFbGVtZW50O1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgYmluZGVyIHdpdGhvdXQgdGhlIHByZWZpeFxuICAgKi9cbiAgdHlwZTogc3RyaW5nIHwgbnVsbDtcbiAgYmluZGVyOiBCaW5kZXI8YW55PiB8IG51bGw7XG4gIGZvcm1hdHRlcnM6IHN0cmluZ1tdIHwgbnVsbDtcbiAgZm9ybWF0dGVyT2JzZXJ2ZXJzOiBJRm9ybWF0dGVyT2JzZXJ2ZXJzO1xuICBrZXlwYXRoOiBzdHJpbmcgfCBudWxsO1xuICAvKipcbiAgICogQXJndW1lbnRzIHBhcnNlZCBmcm9tIHN0YXIgYmluZGVycywgZS5nLiBvbiBmb28tKi0qIGFyZ3NbMF0gaXMgdGhlIGZpcnN0IHN0YXIsIGFyZ3NbMV0gdGhlIHNlY29uZC1cbiAgICovXG4gIGFyZ3M6IHN0cmluZ1tdIHwgbnVsbDtcbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgbW9kZWw/OiBhbnk7XG4gIC8qKlxuICAgKiBIVE1MIENvbW1lbnQgdG8gbWFyayBhIGJpbmRpbmcgaW4gdGhlIERPTVxuICAgKi9cbiAgbWFya2VyPzogQ29tbWVudDtcbiAgLyoqXG4gICAqIFVzZWQgaW4gY29tcG9uZW50IGJpbmRpbmdzLiBUT0RPIGUuZy4gbW92ZSB0byBDb21wb25lbnRCaW5kaW5nIG9yIGJpbmRlcnM/XG4gICAqL1xuICBfYm91bmQ/OiBib29sZWFuO1xuICAvKipcbiAgICoganVzdCB0byBoYXZlIGEgdmFsdWUgd2hlcmUgd2UgY291bGQgc3RvcmUgY3VzdG9tIGRhdGFcbiAgICovXG4gIGN1c3RvbURhdGE/OiBhbnk7XG5cbiAgLyoqXG4gICAqIEFsbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYmluZGluZyBpcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3I7IHRoZVxuICAgKiBjb250YWluaW5nIHZpZXcsIHRoZSBET00gbm9kZSwgdGhlIHR5cGUgb2YgYmluZGluZywgdGhlIG1vZGVsIG9iamVjdCBhbmQgdGhlXG4gICAqIGtleXBhdGggYXQgd2hpY2ggdG8gbGlzdGVuIGZvciBjaGFuZ2VzLlxuICAgKiBAcGFyYW0geyp9IHZpZXcgXG4gICAqIEBwYXJhbSB7Kn0gZWwgXG4gICAqIEBwYXJhbSB7Kn0gdHlwZSBcbiAgICogQHBhcmFtIHsqfSBrZXlwYXRoIFxuICAgKiBAcGFyYW0geyp9IGJpbmRlciBcbiAgICogQHBhcmFtIHsqfSBhcmdzIFRoZSBzdGFydCBiaW5kZXJzLCBvbiBgY2xhc3MtKmAgYXJnc1swXSB3aWwgYmUgdGhlIGNsYXNzbmFtZSBcbiAgICogQHBhcmFtIHsqfSBmb3JtYXR0ZXJzIFxuICAgKi9cbiAgY29uc3RydWN0b3IodmlldzogVmlldywgZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcgfCBudWxsLCBrZXlwYXRoOiBzdHJpbmcgfCBudWxsLCBiaW5kZXI6IEJpbmRlcjxhbnk+IHwgbnVsbCwgYXJnczogc3RyaW5nW10gfCBudWxsLCBmb3JtYXR0ZXJzOiBzdHJpbmdbXSB8IG51bGwpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5iaW5kZXIgPSBiaW5kZXI7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gICAgdGhpcy5tb2RlbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcblxuICB9XG5cbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoZSBvYmplY3Qga2V5cGF0aFxuICAgKiBAcGFyYW0gb2JqIFxuICAgKiBAcGFyYW0ga2V5cGF0aCBcbiAgICovXG4gIG9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s/OiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spOiBPYnNlcnZlciB7XG4gICAgaWYoY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCB0aGlzKTtcbiAgICB9XG4gICAgXG4gIH1cblxuICBwYXJzZVRhcmdldCgpIHtcbiAgICBpZiAodGhpcy5rZXlwYXRoKSB7XG4gICAgICBsZXQgdG9rZW4gPSBwYXJzZVR5cGUodGhpcy5rZXlwYXRoKTtcbiAgICAgIGlmICh0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRva2VuLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpe1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHRoaXMua2V5cGF0aCk7XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlIGluIHRva2VuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogR2V0IHRoZSBpdGVyYXRpb24gYWxpYXMsIHVzZWQgaW4gdGhlIGludGVyYXRpb24gYmluZGVycyBsaWtlIGBlYWNoLSpgXG4gICAqIEBwYXJhbSB7Kn0gbW9kZWxOYW1lIFxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMjZcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDExNzVcbiAgICovXG4gIGdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICclJyArIG1vZGVsTmFtZSArICclJztcbiAgfVxuXG4gIHBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3M6IHN0cmluZ1tdLCBmb3JtYXR0ZXJJbmRleDogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBhcmdzXG4gICAgLm1hcChwYXJzZVR5cGUpXG4gICAgLm1hcCgoe3R5cGUsIHZhbHVlfSwgYWkpID0+IHtcbiAgICAgIGlmICh0eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZVZhbHVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgIC8vIGtleXBhdGggaXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGtleXBhdGggPSAodmFsdWUgYXMgc3RyaW5nICk7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldO1xuXG4gICAgICAgIGlmICghb2JzZXJ2ZXIpIHtcbiAgICAgICAgICBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCBrZXlwYXRoKTtcbiAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldID0gb2JzZXJ2ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic2VydmVyLnZhbHVlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYXJndW1lbnQgdHlwZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYWxsIHRoZSBjdXJyZW50IGZvcm1hdHRlcnMgdG8gdGhlIHN1cHBsaWVkIHZhbHVlIGFuZCByZXR1cm5zIHRoZVxuICAgKiBmb3JtYXR0ZWQgdmFsdWUuXG4gICAqL1xuICBmb3JtYXR0ZWRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYodGhpcy5mb3JtYXR0ZXJzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdHRlcnMgaXMgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZSgocmVzdWx0OiBhbnkvKmNoZWNrIHR5cGUqLywgZGVjbGFyYXRpb246IHN0cmluZyAvKmNoZWNrIHR5cGUqLywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSBkZWNsYXJhdGlvbi5tYXRjaChGT1JNQVRURVJfQVJHUyk7XG4gICAgICBpZihhcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYXJncyBtYXRjaGVkIGZyb20gRk9STUFUVEVSX0FSR1MnKTtcbiAgICAgIH1cbiAgICAgIGxldCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGlmKCFpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGlkIGZvdW5kIGluIGFyZ3MnKTtcbiAgICAgIH1cbiAgICAgIGxldCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcblxuICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICBpZiAoZm9ybWF0dGVyICYmIChmb3JtYXR0ZXIucmVhZCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucmVhZChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIGJpbmRpbmcgYXJvdW5kIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAgICovXG4gIGV2ZW50SGFuZGxlcihmbjogZXZlbnRIYW5kbGVyRnVuY3Rpb24pOiAoZXY6IEV2ZW50KSA9PiBhbnkge1xuICAgIGxldCBiaW5kaW5nID0gdGhpcztcbiAgICBsZXQgaGFuZGxlciA9IGJpbmRpbmcudmlldy5vcHRpb25zLmhhbmRsZXI7XG5cbiAgICByZXR1cm4gKGV2KSA9PiB7XG4gICAgICBpZighaGFuZGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGhhbmRsZXIgZGVmaW5lZCBpbiBiaW5kaW5nLnZpZXcub3B0aW9ucy5oYW5kbGVyJyk7XG4gICAgICB9XG4gICAgICBoYW5kbGVyLmNhbGwoZm4sIHRoaXMsIGV2LCBiaW5kaW5nKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGZvciB0aGUgYmluZGluZy4gVGhpcyBCYXNpY2FsbHkganVzdCBydW5zIHRoZSBiaW5kaW5nIHJvdXRpbmVcbiAgICogd2l0aCB0aGUgc3VwcGxpZWQgdmFsdWUgZm9ybWF0dGVkLlxuICAgKi9cbiAgc2V0KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pICYmICEodGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+ICkuZnVuY3Rpb24pIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElPbmVXYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUuY2FsbCh0aGlzLm1vZGVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElUd29XYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIGxldCByb3V0aW5lRm47XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ3JvdXRpbmUnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICByb3V0aW5lRm4gPSB0aGlzLmJpbmRlci5yb3V0aW5lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSU9uZVdheUJpbmRlcjxhbnk+KTtcbiAgICAgIHJvdXRpbmVGbiA9IHRoaXMuYmluZGVyO1xuICAgIH1cblxuICAgIGlmIChyb3V0aW5lRm4gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcm91dGluZUZuLmNhbGwodGhpcywgdGhpcy5lbCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB1cCB0aGUgdmlldyBiaW5kaW5nIHdpdGggdGhlIG1vZGVsLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgdGhpcy5zZXQodGhpcy5vYnNlcnZlci52YWx1ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1Ymxpc2hlcyB0aGUgdmFsdWUgY3VycmVudGx5IHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudCBiYWNrIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIHB1Ymxpc2goKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIGlmKHRoaXMuZm9ybWF0dGVycyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdHRlcnMgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgbGV0IHZhbHVlID0gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZVJpZ2h0KChyZXN1bHQ6IGFueS8qY2hlY2sgdHlwZSovLCBkZWNsYXJhdGlvbjogc3RyaW5nIC8qY2hlY2sgdHlwZSovLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBkZWNsYXJhdGlvbi5zcGxpdChGT1JNQVRURVJfU1BMSVQpO1xuICAgICAgICBjb25zdCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgaWYoIWlkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpZCBub3QgZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnNbaWRdO1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG5cbiAgICAgICAgaWYgKGZvcm1hdHRlciAmJiBmb3JtYXR0ZXIucHVibGlzaCkge1xuICAgICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5wdWJsaXNoKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sIHRoaXMuZ2V0VmFsdWUoKHRoaXMuZWwgYXMgSFRNTElucHV0RWxlbWVudCkpKTtcblxuICAgICAgdGhpcy5vYnNlcnZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gdGhlIG1vZGVsIGZvciBjaGFuZ2VzIGF0IHRoZSBzcGVjaWZpZWQga2V5cGF0aC4gQmktZGlyZWN0aW9uYWxcbiAgICogcm91dGluZXMgd2lsbCBhbHNvIGxpc3RlbiBmb3IgY2hhbmdlcyBvbiB0aGUgZWxlbWVudCB0byBwcm9wYWdhdGUgdGhlbSBiYWNrXG4gICAqIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5wYXJzZVRhcmdldCgpO1xuXG4gICAgaWYgKHRoaXMuYmluZGVyICYmIHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdiaW5kJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZighdGhpcy5iaW5kZXIuYmluZCAmJiB0eXBlb2YodGhpcy5iaW5kZXIuYmluZCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgbWV0aG9kIGJpbmQgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYmluZGVyLmJpbmQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3Lm9wdGlvbnMucHJlbG9hZERhdGEpIHtcbiAgICAgIHRoaXMuc3luYygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSB0aGUgbW9kZWwgYW5kIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgdW5iaW5kKCkge1xuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdiaW5kJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYgKHRoaXMuYmluZGVyLnVuYmluZCkge1xuICAgICAgICB0aGlzLmJpbmRlci51bmJpbmQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5vYnNlcnZlci51bm9ic2VydmUoKTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1hdHRlck9ic2VydmVycykuZm9yRWFjaChmaSA9PiB7XG4gICAgICBsZXQgYXJncyA9IHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2ZpXTtcblxuICAgICAgT2JqZWN0LmtleXMoYXJncykuZm9yRWFjaChhaSA9PiB7XG4gICAgICAgIGFyZ3NbYWldLnVub2JzZXJ2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVycyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGJpbmRpbmcncyBtb2RlbCBmcm9tIHdoYXQgaXMgY3VycmVudGx5IHNldCBvbiB0aGUgdmlldy4gVW5iaW5kc1xuICAgKiB0aGUgb2xkIG1vZGVsIGZpcnN0IGFuZCB0aGVuIHJlLWJpbmRzIHdpdGggdGhlIG5ldyBtb2RlbC5cbiAgICogQHBhcmFtIHthbnl9IG1vZGVscyBcbiAgICovXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ3VwZGF0ZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmICh0aGlzLmJpbmRlci51cGRhdGUpIHtcbiAgICAgICAgdGhpcy5iaW5kZXIudXBkYXRlLmNhbGwodGhpcywgbW9kZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBlbGVtZW50cyB2YWx1ZVxuICAgKiBAcGFyYW0gZWwgXG4gICAqL1xuICBnZXRWYWx1ZShlbDogSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2dldFZhbHVlJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYodHlwZW9mKHRoaXMuYmluZGVyLmdldFZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFZhbHVlIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5iaW5kZXIuZ2V0VmFsdWUuY2FsbCh0aGlzLCBlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRJbnB1dFZhbHVlKGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHRpbnliaW5kLCBJT3B0aW9uc1BhcmFtIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBQUklNSVRJVkUsIEtFWVBBVEgsIHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IElCaW5kZXJzIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IElGb3JtYXR0ZXJzIH0gZnJvbSAnLi9mb3JtYXR0ZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgSUNvbXBvbmVudCwgSUNvbXBvbmVudHMgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgSU9ic2VydmVycyB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IG1lcmdlT2JqZWN0IH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5kRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcdFxuICBfYm91bmQ/OiBib29sZWFuXHRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJS2V5cGF0aHMge1xuICBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbi8qKlxuICogY29tcG9uZW50IHZpZXcgZW5jYXBzdWxhdGVkIGFzIGEgYmluZGluZyB3aXRoaW4gaXQncyBwYXJlbnQgdmlldy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJpbmRpbmcgZXh0ZW5kcyBCaW5kaW5nIHtcbiAgdmlldzogVmlldztcbiAgY29tcG9uZW50Vmlldz86IFZpZXc7XG4gIGVsOiBJQm91bmRFbGVtZW50O1xuICB0eXBlOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogSUNvbXBvbmVudDxhbnk+O1xuICAvKipcbiAgICogc3RhdGljIHZhbHVlcyAoUFJJTUlUSVZFIEF0dHJpYnV0ZXMpXG4gICAqL1xuICBzdGF0aWM6IGFueSA9IHt9O1xuICAvKipcbiAgICoga2V5cGF0aCB2YWx1ZXMgKEtFWVBBVEggQXR0cmlidXRlcylcbiAgICovXG4gIGtleXBhdGhzOiBJS2V5cGF0aHMgPSB7fTtcbiAgb2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJzO1xuICBiaW5kaW5nUHJlZml4ID0gdGlueWJpbmQuX2Z1bGxQcmVmaXg7XG5cbiAgLy8gSW5pdGlhbGl6ZXMgYSBjb21wb25lbnQgYmluZGluZyBmb3IgdGhlIHNwZWNpZmllZCB2aWV3LiBUaGUgcmF3IGNvbXBvbmVudFxuICAvLyBlbGVtZW50IGlzIHBhc3NlZCBpbiBhbG9uZyB3aXRoIHRoZSBjb21wb25lbnQgdHlwZS4gQXR0cmlidXRlcyBhbmQgc2NvcGVcbiAgLy8gaW5mbGVjdGlvbnMgYXJlIGRldGVybWluZWQgYmFzZWQgb24gdGhlIGNvbXBvbmVudHMgZGVmaW5lZCBhdHRyaWJ1dGVzLlxuICBjb25zdHJ1Y3Rvcih2aWV3OiBWaWV3LCBlbDogSFRNTEVsZW1lbnQsIHR5cGU6IHN0cmluZykge1xuICAgIHN1cGVyKHZpZXcsIGVsLCB0eXBlLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuY29tcG9uZW50ID0gdmlldy5vcHRpb25zLmNvbXBvbmVudHNbdGhpcy50eXBlXTtcbiAgICB0aGlzLnN0YXRpYyA9IHt9O1xuICAgIHRoaXMub2JzZXJ2ZXJzID0ge307ICAgICAgICBcbiAgICB0aGlzLnBhcnNlVGFyZ2V0KCk7XG4gIH1cbiAgICBcbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnN5bmNgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kIHRvXG4gICAqIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgICovXG4gIHN5bmMoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFZpZXcubW9kZWxzW2tleV0gPSB0aGlzLm9ic2VydmVyc1trZXldLnRhcmdldDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6dXBkYXRlYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAgKiB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gICAqL1xuICB1cGRhdGUoKSB7fVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6cHVibGlzaGAgc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmRcbiAgICogdG8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICAgKi9cbiAgcHVibGlzaCgpIHt9XG4gICAgXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCBtYXAgdXNpbmcgdGhlIGNvbXBvbmVudCdzIHNjb3BlIGluZmxlY3Rpb25zLlxuICAgKi9cbiAgbG9jYWxzKCkge1xuICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3RhdGljKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICByZXN1bHRba2V5XSA9IHRoaXMuc3RhdGljW2tleV07XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgICBcblxuICAvKipcbiAgICogUmV0dXJucyBhIGNhbWVsLWNhc2VkIHZlcnNpb24gb2YgdGhlIHN0cmluZy4gVXNlZCB3aGVuIHRyYW5zbGF0aW5nIGFuXG4gICAqIGVsZW1lbnQncyBhdHRyaWJ1dGUgbmFtZSBpbnRvIGEgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGNvbXBvbmVudCdzIHNjb3BlLlxuICAgKiBUT0RPIG1vdmUgdG8gdXRpbHNcbiAgICogQHBhcmFtIHN0cmluZyBcbiAgICovXG4gIGNhbWVsQ2FzZShzdHJpbmc6IHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLShbYS16XSkvZywgZ3JvdXBlZCA9PiB7XG4gICAgICByZXR1cm4gZ3JvdXBlZFsxXS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TWVyZ2VkT3B0aW9ucygpIHtcbiAgICB2YXIgb3B0aW9uczogSU9wdGlvbnNQYXJhbSA9IHtcbiAgICAgIC8vIEVYVEVOU0lPTlNcbiAgICAgIGJpbmRlcnM6IDxJQmluZGVyczxhbnk+PiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgY29tcG9uZW50czogPElDb21wb25lbnRzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgfTtcbiAgICBcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmJpbmRlcnMsIHRoaXMuY29tcG9uZW50LmJpbmRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuZm9ybWF0dGVycywgdGhpcy5jb21wb25lbnQuZm9ybWF0dGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5jb21wb25lbnRzLCB0aGlzLmNvbXBvbmVudC5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmFkYXB0ZXJzLCB0aGlzLmNvbXBvbmVudC5hZGFwdGVycyk7XG5cbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmJpbmRlcnMsIHRoaXMudmlldy5vcHRpb25zLmJpbmRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuZm9ybWF0dGVycywgdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5jb21wb25lbnRzLCB0aGlzLnZpZXcub3B0aW9ucy5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmFkYXB0ZXJzLCB0aGlzLnZpZXcub3B0aW9ucy5hZGFwdGVycyk7XG5cbiAgICBvcHRpb25zLnByZWZpeCA9IHRoaXMuY29tcG9uZW50LnByZWZpeCA/IHRoaXMuY29tcG9uZW50LnByZWZpeCA6IHRoaXMudmlldy5vcHRpb25zLnByZWZpeFxuICAgIG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID0gdGhpcy5jb21wb25lbnQudGVtcGxhdGVEZWxpbWl0ZXJzID8gdGhpcy5jb21wb25lbnQudGVtcGxhdGVEZWxpbWl0ZXJzIDogdGhpcy52aWV3Lm9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzXG4gICAgb3B0aW9ucy5yb290SW50ZXJmYWNlID0gdGhpcy5jb21wb25lbnQucm9vdEludGVyZmFjZSA/IHRoaXMuY29tcG9uZW50LnJvb3RJbnRlcmZhY2UgOiB0aGlzLnZpZXcub3B0aW9ucy5yb290SW50ZXJmYWNlXG4gICAgb3B0aW9ucy5wcmVsb2FkRGF0YSA9IHRoaXMuY29tcG9uZW50LnByZWxvYWREYXRhID8gdGhpcy5jb21wb25lbnQucHJlbG9hZERhdGEgOiB0aGlzLnZpZXcub3B0aW9ucy5wcmVsb2FkRGF0YVxuICAgIG9wdGlvbnMuaGFuZGxlciA9IHRoaXMuY29tcG9uZW50LmhhbmRsZXIgPyB0aGlzLmNvbXBvbmVudC5oYW5kbGVyIDogdGhpcy52aWV3Lm9wdGlvbnMuaGFuZGxlclxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpiaW5kYCB0byBidWlsZCBgdGhpcy5jb21wb25lbnRWaWV3YCB3aXRoIGEgbG9jYWxpemVkXG4gICAqIG1hcCBvZiBtb2RlbHMgZnJvbSB0aGUgcm9vdCB2aWV3LiBCaW5kIGB0aGlzLmNvbXBvbmVudFZpZXdgIG9uIHN1YnNlcXVlbnQgY2FsbHMuXG4gICAqL1xuICBiaW5kKCkge1xuICAgIGlmICghdGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMuY29tcG9uZW50LnRlbXBsYXRlLmNhbGwodGhpcyk7XG4gICAgICAvKipcbiAgICAgICAqIHRoZXJlJ3MgYSBjeWNsaWMgZGVwZW5kZW5jeSB0aGF0IG1ha2VzIGltcG9ydGVkIFZpZXcgYSBkdW1teSBvYmplY3QuIFVzZSB0aW55YmluZC5iaW5kXG4gICAgICAgKi9cbiAgICAgIGxldCBzY29wZSA9IHRoaXMuY29tcG9uZW50LmluaXRpYWxpemUuY2FsbCh0aGlzLCB0aGlzLmVsLCB0aGlzLmxvY2FscygpKTtcbiAgICAgIHRoaXMuY29tcG9uZW50VmlldyA9IHRpbnliaW5kLmJpbmQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbC5jaGlsZE5vZGVzKSwgc2NvcGUsIHRoaXMuZ2V0TWVyZ2VkT3B0aW9ucygpKTtcbiAgICAgIHRoaXMuZWwuX2JvdW5kID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LmJpbmQoKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVRhcmdldCgpIHtcbiAgICAvLyBwYXJzZSBjb21wb25lbnQgYXR0cmlidXRlc1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSB0aGlzLmVsLmF0dHJpYnV0ZXNbaV07XG5cbiAgICAgIC8vIGlmIGF0dHJpYnV0ZSBzdGFydHMgbm90IHdpdGggYmluZGluZyBwcmVmaXguIEUuZy4gcnYtXG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuaW5kZXhPZih0aGlzLmJpbmRpbmdQcmVmaXgpICE9PSAwKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSB0aGlzLmNhbWVsQ2FzZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgaWYodG9rZW4udHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgICAgdGhpcy5zdGF0aWNbcHJvcGVydHlOYW1lXSA9IHRva2VuLnZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYodG9rZW4udHlwZSA9PT0gS0VZUEFUSCkge1xuICAgICAgICAgIHRoaXMua2V5cGF0aHNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgICB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHRoaXMua2V5cGF0aHNbcHJvcGVydHlOYW1lXSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5cXCd0IHBhcnNlIGNvbXBvbmVudCBhdHRyaWJ1dGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHQgYHRpbnliaW5kLkJpbmRpbmc6OnVuYmluZGAgdG8gYmUgY2FsbGVkIG9uIGB0aGlzLmNvbXBvbmVudFZpZXdgLlxuICAgKi9cbiAgdW5iaW5kKCkgeyAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5vYnNlcnZlcnNba2V5XS51bm9ic2VydmUoKTtcbiAgICB9KTtcbiAgICBcbiAgICBpZiAodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcudW5iaW5kLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgSUJpbmRlcnMgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgSUZvcm1hdHRlcnMgfSBmcm9tICcuL2Zvcm1hdHRlcnMnO1xuaW1wb3J0IHsgSUNvbXBvbmVudCwgSUNvbXBvbmVudHMgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcblxuZXhwb3J0IHR5cGUgU2NvcGUgPSBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvbmVudDxWYWx1ZVR5cGU+IHtcbiAgdGVtcGxhdGU6ICgoKSA9PiBzdHJpbmcpIHwgKCgpID0+IEhUTUxFbGVtZW50KTtcbiAgaW5pdGlhbGl6ZTogKGVsOiBIVE1MRWxlbWVudCwgZGF0YTogVmFsdWVUeXBlKSA9PiBTY29wZTtcblxuICAvLyBleHRlbnNpb24gb3B0aW9uc1xuICBiaW5kZXJzPzogSUJpbmRlcnM8YW55PjtcbiAgZm9ybWF0dGVycz86IElGb3JtYXR0ZXJzO1xuICBjb21wb25lbnRzPzogSUNvbXBvbmVudHM7XG4gIGFkYXB0ZXJzPzogSUFkYXB0ZXJzO1xuXG4gIC8vIG90aGVyIG9wdGlvbnNcbiAgcHJlZml4Pzogc3RyaW5nO1xuICBwcmVsb2FkRGF0YT86IGJvb2xlYW47XG4gIHJvb3RJbnRlcmZhY2U/OiBzdHJpbmc7XG4gIHRlbXBsYXRlRGVsaW1pdGVycz86IEFycmF5PHN0cmluZz5cbiAgaGFuZGxlcj86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb21wb25lbnRzIHtcbiAgW25hbWU6IHN0cmluZ106IElDb21wb25lbnQ8YW55Pjtcbn0iLCJleHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXIge1xuICAodmFsOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogYW55O1xuICByZWFkPzogKHJlc3VsdDogc3RyaW5nLCAuLi5wcm9jZXNzZWRBcmdzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgcHVibGlzaD86IChyZXN1bHQ6IHN0cmluZywgLi4ucHJvY2Vzc2VkQXJnczogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUZvcm1hdHRlcjtcbn1cblxuY29uc3QgZm9ybWF0dGVyczogSUZvcm1hdHRlcnMgPSB7fTtcblxuZm9ybWF0dGVycy5ub3QgPSBmdW5jdGlvbiAodmFsdWU6IGJvb2xlYW4pIHtcbiAgcmV0dXJuICF2YWx1ZTtcbn07XG5cbmV4cG9ydCB7IGZvcm1hdHRlcnMgfTtcbiIsIlxuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tICcuL3RpbnliaW5kJztcblxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2sge1xuICBzeW5jOiAoKSA9PiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJS2V5IHtcbiAgcGF0aDogYW55O1xuICBpOiBSb290O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiBPYnNlcnZlcjtcbn1cblxuZXhwb3J0IHR5cGUgT2JqID0gYW55O1xuXG5leHBvcnQgdHlwZSBSb290ID0gYW55O1xuXG4vLyBFcnJvciB0aHJvd2VyLlxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIHRocm93IG5ldyBFcnJvcignW09ic2VydmVyXSAnICsgbWVzc2FnZSlcbn1cblxuLy8gVE9ET1xubGV0IGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG5sZXQgaW50ZXJmYWNlczogc3RyaW5nW107XG5sZXQgcm9vdEludGVyZmFjZTogUm9vdDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcbiAga2V5cGF0aDogc3RyaW5nO1xuICBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrO1xuICBvYmplY3RQYXRoOiBPYmpbXTtcbiAgb2JqOiBPYmo7XG4gIHRhcmdldDogT2JqO1xuICBrZXk6IElLZXk7XG4gIHRva2VuczogSUtleVtdO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IGtleXBhdGggb2JzZXJ2ZXIgYW5kIGtpY2tzIHRoaW5ncyBvZmYuXG4gICAqIEBwYXJhbSBvYmogXG4gICAqIEBwYXJhbSBrZXlwYXRoIFxuICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvYmo6IE9iaiwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5vYmplY3RQYXRoID0gW107XG4gICAgY29uc3QgcGFyc2VSZXN1bHQgPSB0aGlzLnBhcnNlKCk7XG4gICAgdGhpcy5rZXkgPSBwYXJzZVJlc3VsdC5rZXk7XG4gICAgdGhpcy50b2tlbnMgPSBwYXJzZVJlc3VsdC50b2tlbnM7XG4gICAgdGhpcy5vYmogPSB0aGlzLmdldFJvb3RPYmplY3Qob2JqKTtcbiAgICB0aGlzLnRhcmdldCA9IHRoaXMucmVhbGl6ZSgpO1xuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBhZGFwdGVycyA9IG9wdGlvbnMuYWRhcHRlcnM7XG4gICAgaW50ZXJmYWNlcyA9IE9iamVjdC5rZXlzKGFkYXB0ZXJzKTtcbiAgICByb290SW50ZXJmYWNlID0gb3B0aW9ucy5yb290SW50ZXJmYWNlO1xuICB9XG4gIFxuICAvKipcbiAgICogVG9rZW5pemVzIHRoZSBwcm92aWRlZCBrZXlwYXRoIHN0cmluZyBpbnRvIGludGVyZmFjZSArIHBhdGggdG9rZW5zIGZvciB0aGVcbiAgICogb2JzZXJ2ZXIgdG8gd29yayB3aXRoLlxuICAgKi9cbiAgc3RhdGljIHRva2VuaXplID0gZnVuY3Rpb24oa2V5cGF0aDogc3RyaW5nLCByb290OiBSb290KSB7XG4gICAgdmFyIHRva2VuczogYW55W10gPSBbXTtcbiAgICB2YXIgY3VycmVudDogSUtleSA9IHtpOiByb290LCBwYXRoOiAnJ307XG4gICAgdmFyIGluZGV4OiBudW1iZXI7XG4gICAgdmFyIGNocjogc3RyaW5nO1xuICBcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBrZXlwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY2hyID0ga2V5cGF0aC5jaGFyQXQoaW5kZXgpO1xuICBcbiAgICAgIGlmICghIX5pbnRlcmZhY2VzLmluZGV4T2YoY2hyKSkge1xuICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICAgICAgY3VycmVudCA9IHtpOiBjaHIsIHBhdGg6ICcnfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQucGF0aCArPSBjaHI7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG4gIFxuICAvKipcbiAgICogUGFyc2VzIHRoZSBrZXlwYXRoIHVzaW5nIHRoZSBpbnRlcmZhY2VzIGRlZmluZWQgb24gdGhlIHZpZXcuIFNldHMgdmFyaWFibGVzXG4gICAqIGZvciB0aGUgdG9rZW5pemVkIGtleXBhdGggYXMgd2VsbCBhcyB0aGUgZW5kIGtleS5cbiAgICovXG4gIHBhcnNlKCkge1xuICAgIHZhciBwYXRoOiBzdHJpbmc7XG4gICAgdmFyIHJvb3Q6IFJvb3Q7XG4gIFxuICAgIGlmICghaW50ZXJmYWNlcy5sZW5ndGgpIHtcbiAgICAgIGVycm9yKCdNdXN0IGRlZmluZSBhdCBsZWFzdCBvbmUgYWRhcHRlciBpbnRlcmZhY2UuJyk7XG4gICAgfVxuICBcbiAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKHRoaXMua2V5cGF0aFswXSkpIHtcbiAgICAgIHJvb3QgPSB0aGlzLmtleXBhdGhbMF07XG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoLnN1YnN0cigxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdCA9IHJvb3RJbnRlcmZhY2U7XG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoO1xuICAgIH1cbiAgXG4gICAgdGhpcy50b2tlbnMgPSBPYnNlcnZlci50b2tlbml6ZShwYXRoLCByb290KTtcblxuICAgIGlmKCF0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gdG9rZW5zJyk7XG4gICAgfVxuXG4gICAgdGhpcy5rZXkgPSAodGhpcy50b2tlbnMucG9wKCkgYXMgSUtleSk7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICB0b2tlbnM6IHRoaXMudG9rZW5zLFxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIFJlYWxpemVzIHRoZSBmdWxsIGtleXBhdGgsIGF0dGFjaGluZyBvYnNlcnZlcnMgZm9yIGV2ZXJ5IGtleSBhbmQgY29ycmVjdGluZ1xuICAgKiBvbGQgb2JzZXJ2ZXJzIHRvIGFueSBjaGFuZ2VkIG9iamVjdHMgaW4gdGhlIGtleXBhdGguXG4gICAqL1xuICByZWFsaXplKCkge1xuICAgIHZhciBjdXJyZW50OiBPYmogPSB0aGlzLm9ialxuICAgIHZhciB1bnJlYWNoZWQgPSAtMVxuICAgIHZhciBwcmV2XG4gICAgdmFyIHRva2VuXG4gIFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgICBpZiAoaXNPYmplY3QoY3VycmVudCkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9iamVjdFBhdGhbaW5kZXhdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChjdXJyZW50ICE9PSAocHJldiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pKSB7XG4gICAgICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIHByZXYsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLnNldCh0cnVlLCB0b2tlbiwgY3VycmVudCwgdGhpcylcbiAgICAgICAgICAgIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gPSBjdXJyZW50XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICAgIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gPSBjdXJyZW50XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh0b2tlbiwgY3VycmVudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1bnJlYWNoZWQgPT09IC0xKSB7XG4gICAgICAgICAgdW5yZWFjaGVkID0gaW5kZXhcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKHByZXYgPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAodW5yZWFjaGVkICE9PSAtMSkge1xuICAgICAgdGhpcy5vYmplY3RQYXRoLnNwbGljZSh1bnJlYWNoZWQpXG4gICAgfVxuICBcbiAgICByZXR1cm4gY3VycmVudFxuICB9XG4gIFxuICAvKipcbiAgICogVXBkYXRlcyB0aGUga2V5cGF0aC4gVGhpcyBpcyBjYWxsZWQgd2hlbiBhbnkgaW50ZXJtZWRpYXJ5IGtleSBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICB2YXIgbmV4dCwgb2xkVmFsdWUsIG5ld1ZhbHVlXG4gIFxuICAgIGlmICgobmV4dCA9IHRoaXMucmVhbGl6ZSgpKSAhPT0gdGhpcy50YXJnZXQpIHtcbiAgICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICAgIH1cbiAgXG4gICAgICBpZiAoaXNPYmplY3QobmV4dCkpIHtcbiAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIG5leHQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgb2xkVmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIHRoaXMudGFyZ2V0ID0gbmV4dFxuICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUgfHwgbmV3VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9IGVsc2UgaWYgKG5leHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gUmV0dXJucyB1bmRlZmluZWQgaWZcbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZS5cbiAgdmFsdWUoKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5LCB0aGlzLnRhcmdldClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNldHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBDYWxsaW5nIHNldFZhbHVlIHdoZW5cbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZSBpcyBhIG5vLW9wLlxuICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgYWRhcHRlcnNbdGhpcy5rZXkuaV0uc2V0KHRoaXMudGFyZ2V0LCB0aGlzLmtleS5wYXRoLCB2YWx1ZSlcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwcm92aWRlZCBrZXkgb24gYW4gb2JqZWN0LlxuICAgKiBAcGFyYW0ga2V5IFxuICAgKiBAcGFyYW0gb2JqIFxuICAgKi9cbiAgZ2V0KGtleTogSUtleSwgb2JqOiBPYmopIHtcbiAgICByZXR1cm4gYWRhcHRlcnNba2V5LmldLmdldChvYmosIGtleS5wYXRoKVxuICB9XG4gIFxuICAvKipcbiAgICogT2JzZXJ2ZXMgb3IgdW5vYnNlcnZlcyBhIGNhbGxiYWNrIG9uIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGtleS5cbiAgICogQHBhcmFtIGFjdGl2ZSBcbiAgICogQHBhcmFtIGtleSBcbiAgICogQHBhcmFtIG9iaiBcbiAgICogQHBhcmFtIGNhbGxiYWNrIFxuICAgKi9cbiAgc2V0KGFjdGl2ZTogYm9vbGVhbiwga2V5OiBJS2V5LCBvYmo6IE9iaiwgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIGlmKGFjdGl2ZSkge1xuICAgICAgYWRhcHRlcnNba2V5LmldLm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkYXB0ZXJzW2tleS5pXS51bm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogVW5vYnNlcnZlcyB0aGUgZW50aXJlIGtleXBhdGguXG4gICAqL1xuICB1bm9ic2VydmUoKSB7XG4gICAgdmFyIG9iajogT2JqO1xuICAgIHZhciB0b2tlbjtcbiAgXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1tpbmRleF1cbiAgICAgIGlmIChvYmogPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSB7XG4gICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgb2JqLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICB9XG4gIH1cbiAgLy8gdHJhdmVyc2UgdGhlIHNjb3BlIGNoYWluIHRvIGZpbmQgdGhlIHNjb3BlIHdoaWNoIGhhcyB0aGUgcm9vdCBwcm9wZXJ0eVxuICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IGZvdW5kIGluIGNoYWluLCByZXR1cm5zIHRoZSByb290IHNjb3BlXG4gIGdldFJvb3RPYmplY3Qob2JqOiBPYmopIHtcbiAgICB2YXIgcm9vdFByb3AsIGN1cnJlbnQ7XG4gICAgaWYgKCFvYmouJHBhcmVudCkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIFxuICAgIGlmICh0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy50b2tlbnNbMF0ucGF0aFxuICAgIH0gZWxzZSB7XG4gICAgICByb290UHJvcCA9IHRoaXMua2V5LnBhdGhcbiAgICB9XG4gIFxuICAgIGN1cnJlbnQgPSBvYmo7XG4gICAgd2hpbGUgKGN1cnJlbnQuJHBhcmVudCAmJiAoY3VycmVudFtyb290UHJvcF0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LiRwYXJlbnRcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG59XG4iLCJpbXBvcnQgeyBpc0pzb24gfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmV4cG9ydCBjb25zdCBQUklNSVRJVkUgPSAwO1xuZXhwb3J0IGNvbnN0IEtFWVBBVEggPSAxO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSAwO1xuZXhwb3J0IGNvbnN0IEJJTkRJTkcgPSAxO1xuXG5jb25zdCBRVU9URURfU1RSID0gL14nLionJHxeXCIuKlwiJC87IC8vIHJlZ2V4IHRvIHRlc3QgaWYgc3RyaW5nIGlzIHdyYXBwZWQgaW4gXCIgb3IgJ1xuXG5cbi8vIFBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBnZXR0aW5nIHRoZSB0eXBlIGFuZCB2YWx1ZSBmcm9tIGEgc3RyaW5nLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHlwZShzdHJpbmc6IHN0cmluZykge1xuICBsZXQgdHlwZSA9IFBSSU1JVElWRTtcbiAgbGV0IHZhbHVlOiBhbnkgPSBzdHJpbmc7XG4gIGlmIChRVU9URURfU1RSLnRlc3Qoc3RyaW5nKSkge1xuICAgIHZhbHVlID0gc3RyaW5nLnNsaWNlKDEsIC0xKTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd0cnVlJykge1xuICAgIHZhbHVlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdmYWxzZScpIHtcbiAgICB2YWx1ZSA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ251bGwnKSB7XG4gICAgdmFsdWUgPSBudWxsO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICghaXNOYU4oTnVtYmVyKHN0cmluZykpKSB7XG4gICAgdmFsdWUgPSBOdW1iZXIoc3RyaW5nKTtcbiAgfSBlbHNlIGlmIChpc0pzb24oc3RyaW5nKSkge1xuICAgIHZhbHVlID0gSlNPTi5wYXJzZShzdHJpbmcpO1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBLRVlQQVRIO1xuICB9XG4gIHJldHVybiB7dHlwZTogdHlwZSwgdmFsdWU6IHZhbHVlfTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElUb2tlbnMge1xuICB0eXBlOiBudW1iZXI7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIFRlbXBsYXRlIHBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBtdXN0YWNoZS1zdHlsZSB0ZXh0IGNvbnRlbnQgYmluZGluZ3MuXG4vLyBQYXJzZXMgdGhlIHRlbXBsYXRlIGFuZCByZXR1cm5zIGEgc2V0IG9mIHRva2Vucywgc2VwYXJhdGluZyBzdGF0aWMgcG9ydGlvbnNcbi8vIG9mIHRleHQgZnJvbSBiaW5kaW5nIGRlY2xhcmF0aW9ucy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIGRlbGltaXRlcnM6IHN0cmluZ1tdKSB7XG4gIHZhciB0b2tlbnM6IElUb2tlbnNbXSB8IG51bGwgPSBudWxsO1xuICBsZXQgbGVuZ3RoID0gdGVtcGxhdGUubGVuZ3RoO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgbGV0IG9wZW4gPSBkZWxpbWl0ZXJzWzBdLCBjbG9zZSA9IGRlbGltaXRlcnNbMV07XG5cbiAgd2hpbGUgKGxhc3RJbmRleCA8IGxlbmd0aCkge1xuICAgIGluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihvcGVuLCBsYXN0SW5kZXgpO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VucyA9IHRva2VucyB8fCBbXTtcbiAgICAgIGlmIChpbmRleCA+IDAgJiYgbGFzdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIG9wZW4ubGVuZ3RoO1xuICAgICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKGNsb3NlLCBsYXN0SW5kZXgpO1xuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGxldCBzdWJzdHJpbmcgPSB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXggLSBjbG9zZS5sZW5ndGgpO1xuICAgICAgICBsZXQgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAobGFzdFRva2VuICYmIGxhc3RUb2tlbi50eXBlID09PSBURVhUKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnZhbHVlICs9IHN1YnN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgICAgdmFsdWU6IHN1YnN0cmluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpLnRyaW0oKTtcblxuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBCSU5ESU5HLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIGNsb3NlLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuIiwiaW1wb3J0IHsgcGFyc2VUZW1wbGF0ZSwgcGFyc2VUeXBlLCBJVG9rZW5zIH0gZnJvbSAnLi9wYXJzZXJzJztcbmltcG9ydCB7IElGb3JtYXR0ZXJzLCBmb3JtYXR0ZXJzIH0gZnJvbSAnLi9mb3JtYXR0ZXJzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgYWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBiaW5kZXJzLCBCaW5kZXIsIElCaW5kZXJzLCBJVHdvV2F5QmluZGVyLCBJT25lV2F5QmluZGVyIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IE9ic2VydmVyLCBSb290IH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBJQ29tcG9uZW50cywgSUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBtZXJnZU9iamVjdCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSU9wdGlvbnMge1xuICAvLyBBdHRyaWJ1dGUgcHJlZml4IGluIHRlbXBsYXRlc1xuICBwcmVmaXg/OiBzdHJpbmc7XG5cbiAgLy9QcmVsb2FkIHRlbXBsYXRlcyB3aXRoIGluaXRpYWwgZGF0YSBvbiBiaW5kXG4gIHByZWxvYWREYXRhPzogYm9vbGVhbjtcblxuICAvL1Jvb3Qgc2lnaHRnbGFzcyBpbnRlcmZhY2UgZm9yIGtleXBhdGhzXG4gIHJvb3RJbnRlcmZhY2U/OiBzdHJpbmc7XG5cbiAgLy8gVGVtcGxhdGUgZGVsaW1pdGVycyBmb3IgdGV4dCBiaW5kaW5nc1xuICB0ZW1wbGF0ZURlbGltaXRlcnM/OiBBcnJheTxzdHJpbmc+XG5cbiAgLy8gQXVnbWVudCB0aGUgZXZlbnQgaGFuZGxlciBvZiB0aGUgb24tKiBiaW5kZXJcbiAgaGFuZGxlcj86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSUV4dGVuc2lvbnMge1xuICBiaW5kZXJzOiBJQmluZGVyczxhbnk+O1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgY29tcG9uZW50czogSUNvbXBvbmVudHM7XG4gIGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJT3B0aW9uc1BhcmFtIGV4dGVuZHMgSUV4dGVuc2lvbnMsIElPcHRpb25zIHt9XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBJVmlld09wdGlvbnMgZXh0ZW5kcyBJT3B0aW9uc1BhcmFtIHtcbiAgc3RhckJpbmRlcnM6IGFueTtcbiAgLy8gc2lnaHRnbGFzc1xuICByb290SW50ZXJmYWNlOiBSb290O1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSVRpbnliaW5kIHtcbiAgYmluZGVyczogSUJpbmRlcnM8YW55PjtcbiAgY29tcG9uZW50czogSUNvbXBvbmVudHM7XG4gIGZvcm1hdHRlcnM6IElGb3JtYXR0ZXJzO1xuICBhZGFwdGVyczogSUFkYXB0ZXJzO1xuICBfcHJlZml4OiBzdHJpbmc7XG4gIF9mdWxsUHJlZml4OiBzdHJpbmc7XG4gIHByZWZpeDogc3RyaW5nO1xuICBwYXJzZVRlbXBsYXRlOiAodGVtcGxhdGU6IHN0cmluZywgZGVsaW1pdGVyczogc3RyaW5nW10pID0+IElUb2tlbnNbXSB8IG51bGw7XG4gIHBhcnNlVHlwZTogKHN0cmluZzogc3RyaW5nKSA9PiB7XG4gICAgdHlwZTogbnVtYmVyO1xuICAgIHZhbHVlOiBhbnk7XG4gIH07XG4gIHRlbXBsYXRlRGVsaW1pdGVyczogc3RyaW5nW107XG4gIHJvb3RJbnRlcmZhY2U6IHN0cmluZztcbiAgcHJlbG9hZERhdGE6IGJvb2xlYW47XG4gIGhhbmRsZXIodGhpczogYW55LCBjb250ZXh0OiBhbnksIGV2OiBFdmVudCwgYmluZGluZzogQmluZGluZyk6IHZvaWQ7XG4gIGZhbGxiYWNrQmluZGVyKHRoaXM6IEJpbmRpbmcsIGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSk6IHZvaWQ7XG4gIGNvbmZpZ3VyZShvcHRpb25zOiBhbnkpOiB2b2lkO1xuICBpbml0OiAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YT86IHt9KSA9PiBWaWV3O1xuICBiaW5kOiAoZWw6IEhUTUxFbGVtZW50LCBtb2RlbHM6IGFueSwgb3B0aW9ucz86IElPcHRpb25zUGFyYW0gfCB1bmRlZmluZWQpID0+IFZpZXc7XG59XG5cbmNvbnN0IHRpbnliaW5kOiBJVGlueWJpbmQgPSB7XG4gIC8vIEdsb2JhbCBiaW5kZXJzLlxuICBiaW5kZXJzOiA8SUJpbmRlcnM8YW55Pj4gYmluZGVycyxcblxuICAvLyBHbG9iYWwgY29tcG9uZW50cy5cbiAgY29tcG9uZW50czogPElDb21wb25lbnRzPiB7fSxcblxuICAvLyBHbG9iYWwgZm9ybWF0dGVycy5cbiAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBmb3JtYXR0ZXJzLFxuXG4gIC8vIEdsb2JhbCBzaWdodGdsYXNzIGFkYXB0ZXJzLlxuICBhZGFwdGVyczogPElBZGFwdGVycz4ge1xuICAgICcuJzogYWRhcHRlcixcbiAgfSxcblxuICAvLyBEZWZhdWx0IGF0dHJpYnV0ZSBwcmVmaXguXG4gIF9wcmVmaXg6ICdydicsXG5cbiAgX2Z1bGxQcmVmaXg6ICdydi0nLFxuXG4gIGdldCBwcmVmaXggKCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH0sXG5cbiAgc2V0IHByZWZpeCAodmFsdWUpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgICB0aGlzLl9mdWxsUHJlZml4ID0gdmFsdWUgKyAnLSc7XG4gIH0sXG5cbiAgcGFyc2VUZW1wbGF0ZTogcGFyc2VUZW1wbGF0ZSxcblxuICBwYXJzZVR5cGU6IHBhcnNlVHlwZSxcblxuICAvLyBEZWZhdWx0IHRlbXBsYXRlIGRlbGltaXRlcnMuXG4gIHRlbXBsYXRlRGVsaW1pdGVyczogWyd7JywgJ30nXSxcblxuICAvLyBEZWZhdWx0IHNpZ2h0Z2xhc3Mgcm9vdCBpbnRlcmZhY2UuXG4gIHJvb3RJbnRlcmZhY2U6ICcuJyxcblxuICAvLyBQcmVsb2FkIGRhdGEgYnkgZGVmYXVsdC5cbiAgcHJlbG9hZERhdGE6IHRydWUsXG5cbiAgLyoqXG4gICAqIERlZmF1bHQgZXZlbnQgaGFuZGxlci5cbiAgICovXG4gIGhhbmRsZXIodGhpczogYW55LCBjb250ZXh0OiBhbnksIGV2OiBFdmVudCwgYmluZGluZzogQmluZGluZykge1xuICAgIHRoaXMuY2FsbChjb250ZXh0LCBldiwgYmluZGluZy52aWV3Lm1vZGVscyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC4gSWYgbm8gYmluZGVyIGFib3ZlIGlzIG1hdGNoZWQgaXQgd2lsbCBmYWxsXG4gICAqIGJhY2sgdG8gdXNpbmcgdGhpcyBiaW5kZXIuXG4gICAqL1xuICBmYWxsYmFja0JpbmRlcih0aGlzOiBCaW5kaW5nLCBlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpIHtcbiAgICBpZighdGhpcy50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3Qgc2V0IGF0dHRyaWJ1dGUgb2YgJyArIHRoaXMudHlwZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUodGhpcy50eXBlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnR5cGUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWVyZ2VzIGFuIG9iamVjdCBsaXRlcmFsIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9wdGlvbnMuXG4gICAqIEBwYXJhbSBvcHRpb25zIFxuICAgKi9cbiAgY29uZmlndXJlKG9wdGlvbnM6IGFueSkge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgICAgIHN3aXRjaChvcHRpb24pIHtcbiAgICAgICAgY2FzZSAnYmluZGVycyc6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5iaW5kZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb3JtYXR0ZXJzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmZvcm1hdHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NvbXBvbmVudHMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuY29tcG9uZW50cywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWRhcHRlcnMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYWRhcHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FkYXB0ZXInOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYWRhcHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZWZpeCc6XG4gICAgICAgICAgdGhpcy5wcmVmaXggPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFyc2VUZW1wbGF0ZSc6XG4gICAgICAgICAgdGhpcy5wYXJzZVRlbXBsYXRlID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3BhcnNlVHlwZSc6XG4gICAgICAgICAgdGhpcy5wYXJzZVR5cGUgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJlZml4JzpcbiAgICAgICAgICB0aGlzLnByZWZpeCA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0ZW1wbGF0ZURlbGltaXRlcnMnOlxuICAgICAgICAgIHRoaXMudGVtcGxhdGVEZWxpbWl0ZXJzID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Jvb3RJbnRlcmZhY2UnOlxuICAgICAgICAgIHRoaXMucm9vdEludGVyZmFjZSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcmVsb2FkRGF0YSc6XG4gICAgICAgICAgdGhpcy5wcmVsb2FkRGF0YSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignT3B0aW9uIG5vdCBzdXBwb3J0ZWQnLCBvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgb24gdGhlIHNwZWNpZmllZCBlbGVtZW50IGFuZFxuICAvLyByZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cdFxuICBpbml0OiAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YSA9IHt9KSA9PiB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aW55YmluZC5jb21wb25lbnRzW2NvbXBvbmVudEtleV07XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlLmNhbGwodGlueWJpbmQsIGVsKTtcbiAgICBsZXQgc2NvcGUgPSBjb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRpbnliaW5kLCBlbCwgZGF0YSk7XG5cbiAgICBsZXQgdmlldyA9IHRpbnliaW5kLmJpbmQoZWwsIHNjb3BlKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcblxuICAvLyBCaW5kcyBzb21lIGRhdGEgdG8gYSB0ZW1wbGF0ZSAvIGVsZW1lbnQuIFJldHVybnMgYSB0aW55YmluZC5WaWV3IGluc3RhbmNlLlxuICBiaW5kOiAoZWw6IEhUTUxFbGVtZW50LCBtb2RlbHM6IGFueSwgb3B0aW9ucz86IElPcHRpb25zUGFyYW0pID0+IHtcbiAgICBsZXQgdmlld09wdGlvbnM6IElWaWV3T3B0aW9ucyA9IHtcbiAgICAgIC8vIEVYVEVOU0lPTlNcbiAgICAgIGJpbmRlcnM6IDxJQmluZGVyczxhbnk+PiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgY29tcG9uZW50czogPElDb21wb25lbnRzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAvLyBvdGhlclxuICAgICAgc3RhckJpbmRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAvLyBzaWdodGdsYXNzXG4gICAgICByb290SW50ZXJmYWNlOiA8Um9vdD4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICB9O1xuICAgIG1vZGVscyA9IG1vZGVscyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIC8vIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYob3B0aW9ucykge1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYmluZGVycywgb3B0aW9ucy5iaW5kZXJzKTtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYWRhcHRlcnMsIG9wdGlvbnMuYWRhcHRlcnMpO1xuICAgIH1cblxuICAgIHZpZXdPcHRpb25zLnByZWZpeCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnByZWZpeCA6IHRpbnliaW5kLnByZWZpeFxuICAgIHZpZXdPcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA9IG9wdGlvbnMgJiYgb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPyBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA6IHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVyc1xuICAgIHZpZXdPcHRpb25zLnJvb3RJbnRlcmZhY2UgPSBvcHRpb25zICYmIG9wdGlvbnMucm9vdEludGVyZmFjZSA/IG9wdGlvbnMucm9vdEludGVyZmFjZSA6IHRpbnliaW5kLnJvb3RJbnRlcmZhY2VcbiAgICB2aWV3T3B0aW9ucy5wcmVsb2FkRGF0YSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVsb2FkRGF0YSA/IG9wdGlvbnMucHJlbG9hZERhdGEgOiB0aW55YmluZC5wcmVsb2FkRGF0YVxuICAgIHZpZXdPcHRpb25zLmhhbmRsZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlciA/IG9wdGlvbnMuaGFuZGxlciA6IHRpbnliaW5kLmhhbmRsZXJcblxuICAgIC8vIG1lcmdlIGV4dGVuc2lvbnNcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCB0aW55YmluZC5iaW5kZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCB0aW55YmluZC5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCB0aW55YmluZC5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgdGlueWJpbmQuYWRhcHRlcnMpO1xuXG4gICAgLy8gZ2V0IGFsbCBzdGFyQmluZGVycyBmcm9tIGF2YWlsYWJsZSBiaW5kZXJzXG4gICAgdmlld09wdGlvbnMuc3RhckJpbmRlcnMgPSBPYmplY3Qua2V5cyh2aWV3T3B0aW9ucy5iaW5kZXJzKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGtleS5pbmRleE9mKCcqJykgPiAwO1xuICAgIH0pO1xuXG4gICAgT2JzZXJ2ZXIudXBkYXRlT3B0aW9ucyh2aWV3T3B0aW9ucyk7XG5cbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCBtb2RlbHMsIHZpZXdPcHRpb25zKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcbn07XG5cbmV4cG9ydCB7XG4gIHRpbnliaW5kLFxuICAvLyBJVGlueWJpbmQsXG4gIC8vIElFeHRlbnNpb25zLFxuICAvLyBJT3B0aW9ucyxcbiAgLy8gSU9wdGlvbnNQYXJhbSxcbiAgLy8gSVZpZXdPcHRpb25zLFxuICBwYXJzZVRlbXBsYXRlLFxuICBwYXJzZVR5cGUsXG4gIElGb3JtYXR0ZXJzLFxuICBmb3JtYXR0ZXJzLFxuICBCaW5kaW5nLFxuICBhZGFwdGVyLFxuICBiaW5kZXJzLFxuICBCaW5kZXIsXG4gIElCaW5kZXJzLFxuICBJVHdvV2F5QmluZGVyLFxuICBJT25lV2F5QmluZGVyLFxuICBWaWV3LFxuICBJQWRhcHRlcnMsXG4gIE9ic2VydmVyLFxuICBSb290LFxuICBJQ29tcG9uZW50cyxcbiAgSUNvbXBvbmVudFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdGlueWJpbmQ7XG4iLCJleHBvcnQgY29uc3QgbWVyZ2VPYmplY3QgPSAodGFyZ2V0OiBhbnksIG9iajogYW55KSA9PiB7XG4gIGlmKG9iaikge1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0OyBcbn07XG5cbi8vIFRlc3QgaWYgc3RyaW5nIGlzIGEganNvbiBzdHJpbmdcbmV4cG9ydCBjb25zdCBpc0pzb24gPSAoc3RyOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2YWwgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuICh2YWwgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWwgaW5zdGFuY2VvZiBPYmplY3QpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBDaGVjayBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdCB0aGFuIGNhbiBiZSBvYnNlcnZlZC5cbmV4cG9ydCBjb25zdCBpc09iamVjdCA9IChvYmo6IE9iamVjdCkgPT4ge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsXG59XG5cbmV4cG9ydCBjb25zdCBnZXRTdHJpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdGltZXMgPSAobjogbnVtYmVyLCBjYjooKSA9PiB2b2lkKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSBjYigpO1xufTsiLCJpbXBvcnQgeyB0aW55YmluZCwgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBCaW5kZXIsIElUd29XYXlCaW5kZXIgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nLCBJQm91bmRFbGVtZW50IH0gZnJvbSAnLi9jb21wb25lbnQtYmluZGluZyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlIH0gZnJvbSAnLi9wYXJzZXJzJztcblxuZXhwb3J0IHR5cGUgVEJsb2NrID0gYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGRhdGE/OiBzdHJpbmc7XG59XG5cbmNvbnN0IHRleHRCaW5kZXI6IElUd29XYXlCaW5kZXI8c3RyaW5nPiA9IHtcbiAgcm91dGluZTogKG5vZGU6IElEYXRhRWxlbWVudCwgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIG5vZGUuZGF0YSA9ICh2YWx1ZSAhPSBudWxsKSA/IHZhbHVlIDogJyc7XG4gIH1cbn07XG5cbmNvbnN0IERFQ0xBUkFUSU9OX1NQTElUID0gLygoPzonW14nXSonKSooPzooPzpbXlxcfCddKig/OidbXiddKicpK1teXFx8J10qKSt8W15cXHxdKykpfF4kL2c7XG5cbmNvbnN0IHBhcnNlTm9kZSA9ICh2aWV3OiBWaWV3LCBub2RlOiBJRGF0YUVsZW1lbnQpID0+IHtcbiAgbGV0IGJsb2NrOiBUQmxvY2sgPSBmYWxzZTtcblxuICAvLyBpZiBub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERVxuICBub2RlID0gKCBub2RlIGFzIElEYXRhRWxlbWVudCk7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgaWYoIW5vZGUuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub2RlIGhhcyBubyBkYXRhJyk7XG4gICAgfVxuICAgIGxldCB0b2tlbnMgPSBwYXJzZVRlbXBsYXRlKG5vZGUuZGF0YSwgdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzKTtcblxuICAgIGlmICh0b2tlbnMpIHtcbiAgICAgIGlmKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZXh0LCBub2RlKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICB2aWV3LmJ1aWxkQmluZGluZyh0ZXh0LCBudWxsLCB0b2tlbi52YWx1ZSwgdGV4dEJpbmRlciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgYmxvY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBibG9jayA9IHZpZXcudHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICBpZiAoIWJsb2NrKSB7XG4gICAgaWYobm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJzZU5vZGUodmlldywgKG5vZGUuY2hpbGROb2Rlc1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGJpbmRpbmdDb21wYXJhdG9yID0gKGE6IEJpbmRpbmcsIGI6IEJpbmRpbmcpID0+IHtcbiAgbGV0IGFQcmlvcml0eSA9IGEuYmluZGVyID8gKChhLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgbGV0IGJQcmlvcml0eSA9IGIuYmluZGVyID8gKChiLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgcmV0dXJuIGJQcmlvcml0eSAtIGFQcmlvcml0eTtcbn07XG5cbmNvbnN0IHRyaW1TdHIgPSAoc3RyOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHN0ci50cmltKCk7XG59O1xuXG4vLyBBIGNvbGxlY3Rpb24gb2YgYmluZGluZ3MgYnVpbHQgZnJvbSBhIHNldCBvZiBwYXJlbnQgbm9kZXMuXG5leHBvcnQgY2xhc3MgVmlldyB7XG5cbiAgZWxzOiBIVE1MQ29sbGVjdGlvbiB8IEhUTUxFbGVtZW50W10gfCBOb2RlW107XG4gIG1vZGVsczogYW55O1xuICBvcHRpb25zOiBJVmlld09wdGlvbnM7XG4gIGJpbmRpbmdzOiBCaW5kaW5nW10gPSBbXTtcbiAgY29tcG9uZW50VmlldzogVmlldyB8IG51bGwgPSBudWxsO1xuXG4gIC8vIFRoZSBET00gZWxlbWVudHMgYW5kIHRoZSBtb2RlbCBvYmplY3RzIGZvciBiaW5kaW5nIGFyZSBwYXNzZWQgaW50byB0aGVcbiAgLy8gY29uc3RydWN0b3IgYWxvbmcgd2l0aCBhbnkgbG9jYWwgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSB1c2VkIHRocm91Z2hvdXQgdGhlXG4gIC8vIGNvbnRleHQgb2YgdGhlIHZpZXcgYW5kIGl0J3MgYmluZGluZ3MuXG4gIGNvbnN0cnVjdG9yKGVsczogSFRNTENvbGxlY3Rpb24gfCBIVE1MRWxlbWVudCB8IE5vZGUsIG1vZGVsczogYW55LCBvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZWxzID0gZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVscyA9IChbZWxzXSBhcyBIVE1MRWxlbWVudFtdIHwgTm9kZVtdICk7XG4gICAgfVxuICAgIHRoaXMubW9kZWxzID0gbW9kZWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmJ1aWxkKCk7XG4gIH1cblxuICBwdWJsaWMgYnVpbGRCaW5kaW5nKG5vZGU6IEhUTUxFbGVtZW50IHwgVGV4dCwgdHlwZTogc3RyaW5nIHwgbnVsbCwgZGVjbGFyYXRpb246IHN0cmluZywgYmluZGVyOiBCaW5kZXI8YW55PiwgYXJnczogc3RyaW5nW10gfCBudWxsKSB7XG4gICAgbGV0IG1hdGNoZXMgPSBkZWNsYXJhdGlvbi5tYXRjaChERUNMQVJBVElPTl9TUExJVCk7XG4gICAgaWYobWF0Y2hlcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBtYXRjaGVzJyk7XG4gICAgfVxuICAgIGxldCBwaXBlcyA9IG1hdGNoZXMubWFwKHRyaW1TdHIpO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKSB8fCBudWxsO1xuICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQmluZGluZygodGhpcyBhcyBWaWV3KSwgKG5vZGUgYXMgSFRNTEVsZW1lbnQpLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIHBpcGVzKSk7XG4gIH1cblxuICAvLyBQYXJzZXMgdGhlIERPTSB0cmVlIGFuZCBidWlsZHMgYEJpbmRpbmdgIGluc3RhbmNlcyBmb3IgZXZlcnkgbWF0Y2hlZFxuICAvLyBiaW5kaW5nIGRlY2xhcmF0aW9uLlxuICBidWlsZCgpIHtcbiAgICB0aGlzLmJpbmRpbmdzID0gW107XG5cbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVscywgaSwgbGVuO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwYXJzZU5vZGUodGhpcywgKGVsZW1lbnRzW2ldIGFzIElEYXRhRWxlbWVudCkpO1xuICAgIH1cblxuICAgIHRoaXMuYmluZGluZ3Muc29ydChiaW5kaW5nQ29tcGFyYXRvcik7XG4gIH1cblxuICB0cmF2ZXJzZShub2RlOiBJQm91bmRFbGVtZW50KTogVEJsb2NrIHtcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIGxldCBibG9jayA9IG5vZGUubm9kZU5hbWUgPT09ICdTQ1JJUFQnIHx8IG5vZGUubm9kZU5hbWUgPT09ICdTVFlMRSc7XG4gICAgbGV0IGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgbGV0IGJpbmRJbmZvcyA9IFtdO1xuICAgIGxldCBzdGFyQmluZGVycyA9IHRoaXMub3B0aW9ucy5zdGFyQmluZGVycztcbiAgICB2YXIgdHlwZSwgYmluZGVyLCBpZGVudGlmaWVyLCBhcmdzO1xuXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIHdpdGggdGhlIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2XG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuaW5kZXhPZihiaW5kaW5nUHJlZml4KSA9PT0gMCkge1xuICAgICAgICB0eXBlID0gYXR0cmlidXRlLm5hbWUuc2xpY2UoYmluZGluZ1ByZWZpeC5sZW5ndGgpO1xuICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1t0eXBlXTtcbiAgICAgICAgYXJncyA9IFtdO1xuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzdGFyQmluZGVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgaWRlbnRpZmllciA9IHN0YXJCaW5kZXJzW2tdO1xuICAgICAgICAgICAgaWYgKHR5cGUuc2xpY2UoMCwgaWRlbnRpZmllci5sZW5ndGggLSAxKSA9PT0gaWRlbnRpZmllci5zbGljZSgwLCAtMSkpIHtcbiAgICAgICAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgIGFyZ3MucHVzaCh0eXBlLnNsaWNlKGlkZW50aWZpZXIubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGJpbmRlciA9IHRpbnliaW5kLmZhbGxiYWNrQmluZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChiaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5ibG9jaykge1xuICAgICAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIHR5cGUsIGF0dHJpYnV0ZS52YWx1ZSwgYmluZGVyLCBhcmdzKTtcbiAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5kSW5mb3MucHVzaCh7YXR0cjogYXR0cmlidXRlLCBiaW5kZXI6IGJpbmRlciwgdHlwZTogdHlwZSwgYXJnczogYXJnc30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZEluZm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmluZEluZm8gPSBiaW5kSW5mb3NbaV07XG4gICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCBiaW5kSW5mby50eXBlLCBiaW5kSW5mby5hdHRyLnZhbHVlLCBiaW5kSW5mby5iaW5kZXIsIGJpbmRJbmZvLmFyZ3MpO1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYmluZEluZm8uYXR0ci5uYW1lKTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIGNvbXBvbmVudHNcbiAgICBpZiAoIWJsb2NrKSB7XG4gICAgICB0eXBlID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbXBvbmVudHNbdHlwZV0gJiYgIW5vZGUuX2JvdW5kKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQ29tcG9uZW50QmluZGluZygodGhpcyBhcyBWaWV3KSwgbm9kZSwgdHlwZSkpO1xuICAgICAgICBibG9jayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJsb2NrO1xuICB9XG5cbiAgLy8gQmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5iaW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICB1bmJpbmQoKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLmJpbmRpbmdzKSkge1xuICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICBiaW5kaW5nLnVuYmluZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN5bmNzIHVwIHRoZSB2aWV3IHdpdGggdGhlIG1vZGVsIGJ5IHJ1bm5pbmcgdGhlIHJvdXRpbmVzIG9uIGFsbCBiaW5kaW5ncy5cbiAgc3luYygpIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1Ymxpc2hlcyB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIHZpZXcgYmFjayB0byB0aGUgbW9kZWwgKHJldmVyc2Ugc3luYykuXG4gIHB1Ymxpc2goKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcuYmluZGVyICYmIChiaW5kaW5nLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnB1Ymxpc2hlcykge1xuICAgICAgICBiaW5kaW5nLnB1Ymxpc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIHZpZXcncyBtb2RlbHMgYWxvbmcgd2l0aCBhbnkgYWZmZWN0ZWQgYmluZGluZ3MuXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm1vZGVsc1trZXldID0gbW9kZWxzW2tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBpZiAoYmluZGluZy51cGRhdGUpIHtcbiAgICAgICAgYmluZGluZy51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==