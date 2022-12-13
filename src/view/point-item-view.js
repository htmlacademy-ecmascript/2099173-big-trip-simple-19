import { createElement } from '../render.js';

function createPointItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class PointItemView {
  getTemplate() {
    return createPointItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;

  }

  removeElement() {
    this.element = null;
  }
}
