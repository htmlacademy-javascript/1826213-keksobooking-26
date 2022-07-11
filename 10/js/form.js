import {sendData} from './api.js';
import {resetMap} from './map.js';

const MAX_HOUSING_PRICE = 100000;
const formAd = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');
const formAdInteractiveElements = formAd.querySelectorAll('fieldset');
const formFilterInteractiveElements = formFilter.querySelectorAll(['select', 'fieldset']);
const formPriceInput = formAd.querySelector('#price');
const formRoomNumberInput = formAd.querySelector('#room_number');
const formRoomCapacityInput = formAd.querySelector('#capacity');
const formHousingTypes = formAd.querySelector('#type');
const formCheckIn = formAd.querySelector('#timein');
const formCheckOut = formAd.querySelector('#timeout');
const formTimeParent = formAd.querySelector('.ad-form__element--time');
const formAddress = formAd.querySelector('#address');
const sliderElement = formAd.querySelector('.ad-form__slider');
const submitButton = formAd.querySelector('.ad-form__submit');
const resetFormButton = formAd.querySelector('.ad-form__reset');

const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const LIVING_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Идет публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

Pristine.addMessages('ru', {
  required: 'Это поле должно быть заполнено',
  maxlength: `Должно быть не более \${${1}} символов`,
  minlength: `Должно быть не менее \${${1}} символов`,
});

Pristine.setLocale('ru');

// Function to get minimal price
const getMinPrice = () => LIVING_PRICES[formHousingTypes.value];


//  Form to disable
const setDisabledCondition = () => {
  formAd.classList.add('ad-form--disabled');
  formFilter.classList.add('ad-form--disabled');
  formAdInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  formFilterInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  sliderElement.noUiSlider.destroy();
};


// Form to enable
const setEnabledCondition = () => {
  formAd.classList.remove('ad-form--disabled');
  formFilter.classList.remove('ad-form--disabled');
  formAdInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  formFilterInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  formPriceInput.placeholder = getMinPrice();
  formPriceInput.min = getMinPrice();

  sliderElement.noUiSlider.updateOptions({
    start: getMinPrice(),
    padding: [getMinPrice(), 0],
  });
};


const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});


// Set minimal price in placeholder, min attribute and slider
formHousingTypes.addEventListener('change', () => {
  formPriceInput.placeholder = getMinPrice();
  formPriceInput.min = getMinPrice();
  sliderElement.noUiSlider.updateOptions({
    start: getMinPrice(),
    padding: [getMinPrice(), 0],
  });
});


// Rooms validation
const validateCapacity = (value) => ROOMS_CAPACITY[formRoomNumberInput.value].includes(value);
pristine.addValidator(formRoomCapacityInput, validateCapacity, 'Выберите верное количество комнат и гостей');
formAd.addEventListener('change', () => {
  pristine.validate(formRoomCapacityInput);
});


// Price validation
const validatePrice = (value) => value >= getMinPrice() && value <= MAX_HOUSING_PRICE;
const getPriceErrorMessage = () => `Не менее ${getMinPrice()} и не более 100000`;
pristine.addValidator(formPriceInput, validatePrice, getPriceErrorMessage);


//input
formPriceInput.addEventListener('change', () => {
  // pristine.validate(formPriceInput);
  sliderElement.noUiSlider.set(formPriceInput.value);
});


// Checkin and checkout synchronization
formTimeParent.addEventListener('change', (evt) => {
  formCheckOut.value = evt.target.value;
  formCheckIn.value = evt.target.value;
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
  formPriceInput.value = sliderElement.noUiSlider.get();
  pristine.validate(formPriceInput);
});

const allowSubmitForm = () => {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    if(pristine.validate()) {
      blockSubmitButton();
      sendData(formData);
    }
  });
};

const resetForm = () => {
  formAd.reset();
  pristine.reset();
  resetMap();
};

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
  pristine.reset();
  sliderElement.noUiSlider.updateOptions({
    start: getMinPrice(),
    padding: [getMinPrice(), 0],
  });
});

export {setDisabledCondition, setEnabledCondition, formAddress, allowSubmitForm, resetForm, unblockSubmitButton};
