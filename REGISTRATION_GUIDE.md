# Инструкция по регистрации в личном кабинете

## Шаг 1: Настройка базы данных

1. **Убедитесь, что PostgreSQL установлен и запущен**

2. **Создайте базу данных:**
```bash
createdb psy_mi
```

Или через psql:
```bash
psql -U postgres
CREATE DATABASE psy_mi;
\q
```

3. **Обновите файл `server/.env`:**
Откройте файл `server/.env` и замените строку подключения:
```
DATABASE_URL="postgresql://ВАШ_ПОЛЬЗОВАТЕЛЬ:ВАШ_ПАРОЛЬ@localhost:5432/psy_mi?schema=public"
```

Замените:
- `ВАШ_ПОЛЬЗОВАТЕЛЬ` - ваше имя пользователя PostgreSQL
- `ВАШ_ПАРОЛЬ` - ваш пароль PostgreSQL

## Шаг 2: Настройка Prisma

1. **Перейдите в папку server:**
```bash
cd server
```

2. **Сгенерируйте Prisma клиент:**
```bash
npm run prisma:generate
```

3. **Примените миграции базы данных:**
```bash
npm run prisma:migrate
```

Если появится запрос на имя миграции, введите: `add_user_fields`

## Шаг 3: Запуск сервера

1. **В папке server запустите сервер:**
```bash
npm run dev
```

Сервер будет доступен на `http://localhost:3000`

## Шаг 4: Обновление фронтенда (если нужно использовать локальный сервер)

Если вы хотите использовать локальный сервер вместо `https://psymi.com.ua`, обновите URL в файлах:

### В файле `src/pages/SignUp/Form.tsx`:

Замените:
```typescript
`https://psymi.com.ua/${lang.backend_locale}/api/auth/token/login/`
```

На:
```typescript
`http://localhost:3000/api/auth/token/login/`
```

И:
```typescript
`https://psymi.com.ua/${lang.backend_locale}/api/auth/users/`
```

На:
```typescript
`http://localhost:3000/api/auth/users/`
```

### В файле `src/pages/Profile/Profile.tsx`:

Замените:
```typescript
`https://psymi.com.ua/${locale}/api/auth/users/me/`
```

На:
```typescript
`http://localhost:3000/api/auth/users/me/`
```

## Шаг 5: Запуск фронтенда

1. **В корневой папке проекта запустите фронтенд:**
```bash
npm run dev
```

2. **Откройте браузер и перейдите на страницу регистрации:**
```
http://localhost:5173/register
```
(или другой порт, который покажет Vite)

## Шаг 6: Регистрация

1. Заполните форму регистрации:
   - Email
   - Имя
   - Пароль (8-16 символов, с заглавной буквой и спецсимволом)
   - Повторите пароль
   - Выберите сферу деятельности

2. Нажмите "Зареєструватися"

3. После успешной регистрации вы будете автоматически перенаправлены в личный кабинет

## Проверка работы

Если все настроено правильно:
- Сервер должен отвечать на `http://localhost:3000/health` с `{"status":"ok"}`
- Фронтенд должен открываться без ошибок
- Регистрация должна работать и перенаправлять в личный кабинет

## Решение проблем

### Ошибка подключения к базе данных
- Проверьте, что PostgreSQL запущен
- Проверьте правильность данных в `server/.env`
- Убедитесь, что база данных `psy_mi` создана

### Ошибка "Cannot find module '@prisma/client'"
```bash
cd server
npm install
npm run prisma:generate
```

### Ошибка CORS
Убедитесь, что сервер запущен и доступен на `http://localhost:3000`


