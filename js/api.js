import {showAlert} from './utils.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/dta')
    .then((response) => response.json())
    .then((object) => {
      onSuccess(object);
    })
    .catch(() => {
      showAlert('Ошибка загрузки, попробуйте перезагрузить страницу');
    });
};

export {getData};
