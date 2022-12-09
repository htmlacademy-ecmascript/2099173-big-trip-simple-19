import { render } from './render.js';
import PointsListPresenter from './presenter/points-list-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import FilterControlView from './view/filters-view.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = document.querySelector('.trip-main__trip-controls');
const tripEventSectionElement = document.querySelector('.trip-events');
const pointsListPresenter = new PointsListPresenter({pointListContainer: tripEventSectionElement});

render (new NewEventButtonView(), tripMainElement);
render (new FilterControlView(), tripControlsElement);

pointsListPresenter.init();
