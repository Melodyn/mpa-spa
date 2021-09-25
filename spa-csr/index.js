/*
  Из всего ниже идущего кода нас интересует только функция render.
  Именно она обновляет HTML текущей страницы на основе данных,
  поступивших с сервера в "чистом" виде.
*/

const getPage = (name) => fetch(`http://127.0.0.1:6700/api/${name}`).then(res => res.json());

const initPagePath = 'main';
const state = { // такой маленький, а уже React
  currentPage: '',
  previousPage: '',
  header: '',
};

document.addEventListener('DOMContentLoaded', () => {
  // для имитации загрузки страницы
  const ulEl = document.querySelector('ul');
  ulEl.style.display = 'none';

  // главные действующие лица
  const headerEl = document.querySelector('h1');
  const buttons = document.querySelectorAll('li');

  // клиентский рендеринг (CSR)
  const render = () => {
    const { currentPage, previousPage, header } = state;
    // рендеринг заголовка
    headerEl.textContent = header;

    const previousPageButtonEl = document.querySelector(`p`);
    // рендеринг кнопки страницы, с которой ушли
    previousPageButtonEl.outerHTML = `<a href="/${previousPage}">${previousPageButtonEl.textContent}</a>`;

    const activePageButtonEl = document.querySelector(`a[href="/${currentPage}"]`);
    // рендеринг кнопки (отключенной) на которую пришли
    activePageButtonEl.outerHTML = `<p>${activePageButtonEl.textContent}</p>`;
  };

  // MVC на минималках
  buttons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const { tagName, href } = e.target;
      if (tagName !== 'A') return; // некоторое допущение, что все кликают по ссылке

      const newPageName = new URL(href).pathname.replace('/', '');
      // данные с сервера в формате JSON, преобразованные в JS-объект
      const data = await getPage(newPageName);

      state.previousPage = state.currentPage;
      state.currentPage = newPageName;
      state.header = data.header;

      render();
    });
  });

  // имитация загрузки страницы 2 секунды
  setTimeout(() => {
    getPage(initPagePath).then((data) => {
      state.previousPage = initPagePath;
      state.currentPage = initPagePath;
      state.header = data.header;

      render();

      // показать отрисованные кнопки
      ulEl.removeAttribute('style');
    });
  }, 2000);
});
