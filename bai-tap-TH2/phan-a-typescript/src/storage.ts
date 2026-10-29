const prefix = 'thu-vien-ts';

export function readFavorites(): Set<string> {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(`${prefix}-favorites`) || '[]');
    return new Set(Array.isArray(data) ? data.filter((id): id is string => typeof id === 'string') : []);
  } catch {
    return new Set();
  }
}

export function saveFavorites(favorites: Set<string>): boolean {
  try {
    localStorage.setItem(`${prefix}-favorites`, JSON.stringify([...favorites]));
    return true;
  } catch {
    return false;
  }
}

export function setupTheme(button: HTMLButtonElement): void {
  let dark = false;
  try {
    dark = localStorage.getItem(`${prefix}-theme`) === 'dark';
  } catch {}
  function applyTheme(): void {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    button.textContent = dark ? 'Chế độ sáng' : 'Chế độ tối';
    button.setAttribute('aria-pressed', String(dark));
  }
  applyTheme();
  button.addEventListener('click', () => {
    dark = !dark;
    applyTheme();
    try {
      localStorage.setItem(`${prefix}-theme`, dark ? 'dark' : 'light');
    } catch {}
  });
}
