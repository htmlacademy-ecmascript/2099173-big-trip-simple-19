import {render} from './framework/render.js';
import PointsListPresenter from './presenter/points-list-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = document.querySelector('.trip-main__trip-controls');
const tripEventSectionElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const pointsListPresenter = new PointsListPresenter({
  pointListContainer: tripEventSectionElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewEventButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  pointsListPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render (newPointButtonComponent, tripMainElement);

filterPresenter.init();
pointsListPresenter.init();
