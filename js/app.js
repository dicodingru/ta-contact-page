const toggleHamburger = () => {
  const nav = document.getElementById('navigation');
  nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
};

window.addEventListener('DOMContentLoaded', () => {
  let map;
  ymaps.ready(() => {
    map = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 7,
    });
  });

  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', toggleHamburger);

  let activeShopIndex = 0;
  const shopLinks = Array.from(document.getElementsByClassName('shop__link'));

  const toggleActiveShopLink = () => {
    shopLinks.forEach(function(el, index) {
      const shop = el.nextElementSibling;

      if (index === activeShopIndex) {
        el.classList.add('shop__link_active');
        shop.style.maxHeight = `${shop.scrollHeight}px`;
      } else {
        el.classList.remove('shop__link_active');
        shop.style.maxHeight = null;
      }
    });
  };
  toggleActiveShopLink();

  shopLinks.forEach(function(el, index) {
    el.addEventListener('click', () => {
      activeShopIndex = index;
      toggleActiveShopLink();
    });
  });
});
