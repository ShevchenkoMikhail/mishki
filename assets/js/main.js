// main.js — entry point for MishKi Agency landing interactions
// Placeholder file to satisfy project structure per TZ.md Section 2.

console.log("MishKi Agency: main.js loaded");

// Auto-update copyright year in footer
(function() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();

// Scroll reveal animation with Intersection Observer
(function() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px'
  });
  
  revealElements.forEach(el => observer.observe(el));
})();

// Код для Hero-секции
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const svgGrid = document.getElementById('hero-grid');
    // Код для интерактивных кнопок
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            // Получаем позицию курсора относительно самой кнопки
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Устанавливаем CSS переменные, которые используются в .btn::before
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Специальный код для кнопки Send Request с белым свечением
    const sendButton = document.querySelector('.contact-form button[type="submit"]');
    if (sendButton) {
        sendButton.addEventListener('mousemove', (e) => {
            // Получаем позицию курсора относительно кнопки
            const rect = sendButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Устанавливаем CSS переменные для белого свечения
            sendButton.style.setProperty('--mouse-x', `${x}px`);
            sendButton.style.setProperty('--mouse-y', `${y}px`);
        });
    }
    if (!hero || !svgGrid) return;

    const GRID_SIZE = 50; // Расстояние между линиями сетки в пикселях
    // ДОБАВЛЯЕМ ЦВЕТА ИМПУЛЬСОВ
    const pulseColors = [
        '#3B82F6', // Синий (из вашего акцентного градиента)
        '#8B5CF6', // Фиолетовый (из вашего акцентного градиента)
        '#00FF00', // Ярко-зеленый (почти как JetBrains Juno)
        '#06B6D4'  // Бирюзовый (из предыдущих волн, хорошо сочетается)
    ];
    // УСТАНАВЛИВАЕМ СКОРОСТЬ АНИМАЦИИ ИМПУЛЬСА В CSS-ПЕРЕМЕННОЙ
    svgGrid.style.setProperty('--pulse-speed', '4s'); // 4 секунды на анимацию одного импульса

    function createGrid() {
        // Очищаем старую сетку перед перерисовкой
        svgGrid.innerHTML = '';
        // Устанавливаем viewBox для корректного масштабирования SVG
        const { width, height } = hero.getBoundingClientRect();
        svgGrid.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svgGrid.setAttribute('width', width);
        svgGrid.setAttribute('height', height);


        // Рисуем вертикальные линии
        for (let x = 0; x <= width + GRID_SIZE; x += GRID_SIZE) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('class', 'grid-line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', 0);
            line.setAttribute('x2', x);
            line.setAttribute('y2', height + GRID_SIZE); // Увеличиваем высоту для покрытия
            svgGrid.appendChild(line);
        }

        // Рисуем горизонтальные линии
        for (let y = 0; y <= height + GRID_SIZE; y += GRID_SIZE) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('class', 'grid-line');
            line.setAttribute('x1', 0);
            line.setAttribute('y1', y);
            line.setAttribute('x2', width + GRID_SIZE); // Увеличиваем ширину для покрытия
            line.setAttribute('y2', y);
            svgGrid.appendChild(line);
        }
    }

    function startPulses() {
        setInterval(() => {
            const lines = svgGrid.querySelectorAll('.grid-line');
            if (lines.length === 0) return;

            const randomLine = lines[Math.floor(Math.random() * lines.length)];

            const pulseLine = randomLine.cloneNode();
            pulseLine.setAttribute('class', 'pulse-line');
            // ВЫБИРАЕМ СЛУЧАЙНЫЙ ЦВЕТ ДЛЯ ИМПУЛЬСА
            const randomColor = pulseColors[Math.floor(Math.random() * pulseColors.length)];
            pulseLine.style.stroke = randomColor; // Устанавливаем цвет импульса напрямую

            svgGrid.appendChild(pulseLine);

            setTimeout(() => {
                pulseLine.remove();
            }, 4000); // Должно соответствовать '--pulse-speed' + небольшой запас
            // ЗАМЕДЛЯЕМ ПОЯВЛЕНИЕ НОВЫХ ИМПУЛЬСОВ
        }, 1000); // Теперь новый импульс появляется каждые 1 секунду
    }

    function handleMouseMove(e) {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = hero;
        const maxRotation = 5;

        const x = (clientX / offsetWidth) - 0.5;
        const y = (clientY / offsetHeight) - 0.5;

        const rotateY = x * maxRotation;
        const rotateX = -y * maxRotation;

        svgGrid.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handleMouseLeave() {
        svgGrid.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }

    // --- Инициализация ---
    createGrid();
    startPulses();
    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createGrid, 200); // Чуть быстрее перерисовка для ощущения реактивности
    });
    // Код для анимированного счетчика цифр
    const counters = document.querySelectorAll('.counter-value');

    const animateCounter = (counter) => {
        const targetValue = counter.textContent;
        // Извлекаем из строки только цифры
        const targetNumber = parseInt(targetValue.replace(/[^0-9]/g, ''));
        const duration = 2000; // Длительность анимации в мс
        let startTime = null;

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // ease-out эффект: анимация замедляется к концу
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easedProgress * targetNumber);

            // Возвращаем на место символы, которые были до числа ($) или после (%)
            counter.textContent = targetValue.replace(targetNumber, currentValue);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Устанавливаем точное финальное значение по завершении
                counter.textContent = targetValue;
            }
        };

        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                // Отписываемся от наблюдения, чтобы анимация сработала один раз
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Анимация начнется, когда элемент виден на 50%
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Stars for market-growth section
    const marketSection = document.querySelector('.market-growth');
    const starsLayer = marketSection ? marketSection.querySelector('.stars') : null;
    if (marketSection && starsLayer) {
        const createStar = () => {
            const star = document.createElement('span');
            star.className = 'star';

            // Random horizontal position (0-100%)
            const left = Math.random() * 100;
            // Random start offset near bottom (0-30px)
            const bottomOffset = Math.random() * 30;

            // Random size and glow
            const size = 1 + Math.random() * 2; // 1-3 px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Random animation duration and twinkle speed
            const duration = 2 + Math.random() * 3; // 2-5s
            const twinkle = 0.8 + Math.random() * 1.2; // 0.8-2.0s
            star.style.setProperty('--star-duration', `${duration}s`);
            star.style.setProperty('--star-twinkle', `${twinkle}s`);

            // Random slight horizontal drift using translateX via CSS transform origin
            const drift = (Math.random() - 0.5) * 20; // -10..10 px
            star.style.left = `calc(${left}% + ${drift}px)`;
            star.style.bottom = `${bottomOffset}px`;

            // Random delay so stars appear sparsely
            star.style.animationDelay = `${Math.random() * 1.5}s, ${Math.random() * 0.8}s`;

            starsLayer.appendChild(star);

            // Cleanup after animation ends
            const removeAfter = duration * 1000 + 400; // чуть больше длительности
            window.setTimeout(() => {
                star.remove();
            }, removeAfter);
        };

        // Spawn stars at random intervals; increase rate on wider screens
        let spawnInterval = 180; // ms
        const updateRate = () => {
            const width = marketSection.clientWidth;
            if (width > 1200) spawnInterval = 120;
            else if (width > 800) spawnInterval = 150;
            else spawnInterval = 200;
        };
        updateRate();
        window.addEventListener('resize', updateRate);

        // Randomized spawner
        let running = true;
        const tick = () => {
            if (!running) return;
            // Random chance per tick to create 0-2 stars
            const count = Math.random() < 0.7 ? 1 : 2;
            for (let i = 0; i < count; i++) createStar();
            setTimeout(tick, spawnInterval + Math.random() * 200);
        };
        tick();

        // Pause when section not in viewport to save CPU
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                running = entry.isIntersecting;
                if (running) tick();
            });
        }, { threshold: 0.1 });
        sectionObserver.observe(marketSection);
    }

    // --- Hover effects for market stats descriptions ---
    const statDescs = document.querySelectorAll('[data-i18n="market.stat1.desc"], [data-i18n="market.stat2.desc"], [data-i18n="market.stat3.desc"]');
    const detachments = new WeakMap();

    function spawnFallingStar(container, x, y) {
        const star = document.createElement('span');
        star.className = 'falling-star';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        // Случайный вектор падения к курсору: немного вниз и в сторону
        const dx = (Math.random() - 0.3) * 80; // чаще в сторону курсора (см. ниже расчёт)
        const dy = 60 + Math.random() * 80;
        star.style.setProperty('--dx', `${dx}px`);
        star.style.setProperty('--dy', `${dy}px`);

        container.appendChild(star);
        setTimeout(() => star.remove(), 900);
    }

    function onDescEnter(e) {
        const el = e.currentTarget;
        el.classList.add('stat-desc-hover', 'stat-shake');

        // Создаём слой-контейнер для частиц над элементом
        let layer = detachments.get(el);
        if (!layer) {
            layer = document.createElement('div');
            layer.style.position = 'absolute';
            layer.style.inset = '0';
            layer.style.overflow = 'visible';
            layer.style.pointerEvents = 'none';
            el.style.position = el.style.position || 'relative';
            el.appendChild(layer);
            detachments.set(el, layer);
        }

        // Запускаем частички на частоте ~60-90 мс пока курсор над элементом
        let running = true;
        const interval = setInterval(() => {
            if (!running) return;
            const rect = el.getBoundingClientRect();
            // Позиция спавна ближе к курсору
            const spawnX = (window._lastMouseX || (rect.left + rect.width / 2)) - rect.left;
            const spawnY = (window._lastMouseY || (rect.top + rect.height / 3)) - rect.top;
            // Несколько звёзд за тик
            const count = 1 + Math.floor(Math.random() * 2);
            for (let i = 0; i < count; i++) {
                spawnFallingStar(layer, spawnX + (Math.random() - 0.5) * 12, spawnY + (Math.random() - 0.5) * 8);
            }
        }, 90);

        el._statHoverCleanup = () => {
            running = false;
            clearInterval(interval);
        };
    }

    function onDescMove(e) {
        window._lastMouseX = e.clientX;
        window._lastMouseY = e.clientY;
    }

    function onDescLeave(e) {
        const el = e.currentTarget;
        el.classList.remove('stat-desc-hover', 'stat-shake');
        if (el._statHoverCleanup) {
            el._statHoverCleanup();
            el._statHoverCleanup = null;
        }
    }

    statDescs.forEach(el => {
        el.addEventListener('mouseenter', onDescEnter);
        el.addEventListener('mousemove', onDescMove);
        el.addEventListener('mouseleave', onDescLeave);
    });

  // 3D tilt for About image (ориентация на курсор по всему окну)
  const tiltContainer = document.querySelector('.about-image.tilt-3d');
  const tiltImage = tiltContainer ? tiltContainer.querySelector('img') : null;
  if (tiltContainer && tiltImage) {
      let rafId = null;
      let targetRx = 0, targetRy = 0;
      let currentRx = 0, currentRy = 0;

      const maxTilt = 12; // degrees

      const update = () => {
          currentRx += (targetRx - currentRx) * 0.12;
          currentRy += (targetRy - currentRy) * 0.12;
          tiltImage.style.transform = `rotateX(${currentRx}deg) rotateY(${currentRy}deg) translateZ(0)`;
          rafId = requestAnimationFrame(update);
      };

      const onWindowMove = (e) => {
          const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
          const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
          const px = e.clientX / vw;  // 0..1 относительно окна
          const py = e.clientY / vh;  // 0..1 относительно окна
          // Всегда смотреть на курсор: когда курсор справа — наклон вправо и наоборот
          targetRy = (px - 0.5) * (maxTilt * 2);
          targetRx = -(py - 0.5) * (maxTilt * 2);
          if (!rafId) rafId = requestAnimationFrame(update);
      };

      const onVisibility = (entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  window.addEventListener('mousemove', onWindowMove);
                  if (!rafId) rafId = requestAnimationFrame(update);
              } else {
                  window.removeEventListener('mousemove', onWindowMove);
                  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
              }
          });
      };

      const io = new IntersectionObserver(onVisibility, { threshold: 0.1 });
      io.observe(tiltContainer);
  }


  // --- Эффект зелёных звёздочек по всей секции контактов: излучаются и падают вниз ---
  const contactSection = document.querySelector('.contact-form');
  if (contactSection) {
      let isInside = false;
      let lastSpawn = 0;

      function createCursorStar(x, y) {
          const star = document.createElement('div');
          star.className = 'cursor-star';
          star.style.left = `${x}px`;
          star.style.top = `${y}px`;
          // Небольшой горизонтальный разброс, падение вниз
          const dx = (Math.random() - 0.5) * 40; // -20..20 px
          const dy = 80 + Math.random() * 160;   // 80..240 px вниз
          star.style.setProperty('--star-dx', `${dx}px`);
          star.style.setProperty('--star-dy', `${dy}px`);
          document.body.appendChild(star);
          setTimeout(() => star.remove(), 1100);
      }

      contactSection.addEventListener('mouseenter', () => { isInside = true; });
      contactSection.addEventListener('mouseleave', () => { isInside = false; });
      contactSection.addEventListener('mousemove', (e) => {
          if (!isInside) return;
          const now = performance.now();
          if (now - lastSpawn < 60) return; // ограничиваем частоту ~16/с
          lastSpawn = now;
          const count = 2 + Math.floor(Math.random() * 3); // 2–4 за раз
          for (let i = 0; i < count; i++) {
              const jitterX = (Math.random() - 0.5) * 18;
              const jitterY = (Math.random() - 0.5) * 18;
              createCursorStar(e.clientX + jitterX, e.clientY + jitterY);
          }
      });
  }
});