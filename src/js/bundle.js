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
const sky = document.querySelector('.sky'),
      ship = document.querySelector('.ship');

class Enemy {
    constructor() {

        let enemyShip = document.createElement('img');
        enemyShip.style.width = '70px';
        enemyShip.style.height = '90px';
        enemyShip.classList.add('enemy');
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
                    item.getBoundingClientRect().right <= enemyShip.getBoundingClientRect().right &&
                    ship.getBoundingClientRect().top > enemyShip.getBoundingClientRect().bottom
                    ) {
                        let counter = document.querySelector('.counter'),
                            count = +counter.textContent;
                        count++;
                        counter.textContent = count;
                        if(counter.textContent.length < 2) {
                            counter.textContent = '0' + counter.textContent;
                        }
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

        class EnemyGun {
            constructor() {
                const enemyProjectile = document.createElement('div');
                enemyProjectile.classList.add('enemyProjectile');
                enemyProjectile.style.left = (enemyShip.getBoundingClientRect().left) + (enemyShip.getBoundingClientRect().width / 2) +'px';
                enemyProjectile.style.top = enemyShip.getBoundingClientRect().bottom + 'px';
                if(enemyProjectile.style.left.slice(0, -2) > 0) {
                    sky.append(enemyProjectile);
                }
                // sky.append(enemyProjectile);
                let distance = +enemyProjectile.style.top.slice(0, -2);

                function trajectory () {
                    if (distance < sky.getBoundingClientRect().bottom) {
                        distance = distance + 5;
                        enemyProjectile.style.top = distance + 'px';
                    } 
                    if(distance > sky.getBoundingClientRect().bottom) {
                        clearInterval(timerId);
                        enemyProjectile.remove();
                    }
                    if(enemyProjectile.style.left.slice(0, -2) < 0) {
                        enemyProjectile.remove();
                    }
                }
                let timerId = setInterval(trajectory, 10);
            }
        }
        function createEnProj() {
            new EnemyGun
        }
        setInterval(createEnProj, 2500);
        
    }
}

/***/ }),

/***/ "./src/js/modules/lastEnemy.js":
/*!*************************************!*\
  !*** ./src/js/modules/lastEnemy.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const lastEnemy = () => {
    const le = document.createElement('img'),
          sky = document.querySelector('.sky');
    le.src = 'img/pngegg (1).png';
    le.style.width = '120px';
    le.style.height = '120px';
    le.style.position = 'absolute';
    le.style.top = '0px';
    le.style.left = '50%';
    sky.append(le);
    le.classList.add('lastEnemy');
    let enemyHealth = 100;

    class EnemyGun {
        constructor() {
            const enemyProjectile = document.createElement('div');
            enemyProjectile.classList.add('enemyProjectile');
            enemyProjectile.style.left = (le.getBoundingClientRect().left) + ((le.getBoundingClientRect().width) / 2 - 3) +'px';
            enemyProjectile.style.top = le.getBoundingClientRect().bottom + 'px';
            sky.append(enemyProjectile);
            let distance = +enemyProjectile.style.top.slice(0, -2);

            function trajectory () {
                if (distance < sky.getBoundingClientRect().bottom) {
                    distance = distance + 5;
                    enemyProjectile.style.top = distance + 'px';
                } 
                if(distance > sky.getBoundingClientRect().bottom) {
                    clearInterval(trajectory);
                    enemyProjectile.remove();
                }
                if(enemyProjectile.style.left.slice(0, -2) < 0) {
                    enemyProjectile.remove();
                }
            }
            setInterval(trajectory, 10);
        }
    }
    function createEnProj() {
        new EnemyGun
    }
    setInterval(createEnProj, 1500);
    setInterval(enemyCrash, 60);

    function enemyCrash() {
        let projectiles = document.querySelectorAll('.projectile');
        const ship = document.querySelector('.ship');
        projectiles.forEach((item) => {
            if(
                item.getBoundingClientRect().top < le.getBoundingClientRect().bottom &&
                item.getBoundingClientRect().bottom < le.getBoundingClientRect().bottom &&
                item.getBoundingClientRect().left >= le.getBoundingClientRect().left &&
                item.getBoundingClientRect().right <= le.getBoundingClientRect().right &&
                ship.getBoundingClientRect().top > le.getBoundingClientRect().bottom
                ) {
                    enemyHealth--;
                    if(enemyHealth < 1) {
                        enemyBang(true);
                        le.remove();
                        showWinWindow();
                    }
                    item.remove();
                }
            
        });
    }
    function enemyBang(arg) {
        const canvas = document.createElement('canvas'),
              ctx = canvas.getContext('2d'),
              le = document.querySelector('.lastEnemy'),
              sprite = new Image();

        canvas.style.width = '340px';
        canvas.style.height = '340px';
        canvas.style.position = 'absolute';
        canvas.style.top = le.style.top;
        canvas.style.left = le.style.left;
        canvas.style.transform = 'translateX(-50%)';
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
    function showWinWindow() {
        const win = document.createElement('div'),
              sky = document.querySelector('.sky');
        win.textContent = '????????????';
        win.classList.add('win');
        sky.append(win);
        
    }
}

/* harmony default export */ __webpack_exports__["default"] = (lastEnemy);

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

