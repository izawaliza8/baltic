import './reveal-on-scroll';
import './header-footer';


import './web-comps/header-el';
import './web-comps/splide';
import './web-comps/table-el';



import '../scss/main.scss';

// // Import images
// import '../../assets/images/ro-1.jpg';
// import '../../assets/images/ro-2.jpg';
// import '../../assets/images/ro-3.jpg';
// import '../../assets/images/ro-4.jpg';

// // Import videos
// // import '../assets/videos/example.webm';

// import './reveal-on-scroll';

// // Import web components
// import './web-comps/splide';
// import './web-comps/time';
// import './web-comps/back-to-top';
// import './web-comps/pop-up';
// import './web-comps/popup-opener';
// import './web-comps/header-el';
// import './web-comps/simple-carousel';
// import './web-comps/menu-carousel';
// import './web-comps/tabs';
// import './web-comps/accordion';
// import './web-comps/intro-anim';

// const header = document.querySelector('header-el');
// const headerHeight = header.offsetHeight;
// document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

// window.addEventListener('resize', () => {
//   const headerHeight = header.offsetHeight;
//   document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
// });

// const parallaxElements = [...document.querySelectorAll('.parallax')];

// if (parallaxElements.length) {
//   const handleScroll = () => {
//     parallaxElements.forEach(element => {
//       const speed = parseFloat(element.dataset.speed) || 0.5;
//       const parent = element.parentElement;
//       const parentRect = parent.getBoundingClientRect();
//       const elementRect = element.getBoundingClientRect();
//       let scrollPosition = window.scrollY;
//       let translateY = scrollPosition * speed;

//       // Ensure the element does not move out of its parent
//       if (translateY + elementRect.height > parentRect.height) {
//         translateY = parentRect.height - elementRect.height;
//       }

//       element.style.transform = `translateY(${translateY}px)`;
//     });
//     requestAnimationFrame(handleScroll);
//   };

//   requestAnimationFrame(handleScroll);
// }