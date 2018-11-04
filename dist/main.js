/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dispatcher.ts":
/*!***************************!*\
  !*** ./src/dispatcher.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Dispatcher {\n    constructor() {\n        this._callbacks = [];\n    }\n    dispatch(obj) {\n        for (let i = 0; i < this._callbacks.length; i++) {\n            if (this._callbacks[i](obj)) {\n                break;\n            }\n        }\n    }\n    register(callback) {\n        this._callbacks.push(callback);\n    }\n}\nexports.default = Dispatcher;\n\n\n//# sourceURL=webpack:///./src/dispatcher.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst dispatcher_1 = __importDefault(__webpack_require__(/*! ./dispatcher */ \"./src/dispatcher.ts\"));\nlet AppDispatcher = new dispatcher_1.default();\nconst ListStore = {\n    _events: {},\n    currentPage: 'page2',\n    getAll: function () {\n        return this.currentPage;\n    },\n    bind: function (event, fct) {\n        this._events = this._events || {};\n        this._events[event] = this._events[event] || [];\n        this._events[event].push(fct);\n    },\n    trigger: function (event) {\n        this._events = this._events || {};\n        if (event in this._events === false)\n            return;\n        for (var i = 0; i < this._events[event].length; i++) {\n            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));\n        }\n    }\n};\nAppDispatcher.register(function (payload) {\n    switch (payload.eventName) {\n        case 'change-page':\n            ListStore.currentPage = payload.page;\n            ListStore.trigger && ListStore.trigger('change');\n            break;\n    }\n    return true; // Needed for Flux promise resolution\n});\nconst pageChanged = function () {\n    const currentPage = ListStore.currentPage;\n    const currentPageNode = document.querySelector('#' + currentPage);\n    document.querySelectorAll('.page').forEach(function (page) {\n        page.style.display = 'none';\n    });\n    currentPageNode.style.display = 'block';\n};\n//function which is subscribing on 'change'\nconst componentDidMount = function () {\n    ListStore.bind('change', pageChanged);\n};\nconst page1Button = document.querySelector('#page1_button');\nconst page2Button = document.querySelector('#page2_button');\nconst buttonCLick = function (event) {\n    event.preventDefault();\n    AppDispatcher.dispatch({\n        eventName: 'change-page',\n        page: event.target.value\n    });\n};\ncomponentDidMount();\npage1Button && page1Button.addEventListener('click', buttonCLick);\npage2Button && page2Button.addEventListener('click', buttonCLick);\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });