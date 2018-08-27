import Shop from './Shop';
import { toggleHamburger, toggleActiveShopLink, showMap } from './handlers';

let map;
let activeShopIndex = 0;

const shops = [
  new Shop([55.835629, 37.635224], 'Магазин на Вильгельма Пика', 8, 19),
  new Shop([55.681311, 37.59012], 'Магазин на Дмитрия Ульянова', 8, 20),
  new Shop([55.867667, 37.592258], 'Магазин на Декабристов', 8, 18),
];

window.addEventListener('DOMContentLoaded', () => {
  // Yandex maps
  ymaps.ready(() => {
    map = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 7,
    });
    shops.forEach((shop) => {
      const { xy, name } = shop;
      const mark = new ymaps.Placemark(xy, {
        hintContent: name,
        balloonContent: shop.description(),
      });
      map.geoObjects.add(mark);
    });
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', toggleHamburger);

  // Shops accordion
  const shopLinks = Array.from(document.getElementsByClassName('shop__link'));
  toggleActiveShopLink(shopLinks, activeShopIndex);

  shopLinks.forEach(function(el, index) {
    el.addEventListener('click', () => {
      activeShopIndex = index;
      toggleActiveShopLink(shopLinks, activeShopIndex);
    });
  });

  // Shops map links
  const mapLinks = Array.from(document.getElementsByClassName('item__map-link'));

  mapLinks.forEach(function(el) {
    el.addEventListener('click', () => showMap(map, shops[activeShopIndex].xy));
  });
});
