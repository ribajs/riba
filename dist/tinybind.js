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

function createView(binding, models, anchorEl) {
  var template = binding.el.cloneNode(true);
  var view = new _view.default(template, models, binding.view.options);
  view.bind();

  if (binding.marker.parentNode === null) {
    throw new Error('No parent node for binding!');
  }

  binding.marker.parentNode.insertBefore(template, anchorEl);
  return view;
}

var binders
/* TODO IBinders */
= {
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
          var previous = _this.marker;

          if (_this.customData.iterated.length) {
            previous = _this.customData.iterated[_this.customData.iterated.length - 1].els[0];
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

              if (!_this.marker.parentNode) {
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

          if (!_this.marker.parentNode) {
            throw new Error('Marker has no parent node');
          }

          _this.marker.parentNode.removeChild(view.els[0]);
        });
      }

      if (el.nodeName === 'OPTION' && this.view.bindings) {
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
      this.customData.iterated.forEach(function (view) {
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
            this.customData.nested = new _view.default(el, this.view.models, this.view.options);
            this.customData.nested.bind();
          }

          if (!this.marker.parentNode) {
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

var _observer = __webpack_require__(/*! ./observer */ "./src/observer.ts");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aW55YmluZC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vdGlueWJpbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvYWRhcHRlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9iaW5kZXJzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2JpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29tcG9uZW50LWJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGlueWJpbmQvLi9zcmMvY29uc3RhbnRzLnRzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL2V4cG9ydC50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9vYnNlcnZlci50cyIsIndlYnBhY2s6Ly90aW55YmluZC8uL3NyYy9wYXJzZXJzLmpzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3RpbnliaW5kLmpzIiwid2VicGFjazovL3RpbnliaW5kLy4vc3JjL3ZpZXcuanMiXSwibmFtZXMiOlsiQVJSQVlfTUVUSE9EUyIsIkFkYXB0ZXIiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwiY291bnRlciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3ZWFrbWFwIiwiX19ydiIsImNhbGxiYWNrcyIsInJlZiIsImtleXMiLCJsZW5ndGgiLCJwb2ludGVycyIsImZuIiwib3JpZ2luYWwiLCJtYXAiLCJ3ZWFrUmVmZXJlbmNlIiwiYXJncyIsInJlc3BvbnNlIiwiYXBwbHkiLCJmb3JFYWNoIiwiayIsInIiLCJBcnJheSIsImNhbGxiYWNrIiwic3luYyIsImtleXBhdGgiLCJzdHViRnVuY3Rpb24iLCJpbmRleE9mIiwicHVzaCIsImlkeCIsInNwbGljZSIsImNsZWFudXBXZWFrUmVmZXJlbmNlIiwiZGVzYyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsInNldCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJuZXdWYWx1ZSIsInVub2JzZXJ2ZU11dGF0aW9ucyIsImNiIiwib2JzZXJ2ZU11dGF0aW9ucyIsImFkYXB0ZXIiLCJnZXRTdHJpbmciLCJ0b1N0cmluZyIsInVuZGVmaW5lZCIsInRpbWVzIiwibiIsImkiLCJjcmVhdGVWaWV3IiwiYmluZGluZyIsIm1vZGVscyIsImFuY2hvckVsIiwidGVtcGxhdGUiLCJlbCIsImNsb25lTm9kZSIsInZpZXciLCJWaWV3Iiwib3B0aW9ucyIsImJpbmQiLCJtYXJrZXIiLCJwYXJlbnROb2RlIiwiRXJyb3IiLCJpbnNlcnRCZWZvcmUiLCJiaW5kZXJzIiwiZnVuY3Rpb24iLCJwcmlvcml0eSIsImN1c3RvbURhdGEiLCJoYW5kbGVyIiwidW5iaW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJvdXRpbmUiLCJldmVudEhhbmRsZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiYmxvY2siLCJkb2N1bWVudCIsImNyZWF0ZUNvbW1lbnQiLCJ0eXBlIiwiaXRlcmF0ZWQiLCJyZW1vdmVDaGlsZCIsImNvbGxlY3Rpb24iLCJtb2RlbE5hbWUiLCJpc0FycmF5IiwiaW5kZXhQcm9wIiwiZ2V0QXR0cmlidXRlIiwiZ2V0SXRlcmF0aW9uQWxpYXMiLCJtb2RlbCIsImluZGV4Iiwic2NvcGUiLCIkcGFyZW50IiwicHJldmlvdXMiLCJlbHMiLCJuZXh0U2libGluZyIsIm1hdGNoSW5kZXgiLCJuZXh0VmlldyIsIm5leHRJbmRleCIsInBvcCIsIm5vZGVOYW1lIiwiYmluZGluZ3MiLCJ1cGRhdGUiLCJkYXRhIiwia2V5IiwiZWxDbGFzcyIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJ0cmltIiwidGV4dCIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiZW5hYmxlZCIsImRpc2FibGVkIiwiY2hlY2tlZCIsInB1Ymxpc2hlcyIsInNlbGYiLCJwdWJsaXNoIiwiaXNSYWRpbyIsInRhZ05hbWUiLCJldmVudCIsInNldEF0dHJpYnV0ZSIsIkhUTUxTZWxlY3RFbGVtZW50Iiwib3B0aW9uIiwic2VsZWN0ZWQiLCJpZiIsImF0dGFjaGVkIiwiYm91bmQiLCJuZXN0ZWQiLCJnZXRJbnB1dFZhbHVlIiwicmVzdWx0cyIsIkZPUk1BVFRFUl9BUkdTIiwiRk9STUFUVEVSX1NQTElUIiwiUFJJTUlUSVZFIiwiS0VZUEFUSCIsIkJpbmRpbmciLCJiaW5kZXIiLCJmb3JtYXR0ZXJzIiwiZm9ybWF0dGVyT2JzZXJ2ZXJzIiwiT2JzZXJ2ZXIiLCJ0b2tlbiIsIm9ic2VydmVyIiwib2JzZXJ2ZSIsInRhcmdldCIsImZvcm1hdHRlckluZGV4IiwicGFyc2VUeXBlIiwiYWkiLCJyZWR1Y2UiLCJyZXN1bHQiLCJkZWNsYXJhdGlvbiIsIm1hdGNoIiwic2hpZnQiLCJmb3JtYXR0ZXIiLCJwcm9jZXNzZWRBcmdzIiwicGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMiLCJyZWFkIiwiRnVuY3Rpb24iLCJldiIsImNhbGwiLCJmb3JtYXR0ZWRWYWx1ZSIsInJvdXRpbmVGbiIsInJlZHVjZVJpZ2h0Iiwic3BsaXQiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwicGFyc2VUYXJnZXQiLCJwcmVsb2FkRGF0YSIsInVub2JzZXJ2ZSIsImZpIiwiQ29tcG9uZW50QmluZGluZyIsImNvbXBvbmVudCIsImNvbXBvbmVudHMiLCJzdGF0aWMiLCJvYnNlcnZlcnMiLCJ1cHN0cmVhbU9ic2VydmVycyIsImJpbmRpbmdQcmVmaXgiLCJ0aW55YmluZCIsIl9mdWxsUHJlZml4IiwibGVuIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsIm5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJjYW1lbENhc2UiLCJzdGF0Iiwic3RyaW5nIiwiZ3JvdXBlZCIsInRvVXBwZXJDYXNlIiwiY29tcG9uZW50VmlldyIsImluaXRpYWxpemUiLCJsb2NhbHMiLCJfYm91bmQiLCJFWFRFTlNJT05TIiwiZXh0ZW5zaW9uVHlwZSIsIk9QVElPTlMiLCJwcm90b3R5cGUiLCJzbGljZSIsImNoaWxkTm9kZXMiLCJ1cHN0cmVhbSIsImFkYXB0ZXJzIiwibWVyZ2VPYmplY3QiLCJ2aWV3T3B0aW9ucyIsImNyZWF0ZSIsInN0YXJCaW5kZXJzIiwicm9vdEludGVyZmFjZSIsInByZWZpeCIsInRlbXBsYXRlRGVsaW1pdGVycyIsImZpbHRlciIsInVwZGF0ZU9wdGlvbnMiLCJpbml0IiwiY29tcG9uZW50S2V5IiwiY3JlYXRlRWxlbWVudCIsIm5lZ2F0ZSIsIm5vdCIsImlzT2JqZWN0IiwiZXJyb3IiLCJtZXNzYWdlIiwiaW50ZXJmYWNlcyIsIm9iamVjdFBhdGgiLCJwYXJzZVJlc3VsdCIsInBhcnNlIiwidG9rZW5zIiwiZ2V0Um9vdE9iamVjdCIsInJlYWxpemUiLCJwYXRoIiwicm9vdCIsInN1YnN0ciIsInRva2VuaXplIiwiY3VycmVudCIsInVucmVhY2hlZCIsInByZXYiLCJuZXh0Iiwib2xkVmFsdWUiLCJhY3RpdmUiLCJyb290UHJvcCIsImNociIsImNoYXJBdCIsIlFVT1RFRF9TVFIiLCJURVhUIiwiQklORElORyIsImlzSnNvbiIsInN0ciIsInZhbCIsIkpTT04iLCJ0ZXN0IiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZVRlbXBsYXRlIiwiZGVsaW1pdGVycyIsImxhc3RJbmRleCIsIm9wZW4iLCJjbG9zZSIsInN1YnN0cmluZyIsImxhc3RUb2tlbiIsIl9wcmVmaXgiLCJjb250ZXh0IiwiZmFsbGJhY2tCaW5kZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb25maWd1cmUiLCJ0ZXh0QmluZGVyIiwibm9kZSIsIkRFQ0xBUkFUSU9OX1NQTElUIiwicGFyc2VOb2RlIiwibm9kZVR5cGUiLCJjcmVhdGVUZXh0Tm9kZSIsImJ1aWxkQmluZGluZyIsInRyYXZlcnNlIiwiYmluZGluZ0NvbXBhcmF0b3IiLCJhIiwiYiIsImFQcmlvcml0eSIsImJQcmlvcml0eSIsInRyaW1TdHIiLCJqcXVlcnkiLCJidWlsZCIsInBpcGVzIiwiZWxlbWVudHMiLCJzb3J0IiwiYmluZEluZm9zIiwiaWRlbnRpZmllciIsImF0dHIiLCJiaW5kSW5mbyIsInRvTG93ZXJDYXNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxnQkFBZ0IsQ0FDcEIsTUFEb0IsRUFFcEIsS0FGb0IsRUFHcEIsT0FIb0IsRUFJcEIsU0FKb0IsRUFLcEIsTUFMb0IsRUFNcEIsU0FOb0IsRUFPcEIsUUFQb0IsQ0FBdEI7O0lBd0NhQyxPOzs7Ozs7cUNBQ08sQzs7cUNBQ0osRTs7Ozs7a0NBRUFDLEcsRUFBVTtBQUN0QixVQUFJLENBQUNBLElBQUlDLGNBQUosQ0FBbUIsTUFBbkIsQ0FBTCxFQUFpQztBQUMvQixZQUFJQyxLQUFLLEtBQUtDLE9BQUwsRUFBVDtB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bUJ6SCxNQUFuQjtBQUNEO0FBQ0YsSyxDQUVEOzs7OzJCQUNPO0FBQ0wsV0FBSzZCLFFBQUwsQ0FBYy9FLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IrQixnQkFBUTFCLElBQVI7QUFDRCxPQUZEO0FBR0QsSyxDQUVEOzs7OzhCQUNVO0FBQ1IsV0FBSzBFLFFBQUwsQ0FBYy9FLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IsWUFBSStCLFFBQVF3RixNQUFSLElBQWtCeEYsUUFBUXdGLE1BQVIsQ0FBZXJCLFNBQXJDLEVBQWdEO0FBQzlDbkUsa0JBQVFxRSxPQUFSO0FBQ0Q7QUFDRixPQUpEO0FBS0QsSyxDQUVEOzs7OzZCQUNvQjtBQUFBOztBQUFBLFVBQWJwRSxNQUFhLHVFQUFKLEVBQUk7QUFDbEJqRCxhQUFPTyxJQUFQLENBQVkwQyxNQUFaLEVBQW9CaEMsT0FBcEIsQ0FBNEIsZUFBTztBQUNqQyxjQUFLZ0MsTUFBTCxDQUFZa0QsR0FBWixJQUFtQmxELE9BQU9rRCxHQUFQLENBQW5CO0FBQ0QsT0FGRDtBQUlBLFdBQUtILFFBQUwsQ0FBYy9FLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0IsWUFBSStCLFFBQVFpRCxNQUFaLEVBQW9CO0FBQ2xCakQsa0JBQVFpRCxNQUFSLENBQWVoRCxNQUFmO0FBQ0Q7QUFDRixPQUpEO0FBS0QiLCJmaWxlIjoidGlueWJpbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0aW55YmluZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0aW55YmluZFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZXhwb3J0LnRzXCIpO1xuIiwiaW1wb3J0IHsgSUNhbGxiYWNrIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5cbi8vIFRoZSBkZWZhdWx0IGAuYCBhZGFwdGVyIHRoYXQgY29tZXMgd2l0aCB0aW55YmluZC5qcy4gQWxsb3dzIHN1YnNjcmliaW5nIHRvXG4vLyBwcm9wZXJ0aWVzIG9uIHBsYWluIG9iamVjdHMsIGltcGxlbWVudGVkIGluIEVTNSBuYXRpdmVzIHVzaW5nXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YC5cblxuY29uc3QgQVJSQVlfTUVUSE9EUyA9IFtcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJyxcbiAgJ3NwbGljZSdcbl07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVJlZiB7XG4gIGNhbGxiYWNrczogYW55W107XG4gIHBvaW50ZXJzOiBhbnlbXTtcbn1cblxuLy8gVE9ETyB3aGF0IHRoZSBoZWxsPyFcbmV4cG9ydCBpbnRlcmZhY2UgSVJWQXJyYXkgZXh0ZW5kcyBBcnJheTxhbnk+IHtcbiAgX19ydjogYW55O1xufVxuXG5leHBvcnQgdHlwZSBBZGFwdGVyRnVuY3Rpb24gPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBJQWRhcHRlciB7XG4gIGNvdW50ZXI6IG51bWJlcjtcbiAgd2Vha21hcDogYW55O1xuICB3ZWFrUmVmZXJlbmNlOiAob2JqOiBhbnkpID0+IGFueTsgLy8gPT4gX19ydiA/XG4gIGNsZWFudXBXZWFrUmVmZXJlbmNlOiAocmVmOiBJUmVmLCBpZDogbnVtYmVyKSA9PiB2b2lkO1xuICBzdHViRnVuY3Rpb246IChvYmo6IGFueSwgZm46IHN0cmluZykgPT4gYW55IC8vID0+IHJlc3BvbnNlID9cbiAgb2JzZXJ2ZU11dGF0aW9uczogKG9iajogYW55LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICB1bm9ic2VydmVNdXRhdGlvbnM6IChvYmo6IElSVkFycmF5LCByZWY6IHN0cmluZywga2V5cGF0aDogc3RyaW5nKSA9PiB2b2lkO1xuICBvYnNlcnZlOiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElDYWxsYmFjaykgPT4gdm9pZDsgXG4gIHVub2JzZXJ2ZTogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJQ2FsbGJhY2spID0+IHZvaWQ7XG4gIGdldDogKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcpID0+IGFueTtcbiAgc2V0OiAob2JqOiBhbnksIGtleXBhdGg6IHN0cmluZywgdmFsdWU6IGFueSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQWRhcHRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogSUFkYXB0ZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGFwdGVyIGltcGxlbWVudHMgSUFkYXB0ZXIge1xuICBjb3VudGVyOiBudW1iZXIgPSAwO1xuICB3ZWFrbWFwOmFueSA9IHt9O1xuXG4gIHdlYWtSZWZlcmVuY2Uob2JqOiBhbnkpIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eSgnX19ydicpKSB7XG4gICAgICBsZXQgaWQgPSB0aGlzLmNvdW50ZXIrKztcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ19fcnYnLCB7XG4gICAgICAgIHZhbHVlOiBpZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndlYWttYXBbb2JqLl9fcnZdKSB7XG4gICAgICB0aGlzLndlYWttYXBbb2JqLl9fcnZdID0ge1xuICAgICAgICBjYWxsYmFja3M6IHt9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuICB9XG5cbiAgY2xlYW51cFdlYWtSZWZlcmVuY2UocmVmOiBJUmVmLCBpZDogbnVtYmVyKSB7XG4gICAgaWYgKCFPYmplY3Qua2V5cyhyZWYuY2FsbGJhY2tzKS5sZW5ndGgpIHtcbiAgICAgIGlmICghKHJlZi5wb2ludGVycyAmJiBPYmplY3Qua2V5cyhyZWYucG9pbnRlcnMpLmxlbmd0aCkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMud2Vha21hcFtpZF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3R1YkZ1bmN0aW9uKG9iajogYW55LCBmbjogc3RyaW5nKSB7XG4gICAgbGV0IG9yaWdpbmFsID0gb2JqW2ZuXTtcbiAgICBsZXQgbWFwID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaik7XG4gICAgbGV0IHdlYWttYXAgPSB0aGlzLndlYWttYXA7XG5cbiAgICBvYmpbZm5dID0gKC4uLmFyZ3M6IGFueVtdKTogQWRhcHRlckZ1bmN0aW9uID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IG9yaWdpbmFsLmFwcGx5KG9iaiwgYXJncyk7XG5cbiAgICAgIE9iamVjdC5rZXlzKG1hcC5wb2ludGVycykuZm9yRWFjaChyID0+IHtcbiAgICAgICAgbGV0IGsgPSBtYXAucG9pbnRlcnNbcl07XG5cbiAgICAgICAgaWYgKHdlYWttYXBbcl0pIHtcbiAgICAgICAgICBpZiAod2Vha21hcFtyXS5jYWxsYmFja3Nba10gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgd2Vha21hcFtyXS5jYWxsYmFja3Nba10uZm9yRWFjaCgoY2FsbGJhY2s6IElDYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjay5zeW5jKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcbiAgfVxuXG4gIG9ic2VydmVNdXRhdGlvbnMob2JqOiBhbnksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWtSZWZlcmVuY2Uob2JqKTtcblxuICAgICAgaWYgKCFtYXAucG9pbnRlcnMpIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzID0ge307XG5cbiAgICAgICAgQVJSQVlfTUVUSE9EUy5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICB0aGlzLnN0dWJGdW5jdGlvbihvYmosIGZuKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWFwLnBvaW50ZXJzW3JlZl0pIHtcbiAgICAgICAgbWFwLnBvaW50ZXJzW3JlZl0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hcC5wb2ludGVyc1tyZWZdLmluZGV4T2Yoa2V5cGF0aCkgPT09IC0xKSB7XG4gICAgICAgIG1hcC5wb2ludGVyc1tyZWZdLnB1c2goa2V5cGF0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdW5vYnNlcnZlTXV0YXRpb25zKG9iajogSVJWQXJyYXksIHJlZjogc3RyaW5nLCBrZXlwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAoKG9iaiBpbnN0YW5jZW9mIEFycmF5KSAmJiAob2JqLl9fcnYgIT0gbnVsbCkpIHtcbiAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICBpZiAobWFwKSB7XG4gICAgICAgIGxldCBwb2ludGVycyA9IG1hcC5wb2ludGVyc1tyZWZdO1xuXG4gICAgICAgIGlmIChwb2ludGVycykge1xuICAgICAgICAgIGxldCBpZHggPSBwb2ludGVycy5pbmRleE9mKGtleXBhdGgpO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICBwb2ludGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBvaW50ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5wb2ludGVyc1tyZWZdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY2xlYW51cFdlYWtSZWZlcmVuY2UobWFwLCBvYmouX19ydik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvYnNlcnZlKG9iajogYW55LCBrZXlwYXRoOiBzdHJpbmcsIGNhbGxiYWNrOiBJQ2FsbGJhY2spIHtcbiAgICB2YXIgdmFsdWU6IGFueTtcbiAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy53ZWFrUmVmZXJlbmNlKG9iaikuY2FsbGJhY2tzO1xuXG4gICAgaWYgKCFjYWxsYmFja3Nba2V5cGF0aF0pIHtcbiAgICAgIGNhbGxiYWNrc1trZXlwYXRoXSA9IFtdO1xuICAgICAgbGV0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5cGF0aCk7XG5cbiAgICAgIGlmICghZGVzYyB8fCAhKGRlc2MuZ2V0IHx8IGRlc2Muc2V0IHx8ICFkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgICAgdmFsdWUgPSBvYmpba2V5cGF0aF07XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5cGF0aCwge1xuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG5cbiAgICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgc2V0OiBuZXdWYWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHRoaXMudW5vYnNlcnZlTXV0YXRpb25zKHZhbHVlLCBvYmouX19ydiwga2V5cGF0aCk7XG4gICAgICAgICAgICAgIHZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgIGxldCBtYXAgPSB0aGlzLndlYWttYXBbb2JqLl9fcnZdO1xuXG4gICAgICAgICAgICAgIGlmIChtYXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKChjYjogSUNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNiLnN5bmMoKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub2JzZXJ2ZU11dGF0aW9ucyhuZXdWYWx1ZSwgb2JqLl9fcnYsIGtleXBhdGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2tzW2tleXBhdGhdLmluZGV4T2YoY2FsbGJhY2spID09PSAtMSkge1xuICAgICAgY2FsbGJhY2tzW2tleXBhdGhdLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHRoaXMub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgfVxuXG4gIHVub2JzZXJ2ZShvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCBjYWxsYmFjazogSUNhbGxiYWNrKSB7XG4gICAgbGV0IG1hcCA9IHRoaXMud2Vha21hcFtvYmouX19ydl07XG5cbiAgICBpZiAobWFwKSB7XG4gICAgICBsZXQgY2FsbGJhY2tzID0gbWFwLmNhbGxiYWNrc1trZXlwYXRoXTtcblxuICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICBsZXQgaWR4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuXG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgICAgIGlmICghY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIG1hcC5jYWxsYmFja3Nba2V5cGF0aF07XG4gICAgICAgICAgICB0aGlzLnVub2JzZXJ2ZU11dGF0aW9ucyhvYmpba2V5cGF0aF0sIG9iai5fX3J2LCBrZXlwYXRoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFudXBXZWFrUmVmZXJlbmNlKG1hcCwgb2JqLl9fcnYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG9ialtrZXlwYXRoXTtcbiAgfVxuXG4gIHNldChvYmo6IGFueSwga2V5cGF0aDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgb2JqW2tleXBhdGhdID0gdmFsdWU7XG4gIH1cbn07XG5cbmNvbnN0IGFkYXB0ZXIgPSBuZXcgQWRhcHRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBhZGFwdGVyO1xuIiwiaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3JztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAnLi9vYnNlcnZlcic7XG5pbXBvcnQgeyBJVmlldyB9IGZyb20gJy4uL2luZGV4JztcblxuZXhwb3J0IGludGVyZmFjZSBJQmluZGluZyB7XG4gIHZpZXc6IFZpZXc7XG4gIGVsOiBIVE1MRWxlbWVudDtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGJpbmRlciB3aXRob3V0IHRoZSBwcmVmaXhcbiAgICovXG4gIHR5cGU6IHN0cmluZztcbiAgYmluZGVyOiBCaW5kZXI8YW55PjtcbiAgZm9ybWF0dGVyczogc3RyaW5nW107XG4gIGZvcm1hdHRlck9ic2VydmVyczogYW55W107XG4gIGtleXBhdGg6IHN0cmluZztcbiAgLyoqXG4gICAqIEFyZ3VtZW50cyBwYXJzZWQgZnJvbSBzdGFyIGJpbmRlcnMsIGUuZy4gb24gZm9vLSotKiBhcmdzWzBdIGlzIHRoZSBmaXJzdCBzdGFyLCBhcmdzWzFdIHRoZSBzZWNvbmQtXG4gICAqL1xuICBhcmdzOiBzdHJpbmdbXTtcbiAgLyoqXG4gICAqIFxuICAgKi9cbiAgbW9kZWw/OiBhbnk7XG4gIC8qKlxuICAgKiBIVE1MIENvbW1lbnQgdG8gbWFyayBhIGJpbmRpbmcgaW4gdGhlIERPTVxuICAgKi9cbiAgbWFya2VyOiBDb21tZW50O1xuICAvKipcbiAgICoganVzdCB0byBoYXZlIGEgdmFsdWUgd2hlcmUgd2UgY291bGQgc3RvcmUgY3VzdG9tIGRhdGFcbiAgICovXG4gIGN1c3RvbURhdGE/OiBhbnk7XG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIHRoZSBtb2RlbCBmb3IgY2hhbmdlcyBhdCB0aGUgc3BlY2lmaWVkIGtleXBhdGguIEJpLWRpcmVjdGlvbmFsXG4gICAqIHJvdXRpbmVzIHdpbGwgYWxzbyBsaXN0ZW4gZm9yIGNoYW5nZXMgb24gdGhlIGVsZW1lbnQgdG8gcHJvcGFnYXRlIHRoZW0gYmFja1xuICAgKiB0byB0aGUgbW9kZWwuXG4gICAqL1xuICBiaW5kOiAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBiaW5kaW5nIGFyb3VuZCB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICAqL1xuICBldmVudEhhbmRsZXI6IChoYW5kbGVyOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkKSA9PiAoKSA9PiBhbnk7XG4gIC8qKlxuICAgKiBBcHBsaWVzIGFsbCB0aGUgY3VycmVudCBmb3JtYXR0ZXJzIHRvIHRoZSBzdXBwbGllZCB2YWx1ZSBhbmQgcmV0dXJucyB0aGVcbiAgICogZm9ybWF0dGVkIHZhbHVlLlxuICAgKi9cbiAgZm9ybWF0dGVkVmFsdWU6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xuICAvKipcbiAgICogUmV0dXJucyBlbGVtZW50cyB2YWx1ZVxuICAgKi9cbiAgZ2V0VmFsdWU/OiAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG5cbiAgcGFyc2VGb3JtYXR0ZXJBcmd1bWVudHM6IChhcmdzOiBhbnksIGZvcm1hdHRlckluZGV4OiBudW1iZXIpID0+IGFueTtcblxuICBwYXJzZVRhcmdldDogKCkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIFB1Ymxpc2hlcyB0aGUgdmFsdWUgY3VycmVudGx5IHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudCBiYWNrIHRvIHRoZSBtb2RlbC5cbiAgICovXG4gIHB1Ymxpc2g6ICgpID0+IGFueSB8IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBmb3IgdGhlIGJpbmRpbmcuIFRoaXMgQmFzaWNhbGx5IGp1c3QgcnVucyB0aGUgYmluZGluZyByb3V0aW5lXG4gICAqIHdpdGggdGhlIHN1cHBsaWVkIHZhbHVlIGZvcm1hdHRlZC5cbiAgICovXG4gIHNldDogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBTeW5jcyB1cCB0aGUgdmlldyBiaW5kaW5nIHdpdGggdGhlIG1vZGVsLlxuICAgKi9cbiAgc3luYzogKCkgPT4gdm9pZDtcbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHRoZSBtb2RlbCBhbmQgdGhlIGVsZW1lbnQuXG4gICAqL1xuICB1bmJpbmQ6ICgpID0+IHZvaWQ7XG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBiaW5kaW5nJ3MgbW9kZWwgZnJvbSB3aGF0IGlzIGN1cnJlbnRseSBzZXQgb24gdGhlIHZpZXcuIFVuYmluZHNcbiAgICogdGhlIG9sZCBtb2RlbCBmaXJzdCBhbmQgdGhlbiByZS1iaW5kcyB3aXRoIHRoZSBuZXcgbW9kZWwuXG4gICAqL1xuICAvL3VwZGF0ZTogKG1vZGVsczogYW55KSA9PiB2b2lkO1xuICB1cGRhdGU6IChtb2RlbDogYW55KSA9PiB2b2lkO1xuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhlIG9iamVjdCBrZXlwYXRoXG4gICAqL1xuICBvYnNlcnZlOiAob2JqOiBPYmplY3QsIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IChuZXdWYWx1ZTogYW55KSA9PiB2b2lkKSA9PiBPYnNlcnZlcjtcbiAgXG4gIC8qKlxuICAgKiBHZXQgdGhlIGl0ZXJhdGlvbiBhbGlhcywgdXNlZCBpbiB0aGUgaW50ZXJhdGlvbiBiaW5kZXJzIGxpa2UgYGVhY2gtKmBcbiAgICovXG4gIGdldEl0ZXJhdGlvbkFsaWFzOiAobW9kZWxOYW1lOiBzdHJpbmcpID0+IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT25lV2F5QmluZGVyPFZhbHVlVHlwZT4ge1xuICAodGhpczogSUJpbmRpbmcsIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2YWx1ZTogVmFsdWVUeXBlKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVHdvV2F5QmluZGVyPFZhbHVlVHlwZT4ge1xuICByb3V0aW5lPzogKHRoaXM6IElCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCwgdmFsdWU6IFZhbHVlVHlwZSkgPT4gdm9pZDtcbiAgYmluZDogKHRoaXM6IElCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgdW5iaW5kPzogKHRoaXM6IElCaW5kaW5nLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcbiAgdXBkYXRlPzogKHRoaXM6IElCaW5kaW5nLCBtb2RlbDogYW55KSA9PiB2b2lkO1xuICBnZXRWYWx1ZT86ICh0aGlzOiBJQmluZGluZywgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gIGJsb2NrPzogYm9vbGVhbjtcbiAgZnVuY3Rpb24/OiBib29sZWFuO1xuICBwdWJsaXNoZXM/OiBib29sZWFuO1xuICBwcmlvcml0eT86IG51bWJlcjtcbiAgLyoqXG4gICAqIElmIHlvdSB3YW50IHRvIHNhdmUgY3VzdG9tIGRhdGEgaW4gdGhpcyB1c2UgdGhpcyBvYmplY3RcbiAgICovXG4gIGN1c3RvbURhdGE/OiBhbnk7XG59XG5cbmV4cG9ydCB0eXBlIEJpbmRlcjxWYWx1ZVR5cGU+ID0gSU9uZVdheUJpbmRlcjxWYWx1ZVR5cGU+IHwgSVR3b1dheUJpbmRlcjxWYWx1ZVR5cGU+XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUJpbmRlcnMge1xuICBbbmFtZTogc3RyaW5nXTogQmluZGVyPGFueT47XG59XG5cbmNvbnN0IGdldFN0cmluZyA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsID8gdmFsdWUudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRpbWVzID0gKG46IG51bWJlciwgY2I6KCkgPT4gdm9pZCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgY2IoKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVZpZXcoYmluZGluZzogSUJpbmRpbmcsIG1vZGVsczogYW55LCBhbmNob3JFbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgbnVsbCkge1xuICBsZXQgdGVtcGxhdGUgPSBiaW5kaW5nLmVsLmNsb25lTm9kZSh0cnVlKTtcbiAgbGV0IHZpZXcgPSBuZXcgVmlldyh0ZW1wbGF0ZSwgbW9kZWxzLCBiaW5kaW5nLnZpZXcub3B0aW9ucyk7XG4gIHZpZXcuYmluZCgpO1xuICBpZihiaW5kaW5nLm1hcmtlci5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBwYXJlbnQgbm9kZSBmb3IgYmluZGluZyEnKTtcbiAgfVxuXG4gIGJpbmRpbmcubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRlbXBsYXRlLCBhbmNob3JFbCk7XG5cbiAgcmV0dXJuIHZpZXc7XG59XG5cbmNvbnN0IGJpbmRlcnM6IGFueSAvKiBUT0RPIElCaW5kZXJzICovID0ge1xuICAvLyBCaW5kcyBhbiBldmVudCBoYW5kbGVyIG9uIHRoZSBlbGVtZW50LlxuICAnb24tKic6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBmdW5jdGlvbjogdHJ1ZSxcbiAgICBwcmlvcml0eTogMTAwMCxcblxuICAgIGJpbmQoZWwpIHtcbiAgICAgIGlmKCF0aGlzLmN1c3RvbURhdGEpIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0ge1xuICAgICAgICAgIGhhbmRsZXI6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmN1c3RvbURhdGEuaGFuZGxlcikge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcm91dGluZTogZnVuY3Rpb24oZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYW55IC8qVE9ETyovKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmFyZ3NbMF0sIHRoaXMuY3VzdG9tRGF0YS5oYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIgPSB0aGlzLmV2ZW50SGFuZGxlcih2YWx1ZSk7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHRoaXMuYXJnc1swXSwgdGhpcy5jdXN0b21EYXRhLmhhbmRsZXIpO1xuICAgIH1cbiAgfSxcblxuICAvLyBBcHBlbmRzIGJvdW5kIGluc3RhbmNlcyBvZiB0aGUgZWxlbWVudCBpbiBwbGFjZSBmb3IgZWFjaCBpdGVtIGluIHRoZSBhcnJheS5cbiAgJ2VhY2gtKic6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBibG9jazogdHJ1ZSxcblxuICAgIHByaW9yaXR5OiA0MDAwLFxuXG4gICAgYmluZChlbDogSFRNTEVsZW1lbnQpIHtcbiAgICAgIGlmICghdGhpcy5tYXJrZXIpIHtcbiAgICAgICAgdGhpcy5tYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KGAgdGlueWJpbmQ6ICR7dGhpcy50eXBlfSBgKTtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhID0ge1xuICAgICAgICAgIGl0ZXJhdGVkOiA8SVZpZXdbXT4gW11cbiAgICAgICAgfTtcbiAgICAgICAgaWYoIWVsLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHBhcmVudCBub2RlIScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmZvckVhY2goKHZpZXc6IElWaWV3KSAgPT4ge1xuICAgICAgICAgIHZpZXcuYmluZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdW5iaW5kKGVsKSB7XG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBJVmlldykgPT4ge1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lKGVsLCBjb2xsZWN0aW9uKSB7XG4gICAgICBsZXQgbW9kZWxOYW1lID0gdGhpcy5hcmdzWzBdO1xuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24gfHwgW107XG5cbiAgICAgIC8vIFRPRE8gc3VwcG9ydCBvYmplY3Qga2V5cyB0byBpdGVyYXRlIG92ZXJcbiAgICAgIGlmKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZWFjaC0nICsgbW9kZWxOYW1lICsgJyBuZWVkcyBhbiBhcnJheSB0byBpdGVyYXRlIG92ZXIsIGJ1dCBpdCBpcycpO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiBpbmRleCBuYW1lIGlzIHNldGVkIGJ5IGBpbmRleC1wcm9wZXJ0eWAgdXNlIHRoaXMgbmFtZSwgb3RoZXJ3aXNlIGAlW21vZGVsTmFtZV0lYCAgXG4gICAgICBsZXQgaW5kZXhQcm9wID0gZWwuZ2V0QXR0cmlidXRlKCdpbmRleC1wcm9wZXJ0eScpIHx8IHRoaXMuZ2V0SXRlcmF0aW9uQWxpYXMobW9kZWxOYW1lKTtcblxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChtb2RlbCwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB7JHBhcmVudDogdGhpcy52aWV3Lm1vZGVsc307XG4gICAgICAgIHNjb3BlW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgc2NvcGVbbW9kZWxOYW1lXSA9IG1vZGVsO1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZFtpbmRleF07XG5cbiAgICAgICAgaWYgKCF2aWV3KSB7XG5cbiAgICAgICAgICBsZXQgcHJldmlvdXM6IENvbW1lbnQgfCBIVE1MRWxlbWVudCA9IHRoaXMubWFya2VyO1xuXG4gICAgICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkW3RoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSAxXS5lbHNbMF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmlldyA9IGNyZWF0ZVZpZXcodGhpcywgc2NvcGUsIHByZXZpb3VzLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQucHVzaCh2aWV3KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldy5tb2RlbHNbbW9kZWxOYW1lXSAhPT0gbW9kZWwpIHtcbiAgICAgICAgICAgIC8vIHNlYXJjaCBmb3IgYSB2aWV3IHRoYXQgbWF0Y2hlcyB0aGUgbW9kZWxcbiAgICAgICAgICAgIGxldCBtYXRjaEluZGV4LCBuZXh0VmlldztcbiAgICAgICAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IGluZGV4ICsgMTsgbmV4dEluZGV4IDwgdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWRbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWaWV3Lm1vZGVsc1ttb2RlbE5hbWVdID09PSBtb2RlbCkge1xuICAgICAgICAgICAgICAgIG1hdGNoSW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaEluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gbW9kZWwgaXMgaW4gb3RoZXIgcG9zaXRpb25cbiAgICAgICAgICAgICAgLy8gdG9kbzogY29uc2lkZXIgYXZvaWRpbmcgdGhlIHNwbGljZSBoZXJlIGJ5IHNldHRpbmcgYSBmbGFnXG4gICAgICAgICAgICAgIC8vIHByb2ZpbGUgcGVyZm9ybWFuY2UgYmVmb3JlIGltcGxlbWVudGluZyBzdWNoIGNoYW5nZVxuICAgICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKG1hdGNoSW5kZXgsIDEpO1xuICAgICAgICAgICAgICBpZighdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5leHRWaWV3LmVsc1swXSwgdmlldy5lbHNbMF0pO1xuICAgICAgICAgICAgICBuZXh0Vmlldy5tb2RlbHNbaW5kZXhQcm9wXSA9IGluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy9uZXcgbW9kZWxcbiAgICAgICAgICAgICAgbmV4dFZpZXcgPSBjcmVhdGVWaWV3KHRoaXMsIHNjb3BlLCB2aWV3LmVsc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuaXRlcmF0ZWQuc3BsaWNlKGluZGV4LCAwLCBuZXh0Vmlldyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXcubW9kZWxzW2luZGV4UHJvcF0gPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLmxlbmd0aCA+IGNvbGxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgIHRpbWVzKHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5sZW5ndGggLSBjb2xsZWN0aW9uLmxlbmd0aCwgKCkgPT4ge1xuICAgICAgICAgIGxldCB2aWV3ID0gdGhpcy5jdXN0b21EYXRhLml0ZXJhdGVkLnBvcCgpO1xuICAgICAgICAgIHZpZXcudW5iaW5kKCk7XG4gICAgICAgICAgaWYoIXRoaXMubWFya2VyLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFya2VyIGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1hcmtlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHZpZXcuZWxzWzBdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbC5ub2RlTmFtZSA9PT0gJ09QVElPTicgJiYgdGhpcy52aWV3LmJpbmRpbmdzKSB7XG4gICAgICAgIHRoaXMudmlldy5iaW5kaW5ncy5mb3JFYWNoKGJpbmRpbmcgPT4ge1xuICAgICAgICAgIGlmIChiaW5kaW5nLmVsID09PSB0aGlzLm1hcmtlci5wYXJlbnROb2RlICYmIGJpbmRpbmcudHlwZSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgYmluZGluZy5zeW5jKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdXBkYXRlKG1vZGVscykge1xuICAgICAgbGV0IGRhdGE6IGFueSA9IHt9O1xuXG4gICAgICAvL3RvZG86IGFkZCB0ZXN0IGFuZCBmaXggaWYgbmVjZXNzYXJ5XG5cbiAgICAgIE9iamVjdC5rZXlzKG1vZGVscykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoa2V5ICE9PSB0aGlzLmFyZ3NbMF0pIHtcbiAgICAgICAgICBkYXRhW2tleV0gPSBtb2RlbHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY3VzdG9tRGF0YS5pdGVyYXRlZC5mb3JFYWNoKCh2aWV3OiBJVmlldykgPT4ge1xuICAgICAgICB2aWV3LnVwZGF0ZShkYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGNsYXNzIGZyb20gdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIG9yIGZhbHNlLlxuICAnY2xhc3MtKic6IGZ1bmN0aW9uKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pIHtcbiAgICBsZXQgZWxDbGFzcyA9IGAgJHtlbC5jbGFzc05hbWV9IGA7XG5cbiAgICBpZiAodmFsdWUgIT09IChlbENsYXNzLmluZGV4T2YoYCAke3RoaXMuYXJnc1swXX0gYCkgPiAtMSkpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBgJHtlbC5jbGFzc05hbWV9ICR7dGhpcy5hcmdzWzBdfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBlbENsYXNzLnJlcGxhY2UoYCAke3RoaXMuYXJnc1swXX0gYCwgJyAnKS50cmltKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIFNldHMgdGhlIGVsZW1lbnQncyB0ZXh0IHZhbHVlLlxuICB0ZXh0OiA8SU9uZVdheUJpbmRlcj4gKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogJyc7XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIEhUTUwgY29udGVudC5cbiAgaHRtbDogPElPbmVXYXlCaW5kZXI+IChlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBlbC5pbm5lckhUTUwgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgfSxcblxuICAvLyBTaG93cyB0aGUgZWxlbWVudCB3aGVuIHZhbHVlIGlzIHRydWUuXG4gIHNob3c6IDxJT25lV2F5QmluZGVyPiAoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICB9LFxuXG4gIC8vIEhpZGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZSAobmVnYXRlZCB2ZXJzaW9uIG9mIGBzaG93YCBiaW5kZXIpLlxuICBoaWRlOiA8SU9uZVdheUJpbmRlcj4gKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnbm9uZScgOiAnJztcbiAgfSxcblxuICAvLyBFbmFibGVzIHRoZSBlbGVtZW50IHdoZW4gdmFsdWUgaXMgdHJ1ZS5cbiAgZW5hYmxlZDogPElPbmVXYXlCaW5kZXI+IChlbDogSFRNTEJ1dHRvbkVsZW1lbnQsIHZhbHVlOiBib29sZWFuKSA9PiB7XG4gICAgZWwuZGlzYWJsZWQgPSAhdmFsdWU7XG4gIH0sXG5cbiAgLy8gRGlzYWJsZXMgdGhlIGVsZW1lbnQgd2hlbiB2YWx1ZSBpcyB0cnVlIChuZWdhdGVkIHZlcnNpb24gb2YgYGVuYWJsZWRgIGJpbmRlcikuXG4gIGRpc2FibGVkOiA8SU9uZVdheUJpbmRlcj4gKGVsOiBIVE1MQnV0dG9uRWxlbWVudCwgdmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICBlbC5kaXNhYmxlZCA9ICEhdmFsdWU7XG4gIH0sXG5cbiAgLy8gQ2hlY2tzIGEgY2hlY2tib3ggb3IgcmFkaW8gaW5wdXQgd2hlbiB0aGUgdmFsdWUgaXMgdHJ1ZS4gQWxzbyBzZXRzIHRoZSBtb2RlbFxuICAvLyBwcm9wZXJ0eSB3aGVuIHRoZSBpbnB1dCBpcyBjaGVja2VkIG9yIHVuY2hlY2tlZCAodHdvLXdheSBiaW5kZXIpLlxuICBjaGVja2VkOiA8SVR3b1dheUJpbmRlcjxhbnk+PiB7XG4gICAgcHVibGlzaGVzOiB0cnVlLFxuICAgIHByaW9yaXR5OiAyMDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHRoaXMuY3VzdG9tRGF0YSA9IHt9O1xuICAgICAgaWYgKCF0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYucHVibGlzaCgpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbihlbCkge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgcm91dGluZTogZnVuY3Rpb24oZWw6IEhUTUxTZWxlY3RFbGVtZW50LCB2YWx1ZSkge1xuICAgICAgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgZWwuY2hlY2tlZCA9IGdldFN0cmluZyhlbC52YWx1ZSkgPT09IGdldFN0cmluZyh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jaGVja2VkID0gISF2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gU2V0cyB0aGUgZWxlbWVudCdzIHZhbHVlLiBBbHNvIHNldHMgdGhlIG1vZGVsIHByb3BlcnR5IHdoZW4gdGhlIGlucHV0IGNoYW5nZXNcbiAgLy8gKHR3by13YXkgYmluZGVyKS5cbiAgdmFsdWU6IDxJVHdvV2F5QmluZGVyPGFueT4+IHtcbiAgICBwdWJsaXNoZXM6IHRydWUsXG4gICAgcHJpb3JpdHk6IDMwMDAsXG5cbiAgICBiaW5kOiBmdW5jdGlvbihlbDogSFRNTElucHV0RWxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICB0aGlzLmN1c3RvbURhdGEuaXNSYWRpbyA9IGVsLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgZWwudHlwZSA9PT0gJ3JhZGlvJztcbiAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmlzUmFkaW8pIHtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKCdldmVudC1uYW1lJykgfHwgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnID8gJ2NoYW5nZScgOiAnaW5wdXQnKTtcblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrKSB7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5wdWJsaXNoKCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5jdXN0b21EYXRhLmV2ZW50LCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1bmJpbmQ6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YS5pc1JhZGlvKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5jdXN0b21EYXRhLmV2ZW50LCB0aGlzLmN1c3RvbURhdGEuY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lOiBmdW5jdGlvbihlbDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LCB2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMuY3VzdG9tRGF0YSAmJiB0aGlzLmN1c3RvbURhdGEuaXNSYWRpbykge1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnR5cGUgPT09ICdzZWxlY3QtbXVsdGlwbGUnICYmIGVsIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpIHtcbiAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZWxbaV07XG4gICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChnZXRTdHJpbmcodmFsdWUpICE9PSBnZXRTdHJpbmcoZWwudmFsdWUpKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBJbnNlcnRzIGFuZCBiaW5kcyB0aGUgZWxlbWVudCBhbmQgaXQncyBjaGlsZCBub2RlcyBpbnRvIHRoZSBET00gd2hlbiB0cnVlLlxuICBpZjogPElUd29XYXlCaW5kZXI8YW55Pj4ge1xuICAgIGJsb2NrOiB0cnVlLFxuICAgIHByaW9yaXR5OiA0MDAwLFxuXG4gICAgYmluZDogZnVuY3Rpb24oZWw6IEhUTUxVbmtub3duRWxlbWVudCkge1xuICAgICAgdGhpcy5jdXN0b21EYXRhID0ge307XG4gICAgICBpZiAoIXRoaXMubWFya2VyKSB7XG4gICAgICAgIHRoaXMubWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnIHRpbnliaW5kOiAnICsgdGhpcy50eXBlICsgJyAnICsgdGhpcy5rZXlwYXRoICsgJyAnKTtcbiAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gZmFsc2U7XG4gICAgICAgIGlmKCFlbC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMubWFya2VyLCBlbCk7XG4gICAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIGlmICggdGhpcy5jdXN0b21EYXRhLmJvdW5kID09PSBmYWxzZSAmJiAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC5iaW5kKCk7XG4gICAgICB9XG4gICAgICAgdGhpcy5jdXN0b21EYXRhLmJvdW5kID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgdW5iaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgdGhpcy5jdXN0b21EYXRhLm5lc3RlZC51bmJpbmQoKTtcbiAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5ib3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByb3V0aW5lOiBmdW5jdGlvbihlbCwgdmFsdWUpIHtcbiAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuXG4gICAgICAgICAgaWYgKCEgdGhpcy5jdXN0b21EYXRhLm5lc3RlZCkge1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQgPSBuZXcgVmlldyhlbCwgdGhpcy52aWV3Lm1vZGVscywgdGhpcy52aWV3Lm9wdGlvbnMpO1xuICAgICAgICAgICAgIHRoaXMuY3VzdG9tRGF0YS5uZXN0ZWQuYmluZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZighdGhpcy5tYXJrZXIucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYXJrZXIgaGFzIG5vIHBhcmVudCBub2RlJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWFya2VyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCB0aGlzLm1hcmtlci5uZXh0U2libGluZyk7XG4gICAgICAgICAgdGhpcy5jdXN0b21EYXRhLmF0dGFjaGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZighZWwucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbGVtZW50IGhhcyBubyBwYXJlbnQgbm9kZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICB0aGlzLmN1c3RvbURhdGEuYXR0YWNoZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKG1vZGVscykge1xuICAgICAgaWYgKCB0aGlzLmN1c3RvbURhdGEubmVzdGVkKSB7XG4gICAgICAgICB0aGlzLmN1c3RvbURhdGEubmVzdGVkLnVwZGF0ZShtb2RlbHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYmluZGVycztcbiIsImltcG9ydCB7cGFyc2VUeXBlfSBmcm9tICcuL3BhcnNlcnMnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICcuL29ic2VydmVyJztcblxuZnVuY3Rpb24gZ2V0SW5wdXRWYWx1ZShlbCkge1xuICBsZXQgcmVzdWx0cyA9IFtdO1xuICBpZiAoZWwudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgIHJldHVybiBlbC5jaGVja2VkO1xuICB9IGVsc2UgaWYgKGVsLnR5cGUgPT09ICdzZWxlY3QtbXVsdGlwbGUnKSB7XG5cbiAgICBlbC5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgIGlmIChvcHRpb24uc2VsZWN0ZWQpIHtcbiAgICAgICAgcmVzdWx0cy5wdXNoKG9wdGlvbi52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwudmFsdWU7XG4gIH1cbn1cblxuY29uc3QgRk9STUFUVEVSX0FSR1MgPSAgL1teXFxzJ10rfCcoW14nXXwnW15cXHNdKSonfFwiKFteXCJdfFwiW15cXHNdKSpcIi9nO1xuY29uc3QgRk9STUFUVEVSX1NQTElUID0gL1xccysvO1xuXG4vKipcbiAqIFVzZWQgYWxzbyBpbiBwYXJzZXJzLnBhcnNlVHlwZVxuICogVE9ETyBvdXRzb3VyY2VcbiAqL1xuY29uc3QgUFJJTUlUSVZFID0gMDtcbmNvbnN0IEtFWVBBVEggPSAxO1xuXG4vLyBBIHNpbmdsZSBiaW5kaW5nIGJldHdlZW4gYSBtb2RlbCBhdHRyaWJ1dGUgYW5kIGEgRE9NIGVsZW1lbnQuXG5leHBvcnQgY2xhc3MgQmluZGluZyB7XG4gIC8qKlxuICAgKiBBbGwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGJpbmRpbmcgaXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yOyB0aGVcbiAgICogY29udGFpbmluZyB2aWV3LCB0aGUgRE9NIG5vZGUsIHRoZSB0eXBlIG9mIGJpbmRpbmcsIHRoZSBtb2RlbCBvYmplY3QgYW5kIHRoZVxuICAgKiBrZXlwYXRoIGF0IHdoaWNoIHRvIGxpc3RlbiBmb3IgY2hhbmdlcy5cbiAgICogQHBhcmFtIHsqfSB2aWV3IFxuICAgKiBAcGFyYW0geyp9IGVsIFxuICAgKiBAcGFyYW0geyp9IHR5cGUgXG4gICAqIEBwYXJhbSB7Kn0ga2V5cGF0aCBcbiAgICogQHBhcmFtIHsqfSBiaW5kZXIgXG4gICAqIEBwYXJhbSB7Kn0gYXJncyBUaGUgc3RhcnQgYmluZGVycywgb24gYGNsYXNzLSpgIGFyZ3NbMF0gd2lsIGJlIHRoZSBjbGFzc25hbWUgXG4gICAqIEBwYXJhbSB7Kn0gZm9ybWF0dGVycyBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHZpZXcsIGVsLCB0eXBlLCBrZXlwYXRoLCBiaW5kZXIsIGFyZ3MsIGZvcm1hdHRlcnMpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5iaW5kZXIgPSBiaW5kZXI7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuICAgIHRoaXMuZm9ybWF0dGVyT2JzZXJ2ZXJzID0ge307XG4gICAgdGhpcy5tb2RlbCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmN1c3RvbURhdGEgPSB7fTtcbiAgfVxuXG4gIC8vIE9ic2VydmVzIHRoZSBvYmplY3Qga2V5cGF0aFxuICBvYnNlcnZlKG9iaiwga2V5cGF0aCkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIob2JqLCBrZXlwYXRoLCB0aGlzKTtcbiAgfVxuXG4gIHBhcnNlVGFyZ2V0KCkge1xuICAgIGlmICh0aGlzLmtleXBhdGgpIHtcbiAgICAgIGxldCB0b2tlbiA9IHBhcnNlVHlwZSh0aGlzLmtleXBhdGgpO1xuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdG9rZW4udmFsdWU7XG4gICAgICB9IGVsc2UgaWYodG9rZW4udHlwZSA9PT0gS0VZUEFUSCl7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdGhpcy5rZXlwYXRoKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMub2JzZXJ2ZXIudGFyZ2V0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgaW4gdG9rZW4nLCB0b2tlbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIFxuICAvKipcbiAgICogR2V0IHRoZSBpdGVyYXRpb24gYWxpYXMsIHVzZWQgaW4gdGhlIGludGVyYXRpb24gYmluZGVycyBsaWtlIGBlYWNoLSpgXG4gICAqIEBwYXJhbSB7Kn0gbW9kZWxOYW1lIFxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWtlcmljL3JpdmV0cy9ibG9iL21hc3Rlci9kaXN0L3JpdmV0cy5qcyNMMjZcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWlrZXJpYy9yaXZldHMvYmxvYi9tYXN0ZXIvZGlzdC9yaXZldHMuanMjTDExNzVcbiAgICovXG4gIGdldEl0ZXJhdGlvbkFsaWFzKG1vZGVsTmFtZSkge1xuICAgIHJldHVybiAnJScgKyBtb2RlbE5hbWUgKyAnJSc7XG4gIH1cblxuICBwYXJzZUZvcm1hdHRlckFyZ3VtZW50cyhhcmdzLCBmb3JtYXR0ZXJJbmRleCkge1xuICAgIHJldHVybiBhcmdzXG4gICAgICAubWFwKHBhcnNlVHlwZSlcbiAgICAgIC5tYXAoKHt0eXBlLCB2YWx1ZX0sIGFpKSA9PiB7XG4gICAgICAgIGlmICh0eXBlID09PSBQUklNSVRJVkUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gS0VZUEFUSCkge1xuICAgICAgICAgIGlmICghdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF0gPSB7fTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmb3JtYXR0ZXJJbmRleF1bYWldO1xuXG4gICAgICAgICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgICAgICAgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmUodGhpcy52aWV3Lm1vZGVscywgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnNbZm9ybWF0dGVySW5kZXhdW2FpXSA9IG9ic2VydmVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBvYnNlcnZlci52YWx1ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlJywgdHlwZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIEFwcGxpZXMgYWxsIHRoZSBjdXJyZW50IGZvcm1hdHRlcnMgdG8gdGhlIHN1cHBsaWVkIHZhbHVlIGFuZCByZXR1cm5zIHRoZVxuICAvLyBmb3JtYXR0ZWQgdmFsdWUuXG4gIGZvcm1hdHRlZFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0dGVycy5yZWR1Y2UoKHJlc3VsdCwgZGVjbGFyYXRpb24sIGluZGV4KSA9PiB7XG4gICAgICBsZXQgYXJncyA9IGRlY2xhcmF0aW9uLm1hdGNoKEZPUk1BVFRFUl9BUkdTKTtcbiAgICAgIGxldCBpZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGxldCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcblxuICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICBpZiAoZm9ybWF0dGVyICYmIChmb3JtYXR0ZXIucmVhZCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucmVhZChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgfSBlbHNlIGlmIChmb3JtYXR0ZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIocmVzdWx0LCAuLi5wcm9jZXNzZWRBcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSwgdmFsdWUpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhbiBldmVudCBoYW5kbGVyIGZvciB0aGUgYmluZGluZyBhcm91bmQgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICBldmVudEhhbmRsZXIoZm4pIHtcbiAgICBsZXQgYmluZGluZyA9IHRoaXM7XG4gICAgbGV0IGhhbmRsZXIgPSBiaW5kaW5nLnZpZXcub3B0aW9ucy5oYW5kbGVyO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGV2KSB7XG4gICAgICBoYW5kbGVyLmNhbGwoZm4sIHRoaXMsIGV2LCBiaW5kaW5nKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gU2V0cyB0aGUgdmFsdWUgZm9yIHRoZSBiaW5kaW5nLiBUaGlzIEJhc2ljYWxseSBqdXN0IHJ1bnMgdGhlIGJpbmRpbmcgcm91dGluZVxuICAvLyB3aXRoIHRoZSBzdXBwbGllZCB2YWx1ZSBmb3JtYXR0ZWQuXG4gIHNldCh2YWx1ZSkge1xuICAgIGlmICgodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikgJiYgIXRoaXMuYmluZGVyLmZ1bmN0aW9uKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWUodmFsdWUuY2FsbCh0aGlzLm1vZGVsKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gdGhpcy5mb3JtYXR0ZWRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgbGV0IHJvdXRpbmVGbiA9IHRoaXMuYmluZGVyLnJvdXRpbmUgfHwgdGhpcy5iaW5kZXI7XG5cbiAgICBpZiAocm91dGluZUZuIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJvdXRpbmVGbi5jYWxsKHRoaXMsIHRoaXMuZWwsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBTeW5jcyB1cCB0aGUgdmlldyBiaW5kaW5nIHdpdGggdGhlIG1vZGVsLlxuICBzeW5jKCkge1xuICAgIGlmICh0aGlzLm9ic2VydmVyKSB7XG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5vYnNlcnZlci50YXJnZXQ7XG4gICAgICB0aGlzLnNldCh0aGlzLm9ic2VydmVyLnZhbHVlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBQdWJsaXNoZXMgdGhlIHZhbHVlIGN1cnJlbnRseSBzZXQgb24gdGhlIGlucHV0IGVsZW1lbnQgYmFjayB0byB0aGUgbW9kZWwuXG4gIHB1Ymxpc2goKSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZm9ybWF0dGVycy5yZWR1Y2VSaWdodCgocmVzdWx0LCBkZWNsYXJhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgYXJncyA9IGRlY2xhcmF0aW9uLnNwbGl0KEZPUk1BVFRFUl9TUExJVCk7XG4gICAgICAgIGNvbnN0IGlkID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSB0aGlzLnZpZXcub3B0aW9ucy5mb3JtYXR0ZXJzW2lkXTtcbiAgICAgICAgY29uc3QgcHJvY2Vzc2VkQXJncyA9IHRoaXMucGFyc2VGb3JtYXR0ZXJBcmd1bWVudHMoYXJncywgaW5kZXgpO1xuXG4gICAgICAgIGlmIChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLnB1Ymxpc2gpIHtcbiAgICAgICAgICByZXN1bHQgPSBmb3JtYXR0ZXIucHVibGlzaChyZXN1bHQsIC4uLnByb2Nlc3NlZEFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LCB0aGlzLmdldFZhbHVlKHRoaXMuZWwpKTtcblxuICAgICAgdGhpcy5vYnNlcnZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU3Vic2NyaWJlcyB0byB0aGUgbW9kZWwgZm9yIGNoYW5nZXMgYXQgdGhlIHNwZWNpZmllZCBrZXlwYXRoLiBCaS1kaXJlY3Rpb25hbFxuICAvLyByb3V0aW5lcyB3aWxsIGFsc28gbGlzdGVuIGZvciBjaGFuZ2VzIG9uIHRoZSBlbGVtZW50IHRvIHByb3BhZ2F0ZSB0aGVtIGJhY2tcbiAgLy8gdG8gdGhlIG1vZGVsLlxuICBiaW5kKCkge1xuICAgIHRoaXMucGFyc2VUYXJnZXQoKTtcblxuICAgIGlmICh0aGlzLmJpbmRlci5oYXNPd25Qcm9wZXJ0eSgnYmluZCcpKSB7XG4gICAgICB0aGlzLmJpbmRlci5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudmlldy5vcHRpb25zLnByZWxvYWREYXRhKSB7XG4gICAgICB0aGlzLnN5bmMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBVbnN1YnNjcmliZXMgZnJvbSB0aGUgbW9kZWwgYW5kIHRoZSBlbGVtZW50LlxuICB1bmJpbmQoKSB7XG4gICAgaWYgKHRoaXMuYmluZGVyLnVuYmluZCkge1xuICAgICAgdGhpcy5iaW5kZXIudW5iaW5kLmNhbGwodGhpcywgdGhpcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIudW5vYnNlcnZlKCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXModGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMpLmZvckVhY2goZmkgPT4ge1xuICAgICAgbGV0IGFyZ3MgPSB0aGlzLmZvcm1hdHRlck9ic2VydmVyc1tmaV07XG5cbiAgICAgIE9iamVjdC5rZXlzKGFyZ3MpLmZvckVhY2goYWkgPT4ge1xuICAgICAgICBhcmdzW2FpXS51bm9ic2VydmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JtYXR0ZXJPYnNlcnZlcnMgPSB7fTtcbiAgfVxuXG4gIC8vIFVwZGF0ZXMgdGhlIGJpbmRpbmcncyBtb2RlbCBmcm9tIHdoYXQgaXMgY3VycmVudGx5IHNldCBvbiB0aGUgdmlldy4gVW5iaW5kc1xuICAvLyB0aGUgb2xkIG1vZGVsIGZpcnN0IGFuZCB0aGVuIHJlLWJpbmRzIHdpdGggdGhlIG5ldyBtb2RlbC5cbiAgdXBkYXRlKG1vZGVscyA9IHt9KSB7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm9ic2VydmVyLnRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5iaW5kZXIudXBkYXRlKSB7XG4gICAgICB0aGlzLmJpbmRlci51cGRhdGUuY2FsbCh0aGlzLCBtb2RlbHMpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgZWxlbWVudHMgdmFsdWVcbiAgZ2V0VmFsdWUoZWwpIHtcbiAgICBpZiAodGhpcy5iaW5kZXIgJiYgdGhpcy5iaW5kZXIuZ2V0VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmJpbmRlci5nZXRWYWx1ZS5jYWxsKHRoaXMsIGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldElucHV0VmFsdWUoZWwpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHRpbnliaW5kIGZyb20gJy4vdGlueWJpbmQnO1xuaW1wb3J0IHtwYXJzZVR5cGV9IGZyb20gJy4vcGFyc2Vycyc7XG5pbXBvcnQge0VYVEVOU0lPTlMsIE9QVElPTlN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7QmluZGluZ30gZnJvbSAnLi9iaW5kaW5nJztcblxuLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuLy8gY29tcG9uZW50IHZpZXcgZW5jYXBzdWxhdGVkIGFzIGEgYmluZGluZyB3aXRoaW4gaXQncyBwYXJlbnQgdmlldy5cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRCaW5kaW5nIGV4dGVuZHMgQmluZGluZyB7XG4gIC8vIEluaXRpYWxpemVzIGEgY29tcG9uZW50IGJpbmRpbmcgZm9yIHRoZSBzcGVjaWZpZWQgdmlldy4gVGhlIHJhdyBjb21wb25lbnRcbiAgLy8gZWxlbWVudCBpcyBwYXNzZWQgaW4gYWxvbmcgd2l0aCB0aGUgY29tcG9uZW50IHR5cGUuIEF0dHJpYnV0ZXMgYW5kIHNjb3BlXG4gIC8vIGluZmxlY3Rpb25zIGFyZSBkZXRlcm1pbmVkIGJhc2VkIG9uIHRoZSBjb21wb25lbnRzIGRlZmluZWQgYXR0cmlidXRlcy5cbiAgY29uc3RydWN0b3IodmlldywgZWwsIHR5cGUpIHtcbiAgICBzdXBlcih2aWV3LCBlbCwgdHlwZSwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmNvbXBvbmVudCA9IHZpZXcub3B0aW9ucy5jb21wb25lbnRzW3RoaXMudHlwZV07XG4gICAgdGhpcy5zdGF0aWMgPSB7fTtcbiAgICB0aGlzLm9ic2VydmVycyA9IHt9O1xuICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnMgPSB7fTtcbiAgICBcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIFxuICAgIC8vIHBhcnNlIGNvbXBvbmVudCBhdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGUgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuXG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIG5vdCB3aXRoIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2LVxuICAgICAgaWYgKGF0dHJpYnV0ZS5uYW1lLmluZGV4T2YoYmluZGluZ1ByZWZpeCkgIT09IDApIHtcbiAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IHRoaXMuY2FtZWxDYXNlKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgbGV0IHRva2VuID0gcGFyc2VUeXBlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgIGxldCBzdGF0ID0gdGhpcy5jb21wb25lbnQuc3RhdGljO1xuICAgIFxuICAgICAgICBpZiAoc3RhdCAmJiBzdGF0LmluZGV4T2YocHJvcGVydHlOYW1lKSA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5zdGF0aWNbcHJvcGVydHlOYW1lXSA9IGF0dHJpYnV0ZS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IFBSSU1JVElWRSkge1xuICAgICAgICAgIHRoaXMuc3RhdGljW3Byb3BlcnR5TmFtZV0gPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmKHRva2VuLnR5cGUgPT09IEtFWVBBVEgpIHtcbiAgICAgICAgICB0aGlzLm9ic2VydmVyc1twcm9wZXJ0eU5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuXFwndCBwYXJzZSBjb21wb25lbnQgYXR0cmlidXRlJywgYXR0cmlidXRlLCB0b2tlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgICBcbiAgICBcbiAgLy8gSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6c3luY2Agc2luY2UgY29tcG9uZW50IGJpbmRpbmdzIGFyZSBub3QgYm91bmQgdG9cbiAgLy8gYSBwYXJ0aWN1bGFyIG1vZGVsIHRvIHVwZGF0ZSBpdCdzIHZhbHVlLlxuICBzeW5jKCkge31cbiAgICBcbiAgLy8gSW50ZXJjZXB0cyBgdGlueWJpbmQuQmluZGluZzo6dXBkYXRlYCBzaW5jZSBjb21wb25lbnQgYmluZGluZ3MgYXJlIG5vdCBib3VuZFxuICAvLyB0byBhIHBhcnRpY3VsYXIgbW9kZWwgdG8gdXBkYXRlIGl0J3MgdmFsdWUuXG4gIHVwZGF0ZSgpIHt9XG4gICAgXG4gIC8vIEludGVyY2VwdHMgYHRpbnliaW5kLkJpbmRpbmc6OnB1Ymxpc2hgIHNpbmNlIGNvbXBvbmVudCBiaW5kaW5ncyBhcmUgbm90IGJvdW5kXG4gIC8vIHRvIGEgcGFydGljdWxhciBtb2RlbCB0byB1cGRhdGUgaXQncyB2YWx1ZS5cbiAgcHVibGlzaCgpIHt9XG4gICAgXG4gIC8vIFJldHVybnMgYW4gb2JqZWN0IG1hcCB1c2luZyB0aGUgY29tcG9uZW50J3Mgc2NvcGUgaW5mbGVjdGlvbnMuXG4gIGxvY2FscygpIHtcbiAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgXG4gICAgT2JqZWN0LmtleXModGhpcy5zdGF0aWMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdGhpcy5zdGF0aWNba2V5XTtcbiAgICB9KTtcbiAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLm9ic2VydmVyc1trZXldLnZhbHVlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAgIFxuICAvLyBSZXR1cm5zIGEgY2FtZWwtY2FzZWQgdmVyc2lvbiBvZiB0aGUgc3RyaW5nLiBVc2VkIHdoZW4gdHJhbnNsYXRpbmcgYW5cbiAgLy8gZWxlbWVudCdzIGF0dHJpYnV0ZSBuYW1lIGludG8gYSBwcm9wZXJ0eSBuYW1lIGZvciB0aGUgY29tcG9uZW50J3Mgc2NvcGUuXG4gIGNhbWVsQ2FzZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLy0oW2Etel0pL2csIGdyb3VwZWQgPT4ge1xuICAgICAgcmV0dXJuIGdyb3VwZWRbMV0udG9VcHBlckNhc2UoKTtcbiAgICB9KTtcbiAgfVxuICAgIFxuICAvLyBJbnRlcmNlcHRzIGB0aW55YmluZC5CaW5kaW5nOjpiaW5kYCB0byBidWlsZCBgdGhpcy5jb21wb25lbnRWaWV3YCB3aXRoIGEgbG9jYWxpemVkXG4gIC8vIG1hcCBvZiBtb2RlbHMgZnJvbSB0aGUgcm9vdCB2aWV3LiBCaW5kIGB0aGlzLmNvbXBvbmVudFZpZXdgIG9uIHN1YnNlcXVlbnQgY2FsbHMuXG4gIGJpbmQoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICBpZiAoIXRoaXMuYm91bmQpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBrZXlwYXRoID0gdGhpcy5vYnNlcnZlcnNba2V5XTtcbiAgICBcbiAgICAgICAgdGhpcy5vYnNlcnZlcnNba2V5XSA9IHRoaXMub2JzZXJ2ZSh0aGlzLnZpZXcubW9kZWxzLCBrZXlwYXRoLCAoa2V5ID0+IHtcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRWaWV3Lm1vZGVsc1trZXldID0gdGhpcy5vYnNlcnZlcnNba2V5XS52YWx1ZSgpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhbGwodGhpcywga2V5KSk7XG4gICAgICB9KTtcbiAgICBcbiAgICAgIHRoaXMuYm91bmQgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcuYmluZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsLmlubmVySFRNTCA9IHRoaXMuY29tcG9uZW50LnRlbXBsYXRlLmNhbGwodGhpcyk7XG4gICAgICBsZXQgc2NvcGUgPSB0aGlzLmNvbXBvbmVudC5pbml0aWFsaXplLmNhbGwodGhpcywgdGhpcy5lbCwgdGhpcy5sb2NhbHMoKSk7XG4gICAgICB0aGlzLmVsLl9ib3VuZCA9IHRydWU7XG4gICAgXG4gICAgXG4gICAgICBFWFRFTlNJT05TLmZvckVhY2goZXh0ZW5zaW9uVHlwZSA9PiB7XG4gICAgICAgIG9wdGlvbnNbZXh0ZW5zaW9uVHlwZV0gPSB7fTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50W2V4dGVuc2lvblR5cGVdKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRbZXh0ZW5zaW9uVHlwZV0pLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnNbZXh0ZW5zaW9uVHlwZV1ba2V5XSA9IHRoaXMuY29tcG9uZW50W2V4dGVuc2lvblR5cGVdW2tleV07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy52aWV3Lm9wdGlvbnNbZXh0ZW5zaW9uVHlwZV0pLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICBpZiAob3B0aW9uc1tleHRlbnNpb25UeXBlXVtrZXldKSB7XG4gICAgICAgICAgICBvcHRpb25zW2V4dGVuc2lvblR5cGVdW2tleV0gPSB0aGlzLnZpZXdbZXh0ZW5zaW9uVHlwZV1ba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgXG4gICAgICBPUFRJT05TLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50W29wdGlvbl0gIT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnNbb3B0aW9uXSA9IHRoaXMuY29tcG9uZW50W29wdGlvbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9uc1tvcHRpb25dID0gdGhpcy52aWV3W29wdGlvbl07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIFxuICAgICAgLy90aGVyZSdzIGEgY3ljbGljIGRlcGVuZGVuY3kgdGhhdCBtYWtlcyBpbXBvcnRlZCBWaWV3IGEgZHVtbXkgb2JqZWN0LiBVc2UgdGlueWJpbmQuYmluZFxuICAgICAgLy90aGlzLmNvbXBvbmVudFZpZXcgPSBuZXcgVmlldyh0aGlzLmVsLCBzY29wZSwgb3B0aW9ucylcbiAgICAgIC8vdGhpcy5jb21wb25lbnRWaWV3LmJpbmQoKVxuICAgICAgdGhpcy5jb21wb25lbnRWaWV3ID0gdGlueWJpbmQuYmluZChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLmVsLmNoaWxkTm9kZXMpLCBzY29wZSwgb3B0aW9ucyk7XG4gICAgXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSB0aGlzLm9ic2VydmVyc1trZXldO1xuICAgICAgICBsZXQgbW9kZWxzID0gdGhpcy5jb21wb25lbnRWaWV3Lm1vZGVscztcbiAgICBcbiAgICAgICAgbGV0IHVwc3RyZWFtID0gdGhpcy5vYnNlcnZlKG1vZGVscywga2V5LCAoKGtleSwgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuc2V0VmFsdWUodGhpcy5jb21wb25lbnRWaWV3Lm1vZGVsc1trZXldKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIGtleSwgb2JzZXJ2ZXIpKTtcbiAgICBcbiAgICAgICAgdGhpcy51cHN0cmVhbU9ic2VydmVyc1trZXldID0gdXBzdHJlYW07XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgICBcbiAgLy8gSW50ZXJjZXB0IGB0aW55YmluZC5CaW5kaW5nOjp1bmJpbmRgIHRvIGJlIGNhbGxlZCBvbiBgdGhpcy5jb21wb25lbnRWaWV3YC5cbiAgdW5iaW5kKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMudXBzdHJlYW1PYnNlcnZlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMudXBzdHJlYW1PYnNlcnZlcnNba2V5XS51bm9ic2VydmUoKTtcbiAgICB9KTtcbiAgICBcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5vYnNlcnZlcnNba2V5XS51bm9ic2VydmUoKTtcbiAgICB9KTtcbiAgICBcbiAgICBpZiAodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcudW5iaW5kLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG59IiwiZXhwb3J0IHR5cGUgVEV4dGVuc2lvbktleSA9ICdiaW5kZXJzJyB8ICdmb3JtYXR0ZXJzJyB8ICdjb21wb25lbnRzJyB8ICdhZGFwdGVycyc7XG5cbmV4cG9ydCBjb25zdCBPUFRJT05TID0gW1xuICAncHJlZml4JyxcbiAgJ3RlbXBsYXRlRGVsaW1pdGVycycsXG4gICdyb290SW50ZXJmYWNlJyxcbiAgJ3ByZWxvYWREYXRhJyxcbiAgJ2hhbmRsZXInXG5dO1xuXG5leHBvcnQgY29uc3QgRVhURU5TSU9OUyA9IFtcbiAgJ2JpbmRlcnMnLFxuICAnZm9ybWF0dGVycycsXG4gICdjb21wb25lbnRzJyxcbiAgJ2FkYXB0ZXJzJ1xuXTsiLCJpbXBvcnQgdGlueWJpbmQgZnJvbSAnLi90aW55YmluZCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0IGFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7IElBZGFwdGVycyB9IGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgSUJpbmRlcnMgfSBmcm9tICcuL2JpbmRlcnMnO1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIFJvb3QgfSBmcm9tICcuL29ic2VydmVyJztcblxuaW1wb3J0IHsgSUZvcm1hdHRlcnMsIElPcHRpb25zLCBJQ29tcG9uZW50cyB9IGZyb20gJy4uL2luZGV4JztcblxuZXhwb3J0IGludGVyZmFjZSBJRXh0ZW5zaW9ucyB7XG4gIGJpbmRlcnM6IElCaW5kZXJzO1xuICBmb3JtYXR0ZXJzOiBJRm9ybWF0dGVycztcbiAgY29tcG9uZW50czogSUNvbXBvbmVudHM7XG4gIGFkYXB0ZXJzOiBJQWRhcHRlcnM7XG59XG5cbi8vIFJldHVybnMgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG5cbnRpbnliaW5kLmJpbmRlcnMgPSBiaW5kZXJzO1xudGlueWJpbmQuYWRhcHRlcnNbJy4nXSA9IGFkYXB0ZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbnNQYXJhbSBleHRlbmRzIElFeHRlbnNpb25zLCBJT3B0aW9ucyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3T3B0aW9ucyBleHRlbmRzIElPcHRpb25zUGFyYW0ge1xuICBzdGFyQmluZGVyczogYW55O1xuICAvLyBzaWdodGdsYXNzXG4gIHJvb3RJbnRlcmZhY2U6IFJvb3Q7XG59XG5cbi8vIFRPRE8gbW92ZSB0byB1aXRpbHNcbmNvbnN0IG1lcmdlT2JqZWN0ID0gKHRhcmdldDogYW55LCBvYmo6IGFueSkgPT4ge1xuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAoIXRhcmdldFtrZXldIHx8IHRhcmdldFtrZXldID09PSB7fSkge1xuICAgICAgdGFyZ2V0W2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0OyBcbn07XG5cblxuLy8gQmluZHMgc29tZSBkYXRhIHRvIGEgdGVtcGxhdGUgLyBlbGVtZW50LiBSZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cbnRpbnliaW5kLmJpbmQgPSAoZWw6IEhUTUxFbGVtZW50LCBtb2RlbHM6IGFueSwgb3B0aW9ucz86IElPcHRpb25zUGFyYW0pID0+IHtcbiAgbGV0IHZpZXdPcHRpb25zOiBJVmlld09wdGlvbnMgPSB7XG4gICAgLy8gRVhURU5TSU9OU1xuICAgIGJpbmRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgZm9ybWF0dGVyczogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBjb21wb25lbnRzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIGFkYXB0ZXJzOiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIC8vIG90aGVyXG4gICAgc3RhckJpbmRlcnM6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgLy8gc2lnaHRnbGFzc1xuICAgIHJvb3RJbnRlcmZhY2U6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gIH07XG4gIG1vZGVscyA9IG1vZGVscyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAvLyBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZihvcHRpb25zKSB7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYmluZGVycywgb3B0aW9ucy5iaW5kZXJzKTtcbiAgICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCBvcHRpb25zLmZvcm1hdHRlcnMpO1xuICAgIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmNvbXBvbmVudHMsIG9wdGlvbnMuY29tcG9uZW50cyk7XG4gICAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuYWRhcHRlcnMsIG9wdGlvbnMuYWRhcHRlcnMpO1xuICB9XG5cbiAgdmlld09wdGlvbnMucHJlZml4ID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZWZpeCA/IG9wdGlvbnMucHJlZml4IDogdGlueWJpbmQucHJlZml4XG4gIHZpZXdPcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA9IG9wdGlvbnMgJiYgb3B0aW9ucy50ZW1wbGF0ZURlbGltaXRlcnMgPyBvcHRpb25zLnRlbXBsYXRlRGVsaW1pdGVycyA6IHRpbnliaW5kLnRlbXBsYXRlRGVsaW1pdGVyc1xuICB2aWV3T3B0aW9ucy5yb290SW50ZXJmYWNlID0gb3B0aW9ucyAmJiBvcHRpb25zLnJvb3RJbnRlcmZhY2UgPyBvcHRpb25zLnJvb3RJbnRlcmZhY2UgOiB0aW55YmluZC5yb290SW50ZXJmYWNlXG4gIHZpZXdPcHRpb25zLnByZWxvYWREYXRhID0gb3B0aW9ucyAmJiBvcHRpb25zLnByZWxvYWREYXRhID8gb3B0aW9ucy5wcmVsb2FkRGF0YSA6IHRpbnliaW5kLnByZWxvYWREYXRhXG4gIHZpZXdPcHRpb25zLmhhbmRsZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuaGFuZGxlciA/IG9wdGlvbnMuaGFuZGxlciA6IHRpbnliaW5kLmhhbmRsZXJcblxuICAvLyBtZXJnZSBleHRlbnNpb25zXG4gIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmJpbmRlcnMsIHRpbnliaW5kLmJpbmRlcnMpO1xuICBtZXJnZU9iamVjdCh2aWV3T3B0aW9ucy5mb3JtYXR0ZXJzLCB0aW55YmluZC5mb3JtYXR0ZXJzKTtcbiAgbWVyZ2VPYmplY3Qodmlld09wdGlvbnMuY29tcG9uZW50cywgdGlueWJpbmQuY29tcG9uZW50cyk7XG4gIG1lcmdlT2JqZWN0KHZpZXdPcHRpb25zLmFkYXB0ZXJzLCB0aW55YmluZC5hZGFwdGVycyk7XG5cbiAgLy8gZ2V0IGFsbCBzdGFyQmluZGVycyBmcm9tIGF2YWlsYWJsZSBiaW5kZXJzXG4gIHZpZXdPcHRpb25zLnN0YXJCaW5kZXJzID0gT2JqZWN0LmtleXModmlld09wdGlvbnMuYmluZGVycykuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4ga2V5LmluZGV4T2YoJyonKSA+IDA7XG4gIH0pO1xuXG4gIE9ic2VydmVyLnVwZGF0ZU9wdGlvbnModmlld09wdGlvbnMpO1xuXG4gIGxldCB2aWV3ID0gbmV3IFZpZXcoZWwsIG1vZGVscywgdmlld09wdGlvbnMpO1xuICB2aWV3LmJpbmQoKTtcbiAgcmV0dXJuIHZpZXc7XG59O1xuXG4vLyBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBvbiB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgYW5kXG4vLyByZXR1cm5zIGEgdGlueWJpbmQuVmlldyBpbnN0YW5jZS5cdFxudGlueWJpbmQuaW5pdCA9IChjb21wb25lbnRLZXk6IHN0cmluZywgZWw6IEhUTUxFbGVtZW50LCBkYXRhID0ge30pID0+IHtcbiAgaWYgKCFlbCkge1xuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIH1cblxuICBjb25zdCBjb21wb25lbnQgPSB0aW55YmluZC5jb21wb25lbnRzW2NvbXBvbmVudEtleV07XG4gIGVsLmlubmVySFRNTCA9IGNvbXBvbmVudC50ZW1wbGF0ZS5jYWxsKHRpbnliaW5kLCBlbCk7XG4gIGxldCBzY29wZSA9IGNvbXBvbmVudC5pbml0aWFsaXplLmNhbGwodGlueWJpbmQsIGVsLCBkYXRhKTtcblxuICBsZXQgdmlldyA9IHRpbnliaW5kLmJpbmQoZWwsIHNjb3BlKTtcbiAgdmlldy5iaW5kKCk7XG4gIHJldHVybiB2aWV3O1xufTtcblxuLy8gTW92ZSB0byBmb3JtYXR0ZXJzXG50aW55YmluZC5mb3JtYXR0ZXJzLm5lZ2F0ZSA9IHRpbnliaW5kLmZvcm1hdHRlcnMubm90ID0gZnVuY3Rpb24gKHZhbHVlOiBib29sZWFuKSB7XG4gIHJldHVybiAhdmFsdWU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0aW55YmluZDtcbiIsIlxuaW1wb3J0IHsgSUFkYXB0ZXJzIH0gZnJvbSAnLi9hZGFwdGVyJztcblxuaW1wb3J0IHsgSVZpZXdPcHRpb25zIH0gZnJvbSAnLi9leHBvcnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDYWxsYmFjayB7XG4gIHN5bmM6ICgpID0+IHZvaWQ7XG59XG5leHBvcnQgaW50ZXJmYWNlIElLZXkge1xuICBwYXRoOiBhbnk7XG4gIGk6IFJvb3Q7XG59XG5cbmV4cG9ydCB0eXBlIE9iaiA9IGFueTtcblxuZXhwb3J0IHR5cGUgUm9vdCA9IGFueTtcblxuLy8gQ2hlY2sgaWYgYSB2YWx1ZSBpcyBhbiBvYmplY3QgdGhhbiBjYW4gYmUgb2JzZXJ2ZWQuXG5mdW5jdGlvbiBpc09iamVjdChvYmo6IE9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsXG59XG5cbi8vIEVycm9yIHRocm93ZXIuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdbT2JzZXJ2ZXJdICcgKyBtZXNzYWdlKVxufVxuXG4vLyBUT0RPXG5sZXQgYWRhcHRlcnM6IElBZGFwdGVycztcbmxldCBpbnRlcmZhY2VzOiBzdHJpbmdbXTtcbmxldCByb290SW50ZXJmYWNlOiBSb290O1xuXG5leHBvcnQgY2xhc3MgT2JzZXJ2ZXIge1xuICBrZXlwYXRoOiBzdHJpbmc7XG4gIGNhbGxiYWNrOiBJQ2FsbGJhY2s7XG4gIG9iamVjdFBhdGg6IE9ialtdO1xuICBvYmo6IE9iajtcbiAgdGFyZ2V0OiBPYmo7XG4gIGtleTogSUtleTtcbiAgdG9rZW5zOiBJS2V5W107XG4gIC8vIENvbnN0cnVjdHMgYSBuZXcga2V5cGF0aCBvYnNlcnZlciBhbmQga2lja3MgdGhpbmdzIG9mZi5cbiAgY29uc3RydWN0b3Iob2JqOiBPYmosIGtleXBhdGg6IHN0cmluZywgY2FsbGJhY2s6IElDYWxsYmFjaykge1xuICAgIHRoaXMua2V5cGF0aCA9IGtleXBhdGg7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMub2JqZWN0UGF0aCA9IFtdO1xuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID0gdGhpcy5wYXJzZSgpO1xuICAgIHRoaXMua2V5ID0gcGFyc2VSZXN1bHQua2V5O1xuICAgIHRoaXMudG9rZW5zID0gcGFyc2VSZXN1bHQudG9rZW5zO1xuICAgIHRoaXMub2JqID0gdGhpcy5nZXRSb290T2JqZWN0KG9iaik7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLnJlYWxpemUoKTtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICB0aGlzLnNldCh0cnVlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9uczogSVZpZXdPcHRpb25zKSB7XG4gICAgYWRhcHRlcnMgPSBvcHRpb25zLmFkYXB0ZXJzO1xuICAgIGludGVyZmFjZXMgPSBPYmplY3Qua2V5cyhhZGFwdGVycyk7XG4gICAgcm9vdEludGVyZmFjZSA9IG9wdGlvbnMucm9vdEludGVyZmFjZTtcbiAgfVxuICBcbiAgLy8gVG9rZW5pemVzIHRoZSBwcm92aWRlZCBrZXlwYXRoIHN0cmluZyBpbnRvIGludGVyZmFjZSArIHBhdGggdG9rZW5zIGZvciB0aGVcbiAgLy8gb2JzZXJ2ZXIgdG8gd29yayB3aXRoLlxuICBzdGF0aWMgdG9rZW5pemUgPSBmdW5jdGlvbihrZXlwYXRoOiBzdHJpbmcsIHJvb3Q6IFJvb3QpIHtcbiAgICB2YXIgdG9rZW5zOiBhbnlbXSA9IFtdO1xuICAgIHZhciBjdXJyZW50OiBJS2V5ID0ge2k6IHJvb3QsIHBhdGg6ICcnfTtcbiAgICB2YXIgaW5kZXg6IG51bWJlcjtcbiAgICB2YXIgY2hyOiBzdHJpbmc7XG4gIFxuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGtleXBhdGgubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjaHIgPSBrZXlwYXRoLmNoYXJBdChpbmRleCk7XG4gIFxuICAgICAgaWYgKCEhfmludGVyZmFjZXMuaW5kZXhPZihjaHIpKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICBjdXJyZW50ID0ge2k6IGNociwgcGF0aDogJyd9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudC5wYXRoICs9IGNocjtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHRva2Vucy5wdXNoKGN1cnJlbnQpO1xuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cbiAgXG4gIC8vIFBhcnNlcyB0aGUga2V5cGF0aCB1c2luZyB0aGUgaW50ZXJmYWNlcyBkZWZpbmVkIG9uIHRoZSB2aWV3LiBTZXRzIHZhcmlhYmxlc1xuICAvLyBmb3IgdGhlIHRva2VuaXplZCBrZXlwYXRoIGFzIHdlbGwgYXMgdGhlIGVuZCBrZXkuXG4gIHBhcnNlKCkge1xuICAgIHZhciBwYXRoOiBzdHJpbmc7XG4gICAgdmFyIHJvb3Q6IFJvb3Q7XG4gIFxuICAgIGlmICghaW50ZXJmYWNlcy5sZW5ndGgpIHtcbiAgICAgIGVycm9yKCdNdXN0IGRlZmluZSBhdCBsZWFzdCBvbmUgYWRhcHRlciBpbnRlcmZhY2UuJyk7XG4gICAgfVxuICBcbiAgICBpZiAoISF+aW50ZXJmYWNlcy5pbmRleE9mKHRoaXMua2V5cGF0aFswXSkpIHtcbiAgICAgIHJvb3QgPSB0aGlzLmtleXBhdGhbMF07XG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoLnN1YnN0cigxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdCA9IHJvb3RJbnRlcmZhY2U7XG4gICAgICBwYXRoID0gdGhpcy5rZXlwYXRoO1xuICAgIH1cbiAgXG4gICAgdGhpcy50b2tlbnMgPSBPYnNlcnZlci50b2tlbml6ZShwYXRoLCByb290KTtcblxuICAgIGlmKCF0aGlzLnRva2Vucy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gdG9rZW5zJyk7XG4gICAgfVxuXG4gICAgdGhpcy5rZXkgPSAodGhpcy50b2tlbnMucG9wKCkgYXMgSUtleSk7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICB0b2tlbnM6IHRoaXMudG9rZW5zLFxuICAgIH1cbiAgfVxuICBcbiAgLy8gUmVhbGl6ZXMgdGhlIGZ1bGwga2V5cGF0aCwgYXR0YWNoaW5nIG9ic2VydmVycyBmb3IgZXZlcnkga2V5IGFuZCBjb3JyZWN0aW5nXG4gIC8vIG9sZCBvYnNlcnZlcnMgdG8gYW55IGNoYW5nZWQgb2JqZWN0cyBpbiB0aGUga2V5cGF0aC5cbiAgcmVhbGl6ZSgpIHtcbiAgICB2YXIgY3VycmVudDogT2JqID0gdGhpcy5vYmpcbiAgICB2YXIgdW5yZWFjaGVkID0gLTFcbiAgICB2YXIgcHJldlxuICAgIHZhciB0b2tlblxuICBcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy50b2tlbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5zW2luZGV4XVxuICAgICAgaWYgKGlzT2JqZWN0KGN1cnJlbnQpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vYmplY3RQYXRoW2luZGV4XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoY3VycmVudCAhPT0gKHByZXYgPSB0aGlzLm9iamVjdFBhdGhbaW5kZXhdKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoZmFsc2UsIHRva2VuLCBwcmV2LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5zZXQodHJ1ZSwgdG9rZW4sIGN1cnJlbnQsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldCh0cnVlLCB0b2tlbiwgY3VycmVudCwgdGhpcylcbiAgICAgICAgICB0aGlzLm9iamVjdFBhdGhbaW5kZXhdID0gY3VycmVudFxuICAgICAgICB9XG4gIFxuICAgICAgICBjdXJyZW50ID0gdGhpcy5nZXQodG9rZW4sIGN1cnJlbnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodW5yZWFjaGVkID09PSAtMSkge1xuICAgICAgICAgIHVucmVhY2hlZCA9IGluZGV4XG4gICAgICAgIH1cbiAgXG4gICAgICAgIGlmIChwcmV2ID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICAgIHRoaXMuc2V0KGZhbHNlLCB0b2tlbiwgcHJldiwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXG4gICAgaWYgKHVucmVhY2hlZCAhPT0gLTEpIHtcbiAgICAgIHRoaXMub2JqZWN0UGF0aC5zcGxpY2UodW5yZWFjaGVkKVxuICAgIH1cbiAgXG4gICAgcmV0dXJuIGN1cnJlbnRcbiAgfVxuICBcbiAgLy8gVXBkYXRlcyB0aGUga2V5cGF0aC4gVGhpcyBpcyBjYWxsZWQgd2hlbiBhbnkgaW50ZXJtZWRpYXJ5IGtleSBpcyBjaGFuZ2VkLlxuICBzeW5jKCkge1xuICAgIHZhciBuZXh0LCBvbGRWYWx1ZSwgbmV3VmFsdWVcbiAgXG4gICAgaWYgKChuZXh0ID0gdGhpcy5yZWFsaXplKCkpICE9PSB0aGlzLnRhcmdldCkge1xuICAgICAgaWYgKGlzT2JqZWN0KHRoaXMudGFyZ2V0KSkge1xuICAgICAgICB0aGlzLnNldChmYWxzZSwgdGhpcy5rZXksIHRoaXMudGFyZ2V0LCB0aGlzLmNhbGxiYWNrKVxuICAgICAgfVxuICBcbiAgICAgIGlmIChpc09iamVjdChuZXh0KSkge1xuICAgICAgICB0aGlzLnNldCh0cnVlLCB0aGlzLmtleSwgbmV4dCwgdGhpcy5jYWxsYmFjaylcbiAgICAgIH1cbiAgXG4gICAgICBvbGRWYWx1ZSA9IHRoaXMudmFsdWUoKVxuICAgICAgdGhpcy50YXJnZXQgPSBuZXh0XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWUoKVxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSB8fCBuZXdWYWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB0aGlzLmNhbGxiYWNrLnN5bmMoKVxuICAgIH0gZWxzZSBpZiAobmV4dCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLmNhbGxiYWNrLnN5bmMoKVxuICAgIH1cbiAgfVxuICBcbiAgLy8gUmVhZHMgdGhlIGN1cnJlbnQgZW5kIHZhbHVlIG9mIHRoZSBvYnNlcnZlZCBrZXlwYXRoLiBSZXR1cm5zIHVuZGVmaW5lZCBpZlxuICAvLyB0aGUgZnVsbCBrZXlwYXRoIGlzIHVucmVhY2hhYmxlLlxuICB2YWx1ZSgpIHtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXQodGhpcy5rZXksIHRoaXMudGFyZ2V0KVxuICAgIH1cbiAgfVxuICBcbiAgLy8gU2V0cyB0aGUgY3VycmVudCBlbmQgdmFsdWUgb2YgdGhlIG9ic2VydmVkIGtleXBhdGguIENhbGxpbmcgc2V0VmFsdWUgd2hlblxuICAvLyB0aGUgZnVsbCBrZXlwYXRoIGlzIHVucmVhY2hhYmxlIGlzIGEgbm8tb3AuXG4gIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoaXNPYmplY3QodGhpcy50YXJnZXQpKSB7XG4gICAgICBhZGFwdGVyc1t0aGlzLmtleS5pXS5zZXQodGhpcy50YXJnZXQsIHRoaXMua2V5LnBhdGgsIHZhbHVlKVxuICAgIH1cbiAgfVxuICBcbiAgLy8gR2V0cyB0aGUgcHJvdmlkZWQga2V5IG9uIGFuIG9iamVjdC5cbiAgZ2V0KGtleTogSUtleSwgb2JqOiBPYmopIHtcbiAgICByZXR1cm4gYWRhcHRlcnNba2V5LmldLmdldChvYmosIGtleS5wYXRoKVxuICB9XG4gIFxuICAvLyBPYnNlcnZlcyBvciB1bm9ic2VydmVzIGEgY2FsbGJhY2sgb24gdGhlIG9iamVjdCB1c2luZyB0aGUgcHJvdmlkZWQga2V5LlxuICBzZXQoYWN0aXZlOiBib29sZWFuLCBrZXk6IElLZXksIG9iajogT2JqLCBjYWxsYmFjazogSUNhbGxiYWNrKSB7XG4gICAgaWYoYWN0aXZlKSB7XG4gICAgICBhZGFwdGVyc1trZXkuaV0ub2JzZXJ2ZShvYmosIGtleS5wYXRoLCBjYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgYWRhcHRlcnNba2V5LmldLnVub2JzZXJ2ZShvYmosIGtleS5wYXRoLCBjYWxsYmFjaylcbiAgICB9XG4gIH1cbiAgXG4gIFxuICAvLyBVbm9ic2VydmVzIHRoZSBlbnRpcmUga2V5cGF0aC5cbiAgdW5vYnNlcnZlKCkge1xuICAgIHZhciBvYmo6IE9iajtcbiAgICB2YXIgdG9rZW47XG4gIFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRva2Vucy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbnNbaW5kZXhdXG4gICAgICBpZiAob2JqID0gdGhpcy5vYmplY3RQYXRoW2luZGV4XSkge1xuICAgICAgICB0aGlzLnNldChmYWxzZSwgdG9rZW4sIG9iaiwgdGhpcylcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGlmIChpc09iamVjdCh0aGlzLnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0KGZhbHNlLCB0aGlzLmtleSwgdGhpcy50YXJnZXQsIHRoaXMuY2FsbGJhY2spXG4gICAgfVxuICB9XG4gIC8vIHRyYXZlcnNlIHRoZSBzY29wZSBjaGFpbiB0byBmaW5kIHRoZSBzY29wZSB3aGljaCBoYXMgdGhlIHJvb3QgcHJvcGVydHlcbiAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBmb3VuZCBpbiBjaGFpbiwgcmV0dXJucyB0aGUgcm9vdCBzY29wZVxuICBnZXRSb290T2JqZWN0KG9iajogT2JqKSB7XG4gICAgdmFyIHJvb3RQcm9wLCBjdXJyZW50O1xuICAgIGlmICghb2JqLiRwYXJlbnQpIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICBcbiAgICBpZiAodGhpcy50b2tlbnMubGVuZ3RoKSB7XG4gICAgICByb290UHJvcCA9IHRoaXMudG9rZW5zWzBdLnBhdGhcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vdFByb3AgPSB0aGlzLmtleS5wYXRoXG4gICAgfVxuICBcbiAgICBjdXJyZW50ID0gb2JqO1xuICAgIHdoaWxlIChjdXJyZW50LiRwYXJlbnQgJiYgKGN1cnJlbnRbcm9vdFByb3BdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICBjdXJyZW50ID0gY3VycmVudC4kcGFyZW50XG4gICAgfVxuICBcbiAgICByZXR1cm4gY3VycmVudDtcbiAgfVxufVxuIiwiLyoqXG4gKiBVc2VkIGFsc28gaW4gcGFyc2Vycy5wYXJzZVR5cGVcbiAqIFRPRE8gb3V0c291cmNlXG4gKi9cbmNvbnN0IFBSSU1JVElWRSA9IDA7XG5jb25zdCBLRVlQQVRIID0gMTtcblxuY29uc3QgUVVPVEVEX1NUUiA9IC9eJy4qJyR8XlwiLipcIiQvOyAvLyByZWdleCB0byB0ZXN0IGlmIHN0cmluZyBpcyB3cmFwcGVkIGluIFwiIG9yICdcblxuLy8gVXNlZCBpbiBwYXJzZXJzLnBhcnNlVGVtcGxhdGVcbmNvbnN0IFRFWFQgPSAwO1xuY29uc3QgQklORElORyA9IDE7XG5cbi8vIFRlc3QgaWYgc3RyaW5nIGlzIGEganNvbiBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBpc0pzb24oc3RyKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdmFsID0gSlNPTi5wYXJzZShzdHIpO1xuICAgIHJldHVybiAodmFsIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsIGluc3RhbmNlb2YgT2JqZWN0KSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLy8gUGFyc2VyIGFuZCB0b2tlbml6ZXIgZm9yIGdldHRpbmcgdGhlIHR5cGUgYW5kIHZhbHVlIGZyb20gYSBzdHJpbmcuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUeXBlKHN0cmluZykge1xuICBsZXQgdHlwZSA9IFBSSU1JVElWRTtcbiAgbGV0IHZhbHVlID0gc3RyaW5nO1xuICBpZiAoUVVPVEVEX1NUUi50ZXN0KHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IHN0cmluZy5zbGljZSgxLCAtMSk7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAndHJ1ZScpIHtcbiAgICB2YWx1ZSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc3RyaW5nID09PSAnZmFsc2UnKSB7XG4gICAgdmFsdWUgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICdudWxsJykge1xuICAgIHZhbHVlID0gbnVsbDtcbiAgfSBlbHNlIGlmIChzdHJpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoIWlzTmFOKHN0cmluZykpIHtcbiAgICB2YWx1ZSA9IE51bWJlcihzdHJpbmcpO1xuICB9IGVsc2UgaWYgKGlzSnNvbihzdHJpbmcpKSB7XG4gICAgdmFsdWUgPSBKU09OLnBhcnNlKHN0cmluZyk7XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IEtFWVBBVEg7XG4gIH1cbiAgcmV0dXJuIHt0eXBlOiB0eXBlLCB2YWx1ZTogdmFsdWV9O1xufVxuXG4vLyBUZW1wbGF0ZSBwYXJzZXIgYW5kIHRva2VuaXplciBmb3IgbXVzdGFjaGUtc3R5bGUgdGV4dCBjb250ZW50IGJpbmRpbmdzLlxuLy8gUGFyc2VzIHRoZSB0ZW1wbGF0ZSBhbmQgcmV0dXJucyBhIHNldCBvZiB0b2tlbnMsIHNlcGFyYXRpbmcgc3RhdGljIHBvcnRpb25zXG4vLyBvZiB0ZXh0IGZyb20gYmluZGluZyBkZWNsYXJhdGlvbnMuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgZGVsaW1pdGVycykge1xuICB2YXIgdG9rZW5zO1xuICBsZXQgbGVuZ3RoID0gdGVtcGxhdGUubGVuZ3RoO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgbGV0IG9wZW4gPSBkZWxpbWl0ZXJzWzBdLCBjbG9zZSA9IGRlbGltaXRlcnNbMV07XG5cbiAgd2hpbGUgKGxhc3RJbmRleCA8IGxlbmd0aCkge1xuICAgIGluZGV4ID0gdGVtcGxhdGUuaW5kZXhPZihvcGVuLCBsYXN0SW5kZXgpO1xuXG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgdHlwZTogVEVYVCxcbiAgICAgICAgICB2YWx1ZTogdGVtcGxhdGUuc2xpY2UobGFzdEluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VucyA9IHRva2VucyB8fCBbXTtcbiAgICAgIGlmIChpbmRleCA+IDAgJiYgbGFzdEluZGV4IDwgaW5kZXgpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICAgIHR5cGU6IFRFWFQsXG4gICAgICAgICAgdmFsdWU6IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIG9wZW4ubGVuZ3RoO1xuICAgICAgaW5kZXggPSB0ZW1wbGF0ZS5pbmRleE9mKGNsb3NlLCBsYXN0SW5kZXgpO1xuXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIGxldCBzdWJzdHJpbmcgPSB0ZW1wbGF0ZS5zbGljZShsYXN0SW5kZXggLSBjbG9zZS5sZW5ndGgpO1xuICAgICAgICBsZXQgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAobGFzdFRva2VuICYmIGxhc3RUb2tlbi50eXBlID09PSBURVhUKSB7XG4gICAgICAgICAgbGFzdFRva2VuLnZhbHVlICs9IHN1YnN0cmluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiBURVhULFxuICAgICAgICAgICAgdmFsdWU6IHN1YnN0cmluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IHRlbXBsYXRlLnNsaWNlKGxhc3RJbmRleCwgaW5kZXgpLnRyaW0oKTtcblxuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBCSU5ESU5HLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICBsYXN0SW5kZXggPSBpbmRleCArIGNsb3NlLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuIiwiaW1wb3J0IHsgRVhURU5TSU9OUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IHBhcnNlVGVtcGxhdGUsIHBhcnNlVHlwZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5cbi8vIFRPRE8gbW92ZSB0byB1aXRpbHNcbmNvbnN0IG1lcmdlT2JqZWN0ID0gKHRhcmdldCwgb2JqKSA9PiB7XG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmICghdGFyZ2V0W2tleV0gfHwgdGFyZ2V0W2tleV0gPT09IHt9KSB7XG4gICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7IFxufTtcblxuY29uc3QgdGlueWJpbmQgPSB7XG4gIC8vIEdsb2JhbCBiaW5kZXJzLlxuICBiaW5kZXJzOiB7fSxcblxuICAvLyBHbG9iYWwgY29tcG9uZW50cy5cbiAgY29tcG9uZW50czoge30sXG5cbiAgLy8gR2xvYmFsIGZvcm1hdHRlcnMuXG4gIGZvcm1hdHRlcnM6IHt9LFxuXG4gIC8vIEdsb2JhbCBzaWdodGdsYXNzIGFkYXB0ZXJzLlxuICBhZGFwdGVyczoge30sXG5cbiAgLy8gRGVmYXVsdCBhdHRyaWJ1dGUgcHJlZml4LlxuICBfcHJlZml4OiAncnYnLFxuXG4gIF9mdWxsUHJlZml4OiAncnYtJyxcblxuICBnZXQgcHJlZml4ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlZml4O1xuICB9LFxuXG4gIHNldCBwcmVmaXggKHZhbHVlKSB7XG4gICAgdGhpcy5fcHJlZml4ID0gdmFsdWU7XG4gICAgdGhpcy5fZnVsbFByZWZpeCA9IHZhbHVlICsgJy0nO1xuICB9LFxuXG4gIHBhcnNlVGVtcGxhdGU6IHBhcnNlVGVtcGxhdGUsXG5cbiAgcGFyc2VUeXBlOiBwYXJzZVR5cGUsXG5cbiAgLy8gRGVmYXVsdCB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLlxuICB0ZW1wbGF0ZURlbGltaXRlcnM6IFsneycsICd9J10sXG5cbiAgLy8gRGVmYXVsdCBzaWdodGdsYXNzIHJvb3QgaW50ZXJmYWNlLlxuICByb290SW50ZXJmYWNlOiAnLicsXG5cbiAgLy8gUHJlbG9hZCBkYXRhIGJ5IGRlZmF1bHQuXG4gIHByZWxvYWREYXRhOiB0cnVlLFxuXG4gIC8vIERlZmF1bHQgZXZlbnQgaGFuZGxlci5cbiAgaGFuZGxlcjogZnVuY3Rpb24oY29udGV4dCwgZXYsIGJpbmRpbmcpIHtcbiAgICB0aGlzLmNhbGwoY29udGV4dCwgZXYsIGJpbmRpbmcudmlldy5tb2RlbHMpO1xuICB9LFxuXG4gIC8vIFNldHMgdGhlIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC4gSWYgbm8gYmluZGVyIGFib3ZlIGlzIG1hdGNoZWQgaXQgd2lsbCBmYWxsXG4gIC8vIGJhY2sgdG8gdXNpbmcgdGhpcyBiaW5kZXIuXG4gIGZhbGxiYWNrQmluZGVyOiBmdW5jdGlvbihlbCwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKHRoaXMudHlwZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUodGhpcy50eXBlKTtcbiAgICB9ICBcbiAgfSxcblxuICAvLyBNZXJnZXMgYW4gb2JqZWN0IGxpdGVyYWwgaW50byB0aGUgY29ycmVzcG9uZGluZyBnbG9iYWwgb3B0aW9ucy5cbiAgY29uZmlndXJlOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gbWVyZ2VPYmplY3QodGhpcy5iaW5kZXJzLCBvcHRpb25zLmJpbmRlcnMpO1xuICAgIC8vIG1lcmdlT2JqZWN0KHRoaXMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXR0ZXJzKTtcbiAgICAvLyBtZXJnZU9iamVjdCh0aGlzLmNvbXBvbmVudHMsIG9wdGlvbnMuY29tcG9uZW50cyk7XG4gICAgLy8gbWVyZ2VPYmplY3QodGhpcy5hZGFwdGVycywgb3B0aW9ucy5hZGFwdGVycyk7XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBvcHRpb25zW29wdGlvbl07XG5cbiAgICAgIGlmIChFWFRFTlNJT05TLmluZGV4T2Yob3B0aW9uKSA+IC0xKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgdGhpc1tvcHRpb25dW2tleV0gPSB2YWx1ZVtrZXldO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbb3B0aW9uXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0aW55YmluZDtcbiIsImltcG9ydCB0aW55YmluZCBmcm9tICcuL3RpbnliaW5kJztcbmltcG9ydCB7IEJpbmRpbmcgfSBmcm9tICcuL2JpbmRpbmcnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmluZGluZyB9IGZyb20gJy4vY29tcG9uZW50LWJpbmRpbmcnO1xuaW1wb3J0IHsgcGFyc2VUZW1wbGF0ZSB9IGZyb20gJy4vcGFyc2Vycyc7XG5cbmNvbnN0IHRleHRCaW5kZXIgPSB7XG4gIHJvdXRpbmU6IChub2RlLCB2YWx1ZSkgPT4ge1xuICAgIG5vZGUuZGF0YSA9ICh2YWx1ZSAhPSBudWxsKSA/IHZhbHVlIDogJyc7XG4gIH1cbn07XG5cbmNvbnN0IERFQ0xBUkFUSU9OX1NQTElUID0gLygoPzonW14nXSonKSooPzooPzpbXlxcfCddKig/OidbXiddKicpK1teXFx8J10qKSt8W15cXHxdKykpfF4kL2c7XG5cbmNvbnN0IHBhcnNlTm9kZSA9ICh2aWV3LCBub2RlKSA9PiB7XG4gIGxldCBibG9jayA9IGZhbHNlO1xuXG4gIGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgbGV0IHRva2VucyA9IHBhcnNlVGVtcGxhdGUobm9kZS5kYXRhLCB0aW55YmluZC50ZW1wbGF0ZURlbGltaXRlcnMpO1xuXG4gICAgaWYgKHRva2Vucykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBsZXQgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRva2VuLnZhbHVlKTtcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0ZXh0LCBub2RlKTtcblxuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMSkge1xuICAgICAgICAgIHZpZXcuYnVpbGRCaW5kaW5nKHRleHQsIG51bGwsIHRva2VuLnZhbHVlLCB0ZXh0QmluZGVyLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuICAgIGJsb2NrID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgYmxvY2sgPSB2aWV3LnRyYXZlcnNlKG5vZGUpO1xuICB9XG5cbiAgaWYgKCFibG9jaykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwYXJzZU5vZGUodmlldywgbm9kZS5jaGlsZE5vZGVzW2ldKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGJpbmRpbmdDb21wYXJhdG9yID0gKGEsIGIpID0+IHtcbiAgbGV0IGFQcmlvcml0eSA9IGEuYmluZGVyID8gKGEuYmluZGVyLnByaW9yaXR5IHx8IDApIDogMDtcbiAgbGV0IGJQcmlvcml0eSA9IGIuYmluZGVyID8gKGIuYmluZGVyLnByaW9yaXR5IHx8IDApIDogMDtcbiAgcmV0dXJuIGJQcmlvcml0eSAtIGFQcmlvcml0eTtcbn07XG5cbmNvbnN0IHRyaW1TdHIgPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIudHJpbSgpO1xufTtcblxuLy8gQSBjb2xsZWN0aW9uIG9mIGJpbmRpbmdzIGJ1aWx0IGZyb20gYSBzZXQgb2YgcGFyZW50IG5vZGVzLlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIC8vIFRoZSBET00gZWxlbWVudHMgYW5kIHRoZSBtb2RlbCBvYmplY3RzIGZvciBiaW5kaW5nIGFyZSBwYXNzZWQgaW50byB0aGVcbiAgLy8gY29uc3RydWN0b3IgYWxvbmcgd2l0aCBhbnkgbG9jYWwgb3B0aW9ucyB0aGF0IHNob3VsZCBiZSB1c2VkIHRocm91Z2hvdXQgdGhlXG4gIC8vIGNvbnRleHQgb2YgdGhlIHZpZXcgYW5kIGl0J3MgYmluZGluZ3MuXG4gIGNvbnN0cnVjdG9yKGVscywgbW9kZWxzLCBvcHRpb25zKSB7XG4gICAgaWYgKGVscy5qcXVlcnkgfHwgZWxzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMuZWxzID0gZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVscyA9IFtlbHNdO1xuICAgIH1cblxuICAgIHRoaXMubW9kZWxzID0gbW9kZWxzO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICB0aGlzLmJ1aWxkKCk7XG4gIH1cblxuXG4gIGJ1aWxkQmluZGluZyhub2RlLCB0eXBlLCBkZWNsYXJhdGlvbiwgYmluZGVyLCBhcmdzKSB7XG4gICAgbGV0IHBpcGVzID0gZGVjbGFyYXRpb24ubWF0Y2goREVDTEFSQVRJT05fU1BMSVQpLm1hcCh0cmltU3RyKTtcbiAgICBsZXQga2V5cGF0aCA9IHBpcGVzLnNoaWZ0KCk7XG4gICAgdGhpcy5iaW5kaW5ncy5wdXNoKG5ldyBCaW5kaW5nKHRoaXMsIG5vZGUsIHR5cGUsIGtleXBhdGgsIGJpbmRlciwgYXJncywgcGlwZXMpKTtcbiAgfVxuXG4gIC8vIFBhcnNlcyB0aGUgRE9NIHRyZWUgYW5kIGJ1aWxkcyBgQmluZGluZ2AgaW5zdGFuY2VzIGZvciBldmVyeSBtYXRjaGVkXG4gIC8vIGJpbmRpbmcgZGVjbGFyYXRpb24uXG4gIGJ1aWxkKCkge1xuICAgIHRoaXMuYmluZGluZ3MgPSBbXTtcblxuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuZWxzLCBpLCBsZW47XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHBhcnNlTm9kZSh0aGlzLCBlbGVtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgdGhpcy5iaW5kaW5ncy5zb3J0KGJpbmRpbmdDb21wYXJhdG9yKTtcbiAgfVxuXG4gIHRyYXZlcnNlKG5vZGUpIHtcbiAgICBsZXQgYmluZGluZ1ByZWZpeCA9IHRpbnliaW5kLl9mdWxsUHJlZml4O1xuICAgIGxldCBibG9jayA9IG5vZGUubm9kZU5hbWUgPT09ICdTQ1JJUFQnIHx8IG5vZGUubm9kZU5hbWUgPT09ICdTVFlMRSc7XG4gICAgbGV0IGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgbGV0IGJpbmRJbmZvcyA9IFtdO1xuICAgIGxldCBzdGFyQmluZGVycyA9IHRoaXMub3B0aW9ucy5zdGFyQmluZGVycztcbiAgICB2YXIgdHlwZSwgYmluZGVyLCBpZGVudGlmaWVyLCBhcmdzO1xuXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXR0cmlidXRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGV0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgICAvLyBpZiBhdHRyaWJ1dGUgc3RhcnRzIHdpdGggdGhlIGJpbmRpbmcgcHJlZml4LiBFLmcuIHJ2XG4gICAgICBpZiAoYXR0cmlidXRlLm5hbWUuaW5kZXhPZihiaW5kaW5nUHJlZml4KSA9PT0gMCkge1xuICAgICAgICB0eXBlID0gYXR0cmlidXRlLm5hbWUuc2xpY2UoYmluZGluZ1ByZWZpeC5sZW5ndGgpO1xuICAgICAgICBiaW5kZXIgPSB0aGlzLm9wdGlvbnMuYmluZGVyc1t0eXBlXTtcbiAgICAgICAgYXJncyA9IFtdO1xuXG4gICAgICAgIGlmICghYmluZGVyKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzdGFyQmluZGVycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgaWRlbnRpZmllciA9IHN0YXJCaW5kZXJzW2tdO1xuICAgICAgICAgICAgaWYgKHR5cGUuc2xpY2UoMCwgaWRlbnRpZmllci5sZW5ndGggLSAxKSA9PT0gaWRlbnRpZmllci5zbGljZSgwLCAtMSkpIHtcbiAgICAgICAgICAgICAgYmluZGVyID0gdGhpcy5vcHRpb25zLmJpbmRlcnNbaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgIGFyZ3MucHVzaCh0eXBlLnNsaWNlKGlkZW50aWZpZXIubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWJpbmRlcikge1xuICAgICAgICAgIGJpbmRlciA9IHRpbnliaW5kLmZhbGxiYWNrQmluZGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJpbmRlci5ibG9jaykge1xuICAgICAgICAgIHRoaXMuYnVpbGRCaW5kaW5nKG5vZGUsIHR5cGUsIGF0dHJpYnV0ZS52YWx1ZSwgYmluZGVyLCBhcmdzKTtcbiAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5kSW5mb3MucHVzaCh7YXR0cjogYXR0cmlidXRlLCBiaW5kZXI6IGJpbmRlciwgdHlwZTogdHlwZSwgYXJnczogYXJnc30pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZEluZm9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYmluZEluZm8gPSBiaW5kSW5mb3NbaV07XG4gICAgICB0aGlzLmJ1aWxkQmluZGluZyhub2RlLCBiaW5kSW5mby50eXBlLCBiaW5kSW5mby5hdHRyLnZhbHVlLCBiaW5kSW5mby5iaW5kZXIsIGJpbmRJbmZvLmFyZ3MpO1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYmluZEluZm8uYXR0ci5uYW1lKTtcbiAgICB9XG5cbiAgICAvLyBiaW5kIGNvbXBvbmVudHNcbiAgICBpZiAoIWJsb2NrKSB7XG4gICAgICB0eXBlID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmNvbXBvbmVudHNbdHlwZV0gJiYgIW5vZGUuX2JvdW5kKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MucHVzaChuZXcgQ29tcG9uZW50QmluZGluZyh0aGlzLCBub2RlLCB0eXBlKSk7XG4gICAgICAgIGJsb2NrID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYmxvY2s7XG4gIH1cblxuICAvLyBCaW5kcyBhbGwgb2YgdGhlIGN1cnJlbnQgYmluZGluZ3MgZm9yIHRoaXMgdmlldy5cbiAgYmluZCgpIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBiaW5kaW5nLmJpbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVuYmluZHMgYWxsIG9mIHRoZSBjdXJyZW50IGJpbmRpbmdzIGZvciB0aGlzIHZpZXcuXG4gIHVuYmluZCgpIHtcbiAgICBpZihBcnJheS5pc0FycmF5KHRoaXMuYmluZGluZ3MpKSB7XG4gICAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICAgIGJpbmRpbmcudW5iaW5kKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYodGhpcy5jb21wb25lbnRWaWV3KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFZpZXcudW5iaW5kKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU3luY3MgdXAgdGhlIHZpZXcgd2l0aCB0aGUgbW9kZWwgYnkgcnVubmluZyB0aGUgcm91dGluZXMgb24gYWxsIGJpbmRpbmdzLlxuICBzeW5jKCkge1xuICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgIGJpbmRpbmcuc3luYygpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gUHVibGlzaGVzIHRoZSBpbnB1dCB2YWx1ZXMgZnJvbSB0aGUgdmlldyBiYWNrIHRvIHRoZSBtb2RlbCAocmV2ZXJzZSBzeW5jKS5cbiAgcHVibGlzaCgpIHtcbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBpZiAoYmluZGluZy5iaW5kZXIgJiYgYmluZGluZy5iaW5kZXIucHVibGlzaGVzKSB7XG4gICAgICAgIGJpbmRpbmcucHVibGlzaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gVXBkYXRlcyB0aGUgdmlldydzIG1vZGVscyBhbG9uZyB3aXRoIGFueSBhZmZlY3RlZCBiaW5kaW5ncy5cbiAgdXBkYXRlKG1vZGVscyA9IHt9KSB7XG4gICAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLm1vZGVsc1trZXldID0gbW9kZWxzW2tleV07XG4gICAgfSk7XG5cbiAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goYmluZGluZyA9PiB7XG4gICAgICBpZiAoYmluZGluZy51cGRhdGUpIHtcbiAgICAgICAgYmluZGluZy51cGRhdGUobW9kZWxzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==