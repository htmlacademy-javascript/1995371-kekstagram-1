import {createNewElement, isEscapeKeydown} from './util.js';

const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImage = fullPhoto.querySelector('.big-picture__img > img');
const photoDescription = fullPhoto.querySelector('.social__caption');
const likesCount = fullPhoto.querySelector('.likes-count');
const commentsCount = fullPhoto.querySelector('.social__comment-count');
const commentsQuantity = fullPhoto.querySelector('.comments-count');
const commentsList = fullPhoto.querySelector('.social__comments');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const closedButton = fullPhoto.querySelector('.big-picture__cancel');

const createComment = (commentInfo) => {
  const comment = createNewElement('li', 'social__comment');
  const commentAuthor = createNewElement('img', 'social__picture');
  commentAuthor.src = commentInfo.avatar;
  commentAuthor.alt = commentInfo.name;
  commentAuthor.width = 35;
  commentAuthor.height = 35;
  const commentText = createNewElement('p', 'social__text');
  commentText.append(commentInfo.message);
  comment.append(commentAuthor, commentText);
  return comment;
};

const closeFullPhotoModal = () => {
  fullPhoto.classList.add('hidden');
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isEscapeKeydown(evt)) {
    evt.preventDefault();
    closeFullPhotoModal();
  }
};

const onClosedButtonClick = () => {
  document.removeEventListener('keydown', onEscKeydown);
  closeFullPhotoModal();
};

const openFullPhotoModal = ({url, likes = 0, comments = [], description = ''}) => {
  if (url) {
    fullPhotoImage.src = url;
    fullPhotoImage.alt = '';
    likesCount.textContent = likes;
    commentsQuantity.textContent = comments.length;
    commentsList.innerHTML = '';

    if (comments.length > 0) {
      const fragment = document.createDocumentFragment();
      comments.forEach((commentInfo) => {
        fragment.append(createComment(commentInfo));
      });
      commentsList.append(fragment);
    }

    photoDescription.textContent = description;
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeydown, {once: true});
    fullPhoto.classList.remove('hidden');
  }
};

closedButton.addEventListener('click', onClosedButtonClick);

export {openFullPhotoModal};
