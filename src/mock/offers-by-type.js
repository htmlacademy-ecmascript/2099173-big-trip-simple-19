import { getRandomArrayElement} from '../util.js';
import { mockOffers } from './offers.js';

const mockOffersByType = [
  {
    'type': 'taxi',
    'offers': [
      mockOffers[0],
      mockOffers[2],
      mockOffers[9],
      mockOffers[11],
    ]
  },
  {
    'type': 'bus',
    'offers': [
      mockOffers[0],
      mockOffers[1],
      mockOffers[2],
    ]
  },
  {
    'type': 'train',
    'offers': [
      mockOffers[0],
      mockOffers[1],
      mockOffers[2],
      mockOffers[3],
    ]
  },
  {
    'type': 'ship',
    'offers': [
      mockOffers[0],
      mockOffers[1],
      mockOffers[2],
      mockOffers[7]
    ]
  },
  {
    'type':'drive',
    'offers': [
      mockOffers[0],
      mockOffers[11],
    ]
  },
  {
    'type': 'flight',
    'offers': [
      mockOffers[0],
      mockOffers[1],
      mockOffers[2],
      mockOffers[3],
      mockOffers[5],
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      mockOffers[9],
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      mockOffers[3],
      mockOffers[4],
      mockOffers[6],
      mockOffers[7],
      mockOffers[9],
      mockOffers[10],
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      mockOffers[8]
    ]
  }
];

function getRandomOffersByType() {
  return getRandomArrayElement(mockOffersByType);
}

export {getRandomOffersByType};
export {mockOffersByType};
