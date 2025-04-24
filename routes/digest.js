const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
	try {
		console.log('Fetching top stories...');
		const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
		const ids = await response.json();

		console.log('Got IDs:', ids.slice(0,5));
		res.json(ids.slice(0,5));

		} catch (err) {
			console.error('Fetch error:', err.message);
			res.status(500).json({ error: 'Failed to fetch story' });
		}
});

module.exports = router;
