// routes/digest.js

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
	try {
		const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
		const ids = await response.json();
		const top5 = ids.slice(0,5);

		const stories = await Promise.all(
			top5.map(id => fetch('`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json()))
		);

		res.json(stories);
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch digest' });
	}
});

module.exports = router;

