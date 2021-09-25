const http = require('http');

/*
  Сервер отвечает данными в формате JSON.
  Для простоты тут только название страницы.
*/
const pages = {
  main: { header: 'Главная' },
  about: { header: 'Обо мне' },
  contacts: { header: 'Контакты' },
};

// * можно не читать код отсюда
const params = {
  port: 6700,
  host: '127.0.0.1',
};

http
  .createServer((req, res) => {
    // CORS
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2592000,
    };
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers);
      res.end();
      return;
    }

    res.writeHead(200, {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
    });

    // роутинг
    const route = req.url.match(/\/api\/(?<page>\w+)/);
    if (!route) { // Если запрос не к api, то сервер отвечает пустым объектом
      res.end(JSON.stringify({}));
      return;
    }
// * досюда

    // Сопоставляем запрос с данными
    const { groups: { page } } = route;
    const pageContent = pages[page] || {};

    res.end(JSON.stringify(pageContent)); // и отдаём данные
    // как их будет использовать клиент - сервер уже не знает
    // рендеринг ложится на вычислительные мощности клиента
  })
  .listen(params.port, params.host, () => {
    console.info(`Server running on http://${params.host}:${params.port}`);
    console.info('Open file from "spa/index.html" in your browser');
  });
