const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/photos', async (req, res) => {
  try {
    const response = await axios.get('https://picsum.photos/v2/list?page=2&limit=50');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Unable to fetch photos' });
  }
});

const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});