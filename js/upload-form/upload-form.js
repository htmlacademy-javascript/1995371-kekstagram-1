import {isEscapeKeydown, createStateStorage} from '../util.js';
import {resetValidation} from './upload-form-validation.js';
import {runScaleSection, stopScaleSection} from './scale.js';
import {runEffects, stopEffects} from './effect.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadImageButton = uploadForm.querySelector('#upload-file');
const imageEditingModal = uploadForm.querySelector('.img-upload__overlay');
const closeButton = imageEditingModal.querySelector('#upload-cancel');
const hashtagInput = imageEditingModal.querySelector('.text__hashtags');
const descriptionInput = imageEditingModal.querySelector('.text__description');

const hashtagFocusState = createStateStorage();
const descriptionFocusState = createStateStorage();

// Код показа формы
const openImageEditingModal = () => {
  imageEditingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
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
  document.removeEventListener('keydown', onEscKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  stopScaleSection();
  stopEffects();
  resetValidation();
};

function onEscKeydown (evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();

    if (!(hashtagFocusState.getState() || descriptionFocusState.getState())) {
      closeOpenImageEditingModal();
      uploadForm.reset();
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
