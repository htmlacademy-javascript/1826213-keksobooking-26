import {showAlert} from './utils.js';
import { showSuccessMessagePopup, showErrorMessagePopup } from './form-popups.js';
import { resetForm, unblockSubmitButton } from './form.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((object) => {
      onSuccess(object);
    })
    .catch(() => {
      showAlert('Ошибка загрузки, попробуйте перезагрузить страницу');
    });
};


const sendData = (body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessMessagePopup();
        resetForm();
      } else {
        showErrorMessagePopup();
      }
    })
    .catch(() => {
      showErrorMessagePopup();
    }).finally(() => {
      unblockSubmitButton();
    });
};

export {getData, sendData};
