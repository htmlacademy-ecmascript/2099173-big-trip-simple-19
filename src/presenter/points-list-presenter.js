import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';
import AddNewPointFormView from '../view/add-new-point-view.js';
import EditPointFormView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';
import { BLANK_POINT } from '../view/add-new-point-view.js';

export default class PointsListPresenter {
  pointListComponent = new PointListView();
  pointItemComponent = new PointItemView();

  constructor({pointListContainer, pointsModel}) {
    this.pointListContainer = pointListContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.pointListContainer);
    render(this.pointListComponent, this.pointListContainer);
    render(this.pointItemComponent, this.pointListComponent.getElement());
    render(new EditPointFormView({point: this.boardPoints[0]}), this.pointItemComponent.getElement());
    render(new AddNewPointFormView({point: BLANK_POINT}), this.pointItemComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i]}), this.pointItemComponent.getElement());
    }
  }
}
