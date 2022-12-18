import { createElement } from '../render.js';
import { TYPES } from '../const.js';
import { getRandomArrayElement } from '../util.js';
import { humanizeDateAndTimeInForm } from '../util.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffersByType } from '../mock/offers-by-type.js';

const BLANK_DESTINATION = {
  'id': 0,
  'description': 'Choose city in current field.',
  'name': 'City',
  'pictures': [
    {
      'src': 'https://loremflickr.com/248/152?random=111',
      'description': 'Picture №1'
    },
    {
      'src': 'https://loremflickr.com/248/152?random=222',
      'description': 'Picture №2'
    },
    {
      'src': 'https://loremflickr.com/248/152?random=333',
      'description': 'Picture №3'
    },
    {
      'src': 'https://loremflickr.com/248/152?random=444',
      'description': 'Picture №4'
    },
    {
      'src': 'https://loremflickr.com/248/152?random=555',
      'description': 'Picture №5'
    }
  ]
};

const BLANK_POINT = {
  'basePrice': '0000',
  'dateFrom': '2001-01-01T00:00:00.001Z',
  'dateTo': '2001-01-01T00:23:59.001Z',
  'destination': BLANK_DESTINATION,
  'id': 0,
  'offers': [],
  'type':getRandomArrayElement(TYPES)
};

function createDestinationListTemplate (destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createCheckedTypeTemplate(currentType) {
  return `${
    TYPES.map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1" ${currentType === type ? 'checked' : ''}>${type}</label>
  </div>`).join('')
  }`;
}

function createPhotosInFormTemplate(photos) {
  return photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}"></img>`).join('');
}

function createOffersInFormTemplate(additingOffers) {
  return additingOffers.offers.map((offer) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`).join('');
}

function createAddNewPointFormTemplate(point) {

  const {type, destination, dateFrom, dateTo, basePrice} = point;

  const dateFromInForm = humanizeDateAndTimeInForm(dateFrom);

  const dateToInForm = humanizeDateAndTimeInForm(dateTo);

  const pointTypeOffers = mockOffersByType.find((offer) => offer.type === type);

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${createCheckedTypeTemplate(type)}

        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${createDestinationListTemplate(mockDestinations)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromInForm}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToInForm}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        
      ${createOffersInFormTemplate(pointTypeOffers)}

      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPhotosInFormTemplate(destination.pictures)}
        </div>
      </div>
    </section>
  </section>
</form>`;
}

export default class AddNewPointFormView {

  constructor ({point = BLANK_POINT}) {
    this.point = point;
  }

  getTemplate() {
    return createAddNewPointFormTemplate(this.point);
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

export {BLANK_POINT};
