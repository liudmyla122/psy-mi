# Инструкция по настройке сервера

## Шаги для запуска сервера:

1. **Перейдите в папку server:**
```bash
cd server
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Создайте файл .env:**
Создайте файл `.env` в папке `server/` со следующим содержимым:
```
DATABASE_URL="postgresql://user:password@localhost:5432/psy_mi?schema=public"
JWT_SECRET="your-secret-key-change-in-production-min-32-chars"
PORT=3000
```

Замените:
- `user` и `password` на ваши учетные данные PostgreSQL
- `localhost:5432` на адрес вашей базы данных
- `psy_mi` на имя вашей базы данных
- `your-secret-key-change-in-production-min-32-chars` на случайную строку минимум 32 символа

4. **Сгенерируйте Prisma клиент:**
```bash
npm run prisma:generate
```

5. **Примените миграции базы данных:**
```bash
npm run prisma:migrate
```

6. **Запустите сервер в режиме разработки:**
```bash
npm run dev
```

Сервер будет доступен по адресу: `http://localhost:3000`

## Обновление фронтенда для работы с локальным сервером

Если вы хотите использовать локальный сервер вместо `https://psymi.com.ua`, обновите URL в файле `src/pages/SignUp/Form.tsx`:

Замените:
```typescript
`https://psymi.com.ua/${lang.backend_locale}/api/auth/token/login/`
```

На:
```typescript
`http://localhost:3000/api/auth/token/login/`
```

И аналогично для других эндпоинтов.

