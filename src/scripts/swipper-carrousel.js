import Swiper from "https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js";

const swiper = new Swiper(".main-banner", {
  direction: "horizontal",
  loop: true,

  slidesPerView: 3,
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },

  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
    1023: {
      slidesPerView: 2,
    }
  }
});

