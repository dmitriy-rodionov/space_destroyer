const sky = document.querySelector('.sky'),
      ship = document.querySelector('.ship');

export default class Enemy {
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
                enemyProjectile.style.left = (enemyShip.getBoundingClientRect().left) + ((enemyShip.getBoundingClientRect().width) / 2 - 3) +'px';
                enemyProjectile.style.top = enemyShip.getBoundingClientRect().bottom + 'px';
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
        setInterval(createEnProj, 5000);
        
    }
}