/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/binders/index.ts":
/*!**********************************!*\
  !*** ./scripts/binders/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./scripts/components/link-list/link-list.component.ts":
/*!*************************************************************!*\
  !*** ./scripts/components/link-list/link-list.component.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LinkListComponent": function() { return /* binding */ LinkListComponent; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ribajs/core */ "../../packages/core/src/index.ts");









function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var LinkListComponent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(LinkListComponent, _Component);

  var _super = _createSuper(LinkListComponent);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(LinkListComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function LinkListComponent(element) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LinkListComponent);

    _this = _super.call(this, element);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "_debug", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "autobind", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "scope", {
      items: [{
        label: "Home",
        url: "/"
      }, {
        label: "Cool",
        url: "/pages/cool"
      }, {
        label: "Nice",
        url: "/pages/nice"
      }, {
        label: "Different",
        url: "/pages/different"
      }]
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(LinkListComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(LinkListComponent.prototype), "connectedCallback", this).call(this);

      this.init(LinkListComponent.observedAttributes);
    }
  }, {
    key: "template",
    value: function template() {
      return null;
    }
  }]);

  return LinkListComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_8__.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(LinkListComponent, "tagName", "link-list");

/***/ }),

/***/ "./scripts/formatters/index.ts":
/*!*************************************!*\
  !*** ./scripts/formatters/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./scripts/pages/index.ts":
/*!********************************!*\
  !*** ./scripts/pages/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexPageComponent": function() { return /* reexport safe */ _index_index_component__WEBPACK_IMPORTED_MODULE_0__.IndexPageComponent; },
/* harmony export */   "PagesPageComponent": function() { return /* reexport safe */ _pages_pages_component__WEBPACK_IMPORTED_MODULE_1__.PagesPageComponent; }
/* harmony export */ });
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index/index.component */ "./scripts/pages/index/index.component.ts");
/* harmony import */ var _pages_pages_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/pages.component */ "./scripts/pages/pages/pages.component.ts");



/***/ }),

/***/ "./scripts/pages/index/index.component.ts":
/*!************************************************!*\
  !*** ./scripts/pages/index/index.component.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexPageComponent": function() { return /* binding */ IndexPageComponent; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_ssr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/ssr */ "../../packages/ssr/src/index.ts");
/* harmony import */ var _index_component_pug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./index.component.pug */ "./scripts/pages/index/index.component.pug");
/* harmony import */ var _index_component_pug__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_index_component_pug__WEBPACK_IMPORTED_MODULE_11__);











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var IndexPageComponent = /*#__PURE__*/function (_PageComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(IndexPageComponent, _PageComponent);

  var _super = _createSuper(IndexPageComponent);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(IndexPageComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function IndexPageComponent() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, IndexPageComponent);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "_debug", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "autobind", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "scope", {
      title: "Hello from ssr",
      content: "When you can see this, ssr works :)",
      obj: {
        foo: "bar",
        note: "This is an example to test the json formatter"
      }
    });

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(IndexPageComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(IndexPageComponent.prototype), "connectedCallback", this).call(this);

      this.init(IndexPageComponent.observedAttributes);
    }
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(IndexPageComponent.prototype), "beforeBind", this).call(this);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(IndexPageComponent.prototype), "afterBind", this).call(this);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "template",
    value: function template() {
      return _index_component_pug__WEBPACK_IMPORTED_MODULE_11___default()(this.scope);
    }
  }]);

  return IndexPageComponent;
}(_ribajs_ssr__WEBPACK_IMPORTED_MODULE_10__.PageComponent);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(IndexPageComponent, "tagName", "index-page");

/***/ }),

/***/ "./scripts/pages/pages/pages.component.ts":
/*!************************************************!*\
  !*** ./scripts/pages/pages/pages.component.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PagesPageComponent": function() { return /* binding */ PagesPageComponent; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_ssr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/ssr */ "../../packages/ssr/src/index.ts");
/* harmony import */ var _pages_component_pug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages.component.pug */ "./scripts/pages/pages/pages.component.pug");
/* harmony import */ var _pages_component_pug__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_pages_component_pug__WEBPACK_IMPORTED_MODULE_11__);











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var PagesPageComponent = /*#__PURE__*/function (_PageComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(PagesPageComponent, _PageComponent);

  var _super = _createSuper(PagesPageComponent);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(PagesPageComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function PagesPageComponent() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PagesPageComponent);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "_debug", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "autobind", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "scope", {
      title: "About",
      content: "<p>We are {params.handle}!</a>",
      params: {}
    });

    _this.scope.params = _this.ctx.params;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(PagesPageComponent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(PagesPageComponent.prototype), "connectedCallback", this).call(this);

      this.init(PagesPageComponent.observedAttributes);
    }
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(PagesPageComponent.prototype), "beforeBind", this).call(this);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(PagesPageComponent.prototype), "afterBind", this).call(this);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "template",
    value: function template() {
      return _pages_component_pug__WEBPACK_IMPORTED_MODULE_11___default()(this.scope);
    }
  }]);

  return PagesPageComponent;
}(_ribajs_ssr__WEBPACK_IMPORTED_MODULE_10__.PageComponent);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(PagesPageComponent, "tagName", "pages-page");

/***/ }),

/***/ "./scripts/ssr.ts":
/*!************************!*\
  !*** ./scripts/ssr.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ribajs_ssr_src_polyfills__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ribajs/ssr/src/polyfills */ "../../packages/ssr/src/polyfills/index.ts");
/* harmony import */ var _ribajs_ssr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ribajs/ssr */ "../../packages/ssr/src/index.ts");
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ribajs/core */ "../../packages/core/src/index.ts");
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages */ "./scripts/pages/index.ts");
/* harmony import */ var _components_link_list_link_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/link-list/link-list.component */ "./scripts/components/link-list/link-list.component.ts");
/* harmony import */ var _binders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./binders */ "./scripts/binders/index.ts");
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./formatters */ "./scripts/formatters/index.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



 // import { i18nModule, LocalesStaticService } from "@ribajs/i18n";
// import { ready } from "@ribajs/utils/src/dom";
// Own




 // import locales from "./locales";

window.model = window.model || {};
window.riba = new _ribajs_core__WEBPACK_IMPORTED_MODULE_3__.Riba(); // Regist custom components

window.riba.module.regist({
  components: _objectSpread(_objectSpread({}, _pages__WEBPACK_IMPORTED_MODULE_4__), {}, {
    LinkListComponent: _components_link_list_link_list_component__WEBPACK_IMPORTED_MODULE_5__.LinkListComponent
  }),
  binders: _binders__WEBPACK_IMPORTED_MODULE_6__,
  formatters: _formatters__WEBPACK_IMPORTED_MODULE_7__
}); // const localesService = new LocalesStaticService(locales, undefined, false);
// window.riba.module.regist(i18nModule(localesService));
// Regist modules

window.riba.module.regist(_ribajs_core__WEBPACK_IMPORTED_MODULE_3__.coreModule);
window.riba.module.regist(_ribajs_ssr__WEBPACK_IMPORTED_MODULE_2__.SSRModule);
console.log("Hello from Riba");
window.view = window.riba.bind(document.body, window.model); // WORKAROUND / FIXME view.traverse method seems not to be working in jsdom / happy-dom

window.view.registComponents();
document.body.setAttribute("works", ":)");
console.log("Bind done");

/***/ }),

/***/ "../../infra/types/index.js":
/*!**********************************!*\
  !*** ../../infra/types/index.js ***!
  \**********************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/adapters/dot.adapter.ts":
/*!*******************************************************!*\
  !*** ../../packages/core/src/adapters/dot.adapter.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DotAdapter": function() { return /* binding */ DotAdapter; },
/* harmony export */   "dotAdapter": function() { return /* binding */ dotAdapter; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);



var DotAdapter = /*#__PURE__*/function () {
  function DotAdapter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DotAdapter);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "name", ".");

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "counter", 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "weakmap", {});
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DotAdapter, [{
    key: "weakReference",
    value: function weakReference(obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (!obj.hasOwnProperty("__rv")) {
        var id = this.counter++;
        Object.defineProperty(obj, "__rv", {
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
            if (Array.isArray(weakmap[r].callbacks[k])) {
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

      if (Array.isArray(obj)) {
        var map = this.weakReference(obj);

        if (!map.pointers) {
          map.pointers = {};
          DotAdapter.ARRAY_METHODS.forEach(function (fn) {
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
      if (Array.isArray(obj) && obj.__rv != null) {
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

  return DotAdapter;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(DotAdapter, "ARRAY_METHODS", ["push", "pop", "shift", "unshift", "sort", "reverse", "splice"]);

var dotAdapter = new DotAdapter();


/***/ }),

/***/ "../../packages/core/src/adapters/index.ts":
/*!*************************************************!*\
  !*** ../../packages/core/src/adapters/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dotAdapter": function() { return /* reexport safe */ _dot_adapter__WEBPACK_IMPORTED_MODULE_0__.dotAdapter; }
/* harmony export */ });
/* harmony import */ var _dot_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dot.adapter */ "../../packages/core/src/adapters/dot.adapter.ts");


/***/ }),

/***/ "../../packages/core/src/binders/add-class.binder.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/binders/add-class.binder.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addClassBinder": function() { return /* binding */ addClassBinder; }
/* harmony export */ });
/**
 * add-class
 * Adds the value of the attribute to the class.
 * Instead of `class-[classname]` the classname is setted by the
 * attribute value and not by the star value.
 * @example
 * <ul>
 *   <li rv-each-todo="todos">
 *     <div rv-add-class="todo.state"></div>
 *   </li>
 * <ul>
 */
var addClassBinder = {
  name: "add-class",
  "function": true,
  priority: 1000,
  bind: function bind(el) {
    this.customData = {
      staticClasses: el.className.split(" ")
    };
  },
  unbind: function unbind() {
    delete this.customData;
  },
  routine: function routine(el, newValue) {
    if (newValue) {
      if (this.customData.staticClasses.indexOf(newValue) === -1) {
        el.className = this.customData.staticClasses.join(" ") + " " + newValue;
      }
    } else {
      el.className = this.customData.staticClasses.join(" ");
    }

    el.className = el.className.trim();
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/animate-classname.binder.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/binders/animate-classname.binder.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animateStarBinder": function() { return /* binding */ animateStarBinder; }
/* harmony export */ });
/**
 * animate-{class}
 * Add / remove animation class with start and done affix
 */
var animateStarBinder = {
  name: "animate-*",
  "function": true,
  priority: 1000,
  bind: function bind(el) {
    var animateClassName = this.args[0];
    el.classList.add(animateClassName);
  },
  unbind: function unbind() {//
  },
  routine: function routine(el, start) {
    var animateClassName = this.args[0];

    if (start) {
      el.classList.add(animateClassName + "-start");
      el.classList.remove(animateClassName + "-done");
    } else {
      el.classList.remove(animateClassName + "-start");
      el.classList.add(animateClassName + "-done");
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/assign-property.binder.ts":
/*!*****************************************************************!*\
  !*** ../../packages/core/src/binders/assign-property.binder.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assignPropertyBinder": function() { return /* binding */ assignPropertyBinder; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * assign-*
 * Assign a value in your model.
 * Sets or overwrites a value by his property name (named whatever value is in place of [property]) in your model.
 * @example
 * <div rv-assign-new='"hello"'>{new}</div>
 */

var assignPropertyBinder = {
  name: "assign-*",
  routine: function routine(el, value) {
    var propertyName = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.camelCase)(this.args[0].trim());
    var obj = {};
    obj[propertyName] = value;
    this.view.models[propertyName] = value;
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/assign.binder.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/binders/assign.binder.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assignBinder": function() { return /* binding */ assignBinder; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");



/**
 * assign
 * Assign a value in your model.
 * The value you want to assign must be an object and will be concatenate with your model.
 * @example
 * <div rv-assign='{"newValue": "hello", "anotherNewValue": "world"}'>{newValue} {anotherNewValue}!</div>
 */
var assignBinder = {
  name: "assign",
  routine: function routine(el, value) {
    if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value) === "object") {
      return (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__.extend)(false, this.view.models, value);
    }

    console.warn("Value must be an object or propertyName is required");
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/attribute.binder.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/binders/attribute.binder.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attributeBinder": function() { return /* binding */ attributeBinder; }
/* harmony export */ });
/**
 * Sets the attribute on the element. If no binder above is matched it will fall
 * back to using this binder.
 */
var attributeBinder = {
  name: "*",
  bind: function bind()
  /*el*/
  {
    /**/
  },
  unbind: function unbind() {
    delete this.customData;
  },
  routine: function routine(el, newValue) {
    if (!this.type) {
      throw new Error("Can't set attribute of " + this.type);
    }

    var oldValue = el.getAttribute(this.type);

    if (newValue != null) {
      if (oldValue !== newValue) {
        el.setAttribute(this.type, newValue);
        el.dispatchEvent( // E.g. Event used in BinderAttributeChangedEvent
        new CustomEvent("binder-changed", {
          detail: {
            name: this.type,
            newValue: newValue,
            oldValue: oldValue
          }
        }));
      }
    } else {
      el.removeAttribute(this.type);
      el.dispatchEvent( // E.g. Event used in BinderAttributeChangedEvent
      new CustomEvent("binder-changed", {
        detail: {
          name: this.type,
          newValue: newValue,
          oldValue: oldValue
        }
      }));
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/block.binder.ts":
/*!*******************************************************!*\
  !*** ../../packages/core/src/binders/block.binder.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blockBinder": function() { return /* binding */ blockBinder; }
/* harmony export */ });
/**
 * block
 * Blocks the binding for the current element and his childs.
 * @note Please note that `<script></script>`, `<style type="text/css"></style>`, `<template></template>` and `<code></code>` tags are blocked by default.
 * You can change this by setting the `blockNodeNames` option.
 * @example
 * <div rv-block="">
 *  <!-- After binding you should see `{ value }` because the binding is blocked here -->
 *  { value }
 * </div>
 */
var blockBinder = {
  name: "block",
  block: true,
  routine: function routine() {
    /**/
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/checked.binder.ts":
/*!*********************************************************!*\
  !*** ../../packages/core/src/binders/checked.binder.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkedBinder": function() { return /* binding */ checkedBinder; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/dom */ "../../packages/utils/src/dom.ts");
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");
/* eslint-disable @typescript-eslint/no-this-alias */


/**
 * checked
 * Checks a checkbox or radio input when the value is true. Also sets the model
 * property when the input is checked or unchecked (two-way binder).
 */

var checkedBinder = {
  name: "checked",
  publishes: true,
  priority: 2000,
  bind: function bind(el) {
    this.customData = {
      onChange: this.publish.bind(this)
    };
    el.addEventListener("change", this.customData.onChange);
  },
  unbind: function unbind(el) {
    el.removeEventListener(this.customData.event, this.customData.onChange);
  },
  routine: function routine(el, newValue) {
    var oldValue = this.getValue(el);

    if (el.type === "radio") {
      el.checked = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__.getString)(oldValue) === (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__.getString)(newValue);
    } else {
      if (oldValue !== newValue) {
        el.checked = !!newValue;
      }
    }
  },
  getValue: _ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_0__.getInputValue
};

/***/ }),

/***/ "../../packages/core/src/binders/class-name.binder.ts":
/*!************************************************************!*\
  !*** ../../packages/core/src/binders/class-name.binder.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "classStarBinder": function() { return /* binding */ classStarBinder; }
/* harmony export */ });
/**
 * class-*
 * class-[classname]
 *
 * Adds a class (whatever value is in place of [classname]) on the element
 * when the value evaluates to true and removes that class if the value
 * evaluates to false.
 * @example
 * <li rv-class-completed="todo.done">{ todo.name }</li>
 */
var classStarBinder = {
  name: "class-*",
  routine: function routine(el, value) {
    if (this.args === null) {
      throw new Error("args is null");
    }

    var classList = el.className.split(" ").filter(function (ele) {
      return ele !== "";
    });
    var arg = this.args[0].trim();
    var idx = classList.indexOf(arg);

    if (idx === -1) {
      if (value) {
        el.className += " ".concat(arg);
      }
    } else if (!value) {
      el.className = classList.filter(function (_, i) {
        return i !== idx;
      }).join(" ");
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/co-attribute.binder.ts":
/*!**************************************************************!*\
  !*** ../../packages/core/src/binders/co-attribute.binder.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "componentAttributeBinder": function() { return /* binding */ componentAttributeBinder; }
/* harmony export */ });
/**
 * parent
 * Passses a riba model / scope value to your component without first converting it as an attribute
 */
var componentAttributeBinder = {
  name: "co-*",
  routine: function routine(el, value) {
    console.debug("componentAttributeBinder routine this", this);
    console.debug("componentAttributeBinder routine value", value);
    this.binder.triggerAttributeValue.call(this, el, value);
  },
  bind: function bind(el) {
    var _this = this;

    var keyPath = this.keypath;
    var askEventName = "ask-for-attribute:" + keyPath;
    var notifyEventName = "notify-attribute-change:" + keyPath;
    this.customData = {
      onAskForAttributeValue: function onAskForAttributeValue() {
        _this.binder.triggerAttributeValue.call(_this, el, _this.view.models[keyPath]);
      },
      onNotifyNewAttributeValue: function onNotifyNewAttributeValue(event) {
        if (_this.view.models[keyPath] !== event.detail.newValue) {
          _this.view.models[keyPath] = event.detail.newValue;
        }
      }
    };
    console.debug("bind eventName", askEventName);
    el.addEventListener(askEventName, this.customData.onAskForAttributeValue, false);
    el.addEventListener(notifyEventName, this.customData.onNotifyNewAttributeValue, false);
  },
  unbind: function unbind(el) {
    // const attrName = (this.args[0] as string).trim();
    var keyPath = this.keypath;
    el.removeEventListener("ask-for-attribute:" + keyPath, this.customData.onAskForAttributeValue, false);
    el.removeEventListener("notify-attribute-change:" + keyPath, this.customData.onNotifyNewAttributeValue, false);
  },
  triggerAttributeValue: function triggerAttributeValue(el, value) {
    var attrName = this.args[0].trim();
    var eventName = "attribute:" + attrName;
    console.debug("triggerAttributeValue newValue", value);
    console.debug("triggerAttributeValue eventName", eventName);
    el.dispatchEvent(new CustomEvent(eventName, {
      detail: {
        name: attrName,
        oldValue: undefined,
        newValue: value,
        namespace: null
      }
    }));
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/disabled.binder.ts":
/*!**********************************************************!*\
  !*** ../../packages/core/src/binders/disabled.binder.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "disabledBinder": function() { return /* binding */ disabledBinder; }
/* harmony export */ });
/**
 * Disables the element when value is true (negated version of `enabled` binder).
 */
var disabledBinder = {
  name: "disabled",
  routine: function routine(el, value) {
    el.disabled = !!value;
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/each-item.binder.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/binders/each-item.binder.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eachStarBinder": function() { return /* binding */ eachStarBinder; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view */ "../../packages/core/src/view.ts");
/* harmony import */ var _ribajs_utils_src_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ribajs/utils/src/control */ "../../packages/utils/src/control.ts");




/**
 * each-*
 * Appends bound instances of the element in place for each item in the array.
 */

var eachStarBinder = {
  name: "each-*",
  block: true,
  priority: 4000,
  bind: function bind(el) {
    if (!this.marker) {
      this.marker = document.createComment(" riba: ".concat(this.type, " "));
      this.customData = {
        iterated: []
      };

      if (!el.parentNode) {// console.warn('No parent node!');
      } else {
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      }
    } else {
      this.customData.iterated.forEach(function (view) {
        view.bind();
      });
    }
  },
  unbind: function unbind() {
    if (this.customData.iterated) {
      this.customData.iterated.forEach(function (view) {
        view.unbind();
      });
    }
  },
  routine: function routine(el, collection) {
    var _this = this;

    if (this.args === null) {
      throw new Error("args is null");
    }

    var isObject = false;
    var modelName = this.args[0];
    collection = collection || []; // Transform object to array to iterate over

    if (!Array.isArray(collection) && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(collection) === "object" && collection !== null) {
      console.debug("original collection", collection);
      collection = Object.entries(collection).map(function (_ref) {
        var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return {
          key: key,
          value: value
        };
      });
      isObject = true;
      console.debug("converted collection", collection);
    }

    if (!Array.isArray(collection)) {
      throw new Error("each-" + modelName + " needs an array or object to iterate over, but it is " + _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(collection));
    } // if index name is set by `index-property` use this name, otherwise `%[modelName]%`


    var indexProp = el.getAttribute("index-property") || this.getIterationAlias(modelName);
    collection.forEach(function (model, index) {
      var scope = {
        $parent: _this.view.models
      }; // Is object transformed to array

      if (isObject) {
        scope[indexProp] = model.key;
        scope[modelName] = model.value;
      } // Is Array
      else {
          scope[indexProp] = index;
          scope[modelName] = model;
        }

      var view = _this.customData.iterated[index];

      if (!view) {
        var previous;

        if (_this.customData.iterated.length) {
          previous = _this.customData.iterated[_this.customData.iterated.length - 1].els[0];
        } else if (_this.marker) {
          previous = _this.marker;
        } else {
          throw new Error("previous not defined");
        }

        view = _view__WEBPACK_IMPORTED_MODULE_2__.View.create(_this, scope, previous.nextSibling);

        _this.customData.iterated.push(view);
      } else {
        if (view.models[modelName] !== model) {
          // search for a view that matches the model
          var matchIndex;
          var nextView;

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
              throw new Error("Marker has no parent node");
            }

            _this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);

            nextView.models[indexProp] = index;
          } else {
            // new model
            nextView = _view__WEBPACK_IMPORTED_MODULE_2__.View.create(_this, scope, view.els[0]);
          }

          _this.customData.iterated.splice(index, 0, nextView);
        } else {
          view.models[indexProp] = index;
        }
      }
    });

    if (this.customData.iterated.length > collection.length) {
      (0,_ribajs_utils_src_control__WEBPACK_IMPORTED_MODULE_3__.times)(this.customData.iterated.length - collection.length, function () {
        var view = _this.customData.iterated.pop();

        view.unbind();

        if (!_this.marker || !_this.marker.parentNode) {
          throw new Error("Marker has no parent node");
        }

        _this.marker.parentNode.removeChild(view.els[0]);
      });
    }

    if (el.nodeName === "OPTION" && this.view.bindings) {
      this.view.bindings.forEach(function (binding) {
        if (_this.marker && binding.el === _this.marker.parentNode && binding.type === "value" && binding.sync) {
          binding.sync();
        }
      });
    }
  },
  update: function update(models) {
    var _this2 = this;

    var data = {}; // TODO: add test and fix if necessary

    Object.keys(models).forEach(function (key) {
      if (_this2.args === null) {
        throw new Error("args is null");
      }

      if (key !== _this2.args[0]) {
        data[key] = models[key];
      }
    });
    this.customData.iterated.forEach(function (view) {
      view.update(data);
    });
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/enabled.binder.ts":
/*!*********************************************************!*\
  !*** ../../packages/core/src/binders/enabled.binder.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "enabledBinder": function() { return /* binding */ enabledBinder; }
/* harmony export */ });
/**
 * Enables the element when value is true.
 */
var enabledBinder = {
  name: "enabled",
  routine: function routine(el, value) {
    el.disabled = !value;
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/flex-sort-childs.binder.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/binders/flex-sort-childs.binder.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "flexSortChildsBinder": function() { return /* binding */ flexSortChildsBinder; }
/* harmony export */ });
/**
 * sort-childs using flex order
 */
var flexSortChildsBinder = {
  name: "flex-sort-childs",
  priority: 90000,
  // bind(el: HTMLUnknownElement) {
  // },
  routine: function routine(el, descending) {
    var childrens = Array.from(el.children);
    childrens.sort(function (a, b) {
      if (!a.dataset.sortBy || !b.dataset.sortBy) {
        return 0;
      }

      if (a.dataset.sortBy < b.dataset.sortBy) {
        return descending ? 1 : -1;
      }

      if (a.dataset.sortBy > b.dataset.sortBy) {
        return descending ? -1 : 1;
      }

      return 0;
    });

    for (var i = 0; i < childrens.length; i++) {
      var child = childrens[i];
      child.style.order = i.toString();
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/hide.binder.ts":
/*!******************************************************!*\
  !*** ../../packages/core/src/binders/hide.binder.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hideBinder": function() { return /* binding */ hideBinder; }
/* harmony export */ });
/**
 * Hides the element when value is true (negated version of `show` binder).
 */
var hideBinder = {
  name: "hide",
  routine: function routine(el, value) {
    el.style.display = value ? "none" : "";

    if (value) {
      el.setAttribute("hidden", "true");
    } else {
      el.removeAttribute("hidden");
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/html.binder.ts":
/*!******************************************************!*\
  !*** ../../packages/core/src/binders/html.binder.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlBinder": function() { return /* binding */ htmlBinder; }
/* harmony export */ });
/**
 * Sets the element's text value.
 */
var htmlBinder = {
  name: "html",
  routine: function routine(el, value) {
    el.innerHTML = typeof value !== "undefined" ? value : "";
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/if.binder.ts":
/*!****************************************************!*\
  !*** ../../packages/core/src/binders/if.binder.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ifBinder": function() { return /* binding */ ifBinder; }
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view */ "../../packages/core/src/view.ts");

/**
 * if
 * Inserts and binds the element and it's child nodes into the DOM when true.
 */

var ifBinder = {
  name: "if",
  block: true,
  priority: 4000,
  bind: function bind(el) {
    this.customData = {};

    if (!this.marker) {
      this.marker = document.createComment(" riba: " + this.type + " " + this.keypath + " ");
      this.customData.attached = false;

      if (!el.parentNode) {// console.warn('Element has no parent node');
      } else {
        el.parentNode.insertBefore(this.marker, el);
        el.parentNode.removeChild(el);
      }
    } else if (this.customData.nested) {
      this.customData.nested.bind();
    }
  },
  unbind: function unbind() {
    if (this.customData.nested) {
      this.customData.nested.unbind();
    }
  },
  routine: function routine(el, value) {
    value = !!value;

    if (value !== this.customData.attached) {
      if (value) {
        if (!this.customData.nested) {
          this.customData.nested = new _view__WEBPACK_IMPORTED_MODULE_0__.View(el, this.view.models, this.view.options);
          this.customData.nested.bind();
        }

        if (!this.marker || !this.marker.parentNode) {// console.warn('Marker has no parent node');
        } else {
          this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
        }

        this.customData.attached = true;
      } else {
        if (!el.parentNode) {// console.warn('Element has no parent node');
        } else {
          el.parentNode.removeChild(el);
        }

        this.customData.attached = false;
      }
    }
  },
  update: function update(models) {
    if (this.customData.nested) {
      this.customData.nested.update(models);
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/index.ts":
/*!************************************************!*\
  !*** ../../packages/core/src/binders/index.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addClassBinder": function() { return /* reexport safe */ _add_class_binder__WEBPACK_IMPORTED_MODULE_0__.addClassBinder; },
/* harmony export */   "animateStarBinder": function() { return /* reexport safe */ _animate_classname_binder__WEBPACK_IMPORTED_MODULE_1__.animateStarBinder; },
/* harmony export */   "assignBinder": function() { return /* reexport safe */ _assign_binder__WEBPACK_IMPORTED_MODULE_2__.assignBinder; },
/* harmony export */   "assignPropertyBinder": function() { return /* reexport safe */ _assign_property_binder__WEBPACK_IMPORTED_MODULE_3__.assignPropertyBinder; },
/* harmony export */   "blockBinder": function() { return /* reexport safe */ _block_binder__WEBPACK_IMPORTED_MODULE_4__.blockBinder; },
/* harmony export */   "checkedBinder": function() { return /* reexport safe */ _checked_binder__WEBPACK_IMPORTED_MODULE_5__.checkedBinder; },
/* harmony export */   "classStarBinder": function() { return /* reexport safe */ _class_name_binder__WEBPACK_IMPORTED_MODULE_6__.classStarBinder; },
/* harmony export */   "componentAttributeBinder": function() { return /* reexport safe */ _co_attribute_binder__WEBPACK_IMPORTED_MODULE_7__.componentAttributeBinder; },
/* harmony export */   "cssStarBinder": function() { return /* reexport safe */ _style_css_property_binder__WEBPACK_IMPORTED_MODULE_8__.cssStarBinder; },
/* harmony export */   "enabledBinder": function() { return /* reexport safe */ _enabled_binder__WEBPACK_IMPORTED_MODULE_9__.enabledBinder; },
/* harmony export */   "flexSortChildsBinder": function() { return /* reexport safe */ _flex_sort_childs_binder__WEBPACK_IMPORTED_MODULE_10__.flexSortChildsBinder; },
/* harmony export */   "disabledBinder": function() { return /* reexport safe */ _disabled_binder__WEBPACK_IMPORTED_MODULE_11__.disabledBinder; },
/* harmony export */   "maxlengthBinder": function() { return /* reexport safe */ _maxlength_binder__WEBPACK_IMPORTED_MODULE_12__.maxlengthBinder; },
/* harmony export */   "onEventBinder": function() { return /* reexport safe */ _on_event_binder__WEBPACK_IMPORTED_MODULE_13__.onEventBinder; },
/* harmony export */   "parentBinder": function() { return /* reexport safe */ _parent_binder__WEBPACK_IMPORTED_MODULE_14__.parentBinder; },
/* harmony export */   "readonlyBinder": function() { return /* reexport safe */ _readonly_binder__WEBPACK_IMPORTED_MODULE_15__.readonlyBinder; },
/* harmony export */   "removeClassBinder": function() { return /* reexport safe */ _remove_class_binder__WEBPACK_IMPORTED_MODULE_16__.removeClassBinder; },
/* harmony export */   "ifBinder": function() { return /* reexport safe */ _if_binder__WEBPACK_IMPORTED_MODULE_17__.ifBinder; },
/* harmony export */   "eachStarBinder": function() { return /* reexport safe */ _each_item_binder__WEBPACK_IMPORTED_MODULE_18__.eachStarBinder; },
/* harmony export */   "htmlBinder": function() { return /* reexport safe */ _html_binder__WEBPACK_IMPORTED_MODULE_19__.htmlBinder; },
/* harmony export */   "hideBinder": function() { return /* reexport safe */ _hide_binder__WEBPACK_IMPORTED_MODULE_20__.hideBinder; },
/* harmony export */   "showBinder": function() { return /* reexport safe */ _show_binder__WEBPACK_IMPORTED_MODULE_21__.showBinder; },
/* harmony export */   "textBinder": function() { return /* reexport safe */ _text_binder__WEBPACK_IMPORTED_MODULE_22__.textBinder; },
/* harmony export */   "toggleOnEventBinder": function() { return /* reexport safe */ _toggle_on_event_binder__WEBPACK_IMPORTED_MODULE_23__.toggleOnEventBinder; },
/* harmony export */   "attributeBinder": function() { return /* reexport safe */ _attribute_binder__WEBPACK_IMPORTED_MODULE_24__.attributeBinder; },
/* harmony export */   "srcsetSizeBinder": function() { return /* reexport safe */ _srcset_size_binder__WEBPACK_IMPORTED_MODULE_25__.srcsetSizeBinder; },
/* harmony export */   "templateBinder": function() { return /* reexport safe */ _template_binder__WEBPACK_IMPORTED_MODULE_26__.templateBinder; },
/* harmony export */   "unlessBinder": function() { return /* reexport safe */ _unless_binder__WEBPACK_IMPORTED_MODULE_27__.unlessBinder; },
/* harmony export */   "valueBinder": function() { return /* reexport safe */ _value_binder__WEBPACK_IMPORTED_MODULE_28__.valueBinder; }
/* harmony export */ });
/* harmony import */ var _add_class_binder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-class.binder */ "../../packages/core/src/binders/add-class.binder.ts");
/* harmony import */ var _animate_classname_binder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animate-classname.binder */ "../../packages/core/src/binders/animate-classname.binder.ts");
/* harmony import */ var _assign_binder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assign.binder */ "../../packages/core/src/binders/assign.binder.ts");
/* harmony import */ var _assign_property_binder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assign-property.binder */ "../../packages/core/src/binders/assign-property.binder.ts");
/* harmony import */ var _block_binder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.binder */ "../../packages/core/src/binders/block.binder.ts");
/* harmony import */ var _checked_binder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./checked.binder */ "../../packages/core/src/binders/checked.binder.ts");
/* harmony import */ var _class_name_binder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./class-name.binder */ "../../packages/core/src/binders/class-name.binder.ts");
/* harmony import */ var _co_attribute_binder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./co-attribute.binder */ "../../packages/core/src/binders/co-attribute.binder.ts");
/* harmony import */ var _style_css_property_binder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style-css-property.binder */ "../../packages/core/src/binders/style-css-property.binder.ts");
/* harmony import */ var _enabled_binder__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./enabled.binder */ "../../packages/core/src/binders/enabled.binder.ts");
/* harmony import */ var _flex_sort_childs_binder__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./flex-sort-childs.binder */ "../../packages/core/src/binders/flex-sort-childs.binder.ts");
/* harmony import */ var _disabled_binder__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./disabled.binder */ "../../packages/core/src/binders/disabled.binder.ts");
/* harmony import */ var _maxlength_binder__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./maxlength.binder */ "../../packages/core/src/binders/maxlength.binder.ts");
/* harmony import */ var _on_event_binder__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./on-event.binder */ "../../packages/core/src/binders/on-event.binder.ts");
/* harmony import */ var _parent_binder__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./parent.binder */ "../../packages/core/src/binders/parent.binder.ts");
/* harmony import */ var _readonly_binder__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./readonly.binder */ "../../packages/core/src/binders/readonly.binder.ts");
/* harmony import */ var _remove_class_binder__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./remove-class.binder */ "../../packages/core/src/binders/remove-class.binder.ts");
/* harmony import */ var _if_binder__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./if.binder */ "../../packages/core/src/binders/if.binder.ts");
/* harmony import */ var _each_item_binder__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./each-item.binder */ "../../packages/core/src/binders/each-item.binder.ts");
/* harmony import */ var _html_binder__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./html.binder */ "../../packages/core/src/binders/html.binder.ts");
/* harmony import */ var _hide_binder__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./hide.binder */ "../../packages/core/src/binders/hide.binder.ts");
/* harmony import */ var _show_binder__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./show.binder */ "../../packages/core/src/binders/show.binder.ts");
/* harmony import */ var _text_binder__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./text.binder */ "../../packages/core/src/binders/text.binder.ts");
/* harmony import */ var _toggle_on_event_binder__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./toggle-on-event.binder */ "../../packages/core/src/binders/toggle-on-event.binder.ts");
/* harmony import */ var _attribute_binder__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./attribute.binder */ "../../packages/core/src/binders/attribute.binder.ts");
/* harmony import */ var _srcset_size_binder__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./srcset-size.binder */ "../../packages/core/src/binders/srcset-size.binder.ts");
/* harmony import */ var _template_binder__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./template.binder */ "../../packages/core/src/binders/template.binder.ts");
/* harmony import */ var _unless_binder__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./unless.binder */ "../../packages/core/src/binders/unless.binder.ts");
/* harmony import */ var _value_binder__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./value.binder */ "../../packages/core/src/binders/value.binder.ts");






























