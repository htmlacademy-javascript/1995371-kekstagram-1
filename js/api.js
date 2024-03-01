const Route = {
  BASE: 'https://28.javascript.htmlacademy.pro/kekstagram',
  GET: '/data',
  POST: '',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET: 'Не удалось загрузить фото других пользователей. Попробуйте перезагрузить страницу.',
  POST: 'Не удалось отправить форму. Попробуйте ещё раз.',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${Route['BASE']}${route}`, {method, body})
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error();
    })
    .then((response) => response.json())
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route['GET'], ErrorText['GET']);
const sendData = (body) => load(Route['POST'], ErrorText['POST'], Method['POST'], body);

export { getData, sendData };
