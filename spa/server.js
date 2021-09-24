const http = require('http');

const params = {
  port: 3000,
  host: '127.0.0.1',
};

const pages = {
  main: { header: 'Главная' },
  about: { header: 'Обо мне' },
  contacts: { header: 'Контакты' },
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

    res.writeHead(200, {
      ...headers,
      'Content-Type': 'application/json; charset=utf-8',
    });

    const route = req.url.match(/\/api\/(?<page>\w+)/);
    if (!route) {
      res.end(JSON.stringify({}));
      return;
    }

    const { groups: { page } } = route;
    const pageContent = pages[page] || {};

    res.end(JSON.stringify(pageContent));
  })
  .listen(params.port, params.host, () => {
    console.info(`Server running on http://${params.host}:${params.port}`);
    console.info('Open file from "spa/index.html" in your browser');
  });
