import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './points-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import {sortPointsDay, sortPointsPrice} from '../utils/points.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterTypes} from '../const.js';
import LoadingView from '../view/loading-view.js';


export default class PointsListPresenter {

  #pointListContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #pointListComponent = new PointListView();
  #pointItemComponent = new PointItemView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #noPointComponent = null;

  #pointPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterTypes.EVERYTHING;
  #isLoading = true;

  constructor({pointListContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter({
      destinations: this.#pointsModel.destinations,
      offers: this.#pointsModel.offers,
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortPointsDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsPrice);
    }
    return filteredPoints;
  }

  get destinations() {
    const destinstions = this.#pointsModel.destinations;
    return destinstions;
  }

  get offers() {
    const offers = this.#pointsModel.offers;
    return offers;
  }

  init() {
    this.#renderBoardPoints();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterTypes.EVERYTHING);
    this.#newPointPresenter.init(this.#pointsModel.destinations, this.#pointsModel.offers);
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoardPoints();
        this.#renderBoardPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearBoardPoints({resetSortType: true});
        this.#renderBoardPoints();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoardPoints();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    remove(this.#sortComponent);
    this.#renderSort();
    this.#clearBoardPoints();
    this.#renderBoardPoints();

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
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.destinations,
      offers: this.offers
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading () {
    render(this.#loadingComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPopints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);
  }

  #clearBoardPoints({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoardPoints () {
    render(this.#pointListComponent, this.#pointListContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;

    if (points.length === 0) {
      this.#renderNoPopints();
      return;
    }

    this.#renderSort();
    render(this.#pointItemComponent, this.#pointListComponent.element);
    this.#renderPoints(points.slice(0, this.points.length));
  }
}
