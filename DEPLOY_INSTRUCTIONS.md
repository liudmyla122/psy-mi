# Инструкция по деплою проекта PSY MI

## Проект успешно загружен в GitHub
**Репозиторий:** https://github.com/liudmyla122/psy-mi

## Варианты деплоя для просмотра сайта в реальном режиме

### Вариант 1: Vercel (Рекомендуется)

Vercel - лучший вариант для деплоя React + Vite приложений с бэкендом.

#### Шаги для деплоя:

1. **Перейдите на https://vercel.com**
2. **Войдите через GitHub** (используйте ваш аккаунт liudmyla122)
3. **Нажмите "Add New Project"**
4. **Импортируйте репозиторий** `liudmyla122/psy-mi`
5. **Настройки проекта:**
   - Framework Preset: **Vite**
   - Root Directory: `./` (корень проекта)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Переменные окружения (Environment Variables):**
   - `VITE_API_URL` = `https://ваш-домен.vercel.app/api` (или URL вашего бэкенда)
   
7. **Нажмите "Deploy"**

После деплоя вы получите ссылку вида: `https://psy-mi-xxx.vercel.app`

#### Деплой бэкенда на Vercel:

Для деплоя сервера (папка `server/`):

1. Создайте **отдельный проект** в Vercel для бэкенда
2. Root Directory: `server`
3. Build Command: `npm install && npm run build`
4. Output Directory: `dist` (или оставьте пустым для serverless функций)
5. Переменные окружения:
   - `DATABASE_URL` - ваша строка подключения к PostgreSQL
   - `JWT_SECRET` - секретный ключ
   - `PORT` = `3000`
   - `FRONTEND_URL` = URL вашего фронтенда

### Вариант 2: Netlify

1. Перейдите на https://www.netlify.com
2. Войдите через GitHub
3. Нажмите "Add new site" → "Import an existing project"
4. Выберите репозиторий `liudmyla122/psy-mi`
5. Настройки:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Нажмите "Deploy site"

### Вариант 3: GitHub Pages (только фронтенд)

GitHub Pages уже настроен через GitHub Actions. После каждого push в main ветку проект автоматически деплоится.

**Ссылка будет:** `https://liudmyla122.github.io/psy-mi/`

⚠️ **Важно:** Для GitHub Pages нужно обновить `vite.config.ts`:
```typescript
base: '/psy-mi/'
```

## Быстрый деплой через Vercel CLI

Если у вас установлен Vercel CLI:

```bash
npm i -g vercel
cd "/Users/aminabahteeva/Documents/Мои сайты/Psy MI правки/PSY MI"
vercel
```

Следуйте инструкциям в терминале.

## После деплоя

После успешного деплоя вы получите ссылку для просмотра сайта, которую можно отправить заказчику.

**Пример ссылки:** `https://psy-mi.vercel.app` или `https://psy-mi.netlify.app`

