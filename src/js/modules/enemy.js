const sky = document.querySelector('.sky');

export default class Enemy {
    constructor() {

        let enemyShip = document.createElement('div');
        enemyShip.style.width = '50px';
        enemyShip.style.height = '70px';
        enemyShip.style.borderRadius = '10px';

        function enemyColor() {
            let i = Math.round(Math.random() * 10);
            if(i <= 3) {
                enemyShip.style.backgroundColor = 'pink';
            } else if(i > 3 && i < 7) {
                enemyShip.style.backgroundColor = 'yellow';
            } else {
                enemyShip.style.backgroundColor = 'red';
            }
        }

        enemyColor();
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
        setInterval(enemyMove, 60);
        
        
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