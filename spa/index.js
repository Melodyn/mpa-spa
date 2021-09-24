const getPage = (name) => fetch(`http://127.0.0.1:3000/api/${name}`).then(res => res.json());

const initPagePath = 'main';
const state = {
  currentPage: '',
  previousPage: '',
  header: '',
};

document.addEventListener('DOMContentLoaded', () => {
  // для имитации загрузки страницы
  const ulEl = document.querySelector('ul');
  ulEl.style.display = 'none';

  const headerEl = document.querySelector('h1');
  const buttons = document.querySelectorAll('li');

  // клиентский рендеринг (CSR)
  const render = () => {
    const { currentPage, previousPage, header } = state;
    headerEl.textContent = header;

    const previousPageButtonEl = document.querySelector(`p`);
    previousPageButtonEl.outerHTML = `<a href="/${previousPage}">${previousPageButtonEl.textContent}</a>`;

    const activePageButtonEl = document.querySelector(`a[href="/${currentPage}"]`);
    activePageButtonEl.outerHTML = `<p>${activePageButtonEl.textContent}</p>`;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      const { tagName, href } = e.target;
      if (tagName !== 'A') return;

      const newPageName = new URL(href).pathname.replace('/', '');
      const { header } = await getPage(newPageName);

      state.previousPage = state.currentPage;
      state.currentPage = newPageName;
      state.header = header;

      render();
    });
  });

  // имитация загрузки страницы
  setTimeout(() => {
    getPage(initPagePath).then(({ header }) => {
      state.previousPage = initPagePath;
      state.currentPage = initPagePath;
      state.header = header;

      render();

      // показать отрисованные кнопки
      ulEl.removeAttribute('style');
    });
  }, 2000);
});
