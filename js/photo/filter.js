import { shuffleArray, debounce } from '../util.js';
import { renderThumbs, clearThumbs } from './thumb.js';

const RANDOM_PHOTO_QUANTITY = 10;
const FILTERS_CONTAINER_HIDING_CLASS = 'img-filters--inactive';
const CURRENT_FILTER_CLASS = 'img-filters__button--active';
const FILTER_TIMEOUT = 500;

const filterContainer = document.querySelector('.img-filters');
const defaultFilterButton = filterContainer.querySelector('#filter-default');
const randomFilterButton = filterContainer.querySelector('#filter-random');
const discussedFilterButton = filterContainer.querySelector('#filter-discussed');

let currentFilter = defaultFilterButton;

const sortByCommentsQuantity = (a, b) => b.comments.length - a.comments.length;

const rerenderThumbs = debounce((data) => {
  clearThumbs();
  renderThumbs(data);
}, FILTER_TIMEOUT);

const onDefaultFilterButtonClick = (photoData, cb) => () => {
  cb(photoData);

  if (currentFilter === defaultFilterButton) {
    return;
  }

  currentFilter.classList.remove(CURRENT_FILTER_CLASS);
  currentFilter = defaultFilterButton;
  currentFilter.classList.add(CURRENT_FILTER_CLASS);
};

const onRandomFilterButtonClick = (photoData, cb) => () => {
  const randomPhoto = photoData.slice();

  shuffleArray(randomPhoto);
  cb(randomPhoto.slice(0, RANDOM_PHOTO_QUANTITY));

  if (currentFilter === randomFilterButton) {
    return;
  }

  currentFilter.classList.remove(CURRENT_FILTER_CLASS);
  currentFilter = randomFilterButton;
  currentFilter.classList.add(CURRENT_FILTER_CLASS);
};

const onDiscussedFilterButtonClick = (photoData, cb) => () => {
  const discussedPhotoData = photoData.slice().sort((a, b) => sortByCommentsQuantity(a, b));

  cb(discussedPhotoData);

  if (currentFilter === discussedFilterButton) {
    return;
  }

  currentFilter.classList.remove(CURRENT_FILTER_CLASS);
  currentFilter = discussedFilterButton;
  currentFilter.classList.add(CURRENT_FILTER_CLASS);
};

const setFilters = (photoData) => {
  currentFilter = defaultFilterButton;

  if (filterContainer.classList.contains(FILTERS_CONTAINER_HIDING_CLASS)) {
    filterContainer.classList.remove(FILTERS_CONTAINER_HIDING_CLASS);
  }

  defaultFilterButton.addEventListener('click', onDefaultFilterButtonClick(photoData, (data) => rerenderThumbs(data)));
  randomFilterButton.addEventListener('click', onRandomFilterButtonClick(photoData, (data) => rerenderThumbs(data)));
  discussedFilterButton.addEventListener('click', onDiscussedFilterButtonClick(photoData, (data) => rerenderThumbs(data)));
};

export { setFilters };
