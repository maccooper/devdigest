const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await fetch(
            "https://hacker-news.firebaseio.com/v0/topstories.json",
        );
        const ids = await response.json();
        const top_n = ids.slice(0, 100);

        const stories = await Promise.all(
            top_n.map((id) =>
                fetch(
                    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
                ).then((res) => res.json()),
            ),
        );

        res.json(stories);
    } catch (err) {
        console.error("Fetch error:", err.message);
        res.status(500).json({ error: "Failed to fetch story" });
    }
});

module.exports = router;
