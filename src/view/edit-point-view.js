import {TYPES} from '../const.js';
import {MOCK_DESTINATIONS} from '../mock/destination.js';
import {humanizeDateAndTimeInForm} from '../utils/points.js';
import {MOCK_OFFERS_BY_TYPE} from '../mock/offers-by-type.js';
import {MOCK_OFFERS} from '../mock/offers.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
flatpickr.l10ns.default.firstDayOfWeek = 1;

function createCheckedTypeTemplate(currentType) {
  return `${
    TYPES.map((type) => `<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1" ${currentType === type ? 'checked' : ''}>${type}</label>
  </div>`).join('')
  }`;
}

function createDestinationListTemplate (destinations) {
  return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createDestinationNameTemplate (currentDestination) {
  if (currentDestination !== null) {
    return MOCK_DESTINATIONS.find(({id}) => currentDestination === id)?.name;
  } else {
    return '';
  }
}

function createDestinationDescriptionTemplate (currentDestination) {
  if (currentDestination !== null) {
    return MOCK_DESTINATIONS.find(({id}) => currentDestination === id)?.description;
  } else {
    return '';
  }
}

function createOffersInFormTemplate(checkingOffers, currentType) {

  const pointTypeOffers = MOCK_OFFERS_BY_TYPE.find((offer) => offer.type === currentType);

  return pointTypeOffers.offers.map((offer) => {

    const checked = checkingOffers.includes(offer.id) ? 'checked' : '';

    return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${checked} value="${offer.title}">
          <label class="event__offer-label" for="event-offer-luggage-1" data-offer-title="${offer.title}" data-offer-price="${offer.price}" value="${offer.title}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`;}).join('');
}

function createEditPointFormTemplate(point) {

  const {type, destination, dateFrom, dateTo, basePrice, offers} = point;

  const dateFromInForm = humanizeDateAndTimeInForm(dateFrom);

  const dateToInForm = humanizeDateAndTimeInForm(dateTo);

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
      <input class="event__input  event__input--destination" aoutocmplete="off" id="event-destination-1" type="text" name="event-destination" value="${createDestinationNameTemplate(destination)}" list="destination-list-1">
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
        <span class="visually-hidden">${basePrice}</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">

      ${createOffersInFormTemplate(offers, type)}

      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${createDestinationDescriptionTemplate(destination)}</p>
    </section>
  </section>
</form>`;
}

export default class EditPointFormView extends AbstractStatefulView {

  #handleFormSubmit = null;
  #handleBackToPoint = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor ({point, onFormSubmit, onFormClose, onDeleteClick}) {
    super();

    this._setState(EditPointFormView.parsePointToState(point));

    this.#handleFormSubmit = onFormSubmit;
    this.#handleBackToPoint = onFormClose;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointFormTemplate(this._state);
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
      EditPointFormView.parsePointToState(point),
    );
  }

  _restoreHandlers() {

    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#backToPointHandler);
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
      .addEventListener('click', this.#formDeleteClickHandler);

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
    let actualDestinationID = null;
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
    this.#handleFormSubmit(EditPointFormView.parseStateToPoint(this._state));
  };

  #backToPointHandler = () => {
    this.#handleBackToPoint();
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

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointFormView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
