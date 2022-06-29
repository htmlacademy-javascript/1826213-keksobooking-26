const formAd = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');
const formAdInteractiveElements = formAd.querySelectorAll('fieldset');
const formFilterInteractiveElements = formFilter.querySelectorAll(['select', 'fieldset']);
// const formTitleInput = formAd.querySelector('#title');
// const formPriceInput = formAd.querySelector('#price');
const formRoomNumberInput = formAd.querySelector('[name="rooms"]');
const formRoomCapacityInput = formAd.querySelector('[name="capacity"]');

const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const validateCapacity = (value) => ROOMS_CAPACITY[formRoomNumberInput.value].includes(value);

pristine.addValidator(formRoomCapacityInput, validateCapacity, 'Выберите верное количество комнат и гостей');

formAd.addEventListener('change', () => {
  pristine.validate(formRoomCapacityInput);
});

formAd.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

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

const setEnabledCondition = () => {
  formAd.classList.remove('ad-form--disabled');
  formFilter.classList.remove('ad-form--disabled');
  formAdInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  formFilterInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {setDisabledCondition, setEnabledCondition};
