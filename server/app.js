const express = require('express');
const router = require('./routes');

const app = express();

const PORT = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('This is server');
});

app.use('/reviews', router);

app.get('/loaderio-127612f32e9b2beb1481e04fbfac39e0/', (req, res) => {
  res.send('loaderio-127612f32e9b2beb1481e04fbfac39e0');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
