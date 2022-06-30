const MAX_HOUSING_PRICE = 100000;
const formAd = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');
const formAdInteractiveElements = formAd.querySelectorAll('fieldset');
const formFilterInteractiveElements = formFilter.querySelectorAll(['select', 'fieldset']);
// const formTitleInput = formAd.querySelector('#title');
const formPriceInput = formAd.querySelector('#price');
const formRoomNumberInput = formAd.querySelector('#room_number');
const formRoomCapacityInput = formAd.querySelector('#capacity');
const formHousingTypes = formAd.querySelector('#type');
const formCheckIn = formAd.querySelector('#timein');
const formCheckOut = formAd.querySelector('#timeout');
const formTimeParent = formAd.querySelector('.ad-form__element--time');

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
};

setEnabledCondition();

const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});


// Set minimal price in placeholder and min attribute
formHousingTypes.addEventListener('change', () => {
  formPriceInput.placeholder = getMinPrice();
  formPriceInput.min = getMinPrice();
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

formAd.addEventListener('input', () => {
  pristine.validate(formPriceInput);
});


// Checkin and checkout synchronization
formTimeParent.addEventListener('change', (evt) => {
  formCheckOut.value = evt.target.value;
  formCheckIn.value = evt.target.value;
});


formAd.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

export {setDisabledCondition, setEnabledCondition};
