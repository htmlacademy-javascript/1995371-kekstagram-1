const getRandomInteger = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

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


const createNewElement = (tagName, className) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
};

const isEscapeKeydown = (evt) => evt.key === 'Escape';

// Функция создания хранилища состояния
const createStateStorage = (initValue = false) => ({
  state: initValue,
  setState,
  getState,
});

function setState (newValue) {
  if (newValue !== undefined) {
    this.state = newValue;
  }
}

function getState () {
  return this.state;
}

// Функция создания хранилища сообщения
const createMessageStorage = (initText = '') => ({
  messageText: initText,
  setMessageText,
  getMessageText,
});

function setMessageText (newText) {
  if (newText) {
    this.messageText = newText;
  }
}

function getMessageText () {
  return this.messageText;
}

// Функция создания счётчика
const createCount = (initValue = 0) => ({
  value: initValue,
  increase,
  decrease,
  getValue,
  setValue,
});

function increase () {
  this.value++;
}

function decrease () {
  this.value--;
}

function getValue () {
  return this.value;
}

function setValue(newValue) {
  const newIntValue = parseInt(newValue, 10);

  if (((typeof newIntValue) !== 'number') || Number.isNaN(newIntValue)) {
    return;
  }

  this.value = newIntValue;
}

export {getRandomInteger, getRandomArrayElement, createRandomUniqueIdGenerator, createNewElement, isEscapeKeydown, createStateStorage, createMessageStorage, createCount};
