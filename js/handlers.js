const toggleHamburger = () => {
  const nav = document.getElementById('navigation');
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
};

const toggleActiveShopLink = (links, activeIndex) => {
  links.forEach(function(el, index) {
    const shop = el.nextElementSibling;

    if (index === activeIndex) {
      el.classList.add('shop__link_active');
      shop.style.maxHeight = `${shop.scrollHeight}px`;
    } else {
      el.classList.remove('shop__link_active');
      shop.style.maxHeight = null;
    }
  });
};

const showMap = (map, xy) => {
  location.href = '#';
  location.href = '#map';
  map.setCenter(xy, 13, { duration: 800 });
};

module.exports = { showMap, toggleHamburger, toggleActiveShopLink };
