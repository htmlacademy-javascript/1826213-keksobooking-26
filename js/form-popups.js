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

const showErrorMessagePopup = (errorMessage) => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  const errorMessageCloseButton = document.querySelector('.error__button');
  const errorMessageText = document.querySelector('.error__message');
  errorMessageText.textContent = errorMessage;

  errorMessageCloseButton.addEventListener('click', () => {
    message.remove();
  });

  const removeEscHandler = (evt) => {
    if (evt.keyCode === 27) {
      message.remove();
      document.removeEventListener('keydown', removeEscHandler);
    }
  };

  document.addEventListener('keydown', removeEscHandler);


  const removeClickHandler = () => {
    document.removeEventListener('click', removeClickHandler);
    message.remove();
  };

  document.addEventListener('click', removeClickHandler);
};

export {showSuccessMessagePopup, showErrorMessagePopup};
