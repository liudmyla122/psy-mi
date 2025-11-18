## PSY MI — React + Vite

### Быстрый старт
1) Установите зависимости:
```bash
npm i
```
2) Запустите дев-сервер:
```bash
npm run dev
```

### Что установится
- react, react-dom — UI
- react-router-dom — маршруты
- react-hook-form — формы
- zod, @hookform/resolvers — валидация
- axios — HTTP-клиент
- zustand — стейт-менеджмент (простые сторы)
- clsx — удобная склейка классов

Dev-инструменты:
- typescript — типы
- vite — сборка/дев-сервер
- eslint + @typescript-eslint + eslint-plugin-react — линтинг
- prettier — форматирование

### Переменные окружения
Создайте файл `.env` в корне (рядом с `package.json`), например:
```
VITE_API_URL=http://localhost:3000/api
```

### Структура проекта
```
src/
  api/            // axios-клиент и запросы
  pages/          // страницы (Register и др.)
  styles/         // общие стили
  App.tsx         // маршруты
  main.tsx        // вход
```

Начальная страница — `/register`. Страница регистрации находится в `src/pages/Register.tsx` и использует локальные стили `src/pages/register.css`. Замените содержимое `Register.tsx` на вашу готовую версию «один в один» или пришлите путь/файл — я перенесу сам.


