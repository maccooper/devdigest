async function fetchTopStoryIds() {
    const url = "https://hacker-news.firebaseio.com/v0/topstories.json";
    const response = await fetch(url);
    const ids = await response.json();
    console.log(ids.slice(0, 1000));
}

fetchTopStoryIds();
