function applyTheme() {
  const theme = localStorage.getItem('devdigest-theme') || 'dark';
  document.body.className = theme;
}

function toggleTheme() {
  const current = localStorage.getItem('devdigest-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('devdigest-theme', next);
  applyTheme();
}

applyTheme();

