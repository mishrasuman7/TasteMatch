// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

app.get('/', (req, res) => {
  res.send('TasteMatch server is running ');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.post("/api/match", async (req, res) => {
  const { input } = req.body;

  const qlooResponse = [
    { name: "Example 1", description: "From Qloo based on: " + input },
    { name: "Example 2", description: "Another recommendation." }
  ];

  res.json({ results: qlooResponse });
});

let fetch;
(async() => {
  fetch = (await import("node-fetch")).default;
})();

const express = require("express");
const cors = require("cors");
// const fetch = require("node-fetch"); // Import fetch
require("dotenv").config(); // For environment variables

const app = express();
app.use(cors());
app.use(express.json());

const QLOO_API_KEY = process.env.QLOO_API_KEY; // Put your key in .env file

app.post("/api/match", async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  // { input } = req.body;

  try {
    // Qloo Food API endpoint example (adjust if needed)
    const url = `https://api.qloo.com/food?query=${encodeURIComponent(input)}&limit=5`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${QLOO_API_KEY}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Qloo API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Extract relevant info from Qloo response
    // This depends on Qloo's actual response structure for food
    const results = data.results.map((item) => ({
      name: item.name,
      description: item.description || item.category || "No description",
    }));

    res.json({ results });
  } catch (error) {
    console.error("Qloo API fetch error:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
