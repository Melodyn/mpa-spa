const http = require('http');
const fs = require('fs');
const path = require('path');

const buildPagePath = (pageName) => path.resolve(__dirname, 'html', `${pageName}.html`);
const readPage = (pageName) => fs.readFileSync(buildPagePath(pageName), 'utf-8');

/*
  Сервер на POST-запросы через форму рендерит HTML-страницы и отвечает ими.
  Происходит полная замена страницы, при этом фактического перехода не происходит.

  Для простоты вместо рендеринга, тут просто чтение заранее подготовленных файлов.
*/
const pages = {
  main: readPage('index'),
  about: readPage('about'),
  contacts: readPage('contacts'),
};

// * можно не читать код отсюда
const params = {
  port: 3310,
  host: '127.0.0.1',
};

http
  .createServer((req, res) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Max-Age': 2592000,
    };

    // CORS
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers);
      res.end();
      return;
    }

    if (req.url !== '/spa') {
      res.writeHead(302, {
        ...headers,
        'Location': '/spa',
      });
      res.end();
      return;
    }

    res.writeHead(200, {
      ...headers,
      'Content-Type': 'text/html; charset=utf-8',
    });
// * досюда

    // При загрузке приложения отдаётся главная страница
    if (req.method === 'GET') {
      res.end(pages.main);
      return;
    }
    // Далее обработка POST-запросов из форм

    // Обработка формы
    const chunks = [];
    req // some black magic
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => {
        // Получаем форму в коде
        const body = Buffer.concat(chunks).toString();

        // роутинг на основе скрытого поля (input type hidden)
        const { groups: { page } } = body.match(/page=(?<page>\w+)/);
        const pageContent = pages[page] || ''; // получаем HTML

        res.end(pageContent); // отдаём на клиент готовый HTML
      });
  })
  .listen(params.port, params.host, () => {
    console.info(`Server running on http://${params.host}:${params.port}`);
    console.info(`Open http://${params.host}:${params.port}/spa in your browser`);
  });
