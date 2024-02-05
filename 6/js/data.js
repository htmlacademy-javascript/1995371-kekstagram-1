import {getRandomInteger, getRandomArrayElement, createRandomUniqueIdGenerator} from './util.js';

const PHOTO_POSTS_QUANTITY = 25;
const COMMENTS_QUANTITY = 6;

const commentIdsQuantity = PHOTO_POSTS_QUANTITY * COMMENTS_QUANTITY;

const LikesQuantity = {
  MIN: 15,
  MAX: 200,
};

const descriptions = [
  'Не знаю, сколько времени я простоял как вкопанный. Может, совсем не долго. А может быть, и очень долго. Я был в полном отчаянии, а когда вы в отчаянии, вы не очень-то глядите на часы.',
  'Порой жизнь вынуждает нас шевелить извилинами...',
  'Я уполз в тень, как леопард, кипя обидой.',
  'Расчувствоваться-то он расчувствовался, только не в том направлении.',
  'Я считаю, что имя Дживса должно войти в историю, овеянное легендами и сказаниями.',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Валерия',
  'Виктор',
  'Мирослава',
  'Андрей',
  'Ева',
  'Григорий',
  'Родион',
  'Давид',
  'Василиса',
  'Константин',
  'Матвей',
  'София',
  'Екатерина',
  'Полина',
];

const generateCommentId = createRandomUniqueIdGenerator(1, commentIdsQuantity);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const createPhotoPost = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(LikesQuantity.MIN, LikesQuantity.MAX),
  comments: Array.from({length: getRandomInteger(0, COMMENTS_QUANTITY)}, createComment),
});

const createPhotoPosts = () => Array.from({length: PHOTO_POSTS_QUANTITY}, (_, index) => createPhotoPost(index + 1));

export {createPhotoPosts};
