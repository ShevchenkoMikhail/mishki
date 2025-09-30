Техническое Задание: Лендинг для "MishKi Agency"

Версия: 1.0
Дата: 29.09.2025

1. Общие требования

1.1. Стек технологий

    HTML: HTML5. Разметка семантическая и валидная (<header>, <main>, <section>).

    CSS: CSS3. Без препроцессоров. Использование CSS-переменных обязательно.

    JavaScript: Нативный JavaScript (ES2020+). Без внешних библиотек и фреймворков.

1.2. Адаптивность (Responsive Design)

    Подход: Mobile-First.

    Контрольные точки (Breakpoints): 320px (min-width), 768px, 1024px, 1280px.

    Горизонтальная прокрутка на любой ширине недопустима.

1.3. Темы оформления

    Тема по умолчанию: Тёмная (dark).

    Дополнительная тема: Светлая (light).

    Реализация: Переключатель в шапке, выбор сохраняется в localStorage.

1.4. Аналитика и Маркетинг

    В теге <head> должны быть предусмотрены комментарии-плейсхолдеры для Meta Pixel и Google Analytics (GA4).

    На странице должны быть прописаны мета-теги для SEO и соцсетей (title, description, og:*).

1.5. Производительность

    Цель: Google PageSpeed Insights (Lighthouse) > 90 по всем основным показателям (Performance, Accessibility, SEO).

    Оптимизация: Изображения в формате .webp. Ленивая загрузка (loading="lazy") для всех изображений ниже первого экрана.

2. Структура проекта (файлы/папки)

/
├── index.html
├── privacy-policy.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── theme.css
│   ├── js/
│   │   ├── main.js
│   │   ├── theme.js
│   │   └── i18n.js         # Скрипт для языков
│   ├── img/
│   │   └── hero-gradient.webp
│   └── icons/
│       ├── logo.svg
│       ├── sun.svg
│       └── moon.svg
├── lang/                   # Папка с переводами
│   ├── en.json
│   └── ru.json
├── robots.txt
└── sitemap.xml

3. Структура страницы (Лендинга)

Последовательность блоков сверху вниз:

    Header (Шапка сайта)

    Hero (Главный экран)

    Services (Наши компетенции)

    Market Growth (Почему это важно сейчас)

    Portfolio (Реализованные проекты)

    About Us (О нас)

    Contact Form (Форма заявки)

    Footer (Подвал сайта)

4. Детальное описание блоков

4.1. Header (Шапка сайта)

    Поведение: Зафиксирована вверху (position: sticky). Фон полупрозрачный, при скролле становится непрозрачным с лёгкой тенью.

    Структура (слева направо):

        Логотип: Ссылка наверх.

        Навигационное меню: Ссылки с плавной прокруткой (Услуги, Портфолио, О нас, Контакты). На мобильных сворачивается в "бургер".

        Переключатель темы: Иконка солнце/луна.

        Переключатель языка: Текстовый EN / RU.

4.2. Hero (Главный экран)

    Визуал: Глубокий чёрный фон с медленно анимированным градиентом (синий, фиолетовый, бирюзовый). Контент по центру.

    Содержимое:

        Заголовок <h1>: Крупный, в 1-2 строки.

        Подзаголовок <p>: Поясняющий текст.

        Кнопка CTA: Большая, заметная, ведёт к форме заявки.

