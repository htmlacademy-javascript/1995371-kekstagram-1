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

const getRandomInteger = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createUniqueIdGenerator = (initValue) => {
  let id = initValue;
  return () => {
    const currentId = id;
    id++;
    return currentId;
  };
};

const createRandomUniqueIdGenerator = (min, max) => {
  const idValues = [];
  return () => {

    if (idValues.length >= (max - min + 1)) {
      return null;
    }

    let newId = getRandomInteger(min, max);

    while (idValues.includes(newId)) {
      newId = getRandomInteger(min, max);
    }

    idValues.push(newId);
    return newId;
  };
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generateCommentId = createRandomUniqueIdGenerator(1, commentIdsQuantity);
const generatePhotoPostId = createUniqueIdGenerator(1);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const createPhotoPost = () => {
  const id = generatePhotoPostId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInteger(LikesQuantity.MIN, LikesQuantity.MAX),
    comments: Array.from({length: getRandomInteger(0, COMMENTS_QUANTITY)}, createComment),
  };
};

const createPhotoPosts = () => Array.from({length: PHOTO_POSTS_QUANTITY}, createPhotoPost);
