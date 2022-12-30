import {render} from './framework/render.js';
import PointsListPresenter from './presenter/points-list-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import FilterControlView from './view/filters-view.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = document.querySelector('.trip-main__trip-controls');
const tripEventSectionElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const pointsListPresenter = new PointsListPresenter({
  pointListContainer: tripEventSectionElement,
  pointsModel,
});

render (new NewEventButtonView(), tripMainElement);
render (new FilterControlView(), tripControlsElement);

pointsListPresenter.init();
