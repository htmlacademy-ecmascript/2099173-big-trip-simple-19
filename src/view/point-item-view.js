import AbstractView from '../framework/view/abstract-view.js';

function createPointItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class PointItemView extends AbstractView{
  get template() {
    return createPointItemTemplate();
  }
}
