import './upload-form/upload-form.js';
import { getData } from './api.js';
import { renderThumbs } from './photo/thumb.js';
import { showAlert } from './alert.js';

const ALERT_SHOW_TIME = 5000;

getData()
  .then((photoData) => renderThumbs(photoData))
  .catch((error) => {
    showAlert(error.message, ALERT_SHOW_TIME);
  });
