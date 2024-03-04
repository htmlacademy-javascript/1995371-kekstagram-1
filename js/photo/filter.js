import { shuffleArray, moveSomeClassName, debounce } from '../util.js';
import { renderThumbs, clearThumbs } from './thumb.js';

const RANDOM_PHOTO_QUANTITY = 10;
const FILTERS_CONTAINER_HIDING_CLASSNAME = 'img-filters--inactive';
const CURRENT_FILTER_CLASSNAME = 'img-filters__button--active';
const FILTER_TIMEOUT = 500;

const filterContainerElement = document.querySelector('.img-filters');
const defaultFilterButtonElement = filterContainerElement.querySelector('#filter-default');
const randomFilterButtonElement = filterContainerElement.querySelector('#filter-random');
const discussedFilterButtonElement = filterContainerElement.querySelector('#filter-discussed');

let currentFilterElement = defaultFilterButtonElement;

const sortByCommentsQuantity = (a, b) => b.comments.length - a.comments.length;

const updateCurrentFilter = (newElement) => {
  if (!newElement) {
    return;
  }

  moveSomeClassName(currentFilterElement, newElement, CURRENT_FILTER_CLASSNAME);
  currentFilterElement = newElement;
};

const rerenderThumbs = debounce((data) => {
  clearThumbs();
  renderThumbs(data);
}, FILTER_TIMEOUT);

const onDefaultFilterButtonClick = (photoData, cb) => () => {
  cb(photoData);

  if (currentFilterElement === defaultFilterButtonElement) {
    return;
  }

  updateCurrentFilter(defaultFilterButtonElement);
};

const onRandomFilterButtonClick = (photoData, cb) => () => {
  const randomPhoto = photoData.slice();

  shuffleArray(randomPhoto);
  cb(randomPhoto.slice(0, RANDOM_PHOTO_QUANTITY));

  if (currentFilterElement === randomFilterButtonElement) {
    return;
  }

  updateCurrentFilter(randomFilterButtonElement);
};

const onDiscussedFilterButtonClick = (photoData, cb) => () => {
  const discussedPhotoData = photoData.slice().sort((a, b) => sortByCommentsQuantity(a, b));

  cb(discussedPhotoData);

  if (currentFilterElement === discussedFilterButtonElement) {
    return;
  }

  updateCurrentFilter(discussedFilterButtonElement);
};

const setFilters = (photoData) => {
  currentFilterElement = defaultFilterButtonElement;

  if (filterContainerElement.classList.contains(FILTERS_CONTAINER_HIDING_CLASSNAME)) {
    filterContainerElement.classList.remove(FILTERS_CONTAINER_HIDING_CLASSNAME);
  }

  defaultFilterButtonElement.addEventListener('click', onDefaultFilterButtonClick(photoData, (data) => rerenderThumbs(data)));
  randomFilterButtonElement.addEventListener('click', onRandomFilterButtonClick(photoData, (data) => rerenderThumbs(data)));
  discussedFilterButtonElement.addEventListener('click', onDiscussedFilterButtonClick(photoData, (data) => rerenderThumbs(data)));
};

export { setFilters };
