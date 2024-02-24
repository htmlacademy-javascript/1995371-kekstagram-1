import { isEscapeKeydown, createStateStorage } from '../util.js';
import { resetValidation, pristine } from './upload-form-validation.js';
import { runScaleSection, stopScaleSection } from './scale.js';
import { runEffects, stopEffects } from './effect.js';
import { showSuccessModal, showErrorModal, messageState } from './message-modal.js';
import { sendData } from '../api.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadImageButton = uploadForm.querySelector('#upload-file');
const imageEditingModal = uploadForm.querySelector('.img-upload__overlay');
const closeButton = imageEditingModal.querySelector('#upload-cancel');
const submitButton = imageEditingModal.querySelector('.img-upload__submit');
const hashtagInput = imageEditingModal.querySelector('.text__hashtags');
const descriptionInput = imageEditingModal.querySelector('.text__description');

const hashtagFocusState = createStateStorage();
const descriptionFocusState = createStateStorage();

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  POSTING: 'Отправляю...',
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.POSTING;
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.DEFAULT;
};

// Код показа формы
const openImageEditingModal = () => {
  imageEditingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  runScaleSection();
  runEffects();
};

const onUploadImageButtonChange = () => {
  openImageEditingModal();
};

// Код закрытия формы
const closeOpenImageEditingModal = () => {
  imageEditingModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  stopScaleSection();
  stopEffects();
  resetValidation();
  uploadForm.reset();
};

function onFormEscKeydown (evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();

    if (!(hashtagFocusState.getState() || descriptionFocusState.getState()) && !messageState.getState()) {
      closeOpenImageEditingModal();
    }
  }
}

function onCloseButtonClick () {
  closeOpenImageEditingModal();
}


uploadImageButton.addEventListener('change', onUploadImageButtonChange);
imageEditingModal.addEventListener('focusin', (evt) => {
  switch (evt.target) {
    case hashtagInput:
      hashtagFocusState.setState(true);
      break;

    case descriptionInput:
      descriptionFocusState.setState(true);
      break;
  }
});

imageEditingModal.addEventListener('focusout', (evt) => {
  switch (evt.target) {
    case hashtagInput:
      hashtagFocusState.setState(false);
      break;

    case descriptionInput:
      descriptionFocusState.setState(false);
      break;
  }
});


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
  disableSubmitButton();

  if (!valid) {
    enableSubmitButton();
    return;
  }

  const formData = new FormData(evt.target);

  sendData(formData)
    .then(showSuccessModal(closeOpenImageEditingModal))
    .catch(showErrorModal())
    .finally(enableSubmitButton);

});
