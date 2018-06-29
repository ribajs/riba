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
var adapter = new Adapter(); // export default adapter;

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "pipes", {});

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
        // result[key] = this.static[key];
        result[key] = _this3.formattedValues(_this3.static[key], key);
      });
      Object.keys(this.observers).forEach(function (key) {
        // result[key] = this.observers[key].value();
        result[key] = _this3.formattedValues(_this3.observers[key].value(), key);
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
            this.observers[_propertyName] = this.observe(this.view.models, this.keypaths[_propertyName], this);
          } else {
            throw new Error('can\'t parse component attribute');
          }
        }
      }
    }
  }, {
    key: "parseFormatterArguments",
    value: function parseFormatterArguments(args, formatterIndex) {
      var _this4 = this;

      return args.map(_parsers.parseType).map(function (_ref, ai) {
        var type = _ref.type,
            value = _ref.value;

        if (type === _parsers.PRIMITIVE) {
          var primitiveValue = value;
          return primitiveValue;
        } else if (type === _parsers.KEYPATH) {
          // keypath is string
          var keypath = value;

          if (!_this4.formatterObservers[formatterIndex]) {
            _this4.formatterObservers[formatterIndex] = {};
          }

          var observer = _this4.formatterObservers[formatterIndex][ai];

          if (!observer) {
            observer = _this4.observe(_this4.view.models, keypath);
            _this4.formatterObservers[formatterIndex][ai] = observer;
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
      var _this5 = this;

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

        var formatter = _this5.view.options.formatters[id];

        var processedArgs = _this5.parseFormatterArguments(args, index);

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
      var _this6 = this;

      Object.keys(this.observers).forEach(function (key) {
        _this6.observers[key].unobserve();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvZm9ybWF0dGVycy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9vYnNlcnZlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3RpbnliaW5kLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3ZpZXcudHMiXSwibmFtZXMiOlsiQVJSQVlfTUVUSE9EUyIsIkFkYXB0ZXIiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwiY291bnRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3ZWFrbWFwIiwiX19ydiIsImNhbGxiYWNrcyIsInJlZiIsImtleXMiLCJsZW5ndGgiLCJwb2ludGVycyIsImZuIiwib3JpZ2luYWwiLCJtYXAiLCJ3ZWFrUmVmZXJlbmNlIiwiYXJncyIsInJlc3BvbnNlIiwiYXBwbHkiLCJmb3JFYWNoIiwiayIsInIiLCJBcnJheSIsImNhbGxiYWNrIiwic3luYyIsImtleXBhdGgiLCJzdHViRnVuY3Rpb24iLCJpbmRleE9mIiwicHVzaCIsImlkeCIsInNwbGljZSIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsInNldCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJuZXdWYWx1ZSIsInVub2JzZXJ2ZU11dGF0aW9ucyIsImNiIiwib2JzZXJ2ZU11dGF0aW9ucyIsImFkYXB0ZXIiLCJjcmVhdGVWaWV3IiwiYmluZGluZyIsIm1vZGVscyIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiRXJyb3IiLCJpbnNlcnRCZWZvcmUiLCJiaW5kZXJzIiwiZnVuY3Rpb24iLCJwcmlvcml0eSIsImN1c3RvbURhdGEiLCJoYW5kbGVyIiwidW5iaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiaW5kZXhQcm9wIiwiZ2V0QXR0cmlidXRlIiwiZ2V0SXRlcmF0aW9uQWxpYXMiLCJtb2RlbCIsImluZGV4Iiwic2NvcGUiLCIkcGFyZW50IiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInVuZGVmaW5lZCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJkYXRhIiwia2V5IiwiZWxDbGFzcyIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ0cmltIiwidGV4dCIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIkhUTUxTZWxlY3RFbGVtZW50IiwiaSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiaWYiLCJhdHRhY2hlZCIsImJvdW5kIiwibmVzdGVkIiwiZ2V0SW5wdXRWYWx1ZSIsInJlc3VsdHMiLCJGT1JNQVRURVJfQVJHUyIsIkZPUk1BVFRFUl9TUExJVCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiZm9ybWF0dGVyT2JzZXJ2ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIlBSSU1JVElWRSIsIktFWVBBVEgiLCJvYnNlcnZlciIsIm9ic2VydmUiLCJ0YXJnZXQiLCJmb3JtYXR0ZXJJbmRleCIsInBhcnNlVHlwZSIsImFpIiwicHJpbWl0aXZlVmFsdWUiLCJyZWR1Y2UiLCJyZXN1bHQiLCJkZWNsYXJhdGlvbiIsIm1hdGNoIiwic2hpZnQiLCJmb3JtYXR0ZXIiLCJwcm9jZXNzZWRBcmdzIiwicGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMiLCJyZWFkIiwiRnVuY3Rpb24iLCJldiIsImNhbGwiLCJmb3JtYXR0ZWRWYWx1ZSIsInJvdXRpbmVGbiIsInJlZHVjZVJpZ2h0Iiwic3BsaXQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwicGFyc2VUYXJnZXQiLCJwcmVsb2FkRGF0YSIsInVub2JzZXJ2ZSIsImZpIiwiQ29tcG9uZW50QmluZGluZyIsInRpbnliaW5kIiwiX2Z1bGxQcmVmaXgiLCJjb21wb25lbnQiLCJjb21wb25lbnRzIiwic3RhdGljIiwib2JzZXJ2ZXJzIiwiY29tcG9uZW50VmlldyIsImZvcm1hdHRlZFZhbHVlcyIsInN0cmluZyIsImdyb3VwZWQiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZSIsImFkYXB0ZXJzIiwicHJlZml4IiwidGVtcGxhdGVEZWxpbWl0ZXJzIiwicm9vdEludGVyZmFjZSIsImluaXRpYWxpemUiLCJsb2NhbHMiLCJwcm90b3R5cGUiLCJzbGljZSIsImNoaWxkTm9kZXMiLCJnZXRNZXJnZWRPcHRpb25zIiwiX2JvdW5kIiwibGVuIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsIm5hbWUiLCJiaW5kaW5nUHJlZml4IiwicHJvcGVydHlOYW1lIiwiY2FtZWxDYXNlIiwicGFyc2VkRGVjbGFyYXRpb24iLCJwYXJzZURlY2xhcmF0aW9uIiwicGlwZXMiLCJrZXlwYXRocyIsIm5vdCIsImVycm9yIiwibWVzc2FnZSIsImludGVyZmFjZXMiLCJvYmplY3RQYXRoIiwicGFyc2VSZXN1bHQiLCJwYXJzZSIsInRva2VucyIsImdldFJvb3RPYmplY3QiLCJyZWFsaXplIiwicGF0aCIsInJvb3QiLCJzdWJzdHIiLCJ0b2tlbml6ZSIsImN1cnJlbnQiLCJ1bnJlYWNoZWQiLCJwcmV2IiwibmV4dCIsIm9sZFZhbHVlIiwiYWN0aXZlIiwicm9vdFByb3AiLCJjaHIiLCJjaGFyQXQiLCJURVhUIiwiQklORElORyIsIlFVT1RFRF9TVFIiLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJKU09OIiwicGFyc2VUZW1wbGF0ZSIsImRlbGltaXRlcnMiLCJsYXN0SW5kZXgiLCJvcGVuIiwiY2xvc2UiLCJzdWJzdHJpbmciLCJsYXN0VG9rZW4iLCJfcHJlZml4IiwiY29udGV4dCIsImZhbGxiYWNrQmluZGVyIiwicmVtb3ZlQXR0cmlidXRlIiwiY29uZmlndXJlIiwiY29uc29sZSIsIndhcm4iLCJpbml0IiwiY29tcG9uZW50S2V5IiwiY3JlYXRlRWxlbWVudCIsInZpZXdPcHRpb25zIiwic3RhckJpbmRlcnMiLCJmaWx0ZXIiLCJ1cGRhdGVPcHRpb25zIiwibWVyZ2VPYmplY3QiLCJpc0pzb24iLCJzdHIiLCJ2YWwiLCJpc09iamVjdCIsImdldFN0cmluZyIsInRvU3RyaW5nIiwidGltZXMiLCJuIiwidGV4dEJpbmRlciIsIm5vZGUiLCJERUNMQVJBVElPTl9TUExJVCIsInBhcnNlTm9kZSIsIm5vZGVUeXBlIiwiY3JlYXRlVGV4dE5vZGUiLCJidWlsZEJpbmRpbmciLCJ0cmF2ZXJzZSIsImJpbmRpbmdDb21wYXJhdG9yIiwiYSIsImIiLCJhUHJpb3JpdHkiLCJiUHJpb3JpdHkiLCJidWlsZCIsImVsZW1lbnRzIiwic29ydCIsImJpbmRJbmZvcyIsImlkZW50aWZpZXIiLCJhdHRyIiwiYmluZEluZm8iLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLGdCQUFnQixDQUNwQixNQURvQixFQUVwQixLQUZvQixFQUdwQixPQUhvQixFQUlwQixTQUpvQixFQUtwQixNQUxvQixFQU1wQixTQU5vQixFQU9wQixRQVBvQixDQUF0Qjs7SUEwQ2FDLE87Ozs7OztxQ0FDTyxDOztxQ0FDSixFOzs7OztrQ0FFQUMsRyxFQUFVO0FBQ3RCLFVBQUksQ0FBQ0EsSUFBSUMsY0FBSixDQUFtQixNQUFuQixDQUFMLEVBQWlDO0FBQy9CLFlBQUlDLEtBQUssS0FBS0MsT0FBTCxFQUFUO0FBRUFDLGVBQU9DLGNBQVAsQ0FBc0JMLEdBQXRCLEVBQTJCLE1BQTNCLEVBQW1DO0FBQ2pDTSxpQkFBT0o7QUFEMEIsU0FBbkM7QUFHRDs7QUFFRCxVQUFJLENBQUMsS0FBS0ssT0FBTCxDQUFhUCxJQUFJUSxJQUFqQixDQUFMLEVBQTZCO0FBQzNCLGFBQUtELE9BQUwsQ0FBYVAsSUFBSVEsSUFBakIsSUFBeUI7QUFDdkJDLHFCQUFXO0FBRFksU0FBekI7QUFHRDs7QUFFRCxhQUFPLEtBQUtGLE9BQUwsQ0FBYVAsSUFBSVEsSUFBakIsQ0FBUDtBQUNEOzs7eUNBRW9CRSxHLEVBQVdSLEUsRUFBWTtBQUMxQyxVQUFJLENBQUNFLE9BQU9PLElBQVAsQ0FBWUQsSUFBSUQsU0FBaEIsRUFBMkJHLE1BQWhDLEVBQXdDO0FBQ3RDLFlBQUksRUFBRUYsSUFBSUcsUUFBSixJQUFnQlQsT0FBT08sSUFBUCxDQUFZRCxJQUFJRyxRQUFoQixFQUEwQkQsTUFBNUMsQ0FBSixFQUF5RDtBQUN2RCxpQkFBTyxLQUFLTCxPQUFMLENBQWFMLEVBQWIsQ0FBUDtBQUNEO0FBQ0Y7QUFDRjs7O2lDQUVZRixHLEVBQVVjLEUsRUFBWTtBQUNqQyxVQUFJQyxXQUFXZixJQUFJYyxFQUFKLENBQWY7QUFDQSxVQUFJRSxNQUFNLEtBQUtDLGFBQUwsQ0FBbUJqQixHQUFuQixDQUFWO0FBQ0EsVUFBSU8sVUFBVSxLQUFLQSxPQUFuQjs7QUFFQVAsVUFBSWMsRUFBSixJQUFVLFlBQXFDO0FBQUEsMENBQWpDSSxJQUFpQztBQUFqQ0EsY0FBaUM7QUFBQTs7QUFDN0MsWUFBSUMsV0FBV0osU0FBU0ssS0FBVCxDQUFlcEIsR0FBZixFQUFvQmtCLElBQXBCLENBQWY7QUFFQWQsZUFBT08sSUFBUCxDQUFZSyxJQUFJSCxRQUFoQixFQUEwQlEsT0FBMUIsQ0FBa0MsYUFBSztBQUNyQyxjQUFJQyxJQUFJTixJQUFJSCxRQUFKLENBQWFVLENBQWIsQ0FBUjs7QUFFQSxjQUFJaEIsUUFBUWdCLENBQVIsQ0FBSixFQUFnQjtBQUNkLGdCQUFJaEIsUUFBUWdCLENBQVIsRUFBV2QsU0FBWCxDQUFxQmEsQ0FBckIsYUFBbUNFLEtBQXZDLEVBQThDO0FBQzVDakIsc0JBQVFnQixDQUFSLEVBQVdkLFNBQVgsQ0FBcUJhLENBQXJCLEVBQXdCRCxPQUF4QixDQUFnQyxVQUFDSSxRQUFELEVBQXFDO0FBQ25FQSx5QkFBU0MsSUFBVDtBQUNELGVBRkQ7QUFHRDtBQUNGO0FBQ0YsU0FWRDtBQVlBLGVBQU9QLFFBQVA7QUFDRCxPQWhCRDtBQWlCRDs7O3FDQUVnQm5CLEcsRUFBVVUsRyxFQUFhaUIsTyxFQUFpQjtBQUFBOztBQUN2RCxVQUFJM0IsZUFBZXdCLEtBQW5CLEVBQTBCO0FBQ3hCLFlBQUlSLE1BQU0sS0FBS0MsYUFBTCxDQUFtQmpCLEdBQW5CLENBQVY7O0FBRUEsWUFBSSxDQUFDZ0IsSUFBSUgsUUFBVCxFQUFtQjtBQUNqQkcsY0FBSUgsUUFBSixHQUFlLEVBQWY7QUFFQWYsd0JBQWN1QixPQUFkLENBQXNCLGNBQU07QUFDMUIsa0JBQUtPLFlBQUwsQ0FBa0I1QixHQUFsQixFQUF1QmMsRUFBdkI7QUFDRCxXQUZEO0FBR0Q7O0FBRUQsWUFBSSxDQUFDRSxJQUFJSCxRQUFKLENBQWFILEdBQWIsQ0FBTCxFQUF3QjtBQUN0Qk0sY0FBSUgsUUFBSixDQUFhSCxHQUFiLElBQW9CLEVBQXBCO0FBQ0Q7O0FBRUQsWUFBSU0sSUFBSUgsUUFBSixDQUFhSCxHQUFiLEVBQWtCbUIsT0FBbEIsQ0FBMEJGLE9BQTFCLE1BQXVDLENBQUMsQ0FBNUMsRUFBK0M7QUFDN0NYLGNBQUlILFFBQUosQ0FBYUgsR0FBYixFQUFrQm9CLElBQWxCLENBQXVCSCxPQUF2QjtBQUNEO0FBQ0Y7QUFDRjs7O3VDQUVrQjNCLEcsRUFBZVUsRyxFQUFhaUIsTyxFQUFpQjtBQUM5RCxVQUFLM0IsZUFBZXdCLEtBQWhCLElBQTJCeEIsSUFBSVEsSUFBSixJQUFZLElBQTNDLEVBQWtEO0FBQ2hELFlBQUlRLE1BQU0sS0FBS1QsT0FBTCxDQUFhUCxJQUFJUSxJQUFqQixDQUFWOztBQUVBLFlBQUlRLEdBQUosRUFBUztBQUNQLGNBQUlILFlBQVdHLElBQUlILFFBQUosQ0FBYUgsR0FBYixDQUFmOztBQUVBLGNBQUlHLFNBQUosRUFBYztBQUNaLGdCQUFJa0IsTUFBTWxCLFVBQVNnQixPQUFULENBQWlCRixPQUFqQixDQUFWOztBQUVBLGdCQUFJSSxNQUFNLENBQUMsQ0FBWCxFQUFjO0FBQ1psQix3QkFBU21CLE1BQVQsQ0FBZ0JELEdBQWhCLEVBQXFCLENBQXJCO0FBQ0Q7O0FBRUQsZ0JBQUksQ0FBQ2xCLFVBQVNELE1BQWQsRUFBc0I7QUFDcEIscUJBQU9JLElBQUlILFFBQUosQ0FBYUgsR0FBYixDQUFQO0FBQ0Q7O0FBRUQsaUJBQUt1QixvQkFBTCxDQUEwQmpCLEdBQTFCLEVBQStCaEIsSUFBSVEsSUFBbkM7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7OzRCQUVPUixHLEVBQVUyQixPLEVBQWlCRixRLEVBQWlDO0FBQUE7O0FBQ2xFLFVBQUluQixLQUFKO0FBQ0EsVUFBSUcsWUFBWSxLQUFLUSxhQUFMLENBQW1CakIsR0FBbkIsRUFBd0JTLFNBQXhDOztBQUVBLFVBQUksQ0FBQ0EsVUFBVWtCLE9BQVYsQ0FBTCxFQUF5QjtBQUN2QmxCLGtCQUFVa0IsT0FBVixJQUFxQixFQUFyQjtBQUNBLFlBQUlPLE9BQU85QixPQUFPK0Isd0JBQVAsQ0FBZ0NuQyxHQUFoQyxFQUFxQzJCLE9BQXJDLENBQVg7O0FBRUEsWUFBSSxDQUFDTyxJQUFELElBQVMsRUFBRUEsS0FBS0UsR0FBTCxJQUFZRixLQUFLRyxHQUFqQixJQUF3QixDQUFDSCxLQUFLSSxZQUFoQyxDQUFiLEVBQTREO0FBQzFEaEMsa0JBQVFOLElBQUkyQixPQUFKLENBQVI7QUFFQXZCLGlCQUFPQyxjQUFQLENBQXNCTCxHQUF0QixFQUEyQjJCLE9BQTNCLEVBQW9DO0FBQ2xDWSx3QkFBWSxJQURzQjtBQUdsQ0gsaUJBQUssZUFBTTtBQUNULHFCQUFPOUIsS0FBUDtBQUNELGFBTGlDO0FBT2xDK0IsaUJBQUssdUJBQVk7QUFDZixrQkFBSUcsYUFBYWxDLEtBQWpCLEVBQXdCO0FBQ3RCLHVCQUFLbUMsa0JBQUwsQ0FBd0JuQyxLQUF4QixFQUErQk4sSUFBSVEsSUFBbkMsRUFBeUNtQixPQUF6Qzs7QUFDQXJCLHdCQUFRa0MsUUFBUjtBQUNBLG9CQUFJeEIsTUFBTSxPQUFLVCxPQUFMLENBQWFQLElBQUlRLElBQWpCLENBQVY7O0FBRUEsb0JBQUlRLEdBQUosRUFBUztBQUNQLHNCQUFJUCxhQUFZTyxJQUFJUCxTQUFKLENBQWNrQixPQUFkLENBQWhCOztBQUVBLHNCQUFJbEIsVUFBSixFQUFlO0FBQ2JBLCtCQUFVWSxPQUFWLENBQWtCLFVBQUNxQixFQUFELEVBQStCO0FBQy9DQSx5QkFBR2hCLElBQUg7QUFDRCxxQkFGRDtBQUdEOztBQUVELHlCQUFLaUIsZ0JBQUwsQ0FBc0JILFFBQXRCLEVBQWdDeEMsSUFBSVEsSUFBcEMsRUFBMENtQixPQUExQztBQUNEO0FBQ0Y7QUFDRjtBQXpCaUMsV0FBcEM7QUEyQkQ7QUFDRjs7QUFFRCxVQUFJbEIsVUFBVWtCLE9BQVYsRUFBbUJFLE9BQW5CLENBQTJCSixRQUEzQixNQUF5QyxDQUFDLENBQTlDLEVBQWlEO0FBQy9DaEIsa0JBQVVrQixPQUFWLEVBQW1CRyxJQUFuQixDQUF3QkwsUUFBeEI7QUFDRDs7QUFFRCxXQUFLa0IsZ0JBQUwsQ0FBc0IzQyxJQUFJMkIsT0FBSixDQUF0QixFQUFvQzNCLElBQUlRLElBQXhDLEVBQThDbUIsT0FBOUM7QUFDRDs7OzhCQUVTM0IsRyxFQUFVMkIsTyxFQUFpQkYsUSxFQUFpQztBQUNwRSxVQUFJVCxNQUFNLEtBQUtULE9BQUwsQ0FBYVAsSUFBSVEsSUFBakIsQ0FBVjs7QUFFQSxVQUFJUSxHQUFKLEVBQVM7QUFDUCxZQUFJUCxjQUFZTyxJQUFJUCxTQUFKLENBQWNrQixPQUFkLENBQWhCOztBQUVBLFlBQUlsQixXQUFKLEVBQWU7QUFDYixjQUFJc0IsTUFBTXRCLFlBQVVvQixPQUFWLENBQWtCSixRQUFsQixDQUFWOztBQUVBLGNBQUlNLE1BQU0sQ0FBQyxDQUFYLEVBQWM7QUFDWnRCLHdCQUFVdUIsTUFBVixDQUFpQkQsR0FBakIsRUFBc0IsQ0FBdEI7O0FBRUEsZ0JBQUksQ0FBQ3RCLFlBQVVHLE1BQWYsRUFBdUI7QUFDckIscUJBQU9JLElBQUlQLFNBQUosQ0FBY2tCLE9BQWQsQ0FBUDtBQUNBLG1CQUFLYyxrQkFBTCxDQUF3QnpDLElBQUkyQixPQUFKLENBQXhCLEVBQXNDM0IsSUFBSVEsSUFBMUMsRUFBZ0RtQixPQUFoRDtBQUNEO0FBQ0Y7O0FBRUQsZUFBS00sb0JBQUwsQ0FBMEJqQixHQUExQixFQUErQmhCLElBQUlRLElBQW5DO0FBQ0Q7QUFDRjtBQUNGOzs7d0JBRUdSLEcsRUFBVTJCLE8sRUFBaUI7QUFDN0IsYUFBTzNCLElBQUkyQixPQUFKLENBQVA7QUFDRDs7O3dCQUVHM0IsRyxFQUFVMkIsTyxFQUFpQnJCLEssRUFBWTtBQUN6Q04sVUFBSTJCLE9BQUosSUFBZXJCLEtBQWY7QUFDRDs7Ozs7OztBQUNGO0FBRUQsSUFBTXNDLFVBQVUsSUFBSTdDLE9BQUosRUFBaEIsQyxDQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0T0E7O0FBRUE7O0FBc0NBLElBQU04QyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsT0FBRCxFQUFtQkMsTUFBbkIsRUFBZ0NDLFFBQWhDLEVBQXdFO0FBQ3pGLE1BQUlDLFdBQVdILFFBQVFJLEVBQVIsQ0FBV0MsU0FBWCxDQUFxQixJQUFyQixDQUFmO0FBQ0EsTUFBSUMsT0FBTyxJQUFJQyxVQUFKLENBQVVKLFFBQVYsRUFBNkJGLE1BQTdCLEVBQXFDRCxRQUFRTSxJQUFSLENBQWFFLE9BQWxELENBQVg7QUFDQUYsT0FBS0csSUFBTDs7QUFDQSxNQUFHLENBQUNULE9BQUQsSUFBWSxDQUFDQSxRQUFRVSxNQUFyQixJQUErQlYsUUFBUVUsTUFBUixDQUFlQyxVQUFmLEtBQThCLElBQWhFLEVBQXNFO0FBQ3BFLFVBQU0sSUFBSUMsS0FBSixDQUFVLDZCQUFWLENBQU47QUFDRDs7QUFFRFosVUFBUVUsTUFBUixDQUFlQyxVQUFmLENBQTBCRSxZQUExQixDQUF1Q1YsUUFBdkMsRUFBaURELFFBQWpEO0FBRUEsU0FBT0ksSUFBUDtBQUNELENBWEQ7O0FBYUEsSUFBTVEsVUFBeUI7QUFDN0I7QUFDQSxVQUE2QjtBQUMzQkMsY0FBVSxJQURpQjtBQUUzQkMsY0FBVSxJQUZpQjtBQUkzQlAsUUFKMkIsZ0JBSXRCTCxFQUpzQixFQUlsQjtBQUNQLFVBQUcsQ0FBQyxLQUFLYSxVQUFULEVBQXFCO0FBQ25CLGFBQUtBLFVBQUwsR0FBa0I7QUFDaEJDLG1CQUFTO0FBRE8sU0FBbEI7QUFHRDtBQUNGLEtBVjBCO0FBWTNCQyxVQVoyQixrQkFZcEJmLEVBWm9CLEVBWUg7QUFDdEIsVUFBSSxLQUFLYSxVQUFMLENBQWdCQyxPQUFwQixFQUE2QjtBQUMzQixZQUFHLEtBQUs5QyxJQUFMLEtBQWMsSUFBakIsRUFBdUI7QUFDckIsZ0JBQU0sSUFBSXdDLEtBQUosQ0FBVSxjQUFWLENBQU47QUFDRDs7QUFDRFIsV0FBR2dCLG1CQUFILENBQXVCLEtBQUtoRCxJQUFMLENBQVUsQ0FBVixDQUF2QixFQUFxQyxLQUFLNkMsVUFBMUM7QUFDRDtBQUNGLEtBbkIwQjtBQXFCM0JJLFdBckIyQixtQkFxQm5CakIsRUFyQm1CLEVBcUJGNUM7QUFBVztBQXJCVCxNQXFCbUI7QUFDNUMsVUFBSSxLQUFLeUQsVUFBTCxDQUFnQkMsT0FBcEIsRUFBNkI7QUFDM0IsWUFBRyxLQUFLOUMsSUFBTCxLQUFjLElBQWpCLEVBQXVCO0FBQ3JCLGdCQUFNLElBQUl3QyxLQUFKLENBQVUsY0FBVixDQUFOO0FBQ0Q7O0FBQ0RSLFdBQUdnQixtQkFBSCxDQUF1QixLQUFLaEQsSUFBTCxDQUFVLENBQVYsQ0FBdkIsRUFBcUMsS0FBSzZDLFVBQUwsQ0FBZ0JDLE9BQXJEO0FBQ0Q7O0FBRUQsV0FBS0QsVUFBTCxDQUFnQkMsT0FBaEIsR0FBMEIsS0FBS0ksWUFBTCxDQUFrQjlELEtBQWxCLENBQTFCOztBQUNBLFVBQUcsS0FBS1ksSUFBTCxLQUFjLElBQWpCLEVBQXVCO0FBQ3JCLGNBQU0sSUFBSXdDLEtBQUosQ0FBVSxjQUFWLENBQU47QUFDRDs7QUFDRFIsU0FBR21CLGdCQUFILENBQW9CLEtBQUtuRCxJQUFMLENBQVUsQ0FBVixDQUFwQixFQUFrQyxLQUFLNkMsVUFBTCxDQUFnQkMsT0FBbEQ7QUFDRDtBQWxDMEIsR0FGQTtBQXVDN0I7QUFDQSxZQUErQjtBQUM3Qk0sV0FBTyxJQURzQjtBQUc3QlIsY0FBVSxJQUhtQjtBQUs3QlAsUUFMNkIsZ0JBS3hCTCxFQUx3QixFQUtQO0FBQ3BCLFVBQUksQ0FBQyxLQUFLTSxNQUFWLEVBQWtCO0FBQ2hCLGFBQUtBLE1BQUwsR0FBY2UsU0FBU0MsYUFBVCxzQkFBcUMsS0FBS0MsSUFBMUMsT0FBZDtBQUNBLGFBQUtWLFVBQUwsR0FBa0I7QUFDaEJXLG9CQUFtQjtBQURILFNBQWxCOztBQUdBLFlBQUcsQ0FBQ3hCLEdBQUdPLFVBQVAsRUFBbUI7QUFDakIsZ0JBQU0sSUFBSUMsS0FBSixDQUFVLGlCQUFWLENBQU47QUFDRDs7QUFDRFIsV0FBR08sVUFBSCxDQUFjRSxZQUFkLENBQTJCLEtBQUtILE1BQWhDLEVBQXdDTixFQUF4QztBQUNBQSxXQUFHTyxVQUFILENBQWNrQixXQUFkLENBQTBCekIsRUFBMUI7QUFDRCxPQVZELE1BVU87QUFDTCxhQUFLYSxVQUFMLENBQWdCVyxRQUFoQixDQUF5QnJELE9BQXpCLENBQWlDLFVBQUMrQixJQUFELEVBQWlCO0FBQ2hEQSxlQUFLRyxJQUFMO0FBQ0QsU0FGRDtBQUdEO0FBQ0YsS0FyQjRCO0FBdUI3QlUsVUF2QjZCLGtCQXVCdEJmLEVBdkJzQixFQXVCbEI7QUFDVCxVQUFJLEtBQUthLFVBQUwsQ0FBZ0JXLFFBQXBCLEVBQThCO0FBQzVCLGFBQUtYLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCckQsT0FBekIsQ0FBaUMsVUFBQytCLElBQUQsRUFBZ0I7QUFDL0NBLGVBQUthLE1BQUw7QUFDRCxTQUZEO0FBR0Q7QUFDRixLQTdCNEI7QUErQjdCRSxXQS9CNkIsbUJBK0JyQmpCLEVBL0JxQixFQStCakIwQixVQS9CaUIsRUErQkw7QUFBQTs7QUFDdEIsVUFBRyxLQUFLMUQsSUFBTCxLQUFjLElBQWpCLEVBQXVCO0FBQ3JCLGNBQU0sSUFBSXdDLEtBQUosQ0FBVSxjQUFWLENBQU47QUFDRDs7QUFDRCxVQUFJbUIsWUFBWSxLQUFLM0QsSUFBTCxDQUFVLENBQVYsQ0FBaEI7QUFDQTBELG1CQUFhQSxjQUFjLEVBQTNCLENBTHNCLENBT3RCOztBQUNBLFVBQUcsQ0FBQ3BELE1BQU1zRCxPQUFOLENBQWNGLFVBQWQsQ0FBSixFQUErQjtBQUM3QixjQUFNLElBQUlsQixLQUFKLENBQVUsVUFBVW1CLFNBQVYsR0FBc0IsNENBQWhDLENBQU47QUFDRCxPQVZxQixDQVl0Qjs7O0FBQ0EsVUFBSUUsWUFBWTdCLEdBQUc4QixZQUFILENBQWdCLGdCQUFoQixLQUFxQyxLQUFLQyxpQkFBTCxDQUF1QkosU0FBdkIsQ0FBckQ7QUFFQUQsaUJBQVd2RCxPQUFYLENBQW1CLFVBQUM2RCxLQUFELEVBQVFDLEtBQVIsRUFBa0I7QUFDbkMsWUFBSUMsUUFBYTtBQUFDQyxtQkFBUyxNQUFLakMsSUFBTCxDQUFVTDtBQUFwQixTQUFqQjtBQUNBcUMsY0FBTUwsU0FBTixJQUFtQkksS0FBbkI7QUFDQUMsY0FBTVAsU0FBTixJQUFtQkssS0FBbkI7QUFDQSxZQUFJOUIsT0FBTyxNQUFLVyxVQUFMLENBQWdCVyxRQUFoQixDQUF5QlMsS0FBekIsQ0FBWDs7QUFFQSxZQUFJLENBQUMvQixJQUFMLEVBQVc7QUFDVCxjQUFJa0MsUUFBSjs7QUFFQSxjQUFJLE1BQUt2QixVQUFMLENBQWdCVyxRQUFoQixDQUF5QjlELE1BQTdCLEVBQXFDO0FBQ25DMEUsdUJBQVcsTUFBS3ZCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCLE1BQUtYLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCOUQsTUFBekIsR0FBa0MsQ0FBM0QsRUFBOEQyRSxHQUE5RCxDQUFrRSxDQUFsRSxDQUFYO0FBQ0QsV0FGRCxNQUVPLElBQUcsTUFBSy9CLE1BQVIsRUFBZ0I7QUFDckI4Qix1QkFBVyxNQUFLOUIsTUFBaEI7QUFDRCxXQUZNLE1BRUE7QUFDTCxrQkFBTSxJQUFJRSxLQUFKLENBQVUsc0JBQVYsQ0FBTjtBQUNEOztBQUVETixpQkFBT1AsV0FBVyxLQUFYLEVBQWlCdUMsS0FBakIsRUFBd0JFLFNBQVNFLFdBQWpDLENBQVA7O0FBQ0EsZ0JBQUt6QixVQUFMLENBQWdCVyxRQUFoQixDQUF5QjVDLElBQXpCLENBQThCc0IsSUFBOUI7QUFDRCxTQWJELE1BYU87QUFDTCxjQUFJQSxLQUFLTCxNQUFMLENBQVk4QixTQUFaLE1BQTJCSyxLQUEvQixFQUFzQztBQUNwQztBQUNBLGdCQUFJTyxVQUFKLEVBQWdCQyxRQUFoQjs7QUFDQSxpQkFBSyxJQUFJQyxZQUFZUixRQUFRLENBQTdCLEVBQWdDUSxZQUFZLE1BQUs1QixVQUFMLENBQWdCVyxRQUFoQixDQUF5QjlELE1BQXJFLEVBQTZFK0UsV0FBN0UsRUFBMEY7QUFDeEZELHlCQUFXLE1BQUszQixVQUFMLENBQWdCVyxRQUFoQixDQUF5QmlCLFNBQXpCLENBQVg7O0FBQ0Esa0JBQUlELFNBQVMzQyxNQUFULENBQWdCOEIsU0FBaEIsTUFBK0JLLEtBQW5DLEVBQTBDO0FBQ3hDTyw2QkFBYUUsU0FBYjtBQUNBO0FBQ0Q7QUFDRjs7QUFDRCxnQkFBSUYsZUFBZUcsU0FBbkIsRUFBOEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0Esb0JBQUs3QixVQUFMLENBQWdCVyxRQUFoQixDQUF5QjFDLE1BQXpCLENBQWdDeUQsVUFBaEMsRUFBNEMsQ0FBNUM7O0FBQ0Esa0JBQUcsQ0FBQyxNQUFLakMsTUFBTixJQUFnQixDQUFDLE1BQUtBLE1BQUwsQ0FBWUMsVUFBaEMsRUFBNEM7QUFDMUMsc0JBQU0sSUFBSUMsS0FBSixDQUFVLDJCQUFWLENBQU47QUFDRDs7QUFDRCxvQkFBS0YsTUFBTCxDQUFZQyxVQUFaLENBQXVCRSxZQUF2QixDQUFvQytCLFNBQVNILEdBQVQsQ0FBYSxDQUFiLENBQXBDLEVBQXFEbkMsS0FBS21DLEdBQUwsQ0FBUyxDQUFULENBQXJEOztBQUNBRyx1QkFBUzNDLE1BQVQsQ0FBZ0JnQyxTQUFoQixJQUE2QkksS0FBN0I7QUFDRCxhQVZELE1BVU87QUFDTDtBQUNBTyx5QkFBVzdDLFdBQVcsS0FBWCxFQUFpQnVDLEtBQWpCLEVBQXdCaEMsS0FBS21DLEdBQUwsQ0FBUyxDQUFULENBQXhCLENBQVg7QUFDRDs7QUFDRCxrQkFBS3hCLFVBQUwsQ0FBZ0JXLFFBQWhCLENBQXlCMUMsTUFBekIsQ0FBZ0NtRCxLQUFoQyxFQUF1QyxDQUF2QyxFQUEwQ08sUUFBMUM7QUFDRCxXQXpCRCxNQXlCTztBQUNMdEMsaUJBQUtMLE1BQUwsQ0FBWWdDLFNBQVosSUFBeUJJLEtBQXpCO0FBQ0Q7QUFDRjtBQUNGLE9BakREOztBQW1EQSxVQUFJLEtBQUtwQixVQUFMLENBQWdCVyxRQUFoQixDQUF5QjlELE1BQXpCLEdBQWtDZ0UsV0FBV2hFLE1BQWpELEVBQXlEO0FBQ3ZELDBCQUFNLEtBQUttRCxVQUFMLENBQWdCVyxRQUFoQixDQUF5QjlELE1BQXpCLEdBQWtDZ0UsV0FBV2hFLE1BQW5ELEVBQTJELFlBQU07QUFDL0QsY0FBSXdDLE9BQU8sTUFBS1csVUFBTCxDQUFnQlcsUUFBaEIsQ0FBeUJtQixHQUF6QixFQUFYOztBQUNBekMsZUFBS2EsTUFBTDs7QUFDQSxjQUFHLENBQUMsTUFBS1QsTUFBTixJQUFnQixDQUFDLE1BQUtBLE1BQUwsQ0FBWUMsVUFBaEMsRUFBNEM7QUFDMUMsa0JBQU0sSUFBSUMsS0FBSixDQUFVLDJCQUFWLENBQU47QUFDRDs7QUFDRCxnQkFBS0YsTUFBTCxDQUFZQyxVQUFaLENBQXVCa0IsV0FBdkIsQ0FBbUN2QixLQUFLbUMsR0FBTCxDQUFTLENBQVQsQ0FBbkM7QUFDRCxTQVBEO0FBUUQ7O0FBRUQsVUFBSXJDLEdBQUc0QyxRQUFILEtBQWdCLFFBQWhCLElBQTRCLEtBQUsxQyxJQUFMLENBQVUyQyxRQUExQyxFQUFvRDtBQUNsRCxhQUFLM0MsSUFBTCxDQUFVMkMsUUFBVixDQUFtQjFFLE9BQW5CLENBQTJCLFVBQUN5QixPQUFELEVBQXNCO0FBQy9DLGNBQUksTUFBS1UsTUFBTCxJQUFnQlYsUUFBUUksRUFBUixLQUFlLE1BQUtNLE1BQUwsQ0FBWUMsVUFBM0MsSUFBMkRYLFFBQVEyQixJQUFSLEtBQWlCLE9BQWhGLEVBQTBGO0FBQ3hGM0Isb0JBQVFwQixJQUFSO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7QUFDRixLQW5INEI7QUFxSDdCc0UsVUFySDZCLGtCQXFIdEJqRCxNQXJIc0IsRUFxSGQ7QUFBQTs7QUFDYixVQUFJa0QsT0FBWSxFQUFoQixDQURhLENBR2I7O0FBRUE3RixhQUFPTyxJQUFQLENBQVlvQyxNQUFaLEVBQW9CMUIsT0FBcEIsQ0FBNEIsZUFBTztBQUNqQyxZQUFHLE9BQUtILElBQUwsS0FBYyxJQUFqQixFQUF1QjtBQUNyQixnQkFBTSxJQUFJd0MsS0FBSixDQUFVLGNBQVYsQ0FBTjtBQUNEOztBQUNELFlBQUl3QyxRQUFRLE9BQUtoRixJQUFMLENBQVUsQ0FBVixDQUFaLEVBQTBCO0FBQ3hCK0UsZUFBS0MsR0FBTCxJQUFZbkQsT0FBT21ELEdBQVAsQ0FBWjtBQUNEO0FBQ0YsT0FQRDtBQVNBLFdBQUtuQyxVQUFMLENBQWdCVyxRQUFoQixDQUF5QnJELE9BQXpCLENBQWlDLFVBQUMrQixJQUFELEVBQWdCO0FBQy9DQSxhQUFLNEMsTUFBTCxDQUFZQyxJQUFaO0FBQ0QsT0FGRDtBQUdEO0FBdEk0QixHQXhDRjtBQWlMN0I7QUFDQSxhQUFvQyxVQUFTL0MsRUFBVCxFQUEwQjVDLEtBQTFCLEVBQTBDO0FBQzVFLFFBQUk2RixxQkFBY2pELEdBQUdrRCxTQUFqQixNQUFKOztBQUNBLFFBQUcsS0FBS2xGLElBQUwsS0FBYyxJQUFqQixFQUF1QjtBQUNyQixZQUFNLElBQUl3QyxLQUFKLENBQVUsY0FBVixDQUFOO0FBQ0Q7O0FBQ0QsUUFBSXBELFVBQVc2RixRQUFRdEUsT0FBUixZQUFvQixLQUFLWCxJQUFMLENBQVUsQ0FBVixDQUFwQixVQUF1QyxDQUFDLENBQXZELEVBQTJEO0FBQ3pELFVBQUlaLEtBQUosRUFBVztBQUNUNEMsV0FBR2tELFNBQUgsYUFBa0JsRCxHQUFHa0QsU0FBckIsY0FBa0MsS0FBS2xGLElBQUwsQ0FBVSxDQUFWLENBQWxDO0FBQ0QsT0FGRCxNQUVPO0FBQ0xnQyxXQUFHa0QsU0FBSCxHQUFlRCxRQUFRRSxPQUFSLFlBQW9CLEtBQUtuRixJQUFMLENBQVUsQ0FBVixDQUFwQixRQUFxQyxHQUFyQyxFQUEwQ29GLElBQTFDLEVBQWY7QUFDRDtBQUNGO0FBQ0YsR0E5TDRCO0FBZ003QjtBQUNBQyxRQUE4QixVQUFTckQsRUFBVCxFQUEwQjVDLEtBQTFCLEVBQXlDO0FBQ3JFNEMsT0FBR3NELFdBQUgsR0FBaUJsRyxTQUFTLElBQVQsR0FBZ0JBLEtBQWhCLEdBQXdCLEVBQXpDO0FBQ0QsR0FuTTRCO0FBcU03QjtBQUNBbUcsUUFBOEIsVUFBU3ZELEVBQVQsRUFBMEI1QyxLQUExQixFQUF5QztBQUNyRTRDLE9BQUd3RCxTQUFILEdBQWVwRyxTQUFTLElBQVQsR0FBZ0JBLEtBQWhCLEdBQXdCLEVBQXZDO0FBQ0QsR0F4TTRCO0FBME03QjtBQUNBcUcsUUFBK0IsVUFBU3pELEVBQVQsRUFBMEI1QyxLQUExQixFQUEwQztBQUN2RTRDLE9BQUcwRCxLQUFILENBQVNDLE9BQVQsR0FBbUJ2RyxRQUFRLEVBQVIsR0FBYSxNQUFoQztBQUNELEdBN000QjtBQStNN0I7QUFDQXdHLFFBQStCLFVBQVM1RCxFQUFULEVBQTBCNUMsS0FBMUIsRUFBMEM7QUFDdkU0QyxPQUFHMEQsS0FBSCxDQUFTQyxPQUFULEdBQW1CdkcsUUFBUSxNQUFSLEdBQWlCLEVBQXBDO0FBQ0QsR0FsTjRCO0FBb043QjtBQUNBeUcsV0FBa0MsVUFBUzdELEVBQVQsRUFBZ0M1QyxLQUFoQyxFQUFnRDtBQUNoRjRDLE9BQUc4RCxRQUFILEdBQWMsQ0FBQzFHLEtBQWY7QUFDRCxHQXZONEI7QUF5TjdCO0FBQ0EwRyxZQUFtQyxVQUFTOUQsRUFBVCxFQUFnQzVDLEtBQWhDLEVBQWdEO0FBQ2pGNEMsT0FBRzhELFFBQUgsR0FBYyxDQUFDLENBQUMxRyxLQUFoQjtBQUNELEdBNU40QjtBQThON0I7QUFDQTtBQUNBMkcsV0FBOEI7QUFDNUJDLGVBQVcsSUFEaUI7QUFFNUJwRCxjQUFVLElBRmtCO0FBSTVCUCxVQUFNLGNBQVNMLEVBQVQsRUFBYTtBQUNqQixVQUFJaUUsT0FBTyxJQUFYO0FBQ0EsV0FBS3BELFVBQUwsR0FBa0IsRUFBbEI7O0FBQ0EsVUFBSSxDQUFDLEtBQUtBLFVBQUwsQ0FBZ0J0QyxRQUFyQixFQUErQjtBQUM3QixhQUFLc0MsVUFBTCxDQUFnQnRDLFFBQWhCLEdBQTJCLFlBQVk7QUFDckMwRixlQUFLQyxPQUFMO0FBQ0QsU0FGRDtBQUdEOztBQUNEbEUsU0FBR21CLGdCQUFILENBQW9CLFFBQXBCLEVBQThCLEtBQUtOLFVBQUwsQ0FBZ0J0QyxRQUE5QztBQUNELEtBYjJCO0FBZTVCd0MsWUFBUSxnQkFBU2YsRUFBVCxFQUFhO0FBQ25CQSxTQUFHZ0IsbUJBQUgsQ0FBdUIsUUFBdkIsRUFBaUMsS0FBS0gsVUFBTCxDQUFnQnRDLFFBQWpEO0FBQ0QsS0FqQjJCO0FBbUI1QjBDLFdBbkI0QixtQkFtQnBCakIsRUFuQm9CLEVBbUJHNUMsS0FuQkgsRUFtQlU7QUFDcEMsVUFBSTRDLEdBQUd1QixJQUFILEtBQVksT0FBaEIsRUFBeUI7QUFDdkJ2QixXQUFHK0QsT0FBSCxHQUFhLHNCQUFVL0QsR0FBRzVDLEtBQWIsTUFBd0Isc0JBQVVBLEtBQVYsQ0FBckM7QUFDRCxPQUZELE1BRU87QUFDTDRDLFdBQUcrRCxPQUFILEdBQWEsQ0FBQyxDQUFDM0csS0FBZjtBQUNEO0FBQ0Y7QUF6QjJCLEdBaE9EO0FBNFA3QjtBQUNBO0FBQ0FBLFNBQTRCO0FBQzFCNEcsZUFBVyxJQURlO0FBRTFCcEQsY0FBVSxJQUZnQjtBQUkxQlAsUUFKMEIsZ0JBSXJCTCxFQUpxQixFQUlDO0FBQ3pCLFdBQUthLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxXQUFLQSxVQUFMLENBQWdCc0QsT0FBaEIsR0FBMEJuRSxHQUFHb0UsT0FBSCxLQUFlLE9BQWYsSUFBMEJwRSxHQUFHdUIsSUFBSCxLQUFZLE9BQWhFOztBQUNBLFVBQUksQ0FBQyxLQUFLVixVQUFMLENBQWdCc0QsT0FBckIsRUFBOEI7QUFDNUIsYUFBS3RELFVBQUwsQ0FBZ0J3RCxLQUFoQixHQUF3QnJFLEdBQUc4QixZQUFILENBQWdCLFlBQWhCLE1BQWtDOUIsR0FBR29FLE9BQUgsS0FBZSxRQUFmLEdBQTBCLFFBQTFCLEdBQXFDLE9BQXZFLENBQXhCO0FBRUEsWUFBSUgsT0FBTyxJQUFYOztBQUNBLFlBQUksQ0FBQyxLQUFLcEQsVUFBTCxDQUFnQnRDLFFBQXJCLEVBQStCO0FBQzdCLGVBQUtzQyxVQUFMLENBQWdCdEMsUUFBaEIsR0FBMkIsWUFBWTtBQUNyQzBGLGlCQUFLQyxPQUFMO0FBQ0QsV0FGRDtBQUdEOztBQUVEbEUsV0FBR21CLGdCQUFILENBQW9CLEtBQUtOLFVBQUwsQ0FBZ0J3RCxLQUFwQyxFQUEyQyxLQUFLeEQsVUFBTCxDQUFnQnRDLFFBQTNEO0FBQ0Q7QUFDRixLQW5CeUI7QUFxQjFCd0MsVUFyQjBCLGtCQXFCbkJmLEVBckJtQixFQXFCZjtBQUNULFVBQUksQ0FBQyxLQUFLYSxVQUFMLENBQWdCc0QsT0FBckIsRUFBOEI7QUFDNUJuRSxXQUFHZ0IsbUJBQUgsQ0FBdUIsS0FBS0gsVUFBTCxDQUFnQndELEtBQXZDLEVBQThDLEtBQUt4RCxVQUFMLENBQWdCdEMsUUFBOUQ7QUFDRDtBQUNGLEtBekJ5QjtBQTJCMUIwQyxXQTNCMEIsbUJBMkJsQmpCLEVBM0JrQixFQTJCd0I1QyxLQTNCeEIsRUEyQitCO0FBQ3ZELFVBQUksS0FBS3lELFVBQUwsSUFBbUIsS0FBS0EsVUFBTCxDQUFnQnNELE9BQXZDLEVBQWdEO0FBQzlDbkUsV0FBR3NFLFlBQUgsQ0FBZ0IsT0FBaEIsRUFBeUJsSCxLQUF6QjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUk0QyxHQUFHdUIsSUFBSCxLQUFZLGlCQUFaLElBQWlDdkIsY0FBY3VFLGlCQUFuRCxFQUFzRTtBQUNwRSxjQUFJbkgsaUJBQWlCa0IsS0FBckIsRUFBNEI7QUFDMUIsaUJBQUssSUFBSWtHLElBQUksQ0FBYixFQUFnQkEsSUFBSXhFLEdBQUd0QyxNQUF2QixFQUErQjhHLEdBQS9CLEVBQW9DO0FBQ2xDLGtCQUFJQyxTQUFTekUsR0FBR3dFLENBQUgsQ0FBYjtBQUNBQyxxQkFBT0MsUUFBUCxHQUFrQnRILE1BQU11QixPQUFOLENBQWM4RixPQUFPckgsS0FBckIsSUFBOEIsQ0FBQyxDQUFqRDtBQUNEO0FBQ0Y7QUFDRixTQVBELE1BT08sSUFBSSxzQkFBVUEsS0FBVixNQUFxQixzQkFBVTRDLEdBQUc1QyxLQUFiLENBQXpCLEVBQThDO0FBQ25ENEMsYUFBRzVDLEtBQUgsR0FBV0EsU0FBUyxJQUFULEdBQWdCQSxLQUFoQixHQUF3QixFQUFuQztBQUNEO0FBQ0Y7QUFDRjtBQTFDeUIsR0E5UEM7QUEyUzdCO0FBQ0F1SCxNQUF5QjtBQUN2QnZELFdBQU8sSUFEZ0I7QUFFdkJSLGNBQVUsSUFGYTtBQUl2QlAsUUFKdUIsZ0JBSWxCTCxFQUprQixFQUlNO0FBQzNCLFdBQUthLFVBQUwsR0FBa0IsRUFBbEI7O0FBQ0EsVUFBSSxDQUFDLEtBQUtQLE1BQVYsRUFBa0I7QUFDaEIsYUFBS0EsTUFBTCxHQUFjZSxTQUFTQyxhQUFULENBQXVCLGdCQUFnQixLQUFLQyxJQUFyQixHQUE0QixHQUE1QixHQUFrQyxLQUFLOUMsT0FBdkMsR0FBaUQsR0FBeEUsQ0FBZDtBQUNBLGFBQUtvQyxVQUFMLENBQWdCK0QsUUFBaEIsR0FBMkIsS0FBM0I7O0FBQ0EsWUFBRyxDQUFDNUUsR0FBR08sVUFBUCxFQUFtQjtBQUNqQixnQkFBTSxJQUFJQyxLQUFKLENBQVUsNEJBQVYsQ0FBTjtBQUNEOztBQUNEUixXQUFHTyxVQUFILENBQWNFLFlBQWQsQ0FBMkIsS0FBS0gsTUFBaEMsRUFBd0NOLEVBQXhDO0FBQ0FBLFdBQUdPLFVBQUgsQ0FBY2tCLFdBQWQsQ0FBMEJ6QixFQUExQjtBQUNELE9BUkQsTUFRTyxJQUFLLEtBQUthLFVBQUwsQ0FBZ0JnRSxLQUFoQixLQUEwQixLQUExQixJQUFvQyxLQUFLaEUsVUFBTCxDQUFnQmlFLE1BQXpELEVBQWlFO0FBQ3JFLGFBQUtqRSxVQUFMLENBQWdCaUUsTUFBaEIsQ0FBdUJ6RSxJQUF2QjtBQUNGOztBQUNBLFdBQUtRLFVBQUwsQ0FBZ0JnRSxLQUFoQixHQUF3QixJQUF4QjtBQUNGLEtBbEJzQjtBQW9CdkI5RCxVQXBCdUIsb0JBb0JkO0FBQ1AsVUFBSyxLQUFLRixVQUFMLENBQWdCaUUsTUFBckIsRUFBNkI7QUFDMUIsYUFBS2pFLFVBQUwsQ0FBZ0JpRSxNQUFoQixDQUF1Qi9ELE1BQXZCO0FBQ0EsYUFBS0YsVUFBTCxDQUFnQmdFLEtBQWhCLEdBQXdCLEtBQXhCO0FBQ0Y7QUFDRixLQXpCc0I7QUEyQnZCNUQsV0EzQnVCLG1CQTJCZmpCLEVBM0JlLEVBMkJFNUMsS0EzQkYsRUEyQmtCO0FBQ3ZDQSxjQUFRLENBQUMsQ0FBQ0EsS0FBVjs7QUFDQSxVQUFJQSxVQUFVLEtBQUt5RCxVQUFMLENBQWdCK0QsUUFBOUIsRUFBd0M7QUFDdEMsWUFBSXhILEtBQUosRUFBVztBQUVULGNBQUksQ0FBRSxLQUFLeUQsVUFBTCxDQUFnQmlFLE1BQXRCLEVBQThCO0FBQzNCLGlCQUFLakUsVUFBTCxDQUFnQmlFLE1BQWhCLEdBQXlCLElBQUkzRSxVQUFKLENBQVNILEVBQVQsRUFBYSxLQUFLRSxJQUFMLENBQVVMLE1BQXZCLEVBQStCLEtBQUtLLElBQUwsQ0FBVUUsT0FBekMsQ0FBekI7QUFDQSxpQkFBS1MsVUFBTCxDQUFnQmlFLE1BQWhCLENBQXVCekUsSUFBdkI7QUFDRjs7QUFDRCxjQUFHLENBQUMsS0FBS0MsTUFBTixJQUFnQixDQUFDLEtBQUtBLE1BQUwsQ0FBWUMsVUFBaEMsRUFBNEM7QUFDMUMsa0JBQU0sSUFBSUMsS0FBSixDQUFVLDJCQUFWLENBQU47QUFDRDs7QUFDRCxlQUFLRixNQUFMLENBQVlDLFVBQVosQ0FBdUJFLFlBQXZCLENBQW9DVCxFQUFwQyxFQUF3QyxLQUFLTSxNQUFMLENBQVlnQyxXQUFwRDtBQUNBLGVBQUt6QixVQUFMLENBQWdCK0QsUUFBaEIsR0FBMkIsSUFBM0I7QUFDRCxTQVhELE1BV087QUFDTCxjQUFHLENBQUM1RSxHQUFHTyxVQUFQLEVBQW1CO0FBQ2pCLGtCQUFNLElBQUlDLEtBQUosQ0FBVSw0QkFBVixDQUFOO0FBQ0Q7O0FBQ0RSLGFBQUdPLFVBQUgsQ0FBY2tCLFdBQWQsQ0FBMEJ6QixFQUExQjtBQUNBLGVBQUthLFVBQUwsQ0FBZ0IrRCxRQUFoQixHQUEyQixLQUEzQjtBQUNEO0FBQ0Y7QUFDRixLQWpEc0I7QUFtRHZCOUIsVUFuRHVCLGtCQW1EaEJqRCxNQW5EZ0IsRUFtRFI7QUFDYixVQUFLLEtBQUtnQixVQUFMLENBQWdCaUUsTUFBckIsRUFBNkI7QUFDMUIsYUFBS2pFLFVBQUwsQ0FBZ0JpRSxNQUFoQixDQUF1QmhDLE1BQXZCLENBQThCakQsTUFBOUI7QUFDRjtBQUNGO0FBdkRzQjtBQTVTSSxDQUEvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyREE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlBOzs7O0FBSUEsU0FBU2tGLGFBQVQsQ0FBdUIvRSxFQUF2QixFQUFpRTtBQUMvRCxNQUFJZ0YsVUFBb0IsRUFBeEI7O0FBQ0EsTUFBSWhGLEdBQUd1QixJQUFILEtBQVksVUFBaEIsRUFBNEI7QUFDMUIsV0FBUXZCLEVBQUQsQ0FBeUIrRCxPQUFoQztBQUNELEdBRkQsTUFFTyxJQUFJL0QsR0FBR3VCLElBQUgsS0FBWSxpQkFBaEIsRUFBbUM7QUFDeEMsUUFBSW5CLFVBQWlDSixFQUFELENBQTBCSSxPQUE5RDs7QUFFQSxTQUFLLElBQU00QyxJQUFYLElBQWtCNUMsT0FBbEIsRUFBMkI7QUFDekIsVUFBSUEsUUFBUXJELGNBQVIsQ0FBdUJpRyxJQUF2QixDQUFKLEVBQWlDO0FBQy9CLFlBQU15QixTQUFTckUsUUFBUTRDLElBQVIsQ0FBZjs7QUFDQSxZQUFJeUIsT0FBT0MsUUFBWCxFQUFxQjtBQUNuQk0sa0JBQVFwRyxJQUFSLENBQWE2RixPQUFPckgsS0FBcEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBTzRILE9BQVA7QUFDRCxHQWJNLE1BYUE7QUFDTCxXQUFPaEYsR0FBRzVDLEtBQVY7QUFDRDtBQUNGOztBQUVNLElBQU02SCxpQkFBa0IsNENBQXhCOztBQUNBLElBQU1DLGtCQUFrQixLQUF4QjtBQUVQOzs7Ozs7SUFHYUMsTzs7O0FBS1g7Ozs7QUFRQTs7OztBQUlBOzs7O0FBSUE7Ozs7QUFJQTs7OztBQUlBOzs7O0FBS0E7Ozs7Ozs7Ozs7OztBQVlBLG1CQUFZakYsSUFBWixFQUF3QkYsRUFBeEIsRUFBeUN1QixJQUF6QyxFQUE4RDlDLE9BQTlELEVBQXNGMkcsTUFBdEYsRUFBa0hwSCxJQUFsSCxFQUF5SXFILFVBQXpJLEVBQXNLO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQ3BLLFNBQUtuRixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRixFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLdUIsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBSzlDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUsyRyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLcEgsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS3FILFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEIsRUFBMUI7QUFDQSxTQUFLdEQsS0FBTCxHQUFhVSxTQUFiO0FBQ0EsU0FBSzdCLFVBQUwsR0FBa0IsRUFBbEI7QUFFRDtBQUVEOzs7Ozs7Ozs7NEJBS1EvRCxHLEVBQVUyQixPLEVBQWlCRixRLEVBQTRDO0FBQzdFLFVBQUdBLFFBQUgsRUFBYTtBQUNYLGVBQU8sSUFBSWdILGtCQUFKLENBQWF6SSxHQUFiLEVBQWtCMkIsT0FBbEIsRUFBMkJGLFFBQTNCLENBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLElBQUlnSCxrQkFBSixDQUFhekksR0FBYixFQUFrQjJCLE9BQWxCLEVBQTJCLElBQTNCLENBQVA7QUFDRDtBQUVGOzs7a0NBRWE7QUFDWixVQUFJLEtBQUtBLE9BQVQsRUFBa0I7QUFDaEIsWUFBSStHLFFBQVEsd0JBQVUsS0FBSy9HLE9BQWYsQ0FBWjs7QUFDQSxZQUFJK0csTUFBTWpFLElBQU4sS0FBZWtFLGtCQUFuQixFQUE4QjtBQUM1QixlQUFLckksS0FBTCxHQUFhb0ksTUFBTXBJLEtBQW5CO0FBQ0QsU0FGRCxNQUVPLElBQUdvSSxNQUFNakUsSUFBTixLQUFlbUUsZ0JBQWxCLEVBQTBCO0FBQy9CLGVBQUtDLFFBQUwsR0FBZ0IsS0FBS0MsT0FBTCxDQUFhLEtBQUsxRixJQUFMLENBQVVMLE1BQXZCLEVBQStCLEtBQUtwQixPQUFwQyxDQUFoQjtBQUNBLGVBQUt1RCxLQUFMLEdBQWEsS0FBSzJELFFBQUwsQ0FBY0UsTUFBM0I7QUFDRCxTQUhNLE1BR0E7QUFDTCxnQkFBTSxJQUFJckYsS0FBSixDQUFVLHVCQUFWLENBQU47QUFDRDtBQUNGLE9BVkQsTUFVTztBQUNMLGFBQUtwRCxLQUFMLEdBQWFzRixTQUFiO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Ozs7c0NBTWtCZixTLEVBQW1CO0FBQ25DLGFBQU8sTUFBTUEsU0FBTixHQUFrQixHQUF6QjtBQUNEOzs7NENBRXVCM0QsSSxFQUFnQjhILGMsRUFBa0M7QUFBQTs7QUFDeEUsYUFBTzlILEtBQ05GLEdBRE0sQ0FDRmlJLGtCQURFLEVBRU5qSSxHQUZNLENBRUYsZ0JBQWdCa0ksRUFBaEIsRUFBdUI7QUFBQSxZQUFyQnpFLElBQXFCLFFBQXJCQSxJQUFxQjtBQUFBLFlBQWZuRSxLQUFlLFFBQWZBLEtBQWU7O0FBQzFCLFlBQUltRSxTQUFTa0Usa0JBQWIsRUFBd0I7QUFDdEIsY0FBTVEsaUJBQWlCN0ksS0FBdkI7QUFDQSxpQkFBTzZJLGNBQVA7QUFDRCxTQUhELE1BR08sSUFBSTFFLFNBQVNtRSxnQkFBYixFQUFzQjtBQUMzQjtBQUNBLGNBQU1qSCxVQUFXckIsS0FBakI7O0FBQ0EsY0FBSSxDQUFDLE1BQUtrSSxrQkFBTCxDQUF3QlEsY0FBeEIsQ0FBTCxFQUE4QztBQUM1QyxrQkFBS1Isa0JBQUwsQ0FBd0JRLGNBQXhCLElBQTBDLEVBQTFDO0FBQ0Q7O0FBRUQsY0FBSUgsV0FBVyxNQUFLTCxrQkFBTCxDQUF3QlEsY0FBeEIsRUFBd0NFLEVBQXhDLENBQWY7O0FBRUEsY0FBSSxDQUFDTCxRQUFMLEVBQWU7QUFDYkEsdUJBQVcsTUFBS0MsT0FBTCxDQUFhLE1BQUsxRixJQUFMLENBQVVMLE1BQXZCLEVBQStCcEIsT0FBL0IsQ0FBWDtBQUNBLGtCQUFLNkcsa0JBQUwsQ0FBd0JRLGNBQXhCLEVBQXdDRSxFQUF4QyxJQUE4Q0wsUUFBOUM7QUFDRDs7QUFDRCxpQkFBT0EsU0FBU3ZJLEtBQVQsRUFBUDtBQUNELFNBZE0sTUFjQTtBQUNMLGdCQUFNLElBQUlvRCxLQUFKLENBQVUsdUJBQVYsQ0FBTjtBQUNEO0FBQ0YsT0F2Qk0sQ0FBUDtBQXdCRDtBQUVEOzs7Ozs7O21DQUllcEQsSyxFQUFZO0FBQUE7O0FBQ3pCLFVBQUcsS0FBS2lJLFVBQUwsS0FBb0IsSUFBdkIsRUFBNkI7QUFDM0IsY0FBTSxJQUFJN0UsS0FBSixDQUFVLG9CQUFWLENBQU47QUFDRDs7QUFDRCxhQUFPLEtBQUs2RSxVQUFMLENBQWdCYSxNQUFoQixDQUF1QixVQUFDQyxNQUFELEVBQTRCQyxXQUE1QixFQUFnRW5FLEtBQWhFLEVBQWtGO0FBQzlHLFlBQUlqRSxPQUFPb0ksWUFBWUMsS0FBWixDQUFrQnBCLGNBQWxCLENBQVg7O0FBQ0EsWUFBR2pILFNBQVMsSUFBWixFQUFrQjtBQUNoQixnQkFBTSxJQUFJd0MsS0FBSixDQUFVLHFDQUFWLENBQU47QUFDRDs7QUFDRCxZQUFJeEQsS0FBS2dCLEtBQUtzSSxLQUFMLEVBQVQ7O0FBQ0EsWUFBRyxDQUFDdEosRUFBSixFQUFRO0FBQ04sZ0JBQU0sSUFBSXdELEtBQUosQ0FBVSxxQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsWUFBSStGLFlBQVksT0FBS3JHLElBQUwsQ0FBVUUsT0FBVixDQUFrQmlGLFVBQWxCLENBQTZCckksRUFBN0IsQ0FBaEI7O0FBRUEsWUFBTXdKLGdCQUFnQixPQUFLQyx1QkFBTCxDQUE2QnpJLElBQTdCLEVBQW1DaUUsS0FBbkMsQ0FBdEI7O0FBRUEsWUFBSXNFLGFBQWNBLFVBQVVHLElBQVYsWUFBMEJDLFFBQTVDLEVBQXVEO0FBQ3JEUixtQkFBU0ksVUFBVUcsSUFBVixtQkFBZVAsTUFBZiw0QkFBMEJLLGFBQTFCLEdBQVQ7QUFDRCxTQUZELE1BRU8sSUFBSUQscUJBQXFCSSxRQUF6QixFQUFtQztBQUN4Q1IsbUJBQVNJLHlCQUFVSixNQUFWLDRCQUFxQkssYUFBckIsR0FBVDtBQUNEOztBQUNELGVBQU9MLE1BQVA7QUFDRCxPQW5CTSxFQW1CSi9JLEtBbkJJLENBQVA7QUFvQkQ7QUFFRDs7Ozs7O2lDQUdhUSxFLEVBQThDO0FBQUE7O0FBQ3pELFVBQUlnQyxVQUFVLElBQWQ7QUFDQSxVQUFJa0IsVUFBVWxCLFFBQVFNLElBQVIsQ0FBYUUsT0FBYixDQUFxQlUsT0FBbkM7QUFFQSxhQUFPLFVBQUM4RixFQUFELEVBQVE7QUFDYixZQUFHLENBQUM5RixPQUFKLEVBQWE7QUFDWCxnQkFBTSxJQUFJTixLQUFKLENBQVUsb0RBQVYsQ0FBTjtBQUNEOztBQUNETSxnQkFBUStGLElBQVIsQ0FBYWpKLEVBQWIsRUFBaUIsTUFBakIsRUFBdUJnSixFQUF2QixFQUEyQmhILE9BQTNCO0FBQ0QsT0FMRDtBQU1EO0FBRUQ7Ozs7Ozs7d0JBSUl4QyxLLEVBQVk7QUFDZCxVQUFLQSxpQkFBaUJ1SixRQUFsQixJQUErQixDQUFFLEtBQUt2QixNQUFOLENBQXFDekUsUUFBekUsRUFBbUY7QUFDakZ2RCxnQkFBU0EsS0FBVDtBQUNBQSxnQkFBUSxLQUFLMEosY0FBTCxDQUFvQjFKLE1BQU15SixJQUFOLENBQVcsS0FBSzdFLEtBQWhCLENBQXBCLENBQVI7QUFDRCxPQUhELE1BR087QUFDTDVFLGdCQUFTQSxLQUFUO0FBQ0FBLGdCQUFRLEtBQUswSixjQUFMLENBQW9CMUosS0FBcEIsQ0FBUjtBQUNEOztBQUVELFVBQUkySixTQUFKOztBQUNBLFVBQUcsS0FBSzNCLE1BQUwsS0FBZ0IsSUFBbkIsRUFBeUI7QUFDdkIsY0FBTSxJQUFJNUUsS0FBSixDQUFVLGdCQUFWLENBQU47QUFDRDs7QUFDRCxVQUFHLEtBQUs0RSxNQUFMLENBQVlySSxjQUFaLENBQTJCLFNBQTNCLENBQUgsRUFBMEM7QUFDeEMsYUFBS3FJLE1BQUwsR0FBZ0IsS0FBS0EsTUFBckI7QUFDQTJCLG9CQUFZLEtBQUszQixNQUFMLENBQVluRSxPQUF4QjtBQUNELE9BSEQsTUFHTztBQUNMLGFBQUttRSxNQUFMLEdBQWdCLEtBQUtBLE1BQXJCO0FBQ0EyQixvQkFBWSxLQUFLM0IsTUFBakI7QUFDRDs7QUFFRCxVQUFJMkIscUJBQXFCSixRQUF6QixFQUFtQztBQUNqQ0ksa0JBQVVGLElBQVYsQ0FBZSxJQUFmLEVBQXFCLEtBQUs3RyxFQUExQixFQUE4QjVDLEtBQTlCO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7MkJBR087QUFDTCxVQUFJLEtBQUt1SSxRQUFULEVBQW1CO0FBQ2pCLGFBQUszRCxLQUFMLEdBQWEsS0FBSzJELFFBQUwsQ0FBY0UsTUFBM0I7QUFDQSxhQUFLMUcsR0FBTCxDQUFTLEtBQUt3RyxRQUFMLENBQWN2SSxLQUFkLEVBQVQ7QUFDRCxPQUhELE1BR087QUFDTCxhQUFLK0IsR0FBTCxDQUFTLEtBQUsvQixLQUFkO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7OEJBR1U7QUFBQTs7QUFDUixVQUFJLEtBQUt1SSxRQUFULEVBQW1CO0FBQ2pCLFlBQUcsS0FBS04sVUFBTCxLQUFvQixJQUF2QixFQUE2QjtBQUMzQixnQkFBTSxJQUFJN0UsS0FBSixDQUFVLG9CQUFWLENBQU47QUFDRDs7QUFDRCxZQUFJcEQsUUFBUSxLQUFLaUksVUFBTCxDQUFnQjJCLFdBQWhCLENBQTRCLFVBQUNiLE1BQUQsRUFBNEJDLFdBQTVCLEVBQWdFbkUsS0FBaEUsRUFBa0Y7QUFDeEgsY0FBTWpFLE9BQU9vSSxZQUFZYSxLQUFaLENBQWtCL0IsZUFBbEIsQ0FBYjtBQUNBLGNBQU1sSSxLQUFLZ0IsS0FBS3NJLEtBQUwsRUFBWDs7QUFDQSxjQUFHLENBQUN0SixFQUFKLEVBQVE7QUFDTixrQkFBTSxJQUFJd0QsS0FBSixDQUFVLGdCQUFWLENBQU47QUFDRDs7QUFDRCxjQUFNK0YsWUFBWSxPQUFLckcsSUFBTCxDQUFVRSxPQUFWLENBQWtCaUYsVUFBbEIsQ0FBNkJySSxFQUE3QixDQUFsQjs7QUFDQSxjQUFNd0osZ0JBQWdCLE9BQUtDLHVCQUFMLENBQTZCekksSUFBN0IsRUFBbUNpRSxLQUFuQyxDQUF0Qjs7QUFFQSxjQUFJc0UsYUFBYUEsVUFBVXJDLE9BQTNCLEVBQW9DO0FBQ2xDaUMscUJBQVNJLFVBQVVyQyxPQUFWLG1CQUFrQmlDLE1BQWxCLDRCQUE2QkssYUFBN0IsR0FBVDtBQUNEOztBQUNELGlCQUFPTCxNQUFQO0FBQ0QsU0FiVyxFQWFULEtBQUtlLFFBQUwsQ0FBZSxLQUFLbEgsRUFBcEIsQ0FiUyxDQUFaO0FBZUEsYUFBSzJGLFFBQUwsQ0FBY3dCLFFBQWQsQ0FBdUIvSixLQUF2QjtBQUNEO0FBQ0Y7QUFFRDs7Ozs7Ozs7MkJBS087QUFDTCxXQUFLZ0ssV0FBTDs7QUFFQSxVQUFJLEtBQUtoQyxNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZckksY0FBWixDQUEyQixNQUEzQixDQUFuQixFQUF1RDtBQUNyRCxhQUFLcUksTUFBTCxHQUFlLEtBQUtBLE1BQXBCOztBQUNBLFlBQUcsQ0FBQyxLQUFLQSxNQUFMLENBQVkvRSxJQUFiLElBQXFCLE9BQU8sS0FBSytFLE1BQUwsQ0FBWS9FLElBQW5CLEtBQTZCLFVBQXJELEVBQWlFO0FBQy9ELGdCQUFNLElBQUlHLEtBQUosQ0FBVSxtQ0FBVixDQUFOO0FBQ0Q7O0FBQ0QsYUFBSzRFLE1BQUwsQ0FBWS9FLElBQVosQ0FBaUJ3RyxJQUFqQixDQUFzQixJQUF0QixFQUE0QixLQUFLN0csRUFBakM7QUFDRDs7QUFFRCxVQUFJLEtBQUtFLElBQUwsQ0FBVUUsT0FBVixDQUFrQmlILFdBQXRCLEVBQW1DO0FBQ2pDLGFBQUs3SSxJQUFMO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7NkJBR1M7QUFBQTs7QUFDUCxVQUFHLEtBQUs0RyxNQUFMLEtBQWdCLElBQW5CLEVBQXlCO0FBQ3ZCLGNBQU0sSUFBSTVFLEtBQUosQ0FBVSxnQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsVUFBRyxLQUFLNEUsTUFBTCxDQUFZckksY0FBWixDQUEyQixNQUEzQixDQUFILEVBQXVDO0FBQ3JDLGFBQUtxSSxNQUFMLEdBQWdCLEtBQUtBLE1BQXJCOztBQUNBLFlBQUksS0FBS0EsTUFBTCxDQUFZckUsTUFBaEIsRUFBd0I7QUFDdEIsZUFBS3FFLE1BQUwsQ0FBWXJFLE1BQVosQ0FBbUI4RixJQUFuQixDQUF3QixJQUF4QixFQUE4QixLQUFLN0csRUFBbkM7QUFDRDtBQUNGOztBQUVELFVBQUksS0FBSzJGLFFBQVQsRUFBbUI7QUFDakIsYUFBS0EsUUFBTCxDQUFjMkIsU0FBZDtBQUNEOztBQUVEcEssYUFBT08sSUFBUCxDQUFZLEtBQUs2SCxrQkFBakIsRUFBcUNuSCxPQUFyQyxDQUE2QyxjQUFNO0FBQ2pELFlBQUlILE9BQU8sT0FBS3NILGtCQUFMLENBQXdCaUMsRUFBeEIsQ0FBWDtBQUVBckssZUFBT08sSUFBUCxDQUFZTyxJQUFaLEVBQWtCRyxPQUFsQixDQUEwQixjQUFNO0FBQzlCSCxlQUFLZ0ksRUFBTCxFQUFTc0IsU0FBVDtBQUNELFNBRkQ7QUFHRCxPQU5EO0FBUUEsV0FBS2hDLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0Q7QUFFRDs7Ozs7Ozs7NkJBS3lCO0FBQUEsVUFBbEJ6RixNQUFrQix1RUFBSixFQUFJOztBQUN2QixVQUFJLEtBQUs4RixRQUFULEVBQW1CO0FBQ2pCLGFBQUszRCxLQUFMLEdBQWEsS0FBSzJELFFBQUwsQ0FBY0UsTUFBM0I7QUFDRDs7QUFDRCxVQUFHLEtBQUtULE1BQUwsS0FBZ0IsSUFBbkIsRUFBeUI7QUFDdkIsY0FBTSxJQUFJNUUsS0FBSixDQUFVLGdCQUFWLENBQU47QUFDRDs7QUFDRCxVQUFHLEtBQUs0RSxNQUFMLENBQVlySSxjQUFaLENBQTJCLFFBQTNCLENBQUgsRUFBeUM7QUFDdkMsYUFBS3FJLE1BQUwsR0FBZ0IsS0FBS0EsTUFBckI7O0FBQ0EsWUFBSSxLQUFLQSxNQUFMLENBQVl0QyxNQUFoQixFQUF3QjtBQUN0QixlQUFLc0MsTUFBTCxDQUFZdEMsTUFBWixDQUFtQitELElBQW5CLENBQXdCLElBQXhCLEVBQThCaEgsTUFBOUI7QUFDRDtBQUNGO0FBQ0Y7QUFFRDs7Ozs7Ozs2QkFJU0csRSxFQUEwQztBQUNqRCxVQUFHLEtBQUtvRixNQUFMLEtBQWdCLElBQW5CLEVBQXlCO0FBQ3ZCLGNBQU0sSUFBSTVFLEtBQUosQ0FBVSxnQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsVUFBRyxLQUFLNEUsTUFBTCxDQUFZckksY0FBWixDQUEyQixVQUEzQixDQUFILEVBQTJDO0FBQ3pDLGFBQUtxSSxNQUFMLEdBQWdCLEtBQUtBLE1BQXJCOztBQUNBLFlBQUcsT0FBTyxLQUFLQSxNQUFMLENBQVk4QixRQUFuQixLQUFpQyxVQUFwQyxFQUFnRDtBQUM5QyxnQkFBTSxJQUFJMUcsS0FBSixDQUFVLDRCQUFWLENBQU47QUFDRDs7QUFDRCxlQUFPLEtBQUs0RSxNQUFMLENBQVk4QixRQUFaLENBQXFCTCxJQUFyQixDQUEwQixJQUExQixFQUFnQzdHLEVBQWhDLENBQVA7QUFDRCxPQU5ELE1BTU87QUFDTCxlQUFPK0UsY0FBYy9FLEVBQWQsQ0FBUDtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyWEg7O0FBQ0E7O0FBQ0E7O0FBR0E7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVBOzs7SUFHYXdILGdCOzs7OztBQU1YOzs7O0FBSUE7OztBQVFBO0FBQ0E7QUFDQTtBQUNBLDRCQUFZdEgsSUFBWixFQUF3QkYsRUFBeEIsRUFBeUN1QixJQUF6QyxFQUF1RDtBQUFBOztBQUFBOztBQUNyRCwwRkFBTXJCLElBQU4sRUFBWUYsRUFBWixFQUFnQnVCLElBQWhCLEVBQXNCLElBQXRCLEVBQTRCLElBQTVCLEVBQWtDLElBQWxDLEVBQXdDLElBQXhDOztBQURxRDs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSxxRkFaekMsRUFZeUM7O0FBQUEsdUZBUmpDLEVBUWlDOztBQUFBOztBQUFBLDRGQU52Q2tHLG1CQUFTQyxXQU04Qjs7QUFBQSxvRkFMMUMsRUFLMEM7O0FBRXJELFVBQUt4SCxJQUFMLEdBQVlBLElBQVo7QUFDQSxVQUFLRixFQUFMLEdBQVVBLEVBQVY7QUFDQSxVQUFLdUIsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsVUFBS29HLFNBQUwsR0FBaUJ6SCxLQUFLRSxPQUFMLENBQWF3SCxVQUFiLENBQXdCLE1BQUtyRyxJQUE3QixDQUFqQjtBQUNBLFVBQUtzRyxNQUFMLEdBQWMsRUFBZDtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsRUFBakI7O0FBQ0EsVUFBS1YsV0FBTDs7QUFScUQ7QUFTdEQ7QUFFRDs7Ozs7Ozs7MkJBSU87QUFBQTs7QUFDTGxLLGFBQU9PLElBQVAsQ0FBWSxLQUFLcUssU0FBakIsRUFBNEIzSixPQUE1QixDQUFvQyxlQUFPO0FBQ3pDLFlBQUcsT0FBSzRKLGFBQVIsRUFBdUI7QUFDckIsaUJBQUtBLGFBQUwsQ0FBbUJsSSxNQUFuQixDQUEwQm1ELEdBQTFCLElBQWlDLE9BQUs4RSxTQUFMLENBQWU5RSxHQUFmLEVBQW9CNkMsTUFBckQ7QUFDRDtBQUNGLE9BSkQ7QUFLRDtBQUVEOzs7Ozs7OzZCQUlTLENBQUU7QUFFWDs7Ozs7Ozs4QkFJVSxDQUFFO0FBRVo7Ozs7Ozs2QkFHUztBQUFBOztBQUNQLFVBQUlNLFNBQWMsRUFBbEI7QUFFQWpKLGFBQU9PLElBQVAsQ0FBWSxLQUFLb0ssTUFBakIsRUFBeUIxSixPQUF6QixDQUFpQyxlQUFPO0FBQ3RDO0FBQ0FnSSxlQUFPbkQsR0FBUCxJQUFjLE9BQUtnRixlQUFMLENBQXFCLE9BQUtILE1BQUwsQ0FBWTdFLEdBQVosQ0FBckIsRUFBdUNBLEdBQXZDLENBQWQ7QUFDRCxPQUhEO0FBS0E5RixhQUFPTyxJQUFQLENBQVksS0FBS3FLLFNBQWpCLEVBQTRCM0osT0FBNUIsQ0FBb0MsZUFBTztBQUN6QztBQUNBZ0ksZUFBT25ELEdBQVAsSUFBYyxPQUFLZ0YsZUFBTCxDQUFxQixPQUFLRixTQUFMLENBQWU5RSxHQUFmLEVBQW9CNUYsS0FBcEIsRUFBckIsRUFBa0Q0RixHQUFsRCxDQUFkO0FBQ0QsT0FIRDtBQUtBLGFBQU9tRCxNQUFQO0FBQ0Q7QUFHRDs7Ozs7Ozs7OzhCQU1VOEIsTSxFQUFnQjtBQUN4QixhQUFPQSxPQUFPOUUsT0FBUCxDQUFlLFdBQWYsRUFBNEIsbUJBQVc7QUFDNUMsZUFBTytFLFFBQVEsQ0FBUixFQUFXQyxXQUFYLEVBQVA7QUFDRCxPQUZNLENBQVA7QUFHRDs7O3VDQUVrQjtBQUNqQixVQUFJL0gsVUFBeUI7QUFDM0I7QUFDQU0saUJBQXlCeEQsT0FBT2tMLE1BQVAsQ0FBYyxJQUFkLENBRkU7QUFHM0IvQyxvQkFBMEJuSSxPQUFPa0wsTUFBUCxDQUFjLElBQWQsQ0FIQztBQUkzQlIsb0JBQTBCMUssT0FBT2tMLE1BQVAsQ0FBYyxJQUFkLENBSkM7QUFLM0JDLGtCQUFzQm5MLE9BQU9rTCxNQUFQLENBQWMsSUFBZDtBQUxLLE9BQTdCO0FBUUEsOEJBQVloSSxRQUFRTSxPQUFwQixFQUE2QixLQUFLaUgsU0FBTCxDQUFlakgsT0FBNUM7QUFDQSw4QkFBWU4sUUFBUWlGLFVBQXBCLEVBQWdDLEtBQUtzQyxTQUFMLENBQWV0QyxVQUEvQztBQUNBLDhCQUFZakYsUUFBUXdILFVBQXBCLEVBQWdDLEtBQUtELFNBQUwsQ0FBZUMsVUFBL0M7QUFDQSw4QkFBWXhILFFBQVFpSSxRQUFwQixFQUE4QixLQUFLVixTQUFMLENBQWVVLFFBQTdDO0FBRUEsOEJBQVlqSSxRQUFRTSxPQUFwQixFQUE2QixLQUFLUixJQUFMLENBQVVFLE9BQVYsQ0FBa0JNLE9BQS9DO0FBQ0EsOEJBQVlOLFFBQVFpRixVQUFwQixFQUFnQyxLQUFLbkYsSUFBTCxDQUFVRSxPQUFWLENBQWtCaUYsVUFBbEQ7QUFDQSw4QkFBWWpGLFFBQVF3SCxVQUFwQixFQUFnQyxLQUFLMUgsSUFBTCxDQUFVRSxPQUFWLENBQWtCd0gsVUFBbEQ7QUFDQSw4QkFBWXhILFFBQVFpSSxRQUFwQixFQUE4QixLQUFLbkksSUFBTCxDQUFVRSxPQUFWLENBQWtCaUksUUFBaEQ7QUFFQWpJLGNBQVFrSSxNQUFSLEdBQWlCLEtBQUtYLFNBQUwsQ0FBZVcsTUFBZixHQUF3QixLQUFLWCxTQUFMLENBQWVXLE1BQXZDLEdBQWdELEtBQUtwSSxJQUFMLENBQVVFLE9BQVYsQ0FBa0JrSSxNQUFuRjtBQUNBbEksY0FBUW1JLGtCQUFSLEdBQTZCLEtBQUtaLFNBQUwsQ0FBZVksa0JBQWYsR0FBb0MsS0FBS1osU0FBTCxDQUFlWSxrQkFBbkQsR0FBd0UsS0FBS3JJLElBQUwsQ0FBVUUsT0FBVixDQUFrQm1JLGtCQUF2SDtBQUNBbkksY0FBUW9JLGFBQVIsR0FBd0IsS0FBS2IsU0FBTCxDQUFlYSxhQUFmLEdBQStCLEtBQUtiLFNBQUwsQ0FBZWEsYUFBOUMsR0FBOEQsS0FBS3RJLElBQUwsQ0FBVUUsT0FBVixDQUFrQm9JLGFBQXhHO0FBQ0FwSSxjQUFRaUgsV0FBUixHQUFzQixLQUFLTSxTQUFMLENBQWVOLFdBQWYsR0FBNkIsS0FBS00sU0FBTCxDQUFlTixXQUE1QyxHQUEwRCxLQUFLbkgsSUFBTCxDQUFVRSxPQUFWLENBQWtCaUgsV0FBbEc7QUFDQWpILGNBQVFVLE9BQVIsR0FBa0IsS0FBSzZHLFNBQUwsQ0FBZTdHLE9BQWYsR0FBeUIsS0FBSzZHLFNBQUwsQ0FBZTdHLE9BQXhDLEdBQWtELEtBQUtaLElBQUwsQ0FBVUUsT0FBVixDQUFrQlUsT0FBdEY7QUFDQSxhQUFPVixPQUFQO0FBQ0Q7QUFFRDs7Ozs7OzsyQkFJTztBQUNMLFVBQUksQ0FBQyxLQUFLMkgsYUFBVixFQUF5QjtBQUN2QixhQUFLL0gsRUFBTCxDQUFRd0QsU0FBUixHQUFvQixLQUFLbUUsU0FBTCxDQUFlNUgsUUFBZixDQUF3QjhHLElBQXhCLENBQTZCLElBQTdCLENBQXBCO0FBQ0E7Ozs7QUFHQSxZQUFJM0UsUUFBUSxLQUFLeUYsU0FBTCxDQUFlYyxVQUFmLENBQTBCNUIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBcUMsS0FBSzdHLEVBQTFDLEVBQThDLEtBQUswSSxNQUFMLEVBQTlDLENBQVo7QUFDQSxhQUFLWCxhQUFMLEdBQXFCTixtQkFBU3BILElBQVQsQ0FBYy9CLE1BQU1xSyxTQUFOLENBQWdCQyxLQUFoQixDQUFzQi9CLElBQXRCLENBQTJCLEtBQUs3RyxFQUFMLENBQVE2SSxVQUFuQyxDQUFkLEVBQThEM0csS0FBOUQsRUFBcUUsS0FBSzRHLGdCQUFMLEVBQXJFLENBQXJCO0FBQ0EsYUFBSzlJLEVBQUwsQ0FBUStJLE1BQVIsR0FBaUIsSUFBakI7QUFDRCxPQVJELE1BUU87QUFDTCxhQUFLaEIsYUFBTCxDQUFtQjFILElBQW5CO0FBQ0Q7QUFDRjs7O2tDQUVhO0FBRVo7QUFDQSxXQUFLLElBQUltRSxJQUFJLENBQVIsRUFBV3dFLE1BQU0sS0FBS2hKLEVBQUwsQ0FBUWlKLFVBQVIsQ0FBbUJ2TCxNQUF6QyxFQUFpRDhHLElBQUl3RSxHQUFyRCxFQUEwRHhFLEdBQTFELEVBQStEO0FBQzdELFlBQUkwRSxZQUFZLEtBQUtsSixFQUFMLENBQVFpSixVQUFSLENBQW1CekUsQ0FBbkIsQ0FBaEIsQ0FENkQsQ0FHN0Q7O0FBQ0EsWUFBSTBFLFVBQVVDLElBQVYsQ0FBZXhLLE9BQWYsQ0FBdUIsS0FBS3lLLGFBQTVCLE1BQStDLENBQW5ELEVBQXNEO0FBQ3BELGNBQUlDLGdCQUFlLEtBQUtDLFNBQUwsQ0FBZUosVUFBVUMsSUFBekIsQ0FBbkI7O0FBQ0EsY0FBTS9DLGNBQWM4QyxVQUFVOUwsS0FBOUI7O0FBQ0EsY0FBTW1NLG9CQUFvQnBKLFdBQUtxSixnQkFBTCxDQUFzQnBELFdBQXRCLENBQTFCOztBQUVBLGVBQUtxRCxLQUFMLENBQVdKLGFBQVgsSUFBMkJFLGtCQUFrQkUsS0FBN0M7O0FBQ0EsY0FBR0Ysa0JBQWtCOUssT0FBbEIsS0FBOEIsSUFBakMsRUFBdUM7QUFDckMsa0JBQU0sSUFBSStCLEtBQUosQ0FBVSxtQ0FBVixDQUFOO0FBQ0Q7O0FBQ0QsY0FBSWdGLFFBQVEsd0JBQVUrRCxrQkFBa0I5SyxPQUE1QixDQUFaOztBQUNGLGNBQUcrRyxNQUFNakUsSUFBTixLQUFla0Usa0JBQWxCLEVBQTZCO0FBQ3pCLGlCQUFLb0MsTUFBTCxDQUFZd0IsYUFBWixJQUE0QjdELE1BQU1wSSxLQUFsQztBQUNELFdBRkgsTUFFUyxJQUFHb0ksTUFBTWpFLElBQU4sS0FBZW1FLGdCQUFsQixFQUEyQjtBQUNoQyxpQkFBS2dFLFFBQUwsQ0FBY0wsYUFBZCxJQUE4QkgsVUFBVTlMLEtBQXhDO0FBQ0EsaUJBQUswSyxTQUFMLENBQWV1QixhQUFmLElBQStCLEtBQUt6RCxPQUFMLENBQWEsS0FBSzFGLElBQUwsQ0FBVUwsTUFBdkIsRUFBK0IsS0FBSzZKLFFBQUwsQ0FBY0wsYUFBZCxDQUEvQixFQUE0RCxJQUE1RCxDQUEvQjtBQUNELFdBSE0sTUFHQTtBQUNMLGtCQUFNLElBQUk3SSxLQUFKLENBQVUsa0NBQVYsQ0FBTjtBQUNEO0FBQ0Y7QUFDRjtBQUNGOzs7NENBRXVCeEMsSSxFQUFnQjhILGMsRUFBa0M7QUFBQTs7QUFDeEUsYUFBTzlILEtBQ05GLEdBRE0sQ0FDRmlJLGtCQURFLEVBRU5qSSxHQUZNLENBRUYsZ0JBQWdCa0ksRUFBaEIsRUFBdUI7QUFBQSxZQUFyQnpFLElBQXFCLFFBQXJCQSxJQUFxQjtBQUFBLFlBQWZuRSxLQUFlLFFBQWZBLEtBQWU7O0FBQzFCLFlBQUltRSxTQUFTa0Usa0JBQWIsRUFBd0I7QUFDdEIsY0FBTVEsaUJBQWlCN0ksS0FBdkI7QUFDQSxpQkFBTzZJLGNBQVA7QUFDRCxTQUhELE1BR08sSUFBSTFFLFNBQVNtRSxnQkFBYixFQUFzQjtBQUMzQjtBQUNBLGNBQU1qSCxVQUFXckIsS0FBakI7O0FBQ0EsY0FBSSxDQUFDLE9BQUtrSSxrQkFBTCxDQUF3QlEsY0FBeEIsQ0FBTCxFQUE4QztBQUM1QyxtQkFBS1Isa0JBQUwsQ0FBd0JRLGNBQXhCLElBQTBDLEVBQTFDO0FBQ0Q7O0FBRUQsY0FBSUgsV0FBVyxPQUFLTCxrQkFBTCxDQUF3QlEsY0FBeEIsRUFBd0NFLEVBQXhDLENBQWY7O0FBRUEsY0FBSSxDQUFDTCxRQUFMLEVBQWU7QUFDYkEsdUJBQVcsT0FBS0MsT0FBTCxDQUFhLE9BQUsxRixJQUFMLENBQVVMLE1BQXZCLEVBQStCcEIsT0FBL0IsQ0FBWDtBQUNBLG1CQUFLNkcsa0JBQUwsQ0FBd0JRLGNBQXhCLEVBQXdDRSxFQUF4QyxJQUE4Q0wsUUFBOUM7QUFDRDs7QUFDRCxpQkFBT0EsU0FBU3ZJLEtBQVQsRUFBUDtBQUNELFNBZE0sTUFjQTtBQUNMLGdCQUFNLElBQUlvRCxLQUFKLENBQVUsdUJBQVYsQ0FBTjtBQUNEO0FBQ0YsT0F2Qk0sQ0FBUDtBQXdCRDtBQUVEOzs7Ozs7O29DQUlnQnBELEssRUFBWWlNLFksRUFBc0I7QUFBQTs7QUFDaEQsVUFBRyxLQUFLSSxLQUFMLENBQVdKLFlBQVgsTUFBNkIsSUFBaEMsRUFBc0M7QUFDcEMsY0FBTSxJQUFJN0ksS0FBSixDQUFVLG9CQUFWLENBQU47QUFDRDs7QUFDRCxhQUFPLEtBQUtpSixLQUFMLENBQVdKLFlBQVgsRUFBeUJuRCxNQUF6QixDQUFnQyxVQUFDQyxNQUFELEVBQTRCQyxXQUE1QixFQUFnRW5FLEtBQWhFLEVBQWtGO0FBQ3ZILFlBQUlqRSxPQUFPb0ksWUFBWUMsS0FBWixDQUFrQnBCLHVCQUFsQixDQUFYOztBQUNBLFlBQUdqSCxTQUFTLElBQVosRUFBa0I7QUFDaEIsZ0JBQU0sSUFBSXdDLEtBQUosQ0FBVSxxQ0FBVixDQUFOO0FBQ0Q7O0FBQ0QsWUFBSXhELEtBQUtnQixLQUFLc0ksS0FBTCxFQUFUOztBQUNBLFlBQUcsQ0FBQ3RKLEVBQUosRUFBUTtBQUNOLGdCQUFNLElBQUl3RCxLQUFKLENBQVUscUJBQVYsQ0FBTjtBQUNEOztBQUNELFlBQUkrRixZQUFZLE9BQUtyRyxJQUFMLENBQVVFLE9BQVYsQ0FBa0JpRixVQUFsQixDQUE2QnJJLEVBQTdCLENBQWhCOztBQUVBLFlBQU13SixnQkFBZ0IsT0FBS0MsdUJBQUwsQ0FBNkJ6SSxJQUE3QixFQUFtQ2lFLEtBQW5DLENBQXRCOztBQUVBLFlBQUlzRSxhQUFjQSxVQUFVRyxJQUFWLFlBQTBCQyxRQUE1QyxFQUF1RDtBQUNyRFIsbUJBQVNJLFVBQVVHLElBQVYsbUJBQWVQLE1BQWYsNEJBQTBCSyxhQUExQixHQUFUO0FBQ0QsU0FGRCxNQUVPLElBQUlELHFCQUFxQkksUUFBekIsRUFBbUM7QUFDeENSLG1CQUFTSSx5QkFBVUosTUFBViw0QkFBcUJLLGFBQXJCLEdBQVQ7QUFDRDs7QUFDRCxlQUFPTCxNQUFQO0FBQ0QsT0FuQk0sRUFtQkovSSxLQW5CSSxDQUFQO0FBb0JEO0FBRUQ7Ozs7Ozs2QkFHUztBQUFBOztBQUNQRixhQUFPTyxJQUFQLENBQVksS0FBS3FLLFNBQWpCLEVBQTRCM0osT0FBNUIsQ0FBb0MsZUFBTztBQUN6QyxlQUFLMkosU0FBTCxDQUFlOUUsR0FBZixFQUFvQnNFLFNBQXBCO0FBQ0QsT0FGRDs7QUFJQSxVQUFJLEtBQUtTLGFBQVQsRUFBd0I7QUFDdEIsYUFBS0EsYUFBTCxDQUFtQmhILE1BQW5CLENBQTBCOEYsSUFBMUIsQ0FBK0IsSUFBL0I7QUFDRDtBQUNGOzs7O0VBdE9tQzFCLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1p0QyxJQUFNRSxhQUEwQixFQUFoQzs7O0FBRUFBLFdBQVdzRSxHQUFYLEdBQWlCLFVBQVV2TSxLQUFWLEVBQTBCO0FBQ3pDLFNBQU8sQ0FBQ0EsS0FBUjtBQUNELENBRkQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7O0FBbUJBO0FBQ0EsU0FBU3dNLEtBQVQsQ0FBZUMsT0FBZixFQUFnQztBQUM5QixRQUFNLElBQUlySixLQUFKLENBQVUsZ0JBQWdCcUosT0FBMUIsQ0FBTjtBQUNELEMsQ0FFRDs7O0FBQ0EsSUFBSXhCLFFBQUo7QUFDQSxJQUFJeUIsVUFBSjtBQUNBLElBQUl0QixhQUFKOztJQUVhakQsUTs7O0FBU1g7Ozs7OztBQU1BLG9CQUFZekksR0FBWixFQUFzQjJCLE9BQXRCLEVBQXVDRixRQUF2QyxFQUF3RTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUN0RSxTQUFLRSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxTQUFLRixRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUt3TCxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsUUFBTUMsY0FBYyxLQUFLQyxLQUFMLEVBQXBCO0FBQ0EsU0FBS2pILEdBQUwsR0FBV2dILFlBQVloSCxHQUF2QjtBQUNBLFNBQUtrSCxNQUFMLEdBQWNGLFlBQVlFLE1BQTFCO0FBQ0EsU0FBS3BOLEdBQUwsR0FBVyxLQUFLcU4sYUFBTCxDQUFtQnJOLEdBQW5CLENBQVg7QUFDQSxTQUFLK0ksTUFBTCxHQUFjLEtBQUt1RSxPQUFMLEVBQWQ7O0FBQ0EsUUFBSSxxQkFBUyxLQUFLdkUsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCLFdBQUsxRyxHQUFMLENBQVMsSUFBVCxFQUFlLEtBQUs2RCxHQUFwQixFQUF5QixLQUFLNkMsTUFBOUIsRUFBc0MsS0FBS3RILFFBQTNDO0FBQ0Q7QUFDRjs7Ozs7QUFpQ0Q7Ozs7NEJBSVE7QUFDTixVQUFJOEwsSUFBSjtBQUNBLFVBQUlDLElBQUo7O0FBRUEsVUFBSSxDQUFDUixXQUFXcE0sTUFBaEIsRUFBd0I7QUFDdEJrTSxjQUFNLDZDQUFOO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDLENBQUMsQ0FBQ0UsV0FBV25MLE9BQVgsQ0FBbUIsS0FBS0YsT0FBTCxDQUFhLENBQWIsQ0FBbkIsQ0FBUCxFQUE0QztBQUMxQzZMLGVBQU8sS0FBSzdMLE9BQUwsQ0FBYSxDQUFiLENBQVA7QUFDQTRMLGVBQU8sS0FBSzVMLE9BQUwsQ0FBYThMLE1BQWIsQ0FBb0IsQ0FBcEIsQ0FBUDtBQUNELE9BSEQsTUFHTztBQUNMRCxlQUFPOUIsYUFBUDtBQUNBNkIsZUFBTyxLQUFLNUwsT0FBWjtBQUNEOztBQUVELFdBQUt5TCxNQUFMLEdBQWMzRSxTQUFTaUYsUUFBVCxDQUFrQkgsSUFBbEIsRUFBd0JDLElBQXhCLENBQWQ7O0FBRUEsVUFBRyxDQUFDLEtBQUtKLE1BQUwsQ0FBWXhNLE1BQWhCLEVBQXdCO0FBQ3RCLGNBQU0sSUFBSThDLEtBQUosQ0FBVSxXQUFWLENBQU47QUFDRDs7QUFFRCxXQUFLd0MsR0FBTCxHQUFZLEtBQUtrSCxNQUFMLENBQVl2SCxHQUFaLEVBQVo7QUFFQSxhQUFPO0FBQ0xLLGFBQUssS0FBS0EsR0FETDtBQUVMa0gsZ0JBQVEsS0FBS0E7QUFGUixPQUFQO0FBSUQ7QUFFRDs7Ozs7Ozs4QkFJVTtBQUNSLFVBQUlPLFVBQWUsS0FBSzNOLEdBQXhCO0FBQ0EsVUFBSTROLFlBQVksQ0FBQyxDQUFqQjtBQUNBLFVBQUlDLElBQUo7QUFDQSxVQUFJbkYsS0FBSjs7QUFFQSxXQUFLLElBQUl2RCxRQUFRLENBQWpCLEVBQW9CQSxRQUFRLEtBQUtpSSxNQUFMLENBQVl4TSxNQUF4QyxFQUFnRHVFLE9BQWhELEVBQXlEO0FBQ3ZEdUQsZ0JBQVEsS0FBSzBFLE1BQUwsQ0FBWWpJLEtBQVosQ0FBUjs7QUFDQSxZQUFJLHFCQUFTd0ksT0FBVCxDQUFKLEVBQXVCO0FBQ3JCLGNBQUksT0FBTyxLQUFLVixVQUFMLENBQWdCOUgsS0FBaEIsQ0FBUCxLQUFrQyxXQUF0QyxFQUFtRDtBQUNqRCxnQkFBSXdJLGFBQWFFLE9BQU8sS0FBS1osVUFBTCxDQUFnQjlILEtBQWhCLENBQXBCLENBQUosRUFBaUQ7QUFDL0MsbUJBQUs5QyxHQUFMLENBQVMsS0FBVCxFQUFnQnFHLEtBQWhCLEVBQXVCbUYsSUFBdkIsRUFBNkIsSUFBN0I7QUFDQSxtQkFBS3hMLEdBQUwsQ0FBUyxJQUFULEVBQWVxRyxLQUFmLEVBQXNCaUYsT0FBdEIsRUFBK0IsSUFBL0I7QUFDQSxtQkFBS1YsVUFBTCxDQUFnQjlILEtBQWhCLElBQXlCd0ksT0FBekI7QUFDRDtBQUNGLFdBTkQsTUFNTztBQUNMLGlCQUFLdEwsR0FBTCxDQUFTLElBQVQsRUFBZXFHLEtBQWYsRUFBc0JpRixPQUF0QixFQUErQixJQUEvQjtBQUNBLGlCQUFLVixVQUFMLENBQWdCOUgsS0FBaEIsSUFBeUJ3SSxPQUF6QjtBQUNEOztBQUVEQSxvQkFBVSxLQUFLdkwsR0FBTCxDQUFTc0csS0FBVCxFQUFnQmlGLE9BQWhCLENBQVY7QUFDRCxTQWJELE1BYU87QUFDTCxjQUFJQyxjQUFjLENBQUMsQ0FBbkIsRUFBc0I7QUFDcEJBLHdCQUFZekksS0FBWjtBQUNEOztBQUVELGNBQUkwSSxPQUFPLEtBQUtaLFVBQUwsQ0FBZ0I5SCxLQUFoQixDQUFYLEVBQW1DO0FBQ2pDLGlCQUFLOUMsR0FBTCxDQUFTLEtBQVQsRUFBZ0JxRyxLQUFoQixFQUF1Qm1GLElBQXZCLEVBQTZCLElBQTdCO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFVBQUlELGNBQWMsQ0FBQyxDQUFuQixFQUFzQjtBQUNwQixhQUFLWCxVQUFMLENBQWdCakwsTUFBaEIsQ0FBdUI0TCxTQUF2QjtBQUNEOztBQUVELGFBQU9ELE9BQVA7QUFDRDtBQUVEOzs7Ozs7MkJBR087QUFDTCxVQUFJRyxJQUFKLEVBQVVDLFFBQVYsRUFBb0J2TCxRQUFwQjs7QUFFQSxVQUFJLENBQUNzTCxPQUFPLEtBQUtSLE9BQUwsRUFBUixNQUE0QixLQUFLdkUsTUFBckMsRUFBNkM7QUFDM0MsWUFBSSxxQkFBUyxLQUFLQSxNQUFkLENBQUosRUFBMkI7QUFDekIsZUFBSzFHLEdBQUwsQ0FBUyxLQUFULEVBQWdCLEtBQUs2RCxHQUFyQixFQUEwQixLQUFLNkMsTUFBL0IsRUFBdUMsS0FBS3RILFFBQTVDO0FBQ0Q7O0FBRUQsWUFBSSxxQkFBU3FNLElBQVQsQ0FBSixFQUFvQjtBQUNsQixlQUFLekwsR0FBTCxDQUFTLElBQVQsRUFBZSxLQUFLNkQsR0FBcEIsRUFBeUI0SCxJQUF6QixFQUErQixLQUFLck0sUUFBcEM7QUFDRDs7QUFFRHNNLG1CQUFXLEtBQUt6TixLQUFMLEVBQVg7QUFDQSxhQUFLeUksTUFBTCxHQUFjK0UsSUFBZDtBQUNBdEwsbUJBQVcsS0FBS2xDLEtBQUwsRUFBWDtBQUNBLFlBQUlrQyxhQUFhdUwsUUFBYixJQUF5QnZMLG9CQUFvQnFILFFBQWpELEVBQTJELEtBQUtwSSxRQUFMLENBQWNDLElBQWQ7QUFDNUQsT0FiRCxNQWFPLElBQUlvTSxnQkFBZ0J0TSxLQUFwQixFQUEyQjtBQUNoQyxhQUFLQyxRQUFMLENBQWNDLElBQWQ7QUFDRDtBQUNGLEssQ0FFRDtBQUNBOzs7OzRCQUNRO0FBQ04sVUFBSSxxQkFBUyxLQUFLcUgsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCLGVBQU8sS0FBSzNHLEdBQUwsQ0FBUyxLQUFLOEQsR0FBZCxFQUFtQixLQUFLNkMsTUFBeEIsQ0FBUDtBQUNEO0FBQ0YsSyxDQUVEO0FBQ0E7Ozs7NkJBQ1N6SSxLLEVBQVk7QUFDbkIsVUFBSSxxQkFBUyxLQUFLeUksTUFBZCxDQUFKLEVBQTJCO0FBQ3pCd0MsaUJBQVMsS0FBS3JGLEdBQUwsQ0FBU3dCLENBQWxCLEVBQXFCckYsR0FBckIsQ0FBeUIsS0FBSzBHLE1BQTlCLEVBQXNDLEtBQUs3QyxHQUFMLENBQVNxSCxJQUEvQyxFQUFxRGpOLEtBQXJEO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Ozt3QkFLSTRGLEcsRUFBV2xHLEcsRUFBVTtBQUN2QixhQUFPdUwsU0FBU3JGLElBQUl3QixDQUFiLEVBQWdCdEYsR0FBaEIsQ0FBb0JwQyxHQUFwQixFQUF5QmtHLElBQUlxSCxJQUE3QixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozt3QkFPSVMsTSxFQUFpQjlILEcsRUFBV2xHLEcsRUFBVXlCLFEsRUFBaUM7QUFDekUsVUFBR3VNLE1BQUgsRUFBVztBQUNUekMsaUJBQVNyRixJQUFJd0IsQ0FBYixFQUFnQm9CLE9BQWhCLENBQXdCOUksR0FBeEIsRUFBNkJrRyxJQUFJcUgsSUFBakMsRUFBdUM5TCxRQUF2QztBQUNELE9BRkQsTUFFTztBQUNMOEosaUJBQVNyRixJQUFJd0IsQ0FBYixFQUFnQjhDLFNBQWhCLENBQTBCeEssR0FBMUIsRUFBK0JrRyxJQUFJcUgsSUFBbkMsRUFBeUM5TCxRQUF6QztBQUNEO0FBQ0Y7QUFFRDs7Ozs7O2dDQUdZO0FBQ1YsVUFBSXpCLEdBQUo7QUFDQSxVQUFJMEksS0FBSjs7QUFFQSxXQUFLLElBQUl2RCxRQUFRLENBQWpCLEVBQW9CQSxRQUFRLEtBQUtpSSxNQUFMLENBQVl4TSxNQUF4QyxFQUFnRHVFLE9BQWhELEVBQXlEO0FBQ3ZEdUQsZ0JBQVEsS0FBSzBFLE1BQUwsQ0FBWWpJLEtBQVosQ0FBUjs7QUFDQSxZQUFJbkYsTUFBTSxLQUFLaU4sVUFBTCxDQUFnQjlILEtBQWhCLENBQVYsRUFBa0M7QUFDaEMsZUFBSzlDLEdBQUwsQ0FBUyxLQUFULEVBQWdCcUcsS0FBaEIsRUFBdUIxSSxHQUF2QixFQUE0QixJQUE1QjtBQUNEO0FBQ0Y7O0FBRUQsVUFBSSxxQkFBUyxLQUFLK0ksTUFBZCxDQUFKLEVBQTJCO0FBQ3pCLGFBQUsxRyxHQUFMLENBQVMsS0FBVCxFQUFnQixLQUFLNkQsR0FBckIsRUFBMEIsS0FBSzZDLE1BQS9CLEVBQXVDLEtBQUt0SCxRQUE1QztBQUNEO0FBQ0YsSyxDQUNEO0FBQ0E7Ozs7a0NBQ2N6QixHLEVBQVU7QUFDdEIsVUFBSWlPLFFBQUosRUFBY04sT0FBZDs7QUFDQSxVQUFJLENBQUMzTixJQUFJcUYsT0FBVCxFQUFrQjtBQUNoQixlQUFPckYsR0FBUDtBQUNEOztBQUVELFVBQUksS0FBS29OLE1BQUwsQ0FBWXhNLE1BQWhCLEVBQXdCO0FBQ3RCcU4sbUJBQVcsS0FBS2IsTUFBTCxDQUFZLENBQVosRUFBZUcsSUFBMUI7QUFDRCxPQUZELE1BRU87QUFDTFUsbUJBQVcsS0FBSy9ILEdBQUwsQ0FBU3FILElBQXBCO0FBQ0Q7O0FBRURJLGdCQUFVM04sR0FBVjs7QUFDQSxhQUFPMk4sUUFBUXRJLE9BQVIsSUFBb0JzSSxRQUFRTSxRQUFSLE1BQXNCckksU0FBakQsRUFBNkQ7QUFDM0QrSCxrQkFBVUEsUUFBUXRJLE9BQWxCO0FBQ0Q7O0FBRUQsYUFBT3NJLE9BQVA7QUFDRDs7Ozs7Ozs7Z0JBL09VbEYsUSxtQkE2QlksVUFBU25GLE9BQVQsRUFBZ0M7QUFDckRpSSxhQUFXakksUUFBUWlJLFFBQW5CO0FBQ0F5QixlQUFhNU0sT0FBT08sSUFBUCxDQUFZNEssUUFBWixDQUFiO0FBQ0FHLGtCQUFnQnBJLFFBQVFvSSxhQUF4QjtBQUNELEM7O2dCQWpDVWpELFEsY0F1Q08sVUFBUzlHLE9BQVQsRUFBMEI2TCxJQUExQixFQUFzQztBQUN0RCxNQUFJSixTQUFnQixFQUFwQjtBQUNBLE1BQUlPLFVBQWdCO0FBQUNqRyxPQUFHOEYsSUFBSjtBQUFVRCxVQUFNO0FBQWhCLEdBQXBCO0FBQ0EsTUFBSXBJLEtBQUo7QUFDQSxNQUFJK0ksR0FBSjs7QUFFQSxPQUFLL0ksUUFBUSxDQUFiLEVBQWdCQSxRQUFReEQsUUFBUWYsTUFBaEMsRUFBd0N1RSxPQUF4QyxFQUFpRDtBQUMvQytJLFVBQU12TSxRQUFRd00sTUFBUixDQUFlaEosS0FBZixDQUFOOztBQUVBLFFBQUksQ0FBQyxDQUFDLENBQUM2SCxXQUFXbkwsT0FBWCxDQUFtQnFNLEdBQW5CLENBQVAsRUFBZ0M7QUFDOUJkLGFBQU90TCxJQUFQLENBQVk2TCxPQUFaO0FBQ0FBLGdCQUFVO0FBQUNqRyxXQUFHd0csR0FBSjtBQUFTWCxjQUFNO0FBQWYsT0FBVjtBQUNELEtBSEQsTUFHTztBQUNMSSxjQUFRSixJQUFSLElBQWdCVyxHQUFoQjtBQUNEO0FBQ0Y7O0FBRURkLFNBQU90TCxJQUFQLENBQVk2TCxPQUFaO0FBQ0EsU0FBT1AsTUFBUDtBQUNELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGSDs7QUFFQTs7OztBQUlPLElBQU16RSxZQUFZLENBQWxCOztBQUNBLElBQU1DLFVBQVUsQ0FBaEI7O0FBQ0EsSUFBTXdGLE9BQU8sQ0FBYjs7QUFDQSxJQUFNQyxVQUFVLENBQWhCOztBQUVQLElBQU1DLGFBQWEsZUFBbkIsQyxDQUFvQztBQUdwQzs7QUFDTyxTQUFTckYsU0FBVCxDQUFtQmtDLE1BQW5CLEVBQW1DO0FBQ3hDLE1BQUkxRyxPQUFPa0UsU0FBWDtBQUNBLE1BQUlySSxRQUFhNkssTUFBakI7O0FBQ0EsTUFBSW1ELFdBQVdDLElBQVgsQ0FBZ0JwRCxNQUFoQixDQUFKLEVBQTZCO0FBQzNCN0ssWUFBUTZLLE9BQU9XLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakIsQ0FBUjtBQUNELEdBRkQsTUFFTyxJQUFJWCxXQUFXLE1BQWYsRUFBdUI7QUFDNUI3SyxZQUFRLElBQVI7QUFDRCxHQUZNLE1BRUEsSUFBSTZLLFdBQVcsT0FBZixFQUF3QjtBQUM3QjdLLFlBQVEsS0FBUjtBQUNELEdBRk0sTUFFQSxJQUFJNkssV0FBVyxNQUFmLEVBQXVCO0FBQzVCN0ssWUFBUSxJQUFSO0FBQ0QsR0FGTSxNQUVBLElBQUk2SyxXQUFXLFdBQWYsRUFBNEI7QUFDakM3SyxZQUFRc0YsU0FBUjtBQUNELEdBRk0sTUFFQSxJQUFJLENBQUM0SSxNQUFNQyxPQUFPdEQsTUFBUCxDQUFOLENBQUwsRUFBNEI7QUFDakM3SyxZQUFRbU8sT0FBT3RELE1BQVAsQ0FBUjtBQUNELEdBRk0sTUFFQSxJQUFJLG1CQUFPQSxNQUFQLENBQUosRUFBb0I7QUFDekI3SyxZQUFRb08sS0FBS3ZCLEtBQUwsQ0FBV2hDLE1BQVgsQ0FBUjtBQUNELEdBRk0sTUFFQTtBQUNMMUcsV0FBT21FLE9BQVA7QUFDRDs7QUFDRCxTQUFPO0FBQUNuRSxVQUFNQSxJQUFQO0FBQWFuRSxXQUFPQTtBQUFwQixHQUFQO0FBQ0Q7O0FBUUQ7QUFDQTtBQUNBO0FBQ08sU0FBU3FPLGFBQVQsQ0FBdUIxTCxRQUF2QixFQUF5QzJMLFVBQXpDLEVBQStEO0FBQ3BFLE1BQUl4QixTQUEyQixJQUEvQjtBQUNBLE1BQUl4TSxTQUFTcUMsU0FBU3JDLE1BQXRCO0FBQ0EsTUFBSXVFLFFBQVEsQ0FBWjtBQUNBLE1BQUkwSixZQUFZLENBQWhCO0FBQ0EsTUFBSUMsT0FBT0YsV0FBVyxDQUFYLENBQVg7QUFBQSxNQUEwQkcsUUFBUUgsV0FBVyxDQUFYLENBQWxDOztBQUVBLFNBQU9DLFlBQVlqTyxNQUFuQixFQUEyQjtBQUN6QnVFLFlBQVFsQyxTQUFTcEIsT0FBVCxDQUFpQmlOLElBQWpCLEVBQXVCRCxTQUF2QixDQUFSOztBQUVBLFFBQUkxSixRQUFRLENBQVosRUFBZTtBQUNiLFVBQUlpSSxNQUFKLEVBQVk7QUFDVkEsZUFBT3RMLElBQVAsQ0FBWTtBQUNWMkMsZ0JBQU0ySixJQURJO0FBRVY5TixpQkFBTzJDLFNBQVM2SSxLQUFULENBQWUrQyxTQUFmO0FBRkcsU0FBWjtBQUlEOztBQUVEO0FBQ0QsS0FURCxNQVNPO0FBQ0x6QixlQUFTQSxVQUFVLEVBQW5COztBQUNBLFVBQUlqSSxRQUFRLENBQVIsSUFBYTBKLFlBQVkxSixLQUE3QixFQUFvQztBQUNsQ2lJLGVBQU90TCxJQUFQLENBQVk7QUFDVjJDLGdCQUFNMkosSUFESTtBQUVWOU4saUJBQU8yQyxTQUFTNkksS0FBVCxDQUFlK0MsU0FBZixFQUEwQjFKLEtBQTFCO0FBRkcsU0FBWjtBQUlEOztBQUVEMEosa0JBQVkxSixRQUFRMkosS0FBS2xPLE1BQXpCO0FBQ0F1RSxjQUFRbEMsU0FBU3BCLE9BQVQsQ0FBaUJrTixLQUFqQixFQUF3QkYsU0FBeEIsQ0FBUjs7QUFFQSxVQUFJMUosUUFBUSxDQUFaLEVBQWU7QUFDYixZQUFJNkosWUFBWS9MLFNBQVM2SSxLQUFULENBQWUrQyxZQUFZRSxNQUFNbk8sTUFBakMsQ0FBaEI7QUFDQSxZQUFJcU8sWUFBWTdCLE9BQU9BLE9BQU94TSxNQUFQLEdBQWdCLENBQXZCLENBQWhCOztBQUVBLFlBQUlxTyxhQUFhQSxVQUFVeEssSUFBVixLQUFtQjJKLElBQXBDLEVBQTBDO0FBQ3hDYSxvQkFBVTNPLEtBQVYsSUFBbUIwTyxTQUFuQjtBQUNELFNBRkQsTUFFTztBQUNMNUIsaUJBQU90TCxJQUFQLENBQVk7QUFDVjJDLGtCQUFNMkosSUFESTtBQUVWOU4sbUJBQU8wTztBQUZHLFdBQVo7QUFJRDs7QUFFRDtBQUNEOztBQUVELFVBQUkxTyxTQUFRMkMsU0FBUzZJLEtBQVQsQ0FBZStDLFNBQWYsRUFBMEIxSixLQUExQixFQUFpQ21CLElBQWpDLEVBQVo7O0FBRUE4RyxhQUFPdEwsSUFBUCxDQUFZO0FBQ1YyQyxjQUFNNEosT0FESTtBQUVWL04sZUFBT0E7QUFGRyxPQUFaO0FBS0F1TyxrQkFBWTFKLFFBQVE0SixNQUFNbk8sTUFBMUI7QUFDRDtBQUNGOztBQUVELFNBQU93TSxNQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFHRDs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUEwREEsSUFBTXpDLFdBQXNCO0FBQzFCO0FBQ0EvRyxXQUF5QkEsZ0JBRkM7QUFJMUI7QUFDQWtILGNBQTBCLEVBTEE7QUFPMUI7QUFDQXZDLGNBQTBCQSxzQkFSQTtBQVUxQjtBQUNBZ0QsWUFBc0I7QUFDcEIsU0FBSzNJO0FBRGUsR0FYSTtBQWUxQjtBQUNBc00sV0FBUyxJQWhCaUI7QUFrQjFCdEUsZUFBYSxLQWxCYTs7QUFvQjFCLE1BQUlZLE1BQUosR0FBYTtBQUNYLFdBQU8sS0FBSzBELE9BQVo7QUFDRCxHQXRCeUI7O0FBd0IxQixNQUFJMUQsTUFBSixDQUFXbEwsS0FBWCxFQUFrQjtBQUNoQixTQUFLNE8sT0FBTCxHQUFlNU8sS0FBZjtBQUNBLFNBQUtzSyxXQUFMLEdBQW1CdEssUUFBUSxHQUEzQjtBQUNELEdBM0J5Qjs7QUE2QjFCcU8saUJBQWVBLHNCQTdCVztBQStCMUIxRixhQUFXQSxrQkEvQmU7QUFpQzFCO0FBQ0F3QyxzQkFBb0IsQ0FBQyxHQUFELEVBQU0sR0FBTixDQWxDTTtBQW9DMUI7QUFDQUMsaUJBQWUsR0FyQ1c7QUF1QzFCO0FBQ0FuQixlQUFhLElBeENhOztBQTBDMUI7OztBQUdBdkcsU0E3QzBCLG1CQTZDUG1MLE9BN0NPLEVBNkNPckYsRUE3Q1AsRUE2Q2tCaEgsT0E3Q2xCLEVBNkNvQztBQUM1RCxTQUFLaUgsSUFBTCxDQUFVb0YsT0FBVixFQUFtQnJGLEVBQW5CLEVBQXVCaEgsUUFBUU0sSUFBUixDQUFhTCxNQUFwQztBQUNELEdBL0N5Qjs7QUFpRDFCOzs7O0FBSUFxTSxnQkFyRDBCLDBCQXFESWxNLEVBckRKLEVBcURxQjVDLEtBckRyQixFQXFEaUM7QUFDekQsUUFBSSxDQUFDLEtBQUttRSxJQUFWLEVBQWdCO0FBQ2QsWUFBTSxJQUFJZixLQUFKLENBQVUsOEJBQThCLEtBQUtlLElBQTdDLENBQU47QUFDRDs7QUFDRCxRQUFJbkUsU0FBUyxJQUFiLEVBQW1CO0FBQ2pCNEMsU0FBR3NFLFlBQUgsQ0FBZ0IsS0FBSy9DLElBQXJCLEVBQTJCbkUsS0FBM0I7QUFDRCxLQUZELE1BRU87QUFDTDRDLFNBQUdtTSxlQUFILENBQW1CLEtBQUs1SyxJQUF4QjtBQUNEO0FBQ0YsR0E5RHlCOztBQWdFMUI7Ozs7QUFJQTZLLFdBcEUwQixxQkFvRWhCaE0sT0FwRWdCLEVBb0VGO0FBQUE7O0FBQ3RCLFFBQUksQ0FBQ0EsT0FBTCxFQUFjO0FBQ1o7QUFDRDs7QUFFRGxELFdBQU9PLElBQVAsQ0FBWTJDLE9BQVosRUFBcUJqQyxPQUFyQixDQUE2QixrQkFBVTtBQUNyQyxVQUFJZixRQUFRZ0QsUUFBUXFFLE1BQVIsQ0FBWjs7QUFDQSxjQUFPQSxNQUFQO0FBQ0UsYUFBSyxTQUFMO0FBQ0Usa0NBQVksTUFBSy9ELE9BQWpCLEVBQTBCdEQsS0FBMUI7QUFDRjs7QUFDQSxhQUFLLFlBQUw7QUFDRSxrQ0FBWSxNQUFLaUksVUFBakIsRUFBNkJqSSxLQUE3QjtBQUNGOztBQUNBLGFBQUssWUFBTDtBQUNFLGtDQUFZLE1BQUt3SyxVQUFqQixFQUE2QnhLLEtBQTdCO0FBQ0Y7O0FBQ0EsYUFBSyxVQUFMO0FBQ0Usa0NBQVksTUFBS2lMLFFBQWpCLEVBQTJCakwsS0FBM0I7QUFDRjs7QUFDQSxhQUFLLFNBQUw7QUFDRSxrQ0FBWSxNQUFLaUwsUUFBakIsRUFBMkJqTCxLQUEzQjtBQUNGOztBQUNBLGFBQUssUUFBTDtBQUNFLGdCQUFLa0wsTUFBTCxHQUFjbEwsS0FBZDtBQUNBOztBQUNGLGFBQUssZUFBTDtBQUNFLGdCQUFLcU8sYUFBTCxHQUFxQnJPLEtBQXJCO0FBQ0E7O0FBQ0YsYUFBSyxXQUFMO0FBQ0UsZ0JBQUsySSxTQUFMLEdBQWlCM0ksS0FBakI7QUFDQTs7QUFDRixhQUFLLFFBQUw7QUFDRSxnQkFBS2tMLE1BQUwsR0FBY2xMLEtBQWQ7QUFDQTs7QUFDRixhQUFLLG9CQUFMO0FBQ0UsZ0JBQUttTCxrQkFBTCxHQUEwQm5MLEtBQTFCO0FBQ0E7O0FBQ0YsYUFBSyxlQUFMO0FBQ0UsZ0JBQUtvTCxhQUFMLEdBQXFCcEwsS0FBckI7QUFDQTs7QUFDRixhQUFLLGFBQUw7QUFDRSxnQkFBS2lLLFdBQUwsR0FBbUJqSyxLQUFuQjtBQUNBOztBQUNGO0FBQ0VpUCxrQkFBUUMsSUFBUixDQUFhLHNCQUFiLEVBQXFDN0gsTUFBckMsRUFBNkNySCxLQUE3QztBQUNGO0FBdkNGO0FBeUNELEtBM0NEO0FBNENELEdBckh5QjtBQXVIMUI7QUFDQTtBQUNBbVAsUUFBTSxjQUFDQyxZQUFELEVBQXVCeE0sRUFBdkIsRUFBc0Q7QUFBQSxRQUFkK0MsSUFBYyx1RUFBUCxFQUFPOztBQUMxRCxRQUFJLENBQUMvQyxFQUFMLEVBQVM7QUFDUEEsV0FBS3FCLFNBQVNvTCxhQUFULENBQXVCLEtBQXZCLENBQUw7QUFDRDs7QUFFRCxRQUFNOUUsWUFBWUYsU0FBU0csVUFBVCxDQUFvQjRFLFlBQXBCLENBQWxCO0FBQ0F4TSxPQUFHd0QsU0FBSCxHQUFlbUUsVUFBVTVILFFBQVYsQ0FBbUI4RyxJQUFuQixDQUF3QlksUUFBeEIsRUFBa0N6SCxFQUFsQyxDQUFmO0FBQ0EsUUFBSWtDLFFBQVF5RixVQUFVYyxVQUFWLENBQXFCNUIsSUFBckIsQ0FBMEJZLFFBQTFCLEVBQW9DekgsRUFBcEMsRUFBd0MrQyxJQUF4QyxDQUFaO0FBRUEsUUFBSTdDLE9BQU91SCxTQUFTcEgsSUFBVCxDQUFjTCxFQUFkLEVBQWtCa0MsS0FBbEIsQ0FBWDtBQUNBaEMsU0FBS0csSUFBTDtBQUNBLFdBQU9ILElBQVA7QUFDRCxHQXJJeUI7QUF1STFCO0FBQ0FHLFFBQU0sY0FBQ0wsRUFBRCxFQUFrQkgsTUFBbEIsRUFBK0JPLE9BQS9CLEVBQTJEO0FBQy9ELFFBQUlzTSxjQUE0QjtBQUM5QjtBQUNBaE0sZUFBeUJ4RCxPQUFPa0wsTUFBUCxDQUFjLElBQWQsQ0FGSztBQUc5Qi9DLGtCQUEwQm5JLE9BQU9rTCxNQUFQLENBQWMsSUFBZCxDQUhJO0FBSTlCUixrQkFBMEIxSyxPQUFPa0wsTUFBUCxDQUFjLElBQWQsQ0FKSTtBQUs5QkMsZ0JBQXNCbkwsT0FBT2tMLE1BQVAsQ0FBYyxJQUFkLENBTFE7QUFNOUI7QUFDQXVFLG1CQUFhelAsT0FBT2tMLE1BQVAsQ0FBYyxJQUFkLENBUGlCO0FBUTlCO0FBQ0FJLHFCQUFzQnRMLE9BQU9rTCxNQUFQLENBQWMsSUFBZDtBQVRRLEtBQWhDO0FBV0F2SSxhQUFTQSxVQUFVM0MsT0FBT2tMLE1BQVAsQ0FBYyxJQUFkLENBQW5CLENBWitELENBYS9EOztBQUVBLFFBQUdoSSxPQUFILEVBQVk7QUFDViw4QkFBWXNNLFlBQVloTSxPQUF4QixFQUFpQ04sUUFBUU0sT0FBekM7QUFDQSw4QkFBWWdNLFlBQVlySCxVQUF4QixFQUFvQ2pGLFFBQVFpRixVQUE1QztBQUNBLDhCQUFZcUgsWUFBWTlFLFVBQXhCLEVBQW9DeEgsUUFBUXdILFVBQTVDO0FBQ0EsOEJBQVk4RSxZQUFZckUsUUFBeEIsRUFBa0NqSSxRQUFRaUksUUFBMUM7QUFDRDs7QUFFRHFFLGdCQUFZcEUsTUFBWixHQUFxQmxJLFdBQVdBLFFBQVFrSSxNQUFuQixHQUE0QmxJLFFBQVFrSSxNQUFwQyxHQUE2Q2IsU0FBU2EsTUFBM0U7QUFDQW9FLGdCQUFZbkUsa0JBQVosR0FBaUNuSSxXQUFXQSxRQUFRbUksa0JBQW5CLEdBQXdDbkksUUFBUW1JLGtCQUFoRCxHQUFxRWQsU0FBU2Msa0JBQS9HO0FBQ0FtRSxnQkFBWWxFLGFBQVosR0FBNEJwSSxXQUFXQSxRQUFRb0ksYUFBbkIsR0FBbUNwSSxRQUFRb0ksYUFBM0MsR0FBMkRmLFNBQVNlLGFBQWhHO0FBQ0FrRSxnQkFBWXJGLFdBQVosR0FBMEJqSCxXQUFXQSxRQUFRaUgsV0FBbkIsR0FBaUNqSCxRQUFRaUgsV0FBekMsR0FBdURJLFNBQVNKLFdBQTFGO0FBQ0FxRixnQkFBWTVMLE9BQVosR0FBc0JWLFdBQVdBLFFBQVFVLE9BQW5CLEdBQTZCVixRQUFRVSxPQUFyQyxHQUErQzJHLFNBQVMzRyxPQUE5RSxDQTFCK0QsQ0E0Qi9EOztBQUNBLDRCQUFZNEwsWUFBWWhNLE9BQXhCLEVBQWlDK0csU0FBUy9HLE9BQTFDO0FBQ0EsNEJBQVlnTSxZQUFZckgsVUFBeEIsRUFBb0NvQyxTQUFTcEMsVUFBN0M7QUFDQSw0QkFBWXFILFlBQVk5RSxVQUF4QixFQUFvQ0gsU0FBU0csVUFBN0M7QUFDQSw0QkFBWThFLFlBQVlyRSxRQUF4QixFQUFrQ1osU0FBU1ksUUFBM0MsRUFoQytELENBa0MvRDs7QUFDQXFFLGdCQUFZQyxXQUFaLEdBQTBCelAsT0FBT08sSUFBUCxDQUFZaVAsWUFBWWhNLE9BQXhCLEVBQWlDa00sTUFBakMsQ0FBd0MsVUFBVTVKLEdBQVYsRUFBZTtBQUMvRSxhQUFPQSxJQUFJckUsT0FBSixDQUFZLEdBQVosSUFBbUIsQ0FBMUI7QUFDRCxLQUZ5QixDQUExQjs7QUFJQTRHLHVCQUFTc0gsYUFBVCxDQUF1QkgsV0FBdkI7O0FBRUEsUUFBSXhNLE9BQU8sSUFBSUMsVUFBSixDQUFTSCxFQUFULEVBQWFILE1BQWIsRUFBcUI2TSxXQUFyQixDQUFYO0FBQ0F4TSxTQUFLRyxJQUFMO0FBQ0EsV0FBT0gsSUFBUDtBQUNEO0FBcEx5QixDQUE1Qjs7ZUF5TGV1SCxROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM1BSLElBQU1xRixjQUFjLFNBQWRBLFdBQWMsQ0FBQ2pILE1BQUQsRUFBYy9JLEdBQWQsRUFBMkI7QUFDcEQsTUFBSUEsR0FBSixFQUFTO0FBQ1BJLFdBQU9PLElBQVAsQ0FBWVgsR0FBWixFQUFpQnFCLE9BQWpCLENBQXlCLFVBQUM2RSxHQUFELEVBQVM7QUFDaEMsVUFBSSxDQUFDNkMsT0FBTzdDLEdBQVAsQ0FBRCxJQUFnQjZDLE9BQU83QyxHQUFQLE1BQWdCLEVBQXBDLEVBQXdDO0FBQ3RDNkMsZUFBTzdDLEdBQVAsSUFBY2xHLElBQUlrRyxHQUFKLENBQWQ7QUFDRDtBQUNGLEtBSkQ7QUFLRDs7QUFDRCxTQUFPNkMsTUFBUDtBQUNELENBVE0sQyxDQVdQOzs7OztBQUNPLElBQU1rSCxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsR0FBRCxFQUFpQjtBQUNyQyxNQUFJO0FBQ0YsUUFBTUMsTUFBTXpCLEtBQUt2QixLQUFMLENBQVcrQyxHQUFYLENBQVo7QUFDQSxXQUFRQyxlQUFlM08sS0FBZixJQUF3QjJPLGVBQWUvUCxNQUF4QyxHQUFrRCxJQUFsRCxHQUF5RCxLQUFoRTtBQUNELEdBSEQsQ0FHRSxPQUFPME0sS0FBUCxFQUFjO0FBQ2QsV0FBTyxLQUFQO0FBQ0Q7QUFDRixDQVBNLEMsQ0FTUDs7Ozs7QUFDTyxJQUFNc0QsV0FBVyxTQUFYQSxRQUFXLENBQUNwUSxHQUFELEVBQWlCO0FBQ3ZDLFNBQU8sUUFBT0EsR0FBUCxNQUFlLFFBQWYsSUFBMkJBLFFBQVEsSUFBMUM7QUFDRCxDQUZNOzs7O0FBSUEsSUFBTXFRLFlBQVksU0FBWkEsU0FBWSxDQUFDL1AsS0FBRCxFQUFtQjtBQUMxQyxTQUFPQSxTQUFTLElBQVQsR0FBZ0JBLE1BQU1nUSxRQUFOLEVBQWhCLEdBQW1DMUssU0FBMUM7QUFDRCxDQUZNOzs7O0FBSUEsSUFBTTJLLFFBQVEsU0FBUkEsS0FBUSxDQUFDQyxDQUFELEVBQVk5TixFQUFaLEVBQStCO0FBQ2xELE9BQUssSUFBSWdGLElBQUksQ0FBYixFQUFnQkEsSUFBSThJLENBQXBCLEVBQXVCOUksR0FBdkIsRUFBNEI7QUFDMUJoRjtBQUNEO0FBQ0YsQ0FKTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJQOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBUUEsSUFBTStOLGFBQW9DO0FBQ3hDdE0sV0FBUyxpQkFBQ3VNLElBQUQsRUFBcUJwUSxLQUFyQixFQUF1QztBQUM5Q29RLFNBQUt6SyxJQUFMLEdBQWEzRixTQUFTLElBQVYsR0FBa0JBLEtBQWxCLEdBQTBCLEVBQXRDO0FBQ0Q7QUFIdUMsQ0FBMUM7QUFNQSxJQUFNcVEsb0JBQW9CLDhEQUExQjs7QUFFQSxJQUFNQyxZQUFZLFNBQVpBLFNBQVksQ0FBQ3hOLElBQUQsRUFBYXNOLElBQWIsRUFBb0M7QUFDcEQsTUFBSXBNLFFBQWdCLEtBQXBCLENBRG9ELENBR3BEOztBQUNBb00sU0FBU0EsSUFBVDs7QUFDQSxNQUFJQSxLQUFLRyxRQUFMLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLFFBQUcsQ0FBQ0gsS0FBS3pLLElBQVQsRUFBZTtBQUNiLFlBQU0sSUFBSXZDLEtBQUosQ0FBVSxrQkFBVixDQUFOO0FBQ0Q7O0FBQ0QsUUFBSTBKLFNBQVMsNEJBQWNzRCxLQUFLekssSUFBbkIsRUFBeUIwRSxtQkFBU2Msa0JBQWxDLENBQWI7O0FBRUEsUUFBSTJCLE1BQUosRUFBWTtBQUNWLFVBQUcsQ0FBQ3NELEtBQUtqTixVQUFULEVBQXFCO0FBQ25CLGNBQU0sSUFBSUMsS0FBSixDQUFVLHlCQUFWLENBQU47QUFDRDs7QUFDRCxXQUFLLElBQUlnRSxJQUFJLENBQWIsRUFBZ0JBLElBQUkwRixPQUFPeE0sTUFBM0IsRUFBbUM4RyxHQUFuQyxFQUF3QztBQUN0QyxZQUFJZ0IsUUFBUTBFLE9BQU8xRixDQUFQLENBQVo7QUFDQSxZQUFJbkIsT0FBT2hDLFNBQVN1TSxjQUFULENBQXdCcEksTUFBTXBJLEtBQTlCLENBQVg7QUFDQW9RLGFBQUtqTixVQUFMLENBQWdCRSxZQUFoQixDQUE2QjRDLElBQTdCLEVBQW1DbUssSUFBbkM7O0FBQ0EsWUFBSWhJLE1BQU1qRSxJQUFOLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEJyQixlQUFLMk4sWUFBTCxDQUFrQnhLLElBQWxCLEVBQXdCLElBQXhCLEVBQThCbUMsTUFBTXBJLEtBQXBDLEVBQTJDbVEsVUFBM0MsRUFBdUQsSUFBdkQ7QUFDRDtBQUNGOztBQUNEQyxXQUFLak4sVUFBTCxDQUFnQmtCLFdBQWhCLENBQTRCK0wsSUFBNUI7QUFDRDs7QUFDRHBNLFlBQVEsSUFBUjtBQUNELEdBckJELE1BcUJPLElBQUlvTSxLQUFLRyxRQUFMLEtBQWtCLENBQXRCLEVBQXlCO0FBQzlCdk0sWUFBUWxCLEtBQUs0TixRQUFMLENBQWNOLElBQWQsQ0FBUjtBQUNEOztBQUVELE1BQUksQ0FBQ3BNLEtBQUwsRUFBWTtBQUNWLFFBQUdvTSxLQUFLM0UsVUFBUixFQUFvQjtBQUNsQixXQUFLLElBQUlyRSxLQUFJLENBQWIsRUFBZ0JBLEtBQUlnSixLQUFLM0UsVUFBTCxDQUFnQm5MLE1BQXBDLEVBQTRDOEcsSUFBNUMsRUFBaUQ7QUFDL0NrSixrQkFBVXhOLElBQVYsRUFBaUJzTixLQUFLM0UsVUFBTCxDQUFnQnJFLEVBQWhCLENBQWpCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsQ0FyQ0Q7O0FBdUNBLElBQU11SixvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxDQUFELEVBQWFDLENBQWIsRUFBNEI7QUFDcEQsTUFBSUMsWUFBWUYsRUFBRTVJLE1BQUYsR0FBYTRJLEVBQUU1SSxNQUFILENBQWlDeEUsUUFBakMsSUFBNkMsQ0FBekQsR0FBOEQsQ0FBOUU7QUFDQSxNQUFJdU4sWUFBWUYsRUFBRTdJLE1BQUYsR0FBYTZJLEVBQUU3SSxNQUFILENBQWlDeEUsUUFBakMsSUFBNkMsQ0FBekQsR0FBOEQsQ0FBOUU7QUFDQSxTQUFPdU4sWUFBWUQsU0FBbkI7QUFDRCxDQUpEO0FBTUE7Ozs7O0lBR2EvTixJOzs7QUFRWDs7Ozs7Ozs7QUFRQSxnQkFBWWtDLEdBQVosRUFBc0R4QyxNQUF0RCxFQUFtRU8sT0FBbkUsRUFBMEY7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSxzQ0FYcEUsRUFXb0U7O0FBQUEsMkNBVjdELElBVTZEOztBQUN4RixRQUFJaUMsZUFBZS9ELEtBQW5CLEVBQTBCO0FBQ3hCLFdBQUsrRCxHQUFMLEdBQVdBLEdBQVg7QUFDRCxLQUZELE1BRU87QUFDTCxXQUFLQSxHQUFMLEdBQVksQ0FBQ0EsR0FBRCxDQUFaO0FBQ0Q7O0FBQ0QsU0FBS3hDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtPLE9BQUwsR0FBZUEsT0FBZjtBQUVBLFNBQUtnTyxLQUFMO0FBQ0Q7Ozs7aUNBaUJtQlosSSxFQUEwQmpNLEksRUFBcUI2RSxXLEVBQXFCaEIsTSxFQUFxQnBILEksRUFBdUI7QUFDbEksVUFBTXVMLG9CQUFvQnBKLEtBQUtxSixnQkFBTCxDQUFzQnBELFdBQXRCLENBQTFCO0FBQ0EsVUFBTTNILFVBQVU4SyxrQkFBa0I5SyxPQUFsQztBQUNBLFVBQU1nTCxRQUFRRixrQkFBa0JFLEtBQWhDO0FBQ0EsV0FBSzVHLFFBQUwsQ0FBY2pFLElBQWQsQ0FBbUIsSUFBSXVHLGdCQUFKLENBQWEsSUFBYixFQUE2QnFJLElBQTdCLEVBQW1Eak0sSUFBbkQsRUFBeUQ5QyxPQUF6RCxFQUFrRTJHLE1BQWxFLEVBQTBFcEgsSUFBMUUsRUFBZ0Z5TCxLQUFoRixDQUFuQjtBQUNELEssQ0FFRDtBQUNBOzs7OzRCQUNRO0FBQ04sV0FBSzVHLFFBQUwsR0FBZ0IsRUFBaEI7QUFFQSxVQUFJd0wsV0FBVyxLQUFLaE0sR0FBcEI7QUFBQSxVQUF5Qm1DLENBQXpCO0FBQUEsVUFBNEJ3RSxHQUE1Qjs7QUFDQSxXQUFLeEUsSUFBSSxDQUFKLEVBQU93RSxNQUFNcUYsU0FBUzNRLE1BQTNCLEVBQW1DOEcsSUFBSXdFLEdBQXZDLEVBQTRDeEUsR0FBNUMsRUFBaUQ7QUFDL0NrSixrQkFBVSxJQUFWLEVBQWlCVyxTQUFTN0osQ0FBVCxDQUFqQjtBQUNEOztBQUVELFdBQUszQixRQUFMLENBQWN5TCxJQUFkLENBQW1CUCxpQkFBbkI7QUFDRDs7OzZCQUVRUCxJLEVBQTZCO0FBQ3BDLFVBQUlwRSxnQkFBZ0IzQixtQkFBU0MsV0FBN0I7QUFDQSxVQUFJdEcsUUFBUW9NLEtBQUs1SyxRQUFMLEtBQWtCLFFBQWxCLElBQThCNEssS0FBSzVLLFFBQUwsS0FBa0IsT0FBNUQ7QUFDQSxVQUFJcUcsYUFBYXVFLEtBQUt2RSxVQUF0QjtBQUNBLFVBQUlzRixZQUFZLEVBQWhCO0FBQ0EsVUFBSTVCLGNBQWMsS0FBS3ZNLE9BQUwsQ0FBYXVNLFdBQS9CO0FBQ0EsVUFBSXBMLElBQUosRUFBVTZELE1BQVYsRUFBa0JvSixVQUFsQixFQUE4QnhRLElBQTlCOztBQUdBLFdBQUssSUFBSXdHLElBQUksQ0FBUixFQUFXd0UsTUFBTUMsV0FBV3ZMLE1BQWpDLEVBQXlDOEcsSUFBSXdFLEdBQTdDLEVBQWtEeEUsR0FBbEQsRUFBdUQ7QUFDckQsWUFBSTBFLFlBQVlELFdBQVd6RSxDQUFYLENBQWhCLENBRHFELENBRXJEOztBQUNBLFlBQUkwRSxVQUFVQyxJQUFWLENBQWV4SyxPQUFmLENBQXVCeUssYUFBdkIsTUFBMEMsQ0FBOUMsRUFBaUQ7QUFDL0M3SCxpQkFBTzJILFVBQVVDLElBQVYsQ0FBZVAsS0FBZixDQUFxQlEsY0FBYzFMLE1BQW5DLENBQVA7QUFDQTBILG1CQUFTLEtBQUtoRixPQUFMLENBQWFNLE9BQWIsQ0FBcUJhLElBQXJCLENBQVQ7QUFDQXZELGlCQUFPLEVBQVA7O0FBRUEsY0FBSSxDQUFDb0gsTUFBTCxFQUFhO0FBQ1gsaUJBQUssSUFBSWhILElBQUksQ0FBYixFQUFnQkEsSUFBSXVPLFlBQVlqUCxNQUFoQyxFQUF3Q1UsR0FBeEMsRUFBNkM7QUFDM0NvUSwyQkFBYTdCLFlBQVl2TyxDQUFaLENBQWI7O0FBQ0Esa0JBQUltRCxLQUFLcUgsS0FBTCxDQUFXLENBQVgsRUFBYzRGLFdBQVc5USxNQUFYLEdBQW9CLENBQWxDLE1BQXlDOFEsV0FBVzVGLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBQyxDQUFyQixDQUE3QyxFQUFzRTtBQUNwRXhELHlCQUFTLEtBQUtoRixPQUFMLENBQWFNLE9BQWIsQ0FBcUI4TixVQUFyQixDQUFUO0FBQ0F4USxxQkFBS1ksSUFBTCxDQUFVMkMsS0FBS3FILEtBQUwsQ0FBVzRGLFdBQVc5USxNQUFYLEdBQW9CLENBQS9CLENBQVY7QUFDQTtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxjQUFJLENBQUMwSCxNQUFMLEVBQWE7QUFDWEEscUJBQVNxQyxtQkFBU3lFLGNBQWxCO0FBQ0Q7O0FBRUQsY0FBSzlHLE1BQUQsQ0FBK0JoRSxLQUFuQyxFQUEwQztBQUN4QyxpQkFBS3lNLFlBQUwsQ0FBa0JMLElBQWxCLEVBQXdCak0sSUFBeEIsRUFBOEIySCxVQUFVOUwsS0FBeEMsRUFBK0NnSSxNQUEvQyxFQUF1RHBILElBQXZEO0FBQ0F3UCxpQkFBS3JCLGVBQUwsQ0FBcUJqRCxVQUFVQyxJQUEvQjtBQUNBLG1CQUFPLElBQVA7QUFDRDs7QUFFRG9GLG9CQUFVM1AsSUFBVixDQUFlO0FBQUM2UCxrQkFBTXZGLFNBQVA7QUFBa0I5RCxvQkFBUUEsTUFBMUI7QUFBa0M3RCxrQkFBTUEsSUFBeEM7QUFBOEN2RCxrQkFBTUE7QUFBcEQsV0FBZjtBQUNEO0FBQ0Y7O0FBRUQsV0FBSyxJQUFJd0csTUFBSSxDQUFiLEVBQWdCQSxNQUFJK0osVUFBVTdRLE1BQTlCLEVBQXNDOEcsS0FBdEMsRUFBMkM7QUFDekMsWUFBSWtLLFdBQVdILFVBQVUvSixHQUFWLENBQWY7QUFDQSxhQUFLcUosWUFBTCxDQUFrQkwsSUFBbEIsRUFBd0JrQixTQUFTbk4sSUFBakMsRUFBdUNtTixTQUFTRCxJQUFULENBQWNyUixLQUFyRCxFQUE0RHNSLFNBQVN0SixNQUFyRSxFQUE2RXNKLFNBQVMxUSxJQUF0RjtBQUNBd1AsYUFBS3JCLGVBQUwsQ0FBcUJ1QyxTQUFTRCxJQUFULENBQWN0RixJQUFuQztBQUNELE9BOUNtQyxDQWdEcEM7OztBQUNBLFVBQUksQ0FBQy9ILEtBQUwsRUFBWTtBQUNWRyxlQUFPaU0sS0FBSzVLLFFBQUwsQ0FBYytMLFdBQWQsRUFBUDs7QUFFQSxZQUFJLEtBQUt2TyxPQUFMLENBQWF3SCxVQUFiLENBQXdCckcsSUFBeEIsS0FBaUMsQ0FBQ2lNLEtBQUt6RSxNQUEzQyxFQUFtRDtBQUNqRCxlQUFLbEcsUUFBTCxDQUFjakUsSUFBZCxDQUFtQixJQUFJNEksa0NBQUosQ0FBc0IsSUFBdEIsRUFBcUNnRyxJQUFyQyxFQUEyQ2pNLElBQTNDLENBQW5CO0FBQ0FILGtCQUFRLElBQVI7QUFDRDtBQUNGOztBQUVELGFBQU9BLEtBQVA7QUFDRCxLLENBRUQ7Ozs7MkJBQ087QUFDTCxXQUFLeUIsUUFBTCxDQUFjMUUsT0FBZCxDQUFzQixtQkFBVztBQUMvQnlCLGdCQUFRUyxJQUFSO0FBQ0QsT0FGRDtBQUdELEssQ0FFRDs7Ozs2QkFDUztBQUNQLFVBQUcvQixNQUFNc0QsT0FBTixDQUFjLEtBQUtpQixRQUFuQixDQUFILEVBQWlDO0FBQy9CLGFBQUtBLFFBQUwsQ0FBYzFFLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0J5QixrQkFBUW1CLE1BQVI7QUFDRCxTQUZEO0FBR0Q7O0FBQ0QsVUFBRyxLQUFLZ0gsYUFBUixFQUF1QjtBQUNyQixhQUFLQSxhQUFMLENBQW1CaEgsTUFBbkI7QUFDRDtBQUNGLEssQ0FFRDs7OzsyQkFDTztBQUNMLFdBQUs4QixRQUFMLENBQWMxRSxPQUFkLENBQXNCLG1CQUFXO0FBQy9CeUIsZ0JBQVFwQixJQUFSO0FBQ0QsT0FGRDtBQUdELEssQ0FFRDs7Ozs4QkFDVTtBQUNSLFdBQUtxRSxRQUFMLENBQWMxRSxPQUFkLENBQXNCLG1CQUFXO0FBQy9CLFlBQUl5QixRQUFRd0YsTUFBUixJQUFtQnhGLFFBQVF3RixNQUFULENBQXVDcEIsU0FBN0QsRUFBd0U7QUFDdEVwRSxrQkFBUXNFLE9BQVI7QUFDRDtBQUNGLE9BSkQ7QUFLRCxLLENBRUQ7Ozs7NkJBQ3lCO0FBQUE7O0FBQUEsVUFBbEJyRSxNQUFrQix1RUFBSixFQUFJO0FBQ3ZCM0MsYUFBT08sSUFBUCxDQUFZb0MsTUFBWixFQUFvQjFCLE9BQXBCLENBQTRCLGVBQU87QUFDakMsY0FBSzBCLE1BQUwsQ0FBWW1ELEdBQVosSUFBbUJuRCxPQUFPbUQsR0FBUCxDQUFuQjtBQUNELE9BRkQ7QUFJQSxXQUFLSCxRQUFMLENBQWMxRSxPQUFkLENBQXNCLG1CQUFXO0FBQy9CLFlBQUl5QixRQUFRa0QsTUFBWixFQUFvQjtBQUNsQmxELGtCQUFRa0QsTUFBUixDQUFlakQsTUFBZjtBQUNEO0FBQ0YsT0FKRDtBQUtEOzs7cUNBOUk4QnVHLFcsRUFBcUI7QUFDbEQsVUFBSXdJLFVBQVV4SSxZQUFZQyxLQUFaLENBQWtCb0gsaUJBQWxCLENBQWQ7O0FBQ0EsVUFBR21CLFlBQVksSUFBZixFQUFxQjtBQUNuQixjQUFNLElBQUlwTyxLQUFKLENBQVUsWUFBVixDQUFOO0FBQ0Q7O0FBQ0QsVUFBSWlKLFFBQVFtRixRQUFROVEsR0FBUixDQUFZLFVBQUNrUCxHQUFELEVBQWlCO0FBQ3ZDLGVBQU9BLElBQUk1SixJQUFKLEVBQVA7QUFDRCxPQUZXLENBQVo7QUFHQSxVQUFJM0UsVUFBVWdMLE1BQU1uRCxLQUFOLE1BQWlCLElBQS9CO0FBQ0EsYUFBTztBQUNMN0gsd0JBREs7QUFFTGdMO0FBRkssT0FBUDtBQUlEIiwiZmlsZSI6InRpbnliaW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3RpbnliaW5kLnRzXCIpO1xuIiwiaW1wb3J0IHsgSU9ic2VydmVyU3luY0NhbGxiYWNrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5cbi8vIFRoZSBkZWZhdWx0IGAuYCBhZGFwdGVyIHRoYXQgY29tZXMgd2l0aCB0aW55YmluZC5qcy4gQWxsb3dzIHN1YnNjcmliaW5nIHRvXG4vLyBwcm9wZXJ0aWVzIG9uIHBsYWluIG9iamVjdHMsIGltcGxlbWVudGVkIGluIEVTNSBuYXRpdmVzIHVzaW5nXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YC5cblxuY29uc3QgQVJSQVlfTUVUSE9EUyA9IFtcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJyxcbiAgJ3NwbGljZSdcbl07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlZiB7XG4gIGNhbGxiYWNrczogYW55W107XG4gIHBvaW50ZXJzOiBhbnlbXTtcbn1cblxuLyoqXG4gKiBUT0RPIEZvciB3aGF0IGlzIHRoaXM/XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVJWQXJyYXkgZXh0ZW5kcyBBcnJheTxhbnk+IHtcbiAgX19ydjogYW55O1xufVxuXG5leHBvcnQgdHlwZSBBZGFwdGVyRnVuY3Rpb24gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBJQWRhcHRlciB7XG4gIGNvdW50ZXI6IG51bWJlcjtcbiAgd2Vha21hcDogYW55O1xuICB3ZWFrUmVmZXJlbmNlOiAob2JqOiBhbnkpID0+IGFueTsgLy8gPT4gX19ydiA/XG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlOiAocmVmOiBJUmVmLCBpZDogbnVtYmVyKSA9PiB2b2lkO1xuICBzdHViRnVuY3Rpb246IChvYmo6IGFueSwgZm46IHN0cmluZykgPT4gYW55IC8vID0+IHJlc3BvbnNlID9cbiAgb2JzZXJ2ZU11dGF0aW9uczogKG9iajogYW55LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICB1bm9ic2VydmVNdXRhdGlvbnM6IChvYmo6IElSVkFycmF5LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICBvYnNlcnZlOiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4gdm9pZDsgXG4gIHVub2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHZvaWQ7XG4gIGdldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcpID0+IGFueTtcbiAgc2V0OiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQWRhcHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUFkYXB0ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGFwdGVyIGltcGxlbWVudHMgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXIgPSAwO1xuICB3ZWFrbWFwOmFueSA9IHt9O1xuXG4gIHdlYWtSZWZlcmVuY2Uob2JqOiBhbnkpIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eSgnX19ydicpKSB7XG4gICAgICBsZXQgaWQgPSB0aGlzLmNvdW50ZXIrKztcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19fcnYnLCB7XG4gICAgICAgIHZhbHVlOiBpZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndlYWttYXBbb2JqLl9fcnZdKSB7XG4gICAgICB0aGlzLndlYWttYXBbb2JqLl9fcnZdID0ge1xuICAgICAgICBjYWxsYmFja3M6IHt9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuICB9XG5cbiAgY2xlYW51cFdlYWtSZWZlcmVuY2UocmVmOiBJUmVmLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKCFPYmplY3Qua2V5cyhyZWYuY2FsbGJhY2tzKS5sZW5ndGgpIHtcbiAgICAgIGlmICghKHJlZi5wb2ludGVycyAmJiBPYmplY3Qua2V5cyhyZWYucG9pbnRlcnMpLmxlbmd0aCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMud2Vha21hcFtpZF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3R1YkZ1bmN0aW9uKG9iajogYW55LCBmbjogc3RyaW5nKSB7XG4gICAgbGV0IG9yaWdpbmFsID0gb2JqW2ZuXTtcbiAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG4gICAgbGV0IHdlYWttYXAgPSB0aGlzLndlYWttYXA7XG5cbiAgICBvYmpbZm5dID0gKC4uLmFyZ3M6IGFueVtdKTogQWRhcHRlckZ1bmN0aW9uID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IG9yaWdpbmFsLmFwcGx5KG9iaiwgYXJncyk7XG5cbiAgICAgIE9iamVjdC5rZXlzKG1hcC5wb2ludGVycykuZm9yRWFjaChyID0+IHtcbiAgICAgICAgbGV0IGsgPSBtYXAucG9pbnRlcnNbcl07XG5cbiAgICAgICAgaWYgKHdlYWttYXBbcl0pIHtcbiAgICAgICAgICBpZiAod2Vha21hcFtyXS5jYWxsYmFja3Nba10gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgd2Vha21hcFtyXS5jYWxsYmFja3Nba10uZm9yRWFjaCgoY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjay5zeW5jKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcbiAgfVxuXG4gIG9ic2VydmVNdXRhdGlvbnMob2JqOiBhbnksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcblxuICAgICAgaWYgKCFtYXAucG9pbnRlcnMpIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzID0ge307XG5cbiAgICAgICAgQVJSQVlfTUVUSE9EUy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICB0aGlzLnN0dWJGdW5jdGlvbihvYmosIGZuKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzW3JlZl0pIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzW3JlZl0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcC5wb2ludGVyc1tyZWZdLmluZGV4T2Yoa2V5cGF0aCkgPT09IC0xKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdLnB1c2goa2V5cGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdW5vYnNlcnZlTXV0YXRpb25zKG9iajogSVJWQXJyYXksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEFycmF5KSAmJiAob2JqLl9fcnYgIT0gbnVsbCkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICBpZiAobWFwKSB7XG4gICAgICAgIGxldCBwb2ludGVycyA9IG1hcC5wb2ludGVyc1tyZWZdO1xuXG4gICAgICAgIGlmIChwb2ludGVycykge1xuICAgICAgICAgIGxldCBpZHggPSBwb2ludGVycy5pbmRleE9mKGtleXBhdGgpO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICBwb2ludGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5wb2ludGVyc1tyZWZdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY2xlYW51cFdlYWtSZWZlcmVuY2UobWFwLCBvYmouX19ydik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvYnNlcnZlKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spIHtcbiAgICB2YXIgdmFsdWU6IGFueTtcbiAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaikuY2FsbGJhY2tzO1xuXG4gICAgaWYgKCFjYWxsYmFja3Nba2V5cGF0aF0pIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXSA9IFtdO1xuICAgICAgbGV0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5cGF0aCk7XG5cbiAgICAgIGlmICghZGVzYyB8fCAhKGRlc2MuZ2V0IHx8IGRlc2Muc2V0IHx8ICFkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgICAgdmFsdWUgPSBvYmpba2V5cGF0aF07XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5cGF0aCwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMudW5vYnNlcnZlTXV0YXRpb25zKHZhbHVlLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICAgICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKChjYjogSU9ic2VydmVyU3luY0NhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNiLnN5bmMoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU11dGF0aW9ucyhuZXdWYWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2tzW2tleXBhdGhdLmluZGV4T2YoY2FsbGJhY2spID09PSAtMSkge1xuICAgICAgY2FsbGJhY2tzW2tleXBhdGhdLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHRoaXMub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgfVxuXG4gIHVub2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBsZXQgaWR4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuXG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgICAgIGlmICghY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG4gICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG9ialtrZXlwYXRoXTtcbiAgfVxuXG4gIHNldChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgb2JqW2tleXBhdGhdID0gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IGFkYXB0ZXIgPSBuZXcgQWRhcHRlcigpO1xuZXhwb3J0IHsgYWRhcHRlciB9XG4vLyBleHBvcnQgZGVmYXVsdCBhZGFwdGVyO1xuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IHRpbWVzLCBnZXRTdHJpbmcgfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBPbmUgd2F5IGJpbmRlciBpbnRlcmZhY2VcbiAqL1xuZXhwb3J0IHR5cGUgSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+ID0gKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKSA9PiB2b2lkO1xuXG4vKipcbiAqIFRvIHdheSBiaW5kZXIgaW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+IHtcbiAgcm91dGluZTogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKSA9PiB2b2lkO1xuICBiaW5kPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICB1bmJpbmQ/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIHVwZGF0ZT86ICh0aGlzOiBCaW5kaW5nLCBtb2RlbDogYW55KSA9PiB2b2lkO1xuICBnZXRWYWx1ZT86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgYmxvY2s/OiBib29sZWFuO1xuICBmdW5jdGlvbj86IGJvb2xlYW47XG4gIHB1Ymxpc2hlcz86IGJvb2xlYW47XG4gIHByaW9yaXR5PzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgeW91IHdhbnQgdG8gc2F2ZSBjdXN0b20gZGF0YSBpbiB0aGlzIHVzZSB0aGlzIG9iamVjdFxuICAgKi9cbiAgY3VzdG9tRGF0YT86IGFueTtcbn1cblxuLyoqXG4gKiBBIGJpbmRlciBjYW4gYmUgYSBvbmUgd2F5IGJpbmRlciBvciBhIHR3byB3YXkgYmluZGVyXG4gKi9cbmV4cG9ydCB0eXBlIEJpbmRlcjxWYWx1ZVR5cGU+ID0gSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+IHwgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+XG5cbi8qKlxuICogQSBsaXN0IG9mIGJpbmRlcnMgd2l0aCBhbnkga2V5IG5hbWVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQmluZGVyczxWYWx1ZVR5cGU+IHtcbiAgW25hbWU6IHN0cmluZ106IEJpbmRlcjxWYWx1ZVR5cGU+O1xufVxuXG5jb25zdCBjcmVhdGVWaWV3ID0gKGJpbmRpbmc6IEJpbmRpbmcsIG1vZGVsczogYW55LCBhbmNob3JFbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgbnVsbCkgPT4ge1xuICBsZXQgdGVtcGxhdGUgPSBiaW5kaW5nLmVsLmNsb25lTm9kZSh0cnVlKTtcbiAgbGV0IHZpZXcgPSBuZXcgVmlldygodGVtcGxhdGUgYXMgTm9kZSksIG1vZGVscywgYmluZGluZy52aWV3Lm9wdGlvbnMpO1xuICB2aWV3LmJpbmQoKTtcbiAgaWYoIWJpbmRpbmcgfHwgIWJpbmRpbmcubWFya2VyIHx8IGJpbmRpbmcubWFya2VyLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIGZvciBiaW5kaW5nIScpO1xuICB9XG5cbiAgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGVtcGxhdGUsIGFuY2hvckVsKTtcblxuICByZXR1cm4gdmlldztcbn1cblxuY29uc3QgYmluZGVyczogSUJpbmRlcnM8YW55PiA9IHtcbiAgLy8gQmluZHMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgZWxlbWVudC5cbiAgJ29uLSonOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgZnVuY3Rpb246IHRydWUsXG4gICAgcHJpb3JpdHk6IDEwMDAsXG5cbiAgICBiaW5kKGVsKSB7XG4gICAgICBpZighdGhpcy5jdXN0b21EYXRhKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHtcbiAgICAgICAgICBoYW5kbGVyOiBudWxsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaGFuZGxlcikge1xuICAgICAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSAvKlRPRE8qLykge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIgPSB0aGlzLmV2ZW50SGFuZGxlcih2YWx1ZSk7XG4gICAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgIH1cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEuaGFuZGxlcik7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFwcGVuZHMgYm91bmQgaW5zdGFuY2VzIG9mIHRoZSBlbGVtZW50IGluIHBsYWNlIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5LlxuICAnZWFjaC0qJzogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIGJsb2NrOiB0cnVlLFxuXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKCF0aGlzLm1hcmtlcikge1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoYCB0aW55YmluZDogJHt0aGlzLnR5cGV9IGApO1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEgPSB7XG4gICAgICAgICAgaXRlcmF0ZWQ6IDxWaWV3W10+IFtdXG4gICAgICAgIH07XG4gICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBwYXJlbnQgbm9kZSEnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSAgPT4ge1xuICAgICAgICAgIHZpZXcuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSA9PiB7XG4gICAgICAgICAgdmlldy51bmJpbmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWwsIGNvbGxlY3Rpb24pIHtcbiAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgbGV0IG1vZGVsTmFtZSA9IHRoaXMuYXJnc1swXTtcbiAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uIHx8IFtdO1xuXG4gICAgICAvLyBUT0RPIHN1cHBvcnQgb2JqZWN0IGtleXMgdG8gaXRlcmF0ZSBvdmVyXG4gICAgICBpZighQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VhY2gtJyArIG1vZGVsTmFtZSArICcgbmVlZHMgYW4gYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLCBidXQgaXQgaXMnKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgaW5kZXggbmFtZSBpcyBzZXRlZCBieSBgaW5kZXgtcHJvcGVydHlgIHVzZSB0aGlzIG5hbWUsIG90aGVyd2lzZSBgJVttb2RlbE5hbWVdJWAgIFxuICAgICAgbGV0IGluZGV4UHJvcCA9IGVsLmdldEF0dHJpYnV0ZSgnaW5kZXgtcHJvcGVydHknKSB8fCB0aGlzLmdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZSk7XG5cbiAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgobW9kZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBzY29wZTogYW55ID0geyRwYXJlbnQ6IHRoaXMudmlldy5tb2RlbHN9O1xuICAgICAgICBzY29wZVtpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgIHNjb3BlW21vZGVsTmFtZV0gPSBtb2RlbDtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbaW5kZXhdO1xuXG4gICAgICAgIGlmICghdmlldykge1xuICAgICAgICAgIGxldCBwcmV2aW91czogQ29tbWVudCB8IEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkW3RoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSAxXS5lbHNbMF07XG4gICAgICAgICAgfSBlbHNlIGlmKHRoaXMubWFya2VyKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHRoaXMubWFya2VyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlldyA9IGNyZWF0ZVZpZXcodGhpcywgc2NvcGUsIHByZXZpb3VzLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQucHVzaCh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldy5tb2RlbHNbbW9kZWxOYW1lXSAhPT0gbW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgbW9kZWxcbiAgICAgICAgICAgIGxldCBtYXRjaEluZGV4LCBuZXh0VmlldztcbiAgICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IGluZGV4ICsgMTsgbmV4dEluZGV4IDwgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWaWV3Lm1vZGVsc1ttb2RlbE5hbWVdID09PSBtb2RlbCkge1xuICAgICAgICAgICAgICAgIG1hdGNoSW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gbW9kZWwgaXMgaW4gb3RoZXIgcG9zaXRpb25cbiAgICAgICAgICAgICAgLy8gdG9kbzogY29uc2lkZXIgYXZvaWRpbmcgdGhlIHNwbGljZSBoZXJlIGJ5IHNldHRpbmcgYSBmbGFnXG4gICAgICAgICAgICAgIC8vIHByb2ZpbGUgcGVyZm9ybWFuY2UgYmVmb3JlIGltcGxlbWVudGluZyBzdWNoIGNoYW5nZVxuICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKG1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXh0Vmlldy5lbHNbMF0sIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgICAgbmV4dFZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vbmV3IG1vZGVsXG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gY3JlYXRlVmlldyh0aGlzLCBzY29wZSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnNwbGljZShpbmRleCwgMCwgbmV4dFZpZXcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3Lm1vZGVsc1tpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggPiBjb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICB0aW1lcyh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoIC0gY29sbGVjdGlvbi5sZW5ndGgsICgpID0+IHtcbiAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5wb3AoKTtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodmlldy5lbHNbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09PSAnT1BUSU9OJyAmJiB0aGlzLnZpZXcuYmluZGluZ3MpIHtcbiAgICAgICAgdGhpcy52aWV3LmJpbmRpbmdzLmZvckVhY2goKGJpbmRpbmc6IEJpbmRpbmcpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5tYXJrZXIgJiYgKGJpbmRpbmcuZWwgPT09IHRoaXMubWFya2VyLnBhcmVudE5vZGUpICYmIChiaW5kaW5nLnR5cGUgPT09ICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUobW9kZWxzKSB7XG4gICAgICBsZXQgZGF0YTogYW55ID0ge307XG5cbiAgICAgIC8vdG9kbzogYWRkIHRlc3QgYW5kIGZpeCBpZiBuZWNlc3NhcnlcblxuICAgICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSAhPT0gdGhpcy5hcmdzWzBdKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gbW9kZWxzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuZm9yRWFjaCgodmlldzogVmlldykgPT4ge1xuICAgICAgICB2aWV3LnVwZGF0ZShkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGNsYXNzIGZyb20gdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIGZhbHNlLlxuICAnY2xhc3MtKic6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgbGV0IGVsQ2xhc3MgPSBgICR7ZWwuY2xhc3NOYW1lfSBgO1xuICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9PSAoZWxDbGFzcy5pbmRleE9mKGAgJHt0aGlzLmFyZ3NbMF19IGApID4gLTEpKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gYCR7ZWwuY2xhc3NOYW1lfSAke3RoaXMuYXJnc1swXX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWxDbGFzcy5yZXBsYWNlKGAgJHt0aGlzLmFyZ3NbMF19IGAsICcgJykudHJpbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgdGV4dCB2YWx1ZS5cbiAgdGV4dDogPElPbmVXYXlCaW5kZXI8c3RyaW5nPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgSFRNTCBjb250ZW50LlxuICBodG1sOiA8SU9uZVdheUJpbmRlcjxzdHJpbmc+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvLyBTaG93cyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIHNob3c6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSc7XG4gIH0sXG5cbiAgLy8gSGlkZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYHNob3dgIGJpbmRlcikuXG4gIGhpZGU6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gIH0sXG5cbiAgLy8gRW5hYmxlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIGVuYWJsZWQ6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEJ1dHRvbkVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuZGlzYWJsZWQgPSAhdmFsdWU7XG4gIH0sXG5cbiAgLy8gRGlzYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYGVuYWJsZWRgIGJpbmRlcikuXG4gIGRpc2FibGVkOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxCdXR0b25FbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLmRpc2FibGVkID0gISF2YWx1ZTtcbiAgfSxcblxuICAvLyBDaGVja3MgYSBjaGVja2JveCBvciByYWRpbyBpbnB1dCB3aGVuIHRoZSB2YWx1ZSBpcyB0cnVlLiBBbHNvIHNldHMgdGhlIG1vZGVsXG4gIC8vIHByb3BlcnR5IHdoZW4gdGhlIGlucHV0IGlzIGNoZWNrZWQgb3IgdW5jaGVja2VkICh0d28td2F5IGJpbmRlcikuXG4gIGNoZWNrZWQ6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBwdWJsaXNoZXM6IHRydWUsXG4gICAgcHJpb3JpdHk6IDIwMDAsXG5cbiAgICBiaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjaykge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWUpIHtcbiAgICAgIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSBnZXRTdHJpbmcoZWwudmFsdWUpID09PSBnZXRTdHJpbmcodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyB2YWx1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbCBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBjaGFuZ2VzXG4gIC8vICh0d28td2F5IGJpbmRlcikuXG4gIHZhbHVlOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAzMDAwLFxuXG4gICAgYmluZChlbDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICB0aGlzLmN1c3RvbURhdGEuaXNSYWRpbyA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWwudHlwZSA9PT0gJ3JhZGlvJztcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdldmVudC1uYW1lJykgfHwgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnID8gJ2NoYW5nZScgOiAnaW5wdXQnKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5wdWJsaXNoKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5jdXN0b21EYXRhLmV2ZW50LCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWwpIHtcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmN1c3RvbURhdGEuZXZlbnQsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEgJiYgdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJyAmJiBlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGVsW2ldO1xuICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB2YWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0U3RyaW5nKHZhbHVlKSAhPT0gZ2V0U3RyaW5nKGVsLnZhbHVlKSkge1xuICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gSW5zZXJ0cyBhbmQgYmluZHMgdGhlIGVsZW1lbnQgYW5kIGl0J3MgY2hpbGQgbm9kZXMgaW50byB0aGUgRE9NIHdoZW4gdHJ1ZS5cbiAgaWY6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBibG9jazogdHJ1ZSxcbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxVbmtub3duRWxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnIHRpbnliaW5kOiAnICsgdGhpcy50eXBlICsgJyAnICsgdGhpcy5rZXlwYXRoICsgJyAnKTtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy5jdXN0b21EYXRhLmJvdW5kID09PSBmYWxzZSAmJiAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC5iaW5kKCk7XG4gICAgICB9XG4gICAgICAgdGhpcy5jdXN0b21EYXRhLmJvdW5kID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdW5iaW5kKCkge1xuICAgICAgaWYgKCB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLnVuYmluZCgpO1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmJvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cbiAgICAgICAgICBpZiAoISB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCA9IG5ldyBWaWV3KGVsLCB0aGlzLnZpZXcubW9kZWxzLCB0aGlzLnZpZXcub3B0aW9ucyk7XG4gICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC5iaW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLm1hcmtlci5uZXh0U2libGluZyk7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZighZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUobW9kZWxzKSB7XG4gICAgICBpZiAoIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQudXBkYXRlKG1vZGVscyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBiaW5kZXJzIH07IiwiaW1wb3J0IHsgUFJJTUlUSVZFLCBLRVlQQVRILCBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIElPYnNlcnZlclN5bmNDYWxsYmFjayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgQmluZGVyLCBJT25lV2F5QmluZGVyLCBJVHdvV2F5QmluZGVyIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXJPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgW2tleTogc3RyaW5nXTogT2JzZXJ2ZXJcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBldmVudEhhbmRsZXJGdW5jdGlvbiA9IChldmVudDogRXZlbnQpID0+IHZvaWQ7XG5cbi8qKlxuICogVE9ETyBtb3ZlIHRvIHV0aWxzXG4gKiBAcGFyYW0gZWxcbiAqL1xuZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZShlbDogSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50KSB7XG4gIGxldCByZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgIHJldHVybiAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZDtcbiAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJykge1xuICAgIGxldCBvcHRpb25zOkhUTUxPcHRpb25zQ29sbGVjdGlvbiA9IChlbCBhcyBIVE1MU2VsZWN0RWxlbWVudCkub3B0aW9ucztcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1trZXldO1xuICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwudmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEZPUk1BVFRFUl9BUkdTID0gIC9bXlxccyddK3wnKFteJ118J1teXFxzXSkqJ3xcIihbXlwiXXxcIlteXFxzXSkqXCIvZztcbmV4cG9ydCBjb25zdCBGT1JNQVRURVJfU1BMSVQgPSAvXFxzKy87XG5cbi8qKlxuICogIEEgc2luZ2xlIGJpbmRpbmcgYmV0d2VlbiBhIG1vZGVsIGF0dHJpYnV0ZSBhbmQgYSBET00gZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmRpbmcge1xuICB2YWx1ZT86IGFueTtcbiAgb2JzZXJ2ZXI/OiBPYnNlcnZlcjtcbiAgdmlldzogVmlldztcbiAgZWw6IEhUTUxFbGVtZW50O1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgYmluZGVyIHdpdGhvdXQgdGhlIHByZWZpeFxuICAgKi9cbiAgdHlwZTogc3RyaW5nIHwgbnVsbDtcbiAgYmluZGVyOiBCaW5kZXI8YW55PiB8IG51bGw7XG4gIGZvcm1hdHRlcnM6IHN0cmluZ1tdIHwgbnVsbDtcbiAgZm9ybWF0dGVyT2JzZXJ2ZXJzOiBJRm9ybWF0dGVyT2JzZXJ2ZXJzO1xuICBrZXlwYXRoOiBzdHJpbmcgfCBudWxsO1xuICAvKipcbiAgICogQXJndW1lbnRzIHBhcnNlZCBmcm9tIHN0YXIgYmluZGVycywgZS5nLiBvbiBmb28tKi0qIGFyZ3NbMF0gaXMgdGhlIGZpcnN0IHN0YXIsIGFyZ3NbMV0gdGhlIHNlY29uZC1cbiAgICovXG4gIGFyZ3M6IHN0cmluZ1tdIHwgbnVsbDtcbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgbW9kZWw/OiBhbnk7XG4gIC8qKlxuICAgKiBIVE1MIENvbW1lbnQgdG8gbWFyayBhIGJpbmRpbmcgaW4gdGhlIERPTVxuICAgKi9cbiAgbWFya2VyPzogQ29tbWVudDtcbiAgLyoqXG4gICAqIFVzZWQgaW4gY29tcG9uZW50IGJpbmRpbmdzLiBUT0RPIGUuZy4gbW92ZSB0byBDb21wb25lbnRCaW5kaW5nIG9yIGJpbmRlcnM/XG4gICAqL1xuICBfYm91bmQ/OiBib29sZWFuO1xuICAvKipcbiAgICoganVzdCB0byBoYXZlIGEgdmFsdWUgd2hlcmUgd2UgY291bGQgc3RvcmUgY3VzdG9tIGRhdGFcbiAgICovXG4gIGN1c3RvbURhdGE/OiBhbnk7XG5cbiAgLyoqXG4gICAqIEFsbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYmluZGluZyBpcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3I7IHRoZVxuICAgKiBjb250YWluaW5nIHZpZXcsIHRoZSBET00gbm9kZSwgdGhlIHR5cGUgb2YgYmluZGluZywgdGhlIG1vZGVsIG9iamVjdCBhbmQgdGhlXG4gICAqIGtleXBhdGggYXQgd2hpY2ggdG8gbGlzdGVuIGZvciBjaGFuZ2VzLlxuICAgKiBAcGFyYW0geyp9IHZpZXcgXG4gICAqIEBwYXJhbSB7Kn0gZWwgXG4gICAqIEBwYXJhbSB7Kn0gdHlwZSBcbiAgICogQHBhcmFtIHsqfSBrZXlwYXRoIFxuICAgKiBAcGFyYW0geyp9IGJpbmRlciBcbiAgICogQHBhcmFtIHsqfSBhcmdzIFRoZSBzdGFydCBiaW5kZXJzLCBvbiBgY2xhc3MtKmAgYXJnc1swXSB3aWwgYmUgdGhlIGNsYXNzbmFtZSBcbiAgICogQHBhcmFtIHsqfSBmb3JtYXR0ZXJzIFxuICAgKi9cbiAgY29uc3RydWN0b3IodmlldzogVmlldywgZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcgfCBudWxsLCBrZXlwYXRoOiBzdHJpbmcgfCBudWxsLCBiaW5kZXI6IEJpbmRlcjxhbnk+IHwgbnVsbCwgYXJnczogc3RyaW5nW10gfCBudWxsLCBmb3JtYXR0ZXJzOiBzdHJpbmdbXSB8IG51bGwpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5iaW5kZXIgPSBiaW5kZXI7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gICAgdGhpcy5tb2RlbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcblxuICB9XG5cbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoZSBvYmplY3Qga2V5cGF0aFxuICAgKiBAcGFyYW0gb2JqIFxuICAgKiBAcGFyYW0ga2V5cGF0aCBcbiAgICovXG4gIG9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s/OiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spOiBPYnNlcnZlciB7XG4gICAgaWYoY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCB0aGlzKTtcbiAgICB9XG4gICAgXG4gIH1cblxuICBwYXJzZVRhcmdldCgpIHtcbiAgICBpZiAodGhpcy5rZXlwYXRoKSB7XG4gICAgICBsZXQgdG9rZW4gPSBwYXJzZVR5cGUodGhpcy5rZXlwYXRoKTtcbiAgICAgIGlmICh0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRva2VuLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpe1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHRoaXMua2V5cGF0aCk7XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlIGluIHRva2VuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogR2V0IHRoZSBpdGVyYXRpb24gYWxpYXMsIHVzZWQgaW4gdGhlIGludGVyYXRpb24gYmluZGVycyBsaWtlIGBlYWNoLSpgXG4gICAqIEBwYXJhbSB7Kn0gbW9kZWxOYW1lIFxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMjZcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDExNzVcbiAgICovXG4gIGdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICclJyArIG1vZGVsTmFtZSArICclJztcbiAgfVxuXG4gIHBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3M6IHN0cmluZ1tdLCBmb3JtYXR0ZXJJbmRleDogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBhcmdzXG4gICAgLm1hcChwYXJzZVR5cGUpXG4gICAgLm1hcCgoe3R5cGUsIHZhbHVlfSwgYWkpID0+IHtcbiAgICAgIGlmICh0eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZVZhbHVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgIC8vIGtleXBhdGggaXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGtleXBhdGggPSAodmFsdWUgYXMgc3RyaW5nICk7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldO1xuXG4gICAgICAgIGlmICghb2JzZXJ2ZXIpIHtcbiAgICAgICAgICBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCBrZXlwYXRoKTtcbiAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldID0gb2JzZXJ2ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic2VydmVyLnZhbHVlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYXJndW1lbnQgdHlwZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYWxsIHRoZSBjdXJyZW50IGZvcm1hdHRlcnMgdG8gdGhlIHN1cHBsaWVkIHZhbHVlIGFuZCByZXR1cm5zIHRoZVxuICAgKiBmb3JtYXR0ZWQgdmFsdWUuXG4gICAqL1xuICBmb3JtYXR0ZWRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYodGhpcy5mb3JtYXR0ZXJzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdHRlcnMgaXMgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZSgocmVzdWx0OiBhbnkvKmNoZWNrIHR5cGUqLywgZGVjbGFyYXRpb246IHN0cmluZyAvKmNoZWNrIHR5cGUqLywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSBkZWNsYXJhdGlvbi5tYXRjaChGT1JNQVRURVJfQVJHUyk7XG4gICAgICBpZihhcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYXJncyBtYXRjaGVkIGZyb20gRk9STUFUVEVSX0FSR1MnKTtcbiAgICAgIH1cbiAgICAgIGxldCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGlmKCFpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGlkIGZvdW5kIGluIGFyZ3MnKTtcbiAgICAgIH1cbiAgICAgIGxldCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcblxuICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICBpZiAoZm9ybWF0dGVyICYmIChmb3JtYXR0ZXIucmVhZCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucmVhZChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIGJpbmRpbmcgYXJvdW5kIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAgICovXG4gIGV2ZW50SGFuZGxlcihmbjogZXZlbnRIYW5kbGVyRnVuY3Rpb24pOiAoZXY6IEV2ZW50KSA9PiBhbnkge1xuICAgIGxldCBiaW5kaW5nID0gdGhpcztcbiAgICBsZXQgaGFuZGxlciA9IGJpbmRpbmcudmlldy5vcHRpb25zLmhhbmRsZXI7XG5cbiAgICByZXR1cm4gKGV2KSA9PiB7XG4gICAgICBpZighaGFuZGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGhhbmRsZXIgZGVmaW5lZCBpbiBiaW5kaW5nLnZpZXcub3B0aW9ucy5oYW5kbGVyJyk7XG4gICAgICB9XG4gICAgICBoYW5kbGVyLmNhbGwoZm4sIHRoaXMsIGV2LCBiaW5kaW5nKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGZvciB0aGUgYmluZGluZy4gVGhpcyBCYXNpY2FsbHkganVzdCBydW5zIHRoZSBiaW5kaW5nIHJvdXRpbmVcbiAgICogd2l0aCB0aGUgc3VwcGxpZWQgdmFsdWUgZm9ybWF0dGVkLlxuICAgKi9cbiAgc2V0KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pICYmICEodGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+ICkuZnVuY3Rpb24pIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElPbmVXYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUuY2FsbCh0aGlzLm1vZGVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElUd29XYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIGxldCByb3V0aW5lRm47XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ3JvdXRpbmUnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICByb3V0aW5lRm4gPSB0aGlzLmJpbmRlci5yb3V0aW5lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSU9uZVdheUJpbmRlcjxhbnk+KTtcbiAgICAgIHJvdXRpbmVGbiA9IHRoaXMuYmluZGVyO1xuICAgIH1cblxuICAgIGlmIChyb3V0aW5lRm4gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcm91dGluZUZuLmNhbGwodGhpcywgdGhpcy5lbCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB1cCB0aGUgdmlldyBiaW5kaW5nIHdpdGggdGhlIG1vZGVsLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgdGhpcy5zZXQodGhpcy5vYnNlcnZlci52YWx1ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1Ymxpc2hlcyB0aGUgdmFsdWUgY3VycmVudGx5IHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudCBiYWNrIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIHB1Ymxpc2goKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIGlmKHRoaXMuZm9ybWF0dGVycyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdHRlcnMgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgbGV0IHZhbHVlID0gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZVJpZ2h0KChyZXN1bHQ6IGFueS8qY2hlY2sgdHlwZSovLCBkZWNsYXJhdGlvbjogc3RyaW5nIC8qY2hlY2sgdHlwZSovLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBkZWNsYXJhdGlvbi5zcGxpdChGT1JNQVRURVJfU1BMSVQpO1xuICAgICAgICBjb25zdCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgaWYoIWlkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpZCBub3QgZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnNbaWRdO1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG5cbiAgICAgICAgaWYgKGZvcm1hdHRlciAmJiBmb3JtYXR0ZXIucHVibGlzaCkge1xuICAgICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5wdWJsaXNoKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sIHRoaXMuZ2V0VmFsdWUoKHRoaXMuZWwgYXMgSFRNTElucHV0RWxlbWVudCkpKTtcblxuICAgICAgdGhpcy5vYnNlcnZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gdGhlIG1vZGVsIGZvciBjaGFuZ2VzIGF0IHRoZSBzcGVjaWZpZWQga2V5cGF0aC4gQmktZGlyZWN0aW9uYWxcbiAgICogcm91dGluZXMgd2lsbCBhbHNvIGxpc3RlbiBmb3IgY2hhbmdlcyBvbiB0aGUgZWxlbWVudCB0byBwcm9wYWdhdGUgdGhlbSBiYWNrXG4gICAqIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5wYXJzZVRhcmdldCgpO1xuXG4gICAgaWYgKHRoaXMuYmluZGVyICYmIHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdiaW5kJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZighdGhpcy5iaW5kZXIuYmluZCAmJiB0eXBlb2YodGhpcy5iaW5kZXIuYmluZCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgbWV0aG9kIGJpbmQgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYmluZGVyLmJpbmQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3Lm9wdGlvbnMucHJlbG9hZERhdGEpIHtcbiAgICAgIHRoaXMuc3luYygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSB0aGUgbW9kZWwgYW5kIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgdW5iaW5kKCkge1xuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdiaW5kJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYgKHRoaXMuYmluZGVyLnVuYmluZCkge1xuICAgICAgICB0aGlzLmJpbmRlci51bmJpbmQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5vYnNlcnZlci51bm9ic2VydmUoKTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1hdHRlck9ic2VydmVycykuZm9yRWFjaChmaSA9PiB7XG4gICAgICBsZXQgYXJncyA9IHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2ZpXTtcblxuICAgICAgT2JqZWN0LmtleXMoYXJncykuZm9yRWFjaChhaSA9PiB7XG4gICAgICAgIGFyZ3NbYWldLnVub2JzZXJ2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVycyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGJpbmRpbmcncyBtb2RlbCBmcm9tIHdoYXQgaXMgY3VycmVudGx5IHNldCBvbiB0aGUgdmlldy4gVW5iaW5kc1xuICAgKiB0aGUgb2xkIG1vZGVsIGZpcnN0IGFuZCB0aGVuIHJlLWJpbmRzIHdpdGggdGhlIG5ldyBtb2RlbC5cbiAgICogQHBhcmFtIHthbnl9IG1vZGVscyBcbiAgICovXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ3VwZGF0ZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmICh0aGlzLmJpbmRlci51cGRhdGUpIHtcbiAgICAgICAgdGhpcy5iaW5kZXIudXBkYXRlLmNhbGwodGhpcywgbW9kZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBlbGVtZW50cyB2YWx1ZVxuICAgKiBAcGFyYW0gZWwgXG4gICAqL1xuICBnZXRWYWx1ZShlbDogSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2dldFZhbHVlJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYodHlwZW9mKHRoaXMuYmluZGVyLmdldFZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFZhbHVlIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5iaW5kZXIuZ2V0VmFsdWUuY2FsbCh0aGlzLCBlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRJbnB1dFZhbHVlKGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHRpbnliaW5kLCBJT3B0aW9uc1BhcmFtIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBQUklNSVRJVkUsIEtFWVBBVEgsIHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBCaW5kaW5nLCBGT1JNQVRURVJfQVJHUywgRk9STUFUVEVSX1NQTElUIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IElCaW5kZXJzIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IElGb3JtYXR0ZXJzIH0gZnJvbSAnLi9mb3JtYXR0ZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgSUNvbXBvbmVudCwgSUNvbXBvbmVudHMgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgSU9ic2VydmVycyB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IG1lcmdlT2JqZWN0IH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJvdW5kRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcdFxuICBfYm91bmQ/OiBib29sZWFuXHRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJS2V5cGF0aHMge1xuICBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbi8qKlxuICogY29tcG9uZW50IHZpZXcgZW5jYXBzdWxhdGVkIGFzIGEgYmluZGluZyB3aXRoaW4gaXQncyBwYXJlbnQgdmlldy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJpbmRpbmcgZXh0ZW5kcyBCaW5kaW5nIHtcbiAgdmlldzogVmlldztcbiAgY29tcG9uZW50Vmlldz86IFZpZXc7XG4gIGVsOiBJQm91bmRFbGVtZW50O1xuICB0eXBlOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogSUNvbXBvbmVudDxhbnk+O1xuICAvKipcbiAgICogc3RhdGljIHZhbHVlcyAoUFJJTUlUSVZFIEF0dHJpYnV0ZXMpXG4gICAqL1xuICBzdGF0aWM6IGFueSA9IHt9O1xuICAvKipcbiAgICoga2V5cGF0aCB2YWx1ZXMgKEtFWVBBVEggQXR0cmlidXRlcylcbiAgICovXG4gIGtleXBhdGhzOiBJS2V5cGF0aHMgPSB7fTtcbiAgb2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJzO1xuICBiaW5kaW5nUHJlZml4ID0gdGlueWJpbmQuX2Z1bGxQcmVmaXg7XG4gIHBpcGVzOiBhbnkgPSB7fTtcblxuICAvLyBJbml0aWFsaXplcyBhIGNvbXBvbmVudCBiaW5kaW5nIGZvciB0aGUgc3BlY2lmaWVkIHZpZXcuIFRoZSByYXcgY29tcG9uZW50XG4gIC8vIGVsZW1lbnQgaXMgcGFzc2VkIGluIGFsb25nIHdpdGggdGhlIGNvbXBvbmVudCB0eXBlLiBBdHRyaWJ1dGVzIGFuZCBzY29wZVxuICAvLyBpbmZsZWN0aW9ucyBhcmUgZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgY29tcG9uZW50cyBkZWZpbmVkIGF0dHJpYnV0ZXMuXG4gIGNvbnN0cnVjdG9yKHZpZXc6IFZpZXcsIGVsOiBIVE1MRWxlbWVudCwgdHlwZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodmlldywgZWwsIHR5cGUsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wb25lbnQgPSB2aWV3Lm9wdGlvbnMuY29tcG9uZW50c1t0aGlzLnR5cGVdO1xuICAgIHRoaXMuc3RhdGljID0ge307XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTsgICAgICAgIFxuICAgIHRoaXMucGFyc2VUYXJnZXQoKTtcbiAgfSAgIFxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6c3luY2Agc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmQgdG9cbiAgICogYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSA9IHRoaXMub2JzZXJ2ZXJzW2tleV0udGFyZ2V0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjp1cGRhdGVgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kXG4gICAqIHRvIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgICovXG4gIHVwZGF0ZSgpIHt9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpwdWJsaXNoYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAgKiB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gICAqL1xuICBwdWJsaXNoKCkge31cbiAgICBcbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IG1hcCB1c2luZyB0aGUgY29tcG9uZW50J3Mgc2NvcGUgaW5mbGVjdGlvbnMuXG4gICAqL1xuICBsb2NhbHMoKSB7XG4gICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5zdGF0aWMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIC8vIHJlc3VsdFtrZXldID0gdGhpcy5zdGF0aWNba2V5XTtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZXModGhpcy5zdGF0aWNba2V5XSwga2V5KTtcbiAgICB9KTtcbiAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgLy8gcmVzdWx0W2tleV0gPSB0aGlzLm9ic2VydmVyc1trZXldLnZhbHVlKCk7XG4gICAgICByZXN1bHRba2V5XSA9IHRoaXMuZm9ybWF0dGVkVmFsdWVzKHRoaXMub2JzZXJ2ZXJzW2tleV0udmFsdWUoKSwga2V5KTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gICAgXG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjYW1lbC1jYXNlZCB2ZXJzaW9uIG9mIHRoZSBzdHJpbmcuIFVzZWQgd2hlbiB0cmFuc2xhdGluZyBhblxuICAgKiBlbGVtZW50J3MgYXR0cmlidXRlIG5hbWUgaW50byBhIHByb3BlcnR5IG5hbWUgZm9yIHRoZSBjb21wb25lbnQncyBzY29wZS5cbiAgICogVE9ETyBtb3ZlIHRvIHV0aWxzXG4gICAqIEBwYXJhbSBzdHJpbmcgXG4gICAqL1xuICBjYW1lbENhc2Uoc3RyaW5nOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLy0oW2Etel0pL2csIGdyb3VwZWQgPT4ge1xuICAgICAgcmV0dXJuIGdyb3VwZWRbMV0udG9VcHBlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldE1lcmdlZE9wdGlvbnMoKSB7XG4gICAgdmFyIG9wdGlvbnM6IElPcHRpb25zUGFyYW0gPSB7XG4gICAgICAvLyBFWFRFTlNJT05TXG4gICAgICBiaW5kZXJzOiA8SUJpbmRlcnM8YW55Pj4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGZvcm1hdHRlcnM6IDxJRm9ybWF0dGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGNvbXBvbmVudHM6IDxJQ29tcG9uZW50cz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGFkYXB0ZXJzOiA8SUFkYXB0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIH07XG4gICAgXG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5iaW5kZXJzLCB0aGlzLmNvbXBvbmVudC5iaW5kZXJzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmZvcm1hdHRlcnMsIHRoaXMuY29tcG9uZW50LmZvcm1hdHRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuY29tcG9uZW50cywgdGhpcy5jb21wb25lbnQuY29tcG9uZW50cyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5hZGFwdGVycywgdGhpcy5jb21wb25lbnQuYWRhcHRlcnMpO1xuXG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5iaW5kZXJzLCB0aGlzLnZpZXcub3B0aW9ucy5iaW5kZXJzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmZvcm1hdHRlcnMsIHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuY29tcG9uZW50cywgdGhpcy52aWV3Lm9wdGlvbnMuY29tcG9uZW50cyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5hZGFwdGVycywgdGhpcy52aWV3Lm9wdGlvbnMuYWRhcHRlcnMpO1xuXG4gICAgb3B0aW9ucy5wcmVmaXggPSB0aGlzLmNvbXBvbmVudC5wcmVmaXggPyB0aGlzLmNvbXBvbmVudC5wcmVmaXggOiB0aGlzLnZpZXcub3B0aW9ucy5wcmVmaXhcbiAgICBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA9IHRoaXMuY29tcG9uZW50LnRlbXBsYXRlRGVsaW1pdGVycyA/IHRoaXMuY29tcG9uZW50LnRlbXBsYXRlRGVsaW1pdGVycyA6IHRoaXMudmlldy5vcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVyc1xuICAgIG9wdGlvbnMucm9vdEludGVyZmFjZSA9IHRoaXMuY29tcG9uZW50LnJvb3RJbnRlcmZhY2UgPyB0aGlzLmNvbXBvbmVudC5yb290SW50ZXJmYWNlIDogdGhpcy52aWV3Lm9wdGlvbnMucm9vdEludGVyZmFjZVxuICAgIG9wdGlvbnMucHJlbG9hZERhdGEgPSB0aGlzLmNvbXBvbmVudC5wcmVsb2FkRGF0YSA/IHRoaXMuY29tcG9uZW50LnByZWxvYWREYXRhIDogdGhpcy52aWV3Lm9wdGlvbnMucHJlbG9hZERhdGFcbiAgICBvcHRpb25zLmhhbmRsZXIgPSB0aGlzLmNvbXBvbmVudC5oYW5kbGVyID8gdGhpcy5jb21wb25lbnQuaGFuZGxlciA6IHRoaXMudmlldy5vcHRpb25zLmhhbmRsZXJcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6YmluZGAgdG8gYnVpbGQgYHRoaXMuY29tcG9uZW50Vmlld2Agd2l0aCBhIGxvY2FsaXplZFxuICAgKiBtYXAgb2YgbW9kZWxzIGZyb20gdGhlIHJvb3Qgdmlldy4gQmluZCBgdGhpcy5jb21wb25lbnRWaWV3YCBvbiBzdWJzZXF1ZW50IGNhbGxzLlxuICAgKi9cbiAgYmluZCgpIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgLyoqXG4gICAgICAgKiB0aGVyZSdzIGEgY3ljbGljIGRlcGVuZGVuY3kgdGhhdCBtYWtlcyBpbXBvcnRlZCBWaWV3IGEgZHVtbXkgb2JqZWN0LiBVc2UgdGlueWJpbmQuYmluZFxuICAgICAgICovXG4gICAgICBsZXQgc2NvcGUgPSB0aGlzLmNvbXBvbmVudC5pbml0aWFsaXplLmNhbGwodGhpcywgdGhpcy5lbCwgdGhpcy5sb2NhbHMoKSk7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcgPSB0aW55YmluZC5iaW5kKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuZWwuY2hpbGROb2RlcyksIHNjb3BlLCB0aGlzLmdldE1lcmdlZE9wdGlvbnMoKSk7XG4gICAgICB0aGlzLmVsLl9ib3VuZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy5iaW5kKCk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VUYXJnZXQoKSB7XG5cbiAgICAvLyBwYXJzZSBjb21wb25lbnQgYXR0cmlidXRlc1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSB0aGlzLmVsLmF0dHJpYnV0ZXNbaV07XG5cbiAgICAgIC8vIGlmIGF0dHJpYnV0ZSBzdGFydHMgbm90IHdpdGggYmluZGluZyBwcmVmaXguIEUuZy4gcnYtXG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuaW5kZXhPZih0aGlzLmJpbmRpbmdQcmVmaXgpICE9PSAwKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSB0aGlzLmNhbWVsQ2FzZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIGNvbnN0IGRlY2xhcmF0aW9uID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICBjb25zdCBwYXJzZWREZWNsYXJhdGlvbiA9IFZpZXcucGFyc2VEZWNsYXJhdGlvbihkZWNsYXJhdGlvbik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnBpcGVzW3Byb3BlcnR5TmFtZV0gPSBwYXJzZWREZWNsYXJhdGlvbi5waXBlcztcbiAgICAgICAgaWYocGFyc2VkRGVjbGFyYXRpb24ua2V5cGF0aCA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncGFyc2VkRGVjbGFyYXRpb24ua2V5cGF0aCBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKHBhcnNlZERlY2xhcmF0aW9uLmtleXBhdGgpO1xuICAgICAgaWYodG9rZW4udHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgICAgdGhpcy5zdGF0aWNbcHJvcGVydHlOYW1lXSA9IHRva2VuLnZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYodG9rZW4udHlwZSA9PT0gS0VZUEFUSCkge1xuICAgICAgICAgIHRoaXMua2V5cGF0aHNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgICB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHRoaXMua2V5cGF0aHNbcHJvcGVydHlOYW1lXSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5cXCd0IHBhcnNlIGNvbXBvbmVudCBhdHRyaWJ1dGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3M6IHN0cmluZ1tdLCBmb3JtYXR0ZXJJbmRleDogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBhcmdzXG4gICAgLm1hcChwYXJzZVR5cGUpXG4gICAgLm1hcCgoe3R5cGUsIHZhbHVlfSwgYWkpID0+IHtcbiAgICAgIGlmICh0eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZVZhbHVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgIC8vIGtleXBhdGggaXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGtleXBhdGggPSAodmFsdWUgYXMgc3RyaW5nICk7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldO1xuXG4gICAgICAgIGlmICghb2JzZXJ2ZXIpIHtcbiAgICAgICAgICBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCBrZXlwYXRoKTtcbiAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldID0gb2JzZXJ2ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic2VydmVyLnZhbHVlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYXJndW1lbnQgdHlwZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYWxsIHRoZSBjdXJyZW50IGZvcm1hdHRlcnMgdG8gdGhlIHN1cHBsaWVkIHZhbHVlIGFuZCByZXR1cm5zIHRoZVxuICAgKiBmb3JtYXR0ZWQgdmFsdWUuXG4gICAqL1xuICBmb3JtYXR0ZWRWYWx1ZXModmFsdWU6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICBpZih0aGlzLnBpcGVzW3Byb3BlcnR5TmFtZV0gPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybWF0dGVycyBpcyBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBpcGVzW3Byb3BlcnR5TmFtZV0ucmVkdWNlKChyZXN1bHQ6IGFueS8qY2hlY2sgdHlwZSovLCBkZWNsYXJhdGlvbjogc3RyaW5nIC8qY2hlY2sgdHlwZSovLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBsZXQgYXJncyA9IGRlY2xhcmF0aW9uLm1hdGNoKEZPUk1BVFRFUl9BUkdTKTtcbiAgICAgIGlmKGFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhcmdzIG1hdGNoZWQgZnJvbSBGT1JNQVRURVJfQVJHUycpO1xuICAgICAgfVxuICAgICAgbGV0IGlkID0gYXJncy5zaGlmdCgpO1xuICAgICAgaWYoIWlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaWQgZm91bmQgaW4gYXJncycpO1xuICAgICAgfVxuICAgICAgbGV0IGZvcm1hdHRlciA9IHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnNbaWRdO1xuXG4gICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG5cbiAgICAgIGlmIChmb3JtYXR0ZXIgJiYgKGZvcm1hdHRlci5yZWFkIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5yZWFkKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlcihyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB2YWx1ZSk7XG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdCBgdGlueWJpbmQuQmluZGluZzo6dW5iaW5kYCB0byBiZSBjYWxsZWQgb24gYHRoaXMuY29tcG9uZW50Vmlld2AuXG4gICAqL1xuICB1bmJpbmQoKSB7ICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm9ic2VydmVyc1trZXldLnVub2JzZXJ2ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGlmICh0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cbn0iLCJleHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXIge1xuICAodmFsOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogYW55O1xuICByZWFkPzogKHJlc3VsdDogc3RyaW5nLCAuLi5wcm9jZXNzZWRBcmdzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgcHVibGlzaD86IChyZXN1bHQ6IHN0cmluZywgLi4ucHJvY2Vzc2VkQXJnczogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUZvcm1hdHRlcjtcbn1cblxuY29uc3QgZm9ybWF0dGVyczogSUZvcm1hdHRlcnMgPSB7fTtcblxuZm9ybWF0dGVycy5ub3QgPSBmdW5jdGlvbiAodmFsdWU6IGJvb2xlYW4pIHtcbiAgcmV0dXJuICF2YWx1ZTtcbn07XG5cbmV4cG9ydCB7IGZvcm1hdHRlcnMgfTtcbiIsIlxuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tICcuL3RpbnliaW5kJztcblxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2sge1xuICBzeW5jOiAoKSA9PiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJS2V5IHtcbiAgcGF0aDogYW55O1xuICBpOiBSb290O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiBPYnNlcnZlcjtcbn1cblxuZXhwb3J0IHR5cGUgT2JqID0gYW55O1xuXG5leHBvcnQgdHlwZSBSb290ID0gYW55O1xuXG4vLyBFcnJvciB0aHJvd2VyLlxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIHRocm93IG5ldyBFcnJvcignW09ic2VydmVyXSAnICsgbWVzc2FnZSlcbn1cblxuLy8gVE9ET1xubGV0IGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG5sZXQgaW50ZXJmYWNlczogc3RyaW5nW107XG5sZXQgcm9vdEludGVyZmFjZTogUm9vdDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcbiAga2V5cGF0aDogc3RyaW5nO1xuICBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrO1xuICBvYmplY3RQYXRoOiBPYmpbXTtcbiAgb2JqOiBPYmo7XG4gIHRhcmdldDogT2JqO1xuICBrZXk6IElLZXk7XG4gIHRva2VuczogSUtleVtdO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IGtleXBhdGggb2JzZXJ2ZXIgYW5kIGtpY2tzIHRoaW5ncyBvZmYuXG4gICAqIEBwYXJhbSBvYmogXG4gICAqIEBwYXJhbSBrZXlwYXRoIFxuICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvYmo6IE9iaiwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5vYmplY3RQYXRoID0gW107XG4gICAgY29uc3QgcGFyc2VSZXN1bHQgPSB0aGlzLnBhcnNlKCk7XG4gICAgdGhpcy5rZXkgPSBwYXJzZVJlc3VsdC5rZXk7XG4gICAgdGhpcy50b2tlbnMgPSBwYXJzZVJlc3VsdC50b2tlbnM7XG4gICAgdGhpcy5vYmogPSB0aGlzLmdldFJvb3RPYmplY3Qob2JqKTtcbiAgICB0aGlzLnRhcmdldCA9IHRoaXMucmVhbGl6ZSgpO1xuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBhZGFwdGVycyA9IG9wdGlvbnMuYWRhcHRlcnM7XG4gICAgaW50ZXJmYWNlcyA9IE9iamVjdC5rZXlzKGFkYXB0ZXJzKTtcbiAgICByb290SW50ZXJmYWNlID0gb3B0aW9ucy5yb290SW50ZXJmYWNlO1xuICB9XG4gIFxuICAvKipcbiAgICogVG9rZW5pemVzIHRoZSBwcm92aWRlZCBrZXlwYXRoIHN0cmluZyBpbnRvIGludGVyZmFjZSArIHBhdGggdG9rZW5zIGZvciB0aGVcbiAgICogb2JzZXJ2ZXIgdG8gd29yayB3aXRoLlxuICAgKi9cbiAgc3RhdGljIHRva2VuaXplID0gZnVuY3Rpb24oa2V5cGF0aDogc3RyaW5nLCByb290OiBSb290KSB7XG4gICAgdmFyIHRva2VuczogYW55W10gPSBbXTtcbiAgICB2YXIgY3VycmVudDogSUtleSA9IHtpOiByb290LCBwYXRoOiAnJ307XG4gICAgdmFyIGluZGV4OiBudW1iZXI7XG4gICAgdmFyIGNocjogc3RyaW5nO1xuICBcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBrZXlwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY2hyID0ga2V5cGF0aC5jaGFyQXQoaW5kZXgpO1xuICBcbiAgICAgIGlmICghIX5pbnRlcmZhY2VzLmluZGV4T2YoY2hyKSkge1xuICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICAgICAgY3VycmVudCA9IHtpOiBjaHIsIHBhdGg6ICcnfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQucGF0aCArPSBjaHI7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG4gIFxuICAvKipcbiAgICogUGFyc2VzIHRoZSBrZXlwYXRoIHVzaW5nIHRoZSBpbnRlcmZhY2VzIGRlZmluZWQgb24gdGhlIHZpZXcuIFNldHMgdmFyaWFibGVzXG4gICAqIGZvciB0aGUgdG9rZW5pemVkIGtleXBhdGggYXMgd2VsbCBhcyB0aGUgZW5kIGtleS5cbiAgICovXG4gIHBhcnNlKCkge1xuICAgIHZhciBwYXRoOiBzdHJpbmc7XG4gICAgdmFyIHJvb3Q6IFJvb3Q7XG4gIFxuICAgIGlmICghaW50ZXJmYWNlcy5sZW5ndGgpIHtcbiAgICAgIGVycm9yKCdNdXN0IGRlZmluZSBhdCBsZWFzdCBvbmUgYWRhcHRlciBpbnRlcmZhY2UuJyk7XG4gICAgfVxuICBcbiAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKHRoaXMua2V5cGF0aFswXSkpIHtcbiAgICAgIHJvb3QgPSB0aGlzLmtleXBhdGhbMF07XG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoLnN1YnN0cigxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdCA9IHJvb3RJbnRlcmZhY2U7XG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoO1xuICAgIH1cbiAgXG4gICAgdGhpcy50b2tlbnMgPSBPYnNlcnZlci50b2tlbml6ZShwYXRoLCByb290KTtcblxuICAgIGlmKCF0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gdG9rZW5zJyk7XG4gICAgfVxuXG4gICAgdGhpcy5rZXkgPSAodGhpcy50b2tlbnMucG9wKCkgYXMgSUtleSk7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICB0b2tlbnM6IHRoaXMudG9rZW5zLFxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIFJlYWxpemVzIHRoZSBmdWxsIGtleXBhdGgsIGF0dGFjaGluZyBvYnNlcnZlcnMgZm9yIGV2ZXJ5IGtleSBhbmQgY29ycmVjdGluZ1xuICAgKiBvbGQgb2JzZXJ2ZXJzIHRvIGFueSBjaGFuZ2VkIG9iamVjdHMgaW4gdGhlIGtleXBhdGguXG4gICAqL1xuICByZWFsaXplKCkge1xuICAgIHZhciBjdXJyZW50OiBPYmogPSB0aGlzLm9ialxuICAgIHZhciB1bnJlYWNoZWQgPSAtMVxuICAgIHZhciBwcmV2XG4gICAgdmFyIHRva2VuXG4gIFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgICBpZiAoaXNPYmplY3QoY3VycmVudCkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9iamVjdFBhdGhbaW5kZXhdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChjdXJyZW50ICE9PSAocHJldiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pKSB7XG4gICAgICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIHByZXYsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLnNldCh0cnVlLCB0b2tlbiwgY3VycmVudCwgdGhpcylcbiAgICAgICAgICAgIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gPSBjdXJyZW50XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICAgIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gPSBjdXJyZW50XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh0b2tlbiwgY3VycmVudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1bnJlYWNoZWQgPT09IC0xKSB7XG4gICAgICAgICAgdW5yZWFjaGVkID0gaW5kZXhcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKHByZXYgPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAodW5yZWFjaGVkICE9PSAtMSkge1xuICAgICAgdGhpcy5vYmplY3RQYXRoLnNwbGljZSh1bnJlYWNoZWQpXG4gICAgfVxuICBcbiAgICByZXR1cm4gY3VycmVudFxuICB9XG4gIFxuICAvKipcbiAgICogVXBkYXRlcyB0aGUga2V5cGF0aC4gVGhpcyBpcyBjYWxsZWQgd2hlbiBhbnkgaW50ZXJtZWRpYXJ5IGtleSBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICB2YXIgbmV4dCwgb2xkVmFsdWUsIG5ld1ZhbHVlXG4gIFxuICAgIGlmICgobmV4dCA9IHRoaXMucmVhbGl6ZSgpKSAhPT0gdGhpcy50YXJnZXQpIHtcbiAgICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICAgIH1cbiAgXG4gICAgICBpZiAoaXNPYmplY3QobmV4dCkpIHtcbiAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIG5leHQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgb2xkVmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIHRoaXMudGFyZ2V0ID0gbmV4dFxuICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUgfHwgbmV3VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9IGVsc2UgaWYgKG5leHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gUmV0dXJucyB1bmRlZmluZWQgaWZcbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZS5cbiAgdmFsdWUoKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5LCB0aGlzLnRhcmdldClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNldHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBDYWxsaW5nIHNldFZhbHVlIHdoZW5cbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZSBpcyBhIG5vLW9wLlxuICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgYWRhcHRlcnNbdGhpcy5rZXkuaV0uc2V0KHRoaXMudGFyZ2V0LCB0aGlzLmtleS5wYXRoLCB2YWx1ZSlcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwcm92aWRlZCBrZXkgb24gYW4gb2JqZWN0LlxuICAgKiBAcGFyYW0ga2V5IFxuICAgKiBAcGFyYW0gb2JqIFxuICAgKi9cbiAgZ2V0KGtleTogSUtleSwgb2JqOiBPYmopIHtcbiAgICByZXR1cm4gYWRhcHRlcnNba2V5LmldLmdldChvYmosIGtleS5wYXRoKVxuICB9XG4gIFxuICAvKipcbiAgICogT2JzZXJ2ZXMgb3IgdW5vYnNlcnZlcyBhIGNhbGxiYWNrIG9uIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGtleS5cbiAgICogQHBhcmFtIGFjdGl2ZSBcbiAgICogQHBhcmFtIGtleSBcbiAgICogQHBhcmFtIG9iaiBcbiAgICogQHBhcmFtIGNhbGxiYWNrIFxuICAgKi9cbiAgc2V0KGFjdGl2ZTogYm9vbGVhbiwga2V5OiBJS2V5LCBvYmo6IE9iaiwgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIGlmKGFjdGl2ZSkge1xuICAgICAgYWRhcHRlcnNba2V5LmldLm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkYXB0ZXJzW2tleS5pXS51bm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogVW5vYnNlcnZlcyB0aGUgZW50aXJlIGtleXBhdGguXG4gICAqL1xuICB1bm9ic2VydmUoKSB7XG4gICAgdmFyIG9iajogT2JqO1xuICAgIHZhciB0b2tlbjtcbiAgXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1tpbmRleF1cbiAgICAgIGlmIChvYmogPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSB7XG4gICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgb2JqLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICB9XG4gIH1cbiAgLy8gdHJhdmVyc2UgdGhlIHNjb3BlIGNoYWluIHRvIGZpbmQgdGhlIHNjb3BlIHdoaWNoIGhhcyB0aGUgcm9vdCBwcm9wZXJ0eVxuICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IGZvdW5kIGluIGNoYWluLCByZXR1cm5zIHRoZSByb290IHNjb3BlXG4gIGdldFJvb3RPYmplY3Qob2JqOiBPYmopIHtcbiAgICB2YXIgcm9vdFByb3AsIGN1cnJlbnQ7XG4gICAgaWYgKCFvYmouJHBhcmVudCkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIFxuICAgIGlmICh0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy50b2tlbnNbMF0ucGF0aFxuICAgIH0gZWxzZSB7XG4gICAgICByb290UHJvcCA9IHRoaXMua2V5LnBhdGhcbiAgICB9XG4gIFxuICAgIGN1cnJlbnQgPSBvYmo7XG4gICAgd2hpbGUgKGN1cnJlbnQuJHBhcmVudCAmJiAoY3VycmVudFtyb290UHJvcF0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LiRwYXJlbnRcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG59XG4iLCJpbXBvcnQgeyBpc0pzb24gfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmV4cG9ydCBjb25zdCBQUklNSVRJVkUgPSAwO1xuZXhwb3J0IGNvbnN0IEtFWVBBVEggPSAxO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSAwO1xuZXhwb3J0IGNvbnN0IEJJTkRJTkcgPSAxO1xuXG5jb25zdCBRVU9URURfU1RSID0gL14nLionJHxeXCIuKlwiJC87IC8vIHJlZ2V4IHRvIHRlc3QgaWYgc3RyaW5nIGlzIHdyYXBwZWQgaW4gXCIgb3IgJ1xuXG5cbi8vIFBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBnZXR0aW5nIHRoZSB0eXBlIGFuZCB2YWx1ZSBmcm9tIGEgc3RyaW5nLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHlwZShzdHJpbmc6IHN0cmluZykge1xuICBsZXQgdHlwZSA9IFBSSU1JVElWRTtcbiAgbGV0IHZhbHVlOiBhbnkgPSBzdHJpbmc7XG4gIGlmIChRVU9URURfU1RSLnRlc3Qoc3RyaW5nKSkge1xuICAgIHZhbHVlID0gc3RyaW5nLnNsaWNlKDEsIC0xKTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd0cnVlJykge1xuICAgIHZhbHVlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdmYWxzZScpIHtcbiAgICB2YWx1ZSA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ251bGwnKSB7XG4gICAgdmFsdWUgPSBudWxsO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICghaXNOYU4oTnVtYmVyKHN0cmluZykpKSB7XG4gICAgdmFsdWUgPSBOdW1iZXIoc3RyaW5nKTtcbiAgfSBlbHNlIGlmIChpc0pzb24oc3RyaW5nKSkge1xuICAgIHZhbHVlID0gSlNPTi5wYXJzZShzdHJpbmcpO1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBLRVlQQVRIO1xuICB9XG4gIHJldHVybiB7dHlwZTogdHlwZSwgdmFsdWU6IHZhbHVlfTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElUb2tlbnMge1xuICB0eXBlOiBudW1iZXI7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIFRlbXBsYXRlIHBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBtdXN0YWNoZS1zdHlsZSB0ZXh0IGNvbnRlbnQgYmluZGluZ3MuXG4vLyBQYXJzZXMgdGhlIHRlbXBsYXRlIGFuZCByZXR1cm5zIGEgc2V0IG9mIHRva2Vucywgc2VwYXJhdGluZyBzdGF0aWMgcG9ydGlvbnNcbi8vIG9mIHRleHQgZnJvbSBiaW5kaW5nIGRlY2xhcmF0aW9ucy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIGRlbGltaXRlcnM6IHN0cmluZ1tdKSB7XG4gIHZhciB0b2tlbnM6IElUb2tlbnNbXSB8IG51bGwgPSBudWxsO1xuICBsZXQgbGVuZ3RoID0gdGVtcGxhdGUubGVuZ3RoO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgbGV0IG9wZW4gPSBkZWxpbWl0ZXJzWzBdLCBjbG9zZSA9IGRlbGltaXRlcnNbMV07XG5cbiAgd2hpbGUgKGxhc3RJbmRleCA8IGxlbmd0aCkge1xuICAgIGluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihvcGVuLCBsYXN0SW5kZXgpO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VucyA9IHRva2VucyB8fCBbXTtcbiAgICAgIGlmIChpbmRleCA+IDAgJiYgbGFzdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIG9wZW4ubGVuZ3RoO1xuICAgICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKGNsb3NlLCBsYXN0SW5kZXgpO1xuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGxldCBzdWJzdHJpbmcgPSB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXggLSBjbG9zZS5sZW5ndGgpO1xuICAgICAgICBsZXQgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAobGFzdFRva2VuICYmIGxhc3RUb2tlbi50eXBlID09PSBURVhUKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnZhbHVlICs9IHN1YnN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgICAgdmFsdWU6IHN1YnN0cmluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpLnRyaW0oKTtcblxuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBCSU5ESU5HLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIGNsb3NlLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuIiwiaW1wb3J0IHsgbWVyZ2VPYmplY3QgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IHBhcnNlVGVtcGxhdGUsIHBhcnNlVHlwZSwgSVRva2VucyB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBJRm9ybWF0dGVycywgZm9ybWF0dGVycyB9IGZyb20gJy4vZm9ybWF0dGVycyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IGFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgYmluZGVycywgSUJpbmRlcnN9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNlcnZlciwgUm9vdCB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSUNvbXBvbmVudHMgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5pbnRlcmZhY2UgSUV4dGVuc2lvbnMge1xuICBiaW5kZXJzOiBJQmluZGVyczxhbnk+O1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgY29tcG9uZW50czogSUNvbXBvbmVudHM7XG4gIGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnMge1xuICAvLyBBdHRyaWJ1dGUgcHJlZml4IGluIHRlbXBsYXRlc1xuICBwcmVmaXg/OiBzdHJpbmc7XG5cbiAgLy9QcmVsb2FkIHRlbXBsYXRlcyB3aXRoIGluaXRpYWwgZGF0YSBvbiBiaW5kXG4gIHByZWxvYWREYXRhPzogYm9vbGVhbjtcblxuICAvL1Jvb3Qgc2lnaHRnbGFzcyBpbnRlcmZhY2UgZm9yIGtleXBhdGhzXG4gIHJvb3RJbnRlcmZhY2U/OiBzdHJpbmc7XG5cbiAgLy8gVGVtcGxhdGUgZGVsaW1pdGVycyBmb3IgdGV4dCBiaW5kaW5nc1xuICB0ZW1wbGF0ZURlbGltaXRlcnM/OiBBcnJheTxzdHJpbmc+XG5cbiAgLy8gQXVnbWVudCB0aGUgZXZlbnQgaGFuZGxlciBvZiB0aGUgb24tKiBiaW5kZXJcbiAgaGFuZGxlcj86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSU9wdGlvbnNQYXJhbSBleHRlbmRzIElFeHRlbnNpb25zLCBJT3B0aW9ucyB7fVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSVZpZXdPcHRpb25zIGV4dGVuZHMgSU9wdGlvbnNQYXJhbSB7XG4gIHN0YXJCaW5kZXJzOiBhbnk7XG4gIC8vIHNpZ2h0Z2xhc3NcbiAgcm9vdEludGVyZmFjZTogUm9vdDtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElUaW55YmluZCB7XG4gIGJpbmRlcnM6IElCaW5kZXJzPGFueT47XG4gIGNvbXBvbmVudHM6IElDb21wb25lbnRzO1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgYWRhcHRlcnM6IElBZGFwdGVycztcbiAgX3ByZWZpeDogc3RyaW5nO1xuICBfZnVsbFByZWZpeDogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgcGFyc2VUZW1wbGF0ZTogKHRlbXBsYXRlOiBzdHJpbmcsIGRlbGltaXRlcnM6IHN0cmluZ1tdKSA9PiBJVG9rZW5zW10gfCBudWxsO1xuICBwYXJzZVR5cGU6IChzdHJpbmc6IHN0cmluZykgPT4ge1xuICAgIHR5cGU6IG51bWJlcjtcbiAgICB2YWx1ZTogYW55O1xuICB9O1xuICB0ZW1wbGF0ZURlbGltaXRlcnM6IHN0cmluZ1tdO1xuICByb290SW50ZXJmYWNlOiBzdHJpbmc7XG4gIHByZWxvYWREYXRhOiBib29sZWFuO1xuICBoYW5kbGVyKHRoaXM6IGFueSwgY29udGV4dDogYW55LCBldjogRXZlbnQsIGJpbmRpbmc6IEJpbmRpbmcpOiB2b2lkO1xuICBmYWxsYmFja0JpbmRlcih0aGlzOiBCaW5kaW5nLCBlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpOiB2b2lkO1xuICBjb25maWd1cmUob3B0aW9uczogYW55KTogdm9pZDtcbiAgaW5pdDogKGNvbXBvbmVudEtleTogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQsIGRhdGE/OiB7fSkgPT4gVmlldztcbiAgYmluZDogKGVsOiBIVE1MRWxlbWVudCwgbW9kZWxzOiBhbnksIG9wdGlvbnM/OiBJT3B0aW9uc1BhcmFtIHwgdW5kZWZpbmVkKSA9PiBWaWV3O1xufVxuXG5jb25zdCB0aW55YmluZDogSVRpbnliaW5kID0ge1xuICAvLyBHbG9iYWwgYmluZGVycy5cbiAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IGJpbmRlcnMsXG5cbiAgLy8gR2xvYmFsIGNvbXBvbmVudHMuXG4gIGNvbXBvbmVudHM6IDxJQ29tcG9uZW50cz4ge30sXG5cbiAgLy8gR2xvYmFsIGZvcm1hdHRlcnMuXG4gIGZvcm1hdHRlcnM6IDxJRm9ybWF0dGVycz4gZm9ybWF0dGVycyxcblxuICAvLyBHbG9iYWwgc2lnaHRnbGFzcyBhZGFwdGVycy5cbiAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IHtcbiAgICAnLic6IGFkYXB0ZXIsXG4gIH0sXG5cbiAgLy8gRGVmYXVsdCBhdHRyaWJ1dGUgcHJlZml4LlxuICBfcHJlZml4OiAncnYnLFxuXG4gIF9mdWxsUHJlZml4OiAncnYtJyxcblxuICBnZXQgcHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH0sXG5cbiAgc2V0IHByZWZpeCh2YWx1ZSkge1xuICAgIHRoaXMuX3ByZWZpeCA9IHZhbHVlO1xuICAgIHRoaXMuX2Z1bGxQcmVmaXggPSB2YWx1ZSArICctJztcbiAgfSxcblxuICBwYXJzZVRlbXBsYXRlOiBwYXJzZVRlbXBsYXRlLFxuXG4gIHBhcnNlVHlwZTogcGFyc2VUeXBlLFxuXG4gIC8vIERlZmF1bHQgdGVtcGxhdGUgZGVsaW1pdGVycy5cbiAgdGVtcGxhdGVEZWxpbWl0ZXJzOiBbJ3snLCAnfSddLFxuXG4gIC8vIERlZmF1bHQgc2lnaHRnbGFzcyByb290IGludGVyZmFjZS5cbiAgcm9vdEludGVyZmFjZTogJy4nLFxuXG4gIC8vIFByZWxvYWQgZGF0YSBieSBkZWZhdWx0LlxuICBwcmVsb2FkRGF0YTogdHJ1ZSxcblxuICAvKipcbiAgICogRGVmYXVsdCBldmVudCBoYW5kbGVyLlxuICAgKi9cbiAgaGFuZGxlcih0aGlzOiBhbnksIGNvbnRleHQ6IGFueSwgZXY6IEV2ZW50LCBiaW5kaW5nOiBCaW5kaW5nKSB7XG4gICAgdGhpcy5jYWxsKGNvbnRleHQsIGV2LCBiaW5kaW5nLnZpZXcubW9kZWxzKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyB0aGUgYXR0cmlidXRlIG9uIHRoZSBlbGVtZW50LiBJZiBubyBiaW5kZXIgYWJvdmUgaXMgbWF0Y2hlZCBpdCB3aWxsIGZhbGxcbiAgICogYmFjayB0byB1c2luZyB0aGlzIGJpbmRlci5cbiAgICovXG4gIGZhbGxiYWNrQmluZGVyKHRoaXM6IEJpbmRpbmcsIGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSkge1xuICAgIGlmICghdGhpcy50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3Qgc2V0IGF0dHRyaWJ1dGUgb2YgJyArIHRoaXMudHlwZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUodGhpcy50eXBlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnR5cGUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWVyZ2VzIGFuIG9iamVjdCBsaXRlcmFsIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9wdGlvbnMuXG4gICAqIEBwYXJhbSBvcHRpb25zIFxuICAgKi9cbiAgY29uZmlndXJlKG9wdGlvbnM6IGFueSkge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgICAgIHN3aXRjaChvcHRpb24pIHtcbiAgICAgICAgY2FzZSAnYmluZGVycyc6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5iaW5kZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb3JtYXR0ZXJzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmZvcm1hdHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NvbXBvbmVudHMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuY29tcG9uZW50cywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWRhcHRlcnMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYWRhcHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FkYXB0ZXInOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYWRhcHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZWZpeCc6XG4gICAgICAgICAgdGhpcy5wcmVmaXggPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFyc2VUZW1wbGF0ZSc6XG4gICAgICAgICAgdGhpcy5wYXJzZVRlbXBsYXRlID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3BhcnNlVHlwZSc6XG4gICAgICAgICAgdGhpcy5wYXJzZVR5cGUgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJlZml4JzpcbiAgICAgICAgICB0aGlzLnByZWZpeCA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0ZW1wbGF0ZURlbGltaXRlcnMnOlxuICAgICAgICAgIHRoaXMudGVtcGxhdGVEZWxpbWl0ZXJzID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Jvb3RJbnRlcmZhY2UnOlxuICAgICAgICAgIHRoaXMucm9vdEludGVyZmFjZSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcmVsb2FkRGF0YSc6XG4gICAgICAgICAgdGhpcy5wcmVsb2FkRGF0YSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignT3B0aW9uIG5vdCBzdXBwb3J0ZWQnLCBvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgb24gdGhlIHNwZWNpZmllZCBlbGVtZW50IGFuZFxuICAvLyByZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cdFxuICBpbml0OiAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YSA9IHt9KSA9PiB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aW55YmluZC5jb21wb25lbnRzW2NvbXBvbmVudEtleV07XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlLmNhbGwodGlueWJpbmQsIGVsKTtcbiAgICBsZXQgc2NvcGUgPSBjb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRpbnliaW5kLCBlbCwgZGF0YSk7XG5cbiAgICBsZXQgdmlldyA9IHRpbnliaW5kLmJpbmQoZWwsIHNjb3BlKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcblxuICAvLyBCaW5kcyBzb21lIGRhdGEgdG8gYSB0ZW1wbGF0ZSAvIGVsZW1lbnQuIFJldHVybnMgYSB0aW55YmluZC5WaWV3IGluc3RhbmNlLlxuICBiaW5kOiAoZWw6IEhUTUxFbGVtZW50LCBtb2RlbHM6IGFueSwgb3B0aW9ucz86IElPcHRpb25zUGFyYW0pID0+IHtcbiAgICBsZXQgdmlld09wdGlvbnM6IElWaWV3T3B0aW9ucyA9IHtcbiAgICAgIC8vIEVYVEVOU0lPTlNcbiAgICAgIGJpbmRlcnM6IDxJQmluZGVyczxhbnk+PiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgY29tcG9uZW50czogPElDb21wb25lbnRzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAvLyBvdGhlclxuICAgICAgc3RhckJpbmRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAvLyBzaWdodGdsYXNzXG4gICAgICByb290SW50ZXJmYWNlOiA8Um9vdD4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICB9O1xuICAgIG1vZGVscyA9IG1vZGVscyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIC8vIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYob3B0aW9ucykge1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYmluZGVycywgb3B0aW9ucy5iaW5kZXJzKTtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYWRhcHRlcnMsIG9wdGlvbnMuYWRhcHRlcnMpO1xuICAgIH1cblxuICAgIHZpZXdPcHRpb25zLnByZWZpeCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnByZWZpeCA6IHRpbnliaW5kLnByZWZpeFxuICAgIHZpZXdPcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA9IG9wdGlvbnMgJiYgb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPyBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA6IHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVyc1xuICAgIHZpZXdPcHRpb25zLnJvb3RJbnRlcmZhY2UgPSBvcHRpb25zICYmIG9wdGlvbnMucm9vdEludGVyZmFjZSA/IG9wdGlvbnMucm9vdEludGVyZmFjZSA6IHRpbnliaW5kLnJvb3RJbnRlcmZhY2VcbiAgICB2aWV3T3B0aW9ucy5wcmVsb2FkRGF0YSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVsb2FkRGF0YSA/IG9wdGlvbnMucHJlbG9hZERhdGEgOiB0aW55YmluZC5wcmVsb2FkRGF0YVxuICAgIHZpZXdPcHRpb25zLmhhbmRsZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlciA/IG9wdGlvbnMuaGFuZGxlciA6IHRpbnliaW5kLmhhbmRsZXJcblxuICAgIC8vIG1lcmdlIGV4dGVuc2lvbnNcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCB0aW55YmluZC5iaW5kZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCB0aW55YmluZC5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCB0aW55YmluZC5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgdGlueWJpbmQuYWRhcHRlcnMpO1xuXG4gICAgLy8gZ2V0IGFsbCBzdGFyQmluZGVycyBmcm9tIGF2YWlsYWJsZSBiaW5kZXJzXG4gICAgdmlld09wdGlvbnMuc3RhckJpbmRlcnMgPSBPYmplY3Qua2V5cyh2aWV3T3B0aW9ucy5iaW5kZXJzKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGtleS5pbmRleE9mKCcqJykgPiAwO1xuICAgIH0pO1xuXG4gICAgT2JzZXJ2ZXIudXBkYXRlT3B0aW9ucyh2aWV3T3B0aW9ucyk7XG5cbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCBtb2RlbHMsIHZpZXdPcHRpb25zKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcbn07XG5cbmV4cG9ydCB7IHRpbnliaW5kIH07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbnliaW5kO1xuIiwiZXhwb3J0IGNvbnN0IG1lcmdlT2JqZWN0ID0gKHRhcmdldDogYW55LCBvYmo6IGFueSkgPT4ge1xuICBpZiAob2JqKSB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghdGFyZ2V0W2tleV0gfHwgdGFyZ2V0W2tleV0gPT09IHt9KSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbi8vIFRlc3QgaWYgc3RyaW5nIGlzIGEganNvbiBzdHJpbmdcbmV4cG9ydCBjb25zdCBpc0pzb24gPSAoc3RyOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2YWwgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuICh2YWwgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWwgaW5zdGFuY2VvZiBPYmplY3QpID8gdHJ1ZSA6IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLy8gQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QgdGhhbiBjYW4gYmUgb2JzZXJ2ZWQuXG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSAob2JqOiBvYmplY3QpID0+IHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTdHJpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdGltZXMgPSAobjogbnVtYmVyLCBjYjogKCkgPT4gdm9pZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGNiKCk7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyB0aW55YmluZCwgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBCaW5kZXIsIElUd29XYXlCaW5kZXIgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nLCBJQm91bmRFbGVtZW50IH0gZnJvbSAnLi9jb21wb25lbnQtYmluZGluZyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlIH0gZnJvbSAnLi9wYXJzZXJzJztcblxuZXhwb3J0IHR5cGUgVEJsb2NrID0gYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGRhdGE/OiBzdHJpbmc7XG59XG5cbmNvbnN0IHRleHRCaW5kZXI6IElUd29XYXlCaW5kZXI8c3RyaW5nPiA9IHtcbiAgcm91dGluZTogKG5vZGU6IElEYXRhRWxlbWVudCwgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIG5vZGUuZGF0YSA9ICh2YWx1ZSAhPSBudWxsKSA/IHZhbHVlIDogJyc7XG4gIH1cbn07XG5cbmNvbnN0IERFQ0xBUkFUSU9OX1NQTElUID0gLygoPzonW14nXSonKSooPzooPzpbXlxcfCddKig/OidbXiddKicpK1teXFx8J10qKSt8W15cXHxdKykpfF4kL2c7XG5cbmNvbnN0IHBhcnNlTm9kZSA9ICh2aWV3OiBWaWV3LCBub2RlOiBJRGF0YUVsZW1lbnQpID0+IHtcbiAgbGV0IGJsb2NrOiBUQmxvY2sgPSBmYWxzZTtcblxuICAvLyBpZiBub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERVxuICBub2RlID0gKCBub2RlIGFzIElEYXRhRWxlbWVudCk7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgaWYoIW5vZGUuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub2RlIGhhcyBubyBkYXRhJyk7XG4gICAgfVxuICAgIGxldCB0b2tlbnMgPSBwYXJzZVRlbXBsYXRlKG5vZGUuZGF0YSwgdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzKTtcblxuICAgIGlmICh0b2tlbnMpIHtcbiAgICAgIGlmKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZXh0LCBub2RlKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICB2aWV3LmJ1aWxkQmluZGluZyh0ZXh0LCBudWxsLCB0b2tlbi52YWx1ZSwgdGV4dEJpbmRlciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgYmxvY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBibG9jayA9IHZpZXcudHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICBpZiAoIWJsb2NrKSB7XG4gICAgaWYobm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJzZU5vZGUodmlldywgKG5vZGUuY2hpbGROb2Rlc1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGJpbmRpbmdDb21wYXJhdG9yID0gKGE6IEJpbmRpbmcsIGI6IEJpbmRpbmcpID0+IHtcbiAgbGV0IGFQcmlvcml0eSA9IGEuYmluZGVyID8gKChhLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgbGV0IGJQcmlvcml0eSA9IGIuYmluZGVyID8gKChiLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgcmV0dXJuIGJQcmlvcml0eSAtIGFQcmlvcml0eTtcbn07XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIGJpbmRpbmdzIGJ1aWx0IGZyb20gYSBzZXQgb2YgcGFyZW50IG5vZGVzLlxuICovXG5leHBvcnQgY2xhc3MgVmlldyB7XG5cbiAgZWxzOiBIVE1MQ29sbGVjdGlvbiB8IEhUTUxFbGVtZW50W10gfCBOb2RlW107XG4gIG1vZGVsczogYW55O1xuICBvcHRpb25zOiBJVmlld09wdGlvbnM7XG4gIGJpbmRpbmdzOiBCaW5kaW5nW10gPSBbXTtcbiAgY29tcG9uZW50VmlldzogVmlldyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgRE9NIGVsZW1lbnRzIGFuZCB0aGUgbW9kZWwgb2JqZWN0cyBmb3IgYmluZGluZyBhcmUgcGFzc2VkIGludG8gdGhlXG4gICAqIGNvbnN0cnVjdG9yIGFsb25nIHdpdGggYW55IGxvY2FsIG9wdGlvbnMgdGhhdCBzaG91bGQgYmUgdXNlZCB0aHJvdWdob3V0IHRoZVxuICAgKiBjb250ZXh0IG9mIHRoZSB2aWV3IGFuZCBpdCdzIGJpbmRpbmdzLlxuICAgKiBAcGFyYW0gZWxzIFxuICAgKiBAcGFyYW0gbW9kZWxzIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsczogSFRNTENvbGxlY3Rpb24gfCBIVE1MRWxlbWVudCB8IE5vZGUsIG1vZGVsczogYW55LCBvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZWxzID0gZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVscyA9IChbZWxzXSBhcyBIVE1MRWxlbWVudFtdIHwgTm9kZVtdICk7XG4gICAgfVxuICAgIHRoaXMubW9kZWxzID0gbW9kZWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmJ1aWxkKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHBhcnNlRGVjbGFyYXRpb24oZGVjbGFyYXRpb246IHN0cmluZykge1xuICAgIGxldCBtYXRjaGVzID0gZGVjbGFyYXRpb24ubWF0Y2goREVDTEFSQVRJT05fU1BMSVQpO1xuICAgIGlmKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gbWF0Y2hlcycpO1xuICAgIH1cbiAgICBsZXQgcGlwZXMgPSBtYXRjaGVzLm1hcCgoc3RyOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBzdHIudHJpbSgpO1xuICAgIH0pO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKSB8fCBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBrZXlwYXRoLFxuICAgICAgcGlwZXMsXG4gICAgfVxuICB9XG5cbiAgcHVibGljIGJ1aWxkQmluZGluZyhub2RlOiBIVE1MRWxlbWVudCB8IFRleHQsIHR5cGU6IHN0cmluZyB8IG51bGwsIGRlY2xhcmF0aW9uOiBzdHJpbmcsIGJpbmRlcjogQmluZGVyPGFueT4sIGFyZ3M6IHN0cmluZ1tdIHwgbnVsbCkge1xuICAgIGNvbnN0IHBhcnNlZERlY2xhcmF0aW9uID0gVmlldy5wYXJzZURlY2xhcmF0aW9uKGRlY2xhcmF0aW9uKTtcbiAgICBjb25zdCBrZXlwYXRoID0gcGFyc2VkRGVjbGFyYXRpb24ua2V5cGF0aDtcbiAgICBjb25zdCBwaXBlcyA9IHBhcnNlZERlY2xhcmF0aW9uLnBpcGVzO1xuICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQmluZGluZygodGhpcyBhcyBWaWV3KSwgKG5vZGUgYXMgSFRNTEVsZW1lbnQpLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIHBpcGVzKSk7XG4gIH1cblxuICAvLyBQYXJzZXMgdGhlIERPTSB0cmVlIGFuZCBidWlsZHMgYEJpbmRpbmdgIGluc3RhbmNlcyBmb3IgZXZlcnkgbWF0Y2hlZFxuICAvLyBiaW5kaW5nIGRlY2xhcmF0aW9uLlxuICBidWlsZCgpIHtcbiAgICB0aGlzLmJpbmRpbmdzID0gW107XG5cbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVscywgaSwgbGVuO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwYXJzZU5vZGUodGhpcywgKGVsZW1lbnRzW2ldIGFzIElEYXRhRWxlbWVudCkpO1xuICAgIH1cblxuICAgIHRoaXMuYmluZGluZ3Muc29ydChiaW5kaW5nQ29tcGFyYXRvcik7XG4gIH1cblxuICB0cmF2ZXJzZShub2RlOiBJQm91bmRFbGVtZW50KTogVEJsb2NrIHtcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIGxldCBibG9jayA9IG5vZGUubm9kZU5hbWUgPT09ICdTQ1JJUFQnIHx8IG5vZGUubm9kZU5hbWUgPT09ICdTVFlMRSc7XG4gICAgbGV0IGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgbGV0IGJpbmRJbmZvcyA9IFtdO1xuICAgIGxldCBzdGFyQmluZGVycyA9IHRoaXMub3B0aW9ucy5zdGFyQmluZGVycztcbiAgICB2YXIgdHlwZSwgYmluZGVyLCBpZGVudGlmaWVyLCBhcmdzO1xuXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIHdpdGggdGhlIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2XG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuaW5kZXhPZihiaW5kaW5nUHJlZml4KSA9PT0gMCkge1xuICAgICAgICB0eXBlID0gYXR0cmlidXRlLm5hbWUuc2xpY2UoYmluZGluZ1ByZWZpeC5sZW5ndGgpO1xuICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1t0eXBlXTtcbiAgICAgICAgYXJncyA9IFtdO1xuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzdGFyQmluZGVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgaWRlbnRpZmllciA9IHN0YXJCaW5kZXJzW2tdO1xuICAgICAgICAgICAgaWYgKHR5cGUuc2xpY2UoMCwgaWRlbnRpZmllci5sZW5ndGggLSAxKSA9PT0gaWRlbnRpZmllci5zbGljZSgwLCAtMSkpIHtcbiAgICAgICAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgIGFyZ3MucHVzaCh0eXBlLnNsaWNlKGlkZW50aWZpZXIubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGJpbmRlciA9IHRpbnliaW5kLmZhbGxiYWNrQmluZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChiaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5ibG9jaykge1xuICAgICAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIHR5cGUsIGF0dHJpYnV0ZS52YWx1ZSwgYmluZGVyLCBhcmdzKTtcbiAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5kSW5mb3MucHVzaCh7YXR0cjogYXR0cmlidXRlLCBiaW5kZXI6IGJpbmRlciwgdHlwZTogdHlwZSwgYXJnczogYXJnc30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZEluZm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmluZEluZm8gPSBiaW5kSW5mb3NbaV07XG4gICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCBiaW5kSW5mby50eXBlLCBiaW5kSW5mby5hdHRyLnZhbHVlLCBiaW5kSW5mby5iaW5kZXIsIGJpbmRJbmZvLmFyZ3MpO1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYmluZEluZm8uYXR0ci5uYW1lKTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIGNvbXBvbmVudHNcbiAgICBpZiAoIWJsb2NrKSB7XG4gICAgICB0eXBlID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbXBvbmVudHNbdHlwZV0gJiYgIW5vZGUuX2JvdW5kKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQ29tcG9uZW50QmluZGluZygodGhpcyBhcyBWaWV3KSwgbm9kZSwgdHlwZSkpO1xuICAgICAgICBibG9jayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJsb2NrO1xuICB9XG5cbiAgLy8gQmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5iaW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICB1bmJpbmQoKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLmJpbmRpbmdzKSkge1xuICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICBiaW5kaW5nLnVuYmluZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN5bmNzIHVwIHRoZSB2aWV3IHdpdGggdGhlIG1vZGVsIGJ5IHJ1bm5pbmcgdGhlIHJvdXRpbmVzIG9uIGFsbCBiaW5kaW5ncy5cbiAgc3luYygpIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1Ymxpc2hlcyB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIHZpZXcgYmFjayB0byB0aGUgbW9kZWwgKHJldmVyc2Ugc3luYykuXG4gIHB1Ymxpc2goKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcuYmluZGVyICYmIChiaW5kaW5nLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnB1Ymxpc2hlcykge1xuICAgICAgICBiaW5kaW5nLnB1Ymxpc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIHZpZXcncyBtb2RlbHMgYWxvbmcgd2l0aCBhbnkgYWZmZWN0ZWQgYmluZGluZ3MuXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm1vZGVsc1trZXldID0gbW9kZWxzW2tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBpZiAoYmluZGluZy51cGRhdGUpIHtcbiAgICAgICAgYmluZGluZy51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==