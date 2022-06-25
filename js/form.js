const formAd = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');
const formAdInteractiveElements = formAd.querySelectorAll('fieldset');
const formFilterInteractiveElements = formFilter.querySelectorAll(['select', 'fieldset']);

const getDisabledCondition = () => {
  formAd.classList.add('ad-form--disabled');
  formFilter.classList.add('ad-form--disabled');
  formAdInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  formFilterInteractiveElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const getEnabledCondition = () => {
  formAd.classList.remove('ad-form--disabled');
  formFilter.classList.remove('ad-form--disabled');
  formAdInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  formFilterInteractiveElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

getDisabledCondition();

export {getDisabledCondition, getEnabledCondition};
