import { shuffleArray } from '../util.js';
import { renderThumbs, clearThumbs } from './thumb.js';

const RANDOM_PHOTO_QUANTITY = 10;
const FILTERS_CONTAINER_HIDING_CLASS = 'img-filters--inactive';

const filterContainer = document.querySelector('.img-filters');
const defaultFilterButton = filterContainer.querySelector('#filter-default');
const randomFilterButton = filterContainer.querySelector('#filter-random');
const discussedFilterButton = filterContainer.querySelector('#filter-discussed');

const onDefaultFilterButtonClick = (photoData) => () => {
  clearThumbs();
  renderThumbs(photoData);
};

const onRandomFilterButtonClick = (photoData) => () => {
  clearThumbs();
  const randomPhoto = shuffleArray(photoData.slice());
  renderThumbs(randomPhoto.slice(RANDOM_PHOTO_QUANTITY));
};

const onDiscussedFilterButtonClick = (photoData) => {
  clearThumbs();
  const discussedPhotoData = photoData.slice().sort((a, b) => {
    if (a.comments.length < b.comments.length) {
      return -1;
    } else if (a.comments.length > b.comments.length) {
      return 1;
    }

    return 0;
  });

  renderThumbs(discussedPhotoData);
};

const setFilters = (photoData) => {
  if (filterContainer.classList.contains(FILTERS_CONTAINER_HIDING_CLASS)) {
    filterContainer.classList.remove(FILTERS_CONTAINER_HIDING_CLASS);
  }

  defaultFilterButton.addEventListener('click', onDefaultFilterButtonClick(photoData));
  randomFilterButton.addEventListener('click', onRandomFilterButtonClick(photoData));
  discussedFilterButton.addEventListener('click', onDiscussedFilterButtonClick(photoData));
};

export { setFilters };
