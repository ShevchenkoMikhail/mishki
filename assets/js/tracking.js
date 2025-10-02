// tracking.js — управление пикселями отслеживания для MishKi Agency
console.log("MishKi Agency: tracking.js loaded");

// Функция для отправки событий во все пиксели
function trackEvent(eventName, parameters = {}) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
  }
  
  // Meta Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', eventName, parameters);
  }
  
  // TikTok Pixel
  if (typeof ttq !== 'undefined') {
    ttq.track(eventName, parameters);
  }
  
  console.log(`Event tracked: ${eventName}`, parameters);
}

// Отслеживание отправки формы
function trackFormSubmission(formData) {
  const eventData = {
    event_category: 'engagement',
    event_label: 'contact_form',
    value: 1
  };
  
  trackEvent('form_submit', eventData);
  
  // Специальные события для конверсий
  trackEvent('Contact', eventData); // Для Meta Pixel
  trackEvent('CompleteRegistration', eventData); // Для Meta Pixel
}

// Отслеживание кликов по CTA кнопкам
function trackCTAClick(buttonText, location) {
  const eventData = {
    event_category: 'engagement',
    event_label: buttonText,
    button_location: location
  };
  
  trackEvent('cta_click', eventData);
}

// Отслеживание просмотра страницы
function trackPageView() {
  trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
  });
}

// Отслеживание времени на странице
let startTime = Date.now();
function trackTimeOnPage() {
  const timeSpent = Math.round((Date.now() - startTime) / 1000);
  if (timeSpent > 30) { // Отслеживаем только если пользователь провел больше 30 секунд
    trackEvent('time_on_page', {
      time_spent: timeSpent,
      event_category: 'engagement'
    });
  }
}

// Отслеживание прокрутки до определенных секций
function trackSectionView(sectionName) {
  trackEvent('section_view', {
    section_name: sectionName,
    event_category: 'engagement'
  });
}

// Отслеживание кликов по навигации
function trackNavigationClick(linkText, destination) {
  trackEvent('navigation_click', {
    link_text: linkText,
    destination: destination,
    event_category: 'navigation'
  });
}

// Отслеживание взаимодействия с портфолио
function trackPortfolioInteraction(projectName, action) {
  trackEvent('portfolio_interaction', {
    project_name: projectName,
    action: action,
    event_category: 'engagement'
  });
}

// Экспорт функций для использования в других файлах
window.tracking = {
  trackEvent,
  trackFormSubmission,
  trackCTAClick,
  trackPageView,
  trackTimeOnPage,
  trackSectionView,
  trackNavigationClick,
  trackPortfolioInteraction
};
