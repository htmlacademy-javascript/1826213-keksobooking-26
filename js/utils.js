// import {formAd, pristine} from './form';
// import {resetMap} from './map.js';

const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'orange';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// const resetForm = () => {
//   formAd.reset();
//   pristine.reset();
//   resetMap();
// };

// resetForm();

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export {getRandomNumber, getRandomNumberWithPoint, getRandomArrayElement, showAlert};
