(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Handwrite"] = factory();
	else
		root["Handwrite"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helper = __webpack_require__(2);

var _Animation = __webpack_require__(1);

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Handwrite = function () {
	function Handwrite(canvas, image) {
		_classCallCheck(this, Handwrite);

		this.image = image;
		this.canvasArt = canvas;
		this.canvasMask = this.canvasArt.cloneNode();
		// document.body.appendChild(this.canvasMask)
		this.ctxArt = this.canvasArt.getContext('2d');
		this.ctxMask = this.canvasMask.getContext('2d');

		this.WIDTH = this.canvasArt.width;
		this.HEIGHT = this.canvasArt.height;

		this.defaultOptions = { fps: 40, brushSize: 6 };
		this.options;
		this.animation = new _Animation2.default();
	}

	_createClass(Handwrite, [{
		key: 'animationCallback',
		value: function animationCallback() {
			var item = this.points[this.index];
			if (item) {
				(0, _Helper.Circle)(this.ctxMask, item.x, item.y, this.options.brushSize);
			} else {
				this.onDone();
			}
			this.index++;
		}
	}, {
		key: 'draw',
		value: function draw(points, options) {
			this.points = points;
			this.index = 0;

			this.clear();
			this.options = _extends({}, this.defaultOptions, options);
			this.animation.startAnimating(this.options.fps, this.animationCallback.bind(this));
			this.keepRendering = true;
			this.render();
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.ctxArt.clearRect(0, 0, this.WIDTH, this.HEIGHT);
			this.ctxMask.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		}
	}, {
		key: 'onDone',
		value: function onDone() {
			this.animation.stop = true;
			this.keepRendering = false;
			this.drawArt();
		}
	}, {
		key: 'drawArt',
		value: function drawArt() {
			this.ctxArt.clearRect(0, 0, this.WIDTH, this.HEIGHT);
			this.ctxArt.drawImage(this.canvasMask, 0, 0);
			this.ctxArt.save();
			this.ctxArt.globalCompositeOperation = 'source-in';
			this.ctxArt.drawImage(this.image, 0, 0);
			this.ctxArt.restore();
		}
	}, {
		key: 'render',
		value: function render() {
			this.drawArt();
			// console.log(Math.random());
			if (!this.keepRendering) {
				return;
			}
			requestAnimationFrame(this.render.bind(this));
		}
	}]);

	return Handwrite;
}();

exports.default = Handwrite;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
	function Animation() {
		_classCallCheck(this, Animation);

		this.stop = false;
		this.frameCount = 0;

		this.fpsInterval;
		this.startTime;
		this.now;
		this.then;
		this.elapsed;
	}

	_createClass(Animation, [{
		key: "startAnimating",
		value: function startAnimating(fps, callback) {
			// console.log(this);
			this.callback = callback;
			this.fpsInterval = 1000 / fps;
			this.then = Date.now();
			this.startTime = this.then;
			this.animate();
		}
	}, {
		key: "animate",
		value: function animate() {

			// request another frame
			if (this.stop) {
				return;
			}
			requestAnimationFrame(this.animate.bind(this));

			// calc elapsed time since last loop

			this.now = Date.now();
			this.elapsed = this.now - this.then;
			// console.log(this.fpsInterval);
			// if enough time has elapsed, draw the next frame

			if (this.elapsed > this.fpsInterval) {

				// Get ready for next frame by setting then=now, but also adjust for your
				// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
				this.then = this.now - this.elapsed % this.fpsInterval;
				this.callback();
				// console.log(Math.random());
				// Put your drawing code here
			}
		}
	}]);

	return Animation;
}();

exports.default = Animation;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var PI = Math.PI;
// const color = '#ff0000'

function Circle(ctx, x, y) {
	var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 8;
	var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#ff0000';

	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * PI, false);
	ctx.fillStyle = color;
	ctx.fill();
}

exports.Circle = Circle;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Handwrite = __webpack_require__(0);

var _Handwrite2 = _interopRequireDefault(_Handwrite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Handwrite2.default;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map