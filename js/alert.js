import { createNewElement } from './util.js';

const ERROR_DEFAULT_TEXT = 'Ошибка загрузки. Попробуйте перезагрузить страницу.';
const ALERT_DEFAULT_SHOW_TIME = 5000;

const showAlert = (errorText = ERROR_DEFAULT_TEXT, showTime = ALERT_DEFAULT_SHOW_TIME) => {
  const bodyElement = document.body;
  const errorElement = createNewElement('div', 'download-error');
  const errorMessageElement = createNewElement('p', 'download-error__text');

  errorMessageElement.textContent = errorText;
  errorElement.append(errorMessageElement);
  bodyElement.append(errorElement);

  setTimeout(() => {
    bodyElement.removeChild(errorElement);
  }, showTime);
};

export { showAlert };
