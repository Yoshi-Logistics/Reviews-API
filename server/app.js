const express = require('express');
const mountRoutes = require('../routes');

const app = express();

const PORT = 3001;

app.use(express.json());

mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