/***/ }),

/***/ "../../packages/core/src/binders/maxlength.binder.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/binders/maxlength.binder.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "maxlengthBinder": function() { return /* binding */ maxlengthBinder; }
/* harmony export */ });
/**
 * maxlength
 */
var maxlengthBinder = {
  name: "maxlength",
  bind: function bind() {
    this.customData = {};
  },
  routine: function routine(el, maxLength) {
    if (typeof maxLength === "number") {
      el.setAttribute("maxlength", maxLength.toString());
      el.maxLength = maxLength;
    } else {
      el.removeAttribute("maxlength");
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/on-event.binder.ts":
/*!**********************************************************!*\
  !*** ../../packages/core/src/binders/on-event.binder.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "onEventBinder": function() { return /* binding */ onEventBinder; }
/* harmony export */ });
/**
 * Binds an event handler on the element.
 */
var onEventBinder = {
  name: "on-*",
  "function": true,
  priority: 1000,
  bind: function bind() {
    this.customData = {
      handler: null
    };
  },
  unbind: function unbind(el) {
    if (this.customData.handler) {
      if (this.args === null) {
        throw new Error("args is null");
      }

      var eventName = this.args[0];
      el.removeEventListener(eventName, this.customData.handler);
    }
  },
  routine: function routine(el, value) {
    if (this.args === null) {
      throw new Error("args is null");
    }

    var eventName = this.args[0]; // see https://github.com/microsoft/TypeScript/issues/32912

    var options = {
      passive: this.el.dataset.passive === "true" // data-passive="true"

    };

    if (this.customData.handler) {
      el.removeEventListener( // must use as any here, because TypeScript is stupid as of version 4.0.3
      eventName, this.customData.handler, options);
    }

    this.customData.handler = this.eventHandler(value, el).bind(this.customData);
    el.addEventListener(eventName, this.customData.handler, options);
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/parent.binder.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/binders/parent.binder.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parentBinder": function() { return /* binding */ parentBinder; }
/* harmony export */ });
/**
 * parent
 * Binds the parent scope to your component
 */
var parentBinder = {
  name: "parent",
  routine: function routine()
  /*el: HTMLElement, value: object*/
  {
    /**/
  },
  bind: function bind(el) {
    var _this = this;

    this.customData = {
      onAskForParent: function onAskForParent() {
        el.dispatchEvent(new CustomEvent("parent", {
          detail: _this.view.models
        }));
      }
    };
    el.addEventListener("ask-for-parent", this.customData.onAskForParent, false);
    this.customData.onAskForParent();
  },
  unbind: function unbind(el) {
    el.removeEventListener("ask-for-parent", this.customData.onAskForParent, false);
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/readonly.binder.ts":
/*!**********************************************************!*\
  !*** ../../packages/core/src/binders/readonly.binder.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "readonlyBinder": function() { return /* binding */ readonlyBinder; }
/* harmony export */ });
/**
 * readonly
 */
var readonlyBinder = {
  name: "readonly",
  bind: function bind() {
    this.customData = {};
  },
  routine: function routine(el, readOnly) {
    readOnly = !!readOnly;
    el.readOnly = readOnly;

    if (readOnly) {
      el.setAttribute("readonly", "");
    } else {
      el.removeAttribute("readonly");
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/remove-class.binder.ts":
/*!**************************************************************!*\
  !*** ../../packages/core/src/binders/remove-class.binder.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeClassBinder": function() { return /* binding */ removeClassBinder; }
/* harmony export */ });
/**
 * remove-class
 * Removes the given class string the class attibute.
 * Instead of `class-[classname]` the classname is removed by the
 * given attribute and not by the star value,
 * @example
 * <img class="loading" rv-src="img.src" rv-remove-class="loadingClass">
 */
var removeClassBinder = {
  name: "remove-class",
  bind: function bind(el) {
    this.customData = {
      staticClassesString: el.className
    };
  },
  routine: function routine(el, value) {
    var regex = new RegExp("\\b".concat(value, "\\b"), "g");
    el.className = this.customData.staticClassesString.replace(regex, "").trim();
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/show.binder.ts":
/*!******************************************************!*\
  !*** ../../packages/core/src/binders/show.binder.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showBinder": function() { return /* binding */ showBinder; }
/* harmony export */ });
/**
 * Shows the element when value is true.
 */
var showBinder = {
  name: "show",
  routine: function routine(el, value) {
    el.style.display = value ? "" : "none";

    if (value) {
      el.removeAttribute("hidden");
    } else {
      el.setAttribute("hidden", "true");
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/srcset-size.binder.ts":
/*!*************************************************************!*\
  !*** ../../packages/core/src/binders/srcset-size.binder.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "srcsetSizeBinder": function() { return /* binding */ srcsetSizeBinder; }
/* harmony export */ });
/**
 * srcset-size
 * Sets an url with size to the `srcset` attribute
 */
var srcsetSizeBinder = {
  name: "srcset-*",
  routine: function routine(el, url) {
    var size = this.args[0];
    var srcset = el.getAttribute("srcset");

    if (typeof srcset !== "string") {
      srcset = "";
    }

    if (typeof url === "string" && url.length > 0) {
      var seperator = srcset.length > 0 ? ", " : ""; // Add size to srcset attribute

      srcset += "".concat(seperator).concat(url, " ").concat(size);
    } else {
      // Remove size from srcset attribute
      var sizes = srcset.split(",");
      sizes = sizes.map(function (iterSize) {
        return iterSize.trim();
      });
      sizes = sizes.filter(function (iterSize) {
        return !(iterSize.indexOf(size) !== -1);
      });
      srcset = sizes.join(", ") || "";
    }

    el.setAttribute("srcset", srcset);
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/style-css-property.binder.ts":
/*!********************************************************************!*\
  !*** ../../packages/core/src/binders/style-css-property.binder.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cssStarBinder": function() { return /* binding */ cssStarBinder; }
/* harmony export */ });
/**
 * style-*
 * Adds a style to the element.
 *
 * ```html
 * <div rv-style-background-color="'blue'"></div>
 * ```
 */
var cssStarBinder = {
  name: "style-*",
  routine: function routine(el, value) {
    var propertyName = this.args[0];

    if (value === null || value === undefined || value === "") {
      el.style.removeProperty(propertyName);
    } else {
      el.style.setProperty(propertyName, value);
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/template.binder.ts":
/*!**********************************************************!*\
  !*** ../../packages/core/src/binders/template.binder.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "templateBinder": function() { return /* binding */ templateBinder; }
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view */ "../../packages/core/src/view.ts");

/**
 * template
 * Similar to rv-html but also binds the html with riba, so you can also use binders and componentes in this templates.
 */

var templateBinder = {
  name: "template",
  bind: function bind(el) {
    this.customData = {
      nested: new _view__WEBPACK_IMPORTED_MODULE_0__.View(el, this.view.models, this.view.options)
    };
  },
  routine: function routine(el, value) {
    var _this$customData$nest, _this$customData$nest2;

    (_this$customData$nest = this.customData.nested) === null || _this$customData$nest === void 0 ? void 0 : _this$customData$nest.unbind();
    el.innerHTML = value ? value : "";
    this.customData.nested = new _view__WEBPACK_IMPORTED_MODULE_0__.View(el, this.view.models, this.view.options);
    (_this$customData$nest2 = this.customData.nested) === null || _this$customData$nest2 === void 0 ? void 0 : _this$customData$nest2.bind();
  },
  unbind: function unbind() {
    var _this$customData$nest3;

    (_this$customData$nest3 = this.customData.nested) === null || _this$customData$nest3 === void 0 ? void 0 : _this$customData$nest3.unbind();
  },
  update: function update(models) {
    var _this$customData$nest4;

    (_this$customData$nest4 = this.customData.nested) === null || _this$customData$nest4 === void 0 ? void 0 : _this$customData$nest4.update(models);
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/text.binder.ts":
/*!******************************************************!*\
  !*** ../../packages/core/src/binders/text.binder.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textBinder": function() { return /* binding */ textBinder; }
/* harmony export */ });
/**
 * Sets the element's text value.
 */
var textBinder = {
  name: "text",
  routine: function routine(el, value) {
    el.textContent = value != null ? value : "";
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/toggle-on-event.binder.ts":
/*!*****************************************************************!*\
  !*** ../../packages/core/src/binders/toggle-on-event.binder.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleOnEventBinder": function() { return /* binding */ toggleOnEventBinder; }
/* harmony export */ });
/**
 * Togggles a boolean variable to true/false if the event is triggered.
 */
var toggleOnEventBinder = {
  name: "toggle-on-*",
  bind: function bind(el) {
    var _this = this;

    this.customData = {
      handler: null,
      propertyKey: null,
      toggle: function toggle() {
        if (_this.customData.propertyKey) {
          _this.view.models[_this.customData.propertyKey] = !_this.view.models[_this.customData.propertyKey];
        }
      }
    };
    var eventName = this.args[0];
    var passive = this.el.dataset.passive === "true"; // data-passive="true"

    el.addEventListener(eventName, this.customData.toggle, {
      passive: passive
    });
  },
  unbind: function unbind(el) {
    if (this.customData.handler) {
      if (this.args === null) {
        throw new Error("args is null");
      }

      var eventName = this.args[0];
      el.removeEventListener(eventName, this.customData.toggle);
    }
  },
  routine: function routine(el, propertyKey) {
    if (this.args === null) {
      throw new Error("args is null");
    }

    this.customData.propertyKey = propertyKey;
  }
};

/***/ }),

/***/ "../../packages/core/src/binders/unless.binder.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/binders/unless.binder.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unlessBinder": function() { return /* binding */ unlessBinder; }
/* harmony export */ });
/* harmony import */ var _if_binder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./if.binder */ "../../packages/core/src/binders/if.binder.ts");

/**
 * unless
 * Removes and unbinds the element and it's child nodes into the DOM when true
 * (negated version of `if` binder).
 */

var unlessBinder = {
  name: "unless",
  block: true,
  priority: 4000,
  bind: _if_binder__WEBPACK_IMPORTED_MODULE_0__.ifBinder.bind,
  unbind: _if_binder__WEBPACK_IMPORTED_MODULE_0__.ifBinder.unbind,
  routine: function routine(el, value) {
    return _if_binder__WEBPACK_IMPORTED_MODULE_0__.ifBinder.routine.call(this, el, !value);
  },
  update: _if_binder__WEBPACK_IMPORTED_MODULE_0__.ifBinder.update
};

/***/ }),

/***/ "../../packages/core/src/binders/value.binder.ts":
/*!*******************************************************!*\
  !*** ../../packages/core/src/binders/value.binder.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "valueBinder": function() { return /* binding */ valueBinder; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/dom */ "../../packages/utils/src/dom.ts");
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var getData = function getData(el) {
  var customData = {};
  customData.type = el.type;
  customData.tagName = el.tagName;
  customData.contenteditable = el.getAttribute("contenteditable") ? true : false;
  customData.isRadio = customData.tagName === "INPUT" && customData.type === "radio";
  return customData;
};

var DEFAULT_EVENTS = "change input paste blur focus";
/**
 * Sets the element's value. Also sets the model property when the input changes
 * (two-way binder).
 */

var valueBinder = {
  name: "value",
  publishes: true,
  priority: 3000,
  onChange: function onChange() {
    this.publish();
  },
  bind: function bind(el) {
    if (!this.customData) {
      this.customData = getData(el);
    }

    if (!this.customData.isRadio) {
      this.customData.event = el.getAttribute("event-name") || DEFAULT_EVENTS; // eslint-disable-next-line @typescript-eslint/no-this-alias

      var self = this;

      if (!this.customData.onChange) {
        this.customData.onChange = function () {
          self.publish();
        };
      }

      var events = this.customData.event.split(" ");

      var _iterator = _createForOfIteratorHelper(events),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var event = _step.value;
          el.addEventListener(event.trim(), this.customData.onChange, false);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  },
  unbind: function unbind(el) {
    var events = this.customData.event.split(" ");

    for (var event in events) {
      el.removeEventListener(event.trim(), this.customData.onChange);
    }
  },
  routine: function routine(el, value) {
    var oldValue = this.getValue(el);

    if (!Array.isArray(value)) {
      if (value != null) {
        value = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__.getString)(value);
      } else {
        value = "";
      }
    }

    if (!Array.isArray(oldValue)) {
      if (oldValue != null) {
        oldValue = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__.getString)(oldValue);
      } else {
        oldValue = "";
      }
    }

    if (oldValue === value) {
      // nothing changed
      return;
    }

    if (!this.customData) {
      this.customData = getData(el);
    }

    if (this.customData.isRadio) {
      el.setAttribute("value", value);
    } else {
      if (el.type === "select-multiple") {
        if (Array.isArray(value)) {
          for (var i = 0; i < el.options.length; i++) {
            var option = el.options[i];
            option.selected = value.indexOf(option.value) > -1;
          }
        }
      } else if (el.getAttribute("contenteditable")) {
        el.innerHTML = value; // TODO write test for contenteditable
      } else {
        el.value = value;
      }
    }
  },
  getValue: _ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_0__.getInputValue
};

/***/ }),

/***/ "../../packages/core/src/binding.ts":
/*!******************************************!*\
  !*** ../../packages/core/src/binding.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Binding": function() { return /* binding */ Binding; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parsers */ "../../packages/core/src/parsers.ts");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./observer */ "../../packages/core/src/observer.ts");
/* harmony import */ var _ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ribajs/utils/src/dom */ "../../packages/utils/src/dom.ts");







/**
 *  A single binding between a model attribute and a DOM element.
 */

var Binding = /*#__PURE__*/function () {
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
   * @param {*} args The start binders, on `class-*` args[0] wil be the classname.
   * @param {*} formatters
   */
  function Binding(view, el, type, keypath, binder, formatters, identifier) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Binding);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "value", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "observer", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "view", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "el", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "type", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "binder", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "formatters", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "formatterObservers", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "keypath", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "args", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "model", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "marker", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "customData", void 0);

    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    this.binder = binder;
    this.formatters = formatters;
    this.model = undefined;
    this.customData = {};

    if (identifier && type) {
      this.args = this.getStarArguments(identifier, type);
    } else {
      this.args = new Array();
    }
  }
  /**
   * Observes the object keypath
   * @param obj
   * @param keypath
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Binding, [{
    key: "observe",
    value: function observe(obj, keypath, callback) {
      return new _observer__WEBPACK_IMPORTED_MODULE_5__.Observer(obj, keypath, callback);
    }
  }, {
    key: "parseTarget",
    value: function parseTarget() {
      if (this.keypath) {
        var token = (0,_parsers__WEBPACK_IMPORTED_MODULE_4__.parseType)(this.keypath);

        if (token.type === _parsers__WEBPACK_IMPORTED_MODULE_4__.PRIMITIVE) {
          this.value = token.value;
        } else if (token.type === _parsers__WEBPACK_IMPORTED_MODULE_4__.KEYPATH) {
          this.observer = this.observe(this.view.models, this.keypath, this);
          this.model = this.observer.target;
        } else {
          throw new Error("[".concat(this.binder.name, "] Unknown type in token"));
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
      return "%" + modelName + "%";
    }
  }, {
    key: "parseFormatterArguments",
    value: function parseFormatterArguments(args, formatterIndex) {
      var _this = this;

      return args.map(_parsers__WEBPACK_IMPORTED_MODULE_4__.parseType).map(function (_ref, ai) {
        var type = _ref.type,
            value = _ref.value;

        if (type === _parsers__WEBPACK_IMPORTED_MODULE_4__.PRIMITIVE) {
          var primitiveValue = value;
          return primitiveValue;
        } else if (type === _parsers__WEBPACK_IMPORTED_MODULE_4__.KEYPATH) {
          // keypath is string
          var keypath = value;

          if (!_this.formatterObservers[formatterIndex]) {
            _this.formatterObservers[formatterIndex] = {};
          }

          var observer = _this.formatterObservers[formatterIndex][ai];

          if (!observer) {
            observer = _this.observe(_this.view.models, keypath, _this);
            _this.formatterObservers[formatterIndex][ai] = observer;
          }

          return observer.value();
        } else {
          throw new Error("[".concat(_this.binder.name, "] Unknown argument type"));
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
        throw new Error("[".concat(this.binder.name, " formatters is null"));
      }

      return this.formatters.reduce(function (result, declaration, index) {
        var args = declaration.match(Binding.FORMATTER_ARGS);

        if (args === null) {
          console.warn(new Error("[".concat(_this2.binder.name, "] No args matched with regex \"FORMATTER_ARGS\"!\nvalue: ").concat(value, "\nresult: ").concat(result, "\ndeclaration: ").concat(declaration, "\nindex: ").concat(index, "\n")));
          return result;
        }

        var id = args.shift();

        if (!id) {
          throw new Error("[".concat(_this2.binder.name, "] No formatter id found in args!"));
        }

        if (!_this2.view.options.formatters) {
          throw new Error("[".concat(_this2.binder.name, "] No formatters are defined!"));
        }

        var formatter = _this2.view.options.formatters[id];

        if (!formatter) {
          throw new Error("[".concat(_this2.binder.name, "] No formatters with id \"").concat(id, "\" found!"));
        }

        var processedArgs = _this2.parseFormatterArguments(args, index); // get formatter read funcion


        if (formatter && typeof formatter.read === "function") {
          result = formatter.read.apply(_this2.model, [result].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(processedArgs)));
        }

        return result;
      }, value);
    }
    /**
     * Returns an event handler for the binding around the supplied function.
     * Tihs event Handler is mainly used by the on-* binder
     * @param fn The function to call by the handler
     * @param el The element the event was triggered from
     */

  }, {
    key: "eventHandler",
    value: function eventHandler(fn, el) {
      var _this3 = this;

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var binding = this;
      var handler = binding.view.options.handler;
      return function (ev) {
        if (!handler) {
          throw new Error("No handler defined in binding.view.options.handler");
        }

        handler.call(fn, _this3, ev, binding, el);
      };
    }
    /**
     * Sets the value for the binding. This Basically just runs the binding routine
     * with the supplied value formatted.
     */

  }, {
    key: "set",
    value: function set(value) {
      var _this4 = this;

      if (this.binder === null) {
        console.warn(new Error("Binder is null"), this);
        return;
      }

      try {
        value = this.formattedValue(value);
      } catch (error) {
        console.error(error);
        return value;
      }

      if (this.binder && typeof this.binder.routine === "function") {
        // If value is a promise
        if (value && typeof value.then === "function" && typeof value["catch"] === "function") {
          value.then(function (realValue) {
            _this4.binder.routine.call(_this4, _this4.el, realValue);
          })["catch"](function (error) {
            console.error(error);
          });
        } else {
          this.binder.routine.call(this, this.el, value);
        }
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
      var _this5 = this;

      if (this.observer) {
        if (this.formatters === null) {
          throw new Error("formatters is null");
        }

        var value = this.formatters.reduceRight(function (result, declaration, index) {
          var args = declaration.split(Binding.FORMATTER_SPLIT);
          var id = args.shift();

          if (!id) {
            throw new Error("id not defined");
          }

          if (!_this5.view.options.formatters) {
            return undefined;
          }

          var formatter = _this5.view.options.formatters[id];

          var processedArgs = _this5.parseFormatterArguments(args, index);

          if (formatter && typeof formatter.publish === "function") {
            result = formatter.publish.apply(formatter, [result].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(processedArgs)));
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

      if (this.binder && this.binder.bind) {
        if (typeof this.binder.bind !== "function") {
          throw new Error("the method bind is not a function");
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
      var _this6 = this;

      if (!this.binder) {
        console.warn(new Error("Binder is not defined"), this);
        return;
      }

      if (this.binder.unbind) {
        this.binder.unbind.call(this, this.el);
      }

      if (this.observer) {
        this.observer.unobserve();
      }

      Object.keys(this.formatterObservers).forEach(function (fi) {
        var args = _this6.formatterObservers[fi];
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
        throw new Error("binder is null");
      }

      if (typeof this.binder.update === "function") {
        this.binder.update.call(this, models);
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
        throw new Error("binder is null");
      }

      if (typeof this.binder.getValue === "function") {
        return this.binder.getValue.call(this, el);
      } else {
        return (0,_ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_6__.getInputValue)(el);
      }
    }
  }, {
    key: "getStarArguments",
    value: function getStarArguments(identifier, type) {
      var regexp = new RegExp("^".concat(identifier.replace(/\*/g, "(.+)"), "$"));
      var match = type.match(regexp);
      return match && match.slice(1) || [];
    }
  }]);

  return Binding;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Binding, "FORMATTER_ARGS", /[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Binding, "FORMATTER_SPLIT", /\s+/);

/***/ }),

/***/ "../../packages/core/src/component/basic-component.ts":
/*!************************************************************!*\
  !*** ../../packages/core/src/component/basic-component.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicComponent": function() { return /* binding */ BasicComponent; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/types */ "../../infra/types/index.js");
/* harmony import */ var _ribajs_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_ribajs_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");
/* harmony import */ var _ribajs_utils_src_color__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ribajs/utils/src/color */ "../../packages/utils/src/color.ts");











function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Autoparse custom element attributes
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */



var BasicComponent = /*#__PURE__*/function (_HTMLElement) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(BasicComponent, _HTMLElement);

  var _super = _createSuper(BasicComponent);

  /**
   * Used to check if all passed observedAttributes are initialized
   */

  /**
   * @depricated Use this instead
   */
  function BasicComponent(element) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, BasicComponent);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_debug", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "_color", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "templateLoaded", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "observedAttributesToCheck", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "observedAttributes", []);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "el", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "scope", void 0);

    if (_this._debug) {
      _this._color = (0,_ribajs_utils_src_color__WEBPACK_IMPORTED_MODULE_12__.getRandomColor)();
    }

    if (element) {
      _this.el = element;
    } else if (window.customElements) {
      _this.el = _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this);
    } else {
      throw new Error("element is required on browsers without custom elements support");
    }

    _this.onParentChanged = _this.onParentChanged.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.onRibaAttributeChanged = _this.onRibaAttributeChanged.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }
  /**
   * Remove this custom element
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(BasicComponent, [{
    key: "remove",
    value: function remove() {
      if (this.el && this.el.parentElement) {
        this.el.parentElement.removeChild(this.el);
      }
    }
  }, {
    key: "debug",
    value: function debug() {
      var _console;

      if (!this._debug) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (typeof args[0] === "string") {
        var name = this.constructor.name || this.el.tagName;

        if (this._color) {
          args[0] = "%c[".concat(name, "] ").concat(args[0]);
          args.splice(1, 0, "color: ".concat(this._color, ";"));
        } else {
          args[0] = "[".concat(name, "] ").concat(args[0]);
        }
      }

      (_console = console).debug.apply(_console, args);
    }
    /**
     * returns a list of attributes wich are required until the riba binding starts
     */

  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "init",
    value: function () {
      var _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(observedAttributes) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loadAttributes(observedAttributes);
                this.initRibaAttributeObserver(observedAttributes);
                this.getPassedObservedAttributes(observedAttributes);
                return _context.abrupt("return");

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "ready",
    value: function ready() {
      return this.allPassedObservedAttributesAreInitialized() && this.checkRequiredAttributes();
    }
    /**
     * Check if the attribute (e.g. `src`) is passed to this custom element
     * @param observedAttribute
     */

  }, {
    key: "attributeIsPassed",
    value: function attributeIsPassed(observedAttribute) {
      return this.el.hasAttribute(observedAttribute);
    }
    /**
     * Get passed observed attributes, used to check if all passed attributes are initialized
     * @param observedAttributes
     */

  }, {
    key: "getPassedObservedAttributes",
    value: function getPassedObservedAttributes(observedAttributes) {
      var oa2c = this.observedAttributesToCheck;

      var _iterator = _createForOfIteratorHelper(observedAttributes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var observedAttribute = _step.value;

          if (!oa2c[observedAttribute]) {
            oa2c[observedAttribute] = {
              passed: false,
              initialized: false
            };
          } else {
            if (!oa2c[observedAttribute].passed) {
              oa2c[observedAttribute].passed = this.attributeIsPassed(observedAttribute);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * Checks if all passed observed attributes are initialized
     */

  }, {
    key: "allPassedObservedAttributesAreInitialized",
    value: function allPassedObservedAttributesAreInitialized() {
      var _this2 = this;

      return Object.keys(this.observedAttributesToCheck).every(function (key) {
        var _this2$observedAttrib, _this2$observedAttrib2;

        return !((_this2$observedAttrib = _this2.observedAttributesToCheck[key]) !== null && _this2$observedAttrib !== void 0 && _this2$observedAttrib.passed) || ((_this2$observedAttrib2 = _this2.observedAttributesToCheck[key]) === null || _this2$observedAttrib2 === void 0 ? void 0 : _this2$observedAttrib2.initialized);
      });
    }
    /**
     * Required attributes before the view is bound
     *
     * The attributeChangedCallback is called for each attribute wich updates the riba view each time
     * which can have a big impact on performance or required attributes are not yet available which can lead to errors.
     * So define required attriutes and the view is ony bind the first time after all this attributes are transmitted.
     */

  }, {
    key: "checkRequiredAttributes",
    value: function checkRequiredAttributes() {
      var _this3 = this;

      return this.requiredAttributes().every( // eslint-disable-next-line no-prototype-builtins
      function (requiredAttribute) {
        return _this3.scope.hasOwnProperty(requiredAttribute);
      });
    }
  }, {
    key: "parseAttribute",
    value: function parseAttribute(attr) {
      var value = attr;

      if (attr === "true") {
        value = true;
      } else if (attr === "false") {
        value = false;
      } else if (attr === "null") {
        value = null;
      } else if (attr === "undefined") {
        value = undefined;
      } else if (attr === "") {
        value = undefined;
      } else if (!isNaN(Number(attr))) {
        value = Number(attr); // If number is too large store the value as string

        if (value >= Number.MAX_SAFE_INTEGER) {
          value = attr;
        }
      } else {
        var jsonString = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_11__.parseJsonString)(value);
        value = jsonString ? jsonString : value;
      }

      return value;
    }
    /**
     * Returns an event handler for the bindings (most on-*) inside this component.
     */

  }, {
    key: "eventHandler",
    value: function eventHandler(self) {
      // IMPORTANT this must be a function and not a Arrow Functions
      return function (context, event, binding, el) {
        if (!this || !this.call) {
          var error = new Error("[rv-".concat(binding.type, "=\"").concat(binding.keypath, "\"] Event handler \"").concat(binding.keypath, "\" not found!\""));
          console.error(binding, el);
          throw error;
        }

        this.call(self, event, binding.view.models, el);
      };
    }
    /**
     * Default custom Element method
     * Invoked when the custom element is first connected to the document's DOM.
     */

  }, {
    key: "connectedCallback",
    value: function connectedCallback() {// console.warn('connectedCallback called');
    }
    /**
     * Default custom Element method
     * Invoked when the custom element is disconnected from the document's DOM.
     */

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      // if (this.bound && this.view) {
      //   // IMPORTANT ROUTE FIXME, if we unbind the component then it will no longer work if it is retrieved from the cache and the connectedCallback is called
      //   // because the riba attributes are removed. We need a solution for that, maybe we do not remove the attributes or we recreate the attributes
      //   // See view bind / unbind methods for that.
      //   // only unbind if cache is not enabled?
      //   this.unbind();
      // }
      this.removeEventListenerForRibaParent();
      this.removeEventListenersForRibaAttributes(this.observedAttributes);
    }
    /**
     * Default custom Element method
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     * @param attributeName
     * @param oldValue
     * @param newValue
     * @param namespace
     */

  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      // this.debug("attributeChangedCallback", attributeName, newValue);
      if (this.observedAttributesToCheck && this.observedAttributesToCheck[attributeName]) {
        this.observedAttributesToCheck[attributeName].initialized = true;
      }

      newValue = this.parseAttribute(newValue);

      if (oldValue !== newValue) {
        this.notifyRibaAttributeChanged(attributeName, oldValue, newValue, namespace);
      }

      var parsedAttributeName = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_11__.camelCase)(attributeName);

      if (this.scope && this.scope[parsedAttributeName]) {
        oldValue = this.scope[parsedAttributeName];
      } // automatically inject observed attributes to view scope


      this.scope[parsedAttributeName] = newValue; // call custom attribute changed callback with parsed values

      this.parsedAttributeChangedCallback(parsedAttributeName, oldValue, newValue, namespace);
    }
    /**
     * Similar to attributeChangedCallback but attribute arguments are already parsed as they are stored in the scope
     * @param attributeName
     * @param oldValue
     * @param newValue
     * @param namespace
     */

  }, {
    key: "parsedAttributeChangedCallback",
    value: function parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      this.debug("parsedAttributeChangedCallback called", attributeName, oldValue, newValue, namespace);
    }
    /**
     * Default custom Element method
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     * Note: Not supported on polyfill: https://github.com/webcomponents/custom-elements#known-bugs-and-limitations
     * @param oldDocument
     * @param newDocument
     */

  }, {
    key: "adoptedCallback",
    value: function adoptedCallback(oldDocument, newDocument) {
      this.debug("adoptedCallback called", oldDocument, newDocument);
    }
  }, {
    key: "loadTemplate",
    value: function () {
      var _loadTemplate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var _this4 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.templateLoaded === true)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", null);

              case 2:
                if (this.checkRequiredAttributes()) {
                  _context2.next = 5;
                  break;
                }

                this.debug("Not all required attributes are set to load the template");
                return _context2.abrupt("return", null);

              case 5:
                this.templateLoaded = true; // if innerHTML is null this component uses the innerHTML which he already has!

                return _context2.abrupt("return", Promise.resolve(this.template()).then(function (template) {
                  if (template instanceof HTMLElement) {
                    _this4.el.innerHTML = "";

                    _this4.el.appendChild(template);
                  } else if (template !== null) {
                    _this4.el.innerHTML = template;
                  }

                  return template;
                })["catch"](function (error) {
                  console.error(error);
                  _this4.templateLoaded = false;
                  return null;
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadTemplate() {
        return _loadTemplate.apply(this, arguments);
      }

      return loadTemplate;
    }()
  }, {
    key: "beforeTemplate",
    value: function () {
      var _beforeTemplate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function beforeTemplate() {
        return _beforeTemplate.apply(this, arguments);
      }

      return beforeTemplate;
    }()
  }, {
    key: "afterTemplate",
    value: function () {
      var _afterTemplate = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4(template) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.debug("afterTemplate", template);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function afterTemplate(_x2) {
        return _afterTemplate.apply(this, arguments);
      }

      return afterTemplate;
    }()
  }, {
    key: "onReady",
    value: function () {
      var _onReady = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function onReady() {
        return _onReady.apply(this, arguments);
      }

      return onReady;
    }()
    /**
     * This is for the rv-co-attribute binder
     * TODO only notify attributes wich are passed as rv-co-*="*"
     * @param attrName
     * @param oldValue
     * @param newValue
     * @param namespace
     */

  }, {
    key: "notifyRibaAttributeChanged",
    value: function notifyRibaAttributeChanged(attrName, oldValue, newValue, namespace) {
      this.el.dispatchEvent(new CustomEvent("notify-attribute-change:" + attrName, {
        detail: {
          name: attrName,
          oldValue: oldValue,
          newValue: newValue,
          namespace: namespace
        }
      }));
    }
  }, {
    key: "askForRibaParent",
    value: function askForRibaParent() {
      this.el.dispatchEvent(new CustomEvent("ask-for-parent"));
    }
  }, {
    key: "askForRibaAttribute",
    value: function askForRibaAttribute(attrName) {
      //TODO Fix if co-* has different keypath as attribute name
      var eventName = "ask-for-attribute:" + attrName; // this.debug("Trigger " + eventName);

      this.el.dispatchEvent(new CustomEvent(eventName));
    }
  }, {
    key: "askForRibaAttributes",
    value: function askForRibaAttributes(observedAttributes) {
      var _iterator2 = _createForOfIteratorHelper(observedAttributes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var observedAttribute = _step2.value;
          this.askForRibaAttribute(observedAttribute);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "onParentChanged",
    value: function onParentChanged(event) {
      // this.debug("onParentChanged", event.detail);
      this.scope.$parent = event.detail;
    }
  }, {
    key: "onRibaAttributeChanged",
    value: function onRibaAttributeChanged(event) {
      var data = event.detail;
      this.debug("onRibaAttributeChanged", data);
      var oldValue = this.scope[data.name];
      this.attributeChangedCallback(data.name, oldValue, data.newValue, data.namespace);
    }
  }, {
    key: "listenForRibaParent",
    value: function listenForRibaParent() {
      this.el.addEventListener("parent", this.onParentChanged);
    }
  }, {
    key: "removeEventListenerForRibaParent",
    value: function removeEventListenerForRibaParent() {
      this.el.removeEventListener("parent", this.onParentChanged);
    }
  }, {
    key: "listenForRibaAttribute",
    value: function listenForRibaAttribute(attrName) {
      var eventName = "attribute:" + attrName;
      this.debug("Listen for " + eventName);
      this.el.addEventListener(eventName, this.onRibaAttributeChanged);
    }
  }, {
    key: "removeEventListenerForRibaAttribute",
    value: function removeEventListenerForRibaAttribute(attrName) {
      this.el.removeEventListener("attribute:" + attrName, this.onRibaAttributeChanged);
    }
    /**
     * This is for the co-attribute-binder
     * TODO only watch for attributes passed as rv-co-* and not all
     * @param observedAttributes
     */

  }, {
    key: "listenForRibaAttributes",
    value: function listenForRibaAttributes(observedAttributes) {
      var _iterator3 = _createForOfIteratorHelper(observedAttributes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var observedAttribute = _step3.value;
          this.listenForRibaAttribute(observedAttribute);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "removeEventListenersForRibaAttributes",
    value: function removeEventListenersForRibaAttributes(observedAttributes) {
      var _iterator4 = _createForOfIteratorHelper(observedAttributes),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var observedAttribute = _step4.value;
          this.removeEventListenerForRibaAttribute(observedAttribute);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "initRibaAttributeObserver",
    value: function initRibaAttributeObserver(observedAttributes) {
      this.listenForRibaParent();
      this.listenForRibaAttributes(observedAttributes);
      this.askForRibaParent();
      this.askForRibaAttributes(observedAttributes);
    }
    /**
     * Load all attributes and calls the attributeChangedCallback for each attribute.
     * Please note: Brmally the browser calls the attributeChangedCallback for you
     */

  }, {
    key: "loadAttributes",
    value: function loadAttributes(observedAttributes) {
      var attributes = this.el.attributes;

      for (var i in attributes) {
        var attribute = attributes[i];
        var name = attribute.nodeName;

        if (observedAttributes.indexOf(name) !== -1) {
          var newValue = attribute.nodeValue;
          this.attributeChangedCallback(name, undefined, newValue, null);
        }
      }
    }
  }]);

  return BasicComponent;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_8___default()(HTMLElement));

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(BasicComponent, "tagName", void 0);

/***/ }),

/***/ "../../packages/core/src/component/component.ts":
/*!******************************************************!*\
  !*** ../../packages/core/src/component/component.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": function() { return /* binding */ Component; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../view */ "../../packages/core/src/view.ts");
/* harmony import */ var _riba__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../riba */ "../../packages/core/src/riba.ts");
/* harmony import */ var _basic_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./basic-component */ "../../packages/core/src/component/basic-component.ts");











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 */



