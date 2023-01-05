import {FilterTypes} from '../const.js';
import {isPointFuture} from './points.js';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => points.filter((point) => isPointFuture(point.dateTo) || !isPointFuture(point.dateTo)),
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateTo))
};

export {filter};
