const formAd = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');
const formAdInteractiveElements = formAd.querySelectorAll('fieldset');
const formFilterInteractiveElements = formFilter.querySelectorAll(['select', 'fieldset']);
// const formTitleInput = formAd.querySelector('#title');
// const formPriceInput = formAd.querySelector('#price');
const formRoomNumberInput = formAd.querySelector('#room-number');
const formRoomCapacityInput = formAd.querySelector('#capacity');

const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};


//synchronize rooms and capacity
const validateCapacity = () => ROOMS_CAPACITY[formRoomNumberInput.value].includes(formRoomCapacityInput.value);
pristine.addValidator(formRoomCapacityInput, validateCapacity, 'Пожалуйста, выберите верное количество гостей или комнат', 1, false);

if (validateCapacity) {
  console.log('form is ok');
} else {
  console.log('form is not ok');
}

formRoomNumberInput.addEventListener('change', () => {
  pristine.validate(formRoomCapacityInput);
});

formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  // const valid = pristine.validate();
  // alert(valid);
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
