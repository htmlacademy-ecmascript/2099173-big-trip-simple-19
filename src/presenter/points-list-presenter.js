import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';
// import AddNewPointFormView from '../view/add-new-point-view.js';
import EditPointFormView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';
// import { BLANK_POINT } from '../view/add-new-point-view.js';
import NoPointView from '../view/no-point-view.js';

const POINT_COUNT_PER_STEP = 8;

export default class PointsListPresenter {

  #pointListContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #pointItemComponent = new PointItemView();

  #boardPoints = [];

  constructor({pointListContainer, pointsModel}) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    // render(new EditPointFormView({point: this.#boardPoints[0]}), this.#pointItemComponent.element);
    // render(new AddNewPointFormView({point: BLANK_POINT}), this.#pointItemComponent.element);
    if (this.#pointsModel.points === null) {
      render(new NoPointView(), this.#pointListContainer);
    } else {
      this.#boardPoints = [...this.#pointsModel.points];
      render(this.#pointItemComponent, this.#pointListComponent.element);
      render(new SortView(), this.#pointListContainer);
      render(this.#pointListComponent, this.#pointListContainer);

      for (let i = 0; i < Math.min(this.#boardPoints.length, POINT_COUNT_PER_STEP); i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({point});
    const editPointComponent = new EditPointFormView({point});

    const replacePointToForm = () => {
      this.#pointItemComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointItemComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editPointComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#pointItemComponent.element);
  }
}
