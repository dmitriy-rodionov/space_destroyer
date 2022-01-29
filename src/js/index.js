import move from './modules/move';
import Gun from './modules/shot';
import Enemy from './modules/enemy';
import shipHealth from './modules/shiphealth';
import lastEnemy from './modules/lastEnemy';


getStart();
finish();
showControl();
hideControl();
move();
shipHealth();

function getStart() {
    document.body.style.overflow = 'hidden';
    const start = document.querySelector('.start'),
          sky = document.querySelector('.sky'),
          exit = document.querySelector('.exit');
    start.addEventListener('click',() => {
        sky.style.transform = 'translateY(-100%)';
        let timerId = setInterval(makeEnemies, 2000);
        exit.addEventListener('click', () => {
            clearInterval(timerId);
        });
    });
}

function finish() {
    const sky = document.querySelector('.sky'),
          exit = document.querySelector('.exit'),
          counter = document.querySelector('.counter'),
          health = document.querySelector('.health');
    exit.addEventListener('click', () => {
        sky.style.transform = 'translateY(0%)';
        health.style.transform = 'translateX(100%)';
        counter.textContent = '00';
        let enemies = document.querySelectorAll('.enemy'),
          le = document.querySelector('.lastEnemy');
        enemies.forEach((item) => {
            item.remove();
        });
        if(le != null) {
            le.remove();
        }
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
        new Gun;
    }
});

const makeEnemies = function() {
    const counter = document.querySelector('.counter');
    if(+counter.textContent > 5) {
        clearInterval(makeEnemies);
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach((item) => {
            item.remove();
            further();
        });
    } else {
        new Enemy();
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
        setTimeout(lastEnemy,2000);
    },6000);
}