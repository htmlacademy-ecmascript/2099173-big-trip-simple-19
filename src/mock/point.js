import {MOCK_DESTINATIONS} from './destination.js';
import {getRandomArrayElement} from '../util.js';
import { getRandomPositiveInteger } from '../util.js';
import {TYPES} from '../const.js';
import { MOCK_OFFERS } from './offers.js';

function getRandomOffers (mockOffers) {
  return mockOffers.splice(getRandomPositiveInteger(0, mockOffers.length - 1), (getRandomPositiveInteger(0, mockOffers.length)));
}

const mockPoints = [
  {
    'basePrice': 1100,
    'dateFrom': '2021-07-10T22:55:56.845Z',
    'dateTo': '2021-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 0,
    'offers': getRandomOffers([
      MOCK_OFFERS[0].id,
      MOCK_OFFERS[2].id,
      MOCK_OFFERS[9].id,
      MOCK_OFFERS[11].id,
    ]),
    'type':TYPES[0]
  },

  {
    'basePrice': 1200,
    'dateFrom': '2022-07-10T22:55:56.845Z',
    'dateTo': '2022-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 1,
    'offers': getRandomOffers([
      MOCK_OFFERS[0].id,
      MOCK_OFFERS[1].id,
      MOCK_OFFERS[2].id,
    ]),
    'type':TYPES[1]
  },

  {
    'basePrice': 1500,
    'dateFrom': '2023-07-10T22:55:56.845Z',
    'dateTo': '2023-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 2,
    'offers': getRandomOffers([
      MOCK_OFFERS[0].id,
      MOCK_OFFERS[1].id,
      MOCK_OFFERS[2].id,
      MOCK_OFFERS[3].id,
    ]),
    'type':TYPES[2]
  },

  {
    'basePrice': 1400,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 3,
    'offers': getRandomOffers([
      MOCK_OFFERS[0].id,
      MOCK_OFFERS[1].id,
      MOCK_OFFERS[2].id,
      MOCK_OFFERS[7].id
    ]),
    'type':TYPES[3]
  },

  {
    'basePrice': 2400,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 4,
    'offers': getRandomOffers([
      MOCK_OFFERS[0].id,
      MOCK_OFFERS[11].id
    ]),
    'type':TYPES[4]
  },

  {
    'basePrice': 2500,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 5,
    'offers': getRandomOffers([
      MOCK_OFFERS[0].id,
      MOCK_OFFERS[1].id,
      MOCK_OFFERS[2].id,
      MOCK_OFFERS[3].id,
      MOCK_OFFERS[5].id,
    ]),
    'type':TYPES[5]
  },

  {
    'basePrice': 2600,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 6,
    'offers': getRandomOffers([
      MOCK_OFFERS[9].id,
    ]),
    'type':TYPES[6]
  },

  {
    'basePrice': 2700,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 7,
    'offers': getRandomOffers([
      MOCK_OFFERS[3].id,
      MOCK_OFFERS[4].id,
      MOCK_OFFERS[6].id,
      MOCK_OFFERS[7].id,
      MOCK_OFFERS[9].id,
      MOCK_OFFERS[10].id,
    ]),
    'type':TYPES[7]
  },

  {
    'basePrice': 2800,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(MOCK_DESTINATIONS).id,
    'id': 8,
    'offers': getRandomOffers([
      MOCK_OFFERS[8].id
    ]),
    'type':TYPES[8]
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
