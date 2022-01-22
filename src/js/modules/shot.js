const ship = document.querySelector('.ship');
const sky = document.querySelector('.sky');
  

export default class Gun {
   constructor() {
       const projectile = document.createElement('div');
       projectile.classList.add('projectile');
       sky.append(projectile);
       projectile.style.left = (ship.getBoundingClientRect().left) + ((ship.getBoundingClientRect().width) / 2 - 3) +'px';
       projectile.style.top = ship.getBoundingClientRect().top - 15 + 'px';
       let distance = +projectile.style.top.slice(0, -2);
       
       function trajectory () {
           if (distance > 0) {
               distance = distance - 10;
               projectile.style.top = distance + 'px';
           } else{
               clearInterval(trajectory);
               projectile.remove();
           }
       }

       setInterval(trajectory, 10);
   }
}