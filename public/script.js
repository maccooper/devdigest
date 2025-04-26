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

  const topStories = stories.slice(0, 5);

  topStories.forEach(story => {
    const div = document.createElement('div');
    div.className = 'story';
    div.innerHTML = `
      <a href="${story.url}" target="_blank">${story.title}</a>
      <p>by ${story.by} • Points: ${story.score}</p>
    `;
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // 🕑 Show quick loading message
  const container = document.getElementById('stories');
  container.innerHTML = '<p>Loading top stories...</p>';

  fetchDigest();
});

