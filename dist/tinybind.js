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
exports.default = exports.binders = void 0;

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var getString = function getString(value) {
  return value != null ? value.toString() : undefined;
};

var times = function times(n, cb) {
  for (var i = 0; i < n; i++) {
    cb();
  }
};

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
/**
 * Used also in parsers.parseType
 * TODO outsource
 */


var PRIMITIVE = 0;
var KEYPATH = 1;
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
 * Used also in parsers.parseType
 * TODO outsource
 */
var PRIMITIVE = 0;
var KEYPATH = 1;

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "static", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bound", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "keypaths", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "observers", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "upstreamObservers", void 0);

    _this.view = view;
    _this.el = el;
    _this.type = type;
    _this.component = view.options.components[_this.type];
    _this.static = {};
    _this.observers = {};
    _this.upstreamObservers = {};
    var bindingPrefix = _tinybind.tinybind._fullPrefix; // parse component attributes

    for (var i = 0, len = el.attributes.length; i < len; i++) {
      var attribute = el.attributes[i]; // if attribute starts not with binding prefix. E.g. rv-

      if (attribute.name.indexOf(bindingPrefix) !== 0) {
        var _propertyName = _this.camelCase(attribute.name);

        var token = (0, _parsers.parseType)(attribute.value);
        var stat = _this.component.static;

        if (stat && stat.indexOf(_propertyName) > -1) {
          _this.static[_propertyName] = attribute.value;
        } else if (token.type === PRIMITIVE) {
          _this.static[_propertyName] = token.value;
        } else if (token.type === KEYPATH) {
          // TODO attribute.value is not an observer
          _this.keypaths[_propertyName] = attribute.value;
        } else {
          throw new Error('can\'t parse component attribute');
        }
      }
    }

    return _this;
  }
  /**
   * Intercepts `tinybind.Binding::sync` since component bindings are not bound to
   * a particular model to update it's value.
   */


  _createClass(ComponentBinding, [{
    key: "sync",
    value: function sync() {}
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
      var _this2 = this;

      var result = {};
      Object.keys(this.static).forEach(function (key) {
        result[key] = _this2.static[key];
      });
      Object.keys(this.observers).forEach(function (key) {
        result[key] = _this2.observers[key].value();
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
    /**
     * Intercepts `tinybind.Binding::bind` to build `this.componentView` with a localized
     * map of models from the root view. Bind `this.componentView` on subsequent calls.
     */

  }, {
    key: "bind",
    value: function bind() {
      var _this3 = this;

      var options = {
        // EXTENSIONS
        binders: Object.create(null),
        formatters: Object.create(null),
        components: Object.create(null),
        adapters: Object.create(null)
      };

      if (!this.bound) {
        Object.keys(this.keypaths).forEach(function (key) {
          var keypath = _this3.keypaths[key]; // TODO TESTME

          _this3.observers[key] = _this3.observe(_this3.view.models, keypath, {
            sync: function sync() {
              for (var _key in _this3.observers) {
                if (_this3.observers.hasOwnProperty(_key)) {
                  var observer = _this3.observers[_key];

                  if (!_this3.componentView) {
                    throw new Error('componentView is not set');
                  }

                  _this3.componentView.models[_key] = observer.value();
                }
              }
            }
          });
        });
        this.bound = true;
      }

      if (this.componentView) {
        this.componentView.bind();
      } else {
        this.el.innerHTML = this.component.template.call(this);
        var scope = this.component.initialize.call(this, this.el, this.locals());
        this.el._bound = true;
        mergeObject(options.binders, this.component.binders);
        mergeObject(options.formatters, this.component.formatters);
        mergeObject(options.components, this.component.components);
        mergeObject(options.formatters, this.component.adapters);
        mergeObject(options.binders, this.view.options.binders);
        mergeObject(options.formatters, this.view.options.formatters);
        mergeObject(options.components, this.view.options.components);
        mergeObject(options.formatters, this.view.options.adapters);
        options.prefix = this.component.prefix ? this.component.prefix : this.view.options.prefix;
        options.templateDelimiters = this.component.templateDelimiters ? this.component.templateDelimiters : this.view.options.templateDelimiters;
        options.rootInterface = this.component.rootInterface ? this.component.rootInterface : this.view.options.rootInterface;
        options.preloadData = this.component.preloadData ? this.component.preloadData : this.view.options.preloadData;
        options.handler = this.component.handler ? this.component.handler : this.view.options.handler;
        /**
         * there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
         */

        this.componentView = _tinybind.tinybind.bind(Array.prototype.slice.call(this.el.childNodes), scope, options);
        Object.keys(this.observers).forEach(function (key) {
          var observer = _this3.observers[key];

          if (!_this3.componentView) {
            throw new Error('componentView not set');
          }

          var models = _this3.componentView.models; // TODO TESTME

          var upstream = _this3.observe(models, key, {
            sync: function sync() {
              for (var _key2 in _this3.observers) {
                if (_this3.observers.hasOwnProperty(_key2)) {
                  var _observer = _this3.observers[_key2];

                  _observer.setValue(models[_key2]);
                }
              }
            }
          });

          _this3.upstreamObservers[key] = upstream;
        });
      }
    }
    /**
     * Intercept `tinybind.Binding::unbind` to be called on `this.componentView`.
     */

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

    if (isObject(this.target)) {
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
    }
    /**
     * Updates the keypath. This is called when any intermediary key is changed.
     */

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
exports.default = exports.tinybind = void 0;

var _parsers = __webpack_require__(/*! ./parsers */ "./src/parsers.ts");

var _formatters = __webpack_require__(/*! ./formatters */ "./src/formatters.ts");

var _adapter = _interopRequireDefault(__webpack_require__(/*! ./adapter */ "./src/adapter.ts"));

var _binders = __webpack_require__(/*! ./binders */ "./src/binders.ts");

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO move to uitils
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

var tinybind = {
  // Global binders.
  binders: _binders.binders,
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
  handler: function handler(
  /* TODO CHECME */
  context, ev, binding) {
    // console.warn('yes it is used');
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
          mergeObject(_this.binders, value);
          break;

        case 'formatters':
          mergeObject(_this.formatters, value);
          break;

        case 'components':
          mergeObject(_this.components, value);
          break;

        case 'adapters':
          mergeObject(_this.adapters, value);
          break;

        case 'prefix':
          _this.prefix = value;

        case 'parseTemplate':
          _this.parseTemplate = value;

        case 'parseType':
          _this.parseType = value;

        case 'prefix':
          _this.prefix = value;

        case 'templateDelimiters':
          _this.templateDelimiters = value;

        case 'rootInterface':
          _this.rootInterface = value;

        case 'preloadData':
          _this.preloadData = value;

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
exports.tinybind = tinybind;
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
      var keypath = pipes.shift() || null;
      console.log('pipes', pipes);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvZm9ybWF0dGVycy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9vYnNlcnZlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3RpbnliaW5kLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3ZpZXcudHMiXSwibmFtZXMiOlsiQVJSQVlfTUVUSE9EUyIsIkFkYXB0ZXIiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwiY291bnRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3ZWFrbWFwIiwiX19ydiIsImNhbGxiYWNrcyIsInJlZiIsImtleXMiLCJsZW5ndGgiLCJwb2ludGVycyIsImZuIiwib3JpZ2luYWwiLCJtYXAiLCJ3ZWFrUmVmZXJlbmNlIiwiYXJncyIsInJlc3BvbnNlIiwiYXBwbHkiLCJmb3JFYWNoIiwiayIsInIiLCJBcnJheSIsImNhbGxiYWNrIiwic3luYyIsImtleXBhdGgiLCJzdHViRnVuY3Rpb24iLCJpbmRleE9mIiwicHVzaCIsImlkeCIsInNwbGljZSIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsInNldCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJuZXdWYWx1ZSIsInVub2JzZXJ2ZU11dGF0aW9ucyIsImNiIiwib2JzZXJ2ZU11dGF0aW9ucyIsImFkYXB0ZXIiLCJnZXRTdHJpbmciLCJ0b1N0cmluZyIsInVuZGVmaW5lZCIsInRpbWVzIiwibiIsImkiLCJjcmVhdGVWaWV3IiwiYmluZGluZyIsIm1vZGVscyIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiRXJyb3IiLCJpbnNlcnRCZWZvcmUiLCJiaW5kZXJzIiwiZnVuY3Rpb24iLCJwcmlvcml0eSIsImN1c3RvbURhdGEiLCJoYW5kbGVyIiwidW5iaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiaW5kZXhQcm9wIiwiZ2V0QXR0cmlidXRlIiwiZ2V0SXRlcmF0aW9uQWxpYXMiLCJtb2RlbCIsImluZGV4Iiwic2NvcGUiLCIkcGFyZW50IiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJkYXRhIiwia2V5IiwiZWxDbGFzcyIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ0cmltIiwidGV4dCIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIkhUTUxTZWxlY3RFbGVtZW50Iiwib3B0aW9uIiwic2VsZWN0ZWQiLCJpZiIsImF0dGFjaGVkIiwiYm91bmQiLCJuZXN0ZWQiLCJnZXRJbnB1dFZhbHVlIiwicmVzdWx0cyIsIlBSSU1JVElWRSIsIktFWVBBVEgiLCJGT1JNQVRURVJfQVJHUyIsIkZPUk1BVFRFUl9TUExJVCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiZm9ybWF0dGVyT2JzZXJ2ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIm9ic2VydmVyIiwib2JzZXJ2ZSIsInRhcmdldCIsImZvcm1hdHRlckluZGV4IiwicGFyc2VUeXBlIiwiYWkiLCJwcmltaXRpdmVWYWx1ZSIsInJlZHVjZSIsInJlc3VsdCIsImRlY2xhcmF0aW9uIiwibWF0Y2giLCJzaGlmdCIsImZvcm1hdHRlciIsInByb2Nlc3NlZEFyZ3MiLCJwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyIsInJlYWQiLCJGdW5jdGlvbiIsImV2IiwiY2FsbCIsImZvcm1hdHRlZFZhbHVlIiwicm91dGluZUZuIiwicmVkdWNlUmlnaHQiLCJzcGxpdCIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJwYXJzZVRhcmdldCIsInByZWxvYWREYXRhIiwidW5vYnNlcnZlIiwiZmkiLCJtZXJnZU9iamVjdCIsIkNvbXBvbmVudEJpbmRpbmciLCJjb21wb25lbnQiLCJjb21wb25lbnRzIiwic3RhdGljIiwib2JzZXJ2ZXJzIiwidXBzdHJlYW1PYnNlcnZlcnMiLCJiaW5kaW5nUHJlZml4IiwidGlueWJpbmQiLCJfZnVsbFByZWZpeCIsImxlbiIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGUiLCJuYW1lIiwicHJvcGVydHlOYW1lIiwiY2FtZWxDYXNlIiwic3RhdCIsImtleXBhdGhzIiwic3RyaW5nIiwiZ3JvdXBlZCIsInRvVXBwZXJDYXNlIiwiY3JlYXRlIiwiYWRhcHRlcnMiLCJjb21wb25lbnRWaWV3IiwiaW5pdGlhbGl6ZSIsImxvY2FscyIsIl9ib3VuZCIsInByZWZpeCIsInRlbXBsYXRlRGVsaW1pdGVycyIsInJvb3RJbnRlcmZhY2UiLCJwcm90b3R5cGUiLCJzbGljZSIsImNoaWxkTm9kZXMiLCJ1cHN0cmVhbSIsIm5vdCIsImlzT2JqZWN0IiwiZXJyb3IiLCJtZXNzYWdlIiwiaW50ZXJmYWNlcyIsIm9iamVjdFBhdGgiLCJwYXJzZVJlc3VsdCIsInBhcnNlIiwidG9rZW5zIiwiZ2V0Um9vdE9iamVjdCIsInJlYWxpemUiLCJwYXRoIiwicm9vdCIsInN1YnN0ciIsInRva2VuaXplIiwiY3VycmVudCIsInVucmVhY2hlZCIsInByZXYiLCJuZXh0Iiwib2xkVmFsdWUiLCJhY3RpdmUiLCJyb290UHJvcCIsImNociIsImNoYXJBdCIsIlFVT1RFRF9TVFIiLCJURVhUIiwiQklORElORyIsImlzSnNvbiIsInN0ciIsInZhbCIsIkpTT04iLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZVRlbXBsYXRlIiwiZGVsaW1pdGVycyIsImxhc3RJbmRleCIsIm9wZW4iLCJjbG9zZSIsInN1YnN0cmluZyIsImxhc3RUb2tlbiIsIl9wcmVmaXgiLCJjb250ZXh0IiwiZmFsbGJhY2tCaW5kZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25maWd1cmUiLCJjb25zb2xlIiwid2FybiIsImluaXQiLCJjb21wb25lbnRLZXkiLCJjcmVhdGVFbGVtZW50Iiwidmlld09wdGlvbnMiLCJzdGFyQmluZGVycyIsImZpbHRlciIsInVwZGF0ZU9wdGlvbnMiLCJ0ZXh0QmluZGVyIiwibm9kZSIsIkRFQ0xBUkFUSU9OX1NQTElUIiwicGFyc2VOb2RlIiwibm9kZVR5cGUiLCJjcmVhdGVUZXh0Tm9kZSIsImJ1aWxkQmluZGluZyIsInRyYXZlcnNlIiwiYmluZGluZ0NvbXBhcmF0b3IiLCJhIiwiYiIsImFQcmlvcml0eSIsImJQcmlvcml0eSIsInRyaW1TdHIiLCJidWlsZCIsIm1hdGNoZXMiLCJwaXBlcyIsImxvZyIsImVsZW1lbnRzIiwic29ydCIsImJpbmRJbmZvcyIsImlkZW50aWZpZXIiLCJh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UixJQUFtQnhGLFFBQVF3RixNQUFULENBQXVDckIsU0FBN0QsRUFBd0U7QUFDdEVuRSxrQkFBUXFFLE9BQVI7QUFDRDtBQUNGLE9BSkQ7QUFLRCxLLENBRUQ7Ozs7NkJBQ3lCO0FBQUE7O0FBQUEsVUFBbEJwRSxNQUFrQix1RUFBSixFQUFJO0FBQ3ZCakQsYUFBT08sSUFBUCxDQUFZMEMsTUFBWixFQUFvQmhDLE9BQXBCLENBQTRCLGVBQU87QUFDakMsY0FBS2dDLE1BQUwsQ0FBWWtELEdBQVosSUFBbUJsRCxPQUFPa0QsR0FBUCxDQUFuQjtBQUNELE9BRkQ7QUFJQSxXQUFLSCxRQUFMLENBQWMvRSxPQUFkLENBQXNCLG1CQUFXO0FBQy9CLFlBQUkrQixRQUFRaUQsTUFBWixFQUFvQjtBQUNsQmpELGtCQUFRaUQsTUFBUixDQUFlaEQsTUFBZjtBQUNEO0FBQ0YsT0FKRDtBQUtEIiwiZmlsZSI6InRpbnliaW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3RpbnliaW5kLnRzXCIpO1xuIiwiaW1wb3J0IHsgSU9ic2VydmVyU3luY0NhbGxiYWNrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5cbi8vIFRoZSBkZWZhdWx0IGAuYCBhZGFwdGVyIHRoYXQgY29tZXMgd2l0aCB0aW55YmluZC5qcy4gQWxsb3dzIHN1YnNjcmliaW5nIHRvXG4vLyBwcm9wZXJ0aWVzIG9uIHBsYWluIG9iamVjdHMsIGltcGxlbWVudGVkIGluIEVTNSBuYXRpdmVzIHVzaW5nXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YC5cblxuY29uc3QgQVJSQVlfTUVUSE9EUyA9IFtcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJyxcbiAgJ3NwbGljZSdcbl07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlZiB7XG4gIGNhbGxiYWNrczogYW55W107XG4gIHBvaW50ZXJzOiBhbnlbXTtcbn1cblxuLyoqXG4gKiBUT0RPIEZvciB3aGF0IGlzIHRoaXM/XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVJWQXJyYXkgZXh0ZW5kcyBBcnJheTxhbnk+IHtcbiAgX19ydjogYW55O1xufVxuXG5leHBvcnQgdHlwZSBBZGFwdGVyRnVuY3Rpb24gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBJQWRhcHRlciB7XG4gIGNvdW50ZXI6IG51bWJlcjtcbiAgd2Vha21hcDogYW55O1xuICB3ZWFrUmVmZXJlbmNlOiAob2JqOiBhbnkpID0+IGFueTsgLy8gPT4gX19ydiA/XG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlOiAocmVmOiBJUmVmLCBpZDogbnVtYmVyKSA9PiB2b2lkO1xuICBzdHViRnVuY3Rpb246IChvYmo6IGFueSwgZm46IHN0cmluZykgPT4gYW55IC8vID0+IHJlc3BvbnNlID9cbiAgb2JzZXJ2ZU11dGF0aW9uczogKG9iajogYW55LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICB1bm9ic2VydmVNdXRhdGlvbnM6IChvYmo6IElSVkFycmF5LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICBvYnNlcnZlOiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4gdm9pZDsgXG4gIHVub2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHZvaWQ7XG4gIGdldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcpID0+IGFueTtcbiAgc2V0OiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQWRhcHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUFkYXB0ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGFwdGVyIGltcGxlbWVudHMgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXIgPSAwO1xuICB3ZWFrbWFwOmFueSA9IHt9O1xuXG4gIHdlYWtSZWZlcmVuY2Uob2JqOiBhbnkpIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eSgnX19ydicpKSB7XG4gICAgICBsZXQgaWQgPSB0aGlzLmNvdW50ZXIrKztcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19fcnYnLCB7XG4gICAgICAgIHZhbHVlOiBpZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndlYWttYXBbb2JqLl9fcnZdKSB7XG4gICAgICB0aGlzLndlYWttYXBbb2JqLl9fcnZdID0ge1xuICAgICAgICBjYWxsYmFja3M6IHt9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuICB9XG5cbiAgY2xlYW51cFdlYWtSZWZlcmVuY2UocmVmOiBJUmVmLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKCFPYmplY3Qua2V5cyhyZWYuY2FsbGJhY2tzKS5sZW5ndGgpIHtcbiAgICAgIGlmICghKHJlZi5wb2ludGVycyAmJiBPYmplY3Qua2V5cyhyZWYucG9pbnRlcnMpLmxlbmd0aCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMud2Vha21hcFtpZF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3R1YkZ1bmN0aW9uKG9iajogYW55LCBmbjogc3RyaW5nKSB7XG4gICAgbGV0IG9yaWdpbmFsID0gb2JqW2ZuXTtcbiAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG4gICAgbGV0IHdlYWttYXAgPSB0aGlzLndlYWttYXA7XG5cbiAgICBvYmpbZm5dID0gKC4uLmFyZ3M6IGFueVtdKTogQWRhcHRlckZ1bmN0aW9uID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IG9yaWdpbmFsLmFwcGx5KG9iaiwgYXJncyk7XG5cbiAgICAgIE9iamVjdC5rZXlzKG1hcC5wb2ludGVycykuZm9yRWFjaChyID0+IHtcbiAgICAgICAgbGV0IGsgPSBtYXAucG9pbnRlcnNbcl07XG5cbiAgICAgICAgaWYgKHdlYWttYXBbcl0pIHtcbiAgICAgICAgICBpZiAod2Vha21hcFtyXS5jYWxsYmFja3Nba10gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgd2Vha21hcFtyXS5jYWxsYmFja3Nba10uZm9yRWFjaCgoY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjay5zeW5jKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcbiAgfVxuXG4gIG9ic2VydmVNdXRhdGlvbnMob2JqOiBhbnksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcblxuICAgICAgaWYgKCFtYXAucG9pbnRlcnMpIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzID0ge307XG5cbiAgICAgICAgQVJSQVlfTUVUSE9EUy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICB0aGlzLnN0dWJGdW5jdGlvbihvYmosIGZuKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzW3JlZl0pIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzW3JlZl0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcC5wb2ludGVyc1tyZWZdLmluZGV4T2Yoa2V5cGF0aCkgPT09IC0xKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdLnB1c2goa2V5cGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdW5vYnNlcnZlTXV0YXRpb25zKG9iajogSVJWQXJyYXksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEFycmF5KSAmJiAob2JqLl9fcnYgIT0gbnVsbCkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICBpZiAobWFwKSB7XG4gICAgICAgIGxldCBwb2ludGVycyA9IG1hcC5wb2ludGVyc1tyZWZdO1xuXG4gICAgICAgIGlmIChwb2ludGVycykge1xuICAgICAgICAgIGxldCBpZHggPSBwb2ludGVycy5pbmRleE9mKGtleXBhdGgpO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICBwb2ludGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5wb2ludGVyc1tyZWZdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY2xlYW51cFdlYWtSZWZlcmVuY2UobWFwLCBvYmouX19ydik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvYnNlcnZlKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spIHtcbiAgICB2YXIgdmFsdWU6IGFueTtcbiAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaikuY2FsbGJhY2tzO1xuXG4gICAgaWYgKCFjYWxsYmFja3Nba2V5cGF0aF0pIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXSA9IFtdO1xuICAgICAgbGV0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5cGF0aCk7XG5cbiAgICAgIGlmICghZGVzYyB8fCAhKGRlc2MuZ2V0IHx8IGRlc2Muc2V0IHx8ICFkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgICAgdmFsdWUgPSBvYmpba2V5cGF0aF07XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5cGF0aCwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMudW5vYnNlcnZlTXV0YXRpb25zKHZhbHVlLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICAgICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKChjYjogSU9ic2VydmVyU3luY0NhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNiLnN5bmMoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU11dGF0aW9ucyhuZXdWYWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2tzW2tleXBhdGhdLmluZGV4T2YoY2FsbGJhY2spID09PSAtMSkge1xuICAgICAgY2FsbGJhY2tzW2tleXBhdGhdLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHRoaXMub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgfVxuXG4gIHVub2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBsZXQgaWR4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuXG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgICAgIGlmICghY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG4gICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG9ialtrZXlwYXRoXTtcbiAgfVxuXG4gIHNldChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgb2JqW2tleXBhdGhdID0gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IGFkYXB0ZXIgPSBuZXcgQWRhcHRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBhZGFwdGVyO1xuIiwiaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcblxuLyoqXG4gKiBPbmUgd2F5IGJpbmRlciBpbnRlcmZhY2VcbiAqL1xuZXhwb3J0IHR5cGUgSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+ID0gKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKSA9PiB2b2lkO1xuXG4vKipcbiAqIFRvIHdheSBiaW5kZXIgaW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+IHtcbiAgcm91dGluZTogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKSA9PiB2b2lkO1xuICBiaW5kPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICB1bmJpbmQ/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIHVwZGF0ZT86ICh0aGlzOiBCaW5kaW5nLCBtb2RlbDogYW55KSA9PiB2b2lkO1xuICBnZXRWYWx1ZT86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgYmxvY2s/OiBib29sZWFuO1xuICBmdW5jdGlvbj86IGJvb2xlYW47XG4gIHB1Ymxpc2hlcz86IGJvb2xlYW47XG4gIHByaW9yaXR5PzogbnVtYmVyO1xuICAvKipcbiAgICogSWYgeW91IHdhbnQgdG8gc2F2ZSBjdXN0b20gZGF0YSBpbiB0aGlzIHVzZSB0aGlzIG9iamVjdFxuICAgKi9cbiAgY3VzdG9tRGF0YT86IGFueTtcbn1cblxuLyoqXG4gKiBBIGJpbmRlciBjYW4gYmUgYSBvbmUgd2F5IGJpbmRlciBvciBhIHR3byB3YXkgYmluZGVyXG4gKi9cbmV4cG9ydCB0eXBlIEJpbmRlcjxWYWx1ZVR5cGU+ID0gSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+IHwgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+XG5cbi8qKlxuICogQSBsaXN0IG9mIGJpbmRlcnMgd2l0aCBhbnkga2V5IG5hbWVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJQmluZGVyczxWYWx1ZVR5cGU+IHtcbiAgW25hbWU6IHN0cmluZ106IEJpbmRlcjxWYWx1ZVR5cGU+O1xufVxuXG5cbmNvbnN0IGdldFN0cmluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsID8gdmFsdWUudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRpbWVzID0gKG46IG51bWJlciwgY2I6KCkgPT4gdm9pZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgY2IoKTtcbn07XG5cbmNvbnN0IGNyZWF0ZVZpZXcgPSAoYmluZGluZzogQmluZGluZywgbW9kZWxzOiBhbnksIGFuY2hvckVsOiBIVE1MRWxlbWVudCB8IE5vZGUgfCBudWxsKSA9PiB7XG4gIGxldCB0ZW1wbGF0ZSA9IGJpbmRpbmcuZWwuY2xvbmVOb2RlKHRydWUpO1xuICBsZXQgdmlldyA9IG5ldyBWaWV3KCh0ZW1wbGF0ZSBhcyBOb2RlKSwgbW9kZWxzLCBiaW5kaW5nLnZpZXcub3B0aW9ucyk7XG4gIHZpZXcuYmluZCgpO1xuICBpZighYmluZGluZyB8fCAhYmluZGluZy5tYXJrZXIgfHwgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcGFyZW50IG5vZGUgZm9yIGJpbmRpbmchJyk7XG4gIH1cblxuICBiaW5kaW5nLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZW1wbGF0ZSwgYW5jaG9yRWwpO1xuXG4gIHJldHVybiB2aWV3O1xufVxuXG5jb25zdCBiaW5kZXJzOiBJQmluZGVyczxhbnk+ID0ge1xuICAvLyBCaW5kcyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBlbGVtZW50LlxuICAnb24tKic6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBwcmlvcml0eTogMTAwMCxcblxuICAgIGJpbmQoZWwpIHtcbiAgICAgIGlmKCF0aGlzLmN1c3RvbURhdGEpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0ge1xuICAgICAgICAgIGhhbmRsZXI6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYW55IC8qVE9ETyovKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpIHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1c3RvbURhdGEuaGFuZGxlciA9IHRoaXMuZXZlbnRIYW5kbGVyKHZhbHVlKTtcbiAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQXBwZW5kcyBib3VuZCBpbnN0YW5jZXMgb2YgdGhlIGVsZW1lbnQgaW4gcGxhY2UgZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuXG4gICdlYWNoLSonOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG5cbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChgIHRpbnliaW5kOiAke3RoaXMudHlwZX0gYCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHtcbiAgICAgICAgICBpdGVyYXRlZDogPFZpZXdbXT4gW11cbiAgICAgICAgfTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpICA9PiB7XG4gICAgICAgICAgdmlldy5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWwpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbCwgY29sbGVjdGlvbikge1xuICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICB9XG4gICAgICBsZXQgbW9kZWxOYW1lID0gdGhpcy5hcmdzWzBdO1xuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24gfHwgW107XG5cbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBvYmplY3Qga2V5cyB0byBpdGVyYXRlIG92ZXJcbiAgICAgIGlmKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZWFjaC0nICsgbW9kZWxOYW1lICsgJyBuZWVkcyBhbiBhcnJheSB0byBpdGVyYXRlIG92ZXIsIGJ1dCBpdCBpcycpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBpbmRleCBuYW1lIGlzIHNldGVkIGJ5IGBpbmRleC1wcm9wZXJ0eWAgdXNlIHRoaXMgbmFtZSwgb3RoZXJ3aXNlIGAlW21vZGVsTmFtZV0lYCAgXG4gICAgICBsZXQgaW5kZXhQcm9wID0gZWwuZ2V0QXR0cmlidXRlKCdpbmRleC1wcm9wZXJ0eScpIHx8IHRoaXMuZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lKTtcblxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChtb2RlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB7JHBhcmVudDogdGhpcy52aWV3Lm1vZGVsc307XG4gICAgICAgIHNjb3BlW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgc2NvcGVbbW9kZWxOYW1lXSA9IG1vZGVsO1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZFtpbmRleF07XG5cbiAgICAgICAgaWYgKCF2aWV3KSB7XG4gICAgICAgICAgbGV0IHByZXZpb3VzOiBDb21tZW50IHwgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgcHJldmlvdXMgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCAtIDFdLmVsc1swXTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhpcy5tYXJrZXIpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5tYXJrZXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2aWV3ID0gY3JlYXRlVmlldyh0aGlzLCBzY29wZSwgcHJldmlvdXMubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5wdXNoKHZpZXcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2aWV3Lm1vZGVsc1ttb2RlbE5hbWVdICE9PSBtb2RlbCkge1xuICAgICAgICAgICAgLy8gc2VhcmNoIGZvciBhIHZpZXcgdGhhdCBtYXRjaGVzIHRoZSBtb2RlbFxuICAgICAgICAgICAgbGV0IG1hdGNoSW5kZXgsIG5leHRWaWV3O1xuICAgICAgICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gaW5kZXggKyAxOyBuZXh0SW5kZXggPCB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgICAgICAgICAgICBuZXh0VmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZFtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAobmV4dFZpZXcubW9kZWxzW21vZGVsTmFtZV0gPT09IG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hJbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBtb2RlbCBpcyBpbiBvdGhlciBwb3NpdGlvblxuICAgICAgICAgICAgICAvLyB0b2RvOiBjb25zaWRlciBhdm9pZGluZyB0aGUgc3BsaWNlIGhlcmUgYnkgc2V0dGluZyBhIGZsYWdcbiAgICAgICAgICAgICAgLy8gcHJvZmlsZSBwZXJmb3JtYW5jZSBiZWZvcmUgaW1wbGVtZW50aW5nIHN1Y2ggY2hhbmdlXG4gICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5zcGxpY2UobWF0Y2hJbmRleCwgMSk7XG4gICAgICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5leHRWaWV3LmVsc1swXSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgICBuZXh0Vmlldy5tb2RlbHNbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy9uZXcgbW9kZWxcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSBjcmVhdGVWaWV3KHRoaXMsIHNjb3BlLCB2aWV3LmVsc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKGluZGV4LCAwLCBuZXh0Vmlldyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCA+IGNvbGxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgIHRpbWVzKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSBjb2xsZWN0aW9uLmxlbmd0aCwgKCkgPT4ge1xuICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnBvcCgpO1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgICAgaWYoIXRoaXMubWFya2VyIHx8ICF0aGlzLm1hcmtlci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2aWV3LmVsc1swXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwubm9kZU5hbWUgPT09ICdPUFRJT04nICYmIHRoaXMudmlldy5iaW5kaW5ncykge1xuICAgICAgICB0aGlzLnZpZXcuYmluZGluZ3MuZm9yRWFjaCgoYmluZGluZzogQmluZGluZykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm1hcmtlciAmJiAoYmluZGluZy5lbCA9PT0gdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkgJiYgKGJpbmRpbmcudHlwZSA9PT0gJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGJpbmRpbmcuc3luYygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZShtb2RlbHMpIHtcbiAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcblxuICAgICAgLy90b2RvOiBhZGQgdGVzdCBhbmQgZml4IGlmIG5lY2Vzc2FyeVxuXG4gICAgICBPYmplY3Qua2V5cyhtb2RlbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ICE9PSB0aGlzLmFyZ3NbMF0pIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSBtb2RlbHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSA9PiB7XG4gICAgICAgIHZpZXcudXBkYXRlKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFkZHMgb3IgcmVtb3ZlcyB0aGUgY2xhc3MgZnJvbSB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgb3IgZmFsc2UuXG4gICdjbGFzcy0qJzogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBsZXQgZWxDbGFzcyA9IGAgJHtlbC5jbGFzc05hbWV9IGA7XG4gICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgIT09IChlbENsYXNzLmluZGV4T2YoYCAke3RoaXMuYXJnc1swXX0gYCkgPiAtMSkpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBgJHtlbC5jbGFzc05hbWV9ICR7dGhpcy5hcmdzWzBdfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBlbENsYXNzLnJlcGxhY2UoYCAke3RoaXMuYXJnc1swXX0gYCwgJyAnKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyB0ZXh0IHZhbHVlLlxuICB0ZXh0OiA8SU9uZVdheUJpbmRlcjxzdHJpbmc+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyBIVE1MIGNvbnRlbnQuXG4gIGh0bWw6IDxJT25lV2F5QmluZGVyPHN0cmluZz4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGVsLmlubmVySFRNTCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8vIFNob3dzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZS5cbiAgc2hvdzogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgfSxcblxuICAvLyBIaWRlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgKG5lZ2F0ZWQgdmVyc2lvbiBvZiBgc2hvd2AgYmluZGVyKS5cbiAgaGlkZTogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnbm9uZScgOiAnJztcbiAgfSxcblxuICAvLyBFbmFibGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZS5cbiAgZW5hYmxlZDogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MQnV0dG9uRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgfSxcblxuICAvLyBEaXNhYmxlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgKG5lZ2F0ZWQgdmVyc2lvbiBvZiBgZW5hYmxlZGAgYmluZGVyKS5cbiAgZGlzYWJsZWQ6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEJ1dHRvbkVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9LFxuXG4gIC8vIENoZWNrcyBhIGNoZWNrYm94IG9yIHJhZGlvIGlucHV0IHdoZW4gdGhlIHZhbHVlIGlzIHRydWUuIEFsc28gc2V0cyB0aGUgbW9kZWxcbiAgLy8gcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgaXMgY2hlY2tlZCBvciB1bmNoZWNrZWQgKHR3by13YXkgYmluZGVyKS5cbiAgY2hlY2tlZDogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMjAwMCxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxTZWxlY3RFbGVtZW50LCB2YWx1ZSkge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IGdldFN0cmluZyhlbC52YWx1ZSkgPT09IGdldFN0cmluZyh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gISF2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIHZhbHVlLiBBbHNvIHNldHMgdGhlIG1vZGVsIHByb3BlcnR5IHdoZW4gdGhlIGlucHV0IGNoYW5nZXNcbiAgLy8gKHR3by13YXkgYmluZGVyKS5cbiAgdmFsdWU6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBwdWJsaXNoZXM6IHRydWUsXG4gICAgcHJpb3JpdHk6IDMwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbC50eXBlID09PSAncmFkaW8nO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuZXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2V2ZW50LW5hbWUnKSB8fCAoZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcgPyAnY2hhbmdlJyA6ICdpbnB1dCcpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmN1c3RvbURhdGEuZXZlbnQsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZChlbCkge1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuY3VzdG9tRGF0YS5ldmVudCwgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LCB2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YSAmJiB0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnR5cGUgPT09ICdzZWxlY3QtbXVsdGlwbGUnICYmIGVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZWxbaV07XG4gICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChnZXRTdHJpbmcodmFsdWUpICE9PSBnZXRTdHJpbmcoZWwudmFsdWUpKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBJbnNlcnRzIGFuZCBiaW5kcyB0aGUgZWxlbWVudCBhbmQgaXQncyBjaGlsZCBub2RlcyBpbnRvIHRoZSBET00gd2hlbiB0cnVlLlxuICBpZjogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIGJsb2NrOiB0cnVlLFxuICAgIHByaW9yaXR5OiA0MDAwLFxuXG4gICAgYmluZChlbDogSFRNTFVua25vd25FbGVtZW50KSB7XG4gICAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcbiAgICAgIGlmICghdGhpcy5tYXJrZXIpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcgdGlueWJpbmQ6ICcgKyB0aGlzLnR5cGUgKyAnICcgKyB0aGlzLmtleXBhdGggKyAnICcpO1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSBmYWxzZTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5tYXJrZXIsIGVsKTtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLmN1c3RvbURhdGEuYm91bmQgPT09IGZhbHNlICYmICB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLmJpbmQoKTtcbiAgICAgIH1cbiAgICAgICB0aGlzLmN1c3RvbURhdGEuYm91bmQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB1bmJpbmQoKSB7XG4gICAgICBpZiAoIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQudW5iaW5kKCk7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEuYm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgICBpZiAodmFsdWUgIT09IHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCkge1xuICAgICAgICBpZiAodmFsdWUpIHtcblxuICAgICAgICAgIGlmICghIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkID0gbmV3IFZpZXcoZWwsIHRoaXMudmlldy5tb2RlbHMsIHRoaXMudmlldy5vcHRpb25zKTtcbiAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLmJpbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoIXRoaXMubWFya2VyIHx8ICF0aGlzLm1hcmtlci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHRoaXMubWFya2VyLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZShtb2RlbHMpIHtcbiAgICAgIGlmICggdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGJpbmRlcnMgfTtcblxuZXhwb3J0IGRlZmF1bHQgYmluZGVycztcbiIsImltcG9ydCB7IHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBPYnNlcnZlciwgSU9ic2VydmVyU3luY0NhbGxiYWNrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBCaW5kZXIsIElPbmVXYXlCaW5kZXIsIElUd29XYXlCaW5kZXIgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlck9ic2VydmVycyB7XG4gIFtrZXk6IHN0cmluZ106IHtcbiAgICBba2V5OiBzdHJpbmddOiBPYnNlcnZlclxuICB9XG59XG5cbmV4cG9ydCB0eXBlIGV2ZW50SGFuZGxlckZ1bmN0aW9uID0gKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcblxuLyoqXG4gKiBUT0RPIG1vdmUgdG8gdXRpbHNcbiAqIEBwYXJhbSBlbFxuICovXG5mdW5jdGlvbiBnZXRJbnB1dFZhbHVlKGVsOiBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgbGV0IHJlc3VsdHM6IHN0cmluZ1tdID0gW107XG4gIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgcmV0dXJuIChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkO1xuICB9IGVsc2UgaWYgKGVsLnR5cGUgPT09ICdzZWxlY3QtbXVsdGlwbGUnKSB7XG4gICAgbGV0IG9wdGlvbnM6SFRNTE9wdGlvbnNDb2xsZWN0aW9uID0gKGVsIGFzIEhUTUxTZWxlY3RFbGVtZW50KS5vcHRpb25zO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW2tleV07XG4gICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC52YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIFVzZWQgYWxzbyBpbiBwYXJzZXJzLnBhcnNlVHlwZVxuICogVE9ETyBvdXRzb3VyY2VcbiAqL1xuY29uc3QgUFJJTUlUSVZFID0gMDtcbmNvbnN0IEtFWVBBVEggPSAxO1xuXG5jb25zdCBGT1JNQVRURVJfQVJHUyA9ICAvW15cXHMnXSt8JyhbXiddfCdbXlxcc10pKid8XCIoW15cIl18XCJbXlxcc10pKlwiL2c7XG5jb25zdCBGT1JNQVRURVJfU1BMSVQgPSAvXFxzKy87XG5cbi8qKlxuICogIEEgc2luZ2xlIGJpbmRpbmcgYmV0d2VlbiBhIG1vZGVsIGF0dHJpYnV0ZSBhbmQgYSBET00gZWxlbWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEJpbmRpbmcge1xuICB2YWx1ZT86IGFueTtcbiAgb2JzZXJ2ZXI/OiBPYnNlcnZlcjtcbiAgdmlldzogVmlldztcbiAgZWw6IEhUTUxFbGVtZW50O1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgYmluZGVyIHdpdGhvdXQgdGhlIHByZWZpeFxuICAgKi9cbiAgdHlwZTogc3RyaW5nIHwgbnVsbDtcbiAgYmluZGVyOiBCaW5kZXI8YW55PiB8IG51bGw7XG4gIGZvcm1hdHRlcnM6IHN0cmluZ1tdIHwgbnVsbDtcbiAgZm9ybWF0dGVyT2JzZXJ2ZXJzOiBJRm9ybWF0dGVyT2JzZXJ2ZXJzO1xuICBrZXlwYXRoOiBzdHJpbmcgfCBudWxsO1xuICAvKipcbiAgICogQXJndW1lbnRzIHBhcnNlZCBmcm9tIHN0YXIgYmluZGVycywgZS5nLiBvbiBmb28tKi0qIGFyZ3NbMF0gaXMgdGhlIGZpcnN0IHN0YXIsIGFyZ3NbMV0gdGhlIHNlY29uZC1cbiAgICovXG4gIGFyZ3M6IHN0cmluZ1tdIHwgbnVsbDtcbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgbW9kZWw/OiBhbnk7XG4gIC8qKlxuICAgKiBIVE1MIENvbW1lbnQgdG8gbWFyayBhIGJpbmRpbmcgaW4gdGhlIERPTVxuICAgKi9cbiAgbWFya2VyPzogQ29tbWVudDtcbiAgLyoqXG4gICAqIFVzZWQgaW4gY29tcG9uZW50IGJpbmRpbmdzLiBUT0RPIGUuZy4gbW92ZSB0byBDb21wb25lbnRCaW5kaW5nIG9yIGJpbmRlcnM/XG4gICAqL1xuICBfYm91bmQ/OiBib29sZWFuO1xuICAvKipcbiAgICoganVzdCB0byBoYXZlIGEgdmFsdWUgd2hlcmUgd2UgY291bGQgc3RvcmUgY3VzdG9tIGRhdGFcbiAgICovXG4gIGN1c3RvbURhdGE/OiBhbnk7XG5cbiAgLyoqXG4gICAqIEFsbCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYmluZGluZyBpcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3I7IHRoZVxuICAgKiBjb250YWluaW5nIHZpZXcsIHRoZSBET00gbm9kZSwgdGhlIHR5cGUgb2YgYmluZGluZywgdGhlIG1vZGVsIG9iamVjdCBhbmQgdGhlXG4gICAqIGtleXBhdGggYXQgd2hpY2ggdG8gbGlzdGVuIGZvciBjaGFuZ2VzLlxuICAgKiBAcGFyYW0geyp9IHZpZXcgXG4gICAqIEBwYXJhbSB7Kn0gZWwgXG4gICAqIEBwYXJhbSB7Kn0gdHlwZSBcbiAgICogQHBhcmFtIHsqfSBrZXlwYXRoIFxuICAgKiBAcGFyYW0geyp9IGJpbmRlciBcbiAgICogQHBhcmFtIHsqfSBhcmdzIFRoZSBzdGFydCBiaW5kZXJzLCBvbiBgY2xhc3MtKmAgYXJnc1swXSB3aWwgYmUgdGhlIGNsYXNzbmFtZSBcbiAgICogQHBhcmFtIHsqfSBmb3JtYXR0ZXJzIFxuICAgKi9cbiAgY29uc3RydWN0b3IodmlldzogVmlldywgZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcgfCBudWxsLCBrZXlwYXRoOiBzdHJpbmcgfCBudWxsLCBiaW5kZXI6IEJpbmRlcjxhbnk+IHwgbnVsbCwgYXJnczogc3RyaW5nW10gfCBudWxsLCBmb3JtYXR0ZXJzOiBzdHJpbmdbXSB8IG51bGwpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5iaW5kZXIgPSBiaW5kZXI7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gICAgdGhpcy5tb2RlbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcblxuICB9XG5cbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoZSBvYmplY3Qga2V5cGF0aFxuICAgKiBAcGFyYW0gb2JqIFxuICAgKiBAcGFyYW0ga2V5cGF0aCBcbiAgICovXG4gIG9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s/OiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spOiBPYnNlcnZlciB7XG4gICAgaWYoY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCB0aGlzKTtcbiAgICB9XG4gICAgXG4gIH1cblxuICBwYXJzZVRhcmdldCgpIHtcbiAgICBpZiAodGhpcy5rZXlwYXRoKSB7XG4gICAgICBsZXQgdG9rZW4gPSBwYXJzZVR5cGUodGhpcy5rZXlwYXRoKTtcbiAgICAgIGlmICh0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRva2VuLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpe1xuICAgICAgICB0aGlzLm9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIHRoaXMua2V5cGF0aCk7XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlIGluIHRva2VuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogR2V0IHRoZSBpdGVyYXRpb24gYWxpYXMsIHVzZWQgaW4gdGhlIGludGVyYXRpb24gYmluZGVycyBsaWtlIGBlYWNoLSpgXG4gICAqIEBwYXJhbSB7Kn0gbW9kZWxOYW1lIFxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMjZcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDExNzVcbiAgICovXG4gIGdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICclJyArIG1vZGVsTmFtZSArICclJztcbiAgfVxuXG4gIHBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3M6IHN0cmluZ1tdLCBmb3JtYXR0ZXJJbmRleDogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBhcmdzXG4gICAgLm1hcChwYXJzZVR5cGUpXG4gICAgLm1hcCgoe3R5cGUsIHZhbHVlfSwgYWkpID0+IHtcbiAgICAgIGlmICh0eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgY29uc3QgcHJpbWl0aXZlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHByaW1pdGl2ZVZhbHVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgIC8vIGtleXBhdGggaXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGtleXBhdGggPSAodmFsdWUgYXMgc3RyaW5nICk7XG4gICAgICAgIGlmICghdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldO1xuXG4gICAgICAgIGlmICghb2JzZXJ2ZXIpIHtcbiAgICAgICAgICBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCBrZXlwYXRoKTtcbiAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldID0gb2JzZXJ2ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic2VydmVyLnZhbHVlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYXJndW1lbnQgdHlwZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgYWxsIHRoZSBjdXJyZW50IGZvcm1hdHRlcnMgdG8gdGhlIHN1cHBsaWVkIHZhbHVlIGFuZCByZXR1cm5zIHRoZVxuICAgKiBmb3JtYXR0ZWQgdmFsdWUuXG4gICAqL1xuICBmb3JtYXR0ZWRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYodGhpcy5mb3JtYXR0ZXJzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdHRlcnMgaXMgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZSgocmVzdWx0OiBhbnkvKmNoZWNrIHR5cGUqLywgZGVjbGFyYXRpb246IHN0cmluZyAvKmNoZWNrIHR5cGUqLywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSBkZWNsYXJhdGlvbi5tYXRjaChGT1JNQVRURVJfQVJHUyk7XG4gICAgICBpZihhcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYXJncyBtYXRjaGVkIGZyb20gRk9STUFUVEVSX0FSR1MnKTtcbiAgICAgIH1cbiAgICAgIGxldCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGlmKCFpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGlkIGZvdW5kIGluIGFyZ3MnKTtcbiAgICAgIH1cbiAgICAgIGxldCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcblxuICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICBpZiAoZm9ybWF0dGVyICYmIChmb3JtYXR0ZXIucmVhZCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucmVhZChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gZXZlbnQgaGFuZGxlciBmb3IgdGhlIGJpbmRpbmcgYXJvdW5kIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAgICovXG4gIGV2ZW50SGFuZGxlcihmbjogZXZlbnRIYW5kbGVyRnVuY3Rpb24pOiAoZXY6IEV2ZW50KSA9PiBhbnkge1xuICAgIGxldCBiaW5kaW5nID0gdGhpcztcbiAgICBsZXQgaGFuZGxlciA9IGJpbmRpbmcudmlldy5vcHRpb25zLmhhbmRsZXI7XG5cbiAgICByZXR1cm4gKGV2KSA9PiB7XG4gICAgICBpZighaGFuZGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGhhbmRsZXIgZGVmaW5lZCBpbiBiaW5kaW5nLnZpZXcub3B0aW9ucy5oYW5kbGVyJyk7XG4gICAgICB9XG4gICAgICBoYW5kbGVyLmNhbGwoZm4sIHRoaXMsIGV2LCBiaW5kaW5nKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIGZvciB0aGUgYmluZGluZy4gVGhpcyBCYXNpY2FsbHkganVzdCBydW5zIHRoZSBiaW5kaW5nIHJvdXRpbmVcbiAgICogd2l0aCB0aGUgc3VwcGxpZWQgdmFsdWUgZm9ybWF0dGVkLlxuICAgKi9cbiAgc2V0KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pICYmICEodGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+ICkuZnVuY3Rpb24pIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElPbmVXYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUuY2FsbCh0aGlzLm1vZGVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gKHZhbHVlIGFzIElUd29XYXlCaW5kZXI8YW55PiApXG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIGxldCByb3V0aW5lRm47XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ3JvdXRpbmUnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICByb3V0aW5lRm4gPSB0aGlzLmJpbmRlci5yb3V0aW5lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSU9uZVdheUJpbmRlcjxhbnk+KTtcbiAgICAgIHJvdXRpbmVGbiA9IHRoaXMuYmluZGVyO1xuICAgIH1cblxuICAgIGlmIChyb3V0aW5lRm4gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcm91dGluZUZuLmNhbGwodGhpcywgdGhpcy5lbCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTeW5jcyB1cCB0aGUgdmlldyBiaW5kaW5nIHdpdGggdGhlIG1vZGVsLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgdGhpcy5zZXQodGhpcy5vYnNlcnZlci52YWx1ZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFB1Ymxpc2hlcyB0aGUgdmFsdWUgY3VycmVudGx5IHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudCBiYWNrIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIHB1Ymxpc2goKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIGlmKHRoaXMuZm9ybWF0dGVycyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdHRlcnMgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgbGV0IHZhbHVlID0gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZVJpZ2h0KChyZXN1bHQ6IGFueS8qY2hlY2sgdHlwZSovLCBkZWNsYXJhdGlvbjogc3RyaW5nIC8qY2hlY2sgdHlwZSovLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBkZWNsYXJhdGlvbi5zcGxpdChGT1JNQVRURVJfU1BMSVQpO1xuICAgICAgICBjb25zdCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgaWYoIWlkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpZCBub3QgZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnNbaWRdO1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG5cbiAgICAgICAgaWYgKGZvcm1hdHRlciAmJiBmb3JtYXR0ZXIucHVibGlzaCkge1xuICAgICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5wdWJsaXNoKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sIHRoaXMuZ2V0VmFsdWUoKHRoaXMuZWwgYXMgSFRNTElucHV0RWxlbWVudCkpKTtcblxuICAgICAgdGhpcy5vYnNlcnZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gdGhlIG1vZGVsIGZvciBjaGFuZ2VzIGF0IHRoZSBzcGVjaWZpZWQga2V5cGF0aC4gQmktZGlyZWN0aW9uYWxcbiAgICogcm91dGluZXMgd2lsbCBhbHNvIGxpc3RlbiBmb3IgY2hhbmdlcyBvbiB0aGUgZWxlbWVudCB0byBwcm9wYWdhdGUgdGhlbSBiYWNrXG4gICAqIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5wYXJzZVRhcmdldCgpO1xuXG4gICAgaWYgKHRoaXMuYmluZGVyICYmIHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdiaW5kJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZighdGhpcy5iaW5kZXIuYmluZCAmJiB0eXBlb2YodGhpcy5iaW5kZXIuYmluZCkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgbWV0aG9kIGJpbmQgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYmluZGVyLmJpbmQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3Lm9wdGlvbnMucHJlbG9hZERhdGEpIHtcbiAgICAgIHRoaXMuc3luYygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSB0aGUgbW9kZWwgYW5kIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgdW5iaW5kKCkge1xuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdiaW5kJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYgKHRoaXMuYmluZGVyLnVuYmluZCkge1xuICAgICAgICB0aGlzLmJpbmRlci51bmJpbmQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5vYnNlcnZlci51bm9ic2VydmUoKTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1hdHRlck9ic2VydmVycykuZm9yRWFjaChmaSA9PiB7XG4gICAgICBsZXQgYXJncyA9IHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2ZpXTtcblxuICAgICAgT2JqZWN0LmtleXMoYXJncykuZm9yRWFjaChhaSA9PiB7XG4gICAgICAgIGFyZ3NbYWldLnVub2JzZXJ2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVycyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGJpbmRpbmcncyBtb2RlbCBmcm9tIHdoYXQgaXMgY3VycmVudGx5IHNldCBvbiB0aGUgdmlldy4gVW5iaW5kc1xuICAgKiB0aGUgb2xkIG1vZGVsIGZpcnN0IGFuZCB0aGVuIHJlLWJpbmRzIHdpdGggdGhlIG5ldyBtb2RlbC5cbiAgICogQHBhcmFtIHthbnl9IG1vZGVscyBcbiAgICovXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ3VwZGF0ZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmICh0aGlzLmJpbmRlci51cGRhdGUpIHtcbiAgICAgICAgdGhpcy5iaW5kZXIudXBkYXRlLmNhbGwodGhpcywgbW9kZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBlbGVtZW50cyB2YWx1ZVxuICAgKiBAcGFyYW0gZWwgXG4gICAqL1xuICBnZXRWYWx1ZShlbDogSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2dldFZhbHVlJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYodHlwZW9mKHRoaXMuYmluZGVyLmdldFZhbHVlKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFZhbHVlIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5iaW5kZXIuZ2V0VmFsdWUuY2FsbCh0aGlzLCBlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRJbnB1dFZhbHVlKGVsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHRpbnliaW5kLCBJT3B0aW9uc1BhcmFtIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBJQmluZGVycyB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBJRm9ybWF0dGVycyB9IGZyb20gJy4vZm9ybWF0dGVycyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IElDb21wb25lbnQsIElDb21wb25lbnRzIH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IElPYnNlcnZlcnMgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5cbmNvbnN0IG1lcmdlT2JqZWN0ID0gKHRhcmdldDogYW55LCBvYmo6IGFueSkgPT4ge1xuICBpZihvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghdGFyZ2V0W2tleV0gfHwgdGFyZ2V0W2tleV0gPT09IHt9KSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRhcmdldDsgXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElCb3VuZEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIF9ib3VuZD86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuZXhwb3J0IGludGVyZmFjZSBJS2V5cGF0aHMge1xuICBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbi8qKlxuICogY29tcG9uZW50IHZpZXcgZW5jYXBzdWxhdGVkIGFzIGEgYmluZGluZyB3aXRoaW4gaXQncyBwYXJlbnQgdmlldy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJpbmRpbmcgZXh0ZW5kcyBCaW5kaW5nIHtcbiAgdmlldzogVmlldztcbiAgY29tcG9uZW50Vmlldz86IFZpZXc7XG4gIGVsOiBJQm91bmRFbGVtZW50O1xuICB0eXBlOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogSUNvbXBvbmVudDtcbiAgLyoqXG4gICAqIHN0YXRpYyB2YWx1ZXMgKFBSSU1JVElWRSBBdHRyaWJ1dGVzKVxuICAgKi9cbiAgc3RhdGljOiBhbnk7XG4gIGJvdW5kOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBrZXlwYXRoIHZhbHVlcyAoS0VZUEFUSCBBdHRyaWJ1dGVzKVxuICAgKi9cbiAga2V5cGF0aHM6IElLZXlwYXRocyA9IHt9O1xuICBvYnNlcnZlcnM6IElPYnNlcnZlcnM7XG4gIHVwc3RyZWFtT2JzZXJ2ZXJzOiBJT2JzZXJ2ZXJzO1xuXG4gIC8vIEluaXRpYWxpemVzIGEgY29tcG9uZW50IGJpbmRpbmcgZm9yIHRoZSBzcGVjaWZpZWQgdmlldy4gVGhlIHJhdyBjb21wb25lbnRcbiAgLy8gZWxlbWVudCBpcyBwYXNzZWQgaW4gYWxvbmcgd2l0aCB0aGUgY29tcG9uZW50IHR5cGUuIEF0dHJpYnV0ZXMgYW5kIHNjb3BlXG4gIC8vIGluZmxlY3Rpb25zIGFyZSBkZXRlcm1pbmVkIGJhc2VkIG9uIHRoZSBjb21wb25lbnRzIGRlZmluZWQgYXR0cmlidXRlcy5cbiAgY29uc3RydWN0b3IodmlldzogVmlldywgZWw6IEhUTUxFbGVtZW50LCB0eXBlOiBzdHJpbmcpIHtcbiAgICBzdXBlcih2aWV3LCBlbCwgdHlwZSwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHZpZXcub3B0aW9ucy5jb21wb25lbnRzW3RoaXMudHlwZV07XG4gICAgdGhpcy5zdGF0aWMgPSB7fTtcbiAgICB0aGlzLm9ic2VydmVycyA9IHt9O1xuICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnMgPSB7fTtcbiAgICBcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIFxuICAgIC8vIHBhcnNlIGNvbXBvbmVudCBhdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuXG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIG5vdCB3aXRoIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2LVxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YoYmluZGluZ1ByZWZpeCkgIT09IDApIHtcbiAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IHRoaXMuY2FtZWxDYXNlKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgIGxldCBzdGF0ID0gdGhpcy5jb21wb25lbnQuc3RhdGljO1xuICAgIFxuICAgICAgICBpZiAoc3RhdCAmJiBzdGF0LmluZGV4T2YocHJvcGVydHlOYW1lKSA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5zdGF0aWNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICAgIHRoaXMuc3RhdGljW3Byb3BlcnR5TmFtZV0gPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgICAvLyBUT0RPIGF0dHJpYnV0ZS52YWx1ZSBpcyBub3QgYW4gb2JzZXJ2ZXJcbiAgICAgICAgICB0aGlzLmtleXBhdGhzW3Byb3BlcnR5TmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5cXCd0IHBhcnNlIGNvbXBvbmVudCBhdHRyaWJ1dGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAgIFxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6c3luY2Agc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmQgdG9cbiAgICogYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICAgKi9cbiAgc3luYygpIHtcbiAgfVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6dXBkYXRlYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAgKiB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gICAqL1xuICB1cGRhdGUoKSB7fVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6cHVibGlzaGAgc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmRcbiAgICogdG8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICAgKi9cbiAgcHVibGlzaCgpIHt9XG4gICAgXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9iamVjdCBtYXAgdXNpbmcgdGhlIGNvbXBvbmVudCdzIHNjb3BlIGluZmxlY3Rpb25zLlxuICAgKi9cbiAgbG9jYWxzKCkge1xuICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3RhdGljKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICByZXN1bHRba2V5XSA9IHRoaXMuc3RhdGljW2tleV07XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgICBcblxuICAvKipcbiAgICogUmV0dXJucyBhIGNhbWVsLWNhc2VkIHZlcnNpb24gb2YgdGhlIHN0cmluZy4gVXNlZCB3aGVuIHRyYW5zbGF0aW5nIGFuXG4gICAqIGVsZW1lbnQncyBhdHRyaWJ1dGUgbmFtZSBpbnRvIGEgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGNvbXBvbmVudCdzIHNjb3BlLlxuICAgKiBUT0RPIG1vdmUgdG8gdXRpbHNcbiAgICogQHBhcmFtIHN0cmluZyBcbiAgICovXG4gIGNhbWVsQ2FzZShzdHJpbmc6IHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvLShbYS16XSkvZywgZ3JvdXBlZCA9PiB7XG4gICAgICByZXR1cm4gZ3JvdXBlZFsxXS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuICB9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpiaW5kYCB0byBidWlsZCBgdGhpcy5jb21wb25lbnRWaWV3YCB3aXRoIGEgbG9jYWxpemVkXG4gICAqIG1hcCBvZiBtb2RlbHMgZnJvbSB0aGUgcm9vdCB2aWV3LiBCaW5kIGB0aGlzLmNvbXBvbmVudFZpZXdgIG9uIHN1YnNlcXVlbnQgY2FsbHMuXG4gICAqL1xuICBiaW5kKCkge1xuICAgIHZhciBvcHRpb25zOiBJT3B0aW9uc1BhcmFtID0ge1xuICAgICAgLy8gRVhURU5TSU9OU1xuICAgICAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBmb3JtYXR0ZXJzOiA8SUZvcm1hdHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBjb21wb25lbnRzOiA8SUNvbXBvbmVudHM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBhZGFwdGVyczogPElBZGFwdGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLmJvdW5kKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmtleXBhdGhzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBrZXlwYXRoID0gdGhpcy5rZXlwYXRoc1trZXldO1xuXG4gICAgICAgIC8vIFRPRE8gVEVTVE1FXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywga2V5cGF0aCwge3N5bmM6ICgpID0+IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm9ic2VydmVycykge1xuICAgICAgICAgICAgaWYgKHRoaXMub2JzZXJ2ZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmVyc1trZXldO1xuICAgICAgICAgICAgICBpZighdGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb21wb25lbnRWaWV3IGlzIG5vdCBzZXQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFZpZXcubW9kZWxzW2tleV0gPSBvYnNlcnZlci52YWx1ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfX0pO1xuICAgICAgfSk7XG4gICAgXG4gICAgICB0aGlzLmJvdW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LmJpbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy5lbC5fYm91bmQgPSB0cnVlO1xuXG4gICAgICBtZXJnZU9iamVjdChvcHRpb25zLmJpbmRlcnMsIHRoaXMuY29tcG9uZW50LmJpbmRlcnMpO1xuICAgICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5mb3JtYXR0ZXJzLCB0aGlzLmNvbXBvbmVudC5mb3JtYXR0ZXJzKTtcbiAgICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuY29tcG9uZW50cywgdGhpcy5jb21wb25lbnQuY29tcG9uZW50cyk7XG4gICAgICBtZXJnZU9iamVjdChvcHRpb25zLmZvcm1hdHRlcnMsIHRoaXMuY29tcG9uZW50LmFkYXB0ZXJzKTtcblxuICAgICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5iaW5kZXJzLCB0aGlzLnZpZXcub3B0aW9ucy5iaW5kZXJzKTtcbiAgICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuZm9ybWF0dGVycywgdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgICBtZXJnZU9iamVjdChvcHRpb25zLmNvbXBvbmVudHMsIHRoaXMudmlldy5vcHRpb25zLmNvbXBvbmVudHMpO1xuICAgICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5mb3JtYXR0ZXJzLCB0aGlzLnZpZXcub3B0aW9ucy5hZGFwdGVycyk7XG5cbiAgICAgIG9wdGlvbnMucHJlZml4ID0gdGhpcy5jb21wb25lbnQucHJlZml4ID8gdGhpcy5jb21wb25lbnQucHJlZml4IDogdGhpcy52aWV3Lm9wdGlvbnMucHJlZml4XG4gICAgICBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA9IHRoaXMuY29tcG9uZW50LnRlbXBsYXRlRGVsaW1pdGVycyA/IHRoaXMuY29tcG9uZW50LnRlbXBsYXRlRGVsaW1pdGVycyA6IHRoaXMudmlldy5vcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVyc1xuICAgICAgb3B0aW9ucy5yb290SW50ZXJmYWNlID0gdGhpcy5jb21wb25lbnQucm9vdEludGVyZmFjZSA/IHRoaXMuY29tcG9uZW50LnJvb3RJbnRlcmZhY2UgOiB0aGlzLnZpZXcub3B0aW9ucy5yb290SW50ZXJmYWNlXG4gICAgICBvcHRpb25zLnByZWxvYWREYXRhID0gdGhpcy5jb21wb25lbnQucHJlbG9hZERhdGEgPyB0aGlzLmNvbXBvbmVudC5wcmVsb2FkRGF0YSA6IHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhXG4gICAgICBvcHRpb25zLmhhbmRsZXIgPSB0aGlzLmNvbXBvbmVudC5oYW5kbGVyID8gdGhpcy5jb21wb25lbnQuaGFuZGxlciA6IHRoaXMudmlldy5vcHRpb25zLmhhbmRsZXJcbiAgICAgIFxuICAgICAgLyoqXG4gICAgICAgKiB0aGVyZSdzIGEgY3ljbGljIGRlcGVuZGVuY3kgdGhhdCBtYWtlcyBpbXBvcnRlZCBWaWV3IGEgZHVtbXkgb2JqZWN0LiBVc2UgdGlueWJpbmQuYmluZFxuICAgICAgICovXG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcgPSB0aW55YmluZC5iaW5kKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuZWwuY2hpbGROb2RlcyksIHNjb3BlLCBvcHRpb25zKTtcbiAgICBcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZXJzW2tleV07XG4gICAgICAgIGlmKCF0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvbmVudFZpZXcgbm90IHNldCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vZGVscyA9IHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHM7XG5cbiAgICAgICAgLy8gVE9ETyBURVNUTUVcbiAgICAgICAgY29uc3QgdXBzdHJlYW0gPSB0aGlzLm9ic2VydmUobW9kZWxzLCBrZXksIHtzeW5jOiAoKSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5vYnNlcnZlcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9ic2VydmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnNba2V5XTtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuc2V0VmFsdWUobW9kZWxzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfX0pO1xuICAgICAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzW2tleV0gPSB1cHN0cmVhbTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0IGB0aW55YmluZC5CaW5kaW5nOjp1bmJpbmRgIHRvIGJlIGNhbGxlZCBvbiBgdGhpcy5jb21wb25lbnRWaWV3YC5cbiAgICovXG4gIHVuYmluZCgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxufSIsImV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlciB7XG4gICh2YWw6IGFueSwgLi4uYXJnczogYW55W10pOiBhbnk7XG4gIHJlYWQ/OiAocmVzdWx0OiBzdHJpbmcsIC4uLnByb2Nlc3NlZEFyZ3M6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICBwdWJsaXNoPzogKHJlc3VsdDogc3RyaW5nLCAuLi5wcm9jZXNzZWRBcmdzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRm9ybWF0dGVycyB7XG4gIFtuYW1lOiBzdHJpbmddOiBJRm9ybWF0dGVyO1xufVxuXG5jb25zdCBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycyA9IHt9O1xuXG5mb3JtYXR0ZXJzLm5vdCA9IGZ1bmN0aW9uICh2YWx1ZTogYm9vbGVhbikge1xuICByZXR1cm4gIXZhbHVlO1xufTtcblxuZXhwb3J0IHsgZm9ybWF0dGVycyB9O1xuIiwiXG5pbXBvcnQgeyBJQWRhcHRlcnMgfSBmcm9tICcuL2FkYXB0ZXInO1xuXG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tICcuL3RpbnliaW5kJztcblxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2sge1xuICBzeW5jOiAoKSA9PiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJS2V5IHtcbiAgcGF0aDogYW55O1xuICBpOiBSb290O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiBPYnNlcnZlcjtcbn1cblxuZXhwb3J0IHR5cGUgT2JqID0gYW55O1xuXG5leHBvcnQgdHlwZSBSb290ID0gYW55O1xuXG4vLyBDaGVjayBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdCB0aGFuIGNhbiBiZSBvYnNlcnZlZC5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iajogT2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGxcbn1cblxuLy8gRXJyb3IgdGhyb3dlci5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1tPYnNlcnZlcl0gJyArIG1lc3NhZ2UpXG59XG5cbi8vIFRPRE9cbmxldCBhZGFwdGVyczogSUFkYXB0ZXJzO1xubGV0IGludGVyZmFjZXM6IHN0cmluZ1tdO1xubGV0IHJvb3RJbnRlcmZhY2U6IFJvb3Q7XG5cbmV4cG9ydCBjbGFzcyBPYnNlcnZlciB7XG4gIGtleXBhdGg6IHN0cmluZztcbiAgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaztcbiAgb2JqZWN0UGF0aDogT2JqW107XG4gIG9iajogT2JqO1xuICB0YXJnZXQ6IE9iajtcbiAga2V5OiBJS2V5O1xuICB0b2tlbnM6IElLZXlbXTtcblxuICAvKipcbiAgICogQ29uc3RydWN0cyBhIG5ldyBrZXlwYXRoIG9ic2VydmVyIGFuZCBraWNrcyB0aGluZ3Mgb2ZmLlxuICAgKiBAcGFyYW0gb2JqIFxuICAgKiBAcGFyYW0ga2V5cGF0aCBcbiAgICogQHBhcmFtIGNhbGxiYWNrIFxuICAgKi9cbiAgY29uc3RydWN0b3Iob2JqOiBPYmosIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMub2JqZWN0UGF0aCA9IFtdO1xuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gdGhpcy5wYXJzZSgpO1xuICAgIHRoaXMua2V5ID0gcGFyc2VSZXN1bHQua2V5O1xuICAgIHRoaXMudG9rZW5zID0gcGFyc2VSZXN1bHQudG9rZW5zO1xuICAgIHRoaXMub2JqID0gdGhpcy5nZXRSb290T2JqZWN0KG9iaik7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLnJlYWxpemUoKTtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldCh0cnVlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9uczogSVZpZXdPcHRpb25zKSB7XG4gICAgYWRhcHRlcnMgPSBvcHRpb25zLmFkYXB0ZXJzO1xuICAgIGludGVyZmFjZXMgPSBPYmplY3Qua2V5cyhhZGFwdGVycyk7XG4gICAgcm9vdEludGVyZmFjZSA9IG9wdGlvbnMucm9vdEludGVyZmFjZTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFRva2VuaXplcyB0aGUgcHJvdmlkZWQga2V5cGF0aCBzdHJpbmcgaW50byBpbnRlcmZhY2UgKyBwYXRoIHRva2VucyBmb3IgdGhlXG4gICAqIG9ic2VydmVyIHRvIHdvcmsgd2l0aC5cbiAgICovXG4gIHN0YXRpYyB0b2tlbml6ZSA9IGZ1bmN0aW9uKGtleXBhdGg6IHN0cmluZywgcm9vdDogUm9vdCkge1xuICAgIHZhciB0b2tlbnM6IGFueVtdID0gW107XG4gICAgdmFyIGN1cnJlbnQ6IElLZXkgPSB7aTogcm9vdCwgcGF0aDogJyd9O1xuICAgIHZhciBpbmRleDogbnVtYmVyO1xuICAgIHZhciBjaHI6IHN0cmluZztcbiAgXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwga2V5cGF0aC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNociA9IGtleXBhdGguY2hhckF0KGluZGV4KTtcbiAgXG4gICAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKGNocikpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goY3VycmVudCk7XG4gICAgICAgIGN1cnJlbnQgPSB7aTogY2hyLCBwYXRoOiAnJ307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50LnBhdGggKz0gY2hyO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgdG9rZW5zLnB1c2goY3VycmVudCk7XG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuICBcbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUga2V5cGF0aCB1c2luZyB0aGUgaW50ZXJmYWNlcyBkZWZpbmVkIG9uIHRoZSB2aWV3LiBTZXRzIHZhcmlhYmxlc1xuICAgKiBmb3IgdGhlIHRva2VuaXplZCBrZXlwYXRoIGFzIHdlbGwgYXMgdGhlIGVuZCBrZXkuXG4gICAqL1xuICBwYXJzZSgpIHtcbiAgICB2YXIgcGF0aDogc3RyaW5nO1xuICAgIHZhciByb290OiBSb290O1xuICBcbiAgICBpZiAoIWludGVyZmFjZXMubGVuZ3RoKSB7XG4gICAgICBlcnJvcignTXVzdCBkZWZpbmUgYXQgbGVhc3Qgb25lIGFkYXB0ZXIgaW50ZXJmYWNlLicpO1xuICAgIH1cbiAgXG4gICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZih0aGlzLmtleXBhdGhbMF0pKSB7XG4gICAgICByb290ID0gdGhpcy5rZXlwYXRoWzBdO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aC5zdWJzdHIoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSByb290SW50ZXJmYWNlO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aDtcbiAgICB9XG4gIFxuICAgIHRoaXMudG9rZW5zID0gT2JzZXJ2ZXIudG9rZW5pemUocGF0aCwgcm9vdCk7XG5cbiAgICBpZighdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHRva2VucycpO1xuICAgIH1cblxuICAgIHRoaXMua2V5ID0gKHRoaXMudG9rZW5zLnBvcCgpIGFzIElLZXkpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgdG9rZW5zOiB0aGlzLnRva2VucyxcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBSZWFsaXplcyB0aGUgZnVsbCBrZXlwYXRoLCBhdHRhY2hpbmcgb2JzZXJ2ZXJzIGZvciBldmVyeSBrZXkgYW5kIGNvcnJlY3RpbmdcbiAgICogb2xkIG9ic2VydmVycyB0byBhbnkgY2hhbmdlZCBvYmplY3RzIGluIHRoZSBrZXlwYXRoLlxuICAgKi9cbiAgcmVhbGl6ZSgpIHtcbiAgICB2YXIgY3VycmVudDogT2JqID0gdGhpcy5vYmpcbiAgICB2YXIgdW5yZWFjaGVkID0gLTFcbiAgICB2YXIgcHJldlxuICAgIHZhciB0b2tlblxuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKGlzT2JqZWN0KGN1cnJlbnQpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vYmplY3RQYXRoW2luZGV4XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoY3VycmVudCAhPT0gKHByZXYgPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldCh0cnVlLCB0b2tlbiwgY3VycmVudCwgdGhpcylcbiAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICB9XG4gIFxuICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQodG9rZW4sIGN1cnJlbnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodW5yZWFjaGVkID09PSAtMSkge1xuICAgICAgICAgIHVucmVhY2hlZCA9IGluZGV4XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGlmIChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKHVucmVhY2hlZCAhPT0gLTEpIHtcbiAgICAgIHRoaXMub2JqZWN0UGF0aC5zcGxpY2UodW5yZWFjaGVkKVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnRcbiAgfVxuICBcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGtleXBhdGguIFRoaXMgaXMgY2FsbGVkIHdoZW4gYW55IGludGVybWVkaWFyeSBrZXkgaXMgY2hhbmdlZC5cbiAgICovXG4gIHN5bmMoKSB7XG4gICAgdmFyIG5leHQsIG9sZFZhbHVlLCBuZXdWYWx1ZVxuICBcbiAgICBpZiAoKG5leHQgPSB0aGlzLnJlYWxpemUoKSkgIT09IHRoaXMudGFyZ2V0KSB7XG4gICAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgaWYgKGlzT2JqZWN0KG5leHQpKSB7XG4gICAgICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCBuZXh0LCB0aGlzLmNhbGxiYWNrKVxuICAgICAgfVxuICBcbiAgICAgIG9sZFZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgICB0aGlzLnRhcmdldCA9IG5leHRcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSgpXG4gICAgICBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlIHx8IG5ld1ZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pIHRoaXMuY2FsbGJhY2suc3luYygpXG4gICAgfSBlbHNlIGlmIChuZXh0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2suc3luYygpXG4gICAgfVxuICB9XG4gIFxuICAvLyBSZWFkcyB0aGUgY3VycmVudCBlbmQgdmFsdWUgb2YgdGhlIG9ic2VydmVkIGtleXBhdGguIFJldHVybnMgdW5kZWZpbmVkIGlmXG4gIC8vIHRoZSBmdWxsIGtleXBhdGggaXMgdW5yZWFjaGFibGUuXG4gIHZhbHVlKCkge1xuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldCh0aGlzLmtleSwgdGhpcy50YXJnZXQpXG4gICAgfVxuICB9XG4gIFxuICAvLyBTZXRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gQ2FsbGluZyBzZXRWYWx1ZSB3aGVuXG4gIC8vIHRoZSBmdWxsIGtleXBhdGggaXMgdW5yZWFjaGFibGUgaXMgYSBuby1vcC5cbiAgc2V0VmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIGFkYXB0ZXJzW3RoaXMua2V5LmldLnNldCh0aGlzLnRhcmdldCwgdGhpcy5rZXkucGF0aCwgdmFsdWUpXG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogR2V0cyB0aGUgcHJvdmlkZWQga2V5IG9uIGFuIG9iamVjdC5cbiAgICogQHBhcmFtIGtleSBcbiAgICogQHBhcmFtIG9iaiBcbiAgICovXG4gIGdldChrZXk6IElLZXksIG9iajogT2JqKSB7XG4gICAgcmV0dXJuIGFkYXB0ZXJzW2tleS5pXS5nZXQob2JqLCBrZXkucGF0aClcbiAgfVxuICBcbiAgLyoqXG4gICAqIE9ic2VydmVzIG9yIHVub2JzZXJ2ZXMgYSBjYWxsYmFjayBvbiB0aGUgb2JqZWN0IHVzaW5nIHRoZSBwcm92aWRlZCBrZXkuXG4gICAqIEBwYXJhbSBhY3RpdmUgXG4gICAqIEBwYXJhbSBrZXkgXG4gICAqIEBwYXJhbSBvYmogXG4gICAqIEBwYXJhbSBjYWxsYmFjayBcbiAgICovXG4gIHNldChhY3RpdmU6IGJvb2xlYW4sIGtleTogSUtleSwgb2JqOiBPYmosIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spIHtcbiAgICBpZihhY3RpdmUpIHtcbiAgICAgIGFkYXB0ZXJzW2tleS5pXS5vYnNlcnZlKG9iaiwga2V5LnBhdGgsIGNhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICBhZGFwdGVyc1trZXkuaV0udW5vYnNlcnZlKG9iaiwga2V5LnBhdGgsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIFVub2JzZXJ2ZXMgdGhlIGVudGlyZSBrZXlwYXRoLlxuICAgKi9cbiAgdW5vYnNlcnZlKCkge1xuICAgIHZhciBvYmo6IE9iajtcbiAgICB2YXIgdG9rZW47XG4gIFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgICBpZiAob2JqID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIG9iaiwgdGhpcylcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0KGZhbHNlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIC8vIHRyYXZlcnNlIHRoZSBzY29wZSBjaGFpbiB0byBmaW5kIHRoZSBzY29wZSB3aGljaCBoYXMgdGhlIHJvb3QgcHJvcGVydHlcbiAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBmb3VuZCBpbiBjaGFpbiwgcmV0dXJucyB0aGUgcm9vdCBzY29wZVxuICBnZXRSb290T2JqZWN0KG9iajogT2JqKSB7XG4gICAgdmFyIHJvb3RQcm9wLCBjdXJyZW50O1xuICAgIGlmICghb2JqLiRwYXJlbnQpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICBcbiAgICBpZiAodGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICByb290UHJvcCA9IHRoaXMudG9rZW5zWzBdLnBhdGhcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdFByb3AgPSB0aGlzLmtleS5wYXRoXG4gICAgfVxuICBcbiAgICBjdXJyZW50ID0gb2JqO1xuICAgIHdoaWxlIChjdXJyZW50LiRwYXJlbnQgJiYgKGN1cnJlbnRbcm9vdFByb3BdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICBjdXJyZW50ID0gY3VycmVudC4kcGFyZW50XG4gICAgfVxuICBcbiAgICByZXR1cm4gY3VycmVudDtcbiAgfVxufVxuIiwiLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuY29uc3QgUVVPVEVEX1NUUiA9IC9eJy4qJyR8XlwiLipcIiQvOyAvLyByZWdleCB0byB0ZXN0IGlmIHN0cmluZyBpcyB3cmFwcGVkIGluIFwiIG9yICdcblxuLy8gVXNlZCBpbiBwYXJzZXJzLnBhcnNlVGVtcGxhdGVcbmNvbnN0IFRFWFQgPSAwO1xuY29uc3QgQklORElORyA9IDE7XG5cbi8vIFRlc3QgaWYgc3RyaW5nIGlzIGEganNvbiBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBpc0pzb24oc3RyOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2YWwgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuICh2YWwgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWwgaW5zdGFuY2VvZiBPYmplY3QpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vLyBQYXJzZXIgYW5kIHRva2VuaXplciBmb3IgZ2V0dGluZyB0aGUgdHlwZSBhbmQgdmFsdWUgZnJvbSBhIHN0cmluZy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVR5cGUoc3RyaW5nOiBzdHJpbmcpIHtcbiAgbGV0IHR5cGUgPSBQUklNSVRJVkU7XG4gIGxldCB2YWx1ZTogYW55ID0gc3RyaW5nO1xuICBpZiAoUVVPVEVEX1NUUi50ZXN0KHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IHN0cmluZy5zbGljZSgxLCAtMSk7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICB2YWx1ZSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAnZmFsc2UnKSB7XG4gICAgdmFsdWUgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdudWxsJykge1xuICAgIHZhbHVlID0gbnVsbDtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoIWlzTmFOKE51bWJlcihzdHJpbmcpKSkge1xuICAgIHZhbHVlID0gTnVtYmVyKHN0cmluZyk7XG4gIH0gZWxzZSBpZiAoaXNKc29uKHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IEpTT04ucGFyc2Uoc3RyaW5nKTtcbiAgfSBlbHNlIHtcbiAgICB0eXBlID0gS0VZUEFUSDtcbiAgfVxuICByZXR1cm4ge3R5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZX07XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJVG9rZW5zIHtcbiAgdHlwZTogbnVtYmVyO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG4vLyBUZW1wbGF0ZSBwYXJzZXIgYW5kIHRva2VuaXplciBmb3IgbXVzdGFjaGUtc3R5bGUgdGV4dCBjb250ZW50IGJpbmRpbmdzLlxuLy8gUGFyc2VzIHRoZSB0ZW1wbGF0ZSBhbmQgcmV0dXJucyBhIHNldCBvZiB0b2tlbnMsIHNlcGFyYXRpbmcgc3RhdGljIHBvcnRpb25zXG4vLyBvZiB0ZXh0IGZyb20gYmluZGluZyBkZWNsYXJhdGlvbnMuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCBkZWxpbWl0ZXJzOiBzdHJpbmdbXSkge1xuICB2YXIgdG9rZW5zOiBJVG9rZW5zW10gfCBudWxsID0gbnVsbDtcbiAgbGV0IGxlbmd0aCA9IHRlbXBsYXRlLmxlbmd0aDtcbiAgbGV0IGluZGV4ID0gMDtcbiAgbGV0IGxhc3RJbmRleCA9IDA7XG4gIGxldCBvcGVuID0gZGVsaW1pdGVyc1swXSwgY2xvc2UgPSBkZWxpbWl0ZXJzWzFdO1xuXG4gIHdoaWxlIChsYXN0SW5kZXggPCBsZW5ndGgpIHtcbiAgICBpbmRleCA9IHRlbXBsYXRlLmluZGV4T2Yob3BlbiwgbGFzdEluZGV4KTtcblxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIGlmICh0b2tlbnMpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbnMgPSB0b2tlbnMgfHwgW107XG4gICAgICBpZiAoaW5kZXggPiAwICYmIGxhc3RJbmRleCA8IGluZGV4KSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgsIGluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyBvcGVuLmxlbmd0aDtcbiAgICAgIGluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihjbG9zZSwgbGFzdEluZGV4KTtcblxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBsZXQgc3Vic3RyaW5nID0gdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4IC0gY2xvc2UubGVuZ3RoKTtcbiAgICAgICAgbGV0IGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiBsYXN0VG9rZW4udHlwZSA9PT0gVEVYVCkge1xuICAgICAgICAgIGxhc3RUb2tlbi52YWx1ZSArPSBzdWJzdHJpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICAgIHZhbHVlOiBzdWJzdHJpbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZXQgdmFsdWUgPSB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgsIGluZGV4KS50cmltKCk7XG5cbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogQklORElORyxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyBjbG9zZS5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cbiIsImltcG9ydCB7IHBhcnNlVGVtcGxhdGUsIHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBJRm9ybWF0dGVycywgZm9ybWF0dGVycyB9IGZyb20gJy4vZm9ybWF0dGVycyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCBhZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBiaW5kZXJzLCBJQmluZGVycyB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNlcnZlciwgUm9vdCB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSUNvbXBvbmVudHMgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zIHtcbiAgLy8gQXR0cmlidXRlIHByZWZpeCBpbiB0ZW1wbGF0ZXNcbiAgcHJlZml4Pzogc3RyaW5nO1xuXG4gIC8vUHJlbG9hZCB0ZW1wbGF0ZXMgd2l0aCBpbml0aWFsIGRhdGEgb24gYmluZFxuICBwcmVsb2FkRGF0YT86IGJvb2xlYW47XG5cbiAgLy9Sb290IHNpZ2h0Z2xhc3MgaW50ZXJmYWNlIGZvciBrZXlwYXRoc1xuICByb290SW50ZXJmYWNlPzogc3RyaW5nO1xuXG4gIC8vIFRlbXBsYXRlIGRlbGltaXRlcnMgZm9yIHRleHQgYmluZGluZ3NcbiAgdGVtcGxhdGVEZWxpbWl0ZXJzPzogQXJyYXk8c3RyaW5nPlxuXG4gIC8vIEF1Z21lbnQgdGhlIGV2ZW50IGhhbmRsZXIgb2YgdGhlIG9uLSogYmluZGVyXG4gIGhhbmRsZXI/OiBGdW5jdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRXh0ZW5zaW9ucyB7XG4gIGJpbmRlcnM6IElCaW5kZXJzPGFueT47XG4gIGZvcm1hdHRlcnM6IElGb3JtYXR0ZXJzO1xuICBjb21wb25lbnRzOiBJQ29tcG9uZW50cztcbiAgYWRhcHRlcnM6IElBZGFwdGVycztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9uc1BhcmFtIGV4dGVuZHMgSUV4dGVuc2lvbnMsIElPcHRpb25zIHt9XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdPcHRpb25zIGV4dGVuZHMgSU9wdGlvbnNQYXJhbSB7XG4gIHN0YXJCaW5kZXJzOiBhbnk7XG4gIC8vIHNpZ2h0Z2xhc3NcbiAgcm9vdEludGVyZmFjZTogUm9vdDtcbn1cblxuLy8gVE9ETyBtb3ZlIHRvIHVpdGlsc1xuY29uc3QgbWVyZ2VPYmplY3QgPSAodGFyZ2V0OiBhbnksIG9iajogYW55KSA9PiB7XG4gIGlmKG9iaikge1xuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0OyBcbn07XG5cbmNvbnN0IHRpbnliaW5kID0ge1xuICAvLyBHbG9iYWwgYmluZGVycy5cbiAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IGJpbmRlcnMsXG5cbiAgLy8gR2xvYmFsIGNvbXBvbmVudHMuXG4gIGNvbXBvbmVudHM6IDxJQ29tcG9uZW50cz4ge30sXG5cbiAgLy8gR2xvYmFsIGZvcm1hdHRlcnMuXG4gIGZvcm1hdHRlcnM6IDxJRm9ybWF0dGVycz4gZm9ybWF0dGVycyxcblxuICAvLyBHbG9iYWwgc2lnaHRnbGFzcyBhZGFwdGVycy5cbiAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IHtcbiAgICAnLic6IGFkYXB0ZXIsXG4gIH0sXG5cbiAgLy8gRGVmYXVsdCBhdHRyaWJ1dGUgcHJlZml4LlxuICBfcHJlZml4OiAncnYnLFxuXG4gIF9mdWxsUHJlZml4OiAncnYtJyxcblxuICBnZXQgcHJlZml4ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9LFxuXG4gIHNldCBwcmVmaXggKHZhbHVlKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gICAgdGhpcy5fZnVsbFByZWZpeCA9IHZhbHVlICsgJy0nO1xuICB9LFxuXG4gIHBhcnNlVGVtcGxhdGU6IHBhcnNlVGVtcGxhdGUsXG5cbiAgcGFyc2VUeXBlOiBwYXJzZVR5cGUsXG5cbiAgLy8gRGVmYXVsdCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLlxuICB0ZW1wbGF0ZURlbGltaXRlcnM6IFsneycsICd9J10sXG5cbiAgLy8gRGVmYXVsdCBzaWdodGdsYXNzIHJvb3QgaW50ZXJmYWNlLlxuICByb290SW50ZXJmYWNlOiAnLicsXG5cbiAgLy8gUHJlbG9hZCBkYXRhIGJ5IGRlZmF1bHQuXG4gIHByZWxvYWREYXRhOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGV2ZW50IGhhbmRsZXIuXG4gICAqIFRPRE8gaXMgdGhpcyB1c2VkP1xuICAgKi9cbiAgaGFuZGxlcih0aGlzOiBhbnkgLyogVE9ETyBDSEVDTUUgKi8sIGNvbnRleHQ6IGFueSwgZXY6IEV2ZW50LCBiaW5kaW5nOiBCaW5kaW5nKSB7XG4gICAgLy8gY29uc29sZS53YXJuKCd5ZXMgaXQgaXMgdXNlZCcpO1xuICAgIHRoaXMuY2FsbChjb250ZXh0LCBldiwgYmluZGluZy52aWV3Lm1vZGVscyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC4gSWYgbm8gYmluZGVyIGFib3ZlIGlzIG1hdGNoZWQgaXQgd2lsbCBmYWxsXG4gICAqIGJhY2sgdG8gdXNpbmcgdGhpcyBiaW5kZXIuXG4gICAqL1xuICBmYWxsYmFja0JpbmRlcih0aGlzOiBCaW5kaW5nLCBlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpIHtcbiAgICBpZighdGhpcy50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3Qgc2V0IGF0dHRyaWJ1dGUgb2YgJyArIHRoaXMudHlwZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUodGhpcy50eXBlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnR5cGUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWVyZ2VzIGFuIG9iamVjdCBsaXRlcmFsIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9wdGlvbnMuXG4gICAqIEBwYXJhbSBvcHRpb25zIFxuICAgKi9cbiAgY29uZmlndXJlKG9wdGlvbnM6IGFueSkge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgICAgIHN3aXRjaChvcHRpb24pIHtcbiAgICAgICAgY2FzZSAnYmluZGVycyc6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5iaW5kZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb3JtYXR0ZXJzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmZvcm1hdHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NvbXBvbmVudHMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuY29tcG9uZW50cywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWRhcHRlcnMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYWRhcHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZWZpeCc6XG4gICAgICAgICAgdGhpcy5wcmVmaXggPSB2YWx1ZTtcbiAgICAgICAgY2FzZSAncGFyc2VUZW1wbGF0ZSc6XG4gICAgICAgICAgdGhpcy5wYXJzZVRlbXBsYXRlID0gdmFsdWU7XG4gICAgICAgIGNhc2UgJ3BhcnNlVHlwZSc6XG4gICAgICAgICAgdGhpcy5wYXJzZVR5cGUgPSB2YWx1ZTtcbiAgICAgICAgY2FzZSAncHJlZml4JzpcbiAgICAgICAgICB0aGlzLnByZWZpeCA9IHZhbHVlO1xuICAgICAgICBjYXNlICd0ZW1wbGF0ZURlbGltaXRlcnMnOlxuICAgICAgICAgIHRoaXMudGVtcGxhdGVEZWxpbWl0ZXJzID0gdmFsdWU7XG4gICAgICAgIGNhc2UgJ3Jvb3RJbnRlcmZhY2UnOlxuICAgICAgICAgIHRoaXMucm9vdEludGVyZmFjZSA9IHZhbHVlO1xuICAgICAgICBjYXNlICdwcmVsb2FkRGF0YSc6XG4gICAgICAgICAgdGhpcy5wcmVsb2FkRGF0YSA9IHZhbHVlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignT3B0aW9uIG5vdCBzdXBwb3J0ZWQnLCBvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgb24gdGhlIHNwZWNpZmllZCBlbGVtZW50IGFuZFxuICAvLyByZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cdFxuICBpbml0OiAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YSA9IHt9KSA9PiB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aW55YmluZC5jb21wb25lbnRzW2NvbXBvbmVudEtleV07XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlLmNhbGwodGlueWJpbmQsIGVsKTtcbiAgICBsZXQgc2NvcGUgPSBjb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRpbnliaW5kLCBlbCwgZGF0YSk7XG5cbiAgICBsZXQgdmlldyA9IHRpbnliaW5kLmJpbmQoZWwsIHNjb3BlKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcblxuICAvLyBCaW5kcyBzb21lIGRhdGEgdG8gYSB0ZW1wbGF0ZSAvIGVsZW1lbnQuIFJldHVybnMgYSB0aW55YmluZC5WaWV3IGluc3RhbmNlLlxuICBiaW5kOiAoZWw6IEhUTUxFbGVtZW50LCBtb2RlbHM6IGFueSwgb3B0aW9ucz86IElPcHRpb25zUGFyYW0pID0+IHtcbiAgICBsZXQgdmlld09wdGlvbnM6IElWaWV3T3B0aW9ucyA9IHtcbiAgICAgIC8vIEVYVEVOU0lPTlNcbiAgICAgIGJpbmRlcnM6IDxJQmluZGVyczxhbnk+PiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgY29tcG9uZW50czogPElDb21wb25lbnRzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAvLyBvdGhlclxuICAgICAgc3RhckJpbmRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAvLyBzaWdodGdsYXNzXG4gICAgICByb290SW50ZXJmYWNlOiA8Um9vdD4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICB9O1xuICAgIG1vZGVscyA9IG1vZGVscyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIC8vIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYob3B0aW9ucykge1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYmluZGVycywgb3B0aW9ucy5iaW5kZXJzKTtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYWRhcHRlcnMsIG9wdGlvbnMuYWRhcHRlcnMpO1xuICAgIH1cblxuICAgIHZpZXdPcHRpb25zLnByZWZpeCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnByZWZpeCA6IHRpbnliaW5kLnByZWZpeFxuICAgIHZpZXdPcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA9IG9wdGlvbnMgJiYgb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPyBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA6IHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVyc1xuICAgIHZpZXdPcHRpb25zLnJvb3RJbnRlcmZhY2UgPSBvcHRpb25zICYmIG9wdGlvbnMucm9vdEludGVyZmFjZSA/IG9wdGlvbnMucm9vdEludGVyZmFjZSA6IHRpbnliaW5kLnJvb3RJbnRlcmZhY2VcbiAgICB2aWV3T3B0aW9ucy5wcmVsb2FkRGF0YSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVsb2FkRGF0YSA/IG9wdGlvbnMucHJlbG9hZERhdGEgOiB0aW55YmluZC5wcmVsb2FkRGF0YVxuICAgIHZpZXdPcHRpb25zLmhhbmRsZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlciA/IG9wdGlvbnMuaGFuZGxlciA6IHRpbnliaW5kLmhhbmRsZXJcblxuICAgIC8vIG1lcmdlIGV4dGVuc2lvbnNcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCB0aW55YmluZC5iaW5kZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCB0aW55YmluZC5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCB0aW55YmluZC5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgdGlueWJpbmQuYWRhcHRlcnMpO1xuXG4gICAgLy8gZ2V0IGFsbCBzdGFyQmluZGVycyBmcm9tIGF2YWlsYWJsZSBiaW5kZXJzXG4gICAgdmlld09wdGlvbnMuc3RhckJpbmRlcnMgPSBPYmplY3Qua2V5cyh2aWV3T3B0aW9ucy5iaW5kZXJzKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGtleS5pbmRleE9mKCcqJykgPiAwO1xuICAgIH0pO1xuXG4gICAgT2JzZXJ2ZXIudXBkYXRlT3B0aW9ucyh2aWV3T3B0aW9ucyk7XG5cbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCBtb2RlbHMsIHZpZXdPcHRpb25zKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcbn07XG5cbmV4cG9ydCB7IHRpbnliaW5kIH07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbnliaW5kO1xuIiwiaW1wb3J0IHsgdGlueWJpbmQsIElWaWV3T3B0aW9ucyB9IGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHsgQmluZGVyLCBJVHdvV2F5QmluZGVyIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZywgSUJvdW5kRWxlbWVudCB9IGZyb20gJy4vY29tcG9uZW50LWJpbmRpbmcnO1xuaW1wb3J0IHsgcGFyc2VUZW1wbGF0ZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5cbmV4cG9ydCB0eXBlIFRCbG9jayA9IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBkYXRhPzogc3RyaW5nO1xufVxuXG5jb25zdCB0ZXh0QmluZGVyOiBJVHdvV2F5QmluZGVyPHN0cmluZz4gPSB7XG4gIHJvdXRpbmU6IChub2RlOiBJRGF0YUVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBub2RlLmRhdGEgPSAodmFsdWUgIT0gbnVsbCkgPyB2YWx1ZSA6ICcnO1xuICB9XG59O1xuXG5jb25zdCBERUNMQVJBVElPTl9TUExJVCA9IC8oKD86J1teJ10qJykqKD86KD86W15cXHwnXSooPzonW14nXSonKStbXlxcfCddKikrfFteXFx8XSspKXxeJC9nO1xuXG5jb25zdCBwYXJzZU5vZGUgPSAodmlldzogVmlldywgbm9kZTogSURhdGFFbGVtZW50KSA9PiB7XG4gIGxldCBibG9jazogVEJsb2NrID0gZmFsc2U7XG5cbiAgLy8gaWYgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREVcbiAgbm9kZSA9ICggbm9kZSBhcyBJRGF0YUVsZW1lbnQpO1xuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgIGlmKCFub2RlLmRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm9kZSBoYXMgbm8gZGF0YScpO1xuICAgIH1cbiAgICBsZXQgdG9rZW5zID0gcGFyc2VUZW1wbGF0ZShub2RlLmRhdGEsIHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVycyk7XG5cbiAgICBpZiAodG9rZW5zKSB7XG4gICAgICBpZighbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgbGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0b2tlbi52YWx1ZSk7XG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGV4dCwgbm9kZSk7XG4gICAgICAgIGlmICh0b2tlbi50eXBlID09PSAxKSB7XG4gICAgICAgICAgdmlldy5idWlsZEJpbmRpbmcodGV4dCwgbnVsbCwgdG9rZW4udmFsdWUsIHRleHRCaW5kZXIsIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICAgIGJsb2NrID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgYmxvY2sgPSB2aWV3LnRyYXZlcnNlKG5vZGUpO1xuICB9XG5cbiAgaWYgKCFibG9jaykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwYXJzZU5vZGUodmlldywgKG5vZGUuY2hpbGROb2Rlc1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGJpbmRpbmdDb21wYXJhdG9yID0gKGE6IEJpbmRpbmcsIGI6IEJpbmRpbmcpID0+IHtcbiAgbGV0IGFQcmlvcml0eSA9IGEuYmluZGVyID8gKChhLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgbGV0IGJQcmlvcml0eSA9IGIuYmluZGVyID8gKChiLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgcmV0dXJuIGJQcmlvcml0eSAtIGFQcmlvcml0eTtcbn07XG5cbmNvbnN0IHRyaW1TdHIgPSAoc3RyOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHN0ci50cmltKCk7XG59O1xuXG4vLyBBIGNvbGxlY3Rpb24gb2YgYmluZGluZ3MgYnVpbHQgZnJvbSBhIHNldCBvZiBwYXJlbnQgbm9kZXMuXG5leHBvcnQgY2xhc3MgVmlldyB7XG5cbiAgZWxzOiBIVE1MQ29sbGVjdGlvbiB8IEhUTUxFbGVtZW50W10gfCBOb2RlW107XG4gIG1vZGVsczogYW55O1xuICBvcHRpb25zOiBJVmlld09wdGlvbnM7XG4gIGJpbmRpbmdzOiBCaW5kaW5nW10gPSBbXTtcbiAgY29tcG9uZW50VmlldzogVmlldyB8IG51bGwgPSBudWxsO1xuXG4gIC8vIFRoZSBET00gZWxlbWVudHMgYW5kIHRoZSBtb2RlbCBvYmplY3RzIGZvciBiaW5kaW5nIGFyZSBwYXNzZWQgaW50byB0aGVcbiAgLy8gY29uc3RydWN0b3IgYWxvbmcgd2l0aCBhbnkgbG9jYWwgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSB1c2VkIHRocm91Z2hvdXQgdGhlXG4gIC8vIGNvbnRleHQgb2YgdGhlIHZpZXcgYW5kIGl0J3MgYmluZGluZ3MuXG4gIGNvbnN0cnVjdG9yKGVsczogSFRNTENvbGxlY3Rpb24gfCBIVE1MRWxlbWVudCB8IE5vZGUsIG1vZGVsczogYW55LCBvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZWxzID0gZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVscyA9IChbZWxzXSBhcyBIVE1MRWxlbWVudFtdIHwgTm9kZVtdICk7XG4gICAgfVxuXG4gICAgdGhpcy5tb2RlbHMgPSBtb2RlbHM7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMuYnVpbGQoKTtcbiAgfVxuXG4gIHB1YmxpYyBidWlsZEJpbmRpbmcobm9kZTogSFRNTEVsZW1lbnQgfCBUZXh0LCB0eXBlOiBzdHJpbmcgfCBudWxsLCBkZWNsYXJhdGlvbjogc3RyaW5nLCBiaW5kZXI6IEJpbmRlcjxhbnk+LCBhcmdzOiBzdHJpbmdbXSB8IG51bGwpIHtcbiAgICBsZXQgbWF0Y2hlcyA9IGRlY2xhcmF0aW9uLm1hdGNoKERFQ0xBUkFUSU9OX1NQTElUKTtcbiAgICBpZihtYXRjaGVzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIG1hdGNoZXMnKTtcbiAgICB9XG4gICAgbGV0IHBpcGVzID0gbWF0Y2hlcy5tYXAodHJpbVN0cik7XG4gICAgbGV0IGtleXBhdGggPSBwaXBlcy5zaGlmdCgpIHx8IG51bGw7XG4gICAgY29uc29sZS5sb2coJ3BpcGVzJywgcGlwZXMpO1xuICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQmluZGluZygodGhpcyBhcyBWaWV3KSwgKG5vZGUgYXMgSFRNTEVsZW1lbnQpLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIHBpcGVzKSk7XG4gIH1cblxuICAvLyBQYXJzZXMgdGhlIERPTSB0cmVlIGFuZCBidWlsZHMgYEJpbmRpbmdgIGluc3RhbmNlcyBmb3IgZXZlcnkgbWF0Y2hlZFxuICAvLyBiaW5kaW5nIGRlY2xhcmF0aW9uLlxuICBidWlsZCgpIHtcbiAgICB0aGlzLmJpbmRpbmdzID0gW107XG5cbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVscywgaSwgbGVuO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwYXJzZU5vZGUodGhpcywgKGVsZW1lbnRzW2ldIGFzIElEYXRhRWxlbWVudCkpO1xuICAgIH1cblxuICAgIHRoaXMuYmluZGluZ3Muc29ydChiaW5kaW5nQ29tcGFyYXRvcik7XG4gIH1cblxuICB0cmF2ZXJzZShub2RlOiBJQm91bmRFbGVtZW50KTogVEJsb2NrIHtcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIGxldCBibG9jayA9IG5vZGUubm9kZU5hbWUgPT09ICdTQ1JJUFQnIHx8IG5vZGUubm9kZU5hbWUgPT09ICdTVFlMRSc7XG4gICAgbGV0IGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgbGV0IGJpbmRJbmZvcyA9IFtdO1xuICAgIGxldCBzdGFyQmluZGVycyA9IHRoaXMub3B0aW9ucy5zdGFyQmluZGVycztcbiAgICB2YXIgdHlwZSwgYmluZGVyLCBpZGVudGlmaWVyLCBhcmdzO1xuXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIHdpdGggdGhlIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2XG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuaW5kZXhPZihiaW5kaW5nUHJlZml4KSA9PT0gMCkge1xuICAgICAgICB0eXBlID0gYXR0cmlidXRlLm5hbWUuc2xpY2UoYmluZGluZ1ByZWZpeC5sZW5ndGgpO1xuICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1t0eXBlXTtcbiAgICAgICAgYXJncyA9IFtdO1xuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzdGFyQmluZGVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgaWRlbnRpZmllciA9IHN0YXJCaW5kZXJzW2tdO1xuICAgICAgICAgICAgaWYgKHR5cGUuc2xpY2UoMCwgaWRlbnRpZmllci5sZW5ndGggLSAxKSA9PT0gaWRlbnRpZmllci5zbGljZSgwLCAtMSkpIHtcbiAgICAgICAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgIGFyZ3MucHVzaCh0eXBlLnNsaWNlKGlkZW50aWZpZXIubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGJpbmRlciA9IHRpbnliaW5kLmZhbGxiYWNrQmluZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChiaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5ibG9jaykge1xuICAgICAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIHR5cGUsIGF0dHJpYnV0ZS52YWx1ZSwgYmluZGVyLCBhcmdzKTtcbiAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5kSW5mb3MucHVzaCh7YXR0cjogYXR0cmlidXRlLCBiaW5kZXI6IGJpbmRlciwgdHlwZTogdHlwZSwgYXJnczogYXJnc30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZEluZm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmluZEluZm8gPSBiaW5kSW5mb3NbaV07XG4gICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCBiaW5kSW5mby50eXBlLCBiaW5kSW5mby5hdHRyLnZhbHVlLCBiaW5kSW5mby5iaW5kZXIsIGJpbmRJbmZvLmFyZ3MpO1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYmluZEluZm8uYXR0ci5uYW1lKTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIGNvbXBvbmVudHNcbiAgICBpZiAoIWJsb2NrKSB7XG4gICAgICB0eXBlID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbXBvbmVudHNbdHlwZV0gJiYgIW5vZGUuX2JvdW5kKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQ29tcG9uZW50QmluZGluZygodGhpcyBhcyBWaWV3KSwgbm9kZSwgdHlwZSkpO1xuICAgICAgICBibG9jayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJsb2NrO1xuICB9XG5cbiAgLy8gQmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5iaW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICB1bmJpbmQoKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLmJpbmRpbmdzKSkge1xuICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICBiaW5kaW5nLnVuYmluZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN5bmNzIHVwIHRoZSB2aWV3IHdpdGggdGhlIG1vZGVsIGJ5IHJ1bm5pbmcgdGhlIHJvdXRpbmVzIG9uIGFsbCBiaW5kaW5ncy5cbiAgc3luYygpIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1Ymxpc2hlcyB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIHZpZXcgYmFjayB0byB0aGUgbW9kZWwgKHJldmVyc2Ugc3luYykuXG4gIHB1Ymxpc2goKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcuYmluZGVyICYmIChiaW5kaW5nLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnB1Ymxpc2hlcykge1xuICAgICAgICBiaW5kaW5nLnB1Ymxpc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIHZpZXcncyBtb2RlbHMgYWxvbmcgd2l0aCBhbnkgYWZmZWN0ZWQgYmluZGluZ3MuXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm1vZGVsc1trZXldID0gbW9kZWxzW2tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBpZiAoYmluZGluZy51cGRhdGUpIHtcbiAgICAgICAgYmluZGluZy51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==