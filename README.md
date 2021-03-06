# Реализации MPA/SPA CSR/SSR

Простейшая реализация SPA и MPA архитектур с клиентским и серверным рендерингом.

В целях упрощения сделан ряд допущений. Код в js-файлах и каждом index.html покрыт комментариям в минимально необходимом виде.

### Требования

Soft:
* Быть хорошим человеком
* Свободное чтение JavaScript
* Google Chrome >= 93 (из соображений поддержки синтаксиса)
* Владение DevTools для подсматривания за запросами

Hard:
* node.js >= 14
* npm >= 7 (опционально)

### Запуск

MPA+SSR:
```shell
# открыть в браузере
./mpa-ssr/index.html
```

SPA+CSR:
```shell
# запустить
node ./spa-csr/server.js

# открыть в браузере
./spa-csr/index.html
```

SPA+SSR:
```shell
# запустить
node ./spa-ssr/server.js

# открыть в браузере
http://127.0.0.1:3310/spa
```

### Разработка

Если захочется что-то пораскуривать по коду в редакторе, то можно дополнительно выполнить установку зависимостей командой `npm ci`. Это добавит типизацию коду на Node.js. 
