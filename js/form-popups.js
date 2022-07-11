const SHOW_SUCCESS_MESSAGE_TIME = 1500;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const showSuccessMessagePopup = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, SHOW_SUCCESS_MESSAGE_TIME);
};

const showErrorMessagePopup = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(message);

  const errorMessageCloseButton = document.querySelector('.error__button');
  errorMessageCloseButton.addEventListener('click', () => {
    message.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      message.remove();
    }
  });

  document.addEventListener('click', () => {
    message.remove();
  });
};

// showErrorMessagePopup();

export {showSuccessMessagePopup, showErrorMessagePopup};
