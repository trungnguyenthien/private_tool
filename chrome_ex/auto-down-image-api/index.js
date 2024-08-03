const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3321;

app.use(cors());

app.get('/get', async (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await axios.get(url);
    res.json({
      contents: response.data,
      status: {
        url: response.config.url,
        content_type: response.headers['content-type'],
        http_code: response.status,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the URL' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});