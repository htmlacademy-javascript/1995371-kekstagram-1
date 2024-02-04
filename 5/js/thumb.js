const thumbTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbsContainer = document.querySelector('.pictures');

const renderThumbs = (photoData) => {
  const thumbsFragment = document.createDocumentFragment();
  photoData.forEach((photo) => {
    const thumb = thumbTemplate.cloneNode(true);
    thumb.querySelector('.picture__img').src = photo.url;
    thumb.querySelector('.picture__likes').textContent = photo.likes;
    thumb.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbsFragment.append(thumb);
  });
  thumbsContainer.append(thumbsFragment);
};

export {renderThumbs};
