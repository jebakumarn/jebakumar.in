// Dark/light theme toggle. The no-flash initial theme is set by an inline script
// in BaseLayout (reads localStorage['theme'] or prefers-color-scheme before paint).
// This module only wires up the toggle control(s) and persists changes.

const KEY = 'theme';

function current(): 'light' | 'dark' {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function apply(theme: 'light' | 'dark'): void {
  document.documentElement.setAttribute('data-theme', theme);
}

function syncToggles(toggles: NodeListOf<Element>, isLight: boolean): void {
  toggles.forEach((t) => {
    if (t instanceof HTMLInputElement) t.checked = isLight;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('[data-theme-toggle]');
  syncToggles(toggles, current() === 'light');

  toggles.forEach((toggle) => {
    toggle.addEventListener('change', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      apply(next);
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* storage may be unavailable (private mode) — theme still applies for the session */
      }
      syncToggles(toggles, next === 'light');
    });
  });
});
