import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './points-presenter.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import {sortPointsDay, sortPointsPrice} from '../utils/points.js';
import {SortType} from '../const.js';
import {updateItem} from '../utils/common.js';


export default class PointsListPresenter {

  #pointListContainer = null;
  #pointsModel = null;
  #pointListComponent = new PointListView();
  #pointItemComponent = new PointItemView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();

  #boardPoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

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

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortPointsDay);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointsPrice);
        break;
    }
    this.#currentSortType = sortType;

  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    remove(this.#sortComponent);
    this.#renderSort();
    this.#clearPointList();
    this.#renderPointList();

  };

  #renderSort () {
    this.#sortComponent = new SortView ({
      onSortTypeChange: this.#handleSortTypeChange,
      sortTypeValue: this.#currentSortType
    });

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

  #renderPoints(from, to) {
    this.#boardPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  }

  #renderNoPopints() {
    render(this.#noPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderPointList() {
    render(this.#pointItemComponent, this.#pointListComponent.element);
    this.#renderPoints(0, this.#boardPoints.length);
  }

  #renderBoardPoints () {
    render(this.#pointListComponent, this.#pointListContainer);

    if (this.#pointsModel.points === null) {
      this.#renderNoPopints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
