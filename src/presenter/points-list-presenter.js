import PointListView from '../view/point-list-view.js';
import PointItemView from '../view/point-item-view.js';
import SortView from '../view/sort-view.js';
import AddNewPointFormView from '../view/add-new-point-view.js';
import EditPointFormView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class PointsListPresenter {
  pointListComponent = new PointListView();
  pointItemComponent = new PointItemView();

  constructor({pointListContainer}) {
    this.pointListContainer = pointListContainer;
  }

  init() {
    render(new SortView(), this.pointListContainer);
    render(this.pointListComponent, this.pointListContainer);
    render(this.pointItemComponent, this.pointListComponent.getElement());
    render(new EditPointFormView(), this.pointItemComponent.getElement());
    render(new AddNewPointFormView(), this.pointItemComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointItemComponent.getElement());
    }
  }
}
