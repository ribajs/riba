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
      mergeObject(options.binders, this.component.binders);
      mergeObject(options.formatters, this.component.formatters);
      mergeObject(options.components, this.component.components);
      mergeObject(options.adapters, this.component.adapters);
      mergeObject(options.binders, this.view.options.binders);
      mergeObject(options.formatters, this.view.options.formatters);
      mergeObject(options.components, this.view.options.components);
      mergeObject(options.adapters, this.view.options.adapters);
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

          if (token.type === PRIMITIVE) {
            this.static[_propertyName] = token.value;
          } else if (token.type === KEYPATH) {
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

        case 'adapter':
          mergeObject(_this.adapters, value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvZm9ybWF0dGVycy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9vYnNlcnZlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3RpbnliaW5kLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3ZpZXcudHMiXSwibmFtZXMiOlsiQVJSQVlfTUVUSE9EUyIsIkFkYXB0ZXIiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwiY291bnRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3ZWFrbWFwIiwiX19ydiIsImNhbGxiYWNrcyIsInJlZiIsImtleXMiLCJsZW5ndGgiLCJwb2ludGVycyIsImZuIiwib3JpZ2luYWwiLCJtYXAiLCJ3ZWFrUmVmZXJlbmNlIiwiYXJncyIsInJlc3BvbnNlIiwiYXBwbHkiLCJmb3JFYWNoIiwiayIsInIiLCJBcnJheSIsImNhbGxiYWNrIiwic3luYyIsImtleXBhdGgiLCJzdHViRnVuY3Rpb24iLCJpbmRleE9mIiwicHVzaCIsImlkeCIsInNwbGljZSIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsInNldCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJuZXdWYWx1ZSIsInVub2JzZXJ2ZU11dGF0aW9ucyIsImNiIiwib2JzZXJ2ZU11dGF0aW9ucyIsImFkYXB0ZXIiLCJnZXRTdHJpbmciLCJ0b1N0cmluZyIsInVuZGVmaW5lZCIsInRpbWVzIiwibiIsImkiLCJjcmVhdGVWaWV3IiwiYmluZGluZyIsIm1vZGVscyIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiRXJyb3IiLCJpbnNlcnRCZWZvcmUiLCJiaW5kZXJzIiwiZnVuY3Rpb24iLCJwcmlvcml0eSIsImN1c3RvbURhdGEiLCJoYW5kbGVyIiwidW5iaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiaW5kZXhQcm9wIiwiZ2V0QXR0cmlidXRlIiwiZ2V0SXRlcmF0aW9uQWxpYXMiLCJtb2RlbCIsImluZGV4Iiwic2NvcGUiLCIkcGFyZW50IiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJkYXRhIiwia2V5IiwiZWxDbGFzcyIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ0cmltIiwidGV4dCIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIkhUTUxTZWxlY3RFbGVtZW50Iiwib3B0aW9uIiwic2VsZWN0ZWQiLCJpZiIsImF0dGFjaGVkIiwiYm91bmQiLCJuZXN0ZWQiLCJnZXRJbnB1dFZhbHVlIiwicmVzdWx0cyIsIlBSSU1JVElWRSIsIktFWVBBVEgiLCJGT1JNQVRURVJfQVJHUyIsIkZPUk1BVFRFUl9TUExJVCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiZm9ybWF0dGVyT2JzZXJ2ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIm9ic2VydmVyIiwib2JzZXJ2ZSIsInRhcmdldCIsImZvcm1hdHRlckluZGV4IiwicGFyc2VUeXBlIiwiYWkiLCJwcmltaXRpdmVWYWx1ZSIsInJlZHVjZSIsInJlc3VsdCIsImRlY2xhcmF0aW9uIiwibWF0Y2giLCJzaGlmdCIsImZvcm1hdHRlciIsInByb2Nlc3NlZEFyZ3MiLCJwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyIsInJlYWQiLCJGdW5jdGlvbiIsImV2IiwiY2FsbCIsImZvcm1hdHRlZFZhbHVlIiwicm91dGluZUZuIiwicmVkdWNlUmlnaHQiLCJzcGxpdCIsImdldFZhbHVlIiwic2V0VmFsdWUiLCJwYXJzZVRhcmdldCIsInByZWxvYWREYXRhIiwidW5vYnNlcnZlIiwiZmkiLCJtZXJnZU9iamVjdCIsIkNvbXBvbmVudEJpbmRpbmciLCJ0aW55YmluZCIsIl9mdWxsUHJlZml4IiwiY29tcG9uZW50IiwiY29tcG9uZW50cyIsInN0YXRpYyIsIm9ic2VydmVycyIsImNvbXBvbmVudFZpZXciLCJzdHJpbmciLCJncm91cGVkIiwidG9VcHBlckNhc2UiLCJjcmVhdGUiLCJhZGFwdGVycyIsInByZWZpeCIsInRlbXBsYXRlRGVsaW1pdGVycyIsInJvb3RJbnRlcmZhY2UiLCJpbml0aWFsaXplIiwibG9jYWxzIiwicHJvdG90eXBlIiwic2xpY2UiLCJjaGlsZE5vZGVzIiwiZ2V0TWVyZ2VkT3B0aW9ucyIsImxlbiIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGUiLCJuYW1lIiwiYmluZGluZ1ByZWZpeCIsInByb3BlcnR5TmFtZSIsImNhbWVsQ2FzZSIsImtleXBhdGhzIiwibm90IiwiaXNPYmplY3QiLCJlcnJvciIsIm1lc3NhZ2UiLCJpbnRlcmZhY2VzIiwib2JqZWN0UGF0aCIsInBhcnNlUmVzdWx0IiwicGFyc2UiLCJ0b2tlbnMiLCJnZXRSb290T2JqZWN0IiwicmVhbGl6ZSIsInBhdGgiLCJyb290Iiwic3Vic3RyIiwidG9rZW5pemUiLCJjdXJyZW50IiwidW5yZWFjaGVkIiwicHJldiIsIm5leHQiLCJvbGRWYWx1ZSIsImFjdGl2ZSIsInJvb3RQcm9wIiwiY2hyIiwiY2hhckF0IiwiUVVPVEVEX1NUUiIsIlRFWFQiLCJCSU5ESU5HIiwiaXNKc29uIiwic3RyIiwidmFsIiwiSlNPTiIsInRlc3QiLCJpc05hTiIsIk51bWJlciIsInBhcnNlVGVtcGxhdGUiLCJkZWxpbWl0ZXJzIiwibGFzdEluZGV4Iiwib3BlbiIsImNsb3NlIiwic3Vic3RyaW5nIiwibGFzdFRva2VuIiwiX3ByZWZpeCIsImNvbnRleHQiLCJmYWxsYmFja0JpbmRlciIsInJlbW92ZUF0dHJpYnV0ZSIsImNvbmZpZ3VyZSIsImNvbnNvbGUiLCJ3YXJuIiwiaW5pdCIsImNvbXBvbmVudEtleSIsImNyZWF0ZUVsZW1lbnQiLCJ2aWV3T3B0aW9ucyIsInN0YXJCaW5kZXJzIiwiZmlsdGVyIiwidXBkYXRlT3B0aW9ucyIsInRleHRCaW5kZXIiLCJub2RlIiwiREVDTEFSQVRJT05fU1BMSVQiLCJwYXJzZU5vZGUiLCJub2RlVHlwZSIsImNyZWF0ZVRleHROb2RlIiwiYnVpbGRCaW5kaW5nIiwidHJhdmVyc2UiLCJiaW5kaW5nQ29tcGFyYXRvciIsImEiLCJiIiwiYVByaW9yaXR5IiwiYlByaW9yaXR5IiwidHJpbVN0ciIsImJ1aWxkIiwibWF0Y2hlcyIsInBpcGVzIiwibG9nIiwiZWxlbWVudHMiLCJzb3J0IiwiYmluZEluZm9zIiwiaWRlbnRpZmllciIsImF0dHIiLCJiaW5kSW5mbyIsInRvTG93ZXJDYXNl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QixtQkFBVztBQUMvQixZQUFJK0IsUUFBUWlELE1BQVosRUFBb0I7QUFDbEJqRCxrQkFBUWlELE1BQVIsQ0FBZWhELE1BQWY7QUFDRDtBQUNGLE9BSkQ7QUFLRCIsImZpbGUiOiJ0aW55YmluZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRpbnliaW5kXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRpbnliaW5kXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy90aW55YmluZC50c1wiKTtcbiIsImltcG9ydCB7IElPYnNlcnZlclN5bmNDYWxsYmFjayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuXG4vLyBUaGUgZGVmYXVsdCBgLmAgYWRhcHRlciB0aGF0IGNvbWVzIHdpdGggdGlueWJpbmQuanMuIEFsbG93cyBzdWJzY3JpYmluZyB0b1xuLy8gcHJvcGVydGllcyBvbiBwbGFpbiBvYmplY3RzLCBpbXBsZW1lbnRlZCBpbiBFUzUgbmF0aXZlcyB1c2luZ1xuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAuXG5cbmNvbnN0IEFSUkFZX01FVEhPRFMgPSBbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZScsXG4gICdzcGxpY2UnXG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWYge1xuICBjYWxsYmFja3M6IGFueVtdO1xuICBwb2ludGVyczogYW55W107XG59XG5cbi8qKlxuICogVE9ETyBGb3Igd2hhdCBpcyB0aGlzP1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElSVkFycmF5IGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIF9fcnY6IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgQWRhcHRlckZ1bmN0aW9uID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXI7XG4gIHdlYWttYXA6IGFueTtcbiAgd2Vha1JlZmVyZW5jZTogKG9iajogYW55KSA9PiBhbnk7IC8vID0+IF9fcnYgP1xuICBjbGVhbnVwV2Vha1JlZmVyZW5jZTogKHJlZjogSVJlZiwgaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgc3R1YkZ1bmN0aW9uOiAob2JqOiBhbnksIGZuOiBzdHJpbmcpID0+IGFueSAvLyA9PiByZXNwb25zZSA/XG4gIG9ic2VydmVNdXRhdGlvbnM6IChvYmo6IGFueSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgdW5vYnNlcnZlTXV0YXRpb25zOiAob2JqOiBJUlZBcnJheSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgb2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHZvaWQ7IFxuICB1bm9ic2VydmU6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSA9PiB2b2lkO1xuICBnZXQ6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSA9PiBhbnk7XG4gIHNldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXJzIHtcbiAgW25hbWU6IHN0cmluZ106IElBZGFwdGVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRhcHRlciBpbXBsZW1lbnRzIElBZGFwdGVyIHtcbiAgY291bnRlcjogbnVtYmVyID0gMDtcbiAgd2Vha21hcDphbnkgPSB7fTtcblxuICB3ZWFrUmVmZXJlbmNlKG9iajogYW55KSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoJ19fcnYnKSkge1xuICAgICAgbGV0IGlkID0gdGhpcy5jb3VudGVyKys7XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX3J2Jywge1xuICAgICAgICB2YWx1ZTogaWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy53ZWFrbWFwW29iai5fX3J2XSkge1xuICAgICAgdGhpcy53ZWFrbWFwW29iai5fX3J2XSA9IHtcbiAgICAgICAgY2FsbGJhY2tzOiB7fVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcbiAgfVxuXG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlKHJlZjogSVJlZiwgaWQ6IG51bWJlcikge1xuICAgIGlmICghT2JqZWN0LmtleXMocmVmLmNhbGxiYWNrcykubGVuZ3RoKSB7XG4gICAgICBpZiAoIShyZWYucG9pbnRlcnMgJiYgT2JqZWN0LmtleXMocmVmLnBvaW50ZXJzKS5sZW5ndGgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLndlYWttYXBbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0dWJGdW5jdGlvbihvYmo6IGFueSwgZm46IHN0cmluZykge1xuICAgIGxldCBvcmlnaW5hbCA9IG9ialtmbl07XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopO1xuICAgIGxldCB3ZWFrbWFwID0gdGhpcy53ZWFrbWFwO1xuXG4gICAgb2JqW2ZuXSA9ICguLi5hcmdzOiBhbnlbXSk6IEFkYXB0ZXJGdW5jdGlvbiA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBvcmlnaW5hbC5hcHBseShvYmosIGFyZ3MpO1xuXG4gICAgICBPYmplY3Qua2V5cyhtYXAucG9pbnRlcnMpLmZvckVhY2gociA9PiB7XG4gICAgICAgIGxldCBrID0gbWFwLnBvaW50ZXJzW3JdO1xuXG4gICAgICAgIGlmICh3ZWFrbWFwW3JdKSB7XG4gICAgICAgICAgaWYgKHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdLmZvckVhY2goKGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2suc3luYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG4gIH1cblxuICBvYnNlcnZlTXV0YXRpb25zKG9iajogYW55LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzKSB7XG4gICAgICAgIG1hcC5wb2ludGVycyA9IHt9O1xuXG4gICAgICAgIEFSUkFZX01FVEhPRFMuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgdGhpcy5zdHViRnVuY3Rpb24ob2JqLCBmbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1hcC5wb2ludGVyc1tyZWZdKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdID0gW107XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXAucG9pbnRlcnNbcmVmXS5pbmRleE9mKGtleXBhdGgpID09PSAtMSkge1xuICAgICAgICBtYXAucG9pbnRlcnNbcmVmXS5wdXNoKGtleXBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVub2JzZXJ2ZU11dGF0aW9ucyhvYmo6IElSVkFycmF5LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKChvYmogaW5zdGFuY2VvZiBBcnJheSkgJiYgKG9iai5fX3J2ICE9IG51bGwpKSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgaWYgKG1hcCkge1xuICAgICAgICBsZXQgcG9pbnRlcnMgPSBtYXAucG9pbnRlcnNbcmVmXTtcblxuICAgICAgICBpZiAocG9pbnRlcnMpIHtcbiAgICAgICAgICBsZXQgaWR4ID0gcG9pbnRlcnMuaW5kZXhPZihrZXlwYXRoKTtcblxuICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgcG9pbnRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAucG9pbnRlcnNbcmVmXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlOiBhbnk7XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopLmNhbGxiYWNrcztcblxuICAgIGlmICghY2FsbGJhY2tzW2tleXBhdGhdKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0gPSBbXTtcbiAgICAgIGxldCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXBhdGgpO1xuXG4gICAgICBpZiAoIWRlc2MgfHwgIShkZXNjLmdldCB8fCBkZXNjLnNldCB8fCAhZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleXBhdGhdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleXBhdGgsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyh2YWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2I6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYi5zeW5jKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMobmV3VmFsdWUsIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrc1trZXlwYXRoXS5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gIH1cblxuICB1bm9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgaWYgKG1hcCkge1xuICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgbGV0IGlkeCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcblxuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgICBpZiAoIWNhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuICAgICAgICAgICAgdGhpcy51bm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhbnVwV2Vha1JlZmVyZW5jZShtYXAsIG9iai5fX3J2KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBvYmpba2V5cGF0aF07XG4gIH1cblxuICBzZXQob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIG9ialtrZXlwYXRoXSA9IHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCBhZGFwdGVyID0gbmV3IEFkYXB0ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5cbi8qKlxuICogT25lIHdheSBiaW5kZXIgaW50ZXJmYWNlXG4gKi9cbmV4cG9ydCB0eXBlIElPbmVXYXlCaW5kZXI8VmFsdWVUeXBlPiA9ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWU6IFZhbHVlVHlwZSkgPT4gdm9pZDtcblxuLyoqXG4gKiBUbyB3YXkgYmluZGVyIGludGVyZmFjZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIElUd29XYXlCaW5kZXI8VmFsdWVUeXBlPiB7XG4gIHJvdXRpbmU6ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWU6IFZhbHVlVHlwZSkgPT4gdm9pZDtcbiAgYmluZD86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgdW5iaW5kPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICB1cGRhdGU/OiAodGhpczogQmluZGluZywgbW9kZWw6IGFueSkgPT4gdm9pZDtcbiAgZ2V0VmFsdWU/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIGJsb2NrPzogYm9vbGVhbjtcbiAgZnVuY3Rpb24/OiBib29sZWFuO1xuICBwdWJsaXNoZXM/OiBib29sZWFuO1xuICBwcmlvcml0eT86IG51bWJlcjtcbiAgLyoqXG4gICAqIElmIHlvdSB3YW50IHRvIHNhdmUgY3VzdG9tIGRhdGEgaW4gdGhpcyB1c2UgdGhpcyBvYmplY3RcbiAgICovXG4gIGN1c3RvbURhdGE/OiBhbnk7XG59XG5cbi8qKlxuICogQSBiaW5kZXIgY2FuIGJlIGEgb25lIHdheSBiaW5kZXIgb3IgYSB0d28gd2F5IGJpbmRlclxuICovXG5leHBvcnQgdHlwZSBCaW5kZXI8VmFsdWVUeXBlPiA9IElPbmVXYXlCaW5kZXI8VmFsdWVUeXBlPiB8IElUd29XYXlCaW5kZXI8VmFsdWVUeXBlPlxuXG4vKipcbiAqIEEgbGlzdCBvZiBiaW5kZXJzIHdpdGggYW55IGtleSBuYW1lXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUJpbmRlcnM8VmFsdWVUeXBlPiB7XG4gIFtuYW1lOiBzdHJpbmddOiBCaW5kZXI8VmFsdWVUeXBlPjtcbn1cblxuXG5jb25zdCBnZXRTdHJpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCB0aW1lcyA9IChuOiBudW1iZXIsIGNiOigpID0+IHZvaWQpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIGNiKCk7XG59O1xuXG5jb25zdCBjcmVhdGVWaWV3ID0gKGJpbmRpbmc6IEJpbmRpbmcsIG1vZGVsczogYW55LCBhbmNob3JFbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgbnVsbCkgPT4ge1xuICBsZXQgdGVtcGxhdGUgPSBiaW5kaW5nLmVsLmNsb25lTm9kZSh0cnVlKTtcbiAgbGV0IHZpZXcgPSBuZXcgVmlldygodGVtcGxhdGUgYXMgTm9kZSksIG1vZGVscywgYmluZGluZy52aWV3Lm9wdGlvbnMpO1xuICB2aWV3LmJpbmQoKTtcbiAgaWYoIWJpbmRpbmcgfHwgIWJpbmRpbmcubWFya2VyIHx8IGJpbmRpbmcubWFya2VyLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIGZvciBiaW5kaW5nIScpO1xuICB9XG5cbiAgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGVtcGxhdGUsIGFuY2hvckVsKTtcblxuICByZXR1cm4gdmlldztcbn1cblxuY29uc3QgYmluZGVyczogSUJpbmRlcnM8YW55PiA9IHtcbiAgLy8gQmluZHMgYW4gZXZlbnQgaGFuZGxlciBvbiB0aGUgZWxlbWVudC5cbiAgJ29uLSonOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgZnVuY3Rpb246IHRydWUsXG4gICAgcHJpb3JpdHk6IDEwMDAsXG5cbiAgICBiaW5kKGVsKSB7XG4gICAgICBpZighdGhpcy5jdXN0b21EYXRhKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHtcbiAgICAgICAgICBoYW5kbGVyOiBudWxsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaGFuZGxlcikge1xuICAgICAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSAvKlRPRE8qLykge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIgPSB0aGlzLmV2ZW50SGFuZGxlcih2YWx1ZSk7XG4gICAgICBpZih0aGlzLmFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgIH1cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEuaGFuZGxlcik7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFwcGVuZHMgYm91bmQgaW5zdGFuY2VzIG9mIHRoZSBlbGVtZW50IGluIHBsYWNlIGZvciBlYWNoIGl0ZW0gaW4gdGhlIGFycmF5LlxuICAnZWFjaC0qJzogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIGJsb2NrOiB0cnVlLFxuXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKCF0aGlzLm1hcmtlcikge1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoYCB0aW55YmluZDogJHt0aGlzLnR5cGV9IGApO1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEgPSB7XG4gICAgICAgICAgaXRlcmF0ZWQ6IDxWaWV3W10+IFtdXG4gICAgICAgIH07XG4gICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBwYXJlbnQgbm9kZSEnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSAgPT4ge1xuICAgICAgICAgIHZpZXcuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSA9PiB7XG4gICAgICAgICAgdmlldy51bmJpbmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWwsIGNvbGxlY3Rpb24pIHtcbiAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgbGV0IG1vZGVsTmFtZSA9IHRoaXMuYXJnc1swXTtcbiAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uIHx8IFtdO1xuXG4gICAgICAvLyBUT0RPIHN1cHBvcnQgb2JqZWN0IGtleXMgdG8gaXRlcmF0ZSBvdmVyXG4gICAgICBpZighQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VhY2gtJyArIG1vZGVsTmFtZSArICcgbmVlZHMgYW4gYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLCBidXQgaXQgaXMnKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgaW5kZXggbmFtZSBpcyBzZXRlZCBieSBgaW5kZXgtcHJvcGVydHlgIHVzZSB0aGlzIG5hbWUsIG90aGVyd2lzZSBgJVttb2RlbE5hbWVdJWAgIFxuICAgICAgbGV0IGluZGV4UHJvcCA9IGVsLmdldEF0dHJpYnV0ZSgnaW5kZXgtcHJvcGVydHknKSB8fCB0aGlzLmdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZSk7XG5cbiAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgobW9kZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBzY29wZTogYW55ID0geyRwYXJlbnQ6IHRoaXMudmlldy5tb2RlbHN9O1xuICAgICAgICBzY29wZVtpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgIHNjb3BlW21vZGVsTmFtZV0gPSBtb2RlbDtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbaW5kZXhdO1xuXG4gICAgICAgIGlmICghdmlldykge1xuICAgICAgICAgIGxldCBwcmV2aW91czogQ29tbWVudCB8IEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkW3RoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSAxXS5lbHNbMF07XG4gICAgICAgICAgfSBlbHNlIGlmKHRoaXMubWFya2VyKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHRoaXMubWFya2VyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlldyA9IGNyZWF0ZVZpZXcodGhpcywgc2NvcGUsIHByZXZpb3VzLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQucHVzaCh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldy5tb2RlbHNbbW9kZWxOYW1lXSAhPT0gbW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgbW9kZWxcbiAgICAgICAgICAgIGxldCBtYXRjaEluZGV4LCBuZXh0VmlldztcbiAgICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IGluZGV4ICsgMTsgbmV4dEluZGV4IDwgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWaWV3Lm1vZGVsc1ttb2RlbE5hbWVdID09PSBtb2RlbCkge1xuICAgICAgICAgICAgICAgIG1hdGNoSW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gbW9kZWwgaXMgaW4gb3RoZXIgcG9zaXRpb25cbiAgICAgICAgICAgICAgLy8gdG9kbzogY29uc2lkZXIgYXZvaWRpbmcgdGhlIHNwbGljZSBoZXJlIGJ5IHNldHRpbmcgYSBmbGFnXG4gICAgICAgICAgICAgIC8vIHByb2ZpbGUgcGVyZm9ybWFuY2UgYmVmb3JlIGltcGxlbWVudGluZyBzdWNoIGNoYW5nZVxuICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKG1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXh0Vmlldy5lbHNbMF0sIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgICAgbmV4dFZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vbmV3IG1vZGVsXG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gY3JlYXRlVmlldyh0aGlzLCBzY29wZSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnNwbGljZShpbmRleCwgMCwgbmV4dFZpZXcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3Lm1vZGVsc1tpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggPiBjb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICB0aW1lcyh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoIC0gY29sbGVjdGlvbi5sZW5ndGgsICgpID0+IHtcbiAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5wb3AoKTtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodmlldy5lbHNbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09PSAnT1BUSU9OJyAmJiB0aGlzLnZpZXcuYmluZGluZ3MpIHtcbiAgICAgICAgdGhpcy52aWV3LmJpbmRpbmdzLmZvckVhY2goKGJpbmRpbmc6IEJpbmRpbmcpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5tYXJrZXIgJiYgKGJpbmRpbmcuZWwgPT09IHRoaXMubWFya2VyLnBhcmVudE5vZGUpICYmIChiaW5kaW5nLnR5cGUgPT09ICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUobW9kZWxzKSB7XG4gICAgICBsZXQgZGF0YTogYW55ID0ge307XG5cbiAgICAgIC8vdG9kbzogYWRkIHRlc3QgYW5kIGZpeCBpZiBuZWNlc3NhcnlcblxuICAgICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSAhPT0gdGhpcy5hcmdzWzBdKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gbW9kZWxzW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuZm9yRWFjaCgodmlldzogVmlldykgPT4ge1xuICAgICAgICB2aWV3LnVwZGF0ZShkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGNsYXNzIGZyb20gdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIGZhbHNlLlxuICAnY2xhc3MtKic6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgbGV0IGVsQ2xhc3MgPSBgICR7ZWwuY2xhc3NOYW1lfSBgO1xuICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9PSAoZWxDbGFzcy5pbmRleE9mKGAgJHt0aGlzLmFyZ3NbMF19IGApID4gLTEpKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gYCR7ZWwuY2xhc3NOYW1lfSAke3RoaXMuYXJnc1swXX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWxDbGFzcy5yZXBsYWNlKGAgJHt0aGlzLmFyZ3NbMF19IGAsICcgJykudHJpbSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgdGV4dCB2YWx1ZS5cbiAgdGV4dDogPElPbmVXYXlCaW5kZXI8c3RyaW5nPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgSFRNTCBjb250ZW50LlxuICBodG1sOiA8SU9uZVdheUJpbmRlcjxzdHJpbmc+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvLyBTaG93cyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIHNob3c6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSc7XG4gIH0sXG5cbiAgLy8gSGlkZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYHNob3dgIGJpbmRlcikuXG4gIGhpZGU6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gIH0sXG5cbiAgLy8gRW5hYmxlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIGVuYWJsZWQ6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEJ1dHRvbkVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuZGlzYWJsZWQgPSAhdmFsdWU7XG4gIH0sXG5cbiAgLy8gRGlzYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYGVuYWJsZWRgIGJpbmRlcikuXG4gIGRpc2FibGVkOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxCdXR0b25FbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLmRpc2FibGVkID0gISF2YWx1ZTtcbiAgfSxcblxuICAvLyBDaGVja3MgYSBjaGVja2JveCBvciByYWRpbyBpbnB1dCB3aGVuIHRoZSB2YWx1ZSBpcyB0cnVlLiBBbHNvIHNldHMgdGhlIG1vZGVsXG4gIC8vIHByb3BlcnR5IHdoZW4gdGhlIGlucHV0IGlzIGNoZWNrZWQgb3IgdW5jaGVja2VkICh0d28td2F5IGJpbmRlcikuXG4gIGNoZWNrZWQ6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBwdWJsaXNoZXM6IHRydWUsXG4gICAgcHJpb3JpdHk6IDIwMDAsXG5cbiAgICBiaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjaykge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWUpIHtcbiAgICAgIGlmIChlbC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSBnZXRTdHJpbmcoZWwudmFsdWUpID09PSBnZXRTdHJpbmcodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyB2YWx1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbCBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBjaGFuZ2VzXG4gIC8vICh0d28td2F5IGJpbmRlcikuXG4gIHZhbHVlOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAzMDAwLFxuXG4gICAgYmluZChlbDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICB0aGlzLmN1c3RvbURhdGEuaXNSYWRpbyA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWwudHlwZSA9PT0gJ3JhZGlvJztcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdldmVudC1uYW1lJykgfHwgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnID8gJ2NoYW5nZScgOiAnaW5wdXQnKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5wdWJsaXNoKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5jdXN0b21EYXRhLmV2ZW50LCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWwpIHtcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmN1c3RvbURhdGEuZXZlbnQsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCwgdmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEgJiYgdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJyAmJiBlbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGVsW2ldO1xuICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB2YWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0U3RyaW5nKHZhbHVlKSAhPT0gZ2V0U3RyaW5nKGVsLnZhbHVlKSkge1xuICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gSW5zZXJ0cyBhbmQgYmluZHMgdGhlIGVsZW1lbnQgYW5kIGl0J3MgY2hpbGQgbm9kZXMgaW50byB0aGUgRE9NIHdoZW4gdHJ1ZS5cbiAgaWY6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBibG9jazogdHJ1ZSxcbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxVbmtub3duRWxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnIHRpbnliaW5kOiAnICsgdGhpcy50eXBlICsgJyAnICsgdGhpcy5rZXlwYXRoICsgJyAnKTtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy5jdXN0b21EYXRhLmJvdW5kID09PSBmYWxzZSAmJiAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC5iaW5kKCk7XG4gICAgICB9XG4gICAgICAgdGhpcy5jdXN0b21EYXRhLmJvdW5kID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdW5iaW5kKCkge1xuICAgICAgaWYgKCB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLnVuYmluZCgpO1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmJvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgICAgdmFsdWUgPSAhIXZhbHVlO1xuICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cbiAgICAgICAgICBpZiAoISB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCA9IG5ldyBWaWV3KGVsLCB0aGlzLnZpZXcubW9kZWxzLCB0aGlzLnZpZXcub3B0aW9ucyk7XG4gICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC5iaW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLm1hcmtlci5uZXh0U2libGluZyk7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZighZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUobW9kZWxzKSB7XG4gICAgICBpZiAoIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQudXBkYXRlKG1vZGVscyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBiaW5kZXJzIH07XG5cbmV4cG9ydCBkZWZhdWx0IGJpbmRlcnM7XG4iLCJpbXBvcnQgeyBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIElPYnNlcnZlclN5bmNDYWxsYmFjayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgQmluZGVyLCBJT25lV2F5QmluZGVyLCBJVHdvV2F5QmluZGVyIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXJPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiB7XG4gICAgW2tleTogc3RyaW5nXTogT2JzZXJ2ZXJcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBldmVudEhhbmRsZXJGdW5jdGlvbiA9IChldmVudDogRXZlbnQpID0+IHZvaWQ7XG5cbi8qKlxuICogVE9ETyBtb3ZlIHRvIHV0aWxzXG4gKiBAcGFyYW0gZWxcbiAqL1xuZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZShlbDogSFRNTFNlbGVjdEVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50KSB7XG4gIGxldCByZXN1bHRzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgIHJldHVybiAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZDtcbiAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnc2VsZWN0LW11bHRpcGxlJykge1xuICAgIGxldCBvcHRpb25zOkhUTUxPcHRpb25zQ29sbGVjdGlvbiA9IChlbCBhcyBIVE1MU2VsZWN0RWxlbWVudCkub3B0aW9ucztcblxuICAgIGZvciAoY29uc3Qga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1trZXldO1xuICAgICAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwudmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuY29uc3QgRk9STUFUVEVSX0FSR1MgPSAgL1teXFxzJ10rfCcoW14nXXwnW15cXHNdKSonfFwiKFteXCJdfFwiW15cXHNdKSpcIi9nO1xuY29uc3QgRk9STUFUVEVSX1NQTElUID0gL1xccysvO1xuXG4vKipcbiAqICBBIHNpbmdsZSBiaW5kaW5nIGJldHdlZW4gYSBtb2RlbCBhdHRyaWJ1dGUgYW5kIGEgRE9NIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBCaW5kaW5nIHtcbiAgdmFsdWU/OiBhbnk7XG4gIG9ic2VydmVyPzogT2JzZXJ2ZXI7XG4gIHZpZXc6IFZpZXc7XG4gIGVsOiBIVE1MRWxlbWVudDtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGJpbmRlciB3aXRob3V0IHRoZSBwcmVmaXhcbiAgICovXG4gIHR5cGU6IHN0cmluZyB8IG51bGw7XG4gIGJpbmRlcjogQmluZGVyPGFueT4gfCBudWxsO1xuICBmb3JtYXR0ZXJzOiBzdHJpbmdbXSB8IG51bGw7XG4gIGZvcm1hdHRlck9ic2VydmVyczogSUZvcm1hdHRlck9ic2VydmVycztcbiAga2V5cGF0aDogc3RyaW5nIHwgbnVsbDtcbiAgLyoqXG4gICAqIEFyZ3VtZW50cyBwYXJzZWQgZnJvbSBzdGFyIGJpbmRlcnMsIGUuZy4gb24gZm9vLSotKiBhcmdzWzBdIGlzIHRoZSBmaXJzdCBzdGFyLCBhcmdzWzFdIHRoZSBzZWNvbmQtXG4gICAqL1xuICBhcmdzOiBzdHJpbmdbXSB8IG51bGw7XG4gIC8qKlxuICAgKiBcbiAgICovXG4gIG1vZGVsPzogYW55O1xuICAvKipcbiAgICogSFRNTCBDb21tZW50IHRvIG1hcmsgYSBiaW5kaW5nIGluIHRoZSBET01cbiAgICovXG4gIG1hcmtlcj86IENvbW1lbnQ7XG4gIC8qKlxuICAgKiBVc2VkIGluIGNvbXBvbmVudCBiaW5kaW5ncy4gVE9ETyBlLmcuIG1vdmUgdG8gQ29tcG9uZW50QmluZGluZyBvciBiaW5kZXJzP1xuICAgKi9cbiAgX2JvdW5kPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGp1c3QgdG8gaGF2ZSBhIHZhbHVlIHdoZXJlIHdlIGNvdWxkIHN0b3JlIGN1c3RvbSBkYXRhXG4gICAqL1xuICBjdXN0b21EYXRhPzogYW55O1xuXG4gIC8qKlxuICAgKiBBbGwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGJpbmRpbmcgaXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yOyB0aGVcbiAgICogY29udGFpbmluZyB2aWV3LCB0aGUgRE9NIG5vZGUsIHRoZSB0eXBlIG9mIGJpbmRpbmcsIHRoZSBtb2RlbCBvYmplY3QgYW5kIHRoZVxuICAgKiBrZXlwYXRoIGF0IHdoaWNoIHRvIGxpc3RlbiBmb3IgY2hhbmdlcy5cbiAgICogQHBhcmFtIHsqfSB2aWV3IFxuICAgKiBAcGFyYW0geyp9IGVsIFxuICAgKiBAcGFyYW0geyp9IHR5cGUgXG4gICAqIEBwYXJhbSB7Kn0ga2V5cGF0aCBcbiAgICogQHBhcmFtIHsqfSBiaW5kZXIgXG4gICAqIEBwYXJhbSB7Kn0gYXJncyBUaGUgc3RhcnQgYmluZGVycywgb24gYGNsYXNzLSpgIGFyZ3NbMF0gd2lsIGJlIHRoZSBjbGFzc25hbWUgXG4gICAqIEBwYXJhbSB7Kn0gZm9ybWF0dGVycyBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHZpZXc6IFZpZXcsIGVsOiBIVE1MRWxlbWVudCwgdHlwZTogc3RyaW5nIHwgbnVsbCwga2V5cGF0aDogc3RyaW5nIHwgbnVsbCwgYmluZGVyOiBCaW5kZXI8YW55PiB8IG51bGwsIGFyZ3M6IHN0cmluZ1tdIHwgbnVsbCwgZm9ybWF0dGVyczogc3RyaW5nW10gfCBudWxsKSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgIHRoaXMuYmluZGVyID0gYmluZGVyO1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdGhpcy5mb3JtYXR0ZXJzID0gZm9ybWF0dGVycztcbiAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVycyA9IHt9O1xuICAgIHRoaXMubW9kZWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jdXN0b21EYXRhID0ge307XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGUgb2JqZWN0IGtleXBhdGhcbiAgICogQHBhcmFtIG9iaiBcbiAgICogQHBhcmFtIGtleXBhdGggXG4gICAqL1xuICBvYnNlcnZlKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrPzogSU9ic2VydmVyU3luY0NhbGxiYWNrKTogT2JzZXJ2ZXIge1xuICAgIGlmKGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmVyKG9iaiwga2V5cGF0aCwgY2FsbGJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmVyKG9iaiwga2V5cGF0aCwgdGhpcyk7XG4gICAgfVxuICAgIFxuICB9XG5cbiAgcGFyc2VUYXJnZXQoKSB7XG4gICAgaWYgKHRoaXMua2V5cGF0aCkge1xuICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKHRoaXMua2V5cGF0aCk7XG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKXtcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCB0aGlzLmtleXBhdGgpO1xuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZSBpbiB0b2tlbicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEdldCB0aGUgaXRlcmF0aW9uIGFsaWFzLCB1c2VkIGluIHRoZSBpbnRlcmF0aW9uIGJpbmRlcnMgbGlrZSBgZWFjaC0qYFxuICAgKiBAcGFyYW0geyp9IG1vZGVsTmFtZSBcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDI2XG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pa2VyaWMvcml2ZXRzL2Jsb2IvbWFzdGVyL2Rpc3Qvcml2ZXRzLmpzI0wxMTc1XG4gICAqL1xuICBnZXRJdGVyYXRpb25BbGlhcyhtb2RlbE5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiAnJScgKyBtb2RlbE5hbWUgKyAnJSc7XG4gIH1cblxuICBwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzOiBzdHJpbmdbXSwgZm9ybWF0dGVySW5kZXg6IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gYXJnc1xuICAgIC5tYXAocGFyc2VUeXBlKVxuICAgIC5tYXAoKHt0eXBlLCB2YWx1ZX0sIGFpKSA9PiB7XG4gICAgICBpZiAodHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgIGNvbnN0IHByaW1pdGl2ZVZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBwcmltaXRpdmVWYWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gS0VZUEFUSCkge1xuICAgICAgICAvLyBrZXlwYXRoIGlzIHN0cmluZ1xuICAgICAgICBjb25zdCBrZXlwYXRoID0gKHZhbHVlIGFzIHN0cmluZyApO1xuICAgICAgICBpZiAoIXRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XSkge1xuICAgICAgICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XSA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdW2FpXTtcblxuICAgICAgICBpZiAoIW9ic2VydmVyKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywga2V5cGF0aCk7XG4gICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdW2FpXSA9IG9ic2VydmVyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYnNlcnZlci52YWx1ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGFyZ3VtZW50IHR5cGUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGFsbCB0aGUgY3VycmVudCBmb3JtYXR0ZXJzIHRvIHRoZSBzdXBwbGllZCB2YWx1ZSBhbmQgcmV0dXJucyB0aGVcbiAgICogZm9ybWF0dGVkIHZhbHVlLlxuICAgKi9cbiAgZm9ybWF0dGVkVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmKHRoaXMuZm9ybWF0dGVycyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtYXR0ZXJzIGlzIG51bGwnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVycy5yZWR1Y2UoKHJlc3VsdDogYW55LypjaGVjayB0eXBlKi8sIGRlY2xhcmF0aW9uOiBzdHJpbmcgLypjaGVjayB0eXBlKi8sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGxldCBhcmdzID0gZGVjbGFyYXRpb24ubWF0Y2goRk9STUFUVEVSX0FSR1MpO1xuICAgICAgaWYoYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFyZ3MgbWF0Y2hlZCBmcm9tIEZPUk1BVFRFUl9BUkdTJyk7XG4gICAgICB9XG4gICAgICBsZXQgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICBpZighaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBpZCBmb3VuZCBpbiBhcmdzJyk7XG4gICAgICB9XG4gICAgICBsZXQgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG5cbiAgICAgIGNvbnN0IHByb2Nlc3NlZEFyZ3MgPSB0aGlzLnBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3MsIGluZGV4KTtcblxuICAgICAgaWYgKGZvcm1hdHRlciAmJiAoZm9ybWF0dGVyLnJlYWQgaW5zdGFuY2VvZiBGdW5jdGlvbikpIHtcbiAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyLnJlYWQocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH0gZWxzZSBpZiAoZm9ybWF0dGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBiaW5kaW5nIGFyb3VuZCB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICAqL1xuICBldmVudEhhbmRsZXIoZm46IGV2ZW50SGFuZGxlckZ1bmN0aW9uKTogKGV2OiBFdmVudCkgPT4gYW55IHtcbiAgICBsZXQgYmluZGluZyA9IHRoaXM7XG4gICAgbGV0IGhhbmRsZXIgPSBiaW5kaW5nLnZpZXcub3B0aW9ucy5oYW5kbGVyO1xuXG4gICAgcmV0dXJuIChldikgPT4ge1xuICAgICAgaWYoIWhhbmRsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBoYW5kbGVyIGRlZmluZWQgaW4gYmluZGluZy52aWV3Lm9wdGlvbnMuaGFuZGxlcicpO1xuICAgICAgfVxuICAgICAgaGFuZGxlci5jYWxsKGZuLCB0aGlzLCBldiwgYmluZGluZyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBmb3IgdGhlIGJpbmRpbmcuIFRoaXMgQmFzaWNhbGx5IGp1c3QgcnVucyB0aGUgYmluZGluZyByb3V0aW5lXG4gICAqIHdpdGggdGhlIHN1cHBsaWVkIHZhbHVlIGZvcm1hdHRlZC5cbiAgICovXG4gIHNldCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSAmJiAhKHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55PiApLmZ1bmN0aW9uKSB7XG4gICAgICB2YWx1ZSA9ICh2YWx1ZSBhcyBJT25lV2F5QmluZGVyPGFueT4gKVxuICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlKHZhbHVlLmNhbGwodGhpcy5tb2RlbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9ICh2YWx1ZSBhcyBJVHdvV2F5QmluZGVyPGFueT4gKVxuICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBsZXQgcm91dGluZUZuO1xuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdyb3V0aW5lJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgcm91dGluZUZuID0gdGhpcy5iaW5kZXIucm91dGluZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElPbmVXYXlCaW5kZXI8YW55Pik7XG4gICAgICByb3V0aW5lRm4gPSB0aGlzLmJpbmRlcjtcbiAgICB9XG5cbiAgICBpZiAocm91dGluZUZuIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJvdXRpbmVGbi5jYWxsKHRoaXMsIHRoaXMuZWwsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3luY3MgdXAgdGhlIHZpZXcgYmluZGluZyB3aXRoIHRoZSBtb2RlbC5cbiAgICovXG4gIHN5bmMoKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICAgIHRoaXMuc2V0KHRoaXMub2JzZXJ2ZXIudmFsdWUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaXNoZXMgdGhlIHZhbHVlIGN1cnJlbnRseSBzZXQgb24gdGhlIGlucHV0IGVsZW1lbnQgYmFjayB0byB0aGUgbW9kZWwuXG4gICAqL1xuICBwdWJsaXNoKCkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICBpZih0aGlzLmZvcm1hdHRlcnMgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtYXR0ZXJzIGlzIG51bGwnKTtcbiAgICAgIH1cbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVycy5yZWR1Y2VSaWdodCgocmVzdWx0OiBhbnkvKmNoZWNrIHR5cGUqLywgZGVjbGFyYXRpb246IHN0cmluZyAvKmNoZWNrIHR5cGUqLywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBhcmdzID0gZGVjbGFyYXRpb24uc3BsaXQoRk9STUFUVEVSX1NQTElUKTtcbiAgICAgICAgY29uc3QgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGlmKCFpZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWQgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICAgIGlmIChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLnB1Ymxpc2gpIHtcbiAgICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucHVibGlzaChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB0aGlzLmdldFZhbHVlKCh0aGlzLmVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpKSk7XG5cbiAgICAgIHRoaXMub2JzZXJ2ZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIHRoZSBtb2RlbCBmb3IgY2hhbmdlcyBhdCB0aGUgc3BlY2lmaWVkIGtleXBhdGguIEJpLWRpcmVjdGlvbmFsXG4gICAqIHJvdXRpbmVzIHdpbGwgYWxzbyBsaXN0ZW4gZm9yIGNoYW5nZXMgb24gdGhlIGVsZW1lbnQgdG8gcHJvcGFnYXRlIHRoZW0gYmFja1xuICAgKiB0byB0aGUgbW9kZWwuXG4gICAqL1xuICBiaW5kKCkge1xuICAgIHRoaXMucGFyc2VUYXJnZXQoKTtcblxuICAgIGlmICh0aGlzLmJpbmRlciAmJiB0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnYmluZCcpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICh0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYoIXRoaXMuYmluZGVyLmJpbmQgJiYgdHlwZW9mKHRoaXMuYmluZGVyLmJpbmQpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIG1ldGhvZCBiaW5kIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmJpbmRlci5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhKSB7XG4gICAgICB0aGlzLnN5bmMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmVzIGZyb20gdGhlIG1vZGVsIGFuZCB0aGUgZWxlbWVudC5cbiAgICovXG4gIHVuYmluZCgpIHtcbiAgICBpZih0aGlzLmJpbmRlciA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kZXIgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZih0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnYmluZCcpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmICh0aGlzLmJpbmRlci51bmJpbmQpIHtcbiAgICAgICAgdGhpcy5iaW5kZXIudW5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIudW5vYnNlcnZlKCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMpLmZvckVhY2goZmkgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmaV07XG5cbiAgICAgIE9iamVjdC5rZXlzKGFyZ3MpLmZvckVhY2goYWkgPT4ge1xuICAgICAgICBhcmdzW2FpXS51bm9ic2VydmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBiaW5kaW5nJ3MgbW9kZWwgZnJvbSB3aGF0IGlzIGN1cnJlbnRseSBzZXQgb24gdGhlIHZpZXcuIFVuYmluZHNcbiAgICogdGhlIG9sZCBtb2RlbCBmaXJzdCBhbmQgdGhlbiByZS1iaW5kcyB3aXRoIHRoZSBuZXcgbW9kZWwuXG4gICAqIEBwYXJhbSB7YW55fSBtb2RlbHMgXG4gICAqL1xuICB1cGRhdGUobW9kZWxzOiBhbnkgPSB7fSkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCd1cGRhdGUnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZiAodGhpcy5iaW5kZXIudXBkYXRlKSB7XG4gICAgICAgIHRoaXMuYmluZGVyLnVwZGF0ZS5jYWxsKHRoaXMsIG1vZGVscyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZWxlbWVudHMgdmFsdWVcbiAgICogQHBhcmFtIGVsIFxuICAgKi9cbiAgZ2V0VmFsdWUoZWw6IEhUTUxTZWxlY3RFbGVtZW50IHwgSFRNTElucHV0RWxlbWVudCkge1xuICAgIGlmKHRoaXMuYmluZGVyID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRlciBpcyBudWxsJyk7XG4gICAgfVxuICAgIGlmKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdnZXRWYWx1ZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmKHR5cGVvZih0aGlzLmJpbmRlci5nZXRWYWx1ZSkgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRWYWx1ZSBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYmluZGVyLmdldFZhbHVlLmNhbGwodGhpcywgZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0SW5wdXRWYWx1ZShlbCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB0aW55YmluZCwgSU9wdGlvbnNQYXJhbSB9IGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHsgcGFyc2VUeXBlIH0gZnJvbSAnLi9wYXJzZXJzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgSUJpbmRlcnMgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgSUZvcm1hdHRlcnMgfSBmcm9tICcuL2Zvcm1hdHRlcnMnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBJQ29tcG9uZW50LCBJQ29tcG9uZW50cyB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBJT2JzZXJ2ZXJzIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBJQWRhcHRlcnMgfSBmcm9tICcuL2FkYXB0ZXInO1xuXG5jb25zdCBtZXJnZU9iamVjdCA9ICh0YXJnZXQ6IGFueSwgb2JqOiBhbnkpID0+IHtcbiAgaWYob2JqKSB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIXRhcmdldFtrZXldIHx8IHRhcmdldFtrZXldID09PSB7fSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7IFxufTtcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuZXhwb3J0IGludGVyZmFjZSBJS2V5cGF0aHMge1xuICBbcHJvcGVydHlOYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbi8qKlxuICogY29tcG9uZW50IHZpZXcgZW5jYXBzdWxhdGVkIGFzIGEgYmluZGluZyB3aXRoaW4gaXQncyBwYXJlbnQgdmlldy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudEJpbmRpbmcgZXh0ZW5kcyBCaW5kaW5nIHtcbiAgdmlldzogVmlldztcbiAgY29tcG9uZW50Vmlldz86IFZpZXc7XG4gIGVsOiBIVE1MRWxlbWVudDtcbiAgdHlwZTogc3RyaW5nO1xuICBjb21wb25lbnQ6IElDb21wb25lbnQ7XG4gIC8qKlxuICAgKiBzdGF0aWMgdmFsdWVzIChQUklNSVRJVkUgQXR0cmlidXRlcylcbiAgICovXG4gIHN0YXRpYzogYW55ID0ge307XG4gIC8qKlxuICAgKiBrZXlwYXRoIHZhbHVlcyAoS0VZUEFUSCBBdHRyaWJ1dGVzKVxuICAgKi9cbiAga2V5cGF0aHM6IElLZXlwYXRocyA9IHt9O1xuICBvYnNlcnZlcnM6IElPYnNlcnZlcnM7XG4gIGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcblxuICAvLyBJbml0aWFsaXplcyBhIGNvbXBvbmVudCBiaW5kaW5nIGZvciB0aGUgc3BlY2lmaWVkIHZpZXcuIFRoZSByYXcgY29tcG9uZW50XG4gIC8vIGVsZW1lbnQgaXMgcGFzc2VkIGluIGFsb25nIHdpdGggdGhlIGNvbXBvbmVudCB0eXBlLiBBdHRyaWJ1dGVzIGFuZCBzY29wZVxuICAvLyBpbmZsZWN0aW9ucyBhcmUgZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgY29tcG9uZW50cyBkZWZpbmVkIGF0dHJpYnV0ZXMuXG4gIGNvbnN0cnVjdG9yKHZpZXc6IFZpZXcsIGVsOiBIVE1MRWxlbWVudCwgdHlwZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodmlldywgZWwsIHR5cGUsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wb25lbnQgPSB2aWV3Lm9wdGlvbnMuY29tcG9uZW50c1t0aGlzLnR5cGVdO1xuICAgIHRoaXMuc3RhdGljID0ge307XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTsgICAgICAgIFxuICAgIHRoaXMucGFyc2VUYXJnZXQoKTtcbiAgfVxuICAgIFxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6c3luY2Agc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmQgdG9cbiAgICogYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSA9IHRoaXMub2JzZXJ2ZXJzW2tleV0udGFyZ2V0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjp1cGRhdGVgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kXG4gICAqIHRvIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgICovXG4gIHVwZGF0ZSgpIHt9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpwdWJsaXNoYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAgKiB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gICAqL1xuICBwdWJsaXNoKCkge31cbiAgICBcbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IG1hcCB1c2luZyB0aGUgY29tcG9uZW50J3Mgc2NvcGUgaW5mbGVjdGlvbnMuXG4gICAqL1xuICBsb2NhbHMoKSB7XG4gICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5zdGF0aWMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5zdGF0aWNba2V5XTtcbiAgICB9KTtcbiAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLm9ic2VydmVyc1trZXldLnZhbHVlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAgIFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2FtZWwtY2FzZWQgdmVyc2lvbiBvZiB0aGUgc3RyaW5nLiBVc2VkIHdoZW4gdHJhbnNsYXRpbmcgYW5cbiAgICogZWxlbWVudCdzIGF0dHJpYnV0ZSBuYW1lIGludG8gYSBwcm9wZXJ0eSBuYW1lIGZvciB0aGUgY29tcG9uZW50J3Mgc2NvcGUuXG4gICAqIFRPRE8gbW92ZSB0byB1dGlsc1xuICAgKiBAcGFyYW0gc3RyaW5nIFxuICAgKi9cbiAgY2FtZWxDYXNlKHN0cmluZzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8tKFthLXpdKS9nLCBncm91cGVkID0+IHtcbiAgICAgIHJldHVybiBncm91cGVkWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRNZXJnZWRPcHRpb25zKCkge1xuICAgIHZhciBvcHRpb25zOiBJT3B0aW9uc1BhcmFtID0ge1xuICAgICAgLy8gRVhURU5TSU9OU1xuICAgICAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBmb3JtYXR0ZXJzOiA8SUZvcm1hdHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBjb21wb25lbnRzOiA8SUNvbXBvbmVudHM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBhZGFwdGVyczogPElBZGFwdGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICB9O1xuICAgIFxuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYmluZGVycywgdGhpcy5jb21wb25lbnQuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5mb3JtYXR0ZXJzLCB0aGlzLmNvbXBvbmVudC5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmNvbXBvbmVudHMsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYWRhcHRlcnMsIHRoaXMuY29tcG9uZW50LmFkYXB0ZXJzKTtcblxuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYmluZGVycywgdGhpcy52aWV3Lm9wdGlvbnMuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5mb3JtYXR0ZXJzLCB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmNvbXBvbmVudHMsIHRoaXMudmlldy5vcHRpb25zLmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYWRhcHRlcnMsIHRoaXMudmlldy5vcHRpb25zLmFkYXB0ZXJzKTtcblxuICAgIG9wdGlvbnMucHJlZml4ID0gdGhpcy5jb21wb25lbnQucHJlZml4ID8gdGhpcy5jb21wb25lbnQucHJlZml4IDogdGhpcy52aWV3Lm9wdGlvbnMucHJlZml4XG4gICAgb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZURlbGltaXRlcnMgPyB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZURlbGltaXRlcnMgOiB0aGlzLnZpZXcub3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnNcbiAgICBvcHRpb25zLnJvb3RJbnRlcmZhY2UgPSB0aGlzLmNvbXBvbmVudC5yb290SW50ZXJmYWNlID8gdGhpcy5jb21wb25lbnQucm9vdEludGVyZmFjZSA6IHRoaXMudmlldy5vcHRpb25zLnJvb3RJbnRlcmZhY2VcbiAgICBvcHRpb25zLnByZWxvYWREYXRhID0gdGhpcy5jb21wb25lbnQucHJlbG9hZERhdGEgPyB0aGlzLmNvbXBvbmVudC5wcmVsb2FkRGF0YSA6IHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhXG4gICAgb3B0aW9ucy5oYW5kbGVyID0gdGhpcy5jb21wb25lbnQuaGFuZGxlciA/IHRoaXMuY29tcG9uZW50LmhhbmRsZXIgOiB0aGlzLnZpZXcub3B0aW9ucy5oYW5kbGVyXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OmJpbmRgIHRvIGJ1aWxkIGB0aGlzLmNvbXBvbmVudFZpZXdgIHdpdGggYSBsb2NhbGl6ZWRcbiAgICogbWFwIG9mIG1vZGVscyBmcm9tIHRoZSByb290IHZpZXcuIEJpbmQgYHRoaXMuY29tcG9uZW50Vmlld2Agb24gc3Vic2VxdWVudCBjYWxscy5cbiAgICovXG4gIGJpbmQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdGhpcy5jb21wb25lbnQudGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgICAgIC8qKlxuICAgICAgICogdGhlcmUncyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHRoYXQgbWFrZXMgaW1wb3J0ZWQgVmlldyBhIGR1bW15IG9iamVjdC4gVXNlIHRpbnliaW5kLmJpbmRcbiAgICAgICAqL1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdGlueWJpbmQuYmluZChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsLmNoaWxkTm9kZXMpLCBzY29wZSwgdGhpcy5nZXRNZXJnZWRPcHRpb25zKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlVGFyZ2V0KCkge1xuICAgIC8vIHBhcnNlIGNvbXBvbmVudCBhdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGF0dHJpYnV0ZSA9IHRoaXMuZWwuYXR0cmlidXRlc1tpXTtcblxuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyBub3Qgd2l0aCBiaW5kaW5nIHByZWZpeC4gRS5nLiBydi1cbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKHRoaXMuYmluZGluZ1ByZWZpeCkgIT09IDApIHtcbiAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IHRoaXMuY2FtZWxDYXNlKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICBpZih0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgICB0aGlzLnN0YXRpY1twcm9wZXJ0eU5hbWVdID0gdG9rZW4udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgICAgdGhpcy5rZXlwYXRoc1twcm9wZXJ0eU5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdGhpcy5rZXlwYXRoc1twcm9wZXJ0eU5hbWVdLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdCBgdGlueWJpbmQuQmluZGluZzo6dW5iaW5kYCB0byBiZSBjYWxsZWQgb24gYHRoaXMuY29tcG9uZW50Vmlld2AuXG4gICAqL1xuICB1bmJpbmQoKSB7ICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm9ic2VydmVyc1trZXldLnVub2JzZXJ2ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGlmICh0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cbn0iLCJleHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXIge1xuICAodmFsOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogYW55O1xuICByZWFkPzogKHJlc3VsdDogc3RyaW5nLCAuLi5wcm9jZXNzZWRBcmdzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgcHVibGlzaD86IChyZXN1bHQ6IHN0cmluZywgLi4ucHJvY2Vzc2VkQXJnczogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUZvcm1hdHRlcjtcbn1cblxuY29uc3QgZm9ybWF0dGVyczogSUZvcm1hdHRlcnMgPSB7fTtcblxuZm9ybWF0dGVycy5ub3QgPSBmdW5jdGlvbiAodmFsdWU6IGJvb2xlYW4pIHtcbiAgcmV0dXJuICF2YWx1ZTtcbn07XG5cbmV4cG9ydCB7IGZvcm1hdHRlcnMgfTtcbiIsIlxuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcblxuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi90aW55YmluZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyU3luY0NhbGxiYWNrIHtcbiAgc3luYzogKCkgPT4gdm9pZDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUtleSB7XG4gIHBhdGg6IGFueTtcbiAgaTogUm9vdDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXJzIHtcbiAgW2tleTogc3RyaW5nXTogT2JzZXJ2ZXI7XG59XG5cbmV4cG9ydCB0eXBlIE9iaiA9IGFueTtcblxuZXhwb3J0IHR5cGUgUm9vdCA9IGFueTtcblxuLy8gQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QgdGhhbiBjYW4gYmUgb2JzZXJ2ZWQuXG5mdW5jdGlvbiBpc09iamVjdChvYmo6IE9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsXG59XG5cbi8vIEVycm9yIHRocm93ZXIuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdbT2JzZXJ2ZXJdICcgKyBtZXNzYWdlKVxufVxuXG4vLyBUT0RPXG5sZXQgYWRhcHRlcnM6IElBZGFwdGVycztcbmxldCBpbnRlcmZhY2VzOiBzdHJpbmdbXTtcbmxldCByb290SW50ZXJmYWNlOiBSb290O1xuXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZXIge1xuICBrZXlwYXRoOiBzdHJpbmc7XG4gIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2s7XG4gIG9iamVjdFBhdGg6IE9ialtdO1xuICBvYmo6IE9iajtcbiAgdGFyZ2V0OiBPYmo7XG4gIGtleTogSUtleTtcbiAgdG9rZW5zOiBJS2V5W107XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcga2V5cGF0aCBvYnNlcnZlciBhbmQga2lja3MgdGhpbmdzIG9mZi5cbiAgICogQHBhcmFtIG9iaiBcbiAgICogQHBhcmFtIGtleXBhdGggXG4gICAqIEBwYXJhbSBjYWxsYmFjayBcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9iajogT2JqLCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spIHtcbiAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLm9iamVjdFBhdGggPSBbXTtcbiAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHRoaXMucGFyc2UoKTtcbiAgICB0aGlzLmtleSA9IHBhcnNlUmVzdWx0LmtleTtcbiAgICB0aGlzLnRva2VucyA9IHBhcnNlUmVzdWx0LnRva2VucztcbiAgICB0aGlzLm9iaiA9IHRoaXMuZ2V0Um9vdE9iamVjdChvYmopO1xuICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5yZWFsaXplKCk7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnM6IElWaWV3T3B0aW9ucykge1xuICAgIGFkYXB0ZXJzID0gb3B0aW9ucy5hZGFwdGVycztcbiAgICBpbnRlcmZhY2VzID0gT2JqZWN0LmtleXMoYWRhcHRlcnMpO1xuICAgIHJvb3RJbnRlcmZhY2UgPSBvcHRpb25zLnJvb3RJbnRlcmZhY2U7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBUb2tlbml6ZXMgdGhlIHByb3ZpZGVkIGtleXBhdGggc3RyaW5nIGludG8gaW50ZXJmYWNlICsgcGF0aCB0b2tlbnMgZm9yIHRoZVxuICAgKiBvYnNlcnZlciB0byB3b3JrIHdpdGguXG4gICAqL1xuICBzdGF0aWMgdG9rZW5pemUgPSBmdW5jdGlvbihrZXlwYXRoOiBzdHJpbmcsIHJvb3Q6IFJvb3QpIHtcbiAgICB2YXIgdG9rZW5zOiBhbnlbXSA9IFtdO1xuICAgIHZhciBjdXJyZW50OiBJS2V5ID0ge2k6IHJvb3QsIHBhdGg6ICcnfTtcbiAgICB2YXIgaW5kZXg6IG51bWJlcjtcbiAgICB2YXIgY2hyOiBzdHJpbmc7XG4gIFxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGtleXBhdGgubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjaHIgPSBrZXlwYXRoLmNoYXJBdChpbmRleCk7XG4gIFxuICAgICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZihjaHIpKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICBjdXJyZW50ID0ge2k6IGNociwgcGF0aDogJyd9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudC5wYXRoICs9IGNocjtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHRva2Vucy5wdXNoKGN1cnJlbnQpO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBQYXJzZXMgdGhlIGtleXBhdGggdXNpbmcgdGhlIGludGVyZmFjZXMgZGVmaW5lZCBvbiB0aGUgdmlldy4gU2V0cyB2YXJpYWJsZXNcbiAgICogZm9yIHRoZSB0b2tlbml6ZWQga2V5cGF0aCBhcyB3ZWxsIGFzIHRoZSBlbmQga2V5LlxuICAgKi9cbiAgcGFyc2UoKSB7XG4gICAgdmFyIHBhdGg6IHN0cmluZztcbiAgICB2YXIgcm9vdDogUm9vdDtcbiAgXG4gICAgaWYgKCFpbnRlcmZhY2VzLmxlbmd0aCkge1xuICAgICAgZXJyb3IoJ011c3QgZGVmaW5lIGF0IGxlYXN0IG9uZSBhZGFwdGVyIGludGVyZmFjZS4nKTtcbiAgICB9XG4gIFxuICAgIGlmICghIX5pbnRlcmZhY2VzLmluZGV4T2YodGhpcy5rZXlwYXRoWzBdKSkge1xuICAgICAgcm9vdCA9IHRoaXMua2V5cGF0aFswXTtcbiAgICAgIHBhdGggPSB0aGlzLmtleXBhdGguc3Vic3RyKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByb290ID0gcm9vdEludGVyZmFjZTtcbiAgICAgIHBhdGggPSB0aGlzLmtleXBhdGg7XG4gICAgfVxuICBcbiAgICB0aGlzLnRva2VucyA9IE9ic2VydmVyLnRva2VuaXplKHBhdGgsIHJvb3QpO1xuXG4gICAgaWYoIXRoaXMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyB0b2tlbnMnKTtcbiAgICB9XG5cbiAgICB0aGlzLmtleSA9ICh0aGlzLnRva2Vucy5wb3AoKSBhcyBJS2V5KTtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAga2V5OiB0aGlzLmtleSxcbiAgICAgIHRva2VuczogdGhpcy50b2tlbnMsXG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogUmVhbGl6ZXMgdGhlIGZ1bGwga2V5cGF0aCwgYXR0YWNoaW5nIG9ic2VydmVycyBmb3IgZXZlcnkga2V5IGFuZCBjb3JyZWN0aW5nXG4gICAqIG9sZCBvYnNlcnZlcnMgdG8gYW55IGNoYW5nZWQgb2JqZWN0cyBpbiB0aGUga2V5cGF0aC5cbiAgICovXG4gIHJlYWxpemUoKSB7XG4gICAgdmFyIGN1cnJlbnQ6IE9iaiA9IHRoaXMub2JqXG4gICAgdmFyIHVucmVhY2hlZCA9IC0xXG4gICAgdmFyIHByZXZcbiAgICB2YXIgdG9rZW5cbiAgXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1tpbmRleF1cbiAgICAgIGlmIChpc09iamVjdChjdXJyZW50KSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQgIT09IChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5vYmplY3RQYXRoW2luZGV4XSA9IGN1cnJlbnRcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgdGhpcy5vYmplY3RQYXRoW2luZGV4XSA9IGN1cnJlbnRcbiAgICAgICAgfVxuICBcbiAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHRva2VuLCBjdXJyZW50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHVucmVhY2hlZCA9PT0gLTEpIHtcbiAgICAgICAgICB1bnJlYWNoZWQgPSBpbmRleFxuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAocHJldiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIHByZXYsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmICh1bnJlYWNoZWQgIT09IC0xKSB7XG4gICAgICB0aGlzLm9iamVjdFBhdGguc3BsaWNlKHVucmVhY2hlZClcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdXJyZW50XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBrZXlwYXRoLiBUaGlzIGlzIGNhbGxlZCB3aGVuIGFueSBpbnRlcm1lZGlhcnkga2V5IGlzIGNoYW5nZWQuXG4gICAqL1xuICBzeW5jKCkge1xuICAgIHZhciBuZXh0LCBvbGRWYWx1ZSwgbmV3VmFsdWVcbiAgXG4gICAgaWYgKChuZXh0ID0gdGhpcy5yZWFsaXplKCkpICE9PSB0aGlzLnRhcmdldCkge1xuICAgICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgICB0aGlzLnNldChmYWxzZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKVxuICAgICAgfVxuICBcbiAgICAgIGlmIChpc09iamVjdChuZXh0KSkge1xuICAgICAgICB0aGlzLnNldCh0cnVlLCB0aGlzLmtleSwgbmV4dCwgdGhpcy5jYWxsYmFjaylcbiAgICAgIH1cbiAgXG4gICAgICBvbGRWYWx1ZSA9IHRoaXMudmFsdWUoKVxuICAgICAgdGhpcy50YXJnZXQgPSBuZXh0XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWUoKVxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSB8fCBuZXdWYWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLmNhbGxiYWNrLnN5bmMoKVxuICAgIH0gZWxzZSBpZiAobmV4dCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrLnN5bmMoKVxuICAgIH1cbiAgfVxuICBcbiAgLy8gUmVhZHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBSZXR1cm5zIHVuZGVmaW5lZCBpZlxuICAvLyB0aGUgZnVsbCBrZXlwYXRoIGlzIHVucmVhY2hhYmxlLlxuICB2YWx1ZSgpIHtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQodGhpcy5rZXksIHRoaXMudGFyZ2V0KVxuICAgIH1cbiAgfVxuICBcbiAgLy8gU2V0cyB0aGUgY3VycmVudCBlbmQgdmFsdWUgb2YgdGhlIG9ic2VydmVkIGtleXBhdGguIENhbGxpbmcgc2V0VmFsdWUgd2hlblxuICAvLyB0aGUgZnVsbCBrZXlwYXRoIGlzIHVucmVhY2hhYmxlIGlzIGEgbm8tb3AuXG4gIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICBhZGFwdGVyc1t0aGlzLmtleS5pXS5zZXQodGhpcy50YXJnZXQsIHRoaXMua2V5LnBhdGgsIHZhbHVlKVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIEdldHMgdGhlIHByb3ZpZGVkIGtleSBvbiBhbiBvYmplY3QuXG4gICAqIEBwYXJhbSBrZXkgXG4gICAqIEBwYXJhbSBvYmogXG4gICAqL1xuICBnZXQoa2V5OiBJS2V5LCBvYmo6IE9iaikge1xuICAgIHJldHVybiBhZGFwdGVyc1trZXkuaV0uZ2V0KG9iaiwga2V5LnBhdGgpXG4gIH1cbiAgXG4gIC8qKlxuICAgKiBPYnNlcnZlcyBvciB1bm9ic2VydmVzIGEgY2FsbGJhY2sgb24gdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQga2V5LlxuICAgKiBAcGFyYW0gYWN0aXZlIFxuICAgKiBAcGFyYW0ga2V5IFxuICAgKiBAcGFyYW0gb2JqIFxuICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAqL1xuICBzZXQoYWN0aXZlOiBib29sZWFuLCBrZXk6IElLZXksIG9iajogT2JqLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgaWYoYWN0aXZlKSB7XG4gICAgICBhZGFwdGVyc1trZXkuaV0ub2JzZXJ2ZShvYmosIGtleS5wYXRoLCBjYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgYWRhcHRlcnNba2V5LmldLnVub2JzZXJ2ZShvYmosIGtleS5wYXRoLCBjYWxsYmFjaylcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBVbm9ic2VydmVzIHRoZSBlbnRpcmUga2V5cGF0aC5cbiAgICovXG4gIHVub2JzZXJ2ZSgpIHtcbiAgICB2YXIgb2JqOiBPYmo7XG4gICAgdmFyIHRva2VuO1xuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKG9iaiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBvYmosIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldChmYWxzZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKVxuICAgIH1cbiAgfVxuICAvLyB0cmF2ZXJzZSB0aGUgc2NvcGUgY2hhaW4gdG8gZmluZCB0aGUgc2NvcGUgd2hpY2ggaGFzIHRoZSByb290IHByb3BlcnR5XG4gIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgZm91bmQgaW4gY2hhaW4sIHJldHVybnMgdGhlIHJvb3Qgc2NvcGVcbiAgZ2V0Um9vdE9iamVjdChvYmo6IE9iaikge1xuICAgIHZhciByb290UHJvcCwgY3VycmVudDtcbiAgICBpZiAoIW9iai4kcGFyZW50KSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgcm9vdFByb3AgPSB0aGlzLnRva2Vuc1swXS5wYXRoXG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy5rZXkucGF0aFxuICAgIH1cbiAgXG4gICAgY3VycmVudCA9IG9iajtcbiAgICB3aGlsZSAoY3VycmVudC4kcGFyZW50ICYmIChjdXJyZW50W3Jvb3RQcm9wXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQuJHBhcmVudFxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH1cbn1cbiIsIi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbmNvbnN0IFFVT1RFRF9TVFIgPSAvXicuKickfF5cIi4qXCIkLzsgLy8gcmVnZXggdG8gdGVzdCBpZiBzdHJpbmcgaXMgd3JhcHBlZCBpbiBcIiBvciAnXG5cbi8vIFVzZWQgaW4gcGFyc2Vycy5wYXJzZVRlbXBsYXRlXG5jb25zdCBURVhUID0gMDtcbmNvbnN0IEJJTkRJTkcgPSAxO1xuXG4vLyBUZXN0IGlmIHN0cmluZyBpcyBhIGpzb24gc3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gaXNKc29uKHN0cjogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdmFsID0gSlNPTi5wYXJzZShzdHIpO1xuICAgIHJldHVybiAodmFsIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsIGluc3RhbmNlb2YgT2JqZWN0KSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gUGFyc2VyIGFuZCB0b2tlbml6ZXIgZm9yIGdldHRpbmcgdGhlIHR5cGUgYW5kIHZhbHVlIGZyb20gYSBzdHJpbmcuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUeXBlKHN0cmluZzogc3RyaW5nKSB7XG4gIGxldCB0eXBlID0gUFJJTUlUSVZFO1xuICBsZXQgdmFsdWU6IGFueSA9IHN0cmluZztcbiAgaWYgKFFVT1RFRF9TVFIudGVzdChzdHJpbmcpKSB7XG4gICAgdmFsdWUgPSBzdHJpbmcuc2xpY2UoMSwgLTEpO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3RydWUnKSB7XG4gICAgdmFsdWUgPSB0cnVlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ2ZhbHNlJykge1xuICAgIHZhbHVlID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAnbnVsbCcpIHtcbiAgICB2YWx1ZSA9IG51bGw7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKCFpc05hTihOdW1iZXIoc3RyaW5nKSkpIHtcbiAgICB2YWx1ZSA9IE51bWJlcihzdHJpbmcpO1xuICB9IGVsc2UgaWYgKGlzSnNvbihzdHJpbmcpKSB7XG4gICAgdmFsdWUgPSBKU09OLnBhcnNlKHN0cmluZyk7XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IEtFWVBBVEg7XG4gIH1cbiAgcmV0dXJuIHt0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWV9O1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRva2VucyB7XG4gIHR5cGU6IG51bWJlcjtcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuLy8gVGVtcGxhdGUgcGFyc2VyIGFuZCB0b2tlbml6ZXIgZm9yIG11c3RhY2hlLXN0eWxlIHRleHQgY29udGVudCBiaW5kaW5ncy5cbi8vIFBhcnNlcyB0aGUgdGVtcGxhdGUgYW5kIHJldHVybnMgYSBzZXQgb2YgdG9rZW5zLCBzZXBhcmF0aW5nIHN0YXRpYyBwb3J0aW9uc1xuLy8gb2YgdGV4dCBmcm9tIGJpbmRpbmcgZGVjbGFyYXRpb25zLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgZGVsaW1pdGVyczogc3RyaW5nW10pIHtcbiAgdmFyIHRva2VuczogSVRva2Vuc1tdIHwgbnVsbCA9IG51bGw7XG4gIGxldCBsZW5ndGggPSB0ZW1wbGF0ZS5sZW5ndGg7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBsYXN0SW5kZXggPSAwO1xuICBsZXQgb3BlbiA9IGRlbGltaXRlcnNbMF0sIGNsb3NlID0gZGVsaW1pdGVyc1sxXTtcblxuICB3aGlsZSAobGFzdEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKG9wZW4sIGxhc3RJbmRleCk7XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zID0gdG9rZW5zIHx8IFtdO1xuICAgICAgaWYgKGluZGV4ID4gMCAmJiBsYXN0SW5kZXggPCBpbmRleCkge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgb3Blbi5sZW5ndGg7XG4gICAgICBpbmRleCA9IHRlbXBsYXRlLmluZGV4T2YoY2xvc2UsIGxhc3RJbmRleCk7XG5cbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgbGV0IHN1YnN0cmluZyA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCAtIGNsb3NlLmxlbmd0aCk7XG4gICAgICAgIGxldCBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmIChsYXN0VG9rZW4gJiYgbGFzdFRva2VuLnR5cGUgPT09IFRFWFQpIHtcbiAgICAgICAgICBsYXN0VG9rZW4udmFsdWUgKz0gc3Vic3RyaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgICB2YWx1ZTogc3Vic3RyaW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlID0gdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4LCBpbmRleCkudHJpbSgpO1xuXG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IEJJTkRJTkcsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGxhc3RJbmRleCA9IGluZGV4ICsgY2xvc2UubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG4iLCJpbXBvcnQgeyBwYXJzZVRlbXBsYXRlLCBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgSUZvcm1hdHRlcnMsIGZvcm1hdHRlcnMgfSBmcm9tICcuL2Zvcm1hdHRlcnMnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgYWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgYmluZGVycywgSUJpbmRlcnMgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBJQWRhcHRlcnMgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIFJvb3QgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IElDb21wb25lbnRzIH0gZnJvbSAnLi9jb21wb25lbnRzJztcblxuZXhwb3J0IGludGVyZmFjZSBJT3B0aW9ucyB7XG4gIC8vIEF0dHJpYnV0ZSBwcmVmaXggaW4gdGVtcGxhdGVzXG4gIHByZWZpeD86IHN0cmluZztcblxuICAvL1ByZWxvYWQgdGVtcGxhdGVzIHdpdGggaW5pdGlhbCBkYXRhIG9uIGJpbmRcbiAgcHJlbG9hZERhdGE/OiBib29sZWFuO1xuXG4gIC8vUm9vdCBzaWdodGdsYXNzIGludGVyZmFjZSBmb3Iga2V5cGF0aHNcbiAgcm9vdEludGVyZmFjZT86IHN0cmluZztcblxuICAvLyBUZW1wbGF0ZSBkZWxpbWl0ZXJzIGZvciB0ZXh0IGJpbmRpbmdzXG4gIHRlbXBsYXRlRGVsaW1pdGVycz86IEFycmF5PHN0cmluZz5cblxuICAvLyBBdWdtZW50IHRoZSBldmVudCBoYW5kbGVyIG9mIHRoZSBvbi0qIGJpbmRlclxuICBoYW5kbGVyPzogRnVuY3Rpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV4dGVuc2lvbnMge1xuICBiaW5kZXJzOiBJQmluZGVyczxhbnk+O1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgY29tcG9uZW50czogSUNvbXBvbmVudHM7XG4gIGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnNQYXJhbSBleHRlbmRzIElFeHRlbnNpb25zLCBJT3B0aW9ucyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3T3B0aW9ucyBleHRlbmRzIElPcHRpb25zUGFyYW0ge1xuICBzdGFyQmluZGVyczogYW55O1xuICAvLyBzaWdodGdsYXNzXG4gIHJvb3RJbnRlcmZhY2U6IFJvb3Q7XG59XG5cbi8vIFRPRE8gbW92ZSB0byB1aXRpbHNcbmNvbnN0IG1lcmdlT2JqZWN0ID0gKHRhcmdldDogYW55LCBvYmo6IGFueSkgPT4ge1xuICBpZihvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghdGFyZ2V0W2tleV0gfHwgdGFyZ2V0W2tleV0gPT09IHt9KSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRhcmdldDsgXG59O1xuXG5jb25zdCB0aW55YmluZCA9IHtcbiAgLy8gR2xvYmFsIGJpbmRlcnMuXG4gIGJpbmRlcnM6IDxJQmluZGVyczxhbnk+PiBiaW5kZXJzLFxuXG4gIC8vIEdsb2JhbCBjb21wb25lbnRzLlxuICBjb21wb25lbnRzOiA8SUNvbXBvbmVudHM+IHt9LFxuXG4gIC8vIEdsb2JhbCBmb3JtYXR0ZXJzLlxuICBmb3JtYXR0ZXJzOiA8SUZvcm1hdHRlcnM+IGZvcm1hdHRlcnMsXG5cbiAgLy8gR2xvYmFsIHNpZ2h0Z2xhc3MgYWRhcHRlcnMuXG4gIGFkYXB0ZXJzOiA8SUFkYXB0ZXJzPiB7XG4gICAgJy4nOiBhZGFwdGVyLFxuICB9LFxuXG4gIC8vIERlZmF1bHQgYXR0cmlidXRlIHByZWZpeC5cbiAgX3ByZWZpeDogJ3J2JyxcblxuICBfZnVsbFByZWZpeDogJ3J2LScsXG5cbiAgZ2V0IHByZWZpeCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ByZWZpeDtcbiAgfSxcblxuICBzZXQgcHJlZml4ICh2YWx1ZSkge1xuICAgIHRoaXMuX3ByZWZpeCA9IHZhbHVlO1xuICAgIHRoaXMuX2Z1bGxQcmVmaXggPSB2YWx1ZSArICctJztcbiAgfSxcblxuICBwYXJzZVRlbXBsYXRlOiBwYXJzZVRlbXBsYXRlLFxuXG4gIHBhcnNlVHlwZTogcGFyc2VUeXBlLFxuXG4gIC8vIERlZmF1bHQgdGVtcGxhdGUgZGVsaW1pdGVycy5cbiAgdGVtcGxhdGVEZWxpbWl0ZXJzOiBbJ3snLCAnfSddLFxuXG4gIC8vIERlZmF1bHQgc2lnaHRnbGFzcyByb290IGludGVyZmFjZS5cbiAgcm9vdEludGVyZmFjZTogJy4nLFxuXG4gIC8vIFByZWxvYWQgZGF0YSBieSBkZWZhdWx0LlxuICBwcmVsb2FkRGF0YTogdHJ1ZSxcblxuICAvKipcbiAgICogRGVmYXVsdCBldmVudCBoYW5kbGVyLlxuICAgKiBUT0RPIGlzIHRoaXMgdXNlZD9cbiAgICovXG4gIGhhbmRsZXIodGhpczogYW55IC8qIFRPRE8gQ0hFQ01FICovLCBjb250ZXh0OiBhbnksIGV2OiBFdmVudCwgYmluZGluZzogQmluZGluZykge1xuICAgIC8vIGNvbnNvbGUud2FybigneWVzIGl0IGlzIHVzZWQnKTtcbiAgICB0aGlzLmNhbGwoY29udGV4dCwgZXYsIGJpbmRpbmcudmlldy5tb2RlbHMpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBhdHRyaWJ1dGUgb24gdGhlIGVsZW1lbnQuIElmIG5vIGJpbmRlciBhYm92ZSBpcyBtYXRjaGVkIGl0IHdpbGwgZmFsbFxuICAgKiBiYWNrIHRvIHVzaW5nIHRoaXMgYmluZGVyLlxuICAgKi9cbiAgZmFsbGJhY2tCaW5kZXIodGhpczogQmluZGluZywgZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYW55KSB7XG4gICAgaWYoIXRoaXMudHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IHNldCBhdHR0cmlidXRlIG9mICcgKyB0aGlzLnR5cGUpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKHRoaXMudHlwZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy50eXBlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1lcmdlcyBhbiBvYmplY3QgbGl0ZXJhbCBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIGdsb2JhbCBvcHRpb25zLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBcbiAgICovXG4gIGNvbmZpZ3VyZShvcHRpb25zOiBhbnkpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBvcHRpb25zW29wdGlvbl07XG4gICAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2JpbmRlcnMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYmluZGVycywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZm9ybWF0dGVycyc6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5mb3JtYXR0ZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb21wb25lbnRzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmNvbXBvbmVudHMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FkYXB0ZXJzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmFkYXB0ZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhZGFwdGVyJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmFkYXB0ZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcmVmaXgnOlxuICAgICAgICAgIHRoaXMucHJlZml4ID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3BhcnNlVGVtcGxhdGUnOlxuICAgICAgICAgIHRoaXMucGFyc2VUZW1wbGF0ZSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwYXJzZVR5cGUnOlxuICAgICAgICAgIHRoaXMucGFyc2VUeXBlID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZWZpeCc6XG4gICAgICAgICAgdGhpcy5wcmVmaXggPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndGVtcGxhdGVEZWxpbWl0ZXJzJzpcbiAgICAgICAgICB0aGlzLnRlbXBsYXRlRGVsaW1pdGVycyA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyb290SW50ZXJmYWNlJzpcbiAgICAgICAgICB0aGlzLnJvb3RJbnRlcmZhY2UgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJlbG9hZERhdGEnOlxuICAgICAgICAgIHRoaXMucHJlbG9hZERhdGEgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ09wdGlvbiBub3Qgc3VwcG9ydGVkJywgb3B0aW9uLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8vIEluaXRpYWxpemVzIGEgbmV3IGluc3RhbmNlIG9mIGEgY29tcG9uZW50IG9uIHRoZSBzcGVjaWZpZWQgZWxlbWVudCBhbmRcbiAgLy8gcmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXHRcbiAgaW5pdDogKGNvbXBvbmVudEtleTogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQsIGRhdGEgPSB7fSkgPT4ge1xuICAgIGlmICghZWwpIHtcbiAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50ID0gdGlueWJpbmQuY29tcG9uZW50c1tjb21wb25lbnRLZXldO1xuICAgIGVsLmlubmVySFRNTCA9IGNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRpbnliaW5kLCBlbCk7XG4gICAgbGV0IHNjb3BlID0gY29tcG9uZW50LmluaXRpYWxpemUuY2FsbCh0aW55YmluZCwgZWwsIGRhdGEpO1xuXG4gICAgbGV0IHZpZXcgPSB0aW55YmluZC5iaW5kKGVsLCBzY29wZSk7XG4gICAgdmlldy5iaW5kKCk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH0sXG5cbiAgLy8gQmluZHMgc29tZSBkYXRhIHRvIGEgdGVtcGxhdGUgLyBlbGVtZW50LiBSZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cbiAgYmluZDogKGVsOiBIVE1MRWxlbWVudCwgbW9kZWxzOiBhbnksIG9wdGlvbnM/OiBJT3B0aW9uc1BhcmFtKSA9PiB7XG4gICAgbGV0IHZpZXdPcHRpb25zOiBJVmlld09wdGlvbnMgPSB7XG4gICAgICAvLyBFWFRFTlNJT05TXG4gICAgICBiaW5kZXJzOiA8SUJpbmRlcnM8YW55Pj4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGZvcm1hdHRlcnM6IDxJRm9ybWF0dGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGNvbXBvbmVudHM6IDxJQ29tcG9uZW50cz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGFkYXB0ZXJzOiA8SUFkYXB0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgLy8gb3RoZXJcbiAgICAgIHN0YXJCaW5kZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgLy8gc2lnaHRnbGFzc1xuICAgICAgcm9vdEludGVyZmFjZTogPFJvb3Q+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgfTtcbiAgICBtb2RlbHMgPSBtb2RlbHMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAvLyBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIG9wdGlvbnMuYmluZGVycyk7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCBvcHRpb25zLmZvcm1hdHRlcnMpO1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuY29tcG9uZW50cywgb3B0aW9ucy5jb21wb25lbnRzKTtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCBvcHRpb25zLmFkYXB0ZXJzKTtcbiAgICB9XG5cbiAgICB2aWV3T3B0aW9ucy5wcmVmaXggPSBvcHRpb25zICYmIG9wdGlvbnMucHJlZml4ID8gb3B0aW9ucy5wcmVmaXggOiB0aW55YmluZC5wcmVmaXhcbiAgICB2aWV3T3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPSBvcHRpb25zICYmIG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID8gb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgOiB0aW55YmluZC50ZW1wbGF0ZURlbGltaXRlcnNcbiAgICB2aWV3T3B0aW9ucy5yb290SW50ZXJmYWNlID0gb3B0aW9ucyAmJiBvcHRpb25zLnJvb3RJbnRlcmZhY2UgPyBvcHRpb25zLnJvb3RJbnRlcmZhY2UgOiB0aW55YmluZC5yb290SW50ZXJmYWNlXG4gICAgdmlld09wdGlvbnMucHJlbG9hZERhdGEgPSBvcHRpb25zICYmIG9wdGlvbnMucHJlbG9hZERhdGEgPyBvcHRpb25zLnByZWxvYWREYXRhIDogdGlueWJpbmQucHJlbG9hZERhdGFcbiAgICB2aWV3T3B0aW9ucy5oYW5kbGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmhhbmRsZXIgPyBvcHRpb25zLmhhbmRsZXIgOiB0aW55YmluZC5oYW5kbGVyXG5cbiAgICAvLyBtZXJnZSBleHRlbnNpb25zXG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYmluZGVycywgdGlueWJpbmQuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgdGlueWJpbmQuZm9ybWF0dGVycyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuY29tcG9uZW50cywgdGlueWJpbmQuY29tcG9uZW50cyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYWRhcHRlcnMsIHRpbnliaW5kLmFkYXB0ZXJzKTtcblxuICAgIC8vIGdldCBhbGwgc3RhckJpbmRlcnMgZnJvbSBhdmFpbGFibGUgYmluZGVyc1xuICAgIHZpZXdPcHRpb25zLnN0YXJCaW5kZXJzID0gT2JqZWN0LmtleXModmlld09wdGlvbnMuYmluZGVycykuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBrZXkuaW5kZXhPZignKicpID4gMDtcbiAgICB9KTtcblxuICAgIE9ic2VydmVyLnVwZGF0ZU9wdGlvbnModmlld09wdGlvbnMpO1xuXG4gICAgbGV0IHZpZXcgPSBuZXcgVmlldyhlbCwgbW9kZWxzLCB2aWV3T3B0aW9ucyk7XG4gICAgdmlldy5iaW5kKCk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH0sXG59O1xuXG5leHBvcnQgeyB0aW55YmluZCB9O1xuXG5leHBvcnQgZGVmYXVsdCB0aW55YmluZDtcbiIsImltcG9ydCB7IHRpbnliaW5kLCBJVmlld09wdGlvbnMgfSBmcm9tICcuL3RpbnliaW5kJztcbmltcG9ydCB7IEJpbmRlciwgSVR3b1dheUJpbmRlciB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IENvbXBvbmVudEJpbmRpbmcsIElCb3VuZEVsZW1lbnQgfSBmcm9tICcuL2NvbXBvbmVudC1iaW5kaW5nJztcbmltcG9ydCB7IHBhcnNlVGVtcGxhdGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuXG5leHBvcnQgdHlwZSBUQmxvY2sgPSBib29sZWFuO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgZGF0YT86IHN0cmluZztcbn1cblxuY29uc3QgdGV4dEJpbmRlcjogSVR3b1dheUJpbmRlcjxzdHJpbmc+ID0ge1xuICByb3V0aW5lOiAobm9kZTogSURhdGFFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgbm9kZS5kYXRhID0gKHZhbHVlICE9IG51bGwpID8gdmFsdWUgOiAnJztcbiAgfVxufTtcblxuY29uc3QgREVDTEFSQVRJT05fU1BMSVQgPSAvKCg/OidbXiddKicpKig/Oig/OlteXFx8J10qKD86J1teJ10qJykrW15cXHwnXSopK3xbXlxcfF0rKSl8XiQvZztcblxuY29uc3QgcGFyc2VOb2RlID0gKHZpZXc6IFZpZXcsIG5vZGU6IElEYXRhRWxlbWVudCkgPT4ge1xuICBsZXQgYmxvY2s6IFRCbG9jayA9IGZhbHNlO1xuXG4gIC8vIGlmIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFXG4gIG5vZGUgPSAoIG5vZGUgYXMgSURhdGFFbGVtZW50KTtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICBpZighbm9kZS5kYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vZGUgaGFzIG5vIGRhdGEnKTtcbiAgICB9XG4gICAgbGV0IHRva2VucyA9IHBhcnNlVGVtcGxhdGUobm9kZS5kYXRhLCB0aW55YmluZC50ZW1wbGF0ZURlbGltaXRlcnMpO1xuXG4gICAgaWYgKHRva2Vucykge1xuICAgICAgaWYoIW5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodG9rZW4udmFsdWUpO1xuICAgICAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRleHQsIG5vZGUpO1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMSkge1xuICAgICAgICAgIHZpZXcuYnVpbGRCaW5kaW5nKHRleHQsIG51bGwsIHRva2VuLnZhbHVlLCB0ZXh0QmluZGVyLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgICBibG9jayA9IHRydWU7XG4gIH0gZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGJsb2NrID0gdmlldy50cmF2ZXJzZShub2RlKTtcbiAgfVxuXG4gIGlmICghYmxvY2spIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgcGFyc2VOb2RlKHZpZXcsIChub2RlLmNoaWxkTm9kZXNbaV0gYXMgSURhdGFFbGVtZW50KSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBiaW5kaW5nQ29tcGFyYXRvciA9IChhOiBCaW5kaW5nLCBiOiBCaW5kaW5nKSA9PiB7XG4gIGxldCBhUHJpb3JpdHkgPSBhLmJpbmRlciA/ICgoYS5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5wcmlvcml0eSB8fCAwKSA6IDA7XG4gIGxldCBiUHJpb3JpdHkgPSBiLmJpbmRlciA/ICgoYi5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5wcmlvcml0eSB8fCAwKSA6IDA7XG4gIHJldHVybiBiUHJpb3JpdHkgLSBhUHJpb3JpdHk7XG59O1xuXG5jb25zdCB0cmltU3RyID0gKHN0cjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBzdHIudHJpbSgpO1xufTtcblxuLy8gQSBjb2xsZWN0aW9uIG9mIGJpbmRpbmdzIGJ1aWx0IGZyb20gYSBzZXQgb2YgcGFyZW50IG5vZGVzLlxuZXhwb3J0IGNsYXNzIFZpZXcge1xuXG4gIGVsczogSFRNTENvbGxlY3Rpb24gfCBIVE1MRWxlbWVudFtdIHwgTm9kZVtdO1xuICBtb2RlbHM6IGFueTtcbiAgb3B0aW9uczogSVZpZXdPcHRpb25zO1xuICBiaW5kaW5nczogQmluZGluZ1tdID0gW107XG4gIGNvbXBvbmVudFZpZXc6IFZpZXcgfCBudWxsID0gbnVsbDtcblxuICAvLyBUaGUgRE9NIGVsZW1lbnRzIGFuZCB0aGUgbW9kZWwgb2JqZWN0cyBmb3IgYmluZGluZyBhcmUgcGFzc2VkIGludG8gdGhlXG4gIC8vIGNvbnN0cnVjdG9yIGFsb25nIHdpdGggYW55IGxvY2FsIG9wdGlvbnMgdGhhdCBzaG91bGQgYmUgdXNlZCB0aHJvdWdob3V0IHRoZVxuICAvLyBjb250ZXh0IG9mIHRoZSB2aWV3IGFuZCBpdCdzIGJpbmRpbmdzLlxuICBjb25zdHJ1Y3RvcihlbHM6IEhUTUxDb2xsZWN0aW9uIHwgSFRNTEVsZW1lbnQgfCBOb2RlLCBtb2RlbHM6IGFueSwgb3B0aW9uczogSVZpZXdPcHRpb25zKSB7XG4gICAgaWYgKGVscyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLmVscyA9IGVscztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbHMgPSAoW2Vsc10gYXMgSFRNTEVsZW1lbnRbXSB8IE5vZGVbXSApO1xuICAgIH1cblxuICAgIHRoaXMubW9kZWxzID0gbW9kZWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmJ1aWxkKCk7XG4gIH1cblxuICBwdWJsaWMgYnVpbGRCaW5kaW5nKG5vZGU6IEhUTUxFbGVtZW50IHwgVGV4dCwgdHlwZTogc3RyaW5nIHwgbnVsbCwgZGVjbGFyYXRpb246IHN0cmluZywgYmluZGVyOiBCaW5kZXI8YW55PiwgYXJnczogc3RyaW5nW10gfCBudWxsKSB7XG4gICAgbGV0IG1hdGNoZXMgPSBkZWNsYXJhdGlvbi5tYXRjaChERUNMQVJBVElPTl9TUExJVCk7XG4gICAgaWYobWF0Y2hlcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBtYXRjaGVzJyk7XG4gICAgfVxuICAgIGxldCBwaXBlcyA9IG1hdGNoZXMubWFwKHRyaW1TdHIpO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKSB8fCBudWxsO1xuICAgIGNvbnNvbGUubG9nKCdwaXBlcycsIHBpcGVzKTtcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IEJpbmRpbmcoKHRoaXMgYXMgVmlldyksIChub2RlIGFzIEhUTUxFbGVtZW50KSwgdHlwZSwga2V5cGF0aCwgYmluZGVyLCBhcmdzLCBwaXBlcykpO1xuICB9XG5cbiAgLy8gUGFyc2VzIHRoZSBET00gdHJlZSBhbmQgYnVpbGRzIGBCaW5kaW5nYCBpbnN0YW5jZXMgZm9yIGV2ZXJ5IG1hdGNoZWRcbiAgLy8gYmluZGluZyBkZWNsYXJhdGlvbi5cbiAgYnVpbGQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdO1xuXG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5lbHMsIGksIGxlbjtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcGFyc2VOb2RlKHRoaXMsIChlbGVtZW50c1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICB9XG5cbiAgICB0aGlzLmJpbmRpbmdzLnNvcnQoYmluZGluZ0NvbXBhcmF0b3IpO1xuICB9XG5cbiAgdHJhdmVyc2Uobm9kZTogSUJvdW5kRWxlbWVudCk6IFRCbG9jayB7XG4gICAgbGV0IGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcbiAgICBsZXQgYmxvY2sgPSBub2RlLm5vZGVOYW1lID09PSAnU0NSSVBUJyB8fCBub2RlLm5vZGVOYW1lID09PSAnU1RZTEUnO1xuICAgIGxldCBhdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgIGxldCBiaW5kSW5mb3MgPSBbXTtcbiAgICBsZXQgc3RhckJpbmRlcnMgPSB0aGlzLm9wdGlvbnMuc3RhckJpbmRlcnM7XG4gICAgdmFyIHR5cGUsIGJpbmRlciwgaWRlbnRpZmllciwgYXJncztcblxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyB3aXRoIHRoZSBiaW5kaW5nIHByZWZpeC4gRS5nLiBydlxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YoYmluZGluZ1ByZWZpeCkgPT09IDApIHtcbiAgICAgICAgdHlwZSA9IGF0dHJpYnV0ZS5uYW1lLnNsaWNlKGJpbmRpbmdQcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbdHlwZV07XG4gICAgICAgIGFyZ3MgPSBbXTtcblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc3RhckJpbmRlcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXIgPSBzdGFyQmluZGVyc1trXTtcbiAgICAgICAgICAgIGlmICh0eXBlLnNsaWNlKDAsIGlkZW50aWZpZXIubGVuZ3RoIC0gMSkgPT09IGlkZW50aWZpZXIuc2xpY2UoMCwgLTEpKSB7XG4gICAgICAgICAgICAgIGJpbmRlciA9IHRoaXMub3B0aW9ucy5iaW5kZXJzW2lkZW50aWZpZXJdO1xuICAgICAgICAgICAgICBhcmdzLnB1c2godHlwZS5zbGljZShpZGVudGlmaWVyLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFiaW5kZXIpIHtcbiAgICAgICAgICBiaW5kZXIgPSB0aW55YmluZC5mYWxsYmFja0JpbmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55PikuYmxvY2spIHtcbiAgICAgICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCB0eXBlLCBhdHRyaWJ1dGUudmFsdWUsIGJpbmRlciwgYXJncyk7XG4gICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZEluZm9zLnB1c2goe2F0dHI6IGF0dHJpYnV0ZSwgYmluZGVyOiBiaW5kZXIsIHR5cGU6IHR5cGUsIGFyZ3M6IGFyZ3N9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJpbmRJbmZvID0gYmluZEluZm9zW2ldO1xuICAgICAgdGhpcy5idWlsZEJpbmRpbmcobm9kZSwgYmluZEluZm8udHlwZSwgYmluZEluZm8uYXR0ci52YWx1ZSwgYmluZEluZm8uYmluZGVyLCBiaW5kSW5mby5hcmdzKTtcbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGJpbmRJbmZvLmF0dHIubmFtZSk7XG4gICAgfVxuXG4gICAgLy8gYmluZCBjb21wb25lbnRzXG4gICAgaWYgKCFibG9jaykge1xuICAgICAgdHlwZSA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb21wb25lbnRzW3R5cGVdICYmICFub2RlLl9ib3VuZCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IENvbXBvbmVudEJpbmRpbmcoKHRoaXMgYXMgVmlldyksIG5vZGUsIHR5cGUpKTtcbiAgICAgICAgYmxvY2sgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBibG9jaztcbiAgfVxuXG4gIC8vIEJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICBiaW5kKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGJpbmRpbmcuYmluZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVW5iaW5kcyBhbGwgb2YgdGhlIGN1cnJlbnQgYmluZGluZ3MgZm9yIHRoaXMgdmlldy5cbiAgdW5iaW5kKCkge1xuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5iaW5kaW5ncykpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgYmluZGluZy51bmJpbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZih0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBTeW5jcyB1cCB0aGUgdmlldyB3aXRoIHRoZSBtb2RlbCBieSBydW5uaW5nIHRoZSByb3V0aW5lcyBvbiBhbGwgYmluZGluZ3MuXG4gIHN5bmMoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5zeW5jKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBQdWJsaXNoZXMgdGhlIGlucHV0IHZhbHVlcyBmcm9tIHRoZSB2aWV3IGJhY2sgdG8gdGhlIG1vZGVsIChyZXZlcnNlIHN5bmMpLlxuICBwdWJsaXNoKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGlmIChiaW5kaW5nLmJpbmRlciAmJiAoYmluZGluZy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5wdWJsaXNoZXMpIHtcbiAgICAgICAgYmluZGluZy5wdWJsaXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSB2aWV3J3MgbW9kZWxzIGFsb25nIHdpdGggYW55IGFmZmVjdGVkIGJpbmRpbmdzLlxuICB1cGRhdGUobW9kZWxzOiBhbnkgPSB7fSkge1xuICAgIE9iamVjdC5rZXlzKG1vZGVscykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5tb2RlbHNba2V5XSA9IG1vZGVsc1trZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcudXBkYXRlKSB7XG4gICAgICAgIGJpbmRpbmcudXBkYXRlKG1vZGVscyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=