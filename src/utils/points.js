import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_AND_TIME_FORMAT = 'DD/MM/YY HH:mm';

function humanizeDateInList(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeTimeInList(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function humanizeDateAndTimeInForm(date) {
  return date ? dayjs(date).format(DATE_AND_TIME_FORMAT) : '';
}

export {humanizeDateInList, humanizeTimeInList, humanizeDateAndTimeInForm};