var Component = /*#__PURE__*/function (_BasicComponent) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(Component, _BasicComponent);

  var _super = _createSuper(Component);

  /**
   * If true the component will automatically bind the component to riba if all required attributes are set.
   */
  function Component(element) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Component);

    _this = _super.call(this, element);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "view", null);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "riba", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "bound", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "autobind", true);

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Component, [{
    key: "init",
    value: function () {
      var _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(observedAttributes) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Component.prototype), "init", this).call(this, observedAttributes);

              case 2:
                return _context.abrupt("return", this.bindIfReady());

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
    /**
     * If `autobind` is true this component will bind riba automatically in this component if all all passed observed and required attributes are initialized
     */

  }, {
    key: "bindIfReady",
    value: function () {
      var _bindIfReady = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var template;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.ready()) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 3;
                return this.beforeTemplate();

              case 3:
                _context2.next = 5;
                return this.loadTemplate();

              case 5:
                template = _context2.sent;
                _context2.next = 8;
                return this.afterTemplate(template);

              case 8:
                if (!this.autobind) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 11;
                return this.bind();

              case 11:
                _context2.next = 13;
                return this.onReady();

              case 13:
                return _context2.abrupt("return");

              case 14:
                this.debug("Not all required or passed attributes are set to load and bind the template", this.observedAttributesToCheck, this.scope);
                return _context2.abrupt("return");

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function bindIfReady() {
        return _bindIfReady.apply(this, arguments);
      }

      return bindIfReady;
    }()
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.debug("beforeBind", this.scope);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.debug("afterBind", this.scope);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
    /**
     * Event handler to liste for publish binder event for two-way-binding in web components
     */
    // protected publish(name: string, newValue: any, namespace: string | null) {
    //   this.el.dispatchEvent(
    //     new CustomEvent("publish-binder-change:" + name, {
    //       detail: {
    //         name,
    //         newValue,
    //         namespace: null, // TODO
    //       },
    //     })
    //   );
    // }

    /**
     * Default custom Element method
     * Invoked when the custom element is disconnected from the document's DOM.
     */

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      // IMPORTANT ROUTE FIXME, if we unbind the component then it will no longer work if it is retrieved from the cache and the connectedCallback is called
      // because the riba attributes are removed. We need a solution for that, maybe we do not remove the attributes or we recreate the attributes
      // See view bind / unbind methods for that.
      // only unbind if cache is not enabled?
      // if (this.bound && this.view) {
      //   this.unbind();
      // }
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Component.prototype), "disconnectedCallback", this).call(this);
    }
    /**
     * Default custom Element method
     * Invoked when one of the custom element's attributes is added, removed, or changed.
     * @param attributeName
     * @param oldValue
     * @param newValue
     * @param namespace
     */

  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Component.prototype), "attributeChangedCallback", this).call(this, attributeName, oldValue, newValue, namespace);

      this.bindIfReady();
    }
    /**
     * Extra call formatter to avoid the "this" context problem
     */

  }, {
    key: "callFormatterHandler",
    value: function callFormatterHandler(self) {
      return {
        name: "call",
        read: function read(fn) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          if (!fn) {
            console.error("[".concat(self.el.tagName, "] Can not use \"call\" formatter: fn is undefined! Arguments: "), args);
            throw new Error("TypeError: fn is undefined");
          }

          return fn.apply(self, args);
        }
      };
    }
    /**
     * Extra args formatter to avoid the "this" context problem
     *
     * Sets arguments to a function without directly call them
     * @param fn The function you wish to call
     * @param args the parameters you wish to call the function with
     */

  }, {
    key: "argsFormatterHandler",
    value: function argsFormatterHandler(self) {
      return {
        name: "args",
        read: function read(fn) {
          for (var _len2 = arguments.length, fnArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            fnArgs[_key2 - 1] = arguments[_key2];
          }

          return function (event, scope, el, binding) {
            // append the event handler args to passed args
            fnArgs.push(event);
            fnArgs.push(scope);
            fnArgs.push(el);
            fnArgs.push(binding);
            return fn.apply(self, fnArgs);
          };
        }
      };
    }
  }, {
    key: "bind",
    value: function () {
      var _bind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(this.bound === true)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", this.view);

              case 2:
                if (this.checkRequiredAttributes()) {
                  _context5.next = 5;
                  break;
                }

                this.debug("Not all required attributes are set for bind");
                return _context5.abrupt("return");

              case 5:
                this.bound = true;
                _context5.next = 8;
                return this.beforeBind().then(function () {
                  if (!_this2.el) {
                    throw new Error("this.el is not defined");
                  }

                  _this2.debug("Start to bind Riba");

                  _this2.riba = new _riba__WEBPACK_IMPORTED_MODULE_11__.Riba();
                  _this2.view = _this2.getView();

                  if (_this2.view) {
                    _this2.scope = _this2.view.models;

                    _this2.view.bind();
                  }

                  return _this2.view;
                }).then(function () {
                  return _this2.afterBind();
                })["catch"](function (error) {
                  _this2.bound = false;
                  console.error(error);
                });

              case 8:
                return _context5.abrupt("return", this.view);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function bind() {
        return _bind.apply(this, arguments);
      }

      return bind;
    }()
  }, {
    key: "getView",
    value: function getView() // elements?:
    //   | HTMLCollection
    //   | HTMLElement
    //   | Node
    //   | NodeListOf<ChildNode>
    //   | HTMLUnknownElement[]
    {
      var _this$riba;

      var viewOptions = (_this$riba = this.riba) === null || _this$riba === void 0 ? void 0 : _this$riba.getViewOptions({
        handler: this.eventHandler(this),
        formatters: {
          call: this.callFormatterHandler(this),
          args: this.argsFormatterHandler(this)
        }
      });

      if (viewOptions) {
        var view = new _view__WEBPACK_IMPORTED_MODULE_10__.View(Array.prototype.slice.call(this.childNodes), this.scope, viewOptions);
        return view;
      }

      return null;
    }
  }, {
    key: "unbind",
    value: function () {
      var _unbind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.view) {
                  this.bound = false;
                  this.view.unbind();
                  this.view = null;
                }

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function unbind() {
        return _unbind.apply(this, arguments);
      }

      return unbind;
    }()
  }, {
    key: "build",
    value: function () {
      var _build = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.view) {
                  this.view.build();
                }

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function build() {
        return _build.apply(this, arguments);
      }

      return build;
    }()
  }]);

  return Component;
}(_basic_component__WEBPACK_IMPORTED_MODULE_12__.BasicComponent);

/***/ }),

/***/ "../../packages/core/src/component/index.ts":
/*!**************************************************!*\
  !*** ../../packages/core/src/component/index.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComponentService": function() { return /* reexport safe */ _services_component_service__WEBPACK_IMPORTED_MODULE_0__.ComponentService; },
/* harmony export */   "Component": function() { return /* reexport safe */ _component_component__WEBPACK_IMPORTED_MODULE_1__.Component; },
/* harmony export */   "BasicComponent": function() { return /* reexport safe */ _component_basic_component__WEBPACK_IMPORTED_MODULE_2__.BasicComponent; }
/* harmony export */ });
/* harmony import */ var _services_component_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/component.service */ "../../packages/core/src/services/component.service.ts");
/* harmony import */ var _component_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/component */ "../../packages/core/src/component/component.ts");
/* harmony import */ var _component_basic_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/basic-component */ "../../packages/core/src/component/basic-component.ts");




/***/ }),

/***/ "../../packages/core/src/components/index.ts":
/*!***************************************************!*\
  !*** ../../packages/core/src/components/index.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoComponent": function() { return /* reexport safe */ _video_video_component__WEBPACK_IMPORTED_MODULE_0__.VideoComponent; }
/* harmony export */ });
/* harmony import */ var _video_video_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video/video.component */ "../../packages/core/src/components/video/video.component.ts");
// Do not export abstract components: export { TemplatesComponent } from "./templates/templates.component";


/***/ }),

/***/ "../../packages/core/src/components/video/video.component.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/components/video/video.component.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoComponent": function() { return /* binding */ VideoComponent; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _component_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../component/component */ "../../packages/core/src/component/component.ts");











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var VideoComponent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(VideoComponent, _Component);

  var _super = _createSuper(VideoComponent);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(VideoComponent, [{
    key: "muted",
    get: function get() {
      return this.video && this.video.muted;
    },
    set: function set(muted) {
      this.video.muted = muted;
      this.scope.muted = this.video.muted;

      if (muted) {
        this.video.setAttribute("muted", "");
      } else {
        this.video.removeAttribute("muted");
      }
    }
    /**
     * * 1.0 is highest volume (100%. This is default)
     * * 0.5 is half volume (50%)
     * * 0.0 is silent (same as mute)
     */

  }, {
    key: "volume",
    get: function get() {
      return this.video ? this.video.volume : 0;
    },
    set: function set(volume) {
      this.video.volume = volume;
      this.scope.volume = this.video.volume;
    }
  }, {
    key: "loop",
    get: function get() {
      return this.video && this.video.loop;
    },
    set: function set(loop) {
      this.video.loop = loop;
      this.scope.loop = this.video.loop;

      if (loop) {
        this.video.setAttribute("loop", "");
      } else {
        this.video.removeAttribute("loop");
      }
    }
  }, {
    key: "controls",
    get: function get() {
      return this.video && this.video.controls;
    },
    set: function set(controls) {
      this.video.controls = controls;
      this.scope.controls = this.video.controls;

      if (controls) {
        this.video.setAttribute("controls", ""); // show controls

        this.video.dispatchEvent(new Event("mouseover"));
        this.video.dispatchEvent(new Event("mouseenter"));
        this.video.dispatchEvent(new Event("mousemove"));
      } else {
        this.video.removeAttribute("controls");
      }
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this.video ? this.video.currentTime : 0;
    },
    set: function set(currentTime) {
      this.video.currentTime = currentTime;
      this.scope.currentTime = this.video.currentTime;
    }
    /**
     * @readonly
     */

  }, {
    key: "paused",
    get: function get() {
      return this.video && this.video.paused;
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ["video-src", "autoplay-on-min-buffer", "autoplay-media-query"];
    }
  }]);

  function VideoComponent(element) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, VideoComponent);

    _this = _super.call(this, element);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "autobind", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "alreadyStartedPlaying", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "wasPaused", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "video", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "scope", {
      // properties
      muted: _this.muted,
      volume: _this.volume,
      loop: _this.loop,
      controls: _this.controls,
      currentTime: _this.currentTime,
      videoSrc: undefined,
      autoplayOnMinBuffer: 0,
      autoplayMediaQuery: "",

      /**
       * @readonly
       */
      paused: _this.paused,
      // methods
      toggleMute: _this.toggleMute,
      toggleControls: _this.toggleControls,
      play: _this.play,
      pause: _this.pause,
      togglePlay: _this.togglePlay
    });

    var video = _this.el.querySelector("video");

    _this.video = video;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(VideoComponent, [{
    key: "toggleMute",
    value: function toggleMute() {
      this.muted = !this.muted;
    }
  }, {
    key: "toggleControls",
    value: function toggleControls() {
      this.controls = !this.controls;
    }
  }, {
    key: "play",
    value: function play() {
      this.video.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.video.pause();
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(VideoComponent.prototype), "connectedCallback", this).call(this);

      var video = this.el.querySelector("video");

      if (!video) {
        throw new Error("The video child element is required!");
      }

      this.video = video;
      this.scope.muted = this.video.muted;
      this.scope.volume = this.video.volume;
      this.scope.loop = this.video.loop;
      this.scope.controls = this.video.controls;
      this.scope.currentTime = this.video.currentTime;
      this.scope.paused = this.video.paused;
      this.init(VideoComponent.observedAttributes);
    }
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var sourceElement, mediaQueryList;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(VideoComponent.prototype), "afterBind", this).call(this);

              case 2:
                //video-src attribute
                if (this.scope.videoSrc) {
                  sourceElement = this.video.querySelector("source");

                  if (!sourceElement) {
                    sourceElement = document.createElement("source");
                    this.video.appendChild(sourceElement);
                  }

                  sourceElement.setAttribute("src", this.scope.videoSrc);
                }

                if (this.scope.autoplayMediaQuery) {
                  //autoplay-media-query attribute
                  mediaQueryList = window.matchMedia(this.scope.autoplayMediaQuery);
                  mediaQueryList.addEventListener("change", this.onMediaQueryListEvent.bind(this));

                  if (mediaQueryList.matches) {
                    this.autoplay();
                  }
                } else if (this.scope.autoplayOnMinBuffer) {
                  //autoplay-on-min-buffer attribute
                  this.autoplay();
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
    /**
     * Loads the media and checks if the autoplay-on-min-buffer is set
     */

  }, {
    key: "autoplay",
    value: function autoplay() {
      if (this.scope.autoplayOnMinBuffer) {
        this.video.addEventListener("progress", this.onVideoProgress.bind(this));
        this.video.addEventListener("canplaythrough", this.forceAutoplay.bind(this) //trust browser more than ourselves
        );
        this.forceLoad();
      } else {
        this.forceAutoplay();
      }
    }
  }, {
    key: "forceLoad",
    value: function forceLoad() {
      this.video.setAttribute("preload", "auto");
      this.video.load();
    }
    /**
     * Forces autoplay without checking for the autoplay-on-min-buffer event
     */

  }, {
    key: "forceAutoplay",
    value: function forceAutoplay() {
      if (!this.alreadyStartedPlaying) {
        this.alreadyStartedPlaying = true;
        this.video.muted = true; //video is required to be muted if autoplay video is supposed to autoplay

        this.forceLoad();
        this.video.play();
      }
    }
    /*********************
     * Event listener start
     *********************/

  }, {
    key: "onMediaQueryListEvent",
    value: function onMediaQueryListEvent(event) {
      if (event.matches) {
        //if mediaquery matches, play video or start autoplay
        if (this.alreadyStartedPlaying) {
          if (!this.wasPaused) {
            this.play();
          }
        } else {
          this.autoplay();
        }
      } else {
        //if mediaquery stops matching, pause video if not already paused
        this.wasPaused = this.video.paused;
        this.pause();
      }
    }
  }, {
    key: "onVideoProgress",
    value: function onVideoProgress() {
      if (this.alreadyStartedPlaying) return;

      if (isNaN(this.video.duration)) {
        console.warn("Video duration is NaN");
        return;
      } //calculate already buffered amount


      var bufferedAmount = 0;

      for (var i = 0; i < this.video.buffered.length; i++) {
        bufferedAmount += this.video.buffered.end(i) - this.video.buffered.start(i);
      } //if buffered amount is over given percentage in scope, force autoplay


      if (bufferedAmount / this.video.duration > this.scope.autoplayOnMinBuffer) {
        this.forceAutoplay();
      }
    }
    /*********************
     * Event listener end
     *********************/

  }, {
    key: "init",
    value: function () {
      var _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(observedAttributes) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(VideoComponent.prototype), "init", this).call(this, observedAttributes).then(function (view) {
                  return view;
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }() // deconstructor

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(VideoComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      return null;
    }
  }]);

  return VideoComponent;
}(_component_component__WEBPACK_IMPORTED_MODULE_10__.Component);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(VideoComponent, "tagName", "rv-video");

/***/ }),

/***/ "../../packages/core/src/core.module.ts":
/*!**********************************************!*\
  !*** ../../packages/core/src/core.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coreModule": function() { return /* binding */ coreModule; }
/* harmony export */ });
/* harmony import */ var _binders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binders */ "../../packages/core/src/binders/index.ts");
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatters */ "../../packages/core/src/formatters/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "../../packages/core/src/services/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components */ "../../packages/core/src/components/index.ts");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./adapters */ "../../packages/core/src/adapters/index.ts");





var coreModule = {
  formatters: _formatters__WEBPACK_IMPORTED_MODULE_1__,
  binders: _binders__WEBPACK_IMPORTED_MODULE_0__,
  services: _services__WEBPACK_IMPORTED_MODULE_2__,
  components: _components__WEBPACK_IMPORTED_MODULE_3__,
  adapters: _adapters__WEBPACK_IMPORTED_MODULE_4__
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/contains.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/array/contains.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containsFormatter": function() { return /* binding */ containsFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Returns true if an object, array or string contains an object, property or substring.
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */

var containsFormatter = {
  name: "contains",
  read: function read(value, attr, search) {
    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isString)(value)) {
      return value.indexOf(attr) > -1;
    } else if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isArray)(value)) {
      if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isDefined)(attr)) {
        if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isDefined)(search)) {
          return value[attr] === search;
        } else {
          return value.indexOf(attr) !== -1;
        }
      }
    } else if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isObject)(value)) {
      if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isDefined)(attr)) {
        if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isDefined)(search)) {
          return value[attr] === search;
        } else {
          return Object.keys(value).indexOf(attr) !== -1;
        }
      }
    }

    return false;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/empty.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/array/empty.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "emptyFormatter": function() { return /* binding */ emptyFormatter; }
/* harmony export */ });
/* harmony import */ var _size_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./size.formatter */ "../../packages/core/src/formatters/array/size.formatter.ts");

var emptyFormatter = {
  name: "empty",
  read: function read(a) {
    return _size_formatter__WEBPACK_IMPORTED_MODULE_0__.sizeFormatter.read(a) <= 0;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/first.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/array/first.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firstFormatter": function() { return /* binding */ firstFormatter; }
/* harmony export */ });
/* harmony import */ var _get_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get.formatter */ "../../packages/core/src/formatters/array/get.formatter.ts");

/**
 * Array formatter to get the first element of an array
 */

var firstFormatter = {
  name: "first",
  read: function read(value) {
    return _get_formatter__WEBPACK_IMPORTED_MODULE_0__.getFormatter.read(value, 0);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/get.formatter.ts":
/*!*****************************************************************!*\
  !*** ../../packages/core/src/formatters/array/get.formatter.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFormatter": function() { return /* binding */ getFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Get property of object or array
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */

var getFormatter = {
  name: "get",
  read: function read(value, key) {
    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isObject)(value) || (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isArray)(value)) {
      return value[key];
    }

    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isString)(value)) {
      if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isNumber)(key)) {
        return value.charAt(key);
      }
    }

    return null;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/index.ts":
/*!*********************************************************!*\
  !*** ../../packages/core/src/formatters/array/index.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containsFormatter": function() { return /* reexport safe */ _contains_formatter__WEBPACK_IMPORTED_MODULE_0__.containsFormatter; },
/* harmony export */   "emptyFormatter": function() { return /* reexport safe */ _empty_formatter__WEBPACK_IMPORTED_MODULE_1__.emptyFormatter; },
/* harmony export */   "firstFormatter": function() { return /* reexport safe */ _first_formatter__WEBPACK_IMPORTED_MODULE_2__.firstFormatter; },
/* harmony export */   "getFormatter": function() { return /* reexport safe */ _get_formatter__WEBPACK_IMPORTED_MODULE_3__.getFormatter; },
/* harmony export */   "isLastFormatter": function() { return /* reexport safe */ _is_last_formatter__WEBPACK_IMPORTED_MODULE_4__.isLastFormatter; },
/* harmony export */   "lastFormatter": function() { return /* reexport safe */ _last_formatter__WEBPACK_IMPORTED_MODULE_5__.lastFormatter; },
/* harmony export */   "randomFormatter": function() { return /* reexport safe */ _random_formatter__WEBPACK_IMPORTED_MODULE_6__.randomFormatter; },
/* harmony export */   "rangeFormatter": function() { return /* reexport safe */ _range_formatter__WEBPACK_IMPORTED_MODULE_7__.rangeFormatter; },
/* harmony export */   "setFormatter": function() { return /* reexport safe */ _set_formatter__WEBPACK_IMPORTED_MODULE_8__.setFormatter; },
/* harmony export */   "sizeFormatter": function() { return /* reexport safe */ _size_formatter__WEBPACK_IMPORTED_MODULE_9__.sizeFormatter; }
/* harmony export */ });
/* harmony import */ var _contains_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contains.formatter */ "../../packages/core/src/formatters/array/contains.formatter.ts");
/* harmony import */ var _empty_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty.formatter */ "../../packages/core/src/formatters/array/empty.formatter.ts");
/* harmony import */ var _first_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./first.formatter */ "../../packages/core/src/formatters/array/first.formatter.ts");
/* harmony import */ var _get_formatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get.formatter */ "../../packages/core/src/formatters/array/get.formatter.ts");
/* harmony import */ var _is_last_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./is-last.formatter */ "../../packages/core/src/formatters/array/is-last.formatter.ts");
/* harmony import */ var _last_formatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./last.formatter */ "../../packages/core/src/formatters/array/last.formatter.ts");
/* harmony import */ var _random_formatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./random.formatter */ "../../packages/core/src/formatters/array/random.formatter.ts");
/* harmony import */ var _range_formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./range.formatter */ "../../packages/core/src/formatters/array/range.formatter.ts");
/* harmony import */ var _set_formatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./set.formatter */ "../../packages/core/src/formatters/array/set.formatter.ts");
/* harmony import */ var _size_formatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./size.formatter */ "../../packages/core/src/formatters/array/size.formatter.ts");
// property / object / array formatters











/***/ }),

/***/ "../../packages/core/src/formatters/array/is-last.formatter.ts":
/*!*********************************************************************!*\
  !*** ../../packages/core/src/formatters/array/is-last.formatter.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isLastFormatter": function() { return /* binding */ isLastFormatter; }
/* harmony export */ });
/**
 * Returns true if value index is the last index of the array. Returns false if it is not the last index.
 * ```
 *  <div rv-each-image="product.images" rv-hide="product.images | last %image%"></div>
 * ```
 * @see https://help.shopify.com/themes/liquid/objects/for-loops#forloop-last
 */
