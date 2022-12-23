import { createElement } from '../render.js';

function createPointItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class PointItemView {

  #element = null;

  get template() {
    return createPointItemTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;

  }

  removeElement() {
    this.#element = null;
  }
}
