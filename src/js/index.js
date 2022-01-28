import move from './modules/move';
import Gun from './modules/shot';
import Enemy from './modules/enemy';
import shipHealth from './modules/shiphealth';


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
          exit = document.querySelector('.exit');
    exit.addEventListener('click', () => {
        sky.style.transform = 'translateY(0%)';
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
    if(+counter.textContent >= 5) {
        clearInterval(makeEnemies);
    } else {
        new Enemy();
    }
}