4.3. Services (Наши компетенции)

    Структура: Заголовок и сетка из 8 карточек (4 в ряд на десктопе, 2 на планшете, 1 на мобильном).

    Стиль карточек: Фон — очень тёмно-серый (#1A1A1A) для создания эффекта глубины. При наведении — неоновая обводка и лёгкий подъём.

    Содержимое: 8 карточек, каждая с иконкой, заголовком и описанием ваших услуг (AI/ML, Integrations, Automations и т.д.).

4.4. Market Growth (Почему это важно сейчас)

    Визуал: Акцент на крупной типографике.

    Структура: Заголовок и 2-3 крупных статистических показателя с анимированным "прокручиванием" цифр при появлении на экране.

4.5. Portfolio (Реализованные проекты)

    Структура: Заголовок и сетка из 3-6 карточек-кейсов.

    Стиль карточек: Основа — изображение проекта. При наведении — плавное увеличение картинки и появление оверлея с названием и технологиями.

4.6. About Us (О нас)

    Структура: Двухколоночный макет (слева — текст, справа — фото/визуал).

    Содержимое: Заголовок, текст о миссии агентства и блок с ключевыми цифрами (1000+ решенных проектов, 100+ довольных клиентов, 10+ экспертов в команде).

4.7. Contact Form (Форма заявки)

    Структура: Заголовок, поясняющий текст, 3 поля (Имя, Контакт, Сообщение), чекбокс согласия и кнопка отправки.

    Логика: При нажатии на кнопку появляется alert о том, что заявка принята (без реальной отправки).

4.8. Footer (Подвал сайта)

    Структура: 3 колонки.

    Содержимое: Логотип и копирайт (с авто-обновлением года); контакты (email, соцсети); дублирование навигации и ссылка на политику конфиденциальности.
5. Дизайн-система

5.1. Цветовая палитра (CSS-переменные)

Тёмная тема (по умолчанию):
CSS

:root[data-theme="dark"] {
--bg-primary: #050505;
--bg-secondary: #1A1A1A;
--text-primary: #F5F5F5;
--text-secondary: #A0A0A0;
--accent-gradient: linear-gradient(90deg, #3B82F6, #8B5CF6);
--border-color: rgba(255, 255, 255, 0.1);
}

Светлая тема:
CSS

:root[data-theme="light"] {
--bg-primary: #FFFFFF;
--bg-secondary: #F3F4F6;
--text-primary: #111827;
--text-secondary: #6B7281;
--accent-gradient: linear-gradient(90deg, #3B82F6, #8B5CF6);
--border-color: #E5E7EB;
}

5.2. Типографика

    Шрифт: Inter или системный sans-serif.

    Основной размер: 16px (desktop), 15px (mobile).

    Заголовки <h1>: clamp(2.5rem, 5vw, 4rem), font-weight: 700.

    Заголовки <h2>: clamp(2rem, 4vw, 2.8rem), font-weight: 700.

5.3. Компоненты

    Кнопка (CTA): Высота 48-52px, фон var(--accent-gradient), текст var(--text-primary), transform: scale(1.03) при наведении.

    Карточки (.card): Фон var(--bg-secondary), скругление 12px, обводка 1px solid var(--border-color), transition: all 0.3s ease.

6. Мультиязычность (Internationalization)

   Язык по умолчанию: Английский (en).

   Поддерживаемые языки: en, ru.

   Реализация: Тексты хранятся в /lang/en.json и /lang/ru.json. Скрипт i18n.js находит элементы с атрибутом data-i18n="key" и подставляет текст из JSON. Выбор языка сохраняется в localStorage.

7. Контент-заглушки (EN / RU)

Здесь собраны все тексты для сайта.
Ключ в JSON (data-i18n)	English (en)	Russian (ru)
// Навигация		
nav.services	Services	Услуги
nav.portfolio	Portfolio	Портфолио
nav.about	About Us	О нас
nav.contact	Contact	Контакты
// Главный экран (Hero)		
hero.title	Creating intelligent solutions for your business	Создаём интеллектуальные решения для вашего бизнеса
hero.subtitle	We help automate processes and implement AI technologies for growth and efficiency.	Помогаем автоматизировать процессы и внедрять AI-технологии для роста и эффективности.
hero.cta_button	Discuss the project	Обсудить проект
// Услуги (Services)		
services.title	Our Expertise	Наши компетенции
services.card1.title	AI/ML Solutions	AI/ML Решения
services.card1.desc	We develop and train models for data analysis, forecasting, and decision-making.	Разрабатываем и обучаем модели для анализа данных, прогнозирования и принятия решений.
(...и так далее для всех 8 карточек услуг)		
// Рост рынка (Market Growth)		
market.title	The AI market won't wait	Рынок AI не будет ждать
market.stat1.number	+70%	+70%
market.stat1.desc	average annual growth of investments in AI startups in Europe.	среднегодовой рост инвестиций в AI-стартапы в Европе.
(...и так далее для остальных стат.)		
// Портфолио (Portfolio)		
portfolio.title	Implemented Projects	Реализованные проекты
portfolio.case1.title	Predictive Analytics Platform for FinTech	Платформа предиктивной аналитики для FinTech
// О нас (About Us)		
about.title	More than just code	Больше, чем просто код
about.text	MishKi Agency is a team of strategists, developers, and enthusiasts...	MishKi Agency — это команда стратегов, разработчиков и энтузиастов...
about.stat1	1000+ solved projects	1000+ решенных проектов
about.stat2	100+ happy clients	100+ довольных клиентов
about.stat3	10+ experts in the team	10+ экспертов в команде
// Форма (Contact Form)		
form.title	Ready to start?	Готовы начать?
form.subtitle	Leave your contact details, and we will get in touch within 24 hours...	Оставьте ваши контакты, и мы свяжемся с вами в течение 24 часов...
form.name_placeholder	Your Name	Ваше имя
form.contact_placeholder	Email or Phone	Email или Телефон
form.message_placeholder	Tell us about your task	Расскажите о вашей задаче
form.consent	I agree to the processing of personal data	Я согласен на обработку персональных данных
form.submit_button	Send Request	Отправить заявку

8. Критерии приёмки (Чек-лист)

   [ ] Структура: Все файлы и папки созданы согласно разделу 2.

   [ ] Адаптивность: Сайт корректно отображается на ширине экрана 320px, 768px и 1280px без горизонтальной прокрутки.

   [ ] Функционал:

        [ ] Переключатель темы (свет/тьма) работает и сохраняет выбор после перезагрузки.

        [ ] Переключатель языка (EN/RU) работает и сохраняет выбор. Весь текст на странице меняется.

        [ ] Плавная прокрутка по ссылкам в навигации работает.

        [ ] Кнопка в форме заявки показывает alert.

   [ ] Производительность: Оценка в Lighthouse по ключевым метрикам (Performance, Accessibility) не ниже 90.

   [ ] Качество кода: HTML-код проходит валидацию W3C без ошибок. В консоли браузера нет JS-ошибок.

   [ ] Контент: Весь текстовый контент загружается из соответствующих .json файлов.