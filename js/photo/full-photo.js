import { createNewElement, isEscapeKeydown, createCount } from '../util.js';

const COMMENTS_PER_TIME = 5;

const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImage = fullPhoto.querySelector('.big-picture__img > img');
const photoDescription = fullPhoto.querySelector('.social__caption');
const likesCount = fullPhoto.querySelector('.likes-count');
const commentsCurrentQuantity = fullPhoto.querySelector('.comments-current-count');
const commentsQuantity = fullPhoto.querySelector('.comments-count');
const commentsList = fullPhoto.querySelector('.social__comments');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const closedButton = fullPhoto.querySelector('.big-picture__cancel');

const visibleCommentsQuantity = createCount();

const createComment = (commentInfo) => {
  const comment = createNewElement('li', 'social__comment');
  const commentAuthor = createNewElement('img', 'social__picture');
  const commentText = createNewElement('p', 'social__text');

  commentAuthor.src = commentInfo.avatar;
  commentAuthor.alt = commentInfo.name;
  commentAuthor.width = 35;
  commentAuthor.height = 35;
  commentText.append(commentInfo.message);
  comment.append(commentAuthor, commentText);
  return comment;
};

const getComments = (commentsData) => {
  if (commentsData) {
    const fragment = document.createDocumentFragment();

    commentsData.forEach((commentInfo) => {
      const commentElement = createComment(commentInfo);

      commentElement.classList.add('hidden');
      fragment.append(commentElement);
    });
    return fragment;
  }
};

const showComments = () => {
  const hiddenComments = Array.from(commentsList.querySelectorAll('.social__comment.hidden'));

  hiddenComments.slice(0, COMMENTS_PER_TIME).forEach((hiddenComment) => {
    hiddenComment.classList.remove('hidden');
    visibleCommentsQuantity.increase();
  });

  commentsCurrentQuantity.textContent = visibleCommentsQuantity.getValue();

  if (!hiddenComments.slice(COMMENTS_PER_TIME).length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {
  showComments();
};

const closeFullPhotoModal = () => {
  fullPhoto.classList.add('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
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
    photoDescription.textContent = description;
    likesCount.textContent = likes;
    commentsQuantity.textContent = comments.length;
    commentsList.innerHTML = '';
    visibleCommentsQuantity.setValue(0);
    commentsLoader.classList.remove('hidden');
    commentsList.append(getComments(comments));
    showComments();
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeydown, {once: true});
    fullPhoto.classList.remove('hidden');
  }
};

closedButton.addEventListener('click', onClosedButtonClick);

export { openFullPhotoModal };
