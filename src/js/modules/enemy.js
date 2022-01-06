const sky = document.querySelector('.sky');

export default class Enemy {
    constructor() {
        const enemyShip = document.createElement('div');
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
        
        
        function enemyCrash() {
            let projectiles = document.querySelectorAll('.projectile');
            projectiles.forEach((item) => {
                if(
                    item.getBoundingClientRect().top < enemyShip.getBoundingClientRect().bottom &&
                    item.getBoundingClientRect().bottom < enemyShip.getBoundingClientRect().bottom &&
                    item.getBoundingClientRect().left >= enemyShip.getBoundingClientRect().left &&
                    item.getBoundingClientRect().right <= enemyShip.getBoundingClientRect().right
                    ) {
                        enemyShip.remove();
                        item.remove();
                    }
                
            });
        }
        
        setInterval(enemyMove, 60);
    }
}