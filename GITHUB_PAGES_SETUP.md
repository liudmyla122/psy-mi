# 🔧 Правильная настройка GitHub Pages

## ❌ Текущая проблема

На скриншоте видно, что GitHub Pages настроен на:
- **Source:** "Deploy from a branch"
- **Branch:** main
- **Folder:** / (root)

**Это неправильно!** Vite собирает проект в папку `dist`, а не в корень.

## ✅ Правильная настройка

### Вариант 1: Использовать GitHub Actions (Рекомендуется)

1. Перейдите в **Settings** → **Pages**
2. В разделе **"Build and deployment"** → **"Source"**
3. Измените с **"Deploy from a branch"** на **"GitHub Actions"**
4. Сохраните изменения

После этого GitHub Actions workflow (`.github/workflows/deploy.yml`) будет автоматически:
- Собирать проект (`npm run build`)
- Деплоить из папки `dist`
- Обновлять сайт при каждом push в `main`

**Ссылка на сайт:** `https://liudmyla122.github.io/psy-mi/`

### Вариант 2: Деплой из ветки (если Actions не работает)

Если нужно использовать деплой из ветки:

1. В настройках Pages выберите **"Deploy from a branch"**
2. **Branch:** `main`
3. **Folder:** `/dist` (не `/ (root)`!)
4. Но для этого нужно, чтобы папка `dist` была в репозитории

⚠️ **Проблема:** Папка `dist` обычно в `.gitignore`, поэтому этот вариант не сработает.

## 🎯 Рекомендация

**Используйте Вариант 1 (GitHub Actions)** - это правильный и современный способ деплоя.

## 📝 После настройки

1. Сделайте любой commit и push в `main`
2. Перейдите в **Actions** вкладку на GitHub
3. Убедитесь, что workflow запустился и успешно завершился
4. Сайт будет доступен по адресу: `https://liudmyla122.github.io/psy-mi/`

## ⚠️ Важно

Если используете GitHub Pages, нужно обновить `vite.config.ts`:
```typescript
base: '/psy-mi/'
```

Это уже сделано в проекте!

