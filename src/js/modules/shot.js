const gun = document.querySelector('.ship__head');
const sky = document.querySelector('.sky');
  

export default class Gun {
   constructor() {
       const projectile = document.createElement('div');
       projectile.classList.add('projectile');
       sky.append(projectile);
       projectile.style.left = (gun.getBoundingClientRect().left) + ((gun.getBoundingClientRect().width) / 2) +'px';
       projectile.style.top = gun.getBoundingClientRect().top + 'px';
       let distance = +projectile.style.top.slice(0, -2);
       
       function trajectory () {
           if (distance > 0) {
               distance = distance - 1;
               // projectile.style.transform = `translateY(-${distance}px)`;
               projectile.style.top = distance + 'px';
           } else{
               clearInterval(trajectory);
               projectile.remove();
           }
       }

       setInterval(trajectory, 10);
   }
}