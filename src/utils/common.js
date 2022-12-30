function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger (a, b) {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getSomeRandomArrayElements (someArray) {
  return someArray.slice(getRandomPositiveInteger(0, someArray.length - 1), (getRandomPositiveInteger(0, someArray.length)));
}

export {getRandomArrayElement, getRandomPositiveInteger, getSomeRandomArrayElements};
