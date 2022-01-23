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

function makeEnemies() {
    new Enemy();
}
// setInterval(makeEnemies, 5000);