import { openFullPhotoModal } from './full-photo.js';

const thumbTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbsContainer = document.querySelector('.pictures');

const renderThumbs = (photoData) => {
  if (photoData) {
    const thumbsFragment = document.createDocumentFragment();
    photoData.forEach((photo) => {
      const thumb = thumbTemplate.cloneNode(true);
      thumb.querySelector('.picture__img').src = photo.url;
      thumb.querySelector('.picture__likes').textContent = photo.likes;
      thumb.querySelector('.picture__comments').textContent = photo.comments.length;
      thumb.addEventListener('click', () => openFullPhotoModal(photo));
      thumbsFragment.append(thumb);
    });
    thumbsContainer.append(thumbsFragment);
  }
};

const clearThumbs = () => {
  thumbsContainer.innerHTML = '';
};

export { renderThumbs, clearThumbs };
