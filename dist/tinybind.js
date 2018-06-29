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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvZm9ybWF0dGVycy50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9vYnNlcnZlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3RpbnliaW5kLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3ZpZXcudHMiXSwibmFtZXMiOlsiQVJSQVlfTUVUSE9EUyIsIkFkYXB0ZXIiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwiY291bnRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3ZWFrbWFwIiwiX19ydiIsImNhbGxiYWNrcyIsInJlZiIsImtleXMiLCJsZW5ndGgiLCJwb2ludGVycyIsImZuIiwib3JpZ2luYWwiLCJtYXAiLCJ3ZWFrUmVmZXJlbmNlIiwiYXJncyIsInJlc3BvbnNlIiwiYXBwbHkiLCJmb3JFYWNoIiwiayIsInIiLCJBcnJheSIsImNhbGxiYWNrIiwic3luYyIsImtleXBhdGgiLCJzdHViRnVuY3Rpb24iLCJpbmRleE9mIiwicHVzaCIsImlkeCIsInNwbGljZSIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsInNldCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJuZXdWYWx1ZSIsInVub2JzZXJ2ZU11dGF0aW9ucyIsImNiIiwib2JzZXJ2ZU11dGF0aW9ucyIsImFkYXB0ZXIiLCJjcmVhdGVWaWV3IiwiYmluZGluZyIsIm1vZGVscyIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiRXJyb3IiLCJpbnNlcnRCZWZvcmUiLCJiaW5kZXJzIiwiZnVuY3Rpb24iLCJwcmlvcml0eSIsImN1c3RvbURhdGEiLCJoYW5kbGVyIiwidW5iaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiaW5kZXhQcm9wIiwiZ2V0QXR0cmlidXRlIiwiZ2V0SXRlcmF0aW9uQWxpYXMiLCJtb2RlbCIsImluZGV4Iiwic2NvcGUiLCIkcGFyZW50IiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInVuZGVmaW5lZCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJkYXRhIiwia2V5IiwiZWxDbGFzcyIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ0cmltIiwidGV4dCIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIkhUTUxTZWxlY3RFbGVtZW50IiwiaSIsIm9wdGlvbiIsInNlbGVjdGVkIiwiaWYiLCJhdHRhY2hlZCIsImJvdW5kIiwibmVzdGVkIiwiZ2V0SW5wdXRWYWx1ZSIsInJlc3VsdHMiLCJGT1JNQVRURVJfQVJHUyIsIkZPUk1BVFRFUl9TUExJVCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiZm9ybWF0dGVyT2JzZXJ2ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIlBSSU1JVElWRSIsIktFWVBBVEgiLCJvYnNlcnZlciIsIm9ic2VydmUiLCJ0YXJnZXQiLCJmb3JtYXR0ZXJJbmRleCIsInBhcnNlVHlwZSIsImFpIiwicHJpbWl0aXZlVmFsdWUiLCJyZWR1Y2UiLCJyZXN1bHQiLCJkZWNsYXJhdGlvbiIsIm1hdGNoIiwic2hpZnQiLCJmb3JtYXR0ZXIiLCJwcm9jZXNzZWRBcmdzIiwicGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMiLCJyZWFkIiwiRnVuY3Rpb24iLCJldiIsImNhbGwiLCJmb3JtYXR0ZWRWYWx1ZSIsInJvdXRpbmVGbiIsInJlZHVjZVJpZ2h0Iiwic3BsaXQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwicGFyc2VUYXJnZXQiLCJwcmVsb2FkRGF0YSIsInVub2JzZXJ2ZSIsImZpIiwiQ29tcG9uZW50QmluZGluZyIsInRpbnliaW5kIiwiX2Z1bGxQcmVmaXgiLCJjb21wb25lbnQiLCJjb21wb25lbnRzIiwic3RhdGljIiwib2JzZXJ2ZXJzIiwiY29tcG9uZW50VmlldyIsInN0cmluZyIsImdyb3VwZWQiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZSIsImFkYXB0ZXJzIiwicHJlZml4IiwidGVtcGxhdGVEZWxpbWl0ZXJzIiwicm9vdEludGVyZmFjZSIsImluaXRpYWxpemUiLCJsb2NhbHMiLCJwcm90b3R5cGUiLCJzbGljZSIsImNoaWxkTm9kZXMiLCJnZXRNZXJnZWRPcHRpb25zIiwiX2JvdW5kIiwibGVuIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsIm5hbWUiLCJiaW5kaW5nUHJlZml4IiwicHJvcGVydHlOYW1lIiwiY2FtZWxDYXNlIiwia2V5cGF0aHMiLCJub3QiLCJlcnJvciIsIm1lc3NhZ2UiLCJpbnRlcmZhY2VzIiwib2JqZWN0UGF0aCIsInBhcnNlUmVzdWx0IiwicGFyc2UiLCJ0b2tlbnMiLCJnZXRSb290T2JqZWN0IiwicmVhbGl6ZSIsInBhdGgiLCJyb290Iiwic3Vic3RyIiwidG9rZW5pemUiLCJjdXJyZW50IiwidW5yZWFjaGVkIiwicHJldiIsIm5leHQiLCJvbGRWYWx1ZSIsImFjdGl2ZSIsInJvb3RQcm9wIiwiY2hyIiwiY2hhckF0IiwiVEVYVCIsIkJJTkRJTkciLCJRVU9URURfU1RSIiwidGVzdCIsImlzTmFOIiwiTnVtYmVyIiwiSlNPTiIsInBhcnNlVGVtcGxhdGUiLCJkZWxpbWl0ZXJzIiwibGFzdEluZGV4Iiwib3BlbiIsImNsb3NlIiwic3Vic3RyaW5nIiwibGFzdFRva2VuIiwiX3ByZWZpeCIsImNvbnRleHQiLCJmYWxsYmFja0JpbmRlciIsInJlbW92ZUF0dHJpYnV0ZSIsImNvbmZpZ3VyZSIsImNvbnNvbGUiLCJ3YXJuIiwiaW5pdCIsImNvbXBvbmVudEtleSIsImNyZWF0ZUVsZW1lbnQiLCJ2aWV3T3B0aW9ucyIsInN0YXJCaW5kZXJzIiwiZmlsdGVyIiwidXBkYXRlT3B0aW9ucyIsIm1lcmdlT2JqZWN0IiwiaXNKc29uIiwic3RyIiwidmFsIiwiaXNPYmplY3QiLCJnZXRTdHJpbmciLCJ0b1N0cmluZyIsInRpbWVzIiwibiIsInRleHRCaW5kZXIiLCJub2RlIiwiREVDTEFSQVRJT05fU1BMSVQiLCJwYXJzZU5vZGUiLCJub2RlVHlwZSIsImNyZWF0ZVRleHROb2RlIiwiYnVpbGRCaW5kaW5nIiwidHJhdmVyc2UiLCJiaW5kaW5nQ29tcGFyYXRvciIsImEiLCJiIiwiYVByaW9yaXR5IiwiYlByaW9yaXR5IiwidHJpbVN0ciIsImJ1aWxkIiwibWF0Y2hlcyIsInBpcGVzIiwiZWxlbWVudHMiLCJzb3J0IiwiYmluZEluZm9zIiwiaWRl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S2lCLFFBQW5CLENBQUgsRUFBaUM7QUFDL0IsYUFBS0EsUUFBTCxDQUFjMUUsT0FBZCxDQUFzQixtQkFBVztBQUMvQnlCLGtCQUFRbUIsTUFBUjtBQUNELFNBRkQ7QUFHRDs7QUFDRCxVQUFHLEtBQUtnSCxhQUFSLEVBQXVCO0FBQ3JCLGFBQUtBLGFBQUwsQ0FBbUJoSCxNQUFuQjtBQUNEO0FBQ0YsSyxDQUVEOzs7OzJCQUNPO0FBQ0wsV0FBSzhCLFFBQUwsQ0FBYzFFLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0J5QixnQkFBUXBCLElBQVI7QUFDRCxPQUZEO0FBR0QsSyxDQUVEOzs7OzhCQUNVO0FBQ1IsV0FBS3FFLFFBQUwsQ0FBYzFFLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IsWUFBSXlCLFFBQVF3RixNQUFSLElBQW1CeEYsUUFBUXdGLE1BQVQsQ0FBdUNwQixTQUE3RCxFQUF3RTtBQUN0RXBFLGtCQUFRc0UsT0FBUjtBQUNEO0FBQ0YsT0FKRDtBQUtELEssQ0FFRDs7Ozs2QkFDeUI7QUFBQTs7QUFBQSxVQUFsQnJFLE1BQWtCLHVFQUFKLEVBQUk7QUFDdkIzQyxhQUFPTyxJQUFQLENBQVlvQyxNQUFaLEVBQW9CMUIsT0FBcEIsQ0FBNEIsZUFBTztBQUNqQyxjQUFLMEIsTUFBTCxDQUFZbUQsR0FBWixJQUFtQm5ELE9BQU9tRCxHQUFQLENBQW5CO0FBQ0QsT0FGRDtBQUlBLFdBQUtILFFBQUwsQ0FBYzFFLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IsWUFBSXlCLFFBQVFrRCxNQUFaLEVBQW9CO0FBQ2xCbEQsa0JBQVFrRCxNQUFSLENBQWVqRCxNQUFmO0FBQ0Q7QUFDRixPQUpEO0FBS0QiLCJmaWxlIjoidGlueWJpbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0aW55YmluZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0aW55YmluZFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdGlueWJpbmQudHNcIik7XG4iLCJpbXBvcnQgeyBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2sgfSBmcm9tICcuL29ic2VydmVyJztcblxuLy8gVGhlIGRlZmF1bHQgYC5gIGFkYXB0ZXIgdGhhdCBjb21lcyB3aXRoIHRpbnliaW5kLmpzLiBBbGxvd3Mgc3Vic2NyaWJpbmcgdG9cbi8vIHByb3BlcnRpZXMgb24gcGxhaW4gb2JqZWN0cywgaW1wbGVtZW50ZWQgaW4gRVM1IG5hdGl2ZXMgdXNpbmdcbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgLlxuXG5jb25zdCBBUlJBWV9NRVRIT0RTID0gW1xuICAncHVzaCcsXG4gICdwb3AnLFxuICAnc2hpZnQnLFxuICAndW5zaGlmdCcsXG4gICdzb3J0JyxcbiAgJ3JldmVyc2UnLFxuICAnc3BsaWNlJ1xuXTtcblxuZXhwb3J0IGludGVyZmFjZSBJUmVmIHtcbiAgY2FsbGJhY2tzOiBhbnlbXTtcbiAgcG9pbnRlcnM6IGFueVtdO1xufVxuXG4vKipcbiAqIFRPRE8gRm9yIHdoYXQgaXMgdGhpcz9cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJUlZBcnJheSBleHRlbmRzIEFycmF5PGFueT4ge1xuICBfX3J2OiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIEFkYXB0ZXJGdW5jdGlvbiA9ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXG5leHBvcnQgaW50ZXJmYWNlIElBZGFwdGVyIHtcbiAgY291bnRlcjogbnVtYmVyO1xuICB3ZWFrbWFwOiBhbnk7XG4gIHdlYWtSZWZlcmVuY2U6IChvYmo6IGFueSkgPT4gYW55OyAvLyA9PiBfX3J2ID9cbiAgY2xlYW51cFdlYWtSZWZlcmVuY2U6IChyZWY6IElSZWYsIGlkOiBudW1iZXIpID0+IHZvaWQ7XG4gIHN0dWJGdW5jdGlvbjogKG9iajogYW55LCBmbjogc3RyaW5nKSA9PiBhbnkgLy8gPT4gcmVzcG9uc2UgP1xuICBvYnNlcnZlTXV0YXRpb25zOiAob2JqOiBhbnksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVub2JzZXJ2ZU11dGF0aW9uczogKG9iajogSVJWQXJyYXksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9ic2VydmU6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSA9PiB2b2lkOyBcbiAgdW5vYnNlcnZlOiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykgPT4gdm9pZDtcbiAgZ2V0OiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZykgPT4gYW55O1xuICBzZXQ6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBZGFwdGVycyB7XG4gIFtuYW1lOiBzdHJpbmddOiBJQWRhcHRlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEFkYXB0ZXIgaW1wbGVtZW50cyBJQWRhcHRlciB7XG4gIGNvdW50ZXI6IG51bWJlciA9IDA7XG4gIHdlYWttYXA6YW55ID0ge307XG5cbiAgd2Vha1JlZmVyZW5jZShvYmo6IGFueSkge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KCdfX3J2JykpIHtcbiAgICAgIGxldCBpZCA9IHRoaXMuY291bnRlcisrO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnX19ydicsIHtcbiAgICAgICAgdmFsdWU6IGlkXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMud2Vha21hcFtvYmouX19ydl0pIHtcbiAgICAgIHRoaXMud2Vha21hcFtvYmouX19ydl0gPSB7XG4gICAgICAgIGNhbGxiYWNrczoge31cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMud2Vha21hcFtvYmouX19ydl07XG4gIH1cblxuICBjbGVhbnVwV2Vha1JlZmVyZW5jZShyZWY6IElSZWYsIGlkOiBudW1iZXIpIHtcbiAgICBpZiAoIU9iamVjdC5rZXlzKHJlZi5jYWxsYmFja3MpLmxlbmd0aCkge1xuICAgICAgaWYgKCEocmVmLnBvaW50ZXJzICYmIE9iamVjdC5rZXlzKHJlZi5wb2ludGVycykubGVuZ3RoKSkge1xuICAgICAgICBkZWxldGUgdGhpcy53ZWFrbWFwW2lkXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdHViRnVuY3Rpb24ob2JqOiBhbnksIGZuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3JpZ2luYWwgPSBvYmpbZm5dO1xuICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcbiAgICBsZXQgd2Vha21hcCA9IHRoaXMud2Vha21hcDtcblxuICAgIG9ialtmbl0gPSAoLi4uYXJnczogYW55W10pOiBBZGFwdGVyRnVuY3Rpb24gPT4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gb3JpZ2luYWwuYXBwbHkob2JqLCBhcmdzKTtcblxuICAgICAgT2JqZWN0LmtleXMobWFwLnBvaW50ZXJzKS5mb3JFYWNoKHIgPT4ge1xuICAgICAgICBsZXQgayA9IG1hcC5wb2ludGVyc1tyXTtcblxuICAgICAgICBpZiAod2Vha21hcFtyXSkge1xuICAgICAgICAgIGlmICh3ZWFrbWFwW3JdLmNhbGxiYWNrc1trXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB3ZWFrbWFwW3JdLmNhbGxiYWNrc1trXS5mb3JFYWNoKChjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrLnN5bmMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuICB9XG5cbiAgb2JzZXJ2ZU11dGF0aW9ucyhvYmo6IGFueSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgbGV0IG1hcCA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopO1xuXG4gICAgICBpZiAoIW1hcC5wb2ludGVycykge1xuICAgICAgICBtYXAucG9pbnRlcnMgPSB7fTtcblxuICAgICAgICBBUlJBWV9NRVRIT0RTLmZvckVhY2goZm4gPT4ge1xuICAgICAgICAgIHRoaXMuc3R1YkZ1bmN0aW9uKG9iaiwgZm4pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFtYXAucG9pbnRlcnNbcmVmXSkge1xuICAgICAgICBtYXAucG9pbnRlcnNbcmVmXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFwLnBvaW50ZXJzW3JlZl0uaW5kZXhPZihrZXlwYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzW3JlZl0ucHVzaChrZXlwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1bm9ic2VydmVNdXRhdGlvbnMob2JqOiBJUlZBcnJheSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykge1xuICAgIGlmICgob2JqIGluc3RhbmNlb2YgQXJyYXkpICYmIChvYmouX19ydiAhPSBudWxsKSkge1xuICAgICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICAgIGlmIChtYXApIHtcbiAgICAgICAgbGV0IHBvaW50ZXJzID0gbWFwLnBvaW50ZXJzW3JlZl07XG5cbiAgICAgICAgaWYgKHBvaW50ZXJzKSB7XG4gICAgICAgICAgbGV0IGlkeCA9IHBvaW50ZXJzLmluZGV4T2Yoa2V5cGF0aCk7XG5cbiAgICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHBvaW50ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghcG9pbnRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgbWFwLnBvaW50ZXJzW3JlZl07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jbGVhbnVwV2Vha1JlZmVyZW5jZShtYXAsIG9iai5fX3J2KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIHZhciB2YWx1ZTogYW55O1xuICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKS5jYWxsYmFja3M7XG5cbiAgICBpZiAoIWNhbGxiYWNrc1trZXlwYXRoXSkge1xuICAgICAgY2FsbGJhY2tzW2tleXBhdGhdID0gW107XG4gICAgICBsZXQgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXlwYXRoKTtcblxuICAgICAgaWYgKCFkZXNjIHx8ICEoZGVzYy5nZXQgfHwgZGVzYy5zZXQgfHwgIWRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgICB2YWx1ZSA9IG9ialtrZXlwYXRoXTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXlwYXRoLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcblxuICAgICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzZXQ6IG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgdGhpcy51bm9ic2VydmVNdXRhdGlvbnModmFsdWUsIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICAgICAgICAgICAgaWYgKG1hcCkge1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFja3MgPSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLmZvckVhY2goKGNiOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2Iuc3luYygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vYnNlcnZlTXV0YXRpb25zKG5ld1ZhbHVlLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjYWxsYmFja3Nba2V5cGF0aF0uaW5kZXhPZihjYWxsYmFjaykgPT09IC0xKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0ucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgdGhpcy5vYnNlcnZlTXV0YXRpb25zKG9ialtrZXlwYXRoXSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICB9XG5cbiAgdW5vYnNlcnZlKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2spIHtcbiAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgIGlmIChtYXApIHtcbiAgICAgIGxldCBjYWxsYmFja3MgPSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuXG4gICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIGxldCBpZHggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG5cbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICAgICAgaWYgKCFjYWxsYmFja3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcbiAgICAgICAgICAgIHRoaXMudW5vYnNlcnZlTXV0YXRpb25zKG9ialtrZXlwYXRoXSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xlYW51cFdlYWtSZWZlcmVuY2UobWFwLCBvYmouX19ydik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0KG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gb2JqW2tleXBhdGhdO1xuICB9XG5cbiAgc2V0KG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBvYmpba2V5cGF0aF0gPSB2YWx1ZTtcbiAgfVxufTtcblxuY29uc3QgYWRhcHRlciA9IG5ldyBBZGFwdGVyKCk7XG5leHBvcnQgeyBhZGFwdGVyIH1cbi8vIGV4cG9ydCBkZWZhdWx0IGFkYXB0ZXI7XG4iLCJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgdGltZXMsIGdldFN0cmluZyB9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIE9uZSB3YXkgYmluZGVyIGludGVyZmFjZVxuICovXG5leHBvcnQgdHlwZSBJT25lV2F5QmluZGVyPFZhbHVlVHlwZT4gPSAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQsIHZhbHVlOiBWYWx1ZVR5cGUpID0+IHZvaWQ7XG5cbi8qKlxuICogVG8gd2F5IGJpbmRlciBpbnRlcmZhY2VcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJVHdvV2F5QmluZGVyPFZhbHVlVHlwZT4ge1xuICByb3V0aW5lOiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQsIHZhbHVlOiBWYWx1ZVR5cGUpID0+IHZvaWQ7XG4gIGJpbmQ/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIHVuYmluZD86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgdXBkYXRlPzogKHRoaXM6IEJpbmRpbmcsIG1vZGVsOiBhbnkpID0+IHZvaWQ7XG4gIGdldFZhbHVlPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICBibG9jaz86IGJvb2xlYW47XG4gIGZ1bmN0aW9uPzogYm9vbGVhbjtcbiAgcHVibGlzaGVzPzogYm9vbGVhbjtcbiAgcHJpb3JpdHk/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBJZiB5b3Ugd2FudCB0byBzYXZlIGN1c3RvbSBkYXRhIGluIHRoaXMgdXNlIHRoaXMgb2JqZWN0XG4gICAqL1xuICBjdXN0b21EYXRhPzogYW55O1xufVxuXG4vKipcbiAqIEEgYmluZGVyIGNhbiBiZSBhIG9uZSB3YXkgYmluZGVyIG9yIGEgdHdvIHdheSBiaW5kZXJcbiAqL1xuZXhwb3J0IHR5cGUgQmluZGVyPFZhbHVlVHlwZT4gPSBJT25lV2F5QmluZGVyPFZhbHVlVHlwZT4gfCBJVHdvV2F5QmluZGVyPFZhbHVlVHlwZT5cblxuLyoqXG4gKiBBIGxpc3Qgb2YgYmluZGVycyB3aXRoIGFueSBrZXkgbmFtZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIElCaW5kZXJzPFZhbHVlVHlwZT4ge1xuICBbbmFtZTogc3RyaW5nXTogQmluZGVyPFZhbHVlVHlwZT47XG59XG5cbmNvbnN0IGNyZWF0ZVZpZXcgPSAoYmluZGluZzogQmluZGluZywgbW9kZWxzOiBhbnksIGFuY2hvckVsOiBIVE1MRWxlbWVudCB8IE5vZGUgfCBudWxsKSA9PiB7XG4gIGxldCB0ZW1wbGF0ZSA9IGJpbmRpbmcuZWwuY2xvbmVOb2RlKHRydWUpO1xuICBsZXQgdmlldyA9IG5ldyBWaWV3KCh0ZW1wbGF0ZSBhcyBOb2RlKSwgbW9kZWxzLCBiaW5kaW5nLnZpZXcub3B0aW9ucyk7XG4gIHZpZXcuYmluZCgpO1xuICBpZighYmluZGluZyB8fCAhYmluZGluZy5tYXJrZXIgfHwgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcGFyZW50IG5vZGUgZm9yIGJpbmRpbmchJyk7XG4gIH1cblxuICBiaW5kaW5nLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZW1wbGF0ZSwgYW5jaG9yRWwpO1xuXG4gIHJldHVybiB2aWV3O1xufVxuXG5jb25zdCBiaW5kZXJzOiBJQmluZGVyczxhbnk+ID0ge1xuICAvLyBCaW5kcyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBlbGVtZW50LlxuICAnb24tKic6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBwcmlvcml0eTogMTAwMCxcblxuICAgIGJpbmQoZWwpIHtcbiAgICAgIGlmKCF0aGlzLmN1c3RvbURhdGEpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0ge1xuICAgICAgICAgIGhhbmRsZXI6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYW55IC8qVE9ETyovKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpIHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1c3RvbURhdGEuaGFuZGxlciA9IHRoaXMuZXZlbnRIYW5kbGVyKHZhbHVlKTtcbiAgICAgIGlmKHRoaXMuYXJncyA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgICAgfVxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQXBwZW5kcyBib3VuZCBpbnN0YW5jZXMgb2YgdGhlIGVsZW1lbnQgaW4gcGxhY2UgZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuXG4gICdlYWNoLSonOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG5cbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChgIHRpbnliaW5kOiAke3RoaXMudHlwZX0gYCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHtcbiAgICAgICAgICBpdGVyYXRlZDogPFZpZXdbXT4gW11cbiAgICAgICAgfTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpICA9PiB7XG4gICAgICAgICAgdmlldy5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWwpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbCwgY29sbGVjdGlvbikge1xuICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXJncyBpcyBudWxsJyk7XG4gICAgICB9XG4gICAgICBsZXQgbW9kZWxOYW1lID0gdGhpcy5hcmdzWzBdO1xuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24gfHwgW107XG5cbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBvYmplY3Qga2V5cyB0byBpdGVyYXRlIG92ZXJcbiAgICAgIGlmKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZWFjaC0nICsgbW9kZWxOYW1lICsgJyBuZWVkcyBhbiBhcnJheSB0byBpdGVyYXRlIG92ZXIsIGJ1dCBpdCBpcycpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBpbmRleCBuYW1lIGlzIHNldGVkIGJ5IGBpbmRleC1wcm9wZXJ0eWAgdXNlIHRoaXMgbmFtZSwgb3RoZXJ3aXNlIGAlW21vZGVsTmFtZV0lYCAgXG4gICAgICBsZXQgaW5kZXhQcm9wID0gZWwuZ2V0QXR0cmlidXRlKCdpbmRleC1wcm9wZXJ0eScpIHx8IHRoaXMuZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lKTtcblxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChtb2RlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB7JHBhcmVudDogdGhpcy52aWV3Lm1vZGVsc307XG4gICAgICAgIHNjb3BlW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgc2NvcGVbbW9kZWxOYW1lXSA9IG1vZGVsO1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZFtpbmRleF07XG5cbiAgICAgICAgaWYgKCF2aWV3KSB7XG4gICAgICAgICAgbGV0IHByZXZpb3VzOiBDb21tZW50IHwgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgcHJldmlvdXMgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCAtIDFdLmVsc1swXTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhpcy5tYXJrZXIpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5tYXJrZXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJldmlvdXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2aWV3ID0gY3JlYXRlVmlldyh0aGlzLCBzY29wZSwgcHJldmlvdXMubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5wdXNoKHZpZXcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2aWV3Lm1vZGVsc1ttb2RlbE5hbWVdICE9PSBtb2RlbCkge1xuICAgICAgICAgICAgLy8gc2VhcmNoIGZvciBhIHZpZXcgdGhhdCBtYXRjaGVzIHRoZSBtb2RlbFxuICAgICAgICAgICAgbGV0IG1hdGNoSW5kZXgsIG5leHRWaWV3O1xuICAgICAgICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gaW5kZXggKyAxOyBuZXh0SW5kZXggPCB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgICAgICAgICAgICBuZXh0VmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZFtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAobmV4dFZpZXcubW9kZWxzW21vZGVsTmFtZV0gPT09IG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hJbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1hdGNoSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBtb2RlbCBpcyBpbiBvdGhlciBwb3NpdGlvblxuICAgICAgICAgICAgICAvLyB0b2RvOiBjb25zaWRlciBhdm9pZGluZyB0aGUgc3BsaWNlIGhlcmUgYnkgc2V0dGluZyBhIGZsYWdcbiAgICAgICAgICAgICAgLy8gcHJvZmlsZSBwZXJmb3JtYW5jZSBiZWZvcmUgaW1wbGVtZW50aW5nIHN1Y2ggY2hhbmdlXG4gICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5zcGxpY2UobWF0Y2hJbmRleCwgMSk7XG4gICAgICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5leHRWaWV3LmVsc1swXSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgICBuZXh0Vmlldy5tb2RlbHNbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy9uZXcgbW9kZWxcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSBjcmVhdGVWaWV3KHRoaXMsIHNjb3BlLCB2aWV3LmVsc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKGluZGV4LCAwLCBuZXh0Vmlldyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCA+IGNvbGxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgIHRpbWVzKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSBjb2xsZWN0aW9uLmxlbmd0aCwgKCkgPT4ge1xuICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnBvcCgpO1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgICAgaWYoIXRoaXMubWFya2VyIHx8ICF0aGlzLm1hcmtlci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2aWV3LmVsc1swXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwubm9kZU5hbWUgPT09ICdPUFRJT04nICYmIHRoaXMudmlldy5iaW5kaW5ncykge1xuICAgICAgICB0aGlzLnZpZXcuYmluZGluZ3MuZm9yRWFjaCgoYmluZGluZzogQmluZGluZykgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm1hcmtlciAmJiAoYmluZGluZy5lbCA9PT0gdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkgJiYgKGJpbmRpbmcudHlwZSA9PT0gJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGJpbmRpbmcuc3luYygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZShtb2RlbHMpIHtcbiAgICAgIGxldCBkYXRhOiBhbnkgPSB7fTtcblxuICAgICAgLy90b2RvOiBhZGQgdGVzdCBhbmQgZml4IGlmIG5lY2Vzc2FyeVxuXG4gICAgICBPYmplY3Qua2V5cyhtb2RlbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcmdzIGlzIG51bGwnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ICE9PSB0aGlzLmFyZ3NbMF0pIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSBtb2RlbHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBWaWV3KSA9PiB7XG4gICAgICAgIHZpZXcudXBkYXRlKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIEFkZHMgb3IgcmVtb3ZlcyB0aGUgY2xhc3MgZnJvbSB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgb3IgZmFsc2UuXG4gICdjbGFzcy0qJzogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBsZXQgZWxDbGFzcyA9IGAgJHtlbC5jbGFzc05hbWV9IGA7XG4gICAgaWYodGhpcy5hcmdzID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyZ3MgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgIT09IChlbENsYXNzLmluZGV4T2YoYCAke3RoaXMuYXJnc1swXX0gYCkgPiAtMSkpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBgJHtlbC5jbGFzc05hbWV9ICR7dGhpcy5hcmdzWzBdfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBlbENsYXNzLnJlcGxhY2UoYCAke3RoaXMuYXJnc1swXX0gYCwgJyAnKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyB0ZXh0IHZhbHVlLlxuICB0ZXh0OiA8SU9uZVdheUJpbmRlcjxzdHJpbmc+PiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyBIVE1MIGNvbnRlbnQuXG4gIGh0bWw6IDxJT25lV2F5QmluZGVyPHN0cmluZz4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGVsLmlubmVySFRNTCA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICB9LFxuXG4gIC8vIFNob3dzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZS5cbiAgc2hvdzogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgfSxcblxuICAvLyBIaWRlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgKG5lZ2F0ZWQgdmVyc2lvbiBvZiBgc2hvd2AgYmluZGVyKS5cbiAgaGlkZTogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnbm9uZScgOiAnJztcbiAgfSxcblxuICAvLyBFbmFibGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZS5cbiAgZW5hYmxlZDogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MQnV0dG9uRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgfSxcblxuICAvLyBEaXNhYmxlcyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUgKG5lZ2F0ZWQgdmVyc2lvbiBvZiBgZW5hYmxlZGAgYmluZGVyKS5cbiAgZGlzYWJsZWQ6IDxJT25lV2F5QmluZGVyPGJvb2xlYW4+PiBmdW5jdGlvbihlbDogSFRNTEJ1dHRvbkVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgZWwuZGlzYWJsZWQgPSAhIXZhbHVlO1xuICB9LFxuXG4gIC8vIENoZWNrcyBhIGNoZWNrYm94IG9yIHJhZGlvIGlucHV0IHdoZW4gdGhlIHZhbHVlIGlzIHRydWUuIEFsc28gc2V0cyB0aGUgbW9kZWxcbiAgLy8gcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgaXMgY2hlY2tlZCBvciB1bmNoZWNrZWQgKHR3by13YXkgYmluZGVyKS5cbiAgY2hlY2tlZDogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMjAwMCxcblxuICAgIGJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgfSxcblxuICAgIHVuYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgfSxcblxuICAgIHJvdXRpbmUoZWw6IEhUTUxTZWxlY3RFbGVtZW50LCB2YWx1ZSkge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IGdldFN0cmluZyhlbC52YWx1ZSkgPT09IGdldFN0cmluZyh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gISF2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIHZhbHVlLiBBbHNvIHNldHMgdGhlIG1vZGVsIHByb3BlcnR5IHdoZW4gdGhlIGlucHV0IGNoYW5nZXNcbiAgLy8gKHR3by13YXkgYmluZGVyKS5cbiAgdmFsdWU6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBwdWJsaXNoZXM6IHRydWUsXG4gICAgcHJpb3JpdHk6IDMwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvID0gZWwudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbC50eXBlID09PSAncmFkaW8nO1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuZXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUoJ2V2ZW50LW5hbWUnKSB8fCAoZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcgPyAnY2hhbmdlJyA6ICdpbnB1dCcpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnB1Ymxpc2goKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmN1c3RvbURhdGEuZXZlbnQsIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVuYmluZChlbCkge1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuY3VzdG9tRGF0YS5ldmVudCwgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LCB2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YSAmJiB0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnR5cGUgPT09ICdzZWxlY3QtbXVsdGlwbGUnICYmIGVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZWxbaV07XG4gICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChnZXRTdHJpbmcodmFsdWUpICE9PSBnZXRTdHJpbmcoZWwudmFsdWUpKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBJbnNlcnRzIGFuZCBiaW5kcyB0aGUgZWxlbWVudCBhbmQgaXQncyBjaGlsZCBub2RlcyBpbnRvIHRoZSBET00gd2hlbiB0cnVlLlxuICBpZjogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIGJsb2NrOiB0cnVlLFxuICAgIHByaW9yaXR5OiA0MDAwLFxuXG4gICAgYmluZChlbDogSFRNTFVua25vd25FbGVtZW50KSB7XG4gICAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcbiAgICAgIGlmICghdGhpcy5tYXJrZXIpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcgdGlueWJpbmQ6ICcgKyB0aGlzLnR5cGUgKyAnICcgKyB0aGlzLmtleXBhdGggKyAnICcpO1xuICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSBmYWxzZTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5tYXJrZXIsIGVsKTtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9IGVsc2UgaWYgKCB0aGlzLmN1c3RvbURhdGEuYm91bmQgPT09IGZhbHNlICYmICB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLmJpbmQoKTtcbiAgICAgIH1cbiAgICAgICB0aGlzLmN1c3RvbURhdGEuYm91bmQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICB1bmJpbmQoKSB7XG4gICAgICBpZiAoIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQudW5iaW5kKCk7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEuYm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSB7XG4gICAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgICBpZiAodmFsdWUgIT09IHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCkge1xuICAgICAgICBpZiAodmFsdWUpIHtcblxuICAgICAgICAgIGlmICghIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkID0gbmV3IFZpZXcoZWwsIHRoaXMudmlldy5tb2RlbHMsIHRoaXMudmlldy5vcHRpb25zKTtcbiAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLmJpbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoIXRoaXMubWFya2VyIHx8ICF0aGlzLm1hcmtlci5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tYXJrZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHRoaXMubWFya2VyLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VsZW1lbnQgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZShtb2RlbHMpIHtcbiAgICAgIGlmICggdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGJpbmRlcnMgfTsiLCJpbXBvcnQgeyBQUklNSVRJVkUsIEtFWVBBVEgsIHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBPYnNlcnZlciwgSU9ic2VydmVyU3luY0NhbGxiYWNrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBCaW5kZXIsIElPbmVXYXlCaW5kZXIsIElUd29XYXlCaW5kZXIgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlck9ic2VydmVycyB7XG4gIFtrZXk6IHN0cmluZ106IHtcbiAgICBba2V5OiBzdHJpbmddOiBPYnNlcnZlclxuICB9XG59XG5cbmV4cG9ydCB0eXBlIGV2ZW50SGFuZGxlckZ1bmN0aW9uID0gKGV2ZW50OiBFdmVudCkgPT4gdm9pZDtcblxuLyoqXG4gKiBUT0RPIG1vdmUgdG8gdXRpbHNcbiAqIEBwYXJhbSBlbFxuICovXG5mdW5jdGlvbiBnZXRJbnB1dFZhbHVlKGVsOiBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgbGV0IHJlc3VsdHM6IHN0cmluZ1tdID0gW107XG4gIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgcmV0dXJuIChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkO1xuICB9IGVsc2UgaWYgKGVsLnR5cGUgPT09ICdzZWxlY3QtbXVsdGlwbGUnKSB7XG4gICAgbGV0IG9wdGlvbnM6SFRNTE9wdGlvbnNDb2xsZWN0aW9uID0gKGVsIGFzIEhUTUxTZWxlY3RFbGVtZW50KS5vcHRpb25zO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW2tleV07XG4gICAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC52YWx1ZTtcbiAgfVxufVxuXG5cbmNvbnN0IEZPUk1BVFRFUl9BUkdTID0gIC9bXlxccyddK3wnKFteJ118J1teXFxzXSkqJ3xcIihbXlwiXXxcIlteXFxzXSkqXCIvZztcbmNvbnN0IEZPUk1BVFRFUl9TUExJVCA9IC9cXHMrLztcblxuLyoqXG4gKiAgQSBzaW5nbGUgYmluZGluZyBiZXR3ZWVuIGEgbW9kZWwgYXR0cmlidXRlIGFuZCBhIERPTSBlbGVtZW50LlxuICovXG5leHBvcnQgY2xhc3MgQmluZGluZyB7XG4gIHZhbHVlPzogYW55O1xuICBvYnNlcnZlcj86IE9ic2VydmVyO1xuICB2aWV3OiBWaWV3O1xuICBlbDogSFRNTEVsZW1lbnQ7XG4gIC8qKlxuICAgKiBOYW1lIG9mIHRoZSBiaW5kZXIgd2l0aG91dCB0aGUgcHJlZml4XG4gICAqL1xuICB0eXBlOiBzdHJpbmcgfCBudWxsO1xuICBiaW5kZXI6IEJpbmRlcjxhbnk+IHwgbnVsbDtcbiAgZm9ybWF0dGVyczogc3RyaW5nW10gfCBudWxsO1xuICBmb3JtYXR0ZXJPYnNlcnZlcnM6IElGb3JtYXR0ZXJPYnNlcnZlcnM7XG4gIGtleXBhdGg6IHN0cmluZyB8IG51bGw7XG4gIC8qKlxuICAgKiBBcmd1bWVudHMgcGFyc2VkIGZyb20gc3RhciBiaW5kZXJzLCBlLmcuIG9uIGZvby0qLSogYXJnc1swXSBpcyB0aGUgZmlyc3Qgc3RhciwgYXJnc1sxXSB0aGUgc2Vjb25kLVxuICAgKi9cbiAgYXJnczogc3RyaW5nW10gfCBudWxsO1xuICAvKipcbiAgICogXG4gICAqL1xuICBtb2RlbD86IGFueTtcbiAgLyoqXG4gICAqIEhUTUwgQ29tbWVudCB0byBtYXJrIGEgYmluZGluZyBpbiB0aGUgRE9NXG4gICAqL1xuICBtYXJrZXI/OiBDb21tZW50O1xuICAvKipcbiAgICogVXNlZCBpbiBjb21wb25lbnQgYmluZGluZ3MuIFRPRE8gZS5nLiBtb3ZlIHRvIENvbXBvbmVudEJpbmRpbmcgb3IgYmluZGVycz9cbiAgICovXG4gIF9ib3VuZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBqdXN0IHRvIGhhdmUgYSB2YWx1ZSB3aGVyZSB3ZSBjb3VsZCBzdG9yZSBjdXN0b20gZGF0YVxuICAgKi9cbiAgY3VzdG9tRGF0YT86IGFueTtcblxuICAvKipcbiAgICogQWxsIGluZm9ybWF0aW9uIGFib3V0IHRoZSBiaW5kaW5nIGlzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvcjsgdGhlXG4gICAqIGNvbnRhaW5pbmcgdmlldywgdGhlIERPTSBub2RlLCB0aGUgdHlwZSBvZiBiaW5kaW5nLCB0aGUgbW9kZWwgb2JqZWN0IGFuZCB0aGVcbiAgICoga2V5cGF0aCBhdCB3aGljaCB0byBsaXN0ZW4gZm9yIGNoYW5nZXMuXG4gICAqIEBwYXJhbSB7Kn0gdmlldyBcbiAgICogQHBhcmFtIHsqfSBlbCBcbiAgICogQHBhcmFtIHsqfSB0eXBlIFxuICAgKiBAcGFyYW0geyp9IGtleXBhdGggXG4gICAqIEBwYXJhbSB7Kn0gYmluZGVyIFxuICAgKiBAcGFyYW0geyp9IGFyZ3MgVGhlIHN0YXJ0IGJpbmRlcnMsIG9uIGBjbGFzcy0qYCBhcmdzWzBdIHdpbCBiZSB0aGUgY2xhc3NuYW1lIFxuICAgKiBAcGFyYW0geyp9IGZvcm1hdHRlcnMgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih2aWV3OiBWaWV3LCBlbDogSFRNTEVsZW1lbnQsIHR5cGU6IHN0cmluZyB8IG51bGwsIGtleXBhdGg6IHN0cmluZyB8IG51bGwsIGJpbmRlcjogQmluZGVyPGFueT4gfCBudWxsLCBhcmdzOiBzdHJpbmdbXSB8IG51bGwsIGZvcm1hdHRlcnM6IHN0cmluZ1tdIHwgbnVsbCkge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICB0aGlzLmJpbmRlciA9IGJpbmRlcjtcbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIHRoaXMuZm9ybWF0dGVycyA9IGZvcm1hdHRlcnM7XG4gICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMgPSB7fTtcbiAgICB0aGlzLm1vZGVsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuXG4gIH1cblxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIG9iamVjdCBrZXlwYXRoXG4gICAqIEBwYXJhbSBvYmogXG4gICAqIEBwYXJhbSBrZXlwYXRoIFxuICAgKi9cbiAgb2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjaz86IElPYnNlcnZlclN5bmNDYWxsYmFjayk6IE9ic2VydmVyIHtcbiAgICBpZihjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihvYmosIGtleXBhdGgsIGNhbGxiYWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZlcihvYmosIGtleXBhdGgsIHRoaXMpO1xuICAgIH1cbiAgICBcbiAgfVxuXG4gIHBhcnNlVGFyZ2V0KCkge1xuICAgIGlmICh0aGlzLmtleXBhdGgpIHtcbiAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZSh0aGlzLmtleXBhdGgpO1xuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdG9rZW4udmFsdWU7XG4gICAgICB9IGVsc2UgaWYodG9rZW4udHlwZSA9PT0gS0VZUEFUSCl7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgaW4gdG9rZW4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXQgdGhlIGl0ZXJhdGlvbiBhbGlhcywgdXNlZCBpbiB0aGUgaW50ZXJhdGlvbiBiaW5kZXJzIGxpa2UgYGVhY2gtKmBcbiAgICogQHBhcmFtIHsqfSBtb2RlbE5hbWUgXG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pa2VyaWMvcml2ZXRzL2Jsb2IvbWFzdGVyL2Rpc3Qvcml2ZXRzLmpzI0wyNlxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMTE3NVxuICAgKi9cbiAgZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gJyUnICsgbW9kZWxOYW1lICsgJyUnO1xuICB9XG5cbiAgcGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJnczogc3RyaW5nW10sIGZvcm1hdHRlckluZGV4OiBudW1iZXIpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIGFyZ3NcbiAgICAubWFwKHBhcnNlVHlwZSlcbiAgICAubWFwKCh7dHlwZSwgdmFsdWV9LCBhaSkgPT4ge1xuICAgICAgaWYgKHR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICBjb25zdCBwcmltaXRpdmVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gcHJpbWl0aXZlVmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgLy8ga2V5cGF0aCBpcyBzdHJpbmdcbiAgICAgICAgY29uc3Qga2V5cGF0aCA9ICh2YWx1ZSBhcyBzdHJpbmcgKTtcbiAgICAgICAgaWYgKCF0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0pIHtcbiAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV07XG5cbiAgICAgICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgICAgIG9ic2VydmVyID0gdGhpcy5vYnNlcnZlKHRoaXMudmlldy5tb2RlbHMsIGtleXBhdGgpO1xuICAgICAgICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV0gPSBvYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JzZXJ2ZXIudmFsdWUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBhcmd1bWVudCB0eXBlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbGwgdGhlIGN1cnJlbnQgZm9ybWF0dGVycyB0byB0aGUgc3VwcGxpZWQgdmFsdWUgYW5kIHJldHVybnMgdGhlXG4gICAqIGZvcm1hdHRlZCB2YWx1ZS5cbiAgICovXG4gIGZvcm1hdHRlZFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZih0aGlzLmZvcm1hdHRlcnMgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybWF0dGVycyBpcyBudWxsJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZvcm1hdHRlcnMucmVkdWNlKChyZXN1bHQ6IGFueS8qY2hlY2sgdHlwZSovLCBkZWNsYXJhdGlvbjogc3RyaW5nIC8qY2hlY2sgdHlwZSovLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBsZXQgYXJncyA9IGRlY2xhcmF0aW9uLm1hdGNoKEZPUk1BVFRFUl9BUkdTKTtcbiAgICAgIGlmKGFyZ3MgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhcmdzIG1hdGNoZWQgZnJvbSBGT1JNQVRURVJfQVJHUycpO1xuICAgICAgfVxuICAgICAgbGV0IGlkID0gYXJncy5zaGlmdCgpO1xuICAgICAgaWYoIWlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaWQgZm91bmQgaW4gYXJncycpO1xuICAgICAgfVxuICAgICAgbGV0IGZvcm1hdHRlciA9IHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnNbaWRdO1xuXG4gICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG5cbiAgICAgIGlmIChmb3JtYXR0ZXIgJiYgKGZvcm1hdHRlci5yZWFkIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5yZWFkKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlcihyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBldmVudCBoYW5kbGVyIGZvciB0aGUgYmluZGluZyBhcm91bmQgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgZXZlbnRIYW5kbGVyKGZuOiBldmVudEhhbmRsZXJGdW5jdGlvbik6IChldjogRXZlbnQpID0+IGFueSB7XG4gICAgbGV0IGJpbmRpbmcgPSB0aGlzO1xuICAgIGxldCBoYW5kbGVyID0gYmluZGluZy52aWV3Lm9wdGlvbnMuaGFuZGxlcjtcblxuICAgIHJldHVybiAoZXYpID0+IHtcbiAgICAgIGlmKCFoYW5kbGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaGFuZGxlciBkZWZpbmVkIGluIGJpbmRpbmcudmlldy5vcHRpb25zLmhhbmRsZXInKTtcbiAgICAgIH1cbiAgICAgIGhhbmRsZXIuY2FsbChmbiwgdGhpcywgZXYsIGJpbmRpbmcpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgZm9yIHRoZSBiaW5kaW5nLiBUaGlzIEJhc2ljYWxseSBqdXN0IHJ1bnMgdGhlIGJpbmRpbmcgcm91dGluZVxuICAgKiB3aXRoIHRoZSBzdXBwbGllZCB2YWx1ZSBmb3JtYXR0ZWQuXG4gICAqL1xuICBzZXQodmFsdWU6IGFueSkge1xuICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgJiYgISh0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4gKS5mdW5jdGlvbikge1xuICAgICAgdmFsdWUgPSAodmFsdWUgYXMgSU9uZVdheUJpbmRlcjxhbnk+IClcbiAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZSh2YWx1ZS5jYWxsKHRoaXMubW9kZWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSAodmFsdWUgYXMgSVR3b1dheUJpbmRlcjxhbnk+IClcbiAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgbGV0IHJvdXRpbmVGbjtcbiAgICBpZih0aGlzLmJpbmRlciA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kZXIgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZih0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgncm91dGluZScpKSB7XG4gICAgICB0aGlzLmJpbmRlciA9ICggdGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIHJvdXRpbmVGbiA9IHRoaXMuYmluZGVyLnJvdXRpbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJT25lV2F5QmluZGVyPGFueT4pO1xuICAgICAgcm91dGluZUZuID0gdGhpcy5iaW5kZXI7XG4gICAgfVxuXG4gICAgaWYgKHJvdXRpbmVGbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICByb3V0aW5lRm4uY2FsbCh0aGlzLCB0aGlzLmVsLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN5bmNzIHVwIHRoZSB2aWV3IGJpbmRpbmcgd2l0aCB0aGUgbW9kZWwuXG4gICAqL1xuICBzeW5jKCkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgICB0aGlzLnNldCh0aGlzLm9ic2VydmVyLnZhbHVlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHVibGlzaGVzIHRoZSB2YWx1ZSBjdXJyZW50bHkgc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50IGJhY2sgdG8gdGhlIG1vZGVsLlxuICAgKi9cbiAgcHVibGlzaCgpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgaWYodGhpcy5mb3JtYXR0ZXJzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybWF0dGVycyBpcyBudWxsJyk7XG4gICAgICB9XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzLmZvcm1hdHRlcnMucmVkdWNlUmlnaHQoKHJlc3VsdDogYW55LypjaGVjayB0eXBlKi8sIGRlY2xhcmF0aW9uOiBzdHJpbmcgLypjaGVjayB0eXBlKi8sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgYXJncyA9IGRlY2xhcmF0aW9uLnNwbGl0KEZPUk1BVFRFUl9TUExJVCk7XG4gICAgICAgIGNvbnN0IGlkID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBpZighaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lkIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gdGhpcy52aWV3Lm9wdGlvbnMuZm9ybWF0dGVyc1tpZF07XG4gICAgICAgIGNvbnN0IHByb2Nlc3NlZEFyZ3MgPSB0aGlzLnBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3MsIGluZGV4KTtcblxuICAgICAgICBpZiAoZm9ybWF0dGVyICYmIGZvcm1hdHRlci5wdWJsaXNoKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZm9ybWF0dGVyLnB1Ymxpc2gocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwgdGhpcy5nZXRWYWx1ZSgodGhpcy5lbCBhcyBIVE1MSW5wdXRFbGVtZW50KSkpO1xuXG4gICAgICB0aGlzLm9ic2VydmVyLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byB0aGUgbW9kZWwgZm9yIGNoYW5nZXMgYXQgdGhlIHNwZWNpZmllZCBrZXlwYXRoLiBCaS1kaXJlY3Rpb25hbFxuICAgKiByb3V0aW5lcyB3aWxsIGFsc28gbGlzdGVuIGZvciBjaGFuZ2VzIG9uIHRoZSBlbGVtZW50IHRvIHByb3BhZ2F0ZSB0aGVtIGJhY2tcbiAgICogdG8gdGhlIG1vZGVsLlxuICAgKi9cbiAgYmluZCgpIHtcbiAgICB0aGlzLnBhcnNlVGFyZ2V0KCk7XG5cbiAgICBpZiAodGhpcy5iaW5kZXIgJiYgdGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2JpbmQnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAodGhpcy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KTtcbiAgICAgIGlmKCF0aGlzLmJpbmRlci5iaW5kICYmIHR5cGVvZih0aGlzLmJpbmRlci5iaW5kKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBtZXRob2QgYmluZCBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgICAgdGhpcy5iaW5kZXIuYmluZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZpZXcub3B0aW9ucy5wcmVsb2FkRGF0YSkge1xuICAgICAgdGhpcy5zeW5jKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHRoZSBtb2RlbCBhbmQgdGhlIGVsZW1lbnQuXG4gICAqL1xuICB1bmJpbmQoKSB7XG4gICAgaWYodGhpcy5iaW5kZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYmluZGVyIGlzIG51bGwnKTtcbiAgICB9XG4gICAgaWYodGhpcy5iaW5kZXIuaGFzT3duUHJvcGVydHkoJ2JpbmQnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZiAodGhpcy5iaW5kZXIudW5iaW5kKSB7XG4gICAgICAgIHRoaXMuYmluZGVyLnVuYmluZC5jYWxsKHRoaXMsIHRoaXMuZWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm9ic2VydmVyLnVub2JzZXJ2ZSgpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzKS5mb3JFYWNoKGZpID0+IHtcbiAgICAgIGxldCBhcmdzID0gdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZmldO1xuXG4gICAgICBPYmplY3Qua2V5cyhhcmdzKS5mb3JFYWNoKGFpID0+IHtcbiAgICAgICAgYXJnc1thaV0udW5vYnNlcnZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgYmluZGluZydzIG1vZGVsIGZyb20gd2hhdCBpcyBjdXJyZW50bHkgc2V0IG9uIHRoZSB2aWV3LiBVbmJpbmRzXG4gICAqIHRoZSBvbGQgbW9kZWwgZmlyc3QgYW5kIHRoZW4gcmUtYmluZHMgd2l0aCB0aGUgbmV3IG1vZGVsLlxuICAgKiBAcGFyYW0ge2FueX0gbW9kZWxzIFxuICAgKi9cbiAgdXBkYXRlKG1vZGVsczogYW55ID0ge30pIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgIH1cbiAgICBpZih0aGlzLmJpbmRlciA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kZXIgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZih0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgndXBkYXRlJykpIHtcbiAgICAgIHRoaXMuYmluZGVyID0gKCB0aGlzLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pO1xuICAgICAgaWYgKHRoaXMuYmluZGVyLnVwZGF0ZSkge1xuICAgICAgICB0aGlzLmJpbmRlci51cGRhdGUuY2FsbCh0aGlzLCBtb2RlbHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGVsZW1lbnRzIHZhbHVlXG4gICAqIEBwYXJhbSBlbCBcbiAgICovXG4gIGdldFZhbHVlKGVsOiBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICBpZih0aGlzLmJpbmRlciA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kZXIgaXMgbnVsbCcpO1xuICAgIH1cbiAgICBpZih0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnZ2V0VmFsdWUnKSkge1xuICAgICAgdGhpcy5iaW5kZXIgPSAoIHRoaXMuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55Pik7XG4gICAgICBpZih0eXBlb2YodGhpcy5iaW5kZXIuZ2V0VmFsdWUpICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0VmFsdWUgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRlci5nZXRWYWx1ZS5jYWxsKHRoaXMsIGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldElucHV0VmFsdWUoZWwpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgdGlueWJpbmQsIElPcHRpb25zUGFyYW0gfSBmcm9tICcuL3RpbnliaW5kJztcbmltcG9ydCB7IFBSSU1JVElWRSwgS0VZUEFUSCwgcGFyc2VUeXBlIH0gZnJvbSAnLi9wYXJzZXJzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgSUJpbmRlcnMgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgSUZvcm1hdHRlcnMgfSBmcm9tICcuL2Zvcm1hdHRlcnMnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgeyBJQ29tcG9uZW50LCBJQ29tcG9uZW50cyB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBJT2JzZXJ2ZXJzIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBJQWRhcHRlcnMgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgbWVyZ2VPYmplY3QgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQm91bmRFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1x0XG4gIF9ib3VuZD86IGJvb2xlYW5cdFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElLZXlwYXRocyB7XG4gIFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IHN0cmluZztcbn1cblxuLyoqXG4gKiBjb21wb25lbnQgdmlldyBlbmNhcHN1bGF0ZWQgYXMgYSBiaW5kaW5nIHdpdGhpbiBpdCdzIHBhcmVudCB2aWV3LlxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmluZGluZyBleHRlbmRzIEJpbmRpbmcge1xuICB2aWV3OiBWaWV3O1xuICBjb21wb25lbnRWaWV3PzogVmlldztcbiAgZWw6IElCb3VuZEVsZW1lbnQ7XG4gIHR5cGU6IHN0cmluZztcbiAgY29tcG9uZW50OiBJQ29tcG9uZW50PGFueT47XG4gIC8qKlxuICAgKiBzdGF0aWMgdmFsdWVzIChQUklNSVRJVkUgQXR0cmlidXRlcylcbiAgICovXG4gIHN0YXRpYzogYW55ID0ge307XG4gIC8qKlxuICAgKiBrZXlwYXRoIHZhbHVlcyAoS0VZUEFUSCBBdHRyaWJ1dGVzKVxuICAgKi9cbiAga2V5cGF0aHM6IElLZXlwYXRocyA9IHt9O1xuICBvYnNlcnZlcnM6IElPYnNlcnZlcnM7XG4gIGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcblxuICAvLyBJbml0aWFsaXplcyBhIGNvbXBvbmVudCBiaW5kaW5nIGZvciB0aGUgc3BlY2lmaWVkIHZpZXcuIFRoZSByYXcgY29tcG9uZW50XG4gIC8vIGVsZW1lbnQgaXMgcGFzc2VkIGluIGFsb25nIHdpdGggdGhlIGNvbXBvbmVudCB0eXBlLiBBdHRyaWJ1dGVzIGFuZCBzY29wZVxuICAvLyBpbmZsZWN0aW9ucyBhcmUgZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgY29tcG9uZW50cyBkZWZpbmVkIGF0dHJpYnV0ZXMuXG4gIGNvbnN0cnVjdG9yKHZpZXc6IFZpZXcsIGVsOiBIVE1MRWxlbWVudCwgdHlwZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodmlldywgZWwsIHR5cGUsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wb25lbnQgPSB2aWV3Lm9wdGlvbnMuY29tcG9uZW50c1t0aGlzLnR5cGVdO1xuICAgIHRoaXMuc3RhdGljID0ge307XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTsgICAgICAgIFxuICAgIHRoaXMucGFyc2VUYXJnZXQoKTtcbiAgfVxuICAgIFxuICAgIFxuICAvKipcbiAgICogSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6c3luY2Agc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmQgdG9cbiAgICogYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSA9IHRoaXMub2JzZXJ2ZXJzW2tleV0udGFyZ2V0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjp1cGRhdGVgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kXG4gICAqIHRvIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgICovXG4gIHVwZGF0ZSgpIHt9XG4gICAgXG4gIC8qKlxuICAgKiBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpwdWJsaXNoYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAgKiB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gICAqL1xuICBwdWJsaXNoKCkge31cbiAgICBcbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JqZWN0IG1hcCB1c2luZyB0aGUgY29tcG9uZW50J3Mgc2NvcGUgaW5mbGVjdGlvbnMuXG4gICAqL1xuICBsb2NhbHMoKSB7XG4gICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5zdGF0aWMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5zdGF0aWNba2V5XTtcbiAgICB9KTtcbiAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLm9ic2VydmVyc1trZXldLnZhbHVlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAgIFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgY2FtZWwtY2FzZWQgdmVyc2lvbiBvZiB0aGUgc3RyaW5nLiBVc2VkIHdoZW4gdHJhbnNsYXRpbmcgYW5cbiAgICogZWxlbWVudCdzIGF0dHJpYnV0ZSBuYW1lIGludG8gYSBwcm9wZXJ0eSBuYW1lIGZvciB0aGUgY29tcG9uZW50J3Mgc2NvcGUuXG4gICAqIFRPRE8gbW92ZSB0byB1dGlsc1xuICAgKiBAcGFyYW0gc3RyaW5nIFxuICAgKi9cbiAgY2FtZWxDYXNlKHN0cmluZzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8tKFthLXpdKS9nLCBncm91cGVkID0+IHtcbiAgICAgIHJldHVybiBncm91cGVkWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRNZXJnZWRPcHRpb25zKCkge1xuICAgIHZhciBvcHRpb25zOiBJT3B0aW9uc1BhcmFtID0ge1xuICAgICAgLy8gRVhURU5TSU9OU1xuICAgICAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBmb3JtYXR0ZXJzOiA8SUZvcm1hdHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBjb21wb25lbnRzOiA8SUNvbXBvbmVudHM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBhZGFwdGVyczogPElBZGFwdGVycz4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICB9O1xuICAgIFxuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYmluZGVycywgdGhpcy5jb21wb25lbnQuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5mb3JtYXR0ZXJzLCB0aGlzLmNvbXBvbmVudC5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmNvbXBvbmVudHMsIHRoaXMuY29tcG9uZW50LmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYWRhcHRlcnMsIHRoaXMuY29tcG9uZW50LmFkYXB0ZXJzKTtcblxuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYmluZGVycywgdGhpcy52aWV3Lm9wdGlvbnMuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qob3B0aW9ucy5mb3JtYXR0ZXJzLCB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdChvcHRpb25zLmNvbXBvbmVudHMsIHRoaXMudmlldy5vcHRpb25zLmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KG9wdGlvbnMuYWRhcHRlcnMsIHRoaXMudmlldy5vcHRpb25zLmFkYXB0ZXJzKTtcblxuICAgIG9wdGlvbnMucHJlZml4ID0gdGhpcy5jb21wb25lbnQucHJlZml4ID8gdGhpcy5jb21wb25lbnQucHJlZml4IDogdGhpcy52aWV3Lm9wdGlvbnMucHJlZml4XG4gICAgb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZURlbGltaXRlcnMgPyB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZURlbGltaXRlcnMgOiB0aGlzLnZpZXcub3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnNcbiAgICBvcHRpb25zLnJvb3RJbnRlcmZhY2UgPSB0aGlzLmNvbXBvbmVudC5yb290SW50ZXJmYWNlID8gdGhpcy5jb21wb25lbnQucm9vdEludGVyZmFjZSA6IHRoaXMudmlldy5vcHRpb25zLnJvb3RJbnRlcmZhY2VcbiAgICBvcHRpb25zLnByZWxvYWREYXRhID0gdGhpcy5jb21wb25lbnQucHJlbG9hZERhdGEgPyB0aGlzLmNvbXBvbmVudC5wcmVsb2FkRGF0YSA6IHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhXG4gICAgb3B0aW9ucy5oYW5kbGVyID0gdGhpcy5jb21wb25lbnQuaGFuZGxlciA/IHRoaXMuY29tcG9uZW50LmhhbmRsZXIgOiB0aGlzLnZpZXcub3B0aW9ucy5oYW5kbGVyXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OmJpbmRgIHRvIGJ1aWxkIGB0aGlzLmNvbXBvbmVudFZpZXdgIHdpdGggYSBsb2NhbGl6ZWRcbiAgICogbWFwIG9mIG1vZGVscyBmcm9tIHRoZSByb290IHZpZXcuIEJpbmQgYHRoaXMuY29tcG9uZW50Vmlld2Agb24gc3Vic2VxdWVudCBjYWxscy5cbiAgICovXG4gIGJpbmQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gdGhpcy5jb21wb25lbnQudGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgICAgIC8qKlxuICAgICAgICogdGhlcmUncyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHRoYXQgbWFrZXMgaW1wb3J0ZWQgVmlldyBhIGR1bW15IG9iamVjdC4gVXNlIHRpbnliaW5kLmJpbmRcbiAgICAgICAqL1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdGlueWJpbmQuYmluZChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsLmNoaWxkTm9kZXMpLCBzY29wZSwgdGhpcy5nZXRNZXJnZWRPcHRpb25zKCkpO1xuICAgICAgdGhpcy5lbC5fYm91bmQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlVGFyZ2V0KCkge1xuICAgIC8vIHBhcnNlIGNvbXBvbmVudCBhdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGF0dHJpYnV0ZSA9IHRoaXMuZWwuYXR0cmlidXRlc1tpXTtcblxuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyBub3Qgd2l0aCBiaW5kaW5nIHByZWZpeC4gRS5nLiBydi1cbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKHRoaXMuYmluZGluZ1ByZWZpeCkgIT09IDApIHtcbiAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IHRoaXMuY2FtZWxDYXNlKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICBpZih0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgICB0aGlzLnN0YXRpY1twcm9wZXJ0eU5hbWVdID0gdG9rZW4udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgICAgdGhpcy5rZXlwYXRoc1twcm9wZXJ0eU5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICAgIHRoaXMub2JzZXJ2ZXJzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdGhpcy5rZXlwYXRoc1twcm9wZXJ0eU5hbWVdLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbiAgICBcbiAgLyoqXG4gICAqIEludGVyY2VwdCBgdGlueWJpbmQuQmluZGluZzo6dW5iaW5kYCB0byBiZSBjYWxsZWQgb24gYHRoaXMuY29tcG9uZW50Vmlld2AuXG4gICAqL1xuICB1bmJpbmQoKSB7ICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm9ic2VydmVyc1trZXldLnVub2JzZXJ2ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIGlmICh0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cbn0iLCJleHBvcnQgaW50ZXJmYWNlIElGb3JtYXR0ZXIge1xuICAodmFsOiBhbnksIC4uLmFyZ3M6IGFueVtdKTogYW55O1xuICByZWFkPzogKHJlc3VsdDogc3RyaW5nLCAuLi5wcm9jZXNzZWRBcmdzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgcHVibGlzaD86IChyZXN1bHQ6IHN0cmluZywgLi4ucHJvY2Vzc2VkQXJnczogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1hdHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUZvcm1hdHRlcjtcbn1cblxuY29uc3QgZm9ybWF0dGVyczogSUZvcm1hdHRlcnMgPSB7fTtcblxuZm9ybWF0dGVycy5ub3QgPSBmdW5jdGlvbiAodmFsdWU6IGJvb2xlYW4pIHtcbiAgcmV0dXJuICF2YWx1ZTtcbn07XG5cbmV4cG9ydCB7IGZvcm1hdHRlcnMgfTtcbiIsIlxuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tICcuL3RpbnliaW5kJztcblxuZXhwb3J0IGludGVyZmFjZSBJT2JzZXJ2ZXJTeW5jQ2FsbGJhY2sge1xuICBzeW5jOiAoKSA9PiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJS2V5IHtcbiAgcGF0aDogYW55O1xuICBpOiBSb290O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPYnNlcnZlcnMge1xuICBba2V5OiBzdHJpbmddOiBPYnNlcnZlcjtcbn1cblxuZXhwb3J0IHR5cGUgT2JqID0gYW55O1xuXG5leHBvcnQgdHlwZSBSb290ID0gYW55O1xuXG4vLyBFcnJvciB0aHJvd2VyLlxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIHRocm93IG5ldyBFcnJvcignW09ic2VydmVyXSAnICsgbWVzc2FnZSlcbn1cblxuLy8gVE9ET1xubGV0IGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG5sZXQgaW50ZXJmYWNlczogc3RyaW5nW107XG5sZXQgcm9vdEludGVyZmFjZTogUm9vdDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcbiAga2V5cGF0aDogc3RyaW5nO1xuICBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrO1xuICBvYmplY3RQYXRoOiBPYmpbXTtcbiAgb2JqOiBPYmo7XG4gIHRhcmdldDogT2JqO1xuICBrZXk6IElLZXk7XG4gIHRva2VuczogSUtleVtdO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IGtleXBhdGggb2JzZXJ2ZXIgYW5kIGtpY2tzIHRoaW5ncyBvZmYuXG4gICAqIEBwYXJhbSBvYmogXG4gICAqIEBwYXJhbSBrZXlwYXRoIFxuICAgKiBAcGFyYW0gY2FsbGJhY2sgXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvYmo6IE9iaiwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSU9ic2VydmVyU3luY0NhbGxiYWNrKSB7XG4gICAgdGhpcy5rZXlwYXRoID0ga2V5cGF0aDtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgdGhpcy5vYmplY3RQYXRoID0gW107XG4gICAgY29uc3QgcGFyc2VSZXN1bHQgPSB0aGlzLnBhcnNlKCk7XG4gICAgdGhpcy5rZXkgPSBwYXJzZVJlc3VsdC5rZXk7XG4gICAgdGhpcy50b2tlbnMgPSBwYXJzZVJlc3VsdC50b2tlbnM7XG4gICAgdGhpcy5vYmogPSB0aGlzLmdldFJvb3RPYmplY3Qob2JqKTtcbiAgICB0aGlzLnRhcmdldCA9IHRoaXMucmVhbGl6ZSgpO1xuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0KHRydWUsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBhZGFwdGVycyA9IG9wdGlvbnMuYWRhcHRlcnM7XG4gICAgaW50ZXJmYWNlcyA9IE9iamVjdC5rZXlzKGFkYXB0ZXJzKTtcbiAgICByb290SW50ZXJmYWNlID0gb3B0aW9ucy5yb290SW50ZXJmYWNlO1xuICB9XG4gIFxuICAvKipcbiAgICogVG9rZW5pemVzIHRoZSBwcm92aWRlZCBrZXlwYXRoIHN0cmluZyBpbnRvIGludGVyZmFjZSArIHBhdGggdG9rZW5zIGZvciB0aGVcbiAgICogb2JzZXJ2ZXIgdG8gd29yayB3aXRoLlxuICAgKi9cbiAgc3RhdGljIHRva2VuaXplID0gZnVuY3Rpb24oa2V5cGF0aDogc3RyaW5nLCByb290OiBSb290KSB7XG4gICAgdmFyIHRva2VuczogYW55W10gPSBbXTtcbiAgICB2YXIgY3VycmVudDogSUtleSA9IHtpOiByb290LCBwYXRoOiAnJ307XG4gICAgdmFyIGluZGV4OiBudW1iZXI7XG4gICAgdmFyIGNocjogc3RyaW5nO1xuICBcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBrZXlwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY2hyID0ga2V5cGF0aC5jaGFyQXQoaW5kZXgpO1xuICBcbiAgICAgIGlmICghIX5pbnRlcmZhY2VzLmluZGV4T2YoY2hyKSkge1xuICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICAgICAgY3VycmVudCA9IHtpOiBjaHIsIHBhdGg6ICcnfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQucGF0aCArPSBjaHI7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG4gIFxuICAvKipcbiAgICogUGFyc2VzIHRoZSBrZXlwYXRoIHVzaW5nIHRoZSBpbnRlcmZhY2VzIGRlZmluZWQgb24gdGhlIHZpZXcuIFNldHMgdmFyaWFibGVzXG4gICAqIGZvciB0aGUgdG9rZW5pemVkIGtleXBhdGggYXMgd2VsbCBhcyB0aGUgZW5kIGtleS5cbiAgICovXG4gIHBhcnNlKCkge1xuICAgIHZhciBwYXRoOiBzdHJpbmc7XG4gICAgdmFyIHJvb3Q6IFJvb3Q7XG4gIFxuICAgIGlmICghaW50ZXJmYWNlcy5sZW5ndGgpIHtcbiAgICAgIGVycm9yKCdNdXN0IGRlZmluZSBhdCBsZWFzdCBvbmUgYWRhcHRlciBpbnRlcmZhY2UuJyk7XG4gICAgfVxuICBcbiAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKHRoaXMua2V5cGF0aFswXSkpIHtcbiAgICAgIHJvb3QgPSB0aGlzLmtleXBhdGhbMF07XG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoLnN1YnN0cigxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdCA9IHJvb3RJbnRlcmZhY2U7XG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoO1xuICAgIH1cbiAgXG4gICAgdGhpcy50b2tlbnMgPSBPYnNlcnZlci50b2tlbml6ZShwYXRoLCByb290KTtcblxuICAgIGlmKCF0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gdG9rZW5zJyk7XG4gICAgfVxuXG4gICAgdGhpcy5rZXkgPSAodGhpcy50b2tlbnMucG9wKCkgYXMgSUtleSk7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICB0b2tlbnM6IHRoaXMudG9rZW5zLFxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIFJlYWxpemVzIHRoZSBmdWxsIGtleXBhdGgsIGF0dGFjaGluZyBvYnNlcnZlcnMgZm9yIGV2ZXJ5IGtleSBhbmQgY29ycmVjdGluZ1xuICAgKiBvbGQgb2JzZXJ2ZXJzIHRvIGFueSBjaGFuZ2VkIG9iamVjdHMgaW4gdGhlIGtleXBhdGguXG4gICAqL1xuICByZWFsaXplKCkge1xuICAgIHZhciBjdXJyZW50OiBPYmogPSB0aGlzLm9ialxuICAgIHZhciB1bnJlYWNoZWQgPSAtMVxuICAgIHZhciBwcmV2XG4gICAgdmFyIHRva2VuXG4gIFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgICBpZiAoaXNPYmplY3QoY3VycmVudCkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9iamVjdFBhdGhbaW5kZXhdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChjdXJyZW50ICE9PSAocHJldiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pKSB7XG4gICAgICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIHByZXYsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLnNldCh0cnVlLCB0b2tlbiwgY3VycmVudCwgdGhpcylcbiAgICAgICAgICAgIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gPSBjdXJyZW50XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICAgIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gPSBjdXJyZW50XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldCh0b2tlbiwgY3VycmVudClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh1bnJlYWNoZWQgPT09IC0xKSB7XG4gICAgICAgICAgdW5yZWFjaGVkID0gaW5kZXhcbiAgICAgICAgfVxuICBcbiAgICAgICAgaWYgKHByZXYgPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSB7XG4gICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAodW5yZWFjaGVkICE9PSAtMSkge1xuICAgICAgdGhpcy5vYmplY3RQYXRoLnNwbGljZSh1bnJlYWNoZWQpXG4gICAgfVxuICBcbiAgICByZXR1cm4gY3VycmVudFxuICB9XG4gIFxuICAvKipcbiAgICogVXBkYXRlcyB0aGUga2V5cGF0aC4gVGhpcyBpcyBjYWxsZWQgd2hlbiBhbnkgaW50ZXJtZWRpYXJ5IGtleSBpcyBjaGFuZ2VkLlxuICAgKi9cbiAgc3luYygpIHtcbiAgICB2YXIgbmV4dCwgb2xkVmFsdWUsIG5ld1ZhbHVlXG4gIFxuICAgIGlmICgobmV4dCA9IHRoaXMucmVhbGl6ZSgpKSAhPT0gdGhpcy50YXJnZXQpIHtcbiAgICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICAgIH1cbiAgXG4gICAgICBpZiAoaXNPYmplY3QobmV4dCkpIHtcbiAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIG5leHQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgb2xkVmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIHRoaXMudGFyZ2V0ID0gbmV4dFxuICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUgfHwgbmV3VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9IGVsc2UgaWYgKG5leHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gUmV0dXJucyB1bmRlZmluZWQgaWZcbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZS5cbiAgdmFsdWUoKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5LCB0aGlzLnRhcmdldClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNldHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBDYWxsaW5nIHNldFZhbHVlIHdoZW5cbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZSBpcyBhIG5vLW9wLlxuICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgYWRhcHRlcnNbdGhpcy5rZXkuaV0uc2V0KHRoaXMudGFyZ2V0LCB0aGlzLmtleS5wYXRoLCB2YWx1ZSlcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwcm92aWRlZCBrZXkgb24gYW4gb2JqZWN0LlxuICAgKiBAcGFyYW0ga2V5IFxuICAgKiBAcGFyYW0gb2JqIFxuICAgKi9cbiAgZ2V0KGtleTogSUtleSwgb2JqOiBPYmopIHtcbiAgICByZXR1cm4gYWRhcHRlcnNba2V5LmldLmdldChvYmosIGtleS5wYXRoKVxuICB9XG4gIFxuICAvKipcbiAgICogT2JzZXJ2ZXMgb3IgdW5vYnNlcnZlcyBhIGNhbGxiYWNrIG9uIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGtleS5cbiAgICogQHBhcmFtIGFjdGl2ZSBcbiAgICogQHBhcmFtIGtleSBcbiAgICogQHBhcmFtIG9iaiBcbiAgICogQHBhcmFtIGNhbGxiYWNrIFxuICAgKi9cbiAgc2V0KGFjdGl2ZTogYm9vbGVhbiwga2V5OiBJS2V5LCBvYmo6IE9iaiwgY2FsbGJhY2s6IElPYnNlcnZlclN5bmNDYWxsYmFjaykge1xuICAgIGlmKGFjdGl2ZSkge1xuICAgICAgYWRhcHRlcnNba2V5LmldLm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkYXB0ZXJzW2tleS5pXS51bm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogVW5vYnNlcnZlcyB0aGUgZW50aXJlIGtleXBhdGguXG4gICAqL1xuICB1bm9ic2VydmUoKSB7XG4gICAgdmFyIG9iajogT2JqO1xuICAgIHZhciB0b2tlbjtcbiAgXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1tpbmRleF1cbiAgICAgIGlmIChvYmogPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSB7XG4gICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgb2JqLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICB9XG4gIH1cbiAgLy8gdHJhdmVyc2UgdGhlIHNjb3BlIGNoYWluIHRvIGZpbmQgdGhlIHNjb3BlIHdoaWNoIGhhcyB0aGUgcm9vdCBwcm9wZXJ0eVxuICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgbm90IGZvdW5kIGluIGNoYWluLCByZXR1cm5zIHRoZSByb290IHNjb3BlXG4gIGdldFJvb3RPYmplY3Qob2JqOiBPYmopIHtcbiAgICB2YXIgcm9vdFByb3AsIGN1cnJlbnQ7XG4gICAgaWYgKCFvYmouJHBhcmVudCkge1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gIFxuICAgIGlmICh0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy50b2tlbnNbMF0ucGF0aFxuICAgIH0gZWxzZSB7XG4gICAgICByb290UHJvcCA9IHRoaXMua2V5LnBhdGhcbiAgICB9XG4gIFxuICAgIGN1cnJlbnQgPSBvYmo7XG4gICAgd2hpbGUgKGN1cnJlbnQuJHBhcmVudCAmJiAoY3VycmVudFtyb290UHJvcF0gPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LiRwYXJlbnRcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG59XG4iLCJpbXBvcnQgeyBpc0pzb24gfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmV4cG9ydCBjb25zdCBQUklNSVRJVkUgPSAwO1xuZXhwb3J0IGNvbnN0IEtFWVBBVEggPSAxO1xuZXhwb3J0IGNvbnN0IFRFWFQgPSAwO1xuZXhwb3J0IGNvbnN0IEJJTkRJTkcgPSAxO1xuXG5jb25zdCBRVU9URURfU1RSID0gL14nLionJHxeXCIuKlwiJC87IC8vIHJlZ2V4IHRvIHRlc3QgaWYgc3RyaW5nIGlzIHdyYXBwZWQgaW4gXCIgb3IgJ1xuXG5cbi8vIFBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBnZXR0aW5nIHRoZSB0eXBlIGFuZCB2YWx1ZSBmcm9tIGEgc3RyaW5nLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHlwZShzdHJpbmc6IHN0cmluZykge1xuICBsZXQgdHlwZSA9IFBSSU1JVElWRTtcbiAgbGV0IHZhbHVlOiBhbnkgPSBzdHJpbmc7XG4gIGlmIChRVU9URURfU1RSLnRlc3Qoc3RyaW5nKSkge1xuICAgIHZhbHVlID0gc3RyaW5nLnNsaWNlKDEsIC0xKTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd0cnVlJykge1xuICAgIHZhbHVlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdmYWxzZScpIHtcbiAgICB2YWx1ZSA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ251bGwnKSB7XG4gICAgdmFsdWUgPSBudWxsO1xuICB9IGVsc2UgaWYgKHN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmICghaXNOYU4oTnVtYmVyKHN0cmluZykpKSB7XG4gICAgdmFsdWUgPSBOdW1iZXIoc3RyaW5nKTtcbiAgfSBlbHNlIGlmIChpc0pzb24oc3RyaW5nKSkge1xuICAgIHZhbHVlID0gSlNPTi5wYXJzZShzdHJpbmcpO1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBLRVlQQVRIO1xuICB9XG4gIHJldHVybiB7dHlwZTogdHlwZSwgdmFsdWU6IHZhbHVlfTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElUb2tlbnMge1xuICB0eXBlOiBudW1iZXI7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbi8vIFRlbXBsYXRlIHBhcnNlciBhbmQgdG9rZW5pemVyIGZvciBtdXN0YWNoZS1zdHlsZSB0ZXh0IGNvbnRlbnQgYmluZGluZ3MuXG4vLyBQYXJzZXMgdGhlIHRlbXBsYXRlIGFuZCByZXR1cm5zIGEgc2V0IG9mIHRva2Vucywgc2VwYXJhdGluZyBzdGF0aWMgcG9ydGlvbnNcbi8vIG9mIHRleHQgZnJvbSBiaW5kaW5nIGRlY2xhcmF0aW9ucy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIGRlbGltaXRlcnM6IHN0cmluZ1tdKSB7XG4gIHZhciB0b2tlbnM6IElUb2tlbnNbXSB8IG51bGwgPSBudWxsO1xuICBsZXQgbGVuZ3RoID0gdGVtcGxhdGUubGVuZ3RoO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgbGV0IG9wZW4gPSBkZWxpbWl0ZXJzWzBdLCBjbG9zZSA9IGRlbGltaXRlcnNbMV07XG5cbiAgd2hpbGUgKGxhc3RJbmRleCA8IGxlbmd0aCkge1xuICAgIGluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihvcGVuLCBsYXN0SW5kZXgpO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VucyA9IHRva2VucyB8fCBbXTtcbiAgICAgIGlmIChpbmRleCA+IDAgJiYgbGFzdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIG9wZW4ubGVuZ3RoO1xuICAgICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKGNsb3NlLCBsYXN0SW5kZXgpO1xuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGxldCBzdWJzdHJpbmcgPSB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXggLSBjbG9zZS5sZW5ndGgpO1xuICAgICAgICBsZXQgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAobGFzdFRva2VuICYmIGxhc3RUb2tlbi50eXBlID09PSBURVhUKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnZhbHVlICs9IHN1YnN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgICAgdmFsdWU6IHN1YnN0cmluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpLnRyaW0oKTtcblxuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBCSU5ESU5HLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIGNsb3NlLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuIiwiaW1wb3J0IHsgbWVyZ2VPYmplY3QgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IHBhcnNlVGVtcGxhdGUsIHBhcnNlVHlwZSwgSVRva2VucyB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBJRm9ybWF0dGVycywgZm9ybWF0dGVycyB9IGZyb20gJy4vZm9ybWF0dGVycyc7XG5pbXBvcnQgeyBCaW5kaW5nIH0gZnJvbSAnLi9iaW5kaW5nJztcbmltcG9ydCB7IGFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgYmluZGVycywgSUJpbmRlcnN9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgeyBPYnNlcnZlciwgUm9vdCB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSUNvbXBvbmVudHMgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5pbnRlcmZhY2UgSUV4dGVuc2lvbnMge1xuICBiaW5kZXJzOiBJQmluZGVyczxhbnk+O1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgY29tcG9uZW50czogSUNvbXBvbmVudHM7XG4gIGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnMge1xuICAvLyBBdHRyaWJ1dGUgcHJlZml4IGluIHRlbXBsYXRlc1xuICBwcmVmaXg/OiBzdHJpbmc7XG5cbiAgLy9QcmVsb2FkIHRlbXBsYXRlcyB3aXRoIGluaXRpYWwgZGF0YSBvbiBiaW5kXG4gIHByZWxvYWREYXRhPzogYm9vbGVhbjtcblxuICAvL1Jvb3Qgc2lnaHRnbGFzcyBpbnRlcmZhY2UgZm9yIGtleXBhdGhzXG4gIHJvb3RJbnRlcmZhY2U/OiBzdHJpbmc7XG5cbiAgLy8gVGVtcGxhdGUgZGVsaW1pdGVycyBmb3IgdGV4dCBiaW5kaW5nc1xuICB0ZW1wbGF0ZURlbGltaXRlcnM/OiBBcnJheTxzdHJpbmc+XG5cbiAgLy8gQXVnbWVudCB0aGUgZXZlbnQgaGFuZGxlciBvZiB0aGUgb24tKiBiaW5kZXJcbiAgaGFuZGxlcj86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSU9wdGlvbnNQYXJhbSBleHRlbmRzIElFeHRlbnNpb25zLCBJT3B0aW9ucyB7fVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSVZpZXdPcHRpb25zIGV4dGVuZHMgSU9wdGlvbnNQYXJhbSB7XG4gIHN0YXJCaW5kZXJzOiBhbnk7XG4gIC8vIHNpZ2h0Z2xhc3NcbiAgcm9vdEludGVyZmFjZTogUm9vdDtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIElUaW55YmluZCB7XG4gIGJpbmRlcnM6IElCaW5kZXJzPGFueT47XG4gIGNvbXBvbmVudHM6IElDb21wb25lbnRzO1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgYWRhcHRlcnM6IElBZGFwdGVycztcbiAgX3ByZWZpeDogc3RyaW5nO1xuICBfZnVsbFByZWZpeDogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgcGFyc2VUZW1wbGF0ZTogKHRlbXBsYXRlOiBzdHJpbmcsIGRlbGltaXRlcnM6IHN0cmluZ1tdKSA9PiBJVG9rZW5zW10gfCBudWxsO1xuICBwYXJzZVR5cGU6IChzdHJpbmc6IHN0cmluZykgPT4ge1xuICAgIHR5cGU6IG51bWJlcjtcbiAgICB2YWx1ZTogYW55O1xuICB9O1xuICB0ZW1wbGF0ZURlbGltaXRlcnM6IHN0cmluZ1tdO1xuICByb290SW50ZXJmYWNlOiBzdHJpbmc7XG4gIHByZWxvYWREYXRhOiBib29sZWFuO1xuICBoYW5kbGVyKHRoaXM6IGFueSwgY29udGV4dDogYW55LCBldjogRXZlbnQsIGJpbmRpbmc6IEJpbmRpbmcpOiB2b2lkO1xuICBmYWxsYmFja0JpbmRlcih0aGlzOiBCaW5kaW5nLCBlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpOiB2b2lkO1xuICBjb25maWd1cmUob3B0aW9uczogYW55KTogdm9pZDtcbiAgaW5pdDogKGNvbXBvbmVudEtleTogc3RyaW5nLCBlbDogSFRNTEVsZW1lbnQsIGRhdGE/OiB7fSkgPT4gVmlldztcbiAgYmluZDogKGVsOiBIVE1MRWxlbWVudCwgbW9kZWxzOiBhbnksIG9wdGlvbnM/OiBJT3B0aW9uc1BhcmFtIHwgdW5kZWZpbmVkKSA9PiBWaWV3O1xufVxuXG5jb25zdCB0aW55YmluZDogSVRpbnliaW5kID0ge1xuICAvLyBHbG9iYWwgYmluZGVycy5cbiAgYmluZGVyczogPElCaW5kZXJzPGFueT4+IGJpbmRlcnMsXG5cbiAgLy8gR2xvYmFsIGNvbXBvbmVudHMuXG4gIGNvbXBvbmVudHM6IDxJQ29tcG9uZW50cz4ge30sXG5cbiAgLy8gR2xvYmFsIGZvcm1hdHRlcnMuXG4gIGZvcm1hdHRlcnM6IDxJRm9ybWF0dGVycz4gZm9ybWF0dGVycyxcblxuICAvLyBHbG9iYWwgc2lnaHRnbGFzcyBhZGFwdGVycy5cbiAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IHtcbiAgICAnLic6IGFkYXB0ZXIsXG4gIH0sXG5cbiAgLy8gRGVmYXVsdCBhdHRyaWJ1dGUgcHJlZml4LlxuICBfcHJlZml4OiAncnYnLFxuXG4gIF9mdWxsUHJlZml4OiAncnYtJyxcblxuICBnZXQgcHJlZml4KCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH0sXG5cbiAgc2V0IHByZWZpeCh2YWx1ZSkge1xuICAgIHRoaXMuX3ByZWZpeCA9IHZhbHVlO1xuICAgIHRoaXMuX2Z1bGxQcmVmaXggPSB2YWx1ZSArICctJztcbiAgfSxcblxuICBwYXJzZVRlbXBsYXRlOiBwYXJzZVRlbXBsYXRlLFxuXG4gIHBhcnNlVHlwZTogcGFyc2VUeXBlLFxuXG4gIC8vIERlZmF1bHQgdGVtcGxhdGUgZGVsaW1pdGVycy5cbiAgdGVtcGxhdGVEZWxpbWl0ZXJzOiBbJ3snLCAnfSddLFxuXG4gIC8vIERlZmF1bHQgc2lnaHRnbGFzcyByb290IGludGVyZmFjZS5cbiAgcm9vdEludGVyZmFjZTogJy4nLFxuXG4gIC8vIFByZWxvYWQgZGF0YSBieSBkZWZhdWx0LlxuICBwcmVsb2FkRGF0YTogdHJ1ZSxcblxuICAvKipcbiAgICogRGVmYXVsdCBldmVudCBoYW5kbGVyLlxuICAgKi9cbiAgaGFuZGxlcih0aGlzOiBhbnksIGNvbnRleHQ6IGFueSwgZXY6IEV2ZW50LCBiaW5kaW5nOiBCaW5kaW5nKSB7XG4gICAgdGhpcy5jYWxsKGNvbnRleHQsIGV2LCBiaW5kaW5nLnZpZXcubW9kZWxzKTtcbiAgfSxcblxuICAvKipcbiAgICogU2V0cyB0aGUgYXR0cmlidXRlIG9uIHRoZSBlbGVtZW50LiBJZiBubyBiaW5kZXIgYWJvdmUgaXMgbWF0Y2hlZCBpdCB3aWxsIGZhbGxcbiAgICogYmFjayB0byB1c2luZyB0aGlzIGJpbmRlci5cbiAgICovXG4gIGZhbGxiYWNrQmluZGVyKHRoaXM6IEJpbmRpbmcsIGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSkge1xuICAgIGlmICghdGhpcy50eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3Qgc2V0IGF0dHRyaWJ1dGUgb2YgJyArIHRoaXMudHlwZSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUodGhpcy50eXBlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnR5cGUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTWVyZ2VzIGFuIG9iamVjdCBsaXRlcmFsIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgZ2xvYmFsIG9wdGlvbnMuXG4gICAqIEBwYXJhbSBvcHRpb25zIFxuICAgKi9cbiAgY29uZmlndXJlKG9wdGlvbnM6IGFueSkge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgICAgIHN3aXRjaChvcHRpb24pIHtcbiAgICAgICAgY2FzZSAnYmluZGVycyc6XG4gICAgICAgICAgbWVyZ2VPYmplY3QodGhpcy5iaW5kZXJzLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb3JtYXR0ZXJzJzpcbiAgICAgICAgICBtZXJnZU9iamVjdCh0aGlzLmZvcm1hdHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NvbXBvbmVudHMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuY29tcG9uZW50cywgdmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYWRhcHRlcnMnOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYWRhcHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FkYXB0ZXInOlxuICAgICAgICAgIG1lcmdlT2JqZWN0KHRoaXMuYWRhcHRlcnMsIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ByZWZpeCc6XG4gICAgICAgICAgdGhpcy5wcmVmaXggPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncGFyc2VUZW1wbGF0ZSc6XG4gICAgICAgICAgdGhpcy5wYXJzZVRlbXBsYXRlID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3BhcnNlVHlwZSc6XG4gICAgICAgICAgdGhpcy5wYXJzZVR5cGUgPSB2YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHJlZml4JzpcbiAgICAgICAgICB0aGlzLnByZWZpeCA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0ZW1wbGF0ZURlbGltaXRlcnMnOlxuICAgICAgICAgIHRoaXMudGVtcGxhdGVEZWxpbWl0ZXJzID0gdmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Jvb3RJbnRlcmZhY2UnOlxuICAgICAgICAgIHRoaXMucm9vdEludGVyZmFjZSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdwcmVsb2FkRGF0YSc6XG4gICAgICAgICAgdGhpcy5wcmVsb2FkRGF0YSA9IHZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignT3B0aW9uIG5vdCBzdXBwb3J0ZWQnLCBvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgb24gdGhlIHNwZWNpZmllZCBlbGVtZW50IGFuZFxuICAvLyByZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cdFxuICBpbml0OiAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YSA9IHt9KSA9PiB7XG4gICAgaWYgKCFlbCkge1xuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aW55YmluZC5jb21wb25lbnRzW2NvbXBvbmVudEtleV07XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LnRlbXBsYXRlLmNhbGwodGlueWJpbmQsIGVsKTtcbiAgICBsZXQgc2NvcGUgPSBjb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRpbnliaW5kLCBlbCwgZGF0YSk7XG5cbiAgICBsZXQgdmlldyA9IHRpbnliaW5kLmJpbmQoZWwsIHNjb3BlKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcblxuICAvLyBCaW5kcyBzb21lIGRhdGEgdG8gYSB0ZW1wbGF0ZSAvIGVsZW1lbnQuIFJldHVybnMgYSB0aW55YmluZC5WaWV3IGluc3RhbmNlLlxuICBiaW5kOiAoZWw6IEhUTUxFbGVtZW50LCBtb2RlbHM6IGFueSwgb3B0aW9ucz86IElPcHRpb25zUGFyYW0pID0+IHtcbiAgICBsZXQgdmlld09wdGlvbnM6IElWaWV3T3B0aW9ucyA9IHtcbiAgICAgIC8vIEVYVEVOU0lPTlNcbiAgICAgIGJpbmRlcnM6IDxJQmluZGVyczxhbnk+PiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgZm9ybWF0dGVyczogPElGb3JtYXR0ZXJzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgY29tcG9uZW50czogPElDb21wb25lbnRzPiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgYWRhcHRlcnM6IDxJQWRhcHRlcnM+IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAvLyBvdGhlclxuICAgICAgc3RhckJpbmRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAvLyBzaWdodGdsYXNzXG4gICAgICByb290SW50ZXJmYWNlOiA8Um9vdD4gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICB9O1xuICAgIG1vZGVscyA9IG1vZGVscyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIC8vIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYob3B0aW9ucykge1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYmluZGVycywgb3B0aW9ucy5iaW5kZXJzKTtcbiAgICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0dGVycyk7XG4gICAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYWRhcHRlcnMsIG9wdGlvbnMuYWRhcHRlcnMpO1xuICAgIH1cblxuICAgIHZpZXdPcHRpb25zLnByZWZpeCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnByZWZpeCA6IHRpbnliaW5kLnByZWZpeFxuICAgIHZpZXdPcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA9IG9wdGlvbnMgJiYgb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPyBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA6IHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVyc1xuICAgIHZpZXdPcHRpb25zLnJvb3RJbnRlcmZhY2UgPSBvcHRpb25zICYmIG9wdGlvbnMucm9vdEludGVyZmFjZSA/IG9wdGlvbnMucm9vdEludGVyZmFjZSA6IHRpbnliaW5kLnJvb3RJbnRlcmZhY2VcbiAgICB2aWV3T3B0aW9ucy5wcmVsb2FkRGF0YSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVsb2FkRGF0YSA/IG9wdGlvbnMucHJlbG9hZERhdGEgOiB0aW55YmluZC5wcmVsb2FkRGF0YVxuICAgIHZpZXdPcHRpb25zLmhhbmRsZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlciA/IG9wdGlvbnMuaGFuZGxlciA6IHRpbnliaW5kLmhhbmRsZXJcblxuICAgIC8vIG1lcmdlIGV4dGVuc2lvbnNcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCB0aW55YmluZC5iaW5kZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCB0aW55YmluZC5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCB0aW55YmluZC5jb21wb25lbnRzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgdGlueWJpbmQuYWRhcHRlcnMpO1xuXG4gICAgLy8gZ2V0IGFsbCBzdGFyQmluZGVycyBmcm9tIGF2YWlsYWJsZSBiaW5kZXJzXG4gICAgdmlld09wdGlvbnMuc3RhckJpbmRlcnMgPSBPYmplY3Qua2V5cyh2aWV3T3B0aW9ucy5iaW5kZXJzKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGtleS5pbmRleE9mKCcqJykgPiAwO1xuICAgIH0pO1xuXG4gICAgT2JzZXJ2ZXIudXBkYXRlT3B0aW9ucyh2aWV3T3B0aW9ucyk7XG5cbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCBtb2RlbHMsIHZpZXdPcHRpb25zKTtcbiAgICB2aWV3LmJpbmQoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfSxcbn07XG5cbmV4cG9ydCB7IHRpbnliaW5kIH07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbnliaW5kO1xuIiwiZXhwb3J0IGNvbnN0IG1lcmdlT2JqZWN0ID0gKHRhcmdldDogYW55LCBvYmo6IGFueSkgPT4ge1xuICBpZiAob2JqKSB7XG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghdGFyZ2V0W2tleV0gfHwgdGFyZ2V0W2tleV0gPT09IHt9KSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbi8vIFRlc3QgaWYgc3RyaW5nIGlzIGEganNvbiBzdHJpbmdcbmV4cG9ydCBjb25zdCBpc0pzb24gPSAoc3RyOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2YWwgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuICh2YWwgaW5zdGFuY2VvZiBBcnJheSB8fCB2YWwgaW5zdGFuY2VvZiBPYmplY3QpID8gdHJ1ZSA6IGZhbHNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLy8gQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QgdGhhbiBjYW4gYmUgb2JzZXJ2ZWQuXG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSAob2JqOiBvYmplY3QpID0+IHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTdHJpbmcgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCA/IHZhbHVlLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgdGltZXMgPSAobjogbnVtYmVyLCBjYjogKCkgPT4gdm9pZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGNiKCk7XG4gIH1cbn07XG4iLCJpbXBvcnQgeyB0aW55YmluZCwgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBCaW5kZXIsIElUd29XYXlCaW5kZXIgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgQmluZGluZyB9IGZyb20gJy4vYmluZGluZyc7XG5pbXBvcnQgeyBDb21wb25lbnRCaW5kaW5nLCBJQm91bmRFbGVtZW50IH0gZnJvbSAnLi9jb21wb25lbnQtYmluZGluZyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlIH0gZnJvbSAnLi9wYXJzZXJzJztcblxuZXhwb3J0IHR5cGUgVEJsb2NrID0gYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGRhdGE/OiBzdHJpbmc7XG59XG5cbmNvbnN0IHRleHRCaW5kZXI6IElUd29XYXlCaW5kZXI8c3RyaW5nPiA9IHtcbiAgcm91dGluZTogKG5vZGU6IElEYXRhRWxlbWVudCwgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIG5vZGUuZGF0YSA9ICh2YWx1ZSAhPSBudWxsKSA/IHZhbHVlIDogJyc7XG4gIH1cbn07XG5cbmNvbnN0IERFQ0xBUkFUSU9OX1NQTElUID0gLygoPzonW14nXSonKSooPzooPzpbXlxcfCddKig/OidbXiddKicpK1teXFx8J10qKSt8W15cXHxdKykpfF4kL2c7XG5cbmNvbnN0IHBhcnNlTm9kZSA9ICh2aWV3OiBWaWV3LCBub2RlOiBJRGF0YUVsZW1lbnQpID0+IHtcbiAgbGV0IGJsb2NrOiBUQmxvY2sgPSBmYWxzZTtcblxuICAvLyBpZiBub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERVxuICBub2RlID0gKCBub2RlIGFzIElEYXRhRWxlbWVudCk7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgaWYoIW5vZGUuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub2RlIGhhcyBubyBkYXRhJyk7XG4gICAgfVxuICAgIGxldCB0b2tlbnMgPSBwYXJzZVRlbXBsYXRlKG5vZGUuZGF0YSwgdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzKTtcblxuICAgIGlmICh0b2tlbnMpIHtcbiAgICAgIGlmKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZXh0LCBub2RlKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICB2aWV3LmJ1aWxkQmluZGluZyh0ZXh0LCBudWxsLCB0b2tlbi52YWx1ZSwgdGV4dEJpbmRlciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgYmxvY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBibG9jayA9IHZpZXcudHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICBpZiAoIWJsb2NrKSB7XG4gICAgaWYobm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJzZU5vZGUodmlldywgKG5vZGUuY2hpbGROb2Rlc1tpXSBhcyBJRGF0YUVsZW1lbnQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGJpbmRpbmdDb21wYXJhdG9yID0gKGE6IEJpbmRpbmcsIGI6IEJpbmRpbmcpID0+IHtcbiAgbGV0IGFQcmlvcml0eSA9IGEuYmluZGVyID8gKChhLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgbGV0IGJQcmlvcml0eSA9IGIuYmluZGVyID8gKChiLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnByaW9yaXR5IHx8IDApIDogMDtcbiAgcmV0dXJuIGJQcmlvcml0eSAtIGFQcmlvcml0eTtcbn07XG5cbmNvbnN0IHRyaW1TdHIgPSAoc3RyOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHN0ci50cmltKCk7XG59O1xuXG4vLyBBIGNvbGxlY3Rpb24gb2YgYmluZGluZ3MgYnVpbHQgZnJvbSBhIHNldCBvZiBwYXJlbnQgbm9kZXMuXG5leHBvcnQgY2xhc3MgVmlldyB7XG5cbiAgZWxzOiBIVE1MQ29sbGVjdGlvbiB8IEhUTUxFbGVtZW50W10gfCBOb2RlW107XG4gIG1vZGVsczogYW55O1xuICBvcHRpb25zOiBJVmlld09wdGlvbnM7XG4gIGJpbmRpbmdzOiBCaW5kaW5nW10gPSBbXTtcbiAgY29tcG9uZW50VmlldzogVmlldyB8IG51bGwgPSBudWxsO1xuXG4gIC8vIFRoZSBET00gZWxlbWVudHMgYW5kIHRoZSBtb2RlbCBvYmplY3RzIGZvciBiaW5kaW5nIGFyZSBwYXNzZWQgaW50byB0aGVcbiAgLy8gY29uc3RydWN0b3IgYWxvbmcgd2l0aCBhbnkgbG9jYWwgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSB1c2VkIHRocm91Z2hvdXQgdGhlXG4gIC8vIGNvbnRleHQgb2YgdGhlIHZpZXcgYW5kIGl0J3MgYmluZGluZ3MuXG4gIGNvbnN0cnVjdG9yKGVsczogSFRNTENvbGxlY3Rpb24gfCBIVE1MRWxlbWVudCB8IE5vZGUsIG1vZGVsczogYW55LCBvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZWxzID0gZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVscyA9IChbZWxzXSBhcyBIVE1MRWxlbWVudFtdIHwgTm9kZVtdICk7XG4gICAgfVxuICAgIHRoaXMubW9kZWxzID0gbW9kZWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmJ1aWxkKCk7XG4gIH1cblxuICBwdWJsaWMgYnVpbGRCaW5kaW5nKG5vZGU6IEhUTUxFbGVtZW50IHwgVGV4dCwgdHlwZTogc3RyaW5nIHwgbnVsbCwgZGVjbGFyYXRpb246IHN0cmluZywgYmluZGVyOiBCaW5kZXI8YW55PiwgYXJnczogc3RyaW5nW10gfCBudWxsKSB7XG4gICAgbGV0IG1hdGNoZXMgPSBkZWNsYXJhdGlvbi5tYXRjaChERUNMQVJBVElPTl9TUExJVCk7XG4gICAgaWYobWF0Y2hlcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBtYXRjaGVzJyk7XG4gICAgfVxuICAgIGxldCBwaXBlcyA9IG1hdGNoZXMubWFwKHRyaW1TdHIpO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKSB8fCBudWxsO1xuICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQmluZGluZygodGhpcyBhcyBWaWV3KSwgKG5vZGUgYXMgSFRNTEVsZW1lbnQpLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIHBpcGVzKSk7XG4gIH1cblxuICAvLyBQYXJzZXMgdGhlIERPTSB0cmVlIGFuZCBidWlsZHMgYEJpbmRpbmdgIGluc3RhbmNlcyBmb3IgZXZlcnkgbWF0Y2hlZFxuICAvLyBiaW5kaW5nIGRlY2xhcmF0aW9uLlxuICBidWlsZCgpIHtcbiAgICB0aGlzLmJpbmRpbmdzID0gW107XG5cbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLmVscywgaSwgbGVuO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwYXJzZU5vZGUodGhpcywgKGVsZW1lbnRzW2ldIGFzIElEYXRhRWxlbWVudCkpO1xuICAgIH1cblxuICAgIHRoaXMuYmluZGluZ3Muc29ydChiaW5kaW5nQ29tcGFyYXRvcik7XG4gIH1cblxuICB0cmF2ZXJzZShub2RlOiBJQm91bmRFbGVtZW50KTogVEJsb2NrIHtcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIGxldCBibG9jayA9IG5vZGUubm9kZU5hbWUgPT09ICdTQ1JJUFQnIHx8IG5vZGUubm9kZU5hbWUgPT09ICdTVFlMRSc7XG4gICAgbGV0IGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgbGV0IGJpbmRJbmZvcyA9IFtdO1xuICAgIGxldCBzdGFyQmluZGVycyA9IHRoaXMub3B0aW9ucy5zdGFyQmluZGVycztcbiAgICB2YXIgdHlwZSwgYmluZGVyLCBpZGVudGlmaWVyLCBhcmdzO1xuXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIHdpdGggdGhlIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2XG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuaW5kZXhPZihiaW5kaW5nUHJlZml4KSA9PT0gMCkge1xuICAgICAgICB0eXBlID0gYXR0cmlidXRlLm5hbWUuc2xpY2UoYmluZGluZ1ByZWZpeC5sZW5ndGgpO1xuICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1t0eXBlXTtcbiAgICAgICAgYXJncyA9IFtdO1xuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzdGFyQmluZGVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgaWRlbnRpZmllciA9IHN0YXJCaW5kZXJzW2tdO1xuICAgICAgICAgICAgaWYgKHR5cGUuc2xpY2UoMCwgaWRlbnRpZmllci5sZW5ndGggLSAxKSA9PT0gaWRlbnRpZmllci5zbGljZSgwLCAtMSkpIHtcbiAgICAgICAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgIGFyZ3MucHVzaCh0eXBlLnNsaWNlKGlkZW50aWZpZXIubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGJpbmRlciA9IHRpbnliaW5kLmZhbGxiYWNrQmluZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChiaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5ibG9jaykge1xuICAgICAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIHR5cGUsIGF0dHJpYnV0ZS52YWx1ZSwgYmluZGVyLCBhcmdzKTtcbiAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5kSW5mb3MucHVzaCh7YXR0cjogYXR0cmlidXRlLCBiaW5kZXI6IGJpbmRlciwgdHlwZTogdHlwZSwgYXJnczogYXJnc30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZEluZm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmluZEluZm8gPSBiaW5kSW5mb3NbaV07XG4gICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCBiaW5kSW5mby50eXBlLCBiaW5kSW5mby5hdHRyLnZhbHVlLCBiaW5kSW5mby5iaW5kZXIsIGJpbmRJbmZvLmFyZ3MpO1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYmluZEluZm8uYXR0ci5uYW1lKTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIGNvbXBvbmVudHNcbiAgICBpZiAoIWJsb2NrKSB7XG4gICAgICB0eXBlID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbXBvbmVudHNbdHlwZV0gJiYgIW5vZGUuX2JvdW5kKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQ29tcG9uZW50QmluZGluZygodGhpcyBhcyBWaWV3KSwgbm9kZSwgdHlwZSkpO1xuICAgICAgICBibG9jayA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJsb2NrO1xuICB9XG5cbiAgLy8gQmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5iaW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVbmJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICB1bmJpbmQoKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0aGlzLmJpbmRpbmdzKSkge1xuICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICBiaW5kaW5nLnVuYmluZCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN5bmNzIHVwIHRoZSB2aWV3IHdpdGggdGhlIG1vZGVsIGJ5IHJ1bm5pbmcgdGhlIHJvdXRpbmVzIG9uIGFsbCBiaW5kaW5ncy5cbiAgc3luYygpIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1Ymxpc2hlcyB0aGUgaW5wdXQgdmFsdWVzIGZyb20gdGhlIHZpZXcgYmFjayB0byB0aGUgbW9kZWwgKHJldmVyc2Ugc3luYykuXG4gIHB1Ymxpc2goKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcuYmluZGVyICYmIChiaW5kaW5nLmJpbmRlciBhcyBJVHdvV2F5QmluZGVyPGFueT4pLnB1Ymxpc2hlcykge1xuICAgICAgICBiaW5kaW5nLnB1Ymxpc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIHZpZXcncyBtb2RlbHMgYWxvbmcgd2l0aCBhbnkgYWZmZWN0ZWQgYmluZGluZ3MuXG4gIHVwZGF0ZShtb2RlbHM6IGFueSA9IHt9KSB7XG4gICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm1vZGVsc1trZXldID0gbW9kZWxzW2tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBpZiAoYmluZGluZy51cGRhdGUpIHtcbiAgICAgICAgYmluZGluZy51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==