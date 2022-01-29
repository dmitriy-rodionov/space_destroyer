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
    let enemyHealth = 10;

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
                    console.log(enemyHealth);
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
        win.textContent = 'победа';
        win.classList.add('win');
        sky.append(win);
        
    }
}

export default lastEnemy;