import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, isChecked) {

  const {name} = filter;

  return (
    `<div class="trip-filters__filter">
            <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${isChecked ? 'checked' : ''} value="${name}">
            <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
          </div>`
  );
}

function createFilterControlTemplate(filterItems) {

  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<div class="trip-controls__filters">
            <h2 class="visually-hidden">Filter events</h2>
                <form class="trip-filters" action="#" method="get">
                    ${filterItemsTemplate}
                    <button class="visually-hidden" type="submit">Accept filter</button>
                </form>
            </div>`;
}

export default class FilterControlView extends AbstractView {

  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterControlTemplate(this.#filters);
  }
}
