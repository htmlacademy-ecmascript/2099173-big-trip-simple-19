import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_AND_TIME_FORMAT = 'DD/MM/YY HH:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDateInList(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeTimeInList(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function humanizeDateAndTimeInForm(date) {
  return date ? dayjs(date).format(DATE_AND_TIME_FORMAT) : '';
}

function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export {getRandomArrayElement, humanizeDateInList, humanizeTimeInList, humanizeDateAndTimeInForm, getRandomPositiveInteger};
