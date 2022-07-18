const getRandomNumber = (min, max) => {
  if(min >= 0 && max >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return NaN;
};

const getRandomNumberWithPoint = (min, max, fraction) => {
  if(min >= 0 && max >= 0 && min < max && fraction >= 0 && Number.isInteger(fraction)) {
    return ((Math.random() * (max - min + 1)) + min).toFixed(fraction);
  }
  return NaN;
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomNumber, getRandomNumberWithPoint, getRandomArrayElement, debounce};
