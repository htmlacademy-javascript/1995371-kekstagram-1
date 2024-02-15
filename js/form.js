import {isEscapeKeydown, createStateStorage, createMessageStorage} from './util.js';
import {setScaleSection, clearScaleSection} from './scale.js';

const HASHTAGS_MAX_QUANTITY = 5;
const HASHTAG_MAX_LENGTH = 20;
const REGEX_NOT_ALPHANUMERIC = /[^a-zа-я0-9]/;

const uploadForm = document.querySelector('#upload-select-image');
const uploadImageButton = uploadForm.querySelector('#upload-file');
const imageEditingModal = uploadForm.querySelector('.img-upload__overlay');
const closeButton = imageEditingModal.querySelector('#upload-cancel');
const hashtagInput = imageEditingModal.querySelector('.text__hashtags');
const descriptionInput = imageEditingModal.querySelector('.text__description');

const HashtagErrorMessage = {
  NOT_SHARP_FIRST: 'Хэш-тег должен начинаться с символа # (решётка)',
  FORBIDDEN_SYMBOLS: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  SHARP_ONLY: 'Хеш-тег не может состоять только из одной решётки',
  MAXLENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
  DOUBLE: 'Один и тот же хэш-тег не может быть использован дважды',
  MAXQUANTITY: 'Укажите не более пяти хэш-тегов',
};

const hashtageErrorMessage = createMessageStorage();
const hashtagFocusState = createStateStorage();
const descriptionFocusState = createStateStorage();

const isSharpFirst = (data) => !(data.find((element) => element[0] !== '#'));
const isAlphanumericOnly = (data) => !(data.find((element) => element.slice(1).match(REGEX_NOT_ALPHANUMERIC)));
const isNotSharpOnly = (data) => !(data.find((element) => element.length === 1));
const isLengthWithinLimit = (data) => !(data.find((element) => element.length > HASHTAG_MAX_LENGTH));
const isQuantityWithinLimit = (data) => data.length <= HASHTAGS_MAX_QUANTITY;
const isContentUnique = (data) => {
  const uniqueElements = new Set(data);
  return data.length === uniqueElements.size;
};

// Код показа формы
const openImageEditingModal = () => {
  imageEditingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  setScaleSection();
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
  clearScaleSection();
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

// Код валидации
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((element) => element.length > 0);

  switch (false) {
    case isSharpFirst(hashtags):
      hashtageErrorMessage.setMessageText(HashtagErrorMessage.NOT_SHARP_FIRST);
      return false;

    case isAlphanumericOnly(hashtags):
      hashtageErrorMessage.setMessageText(HashtagErrorMessage.FORBIDDEN_SYMBOLS);
      return false;

    case isNotSharpOnly(hashtags):
      hashtageErrorMessage.setMessageText(HashtagErrorMessage.SHARP_ONLY);
      return false;

    case isLengthWithinLimit(hashtags):
      hashtageErrorMessage.setMessageText(HashtagErrorMessage.MAXLENGTH);
      return false;

    case isContentUnique(hashtags):
      hashtageErrorMessage.setMessageText(HashtagErrorMessage.DOUBLE);
      return false;

    case isQuantityWithinLimit(hashtags):
      hashtageErrorMessage.setMessageText(HashtagErrorMessage.MAXQUANTITY);
      return false;

    default:
      return true;
  }
};

const getHashtageErrorMessage = () => hashtageErrorMessage.getMessageText();


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

pristine.addValidator(hashtagInput, validateHashtags, getHashtageErrorMessage);
uploadForm.addEventListener('submit', (evt) => {
  const valid = pristine.validate();

  if (!valid) {
    evt.preventDefault();
  }
});
