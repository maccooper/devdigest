async function fetchDigest() {
  const res = await fetch('/api/digest');
  const stories = await res.json();
  renderStories(stories);
}

function renderStories(stories) {
  const tags = getSelectedTags();
  const container = document.getElementById('stories');
  container.innerHTML = '';

  const filtered = stories.filter(story => {
    return tags.length === 0 || tags.some(tag => story.title.toLowerCase().includes(tag));
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p>No matching stories today.</p>';
    return;
  }

  filtered.forEach(story => {
    const div = document.createElement('div');
    div.className = 'story';
    div.innerHTML = `<a href="${story.url}" target="_blank">${story.title}</a><p>by ${story.by} • Score: ${story.score}</p>`;
    container.appendChild(div);
  });
}

function getSelectedTags() {
  const checkboxes = document.querySelectorAll('#tags-form input[type="checkbox"]');
  return Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());
}

// Save tags in localStorage
document.getElementById('tags-form').addEventListener('change', () => {
  const selected = getSelectedTags();
  localStorage.setItem('devdigest-tags', JSON.stringify(selected));
  fetchDigest();
});

// Load saved tags
function loadSavedTags() {
  const saved = JSON.parse(localStorage.getItem('devdigest-tags') || '[]');
  saved.forEach(tag => {
    const checkbox = document.querySelector(`#tags-form input[value="${tag}"]`);
    if (checkbox) checkbox.checked = true;
  });
}

loadSavedTags();
fetchDigest();

