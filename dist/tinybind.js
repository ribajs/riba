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
  } // Observes the object keypath


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

var _tinybind = _interopRequireDefault(__webpack_require__(/*! ./tinybind */ "./src/tinybind.ts"));

var _view = __webpack_require__(/*! ./view */ "./src/view.ts");

var _adapter = _interopRequireDefault(__webpack_require__(/*! ./adapter */ "./src/adapter.ts"));

var _binders = _interopRequireDefault(__webpack_require__(/*! ./binders */ "./src/binders.ts"));

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

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

  _observer.Observer.updateOptions(viewOptions);

  var view = new _view.View(el, models, viewOptions);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcudHMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2V4cG9ydC50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9vYnNlcnZlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3RpbnliaW5kLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3ZpZXcudHMiXSwibmFtZXMiOlsiQVJSQVlfTUVUSE9EUyIsIkFkYXB0ZXIiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwiY291bnRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3ZWFrbWFwIiwiX19ydiIsImNhbGxiYWNrcyIsInJlZiIsImtleXMiLCJsZW5ndGgiLCJwb2ludGVycyIsImZuIiwib3JpZ2luYWwiLCJtYXAiLCJ3ZWFrUmVmZXJlbmNlIiwiYXJncyIsInJlc3BvbnNlIiwiYXBwbHkiLCJmb3JFYWNoIiwiayIsInIiLCJBcnJheSIsImNhbGxiYWNrIiwic3luYyIsImtleXBhdGgiLCJzdHViRnVuY3Rpb24iLCJpbmRleE9mIiwicHVzaCIsImlkeCIsInNwbGljZSIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsInNldCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJuZXdWYWx1ZSIsInVub2JzZXJ2ZU11dGF0aW9ucyIsImNiIiwib2JzZXJ2ZU11dGF0aW9ucyIsImFkYXB0ZXIiLCJnZXRTdHJpbmciLCJ0b1N0cmluZyIsInVuZGVmaW5lZCIsInRpbWVzIiwibiIsImkiLCJjcmVhdGVWaWV3IiwiYmluZGluZyIsIm1vZGVscyIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiRXJyb3IiLCJpbnNlcnRCZWZvcmUiLCJiaW5kZXJzIiwiZnVuY3Rpb24iLCJwcmlvcml0eSIsImN1c3RvbURhdGEiLCJoYW5kbGVyIiwidW5iaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiaW5kZXhQcm9wIiwiZ2V0QXR0cmlidXRlIiwiZ2V0SXRlcmF0aW9uQWxpYXMiLCJtb2RlbCIsImluZGV4Iiwic2NvcGUiLCIkcGFyZW50IiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJkYXRhIiwia2V5IiwiZWxDbGFzcyIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ0cmltIiwidGV4dCIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIkhUTUxTZWxlY3RFbGVtZW50Iiwib3B0aW9uIiwic2VsZWN0ZWQiLCJpZiIsImF0dGFjaGVkIiwiYm91bmQiLCJuZXN0ZWQiLCJnZXRJbnB1dFZhbHVlIiwicmVzdWx0cyIsIkZPUk1BVFRFUl9BUkdTIiwiRk9STUFUVEVSX1NQTElUIiwiUFJJTUlUSVZFIiwiS0VZUEFUSCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiZm9ybWF0dGVyT2JzZXJ2ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIm9ic2VydmVyIiwib2JzZXJ2ZSIsInRhcmdldCIsImZvcm1hdHRlckluZGV4IiwicGFyc2VUeXBlIiwiYWkiLCJyZWR1Y2UiLCJyZXN1bHQiLCJkZWNsYXJhdGlvbiIsIm1hdGNoIiwic2hpZnQiLCJmb3JtYXR0ZXIiLCJwcm9jZXNzZWRBcmdzIiwicGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMiLCJyZWFkIiwiRnVuY3Rpb24iLCJldiIsImNhbGwiLCJmb3JtYXR0ZWRWYWx1ZSIsInJvdXRpbmVGbiIsInJlZHVjZVJpZ2h0Iiwic3BsaXQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwicGFyc2VUYXJnZXQiLCJwcmVsb2FkRGF0YSIsInVub2JzZXJ2ZSIsImZpIiwiQ29tcG9uZW50QmluZGluZyIsImNvbXBvbmVudCIsImNvbXBvbmVudHMiLCJzdGF0aWMiLCJvYnNlcnZlcnMiLCJ1cHN0cmVhbU9ic2VydmVycyIsImJpbmRpbmdQcmVmaXgiLCJ0aW55YmluZCIsIl9mdWxsUHJlZml4IiwibGVuIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsIm5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJjYW1lbENhc2UiLCJzdGF0Iiwic3RyaW5nIiwiZ3JvdXBlZCIsInRvVXBwZXJDYXNlIiwiY29tcG9uZW50VmlldyIsImluaXRpYWxpemUiLCJsb2NhbHMiLCJfYm91bmQiLCJFWFRFTlNJT05TIiwiZXh0ZW5zaW9uVHlwZSIsIk9QVElPTlMiLCJwcm90b3R5cGUiLCJzbGljZSIsImNoaWxkTm9kZXMiLCJ1cHN0cmVhbSIsImFkYXB0ZXJzIiwibWVyZ2VPYmplY3QiLCJ2aWV3T3B0aW9ucyIsImNyZWF0ZSIsInN0YXJCaW5kZXJzIiwicm9vdEludGVyZmFjZSIsInByZWZpeCIsInRlbXBsYXRlRGVsaW1pdGVycyIsImZpbHRlciIsInVwZGF0ZU9wdGlvbnMiLCJpbml0IiwiY29tcG9uZW50S2V5IiwiY3JlYXRlRWxlbWVudCIsIm5lZ2F0ZSIsIm5vdCIsImlzT2JqZWN0IiwiZXJyb3IiLCJtZXNzYWdlIiwiaW50ZXJmYWNlcyIsIm9iamVjdFBhdGgiLCJwYXJzZVJlc3VsdCIsInBhcnNlIiwidG9rZW5zIiwiZ2V0Um9vdE9iamVjdCIsInJlYWxpemUiLCJwYXRoIiwicm9vdCIsInN1YnN0ciIsInRva2VuaXplIiwiY3VycmVudCIsInVucmVhY2hlZCIsInByZXYiLCJuZXh0Iiwib2xkVmFsdWUiLCJhY3RpdmUiLCJyb290UHJvcCIsImNociIsImNoYXJBdCIsIlFVT1RFRF9TVFIiLCJURVhUIiwiQklORElORyIsImlzSnNvbiIsInN0ciIsInZhbCIsIkpTT04iLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZVRlbXBsYXRlIiwiZGVsaW1pdGVycyIsImxhc3RJbmRleCIsIm9wZW4iLCJjbG9zZSIsInN1YnN0cmluZyIsImxhc3RUb2tlbiIsIl9wcmVmaXgiLCJjb250ZXh0IiwiZmFsbGJhY2tCaW5kZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25maWd1cmUiLCJ0ZXh0QmluZGVyIiwibm9kZSIsIkRFQ0xBUkFUSU9OX1NQTElUIiwicGFyc2VOb2RlIiwibm9kZVR5cGUiLCJjcmVhdGVUZXh0Tm9kZSIsImJ1aWxkQmluZGluZyIsInRyYXZlcnNlIiwiYmluZGluZ0NvbXBhcmF0b3IiLCJhIiwiYiIsImFQcmlvcml0eSIsImJQcmlvcml0eSIsInRyaW1TdHIiLCJidWlsZCIsIm1hdGNoZXMiLCJwaXBlcyIsImVsZW1lbnRzIiwic29ydCIsImJpbmRJbmZvcyIsImlkZW50aWZpZXIiLCJhdHRyIiwiYmluZEluZm8iLCJ0b0xvd2VyQ2FzZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBRUEsSUFBTUEsZ0JBQWdCLENBQ3BCLE1BRG9CLEVBRXBCLEtBRm9CLEVBR3BCLE9BSG9CLEVBSXBCLFNBSm9CLEVBS3BCLE1BTG9CLEVBTXBCLFNBTm9CLEVBT3BCLFFBUG9CLENBQXRCOztJQXdDYUMsTzs7Ozs7O3FDQUNPLEM7O3FDQUNKLEU7Ozs7O2tDQUVBQyxHLEVBQVU7QUFDdEIsVUFBSSxDQUFDQSxJQUFJQyxjQUFKLENBQW1CLE1BQW5CLENBQUwsRUFBaUM7QUFDL0IsWUFBSUMsS0FBSyxLQUFLQyxPQUFMLEVBQVQ7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QUswRSxRQUFMLENBQWMvRSxPQUFkLENBQXNCLG1CQUFXO0FBQy9CLFlBQUkrQixRQUFRd0YsTUFBUixJQUFtQnhGLFFBQVF3RixNQUFULENBQXVDckIsU0FBN0QsRUFBd0U7QUFDdEVuRSxrQkFBUXFFLE9BQVI7QUFDRDtBQUNGLE9BSkQ7QUFLRCxLLENBRUQ7Ozs7NkJBQ3lCO0FBQUE7O0FBQUEsVUFBbEJwRSxNQUFrQix1RUFBSixFQUFJO0FBQ3ZCakQsYUFBT08sSUFBUCxDQUFZMEMsTUFBWixFQUFvQmhDLE9BQXBCLENBQTRCLGVBQU87QUFDakMsY0FBS2dDLE1BQUwsQ0FBWWtELEdBQVosSUFBbUJsRCxPQUFPa0QsR0FBUCxDQUFuQjtBQUNELE9BRkQ7QUFJQSxXQUFLSCxRQUFMLENBQWMvRSxPQUFkLENBQXNCLG1CQUFXO0FBQy9CLFlBQUkrQixRQUFRaUQsTUFBWixFQUFvQjtBQUNsQmpELGtCQUFRaUQsTUFBUixDQUFlaEQsTUFBZjtBQUNEO0FBQ0YsT0FKRDtBQUtEIiwiZmlsZSI6InRpbnliaW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGlueWJpbmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2V4cG9ydC50c1wiKTtcbiIsImltcG9ydCB7IElDYWxsYmFjayB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuXG4vLyBUaGUgZGVmYXVsdCBgLmAgYWRhcHRlciB0aGF0IGNvbWVzIHdpdGggdGlueWJpbmQuanMuIEFsbG93cyBzdWJzY3JpYmluZyB0b1xuLy8gcHJvcGVydGllcyBvbiBwbGFpbiBvYmplY3RzLCBpbXBsZW1lbnRlZCBpbiBFUzUgbmF0aXZlcyB1c2luZ1xuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAuXG5cbmNvbnN0IEFSUkFZX01FVEhPRFMgPSBbXG4gICdwdXNoJyxcbiAgJ3BvcCcsXG4gICdzaGlmdCcsXG4gICd1bnNoaWZ0JyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZScsXG4gICdzcGxpY2UnXG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZWYge1xuICBjYWxsYmFja3M6IGFueVtdO1xuICBwb2ludGVyczogYW55W107XG59XG5cbi8vIFRPRE8gd2hhdCB0aGUgaGVsbD8hXG5leHBvcnQgaW50ZXJmYWNlIElSVkFycmF5IGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIF9fcnY6IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgQWRhcHRlckZ1bmN0aW9uID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXI7XG4gIHdlYWttYXA6IGFueTtcbiAgd2Vha1JlZmVyZW5jZTogKG9iajogYW55KSA9PiBhbnk7IC8vID0+IF9fcnYgP1xuICBjbGVhbnVwV2Vha1JlZmVyZW5jZTogKHJlZjogSVJlZiwgaWQ6IG51bWJlcikgPT4gdm9pZDtcbiAgc3R1YkZ1bmN0aW9uOiAob2JqOiBhbnksIGZuOiBzdHJpbmcpID0+IGFueSAvLyA9PiByZXNwb25zZSA/XG4gIG9ic2VydmVNdXRhdGlvbnM6IChvYmo6IGFueSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgdW5vYnNlcnZlTXV0YXRpb25zOiAob2JqOiBJUlZBcnJheSwgcmVmOiBzdHJpbmcsIGtleXBhdGg6IHN0cmluZykgPT4gdm9pZDtcbiAgb2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJQ2FsbGJhY2spID0+IHZvaWQ7IFxuICB1bm9ic2VydmU6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSUNhbGxiYWNrKSA9PiB2b2lkO1xuICBnZXQ6IChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSA9PiBhbnk7XG4gIHNldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIHZhbHVlOiBhbnkpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUFkYXB0ZXJzIHtcbiAgW25hbWU6IHN0cmluZ106IElBZGFwdGVyO1xufVxuXG5leHBvcnQgY2xhc3MgQWRhcHRlciBpbXBsZW1lbnRzIElBZGFwdGVyIHtcbiAgY291bnRlcjogbnVtYmVyID0gMDtcbiAgd2Vha21hcDphbnkgPSB7fTtcblxuICB3ZWFrUmVmZXJlbmNlKG9iajogYW55KSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoJ19fcnYnKSkge1xuICAgICAgbGV0IGlkID0gdGhpcy5jb3VudGVyKys7XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdfX3J2Jywge1xuICAgICAgICB2YWx1ZTogaWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy53ZWFrbWFwW29iai5fX3J2XSkge1xuICAgICAgdGhpcy53ZWFrbWFwW29iai5fX3J2XSA9IHtcbiAgICAgICAgY2FsbGJhY2tzOiB7fVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcbiAgfVxuXG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlKHJlZjogSVJlZiwgaWQ6IG51bWJlcikge1xuICAgIGlmICghT2JqZWN0LmtleXMocmVmLmNhbGxiYWNrcykubGVuZ3RoKSB7XG4gICAgICBpZiAoIShyZWYucG9pbnRlcnMgJiYgT2JqZWN0LmtleXMocmVmLnBvaW50ZXJzKS5sZW5ndGgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLndlYWttYXBbaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0dWJGdW5jdGlvbihvYmo6IGFueSwgZm46IHN0cmluZykge1xuICAgIGxldCBvcmlnaW5hbCA9IG9ialtmbl07XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopO1xuICAgIGxldCB3ZWFrbWFwID0gdGhpcy53ZWFrbWFwO1xuXG4gICAgb2JqW2ZuXSA9ICguLi5hcmdzOiBhbnlbXSk6IEFkYXB0ZXJGdW5jdGlvbiA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBvcmlnaW5hbC5hcHBseShvYmosIGFyZ3MpO1xuXG4gICAgICBPYmplY3Qua2V5cyhtYXAucG9pbnRlcnMpLmZvckVhY2gociA9PiB7XG4gICAgICAgIGxldCBrID0gbWFwLnBvaW50ZXJzW3JdO1xuXG4gICAgICAgIGlmICh3ZWFrbWFwW3JdKSB7XG4gICAgICAgICAgaWYgKHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHdlYWttYXBbcl0uY2FsbGJhY2tzW2tdLmZvckVhY2goKGNhbGxiYWNrOiBJQ2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2suc3luYygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG4gIH1cblxuICBvYnNlcnZlTXV0YXRpb25zKG9iajogYW55LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzKSB7XG4gICAgICAgIG1hcC5wb2ludGVycyA9IHt9O1xuXG4gICAgICAgIEFSUkFZX01FVEhPRFMuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgdGhpcy5zdHViRnVuY3Rpb24ob2JqLCBmbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1hcC5wb2ludGVyc1tyZWZdKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdID0gW107XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXAucG9pbnRlcnNbcmVmXS5pbmRleE9mKGtleXBhdGgpID09PSAtMSkge1xuICAgICAgICBtYXAucG9pbnRlcnNbcmVmXS5wdXNoKGtleXBhdGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVub2JzZXJ2ZU11dGF0aW9ucyhvYmo6IElSVkFycmF5LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKChvYmogaW5zdGFuY2VvZiBBcnJheSkgJiYgKG9iai5fX3J2ICE9IG51bGwpKSB7XG4gICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgaWYgKG1hcCkge1xuICAgICAgICBsZXQgcG9pbnRlcnMgPSBtYXAucG9pbnRlcnNbcmVmXTtcblxuICAgICAgICBpZiAocG9pbnRlcnMpIHtcbiAgICAgICAgICBsZXQgaWR4ID0gcG9pbnRlcnMuaW5kZXhPZihrZXlwYXRoKTtcblxuICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgcG9pbnRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwb2ludGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAucG9pbnRlcnNbcmVmXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSUNhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlOiBhbnk7XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMud2Vha1JlZmVyZW5jZShvYmopLmNhbGxiYWNrcztcblxuICAgIGlmICghY2FsbGJhY2tzW2tleXBhdGhdKSB7XG4gICAgICBjYWxsYmFja3Nba2V5cGF0aF0gPSBbXTtcbiAgICAgIGxldCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleXBhdGgpO1xuXG4gICAgICBpZiAoIWRlc2MgfHwgIShkZXNjLmdldCB8fCBkZXNjLnNldCB8fCAhZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleXBhdGhdO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleXBhdGgsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuXG4gICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHNldDogbmV3VmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyh2YWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB2YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICBsZXQgbWFwID0gdGhpcy53ZWFrbWFwW29iai5fX3J2XTtcblxuICAgICAgICAgICAgICBpZiAobWFwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaCgoY2I6IElDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYi5zeW5jKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMobmV3VmFsdWUsIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrc1trZXlwYXRoXS5pbmRleE9mKGNhbGxiYWNrKSA9PT0gLTEpIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICB0aGlzLm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gIH1cblxuICB1bm9ic2VydmUob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElDYWxsYmFjaykge1xuICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgaWYgKG1hcCkge1xuICAgICAgbGV0IGNhbGxiYWNrcyA9IG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG5cbiAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgbGV0IGlkeCA9IGNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcblxuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgICBpZiAoIWNhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBtYXAuY2FsbGJhY2tzW2tleXBhdGhdO1xuICAgICAgICAgICAgdGhpcy51bm9ic2VydmVNdXRhdGlvbnMob2JqW2tleXBhdGhdLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhbnVwV2Vha1JlZmVyZW5jZShtYXAsIG9iai5fX3J2KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBvYmpba2V5cGF0aF07XG4gIH1cblxuICBzZXQob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIG9ialtrZXlwYXRoXSA9IHZhbHVlO1xuICB9XG59O1xuXG5jb25zdCBhZGFwdGVyID0gbmV3IEFkYXB0ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgYWRhcHRlcjtcbiIsImltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuL29ic2VydmVyJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuLy8gaW1wb3J0IHsgTm9kZSB9IGZyb20gJ2JhYmVsLXR5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBJQmluZGluZyB7XG4gIHZpZXc6IFZpZXc7XG4gIGVsOiBIVE1MRWxlbWVudDtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGJpbmRlciB3aXRob3V0IHRoZSBwcmVmaXhcbiAgICovXG4gIHR5cGU6IHN0cmluZztcbiAgYmluZGVyOiBCaW5kZXI8YW55PjtcbiAgZm9ybWF0dGVyczogc3RyaW5nW107XG4gIGZvcm1hdHRlck9ic2VydmVyczogYW55W107XG4gIGtleXBhdGg6IHN0cmluZztcbiAgLyoqXG4gICAqIEFyZ3VtZW50cyBwYXJzZWQgZnJvbSBzdGFyIGJpbmRlcnMsIGUuZy4gb24gZm9vLSotKiBhcmdzWzBdIGlzIHRoZSBmaXJzdCBzdGFyLCBhcmdzWzFdIHRoZSBzZWNvbmQtXG4gICAqL1xuICBhcmdzOiBzdHJpbmdbXTtcbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgbW9kZWw/OiBhbnk7XG4gIC8qKlxuICAgKiBIVE1MIENvbW1lbnQgdG8gbWFyayBhIGJpbmRpbmcgaW4gdGhlIERPTVxuICAgKi9cbiAgbWFya2VyPzogQ29tbWVudDtcbiAgX2JvdW5kPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGp1c3QgdG8gaGF2ZSBhIHZhbHVlIHdoZXJlIHdlIGNvdWxkIHN0b3JlIGN1c3RvbSBkYXRhXG4gICAqL1xuICBjdXN0b21EYXRhPzogYW55O1xuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byB0aGUgbW9kZWwgZm9yIGNoYW5nZXMgYXQgdGhlIHNwZWNpZmllZCBrZXlwYXRoLiBCaS1kaXJlY3Rpb25hbFxuICAgKiByb3V0aW5lcyB3aWxsIGFsc28gbGlzdGVuIGZvciBjaGFuZ2VzIG9uIHRoZSBlbGVtZW50IHRvIHByb3BhZ2F0ZSB0aGVtIGJhY2tcbiAgICogdG8gdGhlIG1vZGVsLlxuICAgKi9cbiAgYmluZDogKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICAvKipcbiAgICogUmV0dXJucyBhbiBldmVudCBoYW5kbGVyIGZvciB0aGUgYmluZGluZyBhcm91bmQgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgZXZlbnRIYW5kbGVyOiAoaGFuZGxlcjogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCkgPT4gKCkgPT4gYW55O1xuICAvKipcbiAgICogQXBwbGllcyBhbGwgdGhlIGN1cnJlbnQgZm9ybWF0dGVycyB0byB0aGUgc3VwcGxpZWQgdmFsdWUgYW5kIHJldHVybnMgdGhlXG4gICAqIGZvcm1hdHRlZCB2YWx1ZS5cbiAgICovXG4gIGZvcm1hdHRlZFZhbHVlOiAodmFsdWU6IGFueSkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIFJldHVybnMgZWxlbWVudHMgdmFsdWVcbiAgICovXG4gIGdldFZhbHVlPzogKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuXG4gIHBhcnNlRm9ybWF0dGVyQXJndW1lbnRzOiAoYXJnczogYW55LCBmb3JtYXR0ZXJJbmRleDogbnVtYmVyKSA9PiBhbnk7XG5cbiAgcGFyc2VUYXJnZXQ6ICgpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBQdWJsaXNoZXMgdGhlIHZhbHVlIGN1cnJlbnRseSBzZXQgb24gdGhlIGlucHV0IGVsZW1lbnQgYmFjayB0byB0aGUgbW9kZWwuXG4gICAqL1xuICBwdWJsaXNoOiAoKSA9PiBhbnkgfCB2b2lkO1xuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgZm9yIHRoZSBiaW5kaW5nLiBUaGlzIEJhc2ljYWxseSBqdXN0IHJ1bnMgdGhlIGJpbmRpbmcgcm91dGluZVxuICAgKiB3aXRoIHRoZSBzdXBwbGllZCB2YWx1ZSBmb3JtYXR0ZWQuXG4gICAqL1xuICBzZXQ6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICAvKipcbiAgICogU3luY3MgdXAgdGhlIHZpZXcgYmluZGluZyB3aXRoIHRoZSBtb2RlbC5cbiAgICovXG4gIHN5bmM6ICgpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSB0aGUgbW9kZWwgYW5kIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgdW5iaW5kOiAoKSA9PiB2b2lkO1xuICAvKipcbiAgICogVXBkYXRlcyB0aGUgYmluZGluZydzIG1vZGVsIGZyb20gd2hhdCBpcyBjdXJyZW50bHkgc2V0IG9uIHRoZSB2aWV3LiBVbmJpbmRzXG4gICAqIHRoZSBvbGQgbW9kZWwgZmlyc3QgYW5kIHRoZW4gcmUtYmluZHMgd2l0aCB0aGUgbmV3IG1vZGVsLlxuICAgKi9cbiAgLy91cGRhdGU6IChtb2RlbHM6IGFueSkgPT4gdm9pZDtcbiAgdXBkYXRlOiAobW9kZWw6IGFueSkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoZSBvYmplY3Qga2V5cGF0aFxuICAgKi9cbiAgb2JzZXJ2ZTogKG9iajogT2JqZWN0LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiAobmV3VmFsdWU6IGFueSkgPT4gdm9pZCkgPT4gT2JzZXJ2ZXI7XG4gIFxuICAvKipcbiAgICogR2V0IHRoZSBpdGVyYXRpb24gYWxpYXMsIHVzZWQgaW4gdGhlIGludGVyYXRpb24gYmluZGVycyBsaWtlIGBlYWNoLSpgXG4gICAqL1xuICBnZXRJdGVyYXRpb25BbGlhczogKG1vZGVsTmFtZTogc3RyaW5nKSA9PiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIElPbmVXYXlCaW5kZXI8VmFsdWVUeXBlPiA9ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWU6IFZhbHVlVHlwZSkgPT4gdm9pZDtcblxuZXhwb3J0IGludGVyZmFjZSBJVHdvV2F5QmluZGVyPFZhbHVlVHlwZT4ge1xuICByb3V0aW5lOiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQsIHZhbHVlOiBWYWx1ZVR5cGUpID0+IHZvaWQ7XG4gIGJpbmQ/OiAodGhpczogQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIHVuYmluZD86ICh0aGlzOiBCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgdXBkYXRlPzogKHRoaXM6IEJpbmRpbmcsIG1vZGVsOiBhbnkpID0+IHZvaWQ7XG4gIGdldFZhbHVlPzogKHRoaXM6IEJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xuICBibG9jaz86IGJvb2xlYW47XG4gIGZ1bmN0aW9uPzogYm9vbGVhbjtcbiAgcHVibGlzaGVzPzogYm9vbGVhbjtcbiAgcHJpb3JpdHk/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBJZiB5b3Ugd2FudCB0byBzYXZlIGN1c3RvbSBkYXRhIGluIHRoaXMgdXNlIHRoaXMgb2JqZWN0XG4gICAqL1xuICBjdXN0b21EYXRhPzogYW55O1xufVxuXG5leHBvcnQgdHlwZSBCaW5kZXI8VmFsdWVUeXBlPiA9IElPbmVXYXlCaW5kZXI8VmFsdWVUeXBlPiB8IElUd29XYXlCaW5kZXI8VmFsdWVUeXBlPlxuXG5leHBvcnQgaW50ZXJmYWNlIElCaW5kZXJzPFZhbHVlVHlwZT4ge1xuICBbbmFtZTogc3RyaW5nXTogQmluZGVyPFZhbHVlVHlwZT47XG59XG5cbmNvbnN0IGdldFN0cmluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsID8gdmFsdWUudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRpbWVzID0gKG46IG51bWJlciwgY2I6KCkgPT4gdm9pZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgY2IoKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVZpZXcoYmluZGluZzogQmluZGluZywgbW9kZWxzOiBhbnksIGFuY2hvckVsOiBIVE1MRWxlbWVudCB8IE5vZGUgfCBudWxsKSB7XG4gIGxldCB0ZW1wbGF0ZSA9IGJpbmRpbmcuZWwuY2xvbmVOb2RlKHRydWUpO1xuICBsZXQgdmlldyA9IG5ldyBWaWV3KCh0ZW1wbGF0ZSBhcyBOb2RlKSwgbW9kZWxzLCBiaW5kaW5nLnZpZXcub3B0aW9ucyk7XG4gIHZpZXcuYmluZCgpO1xuICBpZighYmluZGluZyB8fCAhYmluZGluZy5tYXJrZXIgfHwgYmluZGluZy5tYXJrZXIucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcGFyZW50IG5vZGUgZm9yIGJpbmRpbmchJyk7XG4gIH1cblxuICBiaW5kaW5nLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZW1wbGF0ZSwgYW5jaG9yRWwpO1xuXG4gIHJldHVybiB2aWV3O1xufVxuXG5jb25zdCBiaW5kZXJzOiBJQmluZGVyczxhbnk+ID0ge1xuICAvLyBCaW5kcyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBlbGVtZW50LlxuICAnb24tKic6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBwcmlvcml0eTogMTAwMCxcblxuICAgIGJpbmQoZWwpIHtcbiAgICAgIGlmKCF0aGlzLmN1c3RvbURhdGEpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0ge1xuICAgICAgICAgIGhhbmRsZXI6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsOiBIVE1MRWxlbWVudCkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSAvKlRPRE8qLykge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5hcmdzWzBdLCB0aGlzLmN1c3RvbURhdGEuaGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyID0gdGhpcy5ldmVudEhhbmRsZXIodmFsdWUpO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQXBwZW5kcyBib3VuZCBpbnN0YW5jZXMgb2YgdGhlIGVsZW1lbnQgaW4gcGxhY2UgZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuXG4gICdlYWNoLSonOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG5cbiAgICBwcmlvcml0eTogNDAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxFbGVtZW50KSB7XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudChgIHRpbnliaW5kOiAke3RoaXMudHlwZX0gYCk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHtcbiAgICAgICAgICBpdGVyYXRlZDogPFZpZXdbXT4gW11cbiAgICAgICAgfTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpICA9PiB7XG4gICAgICAgICAgdmlldy5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQoZWwpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZShlbCwgY29sbGVjdGlvbikge1xuICAgICAgbGV0IG1vZGVsTmFtZSA9IHRoaXMuYXJnc1swXTtcbiAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uIHx8IFtdO1xuXG4gICAgICAvLyBUT0RPIHN1cHBvcnQgb2JqZWN0IGtleXMgdG8gaXRlcmF0ZSBvdmVyXG4gICAgICBpZighQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2VhY2gtJyArIG1vZGVsTmFtZSArICcgbmVlZHMgYW4gYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLCBidXQgaXQgaXMnKTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgaW5kZXggbmFtZSBpcyBzZXRlZCBieSBgaW5kZXgtcHJvcGVydHlgIHVzZSB0aGlzIG5hbWUsIG90aGVyd2lzZSBgJVttb2RlbE5hbWVdJWAgIFxuICAgICAgbGV0IGluZGV4UHJvcCA9IGVsLmdldEF0dHJpYnV0ZSgnaW5kZXgtcHJvcGVydHknKSB8fCB0aGlzLmdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZSk7XG5cbiAgICAgIGNvbGxlY3Rpb24uZm9yRWFjaCgobW9kZWwsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBzY29wZTogYW55ID0geyRwYXJlbnQ6IHRoaXMudmlldy5tb2RlbHN9O1xuICAgICAgICBzY29wZVtpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgIHNjb3BlW21vZGVsTmFtZV0gPSBtb2RlbDtcbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbaW5kZXhdO1xuXG4gICAgICAgIGlmICghdmlldykge1xuICAgICAgICAgIGxldCBwcmV2aW91czogQ29tbWVudCB8IEhUTUxFbGVtZW50O1xuXG4gICAgICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkW3RoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSAxXS5lbHNbMF07XG4gICAgICAgICAgfSBlbHNlIGlmKHRoaXMubWFya2VyKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IHRoaXMubWFya2VyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ByZXZpb3VzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlldyA9IGNyZWF0ZVZpZXcodGhpcywgc2NvcGUsIHByZXZpb3VzLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQucHVzaCh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldy5tb2RlbHNbbW9kZWxOYW1lXSAhPT0gbW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgbW9kZWxcbiAgICAgICAgICAgIGxldCBtYXRjaEluZGV4LCBuZXh0VmlldztcbiAgICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IGluZGV4ICsgMTsgbmV4dEluZGV4IDwgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWaWV3Lm1vZGVsc1ttb2RlbE5hbWVdID09PSBtb2RlbCkge1xuICAgICAgICAgICAgICAgIG1hdGNoSW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gbW9kZWwgaXMgaW4gb3RoZXIgcG9zaXRpb25cbiAgICAgICAgICAgICAgLy8gdG9kbzogY29uc2lkZXIgYXZvaWRpbmcgdGhlIHNwbGljZSBoZXJlIGJ5IHNldHRpbmcgYSBmbGFnXG4gICAgICAgICAgICAgIC8vIHByb2ZpbGUgcGVyZm9ybWFuY2UgYmVmb3JlIGltcGxlbWVudGluZyBzdWNoIGNoYW5nZVxuICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKG1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hcmtlciBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXh0Vmlldy5lbHNbMF0sIHZpZXcuZWxzWzBdKTtcbiAgICAgICAgICAgICAgbmV4dFZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vbmV3IG1vZGVsXG4gICAgICAgICAgICAgIG5leHRWaWV3ID0gY3JlYXRlVmlldyh0aGlzLCBzY29wZSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnNwbGljZShpbmRleCwgMCwgbmV4dFZpZXcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3Lm1vZGVsc1tpbmRleFByb3BdID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggPiBjb2xsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICB0aW1lcyh0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQubGVuZ3RoIC0gY29sbGVjdGlvbi5sZW5ndGgsICgpID0+IHtcbiAgICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5wb3AoKTtcbiAgICAgICAgICB2aWV3LnVuYmluZCgpO1xuICAgICAgICAgIGlmKCF0aGlzLm1hcmtlciB8fCAhdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodmlldy5lbHNbMF0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsLm5vZGVOYW1lID09PSAnT1BUSU9OJyAmJiB0aGlzLnZpZXcuYmluZGluZ3MpIHtcbiAgICAgICAgdGhpcy52aWV3LmJpbmRpbmdzLmZvckVhY2goKGJpbmRpbmc6IEJpbmRpbmcpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5tYXJrZXIgJiYgKGJpbmRpbmcuZWwgPT09IHRoaXMubWFya2VyLnBhcmVudE5vZGUpICYmIChiaW5kaW5nLnR5cGUgPT09ICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBiaW5kaW5nLnN5bmMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGUobW9kZWxzKSB7XG4gICAgICBsZXQgZGF0YTogYW55ID0ge307XG5cbiAgICAgIC8vdG9kbzogYWRkIHRlc3QgYW5kIGZpeCBpZiBuZWNlc3NhcnlcblxuICAgICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChrZXkgIT09IHRoaXMuYXJnc1swXSkge1xuICAgICAgICAgIGRhdGFba2V5XSA9IG1vZGVsc1trZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IFZpZXcpID0+IHtcbiAgICAgICAgdmlldy51cGRhdGUoZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQWRkcyBvciByZW1vdmVzIHRoZSBjbGFzcyBmcm9tIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSBvciBmYWxzZS5cbiAgJ2NsYXNzLSonOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGxldCBlbENsYXNzID0gYCAke2VsLmNsYXNzTmFtZX0gYDtcblxuICAgIGlmICh2YWx1ZSAhPT0gKGVsQ2xhc3MuaW5kZXhPZihgICR7dGhpcy5hcmdzWzBdfSBgKSA+IC0xKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGAke2VsLmNsYXNzTmFtZX0gJHt0aGlzLmFyZ3NbMF19YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsQ2xhc3MucmVwbGFjZShgICR7dGhpcy5hcmdzWzBdfSBgLCAnICcpLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIHRleHQgdmFsdWUuXG4gIHRleHQ6IDxJT25lV2F5QmluZGVyPHN0cmluZz4+IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykge1xuICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIEhUTUwgY29udGVudC5cbiAgaHRtbDogPElPbmVXYXlCaW5kZXI8c3RyaW5nPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgZWwuaW5uZXJIVE1MID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gIH0sXG5cbiAgLy8gU2hvd3MgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICBzaG93OiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICB9LFxuXG4gIC8vIEhpZGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSAobmVnYXRlZCB2ZXJzaW9uIG9mIGBzaG93YCBiaW5kZXIpLlxuICBoaWRlOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICcnO1xuICB9LFxuXG4gIC8vIEVuYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlLlxuICBlbmFibGVkOiA8SU9uZVdheUJpbmRlcjxib29sZWFuPj4gZnVuY3Rpb24oZWw6IEhUTUxCdXR0b25FbGVtZW50LCB2YWx1ZTogYm9vbGVhbikge1xuICAgIGVsLmRpc2FibGVkID0gIXZhbHVlO1xuICB9LFxuXG4gIC8vIERpc2FibGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSAobmVnYXRlZCB2ZXJzaW9uIG9mIGBlbmFibGVkYCBiaW5kZXIpLlxuICBkaXNhYmxlZDogPElPbmVXYXlCaW5kZXI8Ym9vbGVhbj4+IGZ1bmN0aW9uKGVsOiBIVE1MQnV0dG9uRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBlbC5kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH0sXG5cbiAgLy8gQ2hlY2tzIGEgY2hlY2tib3ggb3IgcmFkaW8gaW5wdXQgd2hlbiB0aGUgdmFsdWUgaXMgdHJ1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbFxuICAvLyBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBpcyBjaGVja2VkIG9yIHVuY2hlY2tlZCAodHdvLXdheSBiaW5kZXIpLlxuICBjaGVja2VkOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAyMDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgcm91dGluZShlbDogSFRNTFNlbGVjdEVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICBlbC5jaGVja2VkID0gZ2V0U3RyaW5nKGVsLnZhbHVlKSA9PT0gZ2V0U3RyaW5nKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBTZXRzIHRoZSBlbGVtZW50J3MgdmFsdWUuIEFsc28gc2V0cyB0aGUgbW9kZWwgcHJvcGVydHkgd2hlbiB0aGUgaW5wdXQgY2hhbmdlc1xuICAvLyAodHdvLXdheSBiaW5kZXIpLlxuICB2YWx1ZTogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIHB1Ymxpc2hlczogdHJ1ZSxcbiAgICBwcmlvcml0eTogMzAwMCxcblxuICAgIGJpbmQoZWw6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8gPSBlbC50YWdOYW1lID09PSAnSU5QVVQnICYmIGVsLnR5cGUgPT09ICdyYWRpbyc7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ldmVudCA9IGVsLmdldEF0dHJpYnV0ZSgnZXZlbnQtbmFtZScpIHx8IChlbC50YWdOYW1lID09PSAnU0VMRUNUJyA/ICdjaGFuZ2UnIDogJ2lucHV0Jyk7XG5cbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjaykge1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5jYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuY3VzdG9tRGF0YS5ldmVudCwgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsKSB7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5jdXN0b21EYXRhLmV2ZW50LCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQsIHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhICYmIHRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1tdWx0aXBsZScgJiYgZWwgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkge1xuICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGxldCBvcHRpb24gPSBlbFtpXTtcbiAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdmFsdWUuaW5kZXhPZihvcHRpb24udmFsdWUpID4gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGdldFN0cmluZyh2YWx1ZSkgIT09IGdldFN0cmluZyhlbC52YWx1ZSkpIHtcbiAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEluc2VydHMgYW5kIGJpbmRzIHRoZSBlbGVtZW50IGFuZCBpdCdzIGNoaWxkIG5vZGVzIGludG8gdGhlIERPTSB3aGVuIHRydWUuXG4gIGlmOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgYmxvY2s6IHRydWUsXG4gICAgcHJpb3JpdHk6IDQwMDAsXG5cbiAgICBiaW5kKGVsOiBIVE1MVW5rbm93bkVsZW1lbnQpIHtcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgaWYgKCF0aGlzLm1hcmtlcikge1xuICAgICAgICB0aGlzLm1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJyB0aW55YmluZDogJyArIHRoaXMudHlwZSArICcgJyArIHRoaXMua2V5cGF0aCArICcgJyk7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgICBpZighZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLm1hcmtlciwgZWwpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAoIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9PT0gZmFsc2UgJiYgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQpIHtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgfVxuICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IHRydWU7XG4gICAgfSxcblxuICAgIHVuYmluZCgpIHtcbiAgICAgIGlmICggdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC51bmJpbmQoKTtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuXG4gICAgICAgICAgaWYgKCEgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQgPSBuZXcgVmlldyhlbCwgdGhpcy52aWV3Lm1vZGVscywgdGhpcy52aWV3Lm9wdGlvbnMpO1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZighdGhpcy5tYXJrZXIgfHwgIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgdGhpcy5tYXJrZXIubmV4dFNpYmxpbmcpO1xuICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5hdHRhY2hlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBoYXMgbm8gcGFyZW50IG5vZGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlKG1vZGVscykge1xuICAgICAgaWYgKCB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLnVwZGF0ZShtb2RlbHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYmluZGVycztcbiIsImltcG9ydCB7IHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuaW1wb3J0IHsgSUJpbmRpbmcsIEJpbmRlciB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3JztcblxuXG5mdW5jdGlvbiBnZXRJbnB1dFZhbHVlKGVsKSB7XG4gIGxldCByZXN1bHRzID0gW107XG4gIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgcmV0dXJuIGVsLmNoZWNrZWQ7XG4gIH0gZWxzZSBpZiAoZWwudHlwZSA9PT0gJ3NlbGVjdC1tdWx0aXBsZScpIHtcblxuICAgIGVsLm9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICByZXN1bHRzLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC52YWx1ZTtcbiAgfVxufVxuXG5jb25zdCBGT1JNQVRURVJfQVJHUyA9ICAvW15cXHMnXSt8JyhbXiddfCdbXlxcc10pKid8XCIoW15cIl18XCJbXlxcc10pKlwiL2c7XG5jb25zdCBGT1JNQVRURVJfU1BMSVQgPSAvXFxzKy87XG5cbi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbi8vIEEgc2luZ2xlIGJpbmRpbmcgYmV0d2VlbiBhIG1vZGVsIGF0dHJpYnV0ZSBhbmQgYSBET00gZWxlbWVudC5cbmV4cG9ydCBjbGFzcyBCaW5kaW5nIGltcGxlbWVudHMgSUJpbmRpbmcge1xuXG5cbiAgdmlldzogVmlldztcbiAgZWw6IEhUTUxFbGVtZW50O1xuICAvKipcbiAgICogTmFtZSBvZiB0aGUgYmluZGVyIHdpdGhvdXQgdGhlIHByZWZpeFxuICAgKi9cbiAgdHlwZTogc3RyaW5nO1xuICBiaW5kZXI6IEJpbmRlcjxhbnk+O1xuICBmb3JtYXR0ZXJzOiBzdHJpbmdbXTtcbiAgZm9ybWF0dGVyT2JzZXJ2ZXJzOiBhbnk7XG4gIGtleXBhdGg6IHN0cmluZztcbiAgLyoqXG4gICAqIEFyZ3VtZW50cyBwYXJzZWQgZnJvbSBzdGFyIGJpbmRlcnMsIGUuZy4gb24gZm9vLSotKiBhcmdzWzBdIGlzIHRoZSBmaXJzdCBzdGFyLCBhcmdzWzFdIHRoZSBzZWNvbmQtXG4gICAqL1xuICBhcmdzOiBzdHJpbmdbXTtcbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgbW9kZWw/OiBhbnk7XG4gIC8qKlxuICAgKiBIVE1MIENvbW1lbnQgdG8gbWFyayBhIGJpbmRpbmcgaW4gdGhlIERPTVxuICAgKi9cbiAgbWFya2VyPzogQ29tbWVudDtcbiAgX2JvdW5kPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIGp1c3QgdG8gaGF2ZSBhIHZhbHVlIHdoZXJlIHdlIGNvdWxkIHN0b3JlIGN1c3RvbSBkYXRhXG4gICAqL1xuICBjdXN0b21EYXRhPzogYW55O1xuXG4gIC8qKlxuICAgKiBBbGwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGJpbmRpbmcgaXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yOyB0aGVcbiAgICogY29udGFpbmluZyB2aWV3LCB0aGUgRE9NIG5vZGUsIHRoZSB0eXBlIG9mIGJpbmRpbmcsIHRoZSBtb2RlbCBvYmplY3QgYW5kIHRoZVxuICAgKiBrZXlwYXRoIGF0IHdoaWNoIHRvIGxpc3RlbiBmb3IgY2hhbmdlcy5cbiAgICogQHBhcmFtIHsqfSB2aWV3IFxuICAgKiBAcGFyYW0geyp9IGVsIFxuICAgKiBAcGFyYW0geyp9IHR5cGUgXG4gICAqIEBwYXJhbSB7Kn0ga2V5cGF0aCBcbiAgICogQHBhcmFtIHsqfSBiaW5kZXIgXG4gICAqIEBwYXJhbSB7Kn0gYXJncyBUaGUgc3RhcnQgYmluZGVycywgb24gYGNsYXNzLSpgIGFyZ3NbMF0gd2lsIGJlIHRoZSBjbGFzc25hbWUgXG4gICAqIEBwYXJhbSB7Kn0gZm9ybWF0dGVycyBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHZpZXc6IFZpZXcsIGVsLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIGZvcm1hdHRlcnMpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5iaW5kZXIgPSBiaW5kZXI7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gICAgdGhpcy5tb2RlbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcblxuICB9XG5cbiAgLy8gT2JzZXJ2ZXMgdGhlIG9iamVjdCBrZXlwYXRoXG4gIG9ic2VydmUob2JqLCBrZXlwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZlcihvYmosIGtleXBhdGgsIHRoaXMpO1xuICB9XG5cbiAgcGFyc2VUYXJnZXQoKSB7XG4gICAgaWYgKHRoaXMua2V5cGF0aCkge1xuICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKHRoaXMua2V5cGF0aCk7XG4gICAgICBpZiAodG9rZW4udHlwZSA9PT0gUFJJTUlUSVZFKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKXtcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCB0aGlzLmtleXBhdGgpO1xuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZSBpbiB0b2tlbicsIHRva2VuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXQgdGhlIGl0ZXJhdGlvbiBhbGlhcywgdXNlZCBpbiB0aGUgaW50ZXJhdGlvbiBiaW5kZXJzIGxpa2UgYGVhY2gtKmBcbiAgICogQHBhcmFtIHsqfSBtb2RlbE5hbWUgXG4gICAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pa2VyaWMvcml2ZXRzL2Jsb2IvbWFzdGVyL2Rpc3Qvcml2ZXRzLmpzI0wyNlxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMTE3NVxuICAgKi9cbiAgZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lKSB7XG4gICAgcmV0dXJuICclJyArIG1vZGVsTmFtZSArICclJztcbiAgfVxuXG4gIHBhcnNlRm9ybWF0dGVyQXJndW1lbnRzKGFyZ3MsIGZvcm1hdHRlckluZGV4KSB7XG4gICAgcmV0dXJuIGFyZ3NcbiAgICAgIC5tYXAocGFyc2VUeXBlKVxuICAgICAgLm1hcCgoe3R5cGUsIHZhbHVlfSwgYWkpID0+IHtcbiAgICAgICAgaWYgKHR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0pIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XSA9IHt9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBvYnNlcnZlciA9IHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2Zvcm1hdHRlckluZGV4XVthaV07XG5cbiAgICAgICAgICBpZiAoIW9ic2VydmVyKSB7XG4gICAgICAgICAgICBvYnNlcnZlciA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG9ic2VydmVyLnZhbHVlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUnLCB0eXBlLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gQXBwbGllcyBhbGwgdGhlIGN1cnJlbnQgZm9ybWF0dGVycyB0byB0aGUgc3VwcGxpZWQgdmFsdWUgYW5kIHJldHVybnMgdGhlXG4gIC8vIGZvcm1hdHRlZCB2YWx1ZS5cbiAgZm9ybWF0dGVkVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZSgocmVzdWx0LCBkZWNsYXJhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBhcmdzID0gZGVjbGFyYXRpb24ubWF0Y2goRk9STUFUVEVSX0FSR1MpO1xuICAgICAgbGV0IGlkID0gYXJncy5zaGlmdCgpO1xuICAgICAgbGV0IGZvcm1hdHRlciA9IHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnNbaWRdO1xuXG4gICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG5cbiAgICAgIGlmIChmb3JtYXR0ZXIgJiYgKGZvcm1hdHRlci5yZWFkIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5yZWFkKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICB9IGVsc2UgaWYgKGZvcm1hdHRlciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlcihyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB2YWx1ZSk7XG4gIH1cblxuICAvLyBSZXR1cm5zIGFuIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBiaW5kaW5nIGFyb3VuZCB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uXG4gIGV2ZW50SGFuZGxlcihmbikge1xuICAgIGxldCBiaW5kaW5nID0gdGhpcztcbiAgICBsZXQgaGFuZGxlciA9IGJpbmRpbmcudmlldy5vcHRpb25zLmhhbmRsZXI7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oZXYpIHtcbiAgICAgIGhhbmRsZXIuY2FsbChmbiwgdGhpcywgZXYsIGJpbmRpbmcpO1xuICAgIH07XG4gIH1cblxuICAvLyBTZXRzIHRoZSB2YWx1ZSBmb3IgdGhlIGJpbmRpbmcuIFRoaXMgQmFzaWNhbGx5IGp1c3QgcnVucyB0aGUgYmluZGluZyByb3V0aW5lXG4gIC8vIHdpdGggdGhlIHN1cHBsaWVkIHZhbHVlIGZvcm1hdHRlZC5cbiAgc2V0KHZhbHVlKSB7XG4gICAgaWYgKCh2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSAmJiAhdGhpcy5iaW5kZXIuZnVuY3Rpb24pIHtcbiAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZSh2YWx1ZS5jYWxsKHRoaXMubW9kZWwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBsZXQgcm91dGluZUZuID0gdGhpcy5iaW5kZXIucm91dGluZSB8fCB0aGlzLmJpbmRlcjtcblxuICAgIGlmIChyb3V0aW5lRm4gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgcm91dGluZUZuLmNhbGwodGhpcywgdGhpcy5lbCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN5bmNzIHVwIHRoZSB2aWV3IGJpbmRpbmcgd2l0aCB0aGUgbW9kZWwuXG4gIHN5bmMoKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICAgIHRoaXMuc2V0KHRoaXMub2JzZXJ2ZXIudmFsdWUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFB1Ymxpc2hlcyB0aGUgdmFsdWUgY3VycmVudGx5IHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudCBiYWNrIHRvIHRoZSBtb2RlbC5cbiAgcHVibGlzaCgpIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdmFyIHZhbHVlID0gdGhpcy5mb3JtYXR0ZXJzLnJlZHVjZVJpZ2h0KChyZXN1bHQsIGRlY2xhcmF0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBhcmdzID0gZGVjbGFyYXRpb24uc3BsaXQoRk9STUFUVEVSX1NQTElUKTtcbiAgICAgICAgY29uc3QgaWQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMudmlldy5vcHRpb25zLmZvcm1hdHRlcnNbaWRdO1xuICAgICAgICBjb25zdCBwcm9jZXNzZWRBcmdzID0gdGhpcy5wYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBpbmRleCk7XG5cbiAgICAgICAgaWYgKGZvcm1hdHRlciAmJiBmb3JtYXR0ZXIucHVibGlzaCkge1xuICAgICAgICAgIHJlc3VsdCA9IGZvcm1hdHRlci5wdWJsaXNoKHJlc3VsdCwgLi4ucHJvY2Vzc2VkQXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sIHRoaXMuZ2V0VmFsdWUodGhpcy5lbCkpO1xuXG4gICAgICB0aGlzLm9ic2VydmVyLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBTdWJzY3JpYmVzIHRvIHRoZSBtb2RlbCBmb3IgY2hhbmdlcyBhdCB0aGUgc3BlY2lmaWVkIGtleXBhdGguIEJpLWRpcmVjdGlvbmFsXG4gIC8vIHJvdXRpbmVzIHdpbGwgYWxzbyBsaXN0ZW4gZm9yIGNoYW5nZXMgb24gdGhlIGVsZW1lbnQgdG8gcHJvcGFnYXRlIHRoZW0gYmFja1xuICAvLyB0byB0aGUgbW9kZWwuXG4gIGJpbmQoKSB7XG4gICAgdGhpcy5wYXJzZVRhcmdldCgpO1xuXG4gICAgaWYgKHRoaXMuYmluZGVyLmhhc093blByb3BlcnR5KCdiaW5kJykpIHtcbiAgICAgIHRoaXMuYmluZGVyLmJpbmQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWV3Lm9wdGlvbnMucHJlbG9hZERhdGEpIHtcbiAgICAgIHRoaXMuc3luYygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVuc3Vic2NyaWJlcyBmcm9tIHRoZSBtb2RlbCBhbmQgdGhlIGVsZW1lbnQuXG4gIHVuYmluZCgpIHtcbiAgICBpZiAodGhpcy5iaW5kZXIudW5iaW5kKSB7XG4gICAgICB0aGlzLmJpbmRlci51bmJpbmQuY2FsbCh0aGlzLCB0aGlzLmVsKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5vYnNlcnZlci51bm9ic2VydmUoKTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmZvcm1hdHRlck9ic2VydmVycykuZm9yRWFjaChmaSA9PiB7XG4gICAgICBsZXQgYXJncyA9IHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzW2ZpXTtcblxuICAgICAgT2JqZWN0LmtleXMoYXJncykuZm9yRWFjaChhaSA9PiB7XG4gICAgICAgIGFyZ3NbYWldLnVub2JzZXJ2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVycyA9IHt9O1xuICB9XG5cbiAgLy8gVXBkYXRlcyB0aGUgYmluZGluZydzIG1vZGVsIGZyb20gd2hhdCBpcyBjdXJyZW50bHkgc2V0IG9uIHRoZSB2aWV3LiBVbmJpbmRzXG4gIC8vIHRoZSBvbGQgbW9kZWwgZmlyc3QgYW5kIHRoZW4gcmUtYmluZHMgd2l0aCB0aGUgbmV3IG1vZGVsLlxuICB1cGRhdGUobW9kZWxzID0ge30pIHtcbiAgICBpZiAodGhpcy5vYnNlcnZlcikge1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJpbmRlci51cGRhdGUpIHtcbiAgICAgIHRoaXMuYmluZGVyLnVwZGF0ZS5jYWxsKHRoaXMsIG1vZGVscyk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBlbGVtZW50cyB2YWx1ZVxuICBnZXRWYWx1ZShlbCkge1xuICAgIGlmICh0aGlzLmJpbmRlciAmJiB0aGlzLmJpbmRlci5nZXRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYmluZGVyLmdldFZhbHVlLmNhbGwodGhpcywgZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0SW5wdXRWYWx1ZShlbCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgdGlueWJpbmQgZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgeyBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgRVhURU5TSU9OUywgT1BUSU9OUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5cbi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbi8vIGNvbXBvbmVudCB2aWV3IGVuY2Fwc3VsYXRlZCBhcyBhIGJpbmRpbmcgd2l0aGluIGl0J3MgcGFyZW50IHZpZXcuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50QmluZGluZyBleHRlbmRzIEJpbmRpbmcge1xuICB2aWV3O1xuICBlbDtcbiAgdHlwZTtcbiAgY29tcG9uZW50O1xuICBzdGF0aWM6IGFueTtcbiAgb2JzZXJ2ZXJzO1xuICB1cHN0cmVhbU9ic2VydmVycztcbiAgLy8gSW5pdGlhbGl6ZXMgYSBjb21wb25lbnQgYmluZGluZyBmb3IgdGhlIHNwZWNpZmllZCB2aWV3LiBUaGUgcmF3IGNvbXBvbmVudFxuICAvLyBlbGVtZW50IGlzIHBhc3NlZCBpbiBhbG9uZyB3aXRoIHRoZSBjb21wb25lbnQgdHlwZS4gQXR0cmlidXRlcyBhbmQgc2NvcGVcbiAgLy8gaW5mbGVjdGlvbnMgYXJlIGRldGVybWluZWQgYmFzZWQgb24gdGhlIGNvbXBvbmVudHMgZGVmaW5lZCBhdHRyaWJ1dGVzLlxuICBjb25zdHJ1Y3Rvcih2aWV3OiBWaWV3LCBlbDogRWxlbWVudCwgdHlwZTogc3RyaW5nKSB7XG4gICAgc3VwZXIodmlldywgZWwsIHR5cGUsIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5jb21wb25lbnQgPSB2aWV3Lm9wdGlvbnMuY29tcG9uZW50c1t0aGlzLnR5cGVdO1xuICAgIHRoaXMuc3RhdGljID0ge307XG4gICAgdGhpcy5vYnNlcnZlcnMgPSB7fTtcbiAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzID0ge307XG4gICAgXG4gICAgbGV0IGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcbiAgICBcbiAgICAvLyBwYXJzZSBjb21wb25lbnQgYXR0cmlidXRlc1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcblxuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyBub3Qgd2l0aCBiaW5kaW5nIHByZWZpeC4gRS5nLiBydi1cbiAgICAgIGlmIChhdHRyaWJ1dGUubmFtZS5pbmRleE9mKGJpbmRpbmdQcmVmaXgpICE9PSAwKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSB0aGlzLmNhbWVsQ2FzZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICBsZXQgc3RhdCA9IHRoaXMuY29tcG9uZW50LnN0YXRpYztcbiAgICBcbiAgICAgICAgaWYgKHN0YXQgJiYgc3RhdC5pbmRleE9mKHByb3BlcnR5TmFtZSkgPiAtMSkge1xuICAgICAgICAgIHRoaXMuc3RhdGljW3Byb3BlcnR5TmFtZV0gPSBhdHRyaWJ1dGUudmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgICB0aGlzLnN0YXRpY1twcm9wZXJ0eU5hbWVdID0gdG9rZW4udmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZih0b2tlbi50eXBlID09PSBLRVlQQVRIKSB7XG4gICAgICAgICAgdGhpcy5vYnNlcnZlcnNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhblxcJ3QgcGFyc2UgY29tcG9uZW50IGF0dHJpYnV0ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gICAgXG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnN5bmNgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kIHRvXG4gIC8vIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgc3luYygpIHt9XG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnVwZGF0ZWAgc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmRcbiAgLy8gdG8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICB1cGRhdGUoKSB7fVxuICAgIFxuICAvLyBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpwdWJsaXNoYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAvLyB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gIHB1Ymxpc2goKSB7fVxuICAgIFxuICAvLyBSZXR1cm5zIGFuIG9iamVjdCBtYXAgdXNpbmcgdGhlIGNvbXBvbmVudCdzIHNjb3BlIGluZmxlY3Rpb25zLlxuICBsb2NhbHMoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIFxuICAgIE9iamVjdC5rZXlzKHRoaXMuc3RhdGljKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICByZXN1bHRba2V5XSA9IHRoaXMuc3RhdGljW2tleV07XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgICBcbiAgLy8gUmV0dXJucyBhIGNhbWVsLWNhc2VkIHZlcnNpb24gb2YgdGhlIHN0cmluZy4gVXNlZCB3aGVuIHRyYW5zbGF0aW5nIGFuXG4gIC8vIGVsZW1lbnQncyBhdHRyaWJ1dGUgbmFtZSBpbnRvIGEgcHJvcGVydHkgbmFtZSBmb3IgdGhlIGNvbXBvbmVudCdzIHNjb3BlLlxuICBjYW1lbENhc2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8tKFthLXpdKS9nLCBncm91cGVkID0+IHtcbiAgICAgIHJldHVybiBncm91cGVkWzFdLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG4gIH1cbiAgICBcbiAgLy8gSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6YmluZGAgdG8gYnVpbGQgYHRoaXMuY29tcG9uZW50Vmlld2Agd2l0aCBhIGxvY2FsaXplZFxuICAvLyBtYXAgb2YgbW9kZWxzIGZyb20gdGhlIHJvb3Qgdmlldy4gQmluZCBgdGhpcy5jb21wb25lbnRWaWV3YCBvbiBzdWJzZXF1ZW50IGNhbGxzLlxuICBiaW5kKCkge1xuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgaWYgKCF0aGlzLmJvdW5kKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQga2V5cGF0aCA9IHRoaXMub2JzZXJ2ZXJzW2tleV07XG4gICAgXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0gPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywga2V5cGF0aCwgKGtleSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSA9IHRoaXMub2JzZXJ2ZXJzW2tleV0udmFsdWUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIGtleSkpO1xuICAgICAgfSk7XG4gICAgXG4gICAgICB0aGlzLmJvdW5kID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LmJpbmQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSB0aGlzLmNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgbGV0IHNjb3BlID0gdGhpcy5jb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIHRoaXMuZWwsIHRoaXMubG9jYWxzKCkpO1xuICAgICAgdGhpcy5lbC5fYm91bmQgPSB0cnVlO1xuICAgIFxuICAgIFxuICAgICAgRVhURU5TSU9OUy5mb3JFYWNoKGV4dGVuc2lvblR5cGUgPT4ge1xuICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdID0ge307XG4gICAgXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFtleHRlbnNpb25UeXBlXSkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50W2V4dGVuc2lvblR5cGVdKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdW2tleV0gPSB0aGlzLmNvbXBvbmVudFtleHRlbnNpb25UeXBlXVtrZXldO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudmlldy5vcHRpb25zW2V4dGVuc2lvblR5cGVdKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKG9wdGlvbnNbZXh0ZW5zaW9uVHlwZV1ba2V5XSkge1xuICAgICAgICAgICAgb3B0aW9uc1tleHRlbnNpb25UeXBlXVtrZXldID0gdGhpcy52aWV3W2V4dGVuc2lvblR5cGVdW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIFxuICAgICAgT1BUSU9OUy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudFtvcHRpb25dICE9IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zW29wdGlvbl0gPSB0aGlzLmNvbXBvbmVudFtvcHRpb25dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnNbb3B0aW9uXSA9IHRoaXMudmlld1tvcHRpb25dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBcbiAgICAgIC8vdGhlcmUncyBhIGN5Y2xpYyBkZXBlbmRlbmN5IHRoYXQgbWFrZXMgaW1wb3J0ZWQgVmlldyBhIGR1bW15IG9iamVjdC4gVXNlIHRpbnliaW5kLmJpbmRcbiAgICAgIC8vdGhpcy5jb21wb25lbnRWaWV3ID0gbmV3IFZpZXcodGhpcy5lbCwgc2NvcGUsIG9wdGlvbnMpXG4gICAgICAvL3RoaXMuY29tcG9uZW50Vmlldy5iaW5kKClcbiAgICAgIHRoaXMuY29tcG9uZW50VmlldyA9IHRpbnliaW5kLmJpbmQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5lbC5jaGlsZE5vZGVzKSwgc2NvcGUsIG9wdGlvbnMpO1xuICAgIFxuICAgICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IG9ic2VydmVyID0gdGhpcy5vYnNlcnZlcnNba2V5XTtcbiAgICAgICAgbGV0IG1vZGVscyA9IHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHM7XG4gICAgXG4gICAgICAgIGxldCB1cHN0cmVhbSA9IHRoaXMub2JzZXJ2ZShtb2RlbHMsIGtleSwgKChrZXksIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLnNldFZhbHVlKHRoaXMuY29tcG9uZW50Vmlldy5tb2RlbHNba2V5XSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkuY2FsbCh0aGlzLCBrZXksIG9ic2VydmVyKSk7XG4gICAgXG4gICAgICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnNba2V5XSA9IHVwc3RyZWFtO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gICAgXG4gIC8vIEludGVyY2VwdCBgdGlueWJpbmQuQmluZGluZzo6dW5iaW5kYCB0byBiZSBjYWxsZWQgb24gYHRoaXMuY29tcG9uZW50Vmlld2AuXG4gIHVuYmluZCgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLnVwc3RyZWFtT2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMub2JzZXJ2ZXJzW2tleV0udW5vYnNlcnZlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKHRoaXMuY29tcG9uZW50Vmlldykge1xuICAgICAgdGhpcy5jb21wb25lbnRWaWV3LnVuYmluZC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxufSIsImV4cG9ydCB0eXBlIFRFeHRlbnNpb25LZXkgPSAnYmluZGVycycgfCAnZm9ybWF0dGVycycgfCAnY29tcG9uZW50cycgfCAnYWRhcHRlcnMnO1xuXG5leHBvcnQgY29uc3QgT1BUSU9OUyA9IFtcbiAgJ3ByZWZpeCcsXG4gICd0ZW1wbGF0ZURlbGltaXRlcnMnLFxuICAncm9vdEludGVyZmFjZScsXG4gICdwcmVsb2FkRGF0YScsXG4gICdoYW5kbGVyJ1xuXTtcblxuZXhwb3J0IGNvbnN0IEVYVEVOU0lPTlMgPSBbXG4gICdiaW5kZXJzJyxcbiAgJ2Zvcm1hdHRlcnMnLFxuICAnY29tcG9uZW50cycsXG4gICdhZGFwdGVycydcbl07IiwiaW1wb3J0IHRpbnliaW5kIGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldyc7XG5pbXBvcnQgYWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCBiaW5kZXJzIGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBJQmluZGVycyB9IGZyb20gJy4vYmluZGVycyc7XG5pbXBvcnQgeyBPYnNlcnZlciwgUm9vdCB9IGZyb20gJy4vb2JzZXJ2ZXInO1xuXG5pbXBvcnQgeyBJRm9ybWF0dGVycywgSUNvbXBvbmVudHMgfSBmcm9tICcuLi9pbmRleCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnMge1xuICAvLyBBdHRyaWJ1dGUgcHJlZml4IGluIHRlbXBsYXRlc1xuICBwcmVmaXg/OiBzdHJpbmc7XG5cbiAgLy9QcmVsb2FkIHRlbXBsYXRlcyB3aXRoIGluaXRpYWwgZGF0YSBvbiBiaW5kXG4gIHByZWxvYWREYXRhPzogYm9vbGVhbjtcblxuICAvL1Jvb3Qgc2lnaHRnbGFzcyBpbnRlcmZhY2UgZm9yIGtleXBhdGhzXG4gIHJvb3RJbnRlcmZhY2U/OiBzdHJpbmc7XG5cbiAgLy8gVGVtcGxhdGUgZGVsaW1pdGVycyBmb3IgdGV4dCBiaW5kaW5nc1xuICB0ZW1wbGF0ZURlbGltaXRlcnM/OiBBcnJheTxzdHJpbmc+XG5cbiAgLy8gQXVnbWVudCB0aGUgZXZlbnQgaGFuZGxlciBvZiB0aGUgb24tKiBiaW5kZXJcbiAgaGFuZGxlcj86IEZ1bmN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFeHRlbnNpb25zIHtcbiAgYmluZGVyczogSUJpbmRlcnM8YW55PjtcbiAgZm9ybWF0dGVyczogSUZvcm1hdHRlcnM7XG4gIGNvbXBvbmVudHM6IElDb21wb25lbnRzO1xuICBhZGFwdGVyczogSUFkYXB0ZXJzO1xufVxuXG4vLyBSZXR1cm5zIHRoZSBwdWJsaWMgaW50ZXJmYWNlLlxuXG50aW55YmluZC5iaW5kZXJzID0gYmluZGVycztcbnRpbnliaW5kLmFkYXB0ZXJzWycuJ10gPSBhZGFwdGVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPcHRpb25zUGFyYW0gZXh0ZW5kcyBJRXh0ZW5zaW9ucywgSU9wdGlvbnMge31cblxuZXhwb3J0IGludGVyZmFjZSBJVmlld09wdGlvbnMgZXh0ZW5kcyBJT3B0aW9uc1BhcmFtIHtcbiAgc3RhckJpbmRlcnM6IGFueTtcbiAgLy8gc2lnaHRnbGFzc1xuICByb290SW50ZXJmYWNlOiBSb290O1xufVxuXG4vLyBUT0RPIG1vdmUgdG8gdWl0aWxzXG5jb25zdCBtZXJnZU9iamVjdCA9ICh0YXJnZXQ6IGFueSwgb2JqOiBhbnkpID0+IHtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRhcmdldDsgXG59O1xuXG5cbi8vIEJpbmRzIHNvbWUgZGF0YSB0byBhIHRlbXBsYXRlIC8gZWxlbWVudC4gUmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXG50aW55YmluZC5iaW5kID0gKGVsOiBIVE1MRWxlbWVudCwgbW9kZWxzOiBhbnksIG9wdGlvbnM/OiBJT3B0aW9uc1BhcmFtKSA9PiB7XG4gIGxldCB2aWV3T3B0aW9uczogSVZpZXdPcHRpb25zID0ge1xuICAgIC8vIEVYVEVOU0lPTlNcbiAgICBiaW5kZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIGZvcm1hdHRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgY29tcG9uZW50czogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBhZGFwdGVyczogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAvLyBvdGhlclxuICAgIHN0YXJCaW5kZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIC8vIHNpZ2h0Z2xhc3NcbiAgICByb290SW50ZXJmYWNlOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICB9O1xuICBtb2RlbHMgPSBtb2RlbHMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgLy8gb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYob3B0aW9ucykge1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIG9wdGlvbnMuYmluZGVycyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5jb21wb25lbnRzLCBvcHRpb25zLmNvbXBvbmVudHMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCBvcHRpb25zLmFkYXB0ZXJzKTtcbiAgfVxuXG4gIHZpZXdPcHRpb25zLnByZWZpeCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVmaXggPyBvcHRpb25zLnByZWZpeCA6IHRpbnliaW5kLnByZWZpeFxuICB2aWV3T3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPSBvcHRpb25zICYmIG9wdGlvbnMudGVtcGxhdGVEZWxpbWl0ZXJzID8gb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgOiB0aW55YmluZC50ZW1wbGF0ZURlbGltaXRlcnNcbiAgdmlld09wdGlvbnMucm9vdEludGVyZmFjZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5yb290SW50ZXJmYWNlID8gb3B0aW9ucy5yb290SW50ZXJmYWNlIDogdGlueWJpbmQucm9vdEludGVyZmFjZVxuICB2aWV3T3B0aW9ucy5wcmVsb2FkRGF0YSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wcmVsb2FkRGF0YSA/IG9wdGlvbnMucHJlbG9hZERhdGEgOiB0aW55YmluZC5wcmVsb2FkRGF0YVxuICB2aWV3T3B0aW9ucy5oYW5kbGVyID0gb3B0aW9ucyAmJiBvcHRpb25zLmhhbmRsZXIgPyBvcHRpb25zLmhhbmRsZXIgOiB0aW55YmluZC5oYW5kbGVyXG5cbiAgLy8gbWVyZ2UgZXh0ZW5zaW9uc1xuICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5iaW5kZXJzLCB0aW55YmluZC5iaW5kZXJzKTtcbiAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuZm9ybWF0dGVycywgdGlueWJpbmQuZm9ybWF0dGVycyk7XG4gIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmNvbXBvbmVudHMsIHRpbnliaW5kLmNvbXBvbmVudHMpO1xuICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5hZGFwdGVycywgdGlueWJpbmQuYWRhcHRlcnMpO1xuXG4gIC8vIGdldCBhbGwgc3RhckJpbmRlcnMgZnJvbSBhdmFpbGFibGUgYmluZGVyc1xuICB2aWV3T3B0aW9ucy5zdGFyQmluZGVycyA9IE9iamVjdC5rZXlzKHZpZXdPcHRpb25zLmJpbmRlcnMpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5pbmRleE9mKCcqJykgPiAwO1xuICB9KTtcblxuICBPYnNlcnZlci51cGRhdGVPcHRpb25zKHZpZXdPcHRpb25zKTtcblxuICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCBtb2RlbHMsIHZpZXdPcHRpb25zKTtcbiAgdmlldy5iaW5kKCk7XG4gIHJldHVybiB2aWV3O1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgYSBjb21wb25lbnQgb24gdGhlIHNwZWNpZmllZCBlbGVtZW50IGFuZFxuLy8gcmV0dXJucyBhIHRpbnliaW5kLlZpZXcgaW5zdGFuY2UuXHRcbnRpbnliaW5kLmluaXQgPSAoY29tcG9uZW50S2V5OiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCwgZGF0YSA9IHt9KSA9PiB7XG4gIGlmICghZWwpIHtcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB9XG5cbiAgY29uc3QgY29tcG9uZW50ID0gdGlueWJpbmQuY29tcG9uZW50c1tjb21wb25lbnRLZXldO1xuICBlbC5pbm5lckhUTUwgPSBjb21wb25lbnQudGVtcGxhdGUuY2FsbCh0aW55YmluZCwgZWwpO1xuICBsZXQgc2NvcGUgPSBjb21wb25lbnQuaW5pdGlhbGl6ZS5jYWxsKHRpbnliaW5kLCBlbCwgZGF0YSk7XG5cbiAgbGV0IHZpZXcgPSB0aW55YmluZC5iaW5kKGVsLCBzY29wZSk7XG4gIHZpZXcuYmluZCgpO1xuICByZXR1cm4gdmlldztcbn07XG5cbi8vIE1vdmUgdG8gZm9ybWF0dGVyc1xudGlueWJpbmQuZm9ybWF0dGVycy5uZWdhdGUgPSB0aW55YmluZC5mb3JtYXR0ZXJzLm5vdCA9IGZ1bmN0aW9uICh2YWx1ZTogYm9vbGVhbikge1xuICByZXR1cm4gIXZhbHVlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGlueWJpbmQ7XG4iLCJcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5cbmltcG9ydCB7IElWaWV3T3B0aW9ucyB9IGZyb20gJy4vZXhwb3J0JztcblxuZXhwb3J0IGludGVyZmFjZSBJQ2FsbGJhY2sge1xuICBzeW5jOiAoKSA9PiB2b2lkO1xufVxuZXhwb3J0IGludGVyZmFjZSBJS2V5IHtcbiAgcGF0aDogYW55O1xuICBpOiBSb290O1xufVxuXG5leHBvcnQgdHlwZSBPYmogPSBhbnk7XG5cbmV4cG9ydCB0eXBlIFJvb3QgPSBhbnk7XG5cbi8vIENoZWNrIGlmIGEgdmFsdWUgaXMgYW4gb2JqZWN0IHRoYW4gY2FuIGJlIG9ic2VydmVkLlxuZnVuY3Rpb24gaXNPYmplY3Qob2JqOiBPYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbFxufVxuXG4vLyBFcnJvciB0aHJvd2VyLlxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gIHRocm93IG5ldyBFcnJvcignW09ic2VydmVyXSAnICsgbWVzc2FnZSlcbn1cblxuLy8gVE9ET1xubGV0IGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG5sZXQgaW50ZXJmYWNlczogc3RyaW5nW107XG5sZXQgcm9vdEludGVyZmFjZTogUm9vdDtcblxuZXhwb3J0IGNsYXNzIE9ic2VydmVyIHtcbiAga2V5cGF0aDogc3RyaW5nO1xuICBjYWxsYmFjazogSUNhbGxiYWNrO1xuICBvYmplY3RQYXRoOiBPYmpbXTtcbiAgb2JqOiBPYmo7XG4gIHRhcmdldDogT2JqO1xuICBrZXk6IElLZXk7XG4gIHRva2VuczogSUtleVtdO1xuICAvLyBDb25zdHJ1Y3RzIGEgbmV3IGtleXBhdGggb2JzZXJ2ZXIgYW5kIGtpY2tzIHRoaW5ncyBvZmYuXG4gIGNvbnN0cnVjdG9yKG9iajogT2JqLCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJQ2FsbGJhY2spIHtcbiAgICB0aGlzLmtleXBhdGggPSBrZXlwYXRoO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLm9iamVjdFBhdGggPSBbXTtcbiAgICBjb25zdCBwYXJzZVJlc3VsdCA9IHRoaXMucGFyc2UoKTtcbiAgICB0aGlzLmtleSA9IHBhcnNlUmVzdWx0LmtleTtcbiAgICB0aGlzLnRva2VucyA9IHBhcnNlUmVzdWx0LnRva2VucztcbiAgICB0aGlzLm9iaiA9IHRoaXMuZ2V0Um9vdE9iamVjdChvYmopO1xuICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5yZWFsaXplKCk7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnM6IElWaWV3T3B0aW9ucykge1xuICAgIGFkYXB0ZXJzID0gb3B0aW9ucy5hZGFwdGVycztcbiAgICBpbnRlcmZhY2VzID0gT2JqZWN0LmtleXMoYWRhcHRlcnMpO1xuICAgIHJvb3RJbnRlcmZhY2UgPSBvcHRpb25zLnJvb3RJbnRlcmZhY2U7XG4gIH1cbiAgXG4gIC8vIFRva2VuaXplcyB0aGUgcHJvdmlkZWQga2V5cGF0aCBzdHJpbmcgaW50byBpbnRlcmZhY2UgKyBwYXRoIHRva2VucyBmb3IgdGhlXG4gIC8vIG9ic2VydmVyIHRvIHdvcmsgd2l0aC5cbiAgc3RhdGljIHRva2VuaXplID0gZnVuY3Rpb24oa2V5cGF0aDogc3RyaW5nLCByb290OiBSb290KSB7XG4gICAgdmFyIHRva2VuczogYW55W10gPSBbXTtcbiAgICB2YXIgY3VycmVudDogSUtleSA9IHtpOiByb290LCBwYXRoOiAnJ307XG4gICAgdmFyIGluZGV4OiBudW1iZXI7XG4gICAgdmFyIGNocjogc3RyaW5nO1xuICBcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBrZXlwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY2hyID0ga2V5cGF0aC5jaGFyQXQoaW5kZXgpO1xuICBcbiAgICAgIGlmICghIX5pbnRlcmZhY2VzLmluZGV4T2YoY2hyKSkge1xuICAgICAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICAgICAgY3VycmVudCA9IHtpOiBjaHIsIHBhdGg6ICcnfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQucGF0aCArPSBjaHI7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICB0b2tlbnMucHVzaChjdXJyZW50KTtcbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG4gIFxuICAvLyBQYXJzZXMgdGhlIGtleXBhdGggdXNpbmcgdGhlIGludGVyZmFjZXMgZGVmaW5lZCBvbiB0aGUgdmlldy4gU2V0cyB2YXJpYWJsZXNcbiAgLy8gZm9yIHRoZSB0b2tlbml6ZWQga2V5cGF0aCBhcyB3ZWxsIGFzIHRoZSBlbmQga2V5LlxuICBwYXJzZSgpIHtcbiAgICB2YXIgcGF0aDogc3RyaW5nO1xuICAgIHZhciByb290OiBSb290O1xuICBcbiAgICBpZiAoIWludGVyZmFjZXMubGVuZ3RoKSB7XG4gICAgICBlcnJvcignTXVzdCBkZWZpbmUgYXQgbGVhc3Qgb25lIGFkYXB0ZXIgaW50ZXJmYWNlLicpO1xuICAgIH1cbiAgXG4gICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZih0aGlzLmtleXBhdGhbMF0pKSB7XG4gICAgICByb290ID0gdGhpcy5rZXlwYXRoWzBdO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aC5zdWJzdHIoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3QgPSByb290SW50ZXJmYWNlO1xuICAgICAgcGF0aCA9IHRoaXMua2V5cGF0aDtcbiAgICB9XG4gIFxuICAgIHRoaXMudG9rZW5zID0gT2JzZXJ2ZXIudG9rZW5pemUocGF0aCwgcm9vdCk7XG5cbiAgICBpZighdGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHRva2VucycpO1xuICAgIH1cblxuICAgIHRoaXMua2V5ID0gKHRoaXMudG9rZW5zLnBvcCgpIGFzIElLZXkpO1xuICAgIFxuICAgIHJldHVybiB7XG4gICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgdG9rZW5zOiB0aGlzLnRva2VucyxcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWxpemVzIHRoZSBmdWxsIGtleXBhdGgsIGF0dGFjaGluZyBvYnNlcnZlcnMgZm9yIGV2ZXJ5IGtleSBhbmQgY29ycmVjdGluZ1xuICAvLyBvbGQgb2JzZXJ2ZXJzIHRvIGFueSBjaGFuZ2VkIG9iamVjdHMgaW4gdGhlIGtleXBhdGguXG4gIHJlYWxpemUoKSB7XG4gICAgdmFyIGN1cnJlbnQ6IE9iaiA9IHRoaXMub2JqXG4gICAgdmFyIHVucmVhY2hlZCA9IC0xXG4gICAgdmFyIHByZXZcbiAgICB2YXIgdG9rZW5cbiAgXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudG9rZW5zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdG9rZW4gPSB0aGlzLnRva2Vuc1tpbmRleF1cbiAgICAgIGlmIChpc09iamVjdChjdXJyZW50KSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub2JqZWN0UGF0aFtpbmRleF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnQgIT09IChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgICAgIHRoaXMuc2V0KHRydWUsIHRva2VuLCBjdXJyZW50LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5vYmplY3RQYXRoW2luZGV4XSA9IGN1cnJlbnRcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgdGhpcy5vYmplY3RQYXRoW2luZGV4XSA9IGN1cnJlbnRcbiAgICAgICAgfVxuICBcbiAgICAgICAgY3VycmVudCA9IHRoaXMuZ2V0KHRva2VuLCBjdXJyZW50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHVucmVhY2hlZCA9PT0gLTEpIHtcbiAgICAgICAgICB1bnJlYWNoZWQgPSBpbmRleFxuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAocHJldiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIHByZXYsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmICh1bnJlYWNoZWQgIT09IC0xKSB7XG4gICAgICB0aGlzLm9iamVjdFBhdGguc3BsaWNlKHVucmVhY2hlZClcbiAgICB9XG4gIFxuICAgIHJldHVybiBjdXJyZW50XG4gIH1cbiAgXG4gIC8vIFVwZGF0ZXMgdGhlIGtleXBhdGguIFRoaXMgaXMgY2FsbGVkIHdoZW4gYW55IGludGVybWVkaWFyeSBrZXkgaXMgY2hhbmdlZC5cbiAgc3luYygpIHtcbiAgICB2YXIgbmV4dCwgb2xkVmFsdWUsIG5ld1ZhbHVlXG4gIFxuICAgIGlmICgobmV4dCA9IHRoaXMucmVhbGl6ZSgpKSAhPT0gdGhpcy50YXJnZXQpIHtcbiAgICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRoaXMua2V5LCB0aGlzLnRhcmdldCwgdGhpcy5jYWxsYmFjaylcbiAgICAgIH1cbiAgXG4gICAgICBpZiAoaXNPYmplY3QobmV4dCkpIHtcbiAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdGhpcy5rZXksIG5leHQsIHRoaXMuY2FsbGJhY2spXG4gICAgICB9XG4gIFxuICAgICAgb2xkVmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIHRoaXMudGFyZ2V0ID0gbmV4dFxuICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlKClcbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUgfHwgbmV3VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9IGVsc2UgaWYgKG5leHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5jYWxsYmFjay5zeW5jKClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFJlYWRzIHRoZSBjdXJyZW50IGVuZCB2YWx1ZSBvZiB0aGUgb2JzZXJ2ZWQga2V5cGF0aC4gUmV0dXJucyB1bmRlZmluZWQgaWZcbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZS5cbiAgdmFsdWUoKSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMua2V5LCB0aGlzLnRhcmdldClcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFNldHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBDYWxsaW5nIHNldFZhbHVlIHdoZW5cbiAgLy8gdGhlIGZ1bGwga2V5cGF0aCBpcyB1bnJlYWNoYWJsZSBpcyBhIG5vLW9wLlxuICBzZXRWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgYWRhcHRlcnNbdGhpcy5rZXkuaV0uc2V0KHRoaXMudGFyZ2V0LCB0aGlzLmtleS5wYXRoLCB2YWx1ZSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEdldHMgdGhlIHByb3ZpZGVkIGtleSBvbiBhbiBvYmplY3QuXG4gIGdldChrZXk6IElLZXksIG9iajogT2JqKSB7XG4gICAgcmV0dXJuIGFkYXB0ZXJzW2tleS5pXS5nZXQob2JqLCBrZXkucGF0aClcbiAgfVxuICBcbiAgLy8gT2JzZXJ2ZXMgb3IgdW5vYnNlcnZlcyBhIGNhbGxiYWNrIG9uIHRoZSBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIGtleS5cbiAgc2V0KGFjdGl2ZTogYm9vbGVhbiwga2V5OiBJS2V5LCBvYmo6IE9iaiwgY2FsbGJhY2s6IElDYWxsYmFjaykge1xuICAgIGlmKGFjdGl2ZSkge1xuICAgICAgYWRhcHRlcnNba2V5LmldLm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkYXB0ZXJzW2tleS5pXS51bm9ic2VydmUob2JqLCBrZXkucGF0aCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIFxuICBcbiAgLy8gVW5vYnNlcnZlcyB0aGUgZW50aXJlIGtleXBhdGguXG4gIHVub2JzZXJ2ZSgpIHtcbiAgICB2YXIgb2JqOiBPYmo7XG4gICAgdmFyIHRva2VuO1xuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKG9iaiA9IHRoaXMub2JqZWN0UGF0aFtpbmRleF0pIHtcbiAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBvYmosIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICBcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldChmYWxzZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKVxuICAgIH1cbiAgfVxuICAvLyB0cmF2ZXJzZSB0aGUgc2NvcGUgY2hhaW4gdG8gZmluZCB0aGUgc2NvcGUgd2hpY2ggaGFzIHRoZSByb290IHByb3BlcnR5XG4gIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBub3QgZm91bmQgaW4gY2hhaW4sIHJldHVybnMgdGhlIHJvb3Qgc2NvcGVcbiAgZ2V0Um9vdE9iamVjdChvYmo6IE9iaikge1xuICAgIHZhciByb290UHJvcCwgY3VycmVudDtcbiAgICBpZiAoIW9iai4kcGFyZW50KSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMudG9rZW5zLmxlbmd0aCkge1xuICAgICAgcm9vdFByb3AgPSB0aGlzLnRva2Vuc1swXS5wYXRoXG4gICAgfSBlbHNlIHtcbiAgICAgIHJvb3RQcm9wID0gdGhpcy5rZXkucGF0aFxuICAgIH1cbiAgXG4gICAgY3VycmVudCA9IG9iajtcbiAgICB3aGlsZSAoY3VycmVudC4kcGFyZW50ICYmIChjdXJyZW50W3Jvb3RQcm9wXSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgY3VycmVudCA9IGN1cnJlbnQuJHBhcmVudFxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnQ7XG4gIH1cbn1cbiIsIi8qKlxuICogVXNlZCBhbHNvIGluIHBhcnNlcnMucGFyc2VUeXBlXG4gKiBUT0RPIG91dHNvdXJjZVxuICovXG5jb25zdCBQUklNSVRJVkUgPSAwO1xuY29uc3QgS0VZUEFUSCA9IDE7XG5cbmNvbnN0IFFVT1RFRF9TVFIgPSAvXicuKickfF5cIi4qXCIkLzsgLy8gcmVnZXggdG8gdGVzdCBpZiBzdHJpbmcgaXMgd3JhcHBlZCBpbiBcIiBvciAnXG5cbi8vIFVzZWQgaW4gcGFyc2Vycy5wYXJzZVRlbXBsYXRlXG5jb25zdCBURVhUID0gMDtcbmNvbnN0IEJJTkRJTkcgPSAxO1xuXG4vLyBUZXN0IGlmIHN0cmluZyBpcyBhIGpzb24gc3RyaW5nXG5leHBvcnQgZnVuY3Rpb24gaXNKc29uKHN0cjogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdmFsID0gSlNPTi5wYXJzZShzdHIpO1xuICAgIHJldHVybiAodmFsIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsIGluc3RhbmNlb2YgT2JqZWN0KSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gUGFyc2VyIGFuZCB0b2tlbml6ZXIgZm9yIGdldHRpbmcgdGhlIHR5cGUgYW5kIHZhbHVlIGZyb20gYSBzdHJpbmcuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUeXBlKHN0cmluZzogc3RyaW5nKSB7XG4gIGxldCB0eXBlID0gUFJJTUlUSVZFO1xuICBsZXQgdmFsdWU6IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkID0gc3RyaW5nO1xuICBpZiAoUVVPVEVEX1NUUi50ZXN0KHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IHN0cmluZy5zbGljZSgxLCAtMSk7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICB2YWx1ZSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAnZmFsc2UnKSB7XG4gICAgdmFsdWUgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdudWxsJykge1xuICAgIHZhbHVlID0gbnVsbDtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoIWlzTmFOKE51bWJlcihzdHJpbmcpKSkge1xuICAgIHZhbHVlID0gTnVtYmVyKHN0cmluZyk7XG4gIH0gZWxzZSBpZiAoaXNKc29uKHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IEpTT04ucGFyc2Uoc3RyaW5nKTtcbiAgfSBlbHNlIHtcbiAgICB0eXBlID0gS0VZUEFUSDtcbiAgfVxuICByZXR1cm4ge3R5cGU6IHR5cGUsIHZhbHVlOiB2YWx1ZX07XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJVG9rZW5zIHtcbiAgdHlwZTogbnVtYmVyO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG4vLyBUZW1wbGF0ZSBwYXJzZXIgYW5kIHRva2VuaXplciBmb3IgbXVzdGFjaGUtc3R5bGUgdGV4dCBjb250ZW50IGJpbmRpbmdzLlxuLy8gUGFyc2VzIHRoZSB0ZW1wbGF0ZSBhbmQgcmV0dXJucyBhIHNldCBvZiB0b2tlbnMsIHNlcGFyYXRpbmcgc3RhdGljIHBvcnRpb25zXG4vLyBvZiB0ZXh0IGZyb20gYmluZGluZyBkZWNsYXJhdGlvbnMuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCBkZWxpbWl0ZXJzOiBzdHJpbmdbXSkge1xuICB2YXIgdG9rZW5zOiBJVG9rZW5zW10gfCBudWxsID0gbnVsbDtcbiAgbGV0IGxlbmd0aCA9IHRlbXBsYXRlLmxlbmd0aDtcbiAgbGV0IGluZGV4ID0gMDtcbiAgbGV0IGxhc3RJbmRleCA9IDA7XG4gIGxldCBvcGVuID0gZGVsaW1pdGVyc1swXSwgY2xvc2UgPSBkZWxpbWl0ZXJzWzFdO1xuXG4gIHdoaWxlIChsYXN0SW5kZXggPCBsZW5ndGgpIHtcbiAgICBpbmRleCA9IHRlbXBsYXRlLmluZGV4T2Yob3BlbiwgbGFzdEluZGV4KTtcblxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIGlmICh0b2tlbnMpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbnMgPSB0b2tlbnMgfHwgW107XG4gICAgICBpZiAoaW5kZXggPiAwICYmIGxhc3RJbmRleCA8IGluZGV4KSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgIHZhbHVlOiB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgsIGluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyBvcGVuLmxlbmd0aDtcbiAgICAgIGluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihjbG9zZSwgbGFzdEluZGV4KTtcblxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBsZXQgc3Vic3RyaW5nID0gdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4IC0gY2xvc2UubGVuZ3RoKTtcbiAgICAgICAgbGV0IGxhc3RUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKGxhc3RUb2tlbiAmJiBsYXN0VG9rZW4udHlwZSA9PT0gVEVYVCkge1xuICAgICAgICAgIGxhc3RUb2tlbi52YWx1ZSArPSBzdWJzdHJpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICAgIHZhbHVlOiBzdWJzdHJpbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZXQgdmFsdWUgPSB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXgsIGluZGV4KS50cmltKCk7XG5cbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogQklORElORyxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyBjbG9zZS5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cbiIsImltcG9ydCB7IEVYVEVOU0lPTlMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBwYXJzZVRlbXBsYXRlLCBwYXJzZVR5cGUgfSBmcm9tICcuL3BhcnNlcnMnO1xuXG4vLyBUT0RPIG1vdmUgdG8gdWl0aWxzXG5jb25zdCBtZXJnZU9iamVjdCA9ICh0YXJnZXQ6IGFueSwgb2JqOiBhbnkpID0+IHtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XSA9PT0ge30pIHtcbiAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRhcmdldDsgXG59O1xuXG5jb25zdCB0aW55YmluZCA9IHtcbiAgLy8gR2xvYmFsIGJpbmRlcnMuXG4gIGJpbmRlcnM6IHt9LFxuXG4gIC8vIEdsb2JhbCBjb21wb25lbnRzLlxuICBjb21wb25lbnRzOiB7fSxcblxuICAvLyBHbG9iYWwgZm9ybWF0dGVycy5cbiAgZm9ybWF0dGVyczoge30sXG5cbiAgLy8gR2xvYmFsIHNpZ2h0Z2xhc3MgYWRhcHRlcnMuXG4gIGFkYXB0ZXJzOiB7fSxcblxuICAvLyBEZWZhdWx0IGF0dHJpYnV0ZSBwcmVmaXguXG4gIF9wcmVmaXg6ICdydicsXG5cbiAgX2Z1bGxQcmVmaXg6ICdydi0nLFxuXG4gIGdldCBwcmVmaXggKCkge1xuICAgIHJldHVybiB0aGlzLl9wcmVmaXg7XG4gIH0sXG5cbiAgc2V0IHByZWZpeCAodmFsdWUpIHtcbiAgICB0aGlzLl9wcmVmaXggPSB2YWx1ZTtcbiAgICB0aGlzLl9mdWxsUHJlZml4ID0gdmFsdWUgKyAnLSc7XG4gIH0sXG5cbiAgcGFyc2VUZW1wbGF0ZTogcGFyc2VUZW1wbGF0ZSxcblxuICBwYXJzZVR5cGU6IHBhcnNlVHlwZSxcblxuICAvLyBEZWZhdWx0IHRlbXBsYXRlIGRlbGltaXRlcnMuXG4gIHRlbXBsYXRlRGVsaW1pdGVyczogWyd7JywgJ30nXSxcblxuICAvLyBEZWZhdWx0IHNpZ2h0Z2xhc3Mgcm9vdCBpbnRlcmZhY2UuXG4gIHJvb3RJbnRlcmZhY2U6ICcuJyxcblxuICAvLyBQcmVsb2FkIGRhdGEgYnkgZGVmYXVsdC5cbiAgcHJlbG9hZERhdGE6IHRydWUsXG5cbiAgLy8gRGVmYXVsdCBldmVudCBoYW5kbGVyLlxuICBoYW5kbGVyOiBmdW5jdGlvbihjb250ZXh0LCBldiwgYmluZGluZykge1xuICAgIHRoaXMuY2FsbChjb250ZXh0LCBldiwgYmluZGluZy52aWV3Lm1vZGVscyk7XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgYXR0cmlidXRlIG9uIHRoZSBlbGVtZW50LiBJZiBubyBiaW5kZXIgYWJvdmUgaXMgbWF0Y2hlZCBpdCB3aWxsIGZhbGxcbiAgLy8gYmFjayB0byB1c2luZyB0aGlzIGJpbmRlci5cbiAgZmFsbGJhY2tCaW5kZXI6IGZ1bmN0aW9uKGVsLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUodGhpcy50eXBlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnR5cGUpO1xuICAgIH0gIFxuICB9LFxuXG4gIC8vIE1lcmdlcyBhbiBvYmplY3QgbGl0ZXJhbCBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIGdsb2JhbCBvcHRpb25zLlxuICBjb25maWd1cmU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBtZXJnZU9iamVjdCh0aGlzLmJpbmRlcnMsIG9wdGlvbnMuYmluZGVycyk7XG4gICAgLy8gbWVyZ2VPYmplY3QodGhpcy5mb3JtYXR0ZXJzLCBvcHRpb25zLmZvcm1hdHRlcnMpO1xuICAgIC8vIG1lcmdlT2JqZWN0KHRoaXMuY29tcG9uZW50cywgb3B0aW9ucy5jb21wb25lbnRzKTtcbiAgICAvLyBtZXJnZU9iamVjdCh0aGlzLmFkYXB0ZXJzLCBvcHRpb25zLmFkYXB0ZXJzKTtcblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IG9wdGlvbnNbb3B0aW9uXTtcblxuICAgICAgaWYgKEVYVEVOU0lPTlMuaW5kZXhPZihvcHRpb24pID4gLTEpIHtcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICB0aGlzW29wdGlvbl1ba2V5XSA9IHZhbHVlW2tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1tvcHRpb25dID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbnliaW5kO1xuIiwiaW1wb3J0IHRpbnliaW5kIGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHsgQmluZGVyLCBJVHdvV2F5QmluZGVyIH0gZnJvbSAnLi9iaW5kZXJzJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZyB9IGZyb20gJy4vY29tcG9uZW50LWJpbmRpbmcnO1xuaW1wb3J0IHsgcGFyc2VUZW1wbGF0ZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQgeyBJVmlld09wdGlvbnMgfSBmcm9tICcuL2V4cG9ydCc7XG4vLyBpbXBvcnQgeyBOb2RlIH0gZnJvbSAnYmFiZWwtdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBUQmxvY2sgPSBib29sZWFuO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBkYXRhPzogc3RyaW5nO1xuICBfYm91bmQ/OiBib29sZWFuXG59XG5cbmNvbnN0IHRleHRCaW5kZXI6IElUd29XYXlCaW5kZXI8c3RyaW5nPiA9IHtcbiAgcm91dGluZTogKG5vZGU6IElEYXRhRWxlbWVudCwgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIG5vZGUuZGF0YSA9ICh2YWx1ZSAhPSBudWxsKSA/IHZhbHVlIDogJyc7XG4gIH1cbn07XG5cbmNvbnN0IERFQ0xBUkFUSU9OX1NQTElUID0gLygoPzonW14nXSonKSooPzooPzpbXlxcfCddKig/OidbXiddKicpK1teXFx8J10qKSt8W15cXHxdKykpfF4kL2c7XG5cbmNvbnN0IHBhcnNlTm9kZSA9ICh2aWV3OiBWaWV3LCBub2RlOiBJRGF0YUVsZW1lbnQpID0+IHtcbiAgbGV0IGJsb2NrOiBUQmxvY2sgPSBmYWxzZTtcblxuICAvLyBpZiBub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERVxuICBub2RlID0gKCBub2RlIGFzIElEYXRhRWxlbWVudCk7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgaWYoIW5vZGUuZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub2RlIGhhcyBubyBkYXRhJyk7XG4gICAgfVxuICAgIGxldCB0b2tlbnMgPSBwYXJzZVRlbXBsYXRlKG5vZGUuZGF0YSwgdGlueWJpbmQudGVtcGxhdGVEZWxpbWl0ZXJzKTtcblxuICAgIGlmICh0b2tlbnMpIHtcbiAgICAgIGlmKCFub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZXh0LCBub2RlKTtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICB2aWV3LmJ1aWxkQmluZGluZyh0ZXh0LCBudWxsLCB0b2tlbi52YWx1ZSwgdGV4dEJpbmRlciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgYmxvY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICBibG9jayA9IHZpZXcudHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICBpZiAoIWJsb2NrKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhcnNlTm9kZSh2aWV3LCAobm9kZS5jaGlsZE5vZGVzW2ldIGFzIElEYXRhRWxlbWVudCkpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgYmluZGluZ0NvbXBhcmF0b3IgPSAoYTogQmluZGluZywgYjogQmluZGluZykgPT4ge1xuICBsZXQgYVByaW9yaXR5ID0gYS5iaW5kZXIgPyAoKGEuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55PikucHJpb3JpdHkgfHwgMCkgOiAwO1xuICBsZXQgYlByaW9yaXR5ID0gYi5iaW5kZXIgPyAoKGIuYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55PikucHJpb3JpdHkgfHwgMCkgOiAwO1xuICByZXR1cm4gYlByaW9yaXR5IC0gYVByaW9yaXR5O1xufTtcblxuY29uc3QgdHJpbVN0ciA9IChzdHI6IHN0cmluZykgPT4ge1xuICByZXR1cm4gc3RyLnRyaW0oKTtcbn07XG5cbi8vIEEgY29sbGVjdGlvbiBvZiBiaW5kaW5ncyBidWlsdCBmcm9tIGEgc2V0IG9mIHBhcmVudCBub2Rlcy5cbmV4cG9ydCBjbGFzcyBWaWV3IHtcblxuICBlbHM6IEhUTUxDb2xsZWN0aW9uIHwgRWxlbWVudFtdIHwgTm9kZVtdO1xuICBtb2RlbHM6IGFueTtcbiAgb3B0aW9uczogSVZpZXdPcHRpb25zO1xuICBiaW5kaW5nczogQmluZGluZ1tdID0gW107XG4gIGNvbXBvbmVudFZpZXc6IFZpZXcgfCBudWxsID0gbnVsbDtcblxuICAvLyBUaGUgRE9NIGVsZW1lbnRzIGFuZCB0aGUgbW9kZWwgb2JqZWN0cyBmb3IgYmluZGluZyBhcmUgcGFzc2VkIGludG8gdGhlXG4gIC8vIGNvbnN0cnVjdG9yIGFsb25nIHdpdGggYW55IGxvY2FsIG9wdGlvbnMgdGhhdCBzaG91bGQgYmUgdXNlZCB0aHJvdWdob3V0IHRoZVxuICAvLyBjb250ZXh0IG9mIHRoZSB2aWV3IGFuZCBpdCdzIGJpbmRpbmdzLlxuICBjb25zdHJ1Y3RvcihlbHM6IEhUTUxDb2xsZWN0aW9uIHwgRWxlbWVudCB8IE5vZGUsIG1vZGVsczogYW55LCBvcHRpb25zOiBJVmlld09wdGlvbnMpIHtcbiAgICBpZiAoZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZWxzID0gZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVscyA9IChbZWxzXSBhcyBFbGVtZW50W10gfCBOb2RlW10gKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGVscyA9IG1vZGVscztcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy5idWlsZCgpO1xuICB9XG5cbiAgcHVibGljIGJ1aWxkQmluZGluZyhub2RlOiBFbGVtZW50IHwgVGV4dCwgdHlwZTogc3RyaW5nIHwgbnVsbCwgZGVjbGFyYXRpb246IHN0cmluZywgYmluZGVyOiBCaW5kZXI8YW55PiwgYXJnczogc3RyaW5nW10gfCBudWxsKSB7XG4gICAgbGV0IG1hdGNoZXMgPSBkZWNsYXJhdGlvbi5tYXRjaChERUNMQVJBVElPTl9TUExJVCk7XG4gICAgaWYobWF0Y2hlcyA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBtYXRjaGVzJyk7XG4gICAgfVxuICAgIGxldCBwaXBlcyA9IG1hdGNoZXMubWFwKHRyaW1TdHIpO1xuICAgIGxldCBrZXlwYXRoID0gcGlwZXMuc2hpZnQoKTtcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IEJpbmRpbmcoKHRoaXMgYXMgVmlldyksIG5vZGUsIHR5cGUsIGtleXBhdGgsIGJpbmRlciwgYXJncywgcGlwZXMpKTtcbiAgfVxuXG4gIC8vIFBhcnNlcyB0aGUgRE9NIHRyZWUgYW5kIGJ1aWxkcyBgQmluZGluZ2AgaW5zdGFuY2VzIGZvciBldmVyeSBtYXRjaGVkXG4gIC8vIGJpbmRpbmcgZGVjbGFyYXRpb24uXG4gIGJ1aWxkKCkge1xuICAgIHRoaXMuYmluZGluZ3MgPSBbXTtcblxuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuZWxzLCBpLCBsZW47XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHBhcnNlTm9kZSh0aGlzLCAoZWxlbWVudHNbaV0gYXMgSURhdGFFbGVtZW50KSk7XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kaW5ncy5zb3J0KGJpbmRpbmdDb21wYXJhdG9yKTtcbiAgfVxuXG4gIHRyYXZlcnNlKG5vZGU6IElEYXRhRWxlbWVudCk6IFRCbG9jayB7XG4gICAgbGV0IGJpbmRpbmdQcmVmaXggPSB0aW55YmluZC5fZnVsbFByZWZpeDtcbiAgICBsZXQgYmxvY2sgPSBub2RlLm5vZGVOYW1lID09PSAnU0NSSVBUJyB8fCBub2RlLm5vZGVOYW1lID09PSAnU1RZTEUnO1xuICAgIGxldCBhdHRyaWJ1dGVzID0gbm9kZS5hdHRyaWJ1dGVzO1xuICAgIGxldCBiaW5kSW5mb3MgPSBbXTtcbiAgICBsZXQgc3RhckJpbmRlcnMgPSB0aGlzLm9wdGlvbnMuc3RhckJpbmRlcnM7XG4gICAgdmFyIHR5cGUsIGJpbmRlciwgaWRlbnRpZmllciwgYXJncztcblxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgLy8gaWYgYXR0cmlidXRlIHN0YXJ0cyB3aXRoIHRoZSBiaW5kaW5nIHByZWZpeC4gRS5nLiBydlxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YoYmluZGluZ1ByZWZpeCkgPT09IDApIHtcbiAgICAgICAgdHlwZSA9IGF0dHJpYnV0ZS5uYW1lLnNsaWNlKGJpbmRpbmdQcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbdHlwZV07XG4gICAgICAgIGFyZ3MgPSBbXTtcblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc3RhckJpbmRlcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgIGlkZW50aWZpZXIgPSBzdGFyQmluZGVyc1trXTtcbiAgICAgICAgICAgIGlmICh0eXBlLnNsaWNlKDAsIGlkZW50aWZpZXIubGVuZ3RoIC0gMSkgPT09IGlkZW50aWZpZXIuc2xpY2UoMCwgLTEpKSB7XG4gICAgICAgICAgICAgIGJpbmRlciA9IHRoaXMub3B0aW9ucy5iaW5kZXJzW2lkZW50aWZpZXJdO1xuICAgICAgICAgICAgICBhcmdzLnB1c2godHlwZS5zbGljZShpZGVudGlmaWVyLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFiaW5kZXIpIHtcbiAgICAgICAgICBiaW5kZXIgPSB0aW55YmluZC5mYWxsYmFja0JpbmRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoYmluZGVyIGFzIElUd29XYXlCaW5kZXI8YW55PikuYmxvY2spIHtcbiAgICAgICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCB0eXBlLCBhdHRyaWJ1dGUudmFsdWUsIGJpbmRlciwgYXJncyk7XG4gICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYmluZEluZm9zLnB1c2goe2F0dHI6IGF0dHJpYnV0ZSwgYmluZGVyOiBiaW5kZXIsIHR5cGU6IHR5cGUsIGFyZ3M6IGFyZ3N9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpbmRJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJpbmRJbmZvID0gYmluZEluZm9zW2ldO1xuICAgICAgdGhpcy5idWlsZEJpbmRpbmcobm9kZSwgYmluZEluZm8udHlwZSwgYmluZEluZm8uYXR0ci52YWx1ZSwgYmluZEluZm8uYmluZGVyLCBiaW5kSW5mby5hcmdzKTtcbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGJpbmRJbmZvLmF0dHIubmFtZSk7XG4gICAgfVxuXG4gICAgLy8gYmluZCBjb21wb25lbnRzXG4gICAgaWYgKCFibG9jaykge1xuICAgICAgdHlwZSA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb21wb25lbnRzW3R5cGVdICYmICFub2RlLl9ib3VuZCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdzLnB1c2gobmV3IENvbXBvbmVudEJpbmRpbmcoKHRoaXMgYXMgVmlldyksIG5vZGUsIHR5cGUpKTtcbiAgICAgICAgYmxvY2sgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBibG9jaztcbiAgfVxuXG4gIC8vIEJpbmRzIGFsbCBvZiB0aGUgY3VycmVudCBiaW5kaW5ncyBmb3IgdGhpcyB2aWV3LlxuICBiaW5kKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGJpbmRpbmcuYmluZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVW5iaW5kcyBhbGwgb2YgdGhlIGN1cnJlbnQgYmluZGluZ3MgZm9yIHRoaXMgdmlldy5cbiAgdW5iaW5kKCkge1xuICAgIGlmKEFycmF5LmlzQXJyYXkodGhpcy5iaW5kaW5ncykpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgYmluZGluZy51bmJpbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZih0aGlzLmNvbXBvbmVudFZpZXcpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50Vmlldy51bmJpbmQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBTeW5jcyB1cCB0aGUgdmlldyB3aXRoIHRoZSBtb2RlbCBieSBydW5uaW5nIHRoZSByb3V0aW5lcyBvbiBhbGwgYmluZGluZ3MuXG4gIHN5bmMoKSB7XG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgYmluZGluZy5zeW5jKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBQdWJsaXNoZXMgdGhlIGlucHV0IHZhbHVlcyBmcm9tIHRoZSB2aWV3IGJhY2sgdG8gdGhlIG1vZGVsIChyZXZlcnNlIHN5bmMpLlxuICBwdWJsaXNoKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGlmIChiaW5kaW5nLmJpbmRlciAmJiAoYmluZGluZy5iaW5kZXIgYXMgSVR3b1dheUJpbmRlcjxhbnk+KS5wdWJsaXNoZXMpIHtcbiAgICAgICAgYmluZGluZy5wdWJsaXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBVcGRhdGVzIHRoZSB2aWV3J3MgbW9kZWxzIGFsb25nIHdpdGggYW55IGFmZmVjdGVkIGJpbmRpbmdzLlxuICB1cGRhdGUobW9kZWxzOiBhbnkgPSB7fSkge1xuICAgIE9iamVjdC5rZXlzKG1vZGVscykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5tb2RlbHNba2V5XSA9IG1vZGVsc1trZXldO1xuICAgIH0pO1xuXG4gICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgaWYgKGJpbmRpbmcudXBkYXRlKSB7XG4gICAgICAgIGJpbmRpbmcudXBkYXRlKG1vZGVscyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=