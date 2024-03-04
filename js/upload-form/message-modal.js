import { isEscapeKeydown, createStateStorage } from '../util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const messageState = createStateStorage();

const addMessageModal = (modalElement, closeModalButton) => {
  const modalClassName = modalElement.className;
  const modalInner = modalElement.querySelector(`.${modalClassName}__inner`);

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
    if (!modalInner.contains(evt.target)) {
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
  const successMessageModal = successMessageTemplate.cloneNode(true);
  const closeMessageButton = successMessageModal.querySelector('.success__button');

  if (cb) {
    cb();
  }

  addMessageModal(successMessageModal, closeMessageButton);
};

const showErrorModal = (cb) => () => {
  const errorMessageModal = errorMessageTemplate.cloneNode(true);
  const closeMessageButton = errorMessageModal.querySelector('.error__button');

  if (cb) {
    cb();
  }

  addMessageModal(errorMessageModal, closeMessageButton);
};

export { showSuccessModal, showErrorModal, messageState };
