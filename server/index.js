const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at 192.168.5:${PORT}`);
});
