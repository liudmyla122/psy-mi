# 🚀 Инструкция по деплою на Vercel

## Шаг 1: Подготовка

Проект уже загружен в GitHub: https://github.com/liudmyla122/psy-mi

## Шаг 2: Деплой фронтенда на Vercel

### Вариант A: Через веб-интерфейс (Рекомендуется)

1. **Откройте https://vercel.com**
2. **Войдите через GitHub** (используйте аккаунт liudmyla122)
3. **Нажмите "Add New..." → "Project"**
4. **Импортируйте репозиторий:**
   - Найдите `liudmyla122/psy-mi` в списке
   - Нажмите "Import"

5. **Настройки проекта:**
   - **Framework Preset:** Vite (автоматически определится)
   - **Root Directory:** `./` (оставьте пустым)
   - **Build Command:** `npm run build` (уже указано)
   - **Output Directory:** `dist` (уже указано)
   - **Install Command:** `npm install` (уже указано)

6. **Environment Variables (Переменные окружения):**
   - Нажмите "Environment Variables"
   - Добавьте:
     ```
     VITE_API_URL = https://ваш-бэкенд-url.vercel.app/api
     ```
     (Пока можно оставить пустым или использовать `http://localhost:3000/api` для разработки)

7. **Нажмите "Deploy"**

8. **Дождитесь завершения деплоя** (обычно 2-3 минуты)

9. **Получите ссылку:** После деплоя вы получите ссылку вида:
   ```
   https://psy-mi.vercel.app
   ```
   или
   ```
   https://psy-mi-liudmyla122.vercel.app
   ```

### Вариант B: Через Vercel CLI

```bash
# Установите Vercel CLI (если еще не установлен)
npm i -g vercel

# Перейдите в папку проекта
cd "/Users/aminabahteeva/Documents/Мои сайты/Psy MI правки/PSY MI"

# Запустите деплой
vercel

# Следуйте инструкциям:
# - Set up and deploy? Y
# - Which scope? Выберите ваш аккаунт
# - Link to existing project? N (первый раз)
# - Project name? psy-mi
# - Directory? ./
# - Override settings? N
```

## Шаг 3: Деплой бэкенда на Vercel

Для работы API нужно задеплоить сервер отдельно:

1. **Создайте новый проект в Vercel** для бэкенда
2. **Импортируйте тот же репозиторий** `liudmyla122/psy-mi`
3. **Настройки:**
   - **Root Directory:** `server`
   - **Framework Preset:** Other
   - **Build Command:** `npm install && npm run build`
   - **Output Directory:** `dist` (или оставьте пустым)
   - **Install Command:** `npm install`

4. **Environment Variables:**
   ```
   DATABASE_URL = ваша-строка-подключения-postgresql
   JWT_SECRET = ваш-секретный-ключ-минимум-32-символа
   PORT = 3000
   FRONTEND_URL = https://ваш-фронтенд-url.vercel.app
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = ваш-email@gmail.com
   SMTP_PASS = ваш-пароль-приложения
   SMTP_FROM = noreply@psymi.com
   ```

5. **Нажмите "Deploy"**

6. **Обновите VITE_API_URL** в настройках фронтенда на URL бэкенда

## Шаг 4: Альтернатива - Использование отдельного хостинга для бэкенда

Если деплой бэкенда на Vercel вызывает сложности, можно использовать:

- **Railway** (https://railway.app) - простой деплой Node.js приложений
- **Render** (https://render.com) - бесплатный хостинг для бэкенда
- **Heroku** (https://heroku.com) - классический вариант

## После деплоя

✅ **Ссылка на сайт:** `https://psy-mi.vercel.app` (или другая, которую даст Vercel)

✅ **Эта ссылка работает в реальном времени** - все изменения после push в GitHub будут автоматически деплоиться

✅ **Отправьте эту ссылку заказчику** для просмотра сайта

## Автоматический деплой

После первого деплоя, каждый раз когда вы делаете `git push` в ветку `main`, Vercel автоматически:
1. Соберет проект
2. Задеплоит новую версию
3. Обновит сайт

## Проблемы и решения

### Если деплой не работает:
1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что все зависимости установлены
3. Проверьте, что `npm run build` работает локально

### Если API не работает:
1. Убедитесь, что бэкенд задеплоен
2. Проверьте переменную окружения `VITE_API_URL`
3. Проверьте CORS настройки на бэкенде

