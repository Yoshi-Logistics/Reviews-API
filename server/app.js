const express = require('express');
const router = require('./routes');

const app = express();

const PORT = 3001;

app.use(express.json());

app.use('/api/reviews', router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
