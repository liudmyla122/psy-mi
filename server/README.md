# PSY MI Backend Server

Сервер для аутентификации и управления пользователями приложения PSY MI.

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Настройте переменные окружения:
```bash
cp .env.example .env
```

Отредактируйте `.env` файл и укажите:
- `DATABASE_URL` - строка подключения к PostgreSQL базе данных
- `JWT_SECRET` - секретный ключ для JWT токенов
- `PORT` - порт сервера (по умолчанию 3000)

3. Сгенерируйте Prisma клиент:
```bash
npm run prisma:generate
```

4. Примените миграции базы данных:
```bash
npm run prisma:migrate
```

## Запуск

### Режим разработки:
```bash
npm run dev
```

### Продакшн режим:
```bash
npm run build
npm start
```

## API Endpoints

### Регистрация пользователя
```
POST /api/auth/users/
Body: {
  "email": "user@example.com",
  "password": "password123",
  "re_password": "password123",
  "first_name": "John",
  "scope": "CEO"
}
```

### Вход пользователя
```
POST /api/auth/token/login/
Body: {
  "email": "user@example.com",
  "password": "password123"
}
Response: {
  "auth_token": "jwt-token"
}
```

### Получение информации о пользователе
```
GET /api/auth/users/me/
Headers: {
  "Authorization": "Token jwt-token"
}
```

### Выход пользователя
```
POST /api/auth/token/logout/
Headers: {
  "Authorization": "Token jwt-token"
}
```

## Структура проекта

```
server/
├── src/
│   └── index.ts          # Основной файл сервера
├── prisma/
│   └── schema.prisma     # Схема базы данных
├── .env                  # Переменные окружения
├── package.json
└── tsconfig.json
```

