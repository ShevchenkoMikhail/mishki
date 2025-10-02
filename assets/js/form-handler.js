// form-handler.js — обработка отправки формы через Google Apps Script
console.log("MishKi Agency: form-handler.js loaded");

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Показываем индикатор загрузки
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Получаем данные формы
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      consent: document.getElementById('consent').checked
    };
    
    // Отправляем данные на Google Apps Script
    // ВАЖНО: Замените YOUR_APPS_SCRIPT_URL на URL вашего веб-приложения из Google Apps Script
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyl0OqqCPuxdAsjEbZKKa5p6awRPDjuPb3mXJmp6-2i0OzUJy4XdkC36_NZGGNxRi1E/exec';
    
    // Пробуем отправить как FormData (более совместимо с Google Apps Script)
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('consent', formData.consent);
    
    fetch(scriptUrl, {
      method: 'POST',
      body: formDataToSend
    })
    .then(response => {
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Проверяем, является ли ответ JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        // Если не JSON, читаем как текст
        return response.text().then(text => {
          console.log('Response text:', text);
          return { success: true, message: 'Data sent successfully' };
        });
      }
    })
    .then(data => {
      console.log('Response data:', data);
      if (data.success || data.message) {
        showStatus('success', 'Thank you! Your message has been sent. We will contact you within 24 hours.');
        form.reset();
      } else {
        showStatus('error', 'An error occurred while sending. Please try again or contact us directly at info@mishki.agency');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showStatus('error', 'An error occurred while sending. Please try again or contact us directly at info@mishki.agency');
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
  });
  
  function showStatus(type, message) {
    statusDiv.style.display = 'block';
    statusDiv.className = `form-status ${type}`;
    statusDiv.textContent = message;
    
    // Скрываем статус через 5 секунд
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }
});
