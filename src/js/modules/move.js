const move = () => {
    const ship = document.querySelector('.ship');
    const sky = document.querySelector('.sky');
    let x = 0,
        y = 0;

        moveUp(35);
        moveDown(35);
        moveRight(35);
        moveLeft(35);
        
    function moveUp(i) {
        document.addEventListener('keydown', (e) => {

            if(e.code == 'KeyW' && (ship.getBoundingClientRect().top) > sky.getBoundingClientRect().top) {
                y = y - i;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveDown(i) {
        document.addEventListener('keydown', (e) => {
            if(e.code == 'KeyS' && (ship.getBoundingClientRect().bottom) < sky.getBoundingClientRect().bottom) {
                y = y + i;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveRight(i) {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if(e.code == 'KeyD' && (ship.getBoundingClientRect().right) < sky.getBoundingClientRect().right) {
                x = x + i;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    }

    function moveLeft(i) {
        document.addEventListener('keydown', (e) => {
            if(e.code == 'KeyA' && ship.getBoundingClientRect().left > sky.getBoundingClientRect().left) {
                x = x - i;
                ship.style.transform = `translate(${x}px,${y}px)`;
            }
        }); 
    } 

};

export default move;