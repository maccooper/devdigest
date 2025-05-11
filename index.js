const express = require("express");
const app = express();

app.use(express.static("public"));

const digestRoute = require("./routes/digest");

app.use("/api/digest", digestRoute);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("DevDigest API is running. Try /api/digest");
});

app.listen(PORT, () => {
    console.log(`DevDigest server running on port ${PORT}`);
});
