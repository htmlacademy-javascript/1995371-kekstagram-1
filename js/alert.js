import { createNewElement } from './util.js';

const ERROR_DEFAULT_TEXT = 'Ошибка загрузки. Попробуйте перезагрузить страницу.';
const ALERT_DEFAULT_SHOW_TIME = 5000;

const showAlert = (errorText = ERROR_DEFAULT_TEXT, showTime = ALERT_DEFAULT_SHOW_TIME) => {
  const body = document.body;
  const errorElement = createNewElement('div', 'download-error');
  const errorMessage = createNewElement('p', 'download-error__text');

  errorMessage.textContent = errorText;
  errorElement.append(errorMessage);
  body.append(errorElement);
  setTimeout(() => {
    body.removeChild(errorElement);
  }, showTime);
};

export { showAlert };
