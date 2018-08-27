class Shop {
  constructor(xy, name, from, to) {
    this.xy = xy;
    this.name = name;
    this.from = from;
    this.to = to;
  }

  description() {
    const hours = Number(new Date().getHours());
    const { from, to } = this;
    return hours >= from && hours <= to
      ? '<h4 style="color: green;">Сейчас работает</h4>'
      : '<h4 style="color: red;">Сейчас не работает</h4>';
  }
}

module.exports = Shop;
