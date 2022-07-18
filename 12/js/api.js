import { showSuccessMessagePopup, showErrorMessagePopup } from './form-popups.js';
import { resetForm, unblockSubmitButton, blockSubmitButton } from './form.js';

const GET_ADDRESS = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_ADDRESS = 'https://26.javascript.pages.academy/keksobooking';

const getData = async () => {
  let response;
  try {
    response = await fetch(GET_ADDRESS);
    if (!response.ok) {
      throw new Error('Не удалось загрузить объекты :(');
    }
  } catch (err) {
    showErrorMessagePopup(err);
  }

  const ads = await response.json();
  return ads;
};

const sendData = async (body) => {
  let response;
  blockSubmitButton();
  try {
    response = await fetch(
      SEND_ADDRESS,
      {
        method: 'POST',
        body,
      },
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить объявление :(');
    }

    showSuccessMessagePopup();
    unblockSubmitButton();
    resetForm();
  } catch (err) {
    showErrorMessagePopup(err);
    unblockSubmitButton();
  }
};

export {getData, sendData};
