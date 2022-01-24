import move from './modules/move';
import Gun from './modules/shot';
import Enemy from './modules/enemy';
import shipHealth from './modules/shiphealth';



move();
shipHealth();

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
// setInterval(makeEnemies, 2000);