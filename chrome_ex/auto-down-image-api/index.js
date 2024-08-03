const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3321;

app.use(cors());

app.get('/get', async (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).send('URL parameter is required');
  }

  try {
    const response = await axios.get(url, {
      responseType: 'stream'
    });

    // Sao chép các header từ response gốc
    Object.keys(response.headers).forEach(header => {
      res.setHeader(header, response.headers[header]);
    });

    // Thêm một số header tùy chỉnh nếu cần
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Proxied-Url', response.config.url);
    res.setHeader('X-Proxied-Status', response.status);

    // Pipe dữ liệu trực tiếp từ response gốc đến response của chúng ta
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send('Failed to fetch the URL');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});