# 🚀 Integration Dashboard (React + Flask)

Полнофункциональное веб-приложение для управления интеграциями с внешними сервисами (Ozon API, Google Sheets, Webhooks). Проект демонстрирует навыки разработки SPA-приложений на современном стеке, работу с REST API, архитектурные паттерны и создание удобного интерфейса.

## 🔥 Ключевые возможности

- **Полный CRUD:** Создание, чтение, редактирование и удаление записей о статусах интеграций.
- **Умная фильтрация:** Поиск по названию с debounce-эффектом и фильтрация по статусам.
- **Пагинация:** Серверная пагинация с удобной навигацией.
- **Обработка состояний:** Индикаторы загрузки (Skeleton/Loader), обработка ошибок API и пустых состояний (Empty state).
- **Валидация форм:** Строгая типизация и валидация вводимых данных через Zod.
- **Оптимистичные обновления:** Мгновенное обновление UI при изменении данных благодаря TanStack Query.

## 🛠 Технологический стек

**Frontend:**
- **React 18** + **TypeScript** (строгая типизация)
- **Vite** (сверхбыстрый сборщик)
- **FSD-архитектура** (Feature-Sliced Design)
- **TanStack Query (React Query)** (управление серверным состоянием, кэширование)
- **Zustand** (легковесное управление глобальным состоянием клиента)
- **React Hook Form + Zod** (работа с формами и валидация)
- **SCSS Modules** (стилизация с использованием CSS-переменных)

**Backend (Mock API):**
- **Python 3.10+**
- **Flask** (создание REST API)
- **Flask-CORS** (настройка кросс-доменных запросов)

## 🏗 Архитектура (FSD)

Проект спроектирован по методологии **Feature-Sliced Design**, что обеспечивает масштабируемость и легкость поддержки:

```text
src/
├── app/           # Провайдеры, глобальные стили, роутинг
├── pages/         # Страницы приложения (DashboardPage)
├── widgets/       # Самостоятельные блоки (DataTable, FiltersPanel)
├── features/      # Действия пользователя (RecordForm, DeleteRecord)
├── entities/      # Бизнес-сущности (Record: типы, API, модель состояния)
└── shared/        # Переиспользуемый код (UI-кит, API-клиент, утилиты)

1. Запуск Backend (Flask)
bash
cd backend
python -m venv venv
source venv/bin/activate  # Для Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
Сервер запустится на http://localhost:5000

2. Запуск Frontend (React)
bash
cd frontend
npm install
npm run dev
Приложение будет доступно по адресу http://localhost:3000

📸 Скриншоты

<img width="1359" height="1046" alt="image" src="https://github.com/user-attachments/assets/9fadeed6-12fc-47b5-90d7-cf51ef5f3f19" />
Скриншот основной страницы

<img width="411" height="197" alt="image" src="https://github.com/user-attachments/assets/332cee50-b3da-4305-9513-73f8cc92d9f1" />
<img width="1348" height="1026" alt="image" src="https://github.com/user-attachments/assets/131b1c04-3479-4d39-a541-ba51e02221a4" />
Скриншот таблицы с фильтрами

<img width="600" height="425" alt="image" src="https://github.com/user-attachments/assets/571cf756-f6a2-4cac-9667-0cf8e87e82ce" />
Скриншот формы создания

<img width="601" height="426" alt="image" src="https://github.com/user-attachments/assets/1359088d-a0d9-4b03-93b5-3b349190c5c3" />
Скриншот формы кнопки "Изменить"

💡 Реализованные Best Practices
Разделение ответственности: Логика работы с API (entities) полностью отделена от UI (widgets, pages).

Типизация: Все данные от API и пропсы компонентов строго типизированы (TypeScript).

Обработка ошибок: Graceful degradation — если API падает, пользователь видит понятное сообщение об ошибке.

Композиция: Компоненты не перегружены логикой, используется композиционный подход.

👨‍💻 Автор
Ткачёва Анастасия

GitHub: @Tkaheva

Email: tkachevaanastasia1@gmail.com

text

---

4. Сделай коммит и запушь изменения:
   ```bash
   git add .
   git commit -m "docs: add README and screenshots"
   git push
