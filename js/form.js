import {sendData} from './api.js';
import {resetMapFilters, startMapFilter} from './form-filter.js';
import {resetMap} from './map.js';
import {setImagesToDefault} from './uploading-images.js';

const MAX_HOUSING_PRICE = 100000;
const formAd = document.querySelector('.ad-form');
const formFilterElement = document.querySelector('.map__filters');
const formAdInteractiveElements = formAd.querySelectorAll('fieldset');
const formFilterInteractiveElements = formFilterElement.querySelectorAll(['select', 'fieldset']);
const formPriceInputElement = formAd.querySelector('#price');
const formRoomNumberInputElement = formAd.querySelector('#room_number');
const formRoomCapacityInputElement = formAd.querySelector('#capacity');
const formHousingTypesElement = formAd.querySelector('#type');
const formCheckInElement = formAd.querySelector('#timein');
const formCheckOutElement = formAd.querySelector('#timeout');
const formTimeParentElement = formAd.querySelector('.ad-form__element--time');
const sliderElement = formAd.querySelector('.ad-form__slider');
const submitButtonElement = formAd.querySelector('.ad-form__submit');
const resetFormButtonElement = formAd.querySelector('.ad-form__reset');

const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const HOUSING_PRICES_BY_TYPE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

Pristine.addMessages('ru', {
  required: 'Это поле должно быть заполнено',
  maxlength: `Должно быть не более \${${1}} символов`,
  minlength: `Должно быть не менее \${${1}} символов`,
});

Pristine.setLocale('ru');

// Function to get minimal price
const getMinPrice = () => HOUSING_PRICES_BY_TYPE[formHousingTypesElement.value];


//  Set form condition
const toggleFormFromEnabled = (value) => {
  formAd.classList.toggle('ad-form--disabled', value);
  formFilterElement.classList.toggle('ad-form--disabled', value);

  formAdInteractiveElements.forEach((element) => {
    element.disabled = value;
  });

  formFilterInteractiveElements.forEach((element) => {
    element.disabled = value;
  });

  if (value) {
    formPriceInputElement.placeholder = getMinPrice();
    formPriceInputElement.min = getMinPrice();

    sliderElement.noUiSlider.updateOptions({
      start: getMinPrice(),
      padding: [getMinPrice(), 0],
    });
  }
};

const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});


// Set minimal price in placeholder, min attribute and slider
formHousingTypesElement.addEventListener('change', () => {
  formPriceInputElement.placeholder = getMinPrice();
  formPriceInputElement.min = getMinPrice();
  sliderElement.noUiSlider.updateOptions({
    start: getMinPrice(),
    padding: [getMinPrice(), 0],
  });
});


// Rooms validation
const validateCapacity = (value) => ROOMS_CAPACITY[formRoomNumberInputElement.value].includes(value);
pristine.addValidator(formRoomCapacityInputElement, validateCapacity, 'Выберите верное количество комнат и гостей');
formAd.addEventListener('change', () => {
  pristine.validate(formRoomCapacityInputElement);
});


// Price validation
const validatePrice = (value) => value >= getMinPrice() && value <= MAX_HOUSING_PRICE;
const getPriceErrorMessage = () => `Не менее ${getMinPrice()} и не более ${MAX_HOUSING_PRICE}`;
pristine.addValidator(formPriceInputElement, validatePrice, getPriceErrorMessage);


//input
formPriceInputElement.addEventListener('change', () => {
  // pristine.validate(formPriceInput);
  sliderElement.noUiSlider.set(formPriceInputElement.value);
});


// Checkin and checkout synchronization
formTimeParentElement.addEventListener('change', (evt) => {
  formCheckOutElement.value = evt.target.value;
  formCheckInElement.value = evt.target.value;
});


//Slider for price
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_HOUSING_PRICE,
  },
  start: getMinPrice(),
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  formPriceInputElement.value = sliderElement.noUiSlider.get();
  pristine.validate(formPriceInputElement);
});

const submitFormHandler = () => {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    if(pristine.validate()) {
      sendData(formData);
    }
  });
};

const resetForm = () => {
  formAd.reset();
  pristine.reset();
  resetMap();
  resetMapFilters();
  startMapFilter();
  setImagesToDefault();
};

const resetFormButtonHandler = () => {
  resetFormButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    resetMap();
    pristine.reset();
    sliderElement.noUiSlider.updateOptions({
      start: getMinPrice(),
      padding: [getMinPrice(), 0],
    });
  });
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Идет публикация...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

export {toggleFormFromEnabled, submitFormHandler, resetForm, unblockSubmitButton, blockSubmitButton, resetFormButtonHandler};
