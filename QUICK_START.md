# 🚀 Быстрый старт PSY MI

## Минимальная инструкция для запуска

### 1. Установка зависимостей
```bash
npm install
cd server && npm install && cd ..
```

### 2. Настройка базы данных
```bash
# Создайте базу данных в PostgreSQL
psql -U postgres
CREATE DATABASE psy_mi;
\q
```

### 3. Создайте файлы .env

**`server/.env`:**
```env
DATABASE_URL="postgresql://пользователь:пароль@localhost:5432/psy_mi?schema=public"
JWT_SECRET="ваш-секретный-ключ-минимум-32-символа"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

**`.env` (в корне):**
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Генерация Prisma и миграции
```bash
cd server
npm run prisma:generate
npm run prisma:migrate
cd ..
```

### 5. Запуск
```bash
npm run dev
```

**Готово!** Откройте `http://localhost:5173`

---

📖 **Подробная инструкция:** см. `README.md`
