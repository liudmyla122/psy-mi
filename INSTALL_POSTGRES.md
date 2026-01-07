# Установка PostgreSQL на macOS

## Шаг 1: Установка Homebrew (если не установлен)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Шаг 2: Установка PostgreSQL

```bash
brew install postgresql@14
```

## Шаг 3: Запуск PostgreSQL

```bash
brew services start postgresql@14
```

## Шаг 4: Добавление в PATH

Добавьте в файл `~/.zshrc`:

```bash
echo 'export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Для Intel Mac используйте:
```bash
echo 'export PATH="/usr/local/opt/postgresql@14/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## Шаг 5: Создание базы данных

```bash
createdb psy_mi
```

## Шаг 6: Обновление server/.env

Откройте `server/.env` и обновите:
```
DATABASE_URL="postgresql://aminabahteeva@localhost:5432/psy_mi?schema=public"
```

(Используйте ваше имя пользователя системы вместо aminabahteeva, если нужно)