/***/ "./src/js/modules/shiphealth.js":
/*!**************************************!*\
  !*** ./src/js/modules/shiphealth.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const shipHealth = () => {
    let health = 100,
          ship = document.querySelector('.ship'),
          sky = document.querySelector('.sky'),
          scale = document.querySelector('.health'),
          damage;
    let timerId = setInterval(reduceHealth, 60);
    function reduceHealth() {
       let enPr = document.querySelectorAll('.enemyProjectile');
       enPr.forEach((item) => {
        if(
            item.getBoundingClientRect().top > ship.getBoundingClientRect().top &&
            item.getBoundingClientRect().bottom < ship.getBoundingClientRect().bottom &&
            item.getBoundingClientRect().left >= ship.getBoundingClientRect().left &&
            item.getBoundingClientRect().right <= ship.getBoundingClientRect().right
            ) {
                calcDamage();
                health = health - damage;
                scale.style.transform = `translateX(${health}%)`;
                projectileBang(true, item);
                item.remove();
            }
        if(health <= 0) {
            showLossWindow();
            clearInterval(timerId);
            const enemies = document.querySelectorAll('.enemy'),
                 le = document.querySelector('.lastEnemy');
            if(enemies.length > 0) {
                enemies.forEach((item) => {
                    item.remove();
                });
            }
            if(le != null) {
                le.remove();
            }
            ship.remove();
        }
       });
    }

    function calcDamage() {
        let d = Math.round(Math.random() * 10);
        if(d <= 3) {
            damage = 3;
        } else if(d > 3 && d <= 5) {
            damage = 5;
        } else if(d > 5 && d <= 8) {
            damage = 7;
        } else {
            damage = 10;
        }
    }

    function showLossWindow() {
        const win = document.createElement('div'),
              sky = document.querySelector('.sky');
        win.textContent = '???? ????????????????';
        win.classList.add('win');
        sky.append(win);
    }



    // ?????????? ??????????????
    function projectileBang(arg, item) {
        const canvas = document.createElement('canvas'),
              ctx = canvas.getContext('2d'),
              sprite = new Image();

        canvas.style.width = '40px';
        canvas.style.height = '40px';
        canvas.style.position = 'absolute';
        canvas.style.top = item.style.top;
        canvas.style.left = item.style.left;
        canvas.style.transform = 'translateX(-30%)';
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

/* harmony default export */ __webpack_exports__["default"] = (shipHealth);

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
/* harmony import */ var _modules_shiphealth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/shiphealth */ "./src/js/modules/shiphealth.js");
/* harmony import */ var _modules_lastEnemy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/lastEnemy */ "./src/js/modules/lastEnemy.js");







getStart();
showControl();
hideControl();
(0,_modules_move__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_shiphealth__WEBPACK_IMPORTED_MODULE_3__["default"])();

function getStart() {
    document.body.style.overflow = 'hidden';
    const start = document.querySelector('.start'),
          sky = document.querySelector('.sky');
    start.addEventListener('click',() => {
        sky.style.transform = 'translateY(-100%)';
        setInterval(makeEnemies, 2000);
    });
}

function showControl() {
    const cBtn = document.querySelector('.control'),
          secWin = document.querySelector('.second-window');
    cBtn.addEventListener('click', () => {
        secWin.style.transform = 'translateX(0%)';
    });
}

function hideControl() {
    const rBack = document.querySelector('.retBack'),
          secWin = document.querySelector('.second-window');
    rBack.addEventListener('click', () => {
        secWin.style.transform = 'translateX(-100%)';
    });
}

document.addEventListener('keydown', (event) => {
    if(event.code == 'Space') {
        new _modules_shot__WEBPACK_IMPORTED_MODULE_1__["default"];
    }
});

const makeEnemies = function() {
    const counter = document.querySelector('.counter'),
          enemies = document.querySelectorAll('.enemy');
    if(+counter.textContent > 49) {
        clearInterval(makeEnemies);
        enemies.forEach((item) => {
            item.remove();
            further();
        });
    } else {
        if(enemies.length < 4) {
            new _modules_enemy__WEBPACK_IMPORTED_MODULE_2__["default"]();
        }
    }
}

function further() {
    const back = document.querySelector('.back'),
          ship = document.querySelector('.ship img');
    setTimeout(() => {
        back.classList.add('back_fast');
        ship.src = 'img/72333.png';
        ship.style.height = '140px';
    },1000);
    setTimeout(() => {
        back.classList.remove('back_fast');
        ship.src = 'img/pngegg (4).png';
        ship.style.height = '100px';
        setTimeout(_modules_lastEnemy__WEBPACK_IMPORTED_MODULE_4__["default"],2000);
    },6000);
}
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map