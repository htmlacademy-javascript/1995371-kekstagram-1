import {isEscapeKeydown} from './util.js';

const HASHTAGS_MAX_QUANTITY = 5;
const HASHTAG_MAX_LENGTH = 20;
const REGEX = /\W|_/;

const uploadForm = document.querySelector('#upload-select-image');
const uploadImageButton = uploadForm.querySelector('#upload-file');
const imageEditingModal = uploadForm.querySelector('.img-upload__overlay');
const closeButton = imageEditingModal.querySelector('#upload-cancel');
const hashtagInput = imageEditingModal.querySelector('.text__hashtags');

const HashtagErrorMessage = {
  NOT_SHARP_FIRST: 'Хэш-тег должен начинаться с символа # (решётка)',
  FORBIDDEN_SYMBOLS: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  SHARP_ONLY: 'Хеш-тег не может состоять только из одной решётки',
  MAXLENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
  DOUBLE: 'Один и тот же хэш-тег не может быть использован дважды',
  MAXQUANTITY: 'Укажите не более пяти хэш-тегов',
};

const isSharpFirst = (data) => !(data.find((element) => element[0] !== '#'));
const isAlphanumericOnly = (data) => !(data.find((element) => element.slice(1).match(REGEX)));
const isNotSharpOnly = (data) => !(data.find((element) => element.length === 1));
const isLengthWithinLimit = (data) => !(data.find((element) => element.length > HASHTAG_MAX_LENGTH));
const isQuantityWithinLimit = (data) => data.length <= HASHTAGS_MAX_QUANTITY;
const isContentUnique = (data) => {
  for (let i = 0; i < data.length - 1; i++) {

    for (let j = i + 1; j < data.length; j++) {
      if (data[i] === data[j]) {
        return false;
      }
    }
  }

  return true;
};

let hashtageErrorMessage = '';

// Код показа формы
const openImageEditingModal = () => {
  imageEditingModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
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
};

function onEscKeydown (evt) {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    closeOpenImageEditingModal();
  }
}

function onCloseButtonClick () {
  closeOpenImageEditingModal();
}


// Валидация
const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((element) => element.length > 0);

  switch (false) {
    case isSharpFirst(hashtags):
      hashtageErrorMessage = HashtagErrorMessage.NOT_SHARP_FIRST;
      return false;

    case isAlphanumericOnly(hashtags):
      hashtageErrorMessage = HashtagErrorMessage.FORBIDDEN_SYMBOLS;
      return false;

    case isNotSharpOnly(hashtags):
      hashtageErrorMessage = HashtagErrorMessage.SHARP_ONLY;
      return false;

    case isLengthWithinLimit(hashtags):
      hashtageErrorMessage = HashtagErrorMessage.MAXLENGTH;
      return false;

    case isContentUnique(hashtags):
      hashtageErrorMessage = HashtagErrorMessage.DOUBLE;
      return false;

    case isQuantityWithinLimit(hashtags):
      hashtageErrorMessage = HashtagErrorMessage.MAXQUANTITY;
      return false;

    default:
      return true;
  }
};

const getHashtageErrorMessage = () => hashtageErrorMessage;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});


// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

uploadImageButton.addEventListener('change', onUploadImageButtonChange);
pristine.addValidator(hashtagInput, validateHashtags, getHashtageErrorMessage);

uploadForm.addEventListener('submit', (evt) => {
  const valid = pristine.validate();

  if (!valid) {
    evt.preventDefault();
  }
});
