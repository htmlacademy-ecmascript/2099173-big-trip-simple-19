// import {MOCK_DESTINATIONS} from '../mock/destination.js';
// import {MOCK_OFFERS} from '../mock/offers.js';
import {humanizeDateInList} from '../utils/points.js';
import {humanizeTimeInList} from '../utils/points.js';
import AbstractView from '../framework/view/abstract-view.js';

function createDestinationNameTemplate (currentDestination, destinations) {
  return destinations.find(({id}) => currentDestination === id)?.name;
}


function createPointOffersTemplate(certainPointOffers, allOffers, certainPointType) {

  return allOffers.find(({type}) => certainPointType === type)?.offers.map((offer) => certainPointOffers.includes(offer.id) ? `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>                   
</li>` : '').join('');
}

function createPointTemplate(point, allDestinations, allOffers) {
  const {basePrice, dateFrom, dateTo, type, destination, offers} = point;

  const dateInList = humanizeDateInList(dateFrom);

  const timeFromInList = humanizeTimeInList(dateFrom);

  const timeToInList = humanizeTimeInList(dateTo);

  return `<div class="event">
                <time class="event__date" datetime="${dateFrom}">${dateInList}</time>
                <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${createDestinationNameTemplate(destination, allDestinations)}
                </h3>
                <div class="event__schedule">
                <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${timeFromInList}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${timeToInList}</time>
                </p>
                </div>
                <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">

                ${createPointOffersTemplate(offers, allOffers, type)}

                </ul>
                <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
                </button>
            </div>`;
}

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;

  constructor ({point, destinations, offers, onEditClick}) {
    super();

    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handlerEditClick);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #handlerEditClick = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

}
