import {remove, render, RenderPosition} from '../framework/render.js';
import AddNewPointFormView from '../view/add-new-point-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #destinations = null;
  #offers = null;

  #addNewPointComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy, destinations, offers}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(destinations, offers) {
    if (this.#addNewPointComponent !== null) {
      return;
    }

    this.#addNewPointComponent = new AddNewPointFormView({
      destinations: destinations,
      offers: offers,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
    });

    render(this.#addNewPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addNewPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#addNewPointComponent);
    this.#addNewPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