var isLastFormatter = {
  name: "isLast",
  read: function read(array, i) {
    return array.length === i + 1;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/last.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/array/last.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lastFormatter": function() { return /* binding */ lastFormatter; }
/* harmony export */ });
/* harmony import */ var _get_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get.formatter */ "../../packages/core/src/formatters/array/get.formatter.ts");

/**
 * Array formatter to get the last element of an array
 */

var lastFormatter = {
  name: "last",
  read: function read(array) {
    return _get_formatter__WEBPACK_IMPORTED_MODULE_0__.getFormatter.read(array, array.length - 1);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/random.formatter.ts":
/*!********************************************************************!*\
  !*** ../../packages/core/src/formatters/array/random.formatter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomFormatter": function() { return /* binding */ randomFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Gets back random value of array
 * @example <div rv-add-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 *
 * Or gets back a randon number
 * Random number between 0 and 6:
 * @example <div rv-add-class='6 | random'>
 * Random number between 1 and 6:
 * @example <div rv-add-class='6 | random 1'>
 */

var randomFormatter = {
  name: "random",
  read: function read(arrayOrMaxNumber) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    // If is array
    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isArray)(arrayOrMaxNumber)) {
      return arrayOrMaxNumber[Math.floor(Math.random() * arrayOrMaxNumber.length)];
    } // If is number


    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isNumber)(arrayOrMaxNumber)) {
      var max = arrayOrMaxNumber;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return null;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/range.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/array/range.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rangeFormatter": function() { return /* binding */ rangeFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Array formatter to get a subarray from array
 */

var rangeFormatter = {
  name: "range",
  read: function read(arr, start, end) {
    start = Number((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isNumber)(start) ? start : 0);
    end = Number((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isNumber)(end) ? end : arr.length - 1);

    if (end > arr.length - 1) {
      end = arr.length - 1;
    }

    if (start > end) {
      return [];
    }

    return arr.slice(Number(start || 0), 1 + end);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/set.formatter.ts":
/*!*****************************************************************!*\
  !*** ../../packages/core/src/formatters/array/set.formatter.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFormatter": function() { return /* binding */ setFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Sets property of object, array or value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */

var setFormatter = {
  name: "set",
  read: function read(obj, key, value) {
    // the key is the value if value is not set
    if (!value) {
      value = key;
    }

    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isObject)(obj) || (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isArray)(obj)) {
      obj[key] = value;
    } else {
      obj = value;
    }

    return obj;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/array/size.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/array/size.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sizeFormatter": function() { return /* binding */ sizeFormatter; }
/* harmony export */ });
/**
 * Returns the size of a string (the number of characters) or an array (the number of elements).
 * @see https://help.shopify.com/themes/liquid/filters/array-filters#size
 */
var sizeFormatter = {
  name: "size",
  read: function read(value) {
    return value && value.length ? value.length : 0;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/and.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/and.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "andFormatter": function() { return /* binding */ andFormatter; }
/* harmony export */ });
/**
 * a && b
 */
var andFormatter = {
  name: "and",
  read: function read(a, b) {
    return a && b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/between.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/between.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "betweenFormatter": function() { return /* binding */ betweenFormatter; }
/* harmony export */ });
/**
 * a >= b && a <= c
 */
var betweenFormatter = {
  name: "between",
  read: function read(num) {
    return num >= (arguments.length <= 1 ? undefined : arguments[1]) && num <= (arguments.length <= 2 ? undefined : arguments[2]);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/egt.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/egt.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "egtFormatter": function() { return /* binding */ egtFormatter; }
/* harmony export */ });
/**
 * equal or greater than
 * a >= b
 */
var egtFormatter = {
  name: "egt",
  read: function read(a, b) {
    return a >= b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/elt.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/elt.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eltFormatter": function() { return /* binding */ eltFormatter; }
/* harmony export */ });
/**
 * euqal or lower than
 * a <= b
 */
var eltFormatter = {
  name: "elt",
  read: function read(a, b) {
    return a <= b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/eq.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/eq.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "eqFormatter": function() { return /* binding */ eqFormatter; }
/* harmony export */ });
/**
 * a === b
 */
var eqFormatter = {
  name: "eq",
  read: function read(a, b) {
    return a === b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/gt.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/gt.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gtFormatter": function() { return /* binding */ gtFormatter; }
/* harmony export */ });
/**
 * greater than
 * a > b
 */
var gtFormatter = {
  name: "gt",
  read: function read(a, b) {
    return a > b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/index.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/formatters/compare/index.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "andFormatter": function() { return /* reexport safe */ _and_formatter__WEBPACK_IMPORTED_MODULE_0__.andFormatter; },
/* harmony export */   "betweenFormatter": function() { return /* reexport safe */ _between_formatter__WEBPACK_IMPORTED_MODULE_1__.betweenFormatter; },
/* harmony export */   "egtFormatter": function() { return /* reexport safe */ _egt_formatter__WEBPACK_IMPORTED_MODULE_2__.egtFormatter; },
/* harmony export */   "eqFormatter": function() { return /* reexport safe */ _eq_formatter__WEBPACK_IMPORTED_MODULE_3__.eqFormatter; },
/* harmony export */   "gtFormatter": function() { return /* reexport safe */ _gt_formatter__WEBPACK_IMPORTED_MODULE_4__.gtFormatter; },
/* harmony export */   "neFormatter": function() { return /* reexport safe */ _ne_formatter__WEBPACK_IMPORTED_MODULE_5__.neFormatter; },
/* harmony export */   "ltFormatter": function() { return /* reexport safe */ _lt_formatter__WEBPACK_IMPORTED_MODULE_6__.ltFormatter; },
/* harmony export */   "eltFormatter": function() { return /* reexport safe */ _elt_formatter__WEBPACK_IMPORTED_MODULE_7__.eltFormatter; },
/* harmony export */   "orFormatter": function() { return /* reexport safe */ _or_formatter__WEBPACK_IMPORTED_MODULE_8__.orFormatter; },
/* harmony export */   "notFormatter": function() { return /* reexport safe */ _not_formatter__WEBPACK_IMPORTED_MODULE_9__.notFormatter; }
/* harmony export */ });
/* harmony import */ var _and_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./and.formatter */ "../../packages/core/src/formatters/compare/and.formatter.ts");
/* harmony import */ var _between_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./between.formatter */ "../../packages/core/src/formatters/compare/between.formatter.ts");
/* harmony import */ var _egt_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./egt.formatter */ "../../packages/core/src/formatters/compare/egt.formatter.ts");
/* harmony import */ var _eq_formatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eq.formatter */ "../../packages/core/src/formatters/compare/eq.formatter.ts");
/* harmony import */ var _gt_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gt.formatter */ "../../packages/core/src/formatters/compare/gt.formatter.ts");
/* harmony import */ var _ne_formatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ne.formatter */ "../../packages/core/src/formatters/compare/ne.formatter.ts");
/* harmony import */ var _lt_formatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lt.formatter */ "../../packages/core/src/formatters/compare/lt.formatter.ts");
/* harmony import */ var _elt_formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./elt.formatter */ "../../packages/core/src/formatters/compare/elt.formatter.ts");
/* harmony import */ var _or_formatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./or.formatter */ "../../packages/core/src/formatters/compare/or.formatter.ts");
/* harmony import */ var _not_formatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./not.formatter */ "../../packages/core/src/formatters/compare/not.formatter.ts");
/**
 * compare functions
 * Add useful general-purpose formatters for Rivets.js
 * Some formatters from cart.js and rivetsjs-stdlib
 * @see https://github.com/discolabs/cartjs/
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib
 * @see https://github.com/JumpLinkNetwork/shopify-productjs
 */











/***/ }),

/***/ "../../packages/core/src/formatters/compare/lt.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/lt.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ltFormatter": function() { return /* binding */ ltFormatter; }
/* harmony export */ });
/**
 * lower than
 * a < b
 */
var ltFormatter = {
  name: "lt",
  read: function read(a, b) {
    return a < b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/ne.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/ne.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "neFormatter": function() { return /* binding */ neFormatter; }
/* harmony export */ });
/**
 * a !== b
 */
var neFormatter = {
  name: "ne",
  read: function read(a, b) {
    return a !== b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/not.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/not.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "notFormatter": function() { return /* binding */ notFormatter; }
/* harmony export */ });
/**
 * !a
 */
var notFormatter = {
  name: "not",
  read: function read(a) {
    return !a;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/compare/or.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/compare/or.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orFormatter": function() { return /* binding */ orFormatter; }
/* harmony export */ });
/**
 * a || b
 */
var orFormatter = {
  name: "or",
  read: function read(a, b) {
    return a || b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/index.ts":
/*!***************************************************!*\
  !*** ../../packages/core/src/formatters/index.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containsFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.containsFormatter; },
/* harmony export */   "emptyFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.emptyFormatter; },
/* harmony export */   "firstFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.firstFormatter; },
/* harmony export */   "getFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.getFormatter; },
/* harmony export */   "isLastFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.isLastFormatter; },
/* harmony export */   "lastFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.lastFormatter; },
/* harmony export */   "randomFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.randomFormatter; },
/* harmony export */   "rangeFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.rangeFormatter; },
/* harmony export */   "setFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.setFormatter; },
/* harmony export */   "sizeFormatter": function() { return /* reexport safe */ _array_index__WEBPACK_IMPORTED_MODULE_0__.sizeFormatter; },
/* harmony export */   "andFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.andFormatter; },
/* harmony export */   "betweenFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.betweenFormatter; },
/* harmony export */   "egtFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.egtFormatter; },
/* harmony export */   "eltFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.eltFormatter; },
/* harmony export */   "eqFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.eqFormatter; },
/* harmony export */   "gtFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.gtFormatter; },
/* harmony export */   "ltFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.ltFormatter; },
/* harmony export */   "neFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.neFormatter; },
/* harmony export */   "notFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.notFormatter; },
/* harmony export */   "orFormatter": function() { return /* reexport safe */ _compare_index__WEBPACK_IMPORTED_MODULE_1__.orFormatter; },
/* harmony export */   "digitsFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.digitsFormatter; },
/* harmony export */   "dividedByFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.dividedByFormatter; },
/* harmony export */   "evenFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.evenFormatter; },
/* harmony export */   "gcdFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.gcdFormatter; },
/* harmony export */   "minusFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.minusFormatter; },
/* harmony export */   "moduloFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.moduloFormatter; },
/* harmony export */   "plusFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.plusFormatter; },
/* harmony export */   "timesFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.timesFormatter; },
/* harmony export */   "unevenFormatter": function() { return /* reexport safe */ _math_index__WEBPACK_IMPORTED_MODULE_2__.unevenFormatter; },
/* harmony export */   "MapFormatter": function() { return /* reexport safe */ _special_index__WEBPACK_IMPORTED_MODULE_3__.MapFormatter; },
/* harmony export */   "argsFormatter": function() { return /* reexport safe */ _special_index__WEBPACK_IMPORTED_MODULE_3__.argsFormatter; },
/* harmony export */   "callFormatter": function() { return /* reexport safe */ _special_index__WEBPACK_IMPORTED_MODULE_3__.callFormatter; },
/* harmony export */   "debugFormatter": function() { return /* reexport safe */ _special_index__WEBPACK_IMPORTED_MODULE_3__.debugFormatter; },
/* harmony export */   "defaultFormatter": function() { return /* reexport safe */ _special_index__WEBPACK_IMPORTED_MODULE_3__.defaultFormatter; },
/* harmony export */   "appendFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.appendFormatter; },
/* harmony export */   "downcaseFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.downcaseFormatter; },
/* harmony export */   "filledFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.filledFormatter; },
/* harmony export */   "handleizeFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.handleizeFormatter; },
/* harmony export */   "matchFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.matchFormatter; },
/* harmony export */   "numberFormatFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.numberFormatFormatter; },
/* harmony export */   "padEndFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.padEndFormatter; },
/* harmony export */   "padStartFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.padStartFormatter; },
/* harmony export */   "pluralizeFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.pluralizeFormatter; },
/* harmony export */   "prependFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.prependFormatter; },
/* harmony export */   "replaceFirstFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.replaceFirstFormatter; },
/* harmony export */   "replaceFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.replaceFormatter; },
/* harmony export */   "sliceFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.sliceFormatter; },
/* harmony export */   "stripFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.stripFormatter; },
/* harmony export */   "stripHtmlFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.stripHtmlFormatter; },
/* harmony export */   "upcaseFormatter": function() { return /* reexport safe */ _string_index__WEBPACK_IMPORTED_MODULE_4__.upcaseFormatter; },
/* harmony export */   "booleanFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.booleanFormatter; },
/* harmony export */   "isArrayFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.isArrayFormatter; },
/* harmony export */   "isBooleanFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.isBooleanFormatter; },
/* harmony export */   "isDefinedFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.isDefinedFormatter; },
/* harmony export */   "isIntegerFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.isIntegerFormatter; },
/* harmony export */   "isNumberFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.isNumberFormatter; },
/* harmony export */   "isObjectFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.isObjectFormatter; },
/* harmony export */   "isStringFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.isStringFormatter; },
/* harmony export */   "isUndefinedFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.isUndefinedFormatter; },
/* harmony export */   "jsonFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.jsonFormatter; },
/* harmony export */   "parseFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.parseFormatter; },
/* harmony export */   "stringFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.stringFormatter; },
/* harmony export */   "toDecimalFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.toDecimalFormatter; },
/* harmony export */   "toFloatFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.toFloatFormatter; },
/* harmony export */   "toIntegerFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.toIntegerFormatter; },
/* harmony export */   "toNumberFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.toNumberFormatter; },
/* harmony export */   "toStringFormatter": function() { return /* reexport safe */ _type_index__WEBPACK_IMPORTED_MODULE_5__.toStringFormatter; }
/* harmony export */ });
/* harmony import */ var _array_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array/index */ "../../packages/core/src/formatters/array/index.ts");
/* harmony import */ var _compare_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compare/index */ "../../packages/core/src/formatters/compare/index.ts");
/* harmony import */ var _math_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math/index */ "../../packages/core/src/formatters/math/index.ts");
/* harmony import */ var _special_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./special/index */ "../../packages/core/src/formatters/special/index.ts");
/* harmony import */ var _string_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./string/index */ "../../packages/core/src/formatters/string/index.ts");
/* harmony import */ var _type_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./type/index */ "../../packages/core/src/formatters/type/index.ts");







/***/ }),

/***/ "../../packages/core/src/formatters/math/digits.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/math/digits.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "digitsFormatter": function() { return /* binding */ digitsFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Just get the digits of a string, useful to remove px from css value
 * @see http://stackoverflow.com/a/1100653/1465919
 */

var digitsFormatter = {
  name: "digits",
  read: function read(str) {
    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isNumber)(str)) {
      return str;
    }

    return (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.justDigits)(str);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/math/divided-by.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/math/divided-by.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dividedByFormatter": function() { return /* binding */ dividedByFormatter; }
/* harmony export */ });
/**
 * Divides an output by a number. The output is rounded down to the nearest integer.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#divided_by
 */
var dividedByFormatter = {
  name: "dividedBy",
  read: function read(a, b) {
    return Number(a) / Number(b);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/math/even.formatter.ts":
/*!*****************************************************************!*\
  !*** ../../packages/core/src/formatters/math/even.formatter.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "evenFormatter": function() { return /* binding */ evenFormatter; }
/* harmony export */ });
/**
 * Check if a number is even or not
 */
var evenFormatter = {
  name: "even",
  read: function read(num) {
    return num % 2 === 0;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/math/gcd.formatter.ts":
/*!****************************************************************!*\
  !*** ../../packages/core/src/formatters/math/gcd.formatter.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gcdFormatter": function() { return /* binding */ gcdFormatter; }
/* harmony export */ });
/**
 * Greatest common divisor (GCD) useful to calculate a ratio
 * @see https://stackoverflow.com/a/1186465/1465919
 */
var _gcd = function _gcd(a, b) {
  return b === 0 ? a : _gcd(b, a % b);
};

var gcdFormatter = {
  name: "gcd",
  read: _gcd
};

/***/ }),

/***/ "../../packages/core/src/formatters/math/index.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/formatters/math/index.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "plusFormatter": function() { return /* reexport safe */ _plus_formatter__WEBPACK_IMPORTED_MODULE_0__.plusFormatter; },
/* harmony export */   "minusFormatter": function() { return /* reexport safe */ _minus_formatter__WEBPACK_IMPORTED_MODULE_1__.minusFormatter; },
/* harmony export */   "timesFormatter": function() { return /* reexport safe */ _times_formatter__WEBPACK_IMPORTED_MODULE_2__.timesFormatter; },
/* harmony export */   "dividedByFormatter": function() { return /* reexport safe */ _divided_by_formatter__WEBPACK_IMPORTED_MODULE_3__.dividedByFormatter; },
/* harmony export */   "moduloFormatter": function() { return /* reexport safe */ _modulo_formatter__WEBPACK_IMPORTED_MODULE_4__.moduloFormatter; },
/* harmony export */   "gcdFormatter": function() { return /* reexport safe */ _gcd_formatter__WEBPACK_IMPORTED_MODULE_5__.gcdFormatter; },
/* harmony export */   "evenFormatter": function() { return /* reexport safe */ _even_formatter__WEBPACK_IMPORTED_MODULE_6__.evenFormatter; },
/* harmony export */   "unevenFormatter": function() { return /* reexport safe */ _uneven_formatter__WEBPACK_IMPORTED_MODULE_7__.unevenFormatter; },
/* harmony export */   "digitsFormatter": function() { return /* reexport safe */ _digits_formatter__WEBPACK_IMPORTED_MODULE_8__.digitsFormatter; }
/* harmony export */ });
/* harmony import */ var _plus_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plus.formatter */ "../../packages/core/src/formatters/math/plus.formatter.ts");
/* harmony import */ var _minus_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minus.formatter */ "../../packages/core/src/formatters/math/minus.formatter.ts");
/* harmony import */ var _times_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./times.formatter */ "../../packages/core/src/formatters/math/times.formatter.ts");
/* harmony import */ var _divided_by_formatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./divided-by.formatter */ "../../packages/core/src/formatters/math/divided-by.formatter.ts");
/* harmony import */ var _modulo_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modulo.formatter */ "../../packages/core/src/formatters/math/modulo.formatter.ts");
/* harmony import */ var _gcd_formatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gcd.formatter */ "../../packages/core/src/formatters/math/gcd.formatter.ts");
/* harmony import */ var _even_formatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./even.formatter */ "../../packages/core/src/formatters/math/even.formatter.ts");
/* harmony import */ var _uneven_formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./uneven.formatter */ "../../packages/core/src/formatters/math/uneven.formatter.ts");
/* harmony import */ var _digits_formatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./digits.formatter */ "../../packages/core/src/formatters/math/digits.formatter.ts");
// math formatters










/***/ }),

/***/ "../../packages/core/src/formatters/math/minus.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/math/minus.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "minusFormatter": function() { return /* binding */ minusFormatter; }
/* harmony export */ });
/**
 * Subtracts a number from an output.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#minus
 */
var minusFormatter = {
  name: "minus",
  read: function read(a, b) {
    return Number(a) - Number(b);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/math/modulo.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/math/modulo.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "moduloFormatter": function() { return /* binding */ moduloFormatter; }
/* harmony export */ });
/**
 * Divides an value by a number and returns the remainder.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#modulo
 */
var moduloFormatter = {
  name: "modulo",
  read: function read(a, b) {
    return Number(a) % Number(b);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/math/plus.formatter.ts":
/*!*****************************************************************!*\
  !*** ../../packages/core/src/formatters/math/plus.formatter.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "plusFormatter": function() { return /* binding */ plusFormatter; }
/* harmony export */ });
/**
 * Adds a number to an value.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#plus
 */
var plusFormatter = {
  name: "plus",
  read: function read(a, b) {
    return Number(a) + Number(b);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/math/times.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/math/times.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timesFormatter": function() { return /* binding */ timesFormatter; }
/* harmony export */ });
/**
 * Multiplies an value by a number.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#times
 */
var timesFormatter = {
  name: "times",
  read: function read(a, b) {
    return Number(a) * Number(b);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/math/uneven.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/math/uneven.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "unevenFormatter": function() { return /* binding */ unevenFormatter; }
/* harmony export */ });
var unevenFormatter = {
  name: "uneven",
  read: function read(num) {
    return num % 2 !== 0;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/special/args.formatter.ts":
/*!********************************************************************!*\
  !*** ../../packages/core/src/formatters/special/args.formatter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "argsFormatter": function() { return /* binding */ argsFormatter; }
/* harmony export */ });
/**
 * Sets arguments to a function without directly call them
 * ```html
 * <button rv-on-click="sum | args 1 2"></button>
 * ```
 * @param fn The function the event handler should call
 * @param fnArgs the parameters you wish to get called the function with
 */
var argsFormatter = {
  name: "args",
  read: function read(fn) {
    var _this = this;

    for (var _len = arguments.length, fnArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      fnArgs[_key - 1] = arguments[_key];
    }

    return function (event, scope, el, binding) {
      // append the event handler args to passed args
      fnArgs.push(event);
      fnArgs.push(scope);
      fnArgs.push(el);
      fnArgs.push(binding);
      return fn.apply(_this, fnArgs);
    };
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/special/call.formatter.ts":
/*!********************************************************************!*\
  !*** ../../packages/core/src/formatters/special/call.formatter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callFormatter": function() { return /* binding */ callFormatter; }
/* harmony export */ });
// babel misinterprets the "this" fake parameter, so we define it in this interfaces

/**
 * Calls a function with arguments
 * @param fn The function you wish to call
 * @param args the parameters you wish to call the function with
 */
var callFormatter = {
  name: "call",
  read: function read(fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(this, args);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/special/debug.formatter.ts":
/*!*********************************************************************!*\
  !*** ../../packages/core/src/formatters/special/debug.formatter.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debugFormatter": function() { return /* binding */ debugFormatter; }
/* harmony export */ });
var debugFormatter = {
  name: "debug",
  read: function read(toPrint) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "debug";
    console[level](toPrint);
    return toPrint;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/special/default.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/special/default.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultFormatter": function() { return /* binding */ defaultFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Sets a default value if the first value is not set
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */

var defaultFormatter = {
  name: "default",
  read: function read(value, defaultValue) {
    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isDefined)(value)) {
      if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isString)(value)) {
        if (value.length > 0) {
          return value;
        } else {
          return defaultValue;
        }
      }

      return value;
    }

    return defaultValue;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/special/index.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/formatters/special/index.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "argsFormatter": function() { return /* reexport safe */ _args_formatter__WEBPACK_IMPORTED_MODULE_0__.argsFormatter; },
/* harmony export */   "debugFormatter": function() { return /* reexport safe */ _debug_formatter__WEBPACK_IMPORTED_MODULE_1__.debugFormatter; },
/* harmony export */   "defaultFormatter": function() { return /* reexport safe */ _default_formatter__WEBPACK_IMPORTED_MODULE_2__.defaultFormatter; },
/* harmony export */   "callFormatter": function() { return /* reexport safe */ _call_formatter__WEBPACK_IMPORTED_MODULE_3__.callFormatter; },
/* harmony export */   "MapFormatter": function() { return /* reexport safe */ _map_formatter__WEBPACK_IMPORTED_MODULE_4__.MapFormatter; }
/* harmony export */ });
/* harmony import */ var _args_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./args.formatter */ "../../packages/core/src/formatters/special/args.formatter.ts");
/* harmony import */ var _debug_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug.formatter */ "../../packages/core/src/formatters/special/debug.formatter.ts");
/* harmony import */ var _default_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default.formatter */ "../../packages/core/src/formatters/special/default.formatter.ts");
/* harmony import */ var _call_formatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./call.formatter */ "../../packages/core/src/formatters/special/call.formatter.ts");
/* harmony import */ var _map_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map.formatter */ "../../packages/core/src/formatters/special/map.formatter.ts");
// special helper formatters






/***/ }),

/***/ "../../packages/core/src/formatters/special/map.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/special/map.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapFormatter": function() { return /* binding */ MapFormatter; }
/* harmony export */ });
/* eslint-disable prefer-spread */

/* eslint-disable prefer-rest-params */

/**
 * Calls a method on the given object. The first parameters defines the object and the second the methodname.
 * Target will be passed as the first argument to the method.
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib#map
 * @example
 * ```html
 * <span rv-text="10 | map 'Math' 'sin'"></span>
 * ```
 * @returns e.g. as in the example: `<span>-0.5440211108893699</span>`
 */
var MapFormatter = {
  name: "map",

  /**
   * Calls a method on the given object. The first parameters defines the object and the second the methodname.
   * Target will be passed as the first argument to the method.
   * @see https://github.com/matthieuriolo/rivetsjs-stdlib#map
   * @example
   * ```html
   * <span rv-text="10 | map 'Math' 'sin'"></span>
   * ```
   * @returns e.g. as in the example: `<span>-0.5440211108893699</span>`
   * @param target
   * @param obj
   * @param prop
   */
  read: function read(target, obj, prop) {
    var args = Array.prototype.slice.call(arguments);
    args.splice(1, 2);
    return obj[prop].apply(obj, args);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/append.formatter.ts":
/*!*********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/append.formatter.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appendFormatter": function() { return /* binding */ appendFormatter; }
/* harmony export */ });
/**
 * Appends characters to a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#append
 */
var appendFormatter = {
  name: "append",
  read: function read(a, b) {
    return a + b;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/downcase.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/downcase.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "downcaseFormatter": function() { return /* binding */ downcaseFormatter; }
/* harmony export */ });
/**
 * Converts a string into lowercase.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#downcase
 */
var downcaseFormatter = {
  name: "downcase",
  read: function read(str) {
    return str.toLowerCase();
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/filled.formatter.ts":
/*!*********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/filled.formatter.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filledFormatter": function() { return /* binding */ filledFormatter; }
/* harmony export */ });
/* harmony import */ var _array_empty_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array/empty.formatter */ "../../packages/core/src/formatters/array/empty.formatter.ts");
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");


/**
 * Check if value is a string and not empty
 */

var filledFormatter = {
  name: "filled",
  read: function read(str) {
    return (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_1__.isString)(str) && !_array_empty_formatter__WEBPACK_IMPORTED_MODULE_0__.emptyFormatter.read(str.replace(/\s/g, ""));
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/handleize.formatter.ts":
/*!************************************************************************!*\
  !*** ../../packages/core/src/formatters/string/handleize.formatter.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleizeFormatter": function() { return /* binding */ handleizeFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Formats a string into a handle.
 * E.g. '100% M & Ms!!!' -> 100-m-ms
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */

var handleizeFormatter = {
  name: "handleize",
  read: function read(str) {
    return (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.handleize)(str);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/index.ts":
/*!**********************************************************!*\
  !*** ../../packages/core/src/formatters/string/index.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appendFormatter": function() { return /* reexport safe */ _append_formatter__WEBPACK_IMPORTED_MODULE_0__.appendFormatter; },
/* harmony export */   "downcaseFormatter": function() { return /* reexport safe */ _downcase_formatter__WEBPACK_IMPORTED_MODULE_1__.downcaseFormatter; },
/* harmony export */   "filledFormatter": function() { return /* reexport safe */ _filled_formatter__WEBPACK_IMPORTED_MODULE_2__.filledFormatter; },
/* harmony export */   "handleizeFormatter": function() { return /* reexport safe */ _handleize_formatter__WEBPACK_IMPORTED_MODULE_3__.handleizeFormatter; },
/* harmony export */   "matchFormatter": function() { return /* reexport safe */ _match_formatter__WEBPACK_IMPORTED_MODULE_4__.matchFormatter; },
/* harmony export */   "padStartFormatter": function() { return /* reexport safe */ _pad_start_formatter__WEBPACK_IMPORTED_MODULE_5__.padStartFormatter; },
/* harmony export */   "padEndFormatter": function() { return /* reexport safe */ _pad_end_formatter__WEBPACK_IMPORTED_MODULE_6__.padEndFormatter; },
/* harmony export */   "numberFormatFormatter": function() { return /* reexport safe */ _number_format_formatter__WEBPACK_IMPORTED_MODULE_7__.numberFormatFormatter; },
/* harmony export */   "pluralizeFormatter": function() { return /* reexport safe */ _pluralize_formatter__WEBPACK_IMPORTED_MODULE_8__.pluralizeFormatter; },
/* harmony export */   "prependFormatter": function() { return /* reexport safe */ _prepend_formatter__WEBPACK_IMPORTED_MODULE_9__.prependFormatter; },
/* harmony export */   "upcaseFormatter": function() { return /* reexport safe */ _upcase_formatter__WEBPACK_IMPORTED_MODULE_10__.upcaseFormatter; },
/* harmony export */   "replaceFormatter": function() { return /* reexport safe */ _replace_formatter__WEBPACK_IMPORTED_MODULE_11__.replaceFormatter; },
/* harmony export */   "replaceFirstFormatter": function() { return /* reexport safe */ _replace_first_formatter__WEBPACK_IMPORTED_MODULE_12__.replaceFirstFormatter; },
/* harmony export */   "sliceFormatter": function() { return /* reexport safe */ _slice_formatter__WEBPACK_IMPORTED_MODULE_13__.sliceFormatter; },
/* harmony export */   "stripFormatter": function() { return /* reexport safe */ _strip_formatter__WEBPACK_IMPORTED_MODULE_14__.stripFormatter; },
/* harmony export */   "stripHtmlFormatter": function() { return /* reexport safe */ _strip_html_formatter__WEBPACK_IMPORTED_MODULE_15__.stripHtmlFormatter; }
/* harmony export */ });
/* harmony import */ var _append_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./append.formatter */ "../../packages/core/src/formatters/string/append.formatter.ts");
/* harmony import */ var _downcase_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./downcase.formatter */ "../../packages/core/src/formatters/string/downcase.formatter.ts");
/* harmony import */ var _filled_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filled.formatter */ "../../packages/core/src/formatters/string/filled.formatter.ts");
/* harmony import */ var _handleize_formatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handleize.formatter */ "../../packages/core/src/formatters/string/handleize.formatter.ts");
/* harmony import */ var _match_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./match.formatter */ "../../packages/core/src/formatters/string/match.formatter.ts");
/* harmony import */ var _pad_start_formatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pad-start.formatter */ "../../packages/core/src/formatters/string/pad-start.formatter.ts");
/* harmony import */ var _pad_end_formatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pad-end.formatter */ "../../packages/core/src/formatters/string/pad-end.formatter.ts");
/* harmony import */ var _number_format_formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./number-format.formatter */ "../../packages/core/src/formatters/string/number-format.formatter.ts");
/* harmony import */ var _pluralize_formatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pluralize.formatter */ "../../packages/core/src/formatters/string/pluralize.formatter.ts");
/* harmony import */ var _prepend_formatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./prepend.formatter */ "../../packages/core/src/formatters/string/prepend.formatter.ts");
/* harmony import */ var _upcase_formatter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./upcase.formatter */ "../../packages/core/src/formatters/string/upcase.formatter.ts");
/* harmony import */ var _replace_formatter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./replace.formatter */ "../../packages/core/src/formatters/string/replace.formatter.ts");
/* harmony import */ var _replace_first_formatter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./replace-first.formatter */ "../../packages/core/src/formatters/string/replace-first.formatter.ts");
/* harmony import */ var _slice_formatter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./slice.formatter */ "../../packages/core/src/formatters/string/slice.formatter.ts");
/* harmony import */ var _strip_formatter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./strip.formatter */ "../../packages/core/src/formatters/string/strip.formatter.ts");
/* harmony import */ var _strip_html_formatter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./strip-html.formatter */ "../../packages/core/src/formatters/string/strip-html.formatter.ts");
// string formatters

















