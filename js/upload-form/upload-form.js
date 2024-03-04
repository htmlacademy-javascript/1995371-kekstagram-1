import { isEscapeKeydown, createStateStorage } from '../util.js';
import { resetValidation, pristine } from './upload-form-validation.js';
import { runScaleSection, stopScaleSection } from './scale.js';
import { runEffects, stopEffects } from './effect.js';
import { showSuccessModal, showErrorModal, messageState } from './message-modal.js';
import { sendData } from '../api.js';
import { updatePreview, UpdatingProperty } from './preview.js';

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadImageButtonElement = uploadFormElement.querySelector('#upload-file');
const previewElement = uploadFormElement.querySelector('.img-upload__preview img');
const imageEditingModalElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = imageEditingModalElement.querySelector('#upload-cancel');
const submitButtonElement = imageEditingModalElement.querySelector('.img-upload__submit');
const hashtagInputElement = imageEditingModalElement.querySelector('.text__hashtags');
const descriptionInputElement = imageEditingModalElement.querySelector('.text__description');
const effectsPreviewsElement = imageEditingModalElement.querySelectorAll('.effects__preview');

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  POSTING: 'Отправляю...',
};

const hashtagFocusState = createStateStorage();
const descriptionFocusState = createStateStorage();

const openImageEditingModal = () => {
  imageEditingModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  runScaleSection();
  runEffects();
};

const closeOpenImageEditingModal = () => {
  imageEditingModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  stopScaleSection();
  stopEffects();
  resetValidation();
  uploadFormElement.reset();
};

const disableSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.POSTING;
};

const enableSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.DEFAULT;
};

const onUploadImageButtonChange = (evt) => {
  updatePreview(evt.target, previewElement, UpdatingProperty['SRC']);

  for (const effectPreview of effectsPreviewsElement) {
    updatePreview(evt.target, effectPreview, UpdatingProperty['BACKGROUND']);
  }

  openImageEditingModal();
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

const onEditingModalFocusin = (evt) => {
  switch (evt.target) {
    case hashtagInputElement:
      hashtagFocusState.setState(true);
      break;

    case descriptionInputElement:
      descriptionFocusState.setState(true);
      break;
  }
};

const onEditingModalFocusout = (evt) => {
  switch (evt.target) {
    case hashtagInputElement:
      hashtagFocusState.setState(false);
      break;

    case descriptionInputElement:
      descriptionFocusState.setState(false);
      break;
  }
};

const onUploadFormSubmit = (evt) => {
  const valid = pristine.validate();

  evt.preventDefault();
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
};

uploadImageButtonElement.addEventListener('change', onUploadImageButtonChange);
imageEditingModalElement.addEventListener('focusin', onEditingModalFocusin);
imageEditingModalElement.addEventListener('focusout', onEditingModalFocusout);
uploadFormElement.addEventListener('submit', onUploadFormSubmit);
