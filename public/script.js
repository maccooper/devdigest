function getSelectedCategories() {
  const saved = localStorage.getItem('devdigest-categories');
  try {
    const selected = JSON.parse(saved);
    return Array.isArray(selected) ? selected : [];
  } catch {
    return [];
  }
}
function getMatchedKeywords(title) {
  const lower = title.toLowerCase();
  let matches = [];

  for (const keywords of Object.values(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword) && !matches.includes(keyword)) {
        matches.push(keyword);
      }
    }
  }

  return matches;
}

function detectCategory(title) {
  if (!title) return "general";
  const lower = title.toLowerCase();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      return category;
    }
  }
  return "general";
}

async function fetchDigest() {
  try {
    const res = await fetch('/api/digest');
    const stories = await res.json();
    renderStories(stories);
  } catch (err) {
    console.error('Failed to fetch digest:', err);
    const container = document.getElementById('stories');
    container.innerHTML = '<p>Error loading stories.</p>';
  }
}

function renderStories(stories) {
  const container = document.getElementById('stories');
  container.innerHTML = '';

  const selectedCategories = getSelectedCategories();

  const filtered = stories.filter(story => {
    const category = detectCategory(story.title);
    return selectedCategories.includes(category);
  });

  const topStories = filtered.slice(0, 10);

  topStories.forEach(story => {
    const div = document.createElement('div');
    div.className = 'story';
    div.innerHTML = `
      <a href="${story.url}" target="_blank">${story.title}</a>
      <p>by ${story.by} • Points: ${story.score}</p>
    `;
    container.appendChild(div);
  });

  if (topStories.length === 0) {
    container.innerHTML = '<p>No stories match your selected categories.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('stories');
  container.innerHTML = '<p>Loading top stories...</p>';

  fetchDigest();
});

