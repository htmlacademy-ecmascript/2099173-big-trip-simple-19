import { getRandomArrayElement} from '../util.js';
import { MOCK_OFFERS } from './offers.js';

const MOCK_OFFERS_BY_TYPE = [
  {
    'type': 'taxi',
    'offers': [
      MOCK_OFFERS[0],
      MOCK_OFFERS[2],
      MOCK_OFFERS[9],
      MOCK_OFFERS[11],
    ]
  },
  {
    'type': 'bus',
    'offers': [
      MOCK_OFFERS[0],
      MOCK_OFFERS[1],
      MOCK_OFFERS[2],
    ]
  },
  {
    'type': 'train',
    'offers': [
      MOCK_OFFERS[0],
      MOCK_OFFERS[1],
      MOCK_OFFERS[2],
      MOCK_OFFERS[3],
    ]
  },
  {
    'type': 'ship',
    'offers': [
      MOCK_OFFERS[0],
      MOCK_OFFERS[1],
      MOCK_OFFERS[2],
      MOCK_OFFERS[7]
    ]
  },
  {
    'type':'drive',
    'offers': [
      MOCK_OFFERS[0],
      MOCK_OFFERS[11],
    ]
  },
  {
    'type': 'flight',
    'offers': [
      MOCK_OFFERS[0],
      MOCK_OFFERS[1],
      MOCK_OFFERS[2],
      MOCK_OFFERS[3],
      MOCK_OFFERS[5],
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      MOCK_OFFERS[9],
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      MOCK_OFFERS[3],
      MOCK_OFFERS[4],
      MOCK_OFFERS[6],
      MOCK_OFFERS[7],
      MOCK_OFFERS[9],
      MOCK_OFFERS[10],
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      MOCK_OFFERS[8]
    ]
  }
];

function getRandomOffersByType() {
  return getRandomArrayElement(MOCK_OFFERS_BY_TYPE);
}

export {getRandomOffersByType};
export {MOCK_OFFERS_BY_TYPE};
