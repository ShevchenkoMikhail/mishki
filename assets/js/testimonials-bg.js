/**
 * Dynamic background animation for testimonials section
 * Inspired by JetBrains TeamCity design
 */

class TestimonialsBackground {
  constructor() {
    this.container = document.getElementById('testimonials-bg');
    this.blobs = [];
    this.animationId = null;
    this.startTime = 0;
    
    // Настраиваемые параметры
    this.config = {
      blobCount: 200,           // Количество blobs
      speed: 1.5,             // Скорость анимации (0.1 - медленно, 2.0 - быстро)
      amplitude: 50,          // Амплитуда движения в пикселях
      opacity: 1.0,          // Прозрачность blobs (0.0 - 1.0)
      brightness: 3.0,         // Яркость blobs (1.0 - обычная, 3.0 - очень яркие)
      colors: [               // Цвета blobs
        'rgba(59, 130, 246, 0.15)',    // Синий
        'rgba(139, 92, 246, 0.12)',    // Фиолетовый
        'rgba(16, 185, 129, 0.10)',    // Зеленый
        'rgba(236, 72, 153, 0.08)',    // Розовый
        'rgba(245, 158, 11, 0.10)',    // Желтый
        'rgba(239, 68, 68, 0.08)'      // Красный
      ],
      sizes: [120, 150, 180, 200, 160, 140], // Размеры blobs
      blur: 40                // Размытие blobs
    };
    
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    this.createBlobs();
    this.startAnimation();
    this.handleResize();
  }
  
  createBlobs() {
    // Очищаем существующие blobs
    this.container.innerHTML = '';
    this.blobs = [];
    
    for (let i = 0; i < this.config.blobCount; i++) {
      const blob = document.createElement('div');
      blob.className = 'dynamic-blob';
      
      // Случайные начальные позиции
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Случайные параметры анимации
      const phaseX = Math.random() * Math.PI * 2;
      const phaseY = Math.random() * Math.PI * 2;
      const speedX = 0.3 + Math.random() * 0.4;
      const speedY = 0.3 + Math.random() * 0.4;
      
      blob.style.cssText = `
        position: absolute;
        width: ${this.config.sizes[i]}px;
        height: ${this.config.sizes[i]}px;
        background: ${this.config.colors[i]};
        border-radius: 50%;
        filter: blur(${this.config.blur}px) brightness(${this.config.brightness});
        left: ${x}%;
        top: ${y}%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        will-change: transform;
      `;
      
      this.container.appendChild(blob);
      
      this.blobs.push({
        element: blob,
        phaseX,
        phaseY,
        speedX,
        speedY,
        baseX: x,
        baseY: y
      });
    }
  }
  
  animateBlobs(timestamp) {
    if (!this.startTime) this.startTime = timestamp;
    const elapsed = (timestamp - this.startTime) * this.config.speed * 0.001;
    
    this.blobs.forEach((blob, index) => {
      const { element, phaseX, phaseY, speedX, speedY, baseX, baseY } = blob;
      
      // Вычисляем новые позиции с "дыханием"
      const breathe = Math.sin(elapsed * 0.5) * 0.1 + 1;
      const x = baseX + Math.sin(elapsed * speedX + phaseX) * this.config.amplitude * breathe;
      const y = baseY + Math.sin(elapsed * speedY + phaseY) * this.config.amplitude * breathe;
      
      // Применяем трансформацию
      element.style.transform = `translate(-50%, -50%) scale(${breathe})`;
      element.style.left = `${x}%`;
      element.style.top = `${y}%`;
      
      // Динамическая прозрачность
      const opacity = this.config.opacity * (0.7 + 0.3 * Math.sin(elapsed * 0.3 + index));
      element.style.opacity = opacity;
    });
    
    this.animationId = requestAnimationFrame((timestamp) => this.animateBlobs(timestamp));
  }
  
  startAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.startTime = 0;
    this.animationId = requestAnimationFrame((timestamp) => this.animateBlobs(timestamp));
  }
  
  handleResize() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.createBlobs();
      }, 250);
    });
  }
  
  // Публичные методы для настройки
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.createBlobs();
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, что мы на странице с секцией testimonials
  if (document.getElementById('testimonials-bg')) {
    window.testimonialsBackground = new TestimonialsBackground();
  }
});

// Очистка при выгрузке страницы
window.addEventListener('beforeunload', () => {
  if (window.testimonialsBackground) {
    window.testimonialsBackground.destroy();
  }
});
