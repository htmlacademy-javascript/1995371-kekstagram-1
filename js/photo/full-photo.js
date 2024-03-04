import { createNewElement, isEscapeKeydown, createCount } from '../util.js';

const COMMENTS_PER_TIME = 5;

const fullPhotoElement = document.querySelector('.big-picture');
const fullPhotoImageElement = fullPhotoElement.querySelector('.big-picture__img > img');
const photoDescriptionElement = fullPhotoElement.querySelector('.social__caption');
const likesCountElement = fullPhotoElement.querySelector('.likes-count');
const commentsCurrentQuantityElement = fullPhotoElement.querySelector('.comments-current-count');
const commentsQuantityElement = fullPhotoElement.querySelector('.comments-count');
const commentsListElement = fullPhotoElement.querySelector('.social__comments');
const commentsLoaderElement = fullPhotoElement.querySelector('.comments-loader');
const closedButtonElement = fullPhotoElement.querySelector('.big-picture__cancel');

const visibleCommentsQuantity = createCount();

const createComment = (commentInfo) => {
  const commentElement = createNewElement('li', 'social__comment');
  const commentAuthorElement = createNewElement('img', 'social__picture');
  const commentTextElement = createNewElement('p', 'social__text');

  commentAuthorElement.src = commentInfo.avatar;
  commentAuthorElement.alt = commentInfo.name;
  commentAuthorElement.width = 35;
  commentAuthorElement.height = 35;
  commentTextElement.append(commentInfo.message);
  commentElement.append(commentAuthorElement, commentTextElement);
  return commentElement;
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
  const hiddenCommentElements = Array.from(commentsListElement.querySelectorAll('.social__comment.hidden'));

  hiddenCommentElements.slice(0, COMMENTS_PER_TIME).forEach((hiddenComment) => {
    hiddenComment.classList.remove('hidden');
    visibleCommentsQuantity.increase();
  });

  commentsCurrentQuantityElement.textContent = visibleCommentsQuantity.getValue();

  if (!hiddenCommentElements.slice(COMMENTS_PER_TIME).length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {
  showComments();
};

const closeFullPhotoModal = () => {
  fullPhotoElement.classList.add('hidden');
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
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
    fullPhotoImageElement.src = url;
    fullPhotoImageElement.alt = '';
    photoDescriptionElement.textContent = description;
    likesCountElement.textContent = likes;
    commentsQuantityElement.textContent = comments.length;
    commentsListElement.innerHTML = '';
    visibleCommentsQuantity.setValue(0);
    commentsLoaderElement.classList.remove('hidden');
    commentsListElement.append(getComments(comments));
    showComments();
    commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeydown, {once: true});
    fullPhotoElement.classList.remove('hidden');
  }
};

closedButtonElement.addEventListener('click', onClosedButtonClick);

export { openFullPhotoModal };
