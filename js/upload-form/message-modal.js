import { isEscapeKeydown, createStateStorage } from '../util.js';

const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');

const messageState = createStateStorage();

const addMessageModal = (modalElement, closeModalButton) => {
  const modalClassName = modalElement.className;
  const modalInnerElement = modalElement.querySelector(`.${modalClassName}__inner`);

  const closeMessageModal = () => {
    document.body.removeChild(modalElement);
    document.removeEventListener('keydown', onMessageModalEscKeydown);
    document.body.removeEventListener('click', onOutsideModalClick);
    messageState.setState(false);
  };

  function onMessageModalEscKeydown(evt) {
    if (isEscapeKeydown(evt)) {
      evt.preventDefault();
      closeMessageModal();
    }
  }

  function onOutsideModalClick(evt) {
    if (!modalInnerElement.contains(evt.target)) {
      evt.preventDefault();
      closeMessageModal();
    }
  }

  document.body.append(modalElement);
  closeModalButton.addEventListener('click', closeMessageModal);
  document.addEventListener('keydown', onMessageModalEscKeydown);
  document.body.addEventListener('click', onOutsideModalClick);
  messageState.setState(true);
};

const showSuccessModal = (cb) => () => {
  const successMessageModalElement = successMessageTemplateElement.cloneNode(true);
  const closeMessageButtonElement = successMessageModalElement.querySelector('.success__button');

  if (cb) {
    cb();
  }

  addMessageModal(successMessageModalElement, closeMessageButtonElement);
};

const showErrorModal = (cb) => () => {
  const errorMessageModalElement = errorMessageTemplateElement.cloneNode(true);
  const closeMessageButtonElement = errorMessageModalElement.querySelector('.error__button');

  if (cb) {
    cb();
  }

  addMessageModal(errorMessageModalElement, closeMessageButtonElement);
};

export { showSuccessModal, showErrorModal, messageState };
