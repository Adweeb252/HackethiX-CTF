// import express from 'express';
const express = require('express');
const app = express();
const cors = require('cors');

// const corsOptions = {
//   origin: 'http://localhost:5173',
// }
app.use(express.json());
app.use(cors())

app.get('/api/status', (req, res) => {
  res.set('X-CTF-Flag', 'CTF{h34d3r_sp0tt3r}');
  res.json({ status: 'online', flag: 'CTF{4j4x_hunt3r}' });
});

app.listen(8000, () => {
  console.log('Server is running on port 3000');
});
