import './upload-form/upload-form.js';
import { getData } from './api.js';
import { renderThumbs } from './photo/thumb.js';
import { showAlert } from './alert.js';
import { setFilters } from './photo/filter.js';

getData()
  .then((photoData) => {
    renderThumbs(photoData);
    setFilters(photoData);
  })
  .catch((error) => {
    showAlert(error.message);
  });
