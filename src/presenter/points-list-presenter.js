import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';
import EditPointFormView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
import {render, replace} from '../framework/render.js';

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
    if (this.#pointsModel.points === null) {
      render(new NoPointView(), this.#pointListContainer);
    } else {
      this.#boardPoints = [...this.#pointsModel.points];
      render(this.#pointItemComponent, this.#pointListComponent.element);
      render(new SortView(), this.#pointListContainer);
      render(this.#pointListComponent, this.#pointListContainer);

      this.#boardPoints.forEach((boardPoint) => {
        this.#renderPoint(boardPoint);
      });
    }
  }

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointFormView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClose: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceFormToPoint(){
      replace(pointComponent, editPointComponent);
    }

    render(pointComponent, this.#pointItemComponent.element);
  }
}
