const express = require('express');
const request = require('request');

const app = express();

app.use('/', (req, res) => {
  const url = req.query.url;
  
  if (!url) {
    return res.status(400).send('You must provide a URL parameter.');
  }

  // Proxy the request to the specified URL
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
