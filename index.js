const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Serve web.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'web.html'));
});

// API endpoint to fetch lyrics
app.get('/api/lyrics', async (req, res) => {
  const { artist, song } = req.query;
  try {
    const response = await axios.get(`https://iwato-rest-api.vercel.app/entertainment/lyrics?artist=${encodeURIComponent(artist)}&song=${encodeURIComponent(song)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});