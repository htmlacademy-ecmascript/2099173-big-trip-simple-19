import AbstractView from '../framework/view/abstract-view.js';
import { FilterTypes } from '../const.js';

const NoPointsTextType = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
};

function createNoPointTemplate() {
  return (
    `<p class="trip-events__msg">
    ${NoPointsTextType}
    </p>`
  );
}
export default class NoPointView extends AbstractView{

  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
