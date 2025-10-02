// theme.js — Theme toggling logic per TZ.md Section 1.3
(function () {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  function detectSystemTheme() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch (e) {
      return 'dark';
    }
  }

  function applyTheme(theme) {
    const value = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', value);
  }

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      // ignore storage errors
    }
    return 'dark'; // По умолчанию темная тема
  }

  // Initialize theme on page load
  applyTheme(getInitialTheme());

  // Bind toggle button
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    });
  }
})();
