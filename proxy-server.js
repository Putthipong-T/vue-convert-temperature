import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000; // Choose a port for your proxy server

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Proxy route
app.post('/send-notification', async (req, res) => {
  const { token, message } = req.body;
  const url = 'https://notify-api.line.me/api/notify';
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${token}` };
  const data = new URLSearchParams();
  data.append('message', message);

  try {
    const response = await axios.post(url, data, { headers });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
