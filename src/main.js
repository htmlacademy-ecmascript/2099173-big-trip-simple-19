import {render} from './framework/render.js';
import PointsListPresenter from './presenter/points-list-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointApiService from './point-api-service.js';
import DestinationApiService from './destination-api-service.js';
import OffersApiService from './offer-api-service.js';

const AUTHORIZATION = 'Basic n43bdo12nstld0z';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple/';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = document.querySelector('.trip-main__trip-controls');
const tripEventSectionElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel({
  pointsApiService: new PointApiService(END_POINT, AUTHORIZATION),
  destinationsApiService: new DestinationApiService(END_POINT, AUTHORIZATION),
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
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

render(newPointButtonComponent, tripMainElement);
newPointButtonComponent.element.disabled = true;

filterPresenter.init();
pointsListPresenter.init();
pointsModel.init()
  .finally(() => {
    newPointButtonComponent.element.disabled = false;
  });
