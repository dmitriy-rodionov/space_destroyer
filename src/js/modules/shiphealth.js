const shipHealth = () => {
    let health = 100,
          ship = document.querySelector('.ship'),
          sky = document.querySelector('.sky'),
          scale = document.querySelector('.health'),
          damage;
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
       });
    }
    setInterval(reduceHealth, 10);
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

    // взрыв снаряда
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

export default shipHealth;