// Функция для проверки на палиндром
const isPalindrome = (string) => {
  const stringToTest = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < Math.floor(stringToTest.length / 2); i++) {
    if (!(stringToTest.at(i) === stringToTest.at(-1 - i))) {
      return false;
    }
  }

  return true;
};

// Функция для получения целого положительного числа из строки с цифрами
const getInteger = (inputData) => {
  const regex = /\D/g;
  const integer = parseInt(inputData.toString().replaceAll(regex, ''), 10);
  return integer;
};

// Функция для увеличения длины строки до заданной путём добавления в её начало заданных символов
const addSymbolsToString = (initString, minLength, additionalString) => {
  let fullString = initString;

  while (fullString.length < minLength) {
    const addedLength = minLength - fullString.length;

    if (additionalString.length <= addedLength) {
      fullString = additionalString + fullString;
    } else {
      fullString = additionalString.slice(0, addedLength) + fullString;
    }
  }

  return fullString;
};

// Функция для проверки длины строки
const checkStringLength = (string, maxLength) => {

  if (string.length <= maxLength) {
    return true;
  }

  return false;
};
