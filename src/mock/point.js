import {mockDestinations} from './destination.js';
import {getRandomArrayElement} from '../util.js';
import { getRandomPositiveInteger } from '../util.js';
import {TYPES} from '../const.js';
import { mockOffers } from './offers.js';

const mockPoints = [
  {
    'basePrice': 1100,
    'dateFrom': '2021-07-10T22:55:56.845Z',
    'dateTo': '2021-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 0,
    'offers': [
      mockOffers[0].id,
      mockOffers[2].id,
      mockOffers[9].id,
      mockOffers[11].id,
    ].splice(getRandomPositiveInteger(0, 3), (getRandomPositiveInteger(0, 4))),
    'type':TYPES[0]
  },

  {
    'basePrice': 1200,
    'dateFrom': '2022-07-10T22:55:56.845Z',
    'dateTo': '2022-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 1,
    'offers': [
      mockOffers[0].id,
      mockOffers[1].id,
      mockOffers[2].id,
    ].splice(getRandomPositiveInteger(0, 2), (getRandomPositiveInteger(0, 3))),
    'type':TYPES[1]
  },

  {
    'basePrice': 1500,
    'dateFrom': '2023-07-10T22:55:56.845Z',
    'dateTo': '2023-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 2,
    'offers': [
      mockOffers[0].id,
      mockOffers[1].id,
      mockOffers[2].id,
      mockOffers[3].id,
    ].splice(getRandomPositiveInteger(0, 3), (getRandomPositiveInteger(0, 4))),
    'type':TYPES[2]
  },

  {
    'basePrice': 1400,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 3,
    'offers': [
      mockOffers[0].id,
      mockOffers[1].id,
      mockOffers[2].id,
      mockOffers[7].id
    ].splice(getRandomPositiveInteger(0, 3), (getRandomPositiveInteger(0, 4))),
    'type':TYPES[3]
  },

  {
    'basePrice': 2400,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 4,
    'offers': [
      mockOffers[0].id,
      mockOffers[11].id
    ].splice(getRandomPositiveInteger(0, 1), (getRandomPositiveInteger(0, 2))),
    'type':TYPES[4]
  },

  {
    'basePrice': 2500,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 5,
    'offers': [
      mockOffers[0].id,
      mockOffers[1].id,
      mockOffers[2].id,
      mockOffers[3].id,
      mockOffers[5].id,
    ].splice(getRandomPositiveInteger(0, 3), (getRandomPositiveInteger(0, 3))),
    'type':TYPES[5]
  },

  {
    'basePrice': 2600,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 6,
    'offers': [
      mockOffers[9].id,
    ].splice(0, (getRandomPositiveInteger(0, 1))),
    'type':TYPES[6]
  },

  {
    'basePrice': 2700,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 7,
    'offers': [
      mockOffers[3].id,
      mockOffers[4].id,
      mockOffers[6].id,
      mockOffers[7].id,
      mockOffers[9].id,
      mockOffers[10].id,
    ].splice(getRandomPositiveInteger(0, 5), (getRandomPositiveInteger(0, 6))),
    'type':TYPES[7]
  },

  {
    'basePrice': 2800,
    'dateFrom': '2022-12-10T22:55:56.845Z',
    'dateTo': '2023-02-11T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': 8,
    'offers': [
      mockOffers[8].id
    ].splice(0, (getRandomPositiveInteger(0, 1))),
    'type':TYPES[8]
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
