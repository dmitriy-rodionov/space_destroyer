import move from './modules/move';
import Gun from './modules/shot';



move();

document.addEventListener('keydown', (event) => {
    if(event.code == 'Space') {
        new Gun;
    }
});