/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/enemy.js":
/*!*********************************!*\
  !*** ./src/js/modules/enemy.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Enemy; }
/* harmony export */ });
const sky = document.querySelector('.sky');

class Enemy {
    constructor() {

        let enemyShip = document.createElement('img');
        enemyShip.style.width = '70px';
        enemyShip.style.height = '90px';
        // enemyShip.style.borderRadius = '10px';

        function enemyType() {
            let i = Math.round(Math.random() * 10);
            if(i <= 2) {
                // enemyShip.style.backgroundColor = 'pink';
                enemyShip.src = 'img/kisspng.png';
            } else if(i > 2 && i < 5) {
                enemyShip.src = 'img/pngegg.png';
            } else if(i >= 5 && i < 7) {
                enemyShip.src = 'img/pngegg(2).png';
            } else if(i >= 7 && i < 9) {
                enemyShip.src = 'img/pngegg(5).png';
            } else {
                enemyShip.src = 'img/pngegg(3).png';
            }
        }

        enemyType();
        enemyShip.style.position = 'absolute';
        enemyShip.style.top = '0px';

        function enemyStart() {
            let i = Math.round(Math.random() * 10);
            if (i == 10) {
                i = i - 1;
            }
            enemyShip.style.right = (i *10) + '%';
        }

        enemyStart();
        sky.append(enemyShip);
        
        function enemyMove() {
            let distance = +enemyShip.style.top.slice(0, -2);
            if(enemyShip.getBoundingClientRect().bottom < sky.getBoundingClientRect().bottom) {
                distance = distance + 1 + 'px';
                enemyShip.style.top = distance;
                enemyCrash();
            } else{
                enemyShip.remove();
                clearInterval(enemyMove);
            }
        }
        setInterval(enemyMove, 10);
        
        
        function enemyCrash() {
            let projectiles = document.querySelectorAll('.projectile');
            projectiles.forEach((item) => {
                if(
                    item.getBoundingClientRect().top < enemyShip.getBoundingClientRect().bottom &&
                    item.getBoundingClientRect().bottom < enemyShip.getBoundingClientRect().bottom &&
                    item.getBoundingClientRect().left >= enemyShip.getBoundingClientRect().left &&
                    item.getBoundingClientRect().right <= enemyShip.getBoundingClientRect().right
                    ) {
                        enemyBang(true);
                        enemyShip.remove();
                        item.remove();
                    }
                
            });
        }

        function enemyBang(arg) {
            const canvas = document.createElement('canvas'),
                  ctx = canvas.getContext('2d'),
                  sprite = new Image();

            canvas.style.width = '140px';
            canvas.style.height = '140px';
            canvas.style.position = 'absolute';
            canvas.style.top = enemyShip.style.top;
            canvas.style.right = enemyShip.style.right;
            canvas.style.transform = 'translateX(30%)';
            sprite.src = 'img/sprite.png';
            sky.append(canvas);

            let tickCount = 0,
                spriteLenght = 8,
                frameWidth = 0,
                frameHight = 0;

            if(arg === true) {
                tick();
                setTimeout(() => canvas.remove(), 1000);
            }

            function tick() {
                draw();
                if(tickCount < spriteLenght) {
                    frameWidth = frameWidth + 240;
                }
                if(tickCount == spriteLenght) {
                    tickCount = 0;
                    frameHight = frameHight + 240;
                    frameWidth = 0;
                }
                requestAnimationFrame(tick);
                tickCount++;
            }
            
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(sprite, frameWidth, frameHight, 240, 240, 0, 0, canvas.width, canvas.height);
            }
        }
        
    }
}

/***/ }),

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

        moveUp(35);
        moveDown(35);
        moveRight(35);
        moveLeft(35);
        
    function moveUp(i) {
        document.addEventListener('keydown', (e) => {

            if(e.code == 'KeyW' && (ship.getBoundingClientRect().top) > sky.getBoundingClientRect().top) {
                y = y - i;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveDown(i) {
        document.addEventListener('keydown', (e) => {
            if(e.code == 'KeyS' && (ship.getBoundingClientRect().bottom) < sky.getBoundingClientRect().bottom) {
                y = y + i;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveRight(i) {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if(e.code == 'KeyD' && (ship.getBoundingClientRect().right) < sky.getBoundingClientRect().right) {
                x = x + i;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveLeft(i) {
        document.addEventListener('keydown', (e) => {
            if(e.code == 'KeyA' && ship.getBoundingClientRect().left > sky.getBoundingClientRect().left) {
                x = x - i;
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
const ship = document.querySelector('.ship');
const sky = document.querySelector('.sky');
  

class Gun {
   constructor() {
       const projectile = document.createElement('div');
       projectile.classList.add('projectile');
       sky.append(projectile);
       projectile.style.left = (ship.getBoundingClientRect().left) + ((ship.getBoundingClientRect().width) / 2 - 3) +'px';
       projectile.style.top = ship.getBoundingClientRect().top - 15 + 'px';
       let distance = +projectile.style.top.slice(0, -2);
       
       function trajectory () {
           if (distance > 0) {
               distance = distance - 10;
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
/* harmony import */ var _modules_enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/enemy */ "./src/js/modules/enemy.js");






(0,_modules_move__WEBPACK_IMPORTED_MODULE_0__["default"])();

document.addEventListener('keydown', (event) => {
    if(event.code == 'Space') {
        new _modules_shot__WEBPACK_IMPORTED_MODULE_1__["default"];
    }
});

function makeEnemies() {
    new _modules_enemy__WEBPACK_IMPORTED_MODULE_2__["default"]();
}
// setInterval(makeEnemies, 2000);
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map