let map;
let activeShopIndex = 0;

class Shop {
  constructor(xy, name, from, to) {
    this.xy = xy;
    this.name = name;
    this.from = from;
    this.to = to;
    this.description = () => {
      const hours = Number(new Date().getHours());
      const { from, to } = this;
      return hours >= from && hours <= to
        ? '<h4 style="color: green;">Сейчас работает</h4>'
        : '<h4 style="color: red;">Сейчас не работает</h4>';
    };
  }
}

const shops = [
  new Shop([55.835629, 37.635224], 'Магазин на Вильгельма Пика', 8, 19),
  new Shop([55.681311, 37.59012], 'Магазин на Дмитрия Ульянова', 8, 20),
  new Shop([55.867667, 37.592258], 'Магазин на Декабристов', 8, 18),
];

const toggleHamburger = () => {
  const nav = document.getElementById('navigation');
  nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
};

const toggleActiveShopLink = (links) => {
  links.forEach(function(el, index) {
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

const showMap = () => {
  location.href = '#hamburger';
  map.setCenter(shops[activeShopIndex].xy, 13, { duration: 800 });
};

window.addEventListener('DOMContentLoaded', () => {
  // Yandex maps
  ymaps.ready(() => {
    map = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 7,
    });
    shops.forEach(({ xy, name, description }) => {
      const shop = new ymaps.Placemark(xy, {
        hintContent: name,
        balloonContent: description(),
      });
      map.geoObjects.add(shop);
    });
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', toggleHamburger);

  // Shops accordion
  const shopLinks = Array.from(document.getElementsByClassName('shop__link'));
  toggleActiveShopLink(shopLinks);

  shopLinks.forEach(function(el, index) {
    el.addEventListener('click', () => {
      activeShopIndex = index;
      toggleActiveShopLink(shopLinks);
    });
  });

  // Shops map links
  const mapLinks = Array.from(document.getElementsByClassName('item__map-link'));

  mapLinks.forEach(function(el) {
    el.addEventListener('click', showMap);
  });
});