/***/ }),

/***/ "../../packages/core/src/formatters/string/match.formatter.ts":
/*!********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/match.formatter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "matchFormatter": function() { return /* binding */ matchFormatter; }
/* harmony export */ });
var matchFormatter = {
  name: "match",
  read: function read(a, regexp, flags) {
    if (!a || !regexp) {
      return false;
    }

    return a.match(new RegExp(regexp, flags));
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/number-format.formatter.ts":
/*!****************************************************************************!*\
  !*** ../../packages/core/src/formatters/string/number-format.formatter.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "numberFormatFormatter": function() { return /* binding */ numberFormatFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");
/* harmony import */ var _type_to_decimal_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type/to-decimal.formatter */ "../../packages/core/src/formatters/type/to-decimal.formatter.ts");
/* harmony import */ var _type_is_integer_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../type/is-integer.formatter */ "../../packages/core/src/formatters/type/is-integer.formatter.ts");


 // TODO set by current locale

var DEFAULT_DECIMAL_SEPARATOR = ".";
var DEFAULT_THOUSAND_SEPARATOR = "'";
var DEFAULT_PRECISION = 2;
/**
 * Returns a formatted version of the target as string.
 * The number will always be rounded after the DIN 1333 (1.55 => 1.6 and -1.55 => -1.6)
 */

var numberFormatFormatter = {
  name: "numberFormat",

  /**
   * Returns a formatted version of the target as string.
   * The number will always be rounded after the DIN 1333 (1.55 => 1.6 and -1.55 => -1.6)
   * @param target
   * @param precision (default: 2)
   * @param decimalSeparator (default: ".")
   * @param thousandSeparator (default: "'")
   */
  read: function read(target) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PRECISION;
    var decimalSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_DECIMAL_SEPARATOR;
    var thousandSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THOUSAND_SEPARATOR;

    if (!_type_to_decimal_formatter__WEBPACK_IMPORTED_MODULE_1__.toDecimalFormatter.read) {
      throw new Error("toDecimalFormatter must have a read function");
    }

    if (!_type_is_integer_formatter__WEBPACK_IMPORTED_MODULE_2__.isIntegerFormatter.read) {
      throw new Error("isIntegerFormatter must have a read function");
    }

    target = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isNumber)(target) ? target : _type_to_decimal_formatter__WEBPACK_IMPORTED_MODULE_1__.toDecimalFormatter.read(target);

    if (!_type_is_integer_formatter__WEBPACK_IMPORTED_MODULE_2__.isIntegerFormatter.read(precision)) {
      precision = DEFAULT_PRECISION;
    }
    /*
     * Thanks to user2823670
     * http://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding
     */


    var retStr = (+(Math.round(+(Math.abs(target) + "e" + precision)) + "e" + -precision)).toFixed(precision);
    if (target < 0) retStr = "-" + retStr;
    /**
     * Thanks to Elias Zamaria
     * http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
     */

    var ret = retStr.split(".");

    if (ret.length == 2) {
      return ret[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) + decimalSeparator + ret[1];
    }

    return ret[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/pad-end.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/pad-end.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "padEndFormatter": function() { return /* binding */ padEndFormatter; }
/* harmony export */ });
/**
 * The padEnd formatters pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the end of the current string.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
 */
var padEndFormatter = {
  name: "padEnd",

  /**
   *
   * The padEnd formatters pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length.
   * The padding is applied from the end of the current string.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
   *
   * @param target
   * @param length The length of the resulting string once the current `str` has been padded. If the value is lower than `str.length`, the current string will be returned as-is.
   * @param padString The string to pad the current `str` with. If `padString` is too long to stay within `targetLength`, it will be truncated: for left-to-right languages the left-most part and for right-to-left languages the right-most will be applied. The default value for this parameter is " " (`U+0020`).
   */
  read: function read(target) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var padString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";
    return target.padEnd(length, padString);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/pad-start.formatter.ts":
/*!************************************************************************!*\
  !*** ../../packages/core/src/formatters/string/pad-start.formatter.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "padStartFormatter": function() { return /* binding */ padStartFormatter; }
/* harmony export */ });
/**
 * The padStart formatter pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length.
 * The padding is applied from the start of the current string.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
 */
var padStartFormatter = {
  name: "padStart",

  /**
   * The padStart formatter pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length.
   * The padding is applied from the start of the current string.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
   * @param target
   * @param length The length of the resulting string once the current `str` has been padded. If the value is less than `str.length`, then `str` is returned as-is.
   * @param padString The string to pad the current `str` with. If `padString` is too long to stay within the `targetLength`, it will be truncated from the end. The default value is `" "` (`U+0020 'SPACE'`).
   */
  read: function read(target) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var padString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";
    return target.padStart(length, padString);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/pluralize.formatter.ts":
/*!************************************************************************!*\
  !*** ../../packages/core/src/formatters/string/pluralize.formatter.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pluralizeFormatter": function() { return /* binding */ pluralizeFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

var pluralizeFormatter = {
  name: "pluralize",
  read: function read(input, singular, plural) {
    if (plural === null) {
      plural = singular + "s";
    }

    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isArray)(input)) {
      input = input.length;
    }

    if (input === 1) {
      return singular;
    } else {
      return plural;
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/prepend.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/prepend.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prependFormatter": function() { return /* binding */ prependFormatter; }
/* harmony export */ });
/**
 * Prepends characters to a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#prepend
 */
var prependFormatter = {
  name: "prepend",
  read: function read(a, b) {
    return b + a;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/replace-first.formatter.ts":
/*!****************************************************************************!*\
  !*** ../../packages/core/src/formatters/string/replace-first.formatter.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "replaceFirstFormatter": function() { return /* binding */ replaceFirstFormatter; }
/* harmony export */ });
/* tslint:disable:variable-name */

/**
 * Replaces the first occurrence of a string with a substring.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#replace_first
 */
var replaceFirstFormatter = {
  name: "replaceFirst",
  read: function read(str, value, replaceValue) {
    return str.replace(value, replaceValue);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/replace.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/replace.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "replaceFormatter": function() { return /* binding */ replaceFormatter; }
/* harmony export */ });
/**
 * Replaces all occurrences of a string with a substring.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#replace
 */
var replaceFormatter = {
  name: "replace",
  read: function read(str, value, replaceValue) {
    return str.replace(new RegExp(value, "g"), replaceValue);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/slice.formatter.ts":
/*!********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/slice.formatter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sliceFormatter": function() { return /* binding */ sliceFormatter; }
/* harmony export */ });
/**
 * The `slice` formatter returns a substring, starting at the specified index.
 * An optional second parameter can be passed to specify the length of the substring.
 * If no second parameter is given, a substring of one character will be returned.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#slice
 */
var sliceFormatter = {
  name: "slice",
  read: function read(value, start, end) {
    return value.slice(start, end);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/strip-html.formatter.ts":
/*!*************************************************************************!*\
  !*** ../../packages/core/src/formatters/string/strip-html.formatter.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stripHtmlFormatter": function() { return /* binding */ stripHtmlFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Strips all HTML tags from a string.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#strip_html
 */

var stripHtmlFormatter = {
  name: "stripHtml",
  read: function read(html) {
    return (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.stripHtml)(html);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/strip.formatter.ts":
/*!********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/strip.formatter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stripFormatter": function() { return /* binding */ stripFormatter; }
/* harmony export */ });
/**
 * Strips tabs, spaces, and newlines (all whitespace) from the left and right side of a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#strip
 */
var stripFormatter = {
  name: "strip",
  read: function read(str) {
    return str.trim();
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/string/upcase.formatter.ts":
/*!*********************************************************************!*\
  !*** ../../packages/core/src/formatters/string/upcase.formatter.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "upcaseFormatter": function() { return /* binding */ upcaseFormatter; }
/* harmony export */ });
/**
 * Converts a string into uppercase.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#upcase
 */
var upcaseFormatter = {
  name: "upcase",
  read: function read(str) {
    return str.toUpperCase();
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/boolean.formatter.ts":
/*!********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/boolean.formatter.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "booleanFormatter": function() { return /* binding */ booleanFormatter; }
/* harmony export */ });
/**
 * Converts a variable to boolean
 */
var booleanFormatter = {
  name: "boolean",
  read: function read(value) {
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else {
      return !!value;
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/index.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/formatters/type/index.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "booleanFormatter": function() { return /* reexport safe */ _boolean_formatter__WEBPACK_IMPORTED_MODULE_0__.booleanFormatter; },
/* harmony export */   "isArrayFormatter": function() { return /* reexport safe */ _is_array_formatter__WEBPACK_IMPORTED_MODULE_1__.isArrayFormatter; },
/* harmony export */   "isBooleanFormatter": function() { return /* reexport safe */ _is_boolean_formatter__WEBPACK_IMPORTED_MODULE_2__.isBooleanFormatter; },
/* harmony export */   "isDefinedFormatter": function() { return /* reexport safe */ _is_defined_formatter__WEBPACK_IMPORTED_MODULE_3__.isDefinedFormatter; },
/* harmony export */   "isIntegerFormatter": function() { return /* reexport safe */ _is_integer_formatter__WEBPACK_IMPORTED_MODULE_4__.isIntegerFormatter; },
/* harmony export */   "isNumberFormatter": function() { return /* reexport safe */ _is_number_formatter__WEBPACK_IMPORTED_MODULE_5__.isNumberFormatter; },
/* harmony export */   "isObjectFormatter": function() { return /* reexport safe */ _is_object_formatter__WEBPACK_IMPORTED_MODULE_6__.isObjectFormatter; },
/* harmony export */   "isStringFormatter": function() { return /* reexport safe */ _is_string_formatter__WEBPACK_IMPORTED_MODULE_7__.isStringFormatter; },
/* harmony export */   "isUndefinedFormatter": function() { return /* reexport safe */ _is_undefined_formatter__WEBPACK_IMPORTED_MODULE_8__.isUndefinedFormatter; },
/* harmony export */   "jsonFormatter": function() { return /* reexport safe */ _json_formatter__WEBPACK_IMPORTED_MODULE_9__.jsonFormatter; },
/* harmony export */   "parseFormatter": function() { return /* reexport safe */ _parse_formatter__WEBPACK_IMPORTED_MODULE_10__.parseFormatter; },
/* harmony export */   "stringFormatter": function() { return /* reexport safe */ _string_formatter__WEBPACK_IMPORTED_MODULE_11__.stringFormatter; },
/* harmony export */   "toStringFormatter": function() { return /* reexport safe */ _to_string_formatter__WEBPACK_IMPORTED_MODULE_12__.toStringFormatter; },
/* harmony export */   "toDecimalFormatter": function() { return /* reexport safe */ _to_decimal_formatter__WEBPACK_IMPORTED_MODULE_13__.toDecimalFormatter; },
/* harmony export */   "toFloatFormatter": function() { return /* reexport safe */ _to_float_formatter__WEBPACK_IMPORTED_MODULE_14__.toFloatFormatter; },
/* harmony export */   "toIntegerFormatter": function() { return /* reexport safe */ _to_integer_formatter__WEBPACK_IMPORTED_MODULE_15__.toIntegerFormatter; },
/* harmony export */   "toNumberFormatter": function() { return /* reexport safe */ _type_to_number_formatter__WEBPACK_IMPORTED_MODULE_16__.toNumberFormatter; }
/* harmony export */ });
/* harmony import */ var _boolean_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boolean.formatter */ "../../packages/core/src/formatters/type/boolean.formatter.ts");
/* harmony import */ var _is_array_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-array.formatter */ "../../packages/core/src/formatters/type/is-array.formatter.ts");
/* harmony import */ var _is_boolean_formatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-boolean.formatter */ "../../packages/core/src/formatters/type/is-boolean.formatter.ts");
/* harmony import */ var _is_defined_formatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./is-defined.formatter */ "../../packages/core/src/formatters/type/is-defined.formatter.ts");
/* harmony import */ var _is_integer_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./is-integer.formatter */ "../../packages/core/src/formatters/type/is-integer.formatter.ts");
/* harmony import */ var _is_number_formatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./is-number.formatter */ "../../packages/core/src/formatters/type/is-number.formatter.ts");
/* harmony import */ var _is_object_formatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./is-object.formatter */ "../../packages/core/src/formatters/type/is-object.formatter.ts");
/* harmony import */ var _is_string_formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./is-string.formatter */ "../../packages/core/src/formatters/type/is-string.formatter.ts");
/* harmony import */ var _is_undefined_formatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./is-undefined.formatter */ "../../packages/core/src/formatters/type/is-undefined.formatter.ts");
/* harmony import */ var _json_formatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./json.formatter */ "../../packages/core/src/formatters/type/json.formatter.ts");
/* harmony import */ var _parse_formatter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./parse.formatter */ "../../packages/core/src/formatters/type/parse.formatter.ts");
/* harmony import */ var _string_formatter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./string.formatter */ "../../packages/core/src/formatters/type/string.formatter.ts");
/* harmony import */ var _to_string_formatter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./to-string.formatter */ "../../packages/core/src/formatters/type/to-string.formatter.ts");
/* harmony import */ var _to_decimal_formatter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./to-decimal.formatter */ "../../packages/core/src/formatters/type/to-decimal.formatter.ts");
/* harmony import */ var _to_float_formatter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./to-float.formatter */ "../../packages/core/src/formatters/type/to-float.formatter.ts");
/* harmony import */ var _to_integer_formatter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./to-integer.formatter */ "../../packages/core/src/formatters/type/to-integer.formatter.ts");
/* harmony import */ var _type_to_number_formatter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../type/to-number.formatter */ "../../packages/core/src/formatters/type/to-number.formatter.ts");
// property / object formatters


















/***/ }),

/***/ "../../packages/core/src/formatters/type/is-array.formatter.ts":
/*!*********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/is-array.formatter.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArrayFormatter": function() { return /* binding */ isArrayFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Checks if value is an array
 */

var isArrayFormatter = {
  name: "isArray",
  read: _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isArray
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/is-boolean.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/is-boolean.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isBooleanFormatter": function() { return /* binding */ isBooleanFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Checks if value is an boolean
 */

var isBooleanFormatter = {
  name: "isBoolean",
  read: _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isBoolean
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/is-defined.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/is-defined.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDefinedFormatter": function() { return /* binding */ isDefinedFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Checks if value is defined
 */

var isDefinedFormatter = {
  name: "isDefined",
  read: _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isDefined
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/is-integer.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/is-integer.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isIntegerFormatter": function() { return /* binding */ isIntegerFormatter; }
/* harmony export */ });
/**
 * Checks if value is a number
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js#L82
 */
var isIntegerFormatter = {
  name: "isInteger",
  read: function read(n) {
    /**
     * Thanks a lot to Dagg Nabbit
     * http://stackoverflow.com/questions/3885817/how-to-check-if-a-number-is-float-or-integer
     */
    return n === +n && n === (n | 0);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/is-number.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/is-number.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNumberFormatter": function() { return /* binding */ isNumberFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Checks if value is a number
 */

var isNumberFormatter = {
  name: "isNumber",
  read: _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isNumber
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/is-object.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/is-object.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isObjectFormatter": function() { return /* binding */ isObjectFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Checks if value is a object
 */

var isObjectFormatter = {
  name: "isObject",
  read: _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isObject
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/is-string.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/is-string.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isStringFormatter": function() { return /* binding */ isStringFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Check if value is a string
 */

var isStringFormatter = {
  name: "isString",
  read: function read(str) {
    return (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isString)(str);
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/is-undefined.formatter.ts":
/*!*************************************************************************!*\
  !*** ../../packages/core/src/formatters/type/is-undefined.formatter.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isUndefinedFormatter": function() { return /* binding */ isUndefinedFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Check if value is undefined
 */

var isUndefinedFormatter = {
  name: "isUndefined",
  read: _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isUndefined
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/json.formatter.ts":
/*!*****************************************************************!*\
  !*** ../../packages/core/src/formatters/type/json.formatter.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jsonFormatter": function() { return /* binding */ jsonFormatter; }
/* harmony export */ });
/**
 * Converts a string into a JSON string.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#json
 */
var jsonFormatter = {
  name: "json",
  read: function read(object) {
    var space = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var replaceSingleQuate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var result = JSON.stringify(object, null, space);

    if (replaceSingleQuate && result) {
      return result.replace(/'/g, "&#39;");
    }

    return result;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/parse.formatter.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/formatters/type/parse.formatter.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseFormatter": function() { return /* binding */ parseFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * parse json string to object
 * @example <div rv-add-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */

var parseFormatter = {
  name: "parse",
  read: function read(jsonString) {
    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isString)(jsonString)) {
      return (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.parseJsonString)(jsonString);
    } else if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isObject)(jsonString) || Array.isArray(jsonString)) {
      console.warn("[parseFormatter] You do not need to parse the value because since it already been parsed");
      return jsonString;
    }

    return null;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/string.formatter.ts":
/*!*******************************************************************!*\
  !*** ../../packages/core/src/formatters/type/string.formatter.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stringFormatter": function() { return /* binding */ stringFormatter; }
/* harmony export */ });
/* harmony import */ var _to_string_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-string.formatter */ "../../packages/core/src/formatters/type/to-string.formatter.ts");

var stringFormatter = {
  name: "string",
  read: function read(value, def) {
    if (!_to_string_formatter__WEBPACK_IMPORTED_MODULE_0__.toStringFormatter || _to_string_formatter__WEBPACK_IMPORTED_MODULE_0__.toStringFormatter.read) {
      throw new Error("toStringFormatter.read not defined!");
    } else {
      console.warn("The string formatter is depricated, please use toString instead!");
      return _to_string_formatter__WEBPACK_IMPORTED_MODULE_0__.toStringFormatter.read(value, def);
    }
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/to-decimal.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/to-decimal.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toDecimalFormatter": function() { return /* binding */ toDecimalFormatter; }
/* harmony export */ });
/* harmony import */ var _to_integer_formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./to-integer.formatter */ "../../packages/core/src/formatters/type/to-integer.formatter.ts");
/* harmony import */ var _to_float_formatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-float.formatter */ "../../packages/core/src/formatters/type/to-float.formatter.ts");


var toDecimalFormatter = {
  name: "toDecimal",
  read: function read(target) {
    if (!_to_integer_formatter__WEBPACK_IMPORTED_MODULE_0__.toIntegerFormatter.read) {
      throw new Error("toIntegerFormatter must have a read function");
    }

    if (!_to_float_formatter__WEBPACK_IMPORTED_MODULE_1__.toFloatFormatter.read) {
      throw new Error("toFloatFormatter must have a read function");
    }

    var retI = _to_integer_formatter__WEBPACK_IMPORTED_MODULE_0__.toIntegerFormatter.read(target * 1);
    var retF = _to_float_formatter__WEBPACK_IMPORTED_MODULE_1__.toFloatFormatter.read(target);
    return retI == retF ? retI : retF;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/to-float.formatter.ts":
/*!*********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/to-float.formatter.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toFloatFormatter": function() { return /* binding */ toFloatFormatter; }
/* harmony export */ });
/**
 * Returns the float representation of the given target
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js#L133
 */
var toFloatFormatter = {
  name: "toFloat",

  /**
   * Returns the integer representation of the given target.
   * @param target
   */
  read: function read(target) {
    var ret = parseFloat(target * 1.0);
    return isNaN(ret) ? 0.0 : ret;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/to-integer.formatter.ts":
/*!***********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/to-integer.formatter.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toIntegerFormatter": function() { return /* binding */ toIntegerFormatter; }
/* harmony export */ });
/**
 * Returns the integer representation of the given target.
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js#L128
 */
var toIntegerFormatter = {
  name: "toInteger",

  /**
   * Returns the integer representation of the given target.
   * @param target
   */
  read: function read(target) {
    var ret = parseInt(target * 1, 10);
    return isNaN(ret) ? 0 : ret;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/to-number.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/to-number.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toNumberFormatter": function() { return /* binding */ toNumberFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Parse a string to number / float
 * @see http://stackoverflow.com/a/1100653/1465919
 */

var toNumberFormatter = {
  name: "toNumber",
  read: function read(str, def) {
    var num = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.getNumber)(str); // If default value is set return the default value if num is 0, null or undefined

    if (def) {
      return num ? num : def;
    }

    return num;
  }
};

/***/ }),

/***/ "../../packages/core/src/formatters/type/to-string.formatter.ts":
/*!**********************************************************************!*\
  !*** ../../packages/core/src/formatters/type/to-string.formatter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toStringFormatter": function() { return /* binding */ toStringFormatter; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * Parses a value to string
 * @param value The value you want to parse to string
 * @param def Default value if value is undefined
 */

var toStringFormatter = {
  name: "toString",
  read: function read(value, def) {
    // If value is an array convert each value in array to string
    if (Array.isArray(value)) {
      for (var i in value) {
        if (value[i]) {
          value[i] = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.getString)(value[i]);
        }
      }
    } else if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.isObject)(value)) {
      for (var key in value) {
        value[key] = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.getString)(value[key]);
      }
    } else {
      value = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.getString)(value);
    } // If default value is set return the default value if num is 0, null or undefined


    if (def) {
      return value ? value : def;
    }

    return value;
  }
};

/***/ }),

/***/ "../../packages/core/src/index.ts":
/*!****************************************!*\
  !*** ../../packages/core/src/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindersService": function() { return /* reexport safe */ _services__WEBPACK_IMPORTED_MODULE_2__.BindersService; },
/* harmony export */   "ComponentService": function() { return /* reexport safe */ _services__WEBPACK_IMPORTED_MODULE_2__.ComponentService; },
/* harmony export */   "FormatterService": function() { return /* reexport safe */ _services__WEBPACK_IMPORTED_MODULE_2__.FormatterService; },
/* harmony export */   "HttpService": function() { return /* reexport safe */ _services__WEBPACK_IMPORTED_MODULE_2__.HttpService; },
/* harmony export */   "Utils": function() { return /* reexport safe */ _services__WEBPACK_IMPORTED_MODULE_2__.Utils; },
/* harmony export */   "getDataset": function() { return /* reexport safe */ _services__WEBPACK_IMPORTED_MODULE_2__.getDataset; },
/* harmony export */   "parseAttribute": function() { return /* reexport safe */ _services__WEBPACK_IMPORTED_MODULE_2__.parseAttribute; },
/* harmony export */   "dotAdapter": function() { return /* reexport safe */ _adapters__WEBPACK_IMPORTED_MODULE_3__.dotAdapter; },
/* harmony export */   "addClassBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.addClassBinder; },
/* harmony export */   "animateStarBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.animateStarBinder; },
/* harmony export */   "assignBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.assignBinder; },
/* harmony export */   "assignPropertyBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.assignPropertyBinder; },
/* harmony export */   "attributeBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.attributeBinder; },
/* harmony export */   "blockBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.blockBinder; },
/* harmony export */   "checkedBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.checkedBinder; },
/* harmony export */   "classStarBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.classStarBinder; },
/* harmony export */   "componentAttributeBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.componentAttributeBinder; },
/* harmony export */   "cssStarBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.cssStarBinder; },
/* harmony export */   "disabledBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.disabledBinder; },
/* harmony export */   "eachStarBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.eachStarBinder; },
/* harmony export */   "enabledBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.enabledBinder; },
/* harmony export */   "flexSortChildsBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.flexSortChildsBinder; },
/* harmony export */   "hideBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.hideBinder; },
/* harmony export */   "htmlBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.htmlBinder; },
/* harmony export */   "ifBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.ifBinder; },
/* harmony export */   "maxlengthBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.maxlengthBinder; },
/* harmony export */   "onEventBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.onEventBinder; },
/* harmony export */   "parentBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.parentBinder; },
/* harmony export */   "readonlyBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.readonlyBinder; },
/* harmony export */   "removeClassBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.removeClassBinder; },
/* harmony export */   "showBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.showBinder; },
/* harmony export */   "srcsetSizeBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.srcsetSizeBinder; },
/* harmony export */   "templateBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.templateBinder; },
/* harmony export */   "textBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.textBinder; },
/* harmony export */   "toggleOnEventBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.toggleOnEventBinder; },
/* harmony export */   "unlessBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.unlessBinder; },
/* harmony export */   "valueBinder": function() { return /* reexport safe */ _binders__WEBPACK_IMPORTED_MODULE_4__.valueBinder; },
/* harmony export */   "BasicComponent": function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_5__.BasicComponent; },
/* harmony export */   "Component": function() { return /* reexport safe */ _component__WEBPACK_IMPORTED_MODULE_5__.Component; },
/* harmony export */   "VideoComponent": function() { return /* reexport safe */ _components__WEBPACK_IMPORTED_MODULE_6__.VideoComponent; },
/* harmony export */   "MapFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.MapFormatter; },
/* harmony export */   "andFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.andFormatter; },
/* harmony export */   "appendFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.appendFormatter; },
/* harmony export */   "argsFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.argsFormatter; },
/* harmony export */   "betweenFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.betweenFormatter; },
/* harmony export */   "booleanFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.booleanFormatter; },
/* harmony export */   "callFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.callFormatter; },
/* harmony export */   "containsFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.containsFormatter; },
/* harmony export */   "debugFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.debugFormatter; },
/* harmony export */   "defaultFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.defaultFormatter; },
/* harmony export */   "digitsFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.digitsFormatter; },
/* harmony export */   "dividedByFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.dividedByFormatter; },
/* harmony export */   "downcaseFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.downcaseFormatter; },
/* harmony export */   "egtFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.egtFormatter; },
/* harmony export */   "eltFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.eltFormatter; },
/* harmony export */   "emptyFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.emptyFormatter; },
/* harmony export */   "eqFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.eqFormatter; },
/* harmony export */   "evenFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.evenFormatter; },
/* harmony export */   "filledFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.filledFormatter; },
/* harmony export */   "firstFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.firstFormatter; },
/* harmony export */   "gcdFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.gcdFormatter; },
/* harmony export */   "getFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.getFormatter; },
/* harmony export */   "gtFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.gtFormatter; },
/* harmony export */   "handleizeFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.handleizeFormatter; },
/* harmony export */   "isArrayFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isArrayFormatter; },
/* harmony export */   "isBooleanFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isBooleanFormatter; },
/* harmony export */   "isDefinedFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isDefinedFormatter; },
/* harmony export */   "isIntegerFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isIntegerFormatter; },
/* harmony export */   "isLastFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isLastFormatter; },
/* harmony export */   "isNumberFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isNumberFormatter; },
/* harmony export */   "isObjectFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isObjectFormatter; },
/* harmony export */   "isStringFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isStringFormatter; },
/* harmony export */   "isUndefinedFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.isUndefinedFormatter; },
/* harmony export */   "jsonFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.jsonFormatter; },
/* harmony export */   "lastFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.lastFormatter; },
/* harmony export */   "ltFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.ltFormatter; },
/* harmony export */   "matchFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.matchFormatter; },
/* harmony export */   "minusFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.minusFormatter; },
/* harmony export */   "moduloFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.moduloFormatter; },
/* harmony export */   "neFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.neFormatter; },
/* harmony export */   "notFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.notFormatter; },
/* harmony export */   "numberFormatFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.numberFormatFormatter; },
/* harmony export */   "orFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.orFormatter; },
/* harmony export */   "padEndFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.padEndFormatter; },
/* harmony export */   "padStartFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.padStartFormatter; },
/* harmony export */   "parseFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.parseFormatter; },
/* harmony export */   "pluralizeFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.pluralizeFormatter; },
/* harmony export */   "plusFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.plusFormatter; },
/* harmony export */   "prependFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.prependFormatter; },
/* harmony export */   "randomFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.randomFormatter; },
/* harmony export */   "rangeFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.rangeFormatter; },
/* harmony export */   "replaceFirstFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.replaceFirstFormatter; },
/* harmony export */   "replaceFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.replaceFormatter; },
/* harmony export */   "setFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.setFormatter; },
/* harmony export */   "sizeFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.sizeFormatter; },
/* harmony export */   "sliceFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.sliceFormatter; },
/* harmony export */   "stringFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.stringFormatter; },
/* harmony export */   "stripFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.stripFormatter; },
/* harmony export */   "stripHtmlFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.stripHtmlFormatter; },
/* harmony export */   "timesFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.timesFormatter; },
/* harmony export */   "toDecimalFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.toDecimalFormatter; },
/* harmony export */   "toFloatFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.toFloatFormatter; },
/* harmony export */   "toIntegerFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.toIntegerFormatter; },
/* harmony export */   "toNumberFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.toNumberFormatter; },
/* harmony export */   "toStringFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.toStringFormatter; },
/* harmony export */   "unevenFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.unevenFormatter; },
/* harmony export */   "upcaseFormatter": function() { return /* reexport safe */ _formatters__WEBPACK_IMPORTED_MODULE_7__.upcaseFormatter; },
/* harmony export */   "Binding": function() { return /* reexport safe */ _binding__WEBPACK_IMPORTED_MODULE_8__.Binding; },
/* harmony export */   "BINDING": function() { return /* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_9__.BINDING; },
/* harmony export */   "KEYPATH": function() { return /* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_9__.KEYPATH; },
/* harmony export */   "PRIMITIVE": function() { return /* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_9__.PRIMITIVE; },
/* harmony export */   "TEXT": function() { return /* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_9__.TEXT; },
/* harmony export */   "parseDeclaration": function() { return /* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_9__.parseDeclaration; },
/* harmony export */   "parseNode": function() { return /* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_9__.parseNode; },
/* harmony export */   "parseTemplate": function() { return /* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_9__.parseTemplate; },
/* harmony export */   "parseType": function() { return /* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_9__.parseType; },
/* harmony export */   "Riba": function() { return /* reexport safe */ _riba__WEBPACK_IMPORTED_MODULE_10__.Riba; },
/* harmony export */   "View": function() { return /* reexport safe */ _view__WEBPACK_IMPORTED_MODULE_11__.View; },
/* harmony export */   "coreModule": function() { return /* reexport safe */ _core_module__WEBPACK_IMPORTED_MODULE_12__.coreModule; }
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ "../../packages/core/src/interfaces/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _interfaces__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _interfaces__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _vendors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendors */ "../../packages/core/src/vendors/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "../../packages/core/src/services/index.ts");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adapters */ "../../packages/core/src/adapters/index.ts");
/* harmony import */ var _binders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./binders */ "../../packages/core/src/binders/index.ts");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component */ "../../packages/core/src/component/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components */ "../../packages/core/src/components/index.ts");
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./formatters */ "../../packages/core/src/formatters/index.ts");
/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./binding */ "../../packages/core/src/binding.ts");
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./parsers */ "../../packages/core/src/parsers.ts");
/* harmony import */ var _riba__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./riba */ "../../packages/core/src/riba.ts");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./view */ "../../packages/core/src/view.ts");
/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core.module */ "../../packages/core/src/core.module.ts");
/* harmony import */ var _ribajs_events_src__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ribajs/events/src */ "../../packages/events/src/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ribajs_events_src__WEBPACK_IMPORTED_MODULE_13__) if(["default","Adapter","BindersService","ComponentService","FormatterService","HttpService","Utils","getDataset","parseAttribute","dotAdapter","addClassBinder","animateStarBinder","assignBinder","assignPropertyBinder","attributeBinder","blockBinder","checkedBinder","classStarBinder","componentAttributeBinder","cssStarBinder","disabledBinder","eachStarBinder","enabledBinder","flexSortChildsBinder","hideBinder","htmlBinder","ifBinder","maxlengthBinder","onEventBinder","parentBinder","readonlyBinder","removeClassBinder","showBinder","srcsetSizeBinder","templateBinder","textBinder","toggleOnEventBinder","unlessBinder","valueBinder","BasicComponent","Component","VideoComponent","MapFormatter","andFormatter","appendFormatter","argsFormatter","betweenFormatter","booleanFormatter","callFormatter","containsFormatter","debugFormatter","defaultFormatter","digitsFormatter","dividedByFormatter","downcaseFormatter","egtFormatter","eltFormatter","emptyFormatter","eqFormatter","evenFormatter","filledFormatter","firstFormatter","gcdFormatter","getFormatter","gtFormatter","handleizeFormatter","isArrayFormatter","isBooleanFormatter","isDefinedFormatter","isIntegerFormatter","isLastFormatter","isNumberFormatter","isObjectFormatter","isStringFormatter","isUndefinedFormatter","jsonFormatter","lastFormatter","ltFormatter","matchFormatter","minusFormatter","moduloFormatter","neFormatter","notFormatter","numberFormatFormatter","orFormatter","padEndFormatter","padStartFormatter","parseFormatter","pluralizeFormatter","plusFormatter","prependFormatter","randomFormatter","rangeFormatter","replaceFirstFormatter","replaceFormatter","setFormatter","sizeFormatter","sliceFormatter","stringFormatter","stripFormatter","stripHtmlFormatter","timesFormatter","toDecimalFormatter","toFloatFormatter","toIntegerFormatter","toNumberFormatter","toStringFormatter","unevenFormatter","upcaseFormatter","Binding","BINDING","KEYPATH","PRIMITIVE","TEXT","parseDeclaration","parseNode","parseTemplate","parseType","Riba","View","coreModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _ribajs_events_src__WEBPACK_IMPORTED_MODULE_13__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);












 // TODO remove?



