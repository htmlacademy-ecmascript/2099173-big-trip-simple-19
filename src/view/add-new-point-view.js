import {TYPES} from '../const.js';
import {getRandomArrayElement} from '../utils/common.js';
import {humanizeDateAndTimeInForm} from '../utils/points.js';
import {MOCK_DESTINATIONS} from '../mock/destination.js';
import {MOCK_OFFERS_BY_TYPE} from '../mock/offers-by-type.js';
import {MOCK_OFFERS} from '../mock/offers.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
flatpickr.l10ns.default.firstDayOfWeek = 1;

const BLANK_DESTINATION = {
  'id': '0000000000',
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
  'destination': BLANK_DESTINATION.id,
  'id': '0000000000',
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

function createPhotosInFormTemplate(currentDestination) {
  if (currentDestination === BLANK_DESTINATION.id){
    return BLANK_DESTINATION.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`).join('');
  } else {
    for (const destination of MOCK_DESTINATIONS) {
      if (destination.id === currentDestination) {
        return destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`).join('');
      }
    }
  }
}

function createDestinationNameTemplate (currentDestination) {
  if (currentDestination !== null && currentDestination !== BLANK_DESTINATION.id) {
    return MOCK_DESTINATIONS.find(({id}) => currentDestination === id)?.name;
  } else {
    currentDestination = BLANK_DESTINATION.id;
    return 'City';
  }
}

function createDestinationDescriptionTemplate (currentDestination) {
  if (currentDestination !== null && currentDestination !== BLANK_DESTINATION.id) {
    return MOCK_DESTINATIONS.find(({id}) => currentDestination === id)?.description;
  } else {
    return 'Choose city in current field.';
  }
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

  const pointTypeOffers = MOCK_OFFERS_BY_TYPE.find((offer) => offer.type === type);

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
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(createDestinationNameTemplate(destination))}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${createDestinationListTemplate(MOCK_DESTINATIONS)}
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
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(basePrice)}">
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
      <p class="event__destination-description">${createDestinationDescriptionTemplate(destination)}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPhotosInFormTemplate(destination)}
        </div>
      </div>
    </section>
  </section>
</form>`;
}

export default class AddNewPointFormView extends AbstractStatefulView {

  #handleFormSubmit = null;
  #handleCancelClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor ({point = BLANK_POINT, onFormSubmit, onCancelClick}) {
    super();

    this._setState(AddNewPointFormView.parsePointToState(point));


    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;

    this._restoreHandlers();
  }

  get template() {
    return createAddNewPointFormTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      AddNewPointFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {

    this.element.addEventListener('submit', this.#formSubmitHandler);
    const typesValues = this.element.querySelectorAll('.event__type-input');
    for (const typeValue of typesValues) {
      typeValue.addEventListener('change', this.#eventTypeCheckboxHandler);
    }
    const offerCheckboxes = this.element.querySelectorAll('.event__offer-checkbox');
    for (const offerCheckbox of offerCheckboxes) {
      offerCheckbox.addEventListener('change', this.#offerCheckboxHandler);
    }
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceInputHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formCancelClickHandler);

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #offerCheckboxHandler = (evt) => {
    evt.preventDefault();
    const clickedOffer = evt.target.value;
    this.updateElement({
      offers: MOCK_OFFERS.find((offer) => offer.title === clickedOffer)?.id
    });
  };

  #eventTypeCheckboxHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      offers: [],
      type: evt.target.value,
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    let actualDestinationID = '0000000000';
    MOCK_DESTINATIONS.map((destination) => {
      if (destination.name === evt.target.value) {
        actualDestinationID = destination.id;
      }
    });

    this.updateElement({
      destination: actualDestinationID,
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: he.encode(evt.target.value),
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(AddNewPointFormView.parseStateToPoint(this._state));
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/Y H:i',
        defaultDate: this._state.dateFrom,
        utc: true,
        onClose: this.#dateFromChangeHandler
      },
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'j/m/Y H:i',
        defaultDate: this._state.dateTo,
        utc: true,
        onClose: this.#dateToChangeHandler
      },
    );
  }

  #formCancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick(AddNewPointFormView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}

export {BLANK_POINT};
