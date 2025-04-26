const settingsForm = document.getElementById('category-settings');

const allCategories = [
  "programming",
  "artificial-intelligence",
  "cybersecurity",
  "startups",
  "science",
  "design",
  "finance",
  "career",
  "media",
  "general"
];

document.addEventListener('DOMContentLoaded', () => {
  //load categories
  let savedCategories = JSON.parse(localStorage.getItem('devdigest-categories'));

  //default to all categories
  if (!savedCategories || !Array.isArray(savedCategories) || savedCategories.length === 0) {
    savedCategories = allCategories;
    localStorage.setItem('devdigest-categories', JSON.stringify(allCategories));
  }

  //set checkboxes from categories
  const checkboxes = settingsForm.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = savedCategories.includes(checkbox.value);
  });
});

//updated local storage to reflect our categories
settingsForm.addEventListener('change', () => {
  const selected = Array.from(settingsForm.querySelectorAll('input[type="checkbox"]'))
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  localStorage.setItem('devdigest-categories', JSON.stringify(selected));
});

