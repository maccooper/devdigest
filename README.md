# DevDigest

**Live Site:**  
👉 [https://devdigest-production.up.railway.app/](https://devdigest-production.up.railway.app/)

A lightweight daily feed for developers — curated from Hacker News and filtered by your interests. No logins, no accounts, no database.

---

### ✨ Built over a weekend. Shaped by constraints.

I wanted to build something fast, useful, and deployable for cheap — mostly to test out [Railway's](https://railway.app) $5 free tier. So I stripped out the bloat and leaned into simplicity.

> DevDigest isn’t a smart app — because it doesn’t need to be.

---

### 🧠 Design by Constraint

Inspired by game dev’s “constraints shape style” principle, I kept things minimal:

- A Node + Express backend
- Vanilla HTML + JavaScript frontend
- Deployed via Railway with Nixpacks (no Dockerfile)
- No accounts, no logins, no database — just `localStorage`

---

### 🔍 Smarter Filtering, Not Smarter Apps

DevDigest fetches top Hacker News stories and filters them based on your selected categories.

Instead of basic keyword matching, I scraped current HN articles and used GPT-4 to bucket keywords by topic. For example:


