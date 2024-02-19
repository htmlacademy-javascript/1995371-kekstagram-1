import {createNewElement, isEscapeKeydown, createCount} from '../util.js';

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


// Первый вариант

// let onCommentsLoaderClick;

// const getCommentsPack = (commentsData, startIndex) => {
//   if (commentsData) {
//     const fragment = document.createDocumentFragment();
//     commentsData.slice(startIndex, startIndex + COMMENTS_PER_TIME).forEach((commentInfo) => {
//       fragment.append(createComment(commentInfo));
//     });
//     return fragment;
//   }
//   return null;
// };

// const addCommentsPack = (commentsData) => {
//   if (commentsData) {
//     commentsList.append(getCommentsPack(commentsData, commentsList.children.length));
//   }

//   commentsCurrentQuantity.textContent = commentsList.children.length;

//   if (commentsList.children.length === commentsData.length) {
//     commentsLoader.classList.add('hidden');
//   } else {
//     commentsLoader.classList.remove('hidden');
//   }
// };

// const getCommentsLoaderHandler = (commentsData) => {
//   onCommentsLoaderClick = () => {
//     addCommentsPack(commentsData);
//   };
//   return onCommentsLoaderClick;
// };


// Второй вариант
// альтернативный код с отображением комментов, где ты хранишь текущее отображение комментов и сколько есть у определенного поста

// let onCommentsLoaderClick;

// const renderedCommentsQuantity = createCount();

// const getCommentsPack = (commentsData, startIndex = renderedCommentsQuantity.getValue()) => {
//   if (commentsData) {
//     const fragment = document.createDocumentFragment();
//     commentsData
//       .slice(startIndex, startIndex + COMMENTS_PER_TIME)
//       .forEach((commentInfo) => {
//         fragment.append(createComment(commentInfo));
//         renderedCommentsQuantity.increase();
//       });
//     return fragment;
//   }
//   return null;
// };

// const addCommentsPack = (commentsData) => {
//   if (commentsData) {
//     commentsList.append(getCommentsPack(commentsData));
//   }

//   commentsCurrentQuantity.textContent = renderedCommentsQuantity.getValue();

//   if (renderedCommentsQuantity.getValue() === commentsData.length) {
//     commentsLoader.classList.add('hidden');
//   }
// };

// const getCommentsLoaderHandler = (commentsData) => {
//   onCommentsLoaderClick = () => {
//     addCommentsPack(commentsData);
//   };
//   return onCommentsLoaderClick;
// };


// Третий вариант
// в нем мы в разметку добавляем сразу все комменты, а потом при клике отображаем нужное кол-во

const visibleCommentsQuantity = createCount();

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

/* Общая часть
========================================================*/
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


/* openFullPhotoModal для первого варианта */
// const openFullPhotoModal = ({url, likes = 0, comments = [], description = ''}) => {
//   if (url) {
//     fullPhotoImage.src = url;
//     fullPhotoImage.alt = '';
//     photoDescription.textContent = description;
//     likesCount.textContent = likes;
//     commentsQuantity.textContent = comments.length;
//     commentsList.innerHTML = '';

//     addCommentsPack(comments);

//     commentsLoader.addEventListener('click', getCommentsLoaderHandler(comments));
//     document.body.classList.add('modal-open');
//     document.addEventListener('keydown', onEscKeydown, {once: true});
//     fullPhoto.classList.remove('hidden');
//   }
// };


/* openFullPhotoModal для второго варианта */
// const openFullPhotoModal = ({url, likes = 0, comments = [], description = ''}) => {
//   if (url) {
//     fullPhotoImage.src = url;
//     fullPhotoImage.alt = '';
//     photoDescription.textContent = description;
//     likesCount.textContent = likes;
//     commentsQuantity.textContent = comments.length;
//     commentsList.innerHTML = '';

//     renderedCommentsQuantity.setValue(0);
//     commentsLoader.classList.remove('hidden');

//     addCommentsPack(comments);

//     commentsLoader.addEventListener('click', getCommentsLoaderHandler(comments));
//     document.body.classList.add('modal-open');
//     document.addEventListener('keydown', onEscKeydown, {once: true});
//     fullPhoto.classList.remove('hidden');
//   }
// };


/* openFullPhotoModal для третьего варианта */
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

/* Общая часть
========================================================*/
closedButton.addEventListener('click', onClosedButtonClick);

export {openFullPhotoModal};
