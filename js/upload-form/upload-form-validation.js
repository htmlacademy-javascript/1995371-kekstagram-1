import { createTextStorage } from '../util.js';

const HASHTAGS_MAX_QUANTITY = 5;
const HASHTAG_MAX_LENGTH = 20;
const REGEX_NOT_ALPHANUMERIC = /[^a-zа-я0-9]/;

const uploadFormElement = document.querySelector('#upload-select-image');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');

const HashtagErrorMessage = {
  NOT_SHARP_FIRST: 'Хэш-тег должен начинаться с символа # (решётка)',
  FORBIDDEN_SYMBOLS: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  SHARP_ONLY: 'Хеш-тег не может состоять только из одной решётки',
  MAXLENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку',
  DOUBLE: 'Один и тот же хэш-тег не может быть использован дважды',
  MAXQUANTITY: 'Укажите не более пяти хэш-тегов',
};

const hashtageErrorMessage = createTextStorage();

const isSharpFirst = (data) => !(data.find((element) => element[0] !== '#'));
const isAlphanumericOnly = (data) => !(data.find((element) => element.slice(1).match(REGEX_NOT_ALPHANUMERIC)));
const isNotSharpOnly = (data) => !(data.find((element) => element.length === 1));
const isLengthWithinLimit = (data) => !(data.find((element) => element.length > HASHTAG_MAX_LENGTH));
const isQuantityWithinLimit = (data) => data.length <= HASHTAGS_MAX_QUANTITY;
const isContentUnique = (data) => {
  const uniqueElements = new Set(data);
  return data.length === uniqueElements.size;
};

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__validation-error',
});

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((element) => element.length > 0);

  switch (false) {
    case isSharpFirst(hashtags):
      hashtageErrorMessage.setText(HashtagErrorMessage.NOT_SHARP_FIRST);
      return false;

    case isAlphanumericOnly(hashtags):
      hashtageErrorMessage.setText(HashtagErrorMessage.FORBIDDEN_SYMBOLS);
      return false;

    case isNotSharpOnly(hashtags):
      hashtageErrorMessage.setText(HashtagErrorMessage.SHARP_ONLY);
      return false;

    case isLengthWithinLimit(hashtags):
      hashtageErrorMessage.setText(HashtagErrorMessage.MAXLENGTH);
      return false;

    case isContentUnique(hashtags):
      hashtageErrorMessage.setText(HashtagErrorMessage.DOUBLE);
      return false;

    case isQuantityWithinLimit(hashtags):
      hashtageErrorMessage.setText(HashtagErrorMessage.MAXQUANTITY);
      return false;

    default:
      return true;
  }
};

const getHashtageErrorMessage = () => hashtageErrorMessage.getText();
const resetValidation = () => pristine.reset();


pristine.addValidator(hashtagInputElement, validateHashtags, getHashtageErrorMessage);

export { resetValidation, pristine };
