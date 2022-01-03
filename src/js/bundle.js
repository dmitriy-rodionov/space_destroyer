/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/move.js":
/*!********************************!*\
  !*** ./src/js/modules/move.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const move = () => {
    const ship = document.querySelector('.ship');
    const sky = document.querySelector('.sky');
    let x = 0,
        y = 0;

        moveUp();
        moveDown();
        moveRight();
        moveLeft();
        
    function moveUp() {
        document.addEventListener('keydown', (e) => {

            if(e.code == 'KeyW' && (ship.getBoundingClientRect().top) > sky.getBoundingClientRect().top) {
                y = y - 40;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveDown() {
        document.addEventListener('keydown', (e) => {
            if(e.code == 'KeyS' && (ship.getBoundingClientRect().bottom) < sky.getBoundingClientRect().bottom) {
                y = y + 40;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveRight() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if(e.code == 'KeyD' && (ship.getBoundingClientRect().right) < sky.getBoundingClientRect().right) {
                x = x + 40;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveLeft() {
        document.addEventListener('keydown', (e) => {
            if(e.code == 'KeyA' && ship.getBoundingClientRect().left > sky.getBoundingClientRect().left) {
                x = x - 40;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    } 

};

/* harmony default export */ __webpack_exports__["default"] = (move);

/***/ }),

/***/ "./src/js/modules/shot.js":
/*!********************************!*\
  !*** ./src/js/modules/shot.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Gun; }
/* harmony export */ });
const gun = document.querySelector('.ship__head');
const sky = document.querySelector('.sky');
  

class Gun {
   constructor() {
       const projectile = document.createElement('div');
       projectile.classList.add('projectile');
       sky.append(projectile);
       projectile.style.left = (gun.getBoundingClientRect().left) + ((gun.getBoundingClientRect().width) / 2) +'px';
       projectile.style.top = gun.getBoundingClientRect().top + 'px';
       let distance = +projectile.style.top.slice(0, -2);
       
       function trajectory () {
           if (distance > 0) {
               distance = distance - 1;
               // projectile.style.transform = `translateY(-${distance}px)`;
               projectile.style.top = distance + 'px';
           } else{
               clearInterval(trajectory);
               projectile.remove();
           }
       }

       setInterval(trajectory, 10);
   }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_move__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/move */ "./src/js/modules/move.js");
/* harmony import */ var _modules_shot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/shot */ "./src/js/modules/shot.js");





(0,_modules_move__WEBPACK_IMPORTED_MODULE_0__["default"])();

document.addEventListener('keydown', (event) => {
    if(event.code == 'Space') {
        new _modules_shot__WEBPACK_IMPORTED_MODULE_1__["default"];
    }
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map