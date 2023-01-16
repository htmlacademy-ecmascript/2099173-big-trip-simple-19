import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './points-presenter.js';
import {render, RenderPosition} from '../framework/render.js';


export default class PointsListPresenter {

  #pointListContainer = null;
  #pointsModel = null;
  #pointListComponent = new PointListView();
  #pointItemComponent = new PointItemView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();


  #boardPoints = [];
  #pointPresenter = new Map();

  constructor({pointListContainer, pointsModel}) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoardPoints();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort () {
    render(this.#sortComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter({
      pointItemComponent: this.#pointListComponent.element,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderNoPopints() {
    render(this.#noPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderBoardPoints () {
    render(this.#pointListComponent, this.#pointListContainer);

    if (this.#pointsModel.points === null) {
      this.#renderNoPopints();
    } else {
      this.#boardPoints = [...this.#pointsModel.points];
      render(this.#pointItemComponent, this.#pointListComponent.element);
      this.#renderSort();

      this.#boardPoints.forEach((boardPoint) => {
        this.#renderPoint(boardPoint);
      });
    }
  }
}
