# Настройка базы данных PostgreSQL

## Вариант 1: Если PostgreSQL установлен через Homebrew

1. **Найдите путь к PostgreSQL:**
```bash
brew --prefix postgresql@14
# или
brew --prefix postgresql@15
# или
brew --prefix postgresql@16
```

2. **Добавьте в PATH (временно для текущей сессии):**
```bash
export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"
# или для Intel Mac:
export PATH="/usr/local/opt/postgresql@14/bin:$PATH"
```

3. **Создайте базу данных:**
```bash
createdb psy_mi
```

## Вариант 2: Если используется Postgres.app

1. **Откройте Postgres.app**

2. **Используйте встроенный терминал Postgres.app** или добавьте в PATH:
```bash
export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"
createdb psy_mi
```

## Вариант 3: Использование psql напрямую

Если у вас есть доступ к psql, но не к createdb:

```bash
psql -U postgres
```

Затем в psql выполните:
```sql
CREATE DATABASE psy_mi;
\q
```

## Вариант 4: Установка PostgreSQL через Homebrew

Если PostgreSQL не установлен:

```bash
# Установка PostgreSQL
brew install postgresql@14

# Запуск PostgreSQL
brew services start postgresql@14

# Добавление в PATH (добавьте в ~/.zshrc для постоянного эффекта)
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Создание базы данных
createdb psy_mi
```

## Вариант 5: Использование Docker (если установлен)

```bash
# Запуск PostgreSQL в Docker
docker run --name psy-mi-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=psy_mi -p 5432:5432 -d postgres

# Обновите DATABASE_URL в server/.env:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/psy_mi?schema=public"
```

## Проверка подключения

После создания базы данных, проверьте подключение:

```bash
psql -d psy_mi -c "SELECT version();"
```

Если команда выполнилась успешно, база данных создана и работает.

## Обновление server/.env

После создания базы данных, обновите файл `server/.env`:

```
DATABASE_URL="postgresql://ваш_пользователь:ваш_пароль@localhost:5432/psy_mi?schema=public"
```

Если вы использовали стандартную установку:
- Пользователь: ваш системный пользователь (aminabahteeva) или `postgres`
- Пароль: обычно пустой для локальной разработки или тот, который вы установили

Пример для локальной разработки без пароля:
```
DATABASE_URL="postgresql://aminabahteeva@localhost:5432/psy_mi?schema=public"
```


