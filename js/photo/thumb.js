import { openFullPhotoModal } from './full-photo.js';

const thumbTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const thumbsContainerElement = document.querySelector('.pictures');

const renderThumbs = (photoData) => {
  if (photoData) {
    const thumbsFragment = document.createDocumentFragment();

    photoData.forEach((photo) => {
      const thumbElement = thumbTemplateElement.cloneNode(true);

      thumbElement.querySelector('.picture__img').src = photo.url;
      thumbElement.querySelector('.picture__likes').textContent = photo.likes;
      thumbElement.querySelector('.picture__comments').textContent = photo.comments.length;
      thumbElement.addEventListener('click', () => openFullPhotoModal(photo));
      thumbsFragment.append(thumbElement);
    });

    thumbsContainerElement.append(thumbsFragment);
  }
};

const clearThumbs = () => {
  thumbsContainerElement.querySelectorAll('a.picture').forEach((element) => thumbsContainerElement.removeChild(element));
};

export { renderThumbs, clearThumbs };
