import {createNewElement, isEscapeKeydown} from './util.js';
const COMMENTS_PER_TIME = 5;

const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImage = fullPhoto.querySelector('.big-picture__img > img');
const photoDescription = fullPhoto.querySelector('.social__caption');
const likesCount = fullPhoto.querySelector('.likes-count');
const fullCommentsCount = fullPhoto.querySelector('.social__comment-count');
const commentsQuantity = fullCommentsCount.querySelector('.comments-count');
const commentsList = fullPhoto.querySelector('.social__comments');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const closedButton = fullPhoto.querySelector('.big-picture__cancel');

let onCommentsLoaderClick;

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

const getCommentsPack = (commentsData, startIndex) => {
  if (commentsData) {
    const fragment = document.createDocumentFragment();
    commentsData.slice(startIndex, startIndex + COMMENTS_PER_TIME).forEach((commentInfo) => {
      fragment.append(createComment(commentInfo));
    });
    return fragment;
  }
  return null;
};

const addCommentsPack = (commentsData) => {
  if (commentsData.length > 0) {
    commentsList.append(getCommentsPack(commentsData, commentsList.children.length));
  }

  fullCommentsCount.childNodes[0].textContent = `${commentsList.children.length} из `;

  if (commentsList.children.length === commentsData.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const getCommentsLoaderHandler = (commentsData) => {
  onCommentsLoaderClick = () => {
    addCommentsPack(commentsData);
  };
  return onCommentsLoaderClick;
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

    addCommentsPack(comments);

    commentsLoader.addEventListener('click', getCommentsLoaderHandler(comments));
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeydown, {once: true});
    fullPhoto.classList.remove('hidden');
  }
};

closedButton.addEventListener('click', onClosedButtonClick);

export {openFullPhotoModal};