/***/ }),

/***/ "../../packages/core/src/interfaces/adapter.ts":
/*!*****************************************************!*\
  !*** ../../packages/core/src/interfaces/adapter.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Adapter": function() { return /* binding */ Adapter; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);



/**
 * The default `.` adapter that comes with riba.js. Allows subscribing to
 * properties on plain objects, implemented in ES5 natives using
 * `Object.defineProperty`.
 */

/**
 * TODO For what is this?
 */
var Adapter = function Adapter() {
  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Adapter);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "name", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "counter", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "weakmap", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "weakReference", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "cleanupWeakReference", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "stubFunction", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "observeMutations", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "unobserveMutations", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "observe", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "unobserve", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "get", void 0);

  _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(this, "set", void 0);
};

/***/ }),

/***/ "../../packages/core/src/interfaces/adapters.ts":
/*!******************************************************!*\
  !*** ../../packages/core/src/interfaces/adapters.ts ***!
  \******************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/binder-wrapper.ts":
/*!************************************************************!*\
  !*** ../../packages/core/src/interfaces/binder-wrapper.ts ***!
  \************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/binder.ts":
/*!****************************************************!*\
  !*** ../../packages/core/src/interfaces/binder.ts ***!
  \****************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/binders.ts":
/*!*****************************************************!*\
  !*** ../../packages/core/src/interfaces/binders.ts ***!
  \*****************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/binding.ts":
/*!*****************************************************!*\
  !*** ../../packages/core/src/interfaces/binding.ts ***!
  \*****************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/components.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/interfaces/components.ts ***!
  \********************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/event-handler.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/interfaces/event-handler.ts ***!
  \***********************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/extensions.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/interfaces/extensions.ts ***!
  \********************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/formatter.ts":
/*!*******************************************************!*\
  !*** ../../packages/core/src/interfaces/formatter.ts ***!
  \*******************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/formatters.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/interfaces/formatters.ts ***!
  \********************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/http-data-type.ts":
/*!************************************************************!*\
  !*** ../../packages/core/src/interfaces/http-data-type.ts ***!
  \************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/http-method.ts":
/*!*********************************************************!*\
  !*** ../../packages/core/src/interfaces/http-method.ts ***!
  \*********************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/http-service-options.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/interfaces/http-service-options.ts ***!
  \******************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/index.ts":
/*!***************************************************!*\
  !*** ../../packages/core/src/interfaces/index.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Adapter": function() { return /* reexport safe */ _adapter__WEBPACK_IMPORTED_MODULE_0__.Adapter; }
/* harmony export */ });
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapter */ "../../packages/core/src/interfaces/adapter.ts");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adapters */ "../../packages/core/src/interfaces/adapters.ts");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_adapters__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _adapters__WEBPACK_IMPORTED_MODULE_1__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _adapters__WEBPACK_IMPORTED_MODULE_1__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _binder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./binder */ "../../packages/core/src/interfaces/binder.ts");
/* harmony import */ var _binder__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_binder__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _binder__WEBPACK_IMPORTED_MODULE_2__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _binder__WEBPACK_IMPORTED_MODULE_2__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _binder_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./binder-wrapper */ "../../packages/core/src/interfaces/binder-wrapper.ts");
/* harmony import */ var _binder_wrapper__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_binder_wrapper__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _binder_wrapper__WEBPACK_IMPORTED_MODULE_3__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _binder_wrapper__WEBPACK_IMPORTED_MODULE_3__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _binders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./binders */ "../../packages/core/src/interfaces/binders.ts");
/* harmony import */ var _binders__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_binders__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _binders__WEBPACK_IMPORTED_MODULE_4__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _binders__WEBPACK_IMPORTED_MODULE_4__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./binding */ "../../packages/core/src/interfaces/binding.ts");
/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_binding__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _binding__WEBPACK_IMPORTED_MODULE_5__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _binding__WEBPACK_IMPORTED_MODULE_5__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components */ "../../packages/core/src/interfaces/components.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _components__WEBPACK_IMPORTED_MODULE_6__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _components__WEBPACK_IMPORTED_MODULE_6__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _event_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./event-handler */ "../../packages/core/src/interfaces/event-handler.ts");
/* harmony import */ var _event_handler__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_event_handler__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _event_handler__WEBPACK_IMPORTED_MODULE_7__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _event_handler__WEBPACK_IMPORTED_MODULE_7__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _extensions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./extensions */ "../../packages/core/src/interfaces/extensions.ts");
/* harmony import */ var _extensions__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_extensions__WEBPACK_IMPORTED_MODULE_8__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _extensions__WEBPACK_IMPORTED_MODULE_8__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _extensions__WEBPACK_IMPORTED_MODULE_8__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./formatter */ "../../packages/core/src/interfaces/formatter.ts");
/* harmony import */ var _formatter__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_formatter__WEBPACK_IMPORTED_MODULE_9__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _formatter__WEBPACK_IMPORTED_MODULE_9__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _formatter__WEBPACK_IMPORTED_MODULE_9__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./formatters */ "../../packages/core/src/interfaces/formatters.ts");
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_formatters__WEBPACK_IMPORTED_MODULE_10__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _formatters__WEBPACK_IMPORTED_MODULE_10__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _formatters__WEBPACK_IMPORTED_MODULE_10__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _http_data_type__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./http-data-type */ "../../packages/core/src/interfaces/http-data-type.ts");
/* harmony import */ var _http_data_type__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_http_data_type__WEBPACK_IMPORTED_MODULE_11__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _http_data_type__WEBPACK_IMPORTED_MODULE_11__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _http_data_type__WEBPACK_IMPORTED_MODULE_11__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _http_method__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./http-method */ "../../packages/core/src/interfaces/http-method.ts");
/* harmony import */ var _http_method__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_http_method__WEBPACK_IMPORTED_MODULE_12__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _http_method__WEBPACK_IMPORTED_MODULE_12__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _http_method__WEBPACK_IMPORTED_MODULE_12__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _http_service_options__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./http-service-options */ "../../packages/core/src/interfaces/http-service-options.ts");
/* harmony import */ var _http_service_options__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_http_service_options__WEBPACK_IMPORTED_MODULE_13__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _http_service_options__WEBPACK_IMPORTED_MODULE_13__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _http_service_options__WEBPACK_IMPORTED_MODULE_13__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _module_element_type__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./module-element-type */ "../../packages/core/src/interfaces/module-element-type.ts");
/* harmony import */ var _module_element_type__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_module_element_type__WEBPACK_IMPORTED_MODULE_14__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _module_element_type__WEBPACK_IMPORTED_MODULE_14__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _module_element_type__WEBPACK_IMPORTED_MODULE_14__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./module */ "../../packages/core/src/interfaces/module.ts");
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_module__WEBPACK_IMPORTED_MODULE_15__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _module__WEBPACK_IMPORTED_MODULE_15__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _module__WEBPACK_IMPORTED_MODULE_15__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _observed_attribute_to_check__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./observed-attribute-to-check */ "../../packages/core/src/interfaces/observed-attribute-to-check.ts");
/* harmony import */ var _observed_attribute_to_check__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_observed_attribute_to_check__WEBPACK_IMPORTED_MODULE_16__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _observed_attribute_to_check__WEBPACK_IMPORTED_MODULE_16__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _observed_attribute_to_check__WEBPACK_IMPORTED_MODULE_16__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _observed_attributes_to_check__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./observed-attributes-to-check */ "../../packages/core/src/interfaces/observed-attributes-to-check.ts");
/* harmony import */ var _observed_attributes_to_check__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_observed_attributes_to_check__WEBPACK_IMPORTED_MODULE_17__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _observed_attributes_to_check__WEBPACK_IMPORTED_MODULE_17__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _observed_attributes_to_check__WEBPACK_IMPORTED_MODULE_17__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./observer */ "../../packages/core/src/interfaces/observer.ts");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_observer__WEBPACK_IMPORTED_MODULE_18__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _observer__WEBPACK_IMPORTED_MODULE_18__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _observer__WEBPACK_IMPORTED_MODULE_18__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./options */ "../../packages/core/src/interfaces/options.ts");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_options__WEBPACK_IMPORTED_MODULE_19__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _options__WEBPACK_IMPORTED_MODULE_19__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _options__WEBPACK_IMPORTED_MODULE_19__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./services */ "../../packages/core/src/interfaces/services.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_services__WEBPACK_IMPORTED_MODULE_20__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _services__WEBPACK_IMPORTED_MODULE_20__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _services__WEBPACK_IMPORTED_MODULE_20__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _template_function__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./template-function */ "../../packages/core/src/interfaces/template-function.ts");
/* harmony import */ var _template_function__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_template_function__WEBPACK_IMPORTED_MODULE_21__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _template_function__WEBPACK_IMPORTED_MODULE_21__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _template_function__WEBPACK_IMPORTED_MODULE_21__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _type_of_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./type-of-component */ "../../packages/core/src/interfaces/type-of-component.ts");
/* harmony import */ var _type_of_component__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_type_of_component__WEBPACK_IMPORTED_MODULE_22__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _type_of_component__WEBPACK_IMPORTED_MODULE_22__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _type_of_component__WEBPACK_IMPORTED_MODULE_22__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _type_of__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./type-of */ "../../packages/core/src/interfaces/type-of.ts");
/* harmony import */ var _type_of__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_type_of__WEBPACK_IMPORTED_MODULE_23__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _type_of__WEBPACK_IMPORTED_MODULE_23__) if(["default","Adapter"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _type_of__WEBPACK_IMPORTED_MODULE_23__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

























/***/ }),

/***/ "../../packages/core/src/interfaces/module-element-type.ts":
/*!*****************************************************************!*\
  !*** ../../packages/core/src/interfaces/module-element-type.ts ***!
  \*****************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/module.ts":
/*!****************************************************!*\
  !*** ../../packages/core/src/interfaces/module.ts ***!
  \****************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/observed-attribute-to-check.ts":
/*!*************************************************************************!*\
  !*** ../../packages/core/src/interfaces/observed-attribute-to-check.ts ***!
  \*************************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/observed-attributes-to-check.ts":
/*!**************************************************************************!*\
  !*** ../../packages/core/src/interfaces/observed-attributes-to-check.ts ***!
  \**************************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/observer.ts":
/*!******************************************************!*\
  !*** ../../packages/core/src/interfaces/observer.ts ***!
  \******************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/options.ts":
/*!*****************************************************!*\
  !*** ../../packages/core/src/interfaces/options.ts ***!
  \*****************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/services.ts":
/*!******************************************************!*\
  !*** ../../packages/core/src/interfaces/services.ts ***!
  \******************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/template-function.ts":
/*!***************************************************************!*\
  !*** ../../packages/core/src/interfaces/template-function.ts ***!
  \***************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/type-of-component.ts":
/*!***************************************************************!*\
  !*** ../../packages/core/src/interfaces/type-of-component.ts ***!
  \***************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/interfaces/type-of.ts":
/*!*****************************************************!*\
  !*** ../../packages/core/src/interfaces/type-of.ts ***!
  \*****************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/core/src/observer.ts":
/*!*******************************************!*\
  !*** ../../packages/core/src/observer.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observer": function() { return /* binding */ Observer; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

var Observer = /*#__PURE__*/function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Observer, null, [{
    key: "updateOptions",
    value: function updateOptions(options) {
      if (!options.adapters) {
        throw new Error("adapters are required!");
      }

      if (options.adapters) {
        Observer.adapters = _objectSpread(_objectSpread({}, Observer.adapters), options.adapters);
        Observer.interfaces = Object.keys(Observer.adapters);
      }

      Observer.rootInterface = options.rootInterface || Observer.interfaces[0];

      if (!Observer.rootInterface) {
        throw new Error("rootInterface is required!");
      }
    }
    /**
     * Tokenizes the provided keypath string into interface + path tokens for the
     * observer to work with.
     */

  }, {
    key: "tokenize",
    value: function tokenize(keypath, root) {
      var tokens = [];
      var current = {
        i: root,
        path: ""
      };
      var index;
      var chr;

      for (index = 0; index < keypath.length; index++) {
        chr = keypath.charAt(index);

        if (~Observer.interfaces.indexOf(chr)) {
          tokens.push(current);
          current = {
            i: chr,
            path: ""
          };
        } else {
          current.path += chr;
        }
      }

      tokens.push(current);
      return tokens;
    }
  }]);

  /**
   * Constructs a new keypath observer and kicks things off.
   * @param obj
   * @param keypath
   * @param callback
   */
  function Observer(obj, keypath, callback) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Observer);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "keypath", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "callback", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "objectPath", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "obj", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "target", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "key", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "tokens", void 0);

    this.keypath = keypath;
    this.callback = callback;
    this.objectPath = [];
    var parseResult = this.parse();
    this.key = parseResult.key;
    this.tokens = parseResult.tokens;
    this.obj = this.getRootObject(obj);
    this.target = this.realize();

    if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__.isObject)(this.target)) {
      this.set(true, this.key, this.target, this.callback);
    }
  }
  /**
   * Parses the keypath using the interfaces defined on the view. Sets variables
   * for the tokenized keypath as well as the end key.
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Observer, [{
    key: "parse",
    value: function parse() {
      var path;
      var root;

      if (!Observer.interfaces || !Observer.interfaces.length) {
        throw new Error("[Observer] Must define at least one adapter interface. interfaces: \"".concat(JSON.stringify(Observer.interfaces), "\" adapters: \"").concat(JSON.stringify(Observer.adapters), "\""));
      }

      if (~Observer.interfaces.indexOf(this.keypath[0])) {
        root = this.keypath[0];
        path = this.keypath.substr(1);
      } else {
        root = Observer.rootInterface;
        path = this.keypath;
      }

      this.tokens = Observer.tokenize(path, root);

      if (!this.tokens.length) {
        throw new Error("[Observer] No tokens");
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

        if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__.isObject)(current)) {
          if (typeof this.objectPath[index] !== "undefined") {
            prev = this.objectPath[index];

            if (current !== prev) {
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

          prev = this.objectPath[index];

          if (prev) {
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
      var oldValue;
      var newValue;
      var next = this.realize();

      if (next !== this.target) {
        if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__.isObject)(this.target)) {
          this.set(false, this.key, this.target, this.callback);
        }

        if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__.isObject)(next)) {
          this.set(true, this.key, next, this.callback);
        }

        oldValue = this.value();
        this.target = next;
        newValue = this.value();

        if (newValue !== oldValue || Array.isArray(newValue)) {
          this.callback.sync();
        }
      } else if (Array.isArray(next)) {
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
      if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__.isObject)(this.target)) {
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
      if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__.isObject)(this.target)) {
        Observer.adapters[this.key.i].set(this.target, this.key.path, value);
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
      return Observer.adapters[key.i].get(obj, key.path);
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
        Observer.adapters[key.i].observe(obj, key.path, callback);
      } else {
        Observer.adapters[key.i].unobserve(obj, key.path, callback);
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
        obj = this.objectPath[index];

        if (obj) {
          this.set(false, token, obj, this);
        }
      }

      if ((0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__.isObject)(this.target)) {
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
      var rootProp;
      var current;

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

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Observer, "adapters", void 0);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Observer, "interfaces", []);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(Observer, "rootInterface", void 0);

/***/ }),

/***/ "../../packages/core/src/parsers.ts":
/*!******************************************!*\
  !*** ../../packages/core/src/parsers.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PRIMITIVE": function() { return /* binding */ PRIMITIVE; },
/* harmony export */   "KEYPATH": function() { return /* binding */ KEYPATH; },
/* harmony export */   "TEXT": function() { return /* binding */ TEXT; },
/* harmony export */   "BINDING": function() { return /* binding */ BINDING; },
/* harmony export */   "parseType": function() { return /* binding */ parseType; },
/* harmony export */   "parseTemplate": function() { return /* binding */ parseTemplate; },
/* harmony export */   "parseNode": function() { return /* binding */ parseNode; },
/* harmony export */   "parseDeclaration": function() { return /* binding */ parseDeclaration; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "../../packages/core/src/view.ts");


/**
 * Used also in parsers.parseType
 * TODO outsource
 */

var PRIMITIVE = 0;
var KEYPATH = 1;
var TEXT = 0;
var BINDING = 1;
var QUOTED_STR = /^'.*'$|^".*"$/; // regex to test if string is wrapped in " or '

var DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^|']*(?:'[^']*')+[^|']*)+|[^|]+))|^$/g;
/**
 * Parser and tokenizer for getting the type and value from a string.
 * @param string
 */

function parseType(str) {
  var type = PRIMITIVE;
  var value = str;

  if (str === undefined) {
    return {
      type: type,
      value: undefined
    };
  }

  if (QUOTED_STR.test(str)) {
    value = str.slice(1, -1);
    var jsonString = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.parseJsonString)(value);
    value = jsonString ? jsonString : value;
  } else if (str === "true") {
    value = true;
  } else if (str === "false") {
    value = false;
  } else if (str === "null") {
    value = null;
  } else if (str === "undefined") {
    value = undefined;
  } else if (str === "") {
    value = undefined;
  } else if (!isNaN(Number(str))) {
    value = Number(str);
  } else if (value.startsWith("{") || value.startsWith("[")) {
    var _jsonString = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.parseJsonString)(value);

    value = _jsonString ? _jsonString : value;
  } else {
    type = KEYPATH;
  }

  return {
    type: type,
    value: value
  };
}

/**
 * Template parser and tokenizer for {{ mustache-style }} text content bindings.
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
  var open = delimiters[0];
  var close = delimiters[1];

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
        var substring = template.slice(lastIndex - open.length);
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
function parseNode(view, node, templateDelimiters) {
  /** If true stop / block the parseNode  recursion */
  var blockRecursion = false;
  node = node;

  if (node.nodeType === Node.TEXT_NODE) {
    var tokens = null; // TODO why check data?

    if (node.data) {
      tokens = parseTemplate(node.data, templateDelimiters);
    }

    if (tokens && tokens.length) {
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var text = document.createTextNode(token.value);

        if (node.parentNode) {
          node.parentNode.insertBefore(text, node);
        }

        if (token.type === BINDING) {
          // TODO fix any
          view.buildBinding(text, null, token.value, _view__WEBPACK_IMPORTED_MODULE_1__.View.mustacheTextBinder, null);
        }
      }

      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }

    blockRecursion = true;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // traverse binds attributes and components
    blockRecursion = view.traverse(node);
  }

  if (!blockRecursion) {
    if (node.childNodes && node.childNodes.length > 0) {
      for (var _i = 0; _i < node.childNodes.length; _i++) {
        var childNode = node.childNodes[_i];

        if (childNode) {
          parseNode(view, childNode, templateDelimiters);
        }
      }
    }
  }
}

/**
 * Parses an attribute argument to his keypath and splits the formatter names into a pipes array.
 * @param declaration e.g. `object.data | validate | json`
 *
 * if declaration is
 * ```
 * object.data | validate | json`
 * ``
 *
 * the result is
 * ```
 * {
 *    keypath: "object.data",
 *    pipes: ["validate", "json"]
 * }
 * ```
 */
function parseDeclaration(declaration) {
  var matches = declaration.match(DECLARATION_SPLIT);

  if (matches === null) {
    throw new Error("[View] No matches");
  }

  var pipes = matches.map(function (str) {
    return str.trim();
  });
  var keypath = pipes.shift() || undefined;
  return {
    keypath: keypath,
    pipes: pipes
  };
}

/***/ }),

/***/ "../../packages/core/src/riba.ts":
/*!***************************************!*\
  !*** ../../packages/core/src/riba.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Riba": function() { return /* binding */ Riba; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parsers */ "../../packages/core/src/parsers.ts");
/* harmony import */ var _binders_attribute_binder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./binders/attribute.binder */ "../../packages/core/src/binders/attribute.binder.ts");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view */ "../../packages/core/src/view.ts");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./observer */ "../../packages/core/src/observer.ts");
/* harmony import */ var _services_module_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/module.service */ "../../packages/core/src/services/module.service.ts");





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






var Riba = /*#__PURE__*/function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Riba, [{
    key: "prefix",
    set: function set(value) {
      this._prefix = value;
      this._fullPrefix = value + "-";
    },
    get: function get() {
      return this._prefix;
    }
  }, {
    key: "fullPrefix",
    get: function get() {
      return this._fullPrefix;
    }
    /**
     * Creates an singleton instance of Riba.
     */

  }], [{
    key: "handler",

    /**
     * Sets the attribute on the element. If no binder above is matched it will fall
     * back to using this binder.
     */

    /**
     * Default event handler, calles the function defined in his binder
     * @see Binding.eventHandler
     * @param el The element the event was triggered from
     */
    value: function handler(context, ev, binding, el) {
      if (!this || !this.call) {
        var error = new Error("[rv-".concat(binding.type, "=\"").concat(binding.keypath, "\"] Event handler \"").concat(binding.keypath, "\" not found!\""));
        console.error(error, binding, el, binding.view.models);
        throw error;
      }

      this.call(context, ev, binding.view.models, el);
    }
    /** singleton instance */

  }]);

  function Riba() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Riba);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "module", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "binders", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "components", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "formatters", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "adapters", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "parseTemplate", _parsers__WEBPACK_IMPORTED_MODULE_4__.parseTemplate);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "parseType", _parsers__WEBPACK_IMPORTED_MODULE_4__.parseType);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "templateDelimiters", ["{", "}"]);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "rootInterface", ".");

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "preloadData", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "removeBinderAttributes", true);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "blockNodeNames", ["SCRIPT", "STYLE", "TEMPLATE", "CODE"]);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "_prefix", "rv");

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "_fullPrefix", "rv-");

    this.module = new _services_module_service__WEBPACK_IMPORTED_MODULE_8__.ModulesService(this.binders, this.components, this.formatters, this.adapters);

    if (Riba.instance) {
      return Riba.instance;
    }

    Riba.instance = this;
  }
  /**
   * Merges an object literal into the corresponding global options.
   * @param options
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Riba, [{
    key: "configure",
    value: function configure(options) {
      if (!options) {
        return;
      }

      for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_Object$entries[_i], 2),
            option = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        switch (option) {
          case "binders":
            this.binders = _objectSpread(_objectSpread({}, this.binders), value);
            break;

          case "formatters":
            this.formatters = _objectSpread(_objectSpread({}, this.formatters), value);
            break;

          case "components":
            this.components = _objectSpread(_objectSpread({}, this.components), value);
            break;

          case "adapters":
            this.adapters = _objectSpread(_objectSpread({}, this.adapters), value);
            break;

          case "prefix":
            this.prefix = value;
            break;

          case "parseTemplate":
            this.parseTemplate = value;
            break;

          case "parseType":
            this.parseType = value;
            break;

          case "templateDelimiters":
            this.templateDelimiters = value;
            break;

          case "rootInterface":
            this.rootInterface = value;
            break;

          case "preloadData":
            this.preloadData = value;
            break;

          case "blockNodeNames":
            this.blockNodeNames = value;
            break;

          default:
            console.warn("Option not supported", option, value);
            break;
        }
      }
    }
  }, {
    key: "getViewOptions",
    value: function getViewOptions(options) {
      var viewOptions = {
        // EXTENSIONS
        adapters: {},
        binders: {},
        components: {},
        formatters: {},
        // other
        attributeBinders: {},
        // sightglass
        rootInterface: {}
      };

      if (options) {
        viewOptions.binders = _objectSpread(_objectSpread({}, viewOptions.binders), options.binders);
        viewOptions.formatters = _objectSpread(_objectSpread({}, viewOptions.formatters), options.formatters);
        viewOptions.components = _objectSpread(_objectSpread({}, viewOptions.components), options.components);
        viewOptions.adapters = _objectSpread(_objectSpread({}, viewOptions.adapters), options.adapters);
      }

      viewOptions.prefix = options && options.prefix || this.prefix;
      viewOptions.fullPrefix = viewOptions.prefix && viewOptions.prefix + "-" || this.fullPrefix;
      viewOptions.templateDelimiters = options && options.templateDelimiters || this.templateDelimiters;
      viewOptions.rootInterface = options && options.rootInterface || this.rootInterface;
      viewOptions.removeBinderAttributes = options && typeof options.removeBinderAttributes === "boolean" ? options.removeBinderAttributes : this.removeBinderAttributes;
      viewOptions.blockNodeNames = options && options.blockNodeNames || this.blockNodeNames;
      viewOptions.preloadData = options && typeof options.preloadData === "boolean" ? options.preloadData : this.preloadData;
      viewOptions.handler = options && options.handler || Riba.handler; // merge extensions

      viewOptions.binders = _objectSpread(_objectSpread({}, this.binders), viewOptions.binders);
      viewOptions.formatters = _objectSpread(_objectSpread({}, this.formatters), viewOptions.formatters);
      viewOptions.components = _objectSpread(_objectSpread({}, this.components), viewOptions.components);
      viewOptions.adapters = _objectSpread(_objectSpread({}, this.adapters), viewOptions.adapters); // get all attributeBinders from available binders

      if (viewOptions.binders) {
        viewOptions.attributeBinders = Object.keys(viewOptions.binders).filter(function (key) {
          return key.indexOf("*") >= 1;
        } // Should contain, but not start with, *
        );
      }

      return viewOptions;
    }
    /**
     * Binds some data to a template / element. Returns a riba.View instance.
     */

  }, {
    key: "bind",
    value: function bind(el, models, options) {
      var viewOptions = this.getViewOptions(options);
      models = models || Object.create(null);
      _observer__WEBPACK_IMPORTED_MODULE_7__.Observer.updateOptions(viewOptions);
      var view = new _view__WEBPACK_IMPORTED_MODULE_6__.View(el, models, viewOptions);
      view.bind();
      return view;
    }
  }]);

  return Riba;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Riba, "fallbackBinder", _binders_attribute_binder__WEBPACK_IMPORTED_MODULE_5__.attributeBinder);

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(Riba, "instance", void 0);

window.Riba = Riba;

/***/ }),

/***/ "../../packages/core/src/services/adapter.service.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/services/adapter.service.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdapterService": function() { return /* binding */ AdapterService; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _module_element_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./module-element.service */ "../../packages/core/src/services/module-element.service.ts");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../observer */ "../../packages/core/src/observer.ts");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var AdapterService = /*#__PURE__*/function (_ModuleElementService) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(AdapterService, _ModuleElementService);

  var _super = _createSuper(AdapterService);

  /**
   *
   */
  function AdapterService(adapters) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AdapterService);

    _this = _super.call(this, adapters);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "type", "adapter");

    return _this;
  }
  /**
   * Regist a adapter with his name
   * @param adapter
   * @param name
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AdapterService, [{
    key: "regist",
    value: function regist(adapter, fallbackName) {
      var forceFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var name = forceFallback ? fallbackName || adapter.name : adapter.name || fallbackName;

      if (!name) {
        throw new Error("Adapter name not found!");
      }

      this.elements[name] = adapter;
      var options = {
        adapters: this.elements
      };
      _observer__WEBPACK_IMPORTED_MODULE_8__.Observer.updateOptions(options);
      return this.elements;
    }
  }]);

  return AdapterService;
}(_module_element_service__WEBPACK_IMPORTED_MODULE_7__.ModuleElementService);

/***/ }),

