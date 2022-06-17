import {getRandomNumber, getRandomNumberWithPoint} from './utils.js';

const CHECK_TIMES = ['12:00', '13:00', '13:00'];
const HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const FEATURES_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ROOMS_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const TITLES = ['Квартира с видом на море',
  'Шикарные аппартаменты со всеми удобствами',
  'Квартира в центре города',
  'Отель класса люкс'
];
const DESCRIPTIONS = [
  'Отделка в стиле лофт, джаккузи, ежедневная уборка помещения',
  'Удобное расположение, все удобства, превосходная транспортная развязка',
  'Бассейн и зона барбекю во дворе, ежедневная уборка, прачечная, пиццерия в здании',
  'Отсутствие тараканов, чистый туалет, отсутствует ржавчина в водопроводной воде, никаких сюрпризов в диване, лучшие условия!'
];
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createObject = () => {
  const randomPhotoNumber = String(getRandomNumber(1, 10));
  const lat = getRandomNumberWithPoint(35.65000, 35.70000, 5);
  const lng = getRandomNumberWithPoint(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${randomPhotoNumber.length < 2 ? '0' : ''}${randomPhotoNumber}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomNumber(1, 999),
      type: getRandomArrayElement(HOUSING_TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 20),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: FEATURES_TYPES.slice(0, getRandomNumber(1, FEATURES_TYPES.length)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: ROOMS_PHOTOS.slice(0, getRandomNumber(1, ROOMS_PHOTOS.length))
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

export const objectsArray = Array.from({length: 10}, createObject);
