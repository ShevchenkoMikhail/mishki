# Настройка Google Apps Script для формы MishKi Agency

## Шаг 1: Создайте Google Таблицу

1. Перейдите на [sheets.google.com](https://sheets.google.com)
2. Создайте новую таблицу
3. В первой строке добавьте заголовки:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Message`
   - E1: `Consent`
4. Сохраните таблицу и скопируйте её ID из URL (часть между `/d/` и `/edit`)

## Шаг 2: Создайте Google Apps Script

1. Перейдите на [script.google.com](https://script.google.com)
2. Создайте новый проект
3. Замените код на следующий:

```javascript
function doPost(e) {
  try {
    // Получаем данные из формы (поддерживаем и JSON и FormData)
    let data;
    if (e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else {
      // Для FormData данные приходят в e.parameter
      data = {
        name: e.parameter.name,
        email: e.parameter.email,
        message: e.parameter.message,
        consent: e.parameter.consent === 'true'
      };
    }
    
    const timestamp = new Date();
    
    // Открываем Google Таблицу
    // ВАЖНО: Замените YOUR_SHEET_ID на ID вашей Google Таблицы
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Добавляем данные в таблицу
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.message,
      data.consent ? 'Yes' : 'No'
    ]);
    
    // Отправляем email
    const emailBody = `
Новая заявка с сайта MishKi Agency:

Имя: ${data.name}
Email: ${data.email}
Сообщение: ${data.message}
Согласие на обработку данных: ${data.consent ? 'Да' : 'Нет'}
Время отправки: ${timestamp}

---
Отправлено автоматически с сайта MishKi Agency
    `;
    
    // ВАЖНО: Замените info@mishki.agency на ваш рабочий email
    MailApp.sendEmail({
      to: 'info@mishki.agency',
      subject: `Новая заявка от ${data.name}`,
      body: emailBody
    });
    
    // Возвращаем успешный ответ
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Данные успешно отправлены'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Ошибка:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Произошла ошибка при обработке данных: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('MishKi Agency Form Handler')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## Шаг 3: Настройте права доступа

1. В Apps Script нажмите "Разрешения"
2. Выберите "Разрешить доступ к Google Таблицам и Gmail"
3. Сохраните проект

## Шаг 4: Разверните как веб-приложение

1. В Apps Script нажмите "Развернуть" → "Новое развертывание"
2. Выберите тип "Веб-приложение"
3. Настройки:
   - Выполнять как: "Я"
   - У кого есть доступ: "Все"
4. Нажмите "Развернуть"
5. Скопируйте URL веб-приложения

## Шаг 5: Обновите JavaScript файл

В файле `assets/js/form-handler.js` замените `YOUR_APPS_SCRIPT_URL` на URL вашего веб-приложения.

## Что нужно заменить:

1. **В Google Apps Script**: Замените `YOUR_SHEET_ID` на ID вашей Google Таблицы
2. **В form-handler.js**: Замените `YOUR_APPS_SCRIPT_URL` на URL вашего веб-приложения
3. **В Apps Script**: Замените `info@mishki.agency` на ваш рабочий email

## Результат:

После настройки все заявки будут автоматически:
- ✅ Сохраняться в Google Таблице с временными метками
- ✅ Отправляться на ваш email
- ✅ Отслеживаться через ваши пиксели аналитики