/***/ "../../packages/core/src/services/binder.service.ts":
/*!**********************************************************!*\
  !*** ../../packages/core/src/services/binder.service.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindersService": function() { return /* binding */ BindersService; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _module_element_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./module-element.service */ "../../packages/core/src/services/module-element.service.ts");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var BindersService = /*#__PURE__*/function (_ModuleElementService) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(BindersService, _ModuleElementService);

  var _super = _createSuper(BindersService);

  /**
   *
   * @param binders;
   */
  function BindersService(binders) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, BindersService);

    _this = _super.call(this, binders);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "type", "binder");

    return _this;
  }
  /**
   * Regist a binder
   * @param binder
   * @param name  Overwrites the name to access the binder over
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BindersService, [{
    key: "regist",
    value: function regist(binder, fallbackName) {
      var forceFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!binder || typeof binder.routine !== "function") {
        console.warn(new Error("Can not regist binder!"), binder);
        return this.elements;
      }

      var name = forceFallback ? fallbackName || binder.name : binder.name || fallbackName;

      if (!name) {
        console.warn(new Error("Binder name not found!"), binder);
        return this.elements;
      }

      this.elements[name] = binder;
      return this.elements;
    }
  }]);

  return BindersService;
}(_module_element_service__WEBPACK_IMPORTED_MODULE_7__.ModuleElementService);

/***/ }),

/***/ "../../packages/core/src/services/component.service.ts":
/*!*************************************************************!*\
  !*** ../../packages/core/src/services/component.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComponentService": function() { return /* binding */ ComponentService; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _module_element_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./module-element.service */ "../../packages/core/src/services/module-element.service.ts");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var ComponentService = /*#__PURE__*/function (_ModuleElementService) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(ComponentService, _ModuleElementService);

  var _super = _createSuper(ComponentService);

  /**
   *
   * @param components
   */
  function ComponentService(components) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ComponentService);

    _this = _super.call(this, components);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "type", "components");

    return _this;
  }
  /**
   * Regist a component with his name
   * @param component
   * @param name
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ComponentService, [{
    key: "regist",
    value: function regist(component, fallbackName) {
      var forceFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var name = forceFallback ? fallbackName || component.tagName : component.tagName || fallbackName;

      if (!name) {
        console.warn(new Error("Component name not found!"), component);
        return this.elements;
      }

      this.elements[name] = component;
      return this.elements;
    }
  }]);

  return ComponentService;
}(_module_element_service__WEBPACK_IMPORTED_MODULE_7__.ModuleElementService);

/***/ }),

/***/ "../../packages/core/src/services/dom.ts":
/*!***********************************************!*\
  !*** ../../packages/core/src/services/dom.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseAttribute": function() { return /* binding */ parseAttribute; },
/* harmony export */   "getDataset": function() { return /* binding */ getDataset; }
/* harmony export */ });
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");

/**
 * TODO move Dom utils here
 */

var parseAttribute = function parseAttribute(attr) {
  var value = attr;

  if (attr === "true") {
    value = true;
  } else if (attr === "false") {
    value = false;
  } else if (attr === "null") {
    value = null;
  } else if (attr === "undefined") {
    value = undefined;
  } else if (attr === "") {
    value = undefined;
  } else if (!isNaN(Number(attr))) {
    value = Number(attr); // If number is too large store the value as string

    if (value >= Number.MAX_SAFE_INTEGER) {
      value = attr;
    }
  } else {
    var jsonString = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.parseJsonString)(value);
    value = jsonString ? jsonString : value;
  }

  return value;
};
var getDataset = function getDataset(element) {
  var dataset = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_0__.clone)(false, element.dataset);

  for (var attr in dataset) {
    if (dataset[attr]) {
      dataset[attr] = parseAttribute(dataset[attr]);
    }
  }

  return dataset;
};

/***/ }),

/***/ "../../packages/core/src/services/formatter.service.ts":
/*!*************************************************************!*\
  !*** ../../packages/core/src/services/formatter.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormatterService": function() { return /* binding */ FormatterService; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _module_element_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./module-element.service */ "../../packages/core/src/services/module-element.service.ts");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var FormatterService = /*#__PURE__*/function (_ModuleElementService) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(FormatterService, _ModuleElementService);

  var _super = _createSuper(FormatterService);

  /**
   *
   */
  function FormatterService(formatters) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FormatterService);

    _this = _super.call(this, formatters);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "type", "formatter");

    return _this;
  }
  /**
   * Regist a formatter with his name
   * @param formatter
   * @param name
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(FormatterService, [{
    key: "regist",
    value: function regist(formatter, fallbackName) {
      var forceFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var name = forceFallback ? fallbackName || formatter.name : formatter.name || fallbackName;

      if (!name) {
        throw new Error("Formatter name not found!");
      }

      this.elements[name] = formatter;
      return this.elements;
    }
  }]);

  return FormatterService;
}(_module_element_service__WEBPACK_IMPORTED_MODULE_7__.ModuleElementService);

/***/ }),

/***/ "../../packages/core/src/services/http.service.ts":
/*!********************************************************!*\
  !*** ../../packages/core/src/services/http.service.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpService": function() { return /* binding */ HttpService; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");






function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var HttpService = /*#__PURE__*/function () {
  function HttpService() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, HttpService);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(HttpService, null, [{
    key: "setRequestHeaderEachRequest",

    /**
     * Set header for each request
     * @param name Header name
     * @param value Hander value
     */
    value: function setRequestHeaderEachRequest(name, value) {
      this._requestHeadersEachRequest.push({
        name: name,
        value: value
      }); // console.debug(
      //   "[HttpService] setRequestHeaderEachRequest",
      //   name,
      //   value,
      //   this._requestHeadersEachRequest
      // );

    }
    /**
     * Load JSON-encoded data from the server using a GET HTTP request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @see https://api.jquery.com/jquery.getjson/
     */

  }, {
    key: "getJSON",
    value: function () {
      var _getJSON = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(url, data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.fetch(url, "GET", data, "json"));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getJSON(_x2, _x3) {
        return _getJSON.apply(this, arguments);
      }

      return getJSON;
    }()
    /**
     * Load data from the server using a HTTP POST request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     * @see https://api.jquery.com/jquery.post/
     */

  }, {
    key: "post",
    value: function () {
      var _post = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(url, data, dataType) {
        var headers,
            options,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                headers = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
                options = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : {};
                return _context2.abrupt("return", this.fetch(url, "POST", data, dataType, headers, options));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x4, _x5, _x6) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3(url, data, dataType) {
        var headers,
            options,
            _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                headers = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                options = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : {};
                return _context3.abrupt("return", this.fetch(url, "DELETE", data, dataType, headers, options));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _delete(_x7, _x8, _x9) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4(url, data, dataType) {
        var headers,
            options,
            _args4 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                headers = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                options = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : {};
                return _context4.abrupt("return", this.fetch(url, "PUT", data, dataType, headers, options));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function put(_x10, _x11, _x12) {
        return _put.apply(this, arguments);
      }

      return put;
    }()
    /**
     * Load data from the server using a HTTP GET request.
     * @param url A string containing the URL to which the request is sent.
     * @param data A plain object or string that is sent to the server with the request.
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     * @see https://api.jquery.com/jquery.get/
     */

  }, {
    key: "get",
    value: function () {
      var _get = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5(url, data, dataType) {
        var headers,
            options,
            _args5 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                headers = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : {};
                options = _args5.length > 4 && _args5[4] !== undefined ? _args5[4] : {};
                return _context5.abrupt("return", this.fetch(url, "GET", data, dataType, headers, options));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function get(_x13, _x14, _x15) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     *
     * @param dataType The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).
     */

  }, {
    key: "parseDataType",
    value: function parseDataType(dataType) {
      var headers = {};
      var contentType = "application/x-www-form-urlencoded";
      var accept = "*/*";

      switch (dataType) {
        case "script":
          contentType = "application/javascript";
          break;

        case "json":
          contentType = "application/json";
          accept = "application/json, text/javascript";
          break;

        case "xml":
          contentType = "application/xml";
          accept = "application/xml, text/xml";
          break;

        case "text":
          contentType = "text/plain";
          accept = "text/plain";
          break;

        case "html":
          contentType = "text/html";
          accept = "text/html";
          break;

        case "form":
          contentType = "application/x-www-form-urlencoded";
          break;

        /*case "multi-form":
          contentType = "multipart/form-data";
          break;*/
      }

      if (contentType) {
        headers["Content-Type"] = contentType; // tslint:disable-next-line:no-string-literal

        headers["Accept"] = accept;
      }

      return headers;
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }( /*#__PURE__*/function () {
      var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6(url) {
        var method,
            data,
            dataType,
            headers,
            options,
            body,
            _iterator,
            _step,
            header,
            cache,
            queryStr,
            seperator,
            _args6 = arguments;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                method = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : "GET";
                data = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                dataType = _args6.length > 3 ? _args6[3] : undefined;
                headers = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : {};
                options = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : {};

                if (fetch) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt("return", console.error("Your browser does not support the fetch API, use xhr instead or install a polyfill."));

              case 7:
                // headers
                _iterator = _createForOfIteratorHelper(this._requestHeadersEachRequest);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    header = _step.value;
                    headers[header.name] = header.value;
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                if (dataType) {
                  headers = (0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_5__.concat)(false, headers, this.parseDataType(dataType));
                }

                if (!options.crossDomain && !headers["X-Requested-With"]) {
                  headers["X-Requested-With"] = "XMLHttpRequest";
                }

                cache = options.cache ? options.cache : "default";

                if (method === "GET" && data) {
                  queryStr = new URLSearchParams(data).toString();

                  if (queryStr) {
                    seperator = url.indexOf("?") !== -1 ? "&" : "?";
                    url = url + seperator + new URLSearchParams(data).toString();
                  }
                } else if (data) {
                  if (dataType === "form") {
                    body = new URLSearchParams(data);
                  } else {
                    body = JSON.stringify(data);
                  }
                } // console.debug("[HttpService] url", url);
                // console.debug("[HttpService] method", method);
                // console.debug("[HttpService] body", body);
                // console.debug(
                //   "[HttpService] headers",
                //   headers,
                //   this._requestHeadersEachRequest
                // );


                return _context6.abrupt("return", fetch(url, {
                  credentials: "same-origin",
                  cache: cache,
                  method: method,
                  body: body,
                  headers: headers
                }).then(function (response) {
                  if (response.status >= 400) {
                    throw response;
                  }

                  if (typeof dataType === "string" && (dataType === "json" || dataType.indexOf("json") !== -1) && typeof response.json === "function") {
                    try {
                      return response.json();
                    } catch (error) {
                      return response.text();
                    }
                  }

                  return response.text();
                })["catch"](function (error) {
                  // console.error(error);
                  throw error;
                }));

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function (_x16) {
        return _ref.apply(this, arguments);
      };
    }())
    /**
     * Header name value pair to send on each request
     */

  }]);

  return HttpService;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(HttpService, "_requestHeadersEachRequest", []);

/***/ }),

/***/ "../../packages/core/src/services/index.ts":
/*!*************************************************!*\
  !*** ../../packages/core/src/services/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BindersService": function() { return /* reexport safe */ _binder_service__WEBPACK_IMPORTED_MODULE_0__.BindersService; },
/* harmony export */   "ComponentService": function() { return /* reexport safe */ _component_service__WEBPACK_IMPORTED_MODULE_1__.ComponentService; },
/* harmony export */   "FormatterService": function() { return /* reexport safe */ _formatter_service__WEBPACK_IMPORTED_MODULE_2__.FormatterService; },
/* harmony export */   "HttpService": function() { return /* reexport safe */ _http_service__WEBPACK_IMPORTED_MODULE_3__.HttpService; },
/* harmony export */   "Utils": function() { return /* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_4__.Utils; },
/* harmony export */   "getDataset": function() { return /* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_5__.getDataset; },
/* harmony export */   "parseAttribute": function() { return /* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_5__.parseAttribute; }
/* harmony export */ });
/* harmony import */ var _binder_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binder.service */ "../../packages/core/src/services/binder.service.ts");
/* harmony import */ var _component_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component.service */ "../../packages/core/src/services/component.service.ts");
/* harmony import */ var _formatter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatter.service */ "../../packages/core/src/services/formatter.service.ts");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.service */ "../../packages/core/src/services/http.service.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "../../packages/core/src/services/utils.ts");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom */ "../../packages/core/src/services/dom.ts");







/***/ }),

/***/ "../../packages/core/src/services/module-element.service.ts":
/*!******************************************************************!*\
  !*** ../../packages/core/src/services/module-element.service.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModuleElementService": function() { return /* binding */ ModuleElementService; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ribajs/utils/src/type */ "../../packages/utils/src/type.ts");




var ModuleElementService = /*#__PURE__*/function () {
  /**
   *
   * @param elements;
   */
  function ModuleElementService(elements) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ModuleElementService);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "elements", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "type", void 0);

    this.elements = elements;
  }
  /**
   * Regist a element
   * @param element
   * @param name  Overwrites the name to access the element over
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ModuleElementService, [{
    key: "regists",

    /**
     * Regist a set / array of elements
     * @param elements
     */
    value: function regists(elements) {
      if (!(0,_ribajs_utils_src_type__WEBPACK_IMPORTED_MODULE_3__.isObject)(elements)) {
        throw new Error("Elements to register must be an object of elements");
      }

      for (var _key in elements) {
        if (elements[_key] && _key !== "__esModule") {
          var _element = elements[_key];
          this.regist(_element, _key);
        }
      }

      return this.elements;
    }
  }]);

  return ModuleElementService;
}();

/***/ }),

/***/ "../../packages/core/src/services/module.service.ts":
/*!**********************************************************!*\
  !*** ../../packages/core/src/services/module.service.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModulesService": function() { return /* binding */ ModulesService; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _binder_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./binder.service */ "../../packages/core/src/services/binder.service.ts");
/* harmony import */ var _component_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component.service */ "../../packages/core/src/services/component.service.ts");
/* harmony import */ var _formatter_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./formatter.service */ "../../packages/core/src/services/formatter.service.ts");
/* harmony import */ var _adapter_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./adapter.service */ "../../packages/core/src/services/adapter.service.ts");







var ModulesService = /*#__PURE__*/function () {
  /**
   *
   * @param binders;
   * @param components;
   * @param formatters;
   * @param adapters;
   */
  function ModulesService(binders, components, formatters, adapters) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ModulesService);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "binder", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "component", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "formatter", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "adapter", void 0);

    this.binder = new _binder_service__WEBPACK_IMPORTED_MODULE_3__.BindersService(binders);
    this.component = new _component_service__WEBPACK_IMPORTED_MODULE_4__.ComponentService(components);
    this.formatter = new _formatter_service__WEBPACK_IMPORTED_MODULE_5__.FormatterService(formatters);
    this.adapter = new _adapter_service__WEBPACK_IMPORTED_MODULE_6__.AdapterService(adapters);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ModulesService, [{
    key: "regist",
    value: function regist(module) {
      if (!module) {
        console.error(module);
        throw new Error("The Riba module is falsy!");
      }

      if (module.binders) {
        this.binder.regists(module.binders);
      }

      if (module.components) {
        this.component.regists(module.components);
      }

      if (module.formatters) {
        this.formatter.regists(module.formatters);
      }

      if (module.adapters) {
        this.adapter.regists(module.adapters);
      }
    }
  }]);

  return ModulesService;
}();

/***/ }),

/***/ "../../packages/core/src/services/utils.ts":
/*!*************************************************!*\
  !*** ../../packages/core/src/services/utils.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Utils": function() { return /* binding */ Utils; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ribajs/utils/src/dom */ "../../packages/utils/src/dom.ts");



/**
 * Just a class with some helpful functions
 *
 * @export
 * @class Utils
 */

var Utils = /*#__PURE__*/function () {
  function Utils() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Utils);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Utils, null, [{
    key: "domIsReady",

    /**
     * Cross-browser Document Ready check
     * @see https://www.competa.com/blog/cross-browser-document-ready-with-vanilla-javascript/
     * @param callback
     */
    value: function domIsReady(callback) {
      console.warn("Utils.domIsReady is deprecated, use import { ready } from '@ribajs/utils/src/dom' instead");
      return (0,_ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_2__.ready)(callback);
    }
  }]);

  return Utils;
}();

/***/ }),

/***/ "../../packages/core/src/vendors/index.ts":
/*!************************************************!*\
  !*** ../../packages/core/src/vendors/index.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills.module */ "../../packages/core/src/vendors/polyfills.module.ts");
/* harmony import */ var _polyfills_module__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_polyfills_module__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "../../packages/core/src/vendors/polyfills.module.ts":
/*!***********************************************************!*\
  !*** ../../packages/core/src/vendors/polyfills.module.ts ***!
  \***********************************************************/
/***/ (function() {

// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill#Polyfill
(function () {
  if (typeof window.CustomEvent === "function") {
    return false;
  }

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

/***/ }),

/***/ "../../packages/core/src/view.ts":
/*!***************************************!*\
  !*** ../../packages/core/src/view.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "View": function() { return /* binding */ View; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _riba__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./riba */ "../../packages/core/src/riba.ts");
/* harmony import */ var _binding__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./binding */ "../../packages/core/src/binding.ts");
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./parsers */ "../../packages/core/src/parsers.ts");
/* harmony import */ var _ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ribajs/utils/src/dom */ "../../packages/utils/src/dom.ts");




function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





/**
 * TODO Check if there is an official interface which fits better here
 */

/**
 * A collection of bindings built from a set of parent nodes.
 */
var View = /*#__PURE__*/function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(View, null, [{
    key: "create",

    /**
     * Binder for mustache style `{model.property}` text Binders
     */

    /**
     * Helper function to create a new view inside of a binding
     * @param bindin
     * @param models
     * @param anchorEl
     */
    value: function create(binding, models, anchorEl) {
      var _binding$marker;

      var template = binding.el.cloneNode(true);
      var view = new View(template, models, binding.view.options);
      view.bind();

      if (!(binding !== null && binding !== void 0 && (_binding$marker = binding.marker) !== null && _binding$marker !== void 0 && _binding$marker.parentNode)) {
        console.warn("[View]: No parent node for binding!");
      } else {
        binding.marker.parentNode.insertBefore(template, anchorEl);
      }

      return view;
    }
  }]);

  // public componentView: View | null = null;

  /**
   * The DOM elements and the model objects for binding are passed into the
   * constructor along with any local options that should be used throughout the
   * context of the view and it's bindings.
   * @param els
   * @param models
   * @param options
   */
  function View(els, models, options) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, View);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "els", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "models", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "options", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "bindings", []);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "webComponents", []);

    if (Array.isArray(els)) {
      this.els = els;
    } else {
      this.els = [els];
    }

    this.models = models;
    this.options = options;
    this.build();
  }
  /**
   * Regist all components
   * This can sometimes be useful so that the browser automatically recognizes whether a component is inserted into the dom.
   * However, the components are already registered when they are found by riba in the DOM.
   *
   * Please note, this method does not support the browser fallback for browsers that cannot use custom elements.
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(View, [{
    key: "registComponents",
    value: function registComponents() {
      for (var nodeName in this.options.components) {
        if (this.options.components[nodeName]) {
          // Not already registred?
          if (!customElements.get(nodeName)) {
            var COMPONENT = this.options.components[nodeName];
            this.registComponent(COMPONENT, nodeName);
          }
        }
      }
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
      var _this = this;

      if (Array.isArray(this.bindings)) {
        this.bindings.forEach(function (binding) {
          binding.unbind();

          if (binding.el.setAttribute && _this.options.removeBinderAttributes) {// TODO reset attribute ?
            // binding.el.setAttribute(attribute.name);
          }
        });
      } // TODO fallback to unbind web components

    }
    /**
     * Syncs up the view with the model by running the routines on all bindings.
     */

  }, {
    key: "sync",
    value: function sync() {
      this.bindings.forEach(function (binding) {
        if (binding.sync) {
          binding.sync();
        }
      });
    }
    /**
     * Publishes the input values from the view back to the model (reverse sync).
     */

  }, {
    key: "publish",
    value: function publish() {
      this.bindings.forEach(function (binding) {
        if (binding.binder && binding.binder.publishes && binding.publish) {
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
      var _this2 = this;

      var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.keys(models).forEach(function (key) {
        _this2.models[key] = models[key];
      });

      var _iterator = _createForOfIteratorHelper(this.bindings),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var binding = _step.value;
          // if ((binding as Binding).update) {
          binding.update(models); // }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * Parses the DOM tree and builds `Binding` instances for every matched
     * binding declaration.
     */

  }, {
    key: "build",
    value: function build() {
      this.bindings = []; // this.bindings || [];

      if (!this.options.templateDelimiters) {
        throw new Error("templateDelimiters required");
      }

      var elements = this.els;

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if (element) {
          (0,_parsers__WEBPACK_IMPORTED_MODULE_5__.parseNode)(this, element, this.options.templateDelimiters);
        }
      }

      this.bindings.sort(View.bindingComparator);
    }
  }, {
    key: "traverse",
    value: function traverse(node) {
      var bindingPrefix;

      if (this.options.fullPrefix) {
        bindingPrefix = this.options.fullPrefix;
      } else {
        // TODO FIXME
        bindingPrefix = this.options.prefix + "-";
      }

      if (!bindingPrefix) {
        throw new Error("prefix is required");
      }
      /** If true stop / block the parseNode recursion */


      var block = this.options.blockNodeNames.indexOf(node.nodeName) !== -1;
      var attributes = node.attributes;
      var bindInfos = [];
      var attributeBinders = this.options.attributeBinders; // bind attribute binders if available

      if (attributes && this.options.binders) {
        for (var i = 0, len = attributes.length; i < len; i++) {
          var nodeName = null;
          var binder = null;
          var identifier = null;
          var attribute = attributes[i]; // if attribute starts with the binding prefix. E.g. rv

          if (attribute.name.indexOf(bindingPrefix) === 0) {
            nodeName = attribute.name.slice(bindingPrefix.length); // if binder is not a attributeBinder binder should be setted

            if (this.options.binders[nodeName]) {
              binder = this.options.binders[nodeName];
            }

            if (binder === null) {
              // seems to be a star binder (because binder was not set)
              // Check if any attributeBinder matchs
              for (var k = 0; k < attributeBinders.length; k++) {
                identifier = attributeBinders[k];
                var regexp = new RegExp("^".concat(identifier.replace(/\*/g, ".+"), "$"));

                if (regexp.test(nodeName)) {
                  binder = this.options.binders[identifier];
                  break;
                }
              }
            }

            if (binder === null) {
              if (this.options.binders["*"]) {
                binder = this.options.binders["*"];
                identifier = "*";
              } else {
                binder = _riba__WEBPACK_IMPORTED_MODULE_3__.Riba.fallbackBinder;
              }
            } // if block is set, do not bind its childs (this means the binder bound it by itself)
            // and build binding directly (do not push it to bindInfos array)


            if (binder.block) {
              this.buildBinding(node, nodeName, attribute.value, binder, identifier);

              if (node.removeAttribute && this.options.removeBinderAttributes) {
                node.removeAttribute(attribute.name);
              }

              return true;
            }

            bindInfos.push({
              attr: attribute,
              binder: binder,
              nodeName: nodeName,
              identifier: identifier
            });
          }
        }

        for (var _i = 0; _i < bindInfos.length; _i++) {
          var bindInfo = bindInfos[_i];
          this.buildBinding(node, bindInfo.nodeName, bindInfo.attr.value, bindInfo.binder, bindInfo.identifier);

          if (node.removeAttribute && this.options.removeBinderAttributes) {
            node.removeAttribute(bindInfo.attr.name);
          }
        }
      } // bind components


      if (!block && !node._bound && this.options.components) {
        var _nodeName = node.nodeName.toLowerCase();

        var COMPONENT = this.options.components[_nodeName];

        if (COMPONENT) {
          // this.registComponentWithFallback(node, COMPONENT, nodeName);
          this.registComponent(COMPONENT, _nodeName);
          block = true;
        } // Also block unknown custom elements except page components
        else if ((0,_ribajs_utils_src_dom__WEBPACK_IMPORTED_MODULE_6__.isCustomElement)(node) && !_nodeName.endsWith("-page")) {
            block = true;
          }
      }

      return block;
    }
  }, {
    key: "buildBinding",
    value: function buildBinding(node, type, declaration, binder, identifier) {
      var parsedDeclaration = (0,_parsers__WEBPACK_IMPORTED_MODULE_5__.parseDeclaration)(declaration);
      var keypath = parsedDeclaration.keypath;
      var pipes = parsedDeclaration.pipes;
      this.bindings.push(new _binding__WEBPACK_IMPORTED_MODULE_4__.Binding(this, node, type, keypath, binder, pipes, identifier));
    }
    /**
     * Regist a custom element using the native customElements feature.
     * @param COMPONENT
     * @param nodeName
     */

  }, {
    key: "registComponent",
    value: function registComponent(COMPONENT, nodeName) {
      if (!customElements) {
        console.error("customElements not supported by your browser!");
        throw new Error("customElements not supported by your browser!");
      }

      var resolveNodeName = nodeName || COMPONENT.tagName;

      if (!customElements.get(resolveNodeName)) {
        customElements.define(COMPONENT.tagName, COMPONENT);
        console.debug("New custom element \"".concat(resolveNodeName, "\" defined."));
      }
    }
  }]);

  return View;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(View, "mustacheTextBinder", {
  name: "mustache-text",
  routine: function routine(node, value) {
    node.data = value != null ? value : "";
  }
});

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(View, "bindingComparator", function (a, b) {
  var _a$binder, _b$binder;

  var aPriority = ((_a$binder = a.binder) === null || _a$binder === void 0 ? void 0 : _a$binder.priority) || 0;
  var bPriority = ((_b$binder = b.binder) === null || _b$binder === void 0 ? void 0 : _b$binder.priority) || 0;
  return bPriority - aPriority;
});

/***/ }),

/***/ "../../packages/events/src/index.ts":
/*!******************************************!*\
  !*** ../../packages/events/src/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventDispatcher": function() { return /* reexport safe */ _services__WEBPACK_IMPORTED_MODULE_1__.EventDispatcher; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../packages/events/src/types/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _types__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "../../packages/events/src/services/index.ts");



/***/ }),

/***/ "../../packages/events/src/services/event-dispatcher.service.ts":
/*!**********************************************************************!*\
  !*** ../../packages/events/src/services/event-dispatcher.service.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventDispatcher": function() { return /* binding */ EventDispatcher; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__);





function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
var EventDispatcher = /*#__PURE__*/function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(EventDispatcher, [{
    key: "namespace",
    get: function get() {
      return this._namespace;
    }
    /**
     * Creates an singleton instance of Dispatcher.
     */

  }], [{
    key: "getInstance",
    value: function getInstance() {
      var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "main";
      var result = EventDispatcher.instances[namespace];

      if (!result) {
        return new this(namespace);
      }

      return result;
    }
    /**
     * Object that keeps all the events
     *
     * @readOnly
     * @type {object}
     */

  }]);

  function EventDispatcher(namespace) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EventDispatcher);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "events", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "eventsOnce", {});

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(this, "_namespace", "anonymous");

    if (namespace) {
      if (EventDispatcher.instances[namespace]) {
        return EventDispatcher.instances[namespace];
      }

      this._namespace = namespace;
      EventDispatcher.instances[namespace] = this;
      return EventDispatcher.instances[namespace];
    }
  }
  /**
   * Bind a one-time callback to an event
   *
   * @param eventName
   * @param cb function to call when an event with eventName is triggered
   * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
   *
   * IMPORTANT; cb CANNOT BE arrow function if a thisContext is used, use function() {} instead
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(EventDispatcher, [{
    key: "once",
    value: function once(eventName, cb, thisContext) {
      this.eventsOnce[eventName] = this.eventsOnce[eventName] || [];

      if (typeof thisContext !== "undefined") {
        this.eventsOnce[eventName].push({
          cb: cb.bind(thisContext),
          orgCb: cb,
          thisContext: thisContext
        });
      } else {
        this.eventsOnce[eventName].push(cb);
      }
    }
    /**
     * Bind a callback to an event
     *
     * @param eventName
     * @param cb function to call when an event with eventName is triggered
     * @param thisContext optional, if a thisContext is supplied, the callback function is bound to the given thisContext
     *
     * IMPORTANT; cb CANNOT BE arrow function if a thisContext is used, use function() {} instead
     */

  }, {
    key: "on",
    value: function on(eventName, cb, thisContext) {
      this.events[eventName] = this.events[eventName] || [];

      if (typeof thisContext !== "undefined") {
        this.events[eventName].push({
          cb: cb.bind(thisContext),
          orgCb: cb,
          thisContext: thisContext
        });
      } else {
        this.events[eventName].push(cb);
      }
    }
    /**
     * Unbind event
     *
     * @param eventName optional, Name of the event; if name not supplied all event listeners for all events will be removed
     * @param cb optional, if a callback is supplied, only event listeners using the supplied callback function will be removed
     * @param thisContext optional, if a callback is supplied, only event listeners using the supplied thisContext will be removed
     */

  }, {
    key: "off",
    value: function off(eventName, cb, thisContext) {
      if (eventName === undefined) {
        this.events = {};
        this.eventsOnce = {};
        return;
      }

      if (cb !== undefined) {
        if (thisContext !== undefined) {
          if (eventName in this.events) {
            var _iterator = _createForOfIteratorHelper(this.events[eventName].entries()),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _step$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step.value, 2),
                    i = _step$value[0],
                    event = _step$value[1];

                var curEvent = event;

                if (curEvent.orgCb === cb && curEvent.thisContext === thisContext) {
                  this.events[eventName].splice(i, 1);
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }

          if (eventName in this.eventsOnce) {
            var _iterator2 = _createForOfIteratorHelper(this.eventsOnce[eventName].entries()),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _step2$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step2.value, 2),
                    _i = _step2$value[0],
                    _event = _step2$value[1];

                var _curEvent = _event;

                if (_curEvent.orgCb === cb && _curEvent.thisContext === thisContext) {
                  this.eventsOnce[eventName].splice(_i, 1);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } else {
          if (eventName in this.events) {
            var _iterator3 = _createForOfIteratorHelper(this.events[eventName].entries()),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _step3$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step3.value, 2),
                    _i2 = _step3$value[0],
                    _event2 = _step3$value[1];

                var _curEvent2 = _event2;

                if (_curEvent2 === cb) {
                  this.events[eventName].splice(_i2, 1);
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }

          if (eventName in this.eventsOnce) {
            var _iterator4 = _createForOfIteratorHelper(this.eventsOnce[eventName].entries()),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _step4$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step4.value, 2),
                    _i3 = _step4$value[0],
                    _event3 = _step4$value[1];

                var _curEvent3 = _event3;

                if (_curEvent3 === cb) {
                  this.eventsOnce[eventName].splice(_i3, 1);
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        }
      } else {
        this.events[eventName] = [];
        this.eventsOnce[eventName] = [];
      }
    }
    /**
     * Fire the event running all the event associated to it
     *
     * @param eventName
     * @param args
     */

  }, {
    key: "trigger",
    value: function trigger(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (eventName in this.events) {
        var _iterator5 = _createForOfIteratorHelper(this.events[eventName]),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var event = _step5.value;

            if (event !== null && event !== void 0 && event.cb) {
              var _ref;

              (_ref = event).cb.apply(_ref, args);
            } else {
              event.apply(void 0, args);
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }

      if (eventName in this.eventsOnce) {
        var _iterator6 = _createForOfIteratorHelper(this.eventsOnce[eventName].entries()),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _step6$value = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_step6.value, 2),
                i = _step6$value[0],
                _event4 = _step6$value[1];

            if (_event4 !== null && _event4 !== void 0 && _event4.cb) {
              var _ref2;

              (_ref2 = _event4).cb.apply(_ref2, args);

              this.eventsOnce[eventName].splice(i, 1);
            } else {
              _event4.apply(void 0, args);

              this.eventsOnce[eventName].splice(i, 1);
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }
  }]);

  return EventDispatcher;
}();

_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3___default()(EventDispatcher, "instances", {});

/***/ }),

