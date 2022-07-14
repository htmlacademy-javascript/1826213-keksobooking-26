import { showSuccessMessagePopup, showErrorMessagePopup } from './form-popups.js';
import { resetForm, unblockSubmitButton, blockSubmitButton } from './form.js';

const getData = async (onSuccess) => {
  let response;
  try {
    response = await fetch('https://26.javascript.pages.academy/keksobooking/data');
    if (!response.ok) {
      throw new Error('Не удалось загрузить объекты :(');
    }
  } catch (err) {
    showErrorMessagePopup(err);
  }

  const ads = await response.json();
  onSuccess(ads);
};

const sendData = async (body) => {
  let response;
  blockSubmitButton();
  try {
    response = await fetch(
      'https://26.javascript.pages.academy/keksobooking',
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

// const getData = (onSuccess) => {
//   fetch('https://26.javascript.pages.academy/keksobooking/data')
//     .then((response) => response.json())
//     .then((objects) => {
//       onSuccess(objects);
//     })
//     .catch(() => {
//       showErrorMessagePopup('Не удалось загрузить объекты, попробуйте перезагрузить страницу');
//     });
// };


// const sendData = (body) => {
//   blockSubmitButton();
//   fetch(
//     'https://26.javascript.pages.academy/keksobooking',
//     {
//       method: 'POST',
//       body,
//     },
//   )
//     .then((response) => {
//       if (response.ok) {
//         showSuccessMessagePopup();
//         resetForm();
//       } else {
//         throw new Error();
//       }
//     })
//     .catch(() => {
//       showErrorMessagePopup('Не удалось отправить объявление');
//     }).finally(() => {
//       unblockSubmitButton();
//     });
// };

export {getData, sendData};
