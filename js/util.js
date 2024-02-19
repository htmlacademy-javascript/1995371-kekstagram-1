// Математические операции
const getRandomInteger = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const roundToDecimalOrInteger = (value) => {
  if (Number.isInteger(value)) {
    return value.toFixed(0);
  }
  return value.toFixed(1);
};

const getFloat = (value) => parseFloat(value);

// Получить случайный элемент массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// Проверки
const isEscapeKeydown = (evt) => evt.key === 'Escape';

// Функция создания DOM-элемента с классом
const createNewElement = (tagName, className) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
};

// Функция создания генератора случайного уникального числа из диапазона
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
const createTextStorage = (initText = '') => ({
  text: initText,
  setText,
  getText,
});

function setText (newText) {
  if (newText || newText === '') {
    this.text = newText;
  }
}

function getText () {
  return this.text;
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

export {getRandomInteger, roundToDecimalOrInteger, getFloat, getRandomArrayElement, isEscapeKeydown, createNewElement, createRandomUniqueIdGenerator, createStateStorage, createTextStorage, createCount};
