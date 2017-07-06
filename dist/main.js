window["ng1-html5-dnd"] =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() { module.exports = window["angular"]; }());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isString(x) {
  return typeof x === 'string' || x instanceof String;
}

function isObject(x) {
  return x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
}

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

exports.default = {
  isString: isString,
  isObject: isObject,
  isFunction: isFunction
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.module('ng1-html5-dnd', []);

__webpack_require__(3);
__webpack_require__(4);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


ngDraggableController.$inject = ["$rootScope", "$scope", "$element"];
var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _lang = __webpack_require__(1);

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.module('ng1-html5-dnd').directive('ngDraggable', ngDraggableDirective);

function ngDraggableDirective() {
  return {
    restrict: 'A',
    scope: {
      data: '=',
      allowDrag: '=',
      onDragStart: '=',
      onDrag: '=',
      onDragEnd: '=',
      dragEffect: '='
    },
    controller: ngDraggableController,
    controllerAs: 'vm'
  };
}

/* @ngInject */
function ngDraggableController($rootScope, $scope, $element) {
  var element = $element[0];

  initialize();

  function initialize() {
    validateInputs($scope);
    syncDOM();
    watchInputs();
    $element.on('$destroy', onDestroy);
  }

  function validateInputs(_ref) {
    var data = _ref.data,
        allowDrag = _ref.allowDrag,
        onDragStart = _ref.onDragStart,
        onDrag = _ref.onDrag,
        onDragEnd = _ref.onDragEnd,
        dragEffect = _ref.dragEffect;

    if (data && (!_lang2.default.isObject(data) || !_lang2.default.isString(data))) {
      throw new Error('only data of type Object or String is allowed');
    }
    if (allowDrag && !_lang2.default.isFunction(allowDrag)) {
      throw new Error('allowDrag must be a Function');
    }
    if (onDragStart && !_lang2.default.isFunction(onDragStart)) {
      throw new Error('onDragStart must be a Function');
    }
    if (onDrag && !_lang2.default.isFunction(onDrag)) {
      throw new Error('onDrag must be a Function');
    }
    if (onDragEnd && !_lang2.default.isFunction(onDragEnd)) {
      throw new Error('onDragEnd must be a Function');
    }
    if (dragEffect && !_lang2.default.isString(dragEffect)) {
      throw new Error('dragEffect must be a String');
    }
  }

  function watchInputs() {
    $scope.$watchGroup(['allowDrag', 'onDragStart', 'onDrag', 'onDragEnd', 'dragEffect'], function () {
      validateInputs($scope);
      syncDOM();
    });
  }

  function syncDOM() {
    element.draggable = true;
    element.ondragstart = onDragStartWrapper;
    element.ondrag = $scope.onDrag;
    element.ondragend = $scope.onDragEnd;
  }

  function onDragStartWrapper(e) {
    if (!$scope.allowDrag(e)) {
      return e.preventDefault();
    }

    if ($scope.data) {
      setData(e, $scope.data);
    }

    e.dataTransfer.dropEffect = $scope.dragEffect;
    if ($scope.onDragStart) {
      return $scope.onDragStart(e);
    }
    return true;
  }

  function setData(e, data) {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      data: data
    }));
  }

  function onDestroy() {
    element.draggable = null;
    element.ondragstart = null;
    element.ondrag = null;
    element.ondragend = null;
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


ngDroppableController.$inject = ["$rootScope", "$scope", "$element"];
var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _lang = __webpack_require__(1);

var _lang2 = _interopRequireDefault(_lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_angular2.default.module('ng1-html5-dnd').directive('ngDroppable', ngDroppableDirective);

function ngDroppableDirective() {
  return {
    restrict: 'A',
    scope: {
      onDragEnter: '=',
      onDragOver: '=',
      onDrop: '=',
      allowDrop: '='
    },
    controller: ngDroppableController
  };
}

/* @ngInject */
function ngDroppableController($rootScope, $scope, $element) {
  var element = $element[0];

  initialize();

  function initialize() {
    validateInputs($scope);
    syncDOM();
    watchInputs();
    $element.on('$destroy', onDestroy);
  }

  function validateInputs(_ref) {
    var onDragEnter = _ref.onDragEnter,
        onDragOver = _ref.onDragOver,
        onDrop = _ref.onDrop,
        allowDrop = _ref.allowDrop;

    if (onDragEnter && !_lang2.default.isFunction(onDragEnter)) {
      throw new Error('onDragEnter must be a Function');
    }
    if (onDragOver && !_lang2.default.isFunction(onDragOver)) {
      throw new Error('onDragOver must be a Function');
    }
    if (onDrop && !_lang2.default.isFunction(onDrop)) {
      throw new Error('onDrop must be a Function');
    }
    if (allowDrop && !_lang2.default.isFunction(allowDrop)) {
      throw new Error('allowDrop must be a Function');
    }
  }

  function watchInputs() {
    $scope.$watchGroup(['onDragEnter', 'onDragOver', 'onDrop'], syncDOM);
  }

  function syncDOM() {
    element.ondragenter = $scope.onDragEnter;
    element.ondragover = onDragOverWrapper;
    element.ondrop = onDropWrapper;
  }

  function onDragOverWrapper(e) {
    var data = getData(e);
    var allowDrop = $scope.allowDrop(e, data);
    if (allowDrop) {
      e.preventDefault();
    }
    if ($scope.onDragOver) {
      return $scope.onDragOver(e, data);
    }
    return !allowDrop;
  }

  function onDropWrapper(e) {
    var data = getData(e);
    if ($scope.onDrop) {
      return $scope.onDrop(e, data);
    }
    return null;
  }

  function getData(e) {
    var stringValue = e.dataTransfer.getData('text/plain');
    if (stringValue) {
      return JSON.parse(stringValue);
    }
    return null;
  }

  function onDestroy() {
    element.ondragenter = null;
    element.ondragover = null;
    element.ondrop = null;
  }
}

/***/ })
/******/ ]);