/***/ "../../packages/events/src/services/index.ts":
/*!***************************************************!*\
  !*** ../../packages/events/src/services/index.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventDispatcher": function() { return /* reexport safe */ _event_dispatcher_service__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher; }
/* harmony export */ });
/* harmony import */ var _event_dispatcher_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-dispatcher.service */ "../../packages/events/src/services/event-dispatcher.service.ts");


/***/ }),

/***/ "../../packages/events/src/types/event-dispatcher.ts":
/*!***********************************************************!*\
  !*** ../../packages/events/src/types/event-dispatcher.ts ***!
  \***********************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/events/src/types/index.ts":
/*!************************************************!*\
  !*** ../../packages/events/src/types/index.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-dispatcher */ "../../packages/events/src/types/event-dispatcher.ts");
/* harmony import */ var _event_dispatcher__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _event_dispatcher__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _event_dispatcher__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


/***/ }),

/***/ "../../packages/ssr/src/binders/index.ts":
/*!***********************************************!*\
  !*** ../../packages/ssr/src/binders/index.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../packages/ssr/src/components/index.ts":
/*!**************************************************!*\
  !*** ../../packages/ssr/src/components/index.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../packages/ssr/src/formatters/index.ts":
/*!**************************************************!*\
  !*** ../../packages/ssr/src/formatters/index.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../packages/ssr/src/index.ts":
/*!***************************************!*\
  !*** ../../packages/ssr/src/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeOfComponent": function() { return /* reexport safe */ _ribajs_core__WEBPACK_IMPORTED_MODULE_1__.TypeOfComponent; },
/* harmony export */   "Component": function() { return /* reexport safe */ _ribajs_core__WEBPACK_IMPORTED_MODULE_1__.Component; },
/* harmony export */   "PageComponent": function() { return /* reexport safe */ _page_component__WEBPACK_IMPORTED_MODULE_2__.PageComponent; },
/* harmony export */   "SSRModule": function() { return /* reexport safe */ _ssr_module__WEBPACK_IMPORTED_MODULE_3__.SSRModule; }
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "../../packages/ssr/src/types/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_0__) if(["default","TypeOfComponent","Component","PageComponent","SSRModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _types__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ribajs/core */ "../../packages/core/src/index.ts");
/* harmony import */ var _page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-component */ "../../packages/ssr/src/page-component.ts");
/* harmony import */ var _ssr_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ssr.module */ "../../packages/ssr/src/ssr.module.ts");





/***/ }),

/***/ "../../packages/ssr/src/page-component.ts":
/*!************************************************!*\
  !*** ../../packages/ssr/src/page-component.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageComponent": function() { return /* binding */ PageComponent; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "../../packages/core/src/index.ts");











function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var PageComponent = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(PageComponent, _Component);

  var _super = _createSuper(PageComponent);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(PageComponent, [{
    key: "getEventData",
    value: function getEventData() {
      var data = {
        tagName: this.tagName.toLocaleLowerCase(),
        scope: this.scope
      };
      return data;
    }
  }]);

  function PageComponent() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PageComponent);

    _this = _super.call(this);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "events", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "ctx", void 0);

    _this.ctx = window.ssr.ctx;
    _this.events = window.ssr.events;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(PageComponent, [{
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(PageComponent.prototype), "afterBind", this).call(this);

              case 2:
                data = this.getEventData();
                this.events.trigger("PageComponent:afterBind", data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(PageComponent.prototype), "beforeBind", this).call(this);

              case 2:
                data = this.getEventData();
                this.events.trigger("PageComponent:beforeBind", data);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }]);

  return PageComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__.Component);

/***/ }),

/***/ "../../packages/ssr/src/polyfills/index.ts":
/*!*************************************************!*\
  !*** ../../packages/ssr/src/polyfills/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../packages/ssr/src/services/index.ts":
/*!************************************************!*\
  !*** ../../packages/ssr/src/services/index.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../packages/ssr/src/ssr.module.ts":
/*!********************************************!*\
  !*** ../../packages/ssr/src/ssr.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SSRModule": function() { return /* binding */ SSRModule; }
/* harmony export */ });
/* harmony import */ var _types_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/global */ "../../packages/ssr/src/types/global.ts");
/* harmony import */ var _binders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binders */ "../../packages/ssr/src/binders/index.ts");
/* harmony import */ var _formatters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formatters */ "../../packages/ssr/src/formatters/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services */ "../../packages/ssr/src/services/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components */ "../../packages/ssr/src/components/index.ts");





var SSRModule = {
  binders: _binders__WEBPACK_IMPORTED_MODULE_1__,
  services: _services__WEBPACK_IMPORTED_MODULE_3__,
  formatters: _formatters__WEBPACK_IMPORTED_MODULE_2__,
  components: _components__WEBPACK_IMPORTED_MODULE_4__
};

/***/ }),

/***/ "../../packages/ssr/src/types/global.ts":
/*!**********************************************!*\
  !*** ../../packages/ssr/src/types/global.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "../../packages/ssr/src/types/index.ts":
/*!*********************************************!*\
  !*** ../../packages/ssr/src/types/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _page_component_after_bind_event_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-component-after-bind-event-data */ "../../packages/ssr/src/types/page-component-after-bind-event-data.ts");
/* harmony import */ var _page_component_after_bind_event_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_page_component_after_bind_event_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _page_component_after_bind_event_data__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _page_component_after_bind_event_data__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route */ "../../packages/ssr/src/types/route.ts");
/* harmony import */ var _route__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_route__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _route__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _route__WEBPACK_IMPORTED_MODULE_1__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _shared_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared-context */ "../../packages/ssr/src/types/shared-context.ts");
/* harmony import */ var _shared_context__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_shared_context__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _shared_context__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _shared_context__WEBPACK_IMPORTED_MODULE_2__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _template_engines__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-engines */ "../../packages/ssr/src/types/template-engines.ts");
/* harmony import */ var _template_engines__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_template_engines__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _template_engines__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _template_engines__WEBPACK_IMPORTED_MODULE_3__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _theme_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./theme-config */ "../../packages/ssr/src/types/theme-config.ts");
/* harmony import */ var _theme_config__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_theme_config__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _theme_config__WEBPACK_IMPORTED_MODULE_4__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _theme_config__WEBPACK_IMPORTED_MODULE_4__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);






/***/ }),

/***/ "../../packages/ssr/src/types/page-component-after-bind-event-data.ts":
/*!****************************************************************************!*\
  !*** ../../packages/ssr/src/types/page-component-after-bind-event-data.ts ***!
  \****************************************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/ssr/src/types/route.ts":
/*!*********************************************!*\
  !*** ../../packages/ssr/src/types/route.ts ***!
  \*********************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/ssr/src/types/shared-context.ts":
/*!******************************************************!*\
  !*** ../../packages/ssr/src/types/shared-context.ts ***!
  \******************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/ssr/src/types/template-engines.ts":
/*!********************************************************!*\
  !*** ../../packages/ssr/src/types/template-engines.ts ***!
  \********************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/ssr/src/types/theme-config.ts":
/*!****************************************************!*\
  !*** ../../packages/ssr/src/types/theme-config.ts ***!
  \****************************************************/
/***/ (function() {



/***/ }),

/***/ "../../packages/utils/src/color.ts":
/*!*****************************************!*\
  !*** ../../packages/utils/src/color.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomColor": function() { return /* binding */ getRandomColor; }
/* harmony export */ });
/**
 * Generates a random color
 * @see https://stackoverflow.com/a/1484514/1465919
 */
var getRandomColor = function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

/***/ }),

/***/ "../../packages/utils/src/control.ts":
/*!*******************************************!*\
  !*** ../../packages/utils/src/control.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "times": function() { return /* binding */ times; },
/* harmony export */   "deferred": function() { return /* binding */ deferred; },
/* harmony export */   "debounce": function() { return /* binding */ debounce; },
/* harmony export */   "throttle": function() { return /* binding */ throttle; }
/* harmony export */ });
var times = function times(n, cb) {
  for (var i = 0; i < n; i++) {
    cb();
  }
};
/**
 * Return a new "Deferred" object
 * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
 *
 * @return
 */

var deferred = function deferred() {
  var obj = {};
  var prom = new Promise(function (resolve, reject) {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  obj.promise = prom;
  return obj;
};
/**
 * The debounce function receives our function as a parameter
 * It is recommended to use this method for scroll events, but the event should still be passive
 * This method uses uses internaly the requestAnimationFrame method
 * @see https://css-tricks.com/styling-based-on-scroll-position/
 * @see https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
 */

var debounce = function debounce(fn) {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  var frame; // The debounce function returns a new function that can receive a variable number of arguments

  return function () {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    } // Queue our function call for the next frame


    frame = requestAnimationFrame(function () {
      // Call our function and pass any params we received
      fn.apply(void 0, params);
    });
  };
};
/**
 * The throttle function receives our function as a parameter
 * It is recommended to use this method for resize events
 * Throttling is a technique in which, no matter how many times the user fires the event, the attached function will be executed only once in a given time interval.
 * @see https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript
 * @see https://gist.github.com/peduarte/969217eac456538789e8fac8f45143b4
 */

var throttle = function throttle(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var timerId = null;
  return function () {
    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }

    if (timerId === null) {
      timerId = window.setTimeout(function () {
        fn.apply(void 0, params);
        timerId = null;
      }, wait);
    }
  };
};

/***/ }),

/***/ "../../packages/utils/src/dom.ts":
/*!***************************************!*\
  !*** ../../packages/utils/src/dom.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MAX_UID": function() { return /* binding */ MAX_UID; },
/* harmony export */   "hasChildNodesTrim": function() { return /* binding */ hasChildNodesTrim; },
/* harmony export */   "getInputValue": function() { return /* binding */ getInputValue; },
/* harmony export */   "elementIsHidden": function() { return /* binding */ elementIsHidden; },
/* harmony export */   "elementIsVisable": function() { return /* binding */ elementIsVisable; },
/* harmony export */   "scrollTo": function() { return /* binding */ scrollTo; },
/* harmony export */   "getElementFromEvent": function() { return /* binding */ getElementFromEvent; },
/* harmony export */   "getViewportDimensions": function() { return /* binding */ getViewportDimensions; },
/* harmony export */   "isInViewport": function() { return /* binding */ isInViewport; },
/* harmony export */   "selectAll": function() { return /* binding */ selectAll; },
/* harmony export */   "ready": function() { return /* binding */ ready; },
/* harmony export */   "loadScript": function() { return /* binding */ loadScript; },
/* harmony export */   "getUID": function() { return /* binding */ getUID; },
/* harmony export */   "isCustomElement": function() { return /* binding */ isCustomElement; },
/* harmony export */   "htmlToElement": function() { return /* binding */ htmlToElement; },
/* harmony export */   "htmlToElements": function() { return /* binding */ htmlToElements; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);


var MAX_UID = 1000;
/**
 * Calls el.hasChildNodes but ignores empty strings, the default hasChildNodes would return ture on `<div> </div>`.
 * Very useful to check within a component if the component has set child elements to load or overwrite the component template
 * @param el
 */

var hasChildNodesTrim = function hasChildNodesTrim(el) {
  if (!el.hasChildNodes()) {
    return false;
  }

  var childNodes = el.childNodes;

  if (childNodes.length === 1 && childNodes[0].nodeType === 3) {
    var _childNodes$0$nodeVal;

    if (!childNodes[0].nodeValue || ((_childNodes$0$nodeVal = childNodes[0].nodeValue) === null || _childNodes$0$nodeVal === void 0 ? void 0 : _childNodes$0$nodeVal.trim()) === "") {
      return false;
    }
  }

  return true;
};
/**
 *
 */

var getInputValue = function getInputValue(el) {
  var results = [];

  if (el.type === "checkbox") {
    return el.checked;
  } else if (el.type === "select-multiple") {
    var options = el.options;

    for (var key in options) {
      if (options[key]) {
        var option = options[key];

        if (option.selected) {
          results.push(option.value);
        }
      }
    }

    return results;
  } else if (el.hasAttribute("contenteditable")) {
    return el.innerHTML; // TODO write test for contenteditable
  } else {
    return el.value;
  }
};
var elementIsHidden = function elementIsHidden(el) {
  return el.hasAttribute("hidden") || el.style.display === "none" || el.style.visibility === "hidden" || window.getComputedStyle(el).display === "none" || window.getComputedStyle(el).visibility === "hidden";
};
var elementIsVisable = function elementIsVisable(el) {
  return !elementIsHidden(el);
};
/**
 * Scrolls to an element by event and selector
 *
 * Attributes:
 *  * scroll-element="query-selector"
 * @see https://stackoverflow.com/a/31987330
 * @param element
 * @param to
 * @param duration
 */

var scrollTo = function scrollTo(to, offset, scrollElement) {
  var angle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "vertical";
  var behavior = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "smooth";

  if (!scrollElement) {
    scrollElement = window;
  }

  var top = 0;
  var left = 0;

  if (typeof scrollElement.pageYOffset === "number") {
    if (angle === "vertical") {
      top = to.getBoundingClientRect().top + scrollElement.pageYOffset - offset;
    } else {
      left = to.getBoundingClientRect().left + scrollElement.pageXOffset - offset;
    }
  } else {
    if (angle === "vertical") {
      top = to.offsetTop - offset;
    } else {
      left = to.offsetLeft - offset;
    }
  } // if is is window to scroll


  scrollElement.scroll({
    behavior: behavior,
    left: left,
    top: top
  });
};
var getElementFromEvent = function getElementFromEvent(event) {
  var el = event.target || event.currentTarget || event.relatedTarget || // JQuery event
  event.delegateTarget || event.fromElement;
  return el;
};
var getViewportDimensions = function getViewportDimensions() {
  var w = Math.max(document.documentElement ? document.documentElement.clientWidth : 0, window.innerWidth || 0);
  var h = Math.max(document.documentElement ? document.documentElement.clientHeight : 0, window.innerHeight || 0);
  return {
    h: h,
    w: w
  };
};
/**
 * Determine if an element is in the viewport
 * @param elem The element
 * @return Returns true if element is in the viewport
 */

var isInViewport = function isInViewport(elem) {
  var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var offsetBottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!elem) {
    return false;
  }

  var distance = elem.getBoundingClientRect();
  return distance.top + distance.height >= offsetBottom && distance.bottom - distance.height <= offsetTop;
};
/**
 * Select all of an contenteditable or input element
 * @param element The element you want to select
 */

var selectAll = function selectAll(element) {
  // need setTimeout for safari
  setTimeout(function () {
    if (typeof element.selectionStart !== "undefined") {
      element.selectionStart = 0;
      element.selectionEnd = 999;
    }

    if (typeof element.select === "function") {
      element.select();
    }

    if (typeof element.setSelectionRange === "function") {
      element.setSelectionRange(0, 999);
    }

    if (window.getSelection) {
      var range = document.createRange();
      range.selectNodeContents(element);
      var selection = window.getSelection();

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        selection.selectAllChildren(element);
      }
    }

    if (document.body.createTextRange) {
      var _range = document.body.createTextRange(); // Creates TextRange object


      _range.moveToElementText(element); // sets Range


      _range.select(); // make selection.

    }

    if (document.execCommand) {
      document.execCommand("selectAll", false, undefined);
    }
  }, 0);
};
/**
 * Cross-browser Document Ready check
 * @see https://www.competa.com/blog/cross-browser-document-ready-with-vanilla-javascript/
 * @param callback
 */

var ready = function ready(callback) {
  if (!callback || typeof callback !== "function") {
    return new Error("The callback is required!");
  }

  var checkReady = function checkReady() {
    if (document.readyState !== "loading") {
      callback();

      if (document.attachEvent) {
        document.detachEvent("onreadystatechange", checkReady);
      }

      document.removeEventListener("DOMContentLoaded", checkReady);
    }
  };

  if (document.attachEvent) {
    document.attachEvent("onreadystatechange", checkReady);
  }

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", checkReady);
  }

  checkReady();
};
var loadScript = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(src, id) {
    var async,
        defer,
        script,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            async = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;
            defer = _args.length > 3 && _args[3] !== undefined ? _args[3] : true;
            _context.next = 4;
            return new Promise(function (resolve, reject) {
              var script = document.getElementById(id);

              if (script) {
                console.warn("script already loaded, do nothing.");

                if (script.hasAttribute("loaded")) {
                  return resolve(script);
                }
              } else {
                script = document.createElement("script");
                script.type = "text/javascript";
                script.id = id;
                script.src = src;

                if (async) {
                  script.async = true;
                }

                if (defer) {
                  script.defer = true;
                }

                document.getElementsByTagName("head")[0].appendChild(script);
              } // IE


              if (script.readyState) {
                script.onreadystatechange = function () {
                  if (script.readyState === "loaded" || script.readyState === "complete") {
                    var _script;

                    script.onreadystatechange = null;
                    (_script = script) === null || _script === void 0 ? void 0 : _script.setAttribute("loaded", "true");
                    resolve(script);
                  }
                };
              } // Other browsers


              script.addEventListener("load", function () {
                var _script2;

                (_script2 = script) === null || _script2 === void 0 ? void 0 : _script2.setAttribute("loaded", "true");
                resolve(script);
              });
              script.addEventListener("error", function () {
                var _script3, _console;

                var error = new Error("Error on load script " + ((_script3 = script) === null || _script3 === void 0 ? void 0 : _script3.src));
                console.error(error);

                (_console = console).error.apply(_console, arguments);

                reject(error);
              });
            });

          case 4:
            script = _context.sent;
            return _context.abrupt("return", script);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadScript(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getUID = function getUID(prefix) {
  do {
    prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix));

  return prefix;
};
/**
 * Detects if dom element is custom element or native / default html element
 * @see https://stackoverflow.com/a/47737765/1465919
 * @param element The element you want to test
 */

var isCustomElement = function isCustomElement(element) {
  var mustBeRegistred = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // A custom element's name is required to contain a -, whereas an HTML-defined element will not. So:
  var isCustomElement = element.tagName.indexOf("-") !== -1;

  if (isCustomElement && mustBeRegistred && customElements) {
    return !!customElements.get(element.tagName.toLocaleLowerCase());
  }

  return isCustomElement;
};
/**
 * Creating a new DOM element from an HTML string
 * @param html representing a single element
 * @example
 * ```js
 *   const td = htmlToElement("<td>foo</td>");
 *   const div = htmlToElement("<div><span>nested</span> <span>stuff</span></div>");
 * ```
 */

var htmlToElement = function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result

  template.innerHTML = html;
  return template.content.firstChild;
};
/**
 * Creating a new DOM elements from an HTML string
 * @param html representing any number of sibling elements
 * @example
 * ```js
 *   var rows = htmlToElements('<tr><td>foo</td></tr><tr><td>bar</td></tr>');
 * ```
 */

var htmlToElements = function htmlToElements(html) {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
};

/***/ }),

/***/ "../../packages/utils/src/type.ts":
/*!****************************************!*\
  !*** ../../packages/utils/src/type.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "couldBeJson": function() { return /* binding */ couldBeJson; },
/* harmony export */   "isJson": function() { return /* binding */ isJson; },
/* harmony export */   "isUndefined": function() { return /* binding */ isUndefined; },
/* harmony export */   "isDefined": function() { return /* binding */ isDefined; },
/* harmony export */   "isObject": function() { return /* binding */ isObject; },
/* harmony export */   "getString": function() { return /* binding */ getString; },
/* harmony export */   "getNumber": function() { return /* binding */ getNumber; },
/* harmony export */   "parseJsonString": function() { return /* binding */ parseJsonString; },
/* harmony export */   "isFunction": function() { return /* binding */ isFunction; },
/* harmony export */   "isArray": function() { return /* binding */ isArray; },
/* harmony export */   "isNumber": function() { return /* binding */ isNumber; },
/* harmony export */   "isBoolean": function() { return /* binding */ isBoolean; },
/* harmony export */   "isString": function() { return /* binding */ isString; },
/* harmony export */   "stringHasNumber": function() { return /* binding */ stringHasNumber; },
/* harmony export */   "stringHasOnlyNumbers": function() { return /* binding */ stringHasOnlyNumbers; },
/* harmony export */   "stringIsPhoneNumber": function() { return /* binding */ stringIsPhoneNumber; },
/* harmony export */   "justDigits": function() { return /* binding */ justDigits; },
/* harmony export */   "escapeHtml": function() { return /* binding */ escapeHtml; },
/* harmony export */   "withoutSpecialChars": function() { return /* binding */ withoutSpecialChars; },
/* harmony export */   "withoutMultiWhitespace": function() { return /* binding */ withoutMultiWhitespace; },
/* harmony export */   "handleize": function() { return /* binding */ handleize; },
/* harmony export */   "stripHtml": function() { return /* binding */ stripHtml; },
/* harmony export */   "camelCase": function() { return /* binding */ camelCase; },
/* harmony export */   "extend": function() { return /* binding */ extend; },
/* harmony export */   "concat": function() { return /* binding */ concat; },
/* harmony export */   "clone": function() { return /* binding */ clone; },
/* harmony export */   "classOf": function() { return /* binding */ classOf; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../.yarn/cache/@babel-runtime-npm-7.12.5-b3edb8ee8e-423fb00793.zip/node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

var couldBeJson = function couldBeJson(str) {
  if (!str || typeof str !== "string") {
    return false;
  }

  str = str.trim();
  return str.charAt(0) === "{" || str.charAt(0) === "[";
};
/**
 * Test if string is a json string
 * @param str
 */

var isJson = function isJson(str) {
  if (!str) {
    return false;
  }

  try {
    var val = JSON.parse(str);
    return Array.isArray(val) || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(val) === "object" ? true : false;
  } catch (error) {
    return false;
  }
};
/**
 * Check if value is undefined
 */

var isUndefined = function isUndefined(value) {
  return typeof value === "undefined";
};
/**
 * Check if value is undefined
 */

var isDefined = function isDefined(value) {
  return !isUndefined(value);
};
/**
 * Check if type is Object
 * @see https://stackoverflow.com/a/4775737/1465919
 */

var isObject = function isObject(obj) {
  return isDefined(obj) && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(obj) === "object" && obj !== null;
};
/**
 * Parse value to string or return undefined if value is null
 * @param value
 */

var getString = function getString(value) {
  return value !== null && value !== void 0 && value.toString ? value.toString() : undefined;
};
/**
 * Parse value to number or return 0 if value is null or undefined
 * @param value
 */

var getNumber = function getNumber(value) {
  return value ? parseFloat(value) : undefined;
};
/**
 * Parses a json string with the special feature that json strings
 * can also havesingle quotations for defining the properties and values
 */

var parseJsonString = function parseJsonString(value) {
  var object = null;

  if (couldBeJson(value)) {
    if (isJson(value)) {
      object = JSON.parse(value) || null;
    } else {
      try {
        // Transform an invalid json string with single quotation to a valid json string with double quotation
        object = JSON.parse(value.replace(/'/g, '"')) || null;
      } catch (error) {
        console.warn(error);
      }
    }
  }

  return object;
};
/**
 * Check if value is a function
 */

var isFunction = function isFunction(value) {
  return typeof value === "function";
};
/**
 * Check if variable is an Array
 * @see https://stackoverflow.com/a/4775737/1465919
 */

var isArray = function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};
/**
 * Check whether variable is number or a string with numbers in JavaScript
 * @see https://stackoverflow.com/a/1421988/1465919
 */

var isNumber = function isNumber(value) {
  return !isNaN(parseFloat(value)) && !isNaN(value - 0);
};
/**
 * Check if type is Boolean
 * @see https://stackoverflow.com/a/28814615/1465919
 */

var isBoolean = function isBoolean(value) {
  return _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value) === _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(true);
};
/**
 * Check if value is a string
 */

var isString = function isString(value) {
  return isDefined(value) && typeof value === "string";
};
/**
 * Check if string contains a number
 */

var stringHasNumber = function stringHasNumber(value) {
  return isString(value) && /\d/.test(value);
};
/**
 * Check if string contains only numbers
 */

var stringHasOnlyNumbers = function stringHasOnlyNumbers(value) {
  return /^\d+$/.test(value);
};
/**
 * Check if string contains only numbers, +, - and ()
 */

var stringIsPhoneNumber = function stringIsPhoneNumber(value) {
  return /^[0-9 ()+-]+$/.test(value);
};
/**
 * Just get the digits of a string, useful to remove px pixel from css value
 *
 * @see http://stackoverflow.com/a/1100653/1465919
 */

var justDigits = function justDigits(str) {
  var num = str.replace(/[^-\d.]/g, "");

  if (!isNumber(num)) {
    return 0;
  } else {
    return Number(num);
  }
};
var escapeHtml = function escapeHtml(str) {
  var tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return str.replace(/[&<>]/g, function (tag) {
    return tagsToReplace[tag] || tag;
  });
};
/**
 * Remove all special chars from a string
 * @see https://stackoverflow.com/a/11090301/1465919
 * @param str
 */

var withoutSpecialChars = function withoutSpecialChars(str) {
  // str = str.replace(/[^\w\s]/gi, ""); // http://stackoverflow.com/a/4374890
  str = str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, "");
  return str;
};
/**
 * Removes multiple tabs, newlines, etc from a string
 * @param str
 */

var withoutMultiWhitespace = function withoutMultiWhitespace(str) {
  str = str.replace(/\s\s+/g, " ");
  return str;
};
/**
 * Formats a string into a handle.
 * E.g. '100% M & Ms!!!' -> 100-m-ms
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */

var handleize = function handleize(str) {
  str = str.trim();
  str = withoutMultiWhitespace(str);
  str = withoutSpecialChars(str);
  str = str.toLowerCase();
  str = str.replace(/ /g, "-");
  return str;
};
var stripHtml = function stripHtml(html) {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
/**
 * Returns a camel-cased version of the string. Used when translating an
 * element's attribute name into a property name for the component's scope.
 * @param string
 */

var camelCase = function camelCase(str) {
  return str.replace(/-([a-z0-9])/g, function (grouped) {
    return grouped[1].toUpperCase();
  });
};
/**
 * Merge the contents of two or more objects together into the first object.
 * @param deep If true, the merge becomes recursive (aka. deep copy).
 * @param target An object that will receive the new properties
 * @param objects The objects containing additional properties to merge in.
 * @see http://www.damirscorner.com/blog/posts/20180216-VariableNumberOfArgumentsInTypescript.html
 * Copied from here:
 * @see https://gomakethings.com/merging-objects-with-vanilla-javascript/
 */

var extend = function extend(deep) {
  var extended = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Merge the object into the extended object
  var merge = function merge(obj) {
    for (var prop in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
          // If we're doing a deep merge and the property is an object
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          // Otherwise, do a regular merge
          extended[prop] = obj[prop];
        }
      }
    }
  }; // Loop through each object and conduct a merge


  for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
    merge(i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2]);
  }

  return extended;
};
/**
 * Concat the contents of two objects together into the first object and return the concatenated object.
 * @param deep If true, the merge becomes recursive (aka. deep copy).
 * @param object1 An first object containing properties to concat.
 * @param object2 The second object containing properties to concat.
 *
 * Note: This is actually just the same as extend with only two objects. Redundant.
 */

var concat = function concat(deep, object1, object2) {
  object1 = extend(deep, object1 || {}, object2 || {});
  return object1;
};
/**
 * Clone an object or array
 * @param deep If true, the merge becomes recursive (aka. deep copy).
 * @param val The value(s) to clone
 */

var clone = function clone(deep, val) {
  if (isArray(val)) {
    if (deep) {
      return val.map(function (x) {
        return clone(true, x);
      });
    } else {
      return val.slice();
    }
  }

  if (isObject(val)) {
    return extend(deep, {}, val);
  }

  if (isString(val)) {
    return val.repeat(1);
  }

  return val;
};
/**
 * Get the class "that"
 * @param that
 */

var classOf = function classOf(that) {
  return that.constructor;
};
/**
 * TODO: Would like to do it with class parameter T for the parent class:
 *
   export function classOf<T = any>(that: T) {
     return that.constructor as typeof T;
   };
 *
 * but getting TypeScript error:
 * Property 'constructor' does not exist on type 'T'.
 */

/***/ }),

/***/ "./scripts/pages/index/index.component.pug":
/*!*************************************************!*\
  !*** ./scripts/pages/index/index.component.pug ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var pug = __webpack_require__(/*! !../../../../../.yarn/cache/pug-runtime-npm-3.0.0-3303fdf473-9069763e1b.zip/node_modules/pug-runtime/index.js */ "../../.yarn/cache/pug-runtime-npm-3.0.0-3303fdf473-9069763e1b.zip/node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"container-fluid py-5 my-5 text-center\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-12\"\u003E\u003Ch1 rv-html=\"title\"\u003E\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Csection class=\"row\"\u003E\u003Cdiv class=\"col-12\"\u003E\u003Cp rv-html=\"content\"\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003Crv-logger rv-log-me=\"content\"\u003E\u003C\u002Frv-logger\u003E\u003Crv-logger rv-log-me=\"obj | json\"\u003E\u003C\u002Frv-logger\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "./scripts/pages/pages/pages.component.pug":
/*!*************************************************!*\
  !*** ./scripts/pages/pages/pages.component.pug ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var pug = __webpack_require__(/*! !../../../../../.yarn/cache/pug-runtime-npm-3.0.0-3303fdf473-9069763e1b.zip/node_modules/pug-runtime/index.js */ "../../.yarn/cache/pug-runtime-npm-3.0.0-3303fdf473-9069763e1b.zip/node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"container container-md py-5 my-5 text-center\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-12\"\u003E\u003Ch1 rv-html=\"title\"\u003E\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Csection class=\"row\"\u003E\u003Cdiv class=\"col-12\"\u003E\u003Cdiv rv-template=\"content\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),

/***/ "?65c5":
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/***/ (function() {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = function() {}
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./scripts/ssr.ts","vendors"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = function() {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			var executeModules = data[3];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_ribajs_examples_nest_riba_ssr_theme"] = self["webpackChunk_ribajs_examples_nest_riba_ssr_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = function() {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (function() {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;